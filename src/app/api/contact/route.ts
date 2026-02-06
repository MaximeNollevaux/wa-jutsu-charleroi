import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Store in database
    const supabase = await createClient()
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone: phone || null,
        subject,
        message,
      } as never)

    if (error) {
      console.error('Error storing contact message:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du message' },
        { status: 500 }
      )
    }

    // TODO: Send email notification to admin using Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({...})

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
