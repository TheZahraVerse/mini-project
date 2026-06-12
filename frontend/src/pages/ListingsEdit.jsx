import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../components/layouts/Tab";
import ListingRow from "../components/ListingRow";
import ListingDetailModal from "../components/ListingDetailModal";
import useListings from "../hooks/useListings";

export default function ListingsEdit() {
  const navigate = useNavigate();
  const { listings, loading, error } = useListings();

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
          <h1 className="text-xl font-bold text-gray-800">✏️ ویرایش آگهی‌ها</h1>
          <button
            onClick={() => navigate("/listings")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            ← بازگشت به نمایش
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-right p-3">#</th>
                  <th className="text-right p-3">امتیاز</th>
                  <th className="text-right p-3">عنوان ملک</th>
                  <th className="text-right p-3">آدرس</th>
                  <th className="text-right p-3">قیمت</th>
                  <th className="text-right p-3">وضعیت</th>
                  <th className="text-right p-3">تاریخ ثبت</th>
                  <th className="text-right p-3">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <ListingRow
                    key={listing.id}
                    listing={listing}
                    index={index}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Tab>

      <ListingDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listing={selectedListing}
      />
    </>
  );
}