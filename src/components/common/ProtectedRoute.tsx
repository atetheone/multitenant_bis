import React from 'react';
import { Navigate } from 'react-router-dom';
import { Permission } from '../../types/permissions';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: Permission[];
  roles?: Array<'customer' | 'seller' | 'admin' | 'super-admin' | 'manager' | 'delivery'>;
  requireAll?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permissions = [],
  roles = [],
  requireAll = false,
  redirectTo = '/auth/login'
}) => {
  const { currentUser } = useAuth();
  const { hasAnyPermission, hasAllPermissions } = usePermissions();

  // Vérifier si l'utilisateur est connecté
  if (!currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  // Vérifier les rôles si spécifiés
  if (roles.length > 0) {
    if (!roles.includes(currentUser.role)) {
      return <Navigate to="/" replace />;
    }
  }

  // Vérifier les permissions si spécifiées
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
    
    if (!hasAccess) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;