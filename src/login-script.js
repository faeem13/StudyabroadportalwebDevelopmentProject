// Authentication Manager
class AuthManager {
    constructor() {
        this.currentForm = 'login';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkIfAlreadyLoggedIn();
        this.createDemoAccount();
    }

    // Check if user is already logged in
    checkIfAlreadyLoggedIn() {
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId) {
            window.location.href = 'profile.html';
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Form toggle buttons
        const showSignupBtn = document.getElementById('showSignupBtn');
        const showLoginBtn = document.getElementById('showLoginBtn');
        
        if (showSignupBtn) {
            showSignupBtn.addEventListener('click', () => this.showSignup());
        }

        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', () => this.showLogin());
        }

        // Password toggle buttons
        const toggleLoginPassword = document.getElementById('toggleLoginPassword');
        const toggleSignupPassword = document.getElementById('toggleSignupPassword');

        if (toggleLoginPassword) {
            toggleLoginPassword.addEventListener('click', () => {
                this.togglePasswordVisibility('loginPassword', toggleLoginPassword);
            });
        }

        if (toggleSignupPassword) {
            toggleSignupPassword.addEventListener('click', () => {
                this.togglePasswordVisibility('signupPassword', toggleSignupPassword);
            });
        }

        // Form submissions
        document.getElementById('loginFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('signupFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        // Forgot password
        const forgotPassword = document.getElementById('forgotPassword');
        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }

        // Social login buttons
        const socialBtns = document.querySelectorAll('.social-btn');
        socialBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleSocialLogin(btn);
            });
        });

        // Add input animations
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }

    // Toggle password visibility
    togglePasswordVisibility(inputId, button) {
        const input = document.getElementById(inputId);
        const icon = button.querySelector('.eye-icon');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            input.type = 'password';
            icon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    }

    // Show signup form
    showSignup() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        loginForm.style.opacity = '0';
        setTimeout(() => {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            setTimeout(() => {
                signupForm.style.opacity = '1';
            }, 10);
        }, 300);
        
        this.currentForm = 'signup';
        this.clearErrors();
    }

    // Show login form
    showLogin() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        signupForm.style.opacity = '0';
        setTimeout(() => {
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
            setTimeout(() => {
                loginForm.style.opacity = '1';
            }, 10);
        }, 300);
        
        this.currentForm = 'login';
        this.clearErrors();
    }

    // Handle forgot password
    handleForgotPassword() {
        const email = document.getElementById('loginEmail').value.trim();
        
        if (!email) {
            alert('Please enter your email address first, then click "Forgot password?"');
            document.getElementById('loginEmail').focus();
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (user) {
            alert(`Password reset link has been sent to ${email}\n\n(Demo: Check console for password)`);
            const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');
            console.log(`Password for ${email}: ${passwords[user.id]}`);
        } else {
            alert('No account found with this email address.');
        }
    }

    // Handle social login
    handleSocialLogin(button) {
        const provider = button.classList.contains('google-btn') ? 'Google' : 'Other';
        alert(`${provider} authentication would be integrated here.\n\nThis is a demo - please use email/password login or create an account.`);
    }

    // Handle login
    async handleLogin() {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        const submitBtn = document.getElementById('loginSubmitBtn');
        const errorEl = document.getElementById('loginError');
        const successEl = document.getElementById('loginSuccess');

        this.clearErrors();

        if (!email || !password) {
            this.showError(errorEl, 'Please fill in all fields');
            return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        await this.sleep(800);

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');

        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            this.showError(errorEl, 'No account found with this email address');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        if (passwords[user.id] !== password) {
            this.showError(errorEl, 'Incorrect password. Please try again.');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }

        localStorage.setItem('currentUserId', user.id);

        this.showSuccess(successEl, 'Login successful! Redirecting to your profile...');
        await this.sleep(1500);
        window.location.href = 'profile.html';
    }

    // Handle signup
    async handleSignup() {
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const submitBtn = document.getElementById('signupSubmitBtn');
        const errorEl = document.getElementById('signupError');
        const successEl = document.getElementById('signupSuccess');

        this.clearErrors();

        if (!name || !email || !password) {
            this.showError(errorEl, 'Please fill in all fields');
            return;
        }

        if (name.length < 2) {
            this.showError(errorEl, 'Please enter your full name');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError(errorEl, 'Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            this.showError(errorEl, 'Password must be at least 6 characters long');
            return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        await this.sleep(800);

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');

        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            this.showError(errorEl, 'An account with this email already exists');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

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

        users.push(newUser);
        passwords[newUser.id] = password;

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('passwords', JSON.stringify(passwords));
        localStorage.setItem('currentUserId', newUser.id);

        this.showSuccess(successEl, 'Account created successfully! Welcome aboard!');
        await this.sleep(1500);
        window.location.href = 'profile.html';
    }

    // Validate email
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Show error message
    showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }

    // Show success message
    showSuccess(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }

    // Clear all errors
    clearErrors() {
        const messages = document.querySelectorAll('.error-message, .success-message');
        messages.forEach(msg => {
            msg.classList.remove('show');
            msg.textContent = '';
        });
    }

    // Sleep helper
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Create demo account
    createDemoAccount() {
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
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();

    // Add smooth transitions to forms
    const authBoxes = document.querySelectorAll('.auth-box');
    authBoxes.forEach(box => {
        box.style.transition = 'opacity 0.3s ease-in-out';
    });

    // Console message
    console.log('%c🎓 Study Abroad Portal', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%c✨ Demo Account Available', 'color: #764ba2; font-size: 16px; font-weight: bold;');
    console.log('%cEmail: demo@example.com', 'color: #16a34a; font-size: 14px;');
    console.log('%cPassword: demo123', 'color: #16a34a; font-size: 14px;');
    console.log('%c\nOr create your own account to get started!', 'color: #64748b; font-size: 14px;');
});
