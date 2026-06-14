import React, { useState, useEffect, useRef } from "react";

const RadioGroupFilter = ({ title, name, options, onChange, initialValue = "" }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const debounceTimer = useRef(null);

  // Update when initialValue changes from parent
  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleChange = (value) => {
    setSelectedValue(value);
    
    // Debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onChange(value);
    }, 300);
  };

  return (
    <div className="mb-5">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={selectedValue === ""}
            onChange={() => handleChange("")}
            className="w-4 h-4 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">همه</span>
        </label>
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              className="w-4 h-4 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroupFilter;