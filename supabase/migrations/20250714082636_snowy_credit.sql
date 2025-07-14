/*
  # Initial Database Seeding

  1. Create default roles and permissions
  2. Create marketplace tenant
  3. Create super admin user
  4. Set up initial categories and delivery zones
  5. Add sample products and data

  This migration sets up the basic structure needed for the application to function.
*/

-- Create default roles
INSERT INTO roles (name, tenant_id, created_at, updated_at) VALUES
('super-admin', NULL, now(), now()),
('admin', NULL, now(), now()),
('manager', NULL, now(), now()),
('delivery', NULL, now(), now()),
('customer', NULL, now(), now())
ON CONFLICT (name, tenant_id) DO NOTHING;

-- Create permissions
INSERT INTO permissions (resource, action, tenant_id, resource_id, scope, created_at, updated_at) VALUES
-- Tenant management (Super Admin only)
('tenant', 'create', NULL, NULL, 'all', now(), now()),
('tenant', 'read', NULL, NULL, 'all', now(), now()),
('tenant', 'update', NULL, NULL, 'all', now(), now()),
('tenant', 'delete', NULL, NULL, 'all', now(), now()),

-- User management
('user', 'create', NULL, NULL, 'tenant', now(), now()),
('user', 'read', NULL, NULL, 'tenant', now(), now()),
('user', 'update', NULL, NULL, 'tenant', now(), now()),
('user', 'delete', NULL, NULL, 'tenant', now(), now()),
('user', 'assign_roles', NULL, NULL, 'tenant', now(), now()),

-- Product management
('product', 'create', NULL, NULL, 'tenant', now(), now()),
('product', 'read', NULL, NULL, 'tenant', now(), now()),
('product', 'update', NULL, NULL, 'tenant', now(), now()),
('product', 'delete', NULL, NULL, 'tenant', now(), now()),
('product', 'manage_inventory', NULL, NULL, 'tenant', now(), now()),

-- Order management
('order', 'read', NULL, NULL, 'tenant', now(), now()),
('order', 'update', NULL, NULL, 'tenant', now(), now()),
('order', 'cancel', NULL, NULL, 'tenant', now(), now()),
('order', 'process_refund', NULL, NULL, 'tenant', now(), now()),

-- Delivery management
('delivery', 'read', NULL, NULL, 'tenant', now(), now()),
('delivery', 'assign', NULL, NULL, 'tenant', now(), now()),
('delivery', 'update_status', NULL, NULL, 'own', now(), now()),
('delivery', 'manage_zones', NULL, NULL, 'tenant', now(), now()),

-- Customer management
('customer', 'read', NULL, NULL, 'tenant', now(), now()),
('customer', 'update', NULL, NULL, 'tenant', now(), now()),
('customer', 'view_orders', NULL, NULL, 'tenant', now(), now()),

-- Analytics and reports
('analytics', 'read', NULL, NULL, 'tenant', now(), now()),
('report', 'read', NULL, NULL, 'tenant', now(), now()),
('report', 'export', NULL, NULL, 'tenant', now(), now()),

-- Settings
('settings', 'update', NULL, NULL, 'tenant', now(), now()),
('payment_methods', 'manage', NULL, NULL, 'tenant', now(), now()),
('delivery_settings', 'manage', NULL, NULL, 'tenant', now(), now()),

-- Marketplace specific (Super Admin)
('marketplace', 'view_analytics', NULL, NULL, 'all', now(), now()),
('marketplace', 'manage_commissions', NULL, NULL, 'all', now(), now()),
('marketplace', 'moderate_content', NULL, NULL, 'all', now(), now()),

-- Role management
('role', 'create', NULL, NULL, 'tenant', now(), now()),
('role', 'read', NULL, NULL, 'tenant', now(), now()),
('role', 'update', NULL, NULL, 'tenant', now(), now()),
('role', 'delete', NULL, NULL, 'tenant', now(), now())
ON CONFLICT (resource, action, tenant_id, resource_id, scope) DO NOTHING;

-- Create the default marketplace tenant
INSERT INTO tenants (
  slug, 
  name, 
  domain, 
  description, 
  status, 
  rating, 
  logo, 
  cover_image,
  product_count, 
  is_featured, 
  created_at, 
  updated_at
) VALUES (
  'jeffel-marketplace',
  'JefJel Marketplace',
  'jeffel.com',
  'Plateforme e-commerce multilocataire du Sénégal - Le marketplace principal qui héberge tous les vendeurs.',
  'active',
  4.8,
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  0,
  true,
  now(),
  now()
) ON CONFLICT (slug) DO NOTHING;

-- Get the marketplace tenant ID
DO $$
DECLARE
  marketplace_tenant_id INTEGER;
  super_admin_role_id INTEGER;
  admin_role_id INTEGER;
  manager_role_id INTEGER;
  delivery_role_id INTEGER;
  customer_role_id INTEGER;
  super_admin_user_id INTEGER;
BEGIN
  -- Get tenant ID
  SELECT id INTO marketplace_tenant_id FROM tenants WHERE slug = 'jeffel-marketplace';
  
  -- Get role IDs
  SELECT id INTO super_admin_role_id FROM roles WHERE name = 'super-admin';
  SELECT id INTO admin_role_id FROM roles WHERE name = 'admin';
  SELECT id INTO manager_role_id FROM roles WHERE name = 'manager';
  SELECT id INTO delivery_role_id FROM roles WHERE name = 'delivery';
  SELECT id INTO customer_role_id FROM roles WHERE name = 'customer';

  -- Create super admin user
  INSERT INTO users (
    username,
    email,
    first_name,
    last_name,
    password,
    status,
    created_at,
    updated_at
  ) VALUES (
    'superadmin',
    'admin@jeffel.com',
    'Super',
    'Admin',
    '$2b$10$hashedpassword', -- This should be properly hashed in production
    'active',
    now(),
    now()
  ) ON CONFLICT (email) DO NOTHING;

  -- Get the super admin user ID
  SELECT id INTO super_admin_user_id FROM users WHERE email = 'admin@jeffel.com';

  -- Create user profile for super admin
  INSERT INTO user_profiles (
    user_id,
    bio,
    phone,
    avatar_url,
    website,
    created_at,
    updated_at
  ) VALUES (
    super_admin_user_id,
    'Super administrateur de la plateforme JefJel',
    '+221 77 000 00 00',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://jeffel.com',
    now(),
    now()
  ) ON CONFLICT (user_id) DO NOTHING;

  -- Assign super admin role
  INSERT INTO user_roles (user_id, role_id, created_at, updated_at) 
  VALUES (super_admin_user_id, super_admin_role_id, now(), now())
  ON CONFLICT (user_id, role_id) DO NOTHING;

  -- Associate super admin with marketplace tenant
  INSERT INTO user_tenants (user_id, tenant_id, created_at, updated_at)
  VALUES (super_admin_user_id, marketplace_tenant_id, now(), now())
  ON CONFLICT (user_id, tenant_id) DO NOTHING;

  -- Create role-permission associations for super admin (all permissions)
  INSERT INTO role_permission (role_id, permission_id)
  SELECT super_admin_role_id, p.id
  FROM permissions p
  ON CONFLICT (role_id, permission_id) DO NOTHING;

  -- Create role-permission associations for admin (most permissions except tenant management)
  INSERT INTO role_permission (role_id, permission_id)
  SELECT admin_role_id, p.id
  FROM permissions p
  WHERE p.resource != 'tenant' OR p.action = 'read'
  ON CONFLICT (role_id, permission_id) DO NOTHING;

  -- Create role-permission associations for manager (limited permissions)
  INSERT INTO role_permission (role_id, permission_id)
  SELECT manager_role_id, p.id
  FROM permissions p
  WHERE p.resource IN ('product', 'order', 'customer', 'analytics') 
    AND p.action IN ('read', 'update')
  ON CONFLICT (role_id, permission_id) DO NOTHING;

  -- Create role-permission associations for delivery (delivery specific permissions)
  INSERT INTO role_permission (role_id, permission_id)
  SELECT delivery_role_id, p.id
  FROM permissions p
  WHERE (p.resource = 'delivery' AND p.action IN ('read', 'update_status'))
     OR (p.resource = 'customer' AND p.action = 'read')
  ON CONFLICT (role_id, permission_id) DO NOTHING;

  -- Customer role has no special permissions (just basic access)
END $$;

-- Create default delivery zones for the marketplace
INSERT INTO delivery_zones (tenant_id, name, fee, created_at, updated_at) VALUES
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Dakar Centre', 1500, now(), now()),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Dakar Banlieue', 2000, now(), now()),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Rufisque', 2500, now(), now()),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Thiès', 3500, now(), now()),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Saint-Louis', 4000, now(), now()),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Kaolack', 3500, now(), now()),
((SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), 'Ziguinchor', 5000, now(), now())
ON CONFLICT DO NOTHING;

-- Create default categories for the marketplace
INSERT INTO categories (name, description, icon, parent_id, tenant_id, created_at, updated_at) VALUES
('Électronique', 'Appareils électroniques et gadgets technologiques', 'smartphone', NULL, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now()),
('Mode', 'Vêtements et accessoires de mode', 'shirt', NULL, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now()),
('Maison & Cuisine', 'Articles pour la maison et la cuisine', 'home', NULL, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now()),
('Santé & Beauté', 'Produits de santé et de beauté', 'heart', NULL, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now()),
('Sports & Loisirs', 'Équipements sportifs et de loisirs', 'activity', NULL, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now()),
('Livres & Médias', 'Livres, films, musique et médias', 'book', NULL, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now())
ON CONFLICT DO NOTHING;

-- Create sample vendor tenants
INSERT INTO tenants (
  slug, 
  name, 
  domain, 
  description, 
  status, 
  rating, 
  logo, 
  product_count, 
  is_featured, 
  created_at, 
  updated_at
) VALUES 
(
  'tech-paradise',
  'Tech Paradise',
  'tech-paradise.jeffel.com',
  'Gadgets technologiques premium et accessoires pour tous vos besoins.',
  'active',
  4.8,
  'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
  0,
  true,
  now(),
  now()
),
(
  'eco-produits',
  'Éco Produits',
  'eco-produits.jeffel.com',
  'Produits durables et écologiques pour les consommateurs conscients.',
  'active',
  4.6,
  'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=600',
  0,
  true,
  now(),
  now()
),
(
  'fashion-senegal',
  'Fashion Sénégal',
  'fashion-senegal.jeffel.com',
  'Mode africaine contemporaine et traditionnelle.',
  'active',
  4.7,
  'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
  0,
  false,
  now(),
  now()
)
ON CONFLICT (slug) DO NOTHING;

-- Create sample products for the vendors
DO $$
DECLARE
  tech_paradise_id INTEGER;
  eco_produits_id INTEGER;
  fashion_senegal_id INTEGER;
  electronics_cat_id INTEGER;
  health_beauty_cat_id INTEGER;
  fashion_cat_id INTEGER;
  product_id INTEGER;
BEGIN
  -- Get tenant IDs
  SELECT id INTO tech_paradise_id FROM tenants WHERE slug = 'tech-paradise';
  SELECT id INTO eco_produits_id FROM tenants WHERE slug = 'eco-produits';
  SELECT id INTO fashion_senegal_id FROM tenants WHERE slug = 'fashion-senegal';
  
  -- Get category IDs
  SELECT id INTO electronics_cat_id FROM categories WHERE name = 'Électronique';
  SELECT id INTO health_beauty_cat_id FROM categories WHERE name = 'Santé & Beauté';
  SELECT id INTO fashion_cat_id FROM categories WHERE name = 'Mode';

  -- Tech Paradise Products
  INSERT INTO products (
    name, description, price, sku, is_active, tenant_id, 
    is_marketplace_visible, marketplace_priority, average_rating, created_at, updated_at
  ) VALUES 
  (
    'Écouteurs Sans Fil Premium',
    'Écouteurs sans fil premium avec réduction de bruit active et autonomie de 24 heures. Son haute qualité et design ergonomique.',
    129000,
    'ECO-001',
    true,
    tech_paradise_id,
    true,
    10,
    4.7,
    now(),
    now()
  ),
  (
    'Montre Connectée Sport',
    'Montre intelligente avec suivi de santé, notifications et résistance à l''eau. Parfaite pour le sport et la vie quotidienne.',
    199000,
    'MON-001',
    true,
    tech_paradise_id,
    true,
    9,
    4.5,
    now(),
    now()
  ),
  (
    'Smartphone Dernière Génération',
    'Smartphone haut de gamme avec appareil photo 108MP, 5G et écran AMOLED. Performance exceptionnelle.',
    899000,
    'SMT-001',
    true,
    tech_paradise_id,
    true,
    8,
    4.9,
    now(),
    now()
  );

  -- Éco Produits Products
  INSERT INTO products (
    name, description, price, sku, is_active, tenant_id, 
    is_marketplace_visible, marketplace_priority, average_rating, created_at, updated_at
  ) VALUES 
  (
    'Set Brosses à Dents Bambou',
    'Pack de 4 brosses à dents écologiques en bambou avec poils au charbon. 100% biodégradable et durable.',
    14900,
    'BRO-001',
    true,
    eco_produits_id,
    true,
    7,
    4.8,
    now(),
    now()
  ),
  (
    'Sacs à Légumes Réutilisables',
    'Set de 8 sacs en filet pour les courses, réduisant les déchets plastiques. Matériaux durables et lavables.',
    19900,
    'SAC-001',
    true,
    eco_produits_id,
    true,
    6,
    4.6,
    now(),
    now()
  ),
  (
    'Bouteille en Acier Inoxydable',
    'Bouteille isotherme à double paroi qui garde les boissons froides 24h ou chaudes 12h. Sans BPA.',
    34900,
    'BOU-001',
    true,
    eco_produits_id,
    true,
    5,
    4.9,
    now(),
    now()
  );

  -- Fashion Sénégal Products
  INSERT INTO products (
    name, description, price, sku, is_active, tenant_id, 
    is_marketplace_visible, marketplace_priority, average_rating, created_at, updated_at
  ) VALUES 
  (
    'Boubou Traditionnel Homme',
    'Boubou traditionnel sénégalais en coton brodé. Confection artisanale de qualité supérieure.',
    85000,
    'BOU-TRA-001',
    true,
    fashion_senegal_id,
    true,
    4,
    4.8,
    now(),
    now()
  ),
  (
    'Robe Africaine Moderne',
    'Robe moderne inspirée des motifs africains traditionnels. Coupe contemporaine et tissus de qualité.',
    65000,
    'ROB-AFR-001',
    true,
    fashion_senegal_id,
    true,
    3,
    4.7,
    now(),
    now()
  );

  -- Add product images
  FOR product_id IN (SELECT id FROM products WHERE tenant_id = tech_paradise_id) LOOP
    INSERT INTO product_images (url, filename, alt_text, is_cover, display_order, product_id, created_at, updated_at)
    VALUES (
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600',
      'product-' || product_id || '-1.jpg',
      'Image produit',
      true,
      1,
      product_id,
      now(),
      now()
    );
  END LOOP;

  FOR product_id IN (SELECT id FROM products WHERE tenant_id = eco_produits_id) LOOP
    INSERT INTO product_images (url, filename, alt_text, is_cover, display_order, product_id, created_at, updated_at)
    VALUES (
      'https://images.pexels.com/photos/3737605/pexels-photo-3737605.jpeg?auto=compress&cs=tinysrgb&w=600',
      'product-' || product_id || '-1.jpg',
      'Image produit écologique',
      true,
      1,
      product_id,
      now(),
      now()
    );
  END LOOP;

  FOR product_id IN (SELECT id FROM products WHERE tenant_id = fashion_senegal_id) LOOP
    INSERT INTO product_images (url, filename, alt_text, is_cover, display_order, product_id, created_at, updated_at)
    VALUES (
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
      'product-' || product_id || '-1.jpg',
      'Vêtement africain',
      true,
      1,
      product_id,
      now(),
      now()
    );
  END LOOP;

  -- Add inventory for all products
  INSERT INTO inventory (product_id, tenant_id, quantity, reorder_point, reorder_quantity, low_stock_threshold, reserved_quantity, created_at, updated_at)
  SELECT 
    p.id,
    p.tenant_id,
    CASE 
      WHEN p.price > 500000 THEN 25  -- Expensive items: lower stock
      WHEN p.price > 100000 THEN 50  -- Mid-range items: medium stock
      ELSE 100                       -- Cheaper items: higher stock
    END,
    10,
    50,
    15,
    0,
    now(),
    now()
  FROM products p
  ON CONFLICT (product_id, tenant_id) DO NOTHING;

  -- Link products to categories
  INSERT INTO category_products (category_id, product_id)
  SELECT electronics_cat_id, p.id FROM products p WHERE p.tenant_id = tech_paradise_id
  ON CONFLICT (category_id, product_id) DO NOTHING;

  INSERT INTO category_products (category_id, product_id)
  SELECT health_beauty_cat_id, p.id FROM products p WHERE p.tenant_id = eco_produits_id
  ON CONFLICT (category_id, product_id) DO NOTHING;

  INSERT INTO category_products (category_id, product_id)
  SELECT fashion_cat_id, p.id FROM products p WHERE p.tenant_id = fashion_senegal_id
  ON CONFLICT (category_id, product_id) DO NOTHING;

  -- Update product counts for tenants
  UPDATE tenants SET product_count = (
    SELECT COUNT(*) FROM products WHERE tenant_id = tenants.id AND is_active = true
  );

END $$;

-- Create sample customers
INSERT INTO users (
  username, email, first_name, last_name, password, status, created_at, updated_at
) VALUES 
('aminata.diallo', 'aminata@example.com', 'Aminata', 'Diallo', '$2b$10$hashedpassword', 'active', now(), now()),
('moussa.sow', 'moussa@example.com', 'Moussa', 'Sow', '$2b$10$hashedpassword', 'active', now(), now()),
('fatou.ndiaye', 'fatou@example.com', 'Fatou', 'Ndiaye', '$2b$10$hashedpassword', 'active', now(), now())
ON CONFLICT (email) DO NOTHING;

-- Create profiles for sample customers
DO $$
DECLARE
  customer_role_id INTEGER;
  marketplace_tenant_id INTEGER;
  user_record RECORD;
BEGIN
  SELECT id INTO customer_role_id FROM roles WHERE name = 'customer';
  SELECT id INTO marketplace_tenant_id FROM tenants WHERE slug = 'jeffel-marketplace';

  FOR user_record IN (SELECT id, first_name, last_name FROM users WHERE email LIKE '%@example.com') LOOP
    -- Create user profile
    INSERT INTO user_profiles (user_id, phone, created_at, updated_at)
    VALUES (user_record.id, '+221 77 ' || LPAD((user_record.id * 123456)::text, 6, '0'), now(), now())
    ON CONFLICT (user_id) DO NOTHING;

    -- Assign customer role
    INSERT INTO user_roles (user_id, role_id, created_at, updated_at)
    VALUES (user_record.id, customer_role_id, now(), now())
    ON CONFLICT (user_id, role_id) DO NOTHING;

    -- Associate with marketplace tenant
    INSERT INTO user_tenants (user_id, tenant_id, created_at, updated_at)
    VALUES (user_record.id, marketplace_tenant_id, now(), now())
    ON CONFLICT (user_id, tenant_id) DO NOTHING;
  END LOOP;
END $$;

-- Create sample addresses for customers
INSERT INTO addresses (
  type, address_line1, city, country, postal_code, is_default, tenant_id, created_at, updated_at
) VALUES 
('shipping', '123 Rue de la Paix', 'Dakar', 'Sénégal', '10000', true, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now()),
('shipping', '456 Avenue Bourguiba', 'Pikine', 'Sénégal', '12000', true, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now()),
('shipping', '789 Boulevard de la République', 'Rufisque', 'Sénégal', '13000', true, (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'), now(), now())
ON CONFLICT DO NOTHING;

-- Create sample orders
DO $$
DECLARE
  customer_ids INTEGER[];
  product_ids INTEGER[];
  address_ids INTEGER[];
  marketplace_tenant_id INTEGER;
  order_id INTEGER;
  i INTEGER;
BEGIN
  SELECT id INTO marketplace_tenant_id FROM tenants WHERE slug = 'jeffel-marketplace';
  
  SELECT ARRAY_AGG(id) INTO customer_ids FROM users WHERE email LIKE '%@example.com';
  SELECT ARRAY_AGG(id) INTO product_ids FROM products WHERE is_active = true;
  SELECT ARRAY_AGG(id) INTO address_ids FROM addresses;

  -- Create 5 sample orders
  FOR i IN 1..5 LOOP
    INSERT INTO orders (
      user_id, tenant_id, payment_method, subtotal, delivery_fee, total, 
      address_id, status, created_at, updated_at
    ) VALUES (
      customer_ids[1 + (i % array_length(customer_ids, 1))],
      marketplace_tenant_id,
      CASE (i % 3) 
        WHEN 0 THEN 'Mobile Money'
        WHEN 1 THEN 'Carte Bancaire'
        ELSE 'Paiement à la livraison'
      END,
      50000 + (i * 10000),
      2000,
      52000 + (i * 10000),
      address_ids[1 + (i % array_length(address_ids, 1))],
      CASE (i % 4)
        WHEN 0 THEN 'pending'
        WHEN 1 THEN 'processing'
        WHEN 2 THEN 'delivered'
        ELSE 'shipped'
      END,
      now() - (i || ' days')::interval,
      now()
    ) RETURNING id INTO order_id;

    -- Add order items
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, created_at, updated_at)
    VALUES (
      order_id,
      product_ids[1 + (i % array_length(product_ids, 1))],
      1 + (i % 3),
      (SELECT price FROM products WHERE id = product_ids[1 + (i % array_length(product_ids, 1))]),
      now(),
      now()
    );
  END LOOP;
END $$;

-- Create notifications for the super admin
INSERT INTO notifications (
  type, title, message, data, user_id, tenant_id, is_read, created_at, updated_at
) VALUES 
(
  'system',
  'Bienvenue sur JefJel!',
  'Votre plateforme marketplace est maintenant configurée avec des données de test.',
  '{"action": "setup_complete"}',
  (SELECT id FROM users WHERE email = 'admin@jeffel.com'),
  (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'),
  false,
  now(),
  now()
),
(
  'info',
  'Nouveaux produits ajoutés',
  'Des produits de démonstration ont été ajoutés au marketplace.',
  '{"products_count": 8}',
  (SELECT id FROM users WHERE email = 'admin@jeffel.com'),
  (SELECT id FROM tenants WHERE slug = 'jeffel-marketplace'),
  false,
  now(),
  now()
);