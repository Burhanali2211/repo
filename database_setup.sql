-- Easyio Technologies Database Schema
-- Comprehensive SQL script for setting up all tables needed for the dashboard

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clear existing tables if they exist (be careful with this in production)
DROP TABLE IF EXISTS about_content CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS what_we_do CASCADE;
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table (for user profiles)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  role TEXT,
  avatar_url TEXT
);

-- Create admin_users table (for dashboard access)
CREATE TABLE admin_users (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT,
  image TEXT,
  technologies TEXT[] DEFAULT '{}',
  client_name TEXT,
  testimonial_text TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  -- Additional fields for enhanced portfolio functionality
  year INTEGER DEFAULT EXTRACT(YEAR FROM NOW()),
  results TEXT,
  project_link TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  gallery_images TEXT[] DEFAULT '{}',
  project_duration TEXT,
  budget_range TEXT,
  team_size INTEGER
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image TEXT
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Create what_we_do table
CREATE TABLE what_we_do (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  link TEXT,
  link_text TEXT
);

-- Create about_content table
CREATE TABLE about_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Create activity_log table for tracking actions
CREATE TABLE activity_log (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  details JSONB
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT false,
  category TEXT,
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT
);

-- Create comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  content TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  target_type TEXT,
  target_id TEXT
);

-- Set up Row Level Security
-- For development, we'll use simplified RLS policies to make testing easier

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE what_we_do ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables
CREATE POLICY public_read_projects ON projects FOR SELECT USING (true);
CREATE POLICY public_read_services ON services FOR SELECT USING (true);
CREATE POLICY public_read_testimonials ON testimonials FOR SELECT USING (true);
CREATE POLICY public_read_what_we_do ON what_we_do FOR SELECT USING (true);
CREATE POLICY public_read_about_content ON about_content FOR SELECT USING (true);
CREATE POLICY public_read_blog_posts ON blog_posts FOR SELECT USING (true);
CREATE POLICY public_read_profiles ON profiles FOR SELECT USING (true);
CREATE POLICY public_read_admin_users ON admin_users FOR SELECT USING (true);
CREATE POLICY public_read_activity_log ON activity_log FOR SELECT USING (true);
CREATE POLICY public_read_comments ON comments FOR SELECT USING (true);

-- Allow authenticated users to perform CRUD operations on all tables (for development)
-- In a production environment, you would restrict these policies further

-- Projects
CREATE POLICY authenticated_insert_projects ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_projects ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_projects ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Services
CREATE POLICY authenticated_insert_services ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_services ON services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_services ON services FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials
CREATE POLICY authenticated_insert_testimonials ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_testimonials ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_testimonials ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- What We Do
CREATE POLICY authenticated_insert_what_we_do ON what_we_do FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_what_we_do ON what_we_do FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_what_we_do ON what_we_do FOR DELETE USING (auth.role() = 'authenticated');

-- About Content
CREATE POLICY authenticated_insert_about_content ON about_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_about_content ON about_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_about_content ON about_content FOR DELETE USING (auth.role() = 'authenticated');

-- Activity Log
CREATE POLICY authenticated_insert_activity_log ON activity_log FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_activity_log ON activity_log FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_activity_log ON activity_log FOR DELETE USING (auth.role() = 'authenticated');

-- Blog Posts
CREATE POLICY authenticated_insert_blog_posts ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_blog_posts ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_blog_posts ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

-- Comments
CREATE POLICY authenticated_insert_comments ON comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY authenticated_update_comments ON comments FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY authenticated_delete_comments ON comments FOR DELETE USING (auth.role() = 'authenticated');

-- In development, also allow full access for anon users (for easier testing)
-- IMPORTANT: These should be removed in production!

-- Projects
CREATE POLICY anon_insert_projects ON projects FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY anon_update_projects ON projects FOR UPDATE USING (auth.role() = 'anon');
CREATE POLICY anon_delete_projects ON projects FOR DELETE USING (auth.role() = 'anon');

-- Services
CREATE POLICY anon_insert_services ON services FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY anon_update_services ON services FOR UPDATE USING (auth.role() = 'anon');
CREATE POLICY anon_delete_services ON services FOR DELETE USING (auth.role() = 'anon');

-- Testimonials
CREATE POLICY anon_insert_testimonials ON testimonials FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY anon_update_testimonials ON testimonials FOR UPDATE USING (auth.role() = 'anon');
CREATE POLICY anon_delete_testimonials ON testimonials FOR DELETE USING (auth.role() = 'anon');

-- What We Do
CREATE POLICY anon_insert_what_we_do ON what_we_do FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY anon_update_what_we_do ON what_we_do FOR UPDATE USING (auth.role() = 'anon');
CREATE POLICY anon_delete_what_we_do ON what_we_do FOR DELETE USING (auth.role() = 'anon');

-- About Content
CREATE POLICY anon_insert_about_content ON about_content FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY anon_update_about_content ON about_content FOR UPDATE USING (auth.role() = 'anon');
CREATE POLICY anon_delete_about_content ON about_content FOR DELETE USING (auth.role() = 'anon');

-- Add sample data for testing
-- Sample admin user
INSERT INTO profiles (id, first_name, last_name, email, role)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Admin',
  'User',
  'admin@example.com',
  'admin'
);

INSERT INTO admin_users (user_id)
VALUES ('00000000-0000-0000-0000-000000000000');

-- Sample project
INSERT INTO projects (title, slug, description, category, technologies, featured, order_index)
VALUES (
  'Sample Project',
  'sample-project',
  'This is a sample project description',
  'Web Development',
  ARRAY['React', 'TypeScript', 'Tailwind CSS'],
  true,
  1
);

-- Sample service
INSERT INTO services (title, slug, description, icon)
VALUES (
  'Web Development',
  'web-development',
  'Custom web application development services',
  'code'
);

-- Sample testimonial
INSERT INTO testimonials (name, role, company, content, rating, featured)
VALUES (
  'John Doe',
  'CEO',
  'Example Corp',
  'Working with this team was a fantastic experience. They delivered on time and exceeded our expectations.',
  5,
  true
);

-- Sample what we do entry
INSERT INTO what_we_do (title, description, icon, order_index)
VALUES (
  'Digital Strategy',
  'We help businesses define their digital presence and strategy for growth',
  'strategy',
  1
);

-- Sample about content
INSERT INTO about_content (title, description, section_type, content_data)
VALUES (
  'Our Mission',
  'To easyio businesses with cutting-edge technology solutions',
  'mission',
  '{"points": ["Innovation", "Excellence", "Integrity"]}'
);

-- Create triggers for updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_what_we_do_updated_at
BEFORE UPDATE ON what_we_do
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_about_content_updated_at
BEFORE UPDATE ON about_content
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Create indexes for faster queries
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_projects_featured ON projects(featured);
