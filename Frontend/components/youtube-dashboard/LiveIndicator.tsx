"use client"

/// <reference types="react" />
import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function LiveIndicator() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--:--"
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "--/--/----"
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border-2 border-[#2A8E9E]/20 shadow-md hover:shadow-lg transition-shadow">
      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F3797E]">
            <div className="absolute inset-0 rounded-full bg-[#F3797E] opacity-40 animate-ping"></div>
          </div>
        </div>
        <span className="text-[10px] font-bold text-[#F3797E] uppercase tracking-wider">
          LIVE
        </span>
      </div>
      
      {/* Divider */}
      <div className="w-[1px] h-8 bg-[#E9F3F4]"></div>
      
      {/* Time display */}
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-[#2A8E9E]/10">
          <Clock className="w-3.5 h-3.5 text-[#2A8E9E]" />
        </div>
        <div className="flex flex-col min-w-[75px]">
          <span className="text-xs font-bold text-[#180039] tabular-nums leading-tight">
            {mounted && currentTime ? formatTime(currentTime) : "--:--:--"}
          </span>
          <span className="text-[10px] text-[#666] font-semibold uppercase tracking-wider mt-0.5">
            {mounted && currentTime ? formatDate(currentTime) : "--/--/----"}
          </span>
        </div>
      </div>
    </div>
  )
}