
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { CurrencyProvider } from './contexts/CurrencyContext'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  </AuthProvider>
);
