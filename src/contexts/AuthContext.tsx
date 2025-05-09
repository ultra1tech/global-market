
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define types
type UserRole = "buyer" | "seller" | "admin";

interface Store {
  id: string;
  name: string;
  description: string;
  logo: string;
  country: string;
  language: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  store?: Store;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
  createStore: (storeData: Omit<Store, "id">) => Promise<void>;
  updateStore: (storeData: Partial<Store>) => Promise<void>;
}

// Mock users for demo
const MOCK_USERS = [
  {
    id: "b1",
    name: "John Buyer",
    email: "buyer@example.com",
    password: "password",
    role: "buyer" as UserRole,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"
  },
  {
    id: "s1",
    name: "Sarah Seller",
    email: "seller@example.com",
    password: "password",
    role: "seller" as UserRole,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
    store: {
      id: "st1",
      name: "Sarah's Crafts",
      description: "Handmade crafts from around the world",
      logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3",
      country: "United States",
      language: "English"
    }
  },
  {
    id: "a1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin" as UserRole,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3"
  }
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("baw_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user", error);
        localStorage.removeItem("baw_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: UserRole): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email and password
      const foundUser = MOCK_USERS.find(u => 
        u.email === email && 
        u.password === password && 
        (!role || u.role === role)
      );
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("baw_user", JSON.stringify(userWithoutPassword));
      
      toast.success("Login successful");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const emailExists = MOCK_USERS.some(u => u.email === email);
      if (emailExists) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser: User = {
        id: `${role[0]}${MOCK_USERS.length + 1}`, // Generate dummy ID
        name,
        email,
        role,
      };
      
      // In a real app, we would save to backend
      // For mock purposes, we'll just set in local state
      setUser(newUser);
      localStorage.setItem("baw_user", JSON.stringify(newUser));
      
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("baw_user");
    toast.success("Successfully logged out");
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("baw_user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
    }
  };

  const createStore = async (storeData: Omit<Store, "id">): Promise<void> => {
    if (!user || user.role !== "seller") {
      toast.error("Only sellers can create stores");
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newStore: Store = {
        ...storeData,
        id: `st${Math.floor(Math.random() * 1000)}`, // Generate dummy ID
      };
      
      // Update user with store
      const updatedUser = { ...user, store: newStore };
      setUser(updatedUser);
      localStorage.setItem("baw_user", JSON.stringify(updatedUser));
      
      toast.success("Store created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create store");
      throw error;
    }
  };

  const updateStore = async (storeData: Partial<Store>): Promise<void> => {
    if (!user || user.role !== "seller" || !user.store) {
      toast.error("No store to update");
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update store data
      const updatedStore = { ...user.store, ...storeData };
      const updatedUser = { ...user, store: updatedStore };
      
      setUser(updatedUser);
      localStorage.setItem("baw_user", JSON.stringify(updatedUser));
      
      toast.success("Store updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update store");
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    updateUser,
    createStore,
    updateStore,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
