// Universities Page

function loadUniversitiesPage() {
    const mainContent = $('#mainContent');
    
    mainContent.innerHTML = `
        <div class="bg-gray-50 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h1 class="text-4xl text-gray-900 mb-4">University Matcher</h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find the perfect university that matches your profile and aspirations
                    </p>
                </div>

                <!-- Filters -->
                <div class="card mb-8">
                    <h2 class="text-2xl text-gray-900 mb-4">Filter Universities</h2>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-gray-700 mb-2">Country</label>
                            <select id="filterCountry" class="w-full px-4 py-2 border border-gray-300 rounded-lg" onchange="filterUniversities()">
                                <option value="">All Countries</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 mb-2">Program Level</label>
                            <select id="filterLevel" class="w-full px-4 py-2 border border-gray-300 rounded-lg" onchange="filterUniversities()">
                                <option value="">All Levels</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Masters">Masters</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 mb-2">Ranking</label>
                            <select id="filterRanking" class="w-full px-4 py-2 border border-gray-300 rounded-lg" onchange="filterUniversities()">
                                <option value="">All Rankings</option>
                                <option value="top50">Top 50</option>
                                <option value="top100">Top 100</option>
                                <option value="top200">Top 200</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- University Grid -->
                <div id="universityGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${renderUniversities()}
                </div>
            </div>
        </div>
    `;
}

function getUniversities() {
    return [
        { name: 'MIT', country: 'USA', ranking: 1, level: ['Undergraduate', 'Masters', 'PhD'], tuition: '$53,450', acceptanceRate: '7%' },
        { name: 'Stanford', country: 'USA', ranking: 3, level: ['Undergraduate', 'Masters', 'PhD'], tuition: '$56,169', acceptanceRate: '4%' },
        { name: 'Harvard', country: 'USA', ranking: 5, level: ['Undergraduate', 'Masters', 'PhD'], tuition: '$51,904', acceptanceRate: '5%' },
        { name: 'Oxford', country: 'UK', ranking: 2, level: ['Undergraduate', 'Masters', 'PhD'], tuition: '£26,770', acceptanceRate: '18%' },
        { name: 'Cambridge', country: 'UK', ranking: 4, level: ['Undergraduate', 'Masters', 'PhD'], tuition: '£25,734', acceptanceRate: '21%' },
        { name: 'Toronto', country: 'Canada', ranking: 25, level: ['Undergraduate', 'Masters', 'PhD'], tuition: 'CAD $58,160', acceptanceRate: '43%' },
        { name: 'UBC', country: 'Canada', ranking: 34, level: ['Undergraduate', 'Masters', 'PhD'], tuition: 'CAD $41,328', acceptanceRate: '52%' },
        { name: 'Melbourne', country: 'Australia', ranking: 14, level: ['Undergraduate', 'Masters', 'PhD'], tuition: 'AUD $43,008', acceptanceRate: '70%' },
        { name: 'Sydney', country: 'Australia', ranking: 19, level: ['Undergraduate', 'Masters', 'PhD'], tuition: 'AUD $46,500', acceptanceRate: '30%' },
    ];
}

function renderUniversities(filtered = null) {
    const universities = filtered || getUniversities();
    
    return universities.map((uni, index) => `
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow animate-fadeInUp" style="animation-delay: ${index * 0.05}s;">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl text-gray-900">${uni.name}</h3>
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">#${uni.ranking}</span>
            </div>
            <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${uni.country}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>${uni.tuition}/year</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    <span>Acceptance: ${uni.acceptanceRate}</span>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                ${uni.level.map(l => `
                    <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">${l}</span>
                `).join('')}
            </div>
            <button class="btn btn-primary w-full">Learn More</button>
        </div>
    `).join('');
}

function filterUniversities() {
    const country = $('#filterCountry').value;
    const level = $('#filterLevel').value;
    const ranking = $('#filterRanking').value;
    
    let universities = getUniversities();
    
    if (country) {
        universities = universities.filter(u => u.country === country);
    }
    
    if (level) {
        universities = universities.filter(u => u.level.includes(level));
    }
    
    if (ranking) {
        const maxRank = ranking === 'top50' ? 50 : ranking === 'top100' ? 100 : 200;
        universities = universities.filter(u => u.ranking <= maxRank);
    }
    
    const grid = $('#universityGrid');
    grid.innerHTML = renderUniversities(universities);
}