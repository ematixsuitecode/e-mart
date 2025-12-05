'use client'

import React, { useEffect, useState } from 'react'
import { User, Lock, Settings, Bell, CreditCard, Globe, ShieldCheck, Sun, Moon, Save } from 'lucide-react'
import AdminSidebar from '../../components/admin/AdminSidebar'

// Simulated admin data
const initialAdminData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Super Admin',
    avatar: '/placeholder.svg?height=100&width=100',
    contact: '+1 (555) 123-4567',
    whatsapp: '+1 (555) 987-6543',
    address: '123 Admin Street, Nutville, NUT 12345'
}

export default function AdminSettingsPage() {
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage for dark mode preference
        return localStorage.getItem('darkMode') === 'true';
    });
    const [collapsed, setCollapsed] = useState(false)
    const [adminData, setAdminData] = useState(initialAdminData)
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
    const [generalSettings, setGeneralSettings] = useState({
        siteTitle: 'Nutty E-commerce Dashboard',
        allowRegistrations: true,
        maintenanceMode: false,
        defaultCurrency: 'USD',
        taxRate: 10,
        shippingThreshold: 50
    })
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        orderUpdates: true,
        stockAlerts: true,
        newsletterSubscription: false
    })
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: false,
        loginNotifications: true,
        passwordExpiryDays: 90
    })
    const [apiSettings, setApiSettings] = useState({
        apiKey: 'sk_test_1234567890abcdefghijklmnop',
        webhookUrl: 'https://api.nuttyecommerce.com/webhook'
    })

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

    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setAdminData(prev => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswords(prev => ({ ...prev, [name]: value }))
    }

    const handleGeneralSettingsChange = (e) => {
        const { name, value, type, checked } = e.target
        setGeneralSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleMutualToggle = (fieldName) => {
        setSecuritySettings((prevSettings) => {
            if (fieldName === 'allowLogin') {
                return {
                    ...prevSettings,
                    allowLogin: true,
                    maintenanceMode: false,
                };
            } else if (fieldName === 'maintenanceMode') {
                return {
                    ...prevSettings,
                    allowLogin: false,
                    maintenanceMode: true,
                };
            }
            return prevSettings;
        });
    };


    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAdminData(prev => ({ ...prev, avatar: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log('Submitting updated admin data:', adminData)
        console.log('Submitting updated passwords:', passwords)
        console.log('Submitting updated general settings:', generalSettings)
        console.log('Submitting updated notification settings:', notificationSettings)
        console.log('Submitting updated security settings:', securitySettings)
        console.log('Submitting updated API settings:', apiSettings)
        // Reset password fields after submission
        setPasswords({ current: '', new: '', confirm: '' })
    }

    return (
        <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#FDF7F0] text-gray-900'}`}>
            <AdminSidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className={`min-h-screen transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
                {/* Header */}
                <header className={`flex h-16 items-center justify-between border-b px-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Settings</h1>
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
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Settings */}
                        <section className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <User className="mr-2" /> Profile Settings
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={adminData.name}
                                        onChange={handleProfileChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={adminData.email}
                                        onChange={handleProfileChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact" className="block text-sm font-medium mb-1">Contact Number</label>
                                    <input
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        value={adminData.contact}
                                        onChange={handleProfileChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="whatsapp" className="block text-sm font-medium mb-1">WhatsApp Number</label>
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        value={adminData.whatsapp}
                                        onChange={handleProfileChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={adminData.address}
                                        onChange={handleProfileChange}
                                        rows={3}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        value={adminData.role}
                                        readOnly
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="avatar" className="block text-sm font-medium mb-1">Avatar</label>
                                    <div className="flex items-center space-x-4">
                                        <img src={adminData.avatar} alt="Admin Avatar" className="w-16 h-16 rounded-full object-cover" />
                                        <input
                                            type="file"
                                            id="avatar"
                                            name="avatar"
                                            onChange={handleAvatarChange}
                                            accept="image/*"
                                            className={`${darkMode ? 'text-white' : 'text-gray-900'} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${darkMode ? 'file:bg-gray-700 file:text-white' : 'file:bg-gray-200 file:text-gray-700'} hover:file:bg-gray-600`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                    

                        {/* General Settings */}
                        <section className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <Settings className="mr-2" /> General Settings
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="site-title" className="block text-sm font-medium mb-1">Site Title</label>
                                    <input
                                        type="text"
                                        id="site-title"
                                        name="siteTitle"
                                        value={generalSettings.siteTitle}
                                        onChange={handleGeneralSettingsChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="default-currency" className="block text-sm font-medium mb-1">Default Currency</label>
                                    <select
                                        id="default-currency"
                                        name="defaultCurrency"
                                        value={generalSettings.defaultCurrency}
                                        onChange={handleGeneralSettingsChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="tax-rate" className="block text-sm font-medium mb-1">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        id="tax-rate"
                                        name="taxRate"
                                        value={generalSettings.taxRate}
                                        onChange={handleGeneralSettingsChange}
                                        min="0"
                                        max="100"
                                        step="0.1"
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="shipping-threshold" className="block text-sm font-medium mb-1">Free Shipping Threshold</label>
                                    <input
                                        type="number"
                                        id="shipping-threshold"
                                        name="shippingThreshold"
                                        value={generalSettings.shippingThreshold}
                                        onChange={handleGeneralSettingsChange}
                                        min="0"
                                        step="0.01"
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="allow-registrations"
                                        name="allowRegistrations"
                                        checked={generalSettings.allowRegistrations}
                                        onChange={handleGeneralSettingsChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="allow-registrations" className="text-sm font-medium">Allow New User Registrations</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="maintenance-mode"
                                        name="maintenanceMode"
                                        checked={generalSettings.maintenanceMode}
                                        onChange={handleGeneralSettingsChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="maintenance-mode" className="text-sm font-medium">Enable Maintenance Mode</label>
                                </div>
                            </div>
                        </section>

                    

                        {/* Security Settings */}
                        <section className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <ShieldCheck className="mr-2" /> Security Settings
                            </h2>
                            <div className="space-y-6">
                                {/* Allow Users to Login */}
                                <div className="flex items-center justify-between">
                                    <label htmlFor="allow-login" className="text-sm font-medium">
                                        Allow Users to Login
                                    </label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id="allow-login"
                                            name="allowLogin"
                                            checked={securitySettings.allowLogin}
                                            onChange={() => handleMutualToggle('allowLogin')}
                                            className="sr-only peer"
                                        />
                                        <div className={`w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-500 after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                                    </label>
                                </div>

                                {/* Maintenance Mode */}
                                <div className="flex items-center justify-between">
                                    <label htmlFor="maintenance-mode" className="text-sm font-medium">
                                        Maintenance Mode
                                    </label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id="maintenance-mode"
                                            name="maintenanceMode"
                                            checked={securitySettings.maintenanceMode}
                                            onChange={() => handleMutualToggle('maintenanceMode')}
                                            className="sr-only peer"
                                        />
                                        <div className={`w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-red-500 peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-500 after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                                    </label>
                                </div>
                            </div>
                        </section>


                        {/* Password Change */}
                        <section className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <Lock className="mr-2" /> Change Password
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="current-password" className="block text-sm font-medium mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        id="current-password"
                                        name="current"
                                        value={passwords.current}
                                        onChange={handlePasswordChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="new-password" className="block text-sm font-medium mb-1">New Password</label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        name="new"
                                        value={passwords.new}
                                        onChange={handlePasswordChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        name="confirm"
                                        value={passwords.confirm}
                                        onChange={handlePasswordChange}
                                        className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                </div>
                            </div>
                        </section>

                    

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                            >
                                <Save className="mr-2" />
                                Save All Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}