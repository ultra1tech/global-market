
const arTranslations = {
  common: {
    marketplace: "سوق",
    menu: "قائمة",
    home: "الرئيسية",
    products: "منتجات",
    stores: "المتاجر",
    about: "معلومات",
    contact: "اتصال",
    login: "تسجيل الدخول",
    register: "تسجيل",
    logout: "تسجيل الخروج",
    search: "بحث",
    searchPlaceholder: "ابحث عن المنتجات...",
    settings: "إعدادات",
    dashboard: "لوحة التحكم",
    account: "حساب",
    backToProducts: "العودة إلى المنتجات",
    cart: "السلة",
    wishlist: "قائمة الرغبات",
    categories: "فئات"
  },
  categories: {
    fashion: "أزياء",
    electronics: "إلكترونيات",
    homeDecor: "ديكور منزلي",
    beauty: "الجمال",
    food: "طعام وشراب",
    crafts: "حرف يدوية",
    accessories: "إكسسوارات",
    all: "جميع الفئات"
  },
  nav: {
    categories: "فئات",
    deals: "عروض اليوم",
    trending: "متجددة",
    newArrivals: "المنتجات الجديدة",
    sell: "بيع",
    help: "مساعدة"
  },
  auth: {
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    forgotPassword: "هل نسيت كلمة المرور؟",
    loginTitle: "مرحباً بك مرة أخرى",
    loginSubtitle: "تسجيل الدخول إلى حسابك",
    registerTitle: "إنشاء حساب",
    registerSubtitle: "انضم إلى سوقنا",
    loginBtn: "تسجيل الدخول",
    registerBtn: "تسجيل",
    orContinueWith: "أو استمرار مع",
    dontHaveAccount: "ليس لديك حساب؟",
    alreadyHaveAccount: "هل لديك حساب؟",
    createOne: "إنشاء واحد",
    signIn: "تسجيل الدخول",
    passwordRequirements: "كلمة المرور يجب أن تكون على الأقل 8 أحرف"
  },
  product: {
    new: "جديد",
    sale: "عرض",
    addToCart: "أضف إلى السلة",
    buyNow: "اشتر الآن",
    description: "الوصف",
    category: "الفئة",
    origin: "المنبع",
    inStock: "في المخزون",
    shipping: "الشحن",
    reviews: "التعليقات",
    ratings: "التقييمات",
    specifications: "المعلومات",
    relatedProducts: "المنتجات ذات الصلة",
    freeShipping: "الشحن المجاني",
    yes: "نعم",
    no: "لا",
    unknown: "غير معروف",
    uncategorized: "غير مصنف",
    noDescription: "لا توجد وصفة متاحة",
    notFound: "المنتج غير موجود",
    notFoundMessage: "لم نتمكن من العثور على المنتج الذي تبحث عنه.",
    browseProducts: "تصفح المنتجات",
    onlyXLeft: "المنتج المتاح فقط {count}",
    quantity: "الكمية",
    warrantyGuarantee: "ضمان 30 يومًا للإرجاع",
    deliveryEstimate: "التوقعات للوصول في {days} أيام عمل",
    viewDetails: "عرض التفاصيل",
    singleItem: "منتج واحد",
    multipleItems: "منتجات متعددة"
  },
  cart: {
    empty: "سلة التسوق فارغة",
    emptyMessage: "يبدو أنك لم تضف أي منتجات إلى سلة التسوق الخاصة بك بعد.",
    continueShopping: "مواصلة التسوق",
    itemsInCart: "{count} {count, plural, one {منتج} other {منتجات}} في السلة",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    tax: "الضريبة",
    total: "الإجمالي",
    proceedToCheckout: "تقدم للدفع",
    checkout: "الدفع",
    added: "أضيف إلى السلة",
    removed: "أُزيل من السلة",
    updated: "تم تحديث الكمية",
    cleared: "تم إزالة السلة",
    yourCart: "سلة التسوق الخاصة بك",
    item: "منتج",
    items: "منتجات",
    clearCart: "إفراغ السلة",
    cartItems: "عناصر السلة",
    soldBy: "مباع من قبل",
    unknownSeller: "بائع غير معروف",
    remove: "إزالة",
    orderSummary: "ملخص الطلب",
    calculatedAtCheckout: "محسوب عند الدفع",
    freeReturn: "إرجاع مجاني خلال 30 يومًا"
  },
  wishlist: {
    empty: "قائمة الرغبات الخاصة بك فارغة",
    emptyTitle: "قائمة الرغبات الخاصة بك فارغة",
    emptyMessage: "احفظ العناصر التي تعجبك في قائمة الرغبات الخاصة بك وستظهر هنا.",
    itemsInWishlist: "{count} عناصر في قائمة الرغبات الخاصة بك",
    addToWishlist: "أضف إلى قائمة الرغبات",
    removeFromWishlist: "ازالة من قائمة الرغبات",
    added: "أُضيف إلى قائمة الرغبات",
    removed: "أُزيل من قائمة الرغبات",
    itemCount: "{count} {count, plural, one {عنصر} other {عناصر}} في قائمة الرغبات",
    clearAll: "إزالة الكل",
    continueShopping: "تصفح المنتجات"
  },
  store: {
    aboutSeller: "معلومات المورد",
    contactSeller: "اتصال بالمورد",
    sellerRating: "تقييم المورد",
    products: "المنتجات",
    followers: "المتابعين",
    following: "المساهمين",
    follow: "إتباع المتجر",
    unfollow: "إلغاء الإتباع",
    exploreStores: "استكشاف المتاجر",
    discoverSellers: "اكتشف البائعين من جميع أنحاء العالم",
    searchPlaceholder: "ابحث عن المتاجر...",
    noResults: "لم يتم العثور على متاجر",
    tryDifferentSearch: "حاول مصطلح بحث مختلف",
    unknownSeller: "بائع غير معروف",
    verified: "تم التحقق",
    reviews: "التعليقات"
  },
  currency: {
    usd: "USD",
    eur: "EUR",
    gbp: "GBP",
    jpy: "JPY",
    cny: "CNY"
  },
  home: {
    welcome: "مرحبًا بكم في سوق بي إيه دبليو",
    welcomeDescription: "اكتشف منتجات فريدة من البائعين من جميع أنحاء العالم.",
    heroTitle: "بيع وتسوق منتجات من جميع أنحاء العالم",
    heroSubtitle: "سوق عالمي يربط الشركات الصغيرة والمشترين عبر الحدود. اكتشف منتجات أصلية من كل ركن من أركان العالم.",
    startSelling: "ابدأ البيع",
    globalMarketplace: "سوق عالمي",
    countriesCount: "أكثر من 150 دولة",
    shopByCategories: "تسوق حسب الفئات",
    categoriesSubtitle: "استكشف مجموعتنا الواسعة من فئات المنتجات من البائعين من جميع أنحاء العالم",
    featuredStores: "المتاجر المميزة",
    featuredStoresSubtitle: "متاجر منتقاة بعناية مع منتجات عالية الجودة وخدمة ممتازة",
    trendingProducts: "المنتجات الرائجة",
    trendingProductsSubtitle: "اكتشف ما يحبه الآخرون الآن",
    newArrivals: "الوصول الجديد",
    newArrivalsSubtitle: "أحدث المنتجات المضافة إلى سوقنا",
    becomeSellerTitle: "كن بائعًا اليوم",
    becomeSellerDescription: "انضم إلى آلاف البائعين الناجحين في سوقنا العالمي. أنشئ متجرك وابدأ البيع للعملاء في جميع أنحاء العالم.",
    sellerDashboard: "لوحة تحكم البائع",
    viewAll: "عرض الكل"
  }
};

export default arTranslations;
