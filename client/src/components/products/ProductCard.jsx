import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 mb-4 rounded"></div>
            <h3 className="font-semibold text-lg">{product?.name || 'Product Name'}</h3>
            <p className="text-gray-600">${product?.price || '0.00'}</p>
            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
