-- Migration: Image Generation Management System
-- Run this in Supabase Studio SQL Editor (https://studio-wajutsu.synara.be)

-- Create enum types for image management
CREATE TYPE image_placeholder_status AS ENUM ('pending', 'generating', 'review', 'approved');
CREATE TYPE image_generation_status AS ENUM ('generated', 'rejected', 'approved');

-- Image placeholders table (tracks where images should go in the site)
CREATE TABLE image_placeholders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    site_id TEXT NOT NULL DEFAULT 'wa-jutsu-charleroi',
    path TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    prompt_initial TEXT NOT NULL,
    prompt_current TEXT,
    status image_placeholder_status DEFAULT 'pending',
    current_image_url TEXT,
    width INTEGER DEFAULT 1200,
    height INTEGER DEFAULT 800,
    UNIQUE(site_id, path)
);

-- Image generations table (history of all generation attempts)
CREATE TABLE image_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    placeholder_id UUID NOT NULL REFERENCES image_placeholders(id) ON DELETE CASCADE,
    prompt_used TEXT NOT NULL,
    feedback TEXT,
    image_url TEXT NOT NULL,
    reference_image_url TEXT,
    status image_generation_status DEFAULT 'generated',
    approved_at TIMESTAMPTZ,
    approved_by UUID REFERENCES profiles(id)
);

-- Create indexes
CREATE INDEX idx_image_placeholders_site ON image_placeholders(site_id);
CREATE INDEX idx_image_placeholders_status ON image_placeholders(status);
CREATE INDEX idx_image_generations_placeholder ON image_generations(placeholder_id);
CREATE INDEX idx_image_generations_status ON image_generations(status);

-- Enable Row Level Security
ALTER TABLE image_placeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_generations ENABLE ROW LEVEL SECURITY;

-- Policies for image_placeholders
CREATE POLICY "Admins can manage image placeholders"
    ON image_placeholders FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Public can view approved placeholders"
    ON image_placeholders FOR SELECT
    USING (status = 'approved');

-- Policies for image_generations
CREATE POLICY "Admins can manage image generations"
    ON image_generations FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Trigger for updated_at
CREATE TRIGGER update_image_placeholders_updated_at
    BEFORE UPDATE ON image_placeholders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
