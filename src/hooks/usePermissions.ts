import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../types/permissions';
import { getPermissionsForRole, hasPermission, hasAnyPermission, hasAllPermissions } from '../data/roles';

export const usePermissions = () => {
  const { currentUser } = useAuth();

  const getUserPermissions = (): Permission[] => {
    if (!currentUser) return [];
    
    // Obtenir les permissions de base du rôle
    const basePermissions = getPermissionsForRole(currentUser.role);
    
    // TODO: Ajouter les permissions personnalisées depuis la base de données
    // const customPermissions = await getUserCustomPermissions(currentUser.id);
    
    return basePermissions;
  };

  const checkPermission = (permission: Permission): boolean => {
    const userPermissions = getUserPermissions();
    return hasPermission(userPermissions, permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    const userPermissions = getUserPermissions();
    return hasAnyPermission(userPermissions, permissions);
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    const userPermissions = getUserPermissions();
    return hasAllPermissions(userPermissions, permissions);
  };

  const canAccessRoute = (routePermissions: Permission[]): boolean => {
    if (routePermissions.length === 0) return true;
    return checkAnyPermission(routePermissions);
  };

  return {
    permissions: getUserPermissions(),
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
    canAccessRoute,
    isAdmin: currentUser?.role === 'admin' || currentUser?.role === 'super-admin',
    isSuperAdmin: currentUser?.role === 'super-admin',
    isDelivery: currentUser?.role === 'delivery',
    isManager: currentUser?.role === 'manager',
    isSeller: currentUser?.role === 'seller'
  };
};