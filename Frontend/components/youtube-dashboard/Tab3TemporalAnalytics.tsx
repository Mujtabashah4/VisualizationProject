"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, TrendingUp, Star, Award, Zap, BarChart3, Activity, Timer, Target } from "lucide-react"
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
  LineChart,
  Line,
  ComposedChart,
  Area,
  Legend,
  PieChart,
  Pie,
} from "recharts"

const dayOfWeekData = [
  { day: "Monday", activity: 85, avgViews: 11.0, engagement: 3.0, starRating: 3 },
  { day: "Tuesday", activity: 88, avgViews: 11.5, engagement: 3.1, starRating: 3 },
  { day: "Wednesday", activity: 92, avgViews: 12.0, engagement: 3.2, starRating: 4 },
  { day: "Thursday", activity: 100, avgViews: 13.5, engagement: 3.5, isOptimal: true, starRating: 5 },
  { day: "Friday", activity: 98, avgViews: 13.0, engagement: 3.4, starRating: 5 },
  { day: "Saturday", activity: 95, avgViews: 12.5, engagement: 3.3, starRating: 4 },
  { day: "Sunday", activity: 90, avgViews: 11.8, engagement: 3.2, starRating: 4 },
]

// Heatmap data (simplified - Days vs Months)
const heatmapData = [
  { month: "Jan", Mon: 80, Tue: 82, Wed: 85, Thu: 95, Fri: 92, Sat: 88, Sun: 85 },
  { month: "Feb", Mon: 82, Tue: 84, Wed: 87, Thu: 97, Fri: 94, Sat: 90, Sun: 87 },
  { month: "Mar", Mon: 85, Tue: 87, Wed: 90, Thu: 100, Fri: 97, Sat: 93, Sun: 90 },
  { month: "Apr", Mon: 88, Tue: 90, Wed: 93, Thu: 103, Fri: 100, Sat: 96, Sun: 93 },
  { month: "May", Mon: 90, Tue: 92, Wed: 95, Thu: 105, Fri: 102, Sat: 98, Sun: 95 },
  { month: "Jun", Mon: 92, Tue: 94, Wed: 97, Thu: 107, Fri: 104, Sat: 100, Sun: 97 },
  { month: "Jul", Mon: 93, Tue: 95, Wed: 98, Thu: 108, Fri: 105, Sat: 101, Sun: 98 },
  { month: "Aug", Mon: 92, Tue: 94, Wed: 97, Thu: 107, Fri: 104, Sat: 100, Sun: 97 },
  { month: "Sep", Mon: 88, Tue: 90, Wed: 93, Thu: 103, Fri: 100, Sat: 96, Sun: 93 },
  { month: "Oct", Mon: 85, Tue: 87, Wed: 90, Thu: 100, Fri: 97, Sat: 93, Sun: 90 },
  { month: "Nov", Mon: 87, Tue: 89, Wed: 92, Thu: 102, Fri: 99, Sat: 95, Sun: 92 },
  { month: "Dec", Mon: 90, Tue: 92, Wed: 95, Thu: 105, Fri: 102, Sat: 98, Sun: 95 },
]

// Monthly trends
const monthlyTrendData = [
  { month: "Jan", videos: 142000, engagement: 3.4, peak: false },
  { month: "Feb", videos: 148000, engagement: 3.5, peak: false },
  { month: "Mar", videos: 155000, engagement: 3.6, peak: false },
  { month: "Apr", videos: 162000, engagement: 3.7, peak: false },
  { month: "May", videos: 170000, engagement: 3.8, peak: false },
  { month: "Jun", videos: 178000, engagement: 3.9, peak: true },
  { month: "Jul", videos: 185000, engagement: 4.0, peak: true },
  { month: "Aug", videos: 182000, engagement: 3.9, peak: true },
  { month: "Sep", videos: 175000, engagement: 3.8, peak: false },
  { month: "Oct", videos: 168000, engagement: 3.7, peak: false },
  { month: "Nov", videos: 160000, engagement: 3.6, peak: false },
  { month: "Dec", videos: 172000, engagement: 3.9, peak: true },
]

