import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Upload, Plus, Minus, Info } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  category: z.string().min(1, { message: "Please select a category" }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a non-negative number",
  }),
});

const AddProductPage = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    },
  });

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    // In a real app, you would send this data to your backend
    console.log("Product data:", data);
    toast({
      title: "Product created",
      description: `${data.name} has been added to your inventory.`,
    });
    form.reset();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-gray-500">Create a new product listing for your store</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Details & Attributes</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your product as it will appear to customers.
                      </FormDescription>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="home">Home & Kitchen</SelectItem>
                          <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="toys">Toys & Games</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the category that best fits your product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your product in detail..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of your product including features and benefits.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="dimensions">
                    <AccordionTrigger>Dimensions & Weight</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="length">Length (cm)</Label>
                          <Input id="length" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="width">Width (cm)</Label>
                          <Input id="width" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input id="height" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input id="weight" placeholder="0.00" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="attributes">
                    <AccordionTrigger>Custom Attributes</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        {[1, 2].map((index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="Attribute name (e.g. Material)" />
                            <Input placeholder="Value (e.g. Cotton)" />
                          </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" className="mt-2">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Attribute
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center h-48">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm font-medium mb-1">Main Product Image</p>
                  <p className="text-xs text-gray-500 mb-4">Drag & drop or click to upload</p>
                  <Button type="button" variant="outline" size="sm">
                    Select File
                  </Button>
                </div>
                
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center h-48">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium mb-1">Additional Image {index}</p>
                    <p className="text-xs text-gray-500 mb-4">Optional</p>
                    <Button type="button" variant="outline" size="sm">
                      Select File
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Image Guidelines</h4>
                  <ul className="text-xs text-blue-700 mt-1 list-disc list-inside">
                    <li>Use high-quality images (minimum 1000x1000px)</li>
                    <li>Main image should show the product clearly on a white background</li>
                    <li>Additional images can show different angles or the product in use</li>
                    <li>Maximum file size: 5MB per image</li>
                    <li>Accepted formats: JPG, PNG</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormDescription>
                        The selling price of your product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="compare-price">Compare-at Price ($)</Label>
                  <Input id="compare-price" placeholder="0.00" />
                  <p className="text-sm text-gray-500">
                    Original price if the product is on sale (optional).
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="0" {...field} />
                      </FormControl>
                      <FormDescription>
                        Number of items available for sale.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                  <Input id="sku" placeholder="Enter product SKU" />
                  <p className="text-sm text-gray-500">
                    Unique identifier for your product (optional).
                  </p>
                </div>
              </div>
            </TabsContent>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit">
                Create Product
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddProductPage;
