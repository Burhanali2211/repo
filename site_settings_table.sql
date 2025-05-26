-- Create site_settings table for essential website configuration
DROP TABLE IF EXISTS site_settings CASCADE;

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  site_name TEXT NOT NULL DEFAULT 'Internet Identity Hub',
  site_logo TEXT,
  site_favicon TEXT,
  primary_color TEXT DEFAULT '#2563EB',
  secondary_color TEXT DEFAULT '#4F46E5',
  contact_email TEXT,
  contact_phone TEXT,
  social_links JSONB DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  footer_text TEXT,
  header_scripts TEXT,
  footer_scripts TEXT,
  is_maintenance_mode BOOLEAN DEFAULT false,
  maintenance_message TEXT
);

-- Only one row should exist in this table - create default settings
INSERT INTO site_settings (
  site_name, 
  site_logo, 
  contact_email, 
  meta_title, 
  meta_description, 
  footer_text
) VALUES (
  'Internet Identity Hub', 
  '/logo.svg', 
  'contact@example.com', 
  'Internet Identity Hub - Digital Identity Solutions', 
  'Providing cutting-edge digital identity solutions for modern businesses', 
  '© 2023-2024 Internet Identity Hub. All rights reserved.'
);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create public read policy for site_settings
CREATE POLICY public_read_site_settings ON site_settings FOR SELECT USING (true);

-- Allow authenticated users to perform CRUD operations
CREATE POLICY authenticated_insert_site_settings ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_site_settings ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_site_settings ON site_settings FOR DELETE USING (auth.role() = 'authenticated');

-- In development, also allow anon access
CREATE POLICY anon_insert_site_settings ON site_settings FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY anon_update_site_settings ON site_settings FOR UPDATE USING (auth.role() = 'anon');
CREATE POLICY anon_delete_site_settings ON site_settings FOR DELETE USING (auth.role() = 'anon');

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
