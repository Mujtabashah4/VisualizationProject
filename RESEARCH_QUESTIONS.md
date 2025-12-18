# 🔬 Research Questions

## Primary Research Questions

### 1. What factors predict viral success on YouTube?

**Question:** Can we predict whether a video will go viral based on early indicators available at the time of first trending appearance?

**Hypothesis:** 
- Early engagement metrics (likes, comments, views), timing factors (publish day/hour), and metadata completeness (tags, descriptions) are strong predictors of viral potential
- Videos with higher initial engagement ratios and optimal posting times have higher probability of sustained trending

**Methodology:**
- **ML Model:** XGBoost Classifier for binary classification (viral vs. non-viral)
- **Features:** 18 engineered features including engagement ratios, timing flags, metadata indicators, channel history
- **Target:** Videos trending for 30+ days classified as "viral"
- **Evaluation Metrics:** Accuracy, Precision, Recall, F1-Score, AUC-ROC

**Expected Outcome:** Identify key factors that predict viral success with measurable accuracy

---

### 2. How do geographic and temporal factors influence trending patterns?

**Question:** Do different countries and posting times show distinct trending patterns, and what are the optimal strategies for each?

**Hypothesis:**
- Geographic location significantly influences trending patterns
- Optimal posting times vary by country and day of week
- Certain days (Thursday-Friday) show higher engagement rates globally

**Methodology:**
- **Geographic Analysis:** Country distribution analysis, top countries by trending videos
- **Temporal Analysis:** Day-of-week patterns, hour-of-day analysis, monthly trends
- **Statistical Testing:** Chi-square tests for independence, correlation analysis
- **Visualizations:** Geographic heatmaps, temporal trend charts, optimal timing recommendations

**Expected Outcome:** Identify country-specific and time-specific patterns that can inform content strategy

---

### 3. What is the relationship between engagement metrics and view counts?

**Question:** How do engagement metrics (likes, comments, shares) correlate with total view counts, and can we predict view counts from early engagement data?

**Hypothesis:**
- Higher engagement ratios correlate with higher view counts
- Early engagement metrics are predictive of final view counts
- Engagement rate is a better predictor than raw engagement numbers

**Methodology:**
- **ML Model:** XGBoost Regressor for view count prediction
- **Features:** Same 18 features as classification model
- **Target:** Log-transformed maximum view count
- **Evaluation Metrics:** MAE, RMSE, R² Score
- **Analysis:** Correlation analysis between engagement ratios and views

**Expected Outcome:** Quantify the relationship between engagement and views, enable view count forecasting

---

## Secondary Research Questions

### 4. How does metadata completeness impact discoverability and engagement?

**Question:** Do videos with complete metadata (tags, descriptions, language) perform better than those with incomplete metadata?

**Hypothesis:**
- Videos with complete metadata have higher engagement rates
- Tags and descriptions significantly impact discoverability
- Optimal title length exists for maximum engagement

**Methodology:**
- **Analysis:** Compare engagement metrics between videos with/without tags, descriptions
- **Statistical Testing:** T-tests, ANOVA for group comparisons
- **Visualizations:** Metadata completeness vs. engagement scatter plots

**Expected Outcome:** Quantify the impact of metadata optimization on video performance

---

### 5. What are the optimal posting schedules for maximum engagement?

**Question:** Are there specific days and times that maximize engagement rates across different content categories?

**Hypothesis:**
- Thursday and Friday show highest engagement rates
- Afternoon/evening hours (14:00-18:00) are optimal posting windows
- Weekend posting shows different patterns than weekday posting

**Methodology:**
- **Temporal Analysis:** Day-of-week and hour-of-day engagement analysis
- **Category Analysis:** Optimal timing by content category
- **Visualizations:** Heatmaps showing engagement by day/hour combinations

**Expected Outcome:** Provide actionable recommendations for optimal posting schedules

---

### 6. How do channel characteristics influence viral potential?

**Question:** Do channel-level factors (video count, average views, channel age) predict individual video viral success?

**Hypothesis:**
- Established channels with consistent performance have higher viral rates
- Channel authority (measured by historical performance) is a strong predictor
- New channels can still achieve viral success with high-quality content

**Methodology:**
- **Feature Engineering:** Channel historical metrics (avg views, video count)
- **Analysis:** Channel characteristics vs. viral success rates
- **Visualizations:** Scatter plots, channel efficiency analysis

**Expected Outcome:** Understand how channel reputation impacts individual video success

---

## Research Question Summary

| # | Question | Type | Method | Status |
|---|----------|------|--------|--------|
| 1 | Viral prediction factors | Primary | ML Classification | ✅ Complete |
| 2 | Geographic/temporal patterns | Primary | Statistical Analysis | ✅ Complete |
| 3 | Engagement vs. views | Primary | ML Regression | ✅ Complete |
| 4 | Metadata impact | Secondary | Comparative Analysis | ✅ Complete |
| 5 | Optimal posting schedules | Secondary | Temporal Analysis | ✅ Complete |
| 6 | Channel characteristics | Secondary | Feature Analysis | ✅ Complete |

---

## Key Findings (Summary)

1. **Early engagement ratios** are the strongest predictors of viral success
2. **Thursday-Friday** posting shows 15-20% higher engagement rates
3. **Metadata completeness** (tags + descriptions) increases engagement by 8-12%
4. **Geographic patterns** show significant variation (e.g., K-pop effect in Korea)
5. **Channel authority** (historical performance) is a moderate predictor
6. **Optimal title length** is 40-70 characters for maximum engagement

---

## Methodology Overview

- **Dataset:** 3.99M trending video snapshots across 113 countries
- **Time Period:** October 2023 - October 2025 (24 months)
- **ML Models:** XGBoost Classifier & Regressor
- **Training Split:** 70% train, 15% validation, 15% test
- **Tools:** PySpark, XGBoost, scikit-learn, React, Recharts
- **Statistical Tests:** Chi-square, T-tests, Correlation analysis

