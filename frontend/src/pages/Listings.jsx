import React from "react";
import Tab from "../components/layouts/Tab";
import ListingCard from "../components/Cards/ListingCard";
import useListings from "../hooks/useListings";

export default function Listings() {
  const { listings, loading, error } = useListings();

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
    <Tab label="آگهی‌ها">
      {listings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">هیچ آگهی یافت نشد.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </Tab>
  );
}
