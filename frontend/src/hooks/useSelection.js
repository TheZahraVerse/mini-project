import { useState, useCallback } from "react";

/**
 * Hook for managing selection of items in a list
 * @param {Array} items - List of items with 'id' property
 * @returns {Object} Selection state and handlers
 */
const useSelection = (items = []) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.length === items.length ? [] : items.map((item) => item.id)
    );
  }, [items]);

  const handleSelectOne = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const clearSelection = useCallback(() => setSelectedIds([]), []);
  const isSelected = useCallback((id) => selectedIds.includes(id), [selectedIds]);

  return {
    selectedIds,
    handleSelectAll,
    handleSelectOne,
    clearSelection,
    isSelected,
    isAllSelected: items.length > 0 && selectedIds.length === items.length,
    hasSelection: selectedIds.length > 0,
    selectionCount: selectedIds.length,
  };
};

export default useSelection;