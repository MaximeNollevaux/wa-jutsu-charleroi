import type { Attribution } from './attribution'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: Gtag
    dataLayer?: unknown[]
  }
}

/**
 * Signale une demande envoyee a Google Analytics 4.
 *
 * `generate_lead` est le nom d'evenement recommande par Google : il est reconnu
 * tel quel par GA4 et peut etre marque « evenement cle », puis importe comme
 * conversion dans Google Ads. Sans lui, une campagne ne peut pas apprendre — elle
 * paie des clics sans jamais savoir lesquels ont produit une inscription.
 *
 * L'appel est silencieux si gtag n'est pas la : le tag est charge en `lazyOnload`
 * et peut etre bloque par une extension. Un formulaire ne doit pas en dependre.
 */
export function signalerDemande(
  type: 'inscription' | 'contact',
  attribution: Attribution = {}
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  try {
    window.gtag('event', 'generate_lead', {
      // Le club ne vend rien en ligne : la valeur sert uniquement a permettre a
      // Google Ads de comparer deux campagnes entre elles.
      currency: 'EUR',
      value: type === 'inscription' ? 20 : 5,
      form_type: type,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
    })
  } catch {
    /* l'analytics ne doit jamais faire echouer un envoi de formulaire */
  }
}
