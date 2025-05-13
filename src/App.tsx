
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "sonner"
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Browse from './pages/Browse'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/checkout/Cart'
import Checkout from './pages/checkout/Checkout'
import SellerDashboard from './pages/SellerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import BuyerDashboard from './pages/buyer/BuyerDashboard'
import OrdersPage from './pages/admin/OrdersPage'
import PaymentsPage from './pages/admin/PaymentsPage'
import SellersPage from './pages/admin/SellersPage'
import Stores from './pages/Stores'
import WishlistPage from './pages/buyer/WishlistPage'
import { WishlistProvider } from './contexts/WishlistContext'

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/seller-dashboard/*" element={<SellerDashboard />} />
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/wishlist" element={<WishlistPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/payments" element={<PaymentsPage />} />
          <Route path="/admin/sellers" element={<SellersPage />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster richColors />
      </WishlistProvider>
    </BrowserRouter>
  )
}

export default App
