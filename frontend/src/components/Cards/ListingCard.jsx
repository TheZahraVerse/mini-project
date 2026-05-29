// frontend/src/components/listings/ListingCard.jsx
import React from "react"
import Label from "../common/Label"
import Icon from "../common/Icon"
import { getListingStatus, getScoreConfig, getSourceConfig } from "../../constants/statusConfig"


export default function ListingCard({ listing, onViewDetails }) {
  // define constants
  const property = listing.property
  
  const statusConfig = getListingStatus(listing.status)
  const scoreConfig = getScoreConfig(listing.score)
  const sourceConfig = getSourceConfig(listing.source)

  const formattedDate = new Date(listing.created_at).toLocaleDateString('fa-IR')
  const formattedTime = new Date(listing.created_at).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })

  // Icon onclick for linking
  const handleIconClick = () => {
    if (sourceConfig.hasLink && listing.source_url) {
      window.open(listing.source_url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="rounded-xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1">
      
      {/* Top row: Right side (Icon + Title) - Left side (Score Label) */}
      <div className="flex justify-between items-center mb-4">
        {/* Right side: Icon + Title - Icon is clickable */}
        <div className="flex items-center gap-2">
          {/* Clickable icon wrapper */}
          <div 
            onClick={handleIconClick}
            className={sourceConfig.hasLink ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}
            title={sourceConfig.hasLink ? `مشاهده در ${sourceConfig.name}` : `منبع ${sourceConfig.name}`}
          >
            {<Icon src={`/src/assets/${sourceConfig.iconName}`} alt={`آیکون ${sourceConfig.name}`} />}
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            {property.title}
          </h3>
        </div>
        
        {/* Left side: Score Label */}
        <Label 
          text={listing.score.toString()} 
          bgColor={scoreConfig.bgColor} 
          textColor={scoreConfig.textColor}
        />
      </div>
      
      {/* Middle row: Right side (Location & Price vertically) - Left side (Status Label) */}
      <div className="flex justify-between items-start mb-4">
        {/* Right side: Location and Price as subtitle (vertical) */}
        <div className="space-y-1 text-sm text-gray-600">
          <div>📍 {property?.address || listing.area}</div>
          <div>💰 {property?.price?.toLocaleString() || listing.price?.toLocaleString()} تومان</div>
        </div>
        
        {/* Left side: Status Label */}
        <Label 
          text={statusConfig.text} 
          bgColor={statusConfig.bgColor} 
          textColor={statusConfig.textColor}
        />
      </div>
      
      {/* Bottom row: Right side (Details button) - Left side (Date and Time) */}
      <div className="flex justify-between items-center pt-3">
        {/* Right side: Details button */}
        <button 
          onClick={() => onViewDetails(listing)}
          className="text-blue-500 text-l hover:text-blue-700 cursor-pointer"
        >
          جزئیات بیشتر
        </button>
        
        {/* Left side: Date and Time */}
        <div className="text-xs text-gray-400">
           {formattedTime} - {formattedDate} 
        </div>
      </div>
      
    </div>
  )
}
