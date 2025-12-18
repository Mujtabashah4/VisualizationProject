"use client"

import { useEffect, useState } from "react"

interface AnimatedProgressBarProps {
  value: number
  max?: number
  color?: "primary" | "blue" | "purple" | "coral" | "teal" | "gradient"
  showValue?: boolean
  label?: string
  height?: "sm" | "md" | "lg"
  animate?: boolean
  className?: string
}

const colorClasses = {
  primary: "bg-[#1d3461]",
  blue: "bg-[#2a4a7f]",
  purple: "bg-[#fb8b24]",
  coral: "bg-[#ffc15e]",
  teal: "bg-[#9cc5a1]",
  gradient: "bg-gradient-to-r from-[#1d3461] via-[#fb8b24] to-[#ffc15e]",
}

const heightClasses = {
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
}

export function AnimatedProgressBar({
  value,
  max = 100,
  color = "gradient",
  showValue = true,
  label,
  height = "md",
  animate = true,
  className = "",
}: AnimatedProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    if (animate) {
      const duration = 1500
      const startTime = Date.now()
      
      const animateValue = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(percentage * easeOut)
        
        if (progress < 1) {
          requestAnimationFrame(animateValue)
        }
      }
      
      requestAnimationFrame(animateValue)
    } else {
      setDisplayValue(percentage)
    }
  }, [percentage, animate])

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showValue && (
            <span className="text-sm font-bold bg-gradient-to-r from-[#1d3461] to-[#fb8b24] bg-clip-text text-transparent">
              {displayValue.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: `${displayValue}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}

