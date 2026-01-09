// Universities Data
const universities = [
    {
        name: 'Massachusetts Institute of Technology',
        country: 'USA',
        location: 'Cambridge, MA',
        ranking: 1,
        tuition: '$55,000 - $60,000/year',
        programs: ['Engineering', 'Computer Science', 'Business', 'Sciences'],
        acceptance: '7%',
        students: '11,500+',
        highlights: ['World-class research facilities', 'Strong industry connections', 'Innovation hub']
    },
    {
        name: 'University of Oxford',
        country: 'UK',
        location: 'Oxford, England',
        ranking: 2,
        tuition: '£25,000 - £40,000/year',
        programs: ['Humanities', 'Medicine', 'Sciences', 'Law'],
        acceptance: '17%',
        students: '24,000+',
        highlights: ['Historic institution', 'Tutorial system', 'Extensive library resources']
    },
    {
        name: 'Stanford University',
        country: 'USA',
        location: 'Stanford, CA',
        ranking: 3,
        tuition: '$56,000 - $62,000/year',
        programs: ['Engineering', 'Business', 'Medicine', 'Computer Science'],
        acceptance: '4%',
        students: '17,000+',
        highlights: ['Silicon Valley location', 'Entrepreneurship culture', 'Top faculty']
    },
    {
        name: 'University of Toronto',
        country: 'Canada',
        location: 'Toronto, ON',
        ranking: 21,
        tuition: 'CAD $45,000 - $55,000/year',
        programs: ['Engineering', 'Business', 'Medicine', 'Computer Science'],
        acceptance: '43%',
        students: '90,000+',
        highlights: ['Diverse student body', 'Research-intensive', 'Urban campus']
    },
    {
        name: 'National University of Singapore',
        country: 'Singapore',
        location: 'Singapore',
        ranking: 11,
        tuition: 'SGD $30,000 - $40,000/year',
        programs: ['Engineering', 'Business', 'Computer Science', 'Sciences'],
        acceptance: '5%',
        students: '40,000+',
        highlights: ['Asian hub', 'Strong employment outcomes', 'Modern facilities']
    },
    {
        name: 'University of Melbourne',
        country: 'Australia',
        location: 'Melbourne, VIC',
        ranking: 14,
        tuition: 'AUD $35,000 - $50,000/year',
        programs: ['Medicine', 'Engineering', 'Law', 'Business'],
        acceptance: '70%',
        students: '50,000+',
        highlights: ['Graduate employability', 'Quality of life', 'Research excellence']
    }
];

// State
let savedUniversities = [];
let filters = {
    country: '',
    field: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderUniversities();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    const countryFilter = document.getElementById('countryFilter');
    const fieldFilter = document.getElementById('fieldFilter');
    const clearFilters = document.getElementById('clearFilters');

    countryFilter.addEventListener('change', (e) => {
        filters.country = e.target.value;
        renderUniversities();
    });

    fieldFilter.addEventListener('change', (e) => {
        filters.field = e.target.value;
        renderUniversities();
    });

    clearFilters.addEventListener('click', () => {
        filters.country = '';
        filters.field = '';
        countryFilter.value = '';
        fieldFilter.value = '';
        renderUniversities();
    });
}

// Filter Universities
function getFilteredUniversities() {
    return universities.filter(uni => {
        if (filters.country && uni.country !== filters.country) return false;
        if (filters.field && !uni.programs.includes(filters.field)) return false;
        return true;
    });
}

// Render Universities
function renderUniversities() {
    const grid = document.getElementById('universitiesGrid');
    const filtered = getFilteredUniversities();

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <svg class="icon" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No universities found</h3>
                <p>Try adjusting your filters to see more results</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(uni => {
        const isSaved = savedUniversities.includes(uni.name);
        return `
            <div class="uni-card">
                <div class="uni-header">
                    <div class="uni-rank">#${uni.ranking}</div>
                    <div class="uni-info">
                        <h3 class="uni-name">${uni.name}</h3>
                        <div class="uni-location">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${uni.location}</span>
                        </div>
                    </div>
                </div>

                <div class="uni-details">
                    <div class="detail-item">
                        <span class="detail-label">Tuition</span>
                        <span class="detail-value">${uni.tuition}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Acceptance Rate</span>
                        <span class="detail-value">${uni.acceptance}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Students</span>
                        <span class="detail-value">${uni.students}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Country</span>
                        <span class="detail-value">${uni.country}</span>
                    </div>
                </div>

                <div class="uni-programs">
                    <div class="uni-programs-label">Programs</div>
                    <div class="programs-tags">
                        ${uni.programs.map(prog => `
                            <span class="program-tag">${prog}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="uni-highlights">
                    <div class="highlights-label">Key Highlights</div>
                    <ul class="highlights-list">
                        ${uni.highlights.map(highlight => `
                            <li>${highlight}</li>
                        `).join('')}
                    </ul>
                </div>

                <div class="uni-actions">
                    <button class="btn-save ${isSaved ? 'saved' : ''}" onclick="toggleSave('${uni.name}')">
                        <svg class="icon icon-sm" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        ${isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button class="btn-learn-more" onclick="learnMore('${uni.name}')">
                        Learn More
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle Save
function toggleSave(uniName) {
    const index = savedUniversities.indexOf(uniName);
    if (index > -1) {
        savedUniversities.splice(index, 1);
    } else {
        savedUniversities.push(uniName);
    }
    renderUniversities();
}

// Learn More
function learnMore(uniName) {
    alert(`More information about ${uniName} would be displayed here. In a full application, this would open a detailed page or modal.`);
}
