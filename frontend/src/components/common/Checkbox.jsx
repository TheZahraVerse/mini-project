import React from "react";

const Checkbox = ({ checked, onChange, disabled = false, className = "" }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`w-4 h-4 rounded border-gray-300 text-blue-500 cursor-pointer disabled:opacity-50 ${className}`}
    />
  );
};

export default Checkbox;