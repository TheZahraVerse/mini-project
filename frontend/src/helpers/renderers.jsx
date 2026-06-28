import React from "react";
import ListingCard from "../components/Cards/ListingCard";


export const renderListingCard = (listing, onViewDetails) => (
  <ListingCard listing={listing} onViewDetails={onViewDetails} />
);

