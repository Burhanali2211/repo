-- Create site_settings table for comprehensive website configuration
DROP TABLE IF EXISTS site_settings CASCADE;

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Basic Site Information
  site_name TEXT NOT NULL DEFAULT 'EasyIo.tech',
  site_tagline TEXT DEFAULT 'Simplifying Technology',
  site_description TEXT,

  -- Dual Logo System
  site_logo TEXT, -- Fallback/universal logo
  site_logo_light TEXT, -- Logo for light themes (dark logo on transparent)
  site_logo_dark TEXT, -- Logo for dark themes (light logo on transparent)
  site_favicon TEXT,

  -- Advanced Theme Colors
  primary_color TEXT DEFAULT '#2563EB',
  secondary_color TEXT DEFAULT '#4F46E5',
  accent_color TEXT DEFAULT '#10B981',
  background_color TEXT DEFAULT '#FFFFFF',
  background_color_dark TEXT DEFAULT '#1F2937',
  text_color TEXT DEFAULT '#1F2937',
  text_color_dark TEXT DEFAULT '#F9FAFB',
  border_color TEXT DEFAULT '#E5E7EB',
  border_color_dark TEXT DEFAULT '#374151',

  -- Typography Settings
  font_family TEXT DEFAULT 'Inter',
  font_size TEXT DEFAULT '16',
  line_height TEXT DEFAULT '1.6',
  font_weight TEXT DEFAULT '400',

  -- Contact Information
  contact_email TEXT,
  contact_phone TEXT,
  contact_phone_secondary TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_email TEXT,
  address TEXT,
  address_line_2 TEXT,
  city TEXT,
  state_province TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'United States',
  business_hours JSONB DEFAULT '{}',
  timezone TEXT DEFAULT 'America/New_York',
  social_links JSONB DEFAULT '{}',

  -- Map and Location
  map_latitude DECIMAL(10, 8),
  map_longitude DECIMAL(11, 8),
  map_zoom_level INTEGER DEFAULT 15,
  map_embed_url TEXT,
  location_description TEXT,

  -- Additional Contact Settings
  contact_form_title TEXT DEFAULT 'Get In Touch',
  contact_form_subtitle TEXT DEFAULT 'We''d love to hear from you',
  response_time_promise TEXT DEFAULT 'We respond within 24 hours',
  office_hours_display TEXT,
  contact_cta_text TEXT DEFAULT 'Contact Us Today',

  -- SEO & Analytics
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  google_analytics_id TEXT,
  google_tag_manager_id TEXT,
  facebook_pixel_id TEXT,

  -- Custom Code & Styling
  custom_css TEXT,
  header_scripts TEXT,
  footer_scripts TEXT,

  -- System Settings
  footer_text TEXT,
  is_maintenance_mode BOOLEAN DEFAULT false,
  maintenance_message TEXT
);

-- Only one row should exist in this table - create default settings
INSERT INTO site_settings (
  site_name,
  site_tagline,
  site_description,
  site_logo,
  contact_email,
  contact_phone,
  address,
  city,
  state_province,
  postal_code,
  country,
  map_latitude,
  map_longitude,
  map_embed_url,
  location_description,
  meta_title,
  meta_description,
  footer_text,
  business_hours,
  social_links
) VALUES (
  'EasyIo.tech',
  'Simplifying Technology',
  'Founded in 2023, EasyIo.tech simplifies technology to make it more accessible, sustainable, and meaningful. From IoT to Digital transformation, we''re your creative tech partner.',
  '/logo.svg',
  'hello@easyio.tech',
  '+1 (555) 123-4567',
  '123 Innovation Drive',
  'Tech Valley',
  'California',
  '94043',
  'United States',
  37.4419,
  -122.1430,
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639!2d-122.1430!3d37.4419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI2JzMwLjgiTiAxMjLCsDA4JzM0LjgiVw!5e0!3m2!1sen!2sus!4v1234567890',
  'Located in the heart of Silicon Valley, our office is easily accessible and designed for innovation.',
  'EasyIo.tech - Simplifying Technology',
  'Founded in 2023, EasyIo.tech simplifies technology to make it more accessible, sustainable, and meaningful. From IoT to Digital transformation, we''re your creative tech partner.',
  '© 2024 EasyIo.tech. All rights reserved.',
  '{
    "monday": {"open": "09:00", "close": "17:00", "closed": false},
    "tuesday": {"open": "09:00", "close": "17:00", "closed": false},
    "wednesday": {"open": "09:00", "close": "17:00", "closed": false},
    "thursday": {"open": "09:00", "close": "17:00", "closed": false},
    "friday": {"open": "09:00", "close": "17:00", "closed": false},
    "saturday": {"open": "10:00", "close": "14:00", "closed": false},
    "sunday": {"open": "10:00", "close": "14:00", "closed": true}
  }'::jsonb,
  '{
    "facebook": "https://facebook.com/easyiotech",
    "twitter": "https://twitter.com/easyiotech",
    "linkedin": "https://linkedin.com/company/easyiotech",
    "instagram": "https://instagram.com/easyiotech",
    "github": "https://github.com/easyiotech"
  }'::jsonb
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
