const game = {
    currentQuestion: 0,
    score: 0,
    difficulty: '',
    questions: [],
    correctCorner: null,
    correctAnswerIndex: null,
    answered: false
};

const scoringTables = {
    top: {
        'top': 3, 'top-left': 2, 'top-right': 2,
        'mid-left': 1, 'center': 0, 'mid-right': 1,
        'lower-left': -1, 'lower-mid-left': -1, 'lower-mid-right': -1, 'lower-right': -1,
        'bottom-left': -2, 'bottom-left-mid': -2, 'bottom-center': -2, 'bottom-right-mid': -2, 'bottom-right': -2
    },
    'bottom-left': {
        'bottom-left': 3, 'bottom-left-mid': 2, 'lower-left': 2,
        'mid-left': 1, 'bottom-center': 1, 'center': 0,
        'top-left': -1, 'lower-mid-left': -1, 'lower-mid-right': -1,
        'top': -2, 'top-right': -2, 'mid-right': -2, 'lower-right': -2, 'bottom-right-mid': -2, 'bottom-right': -2
    },
    'bottom-right': {
        'bottom-right': 3, 'bottom-right-mid': 2, 'lower-right': 2,
        'mid-right': 1, 'bottom-center': 1, 'center': 0,
        'top-right': -1, 'lower-mid-right': -1, 'lower-mid-left': -1,
        'top': -2, 'top-left': -2, 'mid-left': -2, 'lower-left': -2, 'bottom-left-mid': -2, 'bottom-left': -2
    }
};

// Initialize game
document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        game.difficulty = e.target.dataset.level;
        startGame();
    });
});

document.getElementById('restart-btn').addEventListener('click', () => {
    resetGame();
});

// Setup radio button listeners
document.querySelectorAll('input[name="confidence"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (game.answered) return;
        const zone = e.target.dataset.zone;
        handleAnswer(zone);
    });
});

function startGame() {
    game.questions = getRandomQuestions(10, game.difficulty);
    game.currentQuestion = 0;
    game.score = 0;
    
    document.getElementById('difficulty-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    document.getElementById('difficulty-badge').textContent = game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1);
    
    loadQuestion();
}

function getRandomQuestions(count, difficulty) {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(q => ({
        ...q,
        difficulty: difficulty
    }));
}

function loadQuestion() {
    if (game.currentQuestion >= game.questions.length) {
        showResults();
        return;
    }
    
    game.answered = false;
    const q = game.questions[game.currentQuestion];
    
    // Random corner assignment (INDEPENDENT of answer position)
    const corners = ['top', 'bottom-left', 'bottom-right'];
    game.correctCorner = corners[Math.floor(Math.random() * corners.length)];
    
    // Shuffle answers
    const allAnswers = [q.correct, ...q.incorrect];
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);
    
    // Track which box has correct answer
    game.correctAnswerIndex = shuffled.indexOf(q.correct);
    
    // Display question and answers
    document.getElementById('question-text').textContent = q.question;
    shuffled.forEach((answer, index) => {
        const box = document.getElementById(`answer-${index}`);
        box.textContent = answer;
        box.classList.remove('correct');
    });
    
    // Update header
    document.getElementById('current-q').textContent = game.currentQuestion + 1;
    document.getElementById('score').textContent = game.score;
    
    // Clear feedback and radio buttons
    document.getElementById('feedback-display').textContent = '';
    document.getElementById('feedback-display').classList.remove('show');
    document.querySelectorAll('input[name="confidence"]').forEach(r => r.checked = false);
}

function handleAnswer(clickedZone) {
    game.answered = true;
    
    // Calculate score based on correct corner
    const points = scoringTables[game.correctCorner][clickedZone];
    game.score += points;
    
    // Show feedback
    const feedback = document.getElementById('feedback-display');
    feedback.textContent = points >= 0 ? `+${points} points!` : `${points} points`;
    feedback.style.color = points >= 2 ? '#4CAF50' : points >= 0 ? '#fbba07' : '#f44336';
    feedback.classList.add('show');
    
    // Highlight correct answer box
    document.getElementById(`answer-${game.correctAnswerIndex}`).classList.add('correct');
    
    // Update score display
    document.getElementById('score').textContent = game.score;
    
    // Auto-advance after 2.5 seconds
    setTimeout(() => {
        game.currentQuestion++;
        loadQuestion();
    }, 2500);
}

function showResults() {
    const totalQuestions = game.questions.length;
    const maxScore = totalQuestions * 3;
    const percentage = Math.round((game.score + (totalQuestions * 2)) / (maxScore + (totalQuestions * 2)) * 100);
    
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('results-screen').classList.add('active');
    
    document.getElementById('final-score').textContent = game.score;
    document.getElementById('accuracy').textContent = percentage;
    
    let message = '';
    if (percentage >= 90) message = 'Outstanding! IB 7 Level Performance!';
    else if (percentage >= 80) message = 'Excellent! Strong IB Understanding!';
    else if (percentage >= 70) message = 'Good Work! Solid SEHS Knowledge!';
    else if (percentage >= 60) message = 'Keep Practicing! Review Key Concepts!';
    else message = 'More Study Needed! Focus on Fundamentals!';
    
    document.getElementById('performance-msg').textContent = message;
}

function resetGame() {
    game.currentQuestion = 0;
    game.score = 0;
    game.questions = [];
    
    document.getElementById('results-screen').classList.remove('active');
    document.getElementById('difficulty-screen').classList.add('active');
}
