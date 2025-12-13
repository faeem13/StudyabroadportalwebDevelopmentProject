// Authentication Module

let currentUser = Storage.get('user');

// Initialize Auth UI
function initAuth() {
    updateAuthUI();
    setupAuthListeners();
}

// Setup Auth Listeners
function setupAuthListeners() {
    const loginModal = $('#loginModal');
    const closeBtn = $('#closeLoginModal');
    const loginForm = $('#loginForm');

    // Close modal listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLoginModal);
    }

    // Close on overlay click
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Open Login Modal
function openLoginModal() {
    const modal = $('#loginModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Close Login Modal
function closeLoginModal() {
    const modal = $('#loginModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        // Clear form
        $('#loginForm').reset();
    }, 300);
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const name = $('#loginName').value.trim();
    const email = $('#loginEmail').value.trim();
    
    if (name && email) {
        currentUser = { name, email };
        Storage.set('user', currentUser);
        closeLoginModal();
        updateAuthUI();
    }
}

// Handle Logout
function handleLogout() {
    currentUser = null;
    Storage.remove('user');
    updateAuthUI();
    hideUserMenu();
}

// Update Auth UI
function updateAuthUI() {
    const userMenuArea = $('#userMenuArea');
    const mobileUserArea = $('#mobileUserArea');
    
    if (currentUser) {
        // Desktop user menu
        userMenuArea.innerHTML = `
            <div class="relative">
                <button id="userMenuBtn" class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover-scale">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>${currentUser.name}</span>
                </button>
                
                <div id="userMenuDropdown" class="user-menu-dropdown">
                    <div class="user-menu-header">
                        <p class="text-sm text-gray-900">${currentUser.name}</p>
                        <p class="text-xs text-gray-500 truncate">${currentUser.email}</p>
                    </div>
                    <button class="user-menu-button">Profile</button>
                    <button class="user-menu-button">Saved Items</button>
                    <button class="user-menu-button">Settings</button>
                    <div class="user-menu-divider"></div>
                    <button id="logoutBtn" class="user-menu-button text-red-600 flex items-center gap-2">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        `;
        
        // Mobile user menu
        mobileUserArea.innerHTML = `
            <div class="space-y-2">
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="text-sm text-gray-900">${currentUser.name}</p>
                    <p class="text-xs text-gray-500 truncate">${currentUser.email}</p>
                </div>
                <button id="mobileLogoutBtn" class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                </button>
            </div>
        `;
        
        // Add event listeners for user menu
        setTimeout(() => {
            const userMenuBtn = $('#userMenuBtn');
            const logoutBtn = $('#logoutBtn');
            const mobileLogoutBtn = $('#mobileLogoutBtn');
            
            if (userMenuBtn) {
                userMenuBtn.addEventListener('click', toggleUserMenu);
            }
            
            if (logoutBtn) {
                logoutBtn.addEventListener('click', handleLogout);
            }
            
            if (mobileLogoutBtn) {
                mobileLogoutBtn.addEventListener('click', () => {
                    handleLogout();
                    closeMobileMenu();
                });
            }
            
            // Close user menu when clicking outside
            document.addEventListener('click', (e) => {
                const userMenuBtn = $('#userMenuBtn');
                const userMenuDropdown = $('#userMenuDropdown');
                if (userMenuBtn && userMenuDropdown && 
                    !userMenuBtn.contains(e.target) && 
                    !userMenuDropdown.contains(e.target)) {
                    hideUserMenu();
                }
            });
        }, 0);
        
    } else {
        // Login button
        userMenuArea.innerHTML = `
            <button id="loginBtn" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover-scale">
                Login
            </button>
        `;
        
        mobileUserArea.innerHTML = `
            <button id="mobileLoginBtn" class="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Login
            </button>
        `;
        
        // Add login button listeners
        setTimeout(() => {
            const loginBtn = $('#loginBtn');
            const mobileLoginBtn = $('#mobileLoginBtn');
            
            if (loginBtn) {
                loginBtn.addEventListener('click', openLoginModal);
            }
            
            if (mobileLoginBtn) {
                mobileLoginBtn.addEventListener('click', () => {
                    openLoginModal();
                    closeMobileMenu();
                });
            }
        }, 0);
    }
}

// Toggle User Menu
function toggleUserMenu() {
    const dropdown = $('#userMenuDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Hide User Menu
function hideUserMenu() {
    const dropdown = $('#userMenuDropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

// Close Mobile Menu
function closeMobileMenu() {
    const mobileNav = $('#mobileNav');
    const menuIcon = $('#menuIcon');
    const closeIcon = $('#closeIcon');
    
    if (mobileNav) {
        mobileNav.classList.remove('show');
        mobileNav.classList.add('hidden');
    }
    
    if (menuIcon && closeIcon) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Get Current User
function getCurrentUser() {
    return currentUser;
}
