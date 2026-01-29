# Study Abroad Portal - Standalone Version Setup Guide

This guide will help you set up and run the standalone HTML/CSS/JavaScript version of the Study Abroad Portal.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation Steps

### 1. Install Dependencies

Run the following command in your terminal from the project root directory:

```bash
npm install
```

Or the shorthand:

```bash
npm i
```

This will install:
- **Express**: A minimal Node.js web server framework
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing

### 2. Start the Development Server

After installation, start the server using any of these commands:

```bash
npm start
```

Or:

```bash
npm run dev
```

Or:

```bash
npm run serve
```

### 3. Access the Application

Once the server is running, open your browser and navigate to:

```
http://localhost:3000
```

The server will display a welcome message in the terminal showing all available pages:

- **Home**: http://localhost:3000/
- **Preparation Tips**: http://localhost:3000/preparation
- **Test Prep**: http://localhost:3000/test-prep
- **Universities**: http://localhost:3000/universities
- **Scholarships**: http://localhost:3000/scholarships
- **Visa Guide**: http://localhost:3000/visa
- **Job Prospects**: http://localhost:3000/jobs
- **Login**: http://localhost:3000/login
- **Profile**: http://localhost:3000/profile

## Project Structure

```
study-abroad-portal/
├── server.js                 # Express server configuration
├── standalone-package.json   # Package configuration for standalone version
├── home.html                 # Main landing page
├── login.html               # Login page
├── profile.html             # User profile page
├── preparation-tips.html    # Preparation tips page
├── test-prep.html           # Test preparation page
├── universities.html        # University matcher page
├── scholarships.html        # Scholarship finder page
├── visa-guide.html          # Visa guide page
├── job-prospects.html       # Job prospects page
├── styles/                  # CSS files
│   ├── main.css
│   ├── animations.css
│   ├── components.css
│   └── globals.css
├── scripts/                 # JavaScript files
│   ├── app.js
│   ├── auth.js
│   ├── navigation.js
│   ├── utils.js
│   └── pages/              # Page-specific scripts
│       ├── home.js
│       ├── preparation.js
│       ├── tests.js
│       ├── universities.js
│       ├── scholarships.js
│       ├── visa.js
│       └── jobs.js
└── html-version/           # Alternative HTML structure
    ├── login.html
    ├── login.js
    ├── login.css
    ├── profile.html
    ├── profile.js
    └── profile.css
```

## Features

### Current Features (localStorage-based)

✅ Complete authentication system (login/signup)
✅ User profile management
✅ Save scholarships and universities
✅ Interactive quizzes
✅ Cost calculators
✅ University comparison tools
✅ IELTS/GRE/TOEFL preparation resources
✅ Country-wise job prospects
✅ Visa information

### Upcoming Features (MySQL integration)

🔄 Database-backed user authentication
🔄 Persistent user profiles
🔄 Server-side data storage
🔄 Advanced search and filtering
🔄 User analytics and tracking

## API Endpoints

The server includes mock API endpoints ready for MySQL integration:

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/:userId` - Get user profile
- `PUT /api/user/:userId` - Update user profile

### Saved Items
- `POST /api/user/:userId/saved-items` - Save a scholarship/university
- `GET /api/user/:userId/saved-items` - Get all saved items
- `DELETE /api/user/:userId/saved-items/:itemId` - Remove a saved item

### Health Check
- `GET /api/health` - Server health status

## Development

### Changing the Port

By default, the server runs on port 3000. To change it, set the `PORT` environment variable:

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

### Hot Reload

Currently, you need to manually refresh the browser to see changes. For automatic reload:

1. Install nodemon globally:
   ```bash
   npm install -g nodemon
   ```

2. Run the server with nodemon:
   ```bash
   nodemon server.js
   ```

### Adding New Pages

1. Create your HTML file in the root directory (e.g., `new-page.html`)
2. Add a route in `server.js`:
   ```javascript
   app.get('/new-page', (req, res) => {
     res.sendFile(path.join(__dirname, 'new-page.html'));
   });
   ```
3. Restart the server

## MySQL Integration

See `MYSQL_INTEGRATION_GUIDE.md` for detailed instructions on integrating MySQL database.

The server.js file already includes placeholder API endpoints that are ready to be connected to MySQL queries.

## Troubleshooting

### Port Already in Use

If you see an error like "Port 3000 is already in use":

1. Stop any other servers running on that port
2. Or change the port using the `PORT` environment variable (see above)

### Cannot Find Module 'express'

Make sure you've run `npm install` first to install all dependencies.

### Pages Not Loading

1. Check that the server is running
2. Verify the file names match the routes in server.js
3. Check the browser console for errors

### Static Files Not Loading

If CSS or JavaScript files aren't loading:

1. Check the file paths in your HTML files
2. Make sure the `styles/` and `scripts/` directories exist
3. Verify the static file middleware in server.js is configured correctly

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

## Next Steps

1. ✅ Install dependencies with `npm install`
2. ✅ Start the server with `npm start`
3. ✅ Test all pages and features
4. 🔄 Set up MySQL database (see MYSQL_INTEGRATION_GUIDE.md)
5. 🔄 Replace localStorage with MySQL queries
6. 🔄 Add user session management
7. 🔄 Implement password hashing and security

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the console logs for error messages
- Ensure all files are in the correct locations

---

**Happy coding! 🚀**
