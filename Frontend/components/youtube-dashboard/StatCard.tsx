"use client"

import { ReactNode } from "react"
import { AnimatedCounter } from "./AnimatedCounter"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: number
  icon?: ReactNode
  prefix?: string
  suffix?: string
  decimals?: number
  description?: string
  className?: string
  delay?: number
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

const cardVariants = [
  { bg: "stat-card-primary", icon: "bg-[#2A8E9E]", border: "border-[#2A8E9E]" },
  { bg: "stat-card-blue", icon: "bg-[#2A8E9E]", border: "border-[#2A8E9E]" },
  { bg: "stat-card-purple", icon: "bg-[#180039]", border: "border-[#180039]" },
  { bg: "stat-card-coral", icon: "bg-[#2A8E9E]", border: "border-[#2A8E9E]" },
  { bg: "stat-card-teal", icon: "bg-emerald-500", border: "border-emerald-500" },
  { bg: "stat-card-primary", icon: "bg-[#2A8E9E]", border: "border-[#2A8E9E]" },
]

export function StatCard({
  title,
  value,
  icon,
  prefix = "",
  suffix = "",
  decimals = 0,
  description,
  className = "",
  delay = 0,
  trend,
  trendValue,
}: StatCardProps) {
  const variantIndex = Math.floor((delay || 0) / 100) % cardVariants.length
  const variant = cardVariants[variantIndex]

  return (
    <Card
      className={`hover-lift animate-slideUp ${variant.bg} ${className} relative overflow-hidden group bg-white`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-7 relative">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">{title}</h3>
          </div>
          {icon && (
            <div className={`${variant.icon} p-3.5 rounded-2xl text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              {icon}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="text-4xl font-bold text-[#180039] tracking-tight">
            <AnimatedCounter
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          </div>
          {(description || trend) && (
            <div className="flex items-center justify-between pt-3 border-t border-[#E9F3F4]">
              {description && (
                <p className="text-xs text-[#666] font-semibold">{description}</p>
              )}
              {trend && (
                <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg ${
                  trend === "up" ? "text-emerald-600 bg-emerald-50" : 
                  trend === "down" ? "text-red-600 bg-red-50" : 
                  "text-[#666] bg-[#E9F3F4]"
                }`}>
                  <TrendingUp className={`w-4 h-4 ${trend === "down" ? "rotate-180" : ""}`} />
                  {trendValue}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

