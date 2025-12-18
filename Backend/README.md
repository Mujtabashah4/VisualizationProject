# YouTube Viral Intelligence - Backend API

FastAPI server that serves ML predictions for the YouTube Dashboard.

## Quick Start

### Option 1: Use the batch file (Windows)
```powershell
.\start.bat
```

### Option 2: Manual start
```powershell
# Install dependencies
pip install -r requirements.txt

# Start server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Option 3: Direct Python
```powershell
# Install dependencies first
pip install fastapi uvicorn[standard] pydantic python-multipart xgboost scikit-learn joblib numpy

# Run
python main.py
```

## API Endpoints

- **Health Check**: `GET http://localhost:8000/`
- **Detailed Health**: `GET http://localhost:8000/health`
- **Predict**: `POST http://localhost:8000/predict`
- **Stats**: `GET http://localhost:8000/stats`
- **API Docs**: `http://localhost:8000/docs` (Interactive Swagger UI)

## Troubleshooting

### Issue: scikit-learn installation fails
**Solution**: Use Python 3.11 or 3.12 instead of 3.13, or install pre-built wheels:
```powershell
pip install --only-binary :all: scikit-learn
```

### Issue: Models not found
**Solution**: Ensure model files exist in `../files (1)/models/`:
- `feature_scaler_fixed.pkl`
- `viral_predictor_xgb_fixed.json`
- `viewcount_xgb_fixed.json`

### Issue: Port 8000 already in use
**Solution**: Change port in `main.py` or use:
```powershell
python -m uvicorn main:app --port 8001
```

