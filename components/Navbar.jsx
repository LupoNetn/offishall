import Link from 'next/link'
import React from 'react'
import { MdShoppingCart } from 'react-icons/md'

const Navbar = () => {
  return (
   <>
    <nav className="bg-gray-950 text-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-orange-500">
            <Link href="/">Offishall</Link>
          </div>
          <div className="relative">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <MdShoppingCart size={24} className="text-orange-500" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
   </>
  )
}

export default Navbar
