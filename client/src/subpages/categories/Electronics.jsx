// // src/subpages/electronics/Electronics.jsx
// import React, { useMemo, useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; //  REQUIRED FOR DYNAMIC ROUTE

// // icons
// import { Filter } from "lucide-react";
// import BannerSlider from "./BannerSlider";
// import Filters from "./Filters";
// import ProductGrid from "./ProductGrid";

// import allProductsMaster from "../../data/products.json";

// const Productpage = () => {
//   //  GET CATEGORY FROM URL: /category/:categoryId
//   const { categoryId } = useParams();

//   //  Use electronics fallback
//   const category = categoryId || "electronics";

//   //  Derive products dynamically based on URL category
//   const rawProducts = useMemo(() => {
//     if (!allProductsMaster || !allProductsMaster[category]) return [];

//     const categoryObj = allProductsMaster[category];

//     // Case 1: Already an array
//     if (Array.isArray(categoryObj)) return categoryObj;

//     // Case 2: Object → flatten all subcategory arrays
//     return Object.values(categoryObj).flat();
//   }, [category]);

//   // 2. local state
//   const [filteredProducts, setFilteredProducts] = useState(rawProducts);
//   const [activeFilters, setActiveFilters] = useState({});
//   const [sortOrder, setSortOrder] = useState("popular");
//   const [priceRange, setPriceRange] = useState(200000);
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

//   // 3. filter engine
//   useEffect(() => {
//     let result = [...rawProducts];

//     Object.keys(activeFilters).forEach((key) => {
//       const selected = activeFilters[key];
//       if (!selected || selected.length === 0) return;

//       result = result.filter((p) => {
//         const direct = p[key];
//         const spec = p.specs ? p.specs[key] : undefined;

//         const matchesFromArray = (val) => {
//           if (!val) return false;
//           if (Array.isArray(val)) return selected.some((s) => val.includes(s));
//           return selected.includes(val);
//         };

//         if (key === "rating") {
//           const min = parseInt(selected[0], 10) || 0;
//           return p.rating >= min;
//         }

//         return matchesFromArray(direct) || matchesFromArray(spec);
//       });
//     });

//     result = result.filter((p) => p.price * 84 <= priceRange);

//     if (sortOrder === "lowToHigh") result.sort((a, b) => a.price - b.price);
//     else if (sortOrder === "highToLow")
//       result.sort((a, b) => b.price - a.price);
//     else if (sortOrder === "newest")
//       result.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

//     setFilteredProducts(result);
//   }, [activeFilters, priceRange, sortOrder, rawProducts]);

//   // handlers
//   const handleFilterChange = (key, value) => {
//     setActiveFilters((prev) => {
//       const cur = prev[key] || [];
//       const exists = cur.includes(value);
//       const updated = exists ? cur.filter((v) => v !== value) : [...cur, value];

//       if (key === "rating") return { ...prev, [key]: [value] };

//       return { ...prev, [key]: updated };
//     });
//   };

//   const clearFilters = () => {
//     setActiveFilters({});
//     setPriceRange(200000);
//   };

//   // dynamic filters
//   const filtersConfigFromData = allProductsMaster?.filters?.[category];
//   const defaultFilters = {
//     electronics: [
//       {
//         key: "brand",
//         label: "Brand",
//         type: "checkbox",
//         values: [
//           "Samsung",
//           "Apple",
//           "Xiaomi",
//           "OnePlus",
//           "Realme",
//           "Vivo",
//           "Oppo",
//           "POCO",
//         ],
//       },
//       {
//         key: "ram",
//         label: "RAM",
//         type: "checkbox",
//         values: ["12 GB", "8 GB", "6 GB", "4 GB"],
//       },
//       {
//         key: "internal_storage",
//         label: "Internal Storage",
//         type: "checkbox",
//         values: ["256 GB", "128 GB", "64 GB", "32 GB"],
//       },
//       {
//         key: "display",
//         label: "Display",
//         type: "checkbox",
//         values: ["Full HD", "AMOLED", "Retina", "Super AMOLED"],
//       },
//       {
//         key: "price",
//         label: "Price",
//         type: "price_range",
//         min: 0,
//         max: 200000,
//       },
//       {
//         key: "rating",
//         label: "Customer Ratings",
//         type: "rating",
//         values: ["4", "3"],
//       },
//     ],
//   };

