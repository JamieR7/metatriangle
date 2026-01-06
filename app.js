// SEHS Triangle Quiz - Clean Design with Positioned Answer Boxes

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
    correctPosition: null,  // 'top', 'bottom-left', or 'bottom-right'
    filters: {
        theme: 'all',
        level: 'all'
    }
};

// Difficulty settings
const DIFFICULTY_SETTINGS = {
    elite: { funnyFrequency: 0, displayName: 'Elite Athlete' },
    varsity: { funnyFrequency: 0.2, displayName: 'Varsity Player' },
    rookie: { funnyFrequency: 0.5, displayName: 'Rookie Trainee' }
};

// ==================== SCORING SYSTEM ====================
// Score based on position clicked and which corner is correct
const POSITION_SCORES = {
    // If TOP is correct
    'top': { top: 3, 'top-left': 2, 'top-right': 2, 'mid-left': 1, 'mid-right': 1, 'center': 0, 'lower-left': -1, 'lower-right': -1, 'bottom-left': -2, 'bottom-left-mid': -2, 'bottom-center-left': -2, 'bottom-center-right': -2, 'bottom-right-mid': -2, 'bottom-right': -2 },
    // If BOTTOM-LEFT is correct
    'bottom-left': { top: -2, 'top-left': 2, 'top-right': -2, 'mid-left': 1, 'mid-right': -2, 'center': 0, 'lower-left': 2, 'lower-right': -1, 'bottom-left': 3, 'bottom-left-mid': 1, 'bottom-center-left': -1, 'bottom-center-right': -2, 'bottom-right-mid': 1, 'bottom-right': -2 },
    // If BOTTOM-RIGHT is correct
    'bottom-right': { top: -2, 'top-left': -2, 'top-right': 2, 'mid-left': -2, 'mid-right': 1, 'center': 0, 'lower-left': -1, 'lower-right': 2, 'bottom-left': -2, 'bottom-left-mid': 1, 'bottom-center-left': -2, 'bottom-center-right': -1, 'bottom-right-mid': 1, 'bottom-right': 3 }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEHS Triangle Quiz loaded!');
    console.log('Questions available:', QUESTIONS_DB.length);
    showScreen('difficulty-screen');

    // Add click listeners to all nodes
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            handleNodeClick(this);
        });
    });
});

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ==================== FILTER MANAGEMENT ====================
function filterTheme(theme) {
    gameState.filters.theme = theme;
    updateFilterButtons('theme', theme);
}

function filterLevel(level) {
    gameState.filters.level = level;
    updateFilterButtons('level', level);
}

