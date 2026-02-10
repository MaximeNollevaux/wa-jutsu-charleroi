# SEO Optimisations - Wa-Jutsu Charleroi

## Date : 2026-02-10

## Resume des optimisations effectuees

### 1. Metadonnees globales (layout.tsx)

- **Title template** : `%s | Wa-Jutsu Charleroi`
- **Description** : Optimisee avec mots-cles locaux (Charleroi, Marcinelle)
- **Keywords** : 15 mots-cles cibles
- **Open Graph** : Configuration complete avec image
- **Twitter Cards** : Summary large image
- **Robots** : Index/follow avec directives Googlebot

### 2. JSON-LD Structured Data

#### Layout principal :
- **SportsClub** : Organisation complete avec horaires, prix, coordonnees GPS
- **LocalBusiness** : Informations locales pour Google Maps
- **WebSite** : Informations du site

#### Pages specifiques :
- **/le-wa-jutsu** : FAQPage (4 questions/reponses)
- **/horaires-tarifs** : Service + Offers + FAQPage
- **/contact** : ContactPage

### 3. Fichiers SEO techniques

- **robots.ts** : Multi-agents, disallow /api/ et /espace-membre/
- **sitemap.ts** : 10 pages principales avec priorites
- **manifest.ts** : PWA ready

### 4. Optimisations par page

| Page | Title optimise | Canonical | JSON-LD |
|------|---------------|-----------|---------|
| / | Wa-Jutsu Charleroi - Club Ju-Jutsu Traditionnel | oui | Org+Local+Website |
| /le-wa-jutsu | Le Wa-Jutsu - Art Martial Traditionnel | oui | FAQPage |
| /le-club | Le Club - Wa-Jutsu Club Asie Marcinelle | oui | - |
| /horaires-tarifs | Horaires & Tarifs - des 8EUR/mois | oui | Service+FAQ |
| /contact | Contact - Wa-Jutsu Club Charleroi | oui | ContactPage |
| /inscription | Inscription - Rejoignez le Club | oui | - |
| /galerie | Galerie Photos | oui | - |

### 5. Composants SEO

- **Breadcrumbs** : Fil d'Ariane avec JSON-LD BreadcrumbList automatique

### 6. Google Analytics

- **Measurement ID** : G-5BT5MVGNHB
- **Implementation** : next/script avec strategy="afterInteractive"

### 7. Performance

- Preconnect : fonts.googleapis.com, fonts.gstatic.com
- DNS prefetch : googletagmanager.com
- Fonts : Roboto + Roboto Condensed via next/font

### 8. Page 404

- Design personnalise theme martial
- Metadata noindex
- Liens vers pages principales

## Mots-cles cibles

### Principaux :
1. ju-jutsu charleroi
2. jujitsu charleroi
3. arts martiaux charleroi
4. self-defense charleroi
5. wa-jutsu

### Secondaires :
- arts martiaux marcinelle
- cours arts martiaux enfants
- dojo charleroi
- club sport charleroi
- self defense femme charleroi

## Prochaines etapes recommandees

1. **Google Search Console** : Soumettre sitemap et verifier indexation
2. **Google Business Profile** : Creer/optimiser la fiche
3. **Backlinks** : Obtenir liens depuis sites locaux (mairie, annuaires sports)
4. **Contenu** : Ajouter blog avec articles optimises SEO
5. **Avis Google** : Encourager les membres a laisser des avis
6. **Images** : Ajouter attributs alt manquants, optimiser poids

## Validation

- [ ] Rich Results Test : https://search.google.com/test/rich-results
- [ ] PageSpeed Insights : https://pagespeed.web.dev
- [ ] Mobile-Friendly Test : https://search.google.com/test/mobile-friendly
