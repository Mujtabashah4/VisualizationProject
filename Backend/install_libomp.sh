#!/bin/bash
# Script to install libomp for XGBoost on macOS

echo "Installing libomp (OpenMP runtime) for XGBoost..."
brew install libomp

if [ $? -eq 0 ]; then
    echo "✅ libomp installed successfully!"
    echo "You can now run: python main.py"
else
    echo "❌ Installation failed. Please check the error above."
    exit 1
fi

