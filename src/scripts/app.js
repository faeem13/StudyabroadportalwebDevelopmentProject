// Main App Initialization

// App State
const appState = {
    currentSection: 'home',
    user: null,
    savedItems: {
        universities: [],
        scholarships: [],
    },
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('Study Abroad Portal - Initializing...');
    
    // Initialize modules
    initAuth();
    initNavigation();
    
    // Load home page
    loadHomePage();
    
    console.log('Study Abroad Portal - Ready!');
});

// Handle Browser Back/Forward
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
        navigateTo(event.state.section);
    }
});

// Global Error Handler
window.addEventListener('error', (event) => {
    console.error('Application Error:', event.error);
});

// Log app version
console.log('Study Abroad Portal v1.0.0 - HTML/CSS/JavaScript');
