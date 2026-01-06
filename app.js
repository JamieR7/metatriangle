// SEHS Triangle Quiz - Simple Stable Version

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
    answerMapping: {},  // Maps positions to answer box IDs
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
const POSITION_SCORES = {
    'top': { top: 3, 'top-left': 2, 'top-right': 2, 'mid-left': 1, 'mid-right': 1, 'center': 0, 'lower-left': -1, 'lower-right': -1, 'bottom-left': -2, 'bottom-left-mid': -2, 'bottom-center-left': -2, 'bottom-center-right': -2, 'bottom-right-mid': -2, 'bottom-right': -2 },
    'bottom-left': { top: -2, 'top-left': 2, 'top-right': -2, 'mid-left': 1, 'mid-right': -2, 'center': 0, 'lower-left': 2, 'lower-right': -1, 'bottom-left': 3, 'bottom-left-mid': 1, 'bottom-center-left': -1, 'bottom-center-right': -2, 'bottom-right-mid': 1, 'bottom-right': -2 },
    'bottom-right': { top: -2, 'top-left': -2, 'top-right': 2, 'mid-left': -2, 'mid-right': 1, 'center': 0, 'lower-left': -1, 'lower-right': 2, 'bottom-left': -2, 'bottom-left-mid': 1, 'bottom-center-left': -2, 'bottom-center-right': -1, 'bottom-right-mid': 1, 'bottom-right': 3 }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEHS Triangle Quiz loaded!');
    if (typeof QUESTIONS_DB !== 'undefined') {
        console.log('Questions available:', QUESTIONS_DB.length);
    }
    showScreen('difficulty-screen');

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
        options[Math.floor(Math.random() * 2)] = { text: question.options.iv, isCorrect: false };
    }

    return shuffleArray(options);
}

function displayOptions(options) {
    const correctOption = options.find(opt => opt.isCorrect);
    const wrongOptions = options.filter(opt => !opt.isCorrect);

    // Map positions to answer boxes
    gameState.answerMapping = {};

    // Randomly assign which answer box shows which position
    const boxes = ['answer-1', 'answer-2', 'answer-3'];
    const positions = ['top', 'bottom-left', 'bottom-right'];
    const shuffledBoxes = shuffleArray([...boxes]);

    positions.forEach((pos, idx) => {
        gameState.answerMapping[pos] = shuffledBoxes[idx];
    });

    // Display answers
    const topBox = document.getElementById(gameState.answerMapping['top']);
    const leftBox = document.getElementById(gameState.answerMapping['bottom-left']);
    const rightBox = document.getElementById(gameState.answerMapping['bottom-right']);

    topBox.textContent = gameState.correctPosition === 'top' ? correctOption.text : wrongOptions[0].text;
    leftBox.textContent = gameState.correctPosition === 'bottom-left' ? correctOption.text : wrongOptions[1 % wrongOptions.length].text;
    rightBox.textContent = gameState.correctPosition === 'bottom-right' ? correctOption.text : wrongOptions[2 % wrongOptions.length].text;
}

function resetState() {
    document.querySelectorAll('.node').forEach(node => {
        node.classList.remove('correct', 'wrong', 'disabled', 'neutral');
        node.style.pointerEvents = 'auto';
    });

    document.querySelectorAll('.answer-box').forEach(box => {
        box.classList.remove('correct', 'wrong');
    });
}

// ==================== NODE INTERACTION ====================
function handleNodeClick(node) {
    const clickedPosition = node.getAttribute('data-position');

    document.querySelectorAll('.node').forEach(n => {
        n.classList.add('disabled');
        n.style.pointerEvents = 'none';
    });

    const scoreMap = POSITION_SCORES[gameState.correctPosition];
    const points = scoreMap[clickedPosition];

    const isExactCorrect = (points === 3);
    const isDontKnow = (clickedPosition === 'center');

    if (isExactCorrect) {
        gameState.correctAnswers++;
    } else if (!isDontKnow) {
        gameState.wrongAnswers++;
    }

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

    highlightAnswerBoxes(clickedPosition);

    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

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
    // Find which box corresponds to clicked position
    let clickedBoxId = null;
    if (clickedPosition === 'top' || clickedPosition === 'top-left' || clickedPosition === 'top-right') {
        clickedBoxId = gameState.answerMapping['top'];
    } else if (clickedPosition === 'bottom-left' || clickedPosition === 'lower-left' || clickedPosition.includes('bottom-left')) {
        clickedBoxId = gameState.answerMapping['bottom-left'];
    } else if (clickedPosition === 'bottom-right' || clickedPosition === 'lower-right' || clickedPosition.includes('bottom-right')) {
        clickedBoxId = gameState.answerMapping['bottom-right'];
    }

    const scoreMap = POSITION_SCORES[gameState.correctPosition];
    const points = scoreMap[clickedPosition];

    if (clickedBoxId && points !== 0) {
        const clickedBox = document.getElementById(clickedBoxId);
        if (points > 0) {
            clickedBox.classList.add('correct');
        } else {
            clickedBox.classList.add('wrong');
        }
    }

    // Highlight correct box
    const correctBoxId = gameState.answerMapping[gameState.correctPosition];
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

console.log('App.js loaded - Simple stable version!');
