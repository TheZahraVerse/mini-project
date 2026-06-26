import React from "react";
import ScoreBadge from "./common/ScoreBadge";
import { getListingStatus } from "../constants/statusConfig";
import { MapPin, DollarSign, Calendar, ChevronLeft, Edit, Trash2, Phone, RefreshCw } from "lucide-react";

const ListingRow = ({ 
  listing, 
  index, 
  onViewDetails,
  onEdit,
  onDelete,
  onStatusChange,
  onCall 
}) => {
  const property = listing.property;
  const statusConfig = getListingStatus(listing.status);

  const getRelativeTime = () => {
    const now = new Date();
    const created = new Date(listing.created_at);
    const diffHours = Math.floor((now - created) / (1000 * 60 * 60));
    if (diffHours < 1) return "لحظاتی پیش";
    if (diffHours < 24) return `${diffHours} ساعت پیش`;
    if (diffHours < 48) return "دیروز";
    return `${Math.floor(diffHours / 24)} روز پیش`;
  };

  const formattedDate = new Date(listing.created_at).toLocaleDateString("fa-IR");
  const formattedTime = new Date(listing.created_at).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <td className="p-3 text-center text-sm text-gray-400 font-medium">{index + 1}</td>
      
      <td className="p-3">
        <div className="flex justify-center">
          <ScoreBadge score={listing.score} size="sm" />
        </div>
      </td>

      <td className="p-3">
        <h3 className="text-sm font-bold text-gray-800 truncate max-w-50">
          {property?.title || listing.title}
        </h3>
      </td>

      <td className="p-3">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={12} />
          <span className="truncate max-w-37.5">
            {property?.address || listing.area || "آدرس نامشخص"}
          </span>
        </div>
      </td>

      <td className="p-3">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <DollarSign size={12} />
          <span>{(property?.price || listing.price)?.toLocaleString() || "نامشخص"} تومان</span>
        </div>
      </td>

      <td className="p-3">
        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
          {statusConfig.text}
        </div>
      </td>

      <td className="p-3">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar size={12} />
          <span>{getRelativeTime()}</span>
        </div>
        <div className="text-[10px] text-gray-400 mt-1">
          {formattedTime} - {formattedDate}
        </div>
      </td>

      <td className="p-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewDetails?.(listing)}
            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
            title="جزئیات"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onEdit?.(listing)}
            className="text-green-600 hover:text-green-800 transition-colors p-1"
            title="ویرایش"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onStatusChange?.(listing)}
            className="text-yellow-600 hover:text-yellow-800 transition-colors p-1"
            title="تغییر وضعیت"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={() => onCall?.(listing)}
            className="text-purple-600 hover:text-purple-800 transition-colors p-1"
            title="ثبت تماس"
          >
            <Phone size={16} />
          </button>
          <button
            onClick={() => onDelete?.(listing)}
            className="text-red-600 hover:text-red-800 transition-colors p-1"
            title="حذف"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </>
  );
};

export default ListingRow;