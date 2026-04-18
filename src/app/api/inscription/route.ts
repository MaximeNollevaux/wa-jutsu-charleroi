import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

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
      await resend.emails.send({
        from: 'Wa-Jutsu Club <noreply@synara.be>',
        to: ['maximenollevaux@gmail.com'],
        subject: `Nouvelle inscription - ${firstName} ${lastName}`,
        html: `
          <h2>Nouvelle pré-inscription au Wa-Jutsu Club</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ddd">${lastName}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Prénom</td><td style="padding:8px;border:1px solid #ddd">${firstName}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Date de naissance</td><td style="padding:8px;border:1px solid #ddd">${birthDate}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Adresse</td><td style="padding:8px;border:1px solid #ddd">${address}, ${postalCode} ${city}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Catégorie</td><td style="padding:8px;border:1px solid #ddd">${category}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Contact d'urgence</td><td style="padding:8px;border:1px solid #ddd">${emergencyContact} — ${emergencyPhone}</td></tr>
            ${message ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>` : ''}
          </table>
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
