// ================================================================
// STUDY ABROAD PORTAL - EXPRESS SERVER
// ================================================================
// A simple Express server to serve the Study Abroad Portal
// Handles static files and provides API endpoints for future expansion

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// ================================================================
// MIDDLEWARE
// ================================================================

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Log all requests (helpful for debugging)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// ================================================================
// PAGE ROUTES
// ================================================================

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Start/Landing page
app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, 'start.html'));
});

// Home page (explicit route)
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// User profile page
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});

// Preparation tips page
app.get('/preparation', (req, res) => {
    res.sendFile(path.join(__dirname, 'preparation-tips.html'));
});

app.get('/preparation-tips', (req, res) => {
    res.sendFile(path.join(__dirname, 'preparation-tips.html'));
});

// Test preparation page
app.get('/test-prep', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-prep.html'));
});

app.get('/tests', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-prep.html'));
});

// Universities page
app.get('/universities', (req, res) => {
    res.sendFile(path.join(__dirname, 'universities.html'));
});

// Scholarships page
app.get('/scholarships', (req, res) => {
    res.sendFile(path.join(__dirname, 'scholarships.html'));
});

// Visa guide page
app.get('/visa', (req, res) => {
    res.sendFile(path.join(__dirname, 'visa-guide.html'));
});

app.get('/visa-guide', (req, res) => {
    res.sendFile(path.join(__dirname, 'visa-guide.html'));
});

// Job prospects page
app.get('/jobs', (req, res) => {
    res.sendFile(path.join(__dirname, 'job-prospects.html'));
});

app.get('/job-prospects', (req, res) => {
    res.sendFile(path.join(__dirname, 'job-prospects.html'));
});

// ================================================================
// API ENDPOINTS (For future database integration)
// ================================================================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Study Abroad Portal API is running',
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    });
});

// Mock user authentication endpoint
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // This is a mock endpoint - replace with actual database authentication
    res.json({
        success: true,
        message: 'Login successful (mock)',
        user: {
            id: 1,
            email: email,
            name: email.split('@')[0]
        }
    });
});

// Mock user registration endpoint
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // This is a mock endpoint - replace with actual database registration
    res.json({
        success: true,
        message: 'Registration successful (mock)',
        user: {
            id: 1,
            name: name,
            email: email
        }
    });
});

// Mock get user profile endpoint
app.get('/api/user/profile', (req, res) => {
    // This is a mock endpoint - replace with actual database query
    res.json({
        success: true,
        user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            savedUniversities: [],
            savedScholarships: []
        }
    });
});

// Mock save university endpoint
app.post('/api/user/save-university', (req, res) => {
    const { universityId } = req.body;
    
    // This is a mock endpoint - replace with actual database save
    res.json({
        success: true,
        message: 'University saved successfully (mock)',
        universityId: universityId
    });
});

// Mock save scholarship endpoint
app.post('/api/user/save-scholarship', (req, res) => {
    const { scholarshipId } = req.body;
    
    // This is a mock endpoint - replace with actual database save
    res.json({
        success: true,
        message: 'Scholarship saved successfully (mock)',
        scholarshipId: scholarshipId
    });
});

// Mock universities endpoint
app.get('/api/universities', (req, res) => {
    // This is a mock endpoint - replace with actual database query
    res.json({
        success: true,
        universities: [
            {
                id: 1,
                name: 'Harvard University',
                country: 'United States',
                ranking: 1,
                tuition: 51904
            },
            {
                id: 2,
                name: 'University of Oxford',
                country: 'United Kingdom',
                ranking: 2,
                tuition: 30000
            }
        ]
    });
});

// Mock scholarships endpoint
app.get('/api/scholarships', (req, res) => {
    // This is a mock endpoint - replace with actual database query
    res.json({
        success: true,
        scholarships: [
            {
                id: 1,
                name: 'Fulbright Scholarship',
                country: 'United States',
                amount: 50000,
                deadline: '2026-10-15'
            },
            {
                id: 2,
                name: 'Chevening Scholarship',
                country: 'United Kingdom',
                amount: 45000,
                deadline: '2026-11-01'
            }
        ]
    });
});

// ================================================================
// ERROR HANDLING
// ================================================================

// 404 handler - Page not found
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Page Not Found</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-align: center;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                }
                h1 {
                    font-size: 120px;
                    margin-bottom: 20px;
                    text-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                h2 {
                    font-size: 36px;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 18px;
                    margin-bottom: 30px;
                    opacity: 0.9;
                }
                a {
                    display: inline-block;
                    padding: 15px 40px;
                    background: white;
                    color: #667eea;
                    text-decoration: none;
                    border-radius: 50px;
                    font-weight: 600;
                    transition: transform 0.3s;
                }
                a:hover {
                    transform: translateY(-3px);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <a href="/">Go Back Home</a>
            </div>
        </body>
        </html>
    `);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ================================================================
// START SERVER
// ================================================================

app.listen(PORT, () => {
    console.log('\n');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                                                            ║');
    console.log('║        🌍 Study Abroad Portal Server                      ║');
    console.log('║                                                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('  ✅ Server is running successfully!');
    console.log('');
    console.log('  🌐 Local:    http://localhost:' + PORT);
    console.log('  🌐 Network:  http://' + HOST + ':' + PORT);
    console.log('');
    console.log('╔════════════════════���═══════════════════════════════════════╗');
    console.log('║  Available Pages:                                          ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  • Home:             http://localhost:' + PORT + '/home               ║');
    console.log('║  • Start Page:       http://localhost:' + PORT + '/start              ║');
    console.log('║  • Login:            http://localhost:' + PORT + '/login              ║');
    console.log('║  • Profile:          http://localhost:' + PORT + '/profile            ║');
    console.log('║  • Preparation:      http://localhost:' + PORT + '/preparation        ║');
    console.log('║  • Test Prep:        http://localhost:' + PORT + '/test-prep          ║');
    console.log('║  • Universities:     http://localhost:' + PORT + '/universities       ║');
    console.log('║  • Scholarships:     http://localhost:' + PORT + '/scholarships       ║');
    console.log('║  • Visa Guide:       http://localhost:' + PORT + '/visa               ║');
    console.log('║  • Job Prospects:    http://localhost:' + PORT + '/jobs               ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  API Endpoints (Mock - for testing):                       ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  • Health Check:     http://localhost:' + PORT + '/api/health         ║');
    console.log('║  • Login (POST):     http://localhost:' + PORT + '/api/auth/login     ║');
    console.log('║  • Register (POST):  http://localhost:' + PORT + '/api/auth/register  ║');
    console.log('║  • User Profile:     http://localhost:' + PORT + '/api/user/profile   ║');
    console.log('║  • Universities:     http://localhost:' + PORT + '/api/universities   ║');
    console.log('║  • Scholarships:     http://localhost:' + PORT + '/api/scholarships   ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('  📝 Press Ctrl+C to stop the server');
    console.log('');
    console.log('  📚 See README.md for full documentation');
    console.log('  📚 See MYSQL_INTEGRATION_GUIDE.md for database setup');
    console.log('');
    console.log('════════════════════════════════════════════════════════════════');
    console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n\n🛑 Server shutting down...');
    console.log('✅ Server stopped successfully');
    process.exit(0);
});