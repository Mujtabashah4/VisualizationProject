"use client"

/// <reference types="react" />
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, TrendingUp, Award, Star, MapPin, BarChart3, Languages, Users, Video } from "lucide-react"
import { GlowCard } from "./GlowCard"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  ComposedChart,
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
} from "recharts"

const countryData = [
  { rank: 1, country: "Russia", videos: 35508, avgViews: 4.2, engagement: 3.8, starRating: 5 },
  { rank: 2, country: "Thailand", videos: 35489, avgViews: 3.9, engagement: 4.1, starRating: 5 },
  { rank: 3, country: "France", videos: 35420, avgViews: 3.8, engagement: 3.5, starRating: 4 },
  { rank: 4, country: "Spain", videos: 35350, avgViews: 3.7, engagement: 3.6, starRating: 4 },
  { rank: 5, country: "Germany", videos: 35280, avgViews: 4.1, engagement: 3.4, starRating: 4 },
  { rank: 6, country: "Japan", videos: 35150, avgViews: 5.2, engagement: 4.2, starRating: 5 },
  { rank: 7, country: "Brazil", videos: 34980, avgViews: 3.5, engagement: 4.5, starRating: 5 },
  { rank: 8, country: "Mexico", videos: 34850, avgViews: 3.2, engagement: 4.0, starRating: 4 },
  { rank: 9, country: "India", videos: 34720, avgViews: 6.5, engagement: 3.9, starRating: 5 },
  { rank: 10, country: "Indonesia", videos: 34600, avgViews: 4.8, engagement: 4.3, starRating: 5 },
  { rank: 11, country: "South Korea", videos: 34450, avgViews: 5.8, engagement: 4.0, starRating: 5 },
  { rank: 12, country: "United States", videos: 34300, avgViews: 8.5, engagement: 3.2, starRating: 5 },
  { rank: 13, country: "United Kingdom", videos: 34150, avgViews: 5.2, engagement: 3.3, starRating: 4 },
  { rank: 14, country: "Italy", videos: 33980, avgViews: 3.4, engagement: 3.7, starRating: 4 },
  { rank: 15, country: "Poland", videos: 33850, avgViews: 2.9, engagement: 3.9, starRating: 4 },
  { rank: 16, country: "Turkey", videos: 33700, avgViews: 4.5, engagement: 4.1, starRating: 4 },
  { rank: 17, country: "Argentina", videos: 33550, avgViews: 2.8, engagement: 4.2, starRating: 4 },
  { rank: 18, country: "Canada", videos: 33400, avgViews: 4.8, engagement: 3.1, starRating: 4 },
  { rank: 19, country: "Australia", videos: 33250, avgViews: 4.2, engagement: 3.4, starRating: 4 },
  { rank: 20, country: "Netherlands", videos: 33100, avgViews: 3.1, engagement: 3.6, starRating: 3 },
]

// Premium Finpay color palette
const COLORS = ["#2A8E9E", "#180039", "#2A8E9E", "#180039", "#2A8E9E", "#E9F3F4"]

const getColor = (value: number, maxValue: number) => {
  const ratio = value / maxValue
  if (ratio > 0.8) return "#2A8E9E"
  if (ratio > 0.6) return "#180039"
  if (ratio > 0.4) return "#2A8E9E"
  return "#E9F3F4"
}

// Star Rating Component
function StarRating({ rating, size = "sm" }: { rating: number, size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating 
              ? "fill-[#FFD700] text-[#FFD700]" 
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

// Top Countries Summary
const topCountriesSummary = [
  { country: "United States", metric: "Avg Views", value: "8.5M", starRating: 5, trend: "+12%" },
  { country: "India", metric: "Avg Views", value: "6.5M", starRating: 5, trend: "+18%" },
  { country: "South Korea", metric: "Avg Views", value: "5.8M", starRating: 5, trend: "+15%" },
  { country: "Japan", metric: "Engagement", value: "4.2%", starRating: 5, trend: "+8%" },
  { country: "Brazil", metric: "Engagement", value: "4.5%", starRating: 5, trend: "+22%" },
]

// Regional Distribution
const regionalData = [
  { region: "Asia-Pacific", videos: 1250000, percentage: 31.3, color: "#2A8E9E" },
  { region: "Europe", videos: 1100000, percentage: 27.5, color: "#180039" },
  { region: "Americas", videos: 950000, percentage: 23.8, color: "#2A8E9E" },
  { region: "Middle East", videos: 450000, percentage: 11.3, color: "#E9F3F4" },
  { region: "Africa", videos: 250000, percentage: 6.3, color: "#2A8E9E" },
]

// Language Distribution Data (from EDA)
const languageData = [
  { language: "English", videos: 893645, percentage: 40.2, avgViews: 8.2, starRating: 5 },
  { language: "Arabic", videos: 284456, percentage: 12.8, avgViews: 4.1, starRating: 4 },
  { language: "Spanish", videos: 191587, percentage: 8.6, avgViews: 5.9, starRating: 5 },
  { language: "Russian", videos: 104445, percentage: 4.7, avgViews: 3.7, starRating: 4 },
  { language: "Korean", videos: 89694, percentage: 4.0, avgViews: 12.4, starRating: 5 },
  { language: "Portuguese", videos: 78234, percentage: 3.5, avgViews: 4.5, starRating: 4 },
  { language: "French", videos: 65432, percentage: 2.9, avgViews: 5.2, starRating: 4 },
  { language: "Hindi", videos: 52341, percentage: 2.4, avgViews: 6.8, starRating: 5 },
  { language: "Japanese", videos: 45678, percentage: 2.1, avgViews: 7.2, starRating: 4 },
  { language: "Turkish", videos: 38901, percentage: 1.7, avgViews: 4.3, starRating: 3 },
  { language: "Others", videos: 456727, percentage: 20.5, avgViews: 3.5, starRating: 3 },
]

// Content Diversity Data (Unique Videos vs Channels)
const contentDiversityData = [
  { country: "US", uniqueVideos: 285000, uniqueChannels: 12500, ratio: 22.8, starRating: 5 },
  { country: "IN", uniqueVideos: 198000, uniqueChannels: 9800, ratio: 20.2, starRating: 5 },
  { country: "BR", uniqueVideos: 145000, uniqueChannels: 7200, ratio: 20.1, starRating: 4 },
  { country: "RU", uniqueVideos: 132000, uniqueChannels: 6500, ratio: 20.3, starRating: 4 },
  { country: "JP", uniqueVideos: 128000, uniqueChannels: 5800, ratio: 22.1, starRating: 5 },
  { country: "KR", uniqueVideos: 115000, uniqueChannels: 5200, ratio: 22.1, starRating: 5 },
  { country: "GB", uniqueVideos: 108000, uniqueChannels: 5100, ratio: 21.2, starRating: 4 },
  { country: "DE", uniqueVideos: 98000, uniqueChannels: 4800, ratio: 20.4, starRating: 4 },
  { country: "FR", uniqueVideos: 95000, uniqueChannels: 4600, ratio: 20.7, starRating: 4 },
  { country: "ES", uniqueVideos: 88000, uniqueChannels: 4200, ratio: 21.0, starRating: 4 },
]

export function Tab2GeographicIntelligence() {
  const [selectedMetric, setSelectedMetric] = useState("videos")

  const getDataKey = () => {
    switch (selectedMetric) {
      case "videos":
        return "videos"
      case "avgViews":
        return "avgViews"
      case "engagement":
        return "engagement"
      default:
        return "videos"
    }
  }

  const getLabel = () => {
    switch (selectedMetric) {
      case "videos":
        return "Video Count"
      case "avgViews":
        return "Average Views (M)"
      case "engagement":
        return "Engagement Rate (%)"
      default:
        return "Video Count"
    }
  }

  const top20Data = countryData.slice(0, 20)
  const maxValue = Math.max(...top20Data.map((d) => d[getDataKey() as keyof typeof d] as number))

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Premium Enhanced Header Section */}
      <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A8E9E]/10 via-[#180039]/5 to-[#2A8E9E]/10 p-8 border-2 border-[#2A8E9E]/20">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#2A8E9E]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#180039]/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-xl transform hover:scale-110 transition-transform duration-300">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#E9F3F4] border border-[#2A8E9E]/20 mb-3">
                <span className="text-xs font-bold text-[#2A8E9E] uppercase tracking-widest">GLOBAL ANALYSIS</span>
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-[#180039] via-[#2A8E9E] to-[#180039] bg-clip-text text-transparent mb-3">
                Geographic Intelligence
              </h2>
              <p className="text-lg text-[#666]">Comprehensive analysis of trending patterns across 113 countries worldwide</p>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#666] uppercase">Countries</span>
              </div>
              <div className="text-2xl font-bold text-[#180039]">113</div>
              <div className="text-xs text-[#666] mt-1">Global coverage</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <Video className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#666] uppercase">Videos</span>
              </div>
              <div className="text-2xl font-bold text-[#180039]">700K+</div>
              <div className="text-xs text-[#666] mt-1">Trending videos</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <Languages className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#666] uppercase">Languages</span>
              </div>
              <div className="text-2xl font-bold text-[#180039]">175</div>
              <div className="text-xs text-[#666] mt-1">Diverse content</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#666] uppercase">Peak Views</span>
              </div>
              <div className="text-2xl font-bold text-[#180039]">8.5M</div>
              <div className="text-xs text-[#666] mt-1">US average</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Countries Summary Cards with Stars - Enhanced */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {topCountriesSummary.map((country, index) => (
          <GlowCard key={index} glowColor="primary" delay={100 + index * 50} className="card-3d group">
            <CardContent className="p-6 relative overflow-hidden bg-gradient-to-br from-white to-[#E9F3F4]/30">
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2A8E9E]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <StarRating rating={country.starRating} size="sm" />
                </div>
                <div className="mb-3">
                  <p className="text-xs font-bold text-[#666] uppercase tracking-wider mb-1">{country.country}</p>
                  <p className="text-xs text-[#666]">{country.metric}</p>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent mb-3">
                  {country.value}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  <span className="text-xs text-emerald-600 font-bold">{country.trend}</span>
                </div>
              </div>
            </CardContent>
          </GlowCard>
        ))}
      </div>

      {/* Controls and Regional Overview - Enhanced */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Controls - Enhanced */}
        <GlowCard glowColor="primary" delay={300} className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2A8E9E]/10 to-transparent rounded-full blur-2xl"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#2A8E9E] to-[#180039]">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-[#180039]">Select Metric</CardTitle>
            </div>
            <CardDescription className="text-[#666]">Choose visualization metric</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-full border-2 border-[#E9F3F4] outline-none focus:outline-none focus:ring-2 focus:ring-[#2A8E9E] focus:ring-offset-0 hover:border-[#2A8E9E]/40 transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-[#E9F3F4]">
                <SelectItem value="videos" className="hover:bg-[#E9F3F4]">Video Count</SelectItem>
                <SelectItem value="avgViews" className="hover:bg-[#E9F3F4]">Average Views</SelectItem>
                <SelectItem value="engagement" className="hover:bg-[#E9F3F4]">Engagement Rate</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </GlowCard>

        {/* Regional Distribution - Enhanced */}
        <GlowCard glowColor="purple" delay={350} className="lg:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-[#180039]">Regional Distribution</CardTitle>
                <CardDescription className="text-[#666] mt-2">Video distribution by global regions</CardDescription>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={regionalData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={(entry: any) => `${entry.region}\n${entry.percentage}%`}
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={2}
                  fill="#8884d8"
                  dataKey="percentage"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(42, 142, 158, 0.95)",
                    border: "1px solid #2A8E9E",
                    borderRadius: "12px",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(42, 142, 158, 0.2)"
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    `${value}%`,
                    props.payload.region
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {regionalData.map((region, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-xl bg-gradient-to-br from-[#E9F3F4] to-white border border-[#2A8E9E]/20 hover:shadow-md transition-all text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <span className="text-xs font-bold text-[#180039]">{region.region}</span>
                  </div>
                  <div className="text-lg font-bold text-[#2A8E9E]">{region.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </GlowCard>
      </div>

      {/* Main Chart with 3D Effect */}
      <GlowCard glowColor="primary" delay={400}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-[#180039]">Top 20 Countries - {getLabel()}</CardTitle>
              <CardDescription className="text-sm mt-2 text-[#666]">Interactive visualization with star ratings</CardDescription>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E9F3F4]">
              <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
              <span className="text-xs font-semibold text-[#180039]">Top Performers</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 600 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={top20Data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#180039" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                <XAxis type="number" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                <YAxis
                  dataKey="country"
                  type="category"
                  width={110}
                  tick={{ fontSize: 11 }}
                  stroke="#2A8E9E"
                  fontWeight={600}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(42, 142, 158, 0.95)",
                    border: "1px solid #2A8E9E",
                    borderRadius: "12px",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                  }}
                  formatter={(value: number | undefined) => {
                    if (value === undefined) return "0"
                    if (selectedMetric === "avgViews") return `${value}M`
                    if (selectedMetric === "engagement") return `${value}%`
                    return value.toLocaleString()
                  }}
                />
                <Bar
                  dataKey={getDataKey()}
                  fill="url(#barGradient)"
                  animationDuration={1000}
                  radius={[0, 12, 12, 0]}
                >
                  {top20Data.map((entry, index) => {
                    const value = entry[getDataKey() as keyof typeof entry] as number
                    const height = (value / maxValue) * 100
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={getColor(value, maxValue)}
                        style={{
                          filter: `drop-shadow(0 ${height * 0.1}px ${height * 0.2}px rgba(42, 142, 158, 0.4))`,
                          transform: `translateZ(${height * 0.5}px)`,
                          transition: "all 0.3s ease",
                        }}
                      />
                    )
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </GlowCard>

      {/* Enhanced Data Table with Stars */}
      <GlowCard glowColor="purple" delay={500}>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#180039]">Country Rankings & Performance</CardTitle>
          <CardDescription className="text-[#666]">Detailed metrics with star ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E9F3F4] bg-[#E9F3F4]/50">
                  <th className="text-left p-4 font-bold text-[#180039]">Rank</th>
                  <th className="text-left p-4 font-bold text-[#180039]">Country</th>
                  <th className="text-right p-4 font-bold text-[#180039]">Videos</th>
                  <th className="text-right p-4 font-bold text-[#180039]">Avg Views (M)</th>
                  <th className="text-right p-4 font-bold text-[#180039]">Engagement (%)</th>
                  <th className="text-center p-4 font-bold text-[#180039]">Rating</th>
                </tr>
              </thead>
              <tbody>
                {top20Data.map((row, index) => (
                  <tr 
                    key={row.rank} 
                    className="border-b border-[#E9F3F4] hover:bg-[#E9F3F4]/50 transition-colors group"
                    style={{ 
                      transform: "translateZ(0)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <td className="p-4 font-bold text-[#180039]">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">#{row.rank}</span>
                        {row.rank <= 3 && (
                          <Award className="w-4 h-4 text-[#FFD700]" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#180039]">{row.country}</td>
                    <td className="p-4 text-right text-[#180039]">{row.videos.toLocaleString()}</td>
                    <td className="p-4 text-right text-[#180039] font-semibold">{row.avgViews}M</td>
                    <td className="p-4 text-right text-[#180039] font-semibold">{row.engagement}%</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center gap-1">
                  <StarRating rating={row.starRating} size="sm" />
                  {row.rank <= 3 && (
                    <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700] animate-star-twinkle" />
                  )}
                </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </GlowCard>

      {/* Language Distribution Chart */}
      <GlowCard glowColor="primary" delay={600}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <Languages className="w-5 h-5 text-[#2A8E9E]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">Language Distribution</CardTitle>
              <CardDescription className="text-[#666]">Top languages by trending video count - English leads but represents only ~40%</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={languageData.slice(0, 10)}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <defs>
                <linearGradient id="langGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#180039" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis 
                dataKey="language" 
                angle={-45}
                textAnchor="end"
                height={80}
                stroke="#2A8E9E"
                fontSize={11}
                fontWeight={600}
              />
              <YAxis stroke="#2A8E9E" fontSize={12} fontWeight={600} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(42, 142, 158, 0.95)",
                  border: "1px solid #2A8E9E",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar 
                dataKey="videos" 
                fill="url(#langGradient)"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              >
                {languageData.slice(0, 10).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.starRating === 5 ? "#2A8E9E" : entry.starRating === 4 ? "#180039" : "#E9F3F4"}
                    style={{
                      filter: `drop-shadow(0 4px 8px rgba(42, 142, 158, 0.3))`,
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
            {languageData.slice(0, 5).map((lang, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#180039]">{lang.language}</span>
                  <StarRating rating={lang.starRating} size="sm" />
                </div>
                <div className="text-lg font-bold text-[#2A8E9E]">{lang.percentage}%</div>
                <div className="text-xs text-[#666]">{lang.avgViews}M avg views</div>
              </div>
            ))}
          </div>
        </CardContent>
      </GlowCard>

      {/* Content Diversity: Unique Videos vs Channels */}
      <GlowCard glowColor="purple" delay={650}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <Users className="w-5 h-5 text-[#2A8E9E]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">Content Diversity Analysis</CardTitle>
              <CardDescription className="text-[#666]">Relationship between unique videos and unique channels per country</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
            >
              <defs>
                <linearGradient id="scatterGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#180039" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis 
                type="number" 
                dataKey="uniqueChannels" 
                name="Unique Channels"
                label={{ value: "Unique Channels", position: "insideBottom", offset: -5 }}
                stroke="#2A8E9E"
                fontSize={12}
                fontWeight={600}
              />
              <YAxis 
                type="number" 
                dataKey="uniqueVideos" 
                name="Unique Videos"
                label={{ value: "Unique Videos", angle: -90, position: "insideLeft" }}
                stroke="#2A8E9E"
                fontSize={12}
                fontWeight={600}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(42, 142, 158, 0.95)",
                  border: "1px solid #2A8E9E",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                }}
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value: number, name: string) => [value.toLocaleString(), name]}
              />
              <Scatter 
                name="Countries" 
                data={contentDiversityData} 
                fill="url(#scatterGradient)"
              >
                {contentDiversityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.starRating === 5 ? "#2A8E9E" : entry.starRating === 4 ? "#180039" : "#E9F3F4"}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          
          {/* Graph Explanation */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
            <ul className="text-xs text-[#666] space-y-1 list-disc list-inside mb-3">
              <li><strong className="text-[#2A8E9E]">Content Diversity Relationship:</strong> Scatter plot showing correlation between unique channels and unique videos per country</li>
              <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Strong positive correlation - countries with more channels have more unique videos (ratio: 20-23 videos per channel)</li>
              <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Scatter plot analysis reveals geographic content diversity patterns - shows ecosystem health by country</li>
            </ul>
            <p className="text-sm text-[#666] leading-relaxed">
              <strong className="text-[#180039]">Insight:</strong> The scatter plot reveals a strong positive correlation between unique channels and unique videos. 
              Countries with more diverse channel ecosystems tend to have more unique trending content. 
              The ratio (videos per channel) ranges from 20-23, indicating consistent content production patterns across countries.
            </p>
          </div>
        </CardContent>
      </GlowCard>

      {/* Enhanced Regional Performance Comparison */}
      <GlowCard glowColor="primary" delay={700}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-[#180039]">Regional Performance Comparison</CardTitle>
                <CardDescription className="text-[#666]">Visual comparison of regional metrics</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            {regionalData.map((region, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20 hover:shadow-xl hover:scale-105 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#2A8E9E]/10 to-transparent rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full shadow-md"
                        style={{ backgroundColor: region.color }}
                      ></div>
                      <span className="font-bold text-[#180039]">{region.region}</span>
                    </div>
                    <span className="text-2xl font-bold text-[#2A8E9E]">{region.percentage}%</span>
                  </div>
                  <div className="text-sm text-[#666] mb-3">{region.videos.toLocaleString()} videos</div>
                  <div className="w-full h-3 bg-[#E9F3F4] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 group-hover:scale-105"
                      style={{ 
                        width: `${region.percentage}%`,
                        backgroundColor: region.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </GlowCard>

      {/* Key Insights with Visual Stats - Enhanced */}
      <GlowCard glowColor="teal" delay={750}>
        <CardHeader className="bg-gradient-to-r from-[#2A8E9E]/5 to-[#180039]/5 border-b border-[#E9F3F4]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent">
                Key Geographic Insights
              </CardTitle>
              <CardDescription className="text-[#666] mt-2">Critical discoveries from global analysis</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-bold text-[#180039] text-xl flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFD700]" />
                Top Performers
              </h4>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20 hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#2A8E9E] to-[#180039]">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#180039] text-lg">United States</p>
                        <p className="text-xs text-[#666]">Highest avg views globally</p>
                      </div>
                    </div>
                    <StarRating rating={5} size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-[#2A8E9E] mb-1">8.5M</div>
                      <div className="text-xs text-[#666]">Average views</div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                      <div className="text-xs font-bold text-[#666] uppercase mb-1">Rank</div>
                      <div className="text-xl font-bold text-[#180039]">#12</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20 hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#180039] text-lg">Brazil</p>
                        <p className="text-xs text-[#666]">Highest engagement rate</p>
                      </div>
                    </div>
                    <StarRating rating={5} size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">4.5%</div>
                      <div className="text-xs text-[#666]">Engagement rate</div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-xs font-bold text-[#666] uppercase mb-1">Rank</div>
                      <div className="text-xl font-bold text-[#180039]">#7</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20 hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                        <Video className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#180039] text-lg">India</p>
                        <p className="text-xs text-[#666]">High views & engagement</p>
                      </div>
                    </div>
                    <StarRating rating={5} size="md" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-[#2A8E9E] mb-1">6.5M</div>
                      <div className="text-xs text-[#666]">Avg views</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 mb-1">3.9%</div>
                      <div className="text-xs text-[#666]">Engagement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-[#180039] text-xl flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#2A8E9E]" />
                Geographic Patterns
              </h4>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
                <p className="text-sm text-[#666] leading-relaxed mb-6">
                  Russia, Thailand, and France lead with <strong className="text-[#2A8E9E]">~35,000 trending videos each</strong>. However, the
                  United States dominates in average views (8.5M) despite having fewer trending videos.
                  India shows impressive view counts at 6.5M average, indicating highly engaged
                  audiences. <strong className="text-[#180039]">Asia-Pacific region accounts for 31.3%</strong> of all trending content. English represents only 40% of trending content, showing YouTube's global diversity.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#2A8E9E]/10 to-white border border-[#2A8E9E]/20">
                    <div className="text-xs font-bold text-[#666] uppercase mb-2">Top Region</div>
                    <div className="text-xl font-bold text-[#180039] mb-1">Asia-Pacific</div>
                    <div className="text-sm text-[#2A8E9E] font-semibold">31.3%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#180039]/10 to-white border border-[#180039]/20">
                    <div className="text-xs font-bold text-[#666] uppercase mb-2">Peak Performance</div>
                    <div className="text-xl font-bold text-[#180039] mb-1">United States</div>
                    <div className="text-sm text-[#2A8E9E] font-semibold">8.5M views</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E9F3F4]">
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#2A8E9E]/5 border-2 border-[#2A8E9E]/20 hover:shadow-lg transition-all">
                    <span className="text-sm font-bold text-[#2A8E9E]">113 Countries</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#180039]/10 to-[#180039]/5 border-2 border-[#180039]/20 hover:shadow-lg transition-all">
                    <span className="text-sm font-bold text-[#180039]">31.3% Asia-Pacific</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#2A8E9E]/5 border-2 border-[#2A8E9E]/20 hover:shadow-lg transition-all">
                    <span className="text-sm font-bold text-[#2A8E9E]">8.5M Peak Views</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-2 border-purple-500/20 hover:shadow-lg transition-all">
                    <span className="text-sm font-bold text-purple-600">175 Languages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </GlowCard>
    </div>
  )
}
