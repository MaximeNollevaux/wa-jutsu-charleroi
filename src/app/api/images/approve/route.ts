import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

interface ApproveRequest {
  generation_id: string
}

// Le chemin du placeholder est ecrit sur disque : il doit rester confine dans
// public/images (aucun point autorise dans les segments de dossier -> pas de '..').
const IMAGE_PATH_REGEX = /^\/images\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|webp)$/

// Liste blanche stricte des types acceptes (l'extension n'est jamais deduite
// d'une valeur arbitraire fournie par l'appelant).
const ALLOWED_MIME_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/webp': 'webp',
}

function hasValidImageSignature(buffer: Buffer, extension: string): boolean {
  if (buffer.length < 12) return false
  switch (extension) {
    case 'png':
      return buffer.subarray(0, 8).equals(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      )
    case 'jpeg':
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
    case 'webp':
      return (
        buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
        buffer.subarray(8, 12).toString('ascii') === 'WEBP'
      )
    default:
      return false
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const body: ApproveRequest = await request.json()
  const { generation_id } = body

  if (!generation_id) {
    return NextResponse.json({ error: 'generation_id requis' }, { status: 400 })
  }

  // Get generation info
  const { data: generation, error: genError } = await supabase
    .from('image_generations')
    .select('*, placeholder:image_placeholders(*)')
    .eq('id', generation_id)
    .single()

  if (genError || !generation) {
    return NextResponse.json({ error: 'Génération non trouvée' }, { status: 404 })
  }

  const placeholder = generation.placeholder

  try {
    // Extract base64 from data URL
    const dataUrlMatch = generation.image_url.match(/^data:([^;]+);base64,(.+)$/)
    if (!dataUrlMatch) {
      return NextResponse.json({ error: 'Format d\'image invalide' }, { status: 400 })
    }

    const mimeType = dataUrlMatch[1]
    const base64Data = dataUrlMatch[2]
    const buffer = Buffer.from(base64Data, 'base64')

    // Determine file extension (liste blanche uniquement)
    const extension = ALLOWED_MIME_TYPES[mimeType]
    if (!extension) {
      return NextResponse.json({ error: 'Type d\'image non autorisé' }, { status: 400 })
    }

    if (!hasValidImageSignature(buffer, extension)) {
      return NextResponse.json({ error: 'Contenu d\'image invalide' }, { status: 400 })
    }

    // Generate filename from placeholder path
    const originalPath = placeholder.path
    if (typeof originalPath !== 'string' || !IMAGE_PATH_REGEX.test(originalPath)) {
      return NextResponse.json({ error: 'Chemin de placeholder invalide' }, { status: 400 })
    }
    const filename = path.basename(originalPath).replace(/\.[^.]+$/, `.${extension}`)
    const directory = path.dirname(originalPath)

    // Full path in public folder
    const imagesRoot = path.resolve(process.cwd(), 'public', 'images')
    const publicDir = path.resolve(process.cwd(), 'public', `.${directory}`)
    const fullPath = path.resolve(publicDir, filename)

    // Garde-fou final : l'ecriture doit rester sous public/images
    if (
      (publicDir !== imagesRoot && !publicDir.startsWith(imagesRoot + path.sep)) ||
      !fullPath.startsWith(imagesRoot + path.sep)
    ) {
      return NextResponse.json({ error: 'Chemin de placeholder invalide' }, { status: 400 })
    }

    // Create directory if it doesn't exist
    await mkdir(publicDir, { recursive: true })

    // Write file
    await writeFile(fullPath, buffer)

    // Update the file path to use the new extension
    const finalPath = path.join(directory, filename).replace(/\\/g, '/')

    // Mark generation as approved
    await supabase
      .from('image_generations')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: user.id
      })
      .eq('id', generation_id)

    // Mark all other generations for this placeholder as rejected
    await supabase
      .from('image_generations')
      .update({ status: 'rejected' })
      .eq('placeholder_id', placeholder.id)
      .neq('id', generation_id)
      .eq('status', 'generated')

    // Update placeholder with final image URL and status
    await supabase
      .from('image_placeholders')
      .update({
        status: 'approved',
        current_image_url: finalPath
      })
      .eq('id', placeholder.id)

    return NextResponse.json({
      success: true,
      image_path: finalPath,
      message: `Image approuvée et sauvegardée: ${finalPath}`
    })

  } catch (error) {
    console.error('Approval error:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'approbation' }, { status: 500 })
  }
}

// POST to reject a generation
export async function DELETE(request: NextRequest) {
  const supabase = await createClient()

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const generation_id = searchParams.get('generation_id')

  if (!generation_id) {
    return NextResponse.json({ error: 'generation_id requis' }, { status: 400 })
  }

  // Mark generation as rejected
  const { error } = await supabase
    .from('image_generations')
    .update({ status: 'rejected' })
    .eq('id', generation_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
