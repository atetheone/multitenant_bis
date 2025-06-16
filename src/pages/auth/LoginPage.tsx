import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Veuillez saisir votre email et mot de passe');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const user = await login(email, password);
      
      // Redirect based on user role and redirect parameter
      if (user.role === 'admin' || user.role === 'super-admin' || user.role === 'manager' || user.role === 'delivery') {
        navigate('/dashboard');
      } else if (redirectTo === 'checkout') {
        navigate('/checkout');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Une erreur est survenue lors de la connexion';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123'); // Set a demo password
    setError('');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 px-6 py-8 text-center">
        <h1 className="text-2xl font-bold text-white flex items-center justify-center">
          <LogIn className="w-6 h-6 mr-2" />
          Connexion
        </h1>
        <p className="text-blue-100 mt-2">Accédez à votre compte JefJel</p>
      </div>
      
      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Adresse Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="password"
                placeholder="Mot de Passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                className="pl-10"
              />
            </div>
          </div>
          
          <Button 
            variant="primary" 
            size="lg" 
            type="submit" 
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se Connecter'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link to="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
              S'inscrire
            </Link>
          </p>
        </div>
        
        <div className="mt-6 border-t pt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            <strong>Comptes de démonstration :</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@jeffel.com')}
              className="text-left p-2 rounded bg-green-50 hover:bg-green-100 border border-green-200 transition-colors"
            >
              <span className="text-green-700 font-medium">Super-Admin</span>
              <br />
              <span className="text-green-600">admin@jeffel.com</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin('marketplace@jeffel.com')}
              className="text-left p-2 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <span className="text-blue-700 font-medium">Admin Marketplace</span>
              <br />
              <span className="text-blue-600">marketplace@jeffel.com</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin('jean@exemple.com')}
              className="text-left p-2 rounded bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              <span className="text-gray-700 font-medium">Client</span>
              <br />
              <span className="text-gray-600">jean@exemple.com</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin('marie@exemple.com')}
              className="text-left p-2 rounded bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
            >
              <span className="text-purple-700 font-medium">Admin Tech Paradise</span>
              <br />
              <span className="text-purple-600">marie@exemple.com</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin('pierre@exemple.com')}
              className="text-left p-2 rounded bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
            >
              <span className="text-orange-700 font-medium">Admin Éco Produits</span>
              <br />
              <span className="text-orange-600">pierre@exemple.com</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin('fatou@exemple.com')}
              className="text-left p-2 rounded bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              <span className="text-indigo-700 font-medium">Gestionnaire</span>
              <br />
              <span className="text-indigo-600">fatou@exemple.com</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin('amadou@exemple.com')}
              className="text-left p-2 rounded bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-colors"
            >
              <span className="text-yellow-700 font-medium">Livreur</span>
              <br />
              <span className="text-yellow-600">amadou@exemple.com</span>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
            Cliquez sur un compte pour remplir automatiquement les champs de connexion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;