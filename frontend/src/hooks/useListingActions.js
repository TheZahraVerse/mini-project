// hooks/useListingActions.js
import { useCallback } from "react";
import { listingApi, propertyApi, ownerApi } from "../services/api";
import { toast } from "react-hot-toast";

const useListingActions = (fetchListings, filters) => {
  const handleDelete = useCallback(
    async (id) => {
      try {
        await listingApi.delete(id);
        toast.success("آگهی با موفقیت حذف شد");
        if (fetchListings) await fetchListings(filters);
        return true;
      } catch (err) {
        toast.error(
          err.response?.data?.error || err.message || "خطا در حذف آگهی",
        );
        return false;
      }
    },
    [fetchListings, filters],
  );

  const handleBulkDelete = useCallback(
    async (ids) => {
      if (!ids || ids.length === 0) {
        toast.error("هیچ آیتمی برای حذف انتخاب نشده است");
        return false;
      }
      try {
        await listingApi.bulkDelete(ids);
        toast.success(`${ids.length} آگهی با موفقیت حذف شد`);
        if (fetchListings) await fetchListings(filters);
        return true;
      } catch (err) {
        toast.error(
          err.response?.data?.error || err.message || "خطا در حذف گروهی",
        );
        return false;
      }
    },
    [fetchListings, filters],
  );

  const handleStatusChange = useCallback(
    async (id, newStatus) => {
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
        if (fetchListings) await fetchListings(filters);
        return response.data;
      } catch (err) {
        toast.error(
          err.response?.data?.error || err.message || "خطا در تغییر وضعیت",
        );
        return null;
      }
    },
    [fetchListings, filters],
  );

  const handleEdit = useCallback(
    async ({ propertyId, ownerId, propertyData, ownerData }) => {
      try {
        // 1. Update Property
        if (propertyId && propertyData) {
          const propertyResponse = await propertyApi.update(
            propertyId,
            propertyData,
          );
          console.log("Property updated:", propertyResponse.data);
        }

        // 2. Update Owner
        if (ownerId && ownerData) {
          const ownerResponse = await ownerApi.update(ownerId, ownerData);
          console.log("Owner updated:", ownerResponse.data);
        }

        toast.success("تغییرات با موفقیت ذخیره شد");

        // 3. Refresh listings
        if (fetchListings) {
          await fetchListings(filters);
          console.log("Listings refreshed");
        }

        return true;
      } catch (err) {
        console.error("Save error:", err);
        toast.error(
          err.response?.data?.error || err.message || "خطا در ذخیره تغییرات",
        );
        return false;
      }
    },
    [fetchListings, filters],
  );

  const handleCall = useCallback(
    async (id, callData) => {
      try {
        // TODO: When call API is ready
        // const response = await callApi.create(id, callData);
        toast.success("تماس با موفقیت ثبت شد");
        if (fetchListings) await fetchListings(filters);
        return true;
      } catch (err) {
        toast.error(err.message || "خطا در ثبت تماس");
        return false;
      }
    },
    [fetchListings, filters],
  );

  return {
    handleDelete,
    handleBulkDelete,
    handleStatusChange,
    handleEdit,
    handleCall,
  };
};

export default useListingActions;
