import { AdminUser, Product, Order, Customer } from './types';

// Mock admin user data for authentication simulation.
export const mockUsers: Record<string, AdminUser> = {
  'admin@example.com': {
    id: 'user-001',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://i.pravatar.cc/150?u=admin@example.com',
    role: 'admin',
  },
  'manager@example.com': {
    id: 'user-002',
    name: 'Manager User',
    email: 'manager@example.com',
    avatar: 'https://i.pravatar.cc/150?u=manager@example.com',
    role: 'manager',
  },
  'staff@example.com': {
    id: 'user-003',
    name: 'Staff User',
    email: 'staff@example.com',
    avatar: 'https://i.pravatar.cc/150?u=staff@example.com',
    role: 'staff',
  },
};

// Mock product data for the product management module.
export const mockProducts: Product[] = [
  { id: 'prod-001', name: 'Wildflower Honey', category: 'Honey', price: 280, stock: 150, status: 'In Stock', imageUrl: 'https://picsum.photos/seed/honey1/400' },
  { id: 'prod-002', name: 'Acacia Honey', category: 'Honey', price: 350, stock: 45, status: 'In Stock', imageUrl: 'https://picsum.photos/seed/honey2/400' },
  { id: 'prod-003', name: 'Manuka Honey', category: 'Honey', price: 950, stock: 8, status: 'Low Stock', imageUrl: 'https://picsum.photos/seed/honey3/400' },
  { id: 'prod-004', name: 'Organic Ghee', category: 'Dairy', price: 650, stock: 0, status: 'Out of Stock', imageUrl: 'https://picsum.photos/seed/ghee/400' },
  { id: 'prod-005', name: 'Whole Wheat Flour', category: 'Grains', price: 110, stock: 200, status: 'In Stock', imageUrl: 'https://picsum.photos/seed/flour/400' },
];

// Mock order data for the order management module.
export const mockOrders: Order[] = [
  { id: '#A001', customerName: 'Alice Johnson', customerEmail: 'alice@example.com', date: '2024-05-20', total: 630, status: 'Delivered', items: [{productId: 'prod-001', productName: 'Wildflower Honey', quantity: 1, price: 280}, {productId: 'prod-002', productName: 'Acacia Honey', quantity: 1, price: 350}], paymentMethod: 'Card', transactionId: 'txn_1' },
  { id: '#A002', customerName: 'Bob Williams', customerEmail: 'bob@example.com', date: '2024-05-21', total: 950, status: 'Shipped', items: [{productId: 'prod-003', productName: 'Manuka Honey', quantity: 1, price: 950}], paymentMethod: 'Card', transactionId: 'txn_2' },
  { id: '#A003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', date: '2024-05-21', total: 280, status: 'Pending', items: [{productId: 'prod-001', productName: 'Wildflower Honey', quantity: 1, price: 280}], paymentMethod: 'COD', transactionId: 'txn_3' },
  { id: '#A004', customerName: 'Diana Prince', customerEmail: 'diana@example.com', date: '2024-05-22', total: 110, status: 'Cancelled', items: [{productId: 'prod-005', productName: 'Whole Wheat Flour', quantity: 1, price: 110}], paymentMethod: 'Card', transactionId: 'txn_4' },
  { id: '#A005', customerName: 'Ethan Hunt', customerEmail: 'ethan@example.com', date: '2024-05-23', total: 760, status: 'Shipped', items: [{productId: 'prod-001', productName: 'Wildflower Honey', quantity: 1, price: 280}], paymentMethod: 'Card', transactionId: 'txn_5' },
];

// Mock customer data for the customer management module.
export const mockCustomers: Customer[] = [
    { id: 'cust-01', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=alice@example.com', totalSpent: 1890, lastOrder: '2024-05-20' },
    { id: 'cust-02', name: 'Bob Williams', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=bob@example.com', totalSpent: 950, lastOrder: '2024-05-21' },
    { id: 'cust-03', name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/150?u=charlie@example.com', totalSpent: 420, lastOrder: '2024-05-21' },
    { id: 'cust-04', name: 'Diana Prince', email: 'diana@example.com', avatar: 'https://i.pravatar.cc/150?u=diana@example.com', totalSpent: 2500, lastOrder: '2024-05-22' },
];