#!/bin/bash

# ================================================================
# Study Abroad Portal - Server Startup Script
# ================================================================
# This script automates the server startup process

clear

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        Study Abroad Portal - Server Startup                ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
echo "🔍 Checking Node.js installation..."
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "📥 Please install Node.js from: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    echo "   Please make sure you're in the correct directory."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies not installed yet."
    echo "📦 Installing dependencies..."
    echo ""
    npm install
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Failed to install dependencies!"
        echo "   Please try running 'npm install' manually."
        exit 1
    fi
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
fi

# Start the server
echo "🚀 Starting the server..."
echo ""

npm start
