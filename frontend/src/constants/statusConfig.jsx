import { CheckCircle, Phone, AlertCircle, Building2, XCircle } from "lucide-react";

// Listing status config
export const LISTING_STATUS = {
  reviewed: { text: 'بررسی شده', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  contacted: { text: 'تماس گرفته شده', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
  converted: { text: 'تبدیل شده', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  rejected: { text: 'رد شده', bgColor: 'bg-red-100', textColor: 'text-red-800' },
}

// Property status config
export const PROPERTY_STATUS = {
  available: { text: 'موجود', color: 'text-green-600', bgColor: 'bg-green-50' },
  reserved: { text: 'رزرو شده', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  sold: { text: 'فروخته شده', color: 'text-red-600', bgColor: 'bg-red-50' },
  rented: { text: 'اجاره رفته', color: 'text-blue-600', bgColor: 'bg-blue-50' },
}

// Score color config
export const SCORE_CONFIG = [
  { min: 80, bgColor: 'bg-emerald-500', textColor: 'text-white' },
  { min: 60, bgColor: 'bg-emerald-400', textColor: 'text-white' },
  { min: 40, bgColor: 'bg-yellow-500', textColor: 'text-white' },
  { min: 20, bgColor: 'bg-orange-500', textColor: 'text-white' },
  { min: 0, bgColor: 'bg-red-500', textColor: 'text-white' },
]

// Source config
export const SOURCE_CONFIG = {
  divar: { name: 'دیوار', iconName: 'divar.jpg', hasLink: true },
  sheypoor: { name: 'شیپور', iconName: 'sheypoor.png', hasLink: true },
  internal: { name: 'داخلی', iconName: 'internal.png', hasLink: false },
}

// Helper functions
export const getListingStatus = (status) => {
  return LISTING_STATUS[status] || LISTING_STATUS.reviewed
}

export const getPropertyStatus = (status) => {
  return PROPERTY_STATUS[status] || PROPERTY_STATUS.available
}

export const getScoreConfig = (score) => {
  return SCORE_CONFIG.find(c => score >= c.min) || SCORE_CONFIG[SCORE_CONFIG.length - 1]
}

export const getSourceConfig = (source) => {
  return SOURCE_CONFIG[source] || SOURCE_CONFIG.internal
}

export const getBorderColor = (score) => {
  if (score >= 80) return "border-emerald-500";
  if (score >= 60) return "border-emerald-400";
  if (score >= 40) return "border-yellow-500";
  if (score >= 20) return "border-orange-500";
  return "border-red-500";
};

export const getStatusIcon = (status) => {
  switch (status) {
    case "reviewed":
      return <CheckCircle size={16} />;
    case "contacted":
      return <Phone size={14} />;
    case "converted":
      return <Building2 size={14} />;
    case "rejected":
      return <XCircle size={14} />;
    default:
      return <AlertCircle size={14} />;
  }
};