'use client'
import React, { useState, useEffect } from 'react'
import { MdAdd, MdEdit, MdDelete, MdClose } from 'react-icons/md'
import { supabase } from '../../../lib/supabase-client'  // Updated import path
import { toast } from 'sonner'

const Page = () => {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null
  })

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
      setProducts(data)
    } catch (error) {
      toast.error('Error fetching products', {
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let image_url = null
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError, data } = await supabase.storage
          .from('product-images')
          .upload(fileName, formData.image)

        if (uploadError) throw uploadError
        image_url = data.path
      }

      const { error } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          description: formData.description,
          image_url
        }])

      if (error) throw error

      setFormData({
        name: '',
        price: '',
        category: '',
        description: '',
        image: null
      })
      setShowForm(false)
      fetchProducts()

      toast.success('Product added successfully')
    } catch (error) {
      toast.error('Error adding product', {
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      fetchProducts()
      toast.success('Product deleted successfully')
    } catch (error) {
      toast.error('Error deleting product', {
        description: error.message
      })
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-500">Product Management</h1>
          <p className="text-sm sm:text-base text-gray-400 mt-2">Manage and organize your product catalog</p>
        </div>

        <div className="max-w-7xl mx-auto bg-gray-900/50 rounded-xl border border-gray-800">
          <div className="p-4 sm:p-6 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-orange-500">Products</h2>
                <p className="text-xs sm:text-sm text-gray-400">Manage inventory</p>
              </div>
              <button 
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200"
              >
                <MdAdd size={20} />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-950/50">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-4 px-4 sm:px-6">Product</th>
                  <th className="hidden sm:table-cell text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-4 px-4 sm:px-6">Category</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-4 px-4 sm:px-6">Price</th>
                  <th className="hidden lg:table-cell text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-4 px-4 sm:px-6">Description</th>
                  <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider py-4 px-4 sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700">
                          {product.image_url ? (
                            <img src={`${supabase.storage.from('product-images').getPublicUrl(product.image_url).publicURL}`} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gray-400">No img</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-100">{product.name}</h3>
                          <p className="text-xs text-orange-500">ID: #{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-4 px-4 sm:px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span className="text-orange-500 font-medium">${product.price}</span>
                    </td>
                    <td className="hidden lg:table-cell py-4 px-4 sm:px-6">
                      <p className="text-gray-400 text-sm truncate max-w-xs">{product.description}</p>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-gray-400 hover:text-orange-500 transition-colors p-1">
                          <MdEdit size={20} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-orange-500">Add New Product</h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 placeholder-gray-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                  <input 
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 placeholder-gray-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 placeholder-gray-500"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea 
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 placeholder-gray-500"
                  placeholder="Enter product description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Product Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-orange-500 hover:text-orange-400">
                        <span>Upload a file</span>
                        <input 
                          id="file-upload" 
                          name="image" 
                          type="file" 
                          accept="image/*"
                          onChange={handleChange}
                          className="sr-only" 
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-800">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
