import { useCallback } from "react";
import { listingApi } from "../services/api";

const useListingActions = (onSuccess, onError) => {
  // single delete
  const handleDelete = useCallback(
    async (id) => {
      try {
        await listingApi.delete(id);
        onSuccess?.("آگهی با موفقیت حذف شد");
        return true;
      } catch (err) {
        onError?.(err.response?.data?.error || err.message || "خطا در حذف آگهی");
        return false;
      }
    },
    [onSuccess, onError]
  );

  // group delete
  const handleBulkDelete = useCallback(
    async (ids) => {
      if (!ids || ids.length === 0) {
        onError?.("هیچ آیتمی برای حذف انتخاب نشده است");
        return false;
      }

      try {
        const response = await listingApi.bulkDelete(ids);
        onSuccess?.(response.data?.message || `${ids.length} آگهی با موفقیت حذف شد`);
        return true;
      } catch (err) {
        onError?.(err.response?.data?.error || err.message || "خطا در حذف گروهی");
        return false;
      }
    },
    [onSuccess, onError]
  );

  // update and edit
  const handleEdit = useCallback(
    async (id, data) => {
      try {
        const response = await listingApi.update(id, data);
        onSuccess?.("آگهی با موفقیت ویرایش شد");
        return response.data;
      } catch (err) {
        onError?.(err.response?.data?.error || err.message || "خطا در ویرایش آگهی");
        return null;
      }
    },
    [onSuccess, onError]
  );

  // change status
  const handleStatusChange = useCallback(
    async (id, newStatus) => {
      try {
        const response = await listingApi.update(id, { status: newStatus });
        onSuccess?.(`وضعیت آگهی به "${newStatus}" تغییر یافت`);
        return response.data;
      } catch (err) {
        onError?.(err.response?.data?.error || err.message || "خطا در تغییر وضعیت");
        return null;
      }
    },
    [onSuccess, onError]
  );

  // record a call (placeholder)
  const handleCall = useCallback(
    async (id, callData) => {
      try {
        // TODO: Whenever the call api is ready
        // const response = await callApi.create(id, callData);
        onSuccess?.("تماس با موفقیت ثبت شد");
        return true;
      } catch (err) {
        onError?.(err.message || "خطا در ثبت تماس");
        return false;
      }
    },
    [onSuccess, onError]
  );

  return {
    handleDelete,
    handleBulkDelete,
    handleEdit,
    handleStatusChange,
    handleCall,
  };
};

export default useListingActions;