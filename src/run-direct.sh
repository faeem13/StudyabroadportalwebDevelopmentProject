#!/bin/bash

# Direct Node.js runner - bypasses npm
# Use this if npm install or npm start is not working

echo "🚀 Starting Study Abroad Portal directly with Node.js..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install Node.js from: https://nodejs.org/"
    exit 1
fi

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found in current directory!"
    echo "Please navigate to the project root directory."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed!"
    echo "📦 Installing express and cors..."
    npm install express cors
    echo ""
fi

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        Study Abroad Portal Server                          ║"
echo "║                                                            ║"
echo "║        Server starting...                                  ║"
echo "║        Open: http://localhost:3000                         ║"
echo "║                                                            ║"
echo "║        Press Ctrl+C to stop                                ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Run server directly with Node.js
node server.js
