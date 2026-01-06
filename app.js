// SEHS Triangle Quiz - Confidence-Based Scoring System
// User must select confidence level THEN answer

// ==================== GLOBAL STATE ====================
let gameState = {
    difficulty: 'rookie',
    currentQuestionIndex: 0,
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    selectedQuestions: [],
    currentQuestion: null,
    correctPosition: null,
    currentAssignment: null,
    selectedConfidence: null  // Track confidence level selected
};

// Difficulty settings
const DIFFICULTY_SETTINGS = {
    pro: { funnyFrequency: 0, displayName: 'Pro' },
    varsity: { funnyFrequency: 0.2, displayName: 'Varsity' },
    rookie: { funnyFrequency: 0.5, displayName: 'Rookie' }
};

// CONFIDENCE-BASED SCORING
const CONFIDENCE_SCORES = {
    5: { correct: 10, wrong: -6, label: '100%' },  // Top row
    4: { correct: 8,  wrong: -4, label: '80%' },   // Row 2
    3: { correct: 6,  wrong: -2, label: '60%' },   // Row 3
    2: { correct: 4,  wrong: -1, label: '40%' },   // Row 4
    1: { correct: 2,  wrong: 0,  label: '20%' }    // Bottom row
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEHS Triangle Quiz - Confidence System loaded!');
    console.log('Questions available:', QUESTIONS_DB.length);
    showScreen('difficulty-screen');

    // Difficulty selection
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', function() {
            startQuiz(this.dataset.difficulty);
        });
    });

    // Confidence circle click handlers
    document.querySelectorAll('.conf-circle').forEach(circle => {
        circle.addEventListener('click', function(e) {
            e.stopPropagation();
            selectConfidence(this);
        });
    });

    // Answer button handlers
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            handleAnswerClick(this);
        });
    });

    // Other buttons
    document.getElementById('quit-btn').addEventListener('click', quitQuiz);
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
    document.getElementById('change-difficulty-btn').addEventListener('click', changeDifficulty);
});

// ==================== SCREEN MANAGEMENT ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ==================== QUIZ START ====================
function startQuiz(difficulty) {
    gameState.difficulty = difficulty;
    gameState.score = 0;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.wrongAnswers = 0;
    gameState.currentQuestionIndex = 0;

    const numQuestions = Math.min(10, QUESTIONS_DB.length);
    gameState.selectedQuestions = shuffleArray([...QUESTIONS_DB]).slice(0, numQuestions);

    document.getElementById('difficulty-display').textContent = 
        DIFFICULTY_SETTINGS[difficulty].displayName;
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
    gameState.selectedConfidence = null;

    // Update UI
    document.getElementById('question-topic').textContent = question.topic;
    document.getElementById('question-level').textContent = question.level;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = gameState.currentQuestionIndex + 1;
    document.getElementById('score').textContent = gameState.score;

    // Prepare and display options
    const options = prepareOptions(question);
    const assignment = randomlyAssignOptions(options);
    gameState.currentAssignment = assignment;

    displayOptions(assignment);
    resetUI();
}

function prepareOptions(question) {
    const options = [
        { key: 'i', text: question.options.i, isCorrect: false },
        { key: 'ii', text: question.options.ii, isCorrect: false },
        { key: 'iii', text: question.options.iii, isCorrect: true }
    ];

    const funnyFrequency = DIFFICULTY_SETTINGS[gameState.difficulty].funnyFrequency;
    const includeFunny = Math.random() < funnyFrequency;

    if (includeFunny) {
        options.push({ key: 'iv', text: question.options.iv, isCorrect: false, isFunny: true });
    } else {
        options.push({ ...options[0] });
    }

    return options;
}

function randomlyAssignOptions(options) {
    const shuffled = shuffleArray([...options]);

    const assignment = {
        A: shuffled[0],
        B: shuffled[1],
        C: shuffled[2]
    };

    gameState.correctPosition = Object.keys(assignment).find(
        key => assignment[key].isCorrect
    );

    return assignment;
}

function displayOptions(assignment) {
    ['A', 'B', 'C'].forEach(position => {
        const btn = document.getElementById(`btn-${position}`);
        const text = btn.querySelector('.answer-text');
        text.textContent = assignment[position].text;
        btn.className = 'answer-btn';
    });
}

function resetUI() {
    // Reset answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong', 'disabled');
        btn.disabled = false;
    });

    // Reset confidence circles
    document.querySelectorAll('.conf-circle').forEach(circle => {
        circle.classList.remove('selected');
    });

    // Hide feedback
    document.getElementById('feedback').classList.remove('show');
}

// ==================== CONFIDENCE SELECTION ====================
function selectConfidence(circle) {
    // Remove previous selection
    document.querySelectorAll('.conf-circle').forEach(c => {
        c.classList.remove('selected');
    });

    // Mark this circle as selected
    circle.classList.add('selected');

    // Store confidence level
    const confidenceLevel = parseInt(circle.dataset.conf);
    gameState.selectedConfidence = confidenceLevel;

    console.log(`Confidence selected: Level ${confidenceLevel} (${CONFIDENCE_SCORES[confidenceLevel].label})`);
}

// ==================== ANSWER SELECTION ====================
function handleAnswerClick(button) {
    // Check if confidence was selected
    if (gameState.selectedConfidence === null) {
        alert('⚠️ Please select your confidence level on the triangle first!');
        return;
    }

    const position = button.dataset.position;
    const isCorrect = position === gameState.correctPosition;

    // Disable all buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });

    // Calculate score based on confidence level
    const confLevel = gameState.selectedConfidence;
    const confScore = CONFIDENCE_SCORES[confLevel];
    let points = 0;

    if (isCorrect) {
        button.classList.add('correct');
        points = confScore.correct;
        gameState.correctAnswers++;
        showFeedback(`✓ Correct! +${points} points (${confScore.label} confidence)`, 'correct');
    } else {
        button.classList.add('wrong');
        points = confScore.wrong;
        gameState.wrongAnswers++;

        // Show correct answer
        const correctBtn = document.getElementById(`btn-${gameState.correctPosition}`);
        correctBtn.classList.add('correct');

        const pointsText = points === 0 ? '0' : points;
        showFeedback(`✗ Wrong! ${pointsText} points (${confScore.label} confidence)`, 'wrong');
    }

    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

    // Next question after delay
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        loadQuestion();
    }, 2500);
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
        message = '🌟 Outstanding! SEHS Expert! 🌟';
    } else if (accuracy >= 70) {
        message = '💪 Great Job! Strong knowledge! 💪';
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

console.log('Confidence-based scoring initialized!');
console.log('Scoring: L5(+10/-6), L4(+8/-4), L3(+6/-2), L2(+4/-1), L1(+2/0)');
