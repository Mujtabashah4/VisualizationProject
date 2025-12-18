"use client"

import { useId } from "react"
import { Database, Video, Globe, Users, Languages, CheckCircle2, Calendar, TrendingUp, Sparkles, Zap, Clock, BarChart3, Activity, Target, Award, ArrowUpRight, ArrowDownRight, PlayCircle, Eye, Heart, MessageSquare, Share2, ThumbsUp, TrendingDown, Minus, User, Trophy } from "lucide-react"
import { StatCard } from "./StatCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowCard } from "./GlowCard"
import { AnimatedProgressBar } from "./AnimatedProgressBar"
import { IconBox } from "./IconBox"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts"

// Premium Finpay-inspired color palette
const COLORS = ["#2A8E9E", "#180039", "#2A8E9E", "#180039", "#2A8E9E", "#E9F3F4"]

const dataRetentionData = [
  { name: "Retained", value: 95, color: "#2A8E9E" },
  { name: "Cleaned", value: 5, color: "#180039" },
]

const engagementData = [
  { name: "Views", value: 12100000 },
  { name: "Likes", value: 376000 },
  { name: "Comments", value: 7000 },
]

// Enhanced data for visualizations
const monthlyTrendData = [
  { month: "Oct 2023", videos: 125000, views: 1.2, engagement: 3.1, likes: 37200 },
  { month: "Jan 2024", videos: 142000, views: 1.5, engagement: 3.4, likes: 51000 },
  { month: "Apr 2024", videos: 158000, views: 1.8, engagement: 3.6, likes: 64800 },
  { month: "Jul 2024", videos: 175000, views: 2.1, engagement: 3.8, likes: 79800 },
  { month: "Oct 2024", videos: 192000, views: 2.4, engagement: 4.0, likes: 96000 },
  { month: "Jan 2025", videos: 210000, views: 2.7, engagement: 4.2, likes: 113400 },
  { month: "Apr 2025", videos: 228000, views: 3.0, engagement: 4.4, likes: 132000 },
  { month: "Jul 2025", videos: 245000, views: 3.3, engagement: 4.6, likes: 150500 },
  { month: "Oct 2025", videos: 262000, views: 3.6, engagement: 4.8, likes: 169200 },
]

const topCategoriesData = [
  { category: "Entertainment", videos: 125000, percentage: 37, avgViews: 8.5 },
  { category: "Music", videos: 85000, percentage: 25, avgViews: 12.3 },
  { category: "Gaming", videos: 68000, percentage: 20, avgViews: 6.8 },
  { category: "Education", videos: 34000, percentage: 10, avgViews: 4.2 },
  { category: "Sports", videos: 17000, percentage: 5, avgViews: 9.1 },
  { category: "Other", videos: 10150, percentage: 3, avgViews: 3.5 },
]

const countryDistributionData = [
  { country: "US", percentage: 18.5, videos: 738000 },
  { country: "IN", percentage: 12.3, videos: 491000 },
  { country: "BR", percentage: 8.7, videos: 347000 },
  { country: "RU", percentage: 7.2, videos: 287000 },
  { country: "JP", percentage: 6.8, videos: 271000 },
  { country: "Others", percentage: 46.5, videos: 1855000 },
]

const weeklyTrendData = [
  { day: "Mon", videos: 18500, engagement: 4.2 },
  { day: "Tue", videos: 19200, engagement: 4.5 },
  { day: "Wed", videos: 20100, engagement: 4.8 },
  { day: "Thu", videos: 21500, engagement: 5.1 },
  { day: "Fri", videos: 22800, engagement: 5.4 },
  { day: "Sat", videos: 24500, engagement: 5.8 },
  { day: "Sun", videos: 23400, engagement: 5.6 },
]

const performanceMetrics = [
  { metric: "Views", score: 95 },
  { metric: "Engagement", score: 88 },
  { metric: "Retention", score: 82 },
  { metric: "Growth", score: 91 },
  { metric: "Quality", score: 87 },
]

