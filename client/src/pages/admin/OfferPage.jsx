"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Search } from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import CustomFetch from "../../utils/CustomFetch";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [offerProducts, setOfferProducts] = useState([]);
  const [activeOfferType, setActiveOfferType] = useState('99_STORE');

  /* --------------------------------------------------------
     Helpers
  -------------------------------------------------------- */

  const formatDate = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleDateString("en-IN");
    } catch {
      return iso;
    }
  };

  const daysFromNow = (iso) => {
    const now = new Date();
    const d = new Date(iso);
    return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  };

  useEffect(() =>{
    loadOfferProducts("99_STORE");
  },[]);

  /* --------------------------------------------------------
     Fetch Offer Products (99 Store / Lucky Draw / Deal of Day)
  -------------------------------------------------------- */
  const loadOfferProducts = async (type) => {
    setActiveOfferType(type);
    setOfferProducts([]);

    try {
      const res = await CustomFetch.get(`/offer/${type}`);
      const raw = res?.data ?? res;
      const offers = raw.offers ?? raw.data ?? raw ?? [];

      const list = [];
      offers.forEach((offer) => {
        const offerStart = offer.startDate;
        const offerEnd = offer.endDate;

        (offer.productIds || []).forEach((p) => {
          list.push({
            _id: p._id,
            name: p.name,
            price: p.price ?? p.mrp ?? null,
            specialPrice: offer.specialPrice ?? null,
            discountPrice: offer.discountPrice ?? null,
            discountPercent: offer.discountPercent ?? null,
            offerType: offer.offerType ?? type,
            isActive: offer.isActive,
            startDate: offerStart,
            endDate: offerEnd,
            startFormatted: formatDate(offerStart),
            endFormatted: formatDate(offerEnd),
            rawOfferId: offer._id,
            daysToStart: daysFromNow(offerStart),
            daysToEnd: daysFromNow(offerEnd),
          });
        });
      });

      setOfferProducts(list);
    } catch (err) {
      console.error("Offer Fetch Failed →", err);
    }
  };

  /* --------------------------------------------------------
     Fetch Orders (If needed in real integration)
  -------------------------------------------------------- */
  const fetchOrders = async () => {
    try {
      // Example API call (adjust if using real orders)
      const dummyOrders = [];
      setOrders(dummyOrders);
    } catch (err) {
      console.error("Orders fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* --------------------------------------------------------
     Dark Mode Persist
  -------------------------------------------------------- */
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  /* --------------------------------------------------------
     Search filter for Orders
  -------------------------------------------------------- */
  const filteredOrders = orders.filter(
    (o) =>
      (o.customer || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.productName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* --------------------------------------------------------
     Render
  -------------------------------------------------------- */

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <AdminSidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        } ${
          darkMode ? "bg-gray-900 text-white" : "bg-[#FDF7F0] text-gray-900"
        }`}
      >
        {/* HEADER */}
        <header
          className={`flex h-16 items-center justify-between border-b px-6 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h1 className="text-xl font-semibold">Orders & Offers Management</h1>

          <button
            onClick={toggleDarkMode}
            className={`rounded-full p-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </header>

        <div className="p-6">
          {/* OFFER FILTER BUTTONS */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => loadOfferProducts("99_STORE")}
              className={`px-4 py-2 rounded-md ${
                activeOfferType === "99_STORE"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              99 Store
            </button>

            <button
              onClick={() => loadOfferProducts("LUCKY_DRAW")}
              className={`px-4 py-2 rounded-md ${
                activeOfferType === "LUCKY_DRAW"
                  ? "bg-purple-700 text-white"
                  : "bg-purple-600 text-white"
              }`}
            >
              Lucky Draw
            </button>

            <button
              onClick={() => loadOfferProducts("DEAL_OF_DAY")}
              className={`px-4 py-2 rounded-md ${
                activeOfferType === "DEAL_OF_DAY"
                  ? "bg-green-700 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              Deal of the Day
            </button>

            <button
              onClick={() => {
                setOfferProducts([]);
                setActiveOfferType(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {/* --------------------------------------------------------
              ORDERS TABLE
          -------------------------------------------------------- */}
          <div
            className={`rounded-lg shadow overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-4 flex items-center mb-4">
              <Search className="h-5 w-5 mr-2 opacity-70" />

              <input
                type="text"
                placeholder="Search orders..."
                className={`flex-1 p-2 border rounded-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* --------------------------------------------------------
              OFFER PRODUCTS TABLE
          -------------------------------------------------------- */}
          {activeOfferType && (
            <>
              <h2 className="text-lg font-semibold mb-3">
                {activeOfferType.replace(/_/g, " ")} — Products
              </h2>

              {offerProducts.length === 0 ? (
                <p className="text-gray-500">No products in this offer.</p>
              ) : (
                <div
                  className={`rounded-lg shadow overflow-hidden ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead
                        className={darkMode ? "bg-gray-700" : "bg-gray-50"}
                      >
                        <tr>
                          {[
                            "Product",
                            "MRP",
                            "Special Price",
                            "Discount",
                            "Start Date",
                            "End Date",
                            "Status",
                            "Days Left",
                            "Action",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody
                        className={
                          darkMode
                            ? "divide-gray-700 divide-y"
                            : "divide-gray-200 divide-y"
                        }
                      >
                        {offerProducts.map((prod) => {
                          const startsIn = prod.daysToStart;
                          const endsIn = prod.daysToEnd;
                          const started = startsIn <= 0;
                          const expired = endsIn < 0;

                          if (expired) return null;

                          return (
                            <tr key={`${prod._id}-${prod.rawOfferId}`}>
                              <td className="px-6 py-4 text-sm font-semibold">
                                {prod.name}
                                <div className="text-xs text-gray-500">
                                  {prod.offerType}
                                </div>
                              </td>

                              <td className="px-6 py-4 text-sm">
                                {prod.price ? `₹${prod.price}` : "-"}
                              </td>

                              <td className="px-6 py-4 text-sm text-red-600 font-bold">
                                {prod.specialPrice
                                  ? `₹${prod.specialPrice}`
                                  : "-"}
                              </td>

                              <td className="px-6 py-4 text-sm text-green-600">
                                {prod.discountPrice
                                  ? `₹${prod.discountPrice}`
                                  : prod.discountPercent
                                  ? `₹ ${prod.discountPercent}`
                                  : "-"}
                              </td>

                              <td className="px-6 py-4 text-sm">
                                {prod.startFormatted}
                              </td>

                              <td className="px-6 py-4 text-sm">
                                {prod.endFormatted}
                              </td>

                              <td className="px-6 py-4 text-sm">
                                <span
                                  className={
                                    prod.isActive
                                      ? "text-green-500 font-semibold"
                                      : "text-red-500 font-semibold"
                                  }
                                >
                                  {prod.isActive ? "Active" : "Inactive"}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm">
                                {started
                                  ? endsIn >= 0
                                    ? `${endsIn} day(s)`
                                    : "Expired"
                                  : `${startsIn} day(s) to start`}
                              </td>

                              <td className="px-6 py-4 text-sm">
                                <button
                                  disabled={!started || !prod.isActive}
                                  className={`px-3 py-1 rounded-full text-white text-sm ${
                                    started && prod.isActive
                                      ? "bg-yellow-500 hover:bg-yellow-600"
                                      : "bg-gray-300 cursor-not-allowed"
                                  }`}
                                >
                                  {started && prod.isActive
                                    ? "Availbale"
                                    : "Not Available"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <hr className="my-6" />
            </>
          )}
        </div>
      </main>
    </div>
  );
}