// Viral Speed Distribution (Days from publish to trending)
const viralSpeedData = [
  { days: "0-1", count: 1237765, percentage: 31.0, category: "🚀 Explosive viral", starRating: 5 },
  { days: "2-7", count: 1916539, percentage: 48.0, category: "⚡ Fast viral", starRating: 5 },
  { days: "8-30", count: 598919, percentage: 15.0, category: "🐌 Slow burn", starRating: 3 },
  { days: "31+", count: 239567, percentage: 6.0, category: "🔍 Rediscovered", starRating: 2 },
]

// Hourly Distribution Data
const hourlyData = [
  { hour: "12 AM", activity: 45, engagement: 2.8, starRating: 2 },
  { hour: "3 AM", activity: 38, engagement: 2.5, starRating: 2 },
  { hour: "6 AM", activity: 52, engagement: 3.0, starRating: 3 },
  { hour: "9 AM", activity: 68, engagement: 3.2, starRating: 3 },
  { hour: "12 PM", activity: 82, engagement: 3.4, starRating: 4 },
  { hour: "3 PM", activity: 88, engagement: 3.5, starRating: 4 },
  { hour: "6 PM", activity: 100, engagement: 3.8, isPeak: true, starRating: 5 },
  { hour: "9 PM", activity: 95, engagement: 3.7, starRating: 5 },
]

// Weekly Performance Comparison
const weeklyComparisonData = [
  { metric: "Activity", Monday: 85, Tuesday: 88, Wednesday: 92, Thursday: 100, Friday: 98, Saturday: 95, Sunday: 90 },
  { metric: "Engagement", Monday: 3.0, Tuesday: 3.1, Wednesday: 3.2, Thursday: 3.5, Friday: 3.4, Saturday: 3.3, Sunday: 3.2 },
]

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

