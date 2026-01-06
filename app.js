// SEHS Triangle Quiz - Simplified Version

// ==================== GLOBAL STATE ====================
let gameState = {
    difficulty: 'elite',
    currentQuestionIndex: 0,
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    selectedQuestions: [],
    currentQuestion: null,
    correctCorner: null,
    correctBoxId: null,  // Which box (answer-1, answer-2, answer-3) has correct answer
    lastCorrectCorner: null
};

const DIFFICULTY_SETTINGS = {
    elite: { funnyFrequency: 0, displayName: 'Elite' },
    varsity: { funnyFrequency: 0.2, displayName: 'Varsity' },
    rookie: { funnyFrequency: 0.5, displayName: 'Rookie' }
};

// ==================== SCORING SYSTEM ====================
const POSITION_SCORES = {
    'top': {
        'top': 3, 'top-left': 2, 'top-right': 2,
        'mid-left': 1, 'mid-right': 1, 'center': 0,
        'lower-left': -1, 'lower-right': -1,
        'bottom-left': -2, 'bottom-left-mid': -2, 'bottom-center-left': -2,
        'bottom-center-right': -2, 'bottom-right-mid': -2, 'bottom-right': -2
    },
    'bottom-left': {
        'top': -2, 'top-left': 2, 'top-right': -2,
        'mid-left': 1, 'mid-right': -2, 'center': 0,
        'lower-left': 2, 'lower-right': -1,
        'bottom-left': 3, 'bottom-left-mid': 1, 'bottom-center-left': -1,
        'bottom-center-right': -2, 'bottom-right-mid': 1, 'bottom-right': -2
    },
    'bottom-right': {
        'top': -2, 'top-left': -2, 'top-right': 2,
        'mid-left': -2, 'mid-right': 1, 'center': 0,
        'lower-left': -1, 'lower-right': 2,
        'bottom-left': -2, 'bottom-left-mid': 1, 'bottom-center-left': -2,
        'bottom-center-right': -1, 'bottom-right-mid': 1, 'bottom-right': 3
    }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEHS Triangle Quiz loaded!');
    if (typeof QUESTIONS_DB !== 'undefined') {
        console.log('Questions available:', QUESTIONS_DB.length);
    }
    showScreen('difficulty-screen');
});

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// ==================== QUIZ START ====================
function startQuiz(difficulty) {
    gameState.difficulty = difficulty;
    gameState.score = 0;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.wrongAnswers = 0;
    gameState.lastCorrectCorner = null;

    const numQuestions = Math.min(10, QUESTIONS_DB.length);
    gameState.selectedQuestions = shuffleArray([...QUESTIONS_DB]).slice(0, numQuestions);
    gameState.currentQuestionIndex = 0;

    document.getElementById('difficulty-display').textContent = DIFFICULTY_SETTINGS[difficulty].displayName;
    document.getElementById('total-q').textContent = numQuestions;

    showScreen('quiz-screen');
    loadQuestion();
}

// ==================== QUESTION LOADING ====================
function loadQuestion() {
    if (gameState.currentQuestionIndex >= gameState.selectedQuestions.length) {
        showResults();
        return;
    }

    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    gameState.currentQuestion = question;

    // Display question
    document.getElementById('question-topic').textContent = question.topic;
    document.getElementById('question-level').textContent = question.level;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = gameState.currentQuestionIndex + 1;
    document.getElementById('score').textContent = gameState.score;

    // Prepare and shuffle options
    const options = prepareOptions(question);
    const shuffledOptions = shuffleArray(options);

    // Display in boxes
    document.getElementById('answer-1').textContent = shuffledOptions[0].text;
    document.getElementById('answer-2').textContent = shuffledOptions[1].text;
    document.getElementById('answer-3').textContent = shuffledOptions[2].text;

    // Track which box has correct answer
    const correctIndex = shuffledOptions.findIndex(opt => opt.isCorrect);
    gameState.correctBoxId = 'answer-' + (correctIndex + 1);

    // Randomly assign corner (avoid same as last question)
    const corners = ['top', 'bottom-left', 'bottom-right'];
    let availableCorners = corners.filter(c => c !== gameState.lastCorrectCorner);
    gameState.correctCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
    gameState.lastCorrectCorner = gameState.correctCorner;

    console.log('Question loaded:', {
        correctBoxId: gameState.correctBoxId,
        correctCorner: gameState.correctCorner
    });

    resetState();
}

