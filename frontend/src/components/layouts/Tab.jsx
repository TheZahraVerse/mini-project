import React from 'react'

export default function Tab({ label, children}) {
  return (
    <div className="bg-gray-300 rounded-xl shadow-l cursor-default overflow-hidden">
      {/* Tab Header */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
