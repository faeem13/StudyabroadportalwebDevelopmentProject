// Visa Guide Data
const countries = [
    {
        name: 'United States',
        visaType: 'F-1 Student Visa',
        processingTime: '3-5 weeks',
        cost: '$185 (SEVIS fee: $350)',
        documents: [
            'Valid passport',
            'Form I-20 from university',
            'DS-160 confirmation page',
            'SEVIS fee payment receipt',
            'Visa application fee receipt',
            'Passport-sized photographs',
            'Academic transcripts',
            'Financial documents',
            'Test scores (TOEFL/IELTS)'
        ],
        process: [
            'Receive I-20 from university',
            'Pay SEVIS fee online',
            'Complete DS-160 form online',
            'Pay visa application fee',
            'Schedule visa interview',
            'Attend interview at embassy',
            'Wait for visa processing'
        ],
        tips: [
            'Schedule interview early as slots fill quickly',
            'Demonstrate strong ties to home country',
            'Show proof of sufficient funding',
            'Be prepared to explain your study plans'
        ]
    },
    {
        name: 'United Kingdom',
        visaType: 'Student Visa (Tier 4)',
        processingTime: '3 weeks',
        cost: '£363 + healthcare surcharge',
        documents: [
            'Current passport',
            'CAS from university',
            'Proof of English proficiency',
            'Financial evidence (28 days)',
            'TB test certificate',
            'Academic qualifications',
            'Passport photographs',
            'Visa application form'
        ],
        process: [
            'Receive CAS from university',
            'Complete online application',
            'Pay visa fee and healthcare surcharge',
            'Book biometrics appointment',
            'Attend biometrics appointment',
            'Submit documents',
            'Wait for decision'
        ],
        tips: [
            'Ensure funds have been in account for 28 days',
            'Get TB test done at approved clinic',
            'Apply no earlier than 6 months before course',
            'Keep all original documents ready'
        ]
    },
    {
        name: 'Canada',
        visaType: 'Study Permit',
        processingTime: '4-6 weeks (online)',
        cost: 'CAD $150',
        documents: [
            'Valid passport',
            'Letter of acceptance',
            'Proof of financial support',
            'Statement of purpose',
            'Police certificates',
            'Medical exam (if required)',
            'Passport photos',
            'Academic documents'
        ],
        process: [
            'Receive acceptance letter',
            'Create online account',
            'Complete application form',
            'Upload required documents',
            'Pay application fee',
            'Submit biometrics (if required)',
            'Medical exam (if required)',
            'Wait for decision'
        ],
        tips: [
            'Apply online for faster processing',
            'Get police certificates from all countries lived in',
            'Show strong ties to home country',
            'Provide detailed study plan'
        ]
    },
    {
        name: 'Australia',
        visaType: 'Student Visa (Subclass 500)',
        processingTime: '4-6 weeks',
        cost: 'AUD $620',
        documents: [
            'Valid passport',
            'CoE from institution',
            'Genuine Temporary Entrant statement',
            'English proficiency proof',
            'Financial capacity evidence',
            'Health insurance (OSHC)',
            'Health examination',
            'Character documents'
        ],
        process: [
            'Receive CoE from university',
            'Arrange health insurance',
            'Complete online application',
            'Upload required documents',
            'Pay visa application fee',
            'Complete health examination',
            'Provide biometrics',
            'Wait for decision'
        ],
        tips: [
            'Purchase OSHC before applying',
            'Write a strong GTE statement',
            'Show adequate financial capacity',
            'Apply at least 6 weeks before course starts'
        ]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCountries();
});

// Render Countries
function renderCountries() {
    const section = document.getElementById('countriesSection');
    
    section.innerHTML = countries.map((country, index) => `
        <div class="country-card ${index === 0 ? 'expanded' : ''}" data-country="${index}">
            <div class="country-header" onclick="toggleCountry(${index})">
                <div class="country-title-group">
                    <h2 class="country-title">${country.name}</h2>
                    <svg class="icon chevron" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="country-meta">
                    <div class="meta-info">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        <span>${country.visaType}</span>
                    </div>
                    <div class="meta-info">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>${country.processingTime}</span>
                    </div>
                    <div class="meta-info">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <span>${country.cost}</span>
                    </div>
                </div>
            </div>

            <div class="country-content">
                <div class="visa-info-grid">
                    <!-- Required Documents -->
                    <div class="info-section">
                        <h3 class="section-title">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                            Required Documents
                        </h3>
                        <ul class="documents-list">
                            ${country.documents.map(doc => `
                                <li>
                                    <svg class="icon icon-sm check-icon" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <span>${doc}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Application Process -->
                    <div class="info-section">
                        <h3 class="section-title">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                            Application Process
                        </h3>
                        <ul class="process-list">
                            ${country.process.map((step, idx) => `
                                <li>
                                    <div class="step-number">${idx + 1}</div>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <!-- Tips -->
                <div class="info-section" style="margin-top: 2rem;">
                    <h3 class="section-title">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        Important Tips
                    </h3>
                    <ul class="tips-list">
                        ${country.tips.map(tip => `
                            <li>
                                <svg class="icon icon-sm tip-icon" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span>${tip}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle Country
function toggleCountry(index) {
    const cards = document.querySelectorAll('.country-card');
    const clickedCard = cards[index];
    const isExpanded = clickedCard.classList.contains('expanded');
    
    // Close all cards
    cards.forEach(card => card.classList.remove('expanded'));
    
    // Toggle clicked card
    if (!isExpanded) {
        clickedCard.classList.add('expanded');
    }
}
