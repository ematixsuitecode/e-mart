'use client';

import React, { useEffect, useState, useRef } from 'react';

const OfferProductCard = ({ product, onClick }) => {
  if (!product) return null;

  const images = product.imageUrl || []
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  const nextImg = () => {
    if (images.length > 1) setIndex(prev => (prev + 1) % images.length)
  }
  const prevImg = () => {
    if (images.length > 1) setIndex(prev => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (images.length > 1) intervalRef.current = setInterval(nextImg, 3000)
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length])

  const pauseAutoScroll = () => clearInterval(intervalRef.current)
  const resumeAutoScroll = () => (intervalRef.current = setInterval(nextImg, 3000))

  // offer may be attached directly (product.offer) or via product.offer field
  const offer = product.offer ?? null
  const offerTypeLabel = offer?.offerType ? offer.offerType.replace(/_/g, ' ') : null

  // compute displayed price
  const originalPrice = Number(product.price ?? 0)
  const specialPrice = offer?.specialPrice ? Number(offer.specialPrice) : null

  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-gray-300 rounded-xl bg-white 
                 shadow-sm hover:shadow-md transition-all duration-300 group relative p-1"
      style={{
        border: '1px solid #ddd',
        boxShadow: 'inset 0 0 0 1px #f1f1f1'
      }}
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
    >
      {/* IMAGE SLIDER */}
      <div className="w-full h-52 bg-gray-100 overflow-hidden rounded-lg relative">
        {/* Offer badge on top-left */}
        {offerTypeLabel && (
          <div className="absolute top-2 left-2 z-20 px-2 py-1 rounded text-xs font-semibold text-white"
               style={{ background: offer.offerType === '99_STORE' ? '#1E40AF' : offer.offerType === 'DEAL_OF_DAY' ? '#059669' : '#7C3AED' }}>
            {offerTypeLabel}
          </div>
        )}

        <div className="flex h-full transition-transform duration-700 ease-in-out"
             style={{
               width: `${images.length * 100}%`,
               transform: `translateX(-${index * (100 / Math.max(images.length, 1))}%)`
             }}>
          {images.length > 0 ? images.map((img, i) => (
            <img key={i} src={img.url} alt={product.name} className="w-full h-full object-contain flex-shrink-0" style={{ width: `${100 / Math.max(images.length, 1)}%` }} />
          )) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prevImg() }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow z-20 text-sm">❮</button>
            <button onClick={(e) => { e.stopPropagation(); nextImg() }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow z-20 text-sm">❯</button>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
          {product.brand}
        </p>

        <div className="mt-2">
          {specialPrice != null && specialPrice > 0 ? (
            <>
              <p className="text-xs line-through text-gray-500">₹{originalPrice.toLocaleString()}</p>
              <p className="text-lg font-bold text-green-700">₹{specialPrice.toLocaleString()}</p>
            </>
          ) : (
            <p className="text-lg font-bold text-blue-700">₹{originalPrice.toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default OfferProductCard
