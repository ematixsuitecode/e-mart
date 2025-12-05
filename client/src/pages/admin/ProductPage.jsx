'use client'

import React, { useEffect, useState } from 'react'
import {
    Package,
    Edit,
    Trash,
    Plus,
    Search,
    ChevronUp,
    ChevronDown,
    X,
    Check
} from 'lucide-react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import CustomFetch from '../../utils/CustomFetch'

// Categories
const categories = [
    { id: '1', name: 'Furniture' },
    { id: '2', name: 'Electronics' },
    { id: '3', name: 'Raw Material' },
    { id: '4', name: 'Others' }
]

export default function AdminProductsPage() {
    const [collapsed, setCollapsed] = useState(false)
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const [editingProduct, setEditingProduct] = useState(null)

    // ADD PRODUCT STATE
    const initialProductState = {
        name: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        stock: '',
        imageUrl: [],
        isAvailable: true,
        tag: []
    }
    const [newProduct, setNewProduct] = useState(initialProductState)

    // Selection for 99 Store (top controls)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [selectAllChecked, setSelectAllChecked] = useState(false)

    // Offer modals control
    const [offerModalType, setOfferModalType] = useState(null) // "99store"
    const [dealProduct, setDealProduct] = useState(null)
    const [luckyProduct, setLuckyProduct] = useState(null)
    const [offers, setOffers] = useState([]);

    /* ------------------- Fetch products ------------------- */
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await CustomFetch.get('/product')
            // try both shapes
            const payload = res.data?.data ?? res.data
            setProducts(Array.isArray(payload) ? payload : [])
        } catch (error) {
            console.error('Error fetching products', error)
            alert('Error fetching products')
        }
    }

    /* ------------------------- SORTING ------------------------- */
    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

  const fetOffer = async () => {
    try {
        const res = await CustomFetch.get('/offer');
        const list = res.data?.offers || res.data?.data || res.data;

        setOffers(Array.isArray(list) ? list : []);

        console.log("Offers loaded:", list);

    } catch (error) {
        console.error(error);
    }
};

    const productsWithOffers = products.map(prod => {
        const offer = offers.find(o =>
            o.productIds?.some(p => p._id === prod._id)
        );

        return {
            ...prod,
            offerType: offer?.offerType || null,
            offerSpecialPrice: offer?.specialPrice || null,
            offerLuckyPrice: offer?.luckyOffer || null,
            offerDiscountPercent: offer?.discountPercent || null
        };
    });


    useEffect(() => {
        fetOffer();
    }, []);

    const sortedProducts = [...products].sort((a, b) => {
        if (!sortConfig.key) return 0
        let v1 = a[sortConfig.key]
        let v2 = b[sortConfig.key]

        if (typeof v1 === 'string') v1 = v1.toLowerCase()
        if (typeof v2 === 'string') v2 = v2.toLowerCase()

        if (v1 < v2) return sortConfig.direction === 'asc' ? -1 : 1
        if (v1 > v2) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
    })

    /* ------------------------- FILTERS ------------------------- */
    const filteredProducts = productsWithOffers
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((p) => !filterCategory || p.category === filterCategory);


    /* ------------------------- IMAGE UPLOAD ------------------------- */
    const handleImageUpload = (e, stateSetter) => {
        const files = Array.from(e.target.files || [])
        stateSetter((prev) => ({
            ...prev,
            imageUrl: [...(prev.imageUrl || []), ...files].slice(0, 4)
        }))
    }

    const handleRemoveImage = (index, stateSetter) => {
        stateSetter((prev) => ({
            ...prev,
            imageUrl: prev.imageUrl.filter((_, i) => i !== index)
        }))
    }

    /* ------------------------- ADD PRODUCT SUBMIT ------------------------- */
    const handleAddSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            Object.keys(newProduct).forEach((key) => {
                if (key !== 'imageUrl') {
                    const val = newProduct[key]
                    formData.append(key, Array.isArray(val) ? JSON.stringify(val) : val)
                }
            })

                ; (newProduct.imageUrl || []).forEach((file) => {
                    formData.append('images', file)
                })

            await CustomFetch.post('/product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            alert('Product added successfully')
            setIsAddModalOpen(false)
            setNewProduct(initialProductState)
            fetchProducts()
        } catch (error) {
            console.error(error)
            alert('Error adding product')
        }
    }

    /* ------------------------- OPEN EDIT MODAL ------------------------- */
    const openEditModal = (prod) => {
        // make shallow copy and ensure imageUrl as empty array for upload
        setEditingProduct({
            ...prod,
            imageUrl: [] // uploading new images only (existing images should be handled by backend)
        })
        setIsEditModalOpen(true)
    }

    /* ---------------------- EDIT PRODUCT SUBMIT ---------------------- */
    const handleEditSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            Object.keys(editingProduct).forEach((key) => {
                if (key !== 'imageUrl') {
                    const val = editingProduct[key]
                    formData.append(key, Array.isArray(val) ? JSON.stringify(val) : val)
                }
            })

                ; (editingProduct.imageUrl || []).forEach((file) => {
                    formData.append('images', file)
                })

            await CustomFetch.put(`/product/${editingProduct._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            alert('Product updated successfully')
            setIsEditModalOpen(false)
            fetchProducts()
        } catch (error) {
            console.error(error)
            alert('Error updating product')
        }
    }

    /* -------------------- SELECTION HANDLERS -------------------- */
    const toggleSelectProduct = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selectAllChecked) {
            setSelectedProducts([])
            setSelectAllChecked(false)
        } else {
            const ids = filteredProducts.map((p) => p._id)
            setSelectedProducts(ids)
            setSelectAllChecked(true)
        }
    }

    useEffect(() => {
        // if selectedProducts changes and doesn't cover filteredProducts, uncheck selectAll
        const allIds = filteredProducts.map((p) => p._id)
        const allSelected = allIds.length > 0 && allIds.every((id) => selectedProducts.includes(id))
        setSelectAllChecked(allSelected)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts, searchTerm, filterCategory, products])

    /* ----------------------- Offers: 99 Store (multi) ----------------------- */
    const openOfferModalFor99 = () => {
        if (selectedProducts.length === 0) {
            alert('Select at least one product to apply 99 Store offer.')
            return
        }
        setOfferModalType('99store')
    }

    const apply99StoreOffer = async ({ startDate, endDate, specialPrice = 99 }) => {
        try {
            await CustomFetch.post('/offer', {
                offerType: '99_STORE',
                products: selectedProducts,
                specialPrice,
                startDate,
                endDate
            })

            alert('99 Store offer applied to selected products')
            setOfferModalType(null)
            setSelectedProducts([])
            fetchProducts()
        } catch (err) {
            console.error(err)
            alert('Failed to apply 99 Store offer')
        }
    }

    /* ----------------------- Deal of the Day (single) ----------------------- */
    const openDealModal = (product) => setDealProduct(product)

    const applyDeal = async ({ productId, discount, startDate, endDate }) => {
        try {
            await CustomFetch.post('/offer/deal', {
                productId,
                discount,
                startDate,
                endDate
            })
            alert('Deal of the Day applied')
            setDealProduct(null)
            fetchProducts()
        } catch (err) {
            console.error(err)
            alert('Failed to apply Deal of the Day')
        }
    }

    /* ----------------------- Lucky Draw (single) ----------------------- */
    const openLuckyModal = (product) => setLuckyProduct(product)

    const applyLucky = async ({ productId, luckyOffer, luckyCode, maxParticipants, startDate, endDate }) => {
        try {
            await CustomFetch.post('/offer/lucky', {
                productId,
                luckyOffer,
                luckyCode,
                maxParticipants,
                startDate,
                endDate
            })
            alert('Lucky Draw applied')
            setLuckyProduct(null)
            fetchProducts()
        } catch (err) {
            console.error(err)
            alert('Failed to apply Lucky Draw offer')
        }
    }

    /* ----------------------- DELETE PRODUCT (simple) ----------------------- */
    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return
        try {
            await CustomFetch.delete(`/product/${id}`)
            alert('Product deleted')
            fetchProducts()
        } catch (err) {
            console.error(err)
            alert('Failed to delete')
        }
    }

    /* ============================= RENDER ============================= */
    return (
        <div className="min-h-screen w-full bg-gray-50 text-gray-900">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className={`min-h-screen transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
                {/* Header */}
                <header className="flex h-16 items-center justify-between bg-white px-6">
                    <h1 className="text-xl font-semibold text-gray-800">Product Management</h1>
                </header>

                <div className="p-6">
                    {/* SUMMARY CARDS */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="p-4 rounded-xl shadow-sm bg-white flex items-center gap-4">
                            <div className="p-3 rounded-full bg-orange-200">
                                <Package className="text-orange-700" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Total Products</p>
                                <h2 className="text-xl font-semibold">{products.length}</h2>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl shadow-sm bg-white flex items-center gap-4">
                            <div className="p-3 rounded-full bg-yellow-200">
                                <Package className="text-yellow-700" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Low Stock (&lt; 10)</p>
                                <h2 className="text-xl font-semibold">{products.filter((p) => p.stock < 10).length}</h2>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl shadow-sm bg-white flex items-center gap-4">
                            <div className="p-3 rounded-full bg-green-200">
                                <Package className="text-green-700" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">In Stock</p>
                                <h2 className="text-xl font-semibold">{products.filter((p) => p.isAvailable).length}</h2>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl shadow-sm bg-white flex items-center gap-4">
                            <div className="p-3 rounded-full bg-red-200">
                                <Package className="text-red-700" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Out of Stock</p>
                                <h2 className="text-xl font-semibold">{products.filter((p) => !p.isAvailable).length}</h2>
                            </div>
                        </div>
                    </div>

                    {/* SEARCH + FILTERS + ACTIONS */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-3">
                            <div className="flex items-center border border-gray-200 rounded-md bg-white px-3">
                                <Search className="h-5 w-5 text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="p-2 outline-none"
                                />
                            </div>

                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="p-2 border border-gray-200 bg-white rounded-md"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 items-center">
                            {/* 99 STORE BUTTON (multi-select) */}
                            <button
                                disabled={selectedProducts.length === 0}
                                onClick={openOfferModalFor99}
                                className="px-4 py-2 bg-orange-600 text-white rounded-md disabled:opacity-50"
                            >
                                99 Store Offer
                            </button>

                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Product
                            </button>
                        </div>
                    </div>

                    {/* PRODUCT TABLE */}
                    <div className="rounded-lg shadow bg-white overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead className="bg-gray-100">
                                <tr>
                                    {/* Select column */}
                                    <th className="p-3 text-left">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" checked={selectAllChecked} onChange={toggleSelectAll} />
                                        </div>
                                    </th>

                                    {/* Image */}
                                    <th className="p-3 text-left">Image</th>

                                    {/* Name */}
                                    <th className="p-3 text-left">
                                        <div className="flex items-center gap-1">
                                            Name
                                            <ChevronUp
                                                className={`h-4 cursor-pointer ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-400'}`}
                                                onClick={() => handleSort('name')}
                                            />
                                            <ChevronDown
                                                className={`h-4 cursor-pointer -ml-2 ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-400'}`}
                                                onClick={() => handleSort('name')}
                                            />
                                        </div>
                                    </th>

                                    {/* Category */}
                                    <th className="p-3 text-left">
                                        <div className="flex items-center gap-1">
                                            Category
                                            <ChevronUp
                                                className={`h-4 cursor-pointer ${sortConfig.key === 'category' && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-400'}`}
                                                onClick={() => handleSort('category')}
                                            />
                                            <ChevronDown
                                                className={`h-4 cursor-pointer -ml-2 ${sortConfig.key === 'category' && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-400'}`}
                                                onClick={() => handleSort('category')}
                                            />
                                        </div>
                                    </th>

                                    {/* Price */}
                                    <th className="p-3 text-left">
                                        <div className="flex items-center gap-1">
                                            Price
                                            <ChevronUp
                                                className={`h-4 cursor-pointer ${sortConfig.key === 'price' && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-400'}`}
                                                onClick={() => handleSort('price')}
                                            />
                                            <ChevronDown
                                                className={`h-4 cursor-pointer -ml-2 ${sortConfig.key === 'price' && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-400'}`}
                                                onClick={() => handleSort('price')}
                                            />
                                        </div>
                                    </th>

                                    {/* Offer Actions (Deal / Lucky) */}
                                    <th className="p-3 text-left">Offers</th>

                                    {/* Stock */}
                                    <th className="p-3 text-left">
                                        <div className="flex items-center gap-1">
                                            Stock
                                            <ChevronUp
                                                className={`h-4 cursor-pointer ${sortConfig.key === 'stock' && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-400'}`}
                                                onClick={() => handleSort('stock')}
                                            />
                                            <ChevronDown
                                                className={`h-4 cursor-pointer -ml-2 ${sortConfig.key === 'stock' && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-400'}`}
                                                onClick={() => handleSort('stock')}
                                            />
                                        </div>
                                    </th>

                                    {/* Available */}
                                    <th className="p-3 text-left">Available</th>

                                    {/* Offer Type */}
                                    <th className="p-3 text-left">Offer Type</th>

                                    <th className="p-3 text-left">Discount Price</th>


                                    {/* Actions */}
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProducts.map((prod) => (
                                    <tr key={prod._id} className="border-b">
                                        {/* Select */}
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(prod._id)}
                                                onChange={() => toggleSelectProduct(prod._id)}
                                                className="h-4 w-4"
                                            />
                                        </td>

                                        {/* Image */}
                                        <td className="p-3">
                                            <img src={prod.imageUrl?.[0]?.url || '/placeholder.png'} alt={prod.name} className="w-16 h-16 rounded object-cover border" />
                                        </td>

                                        {/* Name */}
                                        <td className="p-3 font-medium">{prod.name}</td>

                                        {/* Category */}
                                        <td className="p-3">{prod.category}</td>

                                        {/* Price */}
                                        <td className="p-3">₹{prod.price}</td>

                                        {/* Offer buttons (per product) */}
                                        <td className="p-3 flex flex-col gap-2">
                                            <button onClick={() => openDealModal(prod)} className="px-3 py-1 bg-green-600 text-white text-xs rounded">
                                                Deal of the Day
                                            </button>

                                            <button onClick={() => openLuckyModal(prod)} className="px-3 py-1 bg-purple-600 text-white text-xs rounded">
                                                Lucky Draw
                                            </button>
                                        </td>

                                        {/* Stock */}
                                        <td className="p-3">{prod.stock}</td>

                                        {/* Available */}
                                        <td className="p-3">
                                            {prod.isAvailable ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">In Stock</span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Out of Stock</span>
                                            )}
                                        </td>

                                        {/* Offer Type - show active offer if any */}
                                        <td className="p-3">
                                            {prod.offerType ? (
                                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">{prod.offerType}</span>
                                            ) : (
                                                <span className="text-gray-400 text-xs">No Offer</span>
                                            )}
                                        </td>

                                        <td className="p-3">
                                            {prod.offerType === "99_STORE" && prod.offerSpecialPrice ? (
                                                <span className="text-orange-700 font-semibold">₹{prod.offerSpecialPrice}</span>
                                            ) : prod.offerType === "DEAL_OF_DAY" && prod.discountPrice ? (
                                                <span className="text-green-700 font-semibold">₹{prod.discountPrice}</span>
                                            ) : prod.offerType === "LUCKY_DRAW" && prod.offerLuckyPrice ? (
                                                <span className="text-purple-700 font-semibold">₹{prod.offerLuckyPrice}</span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>


                                        {/* Actions */}
                                        <td className="p-3 flex gap-3 items-center">
                                            <button onClick={() => openEditModal(prod)} className="text-blue-600 hover:underline"><Edit /></button>
                                            <button onClick={() => handleDelete(prod._id)} className="text-red-600 hover:underline"><Trash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* -------------------- ADD PRODUCT MODAL -------------------- */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
                        <div className="w-full max-w-3xl rounded-lg shadow-xl bg-white overflow-y-auto max-h-[90vh] relative">
                            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
                                <X className="h-6 w-6" />
                            </button>

                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>

                                <form onSubmit={handleAddSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="font-medium text-gray-700">Product Name</label>
                                            <input type="text" name="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" required />
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Category</label>
                                            <select name="category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" required>
                                                <option value="">Select Category</option>
                                                {categories.map((cat) => (<option key={cat.id} value={cat.name}>{cat.name}</option>))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Brand</label>
                                            <input type="text" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" />
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Price (₹)</label>
                                            <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" required />
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Stock</label>
                                            <input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" required />
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Tags</label>
                                            <input type="text" value={newProduct.tag.join(',')} onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value.split(',') })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" placeholder="e.g. premium,fresh,natural" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="font-medium text-gray-700">Description</label>
                                        <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" rows={3} />
                                    </div>

                                    <div>
                                        <label className="font-medium text-gray-700">Product Images (Max 4)</label>
                                        <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e, setNewProduct)} className="mt-2 w-full border border-gray-300 rounded-md p-2" />
                                        <div className="mt-3 flex flex-wrap gap-3">
                                            {(newProduct.imageUrl || []).map((file, idx) => (
                                                <div key={idx} className="relative">
                                                    <img src={URL.createObjectURL(file)} className="w-20 h-20 rounded-md object-cover border border-gray-300" alt="preview" />
                                                    <button type="button" onClick={() => handleRemoveImage(idx, setNewProduct)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" checked={newProduct.isAvailable} onChange={(e) => setNewProduct({ ...newProduct, isAvailable: e.target.checked })} className="h-4 w-4" />
                                        <label className="text-gray-700">Available for Purchase</label>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">Cancel</button>
                                        <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md">Add Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* -------------------- EDIT PRODUCT MODAL -------------------- */}
                {isEditModalOpen && editingProduct && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
                        <div className="w-full max-w-3xl rounded-lg shadow-xl bg-white overflow-y-auto max-h-[90vh] relative">
                            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
                                <X className="h-6 w-6" />
                            </button>

                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Product</h2>

                                <form onSubmit={handleEditSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="font-medium text-gray-700">Product Name</label>
                                            <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" />
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Category</label>
                                            <select value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md">
                                                {categories.map((cat) => (<option key={cat.id} value={cat.name}>{cat.name}</option>))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Brand</label>
                                            <input type="text" value={editingProduct.brand} onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" />
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Price (₹)</label>
                                            <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" />
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Stock</label>
                                            <input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" />
                                        </div>

                                        <div>
                                            <label className="font-medium text-gray-700">Tags</label>
                                            <input type="text" value={editingProduct.tag?.join(',') || ''} onChange={(e) => setEditingProduct({ ...editingProduct, tag: e.target.value.split(',') })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="font-medium text-gray-700">Description</label>
                                        <textarea value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md" rows={3} />
                                    </div>

                                    <div>
                                        <label className="font-medium text-gray-700">Upload New Images (optional)</label>
                                        <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e, setEditingProduct)} className="mt-2 w-full border border-gray-300 rounded-md p-2" />

                                        <div className="mt-3 flex flex-wrap gap-3">
                                            {editingProduct.imageUrl?.map((file, idx) => (
                                                <div key={idx} className="relative">
                                                    <img src={URL.createObjectURL(file)} className="w-20 h-20 rounded-md object-cover border border-gray-300" alt="preview" />
                                                    <button type="button" onClick={() => handleRemoveImage(idx, setEditingProduct)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" checked={editingProduct.isAvailable} onChange={(e) => setEditingProduct({ ...editingProduct, isAvailable: e.target.checked })} className="h-4 w-4" />
                                        <label className="text-gray-700">Available for Purchase</label>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">Cancel</button>
                                        <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- Offer Modals ---------------- */}

                {/* 99 Store Offer Modal (multi-product) */}
                {offerModalType === '99store' && (
                    <OfferApplyModal
                        productIds={selectedProducts}
                        onClose={() => setOfferModalType(null)}
                        onApply={apply99StoreOffer}
                    />
                )}

                {/* Deal of the Day (single product) */}
                {dealProduct && (
                    <DealModal
                        product={dealProduct}
                        onClose={() => setDealProduct(null)}
                        onApply={(payload) => applyDeal(payload)}
                    />
                )}

                {/* Lucky Draw (single product) */}
                {luckyProduct && (
                    <LuckyDrawModal
                        product={luckyProduct}
                        onClose={() => setLuckyProduct(null)}
                        onApply={(payload) => applyLucky(payload)}
                    />
                )}
            </main>
        </div>
    )
}

/* =========================
   OfferApplyModal (99store)
   multi select -> apply
   ========================= */
function OfferApplyModal({ productIds = [], onClose, onApply }) {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [specialPrice, setSpecialPrice] = useState(99)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Apply 99 Store Offer</h2>
                    <button onClick={onClose} className="text-gray-500"><X /></button>
                </div>

                <p className="text-sm text-gray-600 mt-2">{productIds.length} products selected</p>

                <div className="mt-4 space-y-3">
                    <div>
                        <label className="text-sm font-medium">Special Price (₹)</label>
                        <input type="number" value={specialPrice} onChange={(e) => setSpecialPrice(Number(e.target.value))} className="w-full mt-1 border rounded p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button
                        onClick={() => {
                            if (!startDate || !endDate) {
                                alert('Please provide start and end dates')
                                return
                            }
                            onApply({ startDate, endDate, specialPrice })
                        }}
                        className="px-4 py-2 bg-orange-600 text-white rounded"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

/* =========================
   DealModal (single product)
   ========================= */
function DealModal({ product, onClose, onApply }) {
    const [discount, setDiscount] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-green-700">Deal of the Day — {product.name}</h2>
                    <button onClick={onClose} className="text-gray-500"><X /></button>
                </div>

                <div className="mt-4 space-y-3">
                    <div>
                        <label className="text-sm font-medium">Discount (enter percentage or fixed amount)</label>
                        <input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="e.g. 20% or 100" className="w-full mt-1 border rounded p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button
                        onClick={() => {
                            if (!discount || !startDate || !endDate) {
                                alert('Please fill discount and dates')
                                return
                            }
                            onApply({ productId: product._id, discount, startDate, endDate })
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

/* =========================
   LuckyDrawModal (single product)
   ========================= */
function LuckyDrawModal({ product, onClose, onApply }) {
    const [luckyOffer, setLuckyOffer] = useState('')
    const [luckyCode, setLuckyCode] = useState('')
    const [maxParticipants, setMaxParticipants] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-purple-700">Lucky Draw — {product.name}</h2>
                    <button onClick={onClose} className="text-gray-500"><X /></button>
                </div>

                <div className="mt-4 space-y-3">
                    <div>
                        <label className="text-sm font-medium">Special Offer</label>
                        <input value={luckyOffer} onChange={(e) => setLuckyOffer(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Lucky Draw Code</label>
                        <input value={luckyCode} onChange={(e) => setLuckyCode(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Max Participants</label>
                        <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>

                    <div>
                        <label className="text-sm font-medium">End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full mt-1 border rounded p-2" />
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button
                        onClick={() => {
                            if (!luckyOffer || !luckyCode || !maxParticipants || !startDate || !endDate) {
                                alert('Please fill all fields')
                                return
                            }
                            onApply({
                                productId: product._id,
                                luckyOffer,
                                luckyCode,
                                maxParticipants,
                                startDate,
                                endDate
                            })
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}










// 'use client'

// import React, { useEffect, useState } from 'react'
// import { Package, Edit, Trash, Plus, Search, ChevronUp, ChevronDown, X } from 'lucide-react'
// import AdminSidebar from '../../components/admin/AdminSidebar'
// import CustomFetch from '../../utils/CustomFetch'

// // Categories
// const categories = [
//     { id: '1', name: 'Furniture' },
//     { id: '2', name: 'Electronics' },
//     { id: '3', name: 'Raw Material' },
//     { id: '4', name: 'Others' },
// ]

// export default function AdminProductsPage() {

//     const [collapsed, setCollapsed] = useState(false);
//     const [products, setProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterCategory, setFilterCategory] = useState('');
//     const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//     const [editingProduct, setEditingProduct] = useState(null);

//     // ADD PRODUCT STATE
//     const initialProductState = {
//         name: '',
//         description: '',
//         brand: '',
//         category: '',
//         price: '',
//         stock: '',
//         imageUrl: [],
//         isAvailable: true,
//         tag: []
//     };

//     const [newProduct, setNewProduct] = useState(initialProductState);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const res = await CustomFetch.get('/product');
//             setProducts(res.data.data);
//         } catch (error) {
//             alert("Error fetching products");
//         }
//     };

//     /* ------------------------- SORTING ------------------------- */
//     const handleSort = (key) => {
//         let direction = 'asc';
//         if (sortConfig.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc';
//         }
//         setSortConfig({ key, direction });
//     };

//     const sortedProducts = [...products].sort((a, b) => {
//         if (!sortConfig.key) return 0;
//         let v1 = a[sortConfig.key];
//         let v2 = b[sortConfig.key];

//         if (typeof v1 === 'string') v1 = v1.toLowerCase();
//         if (typeof v2 === 'string') v2 = v2.toLowerCase();

//         if (v1 < v2) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (v1 > v2) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//     });

//     /* ------------------------- FILTERS ------------------------- */
//     const filteredProducts = sortedProducts.filter((p) => {
//         return (
//             p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//             (!filterCategory || p.category === filterCategory)
//         );
//     });

//     /* ------------------------- IMAGE UPLOAD ------------------------- */
//     const handleImageUpload = (e, stateSetter) => {
//         const files = Array.from(e.target.files);

//         stateSetter((prev) => ({
//             ...prev,
//             imageUrl: [...prev.imageUrl, ...files].slice(0, 4)
//         }));
//     };

//     const handleRemoveImage = (index, stateSetter) => {
//         stateSetter((prev) => ({
//             ...prev,
//             imageUrl: prev.imageUrl.filter((_, i) => i !== index)
//         }));
//     };

//     /* ------------------------- ADD PRODUCT SUBMIT ------------------------- */
//     const handleAddSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = new FormData();

//             Object.keys(newProduct).forEach((key) => {
//                 if (key !== 'imageUrl') {
//                     formData.append(key, Array.isArray(newProduct[key]) ? JSON.stringify(newProduct[key]) : newProduct[key]);
//                 }
//             });

//             newProduct.imageUrl.forEach((file) => {
//                 formData.append("images", file);
//             });

//             await CustomFetch.post("/product", formData, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             });

//             alert("Product added successfully");
//             setIsAddModalOpen(false);
//             setNewProduct(initialProductState);
//             fetchProducts();

//         } catch (error) {
//             alert("Error adding product");
//         }
//     };

//     /* ------------------------- OPEN EDIT MODAL ------------------------- */
//     const openEditModal = (prod) => {
//         setEditingProduct({
//             ...prod,
//             imageUrl: []
//         });
//         setIsEditModalOpen(true);
//     };

//     /* ---------------------- EDIT PRODUCT SUBMIT ---------------------- */
//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = new FormData();

//             Object.keys(editingProduct).forEach((key) => {
//                 if (key !== 'imageUrl') {
//                     formData.append(key, editingProduct[key]);
//                 }
//             });

//             editingProduct.imageUrl.forEach((file) => {
//                 formData.append("images", file);
//             });

//             await CustomFetch.put(`/product/${editingProduct._id}`, formData);

//             alert("Product updated successfully");
//             setIsEditModalOpen(false);
//             fetchProducts();

//         } catch (error) {
//             alert("Error updating product");
//         }
//     };

//     /* ================================================================
//        UI STARTS HERE
//     ================================================================ */

//     return (
//         <div className="min-h-screen w-full bg-gray-50 text-gray-900">

//             {/* Sidebar */}
//             <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//             <main className={`min-h-screen transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>

//                 {/* Header */}
//                 <header className="flex h-16 items-center justify-between bg-white px-6">
//                     <h1 className="text-xl font-semibold text-gray-800">
//                         Product Management
//                     </h1>
//                 </header>

//                 <div className="p-6">

//                     {/* ----------------- SUMMARY CARDS ----------------- */}
//                     {/* ----------------- SUMMARY CARDS ----------------- */}
//                     <div className="grid grid-cols-4 gap-4 mb-6">

//                         {/* Total Products */}
//                         <div className="p-4 rounded-xl shadow-sm bg-white flex items-center gap-4">
//                             <div className="p-3 rounded-full bg-orange-200">
//                                 <Package className="text-orange-700" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600 text-sm">Total Products</p>
//                                 <h2 className="text-xl font-semibold">{products.length}</h2>
//                             </div>
//                         </div>

//                         {/* Low Stock */}
//                         <div className="p-4 rounded-xl shadow-sm bg-white flex items-center gap-4">
//                             <div className="p-3 rounded-full bg-yellow-200">
//                                 <Package className="text-yellow-700" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600 text-sm">Low Stock (&lt; 10)</p>
//                                 <h2 className="text-xl font-semibold">
//                                     {products.filter(p => p.stock < 10).length}
//                                 </h2>
//                             </div>
//                         </div>

//                         {/* In Stock */}
//                         <div className="p-4 rounded-xl shadow-sm bg-white flex items-center gap-4">
//                             <div className="p-3 rounded-full bg-green-200">
//                                 <Package className="text-green-700" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600 text-sm">In Stock</p>
//                                 <h2 className="text-xl font-semibold">
//                                     {products.filter(p => p.isAvailable).length}
//                                 </h2>
//                             </div>
//                         </div>

//                         {/* Out of Stock */}
//                         <div className="p-4 rounded-xl shadow-sm bg-white flex items-center gap-4">
//                             <div className="p-3 rounded-full bg-red-200">
//                                 <Package className="text-red-700" />
//                             </div>
//                             <div>
//                                 <p className="text-gray-600 text-sm">Out of Stock</p>
//                                 <h2 className="text-xl font-semibold">
//                                     {products.filter(p => !p.isAvailable).length}
//                                 </h2>
//                             </div>
//                         </div>

//                     </div>


//                     {/* SEARCH + FILTERS */}
//                     <div className="flex justify-between items-center mb-4">

//                         <div className="flex gap-3">

//                             <div className="flex items-center border border-gray-200 rounded-md bg-white px-3">
//                                 <Search className="h-5 w-5 text-gray-500 mr-2" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search products..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="p-2 outline-none"
//                                 />
//                             </div>

//                             <select
//                                 value={filterCategory}
//                                 onChange={(e) => setFilterCategory(e.target.value)}
//                                 className="p-2 border border-gray-200 bg-white rounded-md"
//                             >
//                                 <option value="">All Categories</option>
//                                 {categories.map((cat) => (
//                                     <option key={cat.id} value={cat.name}>{cat.name}</option>
//                                 ))}
//                             </select>

//                         </div>

//                         <button
//                             onClick={() => setIsAddModalOpen(true)}
//                             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
//                         >
//                             <Plus className="h-5 w-5 mr-2" /> Add Product
//                         </button>
//                     </div>

//                     {/* PRODUCT TABLE */}
//                     <div className="rounded-lg shadow bg-white overflow-x-auto">

//                         <table className="w-full min-w-max">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     {[
//                                         { key: "image", label: "Image", sortable: false },
//                                         { key: "name", label: "Name", sortable: true },
//                                         { key: "category", label: "Category", sortable: true },
//                                         { key: "price", label: "Price", sortable: true },
//                                         { key: "stock", label: "Stock", sortable: true },
//                                         { key: "isAvailable", label: "Available", sortable: true },
//                                         { key: "actions", label: "Actions", sortable: false }
//                                     ].map((col) => (
//                                         <th key={col.key} className="p-3 text-left text-gray-700 select-none">
//                                             <div className="flex items-center gap-1">
//                                                 {col.label}

//                                                 {col.sortable && (
//                                                     <>
//                                                         <ChevronUp
//                                                             className={`h-4 cursor-pointer ${sortConfig.key === col.key && sortConfig.direction === "asc"
//                                                                     ? "text-black"
//                                                                     : "text-gray-400"
//                                                                 }`}
//                                                             onClick={() => handleSort(col.key)}
//                                                         />
//                                                         <ChevronDown
//                                                             className={`h-4 cursor-pointer -ml-2 ${sortConfig.key === col.key && sortConfig.direction === "desc"
//                                                                     ? "text-black"
//                                                                     : "text-gray-400"
//                                                                 }`}
//                                                             onClick={() => handleSort(col.key)}
//                                                         />
//                                                     </>
//                                                 )}
//                                             </div>
//                                         </th>
//                                     ))}
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {filteredProducts.map((prod) => (
//                                     <tr key={prod._id} className="border-b">

//                                         <td className="p-3">
//                                             <img
//                                                 src={prod.imageUrl?.[0]?.url || "/placeholder.png"}
//                                                 alt={prod.name}
//                                                 className="w-16 h-16 rounded object-cover border"
//                                             />
//                                         </td>

//                                         <td className="p-3 font-medium">{prod.name}</td>
//                                         <td className="p-3">{prod.category}</td>
//                                         <td className="p-3">₹{prod.price}</td>
//                                         <td className="p-3">{prod.stock}</td>

//                                         <td className="p-3">
//                                             <span className={`px-3 py-1 rounded-full text-xs font-semibold ${prod.isAvailable
//                                                     ? "bg-green-100 text-green-800"
//                                                     : "bg-red-100 text-red-800"
//                                                 }`}>
//                                                 {prod.isAvailable ? "In Stock" : "Out of Stock"}
//                                             </span>
//                                         </td>

//                                         <td className="p-3 flex gap-3">
//                                             <button
//                                                 onClick={() => openEditModal(prod)}
//                                                 className="text-blue-600 hover:underline"
//                                             >
//                                                 <Edit />
//                                             </button>
//                                             <button className="text-red-600 hover:underline">
//                                                 <Trash />
//                                             </button>
//                                         </td>

//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                     </div>
//                 </div>

//                 {/* -------------------- ADD PRODUCT MODAL -------------------- */}
//                 {isAddModalOpen && (
//                     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
//                         <div className="w-full max-w-3xl rounded-lg shadow-xl bg-white overflow-y-auto max-h-[90vh] relative">
//                             <button
//                                 onClick={() => setIsAddModalOpen(false)}
//                                 className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
//                             >
//                                 <X className="h-6 w-6" />
//                             </button>

//                             <div className="p-6">
//                                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>

//                                 <form onSubmit={handleAddSubmit} className="space-y-6">

//                                     {/* Two Column */}
//                                     <div className="grid grid-cols-2 gap-6">

//                                         {/* NAME */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Product Name</label>
//                                             <input
//                                                 type="text"
//                                                 name="name"
//                                                 value={newProduct.name}
//                                                 onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                                 required
//                                             />
//                                         </div>

//                                         {/* CATEGORY */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Category</label>
//                                             <select
//                                                 name="category"
//                                                 value={newProduct.category}
//                                                 onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                                 required
//                                             >
//                                                 <option value="">Select Category</option>
//                                                 {categories.map((cat) => (
//                                                     <option key={cat.id} value={cat.name}>{cat.name}</option>
//                                                 ))}
//                                             </select>
//                                         </div>

//                                         {/* BRAND */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Brand</label>
//                                             <input
//                                                 type="text"
//                                                 value={newProduct.brand}
//                                                 onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             />
//                                         </div>

//                                         {/* PRICE */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Price (₹)</label>
//                                             <input
//                                                 type="number"
//                                                 value={newProduct.price}
//                                                 onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                                 required
//                                             />
//                                         </div>

//                                         {/* STOCK */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Stock</label>
//                                             <input
//                                                 type="number"
//                                                 value={newProduct.stock}
//                                                 onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                                 required
//                                             />
//                                         </div>

//                                         {/* TAGS */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Tags</label>
//                                             <input
//                                                 type="text"
//                                                 value={newProduct.tag.join(",")}
//                                                 onChange={(e) =>
//                                                     setNewProduct({ ...newProduct, tag: e.target.value.split(",") })
//                                                 }
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                                 placeholder="e.g. premium,fresh,natural"
//                                             />
//                                         </div>

//                                     </div>

//                                     {/* DESCRIPTION */}
//                                     <div>
//                                         <label className="font-medium text-gray-700">Description</label>
//                                         <textarea
//                                             value={newProduct.description}
//                                             onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                                             className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             rows={3}
//                                         />
//                                     </div>

//                                     {/* IMAGE UPLOAD */}
//                                     <div>
//                                         <label className="font-medium text-gray-700">Product Images (Max 4)</label>
//                                         <input
//                                             type="file"
//                                             multiple
//                                             accept="image/*"
//                                             onChange={(e) => handleImageUpload(e, setNewProduct)}
//                                             className="mt-2 w-full border border-gray-300 rounded-md p-2"
//                                         />

//                                         {/* Preview */}
//                                         <div className="mt-3 flex flex-wrap gap-3">
//                                             {newProduct.imageUrl.map((file, idx) => (
//                                                 <div key={idx} className="relative">
//                                                     <img
//                                                         src={URL.createObjectURL(file)}
//                                                         className="w-20 h-20 rounded-md object-cover border border-gray-300"
//                                                         alt="preview"
//                                                     />
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleRemoveImage(idx, setNewProduct)}
//                                                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                                                     >
//                                                         <X className="h-4 w-4" />
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* AVAILABLE */}
//                                     <div className="flex items-center gap-2">
//                                         <input
//                                             type="checkbox"
//                                             checked={newProduct.isAvailable}
//                                             onChange={(e) =>
//                                                 setNewProduct({ ...newProduct, isAvailable: e.target.checked })
//                                             }
//                                             className="h-4 w-4"
//                                         />
//                                         <label className="text-gray-700">Available for Purchase</label>
//                                     </div>

//                                     {/* BUTTONS */}
//                                     <div className="flex justify-end gap-3">
//                                         <button
//                                             type="button"
//                                             onClick={() => setIsAddModalOpen(false)}
//                                             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
//                                         >
//                                             Cancel
//                                         </button>
//                                         <button
//                                             type="submit"
//                                             className="px-5 py-2 bg-blue-600 text-white rounded-md"
//                                         >
//                                             Add Product
//                                         </button>
//                                     </div>

//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* -------------------- EDIT PRODUCT MODAL -------------------- */}
//                 {isEditModalOpen && editingProduct && (
//                     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
//                         <div className="w-full max-w-3xl rounded-lg shadow-xl bg-white overflow-y-auto max-h-[90vh] relative">

//                             <button
//                                 onClick={() => setIsEditModalOpen(false)}
//                                 className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
//                             >
//                                 <X className="h-6 w-6" />
//                             </button>

//                             <div className="p-6">
//                                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Product</h2>

//                                 <form onSubmit={handleEditSubmit} className="space-y-6">

//                                     <div className="grid grid-cols-2 gap-6">

//                                         {/* NAME */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Product Name</label>
//                                             <input
//                                                 type="text"
//                                                 value={editingProduct.name}
//                                                 onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             />
//                                         </div>

//                                         {/* CATEGORY */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Category</label>
//                                             <select
//                                                 value={editingProduct.category}
//                                                 onChange={(e) =>
//                                                     setEditingProduct({ ...editingProduct, category: e.target.value })
//                                                 }
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             >
//                                                 {categories.map((cat) => (
//                                                     <option key={cat.id} value={cat.name}>{cat.name}</option>
//                                                 ))}
//                                             </select>
//                                         </div>

//                                         {/* BRAND */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Brand</label>
//                                             <input
//                                                 type="text"
//                                                 value={editingProduct.brand}
//                                                 onChange={(e) =>
//                                                     setEditingProduct({ ...editingProduct, brand: e.target.value })
//                                                 }
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             />
//                                         </div>

//                                         {/* PRICE */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Price (₹)</label>
//                                             <input
//                                                 type="number"
//                                                 value={editingProduct.price}
//                                                 onChange={(e) =>
//                                                     setEditingProduct({ ...editingProduct, price: e.target.value })
//                                                 }
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             />
//                                         </div>

//                                         {/* STOCK */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Stock</label>
//                                             <input
//                                                 type="number"
//                                                 value={editingProduct.stock}
//                                                 onChange={(e) =>
//                                                     setEditingProduct({ ...editingProduct, stock: e.target.value })
//                                                 }
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             />
//                                         </div>

//                                         {/* TAGS */}
//                                         <div>
//                                             <label className="font-medium text-gray-700">Tags</label>
//                                             <input
//                                                 type="text"
//                                                 value={editingProduct.tag?.join(",") || ""}
//                                                 onChange={(e) =>
//                                                     setEditingProduct({ ...editingProduct, tag: e.target.value.split(",") })
//                                                 }
//                                                 className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             />
//                                         </div>

//                                     </div>

//                                     {/* DESCRIPTION */}
//                                     <div>
//                                         <label className="font-medium text-gray-700">Description</label>
//                                         <textarea
//                                             value={editingProduct.description}
//                                             onChange={(e) =>
//                                                 setEditingProduct({ ...editingProduct, description: e.target.value })
//                                             }
//                                             className="w-full mt-1 p-2 border bg-white border-gray-300 rounded-md"
//                                             rows={3}
//                                         />
//                                     </div>

//                                     {/* IMAGE UPLOAD */}
//                                     <div>
//                                         <label className="font-medium text-gray-700">Upload New Images (optional)</label>
//                                         <input
//                                             type="file"
//                                             multiple
//                                             accept="image/*"
//                                             onChange={(e) => handleImageUpload(e, setEditingProduct)}
//                                             className="mt-2 w-full border border-gray-300 rounded-md p-2"
//                                         />

//                                         {/* Preview */}
//                                         <div className="mt-3 flex flex-wrap gap-3">
//                                             {editingProduct.imageUrl?.map((file, idx) => (
//                                                 <div key={idx} className="relative">
//                                                     <img
//                                                         src={URL.createObjectURL(file)}
//                                                         className="w-20 h-20 rounded-md object-cover border border-gray-300"
//                                                     />
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleRemoveImage(idx, setEditingProduct)}
//                                                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                                                     >
//                                                         <X className="h-4 w-4" />
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* AVAILABLE */}
//                                     <div className="flex items-center gap-2">
//                                         <input
//                                             type="checkbox"
//                                             checked={editingProduct.isAvailable}
//                                             onChange={(e) =>
//                                                 setEditingProduct({ ...editingProduct, isAvailable: e.target.checked })
//                                             }
//                                             className="h-4 w-4"
//                                         />
//                                         <label className="text-gray-700">Available for Purchase</label>
//                                     </div>

//                                     {/* BUTTONS */}
//                                     <div className="flex justify-end gap-3">
//                                         <button
//                                             type="button"
//                                             onClick={() => setIsEditModalOpen(false)}
//                                             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
//                                         >
//                                             Cancel
//                                         </button>

//                                         <button
//                                             type="submit"
//                                             className="px-5 py-2 bg-blue-600 text-white rounded-md"
//                                         >
//                                             Save Changes
//                                         </button>
//                                     </div>

//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//             </main>
//         </div>
//     );
// }
