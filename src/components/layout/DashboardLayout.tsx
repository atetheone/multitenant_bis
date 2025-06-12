import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Store, 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  User as UserIcon,
  Truck,
  BarChart3,
  Building,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import PermissionGate from '../common/PermissionGate';

const DashboardLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { isAdmin, isSuperAdmin, isDelivery } = usePermissions();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { 
      name: 'Tableau de Bord', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      permissions: []
    },
    { 
      name: 'Produits', 
      href: '/dashboard/products', 
      icon: Package,
      permissions: ['view_products']
    },
    { 
      name: 'Commandes', 
      href: '/dashboard/orders', 
      icon: ShoppingCart,
      permissions: ['view_orders']
    },
    { 
      name: 'Clients', 
      href: '/dashboard/customers', 
      icon: Users,
      permissions: ['view_customers']
    },
    { 
      name: 'Livraisons', 
      href: '/dashboard/deliveries', 
      icon: Truck,
      permissions: ['view_deliveries']
    },
    { 
      name: 'Statistiques', 
      href: '/dashboard/analytics', 
      icon: BarChart3,
      permissions: ['view_analytics']
    },
    { 
      name: 'Utilisateurs', 
      href: '/dashboard/users', 
      icon: Shield,
      permissions: ['view_all_users']
    },
    { 
      name: 'Tenants', 
      href: '/dashboard/tenants', 
      icon: Building,
      permissions: ['view_all_tenants']
    },
    { 
      name: 'Paramètres', 
      href: '/dashboard/settings', 
      icon: Settings,
      permissions: ['manage_settings']
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super-admin': return 'Super Administrateur';
      case 'admin': return 'Administrateur';
      case 'seller': return 'Vendeur';
      case 'manager': return 'Gestionnaire';
      case 'delivery': return 'Livreur';
      default: return role;
    }
  };

  const NavigationItems = () => (
    <>
      {navigation.map((item) => (
        <PermissionGate key={item.name} permissions={item.permissions}>
          <Link
            to={item.href}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isActive(item.href)
                ? 'bg-blue-100 text-blue-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        </PermissionGate>
      ))}
    </>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Store className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">JefJel</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <NavigationItems />
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white shadow">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Store className="w-8 h-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">JefJel</span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <NavigationItems />
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <span className="text-lg font-medium text-gray-900">
                      Gestion - {getRoleDisplayName(currentUser?.role || '')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="relative">
                <div className="flex items-center space-x-3">
                  {currentUser?.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">{currentUser?.name}</span>
                    <span className="text-xs text-gray-500">{getRoleDisplayName(currentUser?.role || '')}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;