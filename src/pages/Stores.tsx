
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import StoreCard from '@/components/shared/StoreCard';
import { storeData } from '@/mocks/storesData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, direction } = useLanguage();
  
  // Filter stores based on search term
  const filteredStores = storeData.filter(
    store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <MainLayout>
      <div className="marketplace-container py-8" dir={direction}>
        <h1 className="text-3xl font-bold mb-2">{t('store.exploreStores')}</h1>
        <p className="text-gray-600 mb-8">{t('store.discoverSellers')}</p>
        
        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder={t('store.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">{t('store.noResults')}</h3>
            <p className="text-gray-500">{t('store.tryDifferentSearch')}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Stores;
