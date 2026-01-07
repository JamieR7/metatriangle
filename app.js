// SEHS Triangle Quiz — triangle-only answering

let state = {
  difficulty: null,          // rookie | varsity | pro
  questionCount: 10,         // number | "all"
  currentQuestionIndex: 0,
  score: 10,

  questions: [],
  correctSlot: null,         // 'A' | 'B' | 'C'
  locked: false,

  correctCount: 0,           // "positive picks" (pts > 0)
  wrongCount: 0              // "non-positive picks" (pts <= 0)
};

function getQuestionsDB() {
  return window.questionsDB || window.questions || window.QUESTIONS_DB || [];
}

const SCORE = {
  A: { A: 3, B: -2, C: -2 },
  B: { A: -2, B: 3, C: -2 },
  C: { A: -2, B: -2, C: 3 },

  AB_closeA: { A: 2, B: -1, C: -2 },
  AB_equal:  { A: 1, B:  1, C: -2 },
  AB_closeB: { A: -1, B: 2, C: -2 },

  AC_closeA: { A: 2, B: -2, C: -1 },
  AC_equal:  { A: 1, B: -2, C:  1 },
  AC_closeC: { A: -1, B: -2, C: 2 },

  BC_closeB: { A: -2, B: 2, C: -1 },
  BC_equal:  { A: -2, B: 1, C:  1 },
  BC_closeC: { A: -2, B: -1, C: 2 },

  center:    { A: 0, B: 0, C: 0 }
};

const difficultyScreen = document.getElementById('difficulty-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-quiz-btn');
const quitBtn = document.getElementById('quit-btn');
const nextBtn = document.getElementById('next-btn');

const restartBtn = document.getElementById('restart-btn');
const changeDifficultyBtn = document.getElementById('change-difficulty-btn');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showScreen(which) {
  [difficultyScreen, quizScreen, resultsScreen].forEach(s => s.classList.remove('active'));
  which.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
  const db = getQuestionsDB();
  console.log('SEHS Triangle Quiz loaded!');
  console.log('Questions available:', db.length);
});

// Difficulty selection
document.querySelectorAll('.difficulty-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.difficulty = card.dataset.difficulty;
  });
});

// Question count selection
document.querySelectorAll('.count-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const count = btn.dataset.count;
    state.questionCount = count === 'all' ? 'all' : parseInt(count, 10);
  });
});

startBtn.addEventListener('click', () => {
  if (!state.difficulty) {
    alert('Please select a difficulty level!');
    return;
  }
  const db = getQuestionsDB();
  if (!db || db.length === 0) {
    alert('No questions loaded. Check questions-db.js.');
    return;
  }
  startQuiz();
});

function startQuiz() {
  const db = getQuestionsDB();

  // Simple difficulty mapping using level field (SL/HL)
  let filtered = db.filter(q => {
    if (state.difficulty === 'rookie') return String(q.level).toUpperCase() === 'SL';
    if (state.difficulty === 'pro') return String(q.level).toUpperCase() === 'HL';
    return true; // varsity = SL + HL
  });

  if (filtered.length === 0) {
    alert('No questions match this mode (check level fields).');
    return;
  }

  const shuffled = shuffleArray([...filtered]);
  state.questions = (state.questionCount === 'all') ? shuffled : shuffled.slice(0, Math.min(state.questionCount, shuffled.length));

  state.currentQuestionIndex = 0;
  state.score = 10;
  state.correctCount = 0;
  state.wrongCount = 0;

  document.getElementById('difficulty-display').textContent =
    state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1);
  document.getElementById('total-q').textContent = state.questions.length;

  showScreen(quizScreen);
  loadQuestion();
}

function pickThreeOptions(question) {
  // expects question.options = { i, ii, iii, iv } and question.correct = "iii" etc.
  const entries = Object.entries(question.options || {})
    .filter(([k, v]) => typeof v === 'string' && v.trim().length > 0)
    .map(([k, v]) => ({ key: String(k), text: v }));

  const correctKey = question.correct != null ? String(question.correct) : null;
  const correctEntry = correctKey
    ? entries.find(e => e.key.toLowerCase() === correctKey.toLowerCase())
    : null;

  let chosen;
  if (entries.length <= 3) {
    chosen = entries.slice(0, 3);
  } else {
    const distractors = entries.filter(e => !correctEntry || e.key !== correctEntry.key);
    const pickedDistractors = shuffleArray([...distractors]).slice(0, 2);
    chosen = correctEntry ? [correctEntry, ...pickedDistractors] : shuffleArray([...entries]).slice(0, 3);
  }

  while (chosen.length < 3) chosen.push({ key: `missing-${chosen.length}`, text: `Option ${chosen.length + 1}` });
  return { chosen, correctEntry };
}

