// SEHS Triangle Quiz - Fixed Answer Text Display
// Load questions from questions-db.js (assume it's already loaded)

// State Management
let state = {
    difficulty: null,
    questionCount: 10,
    currentQuestionIndex: 0,
    score: 10,
    questions: [],
    selectedAnswer: null,
    selectedConfidence: null,
    correctCount: 0,
    wrongCount: 0
};

// DOM Elements
const difficultyScreen = document.getElementById('difficulty-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-quiz-btn');
const quitBtn = document.getElementById('quit-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const changeDifficultyBtn = document.getElementById('change-difficulty-btn');

// Get questions database - try multiple possible variable names
function getQuestionsDB() {
    return window.questionsDB || window.questions || window.QUESTIONS_DB || [];
}

// Check if questions are loaded
window.addEventListener('DOMContentLoaded', () => {
    const db = getQuestionsDB();
    console.log('SEHS Triangle Quiz loaded!');
    console.log('Questions available:', db.length);

    if (db.length === 0) {
        console.error('⚠️ No questions loaded! Check that questions-db.js is included before app.js');
    }
});

// Difficulty Selection
const difficultyCards = document.querySelectorAll('.difficulty-card');
difficultyCards.forEach(card => {
    card.addEventListener('click', () => {
        difficultyCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.difficulty = card.dataset.difficulty;
    });
});

// Question Count Selection
const countBtns = document.querySelectorAll('.count-btn');
countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        countBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const count = btn.dataset.count;
        state.questionCount = count === 'all' ? 'all' : parseInt(count);
    });
});

// Start Quiz
startBtn.addEventListener('click', () => {
    if (!state.difficulty) {
        alert('Please select a difficulty level!');
        return;
    }

    const db = getQuestionsDB();
    if (db.length === 0) {
        alert('Error: No questions loaded! Make sure questions-db.js is loaded.');
        return;
    }

    startQuiz();
});

function startQuiz() {
    const db = getQuestionsDB();

    // Filter questions by difficulty
    let filteredQuestions = db.filter(q => {
        if (state.difficulty === 'pro') return q.style === 'serious';
        if (state.difficulty === 'varsity') return q.style === 'serious' || q.style === 'mixed';
        return true; // rookie includes all
    });

    // Select random questions
    if (state.questionCount === 'all') {
        state.questions = shuffleArray([...filteredQuestions]);
    } else {
        state.questions = shuffleArray([...filteredQuestions]).slice(0, state.questionCount);
    }

    // Reset state
    state.currentQuestionIndex = 0;
    state.score = 10;
    state.correctCount = 0;
    state.wrongCount = 0;

    // Show quiz screen
    difficultyScreen.classList.remove('active');
    quizScreen.classList.add('active');

    document.getElementById('difficulty-display').textContent = 
        state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1);
    document.getElementById('total-q').textContent = state.questions.length;

    loadQuestion();
}

function loadQuestion() {
    const question = state.questions[state.currentQuestionIndex];

    // Update question info
    document.getElementById('question-topic').textContent = question.topic;
    document.getElementById('question-level').textContent = question.level;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = state.currentQuestionIndex + 1;
    document.getElementById('score').textContent = state.score;

    // Shuffle answers
    const answers = shuffleArray([
        { letter: 'A', text: question.A, correct: question.correct === 'A' },
        { letter: 'B', text: question.B, correct: question.correct === 'B' },
        { letter: 'C', text: question.C, correct: question.correct === 'C' }
    ]);

    // Set answer buttons - IMPORTANT: Set text content properly
    answers.forEach(answer => {
        const btn = document.getElementById(`btn-${answer.letter}`);
        const textSpan = document.getElementById(`answer-text-${answer.letter}`);

        // Set the text content
        if (textSpan) {
            textSpan.textContent = answer.text;
        }

        btn.dataset.correct = answer.correct;
        btn.classList.remove('correct', 'wrong', 'disabled');
        btn.onclick = () => selectAnswer(answer.letter);
    });

    // Reset triangle
    document.querySelectorAll('.conf-circle').forEach(circle => {
        circle.classList.remove('selected', 'disabled');
    });

    // Reset state
    state.selectedAnswer = null;
    state.selectedConfidence = null;
    nextBtn.classList.remove('show');
}

function selectAnswer(letter) {
    if (state.selectedAnswer) return; // Already answered

    state.selectedAnswer = letter;

    // Disable answer buttons
    ['A', 'B', 'C'].forEach(l => {
        const btn = document.getElementById(`btn-${l}`);
        btn.classList.add('disabled');

        // Show correct answer with GREEN background
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        }
        // Show wrong answer if selected
        if (l === letter && btn.dataset.correct !== 'true') {
            btn.classList.add('wrong');
        }
    });

    // Enable triangle
    document.querySelectorAll('.conf-circle').forEach(circle => {
        circle.style.cursor = 'pointer';
    });
}

