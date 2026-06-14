import React from "react";
import CheckboxGroupFilter from "./CheckboxGroupFilter";
import RangeSliderFilter from "./RangeSliderFilter";
import RadioGroupFilter from "./RadioGroupFilter";
import CollapsibleGroup from "../common/CollapsibleGroup";
import {
  CheckSquare,
  Home,
  DollarSign,
  Ruler,
  Star,
  Filter,
  Layers,
  SlidersHorizontal,
  Calendar,
} from "lucide-react";

const listingStatusOptions = [
  { value: "reviewed", label: "بررسی شده" },
  { value: "contacted", label: "تماس گرفته شده" },
  { value: "converted", label: "تبدیل شده" },
  { value: "rejected", label: "رد شده" },
];

const propertyStatusOptions = [
  { value: "available", label: "موجود" },
  { value: "reserved", label: "رزرو شده" },
  { value: "sold", label: "فروخته شده" },
  { value: "rented", label: "اجاره رفته" },
];

const sourceOptions = [
  { value: "divar", label: "دیوار" },
  { value: "sheypoor", label: "شیپور" },
  { value: "internal", label: "داخلی" },
];

const roomOptions = [
  { value: "1", label: "۱" },
  { value: "2", label: "۲" },
  { value: "3", label: "۳" },
  { value: "4", label: "۴+" },
];

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const handleListingStatusChange = (values) => {
    onFilterChange({ status: values });
  };

  const handlePropertyStatusChange = (values) => {
    onFilterChange({ property_status: values });
  };

  const handleSourceChange = (value) => {
    onFilterChange({ source: value });
  };

  const handleRoomChange = (value) => {
    onFilterChange({ rooms: value });
  };

  const hasActiveFilters =
    (filters.status && filters.status.length > 0) ||
    (filters.property_status && filters.property_status.length > 0) ||
    filters.source ||
    filters.rooms ||
    filters.min_price ||
    filters.max_price ||
    filters.min_area ||
    filters.max_area ||
    filters.min_score ||
    filters.max_score;

  return (
    <aside className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-4">
      {/* Header with title and clear button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-gray-500" />
          <h3 className="text-base font-bold text-gray-800">فیلترها</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
          >
            حذف همه
          </button>
        )}
      </div>

      <div className="p-4 space-y-1">
        {/* محدوده امتیاز */}
        <CollapsibleGroup title="محدوده امتیاز" icon={Star} defaultOpen={false}>
          <div className="pt-2">
            <RangeSliderFilter
              title="امتیاز"
              min={0}
              max={100}
              step={5}
              unit="امتیاز"
              onChange={({ min, max }) =>
                onFilterChange({ min_score: min, max_score: max })
              }
              initialMin={filters.min_score}
              initialMax={filters.max_score}
            />
          </div>
        </CollapsibleGroup>

        {/* منبع آگهی */}
        <CollapsibleGroup title="منبع آگهی" icon={Filter} defaultOpen={false}>
          <div className="pt-2">
            <RadioGroupFilter
              name="source"
              options={sourceOptions}
              onChange={handleSourceChange}
              initialValue={filters.source || ""}
            />
          </div>
        </CollapsibleGroup>

        {/* وضعیت ملک و آگهی */}
        <CollapsibleGroup title="وضعیت" icon={CheckSquare} defaultOpen={false}>
          <div className="space-y-4 pt-2">
            <div>
              <h4 className="text-xs font-medium text-gray-500 mb-2 pr-1">
                وضعیت آگهی
              </h4>
              <CheckboxGroupFilter
                options={listingStatusOptions}
                onChange={handleListingStatusChange}
                initialValues={filters.status || []}
              />
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500 mb-2 pr-1">
                وضعیت ملک
              </h4>
              <CheckboxGroupFilter
                options={propertyStatusOptions}
                onChange={handlePropertyStatusChange}
                initialValues={filters.property_status || []}
              />
            </div>
          </div>
        </CollapsibleGroup>

        {/* تعداد اتاق */}
        <CollapsibleGroup title="تعداد اتاق" icon={Home} defaultOpen={false}>
          <div className="pt-2">
            <RadioGroupFilter
              name="rooms"
              options={roomOptions}
              onChange={handleRoomChange}
              initialValue={filters.rooms || ""}
            />
          </div>
        </CollapsibleGroup>

        {/* محدوده قیمت */}
        <CollapsibleGroup
          title="محدوده قیمت"
          icon={DollarSign}
          defaultOpen={false}
        >
          <div className="pt-2">
            <RangeSliderFilter
              title="قیمت (تومان)"
              min={1000000}
              max={10000000000}
              step={10000000}
              unit="تومان"
              onChange={({ min, max }) =>
                onFilterChange({ min_price: min, max_price: max })
              }
              initialMin={filters.min_price}
              initialMax={filters.max_price}
            />
          </div>
        </CollapsibleGroup>

        {/* محدوده متراژ */}
        <CollapsibleGroup title="محدوده متراژ" icon={Ruler} defaultOpen={false}>
          <div className="pt-2">
            <RangeSliderFilter
              title="متراژ (متر)"
              min={20}
              max={500}
              step={10}
              unit="متر"
              onChange={({ min, max }) =>
                onFilterChange({ min_area: min, max_area: max })
              }
              initialMin={filters.min_area}
              initialMax={filters.max_area}
            />
          </div>
        </CollapsibleGroup>

      </div>
    </aside>
  );
};

export default FilterSidebar;
