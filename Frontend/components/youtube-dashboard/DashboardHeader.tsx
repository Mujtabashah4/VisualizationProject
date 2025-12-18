"use client"

import { LiveIndicator } from "./LiveIndicator"
import { TrendingUp, Activity, Database, Award } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="relative bg-white border-b-2 border-[#E9F3F4] shadow-[0_4px_12px_rgba(42,142,158,0.15)] sticky top-0 z-50">
      {/* Strong separation border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2A8E9E] via-[#180039] to-[#2A8E9E]"></div>
      
      <div className="relative flex items-center justify-between px-6 md:px-10 py-5 max-w-[1800px] mx-auto">
        {/* Left Section - Logo & Title */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Premium Logo Design with Animations */}
          <div className="relative group z-10">
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#2A8E9E]/30 via-[#180039]/20 to-[#2A8E9E]/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
            
            {/* Main logo container */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#2A8E9E] via-[#2A8E9E] to-[#180039] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 overflow-hidden">
              {/* Animated shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Inner glow */}
              <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
              
              {/* Icon with premium styling */}
              <div className="relative z-10 flex items-center justify-center">
                <TrendingUp className="w-9 h-9 md:w-10 md:h-10 text-white drop-shadow-lg" />
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-br from-white/50 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-gradient-to-tr from-white/40 to-transparent rounded-tr-2xl"></div>
            </div>
            
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[#2A8E9E]/30 animate-ping-slow opacity-50"></div>
          </div>
          
          {/* Title Section */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent tracking-tight">
              <span className="font-black">ViralScope</span>
              <span className="text-[#666] font-normal ml-2 text-lg md:text-2xl">YouTube Trend Analytics</span>
            </h1>
            <p className="text-xs md:text-sm text-[#666] mt-2 flex items-center gap-2.5 font-medium flex-wrap">
              <Activity className="w-4 h-4 text-[#2A8E9E] flex-shrink-0" />
              <span className="whitespace-nowrap">Real-Time Analytics for</span>
              <span className="px-2 py-0.5 rounded-md bg-[#2A8E9E]/10 border border-[#2A8E9E]/20 font-bold text-[#180039]">4 Million</span>
              <span>Trending Videos Across</span>
              <span className="px-2 py-0.5 rounded-md bg-[#180039]/10 border border-[#180039]/20 font-bold text-[#180039]">113 Countries</span>
            </p>
          </div>
        </div>
        
        {/* Right Section - Stats & Timer */}
        <div className="flex items-center gap-3">
          {/* Stats Container */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Records Badge */}
            <div className="px-4 py-2.5 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 flex items-center gap-2.5 hover:bg-[#E9F3F4]/80 transition-colors">
              <div className="p-1.5 rounded-lg bg-[#2A8E9E]/10">
                <Database className="w-3.5 h-3.5 text-[#2A8E9E]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#180039] leading-tight">3.99M</span>
                <span className="text-[10px] text-[#666] uppercase tracking-wider">Records</span>
              </div>
            </div>
            
            {/* Quality Badge */}
            <div className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-500/20 flex items-center gap-2.5 hover:bg-emerald-50/80 transition-colors">
              <div className="p-1.5 rounded-lg bg-emerald-500/10">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#180039] leading-tight">98.7%</span>
                <span className="text-[10px] text-[#666] uppercase tracking-wider">Quality</span>
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-[1px] h-10 bg-[#E9F3F4]"></div>
          </div>
          
          {/* Live Timer */}
          <LiveIndicator />
        </div>
      </div>
      
      {/* Bottom border for separation */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E9F3F4]"></div>
    </header>
  )
}
