import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, BarChart3 } from "lucide-react";

const StatsDropdown = ({
  items,
  groupBy,
  labelMap,
  colorMap,
  iconMap,
  showTotal = true,
  totalLabel = "Total",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getGroupedCounts = () => {
    const counts = {};
    items.forEach((item) => {
      const keys = groupBy.split(".");
      let value = item;
      for (const key of keys) {
        value = value?.[key];
      }
      const key = value !== undefined && value !== null ? value : "Unknown";
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  };

  const groupedCounts = getGroupedCounts();
  const total = items.length;
  const sortedKeys = Object.keys(groupedCounts).sort();

  if (items.length === 0) {
    return (
      <button className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-2.5 py-1.5 rounded-lg cursor-default">
        <BarChart3 size={14} />
        <span>No data</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs bg-gray-50 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        <BarChart3 size={14} className="text-gray-500" />
        <span className="font-medium text-gray-700">{total}</span>
        <ChevronDown
          size={12}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2 min-w-40">
          {showTotal && (
            <div className="px-4 py-1.5 flex justify-between items-center border-b border-gray-100">
              <span className="text-xs text-gray-500">{totalLabel}</span>
              <span className="text-sm font-bold text-gray-800">{total}</span>
            </div>
          )}

          {sortedKeys.map((key) => {
            const label = labelMap?.[key] || key;
            const color = colorMap?.[key] || "text-gray-600";
            const Icon = iconMap?.[key];
            return (
              <div
                key={key}
                className={`px-4 py-1.5 flex justify-between items-center ${color}`}
              >
                <span className="text-xs flex items-center gap-1.5">
                  {Icon && <Icon size={12} />}
                  {label}
                </span>
                <span className="text-sm font-bold">{groupedCounts[key]}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatsDropdown;