// Top Channels by Trending Appearances
const topChannelsData = [
  { channel: "Music Label A", appearances: 2847, uniqueVideos: 145, efficiency: 19.6, starRating: 5 },
  { channel: "News Network B", appearances: 2156, uniqueVideos: 132, efficiency: 16.3, starRating: 5 },
  { channel: "Entertainment C", appearances: 1892, uniqueVideos: 98, efficiency: 19.3, starRating: 5 },
  { channel: "Gaming Channel D", appearances: 1654, uniqueVideos: 87, efficiency: 19.0, starRating: 4 },
  { channel: "Sports Media E", appearances: 1523, uniqueVideos: 76, efficiency: 20.0, starRating: 5 },
  { channel: "Education F", appearances: 1345, uniqueVideos: 65, efficiency: 20.7, starRating: 4 },
  { channel: "Tech Channel G", appearances: 1234, uniqueVideos: 58, efficiency: 21.3, starRating: 4 },
  { channel: "Lifestyle H", appearances: 1123, uniqueVideos: 54, efficiency: 20.8, starRating: 4 },
  { channel: "Comedy I", appearances: 1056, uniqueVideos: 48, efficiency: 22.0, starRating: 4 },
  { channel: "Music Label J", appearances: 987, uniqueVideos: 45, efficiency: 21.9, starRating: 4 },
  { channel: "Vlogger K", appearances: 876, uniqueVideos: 42, efficiency: 20.9, starRating: 3 },
  { channel: "Cooking L", appearances: 765, uniqueVideos: 38, efficiency: 20.1, starRating: 3 },
  { channel: "Travel M", appearances: 654, uniqueVideos: 32, efficiency: 20.4, starRating: 3 },
  { channel: "Fitness N", appearances: 543, uniqueVideos: 28, efficiency: 19.4, starRating: 3 },
  { channel: "Science O", appearances: 432, uniqueVideos: 22, efficiency: 19.6, starRating: 3 },
]

// Rank Distribution Data
const rankDistributionData = [
  { rank: "1-5", count: 199640, percentage: 5.0, avgViews: 23.4, starRating: 5 },
  { rank: "6-10", count: 199640, percentage: 5.0, avgViews: 14.2, starRating: 5 },
  { rank: "11-15", count: 199640, percentage: 5.0, avgViews: 10.5, starRating: 4 },
  { rank: "16-20", count: 199640, percentage: 5.0, avgViews: 8.7, starRating: 4 },
  { rank: "21-25", count: 199640, percentage: 5.0, avgViews: 7.2, starRating: 3 },
  { rank: "26-30", count: 199640, percentage: 5.0, avgViews: 6.1, starRating: 3 },
  { rank: "31-35", count: 199640, percentage: 5.0, avgViews: 5.5, starRating: 3 },
  { rank: "36-40", count: 199640, percentage: 5.0, avgViews: 5.2, starRating: 2 },
  { rank: "41-45", count: 199640, percentage: 5.0, avgViews: 5.0, starRating: 2 },
  { rank: "46-50", count: 199640, percentage: 5.0, avgViews: 4.8, starRating: 2 },
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
        <Award
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

const engagementBreakdown = [
  { type: "Likes", value: 376000, percentage: 3.1, color: "#2A8E9E" },
  { type: "Comments", value: 7000, percentage: 0.06, color: "#180039" },
  { type: "Shares", value: 9600, percentage: 0.08, color: "#2A8E9E" },
  { type: "Subscribes", value: 2400, percentage: 0.02, color: "#180039" },
]

// Mini Sparkline Component - Enhanced with proper containment and gradient fill
function MiniSparkline({ data, color = "#2A8E9E" }: { data: number[], color?: string }) {
  // Use useId hook for stable SSR-safe ID generation (prevents hydration mismatch)
  const uniqueId = useId()
  const gradientId = `gradient-${color.replace('#', '')}-${uniqueId.replace(/:/g, '')}`
  
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  const height = 32
  const padding = 2
  
  // Normalize points with padding
  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = padding + (height - padding * 2) - ((val - min) / range) * (height - padding * 2)
    return { x, y }
  })
  
  // Create polyline string
  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ')
  
  // Create area path for gradient fill
  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]
  const areaPath = `M ${firstPoint.x},${height - padding} ${polylinePoints} L ${lastPoint.x},${height - padding} Z`
  
  return (
    <div className="w-full h-8 relative overflow-hidden rounded-md">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Gradient fill area */}
        <path
          d={areaPath}
          fill={`url(#${gradientId})`}
        />
        {/* Main trend line */}
        <polyline
          points={polylinePoints}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* End point circle */}
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r="2.5"
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

