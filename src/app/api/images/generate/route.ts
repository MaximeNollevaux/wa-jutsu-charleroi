import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY
const GOOGLE_AI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent'

interface GenerateRequest {
  placeholder_id: string
  feedback?: string
  reference_image_base64?: string
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
  const { placeholder_id, feedback, reference_image_base64 } = body

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
    // Update prompt_current with feedback
    await supabase
      .from('image_placeholders')
      .update({ prompt_current: finalPrompt })
      .eq('id', placeholder_id)
  }

  // Add image specifications
  const imageSpec = `\n\nSpécifications techniques: Image ${placeholder.width}x${placeholder.height}px, haute qualité, professionnelle.`
  const fullPrompt = finalPrompt + imageSpec

  try {
    // Build request parts
    const parts: Array<{ text: string } | { inline_data: { mime_type: string; data: string } }> = []

    // Add reference image if provided (image-to-image)
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

    // Call Google AI API
    const response = await fetch(`${GOOGLE_AI_ENDPOINT}?key=${GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google AI API error:', errorText)

      // Reset status on error
      await supabase
        .from('image_placeholders')
        .update({ status: 'pending' })
        .eq('id', placeholder_id)

      return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
    }

    const result = await response.json()

    // Extract image from response
    let imageBase64: string | null = null
    let mimeType = 'image/png'

    if (result.candidates?.[0]?.content?.parts) {
      for (const part of result.candidates[0].content.parts) {
        if (part.inlineData) {
          imageBase64 = part.inlineData.data
          mimeType = part.inlineData.mimeType || 'image/png'
          break
        }
      }
    }

    if (!imageBase64) {
      // Reset status on error
      await supabase
        .from('image_placeholders')
        .update({ status: 'pending' })
        .eq('id', placeholder_id)

      return NextResponse.json({ error: 'Aucune image générée' }, { status: 500 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `gen_${placeholder_id.slice(0, 8)}_${timestamp}.${mimeType.split('/')[1]}`

    // For now, store as data URL (will be uploaded to server on approval)
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

    // Reset status on error
    await supabase
      .from('image_placeholders')
      .update({ status: 'pending' })
      .eq('id', placeholder_id)

    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
  }
}
