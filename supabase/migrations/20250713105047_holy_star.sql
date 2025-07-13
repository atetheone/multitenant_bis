/*
  # Données initiales pour la base de données

  1. Tenant marketplace principal
  2. Rôles système de base
  3. Permissions système
  4. Utilisateur super-admin initial
  5. Catégories de base
  6. Zones de livraison de base
  7. Ressources système
*/

-- Insérer le tenant marketplace principal
INSERT INTO tenants (id, slug, name, domain, description, status, rating, is_featured, product_count) VALUES
(1, 'jeffel-marketplace', 'JefJel Marketplace', 'jeffel.com', 'Plateforme e-commerce multilocataire du Sénégal', 'active', 4.8, true, 0);

-- Insérer les rôles système de base
INSERT INTO roles (id, name, tenant_id) VALUES
(1, 'super-admin', 1),
(2, 'admin', 1),
(3, 'manager', NULL),
(4, 'delivery', NULL),
(5, 'customer', NULL);

-- Insérer les permissions système
INSERT INTO permissions (id, resource, action, scope) VALUES
-- Gestion des tenants (Super-Admin uniquement)
(1, 'tenant', 'create', 'all'),
(2, 'tenant', 'read', 'all'),
(3, 'tenant', 'update', 'tenant'),
(4, 'tenant', 'delete', 'all'),

-- Gestion des utilisateurs
(5, 'user', 'create', 'tenant'),
(6, 'user', 'read', 'tenant'),
(7, 'user', 'update', 'tenant'),
(8, 'user', 'delete', 'tenant'),

-- Gestion des produits
(9, 'product', 'create', 'tenant'),
(10, 'product', 'read', 'tenant'),
(11, 'product', 'update', 'tenant'),
(12, 'product', 'delete', 'tenant'),

-- Gestion des commandes
(13, 'order', 'read', 'tenant'),
(14, 'order', 'update', 'tenant'),
(15, 'order', 'cancel', 'tenant'),

-- Gestion des livraisons
(16, 'delivery', 'read', 'tenant'),
(17, 'delivery', 'update', 'own'),
(18, 'delivery', 'assign', 'tenant'),

-- Analytics
(19, 'analytics', 'read', 'tenant'),
(20, 'report', 'read', 'tenant'),

-- Paramètres
(21, 'settings', 'update', 'tenant'),

-- Gestion des rôles
(22, 'role', 'create', 'tenant'),
(23, 'role', 'read', 'tenant'),
(24, 'role', 'update', 'tenant'),
(25, 'role', 'delete', 'tenant'),

-- Gestion des clients
(26, 'customer', 'read', 'tenant'),
(27, 'customer', 'update', 'tenant'),

-- Gestion des stocks
(28, 'inventory', 'read', 'tenant'),
(29, 'inventory', 'update', 'tenant');

-- Assigner les permissions aux rôles
INSERT INTO role_permission (role_id, permission_id) VALUES
-- Super-Admin : toutes les permissions
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
(1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15),
(1, 16), (1, 17), (1, 18), (1, 19), (1, 20), (1, 21), (1, 22),
(1, 23), (1, 24), (1, 25), (1, 26), (1, 27), (1, 28), (1, 29),

-- Admin : gestion complète sauf tenants
(2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12),
(2, 13), (2, 14), (2, 15), (2, 16), (2, 18), (2, 19), (2, 20),
(2, 21), (2, 22), (2, 23), (2, 24), (2, 25), (2, 26), (2, 27),
(2, 28), (2, 29),

-- Manager : gestion limitée
(3, 10), (3, 13), (3, 19), (3, 26),

-- Delivery : gestion des livraisons
(4, 16), (4, 17),

-- Customer : aucune permission administrative
(5);

