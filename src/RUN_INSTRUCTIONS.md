# 🚀 How to Run Your Study Abroad Portal

## Quick Fix for "Missing script: start" Error

You're getting this error because npm can't find the package.json file or you're not in the correct directory.

---

## 🎯 Solution Options (Choose One)

### Option 1: Use Setup Script (Easiest) ⭐ RECOMMENDED

This automatically checks everything and sets up the project.

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```bash
setup.bat
```

**What it does:**
- ✅ Checks if Node.js is installed
- ✅ Creates package.json if missing
- ✅ Installs dependencies
- ✅ Starts the server automatically

---

### Option 2: Manual Setup (Step by Step)

#### Step 1: Verify Your Location
Make sure you're in the project root directory:

```bash
pwd
```

Should show something like: `/home/fahim/Desktop/project web`

#### Step 2: Check Files
List files to ensure you have the necessary files:

```bash
ls -la
```

You should see:
- `package.json`
- `server.js`
- `home.html`
- And other project files

#### Step 3: If package.json is Missing
Create it manually by copying this into a file named `package.json`:

```json
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
```

#### Step 4: Install Dependencies
```bash
npm install
```

#### Step 5: Start the Server
```bash
npm start
```

#### Step 6: Open Browser
```
http://localhost:3000
```

---

### Option 3: Run Directly with Node.js (No npm needed)

If npm continues to have issues, bypass it entirely:

**Linux/Mac:**
```bash
chmod +x run-direct.sh
./run-direct.sh
```

**Windows:**
```bash
run-direct.bat
```

**Or manually:**
```bash
# Install dependencies
npm install express cors

# Run server directly
node server.js
```

---

## 🔧 Troubleshooting Common Issues

### Issue 1: "command not found: npm"

**Problem:** Node.js is not installed

**Solution:**
1. Download Node.js from: https://nodejs.org/
2. Install the LTS version
3. Restart your terminal
4. Verify: `node --version` and `npm --version`

---

### Issue 2: "Missing script: start"

**Problem:** package.json is missing or you're in the wrong directory

**Solutions:**
1. Check you're in the correct directory: `pwd`
2. List files: `ls` (or `dir` on Windows)
3. If package.json is missing, use **Option 1** (setup script) above
4. Or manually create package.json using the content in **Option 2**

---

### Issue 3: "Port 3000 is already in use"

**Problem:** Another process is using port 3000

**Solution A:** Stop the other process

**Solution B:** Use a different port:
```bash
# Linux/Mac
PORT=8080 npm start

# Windows Command Prompt
set PORT=8080 && npm start

# Windows PowerShell
$env:PORT=8080; npm start
```

Then open: `http://localhost:8080`

---

### Issue 4: "Cannot find module 'express'"

**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
```

If that fails:
```bash
npm install --force
```

Or:
```bash
npm install express cors --save
```

---

### Issue 5: Pages Not Loading / CSS Missing

**Solutions:**
1. Clear browser cache: `Ctrl + Shift + Delete`
2. Hard refresh: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
3. Check server is still running
4. Check browser console for errors (F12)

---

### Issue 6: Permission Errors (Linux/Mac)

**Solution:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or run with sudo
sudo npm install
```

---

## 📋 File Checklist

Make sure these files exist in your project directory:

### Core Files:
- ✅ `package.json` - NPM configuration
- ✅ `server.js` - Express server

### HTML Pages:
- ✅ `home.html`
- ✅ `login.html`
- ✅ `profile.html`
- ✅ `preparation-tips.html`
- ✅ `test-prep.html`
- ✅ `universities.html`
- ✅ `scholarships.html`
- ✅ `visa-guide.html`
- ✅ `job-prospects.html`

### CSS Files:
- ✅ `home-styles.css`
- ✅ `login-styles.css`
- ✅ `profile-styles.css`
- ✅ And other corresponding CSS files

### JavaScript Files:
- ✅ `home-script.js`
- ✅ `login-script.js`
- ✅ `profile-script.js`
- ✅ And other corresponding JS files

---

## 🎯 Quick Command Reference

```bash
# Check Node.js version
node --version
npm --version

# Install dependencies
npm install
# or
npm i

# Start server
npm start
# or
npm run dev

# Run directly with Node
node server.js

# Stop server
Ctrl + C

# Clear npm cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Available Pages After Starting

Once the server is running, access these URLs:

- **Home**: http://localhost:3000/
- **Preparation Tips**: http://localhost:3000/preparation
- **Test Prep**: http://localhost:3000/test-prep
- **Universities**: http://localhost:3000/universities
- **Scholarships**: http://localhost:3000/scholarships
- **Visa Guide**: http://localhost:3000/visa
- **Job Prospects**: http://localhost:3000/jobs
- **Login**: http://localhost:3000/login
- **Profile**: http://localhost:3000/profile

---

## 🆘 Still Not Working?

Try this nuclear option:

```bash
# 1. Delete everything npm-related
rm -rf node_modules package-lock.json

# 2. Recreate package.json using setup.sh or manually

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall
npm install

# 5. Run
npm start
```

**Or just run the server directly:**
```bash
node server.js
```

---

## 📚 Additional Documentation

- **Full Setup Guide**: `STANDALONE_SETUP.md`
- **Installation Steps**: `INSTALLATION_STEPS.md`
- **Quick Start**: `QUICK_START_STANDALONE.md`
- **MySQL Integration**: `MYSQL_INTEGRATION_GUIDE.md`
- **Project Summary**: `PROJECT_SUMMARY.md`

---

## ✨ Success Indicators

When everything works, you'll see:

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        Study Abroad Portal Server                          ║
║                                                            ║
║        Server is running on:                               ║
║        http://localhost:3000                               ║
║                                                            ║
║        Available pages:                                    ║
║        • Home: http://localhost:3000/                      ║
║        • Preparation Tips: http://localhost:3000/preparation ║
║        • Test Prep: http://localhost:3000/test-prep        ║
║        • Universities: http://localhost:3000/universities  ║
║        • Scholarships: http://localhost:3000/scholarships  ║
║        • Visa Guide: http://localhost:3000/visa            ║
║        • Job Prospects: http://localhost:3000/jobs         ║
║        • Login: http://localhost:3000/login                ║
║        • Profile: http://localhost:3000/profile            ║
║                                                            ║
║        Press Ctrl+C to stop the server                     ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

**Good luck! 🎉 Your portal should be running soon!**
