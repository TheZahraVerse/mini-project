import React, { useState, useEffect } from "react";

const RangeSliderFilter = ({ title, min, max, step, unit, onChange, initialMin, initialMax }) => {
  const [localMin, setLocalMin] = useState(initialMin !== undefined ? initialMin : min);
  const [localMax, setLocalMax] = useState(initialMax !== undefined ? initialMax : max);

  useEffect(() => {
    setLocalMin(initialMin !== undefined ? initialMin : min);
    setLocalMax(initialMax !== undefined ? initialMax : max);
  }, [initialMin, initialMax, min, max]);

  const formatValue = (value) => {
    if (unit === "تومان" && value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)} میلیارد`;
    }
    if (unit === "تومان" && value >= 1000000) {
      return `${(value / 1000000).toFixed(0)} میلیون`;
    }
    return value.toLocaleString();
  };

  const handleMinChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value)) value = min;
    value = Math.min(value, localMax);
    value = Math.max(min, value);
    setLocalMin(value);
  };

  const handleMaxChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value)) value = max;
    value = Math.max(value, localMin);
    value = Math.min(max, value);
    setLocalMax(value);
  };

  const handleApply = () => {
    onChange({ min: localMin, max: localMax });
  };

  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      
      {/* نمایش مقادیر */}
      <div className="flex justify-between items-center gap-2 mb-3">
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-400">حداقل</span>
          <p className="text-sm font-bold text-gray-800">{formatValue(localMin)}</p>
        </div>
        <span className="text-gray-300">—</span>
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-400">حداکثر</span>
          <p className="text-sm font-bold text-gray-800">{formatValue(localMax)}</p>
        </div>
      </div>

      {/* اسلایدر حداقل */}
      <div className="mb-2">
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>حداقل</span>
          <span>{formatValue(localMin)}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={handleMinChange}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* اسلایدر حداکثر */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>حداکثر</span>
          <span>{formatValue(localMax)}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={handleMaxChange}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* دکمه اعمال */}
      <button
        onClick={handleApply}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
      >
        اعمال {title}
      </button>
    </div>
  );
};

export default RangeSliderFilter;