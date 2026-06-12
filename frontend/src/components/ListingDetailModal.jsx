import React from "react";
import Modal from "./common/Modal";
import ScoreBadge from "./common/ScoreBadge";
import {
  getListingStatus,
  getPropertyStatus,
  getSourceConfig,
} from "../constants/statusConfig";
import { ExternalLink, Calendar, Camera, DollarSign, Ruler, Layers, MapPin, User, Phone, FileText, Clock, Building2, Hash, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const ListingDetailModal = ({ isOpen, onClose, listing }) => {
  if (!listing) return null;

  const { property, source, source_url, image_count, score, status, created_at } = listing;
  const owner = property?.owner;

  const statusConfig = getListingStatus(status);
  const propertyStatusConfig = getPropertyStatus(property?.status);
  const sourceConfig = getSourceConfig(source);

  const formattedDate = new Date(created_at).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = new Date(created_at).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getBorderColor = (score) => {
    if (score >= 80) return "border-emerald-500";
    if (score >= 60) return "border-emerald-400";
    if (score >= 40) return "border-yellow-500";
    if (score >= 20) return "border-orange-500";
    return "border-red-500";
  };

  const borderColor = getBorderColor(score);

  const getStatusIcon = (status) => {
    switch (status) {
      case "reviewed": return <CheckCircle size={16} />;
      case "contacted": return <Phone size={14} />;
      case "converted": return <Building2 size={14} />;
      case "rejected": return <XCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="جزئیات آگهی">
      <div className="space-y-5">
        
        {/* ========== HEADER CARD ========== */}
        <div className={`bg-linear-to-r from-white to-gray-50 rounded-xl border-l-4 ${borderColor} p-4 shadow-sm`}>
          <div className="flex flex-wrap gap-4 justify-between items-center">
            
            {/* Score Badge - جایگزین دایره امتیاز قبلی */}
            <div className="flex items-center gap-3">
              <ScoreBadge score={score} size="lg" showLabel={true} showIcon={true} />
              <div>
                <p className="text-xs text-gray-400 mb-1">وضعیت آگهی</p>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                  {getStatusIcon(status)}
                  <span>{statusConfig.text}</span>
                </div>
              </div>
            </div>

            {/* Source and Date */}
            <div className="text-left">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-xl">{sourceConfig.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{sourceConfig.name}</span>
                {source_url && (
                  <a
                    href={source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title="مشاهده آگهی در منبع اصلی"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                <span>{formattedDate}</span>
                <Clock size={12} className="mr-2" />
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SECTION 1: LISTING DETAILS ========== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1 h-5 rounded-full ${borderColor.replace("border", "bg")}`} />
            <h3 className="text-base font-bold text-gray-800">اطلاعات آگهی</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 bg-gray-50/80 rounded-xl p-4">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">تعداد عکس</p>
              <div className="flex items-center gap-1.5">
                <Camera size={14} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-800">{image_count}</span>
                {image_count === 0 && (
                  <span className="text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">بدون عکس</span>
                )}
              </div>
            </div>
            {source_url && (
              <div className="col-span-2 mt-1 pt-1 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1">لینک آگهی</p>
                <a
                  href={source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  {source_url.length > 50 ? `${source_url.substring(0, 50)}...` : source_url}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ========== SECTION 2: PROPERTY DETAILS ========== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1 h-5 rounded-full ${borderColor.replace("border", "bg")}`} />
            <h3 className="text-base font-bold text-gray-800">مشخصات ملک</h3>
          </div>
          <div className="bg-gray-50/80 rounded-xl p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2 pb-2 border-b border-gray-100 mb-1">
                <p className="text-xs text-gray-400 mb-0.5">عنوان ملک</p>
                <p className="text-base font-bold text-gray-800">{property?.title}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-0.5">قیمت</p>
                <div className="flex items-center gap-1">
                  <DollarSign size={14} className="text-gray-400" />
                  <span className="text-sm font-semibold text-gray-800">{property?.price?.toLocaleString()} تومان</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-0.5">متراژ</p>
                <div className="flex items-center gap-1">
                  <Ruler size={14} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-800">{property?.area} متر</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-0.5">تعداد اتاق</p>
                <div className="flex items-center gap-1">
                  <Layers size={14} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-800">{property?.rooms || "ندارد"}</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-0.5">طبقه</p>
                <div className="flex items-center gap-1">
                  <Hash size={14} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-800">{property?.floor === 0 ? "همکف" : property?.floor}</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-0.5">وضعیت ملک</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${propertyStatusConfig.bgColor} ${propertyStatusConfig.color}`}>
                  <Building2 size={12} />
                  {propertyStatusConfig.text}
                </span>
              </div>
              
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-400 mb-0.5">آدرس</p>
                <div className="flex items-start gap-1">
                  <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{property?.address}</span>
                </div>
              </div>
              
              {property?.description && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400 mb-1">توضیحات</p>
                  <div className="flex items-start gap-1">
                    <FileText size={14} className="text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== SECTION 3: OWNER DETAILS ========== */}
        {owner && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-1 h-5 rounded-full ${borderColor.replace("border", "bg")}`} />
              <h3 className="text-base font-bold text-gray-800">اطلاعات مالک</h3>
            </div>
            <div className="bg-linear-to-r from-blue-50/50 to-white rounded-xl p-4 border border-blue-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">نام مالک</p>
                  <div className="flex items-center gap-1">
                    <User size={14} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-800">{owner.name}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">شماره تماس</p>
                  <div className="flex items-center gap-1">
                    <Phone size={14} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-800 dir-ltr">{owner.phone}</span>
                  </div>
                </div>
                {owner.notes && (
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400 mb-0.5">یادداشت</p>
                    <p className="text-sm text-gray-600 bg-white p-2 rounded-lg border">{owner.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};

export default ListingDetailModal;