//   const filtersConfig =
//     filtersConfigFromData ??
//     (defaultFilters[category]
//       ? defaultFilters[category]
//       : defaultFilters["electronics"]);

//   return (
//     <div className="bg-white min-h-screen font-sans">
//       <BannerSlider category={category} />

//       <div className="container mx-auto px-4 pb-12 flex gap-6 relative">
//         {/* Sidebar - Desktop */}
//         <aside className="w-64 hidden lg:block h-max sticky top-24 transition-all">
//           <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
//             <Filters
//               filters={filtersConfig}
//               activeFilters={activeFilters}
//               onFilterChange={handleFilterChange}
//               priceRange={priceRange}
//               setPriceRange={setPriceRange}
//               clearFilters={clearFilters}
//               isMobile={false}
//             />
//           </div>
//         </aside>

//         {/* Mobile Filters */}
//         <Filters
//           filters={filtersConfig}
//           activeFilters={activeFilters}
//           onFilterChange={handleFilterChange}
//           priceRange={priceRange}
//           setPriceRange={setPriceRange}
//           clearFilters={clearFilters}
//           isMobile
//           isMobileFilterOpen={isMobileFilterOpen}
//           setIsMobileFilterOpen={setIsMobileFilterOpen}
//         />

//         {/* Main Content */}
//         <main className="flex-1">
//           {/* Toolbar */}
//           <div className="bg-white p-3 mb-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center sticky top-[56px] z-20">
//             <div className="w-full sm:w-auto flex justify-between items-center mb-2 sm:mb-0 lg:hidden">
//               <button
//                 onClick={() => setIsMobileFilterOpen(true)}
//                 className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-100 px-3 py-2 rounded-md"
//               >
//                 <Filter className="w-4 h-4" /> Filters
//               </button>
//               <span className="text-xs text-gray-500 ml-2">
//                 {filteredProducts.length} items
//               </span>
//             </div>

//             <div className="text-sm text-gray-900 hidden lg:block">
//               <span className="font-bold">{filteredProducts.length}</span> items
//               found for "{category}"
//             </div>

//             <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
//               <span className="text-gray-500 hidden sm:block">Sort By</span>
//               <select
//                 value={sortOrder}
//                 onChange={(e) => setSortOrder(e.target.value)}
//                 className="border-b border-gray-300 font-bold text-gray-900 bg-transparent py-1"
//               >
//                 <option value="popular">Popularity</option>
//                 <option value="lowToHigh">Price -- Low to High</option>
//                 <option value="highToLow">Price -- High to Low</option>
//                 <option value="newest">Newest First</option>
//               </select>
//             </div>
//           </div>

//           {/* Grid */}
//           <ProductGrid
//             products={filteredProducts}
//             formatPrice={(v) =>
//               new Intl.NumberFormat("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//                 maximumFractionDigits: 0,
//               }).format(v * 84)
//             }
//             clearFilters={clearFilters}
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Productpage;

// src/subpages/electronics/Electronics.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BannerSlider from "./BannerSlider";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import productsMaster from "../../data/products.json";
import { Filter } from "lucide-react";

/**
 * Productpage (dynamic) - reads :categoryId from URL
 * Uses master JSON Option B (category -> subcategory -> [products])
 */
