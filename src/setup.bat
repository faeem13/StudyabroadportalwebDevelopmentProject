@echo off
REM Study Abroad Portal - Setup Script for Windows
REM This script will set up and start your portal

echo ================================================================
echo.
echo        Study Abroad Portal - Setup Script
echo.
echo ================================================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

node --version
npm --version
echo [SUCCESS] Node.js and NPM are installed!
echo.

REM Check if package.json exists
echo Checking for package.json...
if not exist "package.json" (
    echo [WARNING] package.json not found!
    echo Creating package.json...
    
    (
        echo {
        echo   "name": "study-abroad-portal-standalone",
        echo   "version": "1.0.0",
        echo   "description": "Study Abroad Portal - Standalone HTML/CSS/JavaScript Version",
        echo   "main": "server.js",
        echo   "scripts": {
        echo     "start": "node server.js",
        echo     "dev": "node server.js",
        echo     "serve": "node server.js"
        echo   },
        echo   "keywords": [
        echo     "study-abroad",
        echo     "education",
        echo     "portal"
        echo   ],
        echo   "author": "",
        echo   "license": "MIT",
        echo   "dependencies": {
        echo     "express": "^4.18.2",
        echo     "cors": "^2.8.5"
        echo   }
        echo }
    ) > package.json
    
    echo [SUCCESS] package.json created!
) else (
    echo [SUCCESS] package.json found!
)
echo.

REM Check if server.js exists
echo Checking for server.js...
if not exist "server.js" (
    echo [ERROR] server.js not found!
    echo Please make sure server.js is in the current directory.
    pause
    exit /b 1
)
echo [SUCCESS] server.js found!
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies!
    echo Try running: npm install --force
    pause
    exit /b 1
)

echo [SUCCESS] Dependencies installed!
echo.

REM Start the server
echo.
echo ================================================================
echo.
echo   Setup Complete!
echo.
echo   Opening browser at: http://localhost:3000
echo.
echo   Press Ctrl+C to stop the server
echo.
echo ================================================================
echo.

REM Start the server
call npm start

pause
