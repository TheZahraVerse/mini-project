// frontend/src/components/listings/ListingCard.jsx
import React from "react"
import Label from "../Label"
import Icon from "../Icon"


export default function ListingCard({ listing, onViewDetails }) {
  const property = listing.property
  
  // Get status label config
  const getStatusConfig = (status) => {
    const statusMap = {
      reviewed: { text: 'بررسی شده', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
      contacted: { text: 'تماس گرفته شده', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
      converted: { text: 'تبدیل شده', bgColor: 'bg-green-100', textColor: 'text-green-800' },
      rejected: { text: 'رد شده', bgColor: 'bg-red-100', textColor: 'text-red-800' },
    }
    return statusMap[status] || statusMap.reviewed
  }

  // Get score label config
  const getScoreConfig = (score) => {
    if (score >= 80) return { bgColor: 'bg-emerald-500', textColor: 'text-white' }
    if (score >= 60) return { bgColor: 'bg-emerald-400', textColor: 'text-white' }
    if (score >= 40) return { bgColor: 'bg-yellow-500', textColor: 'text-white' }
    if (score >= 20) return { bgColor: 'bg-orange-500', textColor: 'text-white' }
    return { bgColor: 'bg-red-500', textColor: 'text-white' }
  }

  const statusConfig = getStatusConfig(listing.status)
  const scoreConfig = getScoreConfig(listing.score)
  const formattedDate = new Date(listing.created_at).toLocaleDateString('fa-IR')
  const formattedTime = new Date(listing.created_at).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  
 // Source icon and link
  const getSourceInfo = (source) => {
    if (source === 'divar') return { 
      name: 'دیوار', 
      icon: <Icon src={"/src/assets/divar.jpg"} />, 
      link: listing.source_url,
      hasLink: true
    }
    if (source === 'sheypoor') return { 
      name: 'شیپور', 
      icon: <Icon src={"/src/assets/sheypoor.png"} />, 
      link: listing.source_url,
      hasLink: true
    }
    return { 
      name: 'داخلی', 
      icon: <Icon src={"/src/assets/internal.png"} />, 
      link: null,
      hasLink: false
    }
  }
  
  const sourceInfo = getSourceInfo(listing.source)

  // Handle icon click - open source link
  const handleIconClick = () => {
    if (sourceInfo.hasLink && sourceInfo.link) {
      window.open(sourceInfo.link, '_blank', 'noopener,noreferrer')
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
            className={sourceInfo.hasLink ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}
            title={sourceInfo.hasLink ? `مشاهده در ${sourceInfo.name}` : `منبع ${sourceInfo.name}`}
          >
            {sourceInfo.icon}
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
