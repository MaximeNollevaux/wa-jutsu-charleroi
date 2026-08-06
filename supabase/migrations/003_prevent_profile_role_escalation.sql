-- Migration: empeche l'escalade de privilege sur public.profiles
-- Run this in Supabase Studio SQL Editor (https://studio-wajutsu.synara.be)
--
-- Contexte : la policy "Users can update their own profile" ne restreint que la
-- ligne (auth.uid() = id) et pas les colonnes. L'application n'utilise que la cle
-- anon : un utilisateur authentifie pouvait donc modifier lui-meme sa colonne
-- role (ou is_active) via PostgREST.

-- 1. WITH CHECK explicite sur la policy (clarte ; le verrouillage des colonnes
--    est assure par le trigger ci-dessous)
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 2. Trigger de garde sur les colonnes sensibles.
--    SECURITY DEFINER : la lecture de profiles ne repasse pas par la RLS
--    (pas de recursion de policy).
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS TRIGGER AS $$
BEGIN
    -- Pas de contexte utilisateur (service_role, migrations, psql) : on laisse passer
    IF auth.uid() IS NULL THEN
        RETURN NEW;
    END IF;

    -- Les administrateurs peuvent gerer les roles et les activations
    IF EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() AND p.role = 'admin'
    ) THEN
        RETURN NEW;
    END IF;

    IF NEW.role IS DISTINCT FROM OLD.role
       OR NEW.is_active IS DISTINCT FROM OLD.is_active THEN
        RAISE EXCEPTION 'Modification du role ou du statut du compte interdite';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS prevent_profile_privilege_escalation_trigger ON public.profiles;
CREATE TRIGGER prevent_profile_privilege_escalation_trigger
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_profile_privilege_escalation();
