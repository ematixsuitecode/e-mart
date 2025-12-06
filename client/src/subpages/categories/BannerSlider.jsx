// src/subpages/electronics/BannerSlider.jsx
import React, { useEffect, useState } from "react";

/**
 * BannerSlider - can be dynamic by category prop
 * If you'd like category-specific banners, pass a category prop and provide banners in a data file.
 */
const defaultBanners = [
  "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
];

const BannerSlider = ({
  category = "electronics",
  banners = defaultBanners,
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % banners.length),
      4000
    );
    return () => clearInterval(t);
  }, [banners.length]);

  return (
    <div className="relative w-full h-[200px] md:h-[320px] bg-gray-900 mb-6 overflow-hidden group">
      {banners.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`${category}-banner-${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-60 scale-105" : "opacity-0 scale-100"
          }`}
        />
      ))}

      <div className="absolute inset-0 flex flex-col justify-center items-start container mx-auto px-4 md:px-8 z-10 transition-all duration-500">
        <div
          className={`transform transition-all duration-700 ${
            current % 2 === 0
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          } delay-100`}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
            BIG {category.toUpperCase()} SALE
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-4 drop-shadow-md">
            Top deals & offers — updated regularly
          </p>
          <button className="bg-yellow-400 text-black px-6 py-2 md:px-8 md:py-3 rounded-sm font-bold hover:bg-yellow-500 transition-transform hover:scale-105 shadow-lg uppercase text-sm tracking-wider">
            Shop Now
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === idx
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
