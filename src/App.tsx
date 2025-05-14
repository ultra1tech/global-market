
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "sonner"
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

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Seller Routes */}
          <Route path="/seller-dashboard/*" element={<SellerDashboard />} />
          
          {/* Buyer Routes */}
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/orders" element={<BuyerOrdersPage />} />
          <Route path="/buyer/reviews" element={<BuyerReviewsPage />} />
          <Route path="/buyer/profile" element={<BuyerProfilePage />} />
          <Route path="/buyer/wishlist" element={<WishlistPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/payments" element={<PaymentsPage />} />
          <Route path="/admin/sellers" element={<SellersPage />} />
          
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
    </BrowserRouter>
  )
}

export default App
