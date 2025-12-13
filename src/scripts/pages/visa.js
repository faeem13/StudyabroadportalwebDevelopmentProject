// Visa Guide Page

function loadVisaPage() {
    const mainContent = $('#mainContent');
    
    mainContent.innerHTML = `
        <div class="bg-gray-50 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h1 class="text-4xl text-gray-900 mb-4">Visa Guide</h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Complete information about student visa requirements for different countries
                    </p>
                </div>

                <!-- Country Selector -->
                <div class="card mb-8">
                    <h2 class="text-2xl text-gray-900 mb-4">Select Your Destination</h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        ${renderCountryButtons()}
                    </div>
                </div>

                <!-- Visa Information -->
                <div id="visaInfo">
                    ${renderVisaInfo('USA')}
                </div>
            </div>
        </div>
    `;
}

function renderCountryButtons() {
    const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'New Zealand'];
    
    return countries.map(country => `
        <button class="visa-country-btn p-4 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all ${country === 'USA' ? 'border-blue-600 bg-blue-50' : ''}" 
                onclick="showVisaInfo('${country}')">
            ${country}
        </button>
    `).join('');
}

function showVisaInfo(country) {
    // Update active button
    $$('.visa-country-btn').forEach(btn => {
        if (btn.textContent.trim() === country) {
            btn.classList.add('border-blue-600', 'bg-blue-50');
        } else {
            btn.classList.remove('border-blue-600', 'bg-blue-50');
        }
    });
    
    const visaInfo = $('#visaInfo');
    visaInfo.innerHTML = renderVisaInfo(country);
}

function renderVisaInfo(country) {
    const visaData = {
        USA: {
            visaType: 'F-1 Student Visa',
            processingTime: '3-5 weeks',
            fee: '$185 (SEVIS) + $160 (Visa)',
            requirements: [
                'Valid passport',
                'Form I-20 from university',
                'Proof of financial support',
                'Academic transcripts',
                'English proficiency test scores',
                'Visa interview appointment'
            ],
            steps: [
                'Receive Form I-20 from university',
                'Pay SEVIS fee online',
                'Complete DS-160 form',
                'Schedule visa interview',
                'Attend interview with documents',
                'Wait for visa approval'
            ],
        },
        UK: {
            visaType: 'Student Visa (Tier 4)',
            processingTime: '3 weeks',
            fee: '£363',
            requirements: [
                'CAS (Confirmation of Acceptance for Studies)',
                'Valid passport',
                'Proof of funds',
                'English language proficiency',
                'Tuberculosis test certificate',
                'Academic qualifications'
            ],
            steps: [
                'Receive CAS from university',
                'Apply online for visa',
                'Book biometrics appointment',
                'Attend biometrics appointment',
                'Submit required documents',
                'Wait for decision'
            ],
        },
        Canada: {
            visaType: 'Study Permit',
            processingTime: '4-6 weeks',
            fee: 'CAD $150',
            requirements: [
                'Letter of acceptance from DLI',
                'Valid passport',
                'Proof of financial support',
                'Medical examination',
                'Police certificate',
                'Statement of purpose'
            ],
            steps: [
                'Get acceptance letter from DLI',
                'Gather required documents',
                'Apply online or at VAC',
                'Pay application fee',
                'Submit biometrics',
                'Wait for approval'
            ],
        },
        Australia: {
            visaType: 'Student Visa (Subclass 500)',
            processingTime: '4-6 weeks',
            fee: 'AUD $650',
            requirements: [
                'Confirmation of Enrolment (CoE)',
                'Valid passport',
                'Genuine Temporary Entrant statement',
                'Proof of financial capacity',
                'English proficiency',
                'Health insurance (OSHC)'
            ],
            steps: [
                'Receive CoE from university',
                'Purchase OSHC',
                'Create ImmiAccount',
                'Submit online application',
                'Provide biometrics if required',
                'Wait for visa grant'
            ],
        },
    };
    
    const info = visaData[country] || visaData.USA;
    
    return `
        <div class="animate-fadeIn">
            <div class="card mb-6">
                <h2 class="text-3xl text-gray-900 mb-6">${info.visaType}</h2>
                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <div class="text-3xl text-blue-600 mb-2">⏱️</div>
                        <div class="text-sm text-gray-600 mb-1">Processing Time</div>
                        <div class="text-lg text-gray-900">${info.processingTime}</div>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg">
                        <div class="text-3xl text-green-600 mb-2">💰</div>
                        <div class="text-sm text-gray-600 mb-1">Application Fee</div>
                        <div class="text-lg text-gray-900">${info.fee}</div>
                    </div>
                    <div class="text-center p-4 bg-purple-50 rounded-lg">
                        <div class="text-3xl text-purple-600 mb-2">📋</div>
                        <div class="text-sm text-gray-600 mb-1">Requirements</div>
                        <div class="text-lg text-gray-900">${info.requirements.length} items</div>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="card">
                    <h3 class="text-2xl text-gray-900 mb-4">Required Documents</h3>
                    <ul class="space-y-3">
                        ${info.requirements.map(req => `
                            <li class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span class="text-gray-700">${req}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="card">
                    <h3 class="text-2xl text-gray-900 mb-4">Application Steps</h3>
                    <div class="space-y-4">
                        ${info.steps.map((step, index) => `
                            <div class="flex gap-3">
                                <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                                    ${index + 1}
                                </div>
                                <div class="flex-1 pt-1">
                                    <p class="text-gray-700">${step}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="card mt-6 bg-yellow-50 border-l-4 border-yellow-500">
                <div class="flex gap-3">
                    <svg class="w-6 h-6 text-yellow-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <div>
                        <h4 class="text-lg text-gray-900 mb-2">Important Note</h4>
                        <p class="text-gray-700">Visa requirements and processing times may change. Always check the official immigration website for the most up-to-date information.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
