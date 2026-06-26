import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useTransition,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardView from "../components/common/CardView";
import ListingDetailModal from "../components/ListingDetailModal";
import Drawer from "../components/common/Drawer";
import Button from "../components/common/Button";
import SortDropdown from "../components/common/SortDropdown";
import FilterSidebar from "../components/filters/FilterSidebar";
import StatsDropdown from "../components/common/StatsDropdown";
import useListingsData from "../hooks/useListingsData";
import useListingsFilters from "../hooks/useListingsFilters";
import { renderListingCard } from "../helpers/renderers";
import {
  Search,
  SlidersHorizontal,
  List,
  CheckCircle,
  PhoneCall,
  RefreshCw,
  XCircle,
  Loader2,
} from "lucide-react";

export default function ListingsShow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

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

  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  const handleNavigate = (path) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const handleOpenFilter = useCallback(() => {
    setIsFilterOpen(true);
  }, [setIsFilterOpen]);

  const handleCloseFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, [setIsFilterOpen]);

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

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              📋 لیست آگهی‌ها
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
                icon={<List size={18} />}
                onClick={() =>
                  handleNavigate(`/listings/action?${searchParams.toString()}`)
                }
                disabled={isPending}
                className={isPending ? "opacity-60" : ""}
              >
                عملیات
              </Button>
            </div>
          </div>

          <div
            className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}
          >
            {memoizedListings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Search
                  className="w-12 h-12 text-gray-400 mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-medium text-gray-700">
                  هیچ آگهی یافت نشد
                </h3>
                <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
                  با فیلترهای انتخاب شده، آگهی‌ای وجود ندارد.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                >
                  حذف همه فیلترها
                </button>
              </div>
            ) : (
              <CardView
                items={memoizedListings}
                renderItem={(listing) =>
                  renderListingCard(listing, handleViewDetails)
                }
                cols={4}
              />
            )}
          </div>
        </div>
      </div>

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

      <ListingDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listing={selectedListing}
      />
    </>
  );
}
