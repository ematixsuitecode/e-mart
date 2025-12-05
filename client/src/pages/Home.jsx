import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Star,
  Heart,
  ShoppingCart,
  ChevronRight,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  ChevronLeft,
  Gift,
  Ticket,
} from "lucide-react";

import productsData from "../data/products.json";

const extractAllProducts = (data) => {
  let result = [];

  Object.values(data).forEach((category) => {
    if (typeof category === "object" && !Array.isArray(category)) {
      Object.values(category).forEach((sub) => {
        if (Array.isArray(sub)) {
          result.push(...sub);
        }
      });
    }
  });

  return result;
};

const allProducts = extractAllProducts(productsData);

const QUICK_LINKS = [
  {
    id: 1,
    name: "Top Offers",
    path: "/todays-special",
    img: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=150&q=80",
    color: "bg-indigo-50 border-indigo-100",
  },
  {
    id: 2,
    name: "Mobiles",
    path: "/category/electronics",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff70?auto=format&fit=crop&w=150&q=80",
    color: "bg-blue-50 border-blue-100",
  },
  {
    id: 3,
    name: "Fashion",
    path: "/category/fashion_beauty",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=150&q=80",
    color: "bg-pink-50 border-pink-100",
  },
  {
    id: 4,
    name: "Beauty",
    path: "/category/fashion_beauty",
    img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=150&q=80",
    color: "bg-rose-50 border-rose-100",
  },
  { 
    id: 5,
    name: "Home",
    path: "/category/grocery",
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=150&q=80",
    color: "bg-orange-50 border-orange-100",
  },
  {
    id: 6,
    name: "Appliances",
    path: "/category/tvs-appliances",
    img: "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=150&q=80",
    color: "bg-gray-50 border-gray-100",
  },
];

const SLIDES = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-gray-900 to-gray-800",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=2000&q=80",
    subtitle: "Season Finale",
    title: "FASHION REDEFINED",
    description:
      "Experience the finest collection of international brands. Free shipping on all orders above $99.",
    buttonText: "Explore Collection",
    link: "/fashion-trends",
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-rose-100 to-rose-200",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&w=1200&q=80",
    subtitle: "The Beauty Sale",
    title: "GLOW UP KITS",
    description:
      "Up to 50% off on top skincare brands. Presented by Maybelline & L'Oreal.",
    buttonText: "Shop Beauty",
    textColor: "text-gray-900",
    link: "/fashion-trends",
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-blue-900 to-indigo-900",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
    subtitle: "Tech Mania",
    title: "NEXT GEN GAMING",
    description:
      "Pre-order the latest consoles and accessories. Exclusive deals for Prime members.",
    buttonText: "Browse Tech",
    link: "/electronics",
  },
];

// --- SUB-COMPONENTS ---

const EngagementBanner = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-8 sm:gap-16 md:gap-24 overflow-x-auto hide-scrollbar py-2">
        {/* 99 Store Bubble */}
        <Link
          to="/99store"
          className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 border-4 border-white shadow-lg flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl ring-2 ring-yellow-100">
            <div className="absolute inset-1 rounded-full border border-yellow-200/50"></div>
            <div className="text-center leading-none">
              <span className="block text-xs font-bold text-yellow-800 uppercase tracking-tighter">
                Under
              </span>
              <span className="block text-3xl md:text-4xl font-black text-red-600 drop-shadow-sm">
                99
              </span>
            </div>
            <div className="absolute top-2 right-4 w-3 h-3 bg-white/40 rounded-full blur-[1px]"></div>
          </div>
          <span className="text-sm font-bold text-gray-800 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm group-hover:text-yellow-600 transition-colors">
            99 Store
          </span>
        </Link>

        {/* Spinning Luck Draw Bubble */}
        <Link
          to="/todays-special"
          className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl ring-2 ring-purple-100">
            {/* Spinning Background */}
            <div className="absolute inset-0 w-full h-full bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-red-500 via-yellow-500 via-green-500 via-blue-500 to-red-500 animate-[spin_4s_linear_infinite]"></div>

            {/* Center Static Content */}
            <div className="absolute inset-1 bg-white/10 rounded-full"></div>
            <div className="relative z-10 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-inner">
              <Gift className="w-7 h-7 text-purple-600 animate-pulse" />
            </div>

            {/* Ticker Marker */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-gray-800 z-20"></div>
          </div>
          <span className="text-sm font-bold text-gray-800 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm group-hover:text-purple-600 transition-colors">
            Luck Draw
          </span>
        </Link>

        {/* Flash Coupons */}
        <Link
          to="/todays-special"
          className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 border-4 border-white shadow-lg flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl ring-2 ring-blue-100">
            <Ticket className="w-10 h-10 text-white rotate-12 group-hover:rotate-0 transition-transform" />
          </div>
          <span className="text-sm font-bold text-gray-800 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm group-hover:text-blue-600 transition-colors">
            Coupons
          </span>
        </Link>
      </div>
    </div>
  );
};

