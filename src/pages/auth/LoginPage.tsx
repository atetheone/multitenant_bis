import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
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
    } catch (err) {
      setError('Identifiants invalides. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
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
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            <strong>Comptes de démonstration :</strong>
            <br />
            <span className="text-green-600 font-medium">Super-Admin : admin@jeffel.com</span>
            <br />
            <span className="text-blue-600 font-medium">Admin Marketplace : marketplace@jeffel.com</span>
            <br />
            Client : jean@exemple.com
            <br />
            Admin Tenant : marie@exemple.com (Tech Paradise)
            <br />
            Admin Tenant : pierre@exemple.com (Éco Produits)
            <br />
            Gestionnaire : fatou@exemple.com
            <br />
            Livreur : amadou@exemple.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;