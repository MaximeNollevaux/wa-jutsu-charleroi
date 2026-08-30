import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

// Les champs viennent d'un formulaire public : ils doivent etre echappes avant
// d'etre interpoles dans le HTML de l'email. Meme garde que la route
// d'inscription.
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c])
}

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
      })

    if (error) {
      console.error('Error storing contact message:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du message' },
        { status: 500 }
      )
    }

    // Prevenir le club. Jusqu'au 30/08/2026 cet envoi etait un TODO commente :
    // le message etait ecrit en base et personne n'etait averti. Un visiteur de
    // Marcinelle a ainsi attendu une reponse pendant un mois.
    // L'envoi ne doit pas faire echouer la requete : le message est deja
    // enregistre, le perdre parce que Resend tousse serait pire.
    try {
      await getResend().emails.send({
        from: 'Wa-Jutsu Club <noreply@synara.be>',
        to: ['contact@wa-jutsu-charleroi.be'],
        replyTo: email,
        subject: `Message du site — ${esc(subject)}`,
        html: `
          <h2>Nouveau message depuis le site</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ddd">${esc(name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${esc(email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ddd">${esc(phone) || '—'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Sujet</td><td style="padding:8px;border:1px solid #ddd">${esc(subject)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${esc(message).replace(/\n/g, '<br>')}</td></tr>
          </table>
          <p style="color:#666;font-size:13px">Répondre à ce mail répond directement à l'expéditeur.</p>
        `,
      })
    } catch (mailError) {
      console.error('[contact] Notification non envoyée:', mailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
