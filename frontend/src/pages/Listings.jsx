import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../components/layouts/Tab";
import ListingCard from "../components/Cards/ListingCard";
import ListingDetailModal from "../components/ListingDetailModal";
import useListings from "../hooks/useListings";

export default function Listings() {
  const navigate = useNavigate();
  const { listings, loading, error } = useListings();

  // Modal state
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">📋 لیست آگهی‌ها</h1>
          <button
            onClick={() => navigate("/listings/edit")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            ✏️ ویرایش →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </Tab>

      {/* Detail Modal */}
      <ListingDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listing={selectedListing}
      />
    </>
  );
}