// Preparation Tips Page

function loadPreparationPage() {
    const mainContent = $('#mainContent');
    
    mainContent.innerHTML = `
        <div class="bg-gray-50 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h1 class="text-4xl text-gray-900 mb-4">Skill & Research Preparation</h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Prepare yourself for success with our comprehensive guide to developing essential skills and research capabilities
                    </p>
                </div>

                <!-- Readiness Quiz -->
                <div class="card mb-12 animate-fadeInUp">
                    <h2 class="text-3xl text-gray-900 mb-4">Find Your Perfect Study Path</h2>
                    <p class="text-gray-600 mb-6">Take our interactive quiz to get personalized recommendations</p>
                    <div id="quizContainer"></div>
                </div>

                <!-- Cost Calculator -->
                <div class="card mb-12 animate-fadeInUp" style="animation-delay: 0.1s;">
                    <h2 class="text-3xl text-gray-900 mb-4">Study Abroad Cost Calculator</h2>
                    <p class="text-gray-600 mb-6">Estimate your total costs for studying abroad</p>
                    <div id="costCalculator"></div>
                </div>

                <!-- Skills Grid -->
                <div class="grid md:grid-cols-2 gap-8 mb-16">
                    ${renderSkillCards()}
                </div>

                <!-- Timeline -->
                <div class="card animate-fadeInUp">
                    <h2 class="text-3xl text-gray-900 mb-8">Application Timeline</h2>
                    ${renderTimeline()}
                </div>
            </div>
        </div>
    `;
    
    initQuiz();
    initCostCalculator();
}

