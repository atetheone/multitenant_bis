/*
  # Index pour optimiser les performances

  1. Index sur les clés étrangères
  2. Index sur les champs de recherche fréquents
  3. Index composites pour les requêtes complexes
  4. Index sur les champs de statut
*/

-- Index sur les clés étrangères
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_tenants_user_id ON user_tenants(user_id);
CREATE INDEX idx_user_tenants_tenant_id ON user_tenants(tenant_id);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX idx_role_permission_role_id ON role_permission(role_id);
CREATE INDEX idx_role_permission_permission_id ON role_permission(permission_id);

CREATE INDEX idx_products_tenant_id ON products(tenant_id);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_categories_tenant_id ON categories(tenant_id);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_category_products_category_id ON category_products(category_id);
CREATE INDEX idx_category_products_product_id ON category_products(product_id);

CREATE INDEX idx_inventory_product_id ON inventory(product_id);
CREATE INDEX idx_inventory_tenant_id ON inventory(tenant_id);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_tenant_id ON orders(tenant_id);
CREATE INDEX idx_orders_address_id ON orders(address_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

CREATE INDEX idx_addresses_tenant_id ON addresses(tenant_id);
CREATE INDEX idx_addresses_zone_id ON addresses(zone_id);
CREATE INDEX idx_users_addresses_user_id ON users_addresses(user_id);
CREATE INDEX idx_users_addresses_address_id ON users_addresses(address_id);

CREATE INDEX idx_delivery_zones_tenant_id ON delivery_zones(tenant_id);
CREATE INDEX idx_delivery_persons_user_id ON delivery_persons(user_id);
CREATE INDEX idx_delivery_persons_tenant_id ON delivery_persons(tenant_id);
CREATE INDEX idx_delivery_person_zones_delivery_person_id ON delivery_person_zones(delivery_person_id);
CREATE INDEX idx_delivery_person_zones_zone_id ON delivery_person_zones(zone_id);

CREATE INDEX idx_deliveries_order_id ON deliveries(order_id);
CREATE INDEX idx_deliveries_delivery_person_id ON deliveries(delivery_person_id);

CREATE INDEX idx_carts_user_id ON carts(user_id);
CREATE INDEX idx_carts_tenant_id ON carts(tenant_id);
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX idx_cart_items_tenant_id ON cart_items(tenant_id);

CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_tenant_id ON notifications(tenant_id);

CREATE INDEX idx_menu_items_parent_id ON menu_items(parent_id);
CREATE INDEX idx_menu_items_tenant_id ON menu_items(tenant_id);
CREATE INDEX idx_menu_item_permissions_menu_item_id ON menu_item_permissions(menu_item_id);
CREATE INDEX idx_menu_item_permissions_permission_id ON menu_item_permissions(permission_id);

-- Index sur les champs de recherche
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_domain ON tenants(domain);
CREATE INDEX idx_tenants_status ON tenants(status);

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('french', name));
CREATE INDEX idx_products_status ON products(is_active);
CREATE INDEX idx_products_marketplace_visible ON products(is_marketplace_visible);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Index composites pour les requêtes complexes
CREATE INDEX idx_products_tenant_active ON products(tenant_id, is_active);
CREATE INDEX idx_products_marketplace_active ON products(is_marketplace_visible, is_active);
CREATE INDEX idx_orders_tenant_status ON orders(tenant_id, status);
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);

CREATE INDEX idx_inventory_product_tenant ON inventory(product_id, tenant_id);
CREATE INDEX idx_user_tenants_composite ON user_tenants(user_id, tenant_id);
CREATE INDEX idx_user_roles_composite ON user_roles(user_id, role_id);

-- Index pour les recherches textuelles
CREATE INDEX idx_products_description ON products USING gin(to_tsvector('french', description));
CREATE INDEX idx_tenants_name ON tenants USING gin(to_tsvector('french', name));
CREATE INDEX idx_categories_name ON categories USING gin(to_tsvector('french', name));

-- Index pour les dates
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_last_login_at ON users(last_login_at);
CREATE INDEX idx_tenants_created_at ON tenants(created_at);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_orders_created_at_desc ON orders(created_at DESC);

-- Index pour les performances des livraisons
CREATE INDEX idx_delivery_persons_active ON delivery_persons(is_active, is_available);
CREATE INDEX idx_deliveries_assigned_at ON deliveries(assigned_at);
CREATE INDEX idx_deliveries_delivered_at ON deliveries(delivered_at);