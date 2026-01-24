// Authentication Manager
class AuthManager {
    constructor() {
        this.currentForm = 'login';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkIfAlreadyLoggedIn();
    }

    // Check if user is already logged in
    checkIfAlreadyLoggedIn() {
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId) {
            // User is already logged in, redirect to profile
            window.location.href = 'profile.html';
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Form toggle buttons
        document.getElementById('showSignupBtn').addEventListener('click', () => {
            this.showSignup();
        });

        document.getElementById('showLoginBtn').addEventListener('click', () => {
            this.showLogin();
        });

        // Form submissions
        document.getElementById('loginFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('signupFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });
    }

    // Show signup form
    showSignup() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
        this.currentForm = 'signup';
        this.clearErrors();
    }

    // Show login form
    showLogin() {
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        this.currentForm = 'login';
        this.clearErrors();
    }

    // Handle login
    async handleLogin() {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const submitBtn = document.getElementById('loginSubmitBtn');
        const errorEl = document.getElementById('loginError');

        // Clear previous errors
        this.clearErrors();

        // Validate inputs
        if (!email || !password) {
            this.showError(errorEl, 'Please fill in all fields');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate network delay
        await this.sleep(500);

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');

        // Find user
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            this.showError(errorEl, 'No account found with this email');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        // Check password
        if (passwords[user.id] !== password) {
            this.showError(errorEl, 'Invalid password');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        // Login successful
        localStorage.setItem('currentUserId', user.id);

        // Show success and redirect
        this.showSuccess('Login successful! Redirecting...');
        await this.sleep(1000);
        window.location.href = 'profile.html';
    }

    // Handle signup
    async handleSignup() {
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const submitBtn = document.getElementById('signupSubmitBtn');
        const errorEl = document.getElementById('signupError');

        // Clear previous errors
        this.clearErrors();

        // Validate inputs
        if (!name || !email || !password) {
            this.showError(errorEl, 'Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            this.showError(errorEl, 'Password must be at least 6 characters');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate network delay
        await this.sleep(500);

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');

        // Check if email already exists
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            this.showError(errorEl, 'An account with this email already exists');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email: email,
            name: name,
            phone: '',
            country: '',
            dateOfBirth: '',
            education: '',
            targetDegree: '',
            savedScholarships: [],
            savedUniversities: [],
            createdAt: new Date().toISOString()
        };

        // Save user and password
        users.push(newUser);
        passwords[newUser.id] = password;

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('passwords', JSON.stringify(passwords));
        localStorage.setItem('currentUserId', newUser.id);

        // Show success and redirect
        this.showSuccess('Account created successfully! Redirecting...');
        await this.sleep(1000);
        window.location.href = 'profile.html';
    }

    // Show error message
    showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }

    // Clear all errors
    clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
    }

    // Show success message
    showSuccess(message) {
        // Create or get success message element
        let successEl = document.querySelector('.success-message');
        
        if (!successEl) {
            successEl = document.createElement('div');
            successEl.className = 'success-message';
            
            // Insert before the active form
            const activeForm = this.currentForm === 'login' 
                ? document.getElementById('loginFormElement')
                : document.getElementById('signupFormElement');
            
            activeForm.parentElement.insertBefore(successEl, activeForm);
        }

        successEl.textContent = message;
        successEl.classList.add('show');
    }

    // Sleep helper
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});

// Add demo account info (for testing)
console.log('%c📚 Study Abroad Portal - Demo Account', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cCreate a new account or use demo credentials:', 'color: #6b7280; font-size: 14px;');
console.log('%cEmail: demo@example.com', 'color: #16a34a; font-size: 14px;');
console.log('%cPassword: demo123', 'color: #16a34a; font-size: 14px;');

// Create demo account if it doesn't exist
const users = JSON.parse(localStorage.getItem('users') || '[]');
const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');

if (!users.find(u => u.email === 'demo@example.com')) {
    const demoUser = {
        id: 'demo-user-001',
        email: 'demo@example.com',
        name: 'Demo User',
        phone: '+1 234-567-8900',
        country: 'United States',
        dateOfBirth: '2000-01-15',
        education: "Bachelor's",
        targetDegree: "Master's",
        savedScholarships: [
            'Fulbright Foreign Student Program',
            'Chevening Scholarships'
        ],
        savedUniversities: [
            'Massachusetts Institute of Technology',
            'Stanford University'
        ],
        createdAt: new Date().toISOString()
    };

    users.push(demoUser);
    passwords['demo-user-001'] = 'demo123';

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('passwords', JSON.stringify(passwords));
}