const Productpage = () => {
  const { categoryId } = useParams();
  const category = categoryId || "electronics";

  // Mobile filter drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // active filters state and other UI state
  const [activeFilters, setActiveFilters] = useState({});
  const [sortOrder, setSortOrder] = useState("popular");
  const [priceRange, setPriceRange] = useState(200000);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // generate subcategory list & flatten products from master JSON
  const { subcategories = [], rawProducts = [] } = useMemo(() => {
    const catData = productsMaster[category] ?? {};
    // subcategory keys
    const keys = Array.isArray(catData) ? [] : Object.keys(catData);
    // flatten
    const flat = Array.isArray(catData)
      ? catData
      : Object.values(catData).flat();
    return { subcategories: keys, rawProducts: flat };
  }, [category]);

  // initial load / simulate loading
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFilteredProducts(rawProducts);
    }, 300); // small skeleton delay
  }, [rawProducts]);

  // core filtering logic (kept similar to your earlier engine)
  useEffect(() => {
    let result = [...rawProducts];

    // apply checkbox-like filters
    Object.keys(activeFilters).forEach((key) => {
      const sel = activeFilters[key];
      if (!sel || sel.length === 0) return;

      result = result.filter((p) => {
        const direct = p[key];
        const spec = p.specs ? p.specs[key] : undefined;

        const matches = (val) => {
          if (!val) return false;
          if (Array.isArray(val)) return sel.some((s) => val.includes(s));
          return sel.includes(val);
        };

        if (key === "rating") {
          const min = parseInt(sel[0], 10) || 0;
          return (p.rating ?? 0) >= min;
        }

        return matches(direct) || matches(spec);
      });
    });

    // price filter (product price assumed in base currency)
    result = result.filter((p) => (p.price ?? 0) <= priceRange);

    // sort
    if (sortOrder === "lowToHigh")
      result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sortOrder === "highToLow")
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else if (sortOrder === "newest")
      result.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    setFilteredProducts(result);
  }, [activeFilters, priceRange, sortOrder, rawProducts]);

  const handleFilterChange = (key, value) => {
    setActiveFilters((prev) => {
      const cur = prev[key] || [];
      const exists = cur.includes(value);
      const updated = exists ? cur.filter((v) => v !== value) : [...cur, value];
      if (key === "rating") return { ...prev, [key]: [value] };
      return { ...prev, [key]: updated };
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
    setPriceRange(200000);
  };

  // pick filters config from master JSON filters if present
  const filtersConfig =
    productsMaster.filters?.[category] ??
    productsMaster.filters?.electronics ??
    [];

  // derive subcategory bubbles (use subcategory names and unsplash keywords)
  const subcategoryBubbles = subcategories.length ? subcategories : []; // fallback empty

  return (
    <div className="bg-white min-h-screen font-sans">
      <BannerSlider category={category} />

      {/* Subcategory round icons */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          Sub categories
          <div className="flex gap-4 py-4 overflow-x-auto hide-scrollbar">
            {subcategoryBubbles.length > 0 ? (
              subcategoryBubbles.map((s) => (
                <div
                  key={s}
                  className="flex flex-col items-center min-w-[84px]"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm">
                    <img
                      src={`https://source.unsplash.com/160x160/?${encodeURIComponent(
                        s
                      )}`}
                      alt={s}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs mt-2 text-center text-gray-700">
                    {s}
                  </span>
                </div>
              ))
            ) : (
              // if no subcategories, show first-row brand bubbles (derived)
              <div className="flex gap-4">
                {rawProducts.slice(0, 8).map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col items-center min-w-[84px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm">
                      <img
                        src={
                          p.image ||
                          `https://source.unsplash.com/160x160/?${encodeURIComponent(
                            p.name.split(" ")[0]
                          )}`
                        }
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs mt-2 text-center text-gray-700">
                      {p.brand ?? p.name.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12 flex gap-6 relative">
        {/* Sidebar Desktop */}
        <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 h-max">
          <div className="bg-white p-4  shadow-sm">
            <div className="flex items-center justify-between mb-10">
              {/* <h4 className="font-bold text-sm">Filters</h4>
              <button
                onClick={clearFilters}
                className="text-xs text-indigo-600 font-semibold"
              >
                Reset
              </button> */}
            </div>
            <Filters
              filters={filtersConfig}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
              isMobile={false}
            />
          </div>
        </aside>

        {/* Mobile Filters Drawer (component handles showing) */}
        <Filters
          filters={filtersConfig}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          clearFilters={clearFilters}
          isMobile
          isMobileFilterOpen={isMobileFilterOpen}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
        />

        {/* Main */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="bg-white p-3 mb-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center sticky top-[56px] z-20">
            <div className="w-full sm:w-auto flex items-center gap-4 mb-3 sm:mb-0">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-100 px-3 py-2 rounded-md"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
              <div className="text-sm text-gray-700 hidden sm:block">
                Showing results
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-200 text-sm px-3 py-2 rounded"
              >
                <option value="popular">Popular</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <button className="bg-black text-white px-4 py-2 rounded text-sm">
                Apply
              </button>
            </div>
          </div>

          {/* Grid */}
          <ProductGrid
            products={filteredProducts}
            loading={isLoading}
            formatPrice={(v) =>
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(v ?? 0)
            }
            clearFilters={clearFilters}
          />
        </main>
      </div>
    </div>
  );
};

export default Productpage;
