
// Mock data for orders

export const buyerOrders = [
  {
    id: "o1",
    date: "2023-05-02T14:30:00Z",
    status: "delivered",
    total: 134.97,
    items: [
      {
        id: "p1",
        name: "Handcrafted Wooden Bowl",
        price: 39.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1605666807892-a0413a0d0f1b?ixlib=rb-4.0.3"
      },
      {
        id: "p3",
        name: "Handmade Leather Wallet",
        price: 49.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1473783154683-83ba01fdf4d7?ixlib=rb-4.0.3"
      },
      {
        id: "p6",
        name: "Organic Lavender Soap",
        price: 12.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3"
      }
    ],
    shipping: {
      address: "123 Main St, Anytown, CA 12345, USA",
      method: "Standard",
      cost: 8.99,
      trackingNumber: "USP123456789",
      estimatedDelivery: "2023-05-08",
      actualDelivery: "2023-05-07"
    },
    payment: {
      method: "Credit Card",
      lastFour: "1234",
      status: "completed"
    },
    stores: [
      {
        id: "s1",
        name: "Sarah's Crafts"
      },
      {
        id: "s3",
        name: "Leather Artisan"
      },
      {
        id: "s5",
        name: "Natural Beauty"
      }
    ]
  },
  {
    id: "o2",
    date: "2023-05-12T09:15:00Z",
    status: "shipped",
    total: 79.99,
    items: [
      {
        id: "p5",
        name: "Bluetooth Wireless Earbuds",
        price: 79.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1606741965128-29a997340877?ixlib=rb-4.0.3"
      }
    ],
    shipping: {
      address: "123 Main St, Anytown, CA 12345, USA",
      method: "Express",
      cost: 14.99,
      trackingNumber: "USP987654321",
      estimatedDelivery: "2023-05-16",
      actualDelivery: null
    },
    payment: {
      method: "PayPal",
      status: "completed"
    },
    stores: [
      {
        id: "s4",
        name: "Tech Haven"
      }
    ]
  },
  {
    id: "o3",
    date: "2023-05-15T16:45:00Z",
    status: "processing",
    total: 124.97,
    items: [
      {
        id: "p2",
        name: "Organic Cotton T-Shirt",
        price: 25.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3"
      },
      {
        id: "p4",
        name: "Ceramic Coffee Mug Set",
        price: 34.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1579273166152-d725a4e2b755?ixlib=rb-4.0.3"
      },
      {
        id: "p8",
        name: "Bamboo Toothbrush",
        price: 9.99,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3"
      }
    ],
    shipping: {
      address: "456 Oak Lane, Somewhere, NY 67890, USA",
      method: "Standard",
      cost: 8.99,
      trackingNumber: null,
      estimatedDelivery: "2023-05-22",
      actualDelivery: null
    },
    payment: {
      method: "Credit Card",
      lastFour: "5678",
      status: "completed"
    },
    stores: [
      {
        id: "s2",
        name: "EcoThreads"
      },
      {
        id: "s1",
        name: "Sarah's Crafts"
      },
      {
        id: "s5",
        name: "Natural Beauty"
      }
    ]
  },
  {
    id: "o4",
    date: "2023-05-18T11:30:00Z",
    status: "pending",
    total: 59.99,
    items: [
      {
        id: "p10",
        name: "Portable Bluetooth Speaker",
        price: 59.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596393413725-d3485a1bce8d?ixlib=rb-4.0.3"
      }
    ],
    shipping: {
      address: "456 Oak Lane, Somewhere, NY 67890, USA",
      method: "Standard",
      cost: 8.99,
      trackingNumber: null,
      estimatedDelivery: "2023-05-25",
      actualDelivery: null
    },
    payment: {
      method: "Credit Card",
      lastFour: "9012",
      status: "pending"
    },
    stores: [
      {
        id: "s4",
        name: "Tech Haven"
      }
    ]
  }
];

export const sellerOrders = [
  {
    id: "so1",
    date: "2023-05-02T14:30:00Z",
    status: "delivered",
    items: [
      {
        id: "p1",
        name: "Handcrafted Wooden Bowl",
        price: 39.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1605666807892-a0413a0d0f1b?ixlib=rb-4.0.3",
        subtotal: 39.99
      }
    ],
    customer: {
      id: "b1",
      name: "John Buyer",
      email: "buyer@example.com"
    },
    shipping: {
      address: "123 Main St, Anytown, CA 12345, USA",
      method: "Standard",
      trackingNumber: "USP123456789",
      shippedDate: "2023-05-03T10:15:00Z",
      deliveredDate: "2023-05-07T14:30:00Z"
    },
    payment: {
      status: "completed",
      total: 39.99,
      commission: 3.99,
      netAmount: 36.00
    }
  },
  {
    id: "so2",
    date: "2023-05-12T09:15:00Z",
    status: "shipped",
    items: [
      {
        id: "p4",
        name: "Ceramic Coffee Mug Set",
        price: 34.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1579273166152-d725a4e2b755?ixlib=rb-4.0.3",
        subtotal: 34.99
      },
      {
        id: "p7",
        name: "Woven Basket Set",
        price: 45.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3",
        subtotal: 45.99
      }
    ],
    customer: {
      id: "b2",
      name: "Jane Customer",
      email: "jane@example.com"
    },
    shipping: {
      address: "789 Pine Road, Elsewhere, TX 54321, USA",
      method: "Express",
      trackingNumber: "USP567891234",
      shippedDate: "2023-05-13T09:30:00Z",
      deliveredDate: null
    },
    payment: {
      status: "completed",
      total: 80.98,
      commission: 8.09,
      netAmount: 72.89
    }
  },
  {
    id: "so3",
    date: "2023-05-15T16:45:00Z",
    status: "processing",
    items: [
      {
        id: "p1",
        name: "Handcrafted Wooden Bowl",
        price: 39.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1605666807892-a0413a0d0f1b?ixlib=rb-4.0.3",
        subtotal: 79.98
      }
    ],
    customer: {
      id: "b3",
      name: "Robert Smith",
      email: "robert@example.com"
    },
    shipping: {
      address: "321 Maple Avenue, Somewhere, WA 98765, USA",
      method: "Standard",
      trackingNumber: null,
      shippedDate: null,
      deliveredDate: null
    },
    payment: {
      status: "completed",
      total: 79.98,
      commission: 7.99,
      netAmount: 71.99
    }
  },
  {
    id: "so4",
    date: "2023-05-18T11:30:00Z",
    status: "pending",
    items: [
      {
        id: "p11",
        name: "Handmade Ceramic Vase",
        price: 49.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?ixlib=rb-4.0.3",
        subtotal: 49.99
      }
    ],
    customer: {
      id: "b4",
      name: "Maria Rodriguez",
      email: "maria@example.com"
    },
    shipping: {
      address: "567 Cedar Street, Anytown, FL 34567, USA",
      method: "Standard",
      trackingNumber: null,
      shippedDate: null,
      deliveredDate: null
    },
    payment: {
      status: "pending",
      total: 49.99,
      commission: 4.99,
      netAmount: 45.00
    }
  }
];

export const adminOrders = [
  ...buyerOrders.map(order => ({
    ...order,
    customerName: "John Buyer",
    customerEmail: "buyer@example.com"
  })),
  {
    id: "o5",
    date: "2023-05-19T13:45:00Z",
    status: "shipped",
    total: 124.97,
    items: [
      {
        id: "p20",
        name: "Traditional Moroccan Rug",
        price: 299.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3"
      }
    ],
    shipping: {
      address: "789 Pine Road, Elsewhere, TX 54321, USA",
      method: "Standard",
      cost: 14.99,
      trackingNumber: "USP456789123",
      estimatedDelivery: "2023-05-26",
      actualDelivery: null
    },
    payment: {
      method: "Credit Card",
      lastFour: "3456",
      status: "completed"
    },
    stores: [
      {
        id: "s1",
        name: "Sarah's Crafts"
      }
    ],
    customerName: "Jane Customer",
    customerEmail: "jane@example.com"
  },
  {
    id: "o6",
    date: "2023-05-20T10:15:00Z",
    status: "processing",
    total: 214.96,
    items: [
      {
        id: "p2",
        name: "Organic Cotton T-Shirt",
        price: 25.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3"
      },
      {
        id: "p9",
        name: "Smart Watch Series 5",
        price: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3"
      }
    ],
    shipping: {
      address: "321 Maple Avenue, Somewhere, WA 98765, USA",
      method: "Express",
      cost: 19.99,
      trackingNumber: null,
      estimatedDelivery: "2023-05-24",
      actualDelivery: null
    },
    payment: {
      method: "PayPal",
      status: "completed"
    },
    stores: [
      {
        id: "s2",
        name: "EcoThreads"
      },
      {
        id: "s4",
        name: "Tech Haven"
      }
    ],
    customerName: "Robert Smith",
    customerEmail: "robert@example.com"
  }
];

export const getSellerOrdersForStore = (storeId: string) => {
  return sellerOrders.filter(order =>
    order.items.some(item => {
      const productId = item.id;
      const product = allProducts.find(p => p.id === productId);
      return product && product.storeId === storeId;
    })
  );
};

// Dummy product data for inventory
const allProducts = [
  {
    id: "p1",
    storeId: "s1"
  },
  {
    id: "p4",
    storeId: "s1"
  },
  {
    id: "p7",
    storeId: "s1"
  },
  {
    id: "p11",
    storeId: "s1"
  },
  {
    id: "p2",
    storeId: "s2"
  },
  {
    id: "p5",
    storeId: "s4"
  },
];
