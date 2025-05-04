const CategoryCard = ({ category, index }) => {
  return (
    <div className="relative overflow-hidden group cursor-pointer">
      <div className="h-64 bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src={`/category-${index + 1}.jpg`} 
          alt={category}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
          <p className="text-gray-300 text-sm">Shop Now →</p>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard