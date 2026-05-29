import { useState, useEffect } from 'react'
import { listingApi } from '../services/api'

const useListings = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response = await listingApi.getAll()
      setListings(response.data)
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to fetch listings')
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  return { listings, loading, error, refetch: fetchListings }
}

export default useListings