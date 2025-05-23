"use client";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import { supabase } from "../lib/supabase-client";
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-gray-900 rounded-lg overflow-hidden group w-full max-w-xs mx-auto sm:max-w-full">
        <div className="relative h-35 sm:h-48 max-sm:h-30 overflow-hidden">
          {product.image_url ? (
            <img
              src={
                supabase.storage
                  .from("product-images")
                  .getPublicUrl(product.image_url).data.publicUrl
              }
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            New
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-100 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex max-sm:flex-col max-sm:items-start items-center justify-between">
            <span className="text-orange-500 font-bold">#{product.price}</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded hover:bg-orange-500/20 transition-colors text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
