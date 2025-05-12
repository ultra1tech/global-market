// Define available languages
export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
];

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ar' | 'pt' | 'sw';

// Define translation structure
interface TranslationObject {
  [key: string]: string | TranslationObject;
}

interface Translations {
  [language: string]: TranslationObject;
}

// Define translations for each language
export const translations: Translations = {
  en: {
    common: {
      search: "Search",
      searchPlaceholder: "Search for products...",
      cart: "Cart",
      login: "Login",
      register: "Register",
      account: "My Account",
      logout: "Logout",
      dashboard: "Dashboard",
      orders: "My Orders",
      wishlist: "Wishlist",
      settings: "Settings",
      home: "Home",
      categories: "Categories",
      stores: "Stores",
      products: "Products",
      profile: "Profile",
      menu: "Menu",
      marketplace: "Marketplace"
    },
    home: {
      hero: {
        headline: "Sell & Shop Products from Around the World",
        subheadline: "A global marketplace for small businesses and buyers",
        startSelling: "Start Selling",
        browseProducts: "Browse Products"
      },
      categories: {
        title: "Shop by Category",
        fashion: "Fashion",
        beauty: "Beauty",
        crafts: "Crafts",
        food: "Food",
        electronics: "Electronics",
        homeDecor: "Home & Decor",
        accessories: "Accessories",
        viewAll: "View All Categories"
      },
      featuredStores: {
        title: "Featured Stores",
        viewAll: "View All Stores"
      },
      newArrivals: {
        title: "New Arrivals",
        viewAll: "View All"
      },
      trendingProducts: {
        title: "Trending Products",
        viewAll: "View All"
      }
    },
    product: {
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      description: "Description",
      reviews: "Reviews",
      category: "Category",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      shipping: "Shipping",
      freeShipping: "Free Shipping"
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      continueShopping: "Continue Shopping",
      checkout: "Proceed to Checkout",
      subtotal: "Subtotal",
      total: "Total",
      remove: "Remove"
    },
    footer: {
      about: "About",
      contact: "Contact",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      followUs: "Follow Us"
    },
    wishlist: {
      empty: "Your wishlist is empty",
      itemCount: "You have {{count}} items in your wishlist",
      clearAll: "Clear All",
      emptyTitle: "Your wishlist is empty",
      emptyMessage: "Add products to your wishlist to save them for later",
      continueShopping: "Continue Shopping"
    }
  },
  es: {
    common: {
      search: "Buscar",
      searchPlaceholder: "Buscar productos...",
      cart: "Carrito",
      login: "Iniciar Sesión",
      register: "Registrarse",
      account: "Mi Cuenta",
      logout: "Cerrar Sesión",
      dashboard: "Panel",
      orders: "Mis Pedidos",
      wishlist: "Lista de Deseos",
      settings: "Ajustes",
      home: "Inicio",
      categories: "Categorías",
      stores: "Tiendas",
      products: "Productos",
      profile: "Perfil",
      menu: "Menú",
      marketplace: "Mercado"
    },
    home: {
      hero: {
        headline: "Vende y Compra Productos de Todo el Mundo",
        subheadline: "Un mercado global para pequeñas empresas y compradores",
        startSelling: "Empieza a Vender",
        browseProducts: "Explorar Productos"
      },
      categories: {
        title: "Compra por Categoría",
        fashion: "Moda",
        beauty: "Belleza",
        crafts: "Artesanías",
        food: "Comida",
        electronics: "Electrónica",
        homeDecor: "Hogar y Decoración",
        accessories: "Accesorios",
        viewAll: "Ver Todas las Categorías"
      },
      featuredStores: {
        title: "Tiendas Destacadas",
        viewAll: "Ver Todas las Tiendas"
      },
      newArrivals: {
        title: "Recién Llegados",
        viewAll: "Ver Todo"
      },
      trendingProducts: {
        title: "Productos Tendencia",
        viewAll: "Ver Todo"
      }
    },
    product: {
      addToCart: "Añadir al Carrito",
      buyNow: "Comprar Ahora",
      description: "Descripción",
      reviews: "Reseñas",
      category: "Categoría",
      inStock: "En Stock",
      outOfStock: "Agotado",
      shipping: "Envío",
      freeShipping: "Envío Gratuito"
    },
    cart: {
      title: "Carrito de Compras",
      empty: "Tu carrito está vacío",
      continueShopping: "Continuar Comprando",
      checkout: "Proceder al Pago",
      subtotal: "Subtotal",
      total: "Total",
      remove: "Eliminar"
    },
    footer: {
      about: "Acerca de",
      contact: "Contacto",
      terms: "Términos de Uso",
      privacy: "Política de Privacidad",
      followUs: "Síguenos"
    },
    wishlist: {
      empty: "Tu lista de deseos está vacía",
      itemCount: "Tienes {{count}} artículos en tu lista de deseos",
      clearAll: "Borrar Todo",
      emptyTitle: "Tu lista de deseos está vacía",
      emptyMessage: "Agrega productos a tu lista de deseos para guardarlos para más tarde",
      continueShopping: "Continuar Comprando"
    }
  },
  fr: {
    common: {
      search: "Rechercher",
      searchPlaceholder: "Rechercher des produits...",
      cart: "Panier",
      login: "Connexion",
      register: "S'inscrire",
      account: "Mon Compte",
      logout: "Déconnexion",
      dashboard: "Tableau de Bord",
      orders: "Mes Commandes",
      wishlist: "Liste de Souhaits",
      settings: "Paramètres",
      home: "Accueil",
      categories: "Catégories",
      stores: "Boutiques",
      products: "Produits",
      profile: "Profil",
      menu: "Menu",
      marketplace: "Marché"
    },
    home: {
      hero: {
        headline: "Vendez et Achetez des Produits du Monde Entier",
        subheadline: "Une place de marché mondiale pour les petites entreprises et les acheteurs",
        startSelling: "Commencer à Vendre",
        browseProducts: "Parcourir les Produits"
      },
      categories: {
        title: "Acheter par Catégorie",
        fashion: "Mode",
        beauty: "Beauté",
        crafts: "Artisanat",
        food: "Alimentation",
        electronics: "Électronique",
        homeDecor: "Maison et Décoration",
        accessories: "Accessoires",
        viewAll: "Voir Toutes les Catégories"
      },
      featuredStores: {
        title: "Boutiques en Vedette",
        viewAll: "Voir Toutes les Boutiques"
      },
      newArrivals: {
        title: "Nouveautés",
        viewAll: "Voir Tout"
      },
      trendingProducts: {
        title: "Produits Tendance",
        viewAll: "Voir Tout"
      }
    },
    product: {
      addToCart: "Ajouter au Panier",
      buyNow: "Acheter Maintenant",
      description: "Description",
      reviews: "Avis",
      category: "Catégorie",
      inStock: "En Stock",
      outOfStock: "Épuisé",
      shipping: "Livraison",
      freeShipping: "Livraison Gratuite"
    },
    cart: {
      title: "Panier d'Achat",
      empty: "Votre panier est vide",
      continueShopping: "Continuer les Achats",
      checkout: "Passer à la Caisse",
      subtotal: "Sous-total",
      total: "Total",
      remove: "Supprimer"
    },
    footer: {
      about: "À Propos",
      contact: "Contact",
      terms: "Conditions d'Utilisation",
      privacy: "Politique de Confidentialité",
      followUs: "Suivez-nous"
    },
    wishlist: {
      empty: "Votre liste de souhaits est vide",
      itemCount: "Vous avez {{count}} articles dans votre liste de souhaits",
      clearAll: "Tout Effacer",
      emptyTitle: "Votre liste de souhaits est vide",
      emptyMessage: "Ajoutez des produits à votre liste de souhaits pour les sauvegarder pour plus tard",
      continueShopping: "Continuer les Achats"
    }
  },
  ar: {
    common: {
      search: "بحث",
      searchPlaceholder: "ابحث عن منتجات...",
      cart: "سلة التسوق",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      account: "حسابي",
      logout: "تسجيل الخروج",
      dashboard: "لوحة التحكم",
      orders: "طلباتي",
      wishlist: "المفضلة",
      settings: "الإعدادات",
      home: "الرئيسية",
      categories: "الفئات",
      stores: "المتاجر",
      products: "المنتجات",
      profile: "الملف الشخصي",
      menu: "القائمة",
      marketplace: "السوق"
    },
    home: {
      hero: {
        headline: "بيع وتسوق منتجات من جميع أنحاء العالم",
        subheadline: "سوق عالمي للشركات الصغيرة والمشترين",
        startSelling: "ابدأ البيع",
        browseProducts: "تصفح المنتجات"
      },
      categories: {
        title: "تسوق حسب الفئة",
        fashion: "أزياء",
        beauty: "جمال",
        crafts: "حرف يدوية",
        food: "طعام",
        electronics: "إلكترونيات",
        homeDecor: "منزل وديكور",
        accessories: "إكسسوارات",
        viewAll: "عرض جميع الفئات"
      },
      featuredStores: {
        title: "متاجر مميزة",
        viewAll: "عرض جميع المتاجر"
      },
      newArrivals: {
        title: "وصل حديثًا",
        viewAll: "عرض الكل"
      },
      trendingProducts: {
        title: "المنتجات الشائعة",
        viewAll: "عرض الكل"
      }
    },
    product: {
      addToCart: "أضف إلى السلة",
      buyNow: "اشتر الآن",
      description: "وصف",
      reviews: "تقييمات",
      category: "الفئة",
      inStock: "متوفر",
      outOfStock: "نفذ من المخزون",
      shipping: "الشحن",
      freeShipping: "شحن مجاني"
    },
    cart: {
      title: "سلة التسوق",
      empty: "سلة التسوق فارغة",
      continueShopping: "متابعة التسوق",
      checkout: "إتمام الشراء",
      subtotal: "المجموع الفرعي",
      total: "المجموع الكلي",
      remove: "إزالة"
    },
    footer: {
      about: "من نحن",
      contact: "اتصل بنا",
      terms: "شروط الاستخدام",
      privacy: "سياسة الخصوصية",
      followUs: "تابعنا"
    },
    wishlist: {
      empty: "قائمة المفضلة فارغة",
      itemCount: "لديك {{count}} عناصر في قائمة المفضلة",
      clearAll: "مسح الكل",
      emptyTitle: "قائمة المفضلة فارغة",
      emptyMessage: "أضف منتجات إلى قائمة المفضلة لحفظها لوقت لاحق",
      continueShopping: "متابعة التسوق"
    }
  }
  // Add other languages as needed
};
