
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import supabase from '@/lib/supabase';

// Define user type
interface User {
  id: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  name: string;
  avatar: string | null;
}

// Define registration data type
interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller';
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (data.session?.user) {
          // In a real app, we would fetch additional user data here
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || '',
            role: 'buyer', // Default role, would be fetched from user profile
            name: 'User',  // Default name, would be fetched from user profile
            avatar: null
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // For development, add special test users
      if (import.meta.env.DEV) {
        if (['admin@example.com', 'seller@example.com', 'buyer@example.com'].includes(email) && 
            password === 'password') {
          // These are test users for different roles
          const role = email.split('@')[0] as 'admin' | 'seller' | 'buyer';
          setUser({
            id: `test-${role}-id`,
            email,
            role,
            name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            avatar: null
          });
          return;
        }
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.user) {
        // In a real app, we would fetch additional user data here
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          role: 'buyer', // Default role, would be fetched from user profile
          name: 'User',  // Default name, would be fetched from user profile
          avatar: null
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role
          }
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Auto-login after registration (in a real app, we might want email verification first)
      await login(data.email, data.password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<User>) => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      // In a real app, we would update the user profile in the database
      setUser({ ...user, ...data });
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
