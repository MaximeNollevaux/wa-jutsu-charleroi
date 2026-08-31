'use client'

import { useEffect, useState } from 'react'
import { lireAttribution } from '@/lib/attribution'

const EMBED = 'https://rdv.synara.be/embed/wa-jutsu'

/** Une entree deja absolue est rendue telle quelle ; un chemin est prefixe. */
function absolutiser(entree: string): string {
  if (/^https?:\/\//i.test(entree)) return entree
  return `${window.location.origin}${entree.startsWith('/') ? '' : '/'}${entree}`
}

/**
 * Le calendrier de reservation, servi par BookFlow dans une iframe.
 *
 * L'iframe est construite cote client et pas cote serveur, parce que l'adresse
 * depend de l'origine de la visite : le widget de BookFlow lit `utm_source`,
 * `gclid` et consorts dans SA propre URL — `window.location.search` de
 * l'iframe, jamais celle de la page hote. Une iframe ecrite en dur perd donc
 * l'attribution, et une reservation venue d'une annonce arrive dans l'agenda
 * du club sans qu'on sache quelle campagne l'a payee.
 *
 * L'origine vient de `lireAttribution()`, la meme fonction que les formulaires
 * de contact et d'inscription : elle survit a la navigation interne, ou les
 * parametres ont depuis longtemps disparu de la barre d'adresse.
 */
export function CalendrierReservation() {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const attribution = lireAttribution()
    const url = new URL(EMBED)

    for (const [cle, valeur] of Object.entries(attribution)) {
      // `referrer` et `landing_page` portent des noms differents cote BookFlow,
      // et sont poses juste apres.
      if (cle === 'referrer' || cle === 'landing_page') continue
      url.searchParams.set(cle, valeur)
    }

    // `landing` : ce que BookFlow enregistre comme page d'ou vient la
    // reservation. On lui donne la page d'ENTREE de la visite plutot que
    // `/reserver` — c'est elle qui porte la campagne, et elle dit quelque chose
    // (« il est arrive par /self-defense »). A defaut, la page courante.
    //
    // Le referent, lui, ne sert a rien ici : entre deux domaines, la
    // Referrer-Policy le tronque a « https://wa-jutsu-charleroi.be » et
    // BookFlow verrait seulement que la reservation vient du site du club.
    //
    // Les deux sources ne donnent pas la meme forme : SynaraOrigine renvoie une
    // adresse complete, notre relais en sessionStorage un simple chemin.
    // Prefixer sans regarder produisait « https://siteh<ttps://site/page ».
    const entree = attribution.landing_page ?? window.location.pathname
    url.searchParams.set('landing', absolutiser(entree))

    setSrc(url.toString())
  }, [])

  return (
    <div className="bg-white border border-dark-600 p-1 sm:p-2">
      {src ? (
        <iframe
          src={src}
          title="Réserver un cours d'essai au Wa-Jutsu Club l'Asie"
          loading="lazy"
          className="w-full block"
          style={{ minHeight: 820, border: 0 }}
        />
      ) : (
        <div
          className="flex items-center justify-center text-dark-500"
          style={{ minHeight: 820 }}
        >
          <p>Chargement du calendrier…</p>
        </div>
      )}

      <noscript>
        <div className="p-8 text-center text-dark-700">
          <p className="mb-4">
            Le calendrier a besoin de JavaScript pour s&apos;afficher.
          </p>
          <a
            href="https://rdv.synara.be/book/wa-jutsu"
            className="btn-primary"
            target="_blank"
            rel="noopener"
          >
            Ouvrir le calendrier de réservation
          </a>
        </div>
      </noscript>
    </div>
  )
}