function assignToSlots(chosen, correctEntry) {
  const slots = ['A', 'B', 'C'];
  const shuffled = shuffleArray([...chosen]);

  const slotMap = {};
  let correctSlot = null;

  slots.forEach((slot, idx) => {
    const opt = shuffled[idx];
    const isCorrect = correctEntry ? opt.key === correctEntry.key : false;
    slotMap[slot] = { text: opt.text, isCorrect };
    if (isCorrect) correctSlot = slot;
  });

  return { slotMap, correctSlot };
}

function resetTriangle() {
  state.locked = false;
  document.querySelectorAll('.conf-circle').forEach(c => {
    c.classList.remove('selected', 'disabled');
    c.style.pointerEvents = 'auto';
  });
  nextBtn.classList.remove('show');
}

function loadQuestion() {
  const question = state.questions[state.currentQuestionIndex];

  document.getElementById('question-topic').textContent = question.topic ?? '—';
  document.getElementById('question-level').textContent = question.level ?? '—';
  document.getElementById('question-text').textContent = question.question ?? '—';
  document.getElementById('current-q').textContent = state.currentQuestionIndex + 1;
  document.getElementById('score').textContent = state.score;

  const { chosen, correctEntry } = pickThreeOptions(question);
  const { slotMap, correctSlot } = assignToSlots(chosen, correctEntry);

  state.correctSlot = correctSlot;

  document.querySelector('#btn-A .answer-text').textContent = slotMap.A.text;
  document.querySelector('#btn-B .answer-text').textContent = slotMap.B.text;
  document.querySelector('#btn-C .answer-text').textContent = slotMap.C.text;

  resetTriangle();
}

function showPoints(points) {
  const pointsDisplay = document.getElementById('points-display');
  const pointsText = points > 0 ? `+${points} points` : points < 0 ? `${points} points` : '0 points';
  const pointsClass = points > 0 ? 'positive' : points < 0 ? 'negative' : 'neutral';

  document.getElementById('points-text').textContent = pointsText;
  pointsDisplay.className = `points-display show ${pointsClass}`;
  setTimeout(() => pointsDisplay.classList.remove('show'), 2000);
}

function applyAnswer(circleKey) {
  if (state.locked) return;
  if (!circleKey || !SCORE[circleKey] || !state.correctSlot) return;

  state.locked = true;

  document.querySelectorAll('.conf-circle').forEach(c => {
    c.classList.add('disabled');
    c.style.pointerEvents = 'none';
  });

  const points = SCORE[circleKey][state.correctSlot];
  state.score += points;
  document.getElementById('score').textContent = state.score;
  showPoints(points);

  if (points > 0) state.correctCount++;
  else state.wrongCount++;

  nextBtn.classList.add('show');
}

document.querySelectorAll('.conf-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    if (state.locked) return;
    circle.classList.add('selected');
    applyAnswer(circle.dataset.key);
  });
});

nextBtn.addEventListener('click', () => {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex >= state.questions.length) showResults();
  else loadQuestion();
});

function showResults() {
  showScreen(resultsScreen);

  document.getElementById('final-score').textContent = state.score;
  document.getElementById('correct-count').textContent = state.correctCount;
  document.getElementById('wrong-count').textContent = state.wrongCount;

  const total = state.questions.length || 1;
  const accuracy = Math.round((state.correctCount / total) * 100);
  document.getElementById('accuracy').textContent = accuracy + '%';

  let message = '';
  if (accuracy >= 90) message = 'Outstanding!';
  else if (accuracy >= 80) message = 'Great job!';
  else if (accuracy >= 70) message = 'Well done!';
  else if (accuracy >= 60) message = 'Keep practicing!';
  else message = 'Review and try again!';

  document.getElementById('performance-message').textContent = message;
}

restartBtn.addEventListener('click', () => {
  startQuiz();
});

changeDifficultyBtn.addEventListener('click', () => {
  showScreen(difficultyScreen);
});

quitBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to quit?')) {
    showScreen(difficultyScreen);
  }
});
