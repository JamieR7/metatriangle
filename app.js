// SEHS Triangle Quiz - Dynamic Gradient Scoring for Any Corner

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
    correctCorner: null,  // A, B, or C
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

// ==================== TRIANGLE POSITION MAPPING ====================
// Maps each node to its corners and scoring
const TRIANGLE_POSITIONS = {
    'top': { corners: ['A'], score: { 'A': 3, 'B': -2, 'C': -2 } },
    'top-left': { corners: ['A', 'B'], score: { 'A': 2, 'B': 2, 'C': -2 } },
    'top-right': { corners: ['A', 'C'], score: { 'A': 2, 'B': -2, 'C': 2 } },
    'mid-left': { corners: ['A', 'B'], score: { 'A': 1, 'B': 1, 'C': -2 } },
    'mid-right': { corners: ['A', 'C'], score: { 'A': 1, 'B': -2, 'C': 1 } },
    'center': { corners: ['D'], score: { 'A': 0, 'B': 0, 'C': 0 } },
    'lower-left': { corners: ['B'], score: { 'A': -1, 'B': 2, 'C': -1 } },
    'lower-right': { corners: ['C'], score: { 'A': -1, 'B': -1, 'C': 2 } },
    'bottom-left': { corners: ['B'], score: { 'A': -2, 'B': 3, 'C': -2 } },
    'bottom-left-mid': { corners: ['B', 'C'], score: { 'A': -2, 'B': 1, 'C': 1 } },
    'bottom-center-left': { corners: ['B', 'C'], score: { 'A': -2, 'B': -1, 'C': -1 } },
    'bottom-center-right': { corners: ['B', 'C'], score: { 'A': -2, 'B': -1, 'C': -1 } },
    'bottom-right-mid': { corners: ['B', 'C'], score: { 'A': -2, 'B': 1, 'C': 1 } },
    'bottom-right': { corners: ['C'], score: { 'A': -2, 'B': -2, 'C': 3 } }
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

    // Randomly assign correct answer to A, B, or C
    const corners = ['A', 'B', 'C'];
    gameState.correctCorner = corners[Math.floor(Math.random() * corners.length)];

    // Prepare and display options
    const options = prepareOptions(question);
    displayOptions(options, gameState.correctCorner);

    // Update triangle labels dynamically
    updateTriangleLabels(gameState.correctCorner);

    resetNodes();
}

function prepareOptions(question) {
    const options = [
        { key: 'i', text: question.options.i, isCorrect: false },
        { key: 'ii', text: question.options.ii, isCorrect: false },
        { key: 'iii', text: question.options.iii, isCorrect: true }
    ];

    const funnyFrequency = DIFFICULTY_SETTINGS[gameState.difficulty].funnyFrequency;
    const includeFunny = Math.random() < funnyFrequency;

    if (includeFunny && question.options.iv) {
        options.push({ key: 'iv', text: question.options.iv, isCorrect: false, isFunny: true });
    } else {
        options.push({ ...options[0] });
    }

    return shuffleArray(options);
}

function displayOptions(options, correctCorner) {
    const correctOption = options.find(opt => opt.isCorrect);
    const wrongOptions = options.filter(opt => !opt.isCorrect);

    // Assign to corners based on which is correct
    const assignments = {
        'A': correctCorner === 'A' ? correctOption.text : wrongOptions[0].text,
        'B': correctCorner === 'B' ? correctOption.text : wrongOptions[1 % wrongOptions.length].text,
        'C': correctCorner === 'C' ? correctOption.text : wrongOptions[2 % wrongOptions.length].text,
        'D': "I don't know"
    };

    document.getElementById('option-A').querySelector('.option-text').textContent = assignments['A'];
    document.getElementById('option-B').querySelector('.option-text').textContent = assignments['B'];
    document.getElementById('option-C').querySelector('.option-text').textContent = assignments['C'];
    document.getElementById('option-D').querySelector('.option-text').textContent = assignments['D'];

    // Reset classes
    document.querySelectorAll('.option-box').forEach(box => {
        box.className = 'option-box';
    });
    document.getElementById('option-D').classList.add('dont-know-box');
}

function updateTriangleLabels(correctCorner) {
    // Define label mappings based on correct corner
    const labelMaps = {
        'A': {
            'top': 'A',
            'top-left': 'A>B',
            'top-right': 'A>C',
            'mid-left': 'A=B',
            'mid-right': 'A=C',
            'center': '?',
            'lower-left': 'B>A',
            'lower-right': 'C>A',
            'bottom-left': 'B',
            'bottom-left-mid': 'B>C',
            'bottom-center-left': 'B=C',
            'bottom-center-right': 'C>B',
            'bottom-right-mid': 'C<B',
            'bottom-right': 'C'
        },
        'B': {
            'top': 'A',
            'top-left': 'A>B',
            'top-right': 'A>C',
            'mid-left': 'B>A',
            'mid-right': 'A=C',
            'center': '?',
            'lower-left': 'B>C',
            'lower-right': 'C>A',
            'bottom-left': 'B',
            'bottom-left-mid': 'B=C',
            'bottom-center-left': 'B<C',
            'bottom-center-right': 'C>B',
            'bottom-right-mid': 'C=B',
            'bottom-right': 'C'
        },
        'C': {
            'top': 'A',
            'top-left': 'A>B',
            'top-right': 'C>A',
            'mid-left': 'A=B',
            'mid-right': 'C=A',
            'center': '?',
            'lower-left': 'B>A',
            'lower-right': 'C>B',
            'bottom-left': 'B',
            'bottom-left-mid': 'B>C',
            'bottom-center-left': 'B=C',
            'bottom-center-right': 'C>B',
            'bottom-right-mid': 'C=B',
            'bottom-right': 'C'
        }
    };

    const labels = labelMaps[correctCorner];

    // Update each label in the SVG
    Object.keys(labels).forEach(position => {
        const labelElement = document.querySelector(`text[data-position="${position}"]`);
        if (labelElement) {
            labelElement.textContent = labels[position];
        }
    });
}

function resetNodes() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.classList.remove('correct', 'wrong', 'disabled', 'neutral', 'wiggle');
        node.style.pointerEvents = 'auto';
    });
}

// ==================== NODE INTERACTION ====================
function handleNodeClick(node) {
    const position = node.getAttribute('data-position');

    if (!TRIANGLE_POSITIONS[position]) {
        console.error('Unknown position:', position);
        return;
    }

    // Disable all nodes
    document.querySelectorAll('.node').forEach(n => {
        n.classList.add('disabled');
        n.style.pointerEvents = 'none';
    });

    // Calculate points based on position and correct corner
    const points = TRIANGLE_POSITIONS[position].score[gameState.correctCorner];

    // Determine if exact correct (only the exact corner position at +3)
    const isExactCorrect = (points === 3);
    const isDontKnow = (position === 'center');

    if (isExactCorrect) {
        gameState.correctAnswers++;
    } else if (!isDontKnow) {
        gameState.wrongAnswers++;
    }

    // Visual feedback
    if (points > 0) {
        node.classList.add('correct');
        showFeedback(`+${points} point${points !== 1 ? 's' : ''}!`, 'correct');
    } else if (points === 0) {
        node.classList.add('neutral');
        showFeedback('No points', 'neutral');
    } else {
        node.classList.add('wrong', 'wiggle');
        showFeedback(`${points} points`, 'wrong');
        highlightCorrectNode();
    }

    // Update score
    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

    // Highlight option boxes
    highlightOptionBox(TRIANGLE_POSITIONS[position].corners[0], points);

    // Move to next question
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        loadQuestion();
    }, 2500);
}

function highlightCorrectNode() {
    // Find and highlight the correct corner node
    const correctPositions = {
        'A': 'top',
        'B': 'bottom-left',
        'C': 'bottom-right'
    };

    const correctPos = correctPositions[gameState.correctCorner];
    const correctNode = document.querySelector(`[data-position="${correctPos}"]`);
    if (correctNode) {
        correctNode.classList.add('correct');
    }
}

function highlightOptionBox(clickedCorner, points) {
    if (!clickedCorner) return;

    const box = document.getElementById(`option-${clickedCorner}`);
    if (box) {
        if (points > 0) {
            box.classList.add('correct');
        } else if (points === 0) {
            box.classList.add('neutral');
        } else {
            box.classList.add('wrong');
        }
    }

    // Also highlight correct box if wrong was selected
    if (points < 0) {
        const correctBox = document.getElementById(`option-${gameState.correctCorner}`);
        if (correctBox) {
            correctBox.classList.add('correct');
        }
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

console.log('App.js loaded with dynamic gradient scoring!');
console.log('Works for A, B, or C being correct');
