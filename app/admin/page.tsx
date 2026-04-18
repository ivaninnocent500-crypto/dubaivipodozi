// app/admin/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Button from '@/ui/Button'
import { PlusCircle, Package, Camera, Check, Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Skincare',
    skin_type: 'All',
    description: '',
    imageUrl: '',
    discount: '',
    resultsTags: ''
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `product-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath)

      setFormData({ ...formData, imageUrl: data.publicUrl })
    } catch (error: any) {
      alert('Error uploading image: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const resultsArray = formData.resultsTags.split(',').map(t => t.trim()).filter(Boolean)
    const discountValue = parseFloat(formData.discount)
    const discount = isNaN(discountValue) ? null : discountValue

    const { error } = await supabase.from('products').insert([
      {
        name: formData.name,
        brand: formData.brand,
        price: parseFloat(formData.price),
        category: formData.category,
        skin_type: formData.skin_type,
        description: formData.description,
        images: [formData.imageUrl],
        in_stock: true,
        discount: discount,
        results: resultsArray
      }
    ])

    setLoading(false)
    if (!error) {
      setSuccess(true)
      setFormData({ name: '', brand: '', price: '', category: 'Skincare', skin_type: 'All', description: '', imageUrl: '', discount: '', resultsTags: '' })
      setTimeout(() => setSuccess(false), 3000)
    } else {
      alert('Error adding product: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl text-gray-900 uppercase tracking-widest">GDS Inventory</h1>
          <Package className="text-gray-300" size={32} />
        </div>

        <div className="bg-white shadow-sm border border-gray-100 p-8 rounded-sm">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-3 block">
                Product Visual
              </label>
              <div className="relative group border-2 border-dashed border-gray-200 hover:border-accent transition-colors p-8 text-center rounded-sm">
                {formData.imageUrl ? (
                  <div className="space-y-4">
                    <img src={formData.imageUrl} alt="Preview" className="h-48 mx-auto object-cover rounded-sm" />
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, imageUrl: ''})}
                      className="text-xs text-red-500 underline"
                    >
                      Remove and change
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-3">
                    {uploading ? <Loader2 className="animate-spin text-accent" /> : <Camera className="text-gray-300 group-hover:text-accent transition-colors" size={40} />}
                    <span className="text-sm text-gray-500 italic">
                      {uploading ? 'Processing in Cloud...' : 'Click to upload high-res product photo'}
                    </span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Name</label>
              <input required className="w-full p-3 border border-gray-100 outline-none focus:border-accent" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Brand</label>
              <input required className="w-full p-3 border border-gray-100 outline-none focus:border-accent" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Price (USD)</label>
              <input required type="number" step="0.01" className="w-full p-3 border border-gray-100 outline-none focus:border-accent" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Discount (%)</label>
              <input type="number" step="0.01" className="w-full p-3 border border-gray-100 outline-none focus:border-accent" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Category</label>
              <select className="w-full p-3 border border-gray-100 bg-white outline-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option>Skincare</option>
                <option>Fragrance</option>
                <option>Body Care</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Skin Type</label>
              <select className="w-full p-3 border border-gray-100 bg-white outline-none" value={formData.skin_type} onChange={(e) => setFormData({...formData, skin_type: e.target.value})}>
                <option>All</option>
                <option>Oily</option>
                <option>Dry</option>
                <option>Combination</option>
                <option>Sensitive</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Results Tags (comma separated)</label>
              <input className="w-full p-3 border border-gray-100 outline-none focus:border-accent" placeholder="flat-tummy, body-shaping, skin-glow" value={formData.resultsTags} onChange={(e) => setFormData({...formData, resultsTags: e.target.value})} />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Description</label>
              <textarea rows={3} className="w-full p-3 border border-gray-100 outline-none focus:border-accent" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="md:col-span-2 pt-6">
              <Button type="submit" className="w-full py-4 uppercase tracking-widest text-xs" disabled={loading || uploading || !formData.imageUrl}>
                {loading ? 'Syncing with Collection...' : success ? 'Success' : 'Upload to Dubai Vipodozi'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}