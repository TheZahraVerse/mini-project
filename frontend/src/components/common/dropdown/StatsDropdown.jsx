import React from "react";
import { BarChart3, ChevronDown } from "lucide-react";
import Dropdown from "./Dropdown";

const StatsDropdown = ({
  items,
  groupBy,
  labelMap,
  colorMap,
  iconMap,
  showTotal = true,
  totalLabel = "Total",
}) => {
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

  const dropdownItems = [];

  if (showTotal) {
    dropdownItems.push({
      label: `${totalLabel}: ${total}`,
      onClick: () => {},
      color: "text-gray-800 font-medium border-b border-gray-100",
    });
  }

  sortedKeys.forEach((key) => {
    const label = labelMap?.[key] || key;
    const color = colorMap?.[key] || "text-gray-600";
    const Icon = iconMap?.[key];
    dropdownItems.push({
      label: (
        <span className="flex items-center justify-between w-full">
          <span className="flex items-center gap-1.5">
            {Icon && <Icon size={12} />}
            {label}
          </span>
          <span className="font-bold">{groupedCounts[key]}</span>
        </span>
      ),
      onClick: () => {},
      color: color,
    });
  });

  const trigger = (
    <button className="flex items-center gap-1.5 text-xs bg-gray-50 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">
      <BarChart3 size={14} className="text-gray-500" />
      <span className="font-medium text-gray-700">{total}</span>
      <ChevronDown size={12} className="text-gray-400" />
    </button>
  );

  return <Dropdown trigger={trigger} items={dropdownItems} position="left" />;
};

export default StatsDropdown;
