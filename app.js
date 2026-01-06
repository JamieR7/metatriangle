// SEHS Triangle Quiz - Rebuilt to match original interaction
// Simple click on answer buttons, no confidence selection needed

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
    currentAssignment: null
};

// Difficulty settings
const DIFFICULTY_SETTINGS = {
    pro: { 
        funnyFrequency: 0, 
        displayName: 'Pro'
    },
    varsity: { 
        funnyFrequency: 0.2, 
        displayName: 'Varsity'
    },
    rookie: { 
        funnyFrequency: 0.5, 
        displayName: 'Rookie'
    }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEHS Triangle Quiz loaded!');
    console.log('Questions available:', QUESTIONS_DB.length);
    showScreen('difficulty-screen');

    // Difficulty card click handlers
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', function() {
            const difficulty = this.dataset.difficulty;
            startQuiz(difficulty);
        });
    });

    // Answer button click handlers
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            handleButtonClick(this);
        });
    });

    // Quit button
    document.getElementById('quit-btn').addEventListener('click', quitQuiz);

    // Results buttons
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

    // Select 10 random questions
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

    // Update UI
    document.getElementById('question-topic').textContent = question.topic;
    document.getElementById('question-level').textContent = question.level;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = gameState.currentQuestionIndex + 1;
    document.getElementById('score').textContent = gameState.score;

    // Prepare options based on difficulty
    const options = prepareOptions(question);
    const assignment = randomlyAssignOptions(options);
    gameState.currentAssignment = assignment;

    displayOptions(assignment);
    resetButtons();
}

function prepareOptions(question) {
    // Always include the two serious wrong answers and the correct answer
    const options = [
        { key: 'i', text: question.options.i, isCorrect: false },
        { key: 'ii', text: question.options.ii, isCorrect: false },
        { key: 'iii', text: question.options.iii, isCorrect: true }
    ];

    // Determine if funny answer should be included based on difficulty
    const funnyFrequency = DIFFICULTY_SETTINGS[gameState.difficulty].funnyFrequency;
    const includeFunny = Math.random() < funnyFrequency;

    if (includeFunny) {
        // Include the funny answer (option iv)
        options.push({ key: 'iv', text: question.options.iv, isCorrect: false, isFunny: true });
    } else {
        // Duplicate one of the serious wrong answers
        options.push({ ...options[0] });
    }

    return options;
}

function randomlyAssignOptions(options) {
    // Shuffle the options
    const shuffled = shuffleArray([...options]);

    // Assign to positions A, B, C (3 options displayed)
    const assignment = {
        A: shuffled[0],
        B: shuffled[1],
        C: shuffled[2]
    };

    // Find which position has the correct answer
    gameState.correctPosition = Object.keys(assignment).find(
        key => assignment[key].isCorrect
    );

    return assignment;
}

function displayOptions(assignment) {
    ['A', 'B', 'C'].forEach(position => {
        const btn = document.getElementById(`btn-${position}`);
        const label = btn.querySelector('.answer-label');
        const text = btn.querySelector('.answer-text');

        label.textContent = position;
        text.textContent = assignment[position].text;
        btn.className = 'answer-btn';
    });
}

function resetButtons() {
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong', 'disabled');
        btn.disabled = false;
    });

    document.getElementById('feedback').classList.remove('show');
}

// ==================== BUTTON INTERACTION ====================
function handleButtonClick(button) {
    const position = button.dataset.position;
    const isCorrect = position === gameState.correctPosition;

    // Disable all buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });

    let points = 0;

    if (isCorrect) {
        // Correct answer: +3 points
        button.classList.add('correct');
        points = 3;
        gameState.correctAnswers++;
        showFeedback(`Correct! +${points} points`, 'correct');
    } else {
        // Wrong answer: -2 points
        button.classList.add('wrong');
        points = -2;
        gameState.wrongAnswers++;

        // Highlight correct answer
        const correctBtn = document.getElementById(`btn-${gameState.correctPosition}`);
        correctBtn.classList.add('correct');

        showFeedback(`Wrong! ${points} points`, 'wrong');
    }

    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

    // Move to next question after delay
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

console.log('App.js loaded successfully!');
console.log('Simple click interaction - just like the original!');
