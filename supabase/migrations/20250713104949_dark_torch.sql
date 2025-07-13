/*
  # Politiques de sécurité RLS (Row Level Security)

  1. Politiques pour les utilisateurs
    - Les utilisateurs peuvent voir et modifier leurs propres données
    - Les admins peuvent gérer tous les utilisateurs de leur tenant
    - Les super-admins peuvent tout gérer

  2. Politiques pour les tenants
    - Visibilité publique pour les tenants actifs
    - Modification limitée aux propriétaires et admins

  3. Politiques pour les produits
    - Visibilité publique pour les produits actifs
    - Modification limitée aux membres du tenant

  4. Politiques pour les commandes
    - Les utilisateurs voient leurs propres commandes
    - Les vendeurs voient les commandes de leur tenant

  5. Politiques pour les autres tables
    - Accès basé sur les relations tenant/utilisateur
*/

-- Politiques pour la table users
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users in their tenant"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND r.name IN ('admin', 'super-admin', 'manager')
    )
  );

CREATE POLICY "Admins can create users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = auth.uid()::integer
      AND r.name IN ('admin', 'super-admin')
    )
  );

CREATE POLICY "Admins can update users in their tenant"
  ON users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND r.name IN ('admin', 'super-admin')
    )
  );

-- Politiques pour la table user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::integer);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid()::integer);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid()::integer);

CREATE POLICY "Admins can view all profiles in their tenant"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND r.name IN ('admin', 'super-admin', 'manager')
    )
  );

-- Politiques pour la table tenants
CREATE POLICY "Anyone can view active tenants"
  ON tenants FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Super admins can view all tenants"
  ON tenants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = auth.uid()::integer
      AND r.name = 'super-admin'
    )
  );

CREATE POLICY "Super admins can create tenants"
  ON tenants FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = auth.uid()::integer
      AND r.name = 'super-admin'
    )
  );

CREATE POLICY "Admins can update their tenant"
  ON tenants FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = tenants.id
      AND r.name IN ('admin', 'super-admin')
    )
  );

-- Politiques pour la table products
CREATE POLICY "Anyone can view active marketplace products"
  ON products FOR SELECT
  TO authenticated
  USING (is_active = true AND is_marketplace_visible = true);

CREATE POLICY "Tenant members can view their products"
  ON products FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = products.tenant_id
    )
  );

CREATE POLICY "Tenant members can create products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = tenant_id
      AND r.name IN ('admin', 'manager')
    )
  );

CREATE POLICY "Tenant members can update their products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = products.tenant_id
      AND r.name IN ('admin', 'manager')
    )
  );

-- Politiques pour la table orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::integer);

CREATE POLICY "Tenant members can view their tenant orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = orders.tenant_id
      AND r.name IN ('admin', 'manager', 'delivery')
    )
  );

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid()::integer);

CREATE POLICY "Tenant members can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = orders.tenant_id
      AND r.name IN ('admin', 'manager')
    )
  );

-- Politiques pour la table carts
CREATE POLICY "Users can manage their own carts"
  ON carts FOR ALL
  TO authenticated
  USING (user_id = auth.uid()::integer)
  WITH CHECK (user_id = auth.uid()::integer);

-- Politiques pour la table cart_items
CREATE POLICY "Users can manage their cart items"
  ON cart_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM carts c
      WHERE c.id = cart_items.cart_id
      AND c.user_id = auth.uid()::integer
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM carts c
      WHERE c.id = cart_id
      AND c.user_id = auth.uid()::integer
    )
  );

-- Politiques pour la table notifications
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::integer);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid()::integer);

-- Politiques pour la table roles
CREATE POLICY "Admins can view roles in their tenant"
  ON roles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      JOIN user_roles ur ON ur.user_id = ut.user_id
      JOIN roles r ON r.id = ur.role_id
      WHERE ut.user_id = auth.uid()::integer
      AND (ut.tenant_id = roles.tenant_id OR roles.tenant_id IS NULL)
      AND r.name IN ('admin', 'super-admin')
    )
  );

CREATE POLICY "Admins can manage roles"
  ON roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = auth.uid()::integer
      AND r.name IN ('admin', 'super-admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = auth.uid()::integer
      AND r.name IN ('admin', 'super-admin')
    )
  );

-- Politiques pour les autres tables (accès basé sur le tenant)
CREATE POLICY "Tenant members can access inventory"
  ON inventory FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = inventory.tenant_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = tenant_id
    )
  );

CREATE POLICY "Tenant members can access delivery zones"
  ON delivery_zones FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = delivery_zones.tenant_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_tenants ut
      WHERE ut.user_id = auth.uid()::integer
      AND ut.tenant_id = tenant_id
    )
  );

-- Politiques pour les images de produits
CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_images.product_id
      AND p.is_active = true
      AND p.is_marketplace_visible = true
    )
  );

CREATE POLICY "Tenant members can manage product images"
  ON product_images FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      JOIN user_tenants ut ON ut.tenant_id = p.tenant_id
      WHERE p.id = product_images.product_id
      AND ut.user_id = auth.uid()::integer
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM products p
      JOIN user_tenants ut ON ut.tenant_id = p.tenant_id
      WHERE p.id = product_id
      AND ut.user_id = auth.uid()::integer
    )
  );