// frontend/src/components/listings/ListingCard.jsx
import React from "react"
import Label from "../common/Label"
import Icon from "../common/Icon"
import ScoreBadge from "../common/ScoreBadge"
import { getListingStatus, getSourceConfig } from "../../constants/statusConfig"
import { MapPin, DollarSign, Clock, ChevronLeft, CheckCircle, PhoneCall, RefreshCw, XCircle } from "lucide-react"

export default function ListingCard({ listing, onViewDetails }) {
  const property = listing.property
  
  const statusConfig = getListingStatus(listing.status)
  const sourceConfig = getSourceConfig(listing.source)

  const formattedDate = new Date(listing.created_at).toLocaleDateString('fa-IR')
  const formattedTime = new Date(listing.created_at).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })

  const handleIconClick = () => {
    if (sourceConfig.hasLink && listing.source_url) {
      window.open(listing.source_url, '_blank', 'noopener,noreferrer')
    }
  }

  const getStatusIcon = () => {
    switch (listing.status) {
      case 'reviewed': return <CheckCircle size={12} className="text-amber-600" />
      case 'contacted': return <PhoneCall size={12} className="text-blue-600" />
      case 'converted': return <RefreshCw size={12} className="text-emerald-600" />
      case 'rejected': return <XCircle size={12} className="text-red-600" />
      default: return null
    }
  }

  const getRelativeTime = () => {
    const now = new Date()
    const created = new Date(listing.created_at)
    const diffHours = Math.floor((now - created) / (1000 * 60 * 60))
    
    if (diffHours < 1) return "لحظاتی پیش"
    if (diffHours < 24) return `${diffHours} ساعت پیش`
    if (diffHours < 48) return "دیروز"
    return `${Math.floor(diffHours / 24)} روز پیش`
  }

  return (
    <div className="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:-translate-y-0.5 border border-gray-100 hover:border-gray-200">
      
      {/* Top colored bar based on score */}
      <div className={`h-1 w-full ${
        listing.score >= 80 ? "bg-emerald-500" :
        listing.score >= 60 ? "bg-blue-500" :
        listing.score >= 40 ? "bg-amber-500" :
        listing.score >= 20 ? "bg-orange-500" : "bg-red-500"
      }`} />
      
      <div className="p-3">
        
        {/* Top row: Icon + Title | ScoreBadge */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div 
              onClick={handleIconClick}
              className={`shrink-0 ${sourceConfig.hasLink ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}`}
              title={sourceConfig.hasLink ? `مشاهده در ${sourceConfig.name}` : `منبع ${sourceConfig.name}`}
            >
              <Icon src={`/src/assets/${sourceConfig.iconName}`} alt={`آیکون ${sourceConfig.name}`} />
            </div>
            <h3 className="text-base font-bold text-gray-800 truncate">
              {property?.title || listing.title}
            </h3>
          </div>
          
          {/* ScoreBadge component - reusuable */}
          <ScoreBadge score={listing.score} size="md" showLabel={true} showIcon={true} />
        </div>
        
        {/* Middle row: Location & Price | Status */}
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1.5 text-sm min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-gray-600">
              <MapPin size={14} className="text-gray-400 shrink-0" />
              <span className="truncate text-sm">{property?.address || listing.area || "آدرس نامشخص"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <DollarSign size={14} className="text-gray-400 shrink-0" />
              <span className="font-semibold text-sm">
                {(property?.price || listing.price)?.toLocaleString() || "نامشخص"} تومان
              </span>
            </div>
          </div>
          
          <div className={`shrink-0 mr-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
            {getStatusIcon()}
            <span>{statusConfig.text}</span>
          </div>
        </div>
        
        {/* Bottom row: Details button | Relative time */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <button 
            onClick={() => onViewDetails(listing)}
            className="text-blue-600 text-sm hover:text-blue-800 cursor-pointer transition-colors flex items-center gap-0.5 group/btn"
          >
            <span>جزئیات بیشتر</span>
            <ChevronLeft size={14} className="group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>
          
          <div className="text-xs text-gray-400 flex items-center gap-1" title={`${formattedTime} - ${formattedDate}`}>
            <Clock size={11} />
            <span>{getRelativeTime()}</span>
          </div>
        </div>
        
      </div>
    </div>
  )
}