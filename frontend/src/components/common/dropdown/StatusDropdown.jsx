import React from "react";
import Dropdown from "./Dropdown";
import { RefreshCw } from "lucide-react";
import { LISTING_STATUS, PROPERTY_STATUS } from "../../../constants/statusConfig";

const StatusDropdown = ({
  currentStatus,
  onStatusChange,
  type = "listing", // 'listing' | 'property'
  trigger = null,
  position = "right",
  className = "",
  showLabel = false,
}) => {
 // config type
  const statusConfig = type === "listing" ? LISTING_STATUS : PROPERTY_STATUS;
  
 
  const options = Object.entries(statusConfig).map(([value, config]) => ({
    value,
    label: config.text,
    bgColor: config.bgColor,
    textColor: config.textColor || config.color,
  }));

  const items = options.map((opt) => ({
    label: opt.label,
    active: currentStatus === opt.value,
    onClick: () => onStatusChange?.(opt.value),
    className: `${
      currentStatus === opt.value
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-gray-700 hover:bg-gray-100"
    } px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2`,
    render: () => (
      <span className="flex items-center gap-2 w-full">
        <span className={`w-2 h-2 rounded-full ${opt.bgColor}`} />
        <span>{opt.label}</span>
        {currentStatus === opt.value && (
          <span className="mr-auto text-xs text-blue-600">✓</span>
        )}
      </span>
    ),
  }));

  const defaultTrigger = (
    <button
      className={`text-gray-400 cursor-pointer hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors ${
        showLabel ? "flex items-center gap-2" : ""
      }`}
    >
      {showLabel ? (
        <>
          <span className="text-sm text-gray-700">
            {statusConfig[currentStatus]?.text || "تغییر وضعیت"}
          </span>
          <RefreshCw size={14} />
        </>
      ) : (
        <RefreshCw size={14} />
      )}
    </button>
  );

  return (
    <Dropdown
      trigger={trigger || defaultTrigger}
      items={items}
      position={position}
      className={className}
    />
  );
};

export default StatusDropdown;