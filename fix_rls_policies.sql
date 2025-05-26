-- Fix RLS Policies for Supabase
-- This script specifically targets the RLS policy issues causing 403 errors

-- 1. First, let's drop any existing policies that might be conflicting
DROP POLICY IF EXISTS public_read_projects ON projects;
DROP POLICY IF EXISTS public_read_services ON services;
DROP POLICY IF EXISTS public_read_testimonials ON testimonials;
DROP POLICY IF EXISTS public_read_what_we_do ON what_we_do;
DROP POLICY IF EXISTS public_read_about_content ON about_content;

DROP POLICY IF EXISTS authenticated_insert_projects ON projects;
DROP POLICY IF EXISTS authenticated_update_projects ON projects;
DROP POLICY IF EXISTS authenticated_delete_projects ON projects;
DROP POLICY IF EXISTS authenticated_insert_services ON services;
DROP POLICY IF EXISTS authenticated_update_services ON services;
DROP POLICY IF EXISTS authenticated_delete_services ON services;
DROP POLICY IF EXISTS authenticated_insert_testimonials ON testimonials;
DROP POLICY IF EXISTS authenticated_update_testimonials ON testimonials;
DROP POLICY IF EXISTS authenticated_delete_testimonials ON testimonials;
DROP POLICY IF EXISTS authenticated_insert_what_we_do ON what_we_do;
DROP POLICY IF EXISTS authenticated_update_what_we_do ON what_we_do;
DROP POLICY IF EXISTS authenticated_delete_what_we_do ON what_we_do;
DROP POLICY IF EXISTS authenticated_insert_about_content ON about_content;
DROP POLICY IF EXISTS authenticated_update_about_content ON about_content;
DROP POLICY IF EXISTS authenticated_delete_about_content ON about_content;

DROP POLICY IF EXISTS anon_insert_projects ON projects;
DROP POLICY IF EXISTS anon_update_projects ON projects;
DROP POLICY IF EXISTS anon_delete_projects ON projects;
DROP POLICY IF EXISTS anon_insert_services ON services;
DROP POLICY IF EXISTS anon_update_services ON services;
DROP POLICY IF EXISTS anon_delete_services ON services;
DROP POLICY IF EXISTS anon_insert_testimonials ON testimonials;
DROP POLICY IF EXISTS anon_update_testimonials ON testimonials;
DROP POLICY IF EXISTS anon_delete_testimonials ON testimonials;
DROP POLICY IF EXISTS anon_insert_what_we_do ON what_we_do;
DROP POLICY IF EXISTS anon_update_what_we_do ON what_we_do;
DROP POLICY IF EXISTS anon_delete_what_we_do ON what_we_do;
DROP POLICY IF EXISTS anon_insert_about_content ON about_content;
DROP POLICY IF EXISTS anon_update_about_content ON about_content;
DROP POLICY IF EXISTS anon_delete_about_content ON about_content;

-- 2. Now let's create a simple "allow all" policy for each table
-- This is the simplest approach that will fix your immediate problem

-- Projects table
CREATE POLICY allow_all ON projects FOR ALL USING (true);

-- Services table
CREATE POLICY allow_all ON services FOR ALL USING (true);

-- Testimonials table
CREATE POLICY allow_all ON testimonials FOR ALL USING (true);

-- What We Do table
CREATE POLICY allow_all ON what_we_do FOR ALL USING (true);

-- About Content table
CREATE POLICY allow_all ON about_content FOR ALL USING (true);

-- 3. If the tables don't exist yet, let's create them with minimal structure
-- This will ensure your dashboard works even if the full schema hasn't been applied

-- Projects table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image TEXT,
  technologies TEXT[] DEFAULT '{}',
  client_name TEXT,
  testimonial_text TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0
);

-- Services table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image TEXT
);

-- Testimonials table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  avatar TEXT,
  rating INTEGER,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0
);

-- What We Do table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS what_we_do (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  link TEXT,
  link_text TEXT
);

-- About Content table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  section_type TEXT NOT NULL,
  content_data JSONB,
  year TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0
);

-- 4. Make sure RLS is enabled but with our new "allow all" policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE what_we_do ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