const QuickLinkRail = () => (
  <section className="bg-white border-b border-gray-100 py-4">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-start gap-6 overflow-x-auto hide-scrollbar pb-2">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]"
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full p-0.5 border ${item.color} group-hover:border-indigo-500 transition-all duration-300 overflow-hidden shadow-sm group-hover:shadow-md`}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition duration-500"
              />
            </div>
            <span className="text-[11px] md:text-xs font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors text-center leading-tight">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[300px] md:h-[450px] w-full overflow-hidden group">
      <div className="relative w-full h-full">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            } ${slide.bg}`}
          >
            <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover mask-image-linear-fade"
                style={{
                  maskImage:
                    "linear-gradient(to left, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to left, black 70%, transparent 100%)",
                }}
              />
            </div>
            <div className="absolute inset-0 md:hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-30"
              />
            </div>

            <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-20">
              <div
                className={`max-w-xl ${
                  slide.textColor || "text-white"
                } animate-fade-in-up`}
              >
                <span
                  className={`inline-block font-bold px-3 py-1 text-xs uppercase tracking-wider rounded-sm mb-4 bg-white/20 backdrop-blur-md`}
                >
                  {slide.subtitle}
                </span>
                <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight drop-shadow-lg">
                  {slide.title}
                </h2>
                <p
                  className={`text-lg md:text-xl font-medium mb-8 opacity-90 max-w-md`}
                >
                  {slide.description}
                </p>
                <Link to={slide.link}>
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg active:scale-95 flex items-center gap-2">
                    {slide.buttonText} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white text-white hover:text-gray-900 p-2 rounded-full backdrop-blur-sm transition-all shadow-lg border border-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white text-white hover:text-gray-900 p-2 rounded-full backdrop-blur-sm transition-all shadow-lg border border-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const DealZone = () => {
  const dealProducts = (allProducts || [])
    .filter((p) => p.price < 150)
    .slice(0, 5);

  return (
    <section className="relative z-20 mt-2 mb-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 pr-0 lg:pr-8">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-rose-500 animate-pulse" />
              <h3 className="text-xl font-black text-gray-800 tracking-tight">
                DEAL OF THE DAY
              </h3>
            </div>
            <p className="text-gray-500 text-sm mb-4 font-medium">
              Offer ends in:
            </p>
            <div className="flex gap-3">
              {["04", "32", "15"].map((time, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-gray-900 text-white rounded-lg w-12 h-12 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold font-mono">{time}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
                    {["Hr", "Min", "Sec"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {dealProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="min-w-[240px] flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-transparent hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
                >
                  <img
                    src={product.image}
                    className="w-20 h-20 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                    alt={product.name}
                  />
                  <div className="flex flex-col">
                    <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full w-max mb-1">
                      HOT DEAL
                    </span>
                    <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-indigo-600 font-bold">
                        ${product.price}
                      </span>
                      <span className="text-gray-400 text-xs line-through">
                        ${(product.price * 1.2).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoGrid = () => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs mb-1 block">
            Curated For You
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Collections
          </h2>
        </div>
        <Link
          to="/products"
          className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
        {/* Navigation Cards - Linking to Subpages */}
        <Link
          to="/fashion-trends"
          className="md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
        >
          <img
            src="https://images.unsplash.com/photo-1485230946086-1d99d5297129?auto=format&fit=crop&w=800&q=80"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            alt="Minimalist"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
            <span className="text-white/80 uppercase text-xs font-bold tracking-widest mb-2 border-l-2 border-yellow-400 pl-2">
              Studio Collection
            </span>
            <h3 className="text-4xl font-white text-white font-serif italic mb-4">
              Minimalist
            </h3>
            <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2.5 rounded-full w-max hover:bg-white hover:text-black transition text-sm font-bold">
              Explore Style
            </button>
          </div>
        </Link>

        <Link
          to="/tvs-appliances"
          className="md:col-span-2 bg-gray-100 rounded-2xl p-8 relative overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-500"
        >
          <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center h-full">
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-wide mb-2">
              Gaming & Tech
            </span>
            <h3 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
              Next Gen <br />
              Consoles
            </h3>
            <p className="text-gray-600 mb-6 text-sm line-clamp-2">
              Experience 4K gaming with the new PS5 and Xbox Series X.
            </p>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-800 transition w-max flex items-center gap-2 text-sm">
              Shop Consoles <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80"
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-[400px] drop-shadow-2xl rotate-12 group-hover:rotate-6 group-hover:scale-105 transition duration-500"
            alt="PS5"
          />
        </Link>

        <Link
          to="/fashion-trends"
          className="bg-indigo-50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-gray-900 mb-1">
              Sneakerhead
            </h4>
            <p className="text-indigo-600 text-xs font-bold uppercase">
              New Drops Daily
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600185365926-3a810c9d7416?auto=format&fit=crop&w=400&q=80"
            className="absolute right-[-20px] bottom-[-20px] w-48 object-contain rotate-[-12deg] group-hover:rotate-0 group-hover:scale-110 transition duration-500"
            alt="Sneaker"
          />
        </Link>

        <Link
          to="/fashion-trends"
          className="bg-rose-50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-gray-900 mb-1">
              Glow Up Kit
            </h4>
            <p className="text-rose-600 text-xs font-bold uppercase">
              Flat 30% Off
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80"
            className="absolute right-[-10px] bottom-[-10px] w-40 object-contain translate-y-4 group-hover:translate-y-0 group-hover:scale-105 transition duration-500"
            alt="Cosmetics"
          />
        </Link>
      </div>
    </div>
  </section>
);

const RecommendedProducts = () => {
  // Use products from JSON that are tagged as "Best Seller" or "Trending"
  const recommended = (allProducts || [])
    .filter((p) => p.tag === "Best Seller" || p.tag === "Trending")
    .slice(0, 8);

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-yellow-500 fill-current" />
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended for You
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col"
            >
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2">
                <button className="bg-white shadow-md p-2 rounded-full hover:bg-rose-50 hover:text-rose-600 transition text-gray-500">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                {product.tag && (
                  <span className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded shadow-sm text-gray-800 border border-gray-100">
                    {product.tag}
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-gray-900 font-bold text-sm md:text-base leading-snug mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating || 4)
                            ? "fill-current"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through decoration-red-500">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                  <button className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors active:scale-95">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/products">
            <button className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase text-xs tracking-widest">
              Load More Products <TrendingUp className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const FeatureBar = () => (
  <section className="bg-white border-t border-gray-200 py-8">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Fast Delivery",
          sub: "Within 24 Hours",
        },
        {
          icon: <ShieldCheck className="w-6 h-6" />,
          title: "Secure Payment",
          sub: "100% Protected",
        },
        {
          icon: <Sparkles className="w-6 h-6" />,
          title: "Top Quality",
          sub: "Verified Brands",
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: "24/7 Support",
          sub: "Always Here",
        },
      ].map((feat, i) => (
        <div
          key={i}
          className="flex items-center gap-4 justify-center md:justify-start"
        >
          <div className="bg-indigo-50 text-indigo-600 p-3 rounded-full">
            {feat.icon}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{feat.title}</h4>
            <p className="text-xs text-gray-500">{feat.sub}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- MAIN HOME COMPONENT ---

const Home = () => {
  return (
    <div className="font-sans bg-white min-h-screen text-gray-800 pb-8">
      <QuickLinkRail />
      <HeroSlider />
      {/* Added the new gamified section here */}
      <EngagementBanner />
      <DealZone />
      <BentoGrid />
      <RecommendedProducts />
      <FeatureBar />
    </div>
  );
};

export default Home;

// export default Home;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Clock,
//   Star,
//   Heart,
//   ShoppingCart,
//   ChevronRight,
//   Sparkles,
//   Zap,
//   TrendingUp,
//   ShieldCheck,
//   ChevronLeft,
// } from "lucide-react";

// import allProducts from "../data/products.json";

// /* -------------------------------
//    DYNAMIC CATEGORY ROUTES UPDATED
// --------------------------------*/

// const QUICK_LINKS = [
//   {
//     id: 1,
//     name: "Top Offers",
//     path: "/todays-special",
//     img: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=150&q=80",
//     color: "bg-indigo-50 border-indigo-100",
//   },
//   {
//     id: 2,
//     name: "Mobiles",
//     path: "/category/electronics",
//     img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
//     color: "bg-blue-50 border-blue-100",
//   },
//   {
//     id: 3,
//     name: "Fashion",
//     path: "/category/fashion",
//     img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=150&q=80",
//     color: "bg-pink-50 border-pink-100",
//   },
//   {
//     id: 4,
//     name: "Beauty",
//     path: "/category/fashion",
//     img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=150&q=80",
//     color: "bg-rose-50 border-rose-100",
//   },
//   {
//     id: 5,
//     name: "Home",
//     path: "/category/homes-furniture",
//     img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=150&q=80",
//     color: "bg-orange-50 border-orange-100",
//   },
//   {
//     id: 6,
//     name: "Appliances",
//     path: "/category/appliances",
//     img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
//     color: "bg-gray-50 border-gray-100",
//   },
// ];

// /* ------------------------------- HERO SLIDER -------------------------------- */

// const SLIDES = [
//   {
//     id: 1,
//     bg: "bg-gradient-to-r from-gray-900 to-gray-800",
//     image:
//       "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=2000&q=80",
//     subtitle: "Season Finale",
//     title: "FASHION REDEFINED",
//     description:
//       "Experience the finest collection of international brands. Free shipping on all orders above $99.",
//     buttonText: "Explore Collection",
//     link: "/category/fashion",
//   },
//   {
//     id: 2,
//     bg: "bg-gradient-to-r from-rose-100 to-rose-200",
//     image:
//       "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&w=1200&q=80",
//     subtitle: "The Beauty Sale",
//     title: "GLOW UP KITS",
//     description: "Up to 50% off on skincare brands.",
//     buttonText: "Shop Beauty",
//     textColor: "text-gray-900",
//     link: "/category/fashion",
//   },
//   {
//     id: 3,
//     bg: "bg-gradient-to-r from-blue-900 to-indigo-900",
//     image:
//       "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
//     subtitle: "Tech Mania",
//     title: "NEXT GEN GAMING",
//     description: "Pre-order the latest consoles and accessories.",
//     buttonText: "Browse Tech",
//     link: "/category/electronics",
//   },
// ];

// /* ------------------------------- QUICK LINK RAIL -------------------------------- */

// const QuickLinkRail = () => (
//   <section className="bg-white border-b border-gray-100 py-4">
//     <div className="container mx-auto px-4">
//       <div className="flex justify-between items-start gap-6 overflow-x-auto hide-scrollbar pb-2">
//         {QUICK_LINKS.map((item) => (
//           <Link
//             key={item.id}
//             to={item.path}
//             className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px]"
//           >
//             <div
//               className={`w-14 h-14 md:w-16 md:h-16 rounded-full p-0.5 border ${item.color} group-hover:border-indigo-500 transition-all duration-300 overflow-hidden shadow-sm group-hover:shadow-md`}
//             >
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-500"
//               />
//             </div>
//             <span className="text-[11px] font-semibold text-gray-700 group-hover:text-indigo-600">
//               {item.name}
//             </span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// /* ------------------------------- HERO SLIDER -------------------------------- */

// const HeroSlider = () => {
//   const [current, setCurrent] = useState(0);
//   const nextSlide = () =>
//     setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
//   const prevSlide = () =>
//     setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

//   useEffect(() => {
//     const timer = setInterval(nextSlide, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="relative h-[300px] md:h-[450px] w-full overflow-hidden group">
//       <div className="relative w-full h-full">
//         {SLIDES.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-700 ${
//               index === current ? "opacity-100 z-10" : "opacity-0 z-0"
//             } ${slide.bg}`}
//           >
//             <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="container mx-auto px-6 h-full flex flex-col justify-center">
//               <div className={slide.textColor || "text-white"}>
//                 <span className="inline-block font-bold px-3 py-1 text-xs uppercase mb-4 bg-white/20">
//                   {slide.subtitle}
//                 </span>

//                 <h2 className="text-4xl md:text-6xl font-black mb-4">
//                   {slide.title}
//                 </h2>
//                 <p className="text-lg md:text-xl mb-6 max-w-md">
//                   {slide.description}
//                 </p>

//                 <Link to={slide.link}>
//                   <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold">
//                     {slide.buttonText}{" "}
//                     <ArrowRight className="inline w-5 h-5 ml-2" />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 bg-white/30 p-2 rounded-full"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 bg-white/30 p-2 rounded-full"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>
//     </section>
//   );
// };

// /* ------------------------------- DEAL ZONE -------------------------------- */

// const DealZone = () => {
//   const allProductList = Object.keys(allProducts)
//     .filter((key) => key !== "filters")
//     .flatMap((key) => allProducts[key]);

//   const dealProducts = allProductList.filter((p) => p.price < 150).slice(0, 5);

//   return (
//     <section className="relative z-20 mt-8 mb-12">
//       <div className="container mx-auto px-4">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
//           <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 pr-0 lg:pr-8">
//             <div className="flex items-center gap-2 mb-2">
//               <Clock className="w-5 h-5 text-rose-500 animate-pulse" />
//               <h3 className="text-xl font-black text-gray-800 tracking-tight">
//                 DEAL OF THE DAY
//               </h3>
//             </div>
//             <p className="text-gray-500 text-sm mb-4 font-medium">
//               Offer ends in:
//             </p>

//             <div className="flex gap-3">
//               {["04", "32", "15"].map((time, i) => (
//                 <div key={i} className="flex flex-col items-center">
//                   <div className="bg-gray-900 text-white rounded-lg w-12 h-12 flex items-center justify-center shadow-lg">
//                     <span className="text-xl font-bold font-mono">{time}</span>
//                   </div>
//                   <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
//                     {["Hr", "Min", "Sec"][i]}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="lg:col-span-3">
//             <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
//               {dealProducts.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/products/${product.id}`}
//                   className="min-w-[240px] flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-transparent hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
//                 >
//                   <img
//                     src={product.image}
//                     className="w-20 h-20 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
//                     alt={product.name}
//                   />
//                   <div className="flex flex-col">
//                     <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full w-max mb-1">
//                       HOT DEAL
//                     </span>
//                     <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1">
//                       {product.name}
//                     </h4>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-indigo-600 font-bold">
//                         ${product.price}
//                       </span>
//                       <span className="text-gray-400 text-xs line-through">
//                         ${(product.price * 1.2).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ------------------------------- BENTO GRID -------------------------------- */

// const BentoGrid = () => (
//   <section className="py-12">
//     <div className="container mx-auto px-4">
//       <div className="flex justify-between items-end mb-8">
//         <div>
//           <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs mb-1 block">
//             Curated For You
//           </span>
//           <h2 className="text-3xl font-bold text-gray-900">
//             Featured Collections
//           </h2>
//         </div>
//         <Link
//           to="/products"
//           className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
//         >
//           View All <ChevronRight className="w-4 h-4" />
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
//         <Link
//           to="/fashion-trends"
//           className="md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
//         >
//           <img
//             src="https://images.unsplash.com/photo-1485230946086-1d99d5297129?auto=format&fit=crop&w=800&q=80"
//             className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
//             alt="Minimalist"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
//             <span className="text-white/80 uppercase text-xs font-bold tracking-widest mb-2 border-l-2 border-yellow-400 pl-2">
//               Studio Collection
//             </span>
//             <h3 className="text-4xl font-white text-white font-serif italic mb-4">
//               Minimalist
//             </h3>
//             <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2.5 rounded-full w-max hover:bg-white hover:text-black transition text-sm font-bold">
//               Explore Style
//             </button>
//           </div>
//         </Link>

//         <Link
//           to="/tvs-appliances"
//           className="md:col-span-2 bg-gray-100 rounded-2xl p-8 relative overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-500"
//         >
//           <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center h-full">
//             <span className="text-indigo-600 font-bold text-xs uppercase tracking-wide mb-2">
//               Gaming & Tech
//             </span>
//             <h3 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
//               Next Gen <br />
//               Consoles
//             </h3>
//             <p className="text-gray-600 mb-6 text-sm line-clamp-2">
//               Experience 4K gaming with the new PS5 and Xbox Series X.
//             </p>
//             <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-800 transition w-max flex items-center gap-2 text-sm">
//               Shop Consoles <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//           <img
//             src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80"
//             className="absolute -right-16 top-1/2 -translate-y-1/2 w-[400px] drop-shadow-2xl rotate-12 group-hover:rotate-6 group-hover:scale-105 transition duration-500"
//             alt="PS5"
//           />
//         </Link>

//         <Link
//           to="/fashion-trends"
//           className="bg-indigo-50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
//         >
//           <div className="relative z-10">
//             <h4 className="text-2xl font-bold text-gray-900 mb-1">
//               Sneakerhead
//             </h4>
//             <p className="text-indigo-600 text-xs font-bold uppercase">
//               New Drops Daily
//             </p>
//           </div>
//           <img
//             src="https://images.unsplash.com/photo-1600185365926-3a810c9d7416?auto=format&fit=crop&w=400&q=80"
//             className="absolute right-[-20px] bottom-[-20px] w-48 object-contain rotate-[-12deg] group-hover:rotate-0 group-hover:scale-110 transition duration-500"
//             alt="Sneaker"
//           />
//         </Link>

//         <Link
//           to="/fashion-trends"
//           className="bg-rose-50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
//         >
//           <div className="relative z-10">
//             <h4 className="text-2xl font-bold text-gray-900 mb-1">
//               Glow Up Kit
//             </h4>
//             <p className="text-rose-600 text-xs font-bold uppercase">
//               Flat 30% Off
//             </p>
//           </div>
//           <img
//             src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80"
//             className="absolute right-[-10px] bottom-[-10px] w-40 object-contain translate-y-4 group-hover:translate-y-0 group-hover:scale-105 transition duration-500"
//             alt="Cosmetics"
//           />
//         </Link>
//       </div>
//     </div>
//   </section>
// );

// /* ------------------------------- PRODUCT STRIP (SHARED) -------------------------------- */

// const ProductStrip = ({ title, products }) => (
//   <section className="py-12 bg-white border-t border-gray-400">
//     <div className="container mx-auto px-4">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
//         <Link
//           to="/products"
//           className="text-indigo-600 font-semibold text-sm flex items-center gap-1"
//         >
//           View All <ChevronRight className="w-4 h-4" />
//         </Link>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
//         {products.slice(0, 10).map((product) => (
//           <Link
//             key={product.id}
//             to={`/products/${product.id}`}
//             className="bg-white  border border-gray-400 p-4 hover:shadow-lg transition-all"
//           >
//             <div className="aspect-square rounded-md bg-gray-100 overflow-hidden mb-3">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-contain"
//               />
//             </div>

//             <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
//               {product.name}
//             </h3>

//             <div className="flex items-center text-yellow-400 mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-3 ${
//                     i < Math.floor(product.rating || 4)
//                       ? "fill-current"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             <span className="text-gray-900 font-bold text-sm">
//               ${product.price}
//             </span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// /* ------------------------------- PRODUCT GROUPS -------------------------------- */

// const flattenProducts = () =>
//   Object.keys(allProducts)
//     .filter((key) => key !== "filters")
//     .flatMap((key) =>
//       Array.isArray(allProducts[key])
//         ? allProducts[key]
//         : Object.values(allProducts[key]).flat()
//     );

// const ALL = flattenProducts();

// const TopProducts = () => {
//   const top = [...ALL].sort((a, b) => b.rating - a.rating);
//   return <ProductStrip title="Top Products" products={top} />;
// };

// const BestSellers = () => {
//   const best = ALL.filter((x) => x.tag === "Best Seller");
//   return <ProductStrip title="Best Sellers" products={best} />;
// };

// const NewArrivals = () => {
//   const newest = [...ALL].sort((a, b) => b.id - a.id);
//   return <ProductStrip title="New Arrivals" products={newest} />;
// };

// const TrendingProducts = () => {
//   const trending = ALL.filter((x) => x.tag === "Trending");
//   return <ProductStrip title="Trending Now" products={trending} />;
// };

// /* ------------------------------- RECOMMENDED PRODUCTS -------------------------------- */

// const RecommendedProducts = () => {
//   const recommended = ALL.filter(
//     (p) => p.tag === "Best Seller" || p.tag === "Trending"
//   ).slice(0, 8);

//   return (
//     <section className="bg-gray-50 py-16 border-t border-gray-200">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-2 mb-8">
//           <Sparkles className="w-6 h-6 text-yellow-500 fill-current" />
//           <h2 className="text-2xl font-bold text-gray-900">
//             Recommended for You
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {recommended.map((product) => (
//             <Link
//               to={`/products/${product.id}`}
//               key={product.id}
//               className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col"
//             >
//               <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2">
//                 <button className="bg-white shadow-md p-2 rounded-full hover:bg-rose-50 hover:text-rose-600 transition text-gray-500">
//                   <Heart className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
//                 />
//                 {product.tag && (
//                   <span className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded shadow-sm text-gray-800 border border-gray-100">
//                     {product.tag}
//                   </span>
//                 )}
//               </div>

//               <div className="flex-1 flex flex-col">
//                 <h3 className="text-gray-900 font-bold text-sm md:text-base leading-snug mb-2 line-clamp-2">
//                   {product.name}
//                 </h3>

//                 <div className="flex items-center gap-1.5 mb-3">
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-3.5 h-3.5 ${
//                           i < Math.floor(product.rating || 4)
//                             ? "fill-current"
//                             : "text-gray-200"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-xs text-gray-400 font-medium">
//                     ({product.reviews})
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
//                   <div className="flex flex-col">
//                     <span className="text-lg font-bold text-gray-900">
//                       ${product.price}
//                     </span>
//                     <span className="text-xs text-gray-400 line-through decoration-red-500">
//                       ${(product.price * 1.2).toFixed(2)}
//                     </span>
//                   </div>
//                   <button className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors active:scale-95">
//                     <ShoppingCart className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="mt-12 text-center">
//           <Link to="/products">
//             <button className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase text-xs tracking-widest">
//               Load More Products <TrendingUp className="w-4 h-4" />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ------------------------------- FEATURE BAR -------------------------------- */

// const FeatureBar = () => (
//   <section className="bg-white border-t border-gray-200 py-8">
//     <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
//       {[
//         {
//           icon: <Zap className="w-6 h-6" />,
//           title: "Fast Delivery",
//           sub: "Within 24 Hours",
//         },
//         {
//           icon: <ShieldCheck className="w-6 h-6" />,
//           title: "Secure Payment",
//           sub: "100% Protected",
//         },
//         {
//           icon: <Sparkles className="w-6 h-6" />,
//           title: "Top Quality",
//           sub: "Verified Brands",
//         },
//         {
//           icon: <Clock className="w-6 h-6" />,
//           title: "24/7 Support",
//           sub: "Always Here",
//         },
//       ].map((feat, i) => (
//         <div
//           key={i}
//           className="flex items-center gap-4 justify-center md:justify-start"
//         >
//           <div className="bg-indigo-50 text-indigo-600 p-3 rounded-full">
//             {feat.icon}
//           </div>
//           <div>
//             <h4 className="font-bold text-gray-900 text-sm">{feat.title}</h4>
//             <p className="text-xs text-gray-500">{feat.sub}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </section>
// );

// /* ------------------------------- MAIN HOME -------------------------------- */

// const Home = () => {
//   return (
//     <div className="font-sans bg-white min-h-screen text-gray-800 pb-8">
//       <QuickLinkRail />
//       <HeroSlider />
//       <DealZone />
//       <BentoGrid />

//       {/* NEW SECTIONS */}
//       <TopProducts />
//       <BestSellers />
//       <NewArrivals />
//       <TrendingProducts />

//       <RecommendedProducts />
//       <FeatureBar />
//     </div>
//   );
// };

// export default Home;
