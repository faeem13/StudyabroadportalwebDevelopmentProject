# 📦 Installation & Setup Guide

Complete guide to get your Study Abroad Portal up and running.

---

## 🎯 Choose Your Method

### Method 1: With Server (npm start) ⭐ RECOMMENDED FOR DEVELOPMENT
### Method 2: Without Server (Direct Browser Access)

---

# Method 1: Server Setup (npm start)

## ✅ Prerequisites

### Install Node.js and npm

**Check if already installed:**
```bash
node --version
npm --version
```

**If not installed:**
1. Go to: https://nodejs.org/
2. Download LTS (Long Term Support) version
3. Install (follow installer instructions)
4. Restart your terminal/command prompt
5. Verify installation: `node --version`

---

## 📥 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd /path/to/study-abroad-portal
```

**On Windows:**
```bash
cd C:\Users\YourName\Desktop\study-abroad-portal
```

**On Mac/Linux:**
```bash
cd ~/Desktop/study-abroad-portal
```

### Step 2: Install Dependencies

```bash
npm install
```

**What this does:**
- Installs Express (web server framework)
- Installs CORS (cross-origin resource sharing)
- Installs Body-parser (request parsing)
- Creates `node_modules` folder
- Creates `package-lock.json` file

**Expected output:**
```
added 57 packages, and audited 58 packages in 3s
found 0 vulnerabilities
```

### Step 3: Start the Server

```bash
npm start
```

**You should see:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        🌍 Study Abroad Portal Server                      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

  ✅ Server is running successfully!

  🌐 Local:    http://localhost:3000
  🌐 Network:  http://localhost:3000

╔════════════════════════════════════════════════════════════╗
║  Available Pages:                                          ║
╠════════════════════════════════════════════════════════════╣
║  • Home:             http://localhost:3000/                    ║
║  • Start Page:       http://localhost:3000/start              ║
║  • Login:            http://localhost:3000/login              ║
...
```

### Step 4: Open Your Browser

Go to: **http://localhost:3000**

🎉 **Success! The portal is now running!**

---

## 🎮 Server Commands

```bash
# Start the server
npm start

# Alternative start commands (all do the same thing)
npm run dev
npm run serve

# Stop the server
Ctrl + C
```

---

## 🌐 Available URLs (When Server is Running)

### Pages:
- http://localhost:3000/ (Home)
- http://localhost:3000/start (Landing page)
- http://localhost:3000/login
- http://localhost:3000/profile
- http://localhost:3000/preparation
- http://localhost:3000/test-prep
- http://localhost:3000/universities
- http://localhost:3000/scholarships
- http://localhost:3000/visa
- http://localhost:3000/jobs

### API Endpoints (Mock):
- http://localhost:3000/api/health
- http://localhost:3000/api/universities
- http://localhost:3000/api/scholarships

---

## 🔧 Troubleshooting Server Setup

### Problem 1: "node: command not found"

**Solution:**
- Node.js is not installed
- Install from: https://nodejs.org/
- Restart terminal after installation

### Problem 2: "npm: command not found"

**Solution:**
- npm comes with Node.js
- Reinstall Node.js from: https://nodejs.org/
- On Linux, install separately: `sudo apt install npm`

### Problem 3: "Cannot find module 'express'"

**Solution:**
```bash
npm install
```

If that fails:
```bash
npm install --force
```

Or install manually:
```bash
npm install express cors body-parser
```

### Problem 4: "Port 3000 is already in use"

**Solution A:** Stop other process using port 3000

**Solution B:** Use different port:
```bash
# Linux/Mac
PORT=8080 npm start

# Windows Command Prompt
set PORT=8080 && npm start

# Windows PowerShell
$env:PORT=8080; npm start
```

Then visit: http://localhost:8080

### Problem 5: "Missing script: start"

**Solution:**
- Check that `package.json` exists in current directory
- Verify you're in the correct directory: `ls` (should show package.json)
- If missing, you're in wrong directory

### Problem 6: Permission errors (Linux/Mac)

**Solution:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or install with sudo
sudo npm install
```

### Problem 7: npm install is very slow

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

### Problem 8: EACCES error

**Solution (Linux/Mac):**
```bash
sudo npm install -g npm@latest
```

**Solution (Windows):**
- Run Command Prompt as Administrator
- Run: `npm install`

---

## 🔄 Restart After Changes

If you modify `server.js` or other server files:

1. Stop server: `Ctrl + C`
2. Start again: `npm start`

**Note:** HTML, CSS, and client-side JS changes don't need server restart. Just refresh browser.

---

# Method 2: Direct Browser Access (No Server)

## 🚀 Super Simple - No Installation!

### Option 1: Double-Click
1. Find `start.html` or `home.html` in file explorer
2. Double-click it
3. Opens in default browser
4. Done! ✅

### Option 2: Right-Click
1. Right-click `start.html` or `home.html`
2. Select "Open with"
3. Choose browser (Chrome, Firefox, Edge, Safari)
4. Done! ✅

### Option 3: Drag and Drop
1. Open your web browser
2. Drag `start.html` or `home.html` into browser window
3. Done! ✅

### Option 4: File Menu
1. Open browser
2. File → Open File (or Ctrl+O / Cmd+O)
3. Navigate to project folder
4. Select `start.html` or `home.html`
5. Done! ✅

---

## 📊 Comparison: Server vs Direct

| Feature | With Server | Without Server |
|---------|-------------|----------------|
| Installation | Requires Node.js/npm | None needed |
| URLs | Clean (/home) | File paths (home.html) |
| API Endpoints | Available | Not available |
| Setup Time | 5 minutes | 0 seconds |
| Best For | Development, Testing | Quick viewing, Sharing |
| Database Ready | Yes (with setup) | No |
| Internet Required | No (except images) | No (except images) |

---

## 💡 Recommendations

### Use Server Method If:
- ✅ You're developing features
- ✅ You want clean URLs
- ✅ You plan to add database
- ✅ You want API endpoints
- ✅ You're testing in production-like environment

### Use Direct Method If:
- ✅ You just want to view/test quickly
- ✅ You don't want to install anything
- ✅ You're sharing with someone
- ✅ You're on a restricted computer
- ✅ You want simplicity

---

## 🎓 Next Steps

### After Installation:

1. **Explore the Portal**
   - Navigate through all pages
   - Test features and tools
   - Create a user account

2. **Customize Content**
   - Edit university data
   - Add scholarships
   - Update country information

3. **Database Integration (Optional)**
   - Read `MYSQL_INTEGRATION_GUIDE.md`
   - Set up MySQL database
   - Connect backend to database

4. **Deploy Online**
   - See README.md deployment section
   - Choose hosting platform
   - Upload and go live!

---

## 📚 Additional Resources

- **README.md** - Complete documentation
- **QUICK_START.txt** - Quick reference
- **MYSQL_INTEGRATION_GUIDE.md** - Database setup
- **AUTH_SYSTEM_README.md** - Authentication details

---

## ✅ Installation Checklist

### For Server Method:
- [ ] Node.js installed and verified
- [ ] Navigated to project directory
- [ ] Ran `npm install` successfully
- [ ] Ran `npm start` successfully
- [ ] Opened http://localhost:3000 in browser
- [ ] Portal loads correctly

### For Direct Method:
- [ ] Located HTML files
- [ ] Opened `start.html` or `home.html` in browser
- [ ] Portal loads correctly

---

## 🎉 You're All Set!

Your Study Abroad Portal is now ready to use!

**Questions?** Check the troubleshooting section or README.md

**Good luck with your study abroad journey! 🌍✈️📚**
