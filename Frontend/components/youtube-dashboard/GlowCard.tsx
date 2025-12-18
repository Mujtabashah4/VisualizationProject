"use client"

import { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: "primary" | "blue" | "purple" | "coral" | "teal"
  delay?: number
}

export function GlowCard({ 
  children, 
  className = "", 
  glowColor = "primary",
  delay = 0 
}: GlowCardProps) {
  return (
    <Card 
      className={`hover-lift animate-slideUp glass-card bg-white overflow-hidden ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Card>
  )
}

