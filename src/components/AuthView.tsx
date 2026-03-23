import React from 'react';
import { User as UserIcon, Search, Settings, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthViewProps {
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  authForm: any;
  setAuthForm: (form: any) => void;
  authError: string;
  handleAuth: (e: React.FormEvent) => void;
}

const AuthView: React.FC<AuthViewProps> = ({
  authMode,
  setAuthMode,
  authForm,
  setAuthForm,
  authError,
  handleAuth,
}) => {
  return (
    <motion.div
      key="auth"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto"
    >
      <div className="modern-card p-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">
            {authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-slate-500">
            {authMode === 'login' ? 'مرحباً بك مجدداً في متجرك المفضل' : 'انضم إلينا اليوم واستمتع بتجربة تسوق فريدة'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">الاسم الكامل</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                  placeholder="أدخل اسمك الكامل"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">البريد الإلكتروني</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                placeholder="name@example.com"
                value={authForm.email}
                onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">كلمة المرور</label>
            <div className="relative">
              <Settings className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                placeholder="••••••••"
                value={authForm.password}
                onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
              />
            </div>
          </div>

          {authError && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl text-sm font-bold">
              <AlertCircle className="w-4 h-4" />
              {authError}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            {authMode === 'login' ? 'دخول' : 'إنشاء الحساب'}
          </button>
        </form>

        <div className="text-center">
          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
          >
            {authMode === 'login' ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب بالفعل؟ سجل دخولك'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(AuthView);
