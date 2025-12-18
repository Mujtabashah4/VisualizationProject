"use client"

import { Code2 } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="relative border-t border-[#E9F3F4] bg-white backdrop-blur-sm px-8 py-6 mt-auto">
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 text-sm text-[#666]">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#E9F3F4] border border-[#E9F3F4]">
            <Code2 className="w-4 h-4 text-[#2A8E9E]" />
            <span className="font-bold text-[#180039]">Group-5</span>
          </div>
          <span className="text-[#E9F3F4]">|</span>
          <span className="font-semibold text-[#180039]">Syed Muhammad Mujtaba & Abdul Moeed</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-[#666]">
          <span className="px-4 py-2 rounded-xl bg-[#E9F3F4] border border-[#E9F3F4] font-bold text-[#180039]">
            AI622 - Data Science & Visualization
          </span>
        </div>
      </div>
    </footer>
  )
}
