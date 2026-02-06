'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function MotDePasseOubliePage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/espace-membre/reset-password`,
    })

    if (error) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setIsLoading(false)
      return
    }

    setIsSuccess(true)
    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-20 bg-dark-800">
        <div className="w-full max-w-md px-4">
          <div className="bg-dark-700 border border-dark-600 p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-heading font-bold text-2xl uppercase mb-4">
              Email envoyé
            </h1>
            <p className="text-dark-400 mb-6">
              Si un compte existe avec cette adresse email, vous recevrez un lien
              pour réinitialiser votre mot de passe.
            </p>
            <Link href="/espace-membre/connexion" className="text-primary hover:underline">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 bg-dark-800">
      <div className="w-full max-w-md px-4">
        <div className="bg-dark-700 border border-dark-600 p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-2xl uppercase mb-2">
              Mot de passe oublié
            </h1>
            <p className="text-dark-400">
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="votre@email.com"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/espace-membre/connexion"
              className="text-dark-400 text-sm hover:text-white transition-colors"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
