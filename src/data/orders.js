export const orders = [
  {
    id: 1001,
    buyerId: 4,
    buyerName: 'Neha Gupta',
    products: [
      { productId: 1, name: 'Organic Honey', quantity: 3, price: 499 },
      { productId: 3, name: 'Organic Strawberry Jam', quantity: 2, price: 259 }
    ],
    total: 2015,
    status: 'delivered',
    orderDate: '2024-02-10',
    deliveryDate: '2024-02-15'
  },
  {
    id: 1002,
    buyerId: 5,
    buyerName: 'Vikram Singh',
    products: [
      { productId: 2, name: 'Handmade Olive Oil', quantity: 2, price: 650 }
    ],
    total: 1300,
    status: 'shipped',
    orderDate: '2024-02-20',
    deliveryDate: null
  },
  {
    id: 1003,
    buyerId: 4,
    buyerName: 'Neha Gupta',
    products: [
      { productId: 5, name: 'Artisan Cheese', quantity: 1, price: 560 },
      { productId: 7, name: 'Lavender Essential Oil', quantity: 2, price: 440 }
    ],
    total: 1440,
    status: 'processing',
    orderDate: '2024-02-25',
    deliveryDate: null
  },
  {
    id: 1004,
    buyerId: 5,
    buyerName: 'Vikram Singh',
    products: [
      { productId: 9, name: 'Herbal Tea Blend', quantity: 4, price: 289 }
    ],
    total: 1156,
    status: 'pending',
    orderDate: '2024-02-27',
    deliveryDate: null
  }
];
