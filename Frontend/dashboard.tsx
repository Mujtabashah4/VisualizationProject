"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/youtube-dashboard/DashboardHeader"
import { DashboardFooter } from "@/components/youtube-dashboard/DashboardFooter"
import { Tab1ExecutiveOverview } from "@/components/youtube-dashboard/Tab1ExecutiveOverview"
import { Tab2GeographicIntelligence } from "@/components/youtube-dashboard/Tab2GeographicIntelligence"
import { Tab3TemporalAnalytics } from "@/components/youtube-dashboard/Tab3TemporalAnalytics"
import { Tab4EngagementAnalytics } from "@/components/youtube-dashboard/Tab4EngagementAnalytics"
import { Tab5VideoPredictor } from "@/components/youtube-dashboard/Tab5VideoPredictor"
import { BarChart2, Globe, Calendar, Lightbulb, Sparkles } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen flex flex-col dashboard-bg relative">
      {/* Animated background elements */}
      <div className="gradient-orb gradient-orb-1"></div>
      <div className="gradient-orb gradient-orb-2"></div>
      <div className="gradient-orb gradient-orb-3"></div>
      <div className="grid-pattern"></div>
      
      <DashboardHeader />
      
      <main className="flex-1 overflow-auto relative z-20">
        <div className="container mx-auto px-8 py-10 max-w-[1600px]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-10 bg-[#E9F3F4] p-2.5 rounded-2xl border border-[#E9F3F4] shadow-sm outline-none gap-2">
              <TabsTrigger
                value="overview" 
                className="relative flex items-center justify-center gap-2.5 h-full min-h-[44px] data-[state=active]:bg-[#2A8E9E] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-[#666] transition-all rounded-xl font-semibold px-5 py-0 text-sm outline-none focus:outline-none focus-visible:outline-none border-0 whitespace-nowrap isolate"
              >
                <BarChart2 className="h-4 w-4 flex-shrink-0 relative z-10" />
                <span className="relative z-10 leading-none">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="geographic" 
                className="relative flex items-center justify-center gap-2.5 h-full min-h-[44px] data-[state=active]:bg-[#2A8E9E] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-[#666] transition-all rounded-xl font-semibold px-5 py-0 text-sm outline-none focus:outline-none focus-visible:outline-none border-0 whitespace-nowrap isolate"
              >
                <Globe className="h-4 w-4 flex-shrink-0 relative z-10" />
                <span className="relative z-10 leading-none">Geographic</span>
              </TabsTrigger>
              <TabsTrigger
                value="temporal" 
                className="relative flex items-center justify-center gap-2.5 h-full min-h-[44px] data-[state=active]:bg-[#2A8E9E] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-[#666] transition-all rounded-xl font-semibold px-5 py-0 text-sm outline-none focus:outline-none focus-visible:outline-none border-0 whitespace-nowrap isolate"
              >
                <Calendar className="h-4 w-4 flex-shrink-0 relative z-10" />
                <span className="relative z-10 leading-none">Temporal</span>
              </TabsTrigger>
              <TabsTrigger
                value="engagement" 
                className="relative flex items-center justify-center gap-2.5 h-full min-h-[44px] data-[state=active]:bg-[#2A8E9E] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-[#666] transition-all rounded-xl font-semibold px-5 py-0 text-sm outline-none focus:outline-none focus-visible:outline-none border-0 whitespace-nowrap isolate"
              >
                <Lightbulb className="h-4 w-4 flex-shrink-0 relative z-10" />
                <span className="relative z-10 leading-none">Engagement</span>
              </TabsTrigger>
              <TabsTrigger 
                value="predictor" 
                className="relative flex items-center justify-center gap-2.5 h-full min-h-[44px] data-[state=active]:bg-[#2A8E9E] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-[#666] transition-all rounded-xl font-semibold px-5 py-0 text-sm outline-none focus:outline-none focus-visible:outline-none border-0 whitespace-nowrap isolate"
              >
                <Sparkles className="h-4 w-4 flex-shrink-0 relative z-10" />
                <span className="relative z-10 leading-none">Predictor</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="tab-content mt-0 animate-fadeIn">
              <Tab1ExecutiveOverview />
            </TabsContent>

            <TabsContent value="geographic" className="tab-content mt-0 animate-fadeIn">
              <Tab2GeographicIntelligence />
            </TabsContent>

            <TabsContent value="temporal" className="tab-content mt-0 animate-fadeIn">
              <Tab3TemporalAnalytics />
            </TabsContent>

            <TabsContent value="engagement" className="tab-content mt-0 animate-fadeIn">
              <Tab4EngagementAnalytics />
            </TabsContent>

            <TabsContent value="predictor" className="tab-content mt-0 animate-fadeIn">
              <Tab5VideoPredictor />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <DashboardFooter />
    </div>
  )
}
