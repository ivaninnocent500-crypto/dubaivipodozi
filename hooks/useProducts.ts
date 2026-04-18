// hooks/useProducts.ts
import { useEffect, useState } from 'react'
import { fetchProducts } from '@/lib/supabase/products'
import { Product } from '@/types'

export function useProducts(pollingInterval = 60000) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, pollingInterval)
    return () => clearInterval(interval)
  }, [pollingInterval])

  return { products, loading, error, refetch: fetchData }
}