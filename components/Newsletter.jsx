const Newsletter = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8">Subscribe to our newsletter for exclusive deals and updates.</p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-orange-500"
            />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter