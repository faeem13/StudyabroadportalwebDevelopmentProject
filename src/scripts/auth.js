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
                <button id="userMenuBtn" class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover-lift">
                    <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <span class="font-medium">${currentUser.name}</span>
                    <svg class="w-4 h-4 chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                
                <div id="userMenuDropdown" class="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 hidden opacity-0 scale-95 transition-all duration-200">
                    <div class="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                        <p class="text-sm font-semibold text-gray-900">${currentUser.name}</p>
                        <p class="text-xs text-gray-600 truncate mt-0.5">${currentUser.email}</p>
                    </div>
                    <div class="py-2">
                        <button class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all font-medium">
                            👤 Profile
                        </button>
                        <button class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all font-medium">
                            💾 Saved Items
                        </button>
                        <button class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all font-medium">
                            ⚙️ Settings
                        </button>
                    </div>
                    <div class="border-t border-gray-100">
                        <button id="logoutBtn" class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all flex items-center gap-2 font-medium">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Mobile user menu
        mobileUserArea.innerHTML = `
            <div class="space-y-3">
                <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <p class="text-sm font-semibold text-gray-900">${currentUser.name}</p>
                    <p class="text-xs text-gray-600 truncate mt-1">${currentUser.email}</p>
                </div>
                <button id="mobileLogoutBtn" class="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium">
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
            <button id="loginBtn" class="px-6 py-2.5 bg-white text-blue-600 rounded-lg font-medium shadow-md hover:shadow-lg transition-all border-2 border-blue-600 hover:bg-blue-50 hover-scale">
                Login
            </button>
        `;
        
        mobileUserArea.innerHTML = `
            <button id="mobileLoginBtn" class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
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