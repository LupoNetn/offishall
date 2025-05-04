import React from 'react'
import Hero from './Hero'
import CategoryCard from './CategoryCard'
import ProductCard from './ProductCard'

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports']

const Home = () => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCard key={index} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
