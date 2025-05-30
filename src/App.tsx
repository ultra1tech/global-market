
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "sonner"
import { SidebarProvider } from '@/components/ui/sidebar'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Browse from './pages/Browse'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/checkout/Cart'
import Checkout from './pages/checkout/Checkout'
import SellerDashboard from './pages/SellerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import BuyerDashboard from './pages/buyer/BuyerDashboard'
import BuyerOrdersPage from './pages/buyer/OrdersPage'
import BuyerReviewsPage from './pages/buyer/ReviewsPage'
import BuyerProfilePage from './pages/buyer/ProfilePage'
import MessagesPage from './pages/buyer/MessagesPage'
import TrackOrdersPage from './pages/buyer/TrackOrdersPage'
import SettingsPage from './pages/buyer/SettingsPage'
import WishlistPage from './pages/buyer/WishlistPage'
import OrdersPage from './pages/admin/OrdersPage'
import PaymentsPage from './pages/admin/PaymentsPage'
import SellersPage from './pages/admin/SellersPage'
import BlogPage from './pages/blog/BlogPage'
import BlogPostPage from './pages/blog/BlogPostPage'
import HelpCenterHome from './pages/help/HelpCenterHome'
import SellersGuidePage from './pages/help/SellersGuidePage'
import ContactSupportPage from './pages/help/ContactSupportPage'
import Stores from './pages/Stores'
import StoreDetail from './pages/StoreDetail'
import { WishlistProvider } from './contexts/WishlistContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <WishlistProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Seller Routes - Protected for sellers */}
            <Route path="/seller-dashboard/*" element={
              <ProtectedRoute allowedRoles={['seller', 'admin']}>
                <SellerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Buyer Routes - Protected for buyers */}
            <Route path="/buyer/*" element={
              <ProtectedRoute allowedRoles={['buyer', 'admin']}>
                <Routes>
                  <Route path="/dashboard" element={<BuyerDashboard />} />
                  <Route path="/orders" element={<BuyerOrdersPage />} />
                  <Route path="/reviews" element={<BuyerReviewsPage />} />
                  <Route path="/profile" element={<BuyerProfilePage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/track-orders" element={<TrackOrdersPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes - Protected for admins only */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Store Routes */}
            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/:id" element={<StoreDetail />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            {/* Help Center Routes */}
            <Route path="/help" element={<HelpCenterHome />} />
            <Route path="/help/sellers-guide" element={<SellersGuidePage />} />
            <Route path="/help/contact" element={<ContactSupportPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster richColors />
        </WishlistProvider>
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
