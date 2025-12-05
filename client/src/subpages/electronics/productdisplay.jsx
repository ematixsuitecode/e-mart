import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Heart, Share2, MapPin, Truck, ShieldCheck, 
  RotateCcw, Zap, ChevronRight, ShoppingCart, Plus, Minus, CheckCircle
} from 'lucide-react';
import allProducts from '../../data/product.json';

// --- CURRENCY HELPER ---
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price * 84); 
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const found = allProducts.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
    }
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  const currentPrice = product.price * 84;
  const originalPrice = currentPrice * 1.25; 
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20 md:pb-12">
      
      
      <div className="bg-white py-3 px-4 md:px-8 text-xs font-medium text-gray-400 border-b border-gray-100 sticky top-[64px] z-20">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link> 
          <ChevronRight className="w-3 h-3" />
          <Link to="/electronics" className="hover:text-gray-900 transition-colors">Electronics</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 truncate max-w-[150px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          
          <div className="h-max lg:sticky lg:top-28">
            {/* Reduced min-height on mobile (300px) for better visibility of details */}
            <div className="relative group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-center min-h-[300px] md:min-h-[550px] overflow-hidden">
               
               <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full max-h-[300px] md:max-h-[450px] object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110 cursor-zoom-in" 
               />
               
               
               {discount > 0 && (
                 <span className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg z-10">
                    {discount}% OFF
                 </span>
               )}

               {/* Action Buttons (Zepto Floating Style) */}
               <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col gap-2 md:gap-3">
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 md:p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${isWishlisted ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white text-gray-400 border-gray-100 border hover:text-red-500'}`}
                  >
                      <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 md:p-3 bg-white rounded-full shadow-lg text-gray-400 hover:text-indigo-600 border border-gray-100 transition-all transform hover:scale-110">
                      <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
               </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex justify-center gap-3 md:gap-4 mt-4 md:mt-6 overflow-x-auto hide-scrollbar px-2">
               {[product.image, product.image, product.image].map((img, i) => (
                  <button 
                    key={i} 
                    onMouseEnter={() => setSelectedImage(img)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 p-2 bg-white flex-shrink-0 transition-all ${selectedImage === img ? 'border-indigo-600 shadow-md scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
                  </button>
               ))}
            </div>
          </div>

          {/* --- RIGHT: PRODUCT DETAILS & BUY BOX --- */}
          <div className="flex flex-col gap-6 md:gap-8">
            
            {/* Header Info */}
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <Link to="/electronics" className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
                    {product.brand}
                  </Link>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-50 px-2 py-1 rounded">
                     {product.rating} <Star className="w-3 h-3 fill-current" />
                     <span className="text-gray-400 font-normal ml-1">({product.reviews} reviews)</span>
                  </div>
               </div>
               
               <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-2 md:mb-4">
                 {product.name}
               </h1>
               
               <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                 {product.description}. Experience premium quality designed for modern lifestyles.
               </p>
            </div>

            {/* Price & Primary CTA */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
               <div>
                  <div className="flex items-baseline gap-2 md:gap-3">
                     <span className="text-3xl md:text-4xl font-black text-gray-900">{formatPrice(product.price)}</span>
                     <span className="text-sm md:text-lg text-gray-400 line-through font-medium">₹{new Intl.NumberFormat('en-IN').format(originalPrice)}</span>
                  </div>
                  <p className="text-green-600 text-xs font-bold mt-1 flex items-center gap-1">
                     <CheckCircle className="w-3 h-3" /> Inclusive of all taxes
                  </p>
               </div>

               {/* Quantity & Add */}
               <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="flex items-center border border-gray-200 rounded-full px-3 py-2 md:px-4 gap-3 bg-gray-50">
                     <button 
                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
                       className="text-gray-500 hover:text-indigo-600 disabled:opacity-50"
                       disabled={quantity <= 1}
                     >
                        <Minus className="w-4 h-4" />
                     </button>
                     <span className="font-bold text-gray-900 w-4 text-center text-sm">{quantity}</span>
                     <button 
                       onClick={() => setQuantity(quantity + 1)}
                       className="text-gray-500 hover:text-indigo-600"
                     >
                        <Plus className="w-4 h-4" />
                     </button>
                  </div>
                  <button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-full shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base">
                     <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /> Add to Cart
                  </button>
               </div>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
               <div className="bg-indigo-50/50 p-3 md:p-4 rounded-xl border border-indigo-100 flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600"><Truck className="w-4 h-4 md:w-5 md:h-5" /></div>
                  <div>
                     <h4 className="font-bold text-gray-900 text-sm">Free Delivery</h4>
                     <p className="text-xs text-gray-500 mt-1">Get it by <span className="font-bold text-gray-700">Tomorrow, 9 PM</span></p>
                  </div>
               </div>
               <div className="bg-green-50/50 p-3 md:p-4 rounded-xl border border-green-100 flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm text-green-600"><ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /></div>
                  <div>
                     <h4 className="font-bold text-gray-900 text-sm">1 Year Warranty</h4>
                     <p className="text-xs text-gray-500 mt-1">Official brand warranty included.</p>
                  </div>
               </div>
            </div>

            {/* Specifications - Grid Layout */}
            {product.specs && (
               <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                     <Zap className="w-5 h-5 text-yellow-500 fill-current" /> Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-12">
                     {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-50 pb-2">
                           <span className="text-gray-500 text-sm capitalize font-medium">{key.replace(/_/g, ' ')}</span>
                           <span className="text-gray-900 text-sm font-bold text-right truncate max-w-[150px]">
                              {Array.isArray(value) ? value.join(', ') : value}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;