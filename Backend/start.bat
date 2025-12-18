@echo off
echo ========================================
echo YouTube Viral Intelligence API Server
echo ========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo [1/3] Installing dependencies...
pip install -q fastapi uvicorn[standard] pydantic python-multipart xgboost scikit-learn joblib numpy

echo.
echo [2/3] Starting API server...
echo.
echo Server will be available at: http://localhost:8000
echo API docs will be at: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause

