import { useState, useEffect, useRef } from "react";
import { listingApi } from "../services/api";

const useListings = (filters = {}) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimer = useRef(null);

  const fetchListings = async () => {
     console.log("Fetching with filters:", filters);
    try {
      setIsFetching(true);
      const response = await listingApi.getAll(filters);
      console.log("API response:", response.data);
      setListings(response.data.results || response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch listings");
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered. filters changed:", filters);
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer
    debounceTimer.current = setTimeout(() => {
      fetchListings();
    }, 300); // 300ms delay
    
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [
    JSON.stringify(filters.status),
    JSON.stringify(filters.property_status),
    filters.source,
    filters.min_score,
    filters.max_score,
    filters.min_price,
    filters.max_price,
    filters.min_area,
    filters.max_area,
    filters.rooms,
    filters.ordering,
  ]);

  return { listings, loading, isFetching, error };
};

export default useListings;