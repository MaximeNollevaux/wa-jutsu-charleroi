/**
 * Ce que toutes les pages partagent en matiere de metadonnees.
 *
 * L'image de partage etait declaree une fois, dans le layout racine. En App
 * Router, une page qui redeclare `openGraph` REMPLACE l'objet entier du
 * layout — elle n'en herite pas champ par champ. Neuf pages redeclaraient
 * `openGraph` pour poser leur titre et leur adresse, et perdaient l'image au
 * passage : un lien vers /le-wa-jutsu ou /horaires-tarifs partage sur WhatsApp
 * ou Facebook sortait sans visuel, ce que personne ne voit depuis le site.
 *
 * Meme piege que les titres, corriges le 2026-08-30 : ce qui est declare a deux
 * niveaux ne fusionne pas, il s'ecrase.
 */

export const baseUrl = 'https://wa-jutsu-charleroi.be'

/** L'image servie a Facebook, WhatsApp, LinkedIn et consorts. 1200×630. */
export const IMAGE_PARTAGE = [
  {
    url: `${baseUrl}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: "Wa-Jutsu Club l'Asie — dojo de Marcinelle, Charleroi",
  },
]
