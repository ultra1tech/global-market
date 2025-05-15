
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import supabase from '@/lib/supabase';
import { toast } from "sonner";

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
  role: 'buyer' | 'seller' | 'admin';
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
  getDashboardPath: () => string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test users for development
const TEST_USERS = {
  'buyer@example.com': {
    id: 'test-buyer-id',
    email: 'buyer@example.com',
    role: 'buyer' as 'buyer',
    name: 'Test Buyer',
    password: 'password123',
    avatar: null
  },
  'seller@example.com': {
    id: 'test-seller-id',
    email: 'seller@example.com',
    role: 'seller' as 'seller',
    name: 'Test Seller',
    password: 'password123',
    avatar: null
  },
  'admin@example.com': {
    id: 'test-admin-id',
    email: 'admin@example.com',
    role: 'admin' as 'admin',
    name: 'Test Admin',
    password: 'password123',
    avatar: null
  }
};

// Utility function to validate role
const validateRole = (role: string): 'buyer' | 'seller' | 'admin' => {
  if (role === 'buyer' || role === 'seller' || role === 'admin') {
    return role;
  }
  // Default to buyer if invalid role
  return 'buyer';
};

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount or from localStorage
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      
      try {
        // First, check localStorage for a saved user
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          // Ensure the role is valid
          parsedUser.role = validateRole(parsedUser.role);
          
          setUser(parsedUser as User);
          setIsLoading(false);
          return;
        }

        // If no localStorage user, check Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (data.session?.user) {
          // In a real app, we would fetch additional user data here
          const newUser: User = {
            id: data.session.user.id,
            email: data.session.user.email || '',
            role: 'buyer', // Default role, would be fetched from user profile
            name: 'User',  // Default name, would be fetched from user profile
            avatar: null
          };
          setUser(newUser);
          localStorage.setItem('auth_user', JSON.stringify(newUser));
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

  // Get dashboard path based on user role
  const getDashboardPath = (): string => {
    if (!user) return "/login";
    
    switch (user.role) {
      case "buyer": return "/buyer/dashboard";
      case "seller": return "/seller-dashboard";
      case "admin": return "/admin";
      default: return "/";
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // Check if email is one of our test users
      const testUser = TEST_USERS[email as keyof typeof TEST_USERS];
      
      if (testUser && testUser.password === password) {
        // Create user object from test user (omitting password)
        const { password: _, ...userObj } = testUser;
        setUser(userObj as User);
        localStorage.setItem('auth_user', JSON.stringify(userObj));
        toast.success(`Welcome back, ${userObj.name}!`);
        return;
      }
      
      // If not a test user, try Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.user) {
        // In a real app, we would fetch additional user data here
        const newUser: User = {
          id: data.user.id,
          email: data.user.email || '',
          role: 'buyer', // Default role, would be fetched from user profile
          name: 'User',  // Default name, would be fetched from user profile
          avatar: null
        };
        setUser(newUser);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Invalid email or password. Please try again.");
      throw error;
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      // For development, simulate registration
      if (import.meta.env.DEV) {
        // Check if email already exists in test users
        if (TEST_USERS[data.email as keyof typeof TEST_USERS]) {
          throw new Error('Email already in use');
        }
        
        // Create a new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          role: validateRole(data.role),
          name: data.name,
          avatar: null
        };
        
        setUser(newUser);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
        toast.success("Registration successful!");
        return;
      }
      
      // For production, use Supabase
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
      
      // Auto-login after registration
      await login(data.email, data.password);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('auth_user');
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Error logging out");
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<User>) => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      // Update local user state
      const updatedUser = { ...user, ...data };
      // Ensure role is valid
      if (data.role) {
        updatedUser.role = validateRole(data.role);
      }
      
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error("Failed to update profile");
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
    updateUserProfile,
    getDashboardPath
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
