import React from "react";

export default function Tab({ label, children }) {
  return (
    <div className="bg-gray-100 min-h-screen rounded-xl shadow-lg overflow-hidden">
      <div className="bg-white px-6 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}