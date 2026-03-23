import React from 'react';
import { LogOut, UserCircle, ClipboardList } from 'lucide-react';
import { motion } from 'motion/react';
import { User, Order } from '../types';

interface ProfileViewProps {
  currentUser: User;
  setCurrentUser: (user: User | null) => void;
  handleLogout: () => void;
  userOrders: Order[];
  updateProfile: (e: React.FormEvent) => void;
  setLastOrder: (order: Order) => void;
  setView: (view: any) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  setCurrentUser,
  handleLogout,
  userOrders,
  updateProfile,
  setLastOrder,
  setView,
}) => {
  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">الملف الشخصي</h2>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" /> تسجيل الخروج
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="modern-card p-6 text-center space-y-4">
            <div className="relative inline-block">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-2xl object-cover mx-auto" loading="lazy" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                <UserCircle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{currentUser.name}</h3>
              <p className="text-xs text-slate-400">{currentUser.email}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-around">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">{userOrders.length}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">طلبات</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">${userOrders.reduce((s, o) => s + o.total, 0).toFixed(0)}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">إنفاق</p>
              </div>
            </div>
          </div>

          <div className="modern-card p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">المعلومات الشخصية</h4>
            <form onSubmit={updateProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-900 uppercase">الاسم</label>
                <input 
                  type="text" 
                  className="w-full bg-blue-50 border border-blue-100 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-100 text-slate-900"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-900 uppercase">الهاتف</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-100 text-slate-900"
                  value={currentUser.phone || ''}
                  onChange={(e) => setCurrentUser({...currentUser, phone: e.target.value})}
                  placeholder="05xxxxxxxx"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-900 uppercase">الصورة الشخصية</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-100 text-slate-900"
                      value={currentUser.avatar || ''}
                      onChange={(e) => setCurrentUser({...currentUser, avatar: e.target.value})}
                      placeholder="رابط الصورة"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCurrentUser({...currentUser, avatar: reader.result as string});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <button type="button" className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-all">
                      رفع ملف
                    </button>
                  </div>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all"
              >
                حفظ التغييرات
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="modern-card overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">الطلبات السابقة</h4>
            </div>
            <div className="overflow-x-auto">
              {userOrders.length > 0 ? (
                <table className="w-full text-right">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">الطلب</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">التاريخ</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">الإجمالي</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">الحالة</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {userOrders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm">{order.id}</td>
                        <td className="px-6 py-4 text-slate-500 text-sm">{order.date}</td>
                        <td className="px-6 py-4 font-bold text-indigo-600 text-sm">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                            order.status === 'delivered' ? '!bg-emerald-100 !text-emerald-700' : 
                            order.status === 'shipped' ? '!bg-indigo-100 !text-indigo-700' :
                            order.status === 'processing' ? '!bg-blue-100 !text-blue-700' :
                            order.status === 'cancelled' ? '!bg-rose-100 !text-rose-700' : 
                            '!bg-amber-100 !text-amber-700'
                          }`}>
                            {order.status === 'pending' ? 'قيد الانتظار' : 
                             order.status === 'processing' ? 'قيد التنفيذ' :
                             order.status === 'shipped' ? 'تم الشحن' :
                             order.status === 'delivered' ? 'تم التوصيل' : 'ملغي'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => { setLastOrder(order); setView('invoice'); }}
                            className="text-indigo-600 hover:text-indigo-700 font-bold text-xs"
                          >
                            عرض الفاتورة
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-bold">لا توجد طلبات سابقة حتى الآن</p>
                  <button 
                    onClick={() => setView('shop')}
                    className="text-indigo-600 font-bold text-sm hover:underline"
                  >
                    ابدأ التسوق الآن
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProfileView);