function prepareOptions(question) {
    const options = [
        { text: question.options.i, isCorrect: false },
        { text: question.options.ii, isCorrect: false },
        { text: question.options.iii, isCorrect: true }
    ];

    const funnyFrequency = DIFFICULTY_SETTINGS[gameState.difficulty].funnyFrequency;
    const includeFunny = Math.random() < funnyFrequency;

    if (includeFunny && question.options.iv) {
        options[Math.floor(Math.random() * 2)] = { text: question.options.iv, isCorrect: false };
    }

    return options;
}

function resetState() {
    // Reset answer boxes
    document.querySelectorAll('.answer-box').forEach(box => {
        box.classList.remove('correct', 'wrong');
    });

    // Enable triangle
    const triangleImg = document.getElementById('triangle-img');
    if (triangleImg) {
        triangleImg.classList.remove('disabled');
    }
}

// ==================== CLICK HANDLER ====================
function handleClick(position) {
    console.log('Clicked position:', position);

    // Disable further clicks
    const triangleImg = document.getElementById('triangle-img');
    if (triangleImg) {
        triangleImg.classList.add('disabled');
    }

    // Calculate score
    const scoreMap = POSITION_SCORES[gameState.correctCorner];
    const points = scoreMap[position];

    const isExactCorrect = (points === 3);
    const isDontKnow = (position === 'center');

    if (isExactCorrect) {
        gameState.correctAnswers++;
    } else if (!isDontKnow) {
        gameState.wrongAnswers++;
    }

    // Show feedback
    if (points > 0) {
        showFeedback(`+${points} point${points !== 1 ? 's' : ''}!`, 'correct');
    } else if (points === 0) {
        showFeedback('No points', 'neutral');
    } else {
        showFeedback(`${points} points`, 'wrong');
    }

    // Highlight correct answer box
    const correctBox = document.getElementById(gameState.correctBoxId);
    if (correctBox) {
        correctBox.classList.add('correct');
    }

    // Update score
    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

    // Next question
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        loadQuestion();
    }, 2500);
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.className = 'feedback show ' + type;

        setTimeout(() => {
            feedback.classList.remove('show');
        }, 2000);
    }
}

// ==================== RESULTS ====================
function showResults() {
    const totalQuestions = gameState.questionsAnswered;
    const accuracy = totalQuestions > 0 
        ? Math.round((gameState.correctAnswers / totalQuestions) * 100) 
        : 0;

    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('correct-count').textContent = gameState.correctAnswers;
    document.getElementById('wrong-count').textContent = gameState.wrongAnswers;
    document.getElementById('accuracy').textContent = accuracy + '%';

    let message = '';
    if (accuracy >= 90) {
        message = '🌟 Outstanding! SEHS Expert! 🌟';
    } else if (accuracy >= 70) {
        message = '💪 Great Job! Well done! 💪';
    } else if (accuracy >= 50) {
        message = '👍 Good Effort! Keep studying! 👍';
    } else {
        message = '📚 Keep Practicing! 📚';
    }
    document.getElementById('performance-message').textContent = message;

    showScreen('results-screen');
}

function restartQuiz() {
    startQuiz(gameState.difficulty);
}

function changeDifficulty() {
    showScreen('difficulty-screen');
}

function quitQuiz() {
    if (confirm('Quit? Your progress will be lost.')) {
        showScreen('difficulty-screen');
    }
}

// ==================== UTILITY ====================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

console.log('App.js loaded - Simplified version!');
