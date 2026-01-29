# 🔧 Installation & Setup Steps

## Problem: "Missing script: start" Error

If you're getting this error:
```
npm ERR! Missing script: "start"
```

This means npm cannot find the package.json file. Follow these steps:

---

## ✅ Solution Steps

### Step 1: Verify You're in the Correct Directory

Make sure you're in the project root directory where the package.json file is located.

**Check current directory:**
```bash
pwd
```

**You should see something like:**
```
/home/fahim/Desktop/project web
```

**List files to verify package.json exists:**
```bash
ls -la
```

**You should see:**
- package.json
- server.js
- home.html
- And other project files

---

### Step 2: If package.json is Missing

If you don't see `package.json`, you might be in the wrong directory or the file didn't get created.

**Option A: Navigate to the correct directory**
```bash
cd /path/to/your/project
```

**Option B: Create package.json manually**

Copy this content and save it as `package.json` in your project root:

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

**Save this file as:** `package.json`

---

### Step 3: Verify package.json Content

**Check if package.json has the correct content:**
```bash
cat package.json
```

**Or on Windows:**
```bash
type package.json
```

**You should see the scripts section with:**
```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js",
  "serve": "node server.js"
}
```

---

### Step 4: Install Dependencies

Once package.json is in place:

```bash
npm install
```

**This will create:**
- `node_modules/` folder (with Express and CORS)
- `package-lock.json` file

---

### Step 5: Start the Server

After successful installation:

```bash
npm start
```

**You should see:**
```
╔════════════════════════════════════════════════════════════╗
║        Study Abroad Portal Server                          ║
║        Server is running on:                               ║
║        http://localhost:3000                               ║
╚════════════════════════════════════════════════════════════╝
```

---

## 🔍 Additional Troubleshooting

### Issue: "node: command not found"

**Solution:** Install Node.js
- Download from: https://nodejs.org/
- Install the LTS (Long Term Support) version
- Restart your terminal after installation

**Verify installation:**
```bash
node --version
npm --version
```

---

### Issue: "Cannot find module 'express'"

**Solution:** Dependencies not installed
```bash
npm install
```

---

### Issue: "Port 3000 is already in use"

**Solution 1:** Stop any other server using port 3000

**Solution 2:** Use a different port
```bash
PORT=8080 npm start
```

Then open: http://localhost:8080

---

### Issue: File Permission Errors

**Linux/Mac Solution:**
```bash
sudo npm install
```

**Or fix permissions:**
```bash
sudo chown -R $(whoami) ~/.npm
```

---

## 📂 Required Files Checklist

Make sure these files exist in your project root:

- ✅ `package.json` - NPM configuration
- ✅ `server.js` - Express server
- ✅ `home.html` - Home page
- ✅ `home-styles.css` - Home styles
- ✅ `home-script.js` - Home scripts
- ✅ Other HTML/CSS/JS files for different pages

---

## 🎯 Quick Command Reference

```bash
# Install dependencies
npm install
# or
npm i

# Start server (all do the same thing)
npm start
npm run dev
npm run serve

# Stop server
Ctrl + C

# Check if Node.js is installed
node --version
npm --version

# List all npm scripts
npm run

# Clear npm cache (if issues persist)
npm cache clean --force
```

---

## 🆘 Still Having Issues?

1. **Delete node_modules and try again:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Ensure you're in the correct directory:**
   ```bash
   ls -la | grep package.json
   ```
   Should show: `package.json`

3. **Check for typos in package.json:**
   - Must be named exactly `package.json` (lowercase)
   - Must be valid JSON (no trailing commas)
   - Must have proper quotes (double quotes, not single)

4. **Try running Node directly:**
   ```bash
   node server.js
   ```
   This bypasses npm and runs the server directly.

---

## ✨ Alternative: Run Without NPM

If npm continues to have issues, you can run the server directly:

```bash
# First, install dependencies globally
npm install -g express cors

# Then run the server directly
node server.js
```

This will start the server on http://localhost:3000

---

**Good luck! 🚀**
