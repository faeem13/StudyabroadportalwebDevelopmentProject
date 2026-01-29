# 🚀 Quick Start Guide - Standalone Version

Get your Study Abroad Portal running in 3 simple steps!

## Prerequisites

Make sure you have **Node.js** installed on your computer.
- Download from: https://nodejs.org/
- Check if installed: Open terminal and run `node --version`

---

## 🎯 3 Steps to Run

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

**What this does:** Downloads Express (web server) and CORS packages.

---

### Step 2: Start the Server

Run:

```bash
npm start
```

Or:

```bash
npm run dev
```

**You'll see a welcome message like this:**

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        Study Abroad Portal Server                          ║
║                                                            ║
║        Server is running on:                               ║
║        http://localhost:3000                               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Step 3: Open in Browser

Open your web browser and go to:

```
http://localhost:3000
```

**That's it! Your portal is now running! 🎉**

---

## 📱 Available Pages

Once running, you can access:

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

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## ⚠️ Troubleshooting

### "Port 3000 is already in use"

**Solution:** Change the port number:

**Windows (Command Prompt):**
```bash
set PORT=8080 && npm start
```

**Windows (PowerShell):**
```bash
$env:PORT=8080; npm start
```

**macOS/Linux:**
```bash
PORT=8080 npm start
```

Then open: http://localhost:8080

---

### "Cannot find module 'express'"

**Solution:** Make sure you ran `npm install` first!

---

### CSS or Images Not Loading

**Solution:** 
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Check that the server is still running

---

## 🔧 File Structure

```
study-abroad-portal/
├── package.json              ← Dependencies config
├── server.js                 ← Web server
├── home.html                 ← Main page
├── home-styles.css           ← Home page styles
├── home-script.js            ← Home page scripts
├── login.html                ← Login page
├── profile.html              ← Profile page
├── preparation-tips.html     ← Preparation page
├── test-prep.html           ← Test prep page
├── universities.html        ← Universities page
├── scholarships.html        ← Scholarships page
├── visa-guide.html          ← Visa guide page
├── job-prospects.html       ← Jobs page
└── ...                      ← Other CSS/JS files
```

---

## 🎓 What's Working

✅ Full authentication system (login/signup)
✅ User profile management
✅ Save scholarships and universities
✅ Interactive quizzes
✅ Cost calculators
✅ University comparison tools
✅ Test preparation resources
✅ Country-wise job prospects
✅ Visa information

---

## 🗄️ Data Storage

Currently using **localStorage** (browser storage) for:
- User accounts
- Profile information
- Saved items

**Next Step:** Integrate with MySQL for permanent database storage.
See `MYSQL_INTEGRATION_GUIDE.md` for details.

---

## 📚 Need More Help?

- Full documentation: `STANDALONE_SETUP.md`
- MySQL integration: `MYSQL_INTEGRATION_GUIDE.md`
- Project summary: `PROJECT_SUMMARY.md`

---

**Happy coding! 🌍✈️📚**
