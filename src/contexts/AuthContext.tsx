import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { apiService } from '../services/apiService';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'customer' | 'seller') => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistence)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const response = await apiService.login({ email, password });
    
    if (!response.success) {
      throw new Error(response.message || 'Erreur de connexion');
    }
    
    const user = response.data.user;
    
    // Set current user and store in localStorage
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', response.data.token);
    
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'customer' | 'seller'
  ): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Normalize email for case-insensitive comparison
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if email is already in use (case-insensitive)
    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error('Cette adresse email est déjà utilisée');
    }
    
    // Create new user (in a real app, we would save this to a database)
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email: normalizedEmail,
      role,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    
    // Add to users array for this session
    users.push(newUser);
    
    // Set current user and store in localStorage
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};