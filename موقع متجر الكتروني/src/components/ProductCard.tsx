import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product, Category } from '../types';

interface ProductCardProps {
  product: Product;
  idx: number;
  categories: Category[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  idx, 
  categories, 
  onAddToCart, 
  onViewDetails,
  isWishlisted,
  onToggleWishlist
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="modern-card group cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative aspect-square p-4">
        <div className="w-full h-full rounded-[20px] overflow-hidden bg-slate-50 relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`absolute top-3 right-3 w-9 h-9 backdrop-blur rounded-full flex items-center justify-center transition-all shadow-sm z-10 ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      <div className="px-6 pb-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
              {categories.find(c => c.id === product.category)?.name}
            </p>
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h4>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-bold text-amber-700">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">السعر</span>
            <span className="text-lg font-bold text-slate-900">${product.price}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-slate-100 text-slate-900 p-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProductCard);
