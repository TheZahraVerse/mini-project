import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check } from "lucide-react";

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const activeOption = sortOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 min-w-42.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="text-xs text-gray-400 font-medium">مرتب‌سازی:</span>
        <span className="text-sm font-medium text-gray-700 truncate flex-1 text-right">
          {activeOption?.label || "انتخاب"}
        </span>
        <ArrowUpDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden min-w-50">
          {sortOptions.map((option) => {
            const isActive = value === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-right px-4 py-2 text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span>{option.label}</span>
                {isActive && <Check size={16} className="text-blue-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;