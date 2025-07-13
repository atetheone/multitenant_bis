/*
  # Fonctions et triggers pour la base de données

  1. Fonction pour mettre à jour updated_at automatiquement
  2. Triggers pour toutes les tables avec updated_at
  3. Fonction pour mettre à jour le compteur de produits des tenants
  4. Fonction pour calculer la note moyenne des produits
  5. Fonction pour gérer les stocks lors des commandes
*/

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at sur toutes les tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_tenants_updated_at BEFORE UPDATE ON user_tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON user_roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_images_updated_at BEFORE UPDATE ON product_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_addresses_updated_at BEFORE UPDATE ON users_addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_delivery_zones_updated_at BEFORE UPDATE ON delivery_zones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_delivery_persons_updated_at BEFORE UPDATE ON delivery_persons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_delivery_person_zones_updated_at BEFORE UPDATE ON delivery_person_zones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at BEFORE UPDATE ON order_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON deliveries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_item_permissions_updated_at BEFORE UPDATE ON menu_item_permissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour mettre à jour le compteur de produits des tenants
CREATE OR REPLACE FUNCTION update_tenant_product_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tenants 
    SET product_count = product_count + 1 
    WHERE id = NEW.tenant_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tenants 
    SET product_count = product_count - 1 
    WHERE id = OLD.tenant_id;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.tenant_id != NEW.tenant_id THEN
      UPDATE tenants 
      SET product_count = product_count - 1 
      WHERE id = OLD.tenant_id;
      UPDATE tenants 
      SET product_count = product_count + 1 
      WHERE id = NEW.tenant_id;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger pour le compteur de produits
CREATE TRIGGER update_tenant_product_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON products
  FOR EACH ROW EXECUTE FUNCTION update_tenant_product_count();

-- Fonction pour réserver/libérer du stock lors des commandes
CREATE OR REPLACE FUNCTION manage_inventory_on_order()
RETURNS TRIGGER AS $$
DECLARE
  item RECORD;
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Réserver le stock pour les nouveaux articles
    FOR item IN 
      SELECT product_id, quantity 
      FROM order_items 
      WHERE order_id = NEW.id
    LOOP
      UPDATE inventory 
      SET reserved_quantity = reserved_quantity + item.quantity
      WHERE product_id = item.product_id;
    END LOOP;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Gérer les changements de statut
    IF OLD.status != NEW.status THEN
      IF NEW.status = 'delivered' THEN
        -- Déduire du stock réel et libérer les réservations
        FOR item IN 
          SELECT product_id, quantity 
          FROM order_items 
          WHERE order_id = NEW.id
        LOOP
          UPDATE inventory 
          SET 
            quantity = quantity - item.quantity,
            reserved_quantity = reserved_quantity - item.quantity
          WHERE product_id = item.product_id;
        END LOOP;
      ELSIF NEW.status = 'cancelled' THEN
        -- Libérer les réservations
        FOR item IN 
          SELECT product_id, quantity 
          FROM order_items 
          WHERE order_id = NEW.id
        LOOP
          UPDATE inventory 
          SET reserved_quantity = reserved_quantity - item.quantity
          WHERE product_id = item.product_id;
        END LOOP;
      END IF;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger pour la gestion des stocks
CREATE TRIGGER manage_inventory_on_order_trigger
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION manage_inventory_on_order();