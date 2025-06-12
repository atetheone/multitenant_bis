import React from 'react';
import { Permission } from '../../types/permissions';
import { usePermissions } from '../../hooks/usePermissions';

interface PermissionGateProps {
  children: React.ReactNode;
  permissions?: Permission[];
  requireAll?: boolean; // Si true, toutes les permissions sont requises, sinon une seule suffit
  fallback?: React.ReactNode;
  roles?: Array<'customer' | 'seller' | 'admin' | 'super-admin' | 'manager' | 'delivery'>;
}

const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permissions = [],
  requireAll = false,
  fallback = null,
  roles = []
}) => {
  const { hasAnyPermission, hasAllPermissions, currentUser } = usePermissions();

  // Vérifier les rôles si spécifiés
  if (roles.length > 0 && currentUser) {
    if (!roles.includes(currentUser.role)) {
      return <>{fallback}</>;
    }
  }

  // Vérifier les permissions si spécifiées
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
    
    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};

export default PermissionGate;