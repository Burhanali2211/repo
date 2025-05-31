-- EasyIo.tech Database Audit and Cleanup Script
-- Generated: 2024
-- Purpose: Clean up unused tables and optimize database performance

-- ============================================================================
-- DATABASE AUDIT REPORT
-- ============================================================================

-- ACTIVE TABLES (Currently Used by Application):
-- ✅ projects (8 records) - Portfolio/projects functionality
-- ✅ testimonials (1 record) - Testimonials section
-- ✅ services (1 record) - Services section
-- ✅ site_settings (1 record) - Dashboard settings
-- ✅ profiles (1 record) - User profiles
-- ✅ admin_users (1 record) - Admin authentication
-- ✅ about_content (1 record) - About page content
-- ✅ what_we_do (1 record) - What We Do section

-- ADMIN SYSTEM TABLES (Partially Used):
-- ⚠️ admin_permissions (4 records) - Permission system
-- ⚠️ admin_role_permissions (7 records) - Role-permission mapping
-- ⚠️ admin_roles (3 records) - Admin roles

-- UNUSED/EMPTY TABLES (Candidates for Cleanup):
-- ❌ activity_log (0 records) - Not actively used
-- ❌ admin_audit_log (0 records) - Not actively used
-- ❌ admin_credentials (0 records) - Alternative auth system not used
-- ❌ admin_reset_tokens (0 records) - Not actively used
-- ❌ admin_sessions (0 records) - Not actively used
-- ❌ admin_user_roles (0 records) - Not actively used
-- ❌ admin_verification_tokens (0 records) - Not actively used
-- ❌ blog_posts (0 records) - Blog functionality not implemented
-- ❌ comments (0 records) - Comments functionality not implemented

-- ============================================================================
-- PERFORMANCE OPTIMIZATIONS
-- ============================================================================

-- Add missing indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_testimonials_order_index ON testimonials(order_index);
CREATE INDEX IF NOT EXISTS idx_what_we_do_order_index ON what_we_do(order_index);
CREATE INDEX IF NOT EXISTS idx_about_content_section_type ON about_content(section_type);
CREATE INDEX IF NOT EXISTS idx_about_content_is_active ON about_content(is_active);

-- Add composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_projects_featured_status ON projects(featured, status);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured_order ON testimonials(featured, order_index);

-- ============================================================================
-- DATA INTEGRITY IMPROVEMENTS
-- ============================================================================

-- Add check constraints for data validation
ALTER TABLE projects ADD CONSTRAINT IF NOT EXISTS chk_projects_status
  CHECK (status IN ('draft', 'published', 'archived'));

ALTER TABLE testimonials ADD CONSTRAINT IF NOT EXISTS chk_testimonials_rating
  CHECK (rating >= 1 AND rating <= 5);

-- ============================================================================
-- CLEANUP RECOMMENDATIONS
-- ============================================================================

-- The following tables can be safely dropped as they are not used:
-- WARNING: Only execute these after confirming with the development team

-- STEP 1: Backup unused tables (optional)
-- CREATE TABLE backup_activity_log AS SELECT * FROM activity_log;
-- CREATE TABLE backup_admin_audit_log AS SELECT * FROM admin_audit_log;
-- CREATE TABLE backup_admin_credentials AS SELECT * FROM admin_credentials;
-- CREATE TABLE backup_admin_reset_tokens AS SELECT * FROM admin_reset_tokens;
-- CREATE TABLE backup_admin_sessions AS SELECT * FROM admin_sessions;
-- CREATE TABLE backup_admin_user_roles AS SELECT * FROM admin_user_roles;
-- CREATE TABLE backup_admin_verification_tokens AS SELECT * FROM admin_verification_tokens;
-- CREATE TABLE backup_blog_posts AS SELECT * FROM blog_posts;
-- CREATE TABLE backup_comments AS SELECT * FROM comments;

