'use client'
import React, { useContext } from 'react'
import { FaShoppingCart, FaTrash } from 'react-icons/fa'
import { CartContext } from '../context/CartContext'
import { supabase } from '../lib/supabase-client'
import Link from 'next/link'

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice, toggleCart } = useContext(CartContext)

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div className='flex gap-2 items-center'>
          <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
            <FaShoppingCart />
            Your Cart
          </h2>
          <span className="text-sm text-gray-400">
            ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
        </div>
        <button 
          onClick={toggleCart}
          className="cursor-pointer p-2 hover:bg-gray-800/50 rounded-full transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-400 hover:text-orange-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2 text-lg">🛒 Your cart is empty</div>
          <p className="text-sm text-gray-500">Add some products to get started</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-500/20 scrollbar-track-gray-800/40">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="flex gap-4 bg-white rounded-lg p-3 border border-gray-300 shadow-sm"
              >
                <div className="w-20 h-20 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                  {item.image_url ? (
                    <img 
                      src={supabase.storage
                        .from('product-images')
                        .getPublicUrl(item.image_url)
                        .data.publicUrl
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                      No image
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-700 font-semibold truncate">{item.name}</h3>
                  <div className="flex items-center flex-wrap gap-2 mb-1 text-sm">
                    <p className="text-gray-500">{item.category}</p>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <p className="text-orange-500 font-medium">Qty: {item.quantity || 1}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-800 font-semibold text-sm sm:text-base">
                      #{item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-orange-400 text-base">Subtotal:</span>
              <span className="text-orange-500 font-semibold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Link href="/checkout">
              <button 
                onClick={toggleCart}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
