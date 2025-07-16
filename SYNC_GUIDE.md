# 🔄 Guide de Synchronisation Auth ↔ Base de Données

## 🚨 Problème Identifié
Vous avez créé un utilisateur dans **Supabase Auth** mais il n'existe pas dans vos **tables personnalisées**, ce qui empêche la connexion de fonctionner correctement.

## ✅ Solution Rapide

### Étape 1: Vérifier l'utilisateur Auth
1. **Allez dans Supabase Dashboard → Authentication → Users**
2. **Vérifiez que `admin@jeffel.com` existe** avec une coche verte ✅

### Étape 2: Synchroniser avec la base de données
1. **Allez dans SQL Editor**
2. **Copiez TOUT le contenu** de `supabase/sync_auth_users.sql`
3. **Collez et cliquez "Run"**

### Étape 3: Vérifier la synchronisation
Le script affichera un résumé comme ceci:
```
=== RÉSUMÉ DE LA SYNCHRONISATION ===
Utilisateur admin@jeffel.com:
- Enregistrement utilisateur: 1 trouvé(s)
- Profil utilisateur: 1 trouvé(s)  
- Rôles assignés: 1 trouvé(s)
- Tenants assignés: 1 trouvé(s)
✅ Synchronisation réussie!
```

### Étape 4: Tester la connexion
- **Email**: `admin@jeffel.com`
- **Mot de passe**: `password123`

## 🔍 Diagnostic des Problèmes

### Si la connexion échoue encore:

**1. Vérifiez l'utilisateur Auth:**
```sql
-- Dans SQL Editor, exécutez:
SELECT email, email_confirmed_at, created_at 
FROM auth.users 
WHERE email = 'admin@jeffel.com';
```

**2. Vérifiez les tables personnalisées:**
```sql
-- Vérifiez si l'utilisateur existe dans vos tables:
SELECT u.email, u.status, r.name as role, t.name as tenant
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id  
LEFT JOIN user_tenants ut ON u.id = ut.user_id
LEFT JOIN tenants t ON ut.tenant_id = t.id
WHERE u.email = 'admin@jeffel.com';
```

## 🛠️ Résolution des Problèmes Courants

### Problème: "Invalid login credentials"
- ✅ L'utilisateur n'existe pas dans Supabase Auth
- **Solution**: Créez l'utilisateur dans Authentication → Users

### Problème: "JSON object requested, multiple rows returned"  
- ✅ L'utilisateur existe dans Auth mais pas dans les tables personnalisées
- **Solution**: Exécutez le script `sync_auth_users.sql`

### Problème: "User profile not found"
- ✅ L'utilisateur existe mais n'a pas de profil/rôles
- **Solution**: Le script de synchronisation corrige automatiquement cela

## 📋 Checklist de Vérification

- [ ] Utilisateur existe dans Supabase Auth avec email confirmé
- [ ] Utilisateur existe dans la table `users`
- [ ] Profil existe dans la table `user_profiles`  
- [ ] Rôle assigné dans la table `user_roles`
- [ ] Tenant assigné dans la table `user_tenants`
- [ ] Connexion fonctionne avec `admin@jeffel.com` / `password123`

Une fois toutes ces étapes validées, la connexion devrait fonctionner parfaitement!