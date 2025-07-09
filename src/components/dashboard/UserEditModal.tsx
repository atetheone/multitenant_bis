import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Shield, Save } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

interface UserEditModalProps {
  user: any;
  onClose: () => void;
  onSubmit: (userData: any) => void;
  loading?: boolean;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ user, onClose, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'customer',
    tenant_id: '',
    status: 'active',
    bio: '',
    website: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        role: user.role || 'customer',
        tenant_id: user.tenant_id?.toString() || '',
        status: user.status || 'active',
        bio: user.bio || '',
        website: user.website || ''
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Le prénom est requis';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Le nom est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, id: user.id });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <User className="w-6 h-6 mr-2" />
              Modifier l'utilisateur - {user?.first_name} {user?.last_name}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Informations de base */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informations de base</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom d'utilisateur *"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                error={errors.username}
                fullWidth
              />
              
              <Input
                label="Email *"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                fullWidth
              />
              
              <Input
                label="Prénom *"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                error={errors.first_name}
                fullWidth
              />
              
              <Input
                label="Nom *"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                error={errors.last_name}
                fullWidth
              />
              
              <Input
                label="Téléphone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Informations supplémentaires</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Parlez-nous de cet utilisateur..."
                />
              </div>
              
              <Input
                label="Site web"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://exemple.com"
                fullWidth
              />
            </div>
          </div>

          {/* Rôle et permissions */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Rôle et permissions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rôle *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="customer">Client</option>
                  <option value="delivery">Livreur</option>
                  <option value="manager">Gestionnaire</option>
                  <option value="admin">Administrateur</option>
                  <option value="super-admin">Super Administrateur</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tenant
                </label>
                <select
                  value={formData.tenant_id}
                  onChange={(e) => handleInputChange('tenant_id', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un tenant</option>
                  <option value="1">JefJel Marketplace</option>
                  <option value="2">Tech Paradise</option>
                  <option value="3">Éco Produits</option>
                </select>
              </div>
            </div>
          </div>

          {/* Statut */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Statut du compte</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="suspended">Suspendu</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </div>
        </form>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;