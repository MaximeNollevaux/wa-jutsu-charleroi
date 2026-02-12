import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY

const GEMINI_MODELS = ['gemini-2.5-flash-image']
const IMAGEN_MODELS = ['imagen-4.0-fast-generate-001', 'imagen-4.0-generate-001', 'imagen-4.0-ultra-generate-001']
const ALL_MODELS = [...GEMINI_MODELS, ...IMAGEN_MODELS]

function getClosestImagenAspectRatio(width: number, height: number): string {
  const ratio = width / height
  const supported = [
    { label: '1:1', value: 1 },
    { label: '3:4', value: 3 / 4 },
    { label: '4:3', value: 4 / 3 },
    { label: '9:16', value: 9 / 16 },
    { label: '16:9', value: 16 / 9 },
  ]
  let closest = supported[0]
  let minDiff = Math.abs(ratio - closest.value)
  for (const s of supported) {
    const diff = Math.abs(ratio - s.value)
    if (diff < minDiff) {
      minDiff = diff
      closest = s
    }
  }
  return closest.label
}

interface GenerateRequest {
  placeholder_id: string
  feedback?: string
  reference_image_base64?: string
  model?: string
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

  if (!GOOGLE_AI_API_KEY) {
    return NextResponse.json({ error: 'GOOGLE_AI_API_KEY non configurée' }, { status: 500 })
  }

  const body: GenerateRequest = await request.json()
  const { placeholder_id, feedback, reference_image_base64, model } = body
  const selectedModel = model && ALL_MODELS.includes(model) ? model : 'gemini-2.5-flash-image'
  const isGemini = GEMINI_MODELS.includes(selectedModel)

  if (!placeholder_id) {
    return NextResponse.json({ error: 'placeholder_id requis' }, { status: 400 })
  }

  // Get placeholder info
  const { data: placeholder, error: placeholderError } = await supabase
    .from('image_placeholders')
    .select('*')
    .eq('id', placeholder_id)
    .single()

  if (placeholderError || !placeholder) {
    return NextResponse.json({ error: 'Placeholder non trouvé' }, { status: 404 })
  }

  // Update status to generating
  await supabase
    .from('image_placeholders')
    .update({ status: 'generating' })
    .eq('id', placeholder_id)

  // Build the prompt
  let finalPrompt = placeholder.prompt_current || placeholder.prompt_initial

  if (feedback) {
    finalPrompt = `${finalPrompt}\n\nModifications demandées: ${feedback}`
    await supabase
      .from('image_placeholders')
      .update({ prompt_current: finalPrompt })
      .eq('id', placeholder_id)
  }

  // Add image specifications
  const imageSpec = `\n\nSpécifications techniques: Image ${placeholder.width}x${placeholder.height}px, haute qualité, professionnelle.`
  const fullPrompt = finalPrompt + imageSpec

  try {
    let imageBase64: string | null = null
    let mimeType = 'image/png'

    if (isGemini) {
      // Gemini API: generateContent
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent`

      const parts: Array<{ text: string } | { inline_data: { mime_type: string; data: string } }> = []

      if (reference_image_base64) {
        parts.push({
          inline_data: {
            mime_type: 'image/jpeg',
            data: reference_image_base64
          }
        })
        parts.push({
          text: `En utilisant cette image comme référence de style/sujet, génère une nouvelle image: ${fullPrompt}`
        })
      } else {
        parts.push({ text: `Génère une image: ${fullPrompt}` })
      }

      const response = await fetch(`${endpoint}?key=${GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Gemini API error:', errorText)
        await supabase.from('image_placeholders').update({ status: 'pending' }).eq('id', placeholder_id)
        return NextResponse.json({ error: `Erreur API Gemini: ${response.status}` }, { status: 500 })
      }

      const result = await response.json()

      if (result.candidates?.[0]?.content?.parts) {
        for (const part of result.candidates[0].content.parts) {
          if (part.inlineData) {
            imageBase64 = part.inlineData.data
            mimeType = part.inlineData.mimeType || 'image/png'
            break
          }
        }
      }
    } else {
      // Imagen API: predict
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:predict`
      const aspectRatio = getClosestImagenAspectRatio(placeholder.width, placeholder.height)

      const response = await fetch(`${endpoint}?key=${GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: fullPrompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio,
            personGeneration: 'allow_adult'
          }
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Imagen API error:', errorText)
        await supabase.from('image_placeholders').update({ status: 'pending' }).eq('id', placeholder_id)
        return NextResponse.json({ error: `Erreur API Imagen: ${response.status}` }, { status: 500 })
      }

      const result = await response.json()

      if (result.predictions?.[0]) {
        imageBase64 = result.predictions[0].bytesBase64Encoded
        mimeType = result.predictions[0].mimeType || 'image/png'
      }
    }

    if (!imageBase64) {
      await supabase.from('image_placeholders').update({ status: 'pending' }).eq('id', placeholder_id)
      return NextResponse.json({ error: 'Aucune image générée' }, { status: 500 })
    }

    // Store as data URL
    const dataUrl = `data:${mimeType};base64,${imageBase64}`

    // Save generation to database
    const { data: generation, error: genError } = await supabase
      .from('image_generations')
      .insert({
        placeholder_id,
        prompt_used: fullPrompt,
        feedback: feedback || null,
        image_url: dataUrl,
        reference_image_url: reference_image_base64 ? 'reference_provided' : null,
        status: 'generated'
      })
      .select()
      .single()

    if (genError) {
      console.error('Error saving generation:', genError)
      return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
    }

    // Update placeholder status to review
    await supabase
      .from('image_placeholders')
      .update({ status: 'review' })
      .eq('id', placeholder_id)

    return NextResponse.json({
      success: true,
      generation: {
        id: generation.id,
        image_url: dataUrl,
        prompt_used: fullPrompt
      }
    })

  } catch (error) {
    console.error('Generation error:', error)
    await supabase.from('image_placeholders').update({ status: 'pending' }).eq('id', placeholder_id)
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
  }
}
