import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../components/layouts/Tab";
import ListingCard from "../components/Cards/ListingCard";
import ListingDetailModal from "../components/ListingDetailModal";
import Drawer from "../components/common/Drawer";
import useListings from "../hooks/useListings";
import FilterSidebar from "../components/filters/FilterSidebar";
import SortDropdown from "../components/common/SortDropdown";
import { Search, Pencil, List, SlidersHorizontal } from "lucide-react";

export default function Listings() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("-score");
  const { listings, loading, error } = useListings(filters);

  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearAllFilters = () => {
    setFilters({});
    setSortBy("-score");
  };

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    handleFilterChange({ ordering: value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  if (loading) {
    return (
      <Tab label="آگهی‌ها">
        <div className="text-center py-8">در حال بارگذاری...</div>
      </Tab>
    );
  }

  if (error) {
    return (
      <Tab label="آگهی‌ها">
        <div className="text-center py-8 text-red-500">خطا: {error}</div>
      </Tab>
    );
  }

  return (
    <>
      <Tab label="آگهی‌ها">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="flex text-xl font-bold text-gray-800">
                لیست آگهی ها
              </h1>
              <div className="flex gap-2 flex-wrap">
                <SortDropdown value={sortBy} onChange={handleSortChange} />

                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <SlidersHorizontal size={18} />
                  <span className="hidden sm:inline">فیلترها</span>
                </button>

                <button
                  onClick={() => navigate("/listings/edit")}
                  className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Pencil size={18} />
                  <span className="hidden sm:inline">ویرایش</span>
                </button>
              </div>
            </div>

            {/* Empty State */}
            {listings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Search
                  className="w-12 h-12 text-gray-400 mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-medium text-gray-700">
                  هیچ آگهی یافت نشد
                </h3>
                <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
                  با فیلترهای انتخاب شده، آگهی‌ای وجود ندارد. لطفاً فیلترهای
                  دیگری را امتحان کنید.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 cursor-pointer text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  حذف همه فیلترها
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Tab>

      {/* Filter Drawer - opens from right on all screen sizes */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
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
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listing={selectedListing}
      />
    </>
  );
}