export function Tab3TemporalAnalytics() {
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
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#E9F3F4] border border-[#2A8E9E]/20 mb-3">
                <span className="text-xs font-bold text-[#2A8E9E] uppercase tracking-widest">TIME-BASED ANALYSIS</span>
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-[#180039] via-[#2A8E9E] to-[#180039] bg-clip-text text-transparent mb-3">
                Temporal Analytics
              </h2>
              <p className="text-lg text-[#666]">Comprehensive analysis of optimal posting schedules and time-based patterns</p>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#666] uppercase">Best Day</span>
              </div>
              <div className="text-2xl font-bold text-[#180039]">Thursday</div>
              <div className="text-xs text-[#666] mt-1">+18% engagement</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#666] uppercase">Peak Hours</span>
              </div>
              <div className="text-2xl font-bold text-[#180039]">6-9 PM</div>
              <div className="text-xs text-[#666] mt-1">Local time</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#666] uppercase">Viral Speed</span>
              </div>
              <div className="text-2xl font-bold text-[#180039]">3 Days</div>
              <div className="text-xs text-[#666] mt-1">Median time</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#666] uppercase">Peak Season</span>
              </div>
              <div className="text-2xl font-bold text-[#180039]">Summer</div>
              <div className="text-xs text-[#666] mt-1">Jun-Aug, Dec</div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimal Timing Cards - Enhanced with Stars */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-4">
        <GlowCard glowColor="primary" delay={100} className="group">
          <CardContent className="p-6 bg-gradient-to-br from-[#2A8E9E] to-[#180039] text-white relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <StarRating rating={5} size="sm" />
              </div>
              <div className="text-sm opacity-90 mb-2 uppercase tracking-wider">Best Day</div>
              <div className="text-4xl font-bold mb-2">THURSDAY</div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm inline-block">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-bold">+18% engagement</span>
              </div>
            </div>
          </CardContent>
        </GlowCard>

        <GlowCard glowColor="purple" delay={150} className="group">
          <CardContent className="p-6 bg-gradient-to-br from-[#180039] to-[#2A8E9E] text-white relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <StarRating rating={5} size="sm" />
              </div>
              <div className="text-sm opacity-90 mb-2 uppercase tracking-wider">Peak Hours</div>
              <div className="text-3xl font-bold mb-2">6 PM - 9 PM</div>
              <div className="text-xs opacity-75">Local Time</div>
            </div>
          </CardContent>
        </GlowCard>

        <GlowCard glowColor="primary" delay={200} className="group">
          <CardContent className="p-6 bg-gradient-to-br from-[#2A8E9E] to-[#180039] text-white relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <StarRating rating={5} size="sm" />
              </div>
              <div className="text-sm opacity-90 mb-2 uppercase tracking-wider">Best Season</div>
              <div className="text-2xl font-bold mb-2">Summer & Holiday</div>
              <div className="text-xs opacity-75">Peak activity</div>
            </div>
          </CardContent>
        </GlowCard>

        <GlowCard glowColor="purple" delay={250} className="group">
          <CardContent className="p-6 bg-gradient-to-br from-[#180039] to-[#2A8E9E] text-white relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <StarRating rating={5} size="sm" />
              </div>
              <div className="text-sm opacity-90 mb-2 uppercase tracking-wider">Impact</div>
              <div className="text-4xl font-bold mb-2">+18%</div>
              <div className="text-xs opacity-75">more engagement</div>
            </div>
          </CardContent>
        </GlowCard>
      </div>

      {/* Hourly Distribution - New Visualization */}
      <GlowCard glowColor="primary" delay={280}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-[#180039]">Hourly Activity Distribution</CardTitle>
                <CardDescription className="text-[#666] mt-2">Peak engagement hours throughout the day</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Target className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-600">Peak: 6 PM</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={hourlyData}>
              <defs>
                <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2A8E9E" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis dataKey="hour" stroke="#2A8E9E" fontSize={11} fontWeight={600} />
              <YAxis yAxisId="left" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
              <YAxis yAxisId="right" orientation="right" stroke="#180039" fontSize={12} fontWeight={600} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(42, 142, 158, 0.95)",
                  border: "1px solid #2A8E9E",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="activity"
                fill="url(#hourlyGradient)"
                stroke="#2A8E9E"
                strokeWidth={2}
                name="Activity Index"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="engagement"
                stroke="#180039"
                strokeWidth={3}
                dot={{ fill: "#180039", r: 5 }}
                activeDot={{ r: 7 }}
                name="Engagement %"
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-4 md:grid-cols-8 gap-2">
            {hourlyData.map((hour, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  hour.isPeak
                    ? "bg-gradient-to-br from-emerald-500/20 to-[#2A8E9E]/20 border-emerald-500 shadow-lg scale-105"
                    : "bg-[#E9F3F4] border-[#E9F3F4]"
                }`}
              >
                <div className="text-xs font-bold text-[#180039] mb-1">{hour.hour}</div>
                <div className="text-lg font-bold text-[#180039] mb-1">{hour.activity}</div>
                <StarRating rating={hour.starRating} size="sm" />
              </div>
            ))}
          </div>
          
          {/* Graph Explanation */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
            <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
              <li><strong className="text-[#2A8E9E]">Hourly Activity Pattern:</strong> Shows how activity index and engagement rates vary throughout the day</li>
              <li><strong className="text-[#2A8E9E]">Key Finding:</strong> 6 PM shows peak activity (100 index) and highest engagement (3.8%) - prime posting time</li>
              <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Time-series analysis revealing optimal posting windows for maximum visibility</li>
            </ul>
          </div>
        </CardContent>
      </GlowCard>

      {/* Viral Speed Distribution - Enhanced */}
      <GlowCard glowColor="primary" delay={300} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#2A8E9E]/10 to-transparent rounded-full blur-3xl"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-[#180039]">Viral Speed Distribution</CardTitle>
                <CardDescription className="text-[#666] mt-2">Days from publish to trending - Mean: 5.96 days, Median: 3 days</CardDescription>
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/20">
              <div className="text-xs font-bold text-[#666] uppercase mb-1">Median</div>
              <div className="text-xl font-bold text-emerald-600">3 Days</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={viralSpeedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="viralGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#180039" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis dataKey="days" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
              <YAxis stroke="#2A8E9E" fontSize={12} fontWeight={600} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(42, 142, 158, 0.95)",
                  border: "1px solid #2A8E9E",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                }}
                formatter={(value: number, name: string) => {
                  if (name === "count") return `${value.toLocaleString()} videos`
                  if (name === "percentage") return `${value}%`
                  return value
                }}
              />
              <Bar dataKey="count" fill="url(#viralGradient)" radius={[8, 8, 0, 0]} animationDuration={1000}>
                {viralSpeedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.starRating === 5 ? "#2A8E9E" : entry.starRating >= 3 ? "#180039" : "#E9F3F4"}
                    style={{
                      filter: `drop-shadow(0 4px 8px rgba(42, 142, 158, 0.3))`,
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {viralSpeedData.map((entry, index) => (
              <div key={index} className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#180039]">{entry.days} days</span>
                  <StarRating rating={entry.starRating} size="sm" />
                </div>
                <div className="text-lg font-bold text-[#2A8E9E] mb-1">{entry.percentage}%</div>
                <div className="text-xs text-[#666]">{entry.category}</div>
                <div className="text-xs text-[#666] mt-1">{entry.count.toLocaleString()} videos</div>
              </div>
            ))}
          </div>
          
          {/* Graph Explanation */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
            <ul className="text-xs text-[#666] space-y-1 list-disc list-inside mb-3">
              <li><strong className="text-[#2A8E9E]">Viral Speed Analysis:</strong> Distribution of time from video publication to first trending appearance</li>
              <li><strong className="text-[#2A8E9E]">Key Finding:</strong> 79% of videos trend within 7 days - immediate momentum is critical for viral success</li>
              <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Temporal analysis showing relationship between publish date and trending date - reveals "explosive viral" vs. "slow burn" patterns</li>
            </ul>
            <p className="text-sm text-[#666] leading-relaxed">
              <strong className="text-[#180039]">Key Insight:</strong> Most viral content needs <strong className="text-[#2A8E9E]">immediate momentum</strong>. 
              79% of trending videos gain traction within 7 days of publishing. If a video doesn't gain traction within 7 days, 
              it likely won't trend organically. However, "sleeper hits" (6% of videos) prove quality content can find audiences weeks later.
            </p>
          </div>
        </CardContent>
      </GlowCard>

      {/* Day of Week Performance - Enhanced */}
      <GlowCard glowColor="primary" delay={350} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-[#180039]">Day of Week Performance</CardTitle>
                <CardDescription className="text-sm mt-2 text-[#666]">Activity index, average views, and engagement by day</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 border-2 border-[#FFD700]/30">
              <Award className="w-5 h-5 text-[#FFD700]" />
              <div>
                <div className="text-xs font-bold text-[#666] uppercase">Best Day</div>
                <div className="text-sm font-bold text-[#180039]">Thursday</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={dayOfWeekData}>
              <defs>
                <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2A8E9E" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis dataKey="day" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
              <YAxis yAxisId="left" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
              <YAxis yAxisId="right" orientation="right" stroke="#180039" fontSize={12} fontWeight={600} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(42, 142, 158, 0.95)",
                  border: "1px solid #2A8E9E",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="activity"
                fill="url(#activityGradient)"
                stroke="#2A8E9E"
                strokeWidth={2}
                name="Activity Index"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="engagement"
                stroke="#180039"
                strokeWidth={3}
                dot={{ fill: "#180039", r: 5 }}
                activeDot={{ r: 7 }}
                name="Engagement %"
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-7 gap-3">
            {dayOfWeekData.map((day, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all group hover:scale-105 ${
                  day.isOptimal
                    ? "bg-gradient-to-br from-[#2A8E9E]/20 to-[#180039]/10 border-[#2A8E9E] shadow-xl ring-2 ring-[#2A8E9E]/30"
                    : "bg-gradient-to-br from-[#E9F3F4] to-white border-[#E9F3F4] hover:border-[#2A8E9E]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-xs font-bold ${day.isOptimal ? "text-[#2A8E9E]" : "text-[#180039]"}`}>
                    {day.day.slice(0, 3)}
                  </div>
                  {day.isOptimal && (
                    <Award className="w-3 h-3 text-[#FFD700]" />
                  )}
                </div>
                <div className={`text-2xl font-bold mb-2 ${day.isOptimal ? "text-[#2A8E9E]" : "text-[#180039]"}`}>
                  {day.activity}
                </div>
                <div className="flex items-center justify-between">
                  <StarRating rating={day.starRating} size="sm" />
                  <div className="text-xs text-[#666]">{day.engagement}%</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Graph Explanation */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
            <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
              <li><strong className="text-[#2A8E9E]">Day-of-Week Pattern Analysis:</strong> Shows how activity index and engagement rates vary across different days</li>
              <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Thursday shows highest activity (100 index) and engagement (3.5%) - optimal posting day with +18% boost</li>
              <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Composed chart combining area (activity) and line (engagement) to show dual temporal relationships</li>
            </ul>
          </div>
        </CardContent>
      </GlowCard>

      {/* Monthly Trends - Enhanced */}
      <GlowCard glowColor="purple" delay={400} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#2A8E9E]/10 to-transparent rounded-full blur-3xl"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-[#180039]">Monthly Trends & Seasonal Patterns</CardTitle>
                <CardDescription className="text-sm mt-2 text-[#666]">Video count and engagement across 12 months</CardDescription>
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#2A8E9E]/5 border-2 border-[#2A8E9E]/20">
              <div className="text-xs font-bold text-[#666] uppercase mb-1">Peak Months</div>
              <div className="text-sm font-bold text-[#180039]">Jun, Jul, Aug, Dec</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={monthlyTrendData}>
              <defs>
                <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2A8E9E" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis dataKey="month" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
              <YAxis yAxisId="left" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
              <YAxis yAxisId="right" orientation="right" stroke="#180039" fontSize={12} fontWeight={600} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(42, 142, 158, 0.95)",
                  border: "1px solid #2A8E9E",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="videos"
                fill="url(#monthlyGradient)"
                stroke="#2A8E9E"
                strokeWidth={2}
                name="Videos (K)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="engagement"
                stroke="#180039"
                strokeWidth={3}
                dot={{ fill: "#180039", r: 5 }}
                activeDot={{ r: 7 }}
                name="Engagement %"
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#2A8E9E]"></div>
              <span className="text-sm font-semibold text-[#180039]">Peak Months</span>
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={5} size="sm" />
              <span className="text-sm text-[#666]">Jun, Jul, Aug, Dec</span>
            </div>
          </div>
          
          {/* Graph Explanation */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
            <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
              <li><strong className="text-[#2A8E9E]">Seasonal Trend Analysis:</strong> Shows monthly patterns in video count and engagement rates across 12 months</li>
              <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Summer months (Jun-Aug) and December show peak activity - seasonal patterns significantly impact trending</li>
              <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Time-series analysis revealing relationship between month and both video volume and engagement quality</li>
            </ul>
          </div>
        </CardContent>
      </GlowCard>

      {/* Enhanced Activity Heatmap */}
      <GlowCard glowColor="primary" delay={500} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#180039]/10 to-transparent rounded-full blur-3xl"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#180039] to-[#2A8E9E] shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-[#180039]">Activity Heatmap - Days vs Months</CardTitle>
                <CardDescription className="text-sm mt-2 text-[#666]">Trending activity levels across the year with 3D depth effect</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-2 mb-3">
                <div className="text-xs font-bold text-[#180039] p-2"></div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-xs font-bold text-center text-[#180039] p-2">
                    {day}
                  </div>
                ))}
              </div>
              {heatmapData.map((row, rowIndex) => (
                <div key={row.month} className="grid grid-cols-8 gap-2 mb-1">
                  <div className="text-xs font-semibold text-[#180039] p-2 flex items-center">{row.month}</div>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dayIndex) => {
                    const value = row[day as keyof typeof row] as number
                    const intensity = Math.min(value / 110, 1)
                    const isPeak = value >= 100
                    const bgColor = intensity > 0.8 
                      ? `rgba(42, 142, 158, ${intensity})` 
                      : intensity > 0.5
                      ? `rgba(24, 0, 57, ${intensity * 0.8})`
                      : `rgba(233, 243, 244, ${intensity})`
                    return (
                      <div
                        key={day}
                        className={`p-3 text-xs text-center rounded-lg font-semibold transition-all hover:scale-110 ${
                          isPeak ? "ring-2 ring-[#FFD700] ring-offset-1" : ""
                        }`}
                        style={{ 
                          backgroundColor: bgColor,
                          color: intensity > 0.5 ? "white" : "#180039",
                          transform: `translateZ(${intensity * 10}px)`,
                          boxShadow: intensity > 0.5 
                            ? `0 ${intensity * 8}px ${intensity * 16}px rgba(42, 142, 158, ${intensity * 0.4})`
                            : "none"
                        }}
                      >
                        {value}
                        {isPeak && <Star className="w-2 h-2 inline-block ml-1 fill-[#FFD700] text-[#FFD700]" />}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-xs">
            <span className="text-[#666]">Lower Activity</span>
            <div className="flex gap-1">
              {[0, 0.25, 0.5, 0.75, 1].map((intensity) => {
                const color = intensity > 0.75 
                  ? `rgba(42, 142, 158, ${intensity})` 
                  : intensity > 0.5
                  ? `rgba(24, 0, 57, ${intensity * 0.8})`
                  : `rgba(233, 243, 244, ${intensity})`
                return (
                  <div
                    key={intensity}
                    className="w-6 h-6 rounded-lg shadow-md"
                    style={{ backgroundColor: color }}
                  ></div>
                )
              })}
            </div>
            <span className="text-[#666]">Higher Activity</span>
          </div>
        </CardContent>
      </GlowCard>

      {/* Enhanced Key Insights */}
      <GlowCard glowColor="teal" delay={650}>
        <CardHeader className="bg-gradient-to-r from-[#2A8E9E]/5 to-[#180039]/5 border-b border-[#E9F3F4]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent">
                Key Temporal Insights
              </CardTitle>
              <CardDescription className="text-[#666] mt-2">Critical discoveries from time-based analysis</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-bold text-[#180039] text-xl flex items-center gap-2">
                <Target className="w-5 h-5 text-[#2A8E9E]" />
                Optimal Timing
              </h4>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
                <p className="text-sm text-[#666] leading-relaxed mb-4">
                  Thursday emerges as the optimal day for trending content, with <strong className="text-[#2A8E9E]">18% higher engagement</strong> than the weekly average. Peak hours are <strong className="text-[#180039]">6 PM - 9 PM</strong> local time, maximizing audience reach and interaction.
                </p>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 rounded-xl bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                    <div className="text-xs font-bold text-[#666] uppercase mb-1">Best Day</div>
                    <div className="text-xl font-bold text-[#180039]">Thursday</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-xs font-bold text-[#666] uppercase mb-1">Peak Hour</div>
                    <div className="text-xl font-bold text-[#180039]">6 PM</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-[#180039] text-xl flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#2A8E9E]" />
                Seasonal Patterns
              </h4>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
                <p className="text-sm text-[#666] leading-relaxed mb-4">
                  <strong className="text-[#2A8E9E]">Summer months (Jun-Aug)</strong> and <strong className="text-[#180039]">December</strong> show peak trending activity globally. Weekend content shows sustained performance, with Saturday maintaining high engagement levels.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="px-3 py-2 rounded-xl bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                    <div className="text-xs font-bold text-[#666] uppercase mb-1">Peak Season</div>
                    <div className="text-lg font-bold text-[#180039]">Summer</div>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="text-xs font-bold text-[#666] uppercase mb-1">Boost</div>
                    <div className="text-lg font-bold text-[#180039]">+18%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Viral Speed Summary */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <h4 className="font-bold text-[#180039] text-lg mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#2A8E9E]" />
              Viral Speed Insights
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {viralSpeedData.map((entry, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-white border-2 border-[#2A8E9E]/20 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#180039]">{entry.days} days</span>
                    <StarRating rating={entry.starRating} size="sm" />
                  </div>
                  <div className="text-2xl font-bold text-[#2A8E9E] mb-1">{entry.percentage}%</div>
                  <div className="text-xs text-[#666]">{entry.category}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#666] mt-4 leading-relaxed">
              <strong className="text-[#180039]">Key Insight:</strong> <strong className="text-[#2A8E9E]">79% of videos trend within 7 days</strong> - immediate momentum is critical for viral success. The median time to trending is just <strong className="text-[#2A8E9E]">3 days</strong>, highlighting the importance of early engagement.
            </p>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3 pt-6 border-t border-[#E9F3F4]">
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#2A8E9E]/5 border-2 border-[#2A8E9E]/20 hover:shadow-lg transition-all">
              <span className="text-sm font-bold text-[#2A8E9E]">Best Day: Thursday</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/20 hover:shadow-lg transition-all">
              <span className="text-sm font-bold text-emerald-600">Peak Hours: 6-9 PM</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-2 border-purple-500/20 hover:shadow-lg transition-all">
              <span className="text-sm font-bold text-purple-600">Peak Season: Summer</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#180039]/10 to-[#180039]/5 border-2 border-[#180039]/20 hover:shadow-lg transition-all">
              <span className="text-sm font-bold text-[#180039]">+18% Engagement Boost</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#2A8E9E]/5 border-2 border-[#2A8E9E]/20 hover:shadow-lg transition-all">
              <span className="text-sm font-bold text-[#2A8E9E]">Median: 3 Days</span>
            </div>
          </div>
        </CardContent>
      </GlowCard>
    </div>
  )
}
