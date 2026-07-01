// ListingsAction.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useTransition,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

// Components
import ListingTable from "../components/listings/ListingTable";
import ListingDetailModal from "../components/listings/ListingDetailModal";
import Drawer from "../components/common/Drawer";
import Button from "../components/common/Button";
import SortDropdown from "../components/common/dropdown/SortDropdown";
import FilterSidebar from "../components/filters/FilterSidebar";
import StatsDropdown from "../components/common/dropdown/StatsDropdown";
import ModalManager from "../components/common/modal/ModalManager";
import EmptyState from "../components/common/EmptyState";

// Hooks
import useListingsData from "../hooks/useListingsData";
import useListingsFilters from "../hooks/useListingsFilters";
import useListingActions from "../hooks/useListingActions";
import useSelection from "../hooks/useSelection";
import useModal from "../hooks/useModal";

// Icons
import {
  SlidersHorizontal,
  LayoutGrid,
  CheckCircle,
  PhoneCall,
  RefreshCw,
  XCircle,
  Loader2,
  Trash2,
} from "lucide-react";

export default function ListingsAction() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // --- Data & Filters ---
  const {
    filters,
    sortBy,
    isFilterOpen,
    setIsFilterOpen,
    handleFilterChange,
    handleSortChange,
    clearAllFilters,
  } = useListingsFilters();

  const { listings, loading, error, fetchListings } = useListingsData();

  useEffect(() => {
    fetchListings(filters);
  }, [filters, fetchListings]);

  const memoizedListings = useMemo(() => listings, [listings]);

  // --- Selection ---
  const {
    selectedIds,
    handleSelectAll,
    handleSelectOne,
    clearSelection,
    isAllSelected,
    hasSelection,
    selectionCount,
  } = useSelection(memoizedListings);

  // --- Modal ---
  const modal = useModal();

  // --- Actions ---
  const { handleDelete, handleBulkDelete, handleStatusChange, handleEdit } =
    useListingActions(fetchListings, filters);

  // ============================================
  // Delete Handlers
  // ============================================
  const openDeleteModal = (listing) => {
    modal.open("delete", { type: "single", id: listing.id });
  };

  const openBulkDeleteModal = () => {
    if (selectedIds.length === 0) return;
    modal.open("delete", { type: "bulk", ids: [...selectedIds] });
  };

  // ============================================
  // Status Change Handler
  // ============================================
  const openStatusChangeModal = (listing, newStatus) => {
    modal.open("status_change", { listing, newStatus });
  };

  // ============================================
  // Modal Confirm Handler
  // ============================================
  const handleModalConfirm = async () => {
    const { type, data } = modal;

    if (type === "delete") {
      let success = false;
      if (data?.type === "single") {
        success = await handleDelete(data.id);
      } else if (data?.type === "bulk") {
        success = await handleBulkDelete(data.ids);
      }
      if (success) {
        clearSelection();
        fetchListings(filters);
        modal.close();
      }
      return success;
    }

    if (type === "status_change") {
      const { listing, newStatus } = data;
      if (listing && newStatus) {
        const result = await handleStatusChange(listing.id, newStatus);
        if (result) {
          fetchListings(filters);
          modal.close();
          return result;
        }
      }
      return false;
    }

    return false;
  };

  // --- Navigation ---
  const handleNavigate = (path) => {
    startTransition(() => {
      navigate(path);
    });
  };

  // --- Handlers ---
  const handleOpenFilter = useCallback(
    () => setIsFilterOpen(true),
    [setIsFilterOpen],
  );
  const handleCloseFilter = useCallback(
    () => setIsFilterOpen(false),
    [setIsFilterOpen],
  );

  const handleCall = (listing) => console.log("Register call:", listing);

  // Detail Modal
  // ============================================
  const [selectedListing, setSelectedListing] = useState(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
    setIsShowModalOpen(true);
  };

  const handleCloseShowModal = () => {
    setIsShowModalOpen(false);
    setSelectedListing(null);
  };

  const handleEditClick = (listing) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedListing(null);
  };

  // Update selected listing when listings change
  useEffect(() => {
    if (selectedListing && (isShowModalOpen || isEditModalOpen)) {
      const updated = listings.find((l) => l.id === selectedListing.id);
      if (updated) {
        setSelectedListing(updated);
      }
    }
  }, [listings, selectedListing?.id, isShowModalOpen, isEditModalOpen]);

  // Wrapper for handleEdit with update logic
  const handleEditWrapper = useCallback(
    async (data) => {
      const result = await handleEdit(data);
      if (result && selectedListing) {
        const updated = listings.find((l) => l.id === selectedListing.id);
        if (updated) {
          setSelectedListing(updated);
        } else {
          const updatedListing = {
            ...selectedListing,
            property: {
              ...selectedListing.property,
              status: data.propertyData?.status || selectedListing.property?.status,
              owner: {
                ...selectedListing.property?.owner,
                notes: data.ownerData?.notes || selectedListing.property?.owner?.notes,
              },
            },
          };
          setSelectedListing(updatedListing);
        }
      }
      return result;
    },
    [handleEdit, selectedListing, listings],
  );

  const handleUpdateListing = useCallback((updatedListing) => {
    setSelectedListing(updatedListing);
  }, []);

  // --- Loading / Error ---
  if (loading && memoizedListings.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">خطا: {error}</div>;
  }

  // Render
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              ✏️ عملیات روی آگهی‌ها
              <StatsDropdown
                items={memoizedListings}
                groupBy="status"
                labelMap={{
                  reviewed: "بررسی شده",
                  contacted: "تماس گرفته شده",
                  converted: "تبدیل شده",
                  rejected: "رد شده",
                }}
                colorMap={{
                  reviewed: "text-yellow-600",
                  contacted: "text-blue-600",
                  converted: "text-green-600",
                  rejected: "text-red-600",
                }}
                iconMap={{
                  reviewed: CheckCircle,
                  contacted: PhoneCall,
                  converted: RefreshCw,
                  rejected: XCircle,
                }}
                showTotal={true}
                totalLabel="کل آگهی‌ها"
              />
            </h1>

            <div className="flex gap-2 flex-wrap items-center">
              {isPending && (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}

              {hasSelection && (
                <Button
                  variant="danger"
                  size="sm"
                  icon={<Trash2 size={16} />}
                  onClick={openBulkDeleteModal}
                >
                  حذف گروهی ({selectionCount})
                </Button>
              )}

              <SortDropdown value={sortBy} onChange={handleSortChange} />

              <Button
                variant="filter"
                size="md"
                icon={<SlidersHorizontal size={18} />}
                onClick={handleOpenFilter}
              >
                <span className="hidden sm:inline">فیلترها</span>
              </Button>

              <Button
                variant="primary"
                size="md"
                icon={<LayoutGrid size={18} />}
                onClick={() =>
                  handleNavigate(`/listings/show?${searchParams.toString()}`)
                }
                disabled={isPending}
                className={isPending ? "opacity-60" : ""}
              >
                نمایش
              </Button>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}
          >
            {memoizedListings.length === 0 ? (
              <EmptyState
                title="هیچ آگهی یافت نشد"
                message="با فیلترهای انتخاب شده، آگهی‌ای وجود ندارد."
                actionText="حذف همه فیلترها"
                onAction={clearAllFilters}
              />
            ) : (
              <ListingTable
                listings={memoizedListings}
                onViewDetails={handleViewDetails}
                onEdit={handleEditClick}
                onDelete={openDeleteModal}
                onStatusChange={openStatusChangeModal}
                onCall={handleCall}
                selectedIds={selectedIds}
                onSelectOne={handleSelectOne}
                onSelectAll={handleSelectAll}
                isAllSelected={isAllSelected}
              />
            )}
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        position="right"
      >
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearAllFilters}
        />
      </Drawer>

      {/* Detail Modal - Show  */}
      <ListingDetailModal.Show
        isOpen={isShowModalOpen}
        onClose={handleCloseShowModal}
        listing={selectedListing}
      />

      {/* Detail Modal - Edit */}
      <ListingDetailModal.Edit
        key={selectedListing?.id || "edit-modal"}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        listing={selectedListing}
        onSave={handleEditWrapper}
        onUpdate={handleUpdateListing}
      />

      {/* Modal Manager (Delete + Status Change) */}
      <ModalManager
        modal={modal}
        onClose={modal.close}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}