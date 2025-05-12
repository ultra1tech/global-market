
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Browse from "./pages/Browse";
import ProductDetail from "./pages/ProductDetail";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Stores from "./pages/Stores";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import Cart from "./pages/checkout/Cart";
import Checkout from "./pages/checkout/Checkout";
import ProductForm from "./pages/seller/ProductForm";

const queryClient = new QueryClient();

// Route guard for protected routes
const ProtectedRoute = ({ children, allowedRoles = [] }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/products" element={<Browse />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/:id" element={<Stores />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Protected Routes */}
            <Route 
              path="/seller-dashboard/*" 
              element={
                <ProtectedRoute allowedRoles={["seller", "admin"]}>
                  <SellerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/seller/product/new" 
              element={
                <ProtectedRoute allowedRoles={["seller", "admin"]}>
                  <ProductForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/buyer/*" 
              element={
                <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                  <BuyerDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
