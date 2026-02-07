'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function ConnexionPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Login error:', error)
        setError(error.message || 'Email ou mot de passe incorrect')
        setIsLoading(false)
        return
      }

      if (data?.session) {
        // Full page reload to ensure cookies are properly sent to server
        window.location.href = '/espace-membre/admin'
      } else {
        setError('Erreur de connexion - pas de session')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Erreur inattendue lors de la connexion')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 bg-dark-800">
      <div className="w-full max-w-md px-4">
        <div className="bg-dark-700 border border-dark-600 p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-2xl uppercase mb-2">
              Espace Membre
            </h1>
            <p className="text-dark-400">
              Connectez-vous à votre compte
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/espace-membre/mot-de-passe-oublie"
              className="text-primary text-sm hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-dark-600 text-center text-dark-400 text-sm">
            <p>
              Pas encore de compte ?{' '}
              <Link href="/inscription" className="text-primary hover:underline">
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
