
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { allProducts } from '@/mocks/productsData';
import { storeData } from '@/mocks/storesData';
import ProductCard from '@/components/shared/ProductCard';
import StoreCard from '@/components/shared/StoreCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ShoppingBag, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, direction } = useLanguage();
  
  const featuredProducts = allProducts.filter(product => product.isFeatured).slice(0, 8);
  const newArrivals = allProducts.filter(product => product.isNew).slice(0, 8);
  const featuredStores = storeData.slice(0, 5);

  const handleShowToast = () => {
    toast({
      title: "Welcome to B.A.W. Marketplace",
      description: "Discover unique products from sellers around the world.",
      action: (
        <Button variant="outline" size="sm" onClick={() => navigate("/browse")}>
          {t('product.browseProducts')}
        </Button>
      )
    });
  };

  const handleSellerDashboard = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (user.role === "seller" || user.role === "admin") {
      navigate("/seller-dashboard");
    } else {
      navigate("/register");
    }
  };

  const categories = [
    { nameKey: "categories.fashion", icon: "/icons/fashion.svg", path: "/browse?category=fashion" },
    { nameKey: "categories.beauty", icon: "/icons/beauty.svg", path: "/browse?category=beauty" },
    { nameKey: "categories.crafts", icon: "/icons/crafts.svg", path: "/browse?category=crafts" },
    { nameKey: "categories.food", icon: "/icons/food.svg", path: "/browse?category=food" },
    { nameKey: "categories.electronics", icon: "/icons/electronics.svg", path: "/browse?category=electronics" },
    { nameKey: "categories.homeDecor", icon: "/icons/home-decor.svg", path: "/browse?category=home-decor" },
    { nameKey: "categories.accessories", icon: "/icons/accessories.svg", path: "/browse?category=accessories" },
    { nameKey: "categories.all", icon: "/icons/all.svg", path: "/browse" }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24" dir={direction}>
        <div className="marketplace-container">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                {t('home.heroTitle', { fallback: "Sell & Shop Products from Around the World" })}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                {t('home.heroSubtitle', { fallback: "A global marketplace connecting small businesses and buyers across borders. Discover authentic products from every corner of the globe." })}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  className="px-6 py-6 text-base font-medium flex items-center"
                  onClick={handleSellerDashboard}
                >
                  <ShoppingBag className={direction === 'rtl' ? 'ml-2' : 'mr-2'} />
                  {t('home.startSelling', { fallback: "Start Selling" })}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-6 py-6 text-base font-medium flex items-center"
                  asChild
                >
                  <Link to="/browse">
                    {t('product.browseProducts')}
                    <ChevronRight className={direction === 'rtl' ? 'mr-1 rotate-180' : 'ml-1'} />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt={t('home.globalMarketplace', { fallback: "Global Marketplace" })} 
                  className="rounded-lg shadow-xl object-cover w-full h-[300px] md:h-[400px] lg:h-[500px]"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-md hidden md:flex items-center">
                  <Globe className="text-marketplace-primary mr-2 h-5 w-5" />
                  <span className="text-sm font-medium">{t('home.countriesCount', { fallback: "150+ Countries" })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white" dir={direction}>
        <div className="marketplace-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.shopByCategories', { fallback: "Shop by Categories" })}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.categoriesSubtitle', { fallback: "Explore our wide range of product categories from sellers around the world" })}
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link 
                key={category.nameKey}
                to={category.path}
                className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 text-center transition-all duration-300 flex flex-col items-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-all">
                  <img 
                    src={category.icon} 
                    alt={t(category.nameKey)} 
                    className="w-8 h-8 text-marketplace-primary"
                    onError={(e) => {
                      // Fallback if icon doesn't load
                      e.currentTarget.src = "https://api.dicebear.com/7.x/icons/svg?icon=shop";
                    }}
                  />
                </div>
                <h3 className="font-medium text-lg group-hover:text-marketplace-primary transition-colors">
                  {t(category.nameKey)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="py-16 bg-gray-50" dir={direction}>
        <div className="marketplace-container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('home.featuredStores', { fallback: "Featured Stores" })}</h2>
              <p className="text-gray-600">
                {t('home.featuredStoresSubtitle', { fallback: "Handpicked stores with quality products and excellent service" })}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/stores" className="flex items-center">
                {t('home.viewAll', { fallback: "View All" })} 
                <ChevronRight className={direction === 'rtl' ? 'mr-1 rotate-180' : 'ml-1'} />
              </Link>
            </Button>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            dir={direction}
          >
            <CarouselContent className="-ml-4">
              {featuredStores.map((store) => (
                <CarouselItem key={store.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <StoreCard store={store} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex mt-8 justify-center">
              <CarouselPrevious className="relative -left-0 mr-2" />
              <CarouselNext className="relative -right-0" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 bg-white" dir={direction}>
        <div className="marketplace-container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('home.trendingProducts', { fallback: "Trending Products" })}</h2>
              <p className="text-gray-600">
                {t('home.trendingProductsSubtitle', { fallback: "Discover what others are loving right now" })}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse" className="flex items-center">
                {t('home.viewAll', { fallback: "View All" })} 
                <ChevronRight className={direction === 'rtl' ? 'mr-1 rotate-180' : 'ml-1'} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-gray-50" dir={direction}>
        <div className="marketplace-container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('home.newArrivals', { fallback: "New Arrivals" })}</h2>
              <p className="text-gray-600">
                {t('home.newArrivalsSubtitle', { fallback: "The latest products added to our marketplace" })}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse?sort=newest" className="flex items-center">
                {t('home.viewAll', { fallback: "View All" })} 
                <ChevronRight className={direction === 'rtl' ? 'mr-1 rotate-180' : 'ml-1'} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-marketplace-primary text-white" dir={direction}>
        <div className="marketplace-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{t('home.becomeSellerTitle', { fallback: "Become a Seller Today" })}</h2>
            <p className="text-lg mb-8">
              {t('home.becomeSellerDescription', { fallback: "Join thousands of successful sellers on our global marketplace. Create your store and start selling to customers worldwide." })}
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="px-6 py-6 text-base font-medium"
              onClick={handleSellerDashboard}
            >
              {user?.role === "seller" ? t('home.sellerDashboard', { fallback: "Seller Dashboard" }) : t('home.startSelling', { fallback: "Start Selling" })}
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
