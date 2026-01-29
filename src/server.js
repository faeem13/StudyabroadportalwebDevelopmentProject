// ================================================================
// STUDY ABROAD PORTAL - EXPRESS SERVER WITH MYSQL
// ================================================================
// Express server with MySQL database integration
// Version: 2.0.0
// ================================================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import database configuration
const { promisePool } = require('./db-config');

// Initialize Express app
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const BCRYPT_ROUNDS = 10;

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

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Start/Landing page
app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, 'start.html'));
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
// API ENDPOINTS - AUTHENTICATION
// ================================================================

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        await promisePool.query('SELECT 1');
        res.json({
            status: 'OK',
            message: 'Study Abroad Portal API is running',
            database: 'Connected',
            timestamp: new Date().toISOString(),
            version: '2.0.0'
        });
    } catch (error) {
        res.json({
            status: 'OK',
            message: 'Study Abroad Portal API is running',
            database: 'Disconnected',
            timestamp: new Date().toISOString(),
            version: '2.0.0'
        });
    }
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user already exists
        const [existingUsers] = await promisePool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

        // Insert user into database
        const [result] = await promisePool.query(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, passwordHash]
        );

        // Log activity
        await promisePool.query(
            'INSERT INTO user_activity_log (user_id, activity_type, activity_description) VALUES (?, ?, ?)',
            [result.insertId, 'register', 'User registered successfully']
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: result.insertId,
                name: name,
                email: email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user by email
        const [users] = await promisePool.query(
            'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const user = users[0];

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login
        await promisePool.query(
            'UPDATE users SET last_login = NOW() WHERE id = ?',
            [user.id]
        );

        // Log activity
        await promisePool.query(
            'INSERT INTO user_activity_log (user_id, activity_type, activity_description) VALUES (?, ?, ?)',
            [user.id, 'login', 'User logged in successfully']
        );

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                country: user.country,
                dateOfBirth: user.date_of_birth,
                currentEducation: user.current_education,
                targetDegree: user.target_degree,
                profileImage: user.profile_image_url
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// ================================================================
// API ENDPOINTS - USER PROFILE
// ================================================================

// Get user profile
app.get('/api/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const [users] = await promisePool.query(
            'SELECT * FROM users WHERE id = ? AND is_active = TRUE',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const user = users[0];

        // Get saved universities count
        const [universitiesCount] = await promisePool.query(
            'SELECT COUNT(*) as count FROM saved_universities WHERE user_id = ?',
            [userId]
        );

        // Get saved scholarships count
        const [scholarshipsCount] = await promisePool.query(
            'SELECT COUNT(*) as count FROM saved_scholarships WHERE user_id = ?',
            [userId]
        );

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                country: user.country,
                dateOfBirth: user.date_of_birth,
                currentEducation: user.current_education,
                targetDegree: user.target_degree,
                profileImage: user.profile_image_url,
                savedUniversitiesCount: universitiesCount[0].count,
                savedScholarshipsCount: scholarshipsCount[0].count,
                createdAt: user.created_at,
                lastLogin: user.last_login
            }
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching profile'
        });
    }
});

// Update user profile
app.put('/api/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, phone, country, dateOfBirth, currentEducation, targetDegree } = req.body;

        await promisePool.query(
            `UPDATE users SET 
                name = COALESCE(?, name),
                phone = COALESCE(?, phone),
                country = COALESCE(?, country),
                date_of_birth = COALESCE(?, date_of_birth),
                current_education = COALESCE(?, current_education),
                target_degree = COALESCE(?, target_degree)
            WHERE id = ?`,
            [name, phone, country, dateOfBirth, currentEducation, targetDegree, userId]
        );

        // Log activity
        await promisePool.query(
            'INSERT INTO user_activity_log (user_id, activity_type, activity_description) VALUES (?, ?, ?)',
            [userId, 'profile_update', 'User updated profile information']
        );

        res.json({
            success: true,
            message: 'Profile updated successfully'
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error updating profile'
        });
    }
});

// ================================================================
// API ENDPOINTS - SAVED ITEMS
// ================================================================

// Save university
app.post('/api/user/:userId/universities', async (req, res) => {
    try {
        const { userId } = req.params;
        const { universityName, country, ranking, tuitionFee, acceptanceRate, program, notes } = req.body;

        const [result] = await promisePool.query(
            `INSERT INTO saved_universities 
            (user_id, university_name, country, ranking, tuition_fee, acceptance_rate, program, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, universityName, country, ranking, tuitionFee, acceptanceRate, program, notes]
        );

        // Log activity
        await promisePool.query(
            'INSERT INTO user_activity_log (user_id, activity_type, activity_description) VALUES (?, ?, ?)',
            [userId, 'save_university', `Saved university: ${universityName}`]
        );

        res.status(201).json({
            success: true,
            message: 'University saved successfully',
            id: result.insertId
        });

    } catch (error) {
        console.error('Save university error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error saving university'
        });
    }
});

// Get saved universities
app.get('/api/user/:userId/universities', async (req, res) => {
    try {
        const { userId } = req.params;

        const [universities] = await promisePool.query(
            'SELECT * FROM saved_universities WHERE user_id = ? ORDER BY saved_at DESC',
            [userId]
        );

        res.json({
            success: true,
            universities: universities
        });

    } catch (error) {
        console.error('Get universities error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching universities'
        });
    }
});

// Delete saved university
app.delete('/api/user/:userId/universities/:universityId', async (req, res) => {
    try {
        const { userId, universityId } = req.params;

        await promisePool.query(
            'DELETE FROM saved_universities WHERE id = ? AND user_id = ?',
            [universityId, userId]
        );

        res.json({
            success: true,
            message: 'University removed successfully'
        });

    } catch (error) {
        console.error('Delete university error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error removing university'
        });
    }
});

// Save scholarship
app.post('/api/user/:userId/scholarships', async (req, res) => {
    try {
        const { userId } = req.params;
        const { scholarshipName, country, amount, deadline, eligibility, applicationUrl, notes } = req.body;

        const [result] = await promisePool.query(
            `INSERT INTO saved_scholarships 
            (user_id, scholarship_name, country, amount, deadline, eligibility, application_url, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, scholarshipName, country, amount, deadline, eligibility, applicationUrl, notes]
        );

        // Log activity
        await promisePool.query(
            'INSERT INTO user_activity_log (user_id, activity_type, activity_description) VALUES (?, ?, ?)',
            [userId, 'save_scholarship', `Saved scholarship: ${scholarshipName}`]
        );

        res.status(201).json({
            success: true,
            message: 'Scholarship saved successfully',
            id: result.insertId
        });

    } catch (error) {
        console.error('Save scholarship error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error saving scholarship'
        });
    }
});

// Get saved scholarships
app.get('/api/user/:userId/scholarships', async (req, res) => {
    try {
        const { userId } = req.params;

        const [scholarships] = await promisePool.query(
            'SELECT * FROM saved_scholarships WHERE user_id = ? ORDER BY saved_at DESC',
            [userId]
        );

        res.json({
            success: true,
            scholarships: scholarships
        });

    } catch (error) {
        console.error('Get scholarships error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching scholarships'
        });
    }
});

// Delete saved scholarship
app.delete('/api/user/:userId/scholarships/:scholarshipId', async (req, res) => {
    try {
        const { userId, scholarshipId } = req.params;

        await promisePool.query(
            'DELETE FROM saved_scholarships WHERE id = ? AND user_id = ?',
            [scholarshipId, userId]
        );

        res.json({
            success: true,
            message: 'Scholarship removed successfully'
        });

    } catch (error) {
        console.error('Delete scholarship error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error removing scholarship'
        });
    }
});

// ================================================================
// ERROR HANDLING
// ================================================================

// 404 handler
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
    console.log('║        🌍 Study Abroad Portal Server (MySQL Enabled)      ║');
    console.log('║                                                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('  ✅ Server is running successfully!');
    console.log('');
    console.log('  🌐 Local:    http://localhost:' + PORT);
    console.log('  🌐 Network:  http://' + HOST + ':' + PORT);
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  Available Pages:                                          ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  • Home:             http://localhost:' + PORT + '/home               ║');
    console.log('║  • Login:            http://localhost:' + PORT + '/login              ║');
    console.log('║  • Profile:          http://localhost:' + PORT + '/profile            ║');
    console.log('║  • Universities:     http://localhost:' + PORT + '/universities       ║');
    console.log('║  • Scholarships:     http://localhost:' + PORT + '/scholarships       ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  API Endpoints (MySQL Database):                           ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  • Health Check:     GET  /api/health                      ║');
    console.log('║  • Register:         POST /api/auth/register               ║');
    console.log('║  • Login:            POST /api/auth/login                  ║');
    console.log('║  • Get Profile:      GET  /api/user/:userId                ║');
    console.log('║  • Update Profile:   PUT  /api/user/:userId                ║');
    console.log('║  • Save University:  POST /api/user/:userId/universities   ║');
    console.log('║  • Get Universities: GET  /api/user/:userId/universities   ║');
    console.log('║  • Save Scholarship: POST /api/user/:userId/scholarships   ║');
    console.log('║  • Get Scholarships: GET  /api/user/:userId/scholarships   ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('  📝 Press Ctrl+C to stop the server');
    console.log('');
    console.log('  📚 Database Setup: See README.md for instructions');
    console.log('');
    console.log('════════════════════════════════════════════════════════════════');
    console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Server shutting down...');
    console.log('✅ Server stopped successfully');
    process.exit(0);
});
