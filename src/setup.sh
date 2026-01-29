#!/bin/bash

# Study Abroad Portal - Setup Script
# This script will set up and start your portal

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        Study Abroad Portal - Setup Script                 ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"
echo ""

# Check if package.json exists
echo "📄 Checking for package.json..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    echo "📝 Creating package.json..."
    
    cat > package.json << 'EOF'
{
  "name": "study-abroad-portal-standalone",
  "version": "1.0.0",
  "description": "Study Abroad Portal - Standalone HTML/CSS/JavaScript Version",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js",
    "serve": "node server.js"
  },
  "keywords": [
    "study-abroad",
    "education",
    "portal"
  ],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
EOF
    echo "✅ package.json created!"
else
    echo "✅ package.json found!"
fi
echo ""

# Check if server.js exists
echo "🔍 Checking for server.js..."
if [ ! -f "server.js" ]; then
    echo "⚠️  server.js not found!"
    echo "   Please make sure server.js is in the current directory."
    exit 1
fi
echo "✅ server.js found!"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    echo "   Try running: npm install --force"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""

# Start the server
echo "🚀 Starting the server..."
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║  ✅ Setup Complete!                                        ║"
echo "║                                                            ║"
echo "║  🌐 Opening browser at: http://localhost:3000             ║"
echo "║                                                            ║"
echo "║  Press Ctrl+C to stop the server                          ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Start the server
npm start
