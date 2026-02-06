-- Wa-Jutsu Charleroi Database Schema
-- Run this in Supabase Studio SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE member_role AS ENUM ('admin', 'practitioner');
CREATE TYPE member_category AS ENUM ('enfant', 'jeune', 'adulte');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue');
CREATE TYPE payment_type AS ENUM ('license', 'subscription');
CREATE TYPE belt_color AS ENUM ('blanche', 'jaune', 'orange', 'verte', 'bleue', 'marron', 'noire', 'violette');
CREATE TYPE registration_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    birth_date DATE,
    address TEXT,
    postal_code TEXT,
    city TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    role member_role DEFAULT 'practitioner',
    category member_category,
    current_belt belt_color DEFAULT 'blanche',
    is_active BOOLEAN DEFAULT true,
    avatar_url TEXT
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type payment_type NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status payment_status DEFAULT 'pending',
    paid_at TIMESTAMPTZ,
    validated_by UUID REFERENCES profiles(id),
    validated_at TIMESTAMPTZ,
    notes TEXT
);

-- Grades history table
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    belt belt_color NOT NULL,
    obtained_at DATE NOT NULL,
    notes TEXT
);

-- Announcements table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES profiles(id),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ
);

-- Contact messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    replied_at TIMESTAMPTZ
);

-- Registrations table (for pre-registrations)
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    birth_date DATE NOT NULL,
    address TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    city TEXT NOT NULL,
    category member_category NOT NULL,
    emergency_contact TEXT NOT NULL,
    emergency_phone TEXT NOT NULL,
    message TEXT,
    status registration_status DEFAULT 'pending',
    processed_at TIMESTAMPTZ,
    processed_by UUID REFERENCES profiles(id)
);

-- Create indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_grades_user_id ON grades(user_id);
CREATE INDEX idx_announcements_published ON announcements(is_published, published_at);
CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX idx_registrations_status ON registrations(status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles"
    ON profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Payments policies
CREATE POLICY "Users can view their own payments"
    ON payments FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Admins can view all payments"
    ON payments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert payments"
    ON payments FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update payments"
    ON payments FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Grades policies
CREATE POLICY "Users can view their own grades"
    ON grades FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Admins can manage grades"
    ON grades FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Announcements policies
CREATE POLICY "Anyone can view published announcements"
    ON announcements FOR SELECT
    USING (is_published = true);

CREATE POLICY "Admins can manage announcements"
    ON announcements FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Contact messages policies (public insert, admin read)
CREATE POLICY "Anyone can insert contact messages"
    ON contact_messages FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
    ON contact_messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update contact messages"
    ON contact_messages FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Registrations policies (public insert, admin read)
CREATE POLICY "Anyone can insert registrations"
    ON registrations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view registrations"
    ON registrations FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update registrations"
    ON registrations FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_announcements_updated_at
    BEFORE UPDATE ON announcements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
