import React from "react";
import { ArrowUpDown } from "lucide-react";
import Dropdown from "./Dropdown";

const sortOptions = [
  { value: "-score", label: "بالاترین امتیاز" },
  { value: "score", label: "پایین‌ترین امتیاز" },
  { value: "-property__price", label: "گرانترین" },
  { value: "property__price", label: "ارزانترین" },
  { value: "-created_at", label: "جدیدترین" },
  { value: "created_at", label: "قدیمی‌ترین" },
  { value: "-property__area", label: "بزرگترین متراژ" },
  { value: "property__area", label: "کوچکترین متراژ" },
];

const SortDropdown = ({ value, onChange }) => {
  const activeOption = sortOptions.find((opt) => opt.value === value);

  const items = sortOptions.map((option) => ({
    label: option.label,
    active: value === option.value,
    onClick: () => onChange(option.value),
    color: value === option.value ? "bg-blue-50 text-blue-600" : "text-gray-700",
  }));

  const trigger = (
    <button className="flex items-center gap-2 px-3 py-2 min-w-42.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors cursor-pointer">
      <span className="text-xs text-gray-400 font-medium">مرتب‌سازی:</span>
      <span className="text-sm font-medium text-gray-700 truncate flex-1 text-right">
        {activeOption?.label || "انتخاب"}
      </span>
      <ArrowUpDown size={16} className="text-gray-400 shrink-0" />
    </button>
  );

  return <Dropdown trigger={trigger} items={items} position="left" />;
};

export default SortDropdown;