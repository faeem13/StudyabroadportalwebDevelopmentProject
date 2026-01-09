// Job Prospects Data
const countries = [
    {
        name: 'United States',
        flag: '🇺🇸',
        workPermit: 'OPT (1 year) + STEM Extension (2 years)',
        averageSalary: '$60,000 - $120,000',
        topIndustries: ['Technology', 'Healthcare', 'Finance', 'Engineering'],
        jobMarket: 'Strong',
        prospects: [
            'Optional Practical Training allows 12 months of work',
            'STEM graduates can extend to 3 years total',
            'H1-B visa pathway for long-term employment',
            'Competitive salaries across industries',
            'Strong startup ecosystem'
        ],
        challenges: [
            'H1-B visa lottery system is competitive',
            'Work authorization tied to employer',
            'High cost of living in major cities'
        ]
    },
    {
        name: 'United Kingdom',
        flag: '🇬🇧',
        workPermit: 'Graduate Route (2-3 years)',
        averageSalary: '£25,000 - £50,000',
        topIndustries: ['Finance', 'Technology', 'Consulting', 'Healthcare'],
        jobMarket: 'Good',
        prospects: [
            'Graduate visa allows 2 years of work (3 for PhD)',
            'No sponsorship needed for initial 2 years',
            'Strong financial services sector',
            'Path to Skilled Worker visa',
            'Access to European markets'
        ],
        challenges: [
            'Brexit impact on EU market access',
            'Skilled Worker visa requires sponsorship',
            'Minimum salary requirements for visa'
        ]
    },
    {
        name: 'Canada',
        flag: '🇨🇦',
        workPermit: 'PGWP (up to 3 years)',
        averageSalary: 'CAD $45,000 - $85,000',
        topIndustries: ['Technology', 'Healthcare', 'Engineering', 'Natural Resources'],
        jobMarket: 'Excellent',
        prospects: [
            'Post-Graduation Work Permit up to 3 years',
            'Clear pathway to permanent residence',
            'Express Entry system favors graduates',
            'Growing tech sector (especially Toronto, Vancouver)',
            'Provincial Nominee Programs available'
        ],
        challenges: [
            'Cold climate in many regions',
            'Competition in major cities',
            'Some industries require Canadian credentials'
        ]
    },
    {
        name: 'Australia',
        flag: '🇦🇺',
        workPermit: 'Temporary Graduate Visa (2-4 years)',
        averageSalary: 'AUD $60,000 - $95,000',
        topIndustries: ['Mining', 'Healthcare', 'Technology', 'Construction'],
        jobMarket: 'Strong',
        prospects: [
            'Temporary Graduate visa for 2-4 years',
            'Points-based system for permanent residence',
            'Strong demand in healthcare and engineering',
            'High minimum wage and good work-life balance',
            'Regional opportunities with extra benefits'
        ],
        challenges: [
            'Geographic isolation from other markets',
            'High cost of living in major cities',
            'Skills assessment required for PR'
        ]
    },
    {
        name: 'Germany',
        flag: '🇩🇪',
        workPermit: 'Job Search Visa (18 months)',
        averageSalary: '€45,000 - €70,000',
        topIndustries: ['Engineering', 'Automotive', 'Technology', 'Manufacturing'],
        jobMarket: 'Good',
        prospects: [
            '18-month job search visa after graduation',
            'EU Blue Card for highly skilled workers',
            'Strong engineering and manufacturing sector',
            'No tuition fees at public universities',
            'Path to permanent residence after 4 years'
        ],
        challenges: [
            'German language often required for work',
            'Bureaucratic processes can be complex',
            'Cultural adjustment for non-EU students'
        ]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderJobs();
});

// Get Market Badge Class
function getMarketBadgeClass(market) {
    const classMap = {
        'Excellent': 'excellent',
        'Strong': 'strong',
        'Good': 'good'
    };
    return classMap[market] || 'good';
}

// Render Jobs
function renderJobs() {
    const grid = document.getElementById('jobsGrid');
    
    grid.innerHTML = countries.map((country, index) => `
        <div class="job-card" style="animation-delay: ${index * 0.1}s;">
            <div class="job-header">
                <div class="country-flag">${country.flag}</div>
                <div class="job-title-group">
                    <h2 class="job-country">${country.name}</h2>
                    <span class="job-market-badge ${getMarketBadgeClass(country.jobMarket)}">
                        ${country.jobMarket} Job Market
                    </span>
                </div>
            </div>

            <div class="job-stats">
                <div class="stat-item">
                    <div class="stat-label">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        Work Permit
                    </div>
                    <div class="stat-value">${country.workPermit}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        Average Salary
                    </div>
                    <div class="stat-value">${country.averageSalary}</div>
                </div>
            </div>

            <div class="industries-section">
                <div class="section-label">Top Industries</div>
                <div class="industries-tags">
                    ${country.topIndustries.map(industry => `
                        <span class="industry-tag">${industry}</span>
                    `).join('')}
                </div>
            </div>

            <div class="prospects-section">
                <div class="section-label">Career Prospects</div>
                <ul class="prospects-list">
                    ${country.prospects.map(prospect => `
                        <li>${prospect}</li>
                    `).join('')}
                </ul>
            </div>

            <div class="challenges-section">
                <div class="section-label">Challenges to Consider</div>
                <ul class="challenges-list">
                    ${country.challenges.map(challenge => `
                        <li>${challenge}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}
