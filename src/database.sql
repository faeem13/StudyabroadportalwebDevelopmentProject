-- ================================================================
-- STUDY ABROAD PORTAL - DATABASE SCHEMA
-- ================================================================
-- MySQL Database Schema for Study Abroad Portal
-- This file contains all table definitions and initial setup
-- Version: 2.1.0 - Fixed data types for tuition_fee, acceptance_rate, and amount
-- ================================================================

-- ================================================================
-- DROP EXISTING DATABASE (CLEAN START)
-- ================================================================
-- WARNING: This will delete all existing data!
DROP DATABASE IF EXISTS study_abroad_portal;

-- ================================================================
-- CREATE DATABASE
-- ================================================================
CREATE DATABASE study_abroad_portal
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Use the database
USE study_abroad_portal;

-- ================================================================
-- USERS TABLE
-- ================================================================
-- Stores user account information and profile details
CREATE TABLE users (
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
CREATE TABLE saved_universities (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    user_id INT NOT NULL,
                                    university_name VARCHAR(255) NOT NULL,
                                    country VARCHAR(100) NOT NULL,
                                    ranking INT DEFAULT NULL,
                                    tuition_fee VARCHAR(100) DEFAULT NULL COMMENT 'Stores tuition as string (e.g., $55,000 - $60,000/year)',
                                    acceptance_rate VARCHAR(50) DEFAULT NULL COMMENT 'Stores acceptance rate as string (e.g., 7%)',
                                    program TEXT DEFAULT NULL COMMENT 'Program list - can be long',
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
CREATE TABLE saved_scholarships (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    user_id INT NOT NULL,
                                    scholarship_name VARCHAR(255) NOT NULL,
                                    country VARCHAR(100) NOT NULL,
                                    amount VARCHAR(100) DEFAULT NULL COMMENT 'Stores amount as string (e.g., Full funding, $50,000)',
                                    deadline VARCHAR(100) DEFAULT NULL COMMENT 'Stores deadline as string (e.g., November 2025, 2025-11-01)',
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
CREATE TABLE user_sessions (
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
CREATE TABLE user_activity_log (
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
-- VERIFICATION QUERIES
-- ================================================================
-- Run these to verify the database was created correctly

-- Show all tables
SHOW TABLES;

-- Verify saved_universities structure
DESCRIBE saved_universities;

-- Verify saved_scholarships structure
DESCRIBE saved_scholarships;

-- ================================================================
-- SUCCESS MESSAGE
-- ================================================================
SELECT 'Database created successfully!' AS Status;
SELECT 'Schema version: 2.1.0' AS Version;
SELECT 'Ready to use!' AS Message;

-- ================================================================
-- NEXT STEPS
-- ================================================================
-- 1. Start your server: npm start
-- 2. Register a new user account
-- 3. Try saving universities and scholarships
-- 4. All data will be stored with correct string formats!
-- ================================================================
