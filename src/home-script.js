// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Navigation Links - Desktop
const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const section = link.getAttribute('data-section');
        navigateToSection(section);
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Navigation Links - Mobile
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        const section = link.getAttribute('data-section');
        navigateToSection(section);
        
        // Update active state
        mobileNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu
        mobileNav.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    });
});

// Feature Cards Navigation
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const action = card.getAttribute('data-action');
        navigateToSection(action);
    });
});

// Navigation Function
function navigateToSection(section) {
    const pageMap = {
        'home': 'home.html',
        'preparation': 'preparation-tips.html',
        'tests': 'test-prep.html',
        'universities': 'universities.html',
        'scholarships': 'scholarships.html',
        'visa': 'visa-guide.html',
        'jobs': 'job-prospects.html'
    };
    
    if (pageMap[section]) {
        window.location.href = pageMap[section];
    }
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Counter Animation for Stats
function animateCounter(element, target, suffix = '') {
    const duration = 2000; // 2 seconds
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

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-target'));
                let suffix = '+';
                
                // Special handling for the last stat (24/7 Support)
                if (index === statValues.length - 1) {
                    suffix = '/7';
                } else {
                    suffix = '+';
                }
                
                setTimeout(() => {
                    animateCounter(stat, target, suffix);
                }, index * 100);
            });
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

// Observe the stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effects to feature cards
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img');
    if (heroImg && scrolled < 500) {
        heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active nav indicator on scroll
window.addEventListener('scroll', () => {
    const sections = {
        'home': 0,
        'features': document.querySelector('.features-section')?.offsetTop || 500,
        'stats': document.querySelector('.stats-section')?.offsetTop || 1000,
    };
    
    const scrollPosition = window.pageYOffset + 100;
    
    if (scrollPosition < sections.features) {
        updateActiveNav('home');
    }
});

function updateActiveNav(section) {
    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    mobileNavLinks.forEach(link => {
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButton = document.querySelector('.btn-get-started');
    
    setTimeout(() => {
        if (heroTitle) heroTitle.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        if (heroDescription) heroDescription.style.opacity = '1';
    }, 300);
    
    setTimeout(() => {
        if (heroButton) heroButton.style.opacity = '1';
    }, 500);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            mobileNav.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    }, 250);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Console welcome message
console.log('%c🎓 Study Abroad Portal', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cWelcome to your comprehensive study abroad guide!', 'font-size: 14px; color: #4b5563;');