import { useState, useCallback } from "react";
import { listingApi } from "../services/api";

const useListingsData = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const response = await listingApi.getAll(filters);
      setListings(response.data.results || response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  }, []);

  return { listings, loading, error, fetchListings };
};

export default useListingsData;