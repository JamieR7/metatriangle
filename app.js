let gameState = {
    difficulty: 'elite',  // elite, varsity, rookie
    currentQuestionIndex: 0,
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    selectedQuestions: [],
    currentQuestion: null,
    correctPosition: null,
    filters: {
        theme: 'all',  // all, A, B, C
        level: 'all'   // all, SL, HL
    }
};

// Difficulty settings for funny answer frequency
const DIFFICULTY_SETTINGS = {
    elite: { funnyFrequency: 0, displayName: 'Elite Athlete' },
    varsity: { funnyFrequency: 0.2, displayName: 'Varsity Player' },
    rookie: { funnyFrequency: 0.5, displayName: 'Rookie Trainee' }
};

// Position mapping for triangle corners
const CORNER_POSITIONS = {
    A: 0,   // Top
    B: 8,   // Bottom left
    C: 12,  // Bottom right
    D: 5    // Center - ALWAYS "I don't know" (0 points)
};

// Points awarded for each position
const POSITION_POINTS = {
    0: 3,   // Top (A)
    1: 2,   2: 2,
    3: 1,   4: 1,
    5: 0,   // Center (D) - "I don't know" - 0 points
    6: -2,  7: -2,
    8: 3,   // Bottom left (B)
    9: 1,   10: -2, 11: 1,
    12: 3   // Bottom right (C)
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEHS Triangle Quiz loaded!');
    console.log(`Questions available: ${QUESTIONS_DB.length}`);
    showScreen('difficulty-screen');
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

    // Filter questions based on user preferences
    let filteredQuestions = QUESTIONS_DB.filter(q => {
        const themeMatch = gameState.filters.theme === 'all' || q.theme === gameState.filters.theme;
        const levelMatch = gameState.filters.level === 'all' || q.level === gameState.filters.level;
        return themeMatch && levelMatch;
    });

    if (filteredQuestions.length === 0) {
        alert('No questions match your filters! Please adjust your selection.');
        return;
    }

    // Randomly select 10 questions (or fewer if not enough available)
    const numQuestions = Math.min(10, filteredQuestions.length);
    gameState.selectedQuestions = shuffleArray(filteredQuestions).slice(0, numQuestions);
    gameState.currentQuestionIndex = 0;

    // Update display
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

    // Update question display
    document.getElementById('question-topic').textContent = question.topic;
    document.getElementById('question-level').textContent = question.level;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = gameState.currentQuestionIndex + 1;
    document.getElementById('score').textContent = gameState.score;

    // Prepare options based on difficulty (only A, B, C - D is always "I don't know")
    const options = prepareOptions(question);

    // Randomly assign options to corners A, B, C (D is always "I don't know")
    const assignment = randomlyAssignOptions(options);
    gameState.currentAssignment = assignment;

    // Update option cards display
    displayOptions(assignment);

    // Reset triangle nodes
    resetTriangle();

    // Update corner labels
    updateCornerLabels(assignment);

    // Hide feedback
    document.getElementById('feedback').classList.remove('show');
}

function prepareOptions(question) {
    // Always include correct answer (option iii)
    const options = [
        { key: 'i', text: question.options.i, isCorrect: false },
        { key: 'ii', text: question.options.ii, isCorrect: false },
        { key: 'iii', text: question.options.iii, isCorrect: true }
    ];

    // Decide whether to include funny answer based on difficulty
    const funnyFrequency = DIFFICULTY_SETTINGS[gameState.difficulty].funnyFrequency;
    const includeFunny = Math.random() < funnyFrequency;

    if (includeFunny) {
        options.push({ key: 'iv', text: question.options.iv, isCorrect: false, isFunny: true });
    } else {
        // If not including funny, duplicate one of the serious wrong answers
        const duplicateIndex = Math.random() < 0.5 ? 0 : 1;  // Randomly choose i or ii
        options.push({ ...options[duplicateIndex], isDuplicate: true });
    }

    return options;
}

function randomlyAssignOptions(options) {
    // Shuffle options for A, B, C
    const shuffled = shuffleArray([...options]);

    // Assign to corners A, B, C (D is always "I don't know")
    const assignment = {
        A: shuffled[0],
        B: shuffled[1],
        C: shuffled[2],
        D: { key: 'd', text: "I don't know", isCorrect: false, isDontKnow: true }
    };

    // Store correct position
    gameState.correctPosition = Object.keys(assignment).find(
        key => assignment[key].isCorrect
    );

    return assignment;
}

