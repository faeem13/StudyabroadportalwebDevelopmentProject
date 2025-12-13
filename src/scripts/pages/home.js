// Home Page - Matching React Hero Component Exactly

function loadHomePage() {
    const mainContent = $('#mainContent');
    
    mainContent.innerHTML = `
        <div class="bg-white">
            <!-- Hero Section -->
            <div class="hero-section">
                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwYWJyb2FkJTIwY2FtcHVzfGVufDF8fHx8MTc2NDMyNzc3OHww&ixlib=rb-4.1.0&q=80&w=1080" alt="Students studying abroad">
                </div>
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <div class="hero-text">
                        <h1 class="animate-fadeInUp" style="animation-delay: 0s;">Your Journey to Study Abroad Starts Here</h1>
                        <p class="animate-fadeInUp" style="animation-delay: 0.2s;">Complete guidance for international education - from test prep to landing your dream job</p>
                        <button class="hero-button animate-fadeInUp hover-scale" style="animation-delay: 0.4s;" onclick="navigateTo('preparation')">
                            Get Started
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Features Grid -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div class="text-center mb-12 animate-fadeInUp">
                    <h2 class="text-3xl text-gray-900 mb-4">Everything You Need in One Place</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        From preparation to placement, we guide you through every step of your study abroad journey
                    </p>
                </div>

                ${renderFeatureCategoriesWithCards()}
            </div>

            <!-- Stats Section -->
            <div class="stats-section">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-item animate-scaleIn delay-100">
                            <div class="stat-value counter" data-target="150">0</div>
                            <div class="stat-label">Countries Covered</div>
                        </div>
                        <div class="stat-item animate-scaleIn delay-200">
                            <div class="stat-value counter" data-target="5000">0</div>
                            <div class="stat-label">Universities</div>
                        </div>
                        <div class="stat-item animate-scaleIn delay-300">
                            <div class="stat-value counter" data-target="10000">0</div>
                            <div class="stat-label">Scholarships</div>
                        </div>
                        <div class="stat-item animate-scaleIn delay-400">
                            <div class="stat-value">24/7</div>
                            <div class="stat-label">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize counter animations
    initCounterAnimations();
}

function renderFeatureCategoriesWithCards() {
    const categories = [
        {
            title: 'Test Preparation',
            description: 'Master standardized tests with comprehensive preparation resources',
            color: 'gradient-blue-cyan',
            features: [
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>`,
                    title: 'IELTS Preparation',
                    description: 'Complete guide for IELTS exam preparation and practice',
                    action: 'tests',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>`,
                    title: 'TOEFL Preparation',
                    description: 'Comprehensive TOEFL study materials and mock tests',
                    action: 'tests',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>`,
                    title: 'GRE Preparation',
                    description: 'Expert guidance for GRE quantitative and verbal sections',
                    action: 'tests',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>`,
                    title: 'Other Tests',
                    description: 'SAT, GMAT, PTE and other standardized test prep',
                    action: 'tests',
                },
            ],
        },
        {
            title: 'University Selection & Admissions',
            description: 'Find and apply to universities that match your profile',
            color: 'gradient-purple-pink',
            features: [
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>`,
                    title: 'University Matching',
                    description: 'Find the perfect university based on your profile',
                    action: 'universities',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>`,
                    title: 'Application Guide',
                    description: 'Step-by-step application process and requirements',
                    action: 'universities',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path>
                        <polyline points="22 4 12 14.01 9 11.01\"></polyline>
                    </svg>`,
                    title: 'Requirements Check',
                    description: 'Verify eligibility and admission requirements',
                    action: 'universities',
                },
            ],
        },
        {
            title: 'Scholarships & Financial Aid',
            description: 'Discover funding opportunities to support your education',
            color: 'gradient-yellow-orange',
            features: [
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>`,
                    title: 'Scholarship Search',
                    description: 'Browse thousands of scholarships worldwide',
                    action: 'scholarships',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="16 12 12 8 8 12"></polyline>
                        <line x1="12" y1="16" x2="12" y2="8"></line>
                    </svg>`,
                    title: 'Application Tips',
                    description: 'Expert advice on scholarship applications',
                    action: 'scholarships',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>`,
                    title: 'Financial Planning',
                    description: 'Budget your expenses and plan finances',
                    action: 'scholarships',
                },
            ],
        },
        {
            title: 'Career & Job Prospects',
            description: 'Explore career opportunities in your destination country',
            color: 'gradient-green-emerald',
            features: [
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>`,
                    title: 'Job Market Analysis',
                    description: 'Employment trends and salary insights by country',
                    action: 'jobs',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <polyline points="17 11 19 13 23 9"></polyline>
                    </svg>`,
                    title: 'Work Permits',
                    description: 'Post-study work visa and permit information',
                    action: 'jobs',
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>`,
                    title: 'Career Growth',
                    description: 'Long-term career prospects and opportunities',
                    action: 'jobs',
                },
            ],
        },
    ];
    
    let animationIndex = 0;
    
    return categories.map((category, categoryIndex) => `
        <div class="mb-16 animate-fadeInUp" style="animation-delay: ${categoryIndex * 0.2}s;">
            <div class="mb-8">
                <h3 class="text-2xl text-gray-900 mb-2">${category.title}</h3>
                <p class="text-gray-600">${category.description}</p>
            </div>
            <div class="flex flex-col gap-6">
                ${category.features.map((feature, featureIndex) => {
                    const delay = animationIndex * 0.1;
                    animationIndex++;
                    return `
                        <div class="feature-card stagger-item animate-slideInUp" 
                             data-index="${featureIndex}" 
                             onclick="navigateTo('${feature.action}')"
                             style="animation-delay: ${delay}s;">
                            <div class="feature-overlay ${category.color}"></div>
                            <div style="position: relative; z-index: 1;">
                                <div class="feature-icon ${category.color}">
                                    ${feature.icon}
                                </div>
                                <h4 class="text-lg text-gray-900 mb-2">${feature.title}</h4>
                                <p class="text-gray-600 mb-4 text-sm">${feature.description}</p>
                                <span class="feature-explore">
                                    Explore 
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function initCounterAnimations() {
    // Use Intersection Observer for counter animation
    const counters = $$('.counter[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target, '+');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}