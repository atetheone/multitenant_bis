import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Store, ShoppingCart, User as UserIcon, Menu, X, LogOut, LogIn, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Button from './Button';

const Header: React.FC = () => {
  const { userProfile, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const navLinks = [
    { title: 'Accueil', path: '/' },
    { title: 'Marketplace', path: '/marketplace' },
    { title: 'Vendeurs', path: '/sellers' },
  ];
  
  const authLinks = userProfile
    ? [
        { 
          title: getUserDashboardTitle(),
          path: getUserDashboardPath()
        },
      ]
    : [];

  function getUserDashboardTitle() {
    if (!userProfile?.roles?.length) return 'Mon Compte';
    
    const role = userProfile.roles[0]?.role?.name;
    switch (role) {
      case 'super-admin':
      case 'admin':
      case 'manager':
      case 'delivery':
        return 'Tableau de Bord';
      default:
        return 'Mes Commandes';
    }
  }

  function getUserDashboardPath() {
    if (!userProfile?.roles?.length) return '/customer/orders';
    
    const role = userProfile.roles[0]?.role?.name;
    switch (role) {
      case 'super-admin':
      case 'admin':
      case 'manager':
      case 'delivery':
        return '/dashboard';
      default:
        return '/customer/orders';
    }
  }
  
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;
  
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Store className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">JefJel</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.concat(authLinks).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium hover:text-blue-600 transition-colors ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {userProfile ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  {userProfile.profile?.avatar_url ? (
                    <img 
                      src={userProfile.profile.avatar_url} 
                      alt={`${userProfile.first_name} ${userProfile.last_name}`} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {userProfile.first_name} {userProfile.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{userProfile.email}</p>
                  </div>
                  
                  {userProfile.roles?.some(ur => ['admin', 'super-admin', 'manager', 'delivery'].includes(ur.role?.name)) && (
                    <Link
                      to="/dashboard"
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Tableau de Bord
                    </Link>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/auth/login')}
                >
                  Connexion
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => navigate('/auth/register')}
                >
                  Inscription
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-20">
          <nav className="container mx-auto px-4 py-3">
            <div className="space-y-1">
              {navLinks.concat(authLinks).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
              
              {userProfile ? (
                <>
                  <div className="px-3 py-2 border-t border-gray-100 mt-2">
                    <div className="flex items-center space-x-3">
                      {userProfile.profile?.avatar_url ? (
                        <img 
                          src={userProfile.profile.avatar_url} 
                          alt={`${userProfile.first_name} ${userProfile.last_name}`} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {userProfile.first_name} {userProfile.last_name}
                        </p>
                        <p className="text-xs text-gray-500">{userProfile.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  {userProfile.roles?.some(ur => ['admin', 'super-admin', 'manager', 'delivery'].includes(ur.role?.name)) && (
                    <Link
                      to="/dashboard"
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Tableau de Bord
                    </Link>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 p-3 border-t border-gray-100 mt-2">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    onClick={() => navigate('/auth/login')}
                    className="flex items-center justify-center"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Connexion
                  </Button>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={() => navigate('/auth/register')}
                  >
                    Inscription
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;