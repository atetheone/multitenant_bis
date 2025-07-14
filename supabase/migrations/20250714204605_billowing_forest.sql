/*
  # Authentication Setup Script
  
  This script creates the necessary test users and data for the JefJel marketplace.
  
  ## What this script does:
  1. Creates test users in auth.users (for authentication)
  2. Creates corresponding entries in custom tables
  3. Sets up roles and permissions
  4. Creates basic test data
  
  ## IMPORTANT: 
  You must FIRST create the user in Supabase Dashboard → Authentication → Users
  Email: admin@jeffel.com
  Password: password123
  Email Confirm: ✅ (checked)
*/

-- First, let's create the basic roles if they don't exist
INSERT INTO roles (name, tenant_id) VALUES 
  ('super-admin', 1),
  ('admin', 1),
  ('manager', 1),
  ('delivery', 1),
  ('customer', 1)
ON CONFLICT (name, tenant_id) DO NOTHING;

-- Create basic permissions
INSERT INTO permissions (resource, action, scope) VALUES 
  ('users', 'create', 'tenant'),
  ('users', 'read', 'tenant'),
  ('users', 'update', 'tenant'),
  ('users', 'delete', 'tenant'),
  ('products', 'create', 'tenant'),
  ('products', 'read', 'tenant'),
  ('products', 'update', 'tenant'),
  ('products', 'delete', 'tenant'),
  ('orders', 'read', 'tenant'),
  ('orders', 'update', 'tenant'),
  ('deliveries', 'read', 'tenant'),
  ('deliveries', 'update', 'tenant'),
  ('analytics', 'read', 'tenant'),
  ('settings', 'update', 'tenant')
ON CONFLICT DO NOTHING;

-- Create the main marketplace tenant
INSERT INTO tenants (id, slug, name, domain, description, status, rating, product_count, is_featured) VALUES 
  (1, 'jeffel-marketplace', 'JefJel Marketplace', 'jeffel.com', 'Plateforme e-commerce multilocataire du Sénégal', 'active', 4.8, 0, true)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  domain = EXCLUDED.domain,
  description = EXCLUDED.description;

-- Create test users in the custom users table
-- NOTE: These users must FIRST be created in Supabase Auth Dashboard!
INSERT INTO users (id, username, email, first_name, last_name, password, status) VALUES 
  (1, 'admin.jeffel', 'admin@jeffel.com', 'Super', 'Admin', '', 'active'),
  (2, 'aminata.diallo', 'aminata@example.com', 'Aminata', 'Diallo', '', 'active'),
  (3, 'moussa.sow', 'moussa@example.com', 'Moussa', 'Sow', '', 'active')
ON CONFLICT (email) DO UPDATE SET
  username = EXCLUDED.username,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  status = EXCLUDED.status;

-- Create user profiles
INSERT INTO user_profiles (user_id, phone, avatar_url) VALUES 
  (1, '+221 77 000 00 00', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'),
  (2, '+221 77 123 45 67', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'),
  (3, '+221 77 234 56 78', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600')
ON CONFLICT (user_id) DO UPDATE SET
  phone = EXCLUDED.phone,
  avatar_url = EXCLUDED.avatar_url;

-- Assign roles to users
INSERT INTO user_roles (user_id, role_id) VALUES 
  (1, (SELECT id FROM roles WHERE name = 'super-admin' LIMIT 1)),
  (2, (SELECT id FROM roles WHERE name = 'customer' LIMIT 1)),
  (3, (SELECT id FROM roles WHERE name = 'customer' LIMIT 1))
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Assign users to tenants
INSERT INTO user_tenants (user_id, tenant_id) VALUES 
  (1, 1),
  (2, 1),
  (3, 1)
ON CONFLICT (user_id, tenant_id) DO NOTHING;

-- Create some basic categories
INSERT INTO categories (name, description, tenant_id) VALUES 
  ('Électronique', 'Appareils électroniques et gadgets', 1),
  ('Mode', 'Vêtements et accessoires', 1),
  ('Maison & Cuisine', 'Articles pour la maison', 1),
  ('Santé & Beauté', 'Produits de santé et beauté', 1)
ON CONFLICT DO NOTHING;

-- Create delivery zones
INSERT INTO delivery_zones (tenant_id, name, fee) VALUES 
  (1, 'Dakar Centre', 1500),
  (1, 'Dakar Banlieue', 2000),
  (1, 'Rufisque', 2500),
  (1, 'Thiès', 3500)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully! You can now login with admin@jeffel.com / password123' as message;