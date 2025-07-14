import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
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
      await signIn({ email, password });
      
      // Redirect based on redirect parameter or to home
      if (redirectTo === 'checkout') {
        navigate('/checkout');
      } else if (redirectTo !== '/') {
        navigate(redirectTo);
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
                required
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
                required
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
          <p className="text-sm text-gray-600 mb-3">
            <strong>Pour tester l'application :</strong>
          </p>
          <div className="text-xs text-gray-500 space-y-2">
            <p><strong>Super Admin:</strong> admin@jeffel.com / password123</p>
            <p><strong>Client:</strong> aminata@example.com / password123</p>
            <p>Ou créez un nouveau compte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;