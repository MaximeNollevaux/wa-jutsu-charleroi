/**
 * Identite de ce site aupres de Synara One.
 *
 * Le routeur de formulaires de One (`one.synara.be/api/forms/<jeton>`) decide
 * seul de la destination d'une demande selon son OBJET : devis → affaire du CRM,
 * question → ticket, message → conversation, inscription → newsletter. Le site
 * n'envoie plus la demande « au club » dans son coin, il la depose sur le
 * routeur avec l'objet choisi par le visiteur et l'origine de sa visite.
 *
 * Le jeton est PUBLIC : il ne permet que de DEPOSER une demande, jamais d'en
 * lire d'autres ni de toucher au CRM. Il vit donc dans le code, pas dans une
 * variable d'environnement — le formulaire en a besoin cote navigateur, et un
 * « secret » d'environnement finirait de toute facon en clair dans le bundle.
 */
export const SYNARA_FORM_JETON = 'waj_cfde25be7218c1dda4e79e4eddc0dd90'

/** Base publique du routeur de formulaires de Synara One. */
export const SYNARA_ONE = 'https://one.synara.be'

export type ObjetFormulaire = {
  id: string
  libelle: string
}

/**
 * Objets de secours, utilises tant que le formulaire n'est pas active cote One
 * (le GET rend alors 404). Ce sont les cinq sujets que le site proposait deja :
 * un visiteur ne doit jamais tomber sur un formulaire a liste vide parce que One
 * est injoignable ou pas encore active.
 */
export const OBJETS_SECOURS: ObjetFormulaire[] = [
  { id: 'inscription', libelle: 'Inscription / Essai gratuit' },
  { id: 'information', libelle: "Demande d'information" },
  { id: 'horaires', libelle: 'Horaires des cours' },
  { id: 'tarifs', libelle: 'Tarifs' },
  { id: 'autre', libelle: 'Autre' },
]
