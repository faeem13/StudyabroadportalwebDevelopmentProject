// Job Prospects Page

function loadJobsPage() {
    const mainContent = $('#mainContent');
    
    mainContent.innerHTML = `
        <div class="bg-gray-50 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h1 class="text-4xl text-gray-900 mb-4">Job Prospects & Salaries</h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore career opportunities and salary expectations for graduates in different countries
                    </p>
                </div>

                <!-- Salary Calculator -->
                <div class="card mb-12">
                    <h2 class="text-3xl text-gray-900 mb-6">Salary Calculator</h2>
                    ${renderSalaryCalculator()}
                </div>

                <!-- Country Job Markets -->
                <div class="mb-12">
                    <h2 class="text-3xl text-gray-900 mb-6">Job Markets by Country</h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        ${renderCountryJobMarkets()}
                    </div>
                </div>

                <!-- Top Industries -->
                <div class="card">
                    <h2 class="text-3xl text-gray-900 mb-6">Top Industries for International Graduates</h2>
                    ${renderTopIndustries()}
                </div>
            </div>
        </div>
    `;
}

function renderSalaryCalculator() {
    return `
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-2">Country</label>
                    <select id="salaryCountry" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Field</label>
                    <select id="salaryField" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="software">Software Engineering</option>
                        <option value="data">Data Science</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Experience Level</label>
                    <select id="salaryExperience" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="entry">Entry Level (0-2 years)</option>
                        <option value="mid">Mid Level (3-5 years)</option>
                        <option value="senior">Senior Level (5+ years)</option>
                    </select>
                </div>
                <button class="btn btn-primary w-full" onclick="calculateSalary()">Calculate Expected Salary</button>
            </div>
            <div id="salaryResult" class="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-lg text-white">
                <h3 class="text-2xl mb-4">Expected Salary Range</h3>
                <p class="text-blue-100">Select your preferences and click calculate to see estimated salaries</p>
            </div>
        </div>
    `;
}

function calculateSalary() {
    const country = $('#salaryCountry').value;
    const field = $('#salaryField').value;
    const experience = $('#salaryExperience').value;
    
    const salaryData = {
        USA: {
            software: { entry: [70000, 95000], mid: [100000, 140000], senior: [140000, 200000] },
            data: { entry: [75000, 100000], mid: [105000, 145000], senior: [145000, 210000] },
            finance: { entry: [65000, 85000], mid: [95000, 130000], senior: [130000, 180000] },
            healthcare: { entry: [60000, 80000], mid: [85000, 120000], senior: [120000, 170000] },
            marketing: { entry: [50000, 70000], mid: [75000, 105000], senior: [105000, 150000] },
        },
        UK: {
            software: { entry: [30000, 45000], mid: [50000, 70000], senior: [70000, 100000] },
            data: { entry: [32000, 48000], mid: [52000, 73000], senior: [73000, 105000] },
            finance: { entry: [28000, 42000], mid: [48000, 67000], senior: [67000, 95000] },
            healthcare: { entry: [26000, 38000], mid: [42000, 58000], senior: [58000, 82000] },
            marketing: { entry: [24000, 35000], mid: [38000, 53000], senior: [53000, 75000] },
        },
        Canada: {
            software: { entry: [55000, 75000], mid: [80000, 110000], senior: [110000, 155000] },
            data: { entry: [58000, 78000], mid: [83000, 115000], senior: [115000, 162000] },
            finance: { entry: [50000, 68000], mid: [73000, 100000], senior: [100000, 142000] },
            healthcare: { entry: [47000, 63000], mid: [68000, 93000], senior: [93000, 132000] },
            marketing: { entry: [42000, 57000], mid: [60000, 83000], senior: [83000, 117000] },
        },
    };
    
    const data = salaryData[country]?.[field]?.[experience] || [50000, 80000];
    const [min, max] = data;
    const avg = Math.floor((min + max) / 2);
    
    const currency = country === 'USA' ? '$' : country === 'UK' ? '£' : country === 'Canada' ? 'CAD $' : '$';
    
    const resultDiv = $('#salaryResult');
    resultDiv.innerHTML = `
        <div class="animate-fadeIn">
            <h3 class="text-2xl mb-6">Expected Salary Range</h3>
            <div class="text-center mb-6">
                <div class="text-5xl mb-2">${currency}${avg.toLocaleString()}</div>
                <div class="text-xl text-blue-100">Average Annual Salary</div>
            </div>
            <div class="space-y-3">
                <div class="flex justify-between p-3 bg-white bg-opacity-20 rounded">
                    <span>Minimum:</span>
                    <span>${currency}${min.toLocaleString()}</span>
                </div>
                <div class="flex justify-between p-3 bg-white bg-opacity-20 rounded">
                    <span>Maximum:</span>
                    <span>${currency}${max.toLocaleString()}</span>
                </div>
            </div>
            <p class="text-sm text-blue-100 mt-4">*Salaries vary based on location, company size, and specific skills</p>
        </div>
    `;
}

