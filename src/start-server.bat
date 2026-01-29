@echo off
REM ================================================================
REM Study Abroad Portal - Server Startup Script (Windows)
REM ================================================================
REM This script automates the server startup process

cls

echo ================================================================
echo.
echo        Study Abroad Portal - Server Startup
echo.
echo ================================================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

node --version
npm --version
echo [SUCCESS] Node.js and NPM are installed!
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo [ERROR] package.json not found!
    echo Please make sure you're in the correct directory.
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Dependencies not installed yet.
    echo Installing dependencies...
    echo.
    call npm install
    
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Failed to install dependencies!
        echo Please try running 'npm install' manually.
        echo.
        pause
        exit /b 1
    )
    
    echo.
    echo [SUCCESS] Dependencies installed!
    echo.
)

REM Start the server
echo Starting the server...
echo.

call npm start

pause
