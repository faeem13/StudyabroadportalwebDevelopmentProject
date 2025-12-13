// Utility Functions

// DOM Selectors
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animate Counter
function animateCounter(element, target, suffix = '', duration = 2000) {
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, stepDuration);
}

// Format Number
function formatNumber(num) {
    return num.toLocaleString();
}

// Debounce Function
function debounce(func, wait) {
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

// Local Storage Helpers
const Storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error writing to localStorage:', e);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
};

// Show/Hide Element with Animation
function showElement(element, animationClass = 'animate-fadeIn') {
    element.classList.remove('hidden');
    element.classList.add(animationClass);
}

function hideElement(element) {
    element.classList.add('hidden');
}

// Toggle Class
function toggleClass(element, className) {
    element.classList.toggle(className);
}

// Add Multiple Event Listeners
function addEventListeners(elements, event, handler) {
    elements.forEach(element => {
        element.addEventListener(event, handler);
    });
}

// Create Element with Classes and Content
function createElement(tag, classes = [], content = '') {
    const element = document.createElement(tag);
    if (classes.length > 0) {
        element.classList.add(...classes);
    }
    if (content) {
        element.innerHTML = content;
    }
    return element;
}

// Wait for Animation End
function waitForAnimation(element, animationName) {
    return new Promise((resolve) => {
        element.addEventListener('animationend', function handler(e) {
            if (e.animationName === animationName) {
                element.removeEventListener('animationend', handler);
                resolve();
            }
        });
    });
}

// Intersection Observer for Animations
function observeElements(selector, callback, options = {}) {
    const elements = $$(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, ...options });

    elements.forEach(el => observer.observe(el));
}

// Generate Unique ID
function generateId() {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Format Date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Clamp Number
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Random Number in Range
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Array Shuffle
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
