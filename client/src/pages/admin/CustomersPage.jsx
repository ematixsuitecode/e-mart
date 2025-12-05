'use client'

import React, { useEffect, useState } from 'react'
import { Package, Edit, Trash, Plus, Search, ChevronDown, ChevronUp, Sun, Moon, MoreHorizontal } from 'lucide-react'
import AdminSidebar from '../../components/admin/AdminSidebar'


// Simulated customer data
const initialCustomers = [
    { id: '001', name: 'Alice Johnson', email: 'alice@example.com', orders: 5, totalSpent: 250, lastOrder: '2023-11-15' },
    { id: '002', name: 'Bob Smith', email: 'bob@example.com', orders: 3, totalSpent: 150, lastOrder: '2023-11-10' },
    { id: '003', name: 'Charlie Brown', email: 'charlie@example.com', orders: 8, totalSpent: 400, lastOrder: '2023-11-18' },
    { id: '004', name: 'Diana Prince', email: 'diana@example.com', orders: 2, totalSpent: 100, lastOrder: '2023-11-05' },
    { id: '005', name: 'Ethan Hunt', email: 'ethan@example.com', orders: 6, totalSpent: 300, lastOrder: '2023-11-20' },
]

export default function AdminCustomerPage() {
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage for dark mode preference
        return localStorage.getItem('darkMode') === 'true';
    });
    const [collapsed, setCollapsed] = useState(false)
    const [customers, setCustomers] = useState(initialCustomers)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

    useEffect(() => {
        // Update localStorage whenever darkMode changes
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const requestSort = (key) => {
        let direction = 'ascending'
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const sortedCustomers = React.useMemo(() => {
        let sortableCustomers = [...filteredCustomers]
        if (sortConfig.key !== null) {
            sortableCustomers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortableCustomers
    }, [filteredCustomers, sortConfig])

    const getSortIcon = (name) => {
        if (sortConfig.key === name) {
            return sortConfig.direction === 'ascending' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
        }
        return <ChevronDown className="h-4 w-4 opacity-0 group-hover:opacity-100" />
    }

    return (
        <div className="min-h-screen w-full bg-white">
            <AdminSidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className={`min-h-screen transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#FDF7F0] text-gray-900'}`}>
                {/* Header */}
                <header className={`flex h-16 items-center justify-between border-b px-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Customer Management</h1>
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
                    </div>
                </header>
                {/* Main content */}
                <div className="p-6">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="flex items-center">
                            <Search className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                className={`p-2 border rounded-md ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    <div className={`rounded-lg shadow overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                                    <tr>
                                        {['Name', 'Email', 'Orders', 'Total Spent', 'Last Order', 'Actions'].map((header) => (
                                            <th
                                                key={header}
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer group ${darkMode ? 'text-gray-300' : 'text-gray-500'
                                                    }`}
                                                onClick={() => header !== 'Actions' && requestSort(header.toLowerCase().replace(' ', ''))}
                                            >
                                                <div className="flex items-center">
                                                    {header}
                                                    {header !== 'Actions' && getSortIcon(header.toLowerCase().replace(' ', ''))}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                    {sortedCustomers.map((customer) => (
                                        <tr key={customer.id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{customer.name}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{customer.email}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{customer.orders}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>${customer.totalSpent.toFixed(2)}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{customer.lastOrder}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    onClick={() => console.log(`Edit customer ${customer.id}`)}
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => console.log(`Delete customer ${customer.id}`)}
                                                >
                                                    <Trash className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}