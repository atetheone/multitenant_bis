import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard Pages
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import OrdersPage from './pages/dashboard/OrdersPage';
import CustomersPage from './pages/dashboard/CustomersPage';
import DeliveriesPage from './pages/dashboard/DeliveriesPage';
import ProductsPage from './pages/dashboard/ProductsPage';
import RolesPage from './pages/dashboard/RolesPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Customer Layout Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="products/:productId" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={
                <ProtectedRoute roles={['customer']}>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              
              <Route path="customer/orders" element={
                <ProtectedRoute roles={['customer']}>
                  <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold">Mes Commandes</h1>
                    <p className="mt-4 text-gray-600">Historique de vos commandes et suivi des livraisons.</p>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="sellers" element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-2xl font-bold">Annuaire des Vendeurs</h1>
                  <p className="mt-4 text-gray-600">Découvrez tous nos vendeurs partenaires.</p>
                </div>
              } />
              
              <Route path="sellers/:sellerId" element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-2xl font-bold">Boutique du Vendeur</h1>
                  <p className="mt-4 text-gray-600">Explorez les produits de ce vendeur.</p>
                </div>
              } />
              
              {/* Catch all route for customer layout */}
              <Route path="*" element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-2xl font-bold">404 - Page Non Trouvée</h1>
                  <p className="mt-4 text-gray-600">La page que vous recherchez n'existe pas.</p>
                </div>
              } />
            </Route>

            {/* Authentication Layout Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Dashboard Layout Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute roles={['seller', 'admin', 'super-admin', 'manager', 'delivery']}>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHomePage />} />
              
              <Route path="products" element={
                <ProtectedRoute permissions={['view_products']}>
                  <ProductsPage />
                </ProtectedRoute>
              } />
              
              <Route path="orders" element={
                <ProtectedRoute permissions={['view_orders']}>
                  <OrdersPage />
                </ProtectedRoute>
              } />
              
              <Route path="customers" element={
                <ProtectedRoute permissions={['view_customers']}>
                  <CustomersPage />
                </ProtectedRoute>
              } />
              
              <Route path="deliveries" element={
                <ProtectedRoute permissions={['view_deliveries']}>
                  <DeliveriesPage />
                </ProtectedRoute>
              } />
              
              <Route path="analytics" element={
                <ProtectedRoute permissions={['view_analytics']}>
                  <AnalyticsPage />
                </ProtectedRoute>
              } />
              
              <Route path="roles" element={
                <ProtectedRoute permissions={['manage_roles']}>
                  <RolesPage />
                </ProtectedRoute>
              } />
              
              <Route path="users" element={
                <ProtectedRoute permissions={['view_all_users']}>
                  <div className="text-center py-16">
                    <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
                    <p className="mt-4 text-gray-600">Gérez les utilisateurs et leurs rôles.</p>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="tenants" element={
                <ProtectedRoute permissions={['view_all_tenants']}>
                  <div className="text-center py-16">
                    <h1 className="text-2xl font-bold">Gestion des Tenants</h1>
                    <p className="mt-4 text-gray-600">Gérez les tenants de la plateforme.</p>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="settings" element={
                <ProtectedRoute permissions={['manage_settings']}>
                  <div className="text-center py-16">
                    <h1 className="text-2xl font-bold">Paramètres</h1>
                    <p className="mt-4 text-gray-600">Configurez votre compte et boutique.</p>
                  </div>
                </ProtectedRoute>
              } />
            </Route>

            {/* Legacy redirects */}
            <Route path="/login" element={<Navigate to="/auth/login" replace />} />
            <Route path="/register" element={<Navigate to="/auth/register" replace />} />
            <Route path="/seller/dashboard" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;