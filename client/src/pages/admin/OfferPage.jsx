'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  ShoppingCart,
} from 'lucide-react';

import AdminSidebar from '../../components/admin/AdminSidebar';
import CustomFetch from '../../utils/CustomFetch';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [offerDetails, setOfferDetails] = useState(null);
  const [offerProducts, setOfferProducts] = useState([]); // flattened products with offer meta
  const [activeOfferType, setActiveOfferType] = useState(null); // 99_STORE | LUCKY_DRAW | DEAL_OF_DAY

  // ---------- helpers ----------
  const formatDate = (iso) => {
    if (!iso) return '-';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-IN');
    } catch (e) {
      return iso;
    }
  };

  const daysBetween = (fromIso, toIso) => {
    const from = new Date(fromIso);
    const to = new Date(toIso);
    const diffMs = to - from;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const daysFromNow = (iso) => {
    const now = new Date();
    const d = new Date(iso);
    const diffMs = d - now;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  // ========== FETCH ALL OFFERS (for admin listing / debug) ==========
  const fetchOrder = async () => {
    try {
      const response = await CustomFetch.get('/offer/');
      // response.data might be array or wrapped
      const data = response?.data ?? response;
      setOfferDetails(data);
      console.log('offer fetch ->', data);
      // You can setOrders or other derived state here if needed
    } catch (err) {
      console.error(err);
    }
  };

  // ========== FETCH OFFERS (BUTTON CLICK) ==========
  const loadOfferProducts = async (type) => {
    setActiveOfferType(type);
    setOfferProducts([]);

    try {
      const res = await CustomFetch.get(`/offer/${type}`);
      // backend responses vary — normalize
      // possible shapes: { data: [...] } or { offers: [...] } or [...]
      const raw = res?.data ?? res;
      const offers = raw.offers ?? raw.data ?? raw ?? [];

      // flatten all productIds from offers and attach offer metadata
      const list = [];
      offers.forEach((offer) => {
        const offerStart = offer.startDate;
        const offerEnd = offer.endDate;
        const specialPrice = offer.specialPrice ?? null;
        const discountPrice = offer.discountPrice ?? null;
        const discountPercent = offer.discountPercent ?? null;
        const isActive = !!offer.isActive;

        (offer.productIds || []).forEach((p) => {
          const daysToStart = daysFromNow(offerStart);
          const daysToEnd = daysFromNow(offerEnd);
          list.push({
            _id: p._id,
            name: p.name,
            price: p.price ?? p.mrp ?? null,
            startDate: offerStart,
            endDate: offerEnd,
            startDateFormatted: formatDate(offerStart),
            endDateFormatted: formatDate(offerEnd),
            specialPrice,
            discountPrice,
            discountPercent,
            offerType: offer.offerType ?? type,
            isActive,
            daysToStart, // positive => starts in X days; <=0 => already started
            daysToEnd, // positive => ends in X days; negative => already expired
            rawOfferId: offer._id,
            // keep any other product fields if needed
            ...p,
          });
        });
      });

      setOfferProducts(list);
    } catch (err) {
      console.error('Failed to fetch offer products', err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  // DARK MODE PERSIST
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // SEARCH FILTER (orders)
  const filteredOrders = (orders || []).filter((o) =>
    (o.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.productName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------- Render ----------
  return (
    <div className="min-h-screen w-full bg-white">
      <AdminSidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? 'ml-16' : 'ml-64'
        } ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#FDF7F0] text-gray-900'}`}
      >
        {/* HEADER */}
        <header
          className={`flex h-16 items-center justify-between border-b px-6 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h1 className="text-xl font-semibold">Orders & Offers Management</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`rounded-full p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* OFFER FILTER BUTTONS */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => loadOfferProducts('99_STORE')}
              className={`px-4 py-2 rounded-md ${activeOfferType === '99_STORE' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`}
            >
              99 Store
            </button>

            <button
              onClick={() => loadOfferProducts('LUCKY_DRAW')}
              className={`px-4 py-2 rounded-md ${activeOfferType === 'LUCKY_DRAW' ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white'}`}
            >
              Lucky Draw
            </button>

            <button
              onClick={() => loadOfferProducts('DEAL_OF_DAY')}
              className={`px-4 py-2 rounded-md ${activeOfferType === 'DEAL_OF_DAY' ? 'bg-green-700 text-white' : 'bg-green-600 text-white'}`}
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

          {/* ========== SHOW OFFER PRODUCT CARDS ========== */}
          {activeOfferType && (
            <>
              <h2 className="text-lg font-semibold mb-3">
                {activeOfferType.replace(/_/g, ' ')} — Products
              </h2>

              {offerProducts.length === 0 ? (
                <p className="text-gray-500">No products in this offer.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {offerProducts.map((product) => {
                    const startsIn = product.daysToStart;
                    const endsIn = product.daysToEnd;
                    const hasStarted = startsIn <= 0;
                    const expired = endsIn < 0;

                    // Skip expired products (they should not be shown)
                    if (expired) return null;

                    return (
                      <div key={`${product._id}-${product.rawOfferId}`} className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-md font-bold">{product.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{product.offerType}</p>
                          </div>

                          <div className="text-right">
                            <div className={`text-sm font-semibold ${product.isActive ? 'text-green-600' : 'text-red-600'}`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </div>
                            <div className="text-xs text-gray-400">{product._id}</div>
                          </div>
                        </div>

                        <div className="mt-3 text-sm space-y-1">
                          <div>
                            <span className="font-semibold">Start:</span> {product.startDateFormatted}
                          </div>
                          <div>
                            <span className="font-semibold">End:</span> {product.endDateFormatted}
                          </div>

                          <div>
                            <span className="font-semibold">Special Price:</span>{' '}
                            <span className="text-red-600 font-bold">₹{product.specialPrice ?? '-'}</span>
                          </div>

                          {/* show discount info for deal of the day or if discountPrice provided */}
                          {(product.discountPrice || product.discountPercent) && (
                            <div>
                              <span className="font-semibold">Discount:</span>{' '}
                              {product.discountPrice ? (
                                <span className="text-green-600 font-semibold">₹{product.discountPrice}</span>
                              ) : (
                                <span className="text-green-600 font-semibold">{product.discountPercent}%</span>
                              )}
                            </div>
                          )}

                          <div>
                            <span className="font-semibold">Is Active:</span>{' '}
                            <span>{product.isActive ? 'Yes' : 'No'}</span>
                          </div>

                          <div>
                            <span className="font-semibold">Days to Start:</span>{' '}
                            <span>{startsIn > 0 ? `${startsIn} day(s)` : 'Started'}</span>
                          </div>

                          <div>
                            <span className="font-semibold">Days to End:</span>{' '}
                            <span>{endsIn >= 0 ? `${endsIn} day(s)` : 'Expired'}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            MRP: {product.price ? `₹${product.price}` : '-'}
                          </div>

                          <div>
                            <button
                              disabled={!hasStarted || !product.isActive}
                              className={`px-3 py-1 rounded-full text-white text-sm ${
                                hasStarted && product.isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 cursor-not-allowed'
                              }`}
                            >
                              {hasStarted && product.isActive ? 'Add to Cart' : 'Not Available'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <hr className="my-6" />
            </>
          )}

          {/* ========== ORDERS TABLE (unchanged) ========== */}
          <div className={`rounded-lg shadow overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-4 flex items-center mb-4">
              <Search className="h-5 w-5 mr-2 opacity-70" />

              <input
                type="text"
                placeholder="Search orders..."
                className={`flex-1 p-2 border rounded-md ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Payment', 'Date'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className={darkMode ? 'divide-gray-700 divide-y' : 'divide-gray-200 divide-y'}>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 text-sm">{order.id}</td>
                      <td className="px-6 py-4 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-sm">{order.productName}</td>
                      <td className="px-6 py-4 text-sm">{order.amount}</td>
                      <td className="px-6 py-4 text-sm">{order.status}</td>
                      <td className="px-6 py-4 text-sm">{order.paymentStatus}</td>
                      <td className="px-6 py-4 text-sm">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
