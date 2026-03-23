import { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod?: 'paypal' | 'stripe' | 'card';
  shippingAddress?: {
    street: string;
    city: string;
    country: string;
  };
  trackingNumber?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  storeName?: string;
  category: string;
  sales: number;
  rating: number;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  joinDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export interface HeroImage {
  id: string;
  url: string;
  title?: string;
  subtitle?: string;
}
