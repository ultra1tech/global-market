
import React, { createContext, useContext, useState } from "react";

// Define user types
type UserRole = "buyer" | "seller" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "John Buyer",
    email: "buyer@example.com",
    password: "password123",
    role: "buyer" as UserRole,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Sarah Seller",
    email: "seller@example.com",
    password: "password123",
    role: "seller" as UserRole,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin" as UserRole,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("baw_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Find user with matching email and password
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      // Remove password from user data before storing
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("baw_user", JSON.stringify(userWithoutPassword));
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const emailExists = mockUsers.some((u) => u.email === userData.email);
    if (emailExists) {
      throw new Error("Email already in use");
    }
    
    // Create new user (in a real app, this would be handled by the backend)
    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "buyer",
      avatar: userData.avatar,
    };
    
    // Login the new user
    setUser(newUser);
    localStorage.setItem("baw_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("baw_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
