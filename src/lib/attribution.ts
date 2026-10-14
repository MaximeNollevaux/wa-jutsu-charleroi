/**
 * Origine d'une demande envoyee par un formulaire du site.
 *
 * Le probleme resolu : un visiteur clique une annonce et arrive sur `/?utm_source=google…`,
 * puis navigue vers `/inscription`. A ce moment la, les parametres ont disparu de
 * l'URL, et la demande arrivait au club sans aucune trace de sa provenance — donc
 * impossible de savoir quelle campagne paie reellement des inscriptions.
 *
 * Trois sources, dans cet ordre :
 *
 * 1. `window.SynaraOrigine` — le script `one.synara.be/origine.js` deja charge en
 *    `beforeInteractive` dans le layout. C'est la source de verite : il gere le
 *    premier et le dernier contact, et il est soumis au consentement marketing.
 *    Ne pas le doubler : `getOrigineDesConversions` cote Synara lit ces memes donnees.
 * 2. Un relais en `sessionStorage` — necessaire parce que si le consentement
 *    marketing est refuse, SynaraOrigine n'ecrit rien, et l'attribution serait
 *    perdue des la deuxieme page. Le relais ne vit que le temps de l'onglet et ne
 *    sert qu'a acheminer l'origine de la visite en cours jusqu'au formulaire que
 *    le visiteur choisit d'envoyer. Il n'est ni lu ni ecrit ailleurs.
 * 3. L'URL courante — le cas ou le visiteur atterrit directement sur la page du
 *    formulaire avec les parametres.
 */

const CHAMPS_UTM = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

const CHAMPS_CLIC = [
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'ttclid',
  // Identifiants de clic LinkedIn et Twitter/X : meme role que les autres.
  'li_fat_id',
  'twclid',
] as const

/** Marqueur de parrainage generique (`?ref=`), courant sur les liens partages. */
const CHAMPS_REF = ['ref'] as const

const CLE_RELAIS = 'wj_origine_visite'

export type Attribution = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  fbclid?: string
  msclkid?: string
  ttclid?: string
  li_fat_id?: string
  twclid?: string
  /** Marqueur de parrainage generique. */
  ref?: string
  /** Referent externe, uniquement quand aucun marqueur de campagne n'est present. */
  referrer?: string
  /** Page d'entree sur le site pour cette visite. */
  landing_page?: string
  /** Page d'arrivee du visiteur, sous le nom attendu par Synara One (2000 signes). */
  landing_url?: string
}

type SynaraOrigine = {
  parametres?: () => Record<string, string> | undefined
  premier?: () => Record<string, string> | undefined
  dernier?: () => Record<string, string> | undefined
}

declare global {
  interface Window {
    SynaraOrigine?: SynaraOrigine
  }
}

/**
 * Cles que SynaraOrigine nomme autrement que nous. Verifie en production le
 * 2026-08-30 : `dernier()` renvoie `landing`, pas `landing_page`. Sans cet alias
 * la page d'entree etait silencieusement jetee par le filtre.
 *
 * `landing` alimente DEUX champs : `landing_url`, que le routeur de formulaires
 * de Synara One attend, et `landing_page`, sous lequel le calendrier de
 * reservation la lit depuis plus longtemps.
 */
const ALIAS: Record<string, (keyof Attribution)[]> = {
  landing: ['landing_page', 'landing_url'],
  referer: ['referrer'],
}

/**
 * Ne garde que les cles connues et non vides. Le filtre sert deux fois : il evite
 * d'envoyer du bruit au club — `parametres()` renvoie aussi les drapeaux de
 * consentement, qui n'ont rien a faire dans une fiche d'inscription — et il borne
 * ce qu'un tiers peut pousser dans la base via le formulaire.
 */
function nettoyer(source: Record<string, unknown> | undefined | null): Attribution {
  if (!source) return {}

  const resultat: Attribution = {}
  const cles = [
    ...CHAMPS_UTM,
    ...CHAMPS_CLIC,
    ...CHAMPS_REF,
    'referrer',
    'landing_page',
    'landing_url',
  ] as const

  const retenir = (cle: keyof Attribution, valeur: unknown) => {
    if (typeof valeur !== 'string' || !valeur.trim()) return
    // Une valeur de campagne manipulee peut etre arbitrairement longue : on la
    // borne a 200 signes, comme le veut le contrat Synara One. La page
    // d'arrivee, elle, est bornee a 2000 signes par `avecLanding`.
    if (resultat[cle] === undefined) resultat[cle] = valeur.trim().slice(0, 200)
  }

  for (const cle of cles) retenir(cle, source[cle])
  for (const [alias, clesCibles] of Object.entries(ALIAS)) {
    for (const cle of clesCibles) retenir(cle, source[alias])
  }

  return resultat
}

function estVide(attribution: Attribution): boolean {
  return Object.keys(attribution).length === 0
}

/**
 * A appeler cote serveur sur ce que le formulaire a envoye. L'objet vient du
 * navigateur : n'importe qui peut poster un `utm_campaign` de 4 Mo ou une cle
 * inattendue. On ne garde que les champs connus, bornes.
 */
export function normaliserAttribution(brut: unknown): Attribution {
  if (!brut || typeof brut !== 'object' || Array.isArray(brut)) return {}
  return nettoyer(brut as Record<string, unknown>)
}

