/*
  # Synchronisation des utilisateurs Auth avec la base de données

  Ce script synchronise les utilisateurs existants dans Supabase Auth 
  avec les tables personnalisées de la base de données.

  1. Vérifie les utilisateurs Auth existants
  2. Crée les enregistrements manquants dans les tables personnalisées
  3. Assigne les rôles et tenants appropriés
*/

-- Fonction pour synchroniser un utilisateur Auth avec les tables personnalisées
CREATE OR REPLACE FUNCTION sync_auth_user_to_database(
  auth_email TEXT,
  user_first_name TEXT DEFAULT 'Admin',
  user_last_name TEXT DEFAULT 'User',
  user_username TEXT DEFAULT NULL,
  user_role TEXT DEFAULT 'super-admin'
)
RETURNS INTEGER AS $$
DECLARE
  new_user_id INTEGER;
  role_id INTEGER;
  tenant_id INTEGER;
BEGIN
  -- Générer un username par défaut si non fourni
  IF user_username IS NULL THEN
    user_username := LOWER(user_first_name || '.' || user_last_name);
  END IF;

  -- Vérifier si l'utilisateur existe déjà dans la table users
  SELECT id INTO new_user_id FROM users WHERE email = auth_email;
  
  IF new_user_id IS NULL THEN
    -- Créer l'utilisateur dans la table users
    INSERT INTO users (
      username, 
      email, 
      first_name, 
      last_name, 
      password, 
      status
    ) VALUES (
      user_username,
      auth_email,
      user_first_name,
      user_last_name,
      '', -- Mot de passe vide car géré par Supabase Auth
      'active'
    ) RETURNING id INTO new_user_id;
    
    RAISE NOTICE 'Utilisateur créé avec ID: %', new_user_id;
  ELSE
    RAISE NOTICE 'Utilisateur existe déjà avec ID: %', new_user_id;
  END IF;

  -- Créer le profil utilisateur s'il n'existe pas
  INSERT INTO user_profiles (user_id, bio, phone, avatar_url, website)
  VALUES (new_user_id, NULL, NULL, NULL, NULL)
  ON CONFLICT (user_id) DO NOTHING;

  -- Obtenir l'ID du rôle
  SELECT id INTO role_id FROM roles WHERE name = user_role;
  
  IF role_id IS NULL THEN
    RAISE EXCEPTION 'Rôle % non trouvé', user_role;
  END IF;

  -- Assigner le rôle s'il n'est pas déjà assigné
  INSERT INTO user_roles (user_id, role_id)
  VALUES (new_user_id, role_id)
  ON CONFLICT (user_id, role_id) DO NOTHING;

  -- Assigner au tenant marketplace par défaut
  SELECT id INTO tenant_id FROM tenants WHERE slug = 'jeffel-marketplace';
  
  IF tenant_id IS NOT NULL THEN
    INSERT INTO user_tenants (user_id, tenant_id)
    VALUES (new_user_id, tenant_id)
    ON CONFLICT (user_id, tenant_id) DO NOTHING;
  END IF;

  RETURN new_user_id;
END;
$$ LANGUAGE plpgsql;

-- Synchroniser l'utilisateur admin@jeffel.com
SELECT sync_auth_user_to_database(
  'admin@jeffel.com',
  'Super',
  'Admin',
  'super.admin',
  'super-admin'
);

-- Vérifier la synchronisation
SELECT 
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.status,
  r.name as role,
  t.name as tenant
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
LEFT JOIN user_tenants ut ON u.id = ut.user_id
LEFT JOIN tenants t ON ut.tenant_id = t.id
WHERE u.email = 'admin@jeffel.com';

-- Afficher un résumé
DO $$
DECLARE
  user_count INTEGER;
  profile_count INTEGER;
  role_count INTEGER;
  tenant_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO user_count FROM users WHERE email = 'admin@jeffel.com';
  SELECT COUNT(*) INTO profile_count FROM user_profiles WHERE user_id IN (SELECT id FROM users WHERE email = 'admin@jeffel.com');
  SELECT COUNT(*) INTO role_count FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE email = 'admin@jeffel.com');
  SELECT COUNT(*) INTO tenant_count FROM user_tenants WHERE user_id IN (SELECT id FROM users WHERE email = 'admin@jeffel.com');
  
  RAISE NOTICE '=== RÉSUMÉ DE LA SYNCHRONISATION ===';
  RAISE NOTICE 'Utilisateur admin@jeffel.com:';
  RAISE NOTICE '- Enregistrement utilisateur: % trouvé(s)', user_count;
  RAISE NOTICE '- Profil utilisateur: % trouvé(s)', profile_count;
  RAISE NOTICE '- Rôles assignés: % trouvé(s)', role_count;
  RAISE NOTICE '- Tenants assignés: % trouvé(s)', tenant_count;
  
  IF user_count > 0 AND profile_count > 0 AND role_count > 0 AND tenant_count > 0 THEN
    RAISE NOTICE '✅ Synchronisation réussie!';
  ELSE
    RAISE NOTICE '❌ Synchronisation incomplète - vérifiez les données';
  END IF;
END $$;