import React, { useState, useEffect, useRef } from "react";
import Checkbox from "../common/Checkbox";

const CheckboxGroupFilter = ({ title, options, onChange, initialValues = [] }) => {
  const [selectedValues, setSelectedValues] = useState(initialValues);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setSelectedValues(initialValues);
  }, [initialValues]);

  const handleChange = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);

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
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroupFilter;