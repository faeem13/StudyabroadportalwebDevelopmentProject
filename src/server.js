/**
 * Simple Express Server for Study Abroad Portal
 * Serves static HTML, CSS, and JavaScript files
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve static files from specific directories
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/html-version', express.static(path.join(__dirname, 'html-version')));

// Route handlers for main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/preparation', (req, res) => {
  res.sendFile(path.join(__dirname, 'preparation-tips.html'));
});

app.get('/test-prep', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-prep.html'));
});

app.get('/universities', (req, res) => {
  res.sendFile(path.join(__dirname, 'universities.html'));
});

app.get('/scholarships', (req, res) => {
  res.sendFile(path.join(__dirname, 'scholarships.html'));
});

app.get('/visa', (req, res) => {
  res.sendFile(path.join(__dirname, 'visa-guide.html'));
});

app.get('/jobs', (req, res) => {
  res.sendFile(path.join(__dirname, 'job-prospects.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'profile.html'));
});

// API endpoints for future MySQL integration
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Mock API endpoints (to be replaced with MySQL integration)
app.post('/api/auth/signup', (req, res) => {
  // This will be replaced with actual MySQL queries
  res.json({ 
    success: true, 
    message: 'Signup endpoint ready for MySQL integration',
    data: req.body 
  });
});

app.post('/api/auth/login', (req, res) => {
  // This will be replaced with actual MySQL queries
  res.json({ 
    success: true, 
    message: 'Login endpoint ready for MySQL integration',
    data: req.body 
  });
});

app.get('/api/user/:userId', (req, res) => {
  // This will be replaced with actual MySQL queries
  res.json({ 
    success: true, 
    message: 'Get user endpoint ready for MySQL integration',
    userId: req.params.userId 
  });
});

app.put('/api/user/:userId', (req, res) => {
  // This will be replaced with actual MySQL queries
  res.json({ 
    success: true, 
    message: 'Update user endpoint ready for MySQL integration',
    userId: req.params.userId,
    data: req.body 
  });
});

app.post('/api/user/:userId/saved-items', (req, res) => {
  // This will be replaced with actual MySQL queries
  res.json({ 
    success: true, 
    message: 'Save item endpoint ready for MySQL integration',
    userId: req.params.userId,
    data: req.body 
  });
});

app.get('/api/user/:userId/saved-items', (req, res) => {
  // This will be replaced with actual MySQL queries
  res.json({ 
    success: true, 
    message: 'Get saved items endpoint ready for MySQL integration',
    userId: req.params.userId,
    items: [] 
  });
});

app.delete('/api/user/:userId/saved-items/:itemId', (req, res) => {
  // This will be replaced with actual MySQL queries
  res.json({ 
    success: true, 
    message: 'Delete saved item endpoint ready for MySQL integration',
    userId: req.params.userId,
    itemId: req.params.itemId 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'home.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        Study Abroad Portal Server                          ║
║                                                            ║
║        Server is running on:                               ║
║        http://localhost:${PORT}                              ║
║                                                            ║
║        Available pages:                                    ║
║        • Home: http://localhost:${PORT}/                     ║
║        • Preparation Tips: http://localhost:${PORT}/preparation ║
║        • Test Prep: http://localhost:${PORT}/test-prep       ║
║        • Universities: http://localhost:${PORT}/universities ║
║        • Scholarships: http://localhost:${PORT}/scholarships ║
║        • Visa Guide: http://localhost:${PORT}/visa           ║
║        • Job Prospects: http://localhost:${PORT}/jobs        ║
║        • Login: http://localhost:${PORT}/login               ║
║        • Profile: http://localhost:${PORT}/profile           ║
║                                                            ║
║        Press Ctrl+C to stop the server                     ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
