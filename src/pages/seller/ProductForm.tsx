
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ImagePlus } from 'lucide-react';

const ProductForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null as File | null,
    imagePreview: ''
  });

  const categories = [
    { id: 'art', name: 'Art & Crafts' },
    { id: 'clothing', name: 'Clothing & Fashion' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'home', name: 'Home & Living' },
    { id: 'food', name: 'Food & Drinks' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductData(prev => ({
        ...prev,
        image: file,
        imagePreview: imageUrl
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form data
    if (!productData.name || !productData.description || !productData.price || !productData.category || !productData.stock) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Here we would normally send the data to an API
    // For now, we'll just simulate a successful upload
    setTimeout(() => {
      setLoading(false);
      toast.success('Product has been successfully added');
      navigate('/seller-dashboard/products');
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add New Product</h1>
          <p className="text-gray-600">Complete the form below to add a new product to your store.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="Enter product name"
                    value={productData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={productData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product in detail"
                  value={productData.description}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={productData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={productData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Product Image *</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {productData.imagePreview ? (
                    <div className="mb-4">
                      <img 
                        src={productData.imagePreview} 
                        alt="Product preview" 
                        className="max-h-64 mx-auto"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <ImagePlus className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (max. 5MB)</p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                    >
                      {productData.imagePreview ? 'Change Image' : 'Select Image'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/seller-dashboard/products')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProductForm;
