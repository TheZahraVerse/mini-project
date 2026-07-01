export const getPropertyInfo = (listing) => {
  const property = listing.property || {};
  return {
    title: property.title || listing.title || "بدون عنوان",
    address: property.address || listing.area || "نامشخص",
    area: property.area || "?",
    rooms: property.rooms || "?",
    floor: property.floor !== undefined ? property.floor : "?",
    price: property.price || listing.price || 0,
    owner: property?.owner || null,
  };
};

export const getListingDisplayInfo = (listing) => {
  const info = getPropertyInfo(listing);
  return {
    ...info,
    score: listing.score || 0,
    status: listing.status || "reviewed",
    created_at: listing.created_at,
    id: listing.id,
  };
};

export const formatPrice = (price) => {
  if (!price) return "نامشخص";
  return price.toLocaleString();
};

export const getFloorDisplay = (floor) => {
  if (floor === 0 || floor === "0") return "همکف";
  if (floor === -1 || floor === "-1") return "زیرزمین";
  if (!floor && floor !== 0) return "نامشخص";
  return floor;
};