"use client"

import { ReactNode } from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricBadgeProps {
  value: number
  label?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  icon?: ReactNode
  color?: "primary" | "blue" | "purple" | "coral" | "teal" | "success" | "warning"
  size?: "sm" | "md" | "lg"
  className?: string
}

const colorStyles = {
  primary: {
    bg: "bg-[#1d3461]/10",
    text: "text-[#1d3461]",
    border: "border-[#1d3461]/30",
  },
  blue: {
    bg: "bg-[#2a4a7f]/10",
    text: "text-[#2a4a7f]",
    border: "border-[#2a4a7f]/30",
  },
  purple: {
    bg: "bg-[#fb8b24]/10",
    text: "text-[#fb8b24]",
    border: "border-[#fb8b24]/30",
  },
  coral: {
    bg: "bg-[#ffc15e]/10",
    text: "text-[#d4a73a]",
    border: "border-[#ffc15e]/30",
  },
  teal: {
    bg: "bg-[#9cc5a1]/10",
    text: "text-[#5a8f60]",
    border: "border-[#9cc5a1]/30",
  },
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/30",
  },
  warning: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500/30",
  },
}

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
}

export function MetricBadge({
  value,
  label,
  trend,
  trendValue,
  icon,
  color = "primary",
  size = "md",
  className = "",
}: MetricBadgeProps) {
  const styles = colorStyles[color]

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <div
      className={`
        inline-flex items-center gap-2 rounded-full border
        ${styles.bg} ${styles.border} ${sizeStyles[size]}
        hover:scale-105 transition-transform duration-200
        ${className}
      `}
    >
      {icon && <span className={styles.text}>{icon}</span>}
      <span className={`font-bold ${styles.text}`}>{value.toLocaleString()}</span>
      {label && <span className="text-muted-foreground">{label}</span>}
      {trend && (
        <span className={`flex items-center gap-0.5 ${
          trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
        }`}>
          <TrendIcon className="h-3 w-3" />
          {trendValue && <span className="text-xs">{trendValue}</span>}
        </span>
      )}
    </div>
  )
}

