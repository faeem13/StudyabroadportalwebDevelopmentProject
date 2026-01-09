// Quiz Functionality
const questions = [
    {
        question: "What is your primary goal for studying abroad?",
        options: ["Career advancement", "Academic excellence", "Cultural experience", "Research opportunities"]
    },
    {
        question: "What is your preferred study destination?",
        options: ["USA", "UK", "Canada", "Australia"]
    },
    {
        question: "What is your field of interest?",
        options: ["Engineering/Technology", "Business/Management", "Sciences", "Arts/Humanities"]
    },
    {
        question: "What is your budget range for annual tuition?",
        options: ["Under $20,000", "$20,000 - $40,000", "$40,000 - $60,000", "Above $60,000"]
    }
];

let currentQuestion = 0;
let answers = [];
let showResults = false;

function renderQuestion() {
    const container = document.getElementById('questionContainer');
    const question = questions[currentQuestion];
    
    container.innerHTML = `
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" data-option="${option}">
                        <span>${option}</span>
                        <svg class="icon icon-sm check-icon" style="display: none;" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Update progress
    document.getElementById('currentQ').textContent = currentQuestion + 1;
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressPercent').textContent = Math.round(progress);
    document.getElementById('progressFill').style.width = progress + '%';

    // Add click handlers to options
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => handleAnswer(option));
    });
}

function handleAnswer(selectedOption) {
    const answer = selectedOption.getAttribute('data-option');
    const allOptions = document.querySelectorAll('.quiz-option');
    
    // Visual feedback
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('.check-icon').style.display = 'none';
    });
    selectedOption.classList.add('selected');
    selectedOption.querySelector('.check-icon').style.display = 'block';

    // Disable all options
    allOptions.forEach(opt => opt.disabled = true);

    setTimeout(() => {
        answers.push(answer);
        
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            showQuizResults();
        }
    }, 500);
}

function showQuizResults() {
    const container = document.getElementById('questionContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    
    container.style.display = 'none';
    resultsContainer.style.display = 'block';
    document.querySelector('.quiz-progress').style.display = 'none';

    const destination = answers[1];
    const field = answers[2];

    resultsContainer.innerHTML = `
        <div class="quiz-results">
            <div class="results-icon">
                <svg class="icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
            </div>
            <h3>Your Personalized Recommendation</h3>
            <p>Based on your preferences, we recommend exploring ${destination} universities with strong ${field} programs.</p>
            
            <div class="results-steps">
                <h4>Recommended Next Steps:</h4>
                <div class="results-list">
                    <div class="result-item">
                        <svg class="icon icon-sm check-icon" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Browse our university matcher</span>
                    </div>
                    <div class="result-item">
                        <svg class="icon icon-sm check-icon" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Check scholarship opportunities</span>
                    </div>
                    <div class="result-item">
                        <svg class="icon icon-sm check-icon" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Review visa requirements</span>
                    </div>
                    <div class="result-item">
                        <svg class="icon icon-sm check-icon" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Explore test preparation resources</span>
                    </div>
                </div>
            </div>
            
            <button class="btn-retake" onclick="resetQuiz()">Take Quiz Again</button>
        </div>
    `;
}

function resetQuiz() {
    currentQuestion = 0;
    answers = [];
    showResults = false;
    
    document.getElementById('questionContainer').style.display = 'block';
    document.getElementById('resultsContainer').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'block';
    
    renderQuestion();
}

// Cost Calculator Functionality
const livingCosts = {
    USA: { monthly: 1500, currency: '$' },
    UK: { monthly: 1200, currency: '£' },
    Canada: { monthly: 1000, currency: 'CAD $' },
    Australia: { monthly: 1400, currency: 'AUD $' },
    Germany: { monthly: 900, currency: '€' }
};

const otherCosts = {
    visa: 500,
    insurance: 1200,
    books: 1000,
    travel: 2000
};

function calculateCosts() {
    const country = document.getElementById('countrySelect').value;
    const tuition = parseInt(document.getElementById('tuitionSlider').value);
    const duration = parseInt(document.getElementById('durationSlider').value);

    const living = livingCosts[country].monthly * 12 * duration;
    const tuitionTotal = tuition * duration;
    const others = Object.values(otherCosts).reduce((a, b) => a + b, 0) * duration;
    const total = tuitionTotal + living + others;

    const currency = livingCosts[country].currency;

    // Update display
    document.getElementById('tuitionValue').textContent = `${currency}${tuition.toLocaleString()}`;
    document.getElementById('durationValue').textContent = `${duration} ${duration === 1 ? 'year' : 'years'}`;
    document.getElementById('totalCost').textContent = `${currency}${total.toLocaleString()}`;

    // Update breakdown if visible
    if (document.getElementById('costBreakdown').style.display !== 'none') {
        updateBreakdown(tuitionTotal, living, others, total, currency);
    }

    return { tuitionTotal, living, others, total, currency };
}

function updateBreakdown(tuitionTotal, living, others, total, currency) {
    const tuitionPercent = (tuitionTotal / total) * 100;
    const livingPercent = (living / total) * 100;
    const othersPercent = (others / total) * 100;

    document.getElementById('tuitionTotal').textContent = `${currency}${tuitionTotal.toLocaleString()}`;
    document.getElementById('livingTotal').textContent = `${currency}${living.toLocaleString()}`;
    document.getElementById('othersTotal').textContent = `${currency}${others.toLocaleString()}`;

    document.getElementById('tuitionBar').style.width = tuitionPercent + '%';
    document.getElementById('livingBar').style.width = livingPercent + '%';
    document.getElementById('othersBar').style.width = othersPercent + '%';

    document.getElementById('tuitionPercent').textContent = tuitionPercent.toFixed(1) + '% of total';
    document.getElementById('livingPercent').textContent = livingPercent.toFixed(1) + '% of total';
    document.getElementById('othersPercent').textContent = othersPercent.toFixed(1) + '% of total';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize quiz
    renderQuestion();

    // Calculator event listeners
    const countrySelect = document.getElementById('countrySelect');
    const tuitionSlider = document.getElementById('tuitionSlider');
    const durationSlider = document.getElementById('durationSlider');
    const toggleBreakdown = document.getElementById('toggleBreakdown');

    countrySelect.addEventListener('change', calculateCosts);
    tuitionSlider.addEventListener('input', calculateCosts);
    durationSlider.addEventListener('input', calculateCosts);

    toggleBreakdown.addEventListener('click', () => {
        const breakdown = document.getElementById('costBreakdown');
        if (breakdown.style.display === 'none') {
            breakdown.style.display = 'block';
            toggleBreakdown.textContent = 'Hide Cost Breakdown';
            const costs = calculateCosts();
            updateBreakdown(costs.tuitionTotal, costs.living, costs.others, costs.total, costs.currency);
        } else {
            breakdown.style.display = 'none';
            toggleBreakdown.textContent = 'Show Cost Breakdown';
        }
    });

    // Initial calculation
    calculateCosts();

    // Add scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card, .timeline-section').forEach(el => {
        observer.observe(el);
    });
});
