-- Migration: Add tags column to image_placeholders
-- Run this in Supabase Studio SQL Editor

-- Add tags column (array of text)
ALTER TABLE image_placeholders ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create index for tag searching
CREATE INDEX IF NOT EXISTS idx_image_placeholders_tags ON image_placeholders USING GIN (tags);
