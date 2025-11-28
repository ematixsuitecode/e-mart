// src/pages/Products.jsx
import React, { useMemo, useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";

// master JSON
import allProductsMaster from "../data/products.json";

const Products = () => {
  /* ---------------------------------------
   * 1. FLATTEN ALL PRODUCTS FROM ALL CATEGORIES
   --------------------------------------- */
  const allProducts = useMemo(() => {
    return Object.keys(allProductsMaster)
      .filter((key) => key !== "filters")
      .flatMap((category) => Object.values(allProductsMaster[category]).flat());
  }, []);

  /* ---------------------------------------
   * 2. STATES
   --------------------------------------- */
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortOrder, setSortOrder] = useState("popular");
  const [priceRange, setPriceRange] = useState(200000);

  /* ---------------------------------------
   * 3. GLOBAL FILTERS
   --------------------------------------- */
  const globalFilters = [
    {
      key: "brand",
      label: "Brand",
      type: "checkbox",
      values: Array.from(new Set(allProducts.map((p) => p.brand))),
    },
    {
      key: "rating",
      label: "Min Rating",
      type: "rating",
      values: ["4", "3"],
    },
    {
      key: "price",
      label: "Price",
      type: "price_range",
      min: 0,
      max: 200000,
    },
  ];

  /* ---------------------------------------
   * 4. FILTER ENGINE
   --------------------------------------- */
  useEffect(() => {
    let result = [...allProducts];

    Object.keys(activeFilters).forEach((key) => {
      const selected = activeFilters[key];
      if (!selected.length) return;

      result = result.filter((p) => {
        if (key === "rating") {
          const min = parseInt(selected[0], 10);
          return p.rating >= min;
        }
        return selected.includes(p[key]);
      });
    });

    result = result.filter((p) => p.price * 84 <= priceRange);

    if (sortOrder === "lowToHigh") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "highToLow") result.sort((a, b) => b.price - a.price);
    if (sortOrder === "newest")
      result.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    setFilteredProducts(result);
  }, [activeFilters, priceRange, sortOrder, allProducts]);

  const handleFilterChange = (key, value) => {
    setActiveFilters((prev) => {
      const exists = prev[key]?.includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...(prev[key] || []), value],
      };
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
    setPriceRange(200000);
  };

  /* ---------------------------------------
   * 5. INSERT AD BANNERS AFTER EVERY 8 PRODUCTS
   --------------------------------------- */
  const adBanners = [
    "https://cdn.pixabay.com/photo/2019/04/10/15/06/sale-4114885_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/03/52/sale-1860031_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/07/31/11/20/smartphone-2568618_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/04/17/online-1863425_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/11/27/23/54/living-room-2989693_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/12/16/06/kitchen-2631942_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/01/12/14/23/vegetables-1978521_1280.jpg",
  ];

  const productWithAds = useMemo(() => {
    const result = [];
    filteredProducts.forEach((p, index) => {
      result.push(p);

      if ((index + 1) % 8 === 0) {
        const banner = adBanners[index % adBanners.length];
        result.push({
          isAd: true,
          id: `ad-${index}`,
          image: banner,
        });
      }
    });

    return result;
  }, [filteredProducts]);

  /* ---------------------------------------
   * 6. RENDER UI
   --------------------------------------- */
  return (
    <div className="bg-white min-h-screen font-sans container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {/* MAIN LAYOUT */}
      <div className="flex gap-10">
        {/* LEFT — FILTERS */}
        <aside className="w-64 hidden md:block sticky top-20 h-[calc(100vh-120px)] overflow-y-auto border-r pr-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Filters</h3>
            <button className="text-blue-600" onClick={clearFilters}>
              Reset
            </button>
          </div>

          {globalFilters.map((f) => (
            <div key={f.key} className="mb-6">
              <p className="font-semibold mb-2">{f.label}</p>

              {f.type === "checkbox" &&
                f.values.map((val) => (
                  <label key={val} className="block text-sm mb-1">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={activeFilters[f.key]?.includes(val) || false}
                      onChange={() => handleFilterChange(f.key, val)}
                    />
                    {val}
                  </label>
                ))}

              {f.type === "price_range" && (
                <>
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs mt-1 text-gray-600">
                    Up to ₹{priceRange.toLocaleString()}
                  </p>
                </>
              )}

              {f.type === "rating" &&
                f.values.map((v) => (
                  <button
                    key={v}
                    onClick={() => handleFilterChange("rating", v)}
                    className={`block w-full border p-2 rounded mb-1 ${
                      activeFilters.rating?.includes(v)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {v}★ & above
                  </button>
                ))}
            </div>
          ))}
        </aside>

        {/* RIGHT — SCROLLABLE PRODUCT AREA */}
        <main className="flex-1 h-[calc(100vh-120px)] overflow-y-auto">
          {/* SORT BAR */}

          {/* PRODUCT GRID + AD BANNERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {productWithAds.map((item) =>
              item.isAd ? (
                <div
                  key={item.id}
                  className="col-span-full rounded-xl overflow-hidden shadow border"
                >
                  <img
                    src={item.image}
                    alt="Advertisement"
                    className="w-full h-40 object-cover"
                  />
                </div>
              ) : (
                <ProductCard key={item.id} product={item} />
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
