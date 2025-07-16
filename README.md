# JefJel - Plateforme E-commerce Multilocataire

Une plateforme e-commerce multilocataire moderne construite avec React, TypeScript, Tailwind CSS et un système d'authentification mock pour le développement.

## 🚀 Fonctionnalités

- **Authentification complète** avec système mock intégré
- **Système multilocataire** avec gestion des vendeurs
- **Gestion des rôles et permissions** granulaire
- **Marketplace** avec produits de différents vendeurs
- **Panier d'achat** et système de commandes
- **Tableau de bord administrateur** complet
- **Gestion des livraisons** et zones de livraison
- **Interface responsive** et moderne

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Système mock en mémoire (pour développement)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. Clonez le repository
2. Installez les dépendances:
   ```bash
   npm install
   ```

3. Lancez l'application:
   ```bash
   npm run dev
   ```

## 🔐 Comptes de Test

L'application utilise un système d'authentification mock avec des comptes pré-configurés :

### Super Administrateur
- **Email**: admin@jeffel.com
- **Mot de passe**: password123
- **Accès**: Tableau de bord complet, gestion des tenants

### Clients
- **Email**: aminata@example.com / **Mot de passe**: password123
- **Email**: moussa@example.com / **Mot de passe**: password123

### Administrateur Tenant
- **Email**: marie@exemple.com / **Mot de passe**: password123
- **Accès**: Gestion de Tech Paradise

### Livreur
- **Email**: amadou@exemple.com / **Mot de passe**: password123
- **Accès**: Interface de livraison

## 🗄️ Structure de la Base de Données

Le système utilise des données mock en mémoire qui simulent la structure suivante :

### Tables Principales

- **users**: Utilisateurs du système
- **user_profiles**: Profils étendus des utilisateurs
- **tenants**: Vendeurs/Locataires de la plateforme
- **products**: Produits du marketplace
- **orders**: Commandes des clients
- **roles**: Rôles du système
- **permissions**: Permissions granulaires

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

Le système fonctionne avec des données mock en mémoire, aucune configuration de base de données n'est requise pour le développement.

Pour passer à une vraie base de données Supabase, modifiez la constante `USE_MOCK_AUTH` dans `src/contexts/AuthContext.tsx`.

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