// Trend Indicator Component
function TrendIndicator({ value, label, trend = "up" }: { value: string, label: string, trend?: "up" | "down" | "neutral" }) {
  const Icon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus
  const color = trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-gray-600"
  
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <div>
        <div className={`text-lg font-bold ${color}`}>{value}</div>
        <div className="text-xs text-[#666]">{label}</div>
      </div>
    </div>
  )
}

export function Tab1ExecutiveOverview() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Enhanced Project Header - Premium Design */}
      <div className="mb-10 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A8E9E]/5 via-transparent to-[#180039]/5 rounded-3xl -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A8E9E]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#180039]/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm border border-[#E9F3F4] rounded-3xl p-8 shadow-xl">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/30 mb-5 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs font-bold text-[#2A8E9E] uppercase tracking-widest">DATA SCIENCE & VISUALIZATION PROJECT</span>
              </div>
              <h2 className="text-6xl font-bold bg-gradient-to-r from-[#180039] via-[#2A8E9E] to-[#180039] bg-clip-text text-transparent mb-5 tracking-tight">
                Comprehensive Analysis Dashboard
              </h2>
              <p className="text-lg text-[#666] max-w-4xl leading-relaxed mb-4">
                Analyzing <span className="font-bold text-[#2A8E9E]">3.99 million trending video snapshots</span> across <span className="font-bold text-[#2A8E9E]">113 countries</span> using PySpark, advanced statistical methods, and interactive visualizations to uncover viral content patterns.
              </p>
              
              {/* Quick Stats Bar */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#E9F3F4]">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#2A8E9E]/5 border border-[#2A8E9E]/20 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-3 h-3 rounded-full bg-[#2A8E9E] group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-bold text-[#180039]">3.99M Records</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform animate-pulse"></div>
                  <span className="text-sm font-bold text-[#180039]">98.7% Quality</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-3 h-3 rounded-full bg-purple-500 group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-bold text-[#180039]">113 Countries</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#180039]/10 to-[#180039]/5 border border-[#180039]/20 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-3 h-3 rounded-full bg-[#180039] group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-bold text-[#180039]">338K Videos</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-3 ml-6">
              <div className="relative group">
                <div className="px-8 py-6 rounded-2xl bg-gradient-to-br from-[#2A8E9E] via-[#2A8E9E] to-[#180039] text-white shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="text-4xl font-bold mb-1">98.7%</div>
                    <div className="text-sm opacity-90">Data Quality</div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#2A8E9E] opacity-0 group-hover:opacity-30 blur-xl rounded-2xl transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Statistics Cards - Enhanced */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Records"
          value={3992790}
          icon={<Database className="h-4 w-4" />}
          delay={100}
        />
        <StatCard
          title="Unique Videos"
          value={338150}
          icon={<Video className="h-4 w-4" />}
          delay={200}
        />
        <StatCard
          title="Countries Analyzed"
          value={113}
          icon={<Globe className="h-4 w-4" />}
          delay={300}
        />
        <StatCard
          title="Unique Channels"
          value={57281}
          icon={<Users className="h-4 w-4" />}
          delay={400}
        />
        <StatCard
          title="Languages"
          value={175}
          icon={<Languages className="h-4 w-4" />}
          delay={500}
        />
        <StatCard
          title="Data Quality Score"
          value={98.7}
          icon={<CheckCircle2 className="h-4 w-4" />}
          suffix="%"
          decimals={1}
          delay={600}
        />
      </div>

      {/* Key Performance Metrics - Premium Enhanced with Sparklines */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <GlowCard glowColor="primary" delay={700} className="relative overflow-hidden group">
          {/* Decorative gradient background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2A8E9E]/20 to-transparent rounded-full blur-2xl"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <TrendIndicator value="+23%" label="vs last year" trend="up" />
            </div>
            <div className="mb-3">
              <p className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">Avg Views per Video</p>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent">12.1M</div>
            </div>
            <div className="mt-4">
              <MiniSparkline data={[1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0, 3.3, 3.6]} color="#2A8E9E" />
            </div>
          </CardContent>
        </GlowCard>
        
        <GlowCard glowColor="purple" delay={750} className="relative overflow-hidden group">
          {/* Decorative gradient background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-[#180039] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <TrendIndicator value="+18%" label="engagement" trend="up" />
            </div>
            <div className="mb-3">
              <p className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">Avg Likes per Video</p>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#180039] to-purple-600 bg-clip-text text-transparent">376K</div>
            </div>
            <div className="mt-4">
              <MiniSparkline data={[37, 51, 65, 80, 96, 113, 132, 151, 169]} color="#180039" />
            </div>
          </CardContent>
        </GlowCard>
        
        <GlowCard glowColor="primary" delay={800} className="relative overflow-hidden group">
          {/* Decorative gradient background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-[#2A8E9E] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <TrendIndicator value="+12%" label="interaction" trend="up" />
            </div>
            <div className="mb-3">
              <p className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">Avg Comments per Video</p>
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-[#2A8E9E] bg-clip-text text-transparent">7K</div>
            </div>
            <div className="mt-4">
              <MiniSparkline data={[5.2, 5.8, 6.3, 6.9, 7.2, 7.5, 7.8, 8.1, 8.4]} color="#2A8E9E" />
            </div>
          </CardContent>
        </GlowCard>

        <GlowCard glowColor="purple" delay={850} className="relative overflow-hidden group">
          {/* Decorative gradient background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#180039]/20 to-transparent rounded-full blur-2xl"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#180039] to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <TrendIndicator value="+15%" label="sharing" trend="up" />
            </div>
            <div className="mb-3">
              <p className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">Avg Shares per Video</p>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#180039] to-teal-600 bg-clip-text text-transparent">9.6K</div>
            </div>
            <div className="mt-4">
              <MiniSparkline data={[7.2, 7.8, 8.3, 8.7, 9.1, 9.4, 9.6, 9.8, 10.1]} color="#180039" />
            </div>
          </CardContent>
        </GlowCard>
      </div>

      {/* Additional Performance Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <GlowCard glowColor="primary" delay={900}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">Avg Video Duration</p>
                <p className="text-2xl font-bold text-[#180039]">8.5 min</p>
                <p className="text-xs text-[#666] mt-1">±2.3 min</p>
              </div>
              <div className="p-3 rounded-xl bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                <Clock className="w-6 h-6 text-[#2A8E9E]" />
              </div>
            </div>
          </CardContent>
        </GlowCard>

        <GlowCard glowColor="purple" delay={950}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">Trending Duration</p>
                <p className="text-2xl font-bold text-[#180039]">4.2 days</p>
                <p className="text-xs text-[#666] mt-1">Average stay</p>
              </div>
              <div className="p-3 rounded-xl bg-[#180039]/10 border border-[#180039]/20">
                <Activity className="w-6 h-6 text-[#180039]" />
              </div>
            </div>
          </CardContent>
        </GlowCard>

        <GlowCard glowColor="primary" delay={1000}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">Peak Engagement</p>
                <p className="text-2xl font-bold text-[#180039]">6.2%</p>
                <p className="text-xs text-[#666] mt-1">Top performers</p>
              </div>
              <div className="p-3 rounded-xl bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                <Target className="w-6 h-6 text-[#2A8E9E]" />
              </div>
            </div>
          </CardContent>
        </GlowCard>

        <GlowCard glowColor="purple" delay={1050}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#666] uppercase tracking-widest mb-2">Viral Rate</p>
                <p className="text-2xl font-bold text-[#180039]">12.8%</p>
                <p className="text-xs text-[#666] mt-1">Of all videos</p>
              </div>
              <div className="p-3 rounded-xl bg-[#180039]/10 border border-[#180039]/20">
                <Award className="w-6 h-6 text-[#180039]" />
              </div>
            </div>
          </CardContent>
        </GlowCard>
      </div>

      {/* Main Visualizations Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Monthly Growth Trends - Full Width */}
        <GlowCard glowColor="primary" delay={1100} className="lg:col-span-2">
          <CardHeader className="pb-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-[#180039]">Monthly Growth Trends</CardTitle>
                <CardDescription className="text-sm mt-2 text-[#666]">Video count and engagement metrics over 24 months</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E9F3F4]">
                  <div className="w-2 h-2 rounded-full bg-[#2A8E9E]"></div>
                  <span className="text-xs font-semibold text-[#180039]">Videos</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E9F3F4]">
                  <div className="w-2 h-2 rounded-full bg-[#180039]"></div>
                  <span className="text-xs font-semibold text-[#180039]">Engagement</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="colorVideos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2A8E9E" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="#2A8E9E" 
                  fontSize={11} 
                  fontWeight={600}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis yAxisId="left" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                <YAxis yAxisId="right" orientation="right" stroke="#180039" fontSize={12} fontWeight={600} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(42, 142, 158, 0.95)",
                    border: "1px solid #2A8E9E",
                    borderRadius: "12px",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(42, 142, 158, 0.2)"
                  }}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="videos" 
                  stroke="#2A8E9E" 
                  fillOpacity={1} 
                  fill="url(#colorVideos)"
                  name="Videos (K)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#180039" 
                  strokeWidth={3}
                  dot={{ fill: "#180039", r: 4 }}
                  name="Engagement %"
                />
              </ComposedChart>
            </ResponsiveContainer>
            
            {/* Graph Explanation */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
              <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
              <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                <li><strong className="text-[#2A8E9E]">Monthly Growth Trends:</strong> Shows relationship between video count (area) and engagement rate (line) over 24 months</li>
                <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Video count steadily increases while engagement rates improve - positive correlation between volume and quality</li>
                <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Composed chart combining area and line plots to show dual trends - reveals both quantity and quality improvements</li>
              </ul>
            </div>
          </CardContent>
        </GlowCard>

        {/* Performance Radar Chart */}
        <GlowCard glowColor="purple" delay={1150}>
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-bold text-[#180039]">Performance Metrics</CardTitle>
            <CardDescription className="text-sm mt-2 text-[#666]">Multi-dimensional analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid stroke="rgba(42, 142, 158, 0.2)" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fill: "#180039", fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fill: "#666", fontSize: 10 }}
                />
                <Radar
                  name="Performance"
                  dataKey="score"
                  stroke="#2A8E9E"
                  fill="#2A8E9E"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(42, 142, 158, 0.95)",
                    border: "1px solid #2A8E9E",
                    borderRadius: "12px",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(42, 142, 158, 0.2)"
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
            
            {/* Graph Explanation */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
              <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
              <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                <li><strong className="text-[#2A8E9E]">Multi-Dimensional Performance:</strong> Radar chart showing scores across 5 key metrics (Views, Engagement, Retention, Growth, Quality)</li>
                <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Views (95%) and Growth (91%) are strongest areas - balanced performance across all dimensions</li>
                <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Radar/spider chart visualization to compare multiple variables simultaneously - reveals strengths and weaknesses</li>
              </ul>
            </div>
          </CardContent>
        </GlowCard>
      </div>

      {/* Weekly Trends and Category Distribution */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Weekly Activity Pattern */}
        <GlowCard glowColor="primary" delay={1200}>
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-bold text-[#180039]">Weekly Activity Pattern</CardTitle>
            <CardDescription className="text-sm mt-2 text-[#666]">Day-of-week trending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                <XAxis dataKey="day" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                <YAxis stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(42, 142, 158, 0.95)",
                    border: "1px solid #2A8E9E",
                    borderRadius: "12px",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(42, 142, 158, 0.2)"
                  }}
                />
                <Bar dataKey="videos" radius={[8, 8, 0, 0]} fill="#2A8E9E" name="Videos" />
                <Bar dataKey="engagement" radius={[8, 8, 0, 0]} fill="#180039" name="Engagement %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </GlowCard>

        {/* Content Categories Distribution */}
        <GlowCard glowColor="purple" delay={1250}>
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-bold text-[#180039]">Content Categories Distribution</CardTitle>
            <CardDescription className="text-sm mt-2 text-[#666]">Breakdown of trending videos by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCategoriesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                <XAxis type="number" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                <YAxis dataKey="category" type="category" stroke="#2A8E9E" fontSize={11} fontWeight={600} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(42, 142, 158, 0.95)",
                    border: "1px solid #2A8E9E",
                    borderRadius: "12px",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(42, 142, 158, 0.2)"
                  }}
                  formatter={(value: number) => `${value.toLocaleString()} videos`}
                />
                <Bar dataKey="videos" radius={[0, 12, 12, 0]} fill="#2A8E9E">
                  {topCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </GlowCard>
      </div>

      {/* Engagement Breakdown and Country Distribution */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Engagement Breakdown */}
        <GlowCard glowColor="primary" delay={1300}>
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-bold text-[#180039]">Engagement Breakdown</CardTitle>
            <CardDescription className="text-sm mt-2 text-[#666]">Detailed engagement metrics distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart with better spacing */}
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={engagementBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={(entry: any) => `${entry.type}\n${entry.percentage}%`}
                      outerRadius={90}
                      innerRadius={30}
                      paddingAngle={3}
                      minAngle={1}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1000}
                    >
                      {engagementBreakdown.map((entry, index) => (
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
                        `${props.payload.percentage}%`,
                        props.payload.type
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Detailed Breakdown List */}
              <div className="flex flex-col justify-center space-y-4">
                {engagementBreakdown.map((entry, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full shadow-md"
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="font-bold text-[#180039]">{entry.type}</span>
                      </div>
                      <span className="text-2xl font-bold text-[#2A8E9E]">{entry.percentage}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#666]">{entry.value.toLocaleString()} total</span>
                      <div className="w-full max-w-[200px] h-2 bg-[#E9F3F4] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(entry.percentage / 3.1) * 100}%`,
                            backgroundColor: entry.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Graph Explanation */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
              <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
              <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                <li><strong className="text-[#2A8E9E]">Engagement Breakdown:</strong> Pie chart showing distribution of engagement types (Likes 3.1%, Comments 0.06%, Shares 0.08%)</li>
                <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Likes dominate engagement (3.1%) - comments and shares are much rarer, showing different engagement levels</li>
                <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Pie chart with percentage labels - reveals composition and relative importance of each engagement type</li>
              </ul>
            </div>
          </CardContent>
        </GlowCard>

        {/* Top Countries Distribution */}
        <GlowCard glowColor="purple" delay={1350}>
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-bold text-[#180039]">Top Countries Distribution</CardTitle>
            <CardDescription className="text-sm mt-2 text-[#666]">Percentage of trending videos by country</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  labelLine={false}
                  label={(entry: any) => `${entry.country}: ${entry.percentage}%`}
                  fill="#8884d8"
                  dataKey="percentage"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {countryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  formatter={(value: number) => `${value}%`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Graph Explanation */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
              <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
              <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                <li><strong className="text-[#2A8E9E]">Country Distribution:</strong> Donut chart showing percentage of trending videos by country (US 18.5%, India 12.3%, etc.)</li>
                <li><strong className="text-[#2A8E9E]">Key Finding:</strong> US and India dominate (30.8% combined) - geographic location strongly influences trending patterns</li>
                <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Donut/pie chart with inner radius - reveals geographic concentration and market distribution</li>
              </ul>
            </div>
          </CardContent>
        </GlowCard>
      </div>

      {/* Channel Performance */}
      <GlowCard glowColor="primary" delay={1200}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <User className="w-5 h-5 text-[#2A8E9E]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">Top Channels by Trending Appearances</CardTitle>
              <CardDescription className="text-[#666]">Less than 1% of channels achieve consistent viral success</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={topChannelsData.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
              <defs>
                <linearGradient id="channelGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#180039" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis 
                dataKey="channel" 
                angle={-45}
                textAnchor="end"
                height={100}
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
              <Bar dataKey="appearances" fill="url(#channelGradient)" radius={[8, 8, 0, 0]} animationDuration={1000}>
                {topChannelsData.slice(0, 10).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.starRating === 5 ? "#2A8E9E" : entry.starRating >= 4 ? "#180039" : "#E9F3F4"}
                    style={{
                      filter: `drop-shadow(0 4px 8px rgba(42, 142, 158, 0.3))`,
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Graph Explanation */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
            <ul className="text-xs text-[#666] space-y-1 list-disc list-inside mb-3">
              <li><strong className="text-[#2A8E9E]">Channel Performance Analysis:</strong> Bar chart showing trending appearances for top 10 channels</li>
              <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Top channels (Music Label A: 2,847 appearances) dominate - channel reputation strongly predicts viral success</li>
              <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Vertical bar chart with color coding by star rating - reveals power-law distribution of channel success</li>
            </ul>
            <p className="text-sm text-[#666] leading-relaxed">
              <strong className="text-[#180039]">Insight:</strong> Consistent viral success is <strong className="text-[#2A8E9E]">extremely rare</strong>. 
              The top 15 channels represent less than 1% of all channels but account for significant trending appearances. 
              Elite performers (10+ trending videos) have global reach (40+ countries) and consistent quality formulas.
            </p>
          </div>
        </CardContent>
      </GlowCard>

      {/* Channel Efficiency Scatter */}
      <GlowCard glowColor="purple" delay={1250}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#180039]/10 border border-[#180039]/20">
              <Trophy className="w-5 h-5 text-[#180039]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">Channel Efficiency Analysis</CardTitle>
              <CardDescription className="text-[#666]">Relationship between trending appearances and unique videos</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <defs>
                <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#180039" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis 
                type="number" 
                dataKey="uniqueVideos" 
                name="Unique Videos"
                label={{ value: "Unique Videos", position: "insideBottom", offset: -5 }}
                stroke="#2A8E9E"
                fontSize={12}
                fontWeight={600}
              />
              <YAxis 
                type="number" 
                dataKey="appearances" 
                name="Trending Appearances"
                label={{ value: "Trending Appearances", angle: -90, position: "insideLeft" }}
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
              <Scatter name="Channels" data={topChannelsData} fill="url(#efficiencyGradient)">
                {topChannelsData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.starRating === 5 ? "#2A8E9E" : entry.starRating >= 4 ? "#180039" : "#E9F3F4"}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {topChannelsData.slice(0, 3).map((channel, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#180039] truncate">{channel.channel}</span>
                  <StarRating rating={channel.starRating} size="sm" />
                </div>
                <div className="text-sm font-bold text-[#2A8E9E]">{channel.appearances.toLocaleString()} appearances</div>
                <div className="text-xs text-[#666]">Efficiency: {channel.efficiency}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </GlowCard>

      {/* Rank Distribution */}
      <GlowCard glowColor="teal" delay={1300}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <BarChart3 className="w-5 h-5 text-[#2A8E9E]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">Rank Distribution</CardTitle>
              <CardDescription className="text-[#666]">How videos are distributed across ranks 1-50</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={rankDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#180039" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis dataKey="rank" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
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
              <Bar dataKey="count" fill="url(#rankGradient)" radius={[8, 8, 0, 0]} animationDuration={1000}>
                {rankDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.starRating === 5 ? "#2A8E9E" : entry.starRating >= 4 ? "#180039" : "#E9F3F4"}
                    style={{
                      filter: `drop-shadow(0 4px 8px rgba(42, 142, 158, 0.3))`,
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
            <p className="text-sm text-[#666] leading-relaxed">
              <strong className="text-[#180039]">Insight:</strong> Rank distribution is balanced (5% per rank group), reflecting consistent data collection. 
              However, <strong className="text-[#2A8E9E]">Top 10 ranks</strong> show significantly higher average views (23.4M vs 4.8M for ranks 46-50). 
              Only 1,247 videos (0.04%) reached #1 rank, with average #1 duration of 2.3 days.
            </p>
          </div>
        </CardContent>
      </GlowCard>

      {/* Data Collection Period - Enhanced */}
      <GlowCard glowColor="teal" delay={1400}>
        <CardHeader className="relative pb-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <IconBox icon={<Calendar className="w-full h-full" />} color="purple" size="md" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-[#180039]">Data Collection Period</CardTitle>
              <CardDescription className="text-sm mt-2 text-[#666]">Comprehensive 2-year trending video analysis</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative pt-0">
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#E9F3F4]/50 border-2 border-[#2A8E9E]/30 hover:scale-105 transition-transform cursor-pointer">
              <span className="text-sm font-bold text-[#666] uppercase tracking-wider">Start:</span>
              <span className="font-bold text-[#2A8E9E] text-xl">October 2023</span>
            </div>
            <div className="text-4xl text-[#2A8E9E]">→</div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#E9F3F4]/50 border-2 border-[#2A8E9E]/30 hover:scale-105 transition-transform cursor-pointer">
              <span className="text-sm font-bold text-[#666] uppercase tracking-wider">End:</span>
              <span className="font-bold text-[#2A8E9E] text-xl">October 2025</span>
            </div>
            <div className="ml-auto flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#E9F3F4]/50 border-2 border-[#180039]/30 hover:scale-105 transition-transform cursor-pointer">
              <span className="text-sm font-bold text-[#666] uppercase tracking-wider">Duration:</span>
              <span className="font-bold text-[#180039] text-xl">24 Months</span>
            </div>
          </div>
          
          {/* Progress visualization */}
          <div className="mt-4">
            <AnimatedProgressBar value={100} label="Data Collection Progress" color="gradient" height="md" />
          </div>
        </CardContent>
      </GlowCard>

      {/* Key Insights - Premium Enhanced Design */}
      <GlowCard glowColor="teal" delay={1450}>
        <CardHeader className="relative pb-5 bg-gradient-to-r from-[#2A8E9E]/5 to-[#180039]/5 border-b border-[#E9F3F4]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent">
                Key Insights & Findings
              </CardTitle>
              <CardDescription className="text-sm mt-2 text-[#666]">
                Critical discoveries from analyzing 3.99M trending video snapshots
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative pt-6">
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20 hover:shadow-xl transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-[#180039] text-lg">Data Quality Excellence</h4>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                Our smart data cleaning approach retained <span className="font-bold text-[#2A8E9E]">95%</span> of data compared to only 52% with naive methods, preserving <span className="font-bold text-emerald-600">1.7 million</span> additional records for comprehensive analysis.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20 hover:shadow-xl transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#2A8E9E] to-[#180039]">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-[#180039] text-lg">Global Reach</h4>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                This dataset captures <span className="font-bold text-[#2A8E9E]">3.99 million</span> trending video snapshots across <span className="font-bold text-[#2A8E9E]">113 countries</span> over <span className="font-bold text-[#2A8E9E]">2 years</span>, representing one of the most comprehensive YouTube trending analyses.
              </p>
            </div>
          </div>
          
          {/* Additional Insights */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-200 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Peak Performance</div>
              <div className="text-2xl font-bold text-[#180039] mb-1">Top 10%</div>
              <div className="text-xs text-[#666]">Channels with 10+ trending videos</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Viral Rate</div>
              <div className="text-2xl font-bold text-[#180039] mb-1">12.8%</div>
              <div className="text-xs text-[#666]">Of all videos achieve trending</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#2A8E9E]/10 to-white border border-[#2A8E9E]/20 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Avg Duration</div>
              <div className="text-2xl font-bold text-[#180039] mb-1">4.2 days</div>
              <div className="text-xs text-[#666]">On trending page</div>
            </div>
          </div>
          
          {/* Visual stats summary - Enhanced */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-[#E9F3F4]">
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#2A8E9E]/5 border-2 border-[#2A8E9E]/20 text-sm font-bold hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
              <div className="w-3 h-3 rounded-full bg-[#2A8E9E] group-hover:scale-125 transition-transform animate-pulse"></div>
              <span className="text-[#180039]">3.99M Records</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/20 text-sm font-bold hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
              <div className="w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform animate-pulse"></div>
              <span className="text-[#180039]">113 Countries</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-2 border-purple-500/20 text-sm font-bold hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
              <div className="w-3 h-3 rounded-full bg-purple-500 group-hover:scale-125 transition-transform"></div>
              <span className="text-[#180039]">95% Retention</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#180039]/10 to-[#180039]/5 border-2 border-[#180039]/20 text-sm font-bold hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
              <div className="w-3 h-3 rounded-full bg-[#180039] group-hover:scale-125 transition-transform"></div>
              <span className="text-[#180039]">1.7M Preserved</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#2A8E9E]/5 border-2 border-[#2A8E9E]/20 text-sm font-bold hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
              <div className="w-3 h-3 rounded-full bg-[#2A8E9E] group-hover:scale-125 transition-transform"></div>
              <span className="text-[#180039]">338K Videos</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500/10 to-teal-500/5 border-2 border-teal-500/20 text-sm font-bold hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
              <div className="w-3 h-3 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></div>
              <span className="text-[#180039]">175 Languages</span>
            </div>
          </div>
        </CardContent>
      </GlowCard>
    </div>
  )
}
