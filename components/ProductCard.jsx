

const ProductCard = ({ index }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`/product-${index + 1}.jpg`} 
          alt={`Product ${index + 1}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          New
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Product Name</h3>
        <p className="text-gray-400 text-sm mb-4">Short product description goes here</p>
        <div className="flex items-center justify-between">
          <span className="text-orange-500 font-bold">$99.99</span>
          <button className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded hover:bg-orange-500/20 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard