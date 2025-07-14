-- =====================================================
-- JefJel Marketplace - Complete Database Seeder
-- =====================================================
-- This script populates all tables with initial test data
-- Run this in your Supabase SQL Editor

-- First, let's insert the default marketplace tenant
INSERT INTO tenants (id, slug, name, domain, description, status, rating, logo, product_count, is_featured) VALUES
(1, 'jeffel-marketplace', 'JefJel Marketplace', 'jeffel.com', 'Plateforme e-commerce multilocataire du Sénégal - Le marketplace principal qui héberge tous les vendeurs.', 'active', 4.8, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600', 0, true);

-- Insert additional vendor tenants
INSERT INTO tenants (id, slug, name, domain, description, status, rating, logo, product_count, is_featured) VALUES
(2, 'tech-paradise', 'Tech Paradise', 'tech-paradise.jeffel.com', 'Gadgets technologiques premium et accessoires pour tous vos besoins.', 'active', 4.8, 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600', 0, true),
(3, 'eco-produits', 'Éco Produits', 'eco-produits.jeffel.com', 'Produits durables et écologiques pour les consommateurs conscients.', 'active', 4.6, 'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=600', 0, false),
(4, 'fashion-senegal', 'Fashion Sénégal', 'fashion-senegal.jeffel.com', 'Mode africaine authentique et moderne, créations uniques du Sénégal.', 'active', 4.7, 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600', 0, true);

-- Insert system roles
INSERT INTO roles (id, name, tenant_id) VALUES
(1, 'super-admin', 1),
(2, 'admin', 1),
(3, 'manager', 1),
(4, 'delivery', 1),
(5, 'customer', 1);

-- Insert permissions with proper scopes
INSERT INTO permissions (id, resource, action, tenant_id, scope) VALUES
-- Tenant management (Super Admin only)
(1, 'tenant', 'create', 1, 'all'),
(2, 'tenant', 'read', 1, 'all'),
(3, 'tenant', 'update', 1, 'tenant'),
(4, 'tenant', 'delete', 1, 'all'),

-- User management
(5, 'user', 'create', 1, 'tenant'),
(6, 'user', 'read', 1, 'tenant'),
(7, 'user', 'update', 1, 'tenant'),
(8, 'user', 'delete', 1, 'tenant'),
(9, 'user', 'assign_roles', 1, 'tenant'),

-- Product management
(10, 'product', 'create', 1, 'tenant'),
(11, 'product', 'read', 1, 'tenant'),
(12, 'product', 'update', 1, 'tenant'),
(13, 'product', 'delete', 1, 'tenant'),
(14, 'inventory', 'manage', 1, 'tenant'),

-- Order management
(15, 'order', 'read', 1, 'tenant'),
(16, 'order', 'update', 1, 'tenant'),
(17, 'order', 'cancel', 1, 'tenant'),
(18, 'order', 'refund', 1, 'tenant'),

-- Delivery management
(19, 'delivery', 'read', 1, 'tenant'),
(20, 'delivery', 'assign', 1, 'tenant'),
(21, 'delivery', 'update', 1, 'own'),
(22, 'delivery_zone', 'manage', 1, 'tenant'),

-- Customer management
(23, 'customer', 'read', 1, 'tenant'),
(24, 'customer', 'update', 1, 'tenant'),

-- Analytics and reports
(25, 'analytics', 'read', 1, 'tenant'),
(26, 'report', 'read', 1, 'tenant'),
(27, 'report', 'export', 1, 'tenant'),

-- Settings
(28, 'settings', 'manage', 1, 'tenant'),
(29, 'role', 'manage', 1, 'tenant');

-- Assign permissions to roles
INSERT INTO role_permission (role_id, permission_id) VALUES
-- Super Admin gets all permissions
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9),
(1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18),
(1, 19), (1, 20), (1, 21), (1, 22), (1, 23), (1, 24), (1, 25), (1, 26), (1, 27), (1, 28), (1, 29),

-- Admin gets most permissions except tenant creation/deletion
(2, 2), (2, 3), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9),
(2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15), (2, 16), (2, 17), (2, 18),
(2, 19), (2, 20), (2, 21), (2, 22), (2, 23), (2, 24), (2, 25), (2, 26), (2, 27), (2, 28), (2, 29),

-- Manager gets limited permissions
(3, 11), (3, 15), (3, 23), (3, 25),

-- Delivery gets delivery-specific permissions
(4, 19), (4, 21), (4, 23),

-- Customer gets no special permissions (handled by RLS)
(5, 11);

-- Insert test users
INSERT INTO users (id, username, email, first_name, last_name, password, status) VALUES
(1, 'admin.jeffel', 'admin@jeffel.com', 'Super', 'Admin', '$2b$10$hashedpassword', 'active'),
(2, 'aminata.diallo', 'aminata@example.com', 'Aminata', 'Diallo', '$2b$10$hashedpassword', 'active'),
(3, 'moussa.sow', 'moussa@example.com', 'Moussa', 'Sow', '$2b$10$hashedpassword', 'active'),
(4, 'fatou.ndiaye', 'fatou@example.com', 'Fatou', 'Ndiaye', '$2b$10$hashedpassword', 'active'),
(5, 'marie.martin', 'marie@example.com', 'Marie', 'Martin', '$2b$10$hashedpassword', 'active'),
(6, 'pierre.durand', 'pierre@example.com', 'Pierre', 'Durand', '$2b$10$hashedpassword', 'active'),
(7, 'amadou.ba', 'amadou@example.com', 'Amadou', 'Ba', '$2b$10$hashedpassword', 'active');

-- Insert user profiles
INSERT INTO user_profiles (user_id, phone, avatar_url) VALUES
(1, '+221 77 000 00 00', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'),
(2, '+221 77 123 45 67', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'),
(3, '+221 77 234 56 78', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'),
(4, '+221 77 345 67 89', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600'),
(5, '+221 77 456 78 90', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600'),
(6, '+221 77 567 89 01', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600'),
(7, '+221 77 678 90 12', 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600');

-- Assign roles to users
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), -- Super Admin
(2, 5), -- Customer
(3, 5), -- Customer
(4, 5), -- Customer
(5, 2), -- Admin (Tech Paradise)
(6, 2), -- Admin (Éco Produits)
(7, 4); -- Delivery

-- Assign users to tenants
INSERT INTO user_tenants (user_id, tenant_id) VALUES
(1, 1), -- Super Admin to Marketplace
(2, 1), -- Customer to Marketplace
(3, 1), -- Customer to Marketplace
(4, 1), -- Customer to Marketplace
(5, 2), -- Marie to Tech Paradise
(6, 3), -- Pierre to Éco Produits
(7, 1); -- Delivery to Marketplace

-- Insert categories
INSERT INTO categories (id, name, description, icon, tenant_id) VALUES
(1, 'Électronique', 'Appareils électroniques et gadgets technologiques', 'smartphone', 1),
(2, 'Mode', 'Vêtements et accessoires de mode', 'shirt', 1),
(3, 'Maison & Cuisine', 'Articles pour la maison et la cuisine', 'home', 1),
(4, 'Santé & Beauté', 'Produits de santé et de beauté', 'heart', 1),
(5, 'Sport & Loisirs', 'Équipements sportifs et de loisirs', 'activity', 1),
(6, 'Livres & Éducation', 'Livres et matériel éducatif', 'book', 1);

-- Insert delivery zones
INSERT INTO delivery_zones (id, tenant_id, name, fee) VALUES
(1, 1, 'Dakar Centre', 1500),
(2, 1, 'Dakar Banlieue', 2000),
(3, 1, 'Rufisque', 2500),
(4, 1, 'Thiès', 3500),
(5, 1, 'Saint-Louis', 4000),
(6, 1, 'Kaolack', 3500),
(7, 1, 'Ziguinchor', 5000);

-- Insert sample products
INSERT INTO products (id, name, description, price, sku, is_active, tenant_id, is_marketplace_visible, marketplace_priority, average_rating) VALUES
(1, 'Écouteurs Sans Fil Premium', 'Écouteurs sans fil premium avec réduction de bruit et autonomie de 24 heures.', 129.99, 'ECO-001', true, 2, true, 10, 4.7),
(2, 'Montre Connectée Sport', 'Montre intelligente avec suivi de santé, notifications et résistance à l''eau.', 199.99, 'MON-001', true, 2, true, 9, 4.5),
(3, 'Set Brosses à Dents Bambou', 'Pack de 4 brosses à dents écologiques en bambou avec poils au charbon.', 14.99, 'BRO-001', true, 3, true, 7, 4.8),
(4, 'Sacs à Légumes Réutilisables', 'Set de 8 sacs en filet pour les courses, réduisant les déchets plastiques.', 19.99, 'SAC-001', true, 3, true, 6, 4.6),
(5, 'Haut-parleur Bluetooth', 'Haut-parleur Bluetooth portable avec son 360° et design étanche.', 79.99, 'HP-001', true, 2, true, 8, 4.4),
(6, 'Bouteille en Acier Inoxydable', 'Bouteille isotherme à double paroi qui garde les boissons froides 24h ou chaudes 12h.', 34.99, 'BOU-001', true, 3, true, 5, 4.9),
(7, 'Boubou Traditionnel Homme', 'Boubou traditionnel sénégalais en coton brodé, taille unique.', 89.99, 'BOU-TRA-001', true, 4, true, 8, 4.6),
(8, 'Robe Africaine Femme', 'Robe élégante en wax africain, coupe moderne et traditionnelle.', 75.99, 'ROB-AFR-001', true, 4, true, 7, 4.8);

-- Insert product images
INSERT INTO product_images (id, url, filename, alt_text, is_cover, display_order, product_id) VALUES
(1, 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600', 'ecouteurs-1.jpg', 'Écouteurs sans fil premium', true, 1, 1),
(2, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600', 'montre-1.jpg', 'Montre connectée sport', true, 1, 2),
(3, 'https://images.pexels.com/photos/3737605/pexels-photo-3737605.jpeg?auto=compress&cs=tinysrgb&w=600', 'brosses-1.jpg', 'Set brosses à dents bambou', true, 1, 3),
(4, 'https://images.pexels.com/photos/5217288/pexels-photo-5217288.jpeg?auto=compress&cs=tinysrgb&w=600', 'sacs-1.jpg', 'Sacs à légumes réutilisables', true, 1, 4),
(5, 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600', 'haut-parleur-1.jpg', 'Haut-parleur Bluetooth', true, 1, 5),
(6, 'https://images.pexels.com/photos/1282278/pexels-photo-1282278.jpeg?auto=compress&cs=tinysrgb&w=600', 'bouteille-1.jpg', 'Bouteille en acier inoxydable', true, 1, 6),
(7, 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600', 'boubou-1.jpg', 'Boubou traditionnel homme', true, 1, 7),
(8, 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600', 'robe-1.jpg', 'Robe africaine femme', true, 1, 8);

-- Insert inventory
INSERT INTO inventory (id, product_id, tenant_id, quantity, reorder_point, reorder_quantity, low_stock_threshold, reserved_quantity) VALUES
(1, 1, 2, 50, 10, 100, 15, 5),
(2, 2, 2, 35, 15, 50, 20, 3),
(3, 3, 3, 100, 20, 200, 25, 10),
(4, 4, 3, 75, 15, 150, 20, 8),
(5, 5, 2, 40, 10, 80, 15, 4),
(6, 6, 3, 60, 12, 120, 18, 6),
(7, 7, 4, 25, 5, 50, 10, 2),
(8, 8, 4, 30, 8, 60, 12, 3);

-- Insert sample addresses
INSERT INTO addresses (id, type, address_line1, city, country, tenant_id) VALUES
(1, 'shipping', '123 Rue de la Paix', 'Dakar', 'Sénégal', 1),
(2, 'shipping', '456 Avenue Bourguiba', 'Pikine', 'Sénégal', 1),
(3, 'shipping', '789 Boulevard de la République', 'Rufisque', 'Sénégal', 1);

-- Link users to addresses
INSERT INTO users_addresses (user_id, address_id) VALUES
(2, 1), -- Aminata
(3, 2), -- Moussa
(4, 3); -- Fatou

-- Insert sample orders
INSERT INTO orders (id, user_id, tenant_id, subtotal, delivery_fee, total, address_id, status) VALUES
(1, 2, 2, 329.98, 1500, 331.48, 1, 'delivered'),
(2, 3, 3, 29.98, 2000, 31.98, 2, 'pending'),
(3, 4, 2, 79.99, 2500, 82.49, 3, 'shipped');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 129.99),
(1, 2, 1, 199.99),
(2, 3, 2, 14.99),
(3, 5, 1, 79.99);

-- Update tenant product counts
UPDATE tenants SET product_count = (
  SELECT COUNT(*) FROM products WHERE tenant_id = tenants.id AND is_active = true
);

-- Reset sequences to ensure proper auto-increment
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('tenants_id_seq', (SELECT MAX(id) FROM tenants));
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));
SELECT setval('permissions_id_seq', (SELECT MAX(id) FROM permissions));
SELECT setval('user_profiles_id_seq', (SELECT MAX(id) FROM user_profiles));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
SELECT setval('inventory_id_seq', (SELECT MAX(id) FROM inventory));
SELECT setval('delivery_zones_id_seq', (SELECT MAX(id) FROM delivery_zones));
SELECT setval('addresses_id_seq', (SELECT MAX(id) FROM addresses));
SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders));
SELECT setval('order_items_id_seq', (SELECT MAX(id) FROM order_items));

-- Display summary
SELECT 'Database seeded successfully!' as message;
SELECT 'Users created: ' || COUNT(*) as users_count FROM users;
SELECT 'Products created: ' || COUNT(*) as products_count FROM products;
SELECT 'Tenants created: ' || COUNT(*) as tenants_count FROM tenants;