function renderSkillCards() {
    const skills = [
        {
            category: 'Academic Skills',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>`,
            tips: [
                'Develop strong writing skills for essays and research papers',
                'Improve critical thinking and analytical abilities',
                'Practice time management and organizational skills',
                'Enhance presentation and public speaking abilities',
            ],
        },
        {
            category: 'Research Preparation',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
            </svg>`,
            tips: [
                'Read extensively in your field of interest',
                'Learn to use academic databases and research tools',
                'Understand citation formats (APA, MLA, Chicago)',
                'Develop a research question and methodology',
            ],
        },
        {
            category: 'Language Proficiency',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>`,
            tips: [
                'Practice English daily through reading and listening',
                'Join language exchange programs or conversation groups',
                'Watch academic lectures and take notes',
                'Write essays on diverse topics regularly',
            ],
        },
        {
            category: 'Professional Development',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
            </svg>`,
            tips: [
                'Build a strong LinkedIn profile',
                'Gain relevant internship or work experience',
                'Develop technical skills relevant to your field',
                'Network with professionals and alumni',
            ],
        },
    ];
    
    return skills.map((skill, index) => `
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow animate-fadeInUp" style="animation-delay: ${index * 0.1}s;">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    ${skill.icon}
                </div>
                <h3 class="text-2xl text-gray-900">${skill.category}</h3>
            </div>
            <ul class="space-y-3">
                ${skill.tips.map(tip => `
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span class="text-gray-600">${tip}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

function renderTimeline() {
    const timeline = [
        { phase: '12-18 Months Before', tasks: ['Research universities and programs', 'Start test preparation', 'Build academic profile'] },
        { phase: '9-12 Months Before', tasks: ['Take standardized tests', 'Request recommendation letters', 'Draft personal statement'] },
        { phase: '6-9 Months Before', tasks: ['Complete applications', 'Apply for scholarships', 'Prepare financial documents'] },
        { phase: '3-6 Months Before', tasks: ['Accept admission offer', 'Apply for visa', 'Arrange accommodation'] },
        { phase: '1-3 Months Before', tasks: ['Book flights', 'Attend pre-departure sessions', 'Pack and prepare'] },
    ];
    
    return `
        <div class="space-y-6">
            ${timeline.map((item, index) => `
                <div class="border-l-4 border-blue-600 pl-6 pb-6 relative animate-fadeInUp" style="animation-delay: ${index * 0.1}s;">
                    <div class="absolute -left-2.5 top-0 w-5 h-5 bg-blue-600 rounded-full"></div>
                    <h3 class="text-xl text-gray-900 mb-3">${item.phase}</h3>
                    <ul class="space-y-2">
                        ${item.tasks.map(task => `
                            <li class="flex items-start gap-2">
                                <svg class="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 11 12 14 22 4"></polyline>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                                <span class="text-gray-600">${task}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
}

function initQuiz() {
    const quizContainer = $('#quizContainer');
    if (!quizContainer) return;
    
    let currentQuestion = 0;
    const answers = {};
    
    const questions = [
        {
            question: "What's your primary goal for studying abroad?",
            options: ['Career advancement', 'Academic excellence', 'Cultural experience', 'Research opportunities']
        },
        {
            question: "Which field are you most interested in?",
            options: ['STEM', 'Business', 'Arts & Humanities', 'Social Sciences']
        },
        {
            question: "What's your preferred study destination?",
            options: ['USA', 'UK', 'Canada', 'Australia', 'Europe']
        }
    ];
    
    function renderQuiz() {
        if (currentQuestion < questions.length) {
            const q = questions[currentQuestion];
            quizContainer.innerHTML = `
                <div class="quiz-question animate-fadeIn">
                    <h3 class="text-xl text-gray-900 mb-4">Question ${currentQuestion + 1} of ${questions.length}</h3>
                    <p class="text-lg text-gray-700 mb-6">${q.question}</p>
                    <div class="grid md:grid-cols-2 gap-4">
                        ${q.options.map((option, index) => `
                            <button class="quiz-option p-4 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all" data-value="${option}">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            
            $$('.quiz-option').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    answers[currentQuestion] = e.target.dataset.value;
                    currentQuestion++;
                    renderQuiz();
                });
            });
        } else {
            quizContainer.innerHTML = `
                <div class="quiz-result text-center p-8 bg-green-50 rounded-lg animate-fadeIn">
                    <svg class="w-16 h-16 text-green-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3 class="text-2xl text-gray-900 mb-4">Quiz Completed!</h3>
                    <p class="text-gray-600 mb-6">Based on your answers, we recommend exploring programs in ${answers[2] || 'various countries'} with a focus on ${answers[1] || 'your field of interest'}.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Retake Quiz</button>
                </div>
            `;
        }
    }
    
    renderQuiz();
}

function initCostCalculator() {
    const calcContainer = $('#costCalculator');
    if (!calcContainer) return;
    
    calcContainer.innerHTML = `
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-2">Country</label>
                    <select id="calcCountry" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="usa">USA</option>
                        <option value="uk">UK</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Program Duration (years)</label>
                    <input type="number" id="calcDuration" value="2" min="1" max="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Lifestyle</label>
                    <select id="calcLifestyle" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="basic">Basic</option>
                        <option value="moderate" selected>Moderate</option>
                        <option value="comfortable">Comfortable</option>
                    </select>
                </div>
                <button class="btn btn-primary w-full" onclick="calculateCost()">Calculate Total Cost</button>
            </div>
            <div id="costResult" class="bg-blue-50 p-6 rounded-lg">
                <h3 class="text-xl text-gray-900 mb-4">Estimated Total Cost</h3>
                <p class="text-gray-600">Select your preferences and click calculate</p>
            </div>
        </div>
    `;
}

function calculateCost() {
    const country = $('#calcCountry').value;
    const duration = parseInt($('#calcDuration').value);
    const lifestyle = $('#calcLifestyle').value;
    
    const costs = {
        usa: { tuition: 35000, living: { basic: 12000, moderate: 18000, comfortable: 25000 } },
        uk: { tuition: 25000, living: { basic: 10000, moderate: 15000, comfortable: 22000 } },
        canada: { tuition: 22000, living: { basic: 11000, moderate: 16000, comfortable: 23000 } },
        australia: { tuition: 28000, living: { basic: 13000, moderate: 19000, comfortable: 26000 } },
    };
    
    const tuition = costs[country].tuition * duration;
    const living = costs[country].living[lifestyle] * duration;
    const total = tuition + living;
    
    const resultDiv = $('#costResult');
    resultDiv.innerHTML = `
        <div class="animate-fadeIn">
            <h3 class="text-xl text-gray-900 mb-4">Estimated Total Cost</h3>
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span class="text-gray-600">Tuition Fees:</span>
                    <span class="text-lg text-gray-900">$${tuition.toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Living Expenses:</span>
                    <span class="text-lg text-gray-900">$${living.toLocaleString()}</span>
                </div>
                <div class="border-t pt-3 flex justify-between">
                    <span class="text-lg text-gray-900">Total:</span>
                    <span class="text-2xl text-blue-600">$${total.toLocaleString()}</span>
                </div>
            </div>
            <p class="text-sm text-gray-500 mt-4">*Estimated costs may vary. Check with specific universities for accurate fees.</p>
        </div>
    `;
}
