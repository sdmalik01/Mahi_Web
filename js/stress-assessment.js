// MindEase - Stress Assessment Quiz

const quizQuestions = [
    {
        question: "How often do you feel overwhelmed by your responsibilities?",
        options: [
            { text: "Rarely or never", value: 1 },
            { text: "Sometimes", value: 2 },
            { text: "Often", value: 3 },
            { text: "Very often or always", value: 4 }
        ]
    },
    {
        question: "How well are you sleeping lately?",
        options: [
            { text: "Very well, I feel rested", value: 1 },
            { text: "Fairly well", value: 2 },
            { text: "Not very well, often tired", value: 3 },
            { text: "Poorly, constantly exhausted", value: 4 }
        ]
    },
    {
        question: "How often do you experience headaches or physical tension?",
        options: [
            { text: "Rarely or never", value: 1 },
            { text: "Occasionally", value: 2 },
            { text: "Frequently", value: 3 },
            { text: "Almost daily", value: 4 }
        ]
    },
    {
        question: "How difficult is it for you to relax and unwind?",
        options: [
            { text: "Easy, I can relax anytime", value: 1 },
            { text: "Somewhat easy", value: 2 },
            { text: "Difficult", value: 3 },
            { text: "Very difficult or impossible", value: 4 }
        ]
    },
    {
        question: "How often do you feel anxious or worried?",
        options: [
            { text: "Rarely", value: 1 },
            { text: "Sometimes", value: 2 },
            { text: "Often", value: 3 },
            { text: "Constantly", value: 4 }
        ]
    },
    {
        question: "How is your appetite and eating pattern?",
        options: [
            { text: "Normal and healthy", value: 1 },
            { text: "Slightly changed", value: 2 },
            { text: "Noticeably different", value: 3 },
            { text: "Significantly disrupted", value: 4 }
        ]
    },
    {
        question: "How often do you feel irritable or angry?",
        options: [
            { text: "Rarely", value: 1 },
            { text: "Occasionally", value: 2 },
            { text: "Frequently", value: 3 },
            { text: "Very frequently", value: 4 }
        ]
    },
    {
        question: "How is your ability to concentrate and focus?",
        options: [
            { text: "Excellent", value: 1 },
            { text: "Good", value: 2 },
            { text: "Fair, struggling sometimes", value: 3 },
            { text: "Poor, can't focus", value: 4 }
        ]
    },
    {
        question: "How connected do you feel to friends and family?",
        options: [
            { text: "Very connected", value: 1 },
            { text: "Somewhat connected", value: 2 },
            { text: "Feeling disconnected", value: 3 },
            { text: "Very isolated", value: 4 }
        ]
    },
    {
        question: "How would you rate your overall mood recently?",
        options: [
            { text: "Positive and happy", value: 1 },
            { text: "Mostly okay", value: 2 },
            { text: "Down or sad", value: 3 },
            { text: "Very low or depressed", value: 4 }
        ]
    }
];

let currentQuestion = 0;
let answers = [];
let totalScore = 0;

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('quizContainer')) {
        initQuiz();
    }
});

function initQuiz() {
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    displayQuestion();
    updateProgressBar();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option.text;
        optionBtn.dataset.value = option.value;
        
        // Check if this option was previously selected
        if (answers[currentQuestion] === option.value) {
            optionBtn.classList.add('selected');
        }
        
        optionBtn.addEventListener('click', () => selectOption(option.value, optionBtn));
        optionsContainer.appendChild(optionBtn);
    });
    
    updateNavigationButtons();
    updateQuestionNumber();
}

function selectOption(value, btn) {
    // Remove selected class from all options
    document.querySelectorAll('.option-btn').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    btn.classList.add('selected');
    
    // Store answer
    answers[currentQuestion] = value;
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    
    if (answers[currentQuestion]) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
    
    // Change next button text on last question
    if (currentQuestion === quizQuestions.length - 1) {
        nextBtn.textContent = 'View Results';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function updateQuestionNumber() {
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Previous button
document.getElementById('prevBtn')?.addEventListener('click', function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgressBar();
    }
});

// Next button
document.getElementById('nextBtn')?.addEventListener('click', function() {
    if (!answers[currentQuestion]) {
        showToast('Please select an option', 'warning');
        return;
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgressBar();
    } else {
        calculateResults();
    }
});

function calculateResults() {
    // Calculate total score
    totalScore = answers.reduce((sum, val) => sum + val, 0);
    
    // Hide quiz container
    document.getElementById('quizContainer').style.display = 'none';
    
    // Show results
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.style.display = 'block';
    
    // Determine stress level
    let level, icon, category, description, advice;
    
    if (totalScore <= 15) {
        level = 'Low Stress';
        icon = '😊';
        category = 'low';
        description = 'Great news! Your stress levels appear to be well-managed. You\'re handling life\'s challenges effectively.';
        advice = [
            'Continue your current healthy habits and routines',
            'Keep engaging in activities you enjoy',
            'Maintain your social connections and support network',
            'Practice gratitude and mindfulness regularly'
        ];
    } else if (totalScore <= 25) {
        level = 'Moderate Stress';
        icon = '😐';
        category = 'moderate';
        description = 'You\'re experiencing moderate stress levels. It\'s manageable, but important to address before it increases.';
        advice = [
            'Practice relaxation techniques like deep breathing',
            'Ensure you\'re getting adequate sleep (7-9 hours)',
            'Exercise regularly to release tension',
            'Consider talking to someone about your concerns',
            'Try our meditation exercises daily'
        ];
    } else if (totalScore <= 35) {
        level = 'High Stress';
        icon = '😰';
        category = 'high';
        description = 'You\'re experiencing high stress levels. It\'s important to take action to manage your wellbeing.';
        advice = [
            'Prioritize self-care activities immediately',
            'Reach out to friends, family, or a counselor',
            'Practice stress-reduction techniques daily',
            'Consider reducing commitments where possible',
            'Seek professional support if symptoms persist',
            'Use our meditation and affirmations regularly'
        ];
    } else {
        level = 'Very High Stress';
        icon = '😔';
        category = 'very-high';
        description = 'You\'re experiencing very high stress levels. Please consider seeking professional help.';
        advice = [
            'Contact a mental health professional immediately',
            'Reach out to trusted friends or family members',
            'Use emergency helplines if needed (see Contact page)',
            'Practice immediate stress relief: deep breathing, walking',
            'Reduce obligations and prioritize rest',
            'Remember: asking for help is a sign of strength'
        ];
    }
    
    // Update results display
    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultTitle').textContent = 'Your Stress Level: ' + level;
    document.getElementById('scoreValue').textContent = totalScore;
    
    const categoryBadge = document.querySelector('.category-badge');
    categoryBadge.textContent = level;
    categoryBadge.style.background = getCategoryColor(category);
    
    document.getElementById('resultDescription').querySelector('p').textContent = description;
    
    // Display advice
    const adviceList = document.getElementById('adviceList');
    adviceList.innerHTML = '';
    advice.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        adviceList.appendChild(li);
    });
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

function getCategoryColor(category) {
    switch(category) {
        case 'low': return '#10b981';
        case 'moderate': return '#f59e0b';
        case 'high': return '#f97316';
        case 'very-high': return '#ef4444';
        default: return '#6366f1';
    }
}

function retakeQuiz() {
    currentQuestion = 0;
    answers = [];
    totalScore = 0;
    
    document.getElementById('resultsContainer').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    
    initQuiz();
    scrollToTop();
}