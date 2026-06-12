import React from "react";
import ScoreBadge from "./common/ScoreBadge";
import { getListingStatus } from "../constants/statusConfig";
import { MapPin, DollarSign, Calendar, ChevronLeft } from "lucide-react";

const ListingRow = ({ listing, index, onViewDetails }) => {
  const property = listing.property;
  const statusConfig = getListingStatus(listing.status);

  const formattedDate = new Date(listing.created_at).toLocaleDateString("fa-IR");
  const formattedTime = new Date(listing.created_at).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getRelativeTime = () => {
    const now = new Date();
    const created = new Date(listing.created_at);
    const diffHours = Math.floor((now - created) / (1000 * 60 * 60));

    if (diffHours < 1) return "لحظاتی پیش";
    if (diffHours < 24) return `${diffHours} ساعت پیش`;
    if (diffHours < 48) return "دیروز";
    return `${Math.floor(diffHours / 24)} روز پیش`;
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* ستون 1: شماره */}
      <td className="p-3 text-center text-sm text-gray-400 font-medium">
        {index + 1}
      </td>

      {/* ستون 2: امتیاز */}
      <td className="p-3">
        <div className="flex justify-center">
          <ScoreBadge score={listing.score} size="sm" />
        </div>
      </td>

      {/* ستون 3: عنوان ملک */}
      <td className="p-3">
        <h3 className="text-sm font-bold text-gray-800">
          {property?.title || listing.title}
        </h3>
      </td>

      {/* ستون 4: آدرس */}
      <td className="p-3">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={12} />
          <span>{property?.address || listing.area || "آدرس نامشخص"}</span>
        </div>
      </td>

      {/* ستون 5: قیمت */}
      <td className="p-3">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <DollarSign size={12} />
          <span>{(property?.price || listing.price)?.toLocaleString() || "نامشخص"} تومان</span>
        </div>
      </td>

      {/* ستون 6: وضعیت */}
      <td className="p-3">
        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
          {statusConfig.text}
        </div>
      </td>

      {/* ستون 7: تاریخ ثبت */}
      <td className="p-3">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar size={12} />
          <span>{getRelativeTime()}</span>
        </div>
        <div className="text-[10px] text-gray-400 mt-1">
          {formattedTime} - {formattedDate}
        </div>
      </td>

      {/* ستون 8: عملیات */}
      <td className="p-3">
        <button
          onClick={() => onViewDetails?.(listing)}
          className="text-blue-600 text-sm hover:text-blue-800 cursor-pointer transition-colors flex items-center gap-0.5 whitespace-nowrap"
        >
          <span> جزئیات بیشتر</span>
          <ChevronLeft size={14} />
        </button>
      </td>
    </tr>
  );
};

export default ListingRow;