'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { lireAttribution } from '@/lib/attribution'
import { signalerDemande } from '@/lib/analytics'
import { OBJETS_SECOURS, type ObjetFormulaire } from '@/lib/site'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Objets proposes : ceux de Synara One quand ils sont joignables, les cinq
  // sujets historiques sinon. Le visiteur ne doit jamais voir une liste vide.
  const [objets, setObjets] = useState<ObjetFormulaire[]>(OBJETS_SECOURS)
  // Heure d'affichage du formulaire, jointe a l'envoi. Un robot qui remplit tout
  // d'un coup laisse moins de trois secondes ; la route refuse alors en silence.
  // Remise a l'heure quand le formulaire reapparait, sinon un deuxieme message
  // saisi paisiblement serait pris pour un robot.
  const [horodatage, setHorodatage] = useState(() => Date.now())

  useEffect(() => {
    let actif = true
    // Passe par la route du site (meme origine que l'envoi) : le CORS du routeur
    // de One n'entre pas en jeu. En cas d'echec, la liste de secours reste.
    fetch('/api/contact')
      .then((reponse) => (reponse.ok ? reponse.json() : null))
      .then((donnees) => {
        if (actif && donnees && Array.isArray(donnees.objets) && donnees.objets.length) {
          setObjets(donnees.objets as ObjetFormulaire[])
        }
      })
      .catch(() => {
        /* One injoignable : la liste de secours reste affichee */
      })
    return () => {
      actif = false
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Reference gardee avant le premier await : React remet `currentTarget` a
    // null des que le gestionnaire rend la main, et le reset plus bas echouait.
    const form = e.currentTarget
    const formData = new FormData(form)
    // Lue au moment de l'envoi : le visiteur a pu arriver par une annonce puis
    // naviguer, les parametres ne sont plus dans l'URL a cet instant.
    const attribution = lireAttribution()
    const data = {
      // L'origine part telle quelle : la route serveur la relaie a Synara One,
      // seul a savoir ou envoyer la demande selon l'objet choisi.
      utm: attribution,
      landing_url: attribution?.landing_url || window.location.href,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      objet_id: formData.get('objet_id') as string,
      message: formData.get('message') as string,
      piege: formData.get('piege') as string,
      horodatage: formData.get('horodatage') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        // La route renvoie un message d'erreur lisible (ex. e-mail manquant) :
        // on le montre au visiteur plutot qu'un texte generique.
        const corps = await response.json().catch(() => null)
        throw new Error(corps?.error || 'Erreur lors de l\'envoi du message')
      }

      signalerDemande('contact', attribution)
      setIsSuccess(true)
      form.reset()
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
          onClick={() => {
            setIsSuccess(false)
            // Nouveau formulaire, nouvelle fenetre anti-robot.
            setHorodatage(Date.now())
          }}
          className="text-primary hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/*
        Piege a robots : invisible et inatteignable au clavier pour un humain,
        mais un robot qui remplit tous les champs le trouvera. `type="text"` et
        pas `type="hidden"` : beaucoup de robots ignorent les champs caches.
        Pas de `display:none` non plus, qu'ils savent reperer — on le sort de
        l'ecran.
      */}
      <input
        type="text"
        name="piege"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
      />
      {/* Heure d'affichage, comparee cote serveur a l'heure de reception. */}
      <input type="hidden" name="horodatage" value={horodatage} readOnly />
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
          <label htmlFor="objet_id" className="block text-sm font-medium mb-2">
            Objet *
          </label>
          <select
            id="objet_id"
            name="objet_id"
            required
            className="input-field"
          >
            <option value="">Sélectionnez un objet</option>
            {objets.map((objet) => (
              <option key={objet.id} value={objet.id}>
                {objet.libelle}
              </option>
            ))}
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
