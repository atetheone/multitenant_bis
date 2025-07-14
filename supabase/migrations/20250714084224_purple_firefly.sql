/*
  # JefJel Marketplace - Complete Database Seeder
  
  This script creates:
  1. Initial roles and permissions system
  2. Default marketplace tenant
  3. Sample vendor tenants
  4. Test users in Supabase Auth AND custom tables
  5. Sample products and categories
  6. Sample orders and delivery data
  
  IMPORTANT: This script creates users in Supabase Auth.
  Make sure to run this in your Supabase SQL Editor with proper permissions.
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create function to insert user into auth.users (this simulates user registration)
CREATE OR REPLACE FUNCTION create_auth_user(
  user_email TEXT,
  user_password TEXT DEFAULT 'password123'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
  encrypted_pw TEXT;
BEGIN
  -- Generate UUID for user
  user_id := gen_random_uuid();
  
  -- Simple password hashing (in production, Supabase handles this)
  encrypted_pw := crypt(user_password, gen_salt('bf'));
  
  -- Insert into auth.users table
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    user_id,
    '00000000-0000-0000-0000-000000000000',
    user_email,
    encrypted_pw,
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );
  
  -- Insert into auth.identities
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    user_id,
    format('{"sub":"%s","email":"%s"}', user_id::text, user_email)::jsonb,
    'email',
    NOW(),
    NOW()
  );
  
  RETURN user_id;
END;
$$;

-- Clear existing data (in correct order to handle foreign keys)
TRUNCATE TABLE 
  menu_item_permissions,
  menu_items,
  role_permission,
  user_roles,
  user_tenants,
  permissions,
  roles,
  deliveries,
  delivery_person_zones,
  delivery_persons,
  delivery_zones,
  payments,
  cart_items,
  carts,
  order_items,
  orders,
  users_addresses,
  addresses,
  inventory,
  category_products,
  categories,
  product_images,
  products,
  user_profiles,
  users,
  tenants,
  resources
RESTART IDENTITY CASCADE;

-- Also clear auth tables (be careful with this in production!)
DELETE FROM auth.identities;
DELETE FROM auth.users;

-- 1. CREATE ROLES
INSERT INTO roles (name, tenant_id) VALUES
('super_admin', NULL),
('admin', NULL),
('manager', NULL),
('delivery', NULL),
('customer', NULL);

-- 2. CREATE RESOURCES
INSERT INTO resources (name, description, available_actions, tenant_id) VALUES
('user', 'User management', '["create", "read", "update", "delete"]', NULL),
('product', 'Product management', '["create", "read", "update", "delete"]', NULL),
('order', 'Order management', '["create", "read", "update", "delete"]', NULL),
('tenant', 'Tenant management', '["create", "read", "update", "delete"]', NULL),
('delivery', 'Delivery management', '["create", "read", "update", "delete"]', NULL),
('analytics', 'Analytics access', '["read"]', NULL),
('settings', 'Settings management', '["read", "update"]', NULL);

-- 3. CREATE PERMISSIONS
INSERT INTO permissions (resource, action, scope, tenant_id) VALUES
-- User permissions
('user', 'create', 'all', NULL),
('user', 'read', 'all', NULL),
('user', 'update', 'all', NULL),
('user', 'delete', 'all', NULL),
('user', 'read', 'tenant', NULL),
('user', 'update', 'own', NULL),

-- Product permissions
('product', 'create', 'tenant', NULL),
('product', 'read', 'all', NULL),
('product', 'update', 'tenant', NULL),
('product', 'delete', 'tenant', NULL),

-- Order permissions
('order', 'create', 'all', NULL),
('order', 'read', 'all', NULL),
('order', 'update', 'all', NULL),
('order', 'delete', 'all', NULL),
('order', 'read', 'tenant', NULL),
('order', 'update', 'tenant', NULL),
('order', 'read', 'own', NULL),

-- Tenant permissions
('tenant', 'create', 'all', NULL),
('tenant', 'read', 'all', NULL),
('tenant', 'update', 'all', NULL),
('tenant', 'delete', 'all', NULL),
('tenant', 'update', 'tenant', NULL),

-- Delivery permissions
('delivery', 'create', 'tenant', NULL),
('delivery', 'read', 'tenant', NULL),
('delivery', 'update', 'tenant', NULL),
('delivery', 'read', 'own', NULL),
('delivery', 'update', 'own', NULL),

-- Analytics permissions
('analytics', 'read', 'all', NULL),
('analytics', 'read', 'tenant', NULL),

-- Settings permissions
('settings', 'read', 'all', NULL),
('settings', 'update', 'all', NULL),
('settings', 'read', 'tenant', NULL),
('settings', 'update', 'tenant', NULL);

-- 4. ASSIGN PERMISSIONS TO ROLES
-- Super Admin gets all permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'super_admin';

-- Admin gets tenant-level permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'admin' 
AND p.scope IN ('tenant', 'own');

-- Manager gets limited permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'manager' 
AND (
  (p.resource = 'product' AND p.action IN ('read', 'update')) OR
  (p.resource = 'order' AND p.action IN ('read', 'update')) OR
  (p.resource = 'user' AND p.action = 'read' AND p.scope = 'tenant')
);

-- Delivery gets delivery permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'delivery' 
AND p.resource = 'delivery';

-- Customer gets basic permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'customer' 
AND (
  (p.resource = 'product' AND p.action = 'read') OR
  (p.resource = 'order' AND p.action IN ('create', 'read') AND p.scope = 'own') OR
  (p.resource = 'user' AND p.action = 'update' AND p.scope = 'own')
);

-- 5. CREATE TENANTS
INSERT INTO tenants (slug, name, domain, description, status, rating, product_count, is_featured) VALUES
('jeffel-marketplace', 'JefJel Marketplace', 'jeffel.com', 'La marketplace principale du Sénégal pour tous vos besoins', 'active', 4.8, 0, true),
('tech-paradise', 'Tech Paradise', 'tech-paradise.jeffel.com', 'Votre destination pour les dernières technologies', 'active', 4.5, 0, true),
('eco-produits', 'Éco Produits', 'eco-produits.jeffel.com', 'Produits écologiques et durables pour un avenir meilleur', 'active', 4.7, 0, false),
('fashion-senegal', 'Fashion Sénégal', 'fashion-senegal.jeffel.com', 'Mode africaine authentique et moderne', 'active', 4.3, 0, true);

-- 6. CREATE USERS (both in auth and custom tables)
DO $$
DECLARE
  auth_user_id UUID;
  custom_user_id INT;
  marketplace_tenant_id INT;
  tech_tenant_id INT;
  eco_tenant_id INT;
  super_admin_role_id INT;
  admin_role_id INT;
  customer_role_id INT;
  delivery_role_id INT;
BEGIN
  -- Get tenant and role IDs
  SELECT id INTO marketplace_tenant_id FROM tenants WHERE slug = 'jeffel-marketplace';
  SELECT id INTO tech_tenant_id FROM tenants WHERE slug = 'tech-paradise';
  SELECT id INTO eco_tenant_id FROM tenants WHERE slug = 'eco-produits';
  SELECT id INTO super_admin_role_id FROM roles WHERE name = 'super_admin';
  SELECT id INTO admin_role_id FROM roles WHERE name = 'admin';
  SELECT id INTO customer_role_id FROM roles WHERE name = 'customer';
  SELECT id INTO delivery_role_id FROM roles WHERE name = 'delivery';

  -- Create Super Admin
  auth_user_id := create_auth_user('admin@jeffel.com', 'password123');
  INSERT INTO users (email, username, first_name, last_name, password, status) 
  VALUES ('admin@jeffel.com', 'admin', 'Super', 'Admin', '', 'active')
  RETURNING id INTO custom_user_id;
  
  INSERT INTO user_profiles (user_id, bio, phone) VALUES 
  (custom_user_id, 'Administrateur principal de la plateforme JefJel', '+221 77 123 45 67');
  
  INSERT INTO user_roles (user_id, role_id) VALUES (custom_user_id, super_admin_role_id);
  INSERT INTO user_tenants (user_id, tenant_id) VALUES (custom_user_id, marketplace_tenant_id);

  -- Create sample customers
  auth_user_id := create_auth_user('aminata@example.com', 'password123');
  INSERT INTO users (email, username, first_name, last_name, password, status) 
  VALUES ('aminata@example.com', 'aminata', 'Aminata', 'Diallo', '', 'active')
  RETURNING id INTO custom_user_id;
  
  INSERT INTO user_profiles (user_id, bio, phone) VALUES 
  (custom_user_id, 'Passionnée de mode et de technologie', '+221 77 234 56 78');
  
  INSERT INTO user_roles (user_id, role_id) VALUES (custom_user_id, customer_role_id);
  INSERT INTO user_tenants (user_id, tenant_id) VALUES (custom_user_id, marketplace_tenant_id);

  auth_user_id := create_auth_user('moussa@example.com', 'password123');
  INSERT INTO users (email, username, first_name, last_name, password, status) 
  VALUES ('moussa@example.com', 'moussa', 'Moussa', 'Sow', '', 'active')
  RETURNING id INTO custom_user_id;
  
  INSERT INTO user_profiles (user_id, bio, phone) VALUES 
  (custom_user_id, 'Entrepreneur et amateur de produits écologiques', '+221 77 345 67 89');
  
  INSERT INTO user_roles (user_id, role_id) VALUES (custom_user_id, customer_role_id);
  INSERT INTO user_tenants (user_id, tenant_id) VALUES (custom_user_id, marketplace_tenant_id);

  auth_user_id := create_auth_user('fatou@example.com', 'password123');
  INSERT INTO users (email, username, first_name, last_name, password, status) 
  VALUES ('fatou@example.com', 'fatou', 'Fatou', 'Ba', '', 'active')
  RETURNING id INTO custom_user_id;
  
  INSERT INTO user_profiles (user_id, bio, phone) VALUES 
  (custom_user_id, 'Étudiante en commerce international', '+221 77 456 78 90');
  
  INSERT INTO user_roles (user_id, role_id) VALUES (custom_user_id, customer_role_id);
  INSERT INTO user_tenants (user_id, tenant_id) VALUES (custom_user_id, marketplace_tenant_id);

  -- Create vendor admins
  auth_user_id := create_auth_user('marie@example.com', 'password123');
  INSERT INTO users (email, username, first_name, last_name, password, status) 
  VALUES ('marie@example.com', 'marie', 'Marie', 'Ndiaye', '', 'active')
  RETURNING id INTO custom_user_id;
  
  INSERT INTO user_profiles (user_id, bio, phone) VALUES 
  (custom_user_id, 'Gérante de Tech Paradise', '+221 77 567 89 01');
  
  INSERT INTO user_roles (user_id, role_id) VALUES (custom_user_id, admin_role_id);
  INSERT INTO user_tenants (user_id, tenant_id) VALUES (custom_user_id, tech_tenant_id);

  auth_user_id := create_auth_user('pierre@example.com', 'password123');
  INSERT INTO users (email, username, first_name, last_name, password, status) 
  VALUES ('pierre@example.com', 'pierre', 'Pierre', 'Sarr', '', 'active')
  RETURNING id INTO custom_user_id;
  
  INSERT INTO user_profiles (user_id, bio, phone) VALUES 
  (custom_user_id, 'Fondateur d''Éco Produits', '+221 77 678 90 12');
  
  INSERT INTO user_roles (user_id, role_id) VALUES (custom_user_id, admin_role_id);
  INSERT INTO user_tenants (user_id, tenant_id) VALUES (custom_user_id, eco_tenant_id);

  -- Create delivery person
  auth_user_id := create_auth_user('amadou@example.com', 'password123');
  INSERT INTO users (email, username, first_name, last_name, password, status) 
  VALUES ('amadou@example.com', 'amadou', 'Amadou', 'Fall', '', 'active')
  RETURNING id INTO custom_user_id;
  
  INSERT INTO user_profiles (user_id, bio, phone) VALUES 
  (custom_user_id, 'Livreur professionnel', '+221 77 789 01 23');
  
  INSERT INTO user_roles (user_id, role_id) VALUES (custom_user_id, delivery_role_id);
  INSERT INTO user_tenants (user_id, tenant_id) VALUES (custom_user_id, marketplace_tenant_id);
END $$;

-- 7. CREATE CATEGORIES
INSERT INTO categories (name, description, icon, tenant_id) VALUES
('Électronique', 'Smartphones, ordinateurs, accessoires tech', 'smartphone', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace')),
('Mode', 'Vêtements, chaussures, accessoires', 'shirt', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace')),
('Maison', 'Décoration, meubles, électroménager', 'home', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace')),
('Beauté', 'Cosmétiques, soins, parfums', 'sparkles', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace')),
('Sport', 'Équipements sportifs, vêtements de sport', 'dumbbell', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace')),
('Écologique', 'Produits durables et respectueux de l''environnement', 'leaf', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'));

-- 8. CREATE PRODUCTS
INSERT INTO products (name, description, price, sku, tenant_id, is_marketplace_visible, marketplace_priority, average_rating) VALUES
('iPhone 15 Pro', 'Le dernier smartphone Apple avec puce A17 Pro', 850000, 'IPHONE15PRO', (SELECT id FROM tenants WHERE slug = 'tech-paradise'), true, 10, 4.8),
('MacBook Air M2', 'Ordinateur portable ultra-fin avec puce M2', 1200000, 'MACBOOKAIRM2', (SELECT id FROM tenants WHERE slug = 'tech-paradise'), true, 9, 4.9),
('Samsung Galaxy S24', 'Smartphone Android haut de gamme', 750000, 'GALAXYS24', (SELECT id FROM tenants WHERE slug = 'tech-paradise'), true, 8, 4.6),

('Boubou Traditionnel', 'Boubou sénégalais authentique en bazin', 45000, 'BOUBOU001', (SELECT id FROM tenants WHERE slug = 'fashion-senegal'), true, 7, 4.5),
('Sac en Cuir Artisanal', 'Sac à main en cuir véritable fait main', 35000, 'SACUIR001', (SELECT id FROM tenants WHERE slug = 'fashion-senegal'), true, 6, 4.4),

('Savon Bio Karité', 'Savon naturel au beurre de karité', 2500, 'SAVONBIO001', (SELECT id FROM tenants WHERE slug = 'eco-produits'), true, 5, 4.7),
('Huile de Baobab', 'Huile pure de baobab pour la peau', 8000, 'HUILEBAOBAB', (SELECT id FROM tenants WHERE slug = 'eco-produits'), true, 4, 4.8),
('Panier en Osier', 'Panier artisanal en osier tressé', 15000, 'PANIEROSIER', (SELECT id FROM tenants WHERE slug = 'eco-produits'), true, 3, 4.3);

-- 9. CREATE PRODUCT IMAGES
INSERT INTO product_images (url, filename, alt_text, is_cover, display_order, product_id) VALUES
('https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', 'iphone15pro.jpg', 'iPhone 15 Pro', true, 1, (SELECT id FROM products WHERE sku = 'IPHONE15PRO')),
('https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg', 'macbook.jpg', 'MacBook Air M2', true, 1, (SELECT id FROM products WHERE sku = 'MACBOOKAIRM2')),
('https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg', 'samsung.jpg', 'Samsung Galaxy S24', true, 1, (SELECT id FROM products WHERE sku = 'GALAXYS24')),
('https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg', 'boubou.jpg', 'Boubou Traditionnel', true, 1, (SELECT id FROM products WHERE sku = 'BOUBOU001')),
('https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg', 'sac.jpg', 'Sac en Cuir', true, 1, (SELECT id FROM products WHERE sku = 'SACUIR001')),
('https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg', 'savon.jpg', 'Savon Bio', true, 1, (SELECT id FROM products WHERE sku = 'SAVONBIO001')),
('https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg', 'huile.jpg', 'Huile de Baobab', true, 1, (SELECT id FROM products WHERE sku = 'HUILEBAOBAB')),
('https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg', 'panier.jpg', 'Panier en Osier', true, 1, (SELECT id FROM products WHERE sku = 'PANIEROSIER'));

-- 10. LINK PRODUCTS TO CATEGORIES
INSERT INTO category_products (category_id, product_id) VALUES
((SELECT id FROM categories WHERE name = 'Électronique'), (SELECT id FROM products WHERE sku = 'IPHONE15PRO')),
((SELECT id FROM categories WHERE name = 'Électronique'), (SELECT id FROM products WHERE sku = 'MACBOOKAIRM2')),
((SELECT id FROM categories WHERE name = 'Électronique'), (SELECT id FROM products WHERE sku = 'GALAXYS24')),
((SELECT id FROM categories WHERE name = 'Mode'), (SELECT id FROM products WHERE sku = 'BOUBOU001')),
((SELECT id FROM categories WHERE name = 'Mode'), (SELECT id FROM products WHERE sku = 'SACUIR001')),
((SELECT id FROM categories WHERE name = 'Écologique'), (SELECT id FROM products WHERE sku = 'SAVONBIO001')),
((SELECT id FROM categories WHERE name = 'Écologique'), (SELECT id FROM products WHERE sku = 'HUILEBAOBAB')),
((SELECT id FROM categories WHERE name = 'Écologique'), (SELECT id FROM products WHERE sku = 'PANIEROSIER'));

-- 11. CREATE INVENTORY
INSERT INTO inventory (product_id, tenant_id, quantity, reorder_point, reorder_quantity, low_stock_threshold) VALUES
((SELECT id FROM products WHERE sku = 'IPHONE15PRO'), (SELECT id FROM tenants WHERE slug = 'tech-paradise'), 25, 5, 20, 10),
((SELECT id FROM products WHERE sku = 'MACBOOKAIRM2'), (SELECT id FROM tenants WHERE slug = 'tech-paradise'), 15, 3, 10, 5),
((SELECT id FROM products WHERE sku = 'GALAXYS24'), (SELECT id FROM tenants WHERE slug = 'tech-paradise'), 30, 8, 25, 15),
((SELECT id FROM products WHERE sku = 'BOUBOU001'), (SELECT id FROM tenants WHERE slug = 'fashion-senegal'), 50, 10, 30, 20),
((SELECT id FROM products WHERE sku = 'SACUIR001'), (SELECT id FROM tenants WHERE slug = 'fashion-senegal'), 20, 5, 15, 8),
((SELECT id FROM products WHERE sku = 'SAVONBIO001'), (SELECT id FROM tenants WHERE slug = 'eco-produits'), 100, 20, 50, 30),
((SELECT id FROM products WHERE sku = 'HUILEBAOBAB'), (SELECT id FROM tenants WHERE slug = 'eco-produits'), 40, 10, 25, 15),
((SELECT id FROM products WHERE sku = 'PANIEROSIER'), (SELECT id FROM tenants WHERE slug = 'eco-produits'), 15, 3, 10, 5);

-- 12. CREATE DELIVERY ZONES
INSERT INTO delivery_zones (tenant_id, name, fee) VALUES
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Dakar Centre', 2000),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Dakar Banlieue', 3000),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Thiès', 5000),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Saint-Louis', 8000),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Kaolack', 7000),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Ziguinchor', 12000),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Tambacounda', 15000);

-- 13. CREATE ADDRESSES
INSERT INTO addresses (type, address_line1, city, country, postal_code, phone, tenant_id, zone_id) VALUES
('shipping', 'Rue 10 x Rue 11, Médina', 'Dakar', 'Sénégal', '10200', '+221 77 234 56 78', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), (SELECT id FROM delivery_zones WHERE name = 'Dakar Centre')),
('shipping', 'Cité Keur Gorgui, Lot 45', 'Dakar', 'Sénégal', '10700', '+221 77 345 67 89', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), (SELECT id FROM delivery_zones WHERE name = 'Dakar Banlieue')),
('shipping', 'Quartier Résidentiel, Villa 12', 'Dakar', 'Sénégal', '10400', '+221 77 456 78 90', (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), (SELECT id FROM delivery_zones WHERE name = 'Dakar Centre'));

-- 14. LINK USERS TO ADDRESSES
INSERT INTO users_addresses (user_id, address_id) VALUES
((SELECT id FROM users WHERE email = 'aminata@example.com'), (SELECT id FROM addresses WHERE address_line1 = 'Rue 10 x Rue 11, Médina')),
((SELECT id FROM users WHERE email = 'moussa@example.com'), (SELECT id FROM addresses WHERE address_line1 = 'Cité Keur Gorgui, Lot 45')),
((SELECT id FROM users WHERE email = 'fatou@example.com'), (SELECT id FROM addresses WHERE address_line1 = 'Quartier Résidentiel, Villa 12'));

-- 15. CREATE DELIVERY PERSONS
INSERT INTO delivery_persons (
  user_id, tenant_id, vehicle_type, vehicle_plate_number, vehicle_model, 
  vehicle_year, license_number, license_expiry, total_deliveries, 
  completed_deliveries, average_delivery_time, rating
) VALUES
(
  (SELECT id FROM users WHERE email = 'amadou@example.com'),
  (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'),
  'motorcycle',
  'DK-2024-A-1234',
  'Yamaha XTZ 125',
  2023,
  'LIC123456789',
  '2025-12-31',
  45,
  42,
  25.5,
  4.6
);

-- 16. ASSIGN DELIVERY ZONES TO DELIVERY PERSON
INSERT INTO delivery_person_zones (delivery_person_id, zone_id) VALUES
((SELECT id FROM delivery_persons WHERE user_id = (SELECT id FROM users WHERE email = 'amadou@example.com')), (SELECT id FROM delivery_zones WHERE name = 'Dakar Centre')),
((SELECT id FROM delivery_persons WHERE user_id = (SELECT id FROM users WHERE email = 'amadou@example.com')), (SELECT id FROM delivery_zones WHERE name = 'Dakar Banlieue'));

-- 17. CREATE SAMPLE ORDERS
INSERT INTO orders (user_id, tenant_id, payment_method, subtotal, delivery_fee, total, address_id, status) VALUES
((SELECT id FROM users WHERE email = 'aminata@example.com'), (SELECT id FROM tenants WHERE slug = 'tech-paradise'), 'card', 850000, 2000, 852000, (SELECT id FROM addresses WHERE address_line1 = 'Rue 10 x Rue 11, Médina'), 'delivered'),
((SELECT id FROM users WHERE email = 'moussa@example.com'), (SELECT id FROM tenants WHERE slug = 'eco-produits'), 'cash', 25500, 3000, 28500, (SELECT id FROM addresses WHERE address_line1 = 'Cité Keur Gorgui, Lot 45'), 'processing'),
((SELECT id FROM users WHERE email = 'fatou@example.com'), (SELECT id FROM tenants WHERE slug = 'fashion-senegal'), 'mobile_money', 45000, 2000, 47000, (SELECT id FROM addresses WHERE address_line1 = 'Quartier Résidentiel, Villa 12'), 'shipped');

-- 18. CREATE ORDER ITEMS
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, (SELECT id FROM products WHERE sku = 'IPHONE15PRO'), 1, 850000),
(2, (SELECT id FROM products WHERE sku = 'SAVONBIO001'), 10, 2500),
(2, (SELECT id FROM products WHERE sku = 'PANIEROSIER'), 1, 15000),
(3, (SELECT id FROM products WHERE sku = 'BOUBOU001'), 1, 45000);

-- 19. CREATE DELIVERIES
INSERT INTO deliveries (order_id, delivery_person_id, assigned_at, picked_at, delivered_at) VALUES
(1, (SELECT id FROM delivery_persons WHERE user_id = (SELECT id FROM users WHERE email = 'amadou@example.com')), NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '30 minutes', NOW() - INTERVAL '1 day'),
(3, (SELECT id FROM delivery_persons WHERE user_id = (SELECT id FROM users WHERE email = 'amadou@example.com')), NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '45 minutes', NULL);

-- 20. CREATE PAYMENTS
INSERT INTO payments (order_id, payment_method, status, amount, transaction_id) VALUES
(1, 'card', 'success', 852000, 'TXN_001_2024'),
(2, 'cash', 'pending', 28500, NULL),
(3, 'mobile_money', 'success', 47000, 'MM_003_2024');

-- Update tenant product counts
UPDATE tenants SET product_count = (
  SELECT COUNT(*) FROM products WHERE tenant_id = tenants.id AND is_active = true
);

-- Clean up the temporary function
DROP FUNCTION IF EXISTS create_auth_user(TEXT, TEXT);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Database seeded successfully!';
  RAISE NOTICE 'Test accounts created:';
  RAISE NOTICE '- Super Admin: admin@jeffel.com / password123';
  RAISE NOTICE '- Customer: aminata@example.com / password123';
  RAISE NOTICE '- Customer: moussa@example.com / password123';
  RAISE NOTICE '- Customer: fatou@example.com / password123';
  RAISE NOTICE '- Vendor Admin: marie@example.com / password123';
  RAISE NOTICE '- Vendor Admin: pierre@example.com / password123';
  RAISE NOTICE '- Delivery: amadou@example.com / password123';
END $$;