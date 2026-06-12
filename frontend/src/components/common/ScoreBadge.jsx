import React from "react"

const ScoreBadge = ({ score, size = "md" }) => {
  
  // Get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return "bg-emerald-500"
    if (score >= 60) return "bg-blue-500"
    if (score >= 40) return "bg-amber-500"
    if (score >= 20) return "bg-orange-500"
    return "bg-red-500"
  }

  // Size configurations
  const sizes = {
    sm: "w-14 h-14",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  }

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  }

  const labelSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  }

  const color = getScoreColor(score)
  const sizeClass = sizes[size] || sizes.md
  const textSize = textSizes[size] || textSizes.md
  const labelSize = labelSizes[size] || labelSizes.md

  return (
    <div className={`shrink-0 ${sizeClass} ${color} rounded-full flex flex-col items-center justify-center font-bold text-white shadow-md`}>
      <span className={textSize}>{score}</span>
      <span className={`${labelSize} opacity-90`}>امتیاز</span>
    </div>
  )
}

export default ScoreBadge