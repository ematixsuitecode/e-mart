import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, LayoutDashboard, ShoppingCart, Package, Gift, Store, Users, Settings, LogOut, Moon, Sun, Tag } from 'lucide-react'

export default function AdminSidebar({ darkMode, toggleDarkMode, collapsed, setCollapsed }) {
    const location = useLocation()

    const navItems = [
        { icon: LayoutDashboard, text: 'Dashboard', path: '/admin' },
        { icon: ShoppingCart, text: 'Orders', path: '/admin/orders' },
        { icon: Package, text: 'Products', path: '/admin/products' },
        { icon: Gift, text: 'Gift Hampers', path: '/gift-hampers' },
        { icon: Store, text: 'Stores', path: '/stores' },
        { icon: Users, text: 'Customers', path: '/admin/customers' },
        { icon:Tag , text: 'Offer', path: '/admin/offer'},
    ]

    const isActive = (path) => location.pathname === path

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-full transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'
                    } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
                <div className={`flex h-16 items-center justify-between border-b px-4 ${darkMode ? 'border-gray-700' : ''}`}>
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <Box className="h-6 w-6 text-orange-500" />
                            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-orange-500'}`}>NUTTY ADMIN</span>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`rounded-lg p-1.5 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <Box className={`h-5 w-5 ${darkMode ? 'text-gray-300' : ''}`} />
                    </button>
                </div>
                <nav className="p-2">
                    <div className="space-y-1">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${isActive(item.path)
                                        ? `bg-orange-50 text-orange-500 ${darkMode ? 'bg-opacity-10' : ''}`
                                        : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'}`
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {!collapsed && <span>{item.text}</span>}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 space-y-1">
                        <Link
                            to="/admin/settings"
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                                }`}
                        >
                            <Settings className="h-5 w-5" />
                            {!collapsed && <span>Settings</span>}
                        </Link>
                        <button
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                                }`}
                        >
                            <LogOut className="h-5 w-5" />
                            {!collapsed && <span>Logout</span>}
                        </button>
                    </div>
                </nav>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
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
                </div>
            </aside>

            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity lg:hidden ${!collapsed ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                onClick={() => setCollapsed(true)}
            />
        </>
    )
}