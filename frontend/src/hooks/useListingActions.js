import { useCallback } from "react";
import { listingApi } from "../services/api";
import { toast } from "react-hot-toast";

const useListingActions = () => {
  const handleDelete = useCallback(async (id) => {
    try {
      await listingApi.delete(id);
      toast.success("آگهی با موفقیت حذف شد");
      return true;
    } catch (err) {
      toast.error(
        err.response?.data?.error || err.message || "خطا در حذف آگهی",
      );
      return false;
    }
  }, []);

  const handleBulkDelete = useCallback(async (ids) => {
    if (!ids || ids.length === 0) {
      toast.error("هیچ آیتمی برای حذف انتخاب نشده است");
      return false;
    }
    try {
      const response = await listingApi.bulkDelete(ids);
      toast.success(`${ids.length} آگهی با موفقیت حذف شد`);
      return true;
    } catch (err) {
      toast.error(
        err.response?.data?.error || err.message || "خطا در حذف گروهی",
      );
      return false;
    }
  }, []);

  const handleStatusChange = useCallback(async (id, newStatus) => {
    try {
      const response = await listingApi.update(id, { status: newStatus });
      const statusMap = {
        reviewed: "بررسی شده",
        contacted: "تماس گرفته شده",
        converted: "تبدیل شده",
        rejected: "رد شده",
      };
      toast.success(
        `وضعیت آگهی به "${statusMap[newStatus] || newStatus}" تغییر یافت`,
      );
      return response.data;
    } catch (err) {
      toast.error(
        err.response?.data?.error || err.message || "خطا در تغییر وضعیت",
      );
      return null;
    }
  }, []);

  const handleEdit = useCallback(async (id, data) => {
    try {
      const response = await listingApi.update(id, data);
      toast.success("آگهی با موفقیت ویرایش شد");
      return response.data;
    } catch (err) {
      toast.error(
        err.response?.data?.error || err.message || "خطا در ویرایش آگهی",
      );
      return null;
    }
  }, []);

  const handleCall = useCallback(async (id, callData) => {
    try {
      // TODO: وقتی که API تماس آماده شد
      // const response = await callApi.create(id, callData);
      toast.success("تماس با موفقیت ثبت شد");
      return true;
    } catch (err) {
      toast.error(err.message || "خطا در ثبت تماس");
      return false;
    }
  }, []);

  return {
    handleDelete,
    handleBulkDelete,
    handleStatusChange,
    handleEdit,
    handleCall,
  };
};

export default useListingActions;
