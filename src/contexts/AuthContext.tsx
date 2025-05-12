
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, signIn, signUp, signOut } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

// Define user types
type UserRole = "buyer" | "seller" | "admin";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<UserProfile> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // Initialize authentication state from Supabase session
  useEffect(() => {
    const initializeAuth = async () => {
      // Get session from storage or initial session from URL
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      if (initialSession) {
        await updateUserProfile(initialSession.user);
        setSession(initialSession);
      }
      setLoading(false);
      
      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, newSession) => {
        if (newSession) {
          await updateUserProfile(newSession.user);
          setSession(newSession);
        } else {
          setUser(null);
          setSession(null);
        }
      });
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);

  // Helper to fetch and update user profile from Supabase
  const updateUserProfile = async (authUser: User | null) => {
    if (!authUser) {
      setUser(null);
      return;
    }
    
    // Get the user's profile from the database
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();
    
    if (error || !data) {
      console.error('Error fetching user profile', error);
      setUser(null);
      return;
    }
    
    setUser({
      id: authUser.id,
      email: authUser.email || '',
      name: data.full_name || data.username,
      role: data.role,
      avatar: data.avatar_url
    });
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) throw error;
      
      if (data.user) {
        await updateUserProfile(data.user);
      }
      
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<UserProfile> & { password: string }) => {
    setLoading(true);
    try {
      const { data, error } = await signUp(
        userData.email || '', 
        userData.password,
        {
          name: userData.name,
          role: userData.role || 'buyer'
        }
      );
      
      if (error) throw error;
      
      if (data.user) {
        await updateUserProfile(data.user);
      }
      
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
    } catch (err) {
      console.error('Logout error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // For Mock Users (can be removed once Supabase is fully set up)
  const mockLogin = async (email: string, password: string) => {
    // Check if Supabase is configured - get the URL and key from the imported supabase client
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    
    if (supabase && supabaseUrl && supabaseAnonKey) {
      return login(email, password);
    }
    
    // Fall back to mock users
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    
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
    
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("baw_user", JSON.stringify(userWithoutPassword));
    } else {
      throw new Error("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        loading,
        login: mockLogin, // Use mockLogin for now, which will try Supabase first
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