function renderCountryJobMarkets() {
    const markets = [
        {
            country: 'USA',
            icon: '🇺🇸',
            highlights: [
                'Tech hub with Silicon Valley',
                'High salaries in major cities',
                'OPT/H1B visa opportunities',
                'Strong startup ecosystem'
            ],
            avgSalary: '$75,000 - $120,000'
        },
        {
            country: 'UK',
            icon: '🇬🇧',
            highlights: [
                'Post-study work visa (2 years)',
                'Strong finance sector in London',
                'Growing tech industry',
                'EU market access'
            ],
            avgSalary: '£35,000 - £55,000'
        },
        {
            country: 'Canada',
            icon: '🇨🇦',
            highlights: [
                'Pathway to permanent residence',
                'Growing AI and tech sectors',
                'Work permit up to 3 years',
                'Quality of life'
            ],
            avgSalary: 'CAD $60,000 - $90,000'
        },
        {
            country: 'Australia',
            icon: '🇦🇺',
            highlights: [
                'Post-study work rights',
                'Mining and resources sector',
                'Healthcare opportunities',
                'High quality of life'
            ],
            avgSalary: 'AUD $65,000 - $95,000'
        },
    ];
    
    return markets.map((market, index) => `
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow animate-fadeInUp" style="animation-delay: ${index * 0.1}s;">
            <div class="flex items-center gap-3 mb-4">
                <div class="text-4xl">${market.icon}</div>
                <div>
                    <h3 class="text-2xl text-gray-900">${market.country}</h3>
                    <p class="text-sm text-gray-600">Average Salary: ${market.avgSalary}</p>
                </div>
            </div>
            <ul class="space-y-2">
                ${market.highlights.map(highlight => `
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span class="text-gray-700">${highlight}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

function renderTopIndustries() {
    const industries = [
        { name: 'Technology & Software', growth: '15%', demand: 'Very High', icon: '💻' },
        { name: 'Healthcare & Biotechnology', growth: '12%', demand: 'Very High', icon: '🏥' },
        { name: 'Finance & Banking', growth: '8%', demand: 'High', icon: '💰' },
        { name: 'Data Science & AI', growth: '18%', demand: 'Very High', icon: '📊' },
        { name: 'Digital Marketing', growth: '10%', demand: 'High', icon: '📱' },
        { name: 'Consulting', growth: '9%', demand: 'High', icon: '📈' },
    ];
    
    return `
        <div class="grid md:grid-cols-3 gap-4">
            ${industries.map((industry, index) => `
                <div class="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors animate-fadeInUp" style="animation-delay: ${index * 0.05}s;">
                    <div class="text-3xl mb-2">${industry.icon}</div>
                    <h4 class="text-lg text-gray-900 mb-2">${industry.name}</h4>
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Growth:</span>
                            <span class="text-green-600">${industry.growth}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Demand:</span>
                            <span class="text-blue-600">${industry.demand}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
