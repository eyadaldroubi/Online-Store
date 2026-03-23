/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback, useEffect, Component } from 'react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  LayoutGrid,
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Package,
  ShoppingCart,
  ChevronLeft,
  Star,
  Heart,
  ArrowRight,
  Filter,
  CheckCircle2,
  Users,
  Store,
  ClipboardList,
  TrendingUp,
  MoreVertical,
  Calendar,
  DollarSign,
  CreditCard,
  Printer,
  Truck,
  MapPin,
  FileText,
  Upload,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  User as UserIcon,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
  ShieldCheck,
  UserCircle,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  Cell
} from 'recharts';
import { Product, Category, CartItem, Order, Vendor, Customer, User, HeroImage } from './types';
import { INITIAL_PRODUCTS, CATEGORIES, MOCK_ORDERS, MOCK_VENDORS, MOCK_CUSTOMERS } from './constants';
import ProductCard from './components/ProductCard';
import HeroCarousel from './components/HeroCarousel';

import AdminPanel from './components/AdminPanel';
import AuthView from './components/AuthView';
import ProfileView from './components/ProfileView';

class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8 text-center">
          <div className="max-w-md space-y-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">حدث خطأ ما</h1>
            <p className="text-slate-500">نعتذر عن هذا الخلل. يرجى محاولة إعادة تحميل الصفحة.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
};

const ProductGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative overflow-hidden rounded-t-[40px] md:rounded-tr-none md:rounded-l-[40px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            src={images[activeIdx]}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="p-4 flex gap-3 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-sm border-t border-white/20">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeIdx === idx ? 'border-indigo-600 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DEFAULT_USERS: User[] = [
  { id: '1', name: 'المدير العام', email: 'admin@shop.com', password: 'admin', role: 'admin', avatar: 'https://i.pravatar.cc/150?u=admin' },
  { id: '2', name: 'إياد الدرويش', email: 'user@shop.com', password: 'user', role: 'user', avatar: 'https://i.pravatar.cc/150?u=user' },
];

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shop_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shop_orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('shop_vendors');
    return saved ? JSON.parse(saved) : MOCK_VENDORS;
  });
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('shop_customers');
    return saved ? JSON.parse(saved) : MOCK_CUSTOMERS;
  });
  const [heroImages, setHeroImages] = useState<HeroImage[]>(() => {
    const saved = localStorage.getItem('shop_hero_images');
    return saved ? JSON.parse(saved) : [
      { id: '1', url: 'https://picsum.photos/seed/modern-tech/1600/800', title: 'اكتشف مستقبل التسوق الرقمي', subtitle: 'منتجات مختارة بعناية لتناسب احتياجاتك اليومية بأفضل الأسعار وأسرع توصيل.' },
      { id: '2', url: 'https://picsum.photos/seed/fashion/1600/800', title: 'أحدث صيحات الموضة', subtitle: 'تشكيلة واسعة من الملابس والإكسسوارات العصرية.' }
    ];
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shop_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shop_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [view, setView] = useState<'shop' | 'admin' | 'checkout' | 'invoice' | 'auth' | 'profile'>(() => {
    const saved = localStorage.getItem('shop_view');
    return (saved as any) || 'shop';
  });
  const [adminSubView, setAdminSubView] = useState<'products' | 'orders' | 'vendors' | 'customers' | 'reports' | 'hero'>('products');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  
  // Auth State
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('shop_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shop_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Save users to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_users', JSON.stringify(users));
  }, [users]);

  // Save current user to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Save products to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_products', JSON.stringify(products));
  }, [products]);

  // Save orders to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_orders', JSON.stringify(orders));
  }, [orders]);

  // Save vendors to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_vendors', JSON.stringify(vendors));
  }, [vendors]);

  // Save hero images to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_hero_images', JSON.stringify(heroImages));
  }, [heroImages]);

  // Save customers to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_customers', JSON.stringify(customers));
  }, [customers]);

  // Save cart to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save view to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_view', view);
  }, [view]);
  
  // Admin State
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'electronics',
    image: 'https://picsum.photos/seed/new/400/400',
    images: [],
    rating: 5,
    reviewsCount: 0,
    quantity: 10
  });
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // Checkout State
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [shippingInfo, setShippingInfo] = useState({ street: '', city: '', country: 'السعودية' });
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe' | 'card'>('card');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesRating = p.rating >= minRating;
      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });
  }, [products, selectedCategory, searchQuery, priceRange, minRating]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, cartQuantity: Math.min(item.cartQuantity + 1, product.quantity) }
            : item
        );
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      const isWishlisted = prev.some(p => p.id === product.id);
      if (isWishlisted) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, Math.min(item.cartQuantity + delta, item.quantity));
        return { ...item, cartQuantity: newQty };
      }
      return item;
    }));
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setView('checkout');
    setCheckoutStep(1);
  }, [cart.length]);

  const completeOrder = useCallback(() => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      customerId: currentUser?.id || 'CUST-TEMP',
      customerName: currentUser?.name || 'عميل جديد',
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.cartQuantity,
        price: item.price
      })),
      total: cartTotal,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      paymentMethod,
      shippingAddress: shippingInfo
    };

    // Update Inventory
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      if (cartItem) {
        return { ...p, quantity: p.quantity - cartItem.cartQuantity };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setCart([]);
    setView('invoice');
  }, [cart, cartTotal, currentUser, paymentMethod, shippingInfo]);

  const handleAuth = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      const user = users.find(u => u.email === authForm.email && u.password === authForm.password);
      if (user) {
        setCurrentUser(user);
        setView('shop');
        setAuthForm({ name: '', email: '', password: '' });
      } else {
        setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } else {
      if (users.find(u => u.email === authForm.email)) {
        setAuthError('البريد الإلكتروني مسجل مسبقاً');
        return;
      }
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
        role: 'user',
        avatar: `https://i.pravatar.cc/150?u=${authForm.email}`
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setView('shop');
      setAuthForm({ name: '', email: '', password: '' });
    }
  }, [authMode, authForm, users]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setView('shop');
  }, []);

  const updateProfile = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setUsers(prev => prev.map(u => u.id === currentUser.id ? currentUser : u));
    setNotification({ message: 'تم تحديث الملف الشخصي بنجاح', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  }, [currentUser]);

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(o => o.customerId === currentUser.id);
  }, [orders, currentUser]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status'], tracking?: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, trackingNumber: tracking || o.trackingNumber } : o));
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGalleryUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ 
          ...prev, 
          images: [...(prev.images || []), reader.result as string] 
        }));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeGalleryImage = useCallback((index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  }, []);

  const addProduct = useCallback(() => {
    if (!newProduct.name || !newProduct.price) return;
    
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...newProduct as Product } : p));
      setEditingProduct(null);
    } else {
      const product: Product = {
        ...newProduct as Product,
        id: `PROD-${Math.floor(Math.random() * 10000)}`,
      };
      setProducts(prev => [product, ...prev]);
    }
    
    setIsAddProductModalOpen(false);
    setNewProduct({
      name: '',
      price: 0,
      category: 'electronics',
      image: 'https://picsum.photos/seed/new/400/400',
      rating: 5,
      reviewsCount: 0,
      quantity: 10,
      description: ''
    });
  }, [newProduct, editingProduct]);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
    setIsAddOrderModalOpen(false);
  }, []);

  const updateOrder = useCallback((orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...updates } : o));
    setEditingOrder(null);
  }, []);

  const addCustomer = useCallback((customer: Customer) => {
    setCustomers(prev => [customer, ...prev]);
    setIsAddCustomerModalOpen(false);
  }, []);

  const updateCustomer = useCallback((customerId: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, ...updates } : c));
    setEditingCustomer(null);
  }, []);

  const deleteCustomer = useCallback((customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  }, []);

  const addVendor = useCallback((vendor: Vendor) => {
    setVendors(prev => [vendor, ...prev]);
    setIsAddVendorModalOpen(false);
  }, []);

  const updateVendor = useCallback((vendorId: string, updates: Partial<Vendor>) => {
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, ...updates } : v));
    setEditingVendor(null);
    setIsAddVendorModalOpen(false);
  }, []);

  const deleteVendor = useCallback((vendorId: string) => {
    setVendors(prev => prev.filter(v => v.id !== vendorId));
  }, []);

  const updateProductPrice = useCallback((productId: string) => {
    const price = parseFloat(tempPrice);
    if (isNaN(price)) return;
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, price } : p));
    setEditingPriceId(null);
  }, [tempPrice]);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const addHeroImage = useCallback((image: HeroImage) => {
    setHeroImages(prev => [...prev, image]);
  }, []);

  const removeHeroImage = useCallback((id: string) => {
    setHeroImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const updateHeroImage = useCallback((updatedImage: HeroImage) => {
    setHeroImages(prev => prev.map(img => img.id === updatedImage.id ? updatedImage : img));
  }, []);

  const goHome = useCallback(() => {
    setView('shop');
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setMinRating(0);
  }, []);

  const printInvoice = useCallback(() => {
    window.print();
  }, []);

  // Mock Report Data
  const salesData = useMemo(() => [
    { name: 'يناير', sales: 4000, orders: 240 },
    { name: 'فبراير', sales: 3000, orders: 198 },
    { name: 'مارس', sales: 2000, orders: 150 },
    { name: 'أبريل', sales: 2780, orders: 190 },
    { name: 'مايو', sales: 1890, orders: 120 },
    { name: 'يونيو', sales: 2390, orders: 170 },
  ], []);

  const categoryData = useMemo(() => [
    { name: 'إلكترونيات', value: 400 },
    { name: 'أزياء', value: 300 },
    { name: 'منزل', value: 300 },
    { name: 'جمال', value: 200 },
  ], []);

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC] transition-colors duration-300">
      {/* Modern Navigation */}
      <header className="glass-nav px-6 py-4 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={goHome}
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">متجري <span className="text-indigo-600">الذكي</span></h1>
            </div>

            <div className="hidden md:flex items-center bg-slate-50 rounded-2xl px-4 py-2.5 w-80 group focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-600" />
              <input 
                type="text" 
                placeholder="ابحث عن أي شيء..."
                className="bg-transparent border-none focus:ring-0 text-sm px-3 w-full placeholder:text-slate-400 text-slate-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => setView(prev => prev === 'admin' ? 'shop' : 'admin')}
                className={`p-2.5 rounded-xl transition-all ${view === 'admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
                title="لوحة التحكم"
              >
                <ShieldCheck className="w-5 h-5" />
              </button>
            )}
            
            {currentUser ? (
              <button 
                onClick={() => setView('profile')}
                className={`flex items-center gap-2 p-1.5 rounded-xl transition-all ${view === 'profile' ? 'bg-white text-indigo-600 border border-slate-100' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-sm font-bold hidden sm:inline">{currentUser.name}</span>
              </button>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setView('auth'); }}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-all"
              >
                <LogIn className="w-5 h-5" />
                <span className="text-sm font-bold">دخول</span>
              </button>
            )}

            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 transition-all relative"
              title="المفضلة"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-bold">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4">
          <div className={`px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-2 ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {notification.message}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {view === 'shop' && (
            <motion.div 
              key="shop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
            {/* Category Navigation - Easy & Modern */}
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`category-pill ${selectedCategory === 'all' ? 'category-pill-active' : 'category-pill-inactive'}`}
              >
                الكل
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`category-pill flex items-center gap-2 ${selectedCategory === cat.id ? 'category-pill-active' : 'category-pill-inactive'}`}
                >
                  {iconMap[cat.icon]}
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Hero Banner - Simple & Clean */}
            {selectedCategory === 'all' && searchQuery === '' && priceRange[0] === 0 && minRating === 0 && (
              <HeroCarousel heroImages={heroImages} />
            )}

            {/* Product Grid - Clean & Easy */}
            <div id="products-section" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedCategory === 'all' ? 'جميع المنتجات' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-400">السعر:</span>
                    <select 
                      className="text-sm font-bold bg-transparent border-none focus:ring-0 p-0"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'all') setPriceRange([0, 1000]);
                        else if (val === 'low') setPriceRange([0, 100]);
                        else if (val === 'mid') setPriceRange([100, 500]);
                        else if (val === 'high') setPriceRange([500, 1000]);
                      }}
                    >
                      <option value="all">الكل</option>
                      <option value="low">أقل من $100</option>
                      <option value="mid">$100 - $500</option>
                      <option value="high">أكثر من $500</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-400">التقييم:</span>
                    <select 
                      className="text-sm font-bold bg-transparent border-none focus:ring-0 p-0"
                      onChange={(e) => setMinRating(Number(e.target.value))}
                    >
                      <option value="0">الكل</option>
                      <option value="4">4 نجوم وأكثر</option>
                      <option value="3">3 نجوم وأكثر</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      idx={idx}
                      categories={CATEGORIES}
                      onAddToCart={addToCart}
                      onViewDetails={setSelectedProductForDetails}
                      isWishlisted={wishlist.some(p => p.id === product.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

          {view === 'checkout' && (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto space-y-8"
            >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">إتمام الشراء</h2>
              <div className="flex items-center gap-4">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${checkoutStep >= step ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {step}
                    </div>
                    {step < 3 && <div className={`w-8 h-0.5 ${checkoutStep > step ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="modern-card p-8 space-y-8">
              {checkoutStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" /> معلومات الشحن
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">العنوان</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 transition-all"
                        placeholder="اسم الشارع، رقم المبنى"
                        value={shippingInfo.street}
                        onChange={e => setShippingInfo({...shippingInfo, street: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">المدينة</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 transition-all"
                        placeholder="مثال: الرياض"
                        value={shippingInfo.city}
                        onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setView('shop')}
                      className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      إلغاء والعودة للمتجر
                    </button>
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      disabled={!shippingInfo.street || !shippingInfo.city}
                      className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
                    >
                      الاستمرار للدفع
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" /> طريقة الدفع
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'card', name: 'بطاقة ائتمانية', icon: <CreditCard className="w-5 h-5" /> },
                      { id: 'paypal', name: 'PayPal', icon: <div className="font-bold italic text-blue-800">PayPal</div> },
                      { id: 'stripe', name: 'Stripe', icon: <div className="font-bold text-indigo-500">Stripe</div> }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${paymentMethod === method.id ? 'border-indigo-600 bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <div className="flex items-center gap-3">
                          {method.icon}
                          <span className="font-bold text-slate-900">{method.name}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                          {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCheckoutStep(1)}
                      className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      رجوع
                    </button>
                    <button 
                      onClick={() => setCheckoutStep(3)}
                      className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                      مراجعة الطلب
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" /> مراجعة الطلب
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-slate-500">العنوان:</span>
                      <span className="font-bold text-slate-900">{shippingInfo.street}، {shippingInfo.city}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-slate-500">طريقة الدفع:</span>
                      <span className="font-bold text-slate-900 uppercase">{paymentMethod}</span>
                    </div>
                    <div className="space-y-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-slate-600">{item.name} x {item.cartQuantity}</span>
                          <span className="font-bold text-slate-900">${(item.price * item.cartQuantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">الإجمالي:</span>
                      <span className="text-2xl font-bold text-indigo-600">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      رجوع
                    </button>
                    <button 
                      onClick={completeOrder}
                      className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                      تأكيد الطلب والدفع
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {view === 'invoice' && (
          <motion.div 
            key="invoice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto space-y-8 print:m-0 print:max-w-none"
            >
              <div className="flex items-center justify-between print:hidden">
                <h2 className="text-3xl font-bold text-slate-900">فاتورة الطلب</h2>
                <div className="flex gap-3">
                  <button 
                    onClick={printInvoice}
                    className="bg-slate-50 text-slate-900 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-2"
                  >
                    <Printer className="w-5 h-5" /> طباعة
                  </button>
                  <button 
                    onClick={() => setView('shop')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                  >
                    العودة للمتجر
                  </button>
                </div>
              </div>

              <div className="modern-card p-12 space-y-12 bg-white shadow-xl border-slate-100 print:shadow-none print:border-none print:p-0 print-area">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">متجري <span className="text-indigo-600">الذكي</span></h1>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>الرياض، المملكة العربية السعودية</p>
                    <p>الرقم الضريبي: 123456789</p>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-4xl font-bold text-slate-900 uppercase opacity-10 mb-4">Invoice</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-bold text-slate-900">رقم الفاتورة: <span className="text-indigo-600">{lastOrder?.id}</span></p>
                    <p className="text-slate-500">التاريخ: {lastOrder?.date}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">فاتورة إلى:</h4>
                  <div className="text-slate-900">
                    <p className="font-bold">{lastOrder?.customerName}</p>
                    <p className="text-sm text-slate-500">{lastOrder?.shippingAddress?.street}</p>
                    <p className="text-sm text-slate-500">{lastOrder?.shippingAddress?.city}، {lastOrder?.shippingAddress?.country}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">طريقة الدفع:</h4>
                  <p className="font-bold text-slate-900 uppercase">{lastOrder?.paymentMethod}</p>
                </div>
              </div>

              <table className="w-full text-right">
                <thead>
                  <tr className="border-b-2 border-slate-900">
                    <th className="py-4 font-bold text-slate-900">المنتج</th>
                    <th className="py-4 font-bold text-slate-900 text-center">الكمية</th>
                    <th className="py-4 font-bold text-slate-900">السعر</th>
                    <th className="py-4 font-bold text-slate-900 text-left">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lastOrder?.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-4 font-medium text-slate-900">{item.name}</td>
                      <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                      <td className="py-4 text-slate-600">${item.price}</td>
                      <td className="py-4 text-left font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-8 pb-2 text-slate-500">المجموع الفرعي</td>
                    <td className="pt-8 pb-2 text-left font-bold text-slate-900">${lastOrder?.total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-2 text-slate-500">الضريبة (15%)</td>
                    <td className="py-2 text-left font-bold text-slate-900">$0.00</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td colSpan={3} className="py-4 text-lg font-bold text-slate-900">الإجمالي الكلي</td>
                    <td className="py-4 text-left text-2xl font-bold text-indigo-600">${lastOrder?.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="pt-12 border-t border-slate-100 text-center space-y-2">
                <p className="text-sm font-bold text-slate-900">شكراً لتسوقكم معنا!</p>
                <p className="text-xs text-slate-400">إذا كان لديك أي استفسار حول هذه الفاتورة، يرجى الاتصال بالدعم الفني.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}> */}
          {view === 'admin' && (
            <AdminPanel 
              adminSubView={adminSubView}
              setAdminSubView={setAdminSubView}
              setIsAddProductModalOpen={setIsAddProductModalOpen}
              setIsAddOrderModalOpen={setIsAddOrderModalOpen}
              setIsAddCustomerModalOpen={setIsAddCustomerModalOpen}
              setIsAddVendorModalOpen={setIsAddVendorModalOpen}
              products={products}
              editingPriceId={editingPriceId}
              setEditingPriceId={setEditingPriceId}
              tempPrice={tempPrice}
              setTempPrice={setTempPrice}
              updateProductPrice={updateProductPrice}
              deleteProduct={deleteProduct}
              orders={orders}
              updateOrderStatus={updateOrderStatus}
              setLastOrder={setLastOrder}
              setView={setView}
              salesData={salesData}
              categoryData={categoryData}
              vendors={vendors}
              customers={customers}
              CATEGORIES={CATEGORIES}
              setEditingProduct={setEditingProduct}
              setNewProduct={setNewProduct}
              setEditingOrder={setEditingOrder}
              setEditingCustomer={setEditingCustomer}
              setEditingVendor={setEditingVendor}
              deleteVendor={deleteVendor}
              deleteCustomer={deleteCustomer}
              theme="light"
              heroImages={heroImages}
              addHeroImage={addHeroImage}
              removeHeroImage={removeHeroImage}
              updateHeroImage={updateHeroImage}
            />
          )}

          {view === 'auth' && (
            <AuthView 
              authMode={authMode}
              setAuthMode={setAuthMode}
              authForm={authForm}
              setAuthForm={setAuthForm}
              authError={authError}
              handleAuth={handleAuth}
            />
          )}

          {view === 'profile' && currentUser && (
            <ProfileView 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              handleLogout={handleLogout}
              userOrders={userOrders}
              updateProfile={updateProfile}
              setLastOrder={setLastOrder}
              setView={setView}
            />
          )}
        {/* </Suspense> */}

      </AnimatePresence>
      </main>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddProductModalOpen(false);
                setEditingProduct(null);
                setNewProduct({
                  name: '',
                  price: 0,
                  category: 'electronics',
                  image: 'https://picsum.photos/seed/new/400/400',
                  images: [],
                  rating: 5,
                  reviewsCount: 0,
                  quantity: 10,
                  description: ''
                });
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
                  <button 
                    onClick={() => {
                      setIsAddProductModalOpen(false);
                      setEditingProduct(null);
                      setNewProduct({
                        name: '',
                        price: 0,
                        category: 'electronics',
                        image: 'https://picsum.photos/seed/new/400/400',
                        images: [],
                        rating: 5,
                        reviewsCount: 0,
                        quantity: 10,
                        description: ''
                      });
                    }} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">اسم المنتج</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      placeholder="أدخل اسم المنتج"
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">صورة المنتج</label>
                    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer relative group">
                      {newProduct.image ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                          <img 
                            src={newProduct.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-bold">تغيير الصورة</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-full mb-2">
                            <Upload className="w-6 h-6 text-indigo-600" />
                          </div>
                          <span className="text-sm text-slate-500">اضغط لرفع صورة المنتج</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">معرض صور المنتج (اختياري)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(newProduct.images || []).map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                          <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <button 
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="relative aspect-square border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer">
                        <Plus className="w-6 h-6 text-slate-400" />
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={handleGalleryUpload}
                        />
                      </div>
                    </div>
                  </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">السعر ($)</label>
                        <input 
                          type="number" 
                          className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                          placeholder="0.00"
                          value={newProduct.price || ''}
                          onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">الكمية</label>
                        <input 
                          type="number" 
                          className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                          placeholder="10"
                          value={newProduct.quantity || ''}
                          onChange={e => setNewProduct({...newProduct, quantity: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">التصنيف</label>
                    <select 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">وصف المنتج</label>
                    <textarea 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all min-h-[100px]"
                      placeholder="أدخل وصف المنتج هنا..."
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  onClick={addProduct}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  {editingProduct ? 'تحديث المنتج' : 'إضافة المنتج للمتجر'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isAddOrderModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddOrderModalOpen(false);
                setEditingOrder(null);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{editingOrder ? 'تعديل الطلب' : 'إضافة طلب جديد'}</h3>
                  <button 
                    onClick={() => {
                      setIsAddOrderModalOpen(false);
                      setEditingOrder(null);
                    }} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const orderData = {
                    id: editingOrder?.id || `ORD-${Math.floor(Math.random() * 10000)}`,
                    customerName: formData.get('customerName') as string,
                    customerId: editingOrder?.customerId || `CUST-${Math.floor(Math.random() * 1000)}`,
                    total: parseFloat(formData.get('total') as string),
                    status: formData.get('status') as any,
                    date: formData.get('date') as string,
                    items: editingOrder?.items || [],
                    trackingNumber: formData.get('trackingNumber') as string
                  };
                  if (editingOrder) {
                    updateOrder(editingOrder.id, orderData);
                  } else {
                    addOrder(orderData as Order);
                  }
                }}>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">اسم العميل</label>
                    <input 
                      name="customerName"
                      type="text" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingOrder?.customerName}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">المجموع ($)</label>
                      <input 
                        name="total"
                        type="number" 
                        required
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingOrder?.total}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">التاريخ</label>
                      <input 
                        name="date"
                        type="date" 
                        required
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingOrder?.date || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">الحالة</label>
                    <select 
                      name="status"
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingOrder?.status || 'pending'}
                    >
                      <option value="pending">معلق</option>
                      <option value="processing">قيد المعالجة</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="delivered">تم التوصيل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">رقم التتبع</label>
                    <input 
                      name="trackingNumber"
                      type="text" 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingOrder?.trackingNumber}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4"
                  >
                    {editingOrder ? 'تحديث الطلب' : 'إضافة الطلب'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {isAddCustomerModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddCustomerModalOpen(false);
                setEditingCustomer(null);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{editingCustomer ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}</h3>
                  <button 
                    onClick={() => {
                      setIsAddCustomerModalOpen(false);
                      setEditingCustomer(null);
                    }} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const customerData = {
                    id: editingCustomer?.id || `CUST-${Math.floor(Math.random() * 1000)}`,
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    totalOrders: parseInt(formData.get('totalOrders') as string) || 0,
                    totalSpent: parseFloat(formData.get('totalSpent') as string) || 0,
                    status: formData.get('status') as any
                  };
                  if (editingCustomer) {
                    updateCustomer(editingCustomer.id, customerData);
                  } else {
                    addCustomer(customerData as Customer);
                  }
                }}>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">اسم العميل</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingCustomer?.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">البريد الإلكتروني</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingCustomer?.email}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">عدد الطلبات</label>
                      <input 
                        name="totalOrders"
                        type="number" 
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingCustomer?.totalOrders}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">إجمالي الإنفاق ($)</label>
                      <input 
                        name="totalSpent"
                        type="number" 
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingCustomer?.totalSpent}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">الحالة</label>
                    <select 
                      name="status"
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingCustomer?.status || 'active'}
                    >
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4"
                  >
                    {editingCustomer ? 'تحديث بيانات العميل' : 'إضافة العميل'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {isAddVendorModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddVendorModalOpen(false);
                setEditingVendor(null);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{editingVendor ? 'تعديل بيانات البائع' : 'إضافة بائع جديد'}</h3>
                  <button 
                    onClick={() => {
                      setIsAddVendorModalOpen(false);
                      setEditingVendor(null);
                    }} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const vendorData = {
                    id: editingVendor?.id || `VEND-${Math.floor(Math.random() * 1000)}`,
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    category: formData.get('category') as string,
                    sales: parseFloat(formData.get('sales') as string) || 0,
                    status: formData.get('status') as any,
                    rating: parseFloat(formData.get('rating') as string) || 5
                  };
                  if (editingVendor) {
                    updateVendor(editingVendor.id, vendorData);
                  } else {
                    addVendor(vendorData as Vendor);
                  }
                }}>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">اسم البائع</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingVendor?.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">البريد الإلكتروني</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingVendor?.email}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">التصنيف</label>
                      <input 
                        name="category"
                        type="text" 
                        required
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingVendor?.category}
                        placeholder="إلكترونيات، أزياء..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">المبيعات ($)</label>
                      <input 
                        name="sales"
                        type="number" 
                        step="0.01"
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingVendor?.sales}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">التقييم</label>
                      <input 
                        name="rating"
                        type="number" 
                        step="0.1"
                        min="0"
                        max="5"
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingVendor?.rating || 5}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">الحالة</label>
                      <select 
                        name="status"
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingVendor?.status || 'active'}
                      >
                        <option value="active">نشط</option>
                        <option value="inactive">غير نشط</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4"
                  >
                    {editingVendor ? 'تحديث البائع' : 'إضافة البائع'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {selectedProductForDetails && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProductForDetails(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-5xl bg-blue-50 rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
              >
                <button 
                  onClick={() => setSelectedProductForDetails(null)}
                  className="absolute top-6 right-6 z-20 p-3 bg-blue-50/80 backdrop-blur-sm hover:bg-blue-100 rounded-full shadow-lg transition-all"
                >
                  <X className="w-6 h-6 text-slate-900" />
                </button>

                {/* Left: Image Gallery */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-auto bg-blue-50 relative group">
                  <ProductGallery images={[selectedProductForDetails.image, ...(selectedProductForDetails.images || [])]} />
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar">
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-50 border border-blue-100 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                          {CATEGORIES.find(c => c.id === selectedProductForDetails.category)?.name}
                        </span>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-bold text-amber-700">{selectedProductForDetails.rating}</span>
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">
                        {selectedProductForDetails.name}
                      </h2>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-indigo-600">${selectedProductForDetails.price}</span>
                        <span className="text-sm text-slate-400">شامل الضريبة</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">وصف المنتج</h4>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {selectedProductForDetails.description || "لا يوجد وصف متوفر لهذا المنتج حالياً. يتميز هذا المنتج بجودة عالية وتصميم عصري يناسب جميع الأذواق."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-xs text-slate-400 mb-1">حالة المخزون</p>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedProductForDetails.quantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {selectedProductForDetails.quantity > 0 ? `متوفر (${selectedProductForDetails.quantity})` : 'نفذت الكمية'}
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-xs text-slate-400 mb-1">التقييمات</p>
                        <p className="font-bold text-slate-900">{selectedProductForDetails.reviewsCount || 0} مراجعة</p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => {
                          addToCart(selectedProductForDetails);
                          setSelectedProductForDetails(null);
                        }}
                        disabled={selectedProductForDetails.quantity === 0}
                        className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-6 h-6" />
                        إضافة للسلة
                      </button>
                      <button className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                        <Heart className="w-6 h-6" />
                        المفضلة
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </AnimatePresence>

      {/* Modern Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-blue-50 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">المفضلة</h2>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:bg-blue-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-slate-300">
                      <Heart className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">قائمة المفضلة فارغة</p>
                      <p className="text-sm text-slate-500">أضف بعض المنتجات التي تحبها لتجدها هنا لاحقاً</p>
                    </div>
                  </div>
                ) : (
                  wishlist.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-red-100 transition-colors group relative">
                      <img src={item.image} className="w-20 h-20 rounded-xl object-cover border border-slate-100" alt="" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{item.name}</h4>
                            <p className="text-xs font-bold text-indigo-600 mt-0.5">${item.price}</p>
                          </div>
                          <button onClick={() => toggleWishlist(item)} className="text-red-500 hover:text-red-700 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <button 
                            onClick={() => {
                              addToCart(item);
                              setIsWishlistOpen(false);
                            }}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> إضافة للسلة
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedProductForDetails(item);
                              setIsWishlistOpen(false);
                            }}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600"
                          >
                            عرض التفاصيل
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modern Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-blue-50 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">سلة التسوق</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-blue-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-slate-300">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">السلة فارغة</p>
                      <p className="text-sm text-slate-500">ابدأ بإضافة بعض المنتجات الرائعة</p>
                    </div>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors group">
                      <img src={item.image} className="w-20 h-20 rounded-xl object-cover border border-slate-100" alt="" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{item.name}</h4>
                            <p className="text-xs font-bold text-indigo-600 mt-0.5">${item.price}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-blue-50 border border-blue-100 rounded-lg px-1.5 py-1">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 text-slate-400 hover:text-indigo-600"><Minus className="w-3 h-3" /></button>
                            <span className="w-8 text-center text-xs font-bold text-slate-900">{item.cartQuantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 text-slate-400 hover:text-indigo-600"><Plus className="w-3 h-3" /></button>
                          </div>
                          <span className="font-bold text-slate-900">${(item.price * item.cartQuantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-blue-100 bg-blue-50 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>المجموع الفرعي</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>الشحن</span>
                      <span className="text-green-600 font-bold">مجاني</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                      <span className="font-bold text-slate-900">المجموع الكلي</span>
                      <span className="text-2xl font-bold text-indigo-600">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    إتمام الدفع <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modern Minimal Footer */}
      <footer className="bg-blue-50 border-t border-blue-200 pt-16 pb-8 px-6 no-print">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">متجري <span className="text-indigo-600">الذكي</span></h1>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                نحن نعيد تعريف تجربة التسوق عبر الإنترنت من خلال توفير منتجات عالية الجودة بواجهة مستخدم بسيطة وذكية.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-100 hover:text-indigo-600 transition-all cursor-pointer">
                    <Star className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-slate-900">روابط سريعة</h5>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><button onClick={goHome} className="hover:text-indigo-600 transition-colors">الرئيسية</button></li>
                <li><button onClick={() => { setView('shop'); setTimeout(() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-indigo-600 transition-colors">المنتجات</button></li>
                <li><button onClick={() => { setView('shop'); setPriceRange([0, 100]); }} className="hover:text-indigo-600 transition-colors">العروض</button></li>
                <li><button className="hover:text-indigo-600 transition-colors">من نحن</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-slate-900">الدعم الفني</h5>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">تتبع الطلب</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">سياسة الاسترجاع</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
            <p>© 2026 MATJARI SMART. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-slate-900 transition-colors">شروط الخدمة</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
