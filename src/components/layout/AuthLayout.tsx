import React from 'react';
import { Outlet } from 'react-router-dom';
import { Store } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Store className="w-12 h-12 text-blue-600 mr-3" />
            <span className="text-3xl font-bold text-gray-900">JefJel</span>
          </div>
          <p className="text-gray-600">Votre marketplace de confiance au Sénégal</p>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;