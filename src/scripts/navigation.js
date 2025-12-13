// Navigation Module

let currentSection = 'home';

// Initialize Navigation
function initNavigation() {
    setupNavigationListeners();
    setupMobileMenu();
}

// Setup Navigation Listeners
function setupNavigationListeners() {
    // Desktop nav links
    const navLinks = $$('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const section = link.dataset.section;
            navigateTo(section);
        });
    });
    
    // Mobile nav links
    const mobileLinks = $$('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const section = link.dataset.section;
            navigateTo(section);
            closeMobileNav();
        });
    });
    
    // Logo click
    const logoArea = $('#logoArea');
    if (logoArea) {
        logoArea.addEventListener('click', () => {
            navigateTo('home');
        });
    }
}

// Setup Mobile Menu
function setupMobileMenu() {
    const mobileMenuBtn = $('#mobileMenuBtn');
    const mobileNav = $('#mobileNav');
    const menuIcon = $('#menuIcon');
    const closeIcon = $('#closeIcon');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileNav.classList.contains('hidden');
            
            if (isHidden) {
                mobileNav.classList.remove('hidden');
                setTimeout(() => {
                    mobileNav.classList.add('show');
                }, 10);
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                closeMobileNav();
            }
        });
    }
}

// Close Mobile Nav
function closeMobileNav() {
    const mobileNav = $('#mobileNav');
    const menuIcon = $('#menuIcon');
    const closeIcon = $('#closeIcon');
    
    if (mobileNav) {
        mobileNav.classList.remove('show');
        setTimeout(() => {
            mobileNav.classList.add('hidden');
        }, 300);
    }
    
    if (menuIcon && closeIcon) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Navigate to Section
function navigateTo(section) {
    if (currentSection === section) return;
    
    currentSection = section;
    updateActiveLinks(section);
    loadSection(section);
    scrollToTop();
}

// Update Active Links
function updateActiveLinks(section) {
    // Desktop links
    const navLinks = $$('.nav-link');
    navLinks.forEach(link => {
        const indicator = link.querySelector('.active-indicator');
        
        if (link.dataset.section === section) {
            link.classList.add('text-blue-600', 'bg-blue-50');
            link.classList.remove('text-gray-700');
            
            // Show active indicator
            if (!indicator) {
                const newIndicator = document.createElement('div');
                newIndicator.className = 'active-indicator absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full';
                link.appendChild(newIndicator);
            }
        } else {
            link.classList.remove('text-blue-600', 'bg-blue-50');
            link.classList.add('text-gray-700');
            
            // Remove active indicator
            if (indicator) {
                indicator.remove();
            }
        }
    });
    
    // Mobile links
    const mobileLinks = $$('.mobile-nav-link');
    mobileLinks.forEach(link => {
        if (link.dataset.section === section) {
            link.classList.add('text-white', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'shadow-md');
            link.classList.remove('text-gray-700');
        } else {
            link.classList.remove('text-white', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'shadow-md');
            link.classList.add('text-gray-700');
        }
    });
}

// Load Section
function loadSection(section) {
    const mainContent = $('#mainContent');
    
    // Add fade out
    mainContent.classList.add('fade-out');
    
    setTimeout(() => {
        // Load content based on section
        switch (section) {
            case 'home':
                loadHomePage();
                break;
            case 'preparation':
                loadPreparationPage();
                break;
            case 'tests':
                loadTestsPage();
                break;
            case 'universities':
                loadUniversitiesPage();
                break;
            case 'scholarships':
                loadScholarshipsPage();
                break;
            case 'visa':
                loadVisaPage();
                break;
            case 'jobs':
                loadJobsPage();
                break;
            default:
                loadHomePage();
        }
        
        // Add fade in
        mainContent.classList.remove('fade-out');
        mainContent.classList.add('fade-in');
        
        setTimeout(() => {
            mainContent.classList.remove('fade-in');
        }, 300);
    }, 300);
}

// Get Current Section
function getCurrentSection() {
    return currentSection;
}