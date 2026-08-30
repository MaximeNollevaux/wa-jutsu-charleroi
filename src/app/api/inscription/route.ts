import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { normaliserAttribution, resumerAttribution } from '@/lib/attribution'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

// Les champs proviennent d'un formulaire public : ils doivent etre echappes
// avant d'etre interpoles dans le HTML de l'email envoye a l'administrateur.
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
    const {
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      address,
      postalCode,
      city,
      category,
      emergencyContact,
      emergencyPhone,
      message,
    } = body

    // Vient du navigateur : filtre avant tout usage, en base comme dans l'email.
    const attribution = normaliserAttribution(body.attribution)
    const origine = resumerAttribution(attribution)

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !birthDate ||
      !address ||
      !postalCode ||
      !city ||
      !category ||
      !emergencyContact ||
      !emergencyPhone
    ) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Store in database
    const supabase = await createClient()
    const { error } = await supabase
      .from('registrations')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        birth_date: birthDate,
        address,
        postal_code: postalCode,
        city,
        category,
        emergency_contact: emergencyContact,
        emergency_phone: emergencyPhone,
        message: message || null,
        attribution: Object.keys(attribution).length ? attribution : null,
        utm_source: attribution.utm_source ?? null,
        utm_medium: attribution.utm_medium ?? null,
        utm_campaign: attribution.utm_campaign ?? null,
      })

    if (error) {
      console.error('Error storing registration:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de l\'inscription' },
        { status: 500 }
      )
    }

    // Send email notification to admin
    try {
      await getResend().emails.send({
        from: 'Wa-Jutsu Club <noreply@synara.be>',
        // Alias qui redistribue aux quatre boites du comite (president,
        // secretaire, directeur, tresorier). Changer qui recoit se fait dans
        // l'alias Mailu, pas ici : le code n'a pas a connaitre le comite.
        // Avant le 30/08/2026, ces demandes partaient sur la boite Gmail
        // personnelle de Maxime — le club ne recevait rien.
        to: ['inscriptions@wa-jutsu-charleroi.be'],
        // Repondre au message repond au candidat, pas a noreply@.
        replyTo: email,
        subject: `Nouvelle inscription - ${esc(firstName)} ${esc(lastName)}`,
        html: `
          <h2>Nouvelle pré-inscription au Wa-Jutsu Club</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ddd">${esc(lastName)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Prénom</td><td style="padding:8px;border:1px solid #ddd">${esc(firstName)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${esc(email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ddd">${esc(phone)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Date de naissance</td><td style="padding:8px;border:1px solid #ddd">${esc(birthDate)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Adresse</td><td style="padding:8px;border:1px solid #ddd">${esc(address)}, ${esc(postalCode)} ${esc(city)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Catégorie</td><td style="padding:8px;border:1px solid #ddd">${esc(category)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Contact d'urgence</td><td style="padding:8px;border:1px solid #ddd">${esc(emergencyContact)} — ${esc(emergencyPhone)}</td></tr>
            ${message ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${esc(message)}</td></tr>` : ''}
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Origine</td><td style="padding:8px;border:1px solid #ddd">${esc(origine)}</td></tr>
          </table>
          <p style="color:#666;font-size:13px">« Origine » indique d'ou vient la demande : campagne publicitaire, moteur de recherche ou lien externe. C'est ce qui permet de savoir quelle campagne finance reellement des inscriptions.</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Registration form error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
