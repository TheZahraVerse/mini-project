import React , {useState} from "react";
import Tab from "../components/layouts/Tab";
import ListingCard from "../components/Cards/ListingCard";
import ListingDetailModal from "../components/ListingDetailModal";
import useListings from "../hooks/useListings";

export default function Listings() {
  // manage listings
  const { listings, loading, error } = useListings();


  // State for modal
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (listing) => {
    console.log("Clicked:", listing);
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };


  // loading mode
  if (loading) {
    return (
      <Tab label="آگهی‌ها">
        <div className="text-center py-8">در حال بارگذاری...</div>
      </Tab>
    );
  }

  // error mode
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
        {listings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">هیچ آگهی یافت نشد.</div>
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
      </Tab>
      
      <ListingDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listing={selectedListing}
      />
    </>
  );
}
