// components/listings/PropertyDetails.jsx
import React from "react";
import StatusDropdown from "../common/dropdown/StatusDropdown";
import { getPropertyStatus } from "../../constants/statusConfig";
import { formatPrice, getFloorDisplay } from "../../helpers/listingHelpers";
import {
  DollarSign,
  Ruler,
  Layers,
  MapPin,
  FileText,
  Hash,
  Building2,
} from "lucide-react";

const PropertyDetails = ({
  property,
  isEditMode,
  editedPropertyStatus,
  onPropertyStatusChange,
  borderBg,
}) => {
  const displayStatus = isEditMode ? editedPropertyStatus : property?.status;
  const propertyStatusConfig = getPropertyStatus(displayStatus);

  return (
    <div>
      <div className="bg-gray-50/80 rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Title */}
          <div className="sm:col-span-2 pb-2 border-b border-gray-100 mb-1">
            <p className="text-xs text-gray-400 mb-0.5">عنوان ملک</p>
            <p className="text-base font-bold text-gray-800">
              {property?.title}
            </p>
          </div>

          {/* Price */}
          <div>
            <p className="text-xs text-gray-400 mb-0.5">قیمت</p>
            <div className="flex items-center gap-1">
              <DollarSign size={14} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-800">
                {formatPrice(property?.price)} تومان
              </span>
            </div>
          </div>

          {/* Area */}
          <div>
            <p className="text-xs text-gray-400 mb-0.5">متراژ</p>
            <div className="flex items-center gap-1">
              <Ruler size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-800">
                {property?.area} متر
              </span>
            </div>
          </div>

          {/* Rooms */}
          <div>
            <p className="text-xs text-gray-400 mb-0.5">تعداد اتاق</p>
            <div className="flex items-center gap-1">
              <Layers size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-800">
                {property?.rooms || "ندارد"}
              </span>
            </div>
          </div>

          {/* Floor */}
          <div>
            <p className="text-xs text-gray-400 mb-0.5">طبقه</p>
            <div className="flex items-center gap-1">
              <Hash size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-800">
                {getFloorDisplay(property?.floor)}
              </span>
            </div>
          </div>

          {/* Property Status */}
          <div>
            <p className="text-xs text-gray-400 mb-0.5">وضعیت ملک</p>
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${propertyStatusConfig.bgColor} ${propertyStatusConfig.color}`}
              >
                <Building2 size={12} />
                {propertyStatusConfig.text}
              </span>

              {isEditMode && (
                <StatusDropdown
                  type="property"
                  currentStatus={editedPropertyStatus}
                  onStatusChange={onPropertyStatusChange}
                  position="right"
                />
              )}
            </div>
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <p className="text-xs text-gray-400 mb-0.5">آدرس</p>
            <div className="flex items-start gap-1">
              <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{property?.address}</span>
            </div>
          </div>

          {/* Description */}
          {property?.description && (
            <div className="sm:col-span-2">
              <p className="text-xs text-gray-400 mb-1">توضیحات</p>
              <div className="flex items-start gap-1">
                <FileText size={14} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
