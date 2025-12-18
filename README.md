# 🎬 YouTube Viral Intelligence Dashboard

> **A Comprehensive Data Science & Visualization Project**  
> Analyzing 3.99M YouTube trending videos across 113 countries to predict viral success

[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![XGBoost](https://img.shields.io/badge/XGBoost-Latest-green.svg)](https://xgboost.ai/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-teal.svg)](https://fastapi.tiangolo.com/)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Dataset](#dataset)
4. [Architecture](#architecture)
5. [Installation & Setup](#installation--setup)
6. [Usage](#usage)
7. [Research Questions](#research-questions)
8. [Machine Learning Models](#machine-learning-models)
9. [Statistical Inferences](#statistical-inferences)
10. [Dashboard Features](#dashboard-features)
11. [Project Structure](#project-structure)
12. [Results & Findings](#results--findings)
13. [Technical Stack](#technical-stack)
14. [Contributors](#contributors)
15. [License](#license)

---

## 🎯 Project Overview

This project combines **Exploratory Data Analysis (EDA)**, **Machine Learning**, and **Interactive Dashboards** to understand and predict YouTube viral content patterns. We analyze **3.99 million trending video snapshots** across **113 countries** spanning 24 months to uncover the science behind viral success.

### What This Project Does

- **Predicts Viral Potential**: ML models predict whether a video will go viral based on early indicators
- **Forecasts View Counts**: Regression models estimate maximum view counts
- **Visualizes Patterns**: Interactive dashboards reveal geographic, temporal, and engagement patterns
- **Provides Insights**: Actionable recommendations for content creators

### Key Statistics

| Metric | Value |
|--------|-------|
| **Total Records** | 3,992,790 trending snapshots |
| **Unique Videos** | 338,150 |
| **Unique Channels** | 57,281 |
| **Countries** | 113 |
| **Languages** | 175 |
| **Time Period** | Oct 2023 - Oct 2025 (24 months) |
| **Data Quality** | 98.7% |

---

## ✨ Key Features

### 🎨 Interactive Dashboard (5 Tabs)

1. **Executive Overview** - High-level statistics and key insights
2. **Geographic Intelligence** - Country-based analysis and patterns
3. **Temporal Analytics** - Time-based patterns and optimal posting schedules
4. **Engagement Analytics** - Deep dive into engagement metrics
5. **Video Predictor** - ML-powered viral potential prediction

### 🤖 Machine Learning Models

1. **XGBoost Classifier** - Viral probability prediction (75% accuracy)
2. **XGBoost Regressor** - View count forecasting (R² = 0.75-0.80)

### 📊 Statistical Analysis

- Pearson Correlation Analysis
- ANOVA Tests
- Welch's T-Tests
- Chi-Square Tests
- Hypothesis Testing with 95% confidence

---

## 📦 Dataset

### Dataset Overview

- **Source**: YouTube Trending API (daily snapshots)
- **Format**: Parquet (2.3 GB compressed)
- **Coverage**: Top 50 trending videos per country per day
- **Features**: 18 features per video snapshot

### Features Per Video

**Engagement Metrics:**
- Views, Likes, Comments
- Engagement ratios (likes/views, comments/views)

**Metadata:**
- Title, Channel Name, Tags, Description
- Language, Country Code

**Temporal:**
- Publish Date, Snapshot Date
- Daily Rank (1-50)

**Derived Features:**
- Days to trending
- Rank movements
- Channel history metrics

### Data Quality

- **Smart Cleaning**: 95% data retention (vs. 52% with naive approach)
- **Validation**: 98.7% quality score
- **Missing Data**: Intelligent imputation for optional fields

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React/Next.js)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │Overview  │ │Geographic│ │ Temporal │ │Engagement│     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Video Predictor (ML Integration)              │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                             │ HTTP/REST API
┌───────────────────────────▼─────────────────────────────────┐
│              Backend API (FastAPI)                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Feature Engineering & Scaling                 │   │
│  └───────────────────────────┬──────────────────────────┘   │
│                               │                               │
│  ┌───────────────────────────▼──────────────────────────┐   │
│  │  ┌──────────────────┐    ┌──────────────────┐      │   │
│  │  │ XGBoost          │    │ XGBoost           │      │   │
│  │  │ Classifier       │    │ Regressor         │      │   │
│  │  │ (Viral Prob)     │    │ (View Count)      │      │   │
│  │  └──────────────────┘    └──────────────────┘      │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
                             │
┌───────────────────────────▼─────────────────────────────────┐
│              Data Processing (PySpark)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Parquet Files → Feature Engineering → Model Training │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Python** 3.11 or 3.12
- **Node.js** 18+ and npm/pnpm
- **Java** 8+ (for PySpark)
- **8GB+ RAM** (for data processing)

### Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install PySpark (if needed)
pip install pyspark

# Start FastAPI server
python main.py
# Or use uvicorn:
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

**API Documentation**: `http://localhost:8000/docs` (Swagger UI)

### Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install
# Or with pnpm:
pnpm install

# Start development server
npm run dev
# Or:
pnpm dev
```

The dashboard will be available at `http://localhost:3000`

### Quick Start (Windows)

```powershell
# Backend
cd Backend
.\start.bat

# Frontend (in new terminal)
cd Frontend
npm run dev
```

---

## 📖 Usage

### Using the Dashboard

1. **Open Dashboard**: Navigate to `http://localhost:3000`
2. **Explore Tabs**: Click through the 5 dashboard tabs
3. **Make Predictions**: Go to "Predictor" tab and enter video details
4. **View Insights**: See viral probability, predicted views, and recommendations

### Using the API

```python
import requests

# Example prediction request
response = requests.post('http://localhost:8000/predict', json={
    "views": 1500000,
    "likes": 75000,
    "comments": 3200,
    "publish_hour": 18,
    "publish_day": 5,  # Thursday
    "has_tags": True,
    "has_description": True,
    "has_language": True,
    "title_length": 50,
    "channel_video_count": 10,
    "channel_avg_views": 100000
})

result = response.json()
print(f"Viral Probability: {result['viral_probability']}%")
print(f"Predicted Views: {result['predicted_max_views']:,}")
```

### Training Models

```bash
cd "Backend/ml model and visualizations"
python ml_modeling_fixed.py
```

This will:
- Load and process data
- Engineer features
- Train XGBoost models
- Generate visualizations
- Save models to `models/` directory

---

## 🔬 Research Questions

### Primary Questions

1. **What factors predict viral success on YouTube?**
   - **Method**: XGBoost Classifier
   - **Result**: Early engagement ratios are strongest predictors (35% importance)

2. **How do geographic and temporal factors influence trending patterns?**
   - **Method**: Statistical analysis + Dashboard visualizations
   - **Result**: Thursday-Friday posting shows 15-20% higher engagement

3. **What is the relationship between engagement metrics and view counts?**
   - **Method**: XGBoost Regressor + Correlation analysis
   - **Result**: Strong positive correlation (r=0.847, p<0.001)

### Secondary Questions

4. How does metadata completeness impact discoverability?
5. What are the optimal posting schedules for maximum engagement?
6. How do channel characteristics influence viral potential?

**See `RESEARCH_QUESTIONS.md` for detailed methodology.**

---

## 🤖 Machine Learning Models

### Model 1: Viral Classifier

**Task**: Binary Classification (Viral vs. Non-Viral)  
**Algorithm**: XGBoost Classifier  
**Target**: Videos trending for 7+ days

**Performance Metrics:**

| Metric | Value |
|--------|-------|
| Accuracy | 75% |
| Precision | 70% |
| Recall | 65% |
| F1-Score | 67% |
| ROC-AUC | 0.80 |

**Features**: 18 engineered features
- Early engagement metrics (7 features)
- Timing features (6 features)
- Metadata features (4 features)
- Channel history (3 features)

### Model 2: View Count Regressor

**Task**: Regression (Predicting Maximum View Count)  
**Algorithm**: XGBoost Regressor  
**Target**: Log-transformed maximum view count

**Performance Metrics:**

| Metric | Value |
|--------|-------|
| RMSE | 0.9 (log scale) |
| MAE | 0.7 (log scale) |
| R² Score | 0.75-0.80 |

**Training Split:**
- Training: 70% ✅
- Validation: 15%
- Test: 15%

**Model Files:**
- `Backend/ml model and visualizations/models/viral_predictor_xgb_fixed.json`
- `Backend/ml model and visualizations/models/viewcount_xgb_fixed.json`
- `Backend/ml model and visualizations/models/feature_scaler_fixed.pkl`

---

## 📊 Statistical Inferences

### Hypothesis Tests Performed

| Test | Hypothesis | Result | P-Value | Conclusion |
|------|-----------|--------|---------|------------|
| **Pearson Correlation** | Views-Likes relationship | r = 0.847 | < 0.001 | ✅ Strong positive correlation |
| **ANOVA** | Rank groups differ | F = 245.3 | < 0.001 | ✅ Significant differences |
| **Welch's T-Test** | Top 10 vs rest | t = 15.7 | < 0.001 | ✅ Top 10 distinctly different |
| **Chi-Square** | Language-engagement | χ² = 28.4 | < 0.05 | ✅ Language influences engagement |

**Significance Level**: α = 0.05 (95% confidence)

### Key Statistical Findings

1. **Engagement Correlation**: Views ↔ Likes (r=0.847, p<0.001) - Highly significant
2. **Rank Impact**: Top 5 ranks get 2.7x more views than ranks 11-20 (ANOVA, p<0.001)
3. **Channel Performance**: Top 10 channels get 4.4x more views (Welch's t-test, p<0.001)
4. **Language Effect**: Language significantly influences engagement patterns (Chi-square, p<0.05)

---

## 🎨 Dashboard Features

### Tab 1: Executive Overview

- **Total Records**: 3.99M snapshots
- **Key Metrics**: Videos, Channels, Countries, Languages
- **Visualizations**:
  - Monthly growth trends (ComposedChart)
  - Performance radar chart (RadarChart)
  - Weekly activity patterns (BarChart)
  - Content distribution (PieChart)
  - Data retention visualization
- **Components Used**: `StatCard`, `GlowCard`, `AnimatedCounter`, `AnimatedProgressBar`

### Tab 2: Geographic Intelligence

- **Top Countries**: Russia, Thailand, France lead with ~35K videos each
- **Average Views**: 2x variation between countries
- **Visualizations**:
  - Country distribution charts (BarChart)
  - Geographic heatmaps
  - Regional comparisons
  - Top 20 countries ranking
- **Components Used**: `StatCard`, `GlowCard`, `IconBox`

### Tab 3: Temporal Analytics

- **Optimal Days**: Thursday-Friday (15-20% higher engagement)
- **Peak Hours**: 6 PM - 9 PM
- **Seasonal Trends**: December (+22%), July-August (+18%)
- **Visualizations**:
  - Day-of-week patterns (BarChart)
  - Hour-of-day analysis (AreaChart)
  - Monthly trends (LineChart)
  - Optimal timing recommendations
- **Components Used**: `StatCard`, `GlowCard`, `Badge`

### Tab 4: Engagement Analytics

- **Average Engagement**: 3.2% like ratio, 0.18% comment ratio
- **High Engagement**: 8%+ like ratio (99th percentile)
- **Visualizations**:
  - Engagement breakdowns (ScatterChart)
  - Correlation charts (ComposedChart)
  - Percentile rankings (BarChart)
  - Views vs Likes scatter plots
- **Components Used**: `StatCard`, `GlowCard`, `MetricBadge`

### Tab 5: Video Predictor

- **Real-time Predictions**: Viral probability and view forecasts
- **Feature Importance**: Shows which factors matter most
- **AI Recommendations**: Actionable insights for creators
- **Visualizations**:
  - Prediction cards (Custom cards with `GlowCard`)
  - Growth projections (LineChart)
  - Feature importance bars (BarChart)
  - Probability distributions (AreaChart)
  - Multi-dimensional analysis (RadarChart)
- **Components Used**: `GlowCard`, `StatCard`, `AnimatedProgressBar`, `Badge`
- **API Integration**: Connects to FastAPI backend at `http://localhost:8000/predict`

### Supporting Components

**Layout Components:**
- `DashboardHeader.tsx` - Header with logo, title, live indicator, and stats badges
- `DashboardFooter.tsx` - Footer with project information

**UI Components:**
- `StatCard.tsx` - Animated statistic card with icon and value
- `GlowCard.tsx` - Premium card component with glow effects
- `AnimatedCounter.tsx` - Number counter with animation
- `AnimatedProgressBar.tsx` - Animated progress bar component
- `LiveIndicator.tsx` - Live status indicator with pulsing animation
- `MetricBadge.tsx` - Badge component for displaying metrics
- `IconBox.tsx` - Container component for icons
- `GradientText.tsx` - Text component with gradient effects
- `FloatingParticles.tsx` - Background particles animation
- `AnimatedBackground.tsx` - Animated background component

**All components are fully documented and used throughout the dashboard.**

---

## 📁 Project Structure

```
Project/
├── Backend/
│   ├── main.py                          # FastAPI server
│   ├── requirements.txt                 # Python dependencies
│   ├── start.bat                        # Windows startup script
│   ├── README.md                        # Backend documentation
│   └── ml model and visualizations/
│       ├── ml_modeling_fixed.py         # Model training script
│       ├── ml_visualizations.py         # Visualization generation
│       ├── models/                      # Trained ML models
│       │   ├── viral_predictor_xgb_fixed.json
│       │   ├── viewcount_xgb_fixed.json
│       │   └── feature_scaler_fixed.pkl
│       ├── outputs/                     # Processed data
│       │   └── processed_features_fixed.parquet
│       ├── visualizations/              # ML visualizations
│       │   ├── 01_feature_importance.png
│       │   ├── 02_roc_curve.png
│       │   ├── 03_confusion_matrix.png
│       │   └── ...
│       └── YouTube_Dashboard_ML_Integration_README.md
│
├── Frontend/
│   ├── app/                             # Next.js app directory
│   │   ├── page.tsx                     # Main dashboard page (imports dashboard.tsx)
│   │   ├── layout.tsx                   # App layout with ThemeProvider
│   │   └── globals.css                  # Global styles and Tailwind config
│   ├── components/
│   │   ├── ui/                          # UI components (shadcn/ui - 50+ components)
│   │   ├── theme-provider.tsx           # Theme provider component
│   │   └── youtube-dashboard/           # Dashboard components
│   │       ├── DashboardHeader.tsx      # Header with logo and stats
│   │       ├── DashboardFooter.tsx       # Footer component
│   │       ├── Tab1ExecutiveOverview.tsx # Executive overview tab
│   │       ├── Tab2GeographicIntelligence.tsx # Geographic analysis tab
│   │       ├── Tab3TemporalAnalytics.tsx # Temporal patterns tab
│   │       ├── Tab4EngagementAnalytics.tsx # Engagement metrics tab
│   │       ├── Tab5VideoPredictor.tsx   # ML-powered predictor tab
│   │       ├── StatCard.tsx             # Animated statistic card component
│   │       ├── GlowCard.tsx             # Premium glow effect card
│   │       ├── AnimatedCounter.tsx      # Number animation component
│   │       ├── AnimatedProgressBar.tsx  # Animated progress bar
│   │       ├── LiveIndicator.tsx        # Live status indicator
│   │       ├── MetricBadge.tsx          # Metric badge component
│   │       ├── IconBox.tsx              # Icon container component
│   │       ├── GradientText.tsx         # Gradient text component
│   │       ├── FloatingParticles.tsx    # Background particles effect
│   │       └── AnimatedBackground.tsx  # Animated background component
│   ├── dashboard.tsx                    # Main dashboard component (used by page.tsx)
│   ├── package.json                     # Node dependencies
│   ├── tailwind.config.ts               # Tailwind CSS configuration
│   └── tsconfig.json                    # TypeScript configuration
│
├── EDA/
│   ├── eda_analysis.ipynb                # Jupyter notebook (EDA)
│   └── eda_analysis.ipynb                # EDA notebook (all findings consolidated in FINAL_BLOG_POST.md)
│
├── RESEARCH_QUESTIONS.md                 # Research questions & methodology
├── FINAL_BLOG_POST.md                    # Final checkpoint blog post
└── README.md                             # This file
```

---

## 📈 Results & Findings

### Key Insights

1. **Early Engagement is Critical**: Videos with high initial engagement ratios (8%+) have 3x higher viral probability

2. **Timing Matters**: Thursday-Friday posting increases engagement by 15-20%

3. **Metadata Optimization**: Complete metadata (tags + descriptions) increases engagement by 8-12%

4. **Geographic Variation**: Average views vary 2x between countries (Korea: 12.4M avg, others: 4-6M)

5. **Channel Authority**: Established channels (50+ videos) have 2x higher viral rates

6. **Title Length Sweet Spot**: 50-60 characters maximizes engagement

### Model Performance

- **Viral Prediction**: 75% accuracy, 80% AUC-ROC
- **View Forecasting**: R² = 0.75-0.80
- **Feature Importance**: Engagement ratios (35%), View count (20%), Timing (15%)

---

## 🛠️ Technical Stack

### Backend

- **Python** 3.12
- **FastAPI** - REST API framework
- **XGBoost** - Machine learning models
- **scikit-learn** - Preprocessing & evaluation
- **PySpark** - Distributed data processing
- **NumPy, Pandas** - Data manipulation
- **Joblib** - Model serialization

### Frontend

- **React** 19 - UI framework
- **Next.js** 15 - React framework
- **TypeScript** - Type safety
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Data Processing

- **PySpark** - Distributed processing
- **Parquet** - Columnar storage
- **Jupyter Notebook** - EDA analysis

---

## 👥 Contributors

**Group-5**
- **Mujtaba Shah** - Data Science & ML Modeling
- **Abdul Moeed** - Dashboard Development & Visualization

**Course**: AI622 - Data Science & Visualization  
**Institution**: University, Fall 2025  
**Project Duration**: October 2023 - October 2025

---

## 📄 License

This project is for **academic purposes** only. All rights reserved.

---

## 📚 Documentation

- **Backend API**: See `Backend/README.md`
- **ML Models**: See `Backend/ml model and visualizations/YouTube_Dashboard_ML_Integration_README.md`
- **Research Questions**: See `RESEARCH_QUESTIONS.md`
- **Final Blog Post**: See `FINAL_BLOG_POST.md` (includes all EDA findings and final ML work)

---

## 🔗 Quick Links

- **API Documentation**: `http://localhost:8000/docs`
- **Dashboard**: `http://localhost:3000`
- **Health Check**: `http://localhost:8000/health`

---

## 🐛 Troubleshooting

### Backend Issues

**Issue**: Models not loading  
**Solution**: Ensure model files exist in `Backend/ml model and visualizations/models/`

**Issue**: Port 8000 already in use  
**Solution**: Change port in `main.py` or use `uvicorn main:app --port 8001`

**Issue**: PySpark errors  
**Solution**: Ensure Java 8+ is installed and JAVA_HOME is set

### Frontend Issues

**Issue**: API connection errors  
**Solution**: Ensure backend is running on `http://localhost:8000`

**Issue**: Build errors  
**Solution**: Clear `.next` folder and reinstall dependencies

---

## 📞 Support

For issues or questions, please refer to:
- Backend documentation: `Backend/README.md`
- ML integration guide: `Backend/ml model and visualizations/YouTube_Dashboard_ML_Integration_README.md`
- Research questions: `RESEARCH_QUESTIONS.md`
- Final blog post: `FINAL_BLOG_POST.md`

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: ✅ Complete

