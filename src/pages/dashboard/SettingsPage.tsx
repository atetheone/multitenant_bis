import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard, 
  Truck, 
  Mail,
  Save,
  Eye,
  EyeOff,
  Upload,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { isSuperAdmin, isAdmin } = usePermissions();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // États pour les différents paramètres
  const [profileSettings, setProfileSettings] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    avatar: currentUser?.avatar || '',
    bio: '',
    website: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginNotifications: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      orderUpdates: true,
      marketing: false,
      security: true,
      delivery: true,
      systemUpdates: true
    },
    pushNotifications: {
      orderUpdates: true,
      marketing: false,
      delivery: true
    },
    smsNotifications: {
      orderUpdates: false,
      security: true,
      delivery: true
    }
  });

  const [systemSettings, setSystemSettings] = useState({
    siteName: 'JefJel Marketplace',
    siteDescription: 'Plateforme e-commerce multilocataire du Sénégal',
    currency: 'FCFA',
    timezone: 'Africa/Dakar',
    language: 'fr',
    maintenanceMode: false,
    registrationEnabled: true,
    guestCheckout: true
  });

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    darkMode: false,
    compactMode: false
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: false,
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalEnabled: false,
    paypalClientId: '',
    mobileMoneyEnabled: true,
    cashOnDeliveryEnabled: true
  });

  const [deliverySettings, setDeliverySettings] = useState({
    freeDeliveryThreshold: 50000,
    defaultDeliveryFee: 2000,
    maxDeliveryDistance: 50,
    estimatedDeliveryTime: '2-4 heures',
    trackingEnabled: true,
    smsNotificationsEnabled: true
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    ...(isSuperAdmin || isAdmin ? [
      { id: 'system', label: 'Système', icon: Settings },
      { id: 'theme', label: 'Thème', icon: Palette },
      { id: 'payments', label: 'Paiements', icon: CreditCard },
      { id: 'delivery', label: 'Livraison', icon: Truck }
    ] : [])
  ];

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${section} settings...`);
      // Ici on ferait l'appel API pour sauvegarder
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations Personnelles</h3>
        
        {/* Avatar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo de profil</label>
          <div className="flex items-center space-x-4">
            {profileSettings.avatar ? (
              <img 
                src={profileSettings.avatar} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Changer
              </Button>
              {profileSettings.avatar && (
                <Button variant="outline" size="sm" className="flex items-center text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            value={profileSettings.firstName}
            onChange={(e) => setProfileSettings({...profileSettings, firstName: e.target.value})}
            fullWidth
          />
          <Input
            label="Nom"
            value={profileSettings.lastName}
            onChange={(e) => setProfileSettings({...profileSettings, lastName: e.target.value})}
            fullWidth
          />
          <Input
            label="Email"
            type="email"
            value={profileSettings.email}
            onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
            fullWidth
          />
          <Input
            label="Téléphone"
            value={profileSettings.phone}
            onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
            fullWidth
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={profileSettings.bio}
            onChange={(e) => setProfileSettings({...profileSettings, bio: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Parlez-nous de vous..."
          />
        </div>

        <Input
          label="Site web"
          value={profileSettings.website}
          onChange={(e) => setProfileSettings({...profileSettings, website: e.target.value})}
          fullWidth
          className="mt-4"
        />

        <div className="mt-6">
          <Button 
            variant="primary" 
            onClick={() => handleSave('profile')}
            disabled={loading}
            className="flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Changer le mot de passe</h3>
        
        <div className="space-y-4">
          <Input
            label="Mot de passe actuel"
            type="password"
            value={securitySettings.currentPassword}
            onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
            fullWidth
          />
          
          <div className="relative">
            <Input
              label="Nouveau mot de passe"
              type={showPassword ? "text" : "password"}
              value={securitySettings.newPassword}
              onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
              fullWidth
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          <Input
            label="Confirmer le nouveau mot de passe"
            type="password"
            value={securitySettings.confirmPassword}
            onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
            fullWidth
          />
        </div>

        <Button 
          variant="primary" 
          onClick={() => handleSave('security')}
          disabled={loading}
          className="flex items-center mt-4"
        >
          <Save className="w-4 h-4 mr-2" />
          Changer le mot de passe
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Authentification à deux facteurs</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Ajoutez une couche de sécurité supplémentaire à votre compte
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorEnabled}
              onChange={(e) => setSecuritySettings({...securitySettings, twoFactorEnabled: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications de connexion</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Recevoir des notifications lors de nouvelles connexions
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.loginNotifications}
              onChange={(e) => setSecuritySettings({...securitySettings, loginNotifications: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          Notifications Email
        </h3>
        
        <div className="space-y-4">
          {Object.entries(notificationSettings.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {key === 'orderUpdates' && 'Mises à jour des commandes'}
                  {key === 'marketing' && 'Emails marketing'}
                  {key === 'security' && 'Alertes de sécurité'}
                  {key === 'delivery' && 'Notifications de livraison'}
                  {key === 'systemUpdates' && 'Mises à jour système'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: {
                      ...notificationSettings.emailNotifications,
                      [key]: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications Push
        </h3>
        
        <div className="space-y-4">
          {Object.entries(notificationSettings.pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {key === 'orderUpdates' && 'Mises à jour des commandes'}
                  {key === 'marketing' && 'Promotions et offres'}
                  {key === 'delivery' && 'Notifications de livraison'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    pushNotifications: {
                      ...notificationSettings.pushNotifications,
                      [key]: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="primary" 
        onClick={() => handleSave('notifications')}
        disabled={loading}
        className="flex items-center"
      >
        <Save className="w-4 h-4 mr-2" />
        Sauvegarder les préférences
      </Button>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres généraux</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom du site"
            value={systemSettings.siteName}
            onChange={(e) => setSystemSettings({...systemSettings, siteName: e.target.value})}
            fullWidth
          />
          <Input
            label="Description du site"
            value={systemSettings.siteDescription}
            onChange={(e) => setSystemSettings({...systemSettings, siteDescription: e.target.value})}
            fullWidth
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
            <select
              value={systemSettings.currency}
              onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="FCFA">FCFA</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fuseau horaire</label>
            <select
              value={systemSettings.timezone}
              onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Africa/Dakar">Africa/Dakar</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Mode maintenance</p>
              <p className="text-sm text-gray-600">Désactiver temporairement le site</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.maintenanceMode}
                onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Inscription ouverte</p>
              <p className="text-sm text-gray-600">Permettre aux nouveaux utilisateurs de s'inscrire</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.registrationEnabled}
                onChange={(e) => setSystemSettings({...systemSettings, registrationEnabled: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <Button 
          variant="primary" 
          onClick={() => handleSave('system')}
          disabled={loading}
          className="flex items-center mt-6"
        >
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et paramètres du système</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation des onglets */}
        <div className="lg:w-1/4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="lg:w-3/4">
          {activeTab === 'profile' && renderProfileSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'system' && renderSystemSettings()}
          {/* Autres onglets à implémenter selon les besoins */}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;