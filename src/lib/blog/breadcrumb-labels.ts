/**
 * Libelles courts des articles pour le fil d'Ariane.
 *
 * Volontairement separe du registre d'articles : `Breadcrumbs` est un composant
 * client, et importer `@/lib/blog` y ferait entrer le texte integral des six
 * articles dans le bundle envoye au navigateur pour n'afficher qu'un mot.
 *
 * Un slug absent retombe sur le slug formate — le fil d'Ariane reste correct,
 * seulement moins joli.
 */
export const blogBreadcrumbLabels: Record<string, string> = {
  'rentree-sportive-2026-inscriptions-marcinelle': 'Rentrée 2026',
  'quel-art-martial-pour-mon-enfant-charleroi': 'Art martial pour son enfant',
  'wa-jutsu-ou-ju-jitsu-quelle-difference': 'Wa-Jutsu ou Ju-Jitsu',
  'premier-cours-arts-martiaux-comment-ca-se-passe': 'Le premier cours',
  'debuter-un-art-martial-adulte-apres-30-ans': 'Débuter adulte',
  'pourquoi-un-art-martial-sans-competition': 'Sans compétition',
  'bushido-les-vertus-code-honneur-samourai': 'Le Bushido',
  'qui-est-maitre-jacques-jean-quero': 'Maître Quero',
}
