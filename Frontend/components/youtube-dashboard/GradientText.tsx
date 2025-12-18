"use client"

import { ReactNode } from "react"

interface GradientTextProps {
  children: ReactNode
  variant?: "primary" | "blue" | "purple" | "coral" | "rainbow"
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  animated?: boolean
}

const gradients = {
  primary: "from-[#1d3461] via-[#fb8b24] to-[#ffc15e]",
  blue: "from-[#1d3461] via-[#2a4a7f] to-[#1d3461]",
  purple: "from-[#fb8b24] via-[#ffc15e] to-[#fb8b24]",
  coral: "from-[#ffc15e] via-[#c5d86d] to-[#ffc15e]",
  rainbow: "from-[#1d3461] via-[#fb8b24] via-[#ffc15e] via-[#c5d86d] to-[#9cc5a1]",
}

export function GradientText({
  children,
  variant = "primary",
  as: Component = "span",
  className = "",
  animated = false,
}: GradientTextProps) {
  return (
    <Component
      className={`
        bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent
        ${animated ? "bg-[length:200%_auto] animate-gradient-x" : ""}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}

