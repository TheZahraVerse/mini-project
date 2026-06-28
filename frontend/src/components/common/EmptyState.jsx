import React from "react";
import { Search } from "lucide-react";

const EmptyState = ({
  icon: Icon = Search,
  title = "هیچ داده‌ای یافت نشد",
  message = "با فیلترهای انتخاب شده، داده‌ای وجود ندارد.",
  actionText = "حذف همه فیلترها",
  onAction,
  className = "",
}) => {
  return (
    <div className={`text-center py-12 bg-white rounded-xl border border-gray-100 ${className}`}>
      <Icon className="w-12 h-12 text-gray-400 mx-auto mb-3" strokeWidth={1.5} />
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;