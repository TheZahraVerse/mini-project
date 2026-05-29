import React from 'react'

export default function Label({ text, bgColor, textColor, className = '' }) {
  return (
    <span className={`px-4 py-1  rounded-full text-base font-medium ${bgColor} ${textColor} ${className}`}>
      {text}
    </span>
  )
}