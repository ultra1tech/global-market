
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { showInfoToast } from '@/components/shared/AlertToast';
import { allProducts } from '@/mocks/productsData';
import { storeData } from '@/mocks/storesData';
import WishlistButton from '@/components/shared/WishlistButton';
import StoreCard from '@/components/shared/StoreCard';
import ProductCard from '@/components/shared/ProductCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ShoppingBag, ChevronRight, Globe } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const featuredProducts = allProducts.filter(product => product.isFeatured).slice(0, 8);
  const newArrivals = allProducts.filter(product => product.isNew).slice(0, 8);
  const featuredStores = storeData.slice(0, 5);

  const handleShowToast = () => {
    showInfoToast(
      "Welcome to B.A.W. Marketplace", 
      "Discover unique products from sellers around the world.", 
      {
        label: "Browse Products",
        onClick: () => navigate("/browse")
      }
    );
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
    { name: "Fashion", icon: "/icons/fashion.svg", path: "/browse?category=fashion" },
    { name: "Beauty", icon: "/icons/beauty.svg", path: "/browse?category=beauty" },
    { name: "Crafts", icon: "/icons/crafts.svg", path: "/browse?category=crafts" },
    { name: "Food", icon: "/icons/food.svg", path: "/browse?category=food" },
    { name: "Electronics", icon: "/icons/electronics.svg", path: "/browse?category=electronics" },
    { name: "Home Decor", icon: "/icons/home-decor.svg", path: "/browse?category=home-decor" },
    { name: "Accessories", icon: "/icons/accessories.svg", path: "/browse?category=accessories" },
    { name: "All Categories", icon: "/icons/all.svg", path: "/browse" }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="marketplace-container">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                Sell & Shop Products from Around the World
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                A global marketplace connecting small businesses and buyers across borders.
                Discover authentic products from every corner of the globe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  className="px-6 py-6 text-base font-medium flex items-center"
                  onClick={handleSellerDashboard}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Selling
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-6 py-6 text-base font-medium flex items-center"
                  asChild
                >
                  <Link to="/browse">Browse Products <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Global Marketplace" 
                  className="rounded-lg shadow-xl object-cover w-full h-[300px] md:h-[400px] lg:h-[500px]"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-md hidden md:flex items-center">
                  <Globe className="text-marketplace-primary mr-2 h-5 w-5" />
                  <span className="text-sm font-medium">150+ Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="marketplace-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of product categories from sellers around the world
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 text-center transition-all duration-300 flex flex-col items-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-all">
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className="w-8 h-8 text-marketplace-primary"
                    onError={(e) => {
                      // Fallback if icon doesn't load
                      e.currentTarget.src = "https://api.dicebear.com/7.x/icons/svg?icon=shop";
                    }}
                  />
                </div>
                <h3 className="font-medium text-lg group-hover:text-marketplace-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="py-16 bg-gray-50">
        <div className="marketplace-container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Stores</h2>
              <p className="text-gray-600">
                Handpicked stores with quality products and excellent service
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/stores" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
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
      <section className="py-16 bg-white">
        <div className="marketplace-container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Products</h2>
              <p className="text-gray-600">
                Discover what others are loving right now
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
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
      <section className="py-16 bg-gray-50">
        <div className="marketplace-container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-gray-600">
                The latest products added to our marketplace
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse?sort=newest" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
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
      <section className="py-16 bg-marketplace-primary text-white">
        <div className="marketplace-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Become a Seller Today</h2>
            <p className="text-lg mb-8">
              Join thousands of successful sellers on our global marketplace. 
              Create your store and start selling to customers worldwide.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="px-6 py-6 text-base font-medium"
              onClick={handleSellerDashboard}
            >
              {user?.role === "seller" ? "Seller Dashboard" : "Start Selling"}
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