-- Insérer l'utilisateur super-admin initial
INSERT INTO users (id, username, email, first_name, last_name, password, status) VALUES
(1, 'superadmin', 'admin@jeffel.com', 'Super', 'Admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'active');

-- Insérer le profil du super-admin
INSERT INTO user_profiles (user_id, bio, phone, avatar_url) VALUES
(1, 'Administrateur principal de la plateforme JefJel', '+221 77 000 00 00', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600');

-- Associer le super-admin au tenant marketplace
INSERT INTO user_tenants (user_id, tenant_id) VALUES
(1, 1);

-- Assigner le rôle super-admin
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1);

-- Insérer les catégories de base
INSERT INTO categories (id, name, description, icon, tenant_id) VALUES
(1, 'Électronique', 'Appareils électroniques et gadgets technologiques', 'smartphone', 1),
(2, 'Mode', 'Vêtements et accessoires de mode', 'shirt', 1),
(3, 'Maison & Cuisine', 'Articles pour la maison et la cuisine', 'home', 1),
(4, 'Santé & Beauté', 'Produits de santé et de beauté', 'heart', 1),
(5, 'Sports & Loisirs', 'Équipements sportifs et de loisirs', 'activity', 1),
(6, 'Livres & Médias', 'Livres, films, musique et médias', 'book', 1);

-- Insérer les zones de livraison de base pour le Sénégal
INSERT INTO delivery_zones (id, tenant_id, name, fee) VALUES
(1, 1, 'Dakar Centre', 1500),
(2, 1, 'Dakar Banlieue', 2000),
(3, 1, 'Rufisque', 2500),
(4, 1, 'Thiès', 3500),
(5, 1, 'Saint-Louis', 4000),
(6, 1, 'Kaolack', 3500),
(7, 1, 'Ziguinchor', 5000);

-- Insérer les ressources système
INSERT INTO resources (id, name, description, available_actions, tenant_id) VALUES
(1, 'tenant', 'Gestion des tenants', '["create","read","update","delete"]', 1),
(2, 'user', 'Gestion des utilisateurs', '["create","read","update","delete"]', 1),
(3, 'product', 'Gestion des produits', '["create","read","update","delete"]', 1),
(4, 'order', 'Gestion des commandes', '["read","update","cancel"]', 1),
(5, 'delivery', 'Gestion des livraisons', '["read","update","assign"]', 1),
(6, 'analytics', 'Consultation des analytics', '["read"]', 1),
(7, 'role', 'Gestion des rôles', '["create","read","update","delete"]', 1),
(8, 'customer', 'Gestion des clients', '["read","update"]', 1),
(9, 'inventory', 'Gestion des stocks', '["read","update"]', 1);

-- Insérer les éléments de menu principaux
INSERT INTO menu_items (id, label, route, icon, parent_id, tenant_id, "order", is_active) VALUES
(1, 'Tableau de Bord', '/dashboard', 'layout-dashboard', NULL, 1, 1, true),
(2, 'Produits', '/dashboard/products', 'package', NULL, 1, 2, true),
(3, 'Commandes', '/dashboard/orders', 'shopping-cart', NULL, 1, 3, true),
(4, 'Clients', '/dashboard/customers', 'users', NULL, 1, 4, true),
(5, 'Livraisons', '/dashboard/deliveries', 'truck', NULL, 1, 5, true),
(6, 'Rôles', '/dashboard/roles', 'shield', NULL, 1, 6, true),
(7, 'Statistiques', '/dashboard/analytics', 'bar-chart-3', NULL, 1, 7, true),
(8, 'Utilisateurs', '/dashboard/users', 'shield', NULL, 1, 8, true),
(9, 'Tenants', '/dashboard/tenants', 'building', NULL, 1, 9, true),
(10, 'Paramètres', '/dashboard/settings', 'settings', NULL, 1, 10, true);

-- Associer les permissions aux éléments de menu
INSERT INTO menu_item_permissions (menu_item_id, permission_id) VALUES
-- Produits
(2, 10), (2, 11), (2, 12),
-- Commandes
(3, 13), (3, 14),
-- Clients
(4, 26), (4, 27),
-- Livraisons
(5, 16), (5, 17), (5, 18),
-- Rôles
(6, 22), (6, 23), (6, 24), (6, 25),
-- Statistiques
(7, 19), (7, 20),
-- Utilisateurs
(8, 5), (8, 6), (8, 7), (8, 8),
-- Tenants
(9, 1), (9, 2), (9, 3), (9, 4),
-- Paramètres
(10, 21);

-- Réinitialiser les séquences
SELECT setval('users_id_seq', 1, true);
SELECT setval('tenants_id_seq', 1, true);
SELECT setval('roles_id_seq', 5, true);
SELECT setval('permissions_id_seq', 29, true);
SELECT setval('categories_id_seq', 6, true);
SELECT setval('delivery_zones_id_seq', 7, true);
SELECT setval('resources_id_seq', 9, true);
SELECT setval('menu_items_id_seq', 10, true);