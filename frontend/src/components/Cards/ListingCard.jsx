import React from 'react'

export default function ListingCard({listing}) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      reviewed: { color: 'bg-yellow-100 text-yellow-800', label: 'بررسی شده' },
      contacted: { color: 'bg-blue-100 text-blue-800', label: 'تماس گرفته شده' },
      converted: { color: 'bg-green-100 text-green-800', label: 'تبدیل شده' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'رد شده' },
    }
    const config = statusConfig[status] || statusConfig.reviewed
    return <span className={`px-2 py-1 rounded-full text-xs ${config.color}`}>{config.label}</span>
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-emerald-500 text-white'     // great
    if (score >= 60) return 'bg-emerald-400 text-white'     // so good
    if (score >= 40) return 'bg-yellow-500 text-white'      // good
    if (score >= 20) return 'bg-orange-500 text-white'      // bad
    return 'bg-red-500 text-white'                           // so bad
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className={`text-2xl font-bold px-3 py-1 rounded-full ${getScoreColor(listing.score)}`}>
          {listing.score}
        </div>
        {getStatusBadge(listing.status)}
      </div>
      
      <h3 className="text-lg font-bold mb-1">{listing.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{listing.area}</p>
      
      <div className="mt-2 pt-2 border-t">
        <p className="text-lg font-bold text-blue-600">
          {listing.price?.toLocaleString()} تومان
        </p>
      </div>
      
      <div className="mt-4 text-left">
        <button className="text-blue-500 text-sm hover:text-blue-900 cursor-pointer transition-colors">
          جزئیات بیشتر ←
        </button>
      </div>
    </div>
  )
}

