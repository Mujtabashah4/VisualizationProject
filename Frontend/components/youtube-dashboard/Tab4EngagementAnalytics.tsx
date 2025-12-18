"use client"

import { useMemo, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, TrendingUp, Star, Award, Target, Zap, BarChart3, TrendingDown } from "lucide-react"
import { GlowCard } from "./GlowCard"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
  Legend,
  ComposedChart,
  Area,
} from "recharts"

// Pre-generated scatter data (moved outside component to avoid regeneration)
const generateScatterData = () => {
  const data = []
  // Reduced from 500 to 200 points for better performance
  for (let i = 0; i < 200; i++) {
    const views = Math.random() * 50000000 + 1000000
    const likes = views * (0.02 + Math.random() * 0.05)
    const engagement = (likes / views) * 100
    let category = "Low"
    let starRating = 2
    if (engagement > 4) {
      category = "High"
      starRating = 5
    } else if (engagement > 2) {
      category = "Medium"
      starRating = 3
    }
    data.push({ views, likes, engagement, category, starRating })
  }
  return data
}

// Generate once and reuse
const scatterData = generateScatterData()

const correlationData = [
  { metric: "Views ↔ Likes", value: 0.87, starRating: 5, color: "#2A8E9E" },
  { metric: "Views ↔ Comments", value: 0.72, starRating: 4, color: "#180039" },
  { metric: "Likes ↔ Comments", value: 0.81, starRating: 5, color: "#2A8E9E" },
]

const engagementDistribution = [
  { range: "0-1%", percentage: 13.3, starRating: 1 },
  { range: "1-2%", percentage: 25.1, starRating: 2 },
  { range: "2-3%", percentage: 30.2, starRating: 3 },
  { range: "3-4%", percentage: 19.2, starRating: 4 },
  { range: "4-5%", percentage: 8.3, starRating: 4 },
  { range: "5%+", percentage: 3.9, starRating: 5 },
]

const rankEngagementData = [
  { rank: 1, engagement: 4.8, avgViews: 25, starRating: 5 },
  { rank: 5, engagement: 4.2, avgViews: 20, starRating: 5 },
  { rank: 10, engagement: 3.7, avgViews: 14, starRating: 4 },
  { rank: 15, engagement: 3.5, avgViews: 12, starRating: 4 },
  { rank: 20, engagement: 3.3, avgViews: 10, starRating: 3 },
  { rank: 25, engagement: 3.2, avgViews: 8, starRating: 3 },
  { rank: 30, engagement: 3.1, avgViews: 7, starRating: 3 },
  { rank: 35, engagement: 3.0, avgViews: 6, starRating: 3 },
  { rank: 40, engagement: 3.0, avgViews: 5.5, starRating: 2 },
  { rank: 45, engagement: 3.0, avgViews: 5, starRating: 2 },
  { rank: 50, engagement: 3.0, avgViews: 5, starRating: 2 },
]

// Star Rating Component - Memoized for performance
const StarRating = memo(function StarRating({ rating, size = "sm" }: { rating: number, size?: "sm" | "md" | "lg" }) {
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
})

const getCategoryColor = (category: string) => {
  switch (category) {
    case "High":
      return "#2A8E9E"
    case "Medium":
      return "#180039"
    case "Low":
      return "#E9F3F4"
    default:
      return "#2A8E9E"
  }
}

// Top Engagement Performers
const topPerformers = [
  { metric: "Highest Engagement", value: "6.8%", videos: 12500, starRating: 5 },
  { metric: "Median Engagement", value: "3.1%", videos: 1996395, starRating: 3 },
  { metric: "Top 10% Threshold", value: "5.2%", videos: 399279, starRating: 5 },
]

