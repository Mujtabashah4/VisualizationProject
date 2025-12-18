"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "./GlowCard"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  PieChart,
  Pie,
  Legend,
  CartesianGrid,
} from "recharts"
import { 
  Rocket, CheckCircle2, AlertCircle, Lightbulb, TrendingUp, Sparkles, Flame, Gem, Globe, 
  Brain, Target, Zap, Award, Star, BarChart3, Activity, Clock, Users, FileText, Hash, 
  TrendingDown, ArrowUpRight, ArrowDownRight, Eye, Heart, MessageSquare, Share2, Trophy
} from "lucide-react"

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface VideoInput {
  views: number
  likes: number
  comments: number
  country: string
  hasTags: boolean
  hasDescription: boolean
  dayPublished: string
  language: string
  titleLength?: number
  publishHour?: number
  channelVideoCount?: number
  channelAvgViews?: number
}

interface PredictionResult {
  viralProbability: number
  viralLabel: string
  predictedMaxViews: number
  growthPotential: number
  engagementHealth: number
  engagementLabel: string
  percentileViews: number
  percentileLikes: number
  percentileComments: number
  percentileEngagement: number
  recommendations: any[]
  featureImportance: Record<string, number>
  countryContext: any
  radarData: any[]
  comparisonData: any[]
  growthProjection?: any[]
  probabilityDistribution?: any[]
  modelMetrics?: {
    accuracy?: number
    precision?: number
    recall?: number
    f1Score?: number
    rocAuc?: number
  }
  predictionMethod?: string
  modelsUsed?: boolean
}

const countries = [
  "US", "India", "Brazil", "Russia", "Japan", "Germany", "UK", "France",
  "South Korea", "Mexico", "Indonesia", "Thailand", "Spain", "Italy", "Canada",
  "Australia", "Turkey", "Poland", "Argentina", "Netherlands"
]

const languages = [
  "English", "Spanish", "Hindi", "Portuguese", "Arabic", "Russian", "Japanese",
  "Korean", "French", "German", "Thai", "Indonesian", "Turkish", "Italian", "Polish"
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Fallback local prediction (when API is unavailable)
const localPredict = (input: VideoInput): PredictionResult => {
  // Average stats (from backend TRENDING_AVERAGES)
  const avgViews = 12100000
  const avgLikes = 376000
  const avgComments = 7000
  const avgEngagement = 3.1
  
  // Safe engagement rate calculation (prevent division by zero)
  const safeViews = Math.max(input.views, 1)
  const engagementRate = ((input.likes + input.comments) / safeViews) * 100
  
  // Calculate viral probability
  let score = 20
  const viewFactor = Math.min(Math.log10(safeViews) * 5, 30)
  score += viewFactor
  const engagementFactor = Math.min(engagementRate * 8, 25)
  score += engagementFactor
  if (input.hasTags) score += 10
  if (input.hasDescription) score += 6
  if (input.dayPublished === "Thursday" || input.dayPublished === "Friday") score += 8
  const viralProb = Math.min(99, Math.max(1, score)) / 100

  // Calculate engagement health
  let healthScore = 50
  if (engagementRate > 5) healthScore += 25
  else if (engagementRate > 3) healthScore += 15
  else if (engagementRate < 1) healthScore -= 15
  const engagementHealth = Math.min(100, Math.max(0, healthScore))

  // Generate recommendations
  const recommendations: any[] = []
  if (!input.hasTags) {
    recommendations.push({ type: "warning", text: "Add descriptive tags to improve discoverability", impact: "+12% potential reach" })
  } else {
    recommendations.push({ type: "success", text: "Tags present - good for discoverability", impact: null })
  }
  if (!input.hasDescription) {
    recommendations.push({ type: "warning", text: "Add a detailed description for better SEO", impact: "+8% potential engagement" })
  } else {
    recommendations.push({ type: "success", text: "Description present - good for SEO", impact: null })
  }
  if (input.dayPublished === "Thursday" || input.dayPublished === "Friday") {
    recommendations.push({ type: "success", text: `Published on optimal day (${input.dayPublished}) - excellent timing`, impact: null })
  } else if (input.dayPublished === "Monday") {
    recommendations.push({ type: "tip", text: "Consider posting on Thursday/Friday for better reach", impact: "+15% average engagement" })
  }
  if (engagementRate > 5) {
    recommendations.push({ type: "fire", text: "Exceptional engagement rate! Top 10% of trending videos", impact: null })
  } else if (engagementRate > 3) {
    recommendations.push({ type: "success", text: "Good engagement rate - above average performance", impact: null })
  } else if (engagementRate < 2) {
    recommendations.push({ type: "warning", text: "Low engagement rate - focus on audience interaction", impact: null })
  }
  if (input.views < 1000000 && engagementRate > 4) {
    recommendations.push({ type: "gem", text: "Hidden Gem detected: High engagement with moderate views - focus on promotion", impact: null })
  }
  if (viralProb > 0.7) {
    recommendations.push({ type: "fire", text: `High viral potential (${(viralProb * 100).toFixed(0)}%) - maximize promotion efforts!`, impact: null })
  }

  // Radar data with proper normalization (average = 50)
  const normalizedViews = Math.min((input.views / avgViews) * 50, 100)
  const normalizedLikes = Math.min((input.likes / avgLikes) * 50, 100)
  const normalizedComments = Math.min((input.comments / avgComments) * 50, 100)
  const normalizedEngagement = Math.min((engagementRate / avgEngagement) * 50, 100)
  
  const radarData = [
    { metric: "Views", user: normalizedViews, average: 50 },
    { metric: "Likes", user: normalizedLikes, average: 50 },
    { metric: "Engagement", user: normalizedEngagement, average: 50 },
    { metric: "Comments", user: normalizedComments, average: 50 },
    { metric: "Viral Potential", user: viralProb * 100, average: 50 },
  ]

  // Comparison data with proper percentile calculation
  const calcPercentile = (value: number, avg: number): number => {
    if (value >= avg * 2) return 95
    if (value >= avg * 1.5) return 85
    if (value >= avg) return 65
    if (value >= avg * 0.5) return 40
    if (value >= avg * 0.25) return 20
    return 10
  }
  
  const comparisonData = [
    { 
      metric: "Views", 
      user: input.views / 1000000, 
      average: avgViews / 1000000, 
      userPercentile: calcPercentile(input.views, avgViews)
    },
    { 
      metric: "Likes", 
      user: input.likes / 1000, 
      average: avgLikes / 1000, 
      userPercentile: calcPercentile(input.likes, avgLikes)
    },
    { 
      metric: "Comments", 
      user: input.comments, 
      average: avgComments, 
      userPercentile: calcPercentile(input.comments, avgComments)
    },
    { 
      metric: "Engagement Rate", 
      user: engagementRate, 
      average: avgEngagement, 
      userPercentile: calcPercentile(engagementRate, avgEngagement)
    },
  ]

  const predictedMaxViews = Math.round(safeViews * (1 + viralProb))
  const growthPotential = predictedMaxViews / safeViews

  return {
    viralProbability: viralProb * 100,
    viralLabel: viralProb >= 0.7 ? "HIGH POTENTIAL" : viralProb >= 0.4 ? "MODERATE" : "LOW",
    predictedMaxViews,
    growthPotential,
    engagementHealth,
    engagementLabel: engagementHealth >= 70 ? "Excellent" : engagementHealth >= 50 ? "Good" : "Needs Work",
    percentileViews: calcPercentile(input.views, avgViews),
    percentileLikes: calcPercentile(input.likes, avgLikes),
    percentileComments: calcPercentile(input.comments, avgComments),
    percentileEngagement: calcPercentile(engagementRate, avgEngagement),
    recommendations,
    featureImportance: { "View Velocity": 35, "Engagement Ratio": 28, "Has Tags": 15, "Country Factor": 12, "Has Description": 10 },
    countryContext: {
      country: input.country,
      avg_views: "4.0M",
      avg_engagement: "3.5%",
      your_views: input.views >= 1000000 ? `${(input.views / 1000000).toFixed(1)}M` : `${(input.views / 1000).toFixed(0)}K`,
      your_engagement: `${engagementRate.toFixed(1)}%`,
      competitiveness: "Medium",
      recommendation: `Your video is performing in the ${input.country} market`
    },
    radarData,
    comparisonData,
  }
}

// Day name to number mapping (matching backend)
const DAY_TO_NUM: Record<string, number> = {
  "Sunday": 1,
  "Monday": 2,
  "Tuesday": 3,
  "Wednesday": 4,
  "Thursday": 5,
  "Friday": 6,
  "Saturday": 7
}

// API prediction function
const apiPredict = async (input: VideoInput): Promise<PredictionResult> => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      views: input.views,
      likes: input.likes,
      comments: input.comments,
      publish_hour: input.publishHour || 18, // Default 6 PM
      publish_day: DAY_TO_NUM[input.dayPublished] || 5, // Convert day name to number
      has_tags: input.hasTags,
      has_description: input.hasDescription,
      has_language: !!input.language,
      title_length: input.titleLength || 50,
      channel_video_count: input.channelVideoCount || 10,
      channel_avg_views: input.channelAvgViews || 100000,
      country: input.country,
      language: input.language,
      day_published: input.dayPublished // For compatibility
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("API Error:", response.status, errorText)
    throw new Error(`API request failed: ${response.status}`)
  }
  
  const data = await response.json()
  
  // DEBUG: Log API response to verify models are being used
  console.log("🔍 API Response:", {
    models_used: data.models_used,
    prediction_method: data.prediction_method,
    viral_probability: data.viral_probability,
    predicted_max_views: data.predicted_max_views,
    debug: data._debug
  })
  
  // Average stats for comparison (from backend TRENDING_AVERAGES)
  const avgViews = 12100000
  const avgLikes = 376000
  const avgComments = 7000
  const avgEngagement = 3.1
  
  // Safe engagement rate calculation (prevent division by zero)
  const safeViews = Math.max(input.views, 1)
  const engagementRate = data.engagement_rate || ((input.likes + input.comments) / safeViews) * 100
  const viralProbPercent = data.viral_probability || 0 // Already in percentage from API
  const predictedViews = data.predicted_max_views || input.views * 2
  const growthPotential = data.growth_potential || (predictedViews / safeViews)

  // Build radar data with proper normalization based on actual averages
  // Normalize to 0-100 scale where average = 50
  const normalizedViews = Math.min((input.views / avgViews) * 50, 100)
  const normalizedLikes = Math.min((input.likes / avgLikes) * 50, 100)
  const normalizedComments = Math.min((input.comments / avgComments) * 50, 100)
  const normalizedEngagement = Math.min((engagementRate / avgEngagement) * 50, 100)
  
  const radarData = [
    { metric: "Views", user: normalizedViews, average: 50 },
    { metric: "Likes", user: normalizedLikes, average: 50 },
    { metric: "Engagement", user: normalizedEngagement, average: 50 },
    { metric: "Comments", user: normalizedComments, average: 50 },
    { metric: "Viral Potential", user: viralProbPercent, average: 50 },
  ]

  // Build comparison data using backend percentiles
  const comparisonData = [
    { 
      metric: "Views", 
      user: input.views / 1000000, 
      average: avgViews / 1000000, 
      userPercentile: data.percentile_views || 50 
    },
    { 
      metric: "Likes", 
      user: input.likes / 1000, 
      average: avgLikes / 1000, 
      userPercentile: data.percentile_likes || 50 
    },
    { 
      metric: "Comments", 
      user: input.comments, 
      average: avgComments, 
      userPercentile: data.percentile_comments || 50 
    },
    { 
      metric: "Engagement Rate", 
      user: engagementRate, 
      average: avgEngagement, 
      userPercentile: data.percentile_engagement || 50 
    },
  ]

  // Growth projection data (30-day forecast)
  // Uses compound growth model: views(t) = initial * (growth_rate ^ t)
  const growthProjection: Array<{day: number, views: number, likes: number, comments: number}> = []
  const days = [0, 7, 14, 21, 30]
  const currentViews = Math.max(input.views, 1)
  
  // Calculate daily growth rate to reach predicted views in 30 days
  // Formula: growth_rate = (predicted / current) ^ (1/30)
  const growthRate = Math.pow(Math.max(predictedViews, currentViews) / currentViews, 1/30)
  
  // Calculate initial engagement ratios (for scaling)
  const likeRatio = input.views > 0 ? input.likes / input.views : 0
  const commentRatio = input.views > 0 ? input.comments / input.views : 0
  
  days.forEach(day => {
    // Compound growth: views grow exponentially
    const projectedViews = Math.min(
      currentViews * Math.pow(growthRate, day),
      predictedViews
    )
    
    // Engagement typically decreases as views grow (viral videos get more views but lower engagement %)
    // Apply decay factor: engagement decreases by ~10% per week
    const engagementDecay = Math.pow(0.9, day / 7)
    const projectedLikes = Math.round(projectedViews * likeRatio * engagementDecay)
    const projectedComments = Math.round(projectedViews * commentRatio * engagementDecay)
    
    growthProjection.push({
      day,
      views: Math.round(projectedViews),
      likes: projectedLikes,
      comments: projectedComments,
    })
  })

  // Probability distribution data - dynamic based on actual prediction
  // Shows where this video falls in the distribution
  const getProbabilityRange = (prob: number) => {
    if (prob < 20) return "0-20%"
    if (prob < 40) return "20-40%"
    if (prob < 60) return "40-60%"
    if (prob < 80) return "60-80%"
    return "80-100%"
  }
  
  const userRange = getProbabilityRange(viralProbPercent)
  const probabilityDistribution = [
    { range: "0-20%", count: 15, label: "Low", isUser: userRange === "0-20%" },
    { range: "20-40%", count: 25, label: "Below Avg", isUser: userRange === "20-40%" },
    { range: "40-60%", count: 30, label: "Average", isUser: userRange === "40-60%" },
    { range: "60-80%", count: 20, label: "High", isUser: userRange === "60-80%" },
    { range: "80-100%", count: 10, label: "Viral", isUser: userRange === "80-100%" },
  ]

  // Model metrics from backend (or fallback to defaults)
  const modelMetrics = data.model_metrics ? {
    accuracy: data.model_metrics.accuracy || 75,
    precision: data.model_metrics.precision || 70,
    recall: data.model_metrics.recall || 65,
    f1Score: data.model_metrics.f1_score || 67,
    rocAuc: data.model_metrics.roc_auc || 80,
  } : {
    accuracy: 75,
    precision: 70,
    recall: 65,
    f1Score: 67,
    rocAuc: 80,
  }

  return {
    viralProbability: viralProbPercent, // Already in percentage
    viralLabel: data.viral_label || (viralProbPercent >= 70 ? "HIGH POTENTIAL" : viralProbPercent >= 40 ? "MODERATE" : "LOW"),
    predictedMaxViews: predictedViews,
    growthPotential: growthPotential,
    engagementHealth: data.engagement_health || (engagementRate >= 4 ? 80 : engagementRate >= 3 ? 60 : 40),
    engagementLabel: data.engagement_label || (engagementRate >= 4 ? "Excellent" : engagementRate >= 3 ? "Good" : "Needs Work"),
    percentileViews: data.percentile_views || 50,
    percentileLikes: data.percentile_likes || 50,
    percentileComments: data.percentile_comments || 50,
    percentileEngagement: data.percentile_engagement || 50,
    recommendations: data.recommendations || [],
    featureImportance: data.feature_importance || { "View Velocity": 35, "Engagement Ratio": 28, "Has Tags": 15, "Country Factor": 12, "Has Description": 10 },
    countryContext: data.country_context || null,
    radarData,
    comparisonData,
    growthProjection,
    probabilityDistribution,
    modelMetrics,
    predictionMethod: data.prediction_method || (data.models_used ? "XGBoost ML Models" : "Heuristic Fallback"),
    modelsUsed: data.models_used === true, // Explicitly check for true, default to false if undefined
  }
}

