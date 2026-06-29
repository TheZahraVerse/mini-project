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
import SortDropdown from "../components/common/SortDropdown";
import FilterSidebar from "../components/filters/FilterSidebar";
import StatsDropdown from "../components/common/StatsDropdown";
import ModalManager from "../components/common/ModalManager";
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
  const { handleDelete, handleBulkDelete, handleStatusChange } =
    useListingActions();

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

  const handleEdit = (listing) => console.log("Edit:", listing);
  const handleCall = (listing) => console.log("Register call:", listing);

  // --- Detail Modal ---
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedListing(null);
  };

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
  // ============================================
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
                onEdit={handleEdit}
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

      {/* Detail Modal */}
      <ListingDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        listing={selectedListing}
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
