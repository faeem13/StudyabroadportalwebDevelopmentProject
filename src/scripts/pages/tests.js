// Test Preparation Page

function loadTestsPage() {
    const mainContent = $('#mainContent');
    
    mainContent.innerHTML = `
        <div class="bg-gray-50 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h1 class="text-4xl text-gray-900 mb-4">Test Preparation</h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive guides and resources for IELTS, TOEFL, GRE, and GMAT
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8 mb-12">
                    ${renderTestCards()}
                </div>

                <div class="card">
                    <h2 class="text-3xl text-gray-900 mb-6">Score Calculator</h2>
                    ${renderScoreCalculator()}
                </div>
            </div>
        </div>
    `;
}

function renderTestCards() {
    const tests = [
        {
            name: 'IELTS',
            fullName: 'International English Language Testing System',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>`,
            score: 'Band 0-9',
            sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
            duration: '2 hours 45 minutes',
        },
        {
            name: 'TOEFL',
            fullName: 'Test of English as a Foreign Language',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg>`,
            score: '0-120',
            sections: ['Reading', 'Listening', 'Speaking', 'Writing'],
            duration: '3 hours',
        },
        {
            name: 'GRE',
            fullName: 'Graduate Record Examination',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
            </svg>`,
            score: '260-340',
            sections: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
            duration: '3 hours 45 minutes',
        },
        {
            name: 'GMAT',
            fullName: 'Graduate Management Admission Test',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>`,
            score: '200-800',
            sections: ['Analytical Writing', 'Integrated Reasoning', 'Quantitative', 'Verbal'],
            duration: '3 hours 30 minutes',
        },
    ];
    
    return tests.map((test, index) => `
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow animate-fadeInUp" style="animation-delay: ${index * 0.1}s;">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    ${test.icon}
                </div>
                <div>
                    <h3 class="text-2xl text-gray-900">${test.name}</h3>
                    <p class="text-sm text-gray-600">${test.fullName}</p>
                </div>
            </div>
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span class="text-gray-600">Score Range:</span>
                    <span class="text-gray-900">${test.score}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Duration:</span>
                    <span class="text-gray-900">${test.duration}</span>
                </div>
                <div>
                    <span class="text-gray-600 block mb-2">Sections:</span>
                    <div class="flex flex-wrap gap-2">
                        ${test.sections.map(section => `
                            <span class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">${section}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderScoreCalculator() {
    return `
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-2">Select Test</label>
                    <select id="testType" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="ielts">IELTS</option>
                        <option value="toefl">TOEFL</option>
                        <option value="gre">GRE</option>
                        <option value="gmat">GMAT</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Target University Tier</label>
                    <select id="universityTier" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="top">Top 50</option>
                        <option value="mid">Top 100</option>
                        <option value="good">Top 200</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Field of Study</label>
                    <select id="fieldOfStudy" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="engineering">Engineering</option>
                        <option value="business">Business</option>
                        <option value="arts">Arts & Humanities</option>
                        <option value="science">Science</option>
                    </select>
                </div>
                <button class="btn btn-primary w-full" onclick="calculateRequiredScore()">Get Recommended Score</button>
            </div>
            <div id="scoreResult" class="bg-blue-50 p-6 rounded-lg">
                <h3 class="text-xl text-gray-900 mb-4">Recommended Score</h3>
                <p class="text-gray-600">Select your preferences and click calculate</p>
            </div>
        </div>
    `;
}

function calculateRequiredScore() {
    const test = $('#testType').value;
    const tier = $('#universityTier').value;
    const field = $('#fieldOfStudy').value;
    
    const scores = {
        ielts: { top: 7.5, mid: 7.0, good: 6.5 },
        toefl: { top: 100, mid: 90, good: 80 },
        gre: { top: 320, mid: 310, good: 300 },
        gmat: { top: 700, mid: 650, good: 600 },
    };
    
    const score = scores[test][tier];
    const testNames = { ielts: 'IELTS', toefl: 'TOEFL', gre: 'GRE', gmat: 'GMAT' };
    
    const resultDiv = $('#scoreResult');
    resultDiv.innerHTML = `
        <div class="animate-fadeIn">
            <h3 class="text-xl text-gray-900 mb-4">Recommended Score</h3>
            <div class="text-center mb-4">
                <div class="text-5xl text-blue-600 mb-2">${score}</div>
                <p class="text-gray-600">${testNames[test]} Score</p>
            </div>
            <div class="space-y-2 text-sm text-gray-600">
                <p>✓ Competitive for ${tier === 'top' ? 'Top 50' : tier === 'mid' ? 'Top 100' : 'Top 200'} universities</p>
                <p>✓ Suitable for ${field} programs</p>
                <p>✓ Increases scholarship opportunities</p>
            </div>
            <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p class="text-sm text-gray-700">💡 Tip: Aim for 5-10 points above the minimum for better chances!</p>
            </div>
        </div>
    `;
}
