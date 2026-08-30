-- Origine des demandes recues par les formulaires du site.
--
-- Avant cette migration, une pre-inscription arrivait sans aucune trace de sa
-- provenance : impossible de dire si elle venait d'une annonce payante, d'une
-- recherche Google ou de la page Facebook du club. Une campagne qui ne peut pas
-- etre rattachee a des inscriptions est une campagne qu'on ne peut ni arreter ni
-- augmenter en connaissance de cause.
--
-- Deux formes pour la meme donnee, volontairement :
--   * `attribution` (jsonb) garde tout ce que le navigateur a transmis — gclid,
--     referent, page d'entree — sans imposer un schema fige a chaque nouveau
--     parametre de campagne.
--   * les trois colonnes utm_* sont extraites pour etre lisibles et filtrables
--     directement dans l'interface Supabase et dans l'espace membre, sans avoir
--     a ecrire du JSON dans une clause WHERE.

ALTER TABLE registrations
    ADD COLUMN IF NOT EXISTS attribution JSONB,
    ADD COLUMN IF NOT EXISTS utm_source TEXT,
    ADD COLUMN IF NOT EXISTS utm_medium TEXT,
    ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

ALTER TABLE contact_messages
    ADD COLUMN IF NOT EXISTS attribution JSONB,
    ADD COLUMN IF NOT EXISTS utm_source TEXT,
    ADD COLUMN IF NOT EXISTS utm_medium TEXT,
    ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

-- La question posee en pratique est « combien d'inscriptions la campagne X
-- a-t-elle produites », donc un index sur la campagne, pas sur la source.
CREATE INDEX IF NOT EXISTS idx_registrations_utm_campaign
    ON registrations (utm_campaign)
    WHERE utm_campaign IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_contact_messages_utm_campaign
    ON contact_messages (utm_campaign)
    WHERE utm_campaign IS NOT NULL;

COMMENT ON COLUMN registrations.attribution IS
    'Origine brute de la demande (utm_*, gclid, referrer, landing_page). Alimentee par src/lib/attribution.ts.';
COMMENT ON COLUMN contact_messages.attribution IS
    'Origine brute de la demande (utm_*, gclid, referrer, landing_page). Alimentee par src/lib/attribution.ts.';
