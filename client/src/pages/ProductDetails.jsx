// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import allProducts from "../data/products.json";
import { Star, Truck, ShieldCheck, Heart, ShoppingCart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // Flatten all products
  const allItems = Object.keys(allProducts)
    .filter((c) => c !== "filters")
    .flatMap((c) => allProducts[c]);

  useEffect(() => {
    const found = allItems.find((p) => String(p.id) === id);
    setProduct(found);
    if (found) setMainImage(found.image);
  }, [id]);

  if (!product)
    return (
      <div className="text-center p-20 text-gray-500 text-xl">
        Product not found.
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT — IMAGE SECTION */}
          <div>
            <div className="border rounded-lg p-4 bg-gray-100">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {[product.image, ...(product.gallery || [])].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className={`w-20 h-20 border rounded-lg object-contain cursor-pointer 
                    ${
                      mainImage === img ? "border-blue-600" : "border-gray-300"
                    }`}
                  onClick={() => setMainImage(img)}
                  alt=""
                />
              ))}
            </div>

            {/* Add to Cart Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500">
                <ShoppingCart className="inline mr-2" /> ADD TO CART
              </button>
              <button className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600">
                BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT — PRODUCT INFO */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-600 text-white px-2 py-1 text-xs rounded flex items-center gap-1">
                {product.rating} <Star className="w-3 h-3" />
              </span>
              <span className="text-gray-500 text-sm">
                {product.reviews} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price * 84}
              </span>
              <span className="text-gray-500 line-through ml-3">
                ₹{Math.round(product.price * 84 * 1.2)}
              </span>
              <span className="text-green-600 font-bold ml-3">20% off</span>
            </div>

            {/* Available Offers */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Available Offers</h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 10% Instant Discount on HDFC Bank Cards</li>
                <li>• ₹50 off on UPI transactions</li>
                <li>• No Cost EMI Available</li>
              </ul>
            </div>

            {/* Highlights */}
            {product.specs && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Highlights</h2>
                <ul className="text-sm text-gray-700 space-y-1">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key}>
                      • <b>{key.toUpperCase()}:</b> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Delivery */}
            <div className="mt-6 border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Delivery</h3>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck className="w-5 h-5 text-blue-600" />
                Delivery by <b>Tomorrow</b> — Free Delivery
              </div>
            </div>

            {/* Seller */}
            <div className="mt-6 border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Seller</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">Ematix Retail</span>
                <ShieldCheck className="text-green-600 w-5 h-5" />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                100% Original Products
              </p>
            </div>

            {/* Wishlist */}
            <button className="mt-6 flex items-center gap-2 text-gray-600 font-semibold hover:text-rose-500">
              <Heart className="w-5 h-5" /> Add to Wishlist
            </button>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-10 border-t pt-6">
            <h2 className="text-lg font-bold mb-3">Product Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
