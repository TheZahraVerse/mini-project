import { useState, useCallback } from "react";

/**
 * Hook for managing delete confirmation modal
 * @returns {Object} Delete modal state and handlers
 */
const useDeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const openForSingle = useCallback((item) => {
    setTarget({ type: "single", id: item.id });
    setIsOpen(true);
  }, []);

  const openForBulk = useCallback((ids) => {
    if (!ids || ids.length === 0) return;
    setTarget({ type: "bulk", ids: [...ids] });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTarget(null);
  }, []);

  const getMessage = useCallback(() => {
    if (target?.type === "bulk") {
      return `آیا از حذف ${target.ids.length} آیتم انتخاب شده مطمئن هستید؟`;
    }
    return "آیا از حذف این آیتم مطمئن هستید؟";
  }, [target]);

  const getTitle = useCallback(() => {
    if (target?.type === "bulk") {
      return "حذف گروهی";
    }
    return "تأیید حذف";
  }, [target]);

  const isSingle = useCallback(() => target?.type === "single", [target]);
  const isBulk = useCallback(() => target?.type === "bulk", [target]);

  return {
    isOpen,
    target,
    openForSingle,
    openForBulk,
    close,
    getMessage,
    getTitle,
    isSingle,
    isBulk,
  };
};

export default useDeleteModal;