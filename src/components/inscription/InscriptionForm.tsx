'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function InscriptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      birthDate: formData.get('birthDate') as string,
      address: formData.get('address') as string,
      postalCode: formData.get('postalCode') as string,
      city: formData.get('city') as string,
      category: formData.get('category') as string,
      emergencyContact: formData.get('emergencyContact') as string,
      emergencyPhone: formData.get('emergencyPhone') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'inscription')
      }

      setIsSuccess(true)
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">Pré-inscription envoyée !</h3>
        <p className="text-dark-400 mb-6">
          Nous vous contacterons dans les plus brefs délais pour
          planifier votre premier cours d'essai.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary hover:underline"
        >
          Faire une autre inscription
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal info */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4 text-primary uppercase">
          Informations personnelles
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="input-field"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="input-field"
              placeholder="Votre prénom"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input-field"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="input-field"
              placeholder="0470 00 00 00"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium mb-2">
              Date de naissance *
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              required
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Catégorie *
            </label>
            <select
              id="category"
              name="category"
              required
              className="input-field"
            >
              <option value="">Sélectionnez</option>
              <option value="enfant">Enfant (- de 13 ans)</option>
              <option value="jeune">Jeune (13-18 ans)</option>
              <option value="adulte">Adulte (+ de 18 ans)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4 text-primary uppercase">
          Adresse
        </h3>
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Adresse *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className="input-field"
            placeholder="Rue et numéro"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
              Code postal *
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              className="input-field"
              placeholder="6000"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              Localité *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              className="input-field"
              placeholder="Charleroi"
            />
          </div>
        </div>
      </div>

      {/* Emergency contact */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4 text-primary uppercase">
          Contact d'urgence
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="emergencyContact" className="block text-sm font-medium mb-2">
              Nom du contact *
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              required
              className="input-field"
              placeholder="Nom et prénom"
            />
          </div>
          <div>
            <label htmlFor="emergencyPhone" className="block text-sm font-medium mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              id="emergencyPhone"
              name="emergencyPhone"
              required
              className="input-field"
              placeholder="0470 00 00 00"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="input-field resize-none"
          placeholder="Avez-vous des questions ou des informations à nous communiquer ?"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 text-sm">
          {error}
        </div>
      )}

      {/* Consent */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="roi"
            name="roi"
            required
            className="mt-1"
          />
          <label htmlFor="roi" className="text-dark-400 text-sm">
            J'ai pris connaissance du{' '}
            <a href="/reglement-interieur" className="text-primary hover:underline">
              règlement d'ordre intérieur
            </a>{' '}
            et m'engage à le respecter. *
          </label>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            required
            className="mt-1"
          />
          <label htmlFor="privacy" className="text-dark-400 text-sm">
            J'autorise le club à collecter et traiter mes données personnelles
            conformément à la{' '}
            <a href="/politique-confidentialite" className="text-primary hover:underline">
              politique de confidentialité
            </a>. *
          </label>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma pré-inscription'}
      </Button>
    </form>
  )
}