function displayOptions(assignment) {
    const corners = ['A', 'B', 'C', 'D'];
    corners.forEach((corner, index) => {
        const optionCard = document.getElementById(`option-${index}`);
        optionCard.querySelector('.option-letter').textContent = corner;
        optionCard.querySelector('.option-text').textContent = assignment[corner].text;
        optionCard.className = 'option-card';  // Reset classes

        // Special styling for "I don't know"
        if (corner === 'D') {
            optionCard.classList.add('dont-know-option');
        }
    });
}

function updateCornerLabels(assignment) {
    const labelMapping = { 'A': 0, 'D': 1, 'B': 2, 'C': 3 };
    Object.keys(labelMapping).forEach(corner => {
        const label = document.getElementById(`label-${labelMapping[corner]}`);
        if (label) {
            label.textContent = corner;
        }
    });
}

// ==================== TRIANGLE INTERACTION ====================
function resetTriangle() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.classList.remove('correct', 'wrong', 'disabled', 'neutral');
        node.style.pointerEvents = 'auto';
    });
}

// Add click event listeners to all nodes
document.addEventListener('DOMContentLoaded', function() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            handleNodeClick(this);
        });
    });
});

function handleNodeClick(node) {
    const position = parseInt(node.getAttribute('data-position'));
    const points = parseInt(node.getAttribute('data-points'));

    // Disable all nodes after click
    document.querySelectorAll('.node').forEach(n => {
        n.classList.add('disabled');
    });

    // Check if answer is correct
    const clickedCorner = getCornerFromPosition(position);
    const isCorrect = clickedCorner === gameState.correctPosition;
    const isDontKnow = clickedCorner === 'D';

    // Update visual feedback
    if (isCorrect) {
        node.classList.add('correct');
        showFeedback(`✓ Correct! +${points} points`, true);
        gameState.correctAnswers++;
    } else if (isDontKnow) {
        node.classList.add('neutral');
        showFeedback(`"I don't know" - No points gained or lost`, 'neutral');
        // Don't count as correct or wrong
    } else {
        node.classList.add('wrong');
        // Also highlight the correct answer
        const correctPosition = CORNER_POSITIONS[gameState.correctPosition];
        const correctNode = document.querySelector(`[data-position="${correctPosition}"]`);
        if (correctNode) {
            correctNode.classList.add('correct');
        }
        showFeedback(`✗ Wrong! ${points} points`, false);
        gameState.wrongAnswers++;
    }

    // Update score
    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

    // Highlight option cards
    highlightOptionCards(isCorrect, clickedCorner, isDontKnow);

    // Move to next question after delay
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        loadQuestion();
    }, 2500);
}

function getCornerFromPosition(position) {
    // Map position back to corner letter
    for (const [corner, pos] of Object.entries(CORNER_POSITIONS)) {
        if (pos === position) {
            return corner;
        }
    }
    return null;
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = 'feedback show';
    if (type === true) {
        feedback.classList.add('correct');
    } else if (type === false) {
        feedback.classList.add('wrong');
    } else if (type === 'neutral') {
        feedback.classList.add('neutral');
    }
}

function highlightOptionCards(isCorrect, clickedCorner, isDontKnow) {
    const corners = ['A', 'B', 'C', 'D'];
    corners.forEach((corner, index) => {
        const card = document.getElementById(`option-${index}`);
        if (corner === gameState.correctPosition) {
            card.classList.add('correct');
        } else if (corner === clickedCorner && !isCorrect && !isDontKnow) {
            card.classList.add('wrong');
        } else if (corner === clickedCorner && isDontKnow) {
            card.classList.add('neutral');
        }
    });
}

// ==================== RESULTS ====================
function showResults() {
    const totalQuestions = gameState.questionsAnswered;
    const accuracy = totalQuestions > 0 
        ? Math.round((gameState.correctAnswers / totalQuestions) * 100) 
        : 0;

    // Update results display
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('correct-count').textContent = gameState.correctAnswers;
    document.getElementById('wrong-count').textContent = gameState.wrongAnswers;
    document.getElementById('accuracy').textContent = accuracy + '%';

    // Performance message
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

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', function(e) {
    // Press 'Q' to quit from quiz screen
    if (e.key === 'q' || e.key === 'Q') {
        if (document.getElementById('quiz-screen').classList.contains('active')) {
            quitQuiz();
        }
    }
});

console.log('App.js loaded successfully!');
console.log('IMPORTANT: Option D is always "I don\'t know" worth 0 points');
