
import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Input, 
  Label, 
  Select, 
  Textarea 
} from '@/components/ui';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select as SelectPrimitive, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';

const categories = [
  { id: 'fashion', name: 'Fashion' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home-decor', name: 'Home Decor' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'food', name: 'Food & Beverages' },
  { id: 'crafts', name: 'Crafts' },
  { id: 'accessories', name: 'Accessories' },
];

interface FormValues {
  name: string;
  description: string;
  price: string;
  category: string;
  stockQuantity: string;
  weight: string;
  dimensions: string;
  shippingTime: string;
}

const AddProductPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      stockQuantity: '',
      weight: '',
      dimensions: '',
      shippingTime: '',
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newImages: string[] = [];
      
      for (let i = 0; i < e.target.files!.length; i++) {
        // Create object URLs for preview (in a real app, these would be uploaded to storage)
        const url = URL.createObjectURL(e.target.files![i]);
        newImages.push(url);
      }
      
      setImages(prev => [...prev, ...newImages]);
      setUploading(false);
    }, 1500);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormValues) => {
    if (images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    // In a real app, we'd send this data to an API
    console.log({
      ...data,
      images,
      price: parseFloat(data.price),
      stockQuantity: parseInt(data.stockQuantity)
    });

    toast.success('Product added successfully');
    form.reset();
    setImages([]);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-gray-500">Create a new product listing for your store</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Handmade Leather Wallet" {...field} />
                      </FormControl>
                      <FormDescription>
                        Make it catchy and descriptive (max 100 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your product in detail..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Include materials, dimensions, usage, and any unique features
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                            <Input type="number" step="0.01" min="0" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="stockQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dimensions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dimensions (LxWxH cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 10x5x2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Shipping Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 3-5 business days" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4 border-t flex justify-end">
                  <div className="flex space-x-2">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit">Add Product</Button>
                  </div>
                </div>
              </form>
            </Form>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Product Images</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-md border-gray-200 p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-center text-gray-500 mb-2">
                  Drag and drop images here or click to browse
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Upload up to 6 images (PNG, JPG, max 5MB each)
                </p>
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden"
                  accept="image/*" 
                  multiple
                  onChange={handleImageUpload}
                />
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Browse Files'}
                  </Button>
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Product preview ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <h2 className="text-lg font-medium mb-4">Product Visibility</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Feature this product
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="publish"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  defaultChecked
                />
                <label htmlFor="publish" className="ml-2 text-sm text-gray-700">
                  Publish immediately
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
