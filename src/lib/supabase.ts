import { createClient } from '@supabase/supabase-js'
import { Product } from '@/mocks/productsData';

// Check if Supabase environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock Supabase client when credentials are not available
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Using mock client.');
    // Return a mock client that implements the basic interface but doesn't make actual API calls
    return {
      auth: {
        signUp: async () => ({ data: null, error: new Error('Mock client: Supabase not configured') }),
        signInWithPassword: async () => ({ data: null, error: new Error('Mock client: Supabase not configured') }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getUser: async () => ({ data: { user: null } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error('Mock client: Supabase not configured') }),
          }),
          order: () => ({ data: null, error: new Error('Mock client: Supabase not configured') }),
        }),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: new Error('Mock client: Supabase not configured') }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    };
  }
  
  // Create actual Supabase client when credentials are available
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

// Auth functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: userData.name,
        role: userData.role,
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Products functions
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      stores(name),
      product_images(url, is_primary)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Transform to match our Product interface
  const products: Product[] = data.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    oldPrice: item.old_price,
    image: item.product_images.find((img: any) => img.is_primary)?.url || item.product_images[0]?.url,
    currency: 'USD', // Default currency
    storeId: item.store_id,
    storeName: item.stores.name,
    rating: item.rating || 0,
    isNew: false,
    isFeatured: item.featured,
    category: item.category,
    description: item.description,
    stock: item.stock,
    reviews: 0, // We'll need to count these separately
  }));
  
  return products;
};

export const fetchProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      stores(id, name),
      product_images(url, is_primary)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;

  // Get review count
  const { count: reviewCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('product_id', id);

  // Transform to match our Product interface
  const product: Product = {
    id: data.id,
    name: data.name,
    price: data.price,
    oldPrice: data.old_price,
    image: data.product_images.find((img: any) => img.is_primary)?.url || data.product_images[0]?.url,
    currency: 'USD', // Default currency
    storeId: data.store_id,
    storeName: data.stores.name,
    rating: data.rating || 0,
    isNew: false,
    isFeatured: data.featured,
    category: data.category,
    description: data.description,
    stock: data.stock,
    reviews: reviewCount || 0,
    images: data.product_images.map((img: any) => img.url),
  };
  
  return product;
};

// Orders functions
export const createOrder = async (orderData: any) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) throw new Error('User not authenticated');
  
  // Call our create-order Edge Function
  const response = await fetch(`${supabaseUrl}/functions/v1/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
    },
    body: JSON.stringify(orderData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create order');
  }
  
  return await response.json();
};

// Upload product image
export const uploadProductImage = async (file: File, productId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) throw new Error('User not authenticated');
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase
    .storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
    
  if (error) throw error;
  
  // Get public URL
  const { data: publicUrlData } = supabase
    .storage
    .from('product-images')
    .getPublicUrl(data.path);
    
  return publicUrlData.publicUrl;
};