/** Lit les marqueurs presents dans l'URL passee. */
function depuisUrl(url: string): Attribution {
  let params: URLSearchParams
  try {
    params = new URL(url).searchParams
  } catch {
    return {}
  }

  const brut: Record<string, string> = {}
  for (const cle of [...CHAMPS_UTM, ...CHAMPS_CLIC]) {
    const valeur = params.get(cle) || params.get(`premier_${cle}`)
    if (valeur) brut[cle] = valeur
  }

  return nettoyer(brut)
}

/**
 * A appeler une fois au chargement de chaque page. Si la page courante porte des
 * marqueurs de campagne, ils deviennent l'origine de la visite ; sinon on ne
 * touche a rien, pour ne pas ecraser l'origine par une navigation interne.
 */
export function memoriserOrigineVisite(): void {
  if (typeof window === 'undefined') return

  const depuisPage = depuisUrl(window.location.href)

  if (estVide(depuisPage)) {
    // Aucun marqueur : on n'enregistre le referent externe que s'il n'y a pas
    // deja une origine pour cette visite, et que le referent n'est pas le site.
    if (lireRelais()) return

    const referrer = document.referrer
    if (!referrer) return
    try {
      if (new URL(referrer).host === window.location.host) return
    } catch {
      return
    }

    ecrireRelais({ referrer, landing_page: window.location.pathname })
    return
  }

  ecrireRelais({ ...depuisPage, landing_page: window.location.pathname })
}

function lireRelais(): Attribution | null {
  try {
    const brut = window.sessionStorage.getItem(CLE_RELAIS)
    if (!brut) return null
    const parse = nettoyer(JSON.parse(brut))
    return estVide(parse) ? null : parse
  } catch {
    // sessionStorage indisponible (navigation privee stricte, stockage bloque) :
    // l'attribution est degradee, jamais bloquante.
    return null
  }
}

function ecrireRelais(attribution: Attribution): void {
  try {
    window.sessionStorage.setItem(CLE_RELAIS, JSON.stringify(attribution))
  } catch {
    /* voir lireRelais */
  }
}

/**
 * La page d'entree telle que SynaraOrigine la nomme (`landing`), bornee a 2000
 * signes comme le veut le routeur de formulaires de Synara One.
 */
function landingDe(source: Record<string, unknown> | undefined | null): string | undefined {
  if (!source) return undefined
  const valeur = source['landing'] ?? source['landing_url'] ?? source['landing_page']
  if (typeof valeur !== 'string' || !valeur.trim()) return undefined
  return valeur.trim().slice(0, 2000)
}

/**
 * Pose `landing_url` (nom attendu par One, 2000 signes) sur une origine. On
 * garde aussi `landing_page`, sous lequel le calendrier de reservation la lit
 * depuis plus longtemps : renommer casserait son attribution.
 */
function avecLanding(attribution: Attribution, landing: string | undefined): Attribution {
  // Le relais memorise un simple chemin (« /self-defense ») ; SynaraOrigine, une
  // adresse complete. One attend une page d'arrivee : on rend le chemin absolu.
  let adresse = landing?.trim()
  if (adresse && adresse.startsWith('/')) {
    adresse = `${window.location.origin}${adresse}`
  }
  return {
    ...attribution,
    landing_url: (adresse || window.location.href).slice(0, 2000),
  }
}

/**
 * Origine a joindre a une demande. Rend `undefined` quand le visiteur n'a laisse
 * aucun marqueur (mesure marketing refusee ou arrivee directe) : on ne transmet
 * alors rien plutot qu'un objet vide, comme le veut le contrat Synara One. Un
 * formulaire ne doit jamais echouer parce que l'attribution est indisponible.
 */
export function lireAttribution(): Attribution | undefined {
  if (typeof window === 'undefined') return undefined

  const synara = window.SynaraOrigine
  if (synara) {
    for (const lecture of [synara.dernier, synara.parametres, synara.premier]) {
      if (typeof lecture !== 'function') continue
      try {
        const brut = lecture.call(synara)
        const valeur = nettoyer(brut)
        if (!estVide(valeur)) return avecLanding(valeur, landingDe(brut))
      } catch {
        /* le script tiers ne doit jamais casser l'envoi du formulaire */
      }
    }
  }

  const relais = lireRelais()
  if (relais) return avecLanding(relais, relais.landing_page)

  const depuisPage = depuisUrl(window.location.href)
  if (!estVide(depuisPage)) return avecLanding(depuisPage, window.location.href)

  return undefined
}

/**
 * Resume lisible, pour l'email envoye au club. « google / cpc — rentree-2026 »
 * dit immediatement d'ou vient la demande ; un objet JSON, non.
 */
export function resumerAttribution(attribution: Attribution): string {
  if (estVide(attribution)) return 'Origine inconnue'

  const source = attribution.utm_source ?? (attribution.gclid ? 'google' : null)
  const support = attribution.utm_medium ?? (attribution.gclid ? 'cpc' : null)

  const morceaux: string[] = []
  if (source) morceaux.push(support ? `${source} / ${support}` : source)
  if (attribution.utm_campaign) morceaux.push(attribution.utm_campaign)
  if (!morceaux.length && attribution.referrer) morceaux.push(attribution.referrer)

  return morceaux.length ? morceaux.join(' — ') : 'Origine inconnue'
}
