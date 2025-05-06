"use client";

import { supabase } from "../../../lib/supabase-client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { use } from "react";
import { CartContext } from "../../../context/CartContext";

const ProductDetails = ({ params }) => {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const {addToCart} = useContext(CartContext)

  useEffect(() => {
    const getProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error.message);
        setLoading(false);
      } else {
        setProduct(data);
        fetchRelatedProducts(data.category);
      }
    };

    const fetchRelatedProducts = async (category) => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .neq("id", id)
        .limit(6);

      if (error) {
        console.error(error.message);
      } else {
        setRelatedProducts(data);
      }
      setLoading(false);
    };

    getProduct();
  }, [id]);

  const getImageUrl = (path) => {
    return supabase.storage.from("product-images").getPublicUrl(path).data
      .publicUrl;
  };

  if (loading)
    return <div className="text-center text-white py-20">Loading...</div>;

  if (!product)
    return (
      <div className="text-center text-white py-20">Product not found.</div>
    );

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md p-4 flex justify-center items-center">
          <img
            src={getImageUrl(product.image_url)}
            alt={product.name}
            className="w-full max-w-md object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="text-gray-100 space-y-6">
          <h1 className="text-4xl font-bold text-orange-500">{product.name}</h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <div className="text-3xl font-bold text-orange-500">
            #{product.price}
          </div>

          <div className="flex items-center space-x-6 mt-4">
            <button onClick={() => addToCart(product)} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition">
              Add to Cart
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-400 space-y-2">
            <div>
              <span className="font-semibold text-gray-200">Category:</span>{" "}
              {product.category}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          You may also like
        </h2>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 sm:space-x-0 sm:gap-6">
          {relatedProducts.map((related) => (
            <div
              key={related.id}
              className="min-w-[250px] sm:min-w-0 bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex-shrink-0"
            >
              <img
                src={getImageUrl(related.image_url)}
                alt={related.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-100">
                  {related.name}
                </h3>
                <p className="text-sm text-gray-400">#{related.price}</p>
                <Link
                  href={`/products/${related.id}`}
                  className="inline-block mt-2 text-sm text-orange-500 hover:underline"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
