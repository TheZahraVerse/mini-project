import React from 'react'

export default function Icon({ src , alt }) {
  return (
     <span>
        <img src={src} alt={alt} className="w-9"/>
    </span>
  )
}
