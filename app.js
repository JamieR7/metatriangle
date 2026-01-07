// SEHS Triangle Quiz - Normalize options (supports A/B/C keys, i/ii/iii/iv, 4-option questions)

let state = {
  difficulty: null,
  questionCount: 10,
  currentQuestionIndex: 0,
  score: 10,
  questions: [],
  selectedAnswer: null,
  selectedConfidence: null,
  correctCount: 0,
  wrongCount: 0,
  answerMapping: {} // buttonId -> baseAnswerId (A/B/C)
};

const difficultyScreen = document.getElementById('difficulty-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-quiz-btn');
const quitBtn = document.getElementById('quit-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const changeDifficultyBtn = document.getElementById('change-difficulty-btn');

function getQuestionsDB() {
  return window.questionsDB || window.questions || window.QUESTIONS_DB || [];
}

window.addEventListener('DOMContentLoaded', () => {
  const db = getQuestionsDB();
  console.log('SEHS Triangle Quiz loaded!');
  console.log('Questions available:', db.length);
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

  let filteredQuestions = db.filter(q => {
    if (state.difficulty === 'pro') return q.style === 'serious';
    if (state.difficulty === 'varsity') return q.style === 'serious' || q.style === 'mixed';
    return true;
  });

  if (state.questionCount === 'all') {
    state.questions = shuffleArray([...filteredQuestions]);
  } else {
    state.questions = shuffleArray([...filteredQuestions]).slice(0, state.questionCount);
  }

  state.currentQuestionIndex = 0;
  state.score = 10;
  state.correctCount = 0;
  state.wrongCount = 0;

  difficultyScreen.classList.remove('active');
  quizScreen.classList.add('active');

  document.getElementById('difficulty-display').textContent =
    state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1);
  document.getElementById('total-q').textContent = state.questions.length;

  loadQuestion();
}

// --- NEW: option normalizer ---
function normalizeThreeOptions(question) {
  // Returns: { baseAnswers: [ {id:'A'|'B'|'C', text, isCorrect} ], correctBaseId }

  // 1) Get entries from question.options (object or array) OR from A/B/C on question.
  let entries = [];

  if (question && question.options) {
    if (Array.isArray(question.options)) {
      entries = question.options.map((txt, idx) => [String(idx), txt]);
    } else if (typeof question.options === 'object') {
      entries = Object.entries(question.options);
    }
  } else {
    // fallback
    const possible = [];
    if (question.A) possible.push(['A', question.A]);
    if (question.B) possible.push(['B', question.B]);
    if (question.C) possible.push(['C', question.C]);
    entries = possible;
  }

  // Clean
  entries = entries
    .filter(([k, v]) => typeof v === 'string' && v.trim().length > 0)
    .map(([k, v]) => [String(k), v]);

  // 2) Determine correct key as stored in data (might be 'A' or 'iii' etc.)
  const correctKey = question.correct != null ? String(question.correct) : null;

  // 3) If there are more than 3 options (e.g. i/ii/iii/iv), pick 3 including the correct one.
  let chosen = [];

  const correctEntry = correctKey
    ? entries.find(([k]) => String(k).toLowerCase() === correctKey.toLowerCase())
    : null;

  if (entries.length <= 3) {
    chosen = entries.slice(0, 3);
  } else {
    // Always include correct if we can find it; then add 2 random distractors
    const distractors = entries.filter(([k]) => !correctEntry || String(k) !== String(correctEntry[0]));
    const pickedDistractors = shuffleArray([...distractors]).slice(0, 2);
    chosen = correctEntry ? [correctEntry, ...pickedDistractors] : shuffleArray([...entries]).slice(0, 3);
  }

  // If still short (bad data), pad
  while (chosen.length < 3) chosen.push([`missing-${chosen.length}`, `Option ${chosen.length + 1}`]);

  // 4) Convert to base IDs A/B/C (these are what triangle uses)
  const baseIds = ['A', 'B', 'C'];
  const baseAnswers = chosen.map(([k, text], idx) => {
    const baseId = baseIds[idx];
    const isCorrect = correctEntry ? String(k) === String(correctEntry[0]) : false;
    return { id: baseId, text, isCorrect };
  });

  const correctBase = baseAnswers.find(a => a.isCorrect)?.id || null;

  console.log('Options raw entries:', entries);
  console.log('Correct key in data:', correctKey);
  console.log('Chosen (pre A/B/C mapping):', chosen);
  console.log('Base answers (A/B/C):', baseAnswers);

  return { baseAnswers, correctBaseId: correctBase };
}

function loadQuestion() {
  const question = state.questions[state.currentQuestionIndex];

  document.getElementById('question-topic').textContent = question.topic;
  document.getElementById('question-level').textContent = question.level;
  document.getElementById('question-text').textContent = question.question;
  document.getElementById('current-q').textContent = state.currentQuestionIndex + 1;
  document.getElementById('score').textContent = state.score;

  const { baseAnswers } = normalizeThreeOptions(question);

  // Shuffle the *display* order, but keep base id for triangle scoring
  const shuffledAnswers = shuffleArray([...baseAnswers]);

  const buttonIds = ['A', 'B', 'C'];
  state.answerMapping = {};

  buttonIds.forEach((btnId, index) => {
    const answer = shuffledAnswers[index];
    const btn = document.getElementById(`btn-${btnId}`);
    const textSpan = btn.querySelector('.answer-text');

    // buttonId -> baseAnswerId
    state.answerMapping[btnId] = answer.id;

    // Set text
    if (textSpan) textSpan.textContent = answer.text;

    btn.dataset.correct = answer.isCorrect;
    btn.classList.remove('correct', 'wrong', 'disabled');
    btn.onclick = () => selectAnswer(btnId);

    console.log(`Button ${btnId} shows base ${answer.id}:`, answer.text);
  });

  document.querySelectorAll('.conf-circle').forEach(circle => {
    circle.classList.remove('selected', 'disabled');
    circle.style.cursor = 'default';
  });

  state.selectedAnswer = null;
  state.selectedConfidence = null;
  nextBtn.classList.remove('show');
}

function selectAnswer(buttonId) {
  if (state.selectedAnswer) return;
  state.selectedAnswer = buttonId;

  ['A', 'B', 'C'].forEach(btnId => {
    const btn = document.getElementById(`btn-${btnId}`);
    btn.classList.add('disabled');

    if (btn.dataset.correct === 'true') btn.classList.add('correct');
    if (btnId === buttonId && btn.dataset.correct !== 'true') btn.classList.add('wrong');
  });

  document.querySelectorAll('.conf-circle').forEach(circle => {
    circle.style.cursor = 'pointer';
  });
}

document.querySelectorAll('.conf-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    if (!state.selectedAnswer || state.selectedConfidence) return;

    state.selectedConfidence = circle;
    circle.classList.add('selected');

    document.querySelectorAll('.conf-circle').forEach(c => c.classList.add('disabled'));

    calculateScore(circle);
  });
});

function calculateScore(circle) {
  const selectedBtn = document.getElementById(`btn-${state.selectedAnswer}`);
  const isCorrect = selectedBtn.dataset.correct === 'true';

  // correct base id (A/B/C)
  let correctBaseId = null;
  ['A', 'B', 'C'].forEach(btnId => {
    if (document.getElementById(`btn-${btnId}`).dataset.correct === 'true') {
      correctBaseId = state.answerMapping[btnId];
    }
  });

  const position = circle.dataset.position; // A/B/C/center
  const side = circle.dataset.side;
  const level = circle.dataset.level;

  let points = 0;
  let pointsText = '';
  let pointsClass = 'neutral';

  if (isCorrect) {
    if (position === correctBaseId) {
      points = 3;
      pointsText = '+3 points';
      pointsClass = 'positive';
    } else if (position === 'center') {
      points = 0;
      pointsText = '0 points';
      pointsClass = 'neutral';
    } else if (side && side.includes(correctBaseId)) {
      if (level === 'close-A' && correctBaseId === 'A') points = 2;
      else if (level === 'close-B' && correctBaseId === 'B') points = 2;
      else if (level === 'close-C' && correctBaseId === 'C') points = 2;
      else points = 1;
      pointsText = `+${points} ${points === 1 ? 'point' : 'points'}`;
      pointsClass = 'positive';
    } else {
      points = -1;
      pointsText = '-1 point';
      pointsClass = 'negative';
    }
    state.correctCount++;
  } else {
    const selectedBaseId = state.answerMapping[state.selectedAnswer];

    if (position === selectedBaseId) {
      points = -2;
      pointsText = '-2 points';
      pointsClass = 'negative';
    } else if (position === 'center') {
      points = 0;
      pointsText = '0 points';
      pointsClass = 'neutral';
    } else {
      if (position === correctBaseId) {
        points = 2;
        pointsText = '+2 points (good instinct!)';
        pointsClass = 'positive';
      } else if (side && side.includes(correctBaseId)) {
        points = 1;
        pointsText = '+1 point';
        pointsClass = 'positive';
      } else {
        points = 1;
        pointsText = '+1 point (showing doubt)';
        pointsClass = 'positive';
      }
    }
    state.wrongCount++;
  }

  state.score += points;

  const pointsDisplay = document.getElementById('points-display');
  pointsDisplay.querySelector('#points-text').textContent = pointsText;
  pointsDisplay.className = `points-display show ${pointsClass}`;

  setTimeout(() => pointsDisplay.classList.remove('show'), 2000);

  document.getElementById('score').textContent = state.score;
  nextBtn.classList.add('show');
}

nextBtn.addEventListener('click', () => {
  state.currentQuestionIndex++;

  if (state.currentQuestionIndex >= state.questions.length) showResults();
  else loadQuestion();
});

function showResults() {
  quizScreen.classList.remove('active');
  resultsScreen.classList.add('active');

  document.getElementById('final-score').textContent = state.score;
  document.getElementById('correct-count').textContent = state.correctCount;
  document.getElementById('wrong-count').textContent = state.wrongCount;

  const accuracy = Math.round((state.correctCount / state.questions.length) * 100);
  document.getElementById('accuracy').textContent = accuracy + '%';

  let message = '';
  if (accuracy >= 90) message = '🏆 Outstanding!';
  else if (accuracy >= 80) message = '💪 Great Job!';
  else if (accuracy >= 70) message = '👍 Well Done!';
  else if (accuracy >= 60) message = '📚 Keep Practicing!';
  else message = '💡 Review and Try Again!';

  document.getElementById('performance-message').textContent = message;
}

restartBtn.addEventListener('click', () => {
  resultsScreen.classList.remove('active');
  startQuiz();
});

changeDifficultyBtn.addEventListener('click', () => {
  resultsScreen.classList.remove('active');
  difficultyScreen.classList.add('active');
});

quitBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to quit?')) {
    quizScreen.classList.remove('active');
    difficultyScreen.classList.add('active');
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