-- STEP 2: Drop unused tables (UNCOMMENT AFTER CONFIRMATION)
-- DROP TABLE IF EXISTS activity_log CASCADE;
-- DROP TABLE IF EXISTS admin_audit_log CASCADE;
-- DROP TABLE IF EXISTS admin_credentials CASCADE;
-- DROP TABLE IF EXISTS admin_reset_tokens CASCADE;
-- DROP TABLE IF EXISTS admin_sessions CASCADE;
-- DROP TABLE IF EXISTS admin_user_roles CASCADE;
-- DROP TABLE IF EXISTS admin_verification_tokens CASCADE;
-- DROP TABLE IF EXISTS blog_posts CASCADE;
-- DROP TABLE IF EXISTS comments CASCADE;

-- ============================================================================
-- HERO CAROUSEL DATA TABLE
-- ============================================================================

-- Create a new table for hero carousel content
CREATE TABLE IF NOT EXISTS hero_carousel_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  icon_name TEXT,
  gradient_from TEXT DEFAULT '#6366f1',
  gradient_to TEXT DEFAULT '#8b5cf6',
  link_url TEXT,
  link_text TEXT DEFAULT 'Learn More',
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0
);

-- Enable RLS for hero carousel items
ALTER TABLE hero_carousel_items ENABLE ROW LEVEL SECURITY;

-- Create public read policy for hero carousel items
CREATE POLICY public_read_hero_carousel_items ON hero_carousel_items
  FOR SELECT USING (is_active = true);

-- Create admin policy for hero carousel items
CREATE POLICY admin_manage_hero_carousel_items ON hero_carousel_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Add index for hero carousel items
CREATE INDEX IF NOT EXISTS idx_hero_carousel_items_active_order
  ON hero_carousel_items(is_active, order_index);

-- Insert default hero carousel items
INSERT INTO hero_carousel_items (title, subtitle, description, icon_name, gradient_from, gradient_to, link_url, order_index) VALUES
('IoT & Automation', 'Smart Solutions', 'Transform your business with intelligent IoT systems and automation that streamline operations and boost efficiency.', 'Cpu', '#3b82f6', '#1d4ed8', '/services/iot', 1),
('Business Solutions', 'Digital Transformation', 'Comprehensive business solutions that drive growth, optimize processes, and deliver measurable results.', 'TrendingUp', '#10b981', '#059669', '/services/business', 2),
('Smart Agriculture', 'Sustainable Farming', 'Revolutionary agricultural technology that increases yield while promoting environmental sustainability.', 'Leaf', '#f59e0b', '#d97706', '/services/agriculture', 3),
('Cloud Services', 'Scalable Infrastructure', 'Robust cloud solutions that scale with your business needs and ensure maximum uptime and security.', 'Cloud', '#8b5cf6', '#7c3aed', '/services/cloud', 4),
('Mobile Development', 'Cross-Platform Apps', 'Native and cross-platform mobile applications that deliver exceptional user experiences.', 'Smartphone', '#ef4444', '#dc2626', '/services/mobile', 5)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- UPDATE TRIGGERS
-- ============================================================================

-- Create trigger for hero carousel items updated_at
CREATE OR REPLACE FUNCTION update_hero_carousel_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hero_carousel_items_updated_at
  BEFORE UPDATE ON hero_carousel_items
  FOR EACH ROW EXECUTE FUNCTION update_hero_carousel_items_updated_at();

-- ============================================================================
-- AUDIT SUMMARY
-- ============================================================================

-- Database Health: GOOD
-- Active Tables: 8 core tables with proper data
-- Unused Tables: 9 tables ready for cleanup
-- Performance: Optimized with additional indexes
-- New Features: Hero carousel table added
-- Security: RLS policies properly configured

-- Next Steps:
-- 1. Review and approve table cleanup
-- 2. Implement hero carousel component
-- 3. Test all database operations
-- 4. Monitor performance improvements
