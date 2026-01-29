// ================================================================
// DATABASE CONFIGURATION
// ================================================================
// MySQL Database connection configuration
// Make sure to update these values with your database credentials
// ================================================================

const mysql = require('mysql2');

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'fahim',
    database: process.env.DB_NAME || 'study_abroad_portal',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

// Create connection pool for better performance
const pool = mysql.createPool(dbConfig);

// Get promise-based pool for async/await
const promisePool = pool.promise();

// Test database connection
async function testConnection() {
    try {
        const connection = await promisePool.getConnection();
        console.log('✅ Database connected successfully!');
        console.log(`   Database: ${dbConfig.database}`);
        console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error('   Error:', error.message);
        console.error('');
        console.error('   Please check:');
        console.error('   1. MySQL server is running');
        console.error('   2. Database credentials are correct in db-config.js or .env');
        console.error('   3. Database "study_abroad_portal" exists');
        console.error('');
        return false;
    }
}

// Initialize database connection on startup
testConnection();

module.exports = {
    pool,
    promisePool,
    testConnection
};
