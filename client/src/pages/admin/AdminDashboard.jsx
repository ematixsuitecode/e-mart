'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { BarChart3, Box, Gift, Home, LayoutDashboard, LogOut, Package, Settings, ShoppingCart, Store, Users, Moon, Sun } from 'lucide-react'
import AdminSidebar from '../../components/admin/AdminSidebar'

export default function AdminDashboard() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        // Add or remove the 'dark' class based on the darkMode state
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Update localStorage whenever darkMode changes
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <>
            <Helmet>
                <title>Admin - Nutty Nuts</title>
            </Helmet>

            <div className={`min-h-screen w-full ${darkMode ? 'dark bg-gray-900' : 'bg-[#FDF7F0]'}`}>
                {/* Sidebar */}
                <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} darkMode={darkMode} />

                {/* Main Content */}
                <main className={`min-h-screen transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
                    {/* Header */}
                    <header className={`flex h-16 items-center justify-between border-b px-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                        }`}>
                        <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : ''}`}>Dashboard Overview</h1>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className={`rounded-full p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                {darkMode ? (
                                    <Sun className="h-5 w-5 text-yellow-500" />
                                ) : (
                                    <Moon className="h-5 w-5 text-gray-600" />
                                )}
                            </button>
                            <button
                                className={`rounded-full p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                                aria-label="Home"
                            >
                                <Home className={`h-5 w-5 ${darkMode ? 'text-gray-300' : ''}`} />
                            </button>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <div className="p-6">
                        {/* Stats Cards */}
                        <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { icon: Store, color: 'purple', label: 'Total Stores', value: '150+' },
                                { icon: Package, color: 'orange', label: 'Products', value: '4,000+' },
                                { icon: ShoppingCart, color: 'green', label: 'Total Orders', value: '2,450' },
                                { icon: Users, color: 'blue', label: 'Customers', value: '12,345' },
                            ].map((stat, index) => (
                                <div key={index} className={`rounded-xl p-6 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`rounded-full bg-${stat.color}-100 p-3 ${darkMode ? 'bg-opacity-10' : ''}`}>
                                            <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                                            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : ''}`}>{stat.value}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts Section */}
                        <div className="mb-6 grid gap-6 lg:grid-cols-2">
                            <div className={`rounded-xl p-6 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className={`font-semibold ${darkMode ? 'text-white' : ''}`}>Revenue Overview</h4>
                                    <select
                                        className={`rounded-lg border px-3 py-1 text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-gray-300'
                                            }`}
                                        aria-label="Select time range"
                                    >
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>Last 90 days</option>
                                    </select>
                                </div>
                                <div className="h-[300px] w-full">
                                    <BarChart3 className={`h-full w-full ${darkMode ? 'text-gray-700' : 'text-gray-200'}`} />
                                </div>
                            </div>
                            <div className={`rounded-xl p-6 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className={`font-semibold ${darkMode ? 'text-white' : ''}`}>Popular Products</h4>
                                    <select
                                        className={`rounded-lg border px-3 py-1 text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-gray-300'
                                            }`}
                                        aria-label="Select time range"
                                    >
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>Last 90 days</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Khudri Dates with Cashew', price: '473.94 INR', sold: '+2,500 sold' },
                                        { name: 'Premium Gift Hamper', price: '1,999.00 INR', sold: '+1,800 sold' },
                                        { name: 'Muneeli Dates with Cashew', price: '828.93 INR', sold: '+1,200 sold' },
                                    ].map((product, index) => (
                                        <div key={index} className={`flex items-center justify-between border-b pb-4 ${darkMode ? 'border-gray-700' : ''
                                            }`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                                                <div>
                                                    <p className={`font-medium ${darkMode ? 'text-white' : ''}`}>{product.name}</p>
                                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{product.price}</p>
                                                </div>
                                            </div>
                                            <p className="text-green-600">{product.sold}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className={`rounded-xl p-6 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className="mb-4 flex items-center justify-between">
                                <h4 className={`font-semibold ${darkMode ? 'text-white' : ''}`}>Recent Orders</h4>
                                <button className="text-sm text-orange-500 hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className={`border-b text-left ${darkMode ? 'border-gray-700' : ''}`}>
                                            <th className={`pb-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>Order ID</th>
                                            <th className={`pb-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>Customer</th>
                                            <th className={`pb-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>Product</th>
                                            <th className={`pb-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>Amount</th>
                                            <th className={`pb-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>Status</th>
                                            <th className={`pb-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {[
                                            { id: '#ORD-001', customer: 'John Doe', product: 'Premium Gift Hamper', amount: '1,999.00 INR', status: 'Delivered', date: '2024-02-15' },
                                            { id: '#ORD-002', customer: 'Jane Smith', product: 'Khudri Dates Pack', amount: '473.94 INR', status: 'Processing', date: '2024-02-15' },
                                            { id: '#ORD-003', customer: 'Mike Johnson', product: 'Mixed Nuts Bundle', amount: '899.00 INR', status: 'Shipped', date: '2024-02-14' },
                                        ].map((order, index) => (
                                            <tr key={index} className={`border-b ${darkMode ? 'border-gray-700' : ''}`}>
                                                <td className={`py-4 ${darkMode ? 'text-gray-300' : ''}`}>{order.id}</td>
                                                <td className={`py-4 ${darkMode ? 'text-gray-300' : ''}`}>{order.customer}</td>
                                                <td className={`py-4 ${darkMode ? 'text-gray-300' : ''}`}>{order.product}</td>
                                                <td className={`py-4 ${darkMode ? 'text-gray-300' : ''}`}>{order.amount}</td>
                                                <td className="py-4">
                                                    <span className={`rounded-full px-2 py-1 text-xs ${order.status === 'Delivered'
                                                        ? 'bg-green-100 text-green-600'
                                                        : order.status === 'Processing'
                                                            ? 'bg-yellow-100 text-yellow-600'
                                                            : 'bg-blue-100 text-blue-600'
                                                        } ${darkMode ? 'bg-opacity-10' : ''}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className={`py-4 ${darkMode ? 'text-gray-300' : ''}`}>{order.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}