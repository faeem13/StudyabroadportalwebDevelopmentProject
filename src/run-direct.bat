@echo off
REM Direct Node.js runner - bypasses npm
REM Use this if npm install or npm start is not working

echo Starting Study Abroad Portal directly with Node.js...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if server.js exists
if not exist "server.js" (
    echo [ERROR] server.js not found in current directory!
    echo Please navigate to the project root directory.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [WARNING] Dependencies not installed!
    echo Installing express and cors...
    call npm install express cors
    echo.
)

echo ================================================================
echo.
echo        Study Abroad Portal Server
echo.
echo        Server starting...
echo        Open: http://localhost:3000
echo.
echo        Press Ctrl+C to stop
echo.
echo ================================================================
echo.

REM Run server directly with Node.js
node server.js

pause
