import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Lock, Mail, Store } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const RegisterPage: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'customer' as 'customer' | 'seller',
    businessName: '',
    businessDescription: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (formData.accountType === 'seller' && (!formData.businessName || !formData.businessDescription)) {
      setError('Veuillez remplir les informations de votre entreprise');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username
      });
      
      // TODO: If seller, create tenant after successful registration
      if (formData.accountType === 'seller') {
        // This would be handled in a separate API call to create the tenant
        console.log('Seller registration - would create tenant:', {
          name: formData.businessName,
          description: formData.businessDescription
        });
      }
      
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Échec de l\'inscription. Veuillez réessayer.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 px-6 py-8 text-center">
        <h1 className="text-2xl font-bold text-white flex items-center justify-center">
          <UserPlus className="w-6 h-6 mr-2" />
          Inscription
        </h1>
        <p className="text-blue-100 mt-2">Rejoignez la communauté JefJel</p>
      </div>
      
      <div className="p-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                fullWidth
                className="pl-10"
                required
              />
            </div>
            
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Nom"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                fullWidth
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                fullWidth
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Adresse Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                fullWidth
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="password"
                placeholder="Mot de Passe"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                fullWidth
                className="pl-10"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="password"
                placeholder="Confirmer le Mot de Passe"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                fullWidth
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Type de Compte :</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleInputChange('accountType', 'customer')}
                className={`p-4 border rounded-lg transition-colors text-center ${
                  formData.accountType === 'customer'
                    ? 'bg-blue-50 border-blue-600 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Client</div>
                <div className="text-xs mt-1">Acheter des produits</div>
              </button>
              
              <button
                type="button"
                onClick={() => handleInputChange('accountType', 'seller')}
                className={`p-4 border rounded-lg transition-colors text-center ${
                  formData.accountType === 'seller'
                    ? 'bg-blue-50 border-blue-600 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Store className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Vendeur</div>
                <div className="text-xs mt-1">Créer une boutique</div>
              </button>
            </div>
          </div>
          
          {formData.accountType === 'seller' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-3">Informations de votre Entreprise</h3>
              
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Nom de votre Entreprise"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  fullWidth
                  required
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Description de votre Entreprise"
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  required
                />
              </div>
            </div>
          )}
          
          <Button 
            variant="primary" 
            size="lg" 
            type="submit" 
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Création du compte...' : 'S\'inscrire'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;