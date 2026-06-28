import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Hook for managing listing filters with URL sync
 * @param {Object} options - Configuration options
 * @param {string} options.defaultSort - Default sort value (default: '-score')
 * @param {boolean} options.syncWithURL - Sync filters with URL (default: true)
 * @returns {Object} Filter state and handlers
 */

const useListingsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const getInitialFilters = () => {
    const filters = {};
    const status = searchParams.get("status");
    const property_status = searchParams.get("property_status");
    const source = searchParams.get("source");
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");
    const min_area = searchParams.get("min_area");
    const max_area = searchParams.get("max_area");
    const min_score = searchParams.get("min_score");
    const max_score = searchParams.get("max_score");
    const ordering = searchParams.get("ordering");
    const rooms = searchParams.get("rooms");

    if (status) filters.status = status.split(",");
    if (property_status) filters.property_status = property_status.split(",");
    if (source) filters.source = source;
    if (min_price) filters.min_price = min_price;
    if (max_price) filters.max_price = max_price;
    if (min_area) filters.min_area = min_area;
    if (max_area) filters.max_area = max_area;
    if (min_score) filters.min_score = min_score;
    if (max_score) filters.max_score = max_score;
    if (ordering) filters.ordering = ordering;
    if (rooms) filters.rooms = rooms;

    return filters;
  };

  const [filters, setFilters] = useState(getInitialFilters);
  const [sortBy, setSortBy] = useState(
    searchParams.get("ordering") || "-score",
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateURL = useCallback(
    (newFilters) => {
      const params = {};

      if (newFilters.status && newFilters.status.length > 0) {
        params.status = newFilters.status.join(",");
      }
      if (newFilters.property_status && newFilters.property_status.length > 0) {
        params.property_status = newFilters.property_status.join(",");
      }
      if (newFilters.source) params.source = newFilters.source;
      if (newFilters.min_price) params.min_price = newFilters.min_price;
      if (newFilters.max_price) params.max_price = newFilters.max_price;
      if (newFilters.min_area) params.min_area = newFilters.min_area;
      if (newFilters.max_area) params.max_area = newFilters.max_area;
      if (newFilters.min_score) params.min_score = newFilters.min_score;
      if (newFilters.max_score) params.max_score = newFilters.max_score;
      if (newFilters.ordering) params.ordering = newFilters.ordering;
      if (newFilters.rooms) params.rooms = newFilters.rooms;

      setSearchParams(params);
    },
    [setSearchParams],
  );

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      return updated;
    });
  }, []);

  // به‌روزرسانی URL فقط بعد از commit شدن تغییرات
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    updateURL(filters);
  }, [filters, updateURL]);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    setFilters((prev) => ({ ...prev, ordering: value }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSortBy("-score");
    setSearchParams({});
  }, [setSearchParams]);

  return {
    filters,
    sortBy,
    isFilterOpen,
    handleFilterChange,
    handleSortChange,
    clearAllFilters,
    setIsFilterOpen,
  };
};

export default useListingsFilters;
