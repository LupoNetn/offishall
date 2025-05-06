"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import {
  MdShoppingCart,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { CartContext } from "../context/CartContext";
import Cart from "./Cart";

const Navbar = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const { toggleCart,showCart,cartItems,totalQuantity } = useContext(CartContext);
  console.log(totalQuantity)
 

  return (
    <>
      <div className="bg-gray-950 relative">
        <nav className="bg-gray-950 text-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="text-xl font-bold text-orange-500 flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDashboard((prev) => !prev)}
                    className="text-gray-500 hover:text-gray-400 transition-colors p-1 -ml-1"
                  >
                    {showDashboard ? (
                      <MdKeyboardArrowUp size={16} />
                    ) : (
                      <MdKeyboardArrowDown size={16} />
                    )}
                  </button>
                  {showDashboard && (
                    <div className="absolute top-8 left-0">
                      <Link
                        href="/Adminproducts"
                        className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded-md hover:bg-gray-800 hover:text-gray-300 transition-all duration-200 flex items-center gap-1 border border-gray-800"
                      >
                        Admin
                      </Link>
                    </div>
                  )}
                </div>
                <Link href="/">Offishall</Link>
              </div>
              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <MdShoppingCart
                    size={24}
                    className="text-orange-500 cursor-pointer"
                  />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalQuantity}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
       {showCart && (
         <div className="">
         <div className="absolute top-10 z-60 lg:right-20 sm:right-10 max-sm:right-0 w-[90%] p-4 container max-w-[500px] border border-white-500 rounded-lg bg-white shadow-lg">
          <Cart />
         </div>
       </div>
       )}
      </div>
    </>
  );
};

export default Navbar;
