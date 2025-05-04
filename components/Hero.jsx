import { MdArrowForward } from 'react-icons/md'

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 to-transparent z-10" />
      <div 
        className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-500 mb-4">
          Discover Amazing Products
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl">
          Shop the latest trends and find incredible deals on our most popular items. Quality products at amazing prices.
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 group">
          Shop Now
          <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  )
}

export default Hero