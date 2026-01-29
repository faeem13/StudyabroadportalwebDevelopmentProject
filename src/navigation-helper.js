// ===================================
// GLOBAL NAVIGATION HELPER SCRIPT
// ===================================
// Include this in all pages for consistent navigation functionality

/**
 * Global Navigation Manager
 * Handles navigation, user state, and common functionality across all pages
 */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    checkUserSession();
    setupMobileMenu();
    setupLoginButtons();
});

/**
 * Initialize navigation links and active states
 */
function initializeNavigation() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    
    // Set active state for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Check user session and update UI accordingly
 */
function checkUserSession() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const loginBtn = document.getElementById('loginBtn');
        const loginBtnMobile = document.getElementById('loginBtnMobile');
        
        if (currentUser && currentUser.email) {
            // User is logged in
            if (loginBtn) {
                loginBtn.textContent = currentUser.name || currentUser.email.split('@')[0];
                loginBtn.onclick = function() {
                    window.location.href = 'profile.html';
                };
            }
            if (loginBtnMobile) {
                loginBtnMobile.textContent = currentUser.name || currentUser.email.split('@')[0];
                loginBtnMobile.onclick = function() {
                    window.location.href = 'profile.html';
                };
            }
        } else {
            // User is not logged in
            if (loginBtn) {
                loginBtn.textContent = 'Login';
                loginBtn.onclick = function() {
                    window.location.href = 'login.html';
                };
            }
            if (loginBtnMobile) {
                loginBtnMobile.textContent = 'Login';
                loginBtnMobile.onclick = function() {
                    window.location.href = 'login.html';
                };
            }
        }
    } catch (error) {
        console.error('Error checking user session:', error);
    }
}

/**
 * Setup mobile menu toggle functionality
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = mobileMenuBtn?.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn?.querySelector('.close-icon');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileNav.style.display === 'flex';
            
            if (isOpen) {
                mobileNav.style.display = 'none';
                if (menuIcon) menuIcon.style.display = 'block';
                if (closeIcon) closeIcon.style.display = 'none';
            } else {
                mobileNav.style.display = 'flex';
                if (menuIcon) menuIcon.style.display = 'none';
                if (closeIcon) closeIcon.style.display = 'block';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.style.display = 'none';
                if (menuIcon) menuIcon.style.display = 'block';
                if (closeIcon) closeIcon.style.display = 'none';
            });
        });
    }
}

/**
 * Setup login button functionality
 */
function setupLoginButtons() {
    const loginBtn = document.getElementById('loginBtn');
    const loginBtnMobile = document.getElementById('loginBtnMobile');
    
    // This is called in checkUserSession, but we set up a fallback here
    if (loginBtn && !loginBtn.onclick) {
        loginBtn.onclick = function() {
            window.location.href = 'login.html';
        };
    }
    if (loginBtnMobile && !loginBtnMobile.onclick) {
        loginBtnMobile.onclick = function() {
            window.location.href = 'login.html';
        };
    }
}

/**
 * Navigate to a specific page
 * @param {string} page - The page to navigate to (without .html)
 */
function navigateToPage(page) {
    window.location.href = page + '.html';
}

/**
 * Navigate to a section within a page
 * @param {string} section - The section identifier
 */
function navigateToSection(section) {
    const sectionMap = {
        'preparation': 'preparation-tips.html',
        'tests': 'test-prep.html',
        'universities': 'universities.html',
        'scholarships': 'scholarships.html',
        'visa': 'visa-guide.html',
        'jobs': 'job-prospects.html'
    };
    
    const page = sectionMap[section] || 'home.html';
    window.location.href = page;
}

/**
 * Scroll to top of page smoothly
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Get current user from localStorage
 * @returns {Object|null} Current user object or null if not logged in
 */
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser'));
    } catch (error) {
        return null;
    }
}

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in
 */
function isUserLoggedIn() {
    const user = getCurrentUser();
    return user !== null && user.email;
}

/**
 * Require login - redirect to login page if not logged in
 * @param {string} returnUrl - URL to return to after login
 */
function requireLogin(returnUrl) {
    if (!isUserLoggedIn()) {
        if (returnUrl) {
            localStorage.setItem('returnUrl', returnUrl);
        }
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

/**
 * Logout current user
 */
function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'home.html';
    }
}

/**
 * Show notification/toast message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
}

/**
 * Debounce function for search/filter inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Local Storage Helper Functions
 */
const StorageHelper = {
    // Get item from localStorage with JSON parse
    get: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return defaultValue;
        }
    },
    
    // Set item to localStorage with JSON stringify
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error setting to localStorage:', error);
            return false;
        }
    },
    
    // Remove item from localStorage
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    // Clear all localStorage
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToPage,
        navigateToSection,
        scrollToTop,
        getCurrentUser,
        isUserLoggedIn,
        requireLogin,
        logoutUser,
        showNotification,
        formatDate,
        debounce,
        isValidEmail,
        StorageHelper
    };
}
