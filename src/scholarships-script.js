// Scholarships Data
const scholarships = [
    {
        name: 'Fulbright Foreign Student Program',
        country: 'USA',
        amount: 'Full funding',
        level: 'Masters/PhD',
        type: 'Merit-based',
        deadline: 'October 2025',
        coverage: ['Tuition', 'Living expenses', 'Health insurance', 'Airfare'],
        eligibility: ['Outstanding academic record', 'Leadership potential', 'English proficiency', 'Bachelor\'s degree'],
        description: 'Prestigious scholarship for international students to pursue graduate studies in the USA.'
    },
    {
        name: 'Chevening Scholarships',
        country: 'UK',
        amount: 'Full funding',
        level: 'Masters',
        type: 'Merit-based',
        deadline: 'November 2025',
        coverage: ['Tuition fees', 'Monthly stipend', 'Travel costs', 'Visa fees'],
        eligibility: ['2+ years work experience', 'Strong academic background', 'Leadership qualities', 'Return to home country'],
        description: 'UK government scholarship for future leaders and influencers.'
    },
    {
        name: 'DAAD Scholarships',
        country: 'Germany',
        amount: '€850 - €1,200/month',
        level: 'Masters/PhD',
        type: 'Merit-based',
        deadline: 'Various deadlines',
        coverage: ['Monthly stipend', 'Health insurance', 'Travel allowance', 'German course'],
        eligibility: ['Bachelor\'s degree', 'Good academic performance', 'German or English proficiency', 'Research proposal for PhD'],
        description: 'Comprehensive scholarship program by German Academic Exchange Service.'
    },
    {
        name: 'Australia Awards Scholarships',
        country: 'Australia',
        amount: 'Full funding',
        level: 'Masters/PhD',
        type: 'Merit-based',
        deadline: 'April 2025',
        coverage: ['Full tuition', 'Living allowance', 'Health cover', 'Return airfare'],
        eligibility: ['From eligible countries', 'Minimum 2 years work experience', 'Academic excellence', 'Development goals'],
        description: 'Australian government scholarships for students from developing countries.'
    },
    {
        name: 'Vanier Canada Graduate Scholarships',
        country: 'Canada',
        amount: 'CAD $50,000/year for 3 years',
        level: 'PhD',
        type: 'Merit-based',
        deadline: 'November 2025',
        coverage: ['Doctoral research funding', 'No tuition coverage'],
        eligibility: ['Nominated by Canadian institution', 'Outstanding research potential', 'Leadership skills', 'PhD program'],
        description: 'Prestigious doctoral scholarship to attract top-tier students to Canada.'
    },
    {
        name: 'Erasmus Mundus Joint Masters',
        country: 'Europe (Multiple)',
        amount: '€1,400/month + tuition',
        level: 'Masters',
        type: 'Merit-based',
        deadline: 'January 2025',
        coverage: ['Tuition fees', 'Monthly allowance', 'Travel costs', 'Installation costs'],
        eligibility: ['Bachelor\'s degree', 'Academic excellence', 'Study in multiple EU countries', 'Language requirements'],
        description: 'Study a joint master\'s program across multiple European universities.'
    }
];

// State
let savedScholarships = [];
let filters = {
    country: '',
    level: '',
    type: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderScholarships();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    const countryFilter = document.getElementById('countryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const typeFilter = document.getElementById('typeFilter');

    countryFilter.addEventListener('change', (e) => {
        filters.country = e.target.value;
        renderScholarships();
    });

    levelFilter.addEventListener('change', (e) => {
        filters.level = e.target.value;
        renderScholarships();
    });

    typeFilter.addEventListener('change', (e) => {
        filters.type = e.target.value;
        renderScholarships();
    });
}

// Filter Scholarships
function getFilteredScholarships() {
    return scholarships.filter(scholarship => {
        if (filters.country && scholarship.country !== filters.country) return false;
        if (filters.level && scholarship.level !== filters.level) return false;
        if (filters.type && scholarship.type !== filters.type) return false;
        return true;
    });
}

// Render Scholarships
function renderScholarships() {
    const grid = document.getElementById('scholarshipsGrid');
    const filtered = getFilteredScholarships();

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg class="icon" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No scholarships found</h3>
                <p>Try adjusting your filters to see more results</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(scholarship => {
        const isSaved = savedScholarships.includes(scholarship.name);
        return `
            <div class="scholarship-card">
                <div class="deadline-badge">
                    <svg class="icon icon-sm" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    ${scholarship.deadline}
                </div>

                <div class="scholarship-header">
                    <h3 class="scholarship-title">${scholarship.name}</h3>
                    <div class="scholarship-meta">
                        <div class="meta-badge highlight">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            ${scholarship.amount}
                        </div>
                        <div class="meta-badge">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            ${scholarship.country}
                        </div>
                        <div class="meta-badge">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                            </svg>
                            ${scholarship.level}
                        </div>
                        <div class="meta-badge">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <polyline points="17 11 19 13 23 9"></polyline>
                            </svg>
                            ${scholarship.type}
                        </div>
                    </div>
                </div>

                <p class="scholarship-description">${scholarship.description}</p>

                <div class="scholarship-details">
                    <div class="details-section">
                        <div class="details-label">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            Coverage
                        </div>
                        <ul class="details-list">
                            ${scholarship.coverage.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="details-section">
                        <div class="details-label">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <polyline points="17 11 19 13 23 9"></polyline>
                            </svg>
                            Eligibility
                        </div>
                        <ul class="details-list eligibility-list">
                            ${scholarship.eligibility.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="scholarship-actions">
                    <button class="btn-save-scholarship ${isSaved ? 'saved' : ''}" onclick="toggleSaveScholarship('${scholarship.name}')">
                        <svg class="icon icon-sm" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        ${isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button class="btn-apply" onclick="applyScholarship('${scholarship.name}')">
                        Apply Now
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle Save
function toggleSaveScholarship(scholarshipName) {
    const index = savedScholarships.indexOf(scholarshipName);
    if (index > -1) {
        savedScholarships.splice(index, 1);
    } else {
        savedScholarships.push(scholarshipName);
    }
    renderScholarships();
}

// Apply
function applyScholarship(scholarshipName) {
    alert(`Application process for ${scholarshipName} would be initiated here. In a full application, this would redirect to the scholarship's official website or open an application form.`);
}