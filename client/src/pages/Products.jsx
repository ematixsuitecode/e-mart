import React from 'react';
import ProductCard from '../components/products/ProductCard';

const Products = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder for product list */}
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
};

export default Products;
