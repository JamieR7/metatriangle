// SEHS Triangle Quiz - Position-Based Confidence Scoring

// ==================== GLOBAL STATE ====================
let gameState = {
    difficulty: 'rookie',
    currentQuestionIndex: 0,
    score: 10,
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    selectedQuestions: [],
    currentQuestion: null,
    correctPosition: null,
    currentAssignment: null,
    selectedCircle: null
};

// Difficulty settings
const DIFFICULTY_SETTINGS = {
    pro: { funnyFrequency: 0, displayName: 'Pro' },
    varsity: { funnyFrequency: 0.2, displayName: 'Varsity' },
    rookie: { funnyFrequency: 0.5, displayName: 'Rookie' }
};

// ==================== POSITION-BASED SCORING ====================
function calculatePoints(circleElement, correctAnswer) {
    const position = circleElement.dataset.position;
    const side = circleElement.dataset.side;
    const level = circleElement.dataset.level;

    console.log('Calculating points:', { position, side, level, correctAnswer });

    // CENTER - always 0
    if (position === 'center') {
        return 0;
    }

    // CORNERS
    if (position) {
        return position === correctAnswer ? 3 : -2;
    }

    // SIDE CIRCLES
    if (side && level) {
        if (level === 'base') {
            return -2;
        }

        if (side === 'AB') {
            if (correctAnswer === 'A') {
                if (level === 'close-A') return 2;
                if (level === 'equal') return 1;
                if (level === 'close-B') return -1;
            } else if (correctAnswer === 'B') {
                if (level === 'close-B') return 2;
                if (level === 'equal') return 1;
                if (level === 'close-A') return -1;
            } else {
                return -2;
            }
        }

        if (side === 'AC') {
            if (correctAnswer === 'A') {
                if (level === 'close-A') return 2;
                if (level === 'equal') return 1;
                if (level === 'close-C') return -1;
            } else if (correctAnswer === 'C') {
                if (level === 'close-C') return 2;
                if (level === 'equal') return 1;
                if (level === 'close-A') return -1;
            } else {
                return -2;
            }
        }

        if (side === 'BC') {
            return -2;
        }
    }

    return 0;
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEHS Triangle Quiz loaded!');
    console.log('Questions available:', QUESTIONS_DB.length);
    showScreen('difficulty-screen');

    // Difficulty selection
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', function() {
            startQuiz(this.dataset.difficulty);
        });
    });

    // Confidence circles
    document.querySelectorAll('.conf-circle').forEach(circle => {
        circle.addEventListener('click', function(e) {
            e.stopPropagation();
            selectCircle(this);
        });
    });

    // Answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            console.log('Answer button clicked:', this.dataset.position);
            handleAnswerClick(this);
        });
    });

    // Next button
    document.getElementById('next-btn').addEventListener('click', nextQuestion);

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
    gameState.score = 10;
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
    gameState.selectedCircle = null;

    document.getElementById('question-topic').textContent = question.topic;
    document.getElementById('question-level').textContent = question.level;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = gameState.currentQuestionIndex + 1;
    document.getElementById('score').textContent = gameState.score;

    const options = prepareOptions(question);
    const assignment = randomlyAssignOptions(options);
    gameState.currentAssignment = assignment;

    displayOptions(assignment);
    resetUI();

    console.log('Question loaded. Correct answer:', gameState.correctPosition);
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
        btn.disabled = false;
    });
}

function resetUI() {
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong', 'disabled');
        btn.disabled = false;
    });

    document.querySelectorAll('.conf-circle').forEach(circle => {
        circle.classList.remove('selected', 'disabled');
    });

    document.getElementById('points-display').classList.remove('show', 'positive', 'negative', 'neutral');
    document.getElementById('next-btn').classList.remove('show');
}

// ==================== CIRCLE SELECTION ====================
function selectCircle(circle) {
    document.querySelectorAll('.conf-circle').forEach(c => {
        c.classList.remove('selected');
    });

    circle.classList.add('selected');
    gameState.selectedCircle = circle;

    console.log('Circle selected:', circle.dataset);
}

// ==================== ANSWER SELECTION ====================
function handleAnswerClick(button) {
    console.log('handleAnswerClick called');
    console.log('Selected circle:', gameState.selectedCircle);

    if (!gameState.selectedCircle) {
        alert('⚠️ Please select your confidence level on the triangle first!');
        return;
    }

    // Check if already answered
    if (button.classList.contains('disabled')) {
        console.log('Button already disabled');
        return;
    }

    const position = button.dataset.position;
    const isCorrect = position === gameState.correctPosition;

    console.log('Answer:', position, 'Correct:', gameState.correctPosition, 'Is correct:', isCorrect);

    // Calculate points
    const points = calculatePoints(gameState.selectedCircle, gameState.correctPosition);
    console.log('Points earned:', points);

    // Update score
    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

    if (isCorrect) {
        gameState.correctAnswers++;
        button.classList.add('correct');
    } else {
        gameState.wrongAnswers++;
        button.classList.add('wrong');

        const correctBtn = document.getElementById(`btn-${gameState.correctPosition}`);
        correctBtn.classList.add('correct');
    }

    // Disable all
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });

    document.querySelectorAll('.conf-circle').forEach(circle => {
        circle.classList.add('disabled');
    });

    showPoints(points);
    document.getElementById('next-btn').classList.add('show');
}

function showPoints(points) {
    const display = document.getElementById('points-display');
    const text = document.getElementById('points-text');

    const sign = points > 0 ? '+' : '';
    text.textContent = `${sign}${points} points`;

    display.classList.remove('positive', 'negative', 'neutral');
    if (points > 0) {
        display.classList.add('positive');
    } else if (points < 0) {
        display.classList.add('negative');
    } else {
        display.classList.add('neutral');
    }

    display.classList.add('show');
}

function nextQuestion() {
    gameState.currentQuestionIndex++;
    loadQuestion();
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

console.log('Position-Based Scoring initialized!');
console.log('Starting score: 10 points');
