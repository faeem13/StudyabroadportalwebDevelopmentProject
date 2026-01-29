-- ================================================================
-- STUDY ABROAD PORTAL - DATABASE SCHEMA
-- ================================================================
-- MySQL Database Schema for Study Abroad Portal
-- This file contains all table definitions and initial setup
-- Version: 2.0.0
-- ================================================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS study_abroad_portal 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE study_abroad_portal;

-- ================================================================
-- USERS TABLE
-- ================================================================
-- Stores user account information and profile details
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,
    current_education TEXT DEFAULT NULL,
    target_degree VARCHAR(100) DEFAULT NULL,
    profile_image_url TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- SAVED UNIVERSITIES TABLE
-- ================================================================
-- Stores universities saved by users
CREATE TABLE IF NOT EXISTS saved_universities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    university_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    ranking INT DEFAULT NULL,
    tuition_fee DECIMAL(10, 2) DEFAULT NULL,
    acceptance_rate DECIMAL(5, 2) DEFAULT NULL,
    program VARCHAR(255) DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_saved_at (saved_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- SAVED SCHOLARSHIPS TABLE
-- ================================================================
-- Stores scholarships saved by users
CREATE TABLE IF NOT EXISTS saved_scholarships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    scholarship_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) DEFAULT NULL,
    deadline DATE DEFAULT NULL,
    eligibility TEXT DEFAULT NULL,
    application_url TEXT DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_saved_at (saved_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- USER SESSIONS TABLE (Optional - for session management)
-- ================================================================
-- Stores active user sessions for better security
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- USER ACTIVITY LOG TABLE (Optional - for tracking)
-- ================================================================
-- Logs user activities for analytics and debugging
CREATE TABLE IF NOT EXISTS user_activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    activity_description TEXT DEFAULT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- SAMPLE DATA (FOR TESTING)
-- ================================================================
-- Insert a demo user for testing
-- Password: demo123 (hashed with bcrypt)
-- Note: This password hash is for "demo123" - you should change it in production
INSERT INTO users (name, email, password_hash, phone, country, current_education, target_degree) 
VALUES (
    'Demo User',
    'demo@studyabroad.com',
    '$2b$10$YourHashedPasswordHere',
    '+1234567890',
    'United States',
    'Bachelor of Science in Computer Science',
    'Master of Science'
) ON DUPLICATE KEY UPDATE email = email;

-- ================================================================
-- USEFUL QUERIES FOR MAINTENANCE
-- ================================================================

-- View all users with their activity counts
-- SELECT 
--     u.id, 
--     u.name, 
--     u.email, 
--     u.created_at,
--     COUNT(DISTINCT su.id) as saved_universities_count,
--     COUNT(DISTINCT ss.id) as saved_scholarships_count
-- FROM users u
-- LEFT JOIN saved_universities su ON u.id = su.user_id
-- LEFT JOIN saved_scholarships ss ON u.id = ss.user_id
-- GROUP BY u.id;

-- View recent user activity
-- SELECT u.name, u.email, ual.activity_type, ual.activity_description, ual.created_at
-- FROM user_activity_log ual
-- JOIN users u ON ual.user_id = u.id
-- ORDER BY ual.created_at DESC
-- LIMIT 50;

-- Clean up expired sessions
-- DELETE FROM user_sessions WHERE expires_at < NOW() OR is_active = FALSE;

-- ================================================================
-- INDEXES FOR PERFORMANCE (Already created above)
-- ================================================================
-- All necessary indexes are created in the table definitions above
-- Additional indexes can be added based on query patterns

-- ================================================================
-- BACKUP RECOMMENDATIONS
-- ================================================================
-- Regular backups are recommended:
-- mysqldump -u root -p study_abroad_portal > backup_$(date +%Y%m%d).sql
-- 
-- Restore from backup:
-- mysql -u root -p study_abroad_portal < backup_20260129.sql
-- ================================================================
