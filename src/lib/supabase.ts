import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a production Supabase client when credentials exist
// Otherwise, create a mock client for development
const client = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Export client as default
export default client;

// Type for the auth error
interface AuthError {
  message: string;
}

// Mock client for development when no credentials are provided
function createMockClient(): SupabaseClient {
  console.warn('Using mock Supabase client. Please provide valid credentials.');
  
  // Mock data
  const users = [
    { id: '1', email: 'admin@example.com', role: 'admin', name: 'Admin User', avatar: null },
    { id: '2', email: 'seller@example.com', role: 'seller', name: 'Seller User', avatar: null },
    { id: '3', email: 'buyer@example.com', role: 'buyer', name: 'Buyer User', avatar: null },
  ];
  
  const mockClient = {
    // Auth methods
    auth: {
      signUp: ({ email, password }: { email: string, password: string }) => {
        return Promise.resolve({ 
          data: { user: { id: '999', email, role: 'buyer' } }, 
          error: null 
        });
      },
      signInWithPassword: (credentials: { email: string, password: string }) => {
        const user = users.find(u => u.email === credentials.email);
        if (user && credentials.password === 'password') {
          return Promise.resolve({
            data: { user },
            error: null
          });
        }
        return Promise.resolve({
          data: { user: null },
          error: { message: 'Invalid login credentials' } as AuthError
        });
      },
      getSession: () => {
        return Promise.resolve({
          data: { session: null },
          error: null
        });
      },
      signOut: () => {
        return Promise.resolve({ error: null });
      }
    },
    
    // Database methods
    from: (table: string) => {
      return {
        select: (columns = '*') => {
          return {
            eq: (column: string, value: any) => {
              return {
                single: () => {
                  return Promise.resolve({
                    data: null,
                    error: null
                  });
                },
                count: () => {
                  return Promise.resolve({
                    data: 0,
                    error: null,
                    count: 0
                  });
                }
              };
            },
            order: (column: string, { ascending = true }) => {
              return {
                limit: (limit: number) => {
                  return Promise.resolve({
                    data: [],
                    error: null
                  });
                }
              };
            },
            limit: (limit: number) => {
              return Promise.resolve({
                data: [],
                error: null
              });
            },
            count: () => {
              return Promise.resolve({
                data: [{ count: 0 }],
                error: null,
                count: 0
              });
            }
          };
        },
        insert: (data: any) => {
          return Promise.resolve({
            data: { ...data, id: 'mock-id' },
            error: null
          });
        },
        update: (data: any) => {
          return {
            eq: (column: string, value: any) => {
              return Promise.resolve({
                data,
                error: null
              });
            }
          };
        },
        delete: () => {
          return {
            eq: (column: string, value: any) => {
              return Promise.resolve({
                data: null,
                error: null
              });
            }
          };
        }
      };
    },
    
    // Storage methods
    storage: {
      from: (bucket: string) => {
        return {
          upload: (path: string, file: File) => {
            return Promise.resolve({
              data: { path: `mock-${path}` },
              error: null
            });
          },
          getPublicUrl: (path: string) => {
            return {
              data: { publicUrl: `https://mock-storage/${path}` }
            };
          }
        };
      }
    }
  };
  
  return mockClient as unknown as SupabaseClient;
}

// Helper functions for common operations
export async function fetchProducts(limit = 10) {
  try {
    const { data, error } = await client.from('products').select('*').limit(limit);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductById(id: string) {
  try {
    const { data, error } = await client.from('products').select('*').eq('id', id).single();
    
    if (error) throw error;
    
    // Fetch reviews count
    const { count } = await client
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('product_id', id);
    
    return { ...data, reviews: count || 0 };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchStores(limit = 10) {
  try {
    const { data, error } = await client.from('stores').select('*').limit(limit);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
}

export async function fetchStoreById(id: string) {
  try {
    const { data, error } = await client.from('stores').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching store:', error);
    return null;
  }
}

export async function fetchUserOrders(userId: string) {
  try {
    const { data, error } = await client
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
}
