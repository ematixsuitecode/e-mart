// // src/subpages/electronics/Filters.jsx
// import React, { useState, useEffect } from "react";
// import { X, ChevronDown } from "lucide-react";

// /**
//  * Filters component
//  * Props:
//  *  - filters: array of filter sections (each: { key, label, type, values?, min?, max? })
//  *  - activeFilters: object of active filters { brand: ['Samsung'], ... }
//  *  - onFilterChange(key, value)
//  *  - priceRange, setPriceRange
//  *  - clearFilters()
//  *  - isMobile (boolean) - if true, this component will render mobile drawer UI
//  *  - isMobileFilterOpen, setIsMobileFilterOpen (optional, for mobile control)
//  */
// const Collapsible = ({ title, children, isOpenDefault = true }) => {
//   const [open, setOpen] = useState(isOpenDefault);
//   return (
//     <div className="border-b border-gray-200 py-4 first:pt-0">
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex justify-between items-center w-full text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 hover:text-blue-600 transition-colors"
//       >
//         {title}
//         <span
//           className={`transform transition-transform duration-300 ${
//             open ? "rotate-180" : "rotate-0"
//           }`}
//         >
//           <ChevronDown className="w-4 h-4" />
//         </span>
//       </button>
//       <div
//         className={`overflow-hidden transition-all duration-300 ease-in-out ${
//           open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="space-y-2 pl-1 pt-1">{children}</div>
//       </div>
//     </div>
//   );
// };

// const CheckboxRow = ({ label, checked, onChange }) => (
//   <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 group py-1.5 transition-colors select-none">
//     <div
//       className={`w-4 h-4 border rounded-[2px] flex items-center justify-center transition-all duration-200 ${
//         checked
//           ? "bg-blue-600 border-blue-600 scale-110"
//           : "border-gray-400 bg-white group-hover:border-blue-500"
//       }`}
//     >
//       {checked && <div className="w-2 h-2 bg-white rounded-[1px]" />}
//     </div>
//     <input
//       type="checkbox"
//       className="hidden"
//       checked={checked}
//       onChange={onChange}
//     />
//     <span
//       className={`text-sm ${
//         checked ? "font-bold text-gray-900" : "text-gray-600"
//       }`}
//     >
//       {label}
//     </span>
//   </label>
// );

// const PriceRange = ({ min = 0, max = 200000, value, setValue }) => (
//   <div className="px-2 py-2">
//     <input
//       type="range"
//       min={min}
//       max={max}
//       step="1000"
//       value={value}
//       onChange={(e) => setValue(Number(e.target.value))}
//       className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
//     />
//     <div className="flex justify-between text-xs text-gray-500 mt-2">
//       <span>₹0</span>
//       <span className="font-bold text-gray-900">
//         {new Intl.NumberFormat("en-IN", {
//           style: "currency",
//           currency: "INR",
//           maximumFractionDigits: 0,
//         }).format(value)}
//         +
//       </span>
//     </div>
//   </div>
// );

// const Filters = ({
//   filters = [],
//   activeFilters = {},
//   onFilterChange = () => {},
//   priceRange,
//   setPriceRange,
//   clearFilters = () => {},
//   isMobile = false,
//   isMobileFilterOpen = false,
//   setIsMobileFilterOpen = () => {},
// }) => {
//   // local copy of priceRange for smooth control on mobile (optional)
//   const [localPrice, setLocalPrice] = useState(priceRange ?? 200000);

//   useEffect(() => setLocalPrice(priceRange), [priceRange]);

//   const renderFilterSection = (section) => {
//     if (section.type === "price_range") {
//       return (
//         <Collapsible title={section.label} key={section.key}>
//           <PriceRange
//             min={section.min ?? 0}
//             max={section.max ?? 200000}
//             value={localPrice}
//             setValue={(v) => {
//               setLocalPrice(v);
//               setPriceRange(v);
//             }}
//           />
//         </Collapsible>
//       );
//     }

//     if (section.type === "rating") {
//       return (
//         <Collapsible title={section.label} key={section.key}>
//           {section.values?.map((v) => (
//             <div key={v} className="py-1">
//               <CheckboxRow
//                 label={`${v}★ & above`}
//                 checked={activeFilters[section.key]?.includes(v) || false}
//                 onChange={() => onFilterChange(section.key, v)}
//               />
//             </div>
//           ))}
//         </Collapsible>
//       );
//     }

//     // default: checkbox group
//     return (
//       <Collapsible title={section.label} key={section.key}>
//         {section.values?.map((opt) => (
//           <div key={opt} className="py-1">
//             <CheckboxRow
//               label={opt}
//               checked={activeFilters[section.key]?.includes(opt) || false}
//               onChange={() => onFilterChange(section.key, opt)}
//             />
//           </div>
//         ))}
//       </Collapsible>
//     );
//   };