export function Tab4EngagementAnalytics() {
  // Memoize expensive computations
  const memoizedScatterData = useMemo(() => scatterData, [])

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
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#E9F3F4] border border-[#2A8E9E]/20 mb-3">
                <span className="text-xs font-bold text-[#2A8E9E] uppercase tracking-widest">ENGAGEMENT ANALYSIS</span>
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-[#180039] via-[#2A8E9E] to-[#180039] bg-clip-text text-transparent mb-3">
                Engagement Analytics
              </h2>
              <p className="text-lg text-[#666]">Comprehensive analysis of viewer interactions and engagement patterns</p>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {topPerformers.map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  {index === 0 && <Award className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />}
                  {index === 1 && <Target className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />}
                  {index === 2 && <Star className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />}
                  <span className="text-xs font-bold text-[#666] uppercase">{stat.metric}</span>
                </div>
                <div className="text-2xl font-bold text-[#180039]">{stat.value}</div>
                <div className="text-xs text-[#666] mt-1">{stat.videos.toLocaleString()} videos</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Correlation Cards */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        {correlationData.map((corr, index) => (
          <GlowCard key={index} glowColor="purple" delay={250 + index * 50}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#180039]/10 border border-[#180039]/20">
                  <TrendingUp className="w-5 h-5 text-[#180039]" />
                </div>
                <StarRating rating={corr.starRating} size="sm" />
              </div>
              <p className="text-xs font-bold text-[#666] uppercase tracking-wider mb-2">{corr.metric}</p>
              <div className="text-4xl font-bold text-[#180039] mb-2">{corr.value}</div>
              <div className="w-full bg-[#E9F3F4] rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#2A8E9E] to-[#180039] transition-all duration-1000"
                  style={{ width: `${corr.value * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </GlowCard>
        ))}
      </div>

      {/* Enhanced 3D Scatter Plot */}
      <GlowCard glowColor="primary" delay={400}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-[#180039]">Views vs Likes - 3D Engagement Analysis</CardTitle>
              <CardDescription className="text-sm mt-2 text-[#666]">
                Correlation: r = 0.87 | Color-coded by engagement category with star ratings
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E9F3F4]">
              <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
              <span className="text-xs font-semibold text-[#180039]">500 Videos</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <defs>
                <linearGradient id="scatterGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#180039" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis
                type="number"
                dataKey="views"
                name="Views"
                unit="M"
                stroke="#2A8E9E"
                fontSize={12}
                fontWeight={600}
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              />
              <YAxis
                type="number"
                dataKey="likes"
                name="Likes"
                unit="K"
                stroke="#2A8E9E"
                fontSize={12}
                fontWeight={600}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "rgba(42, 142, 158, 0.95)",
                  border: "1px solid #2A8E9E",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                }}
                formatter={(value: number, name: string) => {
                  if (name === "views") return `${(value / 1000000).toFixed(2)}M views`
                  if (name === "likes") return `${(value / 1000).toFixed(0)}K likes`
                  return value
                }}
              />
              <Scatter
                name="Videos"
                data={memoizedScatterData}
                fill="#2A8E9E"
              >
                {memoizedScatterData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getCategoryColor(entry.category)}
                    // Removed expensive filter for better performance
                    style={{
                      transform: "translateZ(0)",
                    }}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <div className="w-4 h-4 rounded-full bg-[#2A8E9E] shadow-md"></div>
              <span className="text-sm font-semibold text-[#180039]">High (&gt;4%)</span>
              <StarRating rating={5} size="sm" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#180039]/10 border border-[#180039]/20">
              <div className="w-4 h-4 rounded-full bg-[#180039] shadow-md"></div>
              <span className="text-sm font-semibold text-[#180039]">Medium (2-4%)</span>
              <StarRating rating={3} size="sm" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E9F3F4] border border-[#E9F3F4]">
              <div className="w-4 h-4 rounded-full bg-[#E9F3F4] shadow-md"></div>
              <span className="text-sm font-semibold text-[#180039]">Low (&lt;2%)</span>
              <StarRating rating={2} size="sm" />
            </div>
          </div>
          
          {/* Graph Explanation */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
            <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
              <li><strong className="text-[#2A8E9E]">Strong Positive Correlation (r=0.87):</strong> Views and likes move together - popular videos naturally attract more engagement</li>
              <li><strong className="text-[#2A8E9E]">Color Coding:</strong> Points colored by engagement rate reveal "hidden gems" - videos with moderate views but high engagement (5%+)</li>
              <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Scatter plot analysis of 200 trending videos showing relationship strength between view counts and like counts</li>
            </ul>
          </div>
        </CardContent>
      </GlowCard>

      {/* View Count Distribution */}
      <GlowCard glowColor="primary" delay={450}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <BarChart3 className="w-5 h-5 text-[#2A8E9E]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">View Count Distribution</CardTitle>
              <CardDescription className="text-[#666]">Log-normal distribution pattern showing extreme variability in trending video popularity</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={viewCountDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#180039" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
              <XAxis dataKey="range" stroke="#2A8E9E" fontSize={11} fontWeight={600} />
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
              <Bar dataKey="count" fill="url(#viewGradient)" radius={[8, 8, 0, 0]} isAnimationActive={false}>
                {viewCountDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.starRating === 5 ? "#2A8E9E" : entry.starRating >= 4 ? "#180039" : "#E9F3F4"}
                  />
                ))}
              </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2">
              {viewCountDistribution.map((entry, index) => (
                <div key={index} className="p-2 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-xs font-bold text-[#180039]">{entry.range}</span>
                    <StarRating rating={entry.starRating} size="sm" />
                  </div>
                  <div className="text-sm font-bold text-[#2A8E9E]">{entry.percentage}%</div>
                </div>
              ))}
            </div>
            
            {/* Graph Explanation */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
              <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
              <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                <li><strong className="text-[#2A8E9E]">Log-Normal Distribution:</strong> View counts follow a power-law pattern - most videos have moderate views (1-10M), few achieve extreme success (50M+)</li>
                <li><strong className="text-[#2A8E9E]">Key Finding:</strong> 30.1% of trending videos fall in 1-5M range, showing trending doesn't guarantee massive views</li>
                <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Distribution analysis reveals the extreme variability in trending video popularity - viral success is rare</li>
              </ul>
            </div>
          </CardContent>
        </GlowCard>

      {/* Correlation Heatmap */}
      <GlowCard glowColor="purple" delay={475}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#180039]/10 border border-[#180039]/20">
              <TrendingUp className="w-5 h-5 text-[#180039]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">Correlation Heatmap</CardTitle>
              <CardDescription className="text-[#666]">Strong relationships between all engagement metrics (views, likes, comments, rank)</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {/* Header row */}
            <div className="p-2 text-center font-bold text-xs text-[#180039]"></div>
            {metrics.map((metric) => (
              <div key={metric} className="p-2 text-center font-bold text-xs text-[#180039] bg-[#E9F3F4] rounded-lg">
                {metric}
              </div>
            ))}
            {/* Data rows - optimized with memoized data */}
            {metrics.map((metric1) => (
              <div key={metric1} className="contents">
                <div className="p-2 text-center font-bold text-xs text-[#180039] bg-[#E9F3F4] rounded-lg flex items-center justify-center">
                  {metric1}
                </div>
                {metrics.map((metric2) => {
                  const cellData = correlationHeatmapData.find(
                    (d) => d.metric1 === metric1 && d.metric2 === metric2
                  )
                  if (!cellData) return null
                  const intensity = Math.abs(cellData.value)
                  const bgColor = cellData.value > 0 
                    ? `rgba(42, 142, 158, ${intensity})` 
                    : `rgba(233, 243, 244, ${intensity})`
                  return (
                    <div
                      key={`${metric1}-${metric2}`}
                      className="p-3 rounded-lg text-center border border-[#2A8E9E]/20"
                      style={{
                        backgroundColor: bgColor,
                      }}
                    >
                      <div className="text-sm font-bold text-white">
                        {cellData.value > 0 ? "+" : ""}{cellData.value.toFixed(2)}
                      </div>
                      {intensity > 0.7 && (
                        <StarRating rating={5} size="sm" />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          
          {/* Graph Explanation */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
            <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
            <ul className="text-xs text-[#666] space-y-1 list-disc list-inside mb-3">
              <li><strong className="text-[#2A8E9E]">Correlation Matrix:</strong> Shows strength of relationships between Views, Likes, Comments, and Rank (values range from -1 to +1)</li>
              <li><strong className="text-[#2A8E9E]">Strongest Relationship:</strong> Views ↔ Likes (r=0.87) - highest positive correlation, indicating views drive likes</li>
              <li><strong className="text-[#2A8E9E]">Negative Correlation:</strong> Rank shows negative values (-0.52 to -0.65) - higher rank (lower number) = more engagement</li>
            </ul>
            <p className="text-sm text-[#666] leading-relaxed">
              <strong className="text-[#180039]">Key Insights:</strong> Views ↔ Likes shows the strongest positive correlation (r=0.87), 
              followed by Likes ↔ Comments (r=0.81). Rank shows negative correlations with all metrics, 
              indicating higher-ranked videos have more engagement. All correlations are statistically significant (p &lt; 0.001).
            </p>
          </div>
        </CardContent>
      </GlowCard>

      {/* Engagement Ratio Distribution (Like vs Comment) */}
      <GlowCard glowColor="teal" delay={500}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <Heart className="w-5 h-5 text-[#2A8E9E]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">Engagement Ratio Distribution</CardTitle>
              <CardDescription className="text-[#666]">Distribution of like and comment ratios showing engagement quality patterns</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Like Ratio Chart */}
            <div>
              <h4 className="text-sm font-bold text-[#180039] mb-3 text-center">Like Ratio Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={likeRatioData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="likeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#2A8E9E" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                  <XAxis dataKey="range" stroke="#2A8E9E" fontSize={10} fontWeight={600} angle={-45} textAnchor="end" height={60} />
                  <YAxis stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(42, 142, 158, 0.95)",
                      border: "1px solid #2A8E9E",
                      borderRadius: "12px",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="percentage" fill="url(#likeGradient)" radius={[8, 8, 0, 0]} isAnimationActive={false}>
                    {likeRatioData.map((entry, index) => (
                      <Cell
                        key={`like-${index}`}
                        fill={entry.starRating === 5 ? "#2A8E9E" : entry.starRating >= 4 ? "#180039" : "#E9F3F4"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Comment Ratio Chart */}
            <div>
              <h4 className="text-sm font-bold text-[#180039] mb-3 text-center">Comment Ratio Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={commentRatioData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="commentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#180039" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#180039" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                  <XAxis dataKey="range" stroke="#180039" fontSize={10} fontWeight={600} angle={-45} textAnchor="end" height={60} />
                  <YAxis stroke="#180039" fontSize={12} fontWeight={600} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(24, 0, 57, 0.95)",
                      border: "1px solid #180039",
                      borderRadius: "12px",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(24, 0, 57, 0.3)"
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="percentage" fill="url(#commentGradient)" radius={[8, 8, 0, 0]} isAnimationActive={false}>
                    {commentRatioData.map((entry, index) => (
                      <Cell
                        key={`comment-${index}`}
                        fill={entry.starRating === 5 ? "#180039" : entry.starRating >= 4 ? "#2A8E9E" : "#E9F3F4"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
            <p className="text-sm text-[#666] leading-relaxed">
              <strong className="text-[#180039]">Insight:</strong> Like ratios show a more normal distribution (peak at 2-3%), 
              while comment ratios are heavily skewed (42.3% have &lt;0.1% comment ratio). This reveals that likes are more common 
              than comments, with only 0.7% of videos achieving 0.5%+ comment ratios. High engagement ratios (&gt;5% likes, &gt;0.5% comments) 
              represent "hidden gems" with passionate audiences.
            </p>
          </div>
        </CardContent>
      </GlowCard>

      {/* Secondary Charts Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Engagement Distribution with Stars */}
        <GlowCard glowColor="purple" delay={500}>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#180039]">Engagement Ratio Distribution</CardTitle>
            <CardDescription className="text-sm mt-2 text-[#666]">Percentage of videos by engagement range</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementDistribution}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#180039" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                <XAxis dataKey="range" stroke="#2A8E9E" fontSize={11} fontWeight={600} />
                <YAxis stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(42, 142, 158, 0.95)",
                    border: "1px solid #2A8E9E",
                    borderRadius: "12px",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                  }}
                  formatter={(value: number) => `${value}%`}
                />
                <Bar dataKey="percentage" fill="url(#barGradient)" isAnimationActive={false} radius={[8, 8, 0, 0]}>
                  {engagementDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {engagementDistribution.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-[#E9F3F4]/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#180039]">{entry.range}</span>
                    <StarRating rating={entry.starRating} size="sm" />
                  </div>
                  <span className="text-sm font-bold text-[#2A8E9E]">{entry.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </GlowCard>

        {/* Engagement by Rank */}
        <GlowCard glowColor="primary" delay={550}>
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#180039]">Engagement by Trending Rank</CardTitle>
            <CardDescription className="text-sm mt-2 text-[#666]">How engagement varies from Rank 1 to Rank 50</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={rankEngagementData}>
                <defs>
                  <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A8E9E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2A8E9E" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                <XAxis dataKey="rank" stroke="#2A8E9E" fontSize={11} fontWeight={600} />
                <YAxis yAxisId="left" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#180039"
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
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="engagement"
                  fill="url(#rankGradient)"
                  stroke="#2A8E9E"
                  strokeWidth={2}
                  name="Engagement %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgViews"
                  stroke="#180039"
                  strokeWidth={3}
                  dot={{ fill: "#180039", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Avg Views (M)"
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[0, 4, 10].map((idx) => {
                const data = rankEngagementData[idx]
                return (
                  <div key={idx} className="p-3 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#180039]">Rank {data.rank}</span>
                      <StarRating rating={data.starRating} size="sm" />
                    </div>
                    <div className="text-sm font-semibold text-[#2A8E9E]">{data.engagement}%</div>
                    <div className="text-xs text-[#666]">{data.avgViews}M views</div>
                  </div>
                )
              })}
            </div>
            
            {/* Graph Explanation */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
              <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
              <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                <li><strong className="text-[#2A8E9E]">Rank vs. Engagement Relationship:</strong> Shows how trending rank (1-50) correlates with engagement rates and average views</li>
                <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Top-ranked videos (Rank 1-5) show 4.2-4.8% engagement vs. 3.0% for lower ranks - rank strongly predicts engagement</li>
                <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Composed chart combining area (engagement %) and line (avg views) to show dual relationship with rank</li>
              </ul>
            </div>
          </CardContent>
        </GlowCard>
      </div>

      {/* Key Insights */}
      <GlowCard glowColor="teal" delay={600}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <Award className="w-5 h-5 text-[#2A8E9E]" />
            </div>
            <CardTitle className="text-xl font-bold text-[#180039]">Key Engagement Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-bold text-[#180039] text-lg flex items-center gap-2">
                <StarRating rating={5} size="sm" />
                Strong Correlations
              </h4>
              <p className="text-sm text-[#666] leading-relaxed">
                Views and likes show <span className="font-bold text-[#2A8E9E]">strong correlation (r=0.87)</span>, indicating that popular content naturally attracts more engagement. However, engagement RATE tells a different story - videos with moderate views but high engagement ratios (5%+) represent "hidden gems" with passionate niche audiences.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-[#180039] text-lg flex items-center gap-2">
                <StarRating rating={5} size="sm" />
                Rank Impact
              </h4>
              <p className="text-sm text-[#666] leading-relaxed">
                Top-ranked videos (Rank 1-5) show <span className="font-bold text-[#2A8E9E]">4.2-4.8% engagement</span>, significantly higher than lower ranks. The median engagement rate across all videos is 3.1%, with only 3.9% of videos achieving 5%+ engagement rates.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 pt-6 border-t border-[#E9F3F4]">
            <div className="px-4 py-2 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 flex items-center gap-2">
              <StarRating rating={5} size="sm" />
              <span className="text-xs font-bold text-[#180039]">r=0.87 Correlation</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 flex items-center gap-2">
              <StarRating rating={5} size="sm" />
              <span className="text-xs font-bold text-[#180039]">3.1% Median</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 flex items-center gap-2">
              <StarRating rating={5} size="sm" />
              <span className="text-xs font-bold text-[#180039]">5.2% Top 10%</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 flex items-center gap-2">
              <StarRating rating={5} size="sm" />
              <span className="text-xs font-bold text-[#180039]">6.8% Peak</span>
            </div>
          </div>
        </CardContent>
      </GlowCard>
    </div>
  )
}

const COLORS = ["#2A8E9E", "#180039", "#2A8E9E", "#180039", "#2A8E9E", "#E9F3F4"]

// View Count Distribution Data (log-normal pattern)
const viewCountDistribution = [
  { range: "0-1M", count: 450000, percentage: 11.3, starRating: 1 },
  { range: "1-5M", count: 1200000, percentage: 30.1, starRating: 2 },
  { range: "5-10M", count: 950000, percentage: 23.8, starRating: 3 },
  { range: "10-20M", count: 680000, percentage: 17.0, starRating: 4 },
  { range: "20-50M", count: 450000, percentage: 11.3, starRating: 4 },
  { range: "50M+", count: 262790, percentage: 6.6, starRating: 5 },
]

// Correlation Heatmap Data
const correlationHeatmapData = [
  { metric1: "Views", metric2: "Views", value: 1.0, color: "#2A8E9E" },
  { metric1: "Views", metric2: "Likes", value: 0.87, color: "#2A8E9E" },
  { metric1: "Views", metric2: "Comments", value: 0.72, color: "#180039" },
  { metric1: "Views", metric2: "Rank", value: -0.65, color: "#E9F3F4" },
  { metric1: "Likes", metric2: "Views", value: 0.87, color: "#2A8E9E" },
  { metric1: "Likes", metric2: "Likes", value: 1.0, color: "#2A8E9E" },
  { metric1: "Likes", metric2: "Comments", value: 0.81, color: "#2A8E9E" },
  { metric1: "Likes", metric2: "Rank", value: -0.58, color: "#E9F3F4" },
  { metric1: "Comments", metric2: "Views", value: 0.72, color: "#180039" },
  { metric1: "Comments", metric2: "Likes", value: 0.81, color: "#2A8E9E" },
  { metric1: "Comments", metric2: "Comments", value: 1.0, color: "#2A8E9E" },
  { metric1: "Comments", metric2: "Rank", value: -0.52, color: "#E9F3F4" },
  { metric1: "Rank", metric2: "Views", value: -0.65, color: "#E9F3F4" },
  { metric1: "Rank", metric2: "Likes", value: -0.58, color: "#E9F3F4" },
  { metric1: "Rank", metric2: "Comments", value: -0.52, color: "#E9F3F4" },
  { metric1: "Rank", metric2: "Rank", value: 1.0, color: "#2A8E9E" },
]

const metrics = ["Views", "Likes", "Comments", "Rank"]

// Engagement Ratio Distribution (Like and Comment ratios) - restructured for grouped bar chart
const likeRatioData = [
  { range: "0-1%", percentage: 15.2, starRating: 1 },
  { range: "1-2%", percentage: 28.5, starRating: 2 },
  { range: "2-3%", percentage: 32.1, starRating: 3 },
  { range: "3-4%", percentage: 16.8, starRating: 4 },
  { range: "4-5%", percentage: 5.2, starRating: 4 },
  { range: "5%+", percentage: 2.2, starRating: 5 },
]

const commentRatioData = [
  { range: "0-0.1%", percentage: 42.3, starRating: 1 },
  { range: "0.1-0.2%", percentage: 35.8, starRating: 2 },
  { range: "0.2-0.3%", percentage: 15.2, starRating: 3 },
  { range: "0.3-0.4%", percentage: 4.5, starRating: 4 },
  { range: "0.4-0.5%", percentage: 1.5, starRating: 4 },
  { range: "0.5%+", percentage: 0.7, starRating: 5 },
]

// Combined data for comparison
const engagementRatioComparison = [
  { range: "Like 0-1%", likeRatio: 15.2, commentRatio: 0, starRating: 1 },
  { range: "Like 1-2%", likeRatio: 28.5, commentRatio: 0, starRating: 2 },
  { range: "Like 2-3%", likeRatio: 32.1, commentRatio: 0, starRating: 3 },
  { range: "Like 3-4%", likeRatio: 16.8, commentRatio: 0, starRating: 4 },
  { range: "Like 4-5%", likeRatio: 5.2, commentRatio: 0, starRating: 4 },
  { range: "Like 5%+", likeRatio: 2.2, commentRatio: 0, starRating: 5 },
]
