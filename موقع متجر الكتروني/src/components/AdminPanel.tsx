import React from 'react';
import { 
  Plus, 
  Trash2, 
  Package, 
  Star, 
  CheckCircle2, 
  Users, 
  Store, 
  ClipboardList, 
  TrendingUp, 
  MoreVertical, 
  Calendar, 
  DollarSign, 
  Truck, 
  Printer,
  FileText, 
  BarChart3, 
  Activity, 
  AlertCircle,
  X 
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell
} from 'recharts';
import { Product, Order, Vendor, Customer, Category, HeroImage } from '../types';

interface AdminPanelProps {
  adminSubView: 'products' | 'orders' | 'vendors' | 'customers' | 'reports' | 'hero';
  setAdminSubView: (view: 'products' | 'orders' | 'vendors' | 'customers' | 'reports' | 'hero') => void;
  setIsAddProductModalOpen: (open: boolean) => void;
  setIsAddOrderModalOpen: (open: boolean) => void;
  setIsAddCustomerModalOpen: (open: boolean) => void;
  products: Product[];
  editingPriceId: string | null;
  setEditingPriceId: (id: string | null) => void;
  tempPrice: string;
  setTempPrice: (price: string) => void;
  updateProductPrice: (id: string) => void;
  deleteProduct: (id: string) => void;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status'], tracking?: string) => void;
  setLastOrder: (order: Order) => void;
  setView: (view: any) => void;
  salesData: any[];
  categoryData: any[];
  vendors: Vendor[];
  customers: Customer[];
  CATEGORIES: Category[];
  setEditingProduct: (product: Product | null) => void;
  setNewProduct: (product: Partial<Product>) => void;
  setEditingOrder: (order: Order | null) => void;
  setEditingCustomer: (customer: Customer | null) => void;
  setIsAddVendorModalOpen: (open: boolean) => void;
  setEditingVendor: (vendor: Vendor | null) => void;
  deleteVendor: (id: string) => void;
  deleteCustomer: (id: string) => void;
  theme: 'light' | 'dark';
  heroImages: HeroImage[];
  addHeroImage: (image: HeroImage) => void;
  removeHeroImage: (id: string) => void;
  updateHeroImage: (image: HeroImage) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  adminSubView,
  setAdminSubView,
  setIsAddProductModalOpen,
  setIsAddOrderModalOpen,
  setIsAddCustomerModalOpen,
  products,
  editingPriceId,
  setEditingPriceId,
  tempPrice,
  setTempPrice,
  updateProductPrice,
  deleteProduct,
  orders,
  updateOrderStatus,
  setLastOrder,
  setView,
  salesData,
  categoryData,
  vendors,
  customers,
  CATEGORIES,
  setEditingProduct,
  setNewProduct,
  setEditingOrder,
  setEditingCustomer,
  setIsAddVendorModalOpen,
  setEditingVendor,
  deleteVendor,
  deleteCustomer,
  theme,
  heroImages,
  addHeroImage,
  removeHeroImage,
  updateHeroImage
}) => {
  const [isHeroModalOpen, setIsHeroModalOpen] = React.useState(false);
  const [editingHero, setEditingHero] = React.useState<HeroImage | null>(null);
  const [newHero, setNewHero] = React.useState<Partial<HeroImage>>({
    title: '',
    subtitle: '',
    url: ''
  });
  return (
    <motion.div 
      key="admin"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Admin Sidebar/Nav */}
      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setAdminSubView('products')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${adminSubView === 'products' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-900 hover:bg-slate-100'}`}
        >
          <Package className="w-4 h-4" /> المنتجات
        </button>
        <button 
          onClick={() => setAdminSubView('orders')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${adminSubView === 'orders' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-900 hover:bg-slate-100'}`}
        >
          <ClipboardList className="w-4 h-4" /> الطلبات
        </button>
        <button 
          onClick={() => setAdminSubView('vendors')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${adminSubView === 'vendors' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-900 hover:bg-slate-100'}`}
        >
          <Store className="w-4 h-4" /> البائعين
        </button>
        <button 
          onClick={() => setAdminSubView('customers')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${adminSubView === 'customers' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-900 hover:bg-slate-100'}`}
        >
          <Users className="w-4 h-4" /> العملاء
        </button>
        <button 
          onClick={() => setAdminSubView('reports')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${adminSubView === 'reports' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-900 hover:bg-slate-100'}`}
        >
          <BarChart3 className="w-4 h-4" /> التقارير
        </button>
        <button 
          onClick={() => setAdminSubView('hero')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${adminSubView === 'hero' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-900 hover:bg-slate-100'}`}
        >
          <Activity className="w-4 h-4" /> واجهة المتجر
        </button>
      </div>

      {adminSubView === 'products' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">إدارة المخزون</h2>
              <p className="text-slate-900 mt-1">عرض وتعديل المنتجات المتوفرة في المتجر</p>
            </div>
            <button 
              onClick={() => setIsAddProductModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> إضافة منتج
            </button>
          </div>

          <div className="modern-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">المنتج</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">التصنيف</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">السعر</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">التقييم</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="w-10 h-10 rounded-lg object-cover border border-slate-200" alt="" loading="lazy" />
                          <span className="font-semibold text-slate-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {CATEGORIES.find(c => c.id === p.category)?.name}
                      </td>
                      <td className="px-6 py-4">
                        {editingPriceId === p.id ? (
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              className="w-20 bg-slate-50 border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-slate-900"
                              value={tempPrice}
                              onChange={e => setTempPrice(e.target.value)}
                              autoFocus
                            />
                            <button 
                              onClick={() => updateProductPrice(p.id)}
                              className="text-indigo-600 hover:text-indigo-700"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            className="font-bold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={() => {
                              setEditingPriceId(p.id);
                              setTempPrice(p.price.toString());
                            }}
                          >
                            ${p.price}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span className="text-xs font-bold">{p.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${p.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-xs font-medium text-slate-600">{p.quantity} متوفر</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setEditingProduct(p);
                              setNewProduct(p);
                              setIsAddProductModalOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="تعديل المنتج"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setEditingPriceId(p.id);
                              setTempPrice(p.price.toString());
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="تعديل السعر"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            title="حذف المنتج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {adminSubView === 'orders' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">إدارة الطلبات</h2>
              <p className="text-slate-900 mt-1">تتبع وحالة طلبات العملاء</p>
            </div>
            <button 
              onClick={() => {
                setEditingOrder(null);
                setIsAddOrderModalOpen(true);
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> إضافة طلب
            </button>
          </div>
          <div className="modern-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">رقم الطلب</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">العميل</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">التاريخ</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">المجموع</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-indigo-600">{order.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{order.customerName}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">${order.total}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border-none focus:ring-0 cursor-pointer appearance-none text-center ${
                            order.status === 'delivered' ? '!bg-emerald-100 !text-emerald-700' :
                            order.status === 'shipped' ? '!bg-indigo-100 !text-indigo-700' :
                            order.status === 'processing' ? '!bg-blue-100 !text-blue-700' :
                            order.status === 'cancelled' ? '!bg-rose-100 !text-rose-700' :
                            '!bg-amber-100 !text-amber-700'
                          }`}
                        >
                          <option value="pending">معلق</option>
                          <option value="processing">قيد المعالجة</option>
                          <option value="shipped">تم الشحن</option>
                          <option value="delivered">تم التوصيل</option>
                          <option value="cancelled">ملغي</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setEditingOrder(order);
                              setIsAddOrderModalOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="تعديل الطلب"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setEditingOrder(order);
                              setIsAddOrderModalOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="تحديث رقم التتبع"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              updateOrderStatus(order.id, 'cancelled');
                            }}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            title="إلغاء الطلب"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setLastOrder(order);
                              setView('invoice');
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="عرض الفاتورة"
                          >
                            <ClipboardList className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {adminSubView === 'reports' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">تقارير الأداء</h2>
              <p className="text-slate-900 mt-1">نظرة شاملة على المبيعات والنمو</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.print()}
                className="bg-white text-slate-900 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 font-bold hover:bg-slate-50 transition-all"
              >
                <Printer className="w-4 h-4" /> طباعة التقرير
              </button>
              <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-900">آخر 30 يوم</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="modern-card p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-900 text-sm">إجمالي المبيعات</span>
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">$12,450</p>
              <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                <TrendingUp className="w-3 h-3" /> +12% عن الشهر الماضي
              </div>
            </div>
            <div className="modern-card p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-900 text-sm">إجمالي الطلبات</span>
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <ClipboardList className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">842</p>
              <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                <TrendingUp className="w-3 h-3" /> +5% عن الشهر الماضي
              </div>
            </div>
            <div className="modern-card p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-900 text-sm">معدل التحويل</span>
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">3.2%</p>
              <div className="flex items-center gap-1 text-red-600 text-xs font-bold">
                <AlertCircle className="w-3 h-3" /> -0.4% عن الشهر الماضي
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="modern-card p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">نمو المبيعات</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        backgroundColor: '#ffffff',
                        color: '#0f172a'
                      }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="modern-card p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">توزيع المبيعات حسب التصنيف</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        backgroundColor: '#ffffff',
                        color: '#0f172a'
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#4f46e5', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {adminSubView === 'vendors' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">إدارة البائعين</h2>
              <p className="text-slate-900 mt-1">مراقبة أداء وحالة المتاجر المسجلة</p>
            </div>
            <button 
              onClick={() => {
                setEditingVendor(null);
                setIsAddVendorModalOpen(true);
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> إضافة بائع
            </button>
          </div>
          <div className="modern-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">البائع</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">التصنيف</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">المبيعات</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">التقييم</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendors.map(vendor => (
                    <tr key={vendor.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{vendor.name}</span>
                          <span className="text-xs text-slate-400">{vendor.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{vendor.category}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600">${vendor.sales}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span className="text-xs font-bold">{vendor.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          vendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {vendor.status === 'active' ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setEditingVendor(vendor);
                              setIsAddVendorModalOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="تعديل البائع"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteVendor(vendor.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            title="حذف البائع"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {adminSubView === 'customers' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">إدارة العملاء</h2>
              <p className="text-slate-900 mt-1">قاعدة بيانات العملاء ونشاطهم</p>
            </div>
            <button 
              onClick={() => {
                setEditingCustomer(null);
                setIsAddCustomerModalOpen(true);
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> إضافة عميل
            </button>
          </div>
          <div className="modern-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">العميل</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">عدد الطلبات</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">إجمالي الإنفاق</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-900 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map(customer => (
                    <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{customer.name}</span>
                          <span className="text-xs text-slate-400">{customer.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">{customer.totalOrders}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600">${customer.totalSpent}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">
                          {customer.status === 'active' ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setEditingCustomer(customer);
                              setIsAddCustomerModalOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="تعديل العميل"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteCustomer(customer.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            title="حذف العميل"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {adminSubView === 'hero' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">واجهة المتجر</h2>
              <p className="text-slate-900 mt-1">إدارة الصور والرسائل الترويجية في الصفحة الرئيسية</p>
            </div>
            <button 
              onClick={() => {
                setEditingHero(null);
                setNewHero({ title: '', subtitle: '', url: '' });
                setIsHeroModalOpen(true);
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> إضافة صورة واجهة
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heroImages.map(hero => (
              <div key={hero.id} className="modern-card overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={hero.url} 
                    alt={hero.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => {
                        setEditingHero(hero);
                        setNewHero(hero);
                        setIsHeroModalOpen(true);
                      }}
                      className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform shadow-xl"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => removeHeroImage(hero.id)}
                      className="p-3 bg-white rounded-full text-red-600 hover:scale-110 transition-transform shadow-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg">{hero.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{hero.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hero Image Modal */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900">
                {editingHero ? 'تعديل صورة الواجهة' : 'إضافة صورة واجهة جديدة'}
              </h3>
              <button onClick={() => setIsHeroModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 block">العنوان الرئيسي</label>
                <input 
                  type="text"
                  value={newHero.title}
                  onChange={(e) => setNewHero({ ...newHero, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="مثال: اكتشف أحدث المنتجات"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 block">العنوان الفرعي</label>
                <textarea 
                  value={newHero.subtitle}
                  onChange={(e) => setNewHero({ ...newHero, subtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24 resize-none"
                  placeholder="وصف قصير يظهر تحت العنوان الرئيسي"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 block">رابط الصورة أو رفع ملف</label>
                <div className="flex gap-3">
                  <input 
                    type="text"
                    value={newHero.url}
                    onChange={(e) => setNewHero({ ...newHero, url: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                  <label className="bg-slate-100 text-slate-900 px-4 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewHero({ ...newHero, url: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                {newHero.url && (
                  <div className="mt-4 relative h-40 rounded-2xl overflow-hidden border border-slate-200">
                    <img src={newHero.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button 
                      onClick={() => setNewHero({ ...newHero, url: '' })}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur rounded-lg text-red-500 shadow-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 bg-slate-50 flex gap-4">
              <button 
                onClick={() => {
                  if (!newHero.url || !newHero.title) return;
                  if (editingHero) {
                    updateHeroImage({ ...editingHero, ...newHero } as HeroImage);
                  } else {
                    addHeroImage({
                      id: Math.random().toString(36).substr(2, 9),
                      ...newHero
                    } as HeroImage);
                  }
                  setIsHeroModalOpen(false);
                }}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                {editingHero ? 'حفظ التغييرات' : 'إضافة الصورة'}
              </button>
              <button 
                onClick={() => setIsHeroModalOpen(false)}
                className="flex-1 bg-white text-slate-900 py-4 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(AdminPanel);