// Triangle Confidence Selection
document.querySelectorAll('.conf-circle').forEach(circle => {
    circle.addEventListener('click', () => {
        if (!state.selectedAnswer || state.selectedConfidence) return;

        state.selectedConfidence = circle;
        circle.classList.add('selected');

        // Disable all circles
        document.querySelectorAll('.conf-circle').forEach(c => {
            c.classList.add('disabled');
        });

        calculateScore(circle);
    });
});

function calculateScore(circle) {
    const isCorrect = document.getElementById(`btn-${state.selectedAnswer}`).dataset.correct === 'true';
    const position = circle.dataset.position;
    const side = circle.dataset.side;
    const level = circle.dataset.level;

    let points = 0;
    let pointsText = '';
    let pointsClass = 'neutral';

    if (isCorrect) {
        // CORRECT ANSWER
        if (position === state.selectedAnswer) {
            // Perfect! On correct corner
            points = 3;
            pointsText = '+3 points';
            pointsClass = 'positive';
        } else if (position === 'center') {
            // Center = no confidence
            points = 0;
            pointsText = '0 points';
            pointsClass = 'neutral';
        } else if (side && side.includes(state.selectedAnswer)) {
            // On a side connected to correct answer
            if (level === 'close-A' && state.selectedAnswer === 'A') {
                points = 2;
            } else if (level === 'close-B' && state.selectedAnswer === 'B') {
                points = 2;
            } else if (level === 'close-C' && state.selectedAnswer === 'C') {
                points = 2;
            } else if (level === 'equal') {
                points = 1;
            } else if (level === 'base') {
                points = 1;
            } else {
                points = 1; // Close to other answer
            }
            pointsText = `+${points} ${points === 1 ? 'point' : 'points'}`;
            pointsClass = 'positive';
        } else {
            // Wrong corner when correct
            points = -1;
            pointsText = '-1 point';
            pointsClass = 'negative';
        }
        state.correctCount++;
    } else {
        // WRONG ANSWER
        if (position === state.selectedAnswer) {
            // Confidently wrong
            points = -2;
            pointsText = '-2 points';
            pointsClass = 'negative';
        } else if (position === 'center') {
            // No confidence, good!
            points = 0;
            pointsText = '0 points';
            pointsClass = 'neutral';
        } else {
            // Away from wrong answer = good doubt!
            // Find correct answer
            let correctAnswer = null;
            ['A', 'B', 'C'].forEach(l => {
                if (document.getElementById(`btn-${l}`).dataset.correct === 'true') {
                    correctAnswer = l;
                }
            });

            if (position === correctAnswer) {
                // Picked wrong answer but confidence on right one
                points = 2;
                pointsText = '+2 points (good instinct!)';
                pointsClass = 'positive';
            } else if (side && side.includes(correctAnswer)) {
                // Leaning toward correct
                points = 1;
                pointsText = '+1 point';
                pointsClass = 'positive';
            } else {
                // Away from your wrong answer
                points = 1;
                pointsText = '+1 point (showing doubt)';
                pointsClass = 'positive';
            }
        }
        state.wrongCount++;
    }

    state.score += points;

    // Display points
    const pointsDisplay = document.getElementById('points-display');
    pointsDisplay.querySelector('#points-text').textContent = pointsText;
    pointsDisplay.className = `points-display show ${pointsClass}`;

    setTimeout(() => {
        pointsDisplay.classList.remove('show');
    }, 2000);

    // Update score display
    document.getElementById('score').textContent = state.score;

    // Show next button
    nextBtn.classList.add('show');
}

// Next Question
nextBtn.addEventListener('click', () => {
    state.currentQuestionIndex++;

    if (state.currentQuestionIndex >= state.questions.length) {
        showResults();
    } else {
        loadQuestion();
    }
});

// Show Results
function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    document.getElementById('final-score').textContent = state.score;
    document.getElementById('correct-count').textContent = state.correctCount;
    document.getElementById('wrong-count').textContent = state.wrongCount;

    const accuracy = Math.round((state.correctCount / state.questions.length) * 100);
    document.getElementById('accuracy').textContent = accuracy + '%';

    // Performance message
    let message = '';
    if (accuracy >= 90) message = '🏆 Outstanding!';
    else if (accuracy >= 80) message = '💪 Great Job!';
    else if (accuracy >= 70) message = '👍 Well Done!';
    else if (accuracy >= 60) message = '📚 Keep Practicing!';
    else message = '💡 Review and Try Again!';

    document.getElementById('performance-message').textContent = message;
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
    resultsScreen.classList.remove('active');
    startQuiz();
});

// Change Difficulty
changeDifficultyBtn.addEventListener('click', () => {
    resultsScreen.classList.remove('active');
    difficultyScreen.classList.add('active');
});

// Quit Quiz
quitBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to quit?')) {
        quizScreen.classList.remove('active');
        difficultyScreen.classList.add('active');
    }
});

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
