import React, { useState, useEffect, useRef } from "react";

const CheckboxGroupFilter = ({ title, options, onChange, initialValues = [] }) => {
  const [selectedValues, setSelectedValues] = useState(initialValues);
  const debounceTimer = useRef(null);

  // Update state when initialValues changes from parent
  useEffect(() => {
    setSelectedValues(initialValues);
  }, [initialValues]);

  const handleChange = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    
    setSelectedValues(newValues);
    
    // Debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onChange(newValues);
    }, 300);
  };

  return (
    <div className="mb-5">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <div className="space-y-1.5">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroupFilter;