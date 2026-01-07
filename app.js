// SEHS Triangle Quiz - With Theme Filter & Question Count
// ALL circles automatically score when clicked

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
    questionReady: false,
    selectedTopics: [],
    selectedTheme: 'all',  // NEW: Theme filter
    questionCount: 10      // NEW: Number of questions
};

// Difficulty settings
const DIFFICULTY_SETTINGS = {
    pro: { funnyFrequency: 0, displayName: 'Pro' },
    varsity: { funnyFrequency: 0.2, displayName: 'Varsity' },
    rookie: { funnyFrequency: 0.5, displayName: 'Rookie' }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEHS Triangle Quiz loaded!');
    console.log('Questions available:', QUESTIONS_DB.length);
    showScreen('difficulty-screen');

    // Difficulty selection
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.addEventListener('click', function() {
            selectDifficulty(this.dataset.difficulty);
        });
    });

    // Theme selection
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            gameState.selectedTheme = this.dataset.theme;
            updateTopicList();
        });
    });

    // Question count selection
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const count = this.dataset.count;
            gameState.questionCount = count === 'all' ? 999 : parseInt(count);
        });
    });

    // Topic controls
    document.getElementById('select-all-btn').addEventListener('click', selectAllTopics);
    document.getElementById('deselect-all-btn').addEventListener('click', deselectAllTopics);
    document.getElementById('back-to-difficulty-btn').addEventListener('click', () => showScreen('difficulty-screen'));
    document.getElementById('start-quiz-btn').addEventListener('click', startQuizWithTopics);

    // Circle clicks
    document.querySelectorAll('.conf-circle').forEach(circle => {
        circle.addEventListener('click', function(e) {
            e.stopPropagation();
            handleCircleClick(this);
        });
    });

    // Navigation
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('alert-ok-btn').addEventListener('click', hideCustomAlert);
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

// ==================== DIFFICULTY SELECTION ====================
function selectDifficulty(difficulty) {
    gameState.difficulty = difficulty;
    updateTopicList();
    showScreen('topic-screen');
}

// ==================== TOPIC SELECTION ====================
function updateTopicList() {
    const topicList = document.getElementById('topic-list');
    topicList.innerHTML = '';

    // Filter topics based on selected theme
    let filteredTopics = ALL_TOPICS;

    if (gameState.selectedTheme !== 'all') {
        // Get questions for selected theme
        const themeQuestions = QUESTIONS_DB.filter(q => q.id.startsWith('Q' + gameState.selectedTheme));
        const themeTopicSet = new Set(themeQuestions.map(q => q.topic));
        filteredTopics = ALL_TOPICS.filter(t => themeTopicSet.has(t));
    }

    filteredTopics.forEach(topic => {
        const checkbox = document.createElement('label');
        checkbox.className = 'topic-checkbox';
        checkbox.innerHTML = `
            <input type="checkbox" value="${topic}" checked>
            <span>${topic}</span>
        `;
        topicList.appendChild(checkbox);
    });
}

function selectAllTopics() {
    document.querySelectorAll('#topic-list input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });
}

function deselectAllTopics() {
    document.querySelectorAll('#topic-list input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
}

function getSelectedTopics() {
    const selected = [];
    document.querySelectorAll('#topic-list input[type="checkbox"]:checked').forEach(cb => {
        selected.push(cb.value);
    });
    return selected;
}

function startQuizWithTopics() {
    const selected = getSelectedTopics();

    if (selected.length === 0) {
        document.getElementById('topic-warning').style.display = 'block';
        return;
    }

    document.getElementById('topic-warning').style.display = 'none';
    gameState.selectedTopics = selected;
    startQuiz();
}

// ==================== QUIZ START ====================
function startQuiz() {
    gameState.score = 10;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.wrongAnswers = 0;
    gameState.currentQuestionIndex = 0;

    // Filter by theme if not "all"
    let availableQuestions = QUESTIONS_DB;

    if (gameState.selectedTheme !== 'all') {
        // Theme A = Q001-Q110, Theme B = Q111-Q200, Theme C = Q201-Q300
        const themeRanges = {
            'A': (q) => q.id >= 'Q001' && q.id <= 'Q110',
            'B': (q) => q.id >= 'Q111' && q.id <= 'Q200',
            'C': (q) => q.id >= 'Q201' && q.id <= 'Q300'
        };

        availableQuestions = QUESTIONS_DB.filter(themeRanges[gameState.selectedTheme]);
    }

    // Filter by selected topics
    const filteredQuestions = availableQuestions.filter(q => 
        gameState.selectedTopics.includes(q.topic)
    );

    console.log(`Filtered to ${filteredQuestions.length} questions`);

    const numQuestions = Math.min(gameState.questionCount, filteredQuestions.length);
    gameState.selectedQuestions = shuffleArray([...filteredQuestions]).slice(0, numQuestions);

    document.getElementById('difficulty-display').textContent = DIFFICULTY_SETTINGS[gameState.difficulty].displayName;
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

    gameState.questionReady = false;

    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    gameState.currentQuestion = question;

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

    gameState.questionReady = true;
    console.log('Question ready. Correct answer at position:', gameState.correctPosition);
}

function prepareOptions(question) {
    // Option 'iii' is ALWAYS the correct answer
    const options = [
        { key: 'i', text: question.options.i, isCorrect: false },
        { key: 'ii', text: question.options.ii, isCorrect: false },
        { key: 'iii', text: question.options.iii, isCorrect: true }
    ];

    const funnyFrequency = DIFFICULTY_SETTINGS[gameState.difficulty].funnyFrequency;
    const includeFunny = Math.random() < funnyFrequency;

    if (includeFunny && question.options.iv) {
        options.push({ key: 'iv', text: question.options.iv, isCorrect: false, isFunny: true });
    }

    return options;
}

function randomlyAssignOptions(options) {
    const correctOption = options.find(opt => opt.isCorrect);
    const wrongOptions = options.filter(opt => !opt.isCorrect);

    const shuffledWrong = shuffleArray([...wrongOptions]).slice(0, 2);
    const finalOptions = shuffleArray([correctOption, ...shuffledWrong]);

    const assignment = {
        A: finalOptions[0],
        B: finalOptions[1],
        C: finalOptions[2]
    };

    gameState.correctPosition = null;
    for (const [pos, option] of Object.entries(assignment)) {
        if (option.isCorrect) {
            gameState.correctPosition = pos;
            break;
        }
    }

    return assignment;
}

function displayOptions(assignment) {
    ['A', 'B', 'C'].forEach(position => {
        const btn = document.getElementById('btn-' + position);
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

// ==================== CIRCLE CLICK HANDLING ====================
function getAnswerFromCircle(circleElement) {
    const position = circleElement.dataset.position;
    const side = circleElement.dataset.side;
    const level = circleElement.dataset.level;

    if (position && position !== 'center') {
        return position;
    }

    if (position === 'center') {
        const options = ['A', 'B', 'C'];
        return options[Math.floor(Math.random() * options.length)];
    }

    if (side && level) {
        if (side === 'AB') {
            if (level === 'close-A' || level === 'equal') return 'A';
            if (level === 'close-B') return 'B';
        }

        if (side === 'AC') {
            if (level === 'close-A' || level === 'equal') return 'A';
            if (level === 'close-C') return 'C';
        }

        if (side === 'BC' && level === 'base') {
            const cx = parseFloat(circleElement.getAttribute('cx'));
            return cx < 300 ? 'B' : 'C';
        }
    }

    return 'A';
}

function calculatePoints(circleElement, correctAnswer) {
    const position = circleElement.dataset.position;
    const side = circleElement.dataset.side;
    const level = circleElement.dataset.level;

    if (position === 'center') return 0;

    if (position) {
        return position === correctAnswer ? 3 : -2;
    }

    if (side && level) {
        if (level === 'base') return -2;

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

        if (side === 'BC') return -2;
    }

    return 0;
}

function handleCircleClick(circle) {
    if (!gameState.questionReady || circle.classList.contains('disabled')) {
        return;
    }

    document.querySelectorAll('.conf-circle').forEach(c => {
        c.classList.remove('selected');
    });
    circle.classList.add('selected');

    const chosenAnswer = getAnswerFromCircle(circle);
    processAnswer(chosenAnswer, circle);
}

function processAnswer(chosenAnswer, circle) {
    if (!gameState.correctPosition) {
        console.error('ERROR: correctPosition is null');
        return;
    }

    const isCorrect = chosenAnswer === gameState.correctPosition;
    const points = calculatePoints(circle, gameState.correctPosition);

    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
    gameState.questionsAnswered++;

    const chosenBtn = document.getElementById('btn-' + chosenAnswer);
    const correctBtn = document.getElementById('btn-' + gameState.correctPosition);

    if (isCorrect) {
        gameState.correctAnswers++;
        chosenBtn.classList.add('correct');
    } else {
        gameState.wrongAnswers++;
        if (chosenBtn !== correctBtn) {
            chosenBtn.classList.add('wrong');
        }
        correctBtn.classList.add('correct');
    }

    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });

    document.querySelectorAll('.conf-circle').forEach(c => {
        c.classList.add('disabled');
    });

    showPoints(points);
    document.getElementById('next-btn').classList.add('show');
}

function showPoints(points) {
    const display = document.getElementById('points-display');
    const text = document.getElementById('points-text');

    const sign = points > 0 ? '+' : '';
    text.textContent = sign + points + ' points';

    display.classList.remove('positive', 'negative', 'neutral');
    if (points > 0) {
        display.classList.add('positive');
    } else if (points < 0) {
        display.classList.add('negative');
    } else {
        display.classList.add('neutral');
    }

    display.classList.add('show');

    setTimeout(() => {
        display.classList.remove('show');
    }, 1500);
}

function nextQuestion() {
    gameState.currentQuestionIndex++;
    loadQuestion();
}

// ==================== RESULTS ====================
function showResults() {
    const totalQuestions = gameState.questionsAnswered;
    const accuracy = totalQuestions > 0 ? Math.round((gameState.correctAnswers / totalQuestions) * 100) : 0;

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
    startQuiz();
}

function changeDifficulty() {
    showScreen('difficulty-screen');
}

function quitQuiz() {
    if (confirm('Quit? Your progress will be lost.')) {
        showScreen('topic-screen');
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showCustomAlert() {
    document.getElementById('custom-alert').classList.add('show');
}

function hideCustomAlert() {
    document.getElementById('custom-alert').classList.remove('show');
}

console.log('SEHS Triangle Quiz - Theme filter & question count added!');