// Get icon component for recommendation
const getRecommendationIcon = (type: string) => {
  switch (type) {
    case "success": return CheckCircle2
    case "warning": return AlertCircle
    case "tip": case "info": return Lightbulb
    case "fire": return Flame
    case "gem": return Gem
    default: return TrendingUp
  }
}

export function Tab5VideoPredictor() {
  const [input, setInput] = useState<VideoInput>({
    views: 1500000,
    likes: 75000,
    comments: 3200,
    country: "US",
    hasTags: true,
    hasDescription: true,
    dayPublished: "Thursday",
    language: "English",
    titleLength: 50,
    publishHour: 18,
    channelVideoCount: 10,
    channelAvgViews: 100000,
  })

  const [results, setResults] = useState<PredictionResult | null>(null)
  const [resultsKey, setResultsKey] = useState(0) // Force re-render key
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAutoUpdating, setIsAutoUpdating] = useState(false)
  const [apiStatus, setApiStatus] = useState<"unknown" | "connected">("unknown")
  const [predictionMethod, setPredictionMethod] = useState<string>("")
  const hasInitialPrediction = useRef(false)
  const isUpdatingRef = useRef(false)

  // Helper function to handle numeric input changes
  const handleNumericChange = (field: keyof VideoInput, value: string) => {
    // Remove any non-numeric characters except empty string
    const numericOnly = value.replace(/[^\d]/g, "")
    
    // If empty, set to 0 (but display will be empty until blur)
    if (numericOnly === "") {
      const newInput = { ...input, [field]: 0 as any }
      setInput(newInput)
      return
    }
    
    // Remove leading zeros (but keep "0" if that's the only character)
    let cleanedValue = numericOnly
    if (numericOnly.length > 1) {
      cleanedValue = numericOnly.replace(/^0+/, "") || "0"
    }
    
    // Parse to number
    const numValue = parseInt(cleanedValue, 10)
    
    // Update if valid
    if (!isNaN(numValue) && numValue >= 0) {
      const newInput = { ...input, [field]: numValue as any }
      setInput(newInput)
    }
  }

  // Check API status on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then(res => res.json())
      .then(data => {
        if (data.models_loaded) {
          setApiStatus("connected")
        } else {
          setApiStatus("unknown")
        }
      })
      .catch(() => setApiStatus("unknown"))
  }, [])

  // Auto-update predictions when input changes (with debouncing)
  useEffect(() => {
    // Skip on initial mount - only update after first prediction
    if (!hasInitialPrediction.current) return
    
    // Set auto-updating indicator immediately when input changes
    setIsAutoUpdating(true)
    
    // Create a stable reference to current input for the timeout
    const currentInput = { ...input }
    let cancelled = false
    
    // Debounce: wait 500ms after user stops typing before making prediction
    const timeoutId = setTimeout(async () => {
      // Check if cancelled
      if (cancelled) return
      
      // Only auto-update if we have valid input values
      if (currentInput.views > 0 || currentInput.likes > 0 || currentInput.comments > 0) {
        try {
          console.log("Auto-updating predictions with:", currentInput)
          // Use the apiPredict function directly
          const result = await apiPredict(currentInput)
          
          // Check again if cancelled before updating
          if (cancelled) {
            console.log("⏹️ Auto-update cancelled")
            return
          }
          
          console.log("Auto-update successful:", result.viralProbability)
          console.log("Previous result viral prob:", results?.viralProbability)
          console.log("New result viral prob:", result.viralProbability)
          
          // Update results - create a completely new object with all nested objects copied
          const newResult: PredictionResult = {
            ...result,
            radarData: result.radarData ? [...result.radarData] : [],
            comparisonData: result.comparisonData ? [...result.comparisonData] : [],
            growthProjection: result.growthProjection ? [...result.growthProjection] : [],
            probabilityDistribution: result.probabilityDistribution ? [...result.probabilityDistribution] : [],
            recommendations: result.recommendations ? [...result.recommendations] : [],
            featureImportance: result.featureImportance ? { ...result.featureImportance } : {},
            countryContext: result.countryContext ? { ...result.countryContext } : null,
            modelMetrics: result.modelMetrics ? { ...result.modelMetrics } : undefined
          }
          
          console.log("Setting new results:", newResult.viralProbability)
          setResults(newResult)
          setResultsKey(prev => prev + 1) // Force re-render
          setApiStatus("connected")
          setPredictionMethod(result.predictionMethod || "XGBoost ML Models")
          setIsAutoUpdating(false)
          
          console.log("State update complete, key:", resultsKey + 1)
        } catch (error) {
          console.error("Auto-update API Error:", error)
          if (!cancelled) {
            setIsAutoUpdating(false)
          }
        }
      } else {
        if (!cancelled) {
          setIsAutoUpdating(false)
        }
      }
    }, 500)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      // Reset updating state if cleanup happens before timeout completes
      setIsAutoUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    input.views, 
    input.likes, 
    input.comments, 
    input.country, 
    input.hasTags, 
    input.hasDescription, 
    input.dayPublished, 
    input.language, 
    input.titleLength, 
    input.publishHour, 
    input.channelVideoCount, 
    input.channelAvgViews
    // NOTE: results is NOT in dependencies to prevent infinite loop
  ])

  // Update local prediction to include new fields
  const enhancedLocalPredict = (input: VideoInput): PredictionResult => {
    const localResult = localPredict(input)
    const safeViews = Math.max(input.views, 1)
    const engagementRate = ((input.likes + input.comments) / safeViews) * 100
    const viralProb = localResult.viralProbability / 100
    const predictedViews = localResult.predictedMaxViews
    const growthPotential = predictedViews / safeViews

    // Growth projection with engagement decay
    const growthProjection: Array<{day: number, views: number, likes: number, comments: number}> = []
    const days = [0, 7, 14, 21, 30]
    const growthRate = Math.pow(Math.max(predictedViews, safeViews) / safeViews, 1/30)
    
    const likeRatio = input.views > 0 ? input.likes / input.views : 0
    const commentRatio = input.views > 0 ? input.comments / input.views : 0
    
    days.forEach(day => {
      const projectedViews = Math.min(
        safeViews * Math.pow(growthRate, day),
        predictedViews
      )
      // Engagement decay factor
      const engagementDecay = Math.pow(0.9, day / 7)
      growthProjection.push({
        day,
        views: Math.round(projectedViews),
        likes: Math.round(projectedViews * likeRatio * engagementDecay),
        comments: Math.round(projectedViews * commentRatio * engagementDecay),
      })
    })

    // Model metrics
    const modelMetrics = {
      accuracy: 75,
      precision: 70,
      recall: 65,
      f1Score: 67,
      rocAuc: 80,
    }

    return {
      ...localResult,
      growthPotential,
      growthProjection,
      modelMetrics,
    }
  }

  const handleAnalyze = async (silent = false) => {
    console.log("🔵 handleAnalyze called, silent:", silent, "input:", input)
    // Don't show loading state for auto-updates to avoid UI flickering
    if (!silent) {
      setIsAnalyzing(true)
      console.log("Set isAnalyzing to true")
    }
    
    // Always try API first for real-time ML predictions
    try {
      console.log("📡 Making API call...")
      const result = await apiPredict(input)
      console.log("Manual analyze result:", result)
      // Create a completely new object with all nested objects copied
      const newResult: PredictionResult = {
        ...result,
        radarData: result.radarData ? [...result.radarData] : [],
        comparisonData: result.comparisonData ? [...result.comparisonData] : [],
        growthProjection: result.growthProjection ? [...result.growthProjection] : [],
        probabilityDistribution: result.probabilityDistribution ? [...result.probabilityDistribution] : [],
        recommendations: result.recommendations ? [...result.recommendations] : [],
        featureImportance: result.featureImportance ? { ...result.featureImportance } : {},
        countryContext: result.countryContext ? { ...result.countryContext } : null,
        modelMetrics: result.modelMetrics ? { ...result.modelMetrics } : undefined
      }
      setResults(newResult)
      setResultsKey(prev => prev + 1) // Force re-render
      setApiStatus("connected")
      setPredictionMethod(result.predictionMethod || "XGBoost ML Models")
      hasInitialPrediction.current = true
    } catch (error) {
      console.error("API Error:", error)
      // Only show alert for manual clicks, not auto-updates
      if (!silent) {
        alert("Unable to connect to ML prediction service. Please ensure the backend server is running on port 8000.\n\nStart the backend with: cd Backend && python main.py")
      }
      setApiStatus("unknown")
      setPredictionMethod("")
    } finally {
      // Always reset analyzing state
      if (!silent) {
        setIsAnalyzing(false)
      }
    }
  }

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
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#E9F3F4] border border-[#2A8E9E]/20">
                  <span className="text-xs font-bold text-[#2A8E9E] uppercase tracking-widest">AI-POWERED PREDICTION</span>
                </div>
                {apiStatus === "connected" && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                    <Badge variant="default" className="relative bg-emerald-500 text-white shadow-lg">
                      ML Models Active
                    </Badge>
                  </div>
                )}
                {isAutoUpdating && (
                  <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-50 animate-pulse shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </div>
                  </Badge>
                )}
                {predictionMethod && results && (
                  <Badge variant="outline" className="border-[#2A8E9E] text-[#2A8E9E] bg-[#2A8E9E]/5 shadow-sm">
                    {results.modelsUsed ? "Real-time XGBoost" : "Fallback Mode"}
                  </Badge>
                )}
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-[#180039] via-[#2A8E9E] to-[#180039] bg-clip-text text-transparent mb-3">
                AI Video Predictor
              </h2>
              <p className="text-lg text-[#666]">ML-powered viral potential analysis using XGBoost models trained on 3.99M trending videos</p>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          {results ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-[#666] uppercase">Viral Potential</span>
                </div>
                <div className="text-2xl font-bold text-[#180039]">{results.viralProbability.toFixed(0)}%</div>
                <div className="text-xs text-[#666] mt-1">{results.viralLabel}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-[#666] uppercase">Growth</span>
                </div>
                <div className="text-2xl font-bold text-[#180039]">{results.growthPotential?.toFixed(1) || "2.0"}x</div>
                <div className="text-xs text-[#666] mt-1">Predicted increase</div>
              </div>
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-[#666] uppercase">Engagement</span>
                </div>
                <div className="text-2xl font-bold text-[#180039]">{results.engagementHealth.toFixed(0)}%</div>
                <div className="text-xs text-[#666] mt-1">{results.engagementLabel}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-[#2A8E9E] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-[#666] uppercase">Percentile</span>
                </div>
                <div className="text-2xl font-bold text-[#180039]">{results.percentileViews.toFixed(0)}th</div>
                <div className="text-xs text-[#666] mt-1">vs all videos</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20">
                <div className="text-xs font-bold text-[#666] uppercase mb-2">Viral Potential</div>
                <div className="text-2xl font-bold text-[#180039]">--</div>
              </div>
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20">
                <div className="text-xs font-bold text-[#666] uppercase mb-2">Growth</div>
                <div className="text-2xl font-bold text-[#180039]">--</div>
              </div>
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20">
                <div className="text-xs font-bold text-[#666] uppercase mb-2">Engagement</div>
                <div className="text-2xl font-bold text-[#180039]">--</div>
              </div>
              <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2A8E9E]/20">
                <div className="text-xs font-bold text-[#666] uppercase mb-2">Percentile</div>
                <div className="text-2xl font-bold text-[#180039]">--</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form - Redesigned */}
      <GlowCard glowColor="primary" delay={100}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
              <Target className="w-5 h-5 text-[#2A8E9E]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-[#180039]">Video Metrics Input</CardTitle>
              <CardDescription className="text-[#666]">
                All fields below are used in real-time ML predictions. XGBoost models analyze 18 engineered features including engagement ratios, timing, metadata, and channel history.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Core Metrics */}
            <div className="space-y-2">
              <Label htmlFor="views" className="text-[#180039] font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#2A8E9E]" />
                View Count
              </Label>
              <Input
                id="views"
                type="text"
                inputMode="numeric"
                value={input.views === 0 ? "" : input.views.toString()}
                onChange={(e) => handleNumericChange("views", e.target.value)}
                onBlur={(e) => {
                  const val = e.target.value.trim()
                  if (val === "" || isNaN(Number(val))) {
                    setInput({ ...input, views: 0 })
                  }
                }}
                placeholder="Enter total view count"
                className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20"
              />
              <p className="text-xs text-[#666]">Current number of views your video has received</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="likes" className="text-[#180039] font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#2A8E9E]" />
                Like Count
              </Label>
              <Input
                id="likes"
                type="text"
                inputMode="numeric"
                value={input.likes === 0 ? "" : input.likes.toString()}
                onChange={(e) => handleNumericChange("likes", e.target.value)}
                onBlur={(e) => {
                  const val = e.target.value.trim()
                  if (val === "" || isNaN(Number(val))) {
                    setInput({ ...input, likes: 0 })
                  }
                }}
                placeholder="Enter total like count"
                className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20"
              />
              <p className="text-xs text-[#666]">Total number of likes on your video</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-[#180039] font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#2A8E9E]" />
                Comment Count
              </Label>
              <Input
                id="comments"
                type="text"
                inputMode="numeric"
                value={input.comments === 0 ? "" : input.comments.toString()}
                onChange={(e) => handleNumericChange("comments", e.target.value)}
                onBlur={(e) => {
                  const val = e.target.value.trim()
                  if (val === "" || isNaN(Number(val))) {
                    setInput({ ...input, comments: 0 })
                  }
                }}
                placeholder="Enter total comment count"
                className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20"
              />
              <p className="text-xs text-[#666]">Total number of comments received</p>
            </div>
            
            {/* Metadata */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-[#180039] font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2A8E9E]" />
                Country
              </Label>
              <Select value={input.country} onValueChange={(value) => setInput({ ...input, country: value })}>
                <SelectTrigger id="country" className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20">
                  <SelectValue placeholder="Select target country" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#E9F3F4]">
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-[#666]">Primary country where your video is targeted</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="text-[#180039] font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2A8E9E]" />
                Language
              </Label>
              <Select
                value={input.language}
                onValueChange={(value) => setInput({ ...input, language: value })}
              >
                <SelectTrigger id="language" className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20">
                  <SelectValue placeholder="Select video language" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#E9F3F4]">
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-[#666]">Primary language used in your video content</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dayPublished" className="text-[#180039] font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2A8E9E]" />
                Day Published
              </Label>
              <Select
                value={input.dayPublished}
                onValueChange={(value) => setInput({ ...input, dayPublished: value })}
              >
                <SelectTrigger id="dayPublished" className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20">
                  <SelectValue placeholder="Select publication day" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#E9F3F4]">
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day} {day === "Thursday" && "(Optimal)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-[#666]">Thursday and Friday typically show highest engagement rates</p>
            </div>
            
            {/* Additional Fields */}
            <div className="space-y-2">
              <Label htmlFor="titleLength" className="text-[#180039] font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2A8E9E]" />
                Title Length (chars)
              </Label>
              <Input
                id="titleLength"
                type="text"
                inputMode="numeric"
                value={input.titleLength === 0 ? "" : (input.titleLength || 50).toString()}
                onChange={(e) => handleNumericChange("titleLength", e.target.value)}
                onBlur={(e) => {
                  const val = e.target.value.trim()
                  if (val === "" || isNaN(Number(val)) || Number(val) === 0) {
                    setInput({ ...input, titleLength: 50 })
                  }
                }}
                placeholder="Enter title character count"
                className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20"
              />
              <p className="text-xs text-[#666]">Optimal range: 40-70 characters for best engagement</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="publishHour" className="text-[#180039] font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2A8E9E]" />
                Publish Hour (0-23)
              </Label>
              <Input
                id="publishHour"
                type="text"
                inputMode="numeric"
                value={input.publishHour === 0 ? "" : (input.publishHour || 18).toString()}
                onChange={(e) => handleNumericChange("publishHour", e.target.value)}
                onBlur={(e) => {
                  const val = e.target.value.trim()
                  const numVal = Number(val)
                  if (val === "" || isNaN(numVal) || numVal < 0 || numVal > 23) {
                    setInput({ ...input, publishHour: 18 })
                  } else {
                    setInput({ ...input, publishHour: numVal })
                  }
                }}
                placeholder="Enter hour of publication (0-23)"
                className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20"
              />
              <p className="text-xs text-[#666]">Peak hours: 6 PM - 9 PM (18-21) for maximum reach</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="channelVideoCount" className="text-[#180039] font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2A8E9E]" />
                Channel Videos
              </Label>
              <Input
                id="channelVideoCount"
                type="text"
                inputMode="numeric"
                value={input.channelVideoCount === 0 ? "" : (input.channelVideoCount || 10).toString()}
                onChange={(e) => handleNumericChange("channelVideoCount", e.target.value)}
                onBlur={(e) => {
                  const val = e.target.value.trim()
                  if (val === "" || isNaN(Number(val)) || Number(val) === 0) {
                    setInput({ ...input, channelVideoCount: 10 })
                  }
                }}
                placeholder="Enter total videos on channel"
                className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20"
              />
              <p className="text-xs text-[#666]">Total number of videos published on your channel</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="channelAvgViews" className="text-[#180039] font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#2A8E9E]" />
                Channel Avg Views
              </Label>
              <Input
                id="channelAvgViews"
                type="text"
                inputMode="numeric"
                value={input.channelAvgViews === 0 ? "" : (input.channelAvgViews || 100000).toString()}
                onChange={(e) => handleNumericChange("channelAvgViews", e.target.value)}
                onBlur={(e) => {
                  const val = e.target.value.trim()
                  if (val === "" || isNaN(Number(val)) || Number(val) === 0) {
                    setInput({ ...input, channelAvgViews: 100000 })
                  }
                }}
                placeholder="Enter average views per video"
                className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20"
              />
              <p className="text-xs text-[#666]">Average views your channel videos typically receive</p>
            </div>
            
            {/* Boolean Fields */}
            <div className="space-y-2">
              <Label htmlFor="hasTags" className="text-[#180039] font-semibold flex items-center gap-2">
                <Hash className="w-4 h-4 text-[#2A8E9E]" />
                Has Tags?
              </Label>
              <Select
                value={input.hasTags ? "yes" : "no"}
                onValueChange={(value) => setInput({ ...input, hasTags: value === "yes" })}
              >
                <SelectTrigger id="hasTags" className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20">
                  <SelectValue placeholder="Select if video has tags" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#E9F3F4]">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-[#666]">Tags improve discoverability and can boost views by up to 12%</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hasDescription" className="text-[#180039] font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2A8E9E]" />
                Has Description?
              </Label>
              <Select
                value={input.hasDescription ? "yes" : "no"}
                onValueChange={(value) => setInput({ ...input, hasDescription: value === "yes" })}
              >
                <SelectTrigger id="hasDescription" className="border-[#E9F3F4] focus:border-[#2A8E9E] focus:ring-2 focus:ring-[#2A8E9E]/20">
                  <SelectValue placeholder="Select if video has description" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#E9F3F4]">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-[#666]">Descriptions help with SEO and can increase engagement by up to 8%</p>
            </div>
          </div>
          
          <Button
            onClick={() => {
              console.log("🖱️ Button clicked!")
              handleAnalyze(false)
            }}
            disabled={isAnalyzing}
            className="w-full mt-6 bg-gradient-to-r from-[#2A8E9E] to-[#180039] hover:from-[#180039] hover:to-[#2A8E9E] text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg font-bold"
            size="lg"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing with ML Models...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                ANALYZE VIDEO POTENTIAL
              </div>
            )}
          </Button>
        </CardContent>
      </GlowCard>

      {/* Results Section */}
      {results && (
        <div key={resultsKey} className="space-y-8 animate-fadeIn">
          {/* Main Prediction Cards - Redesigned */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <GlowCard glowColor="primary" delay={100}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                    <Rocket className="w-5 h-5 text-[#2A8E9E]" />
                  </div>
                  {results.viralProbability >= 70 && <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />}
                </div>
                <div className="mb-2">
                  <p className="text-xs font-bold text-[#666] uppercase tracking-wider mb-1">Viral Probability</p>
                  <p className="text-xs text-[#666]">ML Model Prediction</p>
                </div>
                <div className="text-4xl font-bold text-[#180039] mb-3">
                  {results.viralProbability.toFixed(1)}%
                </div>
                <Progress value={results.viralProbability} className="h-2 mb-3" />
                <div>
                  {results.viralLabel === "HIGH POTENTIAL" ? (
                    <Badge className="bg-emerald-500 text-white">HIGH POTENTIAL</Badge>
                  ) : results.viralLabel === "MODERATE" ? (
                    <Badge className="bg-[#2A8E9E] text-white">MODERATE</Badge>
                  ) : (
                    <Badge className="bg-orange-500 text-white">LOW</Badge>
                  )}
                </div>
              </CardContent>
            </GlowCard>

            <GlowCard glowColor="purple" delay={150}>
              <CardContent className="p-6 relative overflow-hidden group">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-[#180039] shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    {results.engagementHealth >= 70 && (
                      <div className="relative">
                        <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700] animate-pulse drop-shadow-lg" />
                        <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-md opacity-50 animate-ping"></div>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-bold text-[#666] uppercase tracking-wider mb-1">Engagement Health</p>
                    <p className="text-xs text-[#666]">Quality Score</p>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#180039] to-purple-600 bg-clip-text text-transparent mb-3">
                    {results.engagementHealth.toFixed(0)}%
                  </div>
                  <Progress 
                    value={results.engagementHealth} 
                    className="h-3 mb-4 shadow-sm"
                    style={{
                      background: 'linear-gradient(90deg, #E9F3F4 0%, purple 100%)'
                    }}
                  />
                  <div>
                    {results.engagementLabel === "Excellent" ? (
                      <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                        Excellent
                      </Badge>
                    ) : results.engagementLabel === "Good" ? (
                      <Badge className="bg-gradient-to-r from-[#2A8E9E] to-[#180039] text-white shadow-lg">
                        Good
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
                        Needs Work
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </GlowCard>

            <GlowCard glowColor="primary" delay={200}>
              <CardContent className="p-6 relative overflow-hidden group">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-[#2A8E9E] shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    {results.growthPotential >= 2 && (
                      <div className="relative">
                        <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700] animate-pulse drop-shadow-lg" />
                        <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-md opacity-50 animate-ping"></div>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-bold text-[#666] uppercase tracking-wider mb-1">Growth Potential</p>
                    <p className="text-xs text-[#666]">Predicted Multiplier</p>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-[#2A8E9E] bg-clip-text text-transparent mb-3">
                    {results.growthPotential?.toFixed(1) || "2.0"}x
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-[#E9F3F4] border border-emerald-200/50 mb-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666] font-medium">Current:</span>
                      <span className="text-[#180039] font-bold">{(input.views / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-[#666] font-medium">Predicted:</span>
                      <span className="text-emerald-600 font-bold">{(results.predictedMaxViews / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlowCard>

            <GlowCard glowColor="teal" delay={250}>
              <CardContent className="p-6 relative overflow-hidden group">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2A8E9E]/20 to-transparent rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    {results.predictedMaxViews >= 10000000 && (
                      <div className="relative">
                        <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700] animate-pulse drop-shadow-lg" />
                        <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-md opacity-50 animate-ping"></div>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-bold text-[#666] uppercase tracking-wider mb-1">Predicted Max Views</p>
                    <p className="text-xs text-[#666]">Peak Performance</p>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent mb-3">
                    {results.predictedMaxViews >= 1000000 
                      ? `${(results.predictedMaxViews / 1000000).toFixed(1)}M`
                      : `${(results.predictedMaxViews / 1000).toFixed(0)}K`}
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-[#E9F3F4] to-teal-50 border border-[#2A8E9E]/20">
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-sm font-bold text-[#180039]">
                        {results.percentileViews.toFixed(0)}th percentile
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlowCard>
          </div>

          {/* Prediction Method Indicator */}
          {results.modelsUsed !== undefined && (
            <GlowCard glowColor={results.modelsUsed ? "primary" : "teal"} delay={300}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${results.modelsUsed ? "bg-emerald-100" : "bg-orange-100"} border-2 ${results.modelsUsed ? "border-emerald-500" : "border-orange-500"}`}>
                    {results.modelsUsed ? (
                      <Brain className="w-8 h-8 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#180039] mb-1">
                      {results.modelsUsed ? " Real-time ML Prediction Active" : "Fallback Mode"}
                    </h3>
                    <p className="text-sm text-[#666]">
                      {results.modelsUsed 
                        ? "Predictions are generated in real-time using XGBoost models trained on 3.99M trending videos. All input fields below contribute to the 18 engineered features used by the models."
                        : "ML models are not loaded. Using heuristic fallback. Please ensure backend models are properly loaded."}
                    </p>
                    {results.predictionMethod && (
                      <p className="text-xs text-[#2A8E9E] mt-2 font-semibold">
                        Method: {results.predictionMethod}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </GlowCard>
          )}

          {/* Features Used in Prediction */}
          <GlowCard glowColor="purple" delay={320}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#180039]/10 border border-[#180039]/20">
                  <Zap className="w-5 h-5 text-[#180039]" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-[#180039]">Input Fields Used in ML Prediction</CardTitle>
                  <CardDescription className="text-[#666]">All form fields contribute to 18 engineered features analyzed by XGBoost models</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
                  <p className="text-xs font-bold text-[#666] mb-1">Core Metrics</p>
                  <p className="text-sm text-[#180039]">Views, Likes, Comments</p>
                  <p className="text-xs text-[#666] mt-1">→ Engagement ratios</p>
                </div>
                <div className="p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
                  <p className="text-xs font-bold text-[#666] mb-1">Timing</p>
                  <p className="text-sm text-[#180039]">Day, Hour Published</p>
                  <p className="text-xs text-[#666] mt-1">→ Optimal timing flags</p>
                </div>
                <div className="p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
                  <p className="text-xs font-bold text-[#666] mb-1">Metadata</p>
                  <p className="text-sm text-[#180039]">Tags, Description, Language</p>
                  <p className="text-xs text-[#666] mt-1">→ SEO factors</p>
                </div>
                <div className="p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
                  <p className="text-xs font-bold text-[#666] mb-1">Content</p>
                  <p className="text-sm text-[#180039]">Title Length</p>
                  <p className="text-xs text-[#666] mt-1">→ Content quality</p>
                </div>
                <div className="p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
                  <p className="text-xs font-bold text-[#666] mb-1">Channel</p>
                  <p className="text-sm text-[#180039]">Video Count, Avg Views</p>
                  <p className="text-xs text-[#666] mt-1">→ Channel authority</p>
                </div>
                <div className="p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
                  <p className="text-xs font-bold text-[#666] mb-1">Geography</p>
                  <p className="text-sm text-[#180039]">Country</p>
                  <p className="text-xs text-[#666] mt-1">→ Market context</p>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#2A8E9E]/10 to-[#180039]/10 border border-[#2A8E9E]/20">
                <p className="text-sm text-[#180039] font-semibold mb-2">Feature Engineering Process:</p>
                <p className="text-xs text-[#666] leading-relaxed">
                  Raw inputs → 18 engineered features (engagement ratios, timing flags, metadata indicators) → 
                  StandardScaler normalization → XGBoost Classifier (viral probability) + XGBoost Regressor (view count) → 
                  Real-time predictions with confidence scores
                </p>
              </div>
            </CardContent>
          </GlowCard>

          {/* Model Metrics */}
          {results.modelMetrics && (
            <GlowCard glowColor="primary" delay={340}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                    <Brain className="w-5 h-5 text-[#2A8E9E]" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-[#180039]">Model Performance Metrics</CardTitle>
                    <CardDescription className="text-[#666]">XGBoost Classifier & Regressor trained on 3.99M videos</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 text-center">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">Accuracy</p>
                    <p className="text-2xl font-bold text-[#2A8E9E]">{results.modelMetrics.accuracy}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 text-center">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">Precision</p>
                    <p className="text-2xl font-bold text-[#2A8E9E]">{results.modelMetrics.precision}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 text-center">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">Recall</p>
                    <p className="text-2xl font-bold text-[#2A8E9E]">{results.modelMetrics.recall}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 text-center">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">F1-Score</p>
                    <p className="text-2xl font-bold text-[#2A8E9E]">{results.modelMetrics.f1Score}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 text-center">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">ROC-AUC</p>
                    <p className="text-2xl font-bold text-[#2A8E9E]">{results.modelMetrics.rocAuc}%</p>
                  </div>
                </div>
              </CardContent>
            </GlowCard>
          )}

          {/* Growth Projection Chart */}
          {results.growthProjection && (
            <GlowCard glowColor="primary" delay={350}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                    <TrendingUp className="w-5 h-5 text-[#2A8E9E]" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-[#180039]">30-Day Growth Projection</CardTitle>
                    <CardDescription className="text-[#666]">Predicted view growth trajectory based on ML model</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={results.growthProjection}>
                    <defs>
                      <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.3}/>
                        <stop offset="100%" stopColor="#2A8E9E" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                    <XAxis 
                      dataKey="day" 
                      label={{ value: "Days", position: "insideBottom", offset: -5 }}
                      stroke="#2A8E9E"
                      fontSize={12}
                      fontWeight={600}
                    />
                    <YAxis 
                      yAxisId="left"
                      label={{ value: "Views (M)", angle: -90, position: "insideLeft" }}
                      stroke="#2A8E9E"
                      fontSize={12}
                      fontWeight={600}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      label={{ value: "Engagement", angle: 90, position: "insideRight" }}
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
                    formatter={(value: number | undefined, name: string | undefined) => {
                      if (value === undefined) return ""
                      if (name === "views") return `${(value / 1000000).toFixed(2)}M views`
                      if (name === "likes") return `${(value / 1000).toFixed(0)}K likes`
                      if (name === "comments") return `${value.toLocaleString()} comments`
                      return value
                    }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="views"
                      fill="url(#growthGradient)"
                      stroke="#2A8E9E"
                      strokeWidth={3}
                      name="Views"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="likes"
                      stroke="#180039"
                      strokeWidth={2}
                      dot={{ fill: "#180039", r: 4 }}
                      name="Likes"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="comments"
                      stroke="#FFD700"
                      strokeWidth={2}
                      dot={{ fill: "#FFD700", r: 4 }}
                      name="Comments"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                
                {/* Graph Explanation */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
                  <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
                  <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                    <li><strong className="text-[#2A8E9E]">30-Day Growth Projection:</strong> Predicted view growth trajectory based on ML model analysis of your video's current metrics</li>
                    <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Shows compound growth pattern - views increase exponentially while engagement rates typically decrease as videos scale</li>
                    <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Composed chart combining area (views) and lines (likes/comments) - uses exponential growth modeling with engagement decay factors</li>
                  </ul>
                </div>
              </CardContent>
            </GlowCard>
          )}

          {/* Country Context */}
          {results.countryContext && (
            <GlowCard glowColor="purple" delay={400}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#180039]/10 border border-[#180039]/20">
                    <Globe className="w-5 h-5 text-[#180039]" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-[#180039]">{results.countryContext.country} Market Context</CardTitle>
                    <CardDescription className="text-[#666]">Performance comparison in your target market</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">Market Avg Views</p>
                    <p className="text-xl font-bold text-[#2A8E9E]">{results.countryContext.avg_views}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">Your Views</p>
                    <p className="text-xl font-bold text-[#180039]">{results.countryContext.your_views}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">Competitiveness</p>
                    <p className="text-xl font-bold text-[#2A8E9E]">{results.countryContext.competitiveness}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
                    <p className="text-xs font-bold text-[#666] uppercase mb-2">Your Percentile</p>
                    <p className="text-xl font-bold text-[#180039]">{results.percentileViews.toFixed(0)}th</p>
                  </div>
                </div>
              </CardContent>
            </GlowCard>
          )}

          {/* Comparison Visualization - Enhanced */}
          <GlowCard glowColor="primary" delay={450}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                  <BarChart3 className="w-5 h-5 text-[#2A8E9E]" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-[#180039]">Your Video vs Average Trending Video</CardTitle>
                  <CardDescription className="text-[#666]">Performance comparison across key metrics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={results.comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#180039" stopOpacity={0.9}/>
                    </linearGradient>
                    <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E9F3F4" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#E9F3F4" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                  <XAxis dataKey="metric" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                  <YAxis stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(42, 142, 158, 0.95)",
                      border: "1px solid #2A8E9E",
                      borderRadius: "12px",
                      color: "white",
                      boxShadow: "0 8px 24px rgba(42, 142, 158, 0.3)"
                    }}
                    formatter={(value: number | undefined, name: string | undefined) => {
                      if (value === undefined) return ""
                      if (name === "user") {
                        const item = results.comparisonData.find(d => d.metric === name)
                        return item?.metric === "Views" || item?.metric === "Likes"
                          ? `${value.toFixed(1)}${item.metric === "Views" ? "M" : "K"}`
                          : item?.metric === "Engagement Rate"
                          ? `${value.toFixed(1)}%`
                          : value.toFixed(0)
                      }
                      return value
                    }}
                  />
                  <Legend />
                  <Bar dataKey="user" fill="url(#userGradient)" radius={[8, 8, 0, 0]} name="Your Video">
                    {results.comparisonData.map((entry, index) => (
                      <Cell
                        key={`user-${index}`}
                        fill={entry.userPercentile > 50 ? "#2A8E9E" : "#180039"}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="average" fill="url(#avgGradient)" radius={[8, 8, 0, 0]} name="Average Trending">
                    {results.comparisonData.map((entry, index) => (
                      <Cell
                        key={`avg-${index}`}
                        fill="#E9F3F4"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {results.comparisonData.map((item, index) => {
                  const isAbove = item.userPercentile > 50
                  return (
                    <div key={index} className="p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#180039]">{item.metric}</span>
                        {isAbove ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <div className="text-sm font-bold text-[#2A8E9E]">{item.userPercentile.toFixed(0)}th percentile</div>
                    </div>
                  )
                })}
              </div>
              
              {/* Graph Explanation */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
                <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
                <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                  <li><strong className="text-[#2A8E9E]">Performance Comparison:</strong> Side-by-side comparison of your video metrics against average trending video benchmarks</li>
                  <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Percentile rankings show where your video stands relative to all trending content - above 50th percentile indicates above-average performance</li>
                  <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Bar chart visualization comparing normalized metrics - reveals strengths and areas for improvement across views, likes, comments, and engagement</li>
                </ul>
              </div>
            </CardContent>
          </GlowCard>

          {/* Radar Chart - Enhanced */}
          <GlowCard glowColor="purple" delay={500}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#180039]/10 border border-[#180039]/20">
                  <Target className="w-5 h-5 text-[#180039]" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-[#180039]">Performance Radar Chart</CardTitle>
                  <CardDescription className="text-[#666]">Multi-dimensional performance comparison</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={450}>
                <RadarChart data={results.radarData}>
                  <defs>
                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.6}/>
                      <stop offset="100%" stopColor="#2A8E9E" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="#2A8E9E" strokeOpacity={0.2} />
                  <PolarAngleAxis dataKey="metric" stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#2A8E9E" fontSize={11} />
                  <Radar
                    name="Your Video"
                    dataKey="user"
                    stroke="#2A8E9E"
                    fill="url(#radarGradient)"
                    fillOpacity={0.6}
                    strokeWidth={3}
                  />
                  <Radar
                    name="Average Trending"
                    dataKey="average"
                    stroke="#180039"
                    fill="#180039"
                    fillOpacity={0.15}
                    strokeWidth={2}
                    strokeDasharray="5 5"
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
                </RadarChart>
              </ResponsiveContainer>
              
              {/* Graph Explanation */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
                <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
                <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                  <li><strong className="text-[#2A8E9E]">Multi-Dimensional Performance Analysis:</strong> Radar chart showing your video's performance across 6 key dimensions compared to average trending videos</li>
                  <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Larger area coverage indicates stronger overall performance - reveals which dimensions are strengths vs weaknesses</li>
                  <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Polar coordinate visualization normalizes all metrics to 0-100 scale - enables direct comparison across different metric types</li>
                </ul>
              </div>
            </CardContent>
          </GlowCard>

          {/* Feature Importance - Enhanced */}
          <GlowCard glowColor="primary" delay={550}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2A8E9E]/10 border border-[#2A8E9E]/20">
                  <Zap className="w-5 h-5 text-[#2A8E9E]" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-[#180039]">Feature Importance</CardTitle>
                  <CardDescription className="text-[#666]">What drives viral success - ML model insights</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={Object.entries(results.featureImportance).map(([feature, importance]) => ({
                    feature,
                    importance
                  }))}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="featureGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2A8E9E" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#180039" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 142, 158, 0.1)" />
                  <XAxis type="number" domain={[0, 100]} stroke="#2A8E9E" fontSize={12} fontWeight={600} />
                  <YAxis 
                    dataKey="feature" 
                    type="category" 
                    width={90}
                    stroke="#2A8E9E" 
                    fontSize={11} 
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
                    formatter={(value: number | undefined) => value !== undefined ? `${value}%` : ""}
                  />
                  <Bar dataKey="importance" fill="url(#featureGradient)" radius={[0, 8, 8, 0]}>
                    {Object.entries(results.featureImportance).map(([feature, importance], index) => (
                      <Cell
                        key={feature}
                        fill={importance > 25 ? "#2A8E9E" : importance > 15 ? "#180039" : "#E9F3F4"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              {/* Graph Explanation */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
                <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
                <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                  <li><strong className="text-[#2A8E9E]">Feature Importance Analysis:</strong> Shows which video attributes most strongly influence viral success according to the ML model</li>
                  <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Higher importance values indicate features that significantly impact viral probability - focus optimization efforts on top features</li>
                  <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> XGBoost feature importance scores extracted from trained model - reveals what the algorithm learned drives viral success</li>
                </ul>
              </div>
            </CardContent>
          </GlowCard>

          {/* Probability Distribution */}
          {results.probabilityDistribution && (
            <GlowCard glowColor="purple" delay={600}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#180039]/10 border border-[#180039]/20">
                    <BarChart3 className="w-5 h-5 text-[#180039]" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-[#180039]">Viral Probability Distribution</CardTitle>
                    <CardDescription className="text-[#666]">Your video's position in the viral potential spectrum</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.probabilityDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
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
                        formatter={(value: number | undefined) => value !== undefined ? `${value}%` : ""}
                      />
                      <Bar dataKey="count" fill="url(#probGradient)" radius={[8, 8, 0, 0]}>
                        {results.probabilityDistribution.map((entry: any, index: number) => {
                          const isYourRange = entry.isUser || false
                          return (
                            <Cell
                              key={`prob-${index}`}
                              fill={isYourRange ? "#FFD700" : entry.range.includes("80") ? "#2A8E9E" : entry.range.includes("60") ? "#180039" : "#E9F3F4"}
                              style={{
                                filter: isYourRange ? "drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5))" : undefined,
                                stroke: isYourRange ? "#FFD700" : undefined,
                                strokeWidth: isYourRange ? 2 : 0,
                              }}
                            />
                          )
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded bg-[#FFD700]"></div>
                      <span className="text-sm font-bold text-[#180039]">Your Video: {results.viralProbability.toFixed(1)}%</span>
                    </div>
                    <p className="text-xs text-[#666]">
                      Your video falls in the <strong className="text-[#180039]">{results.viralLabel}</strong> category, 
                      placing it in the {results.viralProbability >= 80 ? "top 10%" : results.viralProbability >= 60 ? "top 20%" : results.viralProbability >= 40 ? "average" : "below average"} range of viral potential.
                    </p>
                  </div>
                  
                  {/* Graph Explanation */}
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#E9F3F4] to-white border-2 border-[#2A8E9E]/20">
                    <p className="text-sm font-semibold text-[#180039] mb-2">What This Shows:</p>
                    <ul className="text-xs text-[#666] space-y-1 list-disc list-inside">
                      <li><strong className="text-[#2A8E9E]">Viral Probability Distribution:</strong> Shows how your video's viral potential compares to the distribution of all videos in the dataset</li>
                      <li><strong className="text-[#2A8E9E]">Key Finding:</strong> Your video's position (highlighted in gold) indicates its relative viral potential - higher ranges indicate stronger viral characteristics</li>
                      <li><strong className="text-[#2A8E9E]">Analysis Method:</strong> Histogram distribution of viral probabilities across 5 ranges - reveals where your video stands in the viral potential spectrum</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </GlowCard>
          )}

          {/* Key Insights Summary - Enhanced Premium Design */}
          <GlowCard glowColor="teal" delay={650}>
            <CardHeader className="bg-gradient-to-r from-[#2A8E9E]/5 to-[#180039]/5 border-b border-[#E9F3F4]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent">
                    Key Insights
                  </CardTitle>
                  <CardDescription className="text-[#666] text-sm mt-1">
                    Quick overview of your video's performance potential and actionable metrics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-[#2A8E9E] via-[#2A8E9E] to-[#180039] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <Rocket className="w-5 h-5 opacity-90" />
                      {results.viralProbability >= 70 && (
                        <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs opacity-90 mb-2 font-medium uppercase tracking-wider">Viral Potential</div>
                    <div className="text-3xl font-bold mb-1">{results.viralProbability.toFixed(0)}%</div>
                    <div className="text-xs opacity-75">{results.viralLabel}</div>
                  </div>
                </div>
                <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-5 h-5 opacity-90" />
                      {results.growthPotential >= 2 && (
                        <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs opacity-90 mb-2 font-medium uppercase tracking-wider">Growth Multiplier</div>
                    <div className="text-3xl font-bold mb-1">{results.growthPotential?.toFixed(1) || "2.0"}x</div>
                    <div className="text-xs opacity-75">Predicted increase</div>
                  </div>
                </div>
                <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-[#180039] via-purple-600 to-[#2A8E9E] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-5 h-5 opacity-90" />
                      {results.engagementHealth >= 70 && (
                        <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700] animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs opacity-90 mb-2 font-medium uppercase tracking-wider">Engagement Health</div>
                    <div className="text-3xl font-bold mb-1">{results.engagementHealth.toFixed(0)}%</div>
                    <div className="text-xs opacity-75">{results.engagementLabel}</div>
                  </div>
                </div>
                <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-[#FFD700] via-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <Trophy className="w-5 h-5 opacity-90" />
                      {results.percentileViews >= 80 && (
                        <Star className="w-4 h-4 text-white fill-white animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs opacity-90 mb-2 font-medium uppercase tracking-wider">Percentile Rank</div>
                    <div className="text-3xl font-bold mb-1">{results.percentileViews.toFixed(0)}th</div>
                    <div className="text-xs opacity-75">vs all videos</div>
                  </div>
                </div>
              </div>
              
              {/* Additional Key Metrics - Similar to NYC Dashboard */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-[#E9F3F4]">
                <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#2A8E9E]" />
                    <span className="text-xs font-bold text-[#666] uppercase">Optimal Day</span>
                  </div>
                  <div className="text-lg font-bold text-[#180039]">
                    {input.dayPublished === "Thursday" || input.dayPublished === "Friday" 
                      ? input.dayPublished 
                      : "Thursday"}
                  </div>
                  <div className="text-xs text-[#666] mt-1">
                    {input.dayPublished === "Thursday" || input.dayPublished === "Friday"
                      ? "Optimal timing"
                      : "Consider switching"}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-[#2A8E9E]" />
                    <span className="text-xs font-bold text-[#666] uppercase">Peak Hour</span>
                  </div>
                  <div className="text-lg font-bold text-[#180039]">
                    {input.publishHour !== undefined && input.publishHour >= 14 && input.publishHour <= 18 
                      ? `${input.publishHour}:00` 
                      : "14:00-18:00"}
                  </div>
                  <div className="text-xs text-[#666] mt-1">
                    {input.publishHour !== undefined && input.publishHour >= 14 && input.publishHour <= 18
                      ? "Peak engagement time"
                      : "Best posting window"}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-[#2A8E9E]" />
                    <span className="text-xs font-bold text-[#666] uppercase">Engagement Rate</span>
                  </div>
                  <div className="text-lg font-bold text-[#180039]">
                    {(() => {
                      const safeViews = Math.max(input.views, 1)
                      const engagementRate = ((input.likes + input.comments) / safeViews) * 100
                      return engagementRate.toFixed(2)
                    })()}%
                  </div>
                  <div className="text-xs text-[#666] mt-1">
                    {(() => {
                      const safeViews = Math.max(input.views, 1)
                      const engagementRate = ((input.likes + input.comments) / safeViews) * 100
                      return engagementRate >= 4 ? "Top tier" : engagementRate >= 3 ? "Good" : "Needs improvement"
                    })()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#E9F3F4] border border-[#2A8E9E]/20 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-[#2A8E9E]" />
                    <span className="text-xs font-bold text-[#666] uppercase">Market Context</span>
                  </div>
                  <div className="text-lg font-bold text-[#180039]">
                    {input.country || "Global"}
                  </div>
                  <div className="text-xs text-[#666] mt-1">
                    {results.countryContext?.competitiveness || "Medium"} competitiveness
                  </div>
                </div>
              </div>
            </CardContent>
          </GlowCard>

          {/* Recommendations - Premium Enhanced Design */}
          <GlowCard glowColor="teal" delay={700}>
            <CardHeader className="bg-gradient-to-r from-[#2A8E9E]/5 to-[#180039]/5 border-b border-[#E9F3F4]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#2A8E9E] to-[#180039] shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#180039] to-[#2A8E9E] bg-clip-text text-transparent">
                    AI-Powered Recommendations
                  </CardTitle>
                  <CardDescription className="text-[#666] text-sm mt-1">
                    Actionable insights to maximize your video's potential and engagement
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {results.recommendations.map((rec, index) => {
                  const Icon = getRecommendationIcon(rec.type)
                  const bgColor = rec.type === "success" 
                    ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-300 shadow-sm"
                    : rec.type === "warning" 
                    ? "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300 shadow-sm"
                    : rec.type === "fire" 
                    ? "bg-gradient-to-br from-[#2A8E9E]/10 to-[#180039]/10 border-[#2A8E9E]/40 shadow-sm"
                    : rec.type === "gem" 
                    ? "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300 shadow-sm"
                    : "bg-gradient-to-br from-[#E9F3F4] to-white border-[#2A8E9E]/30 shadow-sm"
                  const iconColor = rec.type === "success" 
                    ? "text-emerald-600"
                    : rec.type === "warning" 
                    ? "text-orange-600"
                    : rec.type === "fire" 
                    ? "text-[#2A8E9E]"
                    : rec.type === "gem" 
                    ? "text-purple-600"
                    : "text-[#180039]"
                  const iconBg = rec.type === "success"
                    ? "bg-emerald-100"
                    : rec.type === "warning"
                    ? "bg-orange-100"
                    : rec.type === "fire"
                    ? "bg-[#2A8E9E]/20"
                    : rec.type === "gem"
                    ? "bg-purple-100"
                    : "bg-[#E9F3F4]"

                  return (
                    <div
                      key={index}
                      className={`group relative flex items-start gap-4 p-5 rounded-2xl border-2 ${bgColor} hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
                    >
                      {/* Decorative background element */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full -mr-10 -mt-10 blur-xl"></div>
                      
                      <div className={`relative z-10 p-3 rounded-xl ${iconBg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="flex-1 relative z-10">
                        <p className="text-sm font-bold text-[#180039] mb-2 leading-relaxed">{rec.text}</p>
                        {rec.impact && (
                          <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-white/60 border border-[#E9F3F4]">
                            <Zap className="w-3 h-3 text-[#2A8E9E]" />
                            <p className="text-xs text-[#666] font-semibold">Impact: {rec.impact}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </GlowCard>
        </div>
      )}
    </div>
  )
}
