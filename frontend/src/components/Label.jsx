import React from 'react'

export default function Label({ text , bgColor , textColor}) {
  return (
    <span className={`p-2 rounded-full font-medium ${bgColor} ${textColor}`}>
      {text}
    </span>
  )
}
