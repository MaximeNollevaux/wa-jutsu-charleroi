# Suggestions d'ameliorations pour Wa-Jutsu Charleroi

Ce document presente les fonctionnalites implementees et des suggestions d'ameliorations futures.

## Fonctionnalites implementees

### Site vitrine
- **Page d'accueil** : Hero, presentation du club, disciplines, tarifs, instructeurs, localisation
- **Le Wa-Jutsu** : Philosophie, techniques (Atemi-Waza, Nage-Waza, etc.), systeme de grades, AEJT
- **Le Club** : Histoire, valeurs, equipe, localisation
- **Horaires & Tarifs** : Planning complet, formules de prix, modalites de paiement
- **Galerie** : Photos des entrainements (a completer avec vos photos)
- **Contact** : Formulaire de contact, coordonnees, carte
- **Inscription** : Formulaire de pre-inscription en ligne

### Espace membre
- **Connexion/Deconnexion** : Authentification securisee via Supabase
- **Tableau de bord pratiquant** :
  - Statut des paiements (licence et cotisation)
  - Annonces du club
  - Historique des paiements
  - Progression des grades
  - Documents utiles

- **Administration** :
  - Vue d'ensemble (statistiques)
  - Gestion des membres
  - Validation des inscriptions
  - Validation des paiements
  - Gestion des messages
  - Gestion des annonces

### SEO & Technique
- robots.txt optimise
- Sitemap dynamique
- Meta tags complets (Open Graph, Twitter)
- Schema.org (a ajouter)
- Mots-cles cibles :
  - ju-jutsu charleroi
  - jujitsu belgique
  - arts martiaux charleroi
  - self-defense charleroi
  - club sport marcinelle

## Suggestions d'ameliorations futures

### Court terme

1. **Systeme de rappels automatiques**
   - Email de rappel 7 jours avant echeance cotisation
   - Email de rappel si paiement en retard
   - Notification push (PWA)

2. **Calendrier des evenements**
   - Stages
   - Passages de grade
   - Evenements speciaux
   - Integration avec Google Calendar

3. **Blog/Actualites**
   - Articles sur le Wa-Jutsu
   - Compte-rendus de stages
   - Interviews de pratiquants

4. **Amelioration SEO**
   - Schema.org LocalBusiness
   - Google My Business
   - Avis Google

### Moyen terme

5. **Systeme de reservation**
   - Reservation de cours d'essai
   - Gestion des places disponibles

6. **Progression detaillee**
   - Liste des techniques par grade
   - Validation des techniques acquises
   - Fiches techniques avec videos

7. **Messagerie interne**
   - Communication admin -> pratiquants
   - Notifications en temps reel

8. **Application mobile (PWA)**
   - Acces hors-ligne
   - Notifications push
   - Installation sur l'ecran d'accueil

### Long terme

9. **E-commerce**
   - Vente de kimonos
   - Equipements
   - Paiement en ligne des cotisations (Stripe)

10. **Statistiques avancees**
    - Frequentation des cours
    - Taux de retention
    - Progression moyenne par grade

11. **Multi-clubs**
    - Gestion de plusieurs clubs AEJT
    - Stages inter-clubs

## Images a ajouter

Pour un rendu optimal du site, ajoutez les images suivantes dans `public/images/` :

| Fichier | Description | Taille recommandee |
|---------|-------------|-------------------|
| hero-bg.jpg | Image hero page d'accueil | 1920x1080 |
| about-training.jpg | Entrainement pour section A propos | 800x1000 |
| self-defense.jpg | Technique self-defense | 600x800 |
| kata.jpg | Kata | 600x800 |
| ne-waza.jpg | Technique au sol | 600x800 |
| nage-waza.jpg | Projection | 600x800 |
| instructor-1.jpg | Photo Didier Nollevaux | 400x300 |
| instructor-2.jpg | Photo Abdelmonaim Magaz | 400x300 |
| wa-jutsu-hero.jpg | Image hero page Wa-Jutsu | 1920x600 |
| club-hero.jpg | Image hero page Club | 1920x600 |
| club-training.jpg | Entrainement groupe | 800x1000 |
| aejt.jpg | Logo/image AEJT | 800x450 |
| cta-bg.jpg | Background CTA | 1920x600 |
| gallery/*.jpg | Photos galerie | 600x600 |

## Configuration Supabase

1. Creer une nouvelle instance Supabase (voir `supabase/schema.sql`)
2. Configurer les domaines :
   - `api.supabase-wajutsu.synara.be`
   - `studio-wajutsu.synara.be`
3. Executer le schema SQL
4. Configurer l'authentification email
5. Creer un premier compte admin

## Variables d'environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://api.supabase-wajutsu.synara.be
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Resend (pour les emails)
RESEND_API_KEY=your-resend-api-key

# Site
NEXT_PUBLIC_SITE_URL=https://wa-jutsu-charleroi.be
```

## Deploiement

1. Creer le repo GitHub : `maximenollevaux/wa-jutsu-charleroi`
2. Configurer les secrets GitHub Actions :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `VPS_HOST`
   - `VPS_USERNAME`
   - `VPS_SSH_KEY`
3. Push le code -> deploiement automatique
4. Configurer DNS : `wa-jutsu-charleroi.be` -> VPS

## Contact

Pour toute question sur l'implementation, contactez Maxime.
