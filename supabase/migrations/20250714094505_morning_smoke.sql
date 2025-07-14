-- Fix Authentication and User Profile Setup
-- This script creates users in both Supabase Auth and custom tables

-- First, let's create the test user in Supabase Auth
-- Note: This needs to be done through Supabase Dashboard -> Authentication -> Add User
-- Or use the Supabase CLI/API, but for now we'll create the custom table entries

-- Clean up any existing test data first
DELETE FROM user_tenants WHERE user_id IN (SELECT id FROM users WHERE email = 'admin@jeffel.com');
DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE email = 'admin@jeffel.com');
DELETE FROM user_profiles WHERE user_id IN (SELECT id FROM users WHERE email = 'admin@jeffel.com');
DELETE FROM users WHERE email = 'admin@jeffel.com';

-- Create the default marketplace tenant if it doesn't exist
INSERT INTO tenants (slug, name, domain, description, status, rating, product_count, is_featured)
VALUES ('jeffel-marketplace', 'JefJel Marketplace', 'jeffel.com', 'La plateforme e-commerce leader au Sénégal', 'active', 4.8, 0, true)
ON CONFLICT (slug) DO NOTHING;

-- Create basic roles if they don't exist
INSERT INTO roles (name, tenant_id) VALUES 
('super_admin', NULL),
('admin', NULL),
('customer', NULL)
ON CONFLICT (name, tenant_id) DO NOTHING;

-- Create the test user in custom tables
-- Note: You MUST first create this user in Supabase Auth Dashboard
INSERT INTO users (username, email, first_name, last_name, password, status)
VALUES ('admin', 'admin@jeffel.com', 'Super', 'Admin', '', 'active');

-- Get the created user ID
DO $$
DECLARE
    user_id_var INTEGER;
    tenant_id_var INTEGER;
    role_id_var INTEGER;
BEGIN
    -- Get user ID
    SELECT id INTO user_id_var FROM users WHERE email = 'admin@jeffel.com';
    
    -- Get tenant ID
    SELECT id INTO tenant_id_var FROM tenants WHERE slug = 'jeffel-marketplace';
    
    -- Get super admin role ID
    SELECT id INTO role_id_var FROM roles WHERE name = 'super_admin';
    
    -- Create user profile
    INSERT INTO user_profiles (user_id, bio, phone, avatar_url, website)
    VALUES (user_id_var, 'Super administrateur de la plateforme JefJel', '+221 77 123 45 67', NULL, 'https://jeffel.com');
    
    -- Assign super admin role
    INSERT INTO user_roles (user_id, role_id)
    VALUES (user_id_var, role_id_var);
    
    -- Associate with marketplace tenant
    INSERT INTO user_tenants (user_id, tenant_id)
    VALUES (user_id_var, tenant_id_var);
END $$;