function updateFilterButtons(type, value) {
    const attributeName = type === 'theme' ? 'data-theme' : 'data-level';
    document.querySelectorAll(`[${attributeName}]`).forEach(btn => {
        if (btn.getAttribute(attributeName) === value) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ==================== QUIZ START ====================
function startQuiz(difficulty) {
    gameState.difficulty = difficulty;
    gameState.score = 0;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.wrongAnswers = 0;

    let filteredQuestions = QUESTIONS_DB.filter(q => {
        const themeMatch = gameState.filters.theme === 'all' || q.theme === gameState.filters.theme;
        const levelMatch = gameState.filters.level === 'all' || q.level === gameState.filters.level;
        return themeMatch && levelMatch;
    });

    if (filteredQuestions.length === 0) {
        alert('No questions match your filters! Please adjust your selection.');
        return;
    }

    const numQuestions = Math.min(10, filteredQuestions.length);
    gameState.selectedQuestions = shuffleArray(filteredQuestions).slice(0, numQuestions);
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

    document.getElementById('question-topic').textContent = question.topic;
    document.getElementById('question-level').textContent = question.level;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = gameState.currentQuestionIndex + 1;
    document.getElementById('score').textContent = gameState.score;

    // Randomly assign correct answer to top, bottom-left, or bottom-right
    const positions = ['top', 'bottom-left', 'bottom-right'];
    gameState.correctPosition = positions[Math.floor(Math.random() * positions.length)];

    // Prepare and display options
    const options = prepareOptions(question);
    displayOptions(options);

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
        // Replace one wrong answer with funny one
        options[Math.floor(Math.random() * 2)] = { text: question.options.iv, isCorrect: false, isFunny: true };
    }

    return shuffleArray(options);
}

function displayOptions(options) {
    const correctOption = options.find(opt => opt.isCorrect);
    const wrongOptions = options.filter(opt => !opt.isCorrect);

    // Assign to positions
    const topBox = document.getElementById('answer-top');
    const leftBox = document.getElementById('answer-bottom-left');
    const rightBox = document.getElementById('answer-bottom-right');

    topBox.querySelector('.answer-content').textContent = 
        gameState.correctPosition === 'top' ? correctOption.text : wrongOptions[0].text;
    leftBox.querySelector('.answer-content').textContent = 
        gameState.correctPosition === 'bottom-left' ? correctOption.text : wrongOptions[1 % wrongOptions.length].text;
    rightBox.querySelector('.answer-content').textContent = 
        gameState.correctPosition === 'bottom-right' ? correctOption.text : wrongOptions[2 % wrongOptions.length].text;
}

function resetState() {
    // Reset nodes
    document.querySelectorAll('.node').forEach(node => {
        node.classList.remove('correct', 'wrong', 'disabled', 'neutral');
        node.style.pointerEvents = 'auto';
    });

    // Reset answer boxes
    document.querySelectorAll('.answer-box').forEach(box => {
        box.classList.remove('correct', 'wrong');
    });
}

// ==================== NODE INTERACTION ====================
function handleNodeClick(node) {
    const clickedPosition = node.getAttribute('data-position');

    // Disable all nodes
    document.querySelectorAll('.node').forEach(n => {
        n.classList.add('disabled');
        n.style.pointerEvents = 'none';
    });

    // Calculate points
    const scoreMap = POSITION_SCORES[gameState.correctPosition];
    const points = scoreMap[clickedPosition];

    // Track stats
    const isExactCorrect = (points === 3);
    const isDontKnow = (clickedPosition === 'center');

    if (isExactCorrect) {
        gameState.correctAnswers++;
    } else if (!isDontKnow) {
        gameState.wrongAnswers++;
    }

    // Visual feedback on clicked node
    if (points > 0) {
        node.classList.add('correct');
        showFeedback(`+${points} point${points !== 1 ? 's' : ''}!`, 'correct');
    } else if (points === 0) {
        node.classList.add('neutral');
        showFeedback('No points', 'neutral');
    } else {
        node.classList.add('wrong');
        showFeedback(`${points} points`, 'wrong');
        highlightCorrectNode();
    }

    // Highlight answer boxes
    highlightAnswerBoxes(clickedPosition);

    // Update score
    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

    // Move to next question
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        loadQuestion();
    }, 2500);
}

function highlightCorrectNode() {
    const correctNode = document.querySelector(`[data-position="${gameState.correctPosition}"]`);
    if (correctNode) {
        correctNode.classList.add('correct');
    }
}

function highlightAnswerBoxes(clickedPosition) {
    // Map node positions to answer box IDs
    const boxMap = {
        'top': 'answer-top',
        'top-left': 'answer-top',
        'top-right': 'answer-top',
        'mid-left': null,
        'mid-right': null,
        'center': null,
        'lower-left': 'answer-bottom-left',
        'lower-right': 'answer-bottom-right',
        'bottom-left': 'answer-bottom-left',
        'bottom-left-mid': null,
        'bottom-center-left': null,
        'bottom-center-right': null,
        'bottom-right-mid': null,
        'bottom-right': 'answer-bottom-right'
    };

    const correctBoxMap = {
        'top': 'answer-top',
        'bottom-left': 'answer-bottom-left',
        'bottom-right': 'answer-bottom-right'
    };

    // Highlight clicked box if it corresponds to a corner
    const clickedBoxId = boxMap[clickedPosition];
    if (clickedBoxId) {
        const clickedBox = document.getElementById(clickedBoxId);
        const scoreMap = POSITION_SCORES[gameState.correctPosition];
        const points = scoreMap[clickedPosition];

        if (points > 0) {
            clickedBox.classList.add('correct');
        } else if (points < 0) {
            clickedBox.classList.add('wrong');
        }
    }

    // Always highlight correct box
    const correctBoxId = correctBoxMap[gameState.correctPosition];
    const correctBox = document.getElementById(correctBoxId);
    if (correctBox && !correctBox.classList.contains('correct')) {
        correctBox.classList.add('correct');
    }
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = 'feedback show ' + type;
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
        message = '🌟 Outstanding Performance! You\'re an SEHS Expert! 🌟';
    } else if (accuracy >= 70) {
        message = '💪 Great Job! You know your stuff! 💪';
    } else if (accuracy >= 50) {
        message = '👍 Good Effort! Keep studying! 👍';
    } else {
        message = '📚 Keep Practicing! You\'ll get there! 📚';
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
    if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
        showScreen('difficulty-screen');
    }
}

// ==================== UTILITY FUNCTIONS ====================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

console.log('App.js loaded - Clean design with positioned answer boxes!');
