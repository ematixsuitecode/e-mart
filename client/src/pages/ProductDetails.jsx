import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import allProducts from "../data/products.json";
import { Star, Truck, ShieldCheck, Heart, ShoppingCart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // 🔹 Flatten all nested categories
  const flattenProducts = () => {
    const list = [];

    Object.keys(allProducts).forEach((cat) => {
      if (cat === "filters") return;

      const subcats = allProducts[cat];

      Object.values(subcats).forEach((arr) => {
        arr.forEach((item) => list.push(item));
      });
    });

    return list;
  };

  useEffect(() => {
    const items = flattenProducts();
    const found = items.find((p) => String(p.id) === String(id));

    setProduct(found || null);
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
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* --------------------------------------------------------------------
              LEFT SIDE — PRODUCT IMAGES
          -------------------------------------------------------------------- */}
          <div>
            <div className="relative border rounded-2xl p-4 bg-gray-100 shadow-sm">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-96 object-contain"
              />

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                20% OFF
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {[product.image, ...(product.gallery || [])].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 rounded-lg border cursor-pointer object-cover ${
                    mainImage === img
                      ? "border-blue-600 shadow-lg"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500">
                <ShoppingCart className="inline mr-2" /> Add to Cart
              </button>

              <button className="flex-1 bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700">
                Buy Now
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------------------
              RIGHT SIDE — PRODUCT DETAILS
          -------------------------------------------------------------------- */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                {product.rating} <Star className="w-3 h-3" />
              </span>
              <span className="text-gray-500 text-sm">
                {product.reviews} reviews
              </span>
            </div>

            {/* Price Section */}
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{Math.round(product.price * 84)}
              </span>
              <span className="line-through text-gray-500 ml-3">
                ₹{Math.round(product.price * 84 * 1.2)}
              </span>
              <span className="text-green-600 font-semibold ml-3">20% off</span>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="border p-4 rounded-xl shadow-sm bg-blue-50 flex items-center gap-3">
                <Truck className="text-blue-700 w-6 h-6" />
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-sm text-gray-600">Tomorrow by 9 PM</p>
                </div>
              </div>

              <div className="border p-4 rounded-xl shadow-sm bg-green-50 flex items-center gap-3">
                <ShieldCheck className="text-green-700 w-6 h-6" />
                <div>
                  <p className="font-semibold">1 Year Warranty</p>
                  <p className="text-sm text-gray-600">
                    Official warranty included
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {product.specs && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Specifications</h2>

                <div className="grid grid-cols-2 gap-y-3 text-gray-800">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b pb-2"
                    >
                      <span className="font-medium capitalize">
                        {key.replace("_", " ")}
                      </span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist */}
            <button className="mt-6 flex items-center gap-2 text-gray-600 font-semibold hover:text-rose-500">
              <Heart className="w-5 h-5" /> Add to Wishlist
            </button>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-bold mb-3">Product Description</h2>
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
