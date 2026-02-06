'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message')
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
        <h3 className="font-heading font-bold text-xl mb-2">Message envoyé !</h3>
        <p className="text-dark-400 mb-6">
          Nous vous répondrons dans les plus brefs délais.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input-field"
            placeholder="Votre nom"
          />
        </div>
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="input-field"
            placeholder="0470 00 00 00"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Sujet *
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="input-field"
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="inscription">Inscription / Essai gratuit</option>
            <option value="information">Demande d'information</option>
            <option value="horaires">Horaires des cours</option>
            <option value="tarifs">Tarifs</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="input-field resize-none"
          placeholder="Votre message..."
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          required
          className="mt-1"
        />
        <label htmlFor="privacy" className="text-dark-400 text-sm">
          J'accepte que mes données soient utilisées pour répondre à ma demande
          conformément à la{' '}
          <a href="/politique-confidentialite" className="text-primary hover:underline">
            politique de confidentialité
          </a>.
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </Button>
    </form>
  )
}
