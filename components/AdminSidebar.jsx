'use client'
import React, { useState } from 'react'
import { MdInventory, MdShoppingCart, MdAnalytics, MdMenu, MdClose } from 'react-icons/md'

const icons = [
    {icon: <MdInventory size={24} />, name: 'Products'},
    // {icon: <MdShoppingCart size={24} />, name: 'Orders'},
    // {icon: <MdAnalytics size={24} />, name: 'Analytics'},
]

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [navId, setNavId] = useState(0)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-2 right-15 z-50 sm:hidden bg-gray-900 p-2 rounded-lg border border-gray-800 shadow-lg hover:bg-gray-800 transition-all duration-200"
      >
        {isOpen ? <MdClose size={24} className="text-orange-500" /> : <MdMenu size={24} className="text-orange-500" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm sm:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`
        fixed sm:relative inset-y-0 left-0 w-64 sm:w-auto 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0
        transition-transform duration-300 ease-in-out
        bg-gray-900 h-full z-40
      `}>
        <div className='flex flex-col p-4 h-full'>
          {/* Header */}
          <div className='mb-8'>
            <h2 className='text-xl font-bold text-orange-500 flex items-center gap-2'>
              <span className="bg-orange-500/10 p-2 rounded-lg">
                <MdInventory size={24} className="text-orange-500" />
              </span>
              Dashboard
            </h2>
          </div>

          {/* Navigation Items */}
          <div className='flex flex-col space-y-2'>
            {icons.map((item, index) => (
              <div 
                key={index}
                onClick={() => setNavId(index)}
                className={`
                  flex items-center gap-3 p-3 
                  rounded-lg cursor-pointer transition-all duration-200
                  group relative overflow-hidden
                  ${navId === index 
                    ? 'bg-orange-500/10 text-orange-500' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-orange-500'}
                `}
              >
                {/* Background Hover Effect - Only show for inactive items */}
                {navId !== index && (
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                )}
                
                {/* Icon */}
                <span className={`
                  relative transition-transform duration-200
                  ${navId === index 
                    ? 'text-orange-500 scale-110' 
                    : 'text-orange-400 group-hover:scale-110'}
                `}>
                  {item.icon}
                </span>

                {/* Text */}
                <span className={`
                  relative text-sm font-medium transition-all duration-200
                  ${navId === index 
                    ? 'translate-x-1' 
                    : 'group-hover:translate-x-1'}
                `}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default AdminSidebar
