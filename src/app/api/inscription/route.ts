import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

    // TODO: Send email notification to admin using Resend
    // TODO: Send confirmation email to user

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Registration form error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
