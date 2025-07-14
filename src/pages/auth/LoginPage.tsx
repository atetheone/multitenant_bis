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
    
    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setError('Configuration manquante. Veuillez configurer Supabase en cliquant sur "Connect to Supabase" en haut à droite.');
      return;
    }
    
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
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou mot de passe incorrect. Assurez-vous d\'avoir exécuté le script de seed dans Supabase.';
      } else if (err.message?.includes('User not found')) {
        errorMessage = 'Utilisateur non trouvé. Veuillez créer l\'utilisateur admin@jeffel.com dans Supabase Auth Dashboard.';
      } else if (err.message?.includes('fetch')) {
        errorMessage = 'Impossible de se connecter à Supabase. Vérifiez votre configuration.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('Login error:', err);
      console.error('Supabase URL configured:', !!import.meta.env.VITE_SUPABASE_URL);
      console.error('Supabase Key configured:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
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
          <div className="bg-red-50 border-2 border-red-300 rounded-md p-4">
            <p className="text-lg font-bold text-red-800 mb-3 flex items-center">
              🚨 SETUP REQUIS - Lisez COMPLETE_SETUP_GUIDE.md
            </p>
            <div className="text-sm text-red-700 space-y-2">
              <p className="font-bold">ÉTAPES OBLIGATOIRES :</p>
              <div className="bg-red-100 p-3 rounded border-l-4 border-red-500">
                <p className="font-bold">1. Créer utilisateur dans Supabase Auth Dashboard</p>
                <p>Email: admin@jeffel.com | Password: password123</p>
                <p className="text-red-600">✅ Email Confirm DOIT être coché!</p>
              </div>
              <div className="bg-red-100 p-3 rounded border-l-4 border-red-500">
                <p className="font-bold">2. Exécuter supabase/fix_auth_setup.sql</p>
                <p>Dans Supabase Dashboard → SQL Editor</p>
              </div>
              <p className="font-bold text-red-600 text-center mt-3">
                ⚠️ SANS CES ÉTAPES, LA CONNEXION ÉCHOUERA TOUJOURS!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;