# JefJel - Plateforme E-commerce Multilocataire

Une plateforme e-commerce multilocataire moderne construite avec React, TypeScript, Tailwind CSS et Supabase.

## 🚀 Fonctionnalités

- **Authentification complète** avec Supabase Auth
- **Système multilocataire** avec gestion des vendeurs
- **Gestion des rôles et permissions** granulaire
- **Marketplace** avec produits de différents vendeurs
- **Panier d'achat** et système de commandes
- **Tableau de bord administrateur** complet
- **Gestion des livraisons** et zones de livraison
- **Interface responsive** et moderne

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. Clonez le repository
2. Installez les dépendances:
   ```bash
   npm install
   ```

3. Configurez Supabase:
   - Créez un projet Supabase
   - Cliquez sur "Connect to Supabase" dans l'interface
   - Ou configurez manuellement les variables d'environnement

4. Initialisez la base de données:
   ```bash
   # Appliquez les migrations
   npx supabase db push
   
   # Ou exécutez le fichier de seed directement dans Supabase
   ```

5. Lancez l'application:
   ```bash
   npm run dev
   ```

## 🗄️ Structure de la Base de Données

### Tables Principales

- **users**: Utilisateurs du système
- **user_profiles**: Profils étendus des utilisateurs
- **tenants**: Vendeurs/Locataires de la plateforme
- **products**: Produits du marketplace
- **orders**: Commandes des clients
- **roles**: Rôles du système
- **permissions**: Permissions granulaires

### Données de Test

Le système inclut des données de test pré-configurées:

- **Super Admin**: admin@jeffel.com / password123
- **Clients de test**: aminata@example.com, moussa@example.com, fatou@example.com
- **Vendeurs**: Tech Paradise, Éco Produits, Fashion Sénégal
- **Produits**: Échantillon de produits dans différentes catégories

## 👥 Système de Rôles

### Rôles Disponibles

1. **Super Admin**: Gestion complète de la plateforme
2. **Admin**: Gestion d'un tenant spécifique
3. **Manager**: Gestionnaire avec permissions limitées
4. **Delivery**: Livreur avec accès aux livraisons
5. **Customer**: Client standard

### Permissions

Le système utilise un modèle de permissions granulaire avec des scopes:
- `all`: Accès global
- `tenant`: Accès limité au tenant
- `own`: Accès aux propres données
- `dept`: Accès départemental

## 🏪 Système Multilocataire

### Marketplace Principal
- **JefJel Marketplace**: Tenant par défaut qui agrège tous les vendeurs
- Gestion centralisée des commissions
- Modération du contenu

### Vendeurs
- Chaque vendeur a son propre tenant
- Gestion indépendante des produits et commandes
- Tableau de bord dédié

## 🛒 Fonctionnalités E-commerce

### Pour les Clients
- Navigation du marketplace
- Recherche et filtrage de produits
- Panier d'achat persistant
- Processus de commande complet
- Suivi des commandes

### Pour les Vendeurs
- Gestion des produits et inventaire
- Suivi des commandes et ventes
- Gestion des livraisons
- Analytics et rapports

### Pour les Administrateurs
- Vue d'ensemble de la plateforme
- Gestion des utilisateurs et rôles
- Modération du contenu
- Analytics globales

## 🚚 Système de Livraison

- **Zones de livraison** configurables
- **Livreurs** avec zones assignées
- **Suivi en temps réel** des livraisons
- **Calcul automatique** des frais de livraison

## 🔐 Sécurité

- **Row Level Security (RLS)** sur toutes les tables
- **Authentification** via Supabase Auth
- **Autorisation** basée sur les rôles
- **Validation** côté client et serveur

## 📱 Interface Utilisateur

- **Design responsive** pour mobile et desktop
- **Thème moderne** avec Tailwind CSS
- **Animations** et micro-interactions
- **Accessibilité** optimisée

## 🔧 Configuration

### Variables d'Environnement

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Créez les tables avec les migrations fournies
2. Configurez RLS sur toutes les tables
3. Exécutez le script de seed pour les données initiales
4. Configurez l'authentification email/password

## 🚀 Déploiement

L'application peut être déployée sur:
- **Netlify** (intégration directe)
- **Vercel**
- **Supabase Hosting**

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues! Veuillez:
1. Fork le projet
2. Créer une branche feature
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement.