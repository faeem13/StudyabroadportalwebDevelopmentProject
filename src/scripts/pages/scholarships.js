// Scholarships Page

function loadScholarshipsPage() {
    const mainContent = $('#mainContent');
    
    mainContent.innerHTML = `
        <div class="bg-gray-50 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h1 class="text-4xl text-gray-900 mb-4">Scholarship Finder</h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover funding opportunities to make your study abroad dreams a reality
                    </p>
                </div>

                <!-- Filters -->
                <div class="card mb-8">
                    <h2 class="text-2xl text-gray-900 mb-4">Filter Scholarships</h2>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-gray-700 mb-2">Country</label>
                            <select id="scholarshipCountry" class="w-full px-4 py-2 border border-gray-300 rounded-lg" onchange="filterScholarships()">
                                <option value="">All Countries</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 mb-2">Level</label>
                            <select id="scholarshipLevel" class="w-full px-4 py-2 border border-gray-300 rounded-lg" onchange="filterScholarships()">
                                <option value="">All Levels</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Masters">Masters</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 mb-2">Amount</label>
                            <select id="scholarshipAmount" class="w-full px-4 py-2 border border-gray-300 rounded-lg" onchange="filterScholarships()">
                                <option value="">All Amounts</option>
                                <option value="full">Full Funding</option>
                                <option value="partial">Partial Funding</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Scholarship Grid -->
                <div id="scholarshipGrid" class="grid md:grid-cols-2 gap-6">
                    ${renderScholarships()}
                </div>
            </div>
        </div>
    `;
}

function getScholarships() {
    return [
        { name: 'Fulbright Foreign Student Program', country: 'USA', level: ['Masters', 'PhD'], amount: 'Full', value: '$50,000+', deadline: 'October 2025' },
        { name: 'Chevening Scholarships', country: 'UK', level: ['Masters'], amount: 'Full', value: '£30,000', deadline: 'November 2025' },
        { name: 'Gates Cambridge Scholarship', country: 'UK', level: ['Masters', 'PhD'], amount: 'Full', value: '£45,000+', deadline: 'December 2025' },
        { name: 'Vanier Canada Graduate Scholarship', country: 'Canada', level: ['PhD'], amount: 'Full', value: 'CAD $50,000/year', deadline: 'November 2025' },
        { name: 'Australia Awards Scholarships', country: 'Australia', level: ['Masters', 'PhD'], amount: 'Full', value: 'AUD $70,000+', deadline: 'April 2025' },
        { name: 'DAAD Scholarships', country: 'Germany', level: ['Masters', 'PhD'], amount: 'Full', value: '€934/month', deadline: 'November 2025' },
        { name: 'Erasmus Mundus', country: 'Europe', level: ['Masters'], amount: 'Full', value: '€25,000/year', deadline: 'January 2025' },
        { name: 'Rhodes Scholarship', country: 'UK', level: ['Masters', 'PhD'], amount: 'Full', value: '£18,000+', deadline: 'October 2025' },
    ];
}

function renderScholarships(filtered = null) {
    const scholarships = filtered || getScholarships();
    
    return scholarships.map((sch, index) => `
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow animate-fadeInUp" style="animation-delay: ${index * 0.05}s;">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl text-gray-900 flex-1">${sch.name}</h3>
                <span class="px-3 py-1 ${sch.amount === 'Full' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} rounded-full text-sm whitespace-nowrap ml-2">
                    ${sch.amount}
                </span>
            </div>
            <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${sch.country}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>Value: ${sch.value}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Deadline: ${sch.deadline}</span>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                ${sch.level.map(l => `
                    <span class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">${l}</span>
                `).join('')}
            </div>
            <button class="btn btn-primary w-full">Apply Now</button>
        </div>
    `).join('');
}

function filterScholarships() {
    const country = $('#scholarshipCountry').value;
    const level = $('#scholarshipLevel').value;
    const amount = $('#scholarshipAmount').value;
    
    let scholarships = getScholarships();
    
    if (country) {
        scholarships = scholarships.filter(s => s.country === country);
    }
    
    if (level) {
        scholarships = scholarships.filter(s => s.level.includes(level));
    }
    
    if (amount) {
        const amountFilter = amount === 'full' ? 'Full' : 'Partial';
        scholarships = scholarships.filter(s => s.amount === amountFilter);
    }
    
    const grid = $('#scholarshipGrid');
    grid.innerHTML = renderScholarships(scholarships);
}
