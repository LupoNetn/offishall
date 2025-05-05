import React from 'react'
import Link from 'next/link'
import { MdPhone, MdMail, MdLocationOn } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Offishall</h3>
            <p className="text-sm mb-4">Your one-stop shop for quality products at amazing prices.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MdPhone className="text-orange-500" />
                <span>+234 904 487 2119</span>
              </div>
              <div className="flex items-center gap-2">
                <MdMail className="text-orange-500" />
                <span>contact@offishall.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-orange-500" />
                <span>Lagos & ife</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-500 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/electronics" className="hover:text-orange-500 transition-colors">Electronics</Link>
              </li>
              <li>
                <Link href="/category/fashion" className="hover:text-orange-500 transition-colors">Fashion</Link>
              </li>
              <li>
                <Link href="/category/home" className="hover:text-orange-500 transition-colors">Home & Living</Link>
              </li>
              <li>
                <Link href="/category/sports" className="hover:text-orange-500 transition-colors">Sports</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Offishall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer