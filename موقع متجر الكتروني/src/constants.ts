import { Product, Category, Order, Vendor, Customer } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل', icon: 'LayoutGrid' },
  { id: 'electronics', name: 'إلكترونيات', icon: 'Smartphone' },
  { id: 'fashion', name: 'أزياء', icon: 'Shirt' },
  { id: 'home', name: 'المنزل', icon: 'Home' },
  { id: 'beauty', name: 'الجمال', icon: 'Sparkles' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ساعة ذكية برو',
    description: 'ساعة ذكية متطورة مع تتبع الصحة والأنشطة الرياضية وشاشة AMOLED.',
    price: 299,
    quantity: 15,
    category: 'electronics',
    image: 'https://picsum.photos/seed/watch/400/400',
    images: [],
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: '2',
    name: 'سماعات لاسلكية',
    description: 'سماعات بلوتوث مع خاصية إلغاء الضجيج وبطارية تدوم طويلاً.',
    price: 150,
    quantity: 20,
    category: 'electronics',
    image: 'https://picsum.photos/seed/earbuds/400/400',
    images: [],
    rating: 4.5,
    reviewsCount: 89
  },
  {
    id: '3',
    name: 'قميص قطني عصري',
    description: 'قميص مريح مصنوع من القطن الطبيعي 100% بتصميم كلاسيكي.',
    price: 45,
    quantity: 50,
    category: 'fashion',
    image: 'https://picsum.photos/seed/shirt/400/400',
    images: [],
    rating: 4.2,
    reviewsCount: 56
  },
  {
    id: '4',
    name: 'حقيبة ظهر جلدية',
    description: 'حقيبة ظهر أنيقة ومتينة مناسبة للعمل والسفر.',
    price: 85,
    quantity: 10,
    category: 'fashion',
    image: 'https://picsum.photos/seed/backpack/400/400',
    images: [],
    rating: 4.4,
    reviewsCount: 34
  },
  {
    id: '5',
    name: 'ماكينة قهوة أوتوماتيكية',
    description: 'استمتع بأفضل كوب قهوة في منزلك مع هذه الماكينة سهلة الاستخدام.',
    price: 450,
    quantity: 5,
    category: 'home',
    image: 'https://picsum.photos/seed/coffee/400/400',
    images: [],
    rating: 4.9,
    reviewsCount: 210
  },
  {
    id: '6',
    name: 'مجموعة العناية بالبشرة',
    description: 'مجموعة متكاملة لترطيب وتغذية البشرة بمكونات طبيعية.',
    price: 120,
    quantity: 30,
    category: 'beauty',
    image: 'https://picsum.photos/seed/skincare/400/400',
    images: [],
    rating: 4.6,
    reviewsCount: 45
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-1',
    customerName: 'أحمد محمد',
    items: [{ productId: '1', name: 'ساعة ذكية برو', quantity: 1, price: 299 }],
    total: 299,
    status: 'delivered',
    date: '2024-03-15'
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-2',
    customerName: 'سارة خالد',
    items: [{ productId: '3', name: 'قميص قطني عصري', quantity: 2, price: 45 }],
    total: 90,
    status: 'processing',
    date: '2024-03-20'
  }
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'VEN-1',
    name: 'عبدالله علي',
    email: 'abdullah@example.com',
    storeName: 'عالم التقنية',
    category: 'إلكترونيات',
    sales: 15400,
    rating: 4.8,
    status: 'active',
    joinDate: '2023-01-10'
  },
  {
    id: 'VEN-2',
    name: 'ليلى حسن',
    email: 'laila@example.com',
    storeName: 'أزياء ليلى',
    category: 'أزياء',
    sales: 8200,
    rating: 4.5,
    status: 'pending',
    joinDate: '2024-02-15'
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    totalOrders: 5,
    totalSpent: 1250,
    status: 'active'
  },
  {
    id: 'CUST-2',
    name: 'سارة خالد',
    email: 'sara@example.com',
    totalOrders: 2,
    totalSpent: 180,
    status: 'active'
  }
];
