'use client'
import React, { useState, useEffect } from 'react'
import Hero from './Hero'
import CategoryCard from './CategoryCard'
import ProductCard from './ProductCard'
import { supabase } from '../lib/supabase-client'
import { toast } from 'sonner'

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports']

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    fetchProducts()
  }, [])
  
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
  
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      toast.error('Error fetching products', {
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Hero />

      {/* Featured Categories */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-orange-500 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-orange-500 mb-8">Featured Products</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-400">No products found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
