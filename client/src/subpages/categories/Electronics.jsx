import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BannerSlider from "./BannerSlider";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import productsMaster from "../../data/products.json";

const Productpage = () => {
  const { categoryId } = useParams();
  const category = categoryId || "electronics";

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortOrder, setSortOrder] = useState("popular");
  const [priceRange, setPriceRange] = useState(200000);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Extract category data and banners from JSON
  const {
    subcategories = [],
    rawProducts = [],
    categoryBanner,
  } = useMemo(() => {
    const catData = productsMaster[category] ?? {};
    const keys = Object.keys(catData).filter((k) => k !== "id" && k !== "name");
    const flat = keys.flatMap((k) => catData[k] ?? []);
    const banner =
      productsMaster.filters?.categoryImages?.[0]?.[category] ||
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1600&q=80";
    return { subcategories: keys, rawProducts: flat, categoryBanner: banner };
  }, [category]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredProducts(rawProducts);
      setIsLoading(false);
    }, 300);
  }, [rawProducts]);

  // Filter & sort logic
  useEffect(() => {
    let result = [...rawProducts];

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

    result = result.filter((p) => (p.price ?? 0) <= priceRange);

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

  const filtersConfig =
    productsMaster.filters?.[category] ??
    productsMaster.filters?.electronics ??
    [];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Category Banner */}
      <BannerSlider category={category} banners={[categoryBanner]} />
      {/* Subcategories */}
      <div style={{ marginLeft: "60px", fontWeight: "bold" }}>
        {" "}
        Sub category
      </div>
      {subcategories.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 py-4 flex gap-4 overflow-x-auto">
          {subcategories.map((sub) => (
            <div
              key={sub}
              className="flex-shrink-0 w-20 h-auto flex flex-col items-center"
            >
              {/* Circle Image */}
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border border-gray-100">
                <img
                  src={
                    productsMaster.filters?.subcategoryImages?.[0]?.[sub] ||
                    "https://via.placeholder.com/150"
                  }
                  alt={sub}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Subcategory Name */}
              <div className="text-center mt-1 text-sm font-semibold">
                {sub}
              </div>

              {/* Category Name */}
              <div className="text-center text-[11px] text-gray-500 -mt-1 capitalize">
                {category}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 flex gap-6 relative">
        {/* Sidebar Filters */}
        <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 h-max">
          <div className="bg-white p-4 rounded-md border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm">Filters</h4>
              <button
                onClick={clearFilters}
                className="text-xs text-indigo-600 font-semibold"
              >
                Reset
              </button>
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

        {/* Mobile Filter Drawer */}
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

        {/* Product Grid */}
        <main className="flex-1 h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
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
