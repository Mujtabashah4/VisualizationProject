"use client"

import { ReactNode } from "react"

interface IconBoxProps {
  icon: ReactNode
  color?: "primary" | "blue" | "purple" | "coral" | "teal"
  size?: "sm" | "md" | "lg"
  animated?: boolean
  className?: string
}

const colorStyles = {
  primary: {
    bg: "bg-gradient-to-br from-[#2A8E9E] to-[#2A8E9E]/90",
    shadow: "shadow-[0_4px_20px_rgba(42,142,158,0.25)]",
  },
  blue: {
    bg: "bg-gradient-to-br from-[#2A8E9E] to-[#2A8E9E]/80",
    shadow: "shadow-[0_4px_20px_rgba(42,142,158,0.25)]",
  },
  purple: {
    bg: "bg-gradient-to-br from-[#180039] to-[#180039]/90",
    shadow: "shadow-[0_4px_20px_rgba(24,0,57,0.3)]",
  },
  coral: {
    bg: "bg-gradient-to-br from-[#2A8E9E] to-[#2A8E9E]/90",
    shadow: "shadow-[0_4px_20px_rgba(42,142,158,0.25)]",
  },
  teal: {
    bg: "bg-gradient-to-br from-[#2A8E9E] to-[#2A8E9E]/90",
    shadow: "shadow-[0_4px_20px_rgba(42,142,158,0.25)]",
  },
}

const sizeStyles = {
  sm: "w-8 h-8 rounded-lg",
  md: "w-12 h-12 rounded-xl",
  lg: "w-16 h-16 rounded-2xl",
}

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
}

export function IconBox({
  icon,
  color = "primary",
  size = "md",
  animated = true,
  className = "",
}: IconBoxProps) {
  const styles = colorStyles[color]

  return (
    <div
      className={`
        ${sizeStyles[size]} ${styles.bg} ${styles.shadow}
        flex items-center justify-center text-white
        ${animated ? "hover:scale-110 transition-transform duration-300" : ""}
        ${className}
      `}
    >
      <span className={iconSizes[size]}>{icon}</span>
    </div>
  )
}