//   // Mobile Drawer + Overlay
//   if (isMobile) {
//     return (
//       <>
//         {/* Overlay */}
//         <div
//           className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
//             isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//           onClick={() => setIsMobileFilterOpen(false)}
//         />
//         {/* Drawer */}
//         <div
//           className={`fixed inset-y-0 left-0 w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
//             isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="p-4 border-b border-gray-100 flex justify-between items-center">
//             <h2 className="font-black text-xl text-gray-900">Filters</h2>
//             <button
//               onClick={() => setIsMobileFilterOpen(false)}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-gray-500" />
//             </button>
//           </div>
//           <div className="p-4 overflow-y-auto flex-1">
//             <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
//               <h3 className="font-bold text-lg text-gray-900">Refine</h3>
//               <button
//                 onClick={() => clearFilters()}
//                 className="text-xs text-blue-600 font-bold hover:underline uppercase transition-colors"
//               >
//                 Clear
//               </button>
//             </div>

//             {filters.map(renderFilterSection)}
//           </div>

//           <div className="p-4 border-t border-gray-100 bg-gray-50">
//             <button
//               onClick={() => setIsMobileFilterOpen(false)}
//               className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md active:scale-95"
//             >
//               Show Results
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Desktop Sidebar
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
//         <h3 className="font-bold text-lg text-gray-900">Filters</h3>
//         <button
//           onClick={() => clearFilters()}
//           className="text-xs text-blue-600 font-bold hover:underline uppercase transition-colors"
//         >
//           Clear All
//         </button>
//       </div>

//       {filters.map(renderFilterSection)}
//     </div>
//   );
// };

// export default Filters;
// src/subpages/electronics/Filters.jsx
import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

/**
 * Filters Component
 * Props:
 *  - filters: array (config for this category) or object (ignored)
 *  - activeFilters: object
 *  - onFilterChange(key, value)
 *  - priceRange, setPriceRange
 *  - clearFilters()
 *  - isMobile (boolean)
 *  - isMobileFilterOpen, setIsMobileFilterOpen (for drawer)
 */
const Collapsible = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-bold text-gray-800"
      >
        <span className="uppercase text-xs tracking-wide text-gray-600">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`mt-2 transition-all ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const CheckboxItem = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 py-2 cursor-pointer text-sm">
    <input
      type="checkbox"
      className="hidden"
      checked={checked}
      onChange={onChange}
    />
    <span
      className={`w-4 h-4 border rounded-sm flex items-center justify-center ${
        checked ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"
      }`}
    ></span>
    <span className={`text-sm ${checked ? "font-semibold" : "text-gray-600"}`}>
      {label}
    </span>
  </label>
);

const Filters = ({
  filters = [],
  activeFilters = {},
  onFilterChange = () => {},
  priceRange = 200000,
  setPriceRange = () => {},
  clearFilters = () => {},
  isMobile = false,
  isMobileFilterOpen = false,
  setIsMobileFilterOpen = () => {},
}) => {
  const mobileDrawer = (
    <div
      className={`fixed inset-0 z-50 transition-all ${
        isMobileFilterOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isMobileFilterOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsMobileFilterOpen(false)}
      />
      <aside
        className={`absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform ${
          isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-lg">Filters</h3>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <InnerFilters />
        </div>
        <div className="p-4 border-t">
          <button
            onClick={() => {
              setIsMobileFilterOpen(false);
            }}
            className="w-full bg-indigo-600 text-white py-2 rounded-md"
          >
            Show Results
          </button>
        </div>
      </aside>
    </div>
  );

  function InnerFilters() {
    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold">Filters</h4>
          <button
            onClick={clearFilters}
            className="text-xs text-indigo-600 font-semibold"
          >
            Reset
          </button>
        </div>

        {Array.isArray(filters) &&
          filters.map((section) => {
            if (section.type === "price_range") {
              return (
                <Collapsible
                  key={section.key}
                  title={section.label}
                  defaultOpen
                >
                  <div className="px-2 py-2">
                    <input
                      type="range"
                      min={section.min ?? 0}
                      max={section.max ?? 200000}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>₹0</span>
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format(priceRange)}
                      </span>
                    </div>
                  </div>
                </Collapsible>
              );
            }

            return (
              <Collapsible key={section.key} title={section.label}>
                <div className="pt-2">
                  {section.values?.map((val) => (
                    <CheckboxItem
                      key={val}
                      label={val}
                      checked={(activeFilters[section.key] || []).includes(val)}
                      onChange={() => onFilterChange(section.key, val)}
                    />
                  ))}
                </div>
              </Collapsible>
            );
          })}
      </>
    );
  }

  // Desktop sidebar
  if (!isMobile) {
    return (
      <div>
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <InnerFilters />
        </div>
      </div>
    );
  }

  // Mobile
  return mobileDrawer;
};

export default Filters;
