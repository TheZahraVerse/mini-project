import React from 'react'

export default function Field({ label, value, isFullWidth = false, className = '' }) {
  return (
    <div className={isFullWidth ? "md:col-span-2" : ""}>
      <div className={`flex flex-col gap-1 ${className}`}>
        <span className="text-xs text-gray-400">{label}</span>
        <div className="text-sm font-medium text-gray-700">
          {value || '—'}
        </div>
      </div>
    </div>
  )
}