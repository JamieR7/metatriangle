// app.js — SEHS Triangle Quiz (triangle-only input, correct reveal)

let state = {
  difficulty: null,          // rookie | varsity | pro
  questionCount: 10,         // number | "all"
  currentQuestionIndex: 0,

  score: 10,
  questions: [],

  correctSlot: null,         // 'A' | 'B' | 'C'
  locked: false,

  correctCount: 0,           // pts > 0
  wrongCount: 0              // pts <= 0
};

function getQuestionsDB() {
  // questions-db.js should do: window.questionsDB = QUESTIONS_DB;
  return window.questionsDB || window.QUESTIONS_DB || window.questions || [];
}

// Score table: SCORE[circleKey][correctSlot]
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

// ----- DOM -----
const difficultyScreen = document.getElementById('difficulty-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-quiz-btn');
const quitBtn = document.getElementById('quit-btn');
const nextBtn = document.getElementById('next-btn');

const restartBtn = document.getElementById('restart-btn');
const changeDifficultyBtn = document.getElementById('change-difficulty-btn');

const pointsDisplay = document.getElementById('points-display');
const pointsTextEl = document.getElementById('points-text');

// ----- Utilities -----
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(which) {
  [difficultyScreen, quizScreen, resultsScreen].forEach(s => s.classList.remove('active'));
  which.classList.add('active');
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// ----- Difficulty + count selection -----
document.querySelectorAll('.difficulty-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.difficulty = card.dataset.difficulty;
  });
});

document.querySelectorAll('.count-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const count = btn.dataset.count;
    state.questionCount = (count === 'all') ? 'all' : parseInt(count, 10);
  });
});

// ----- Start -----
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

  const filtered = db.filter(q => {
    const lvl = String(q.level || '').toUpperCase();
    if (state.difficulty === 'rookie') return lvl === 'SL';
    if (state.difficulty === 'pro') return lvl === 'HL';
    return true; // varsity
  });

  if (filtered.length === 0) {
    alert('No questions match this mode (check question.level fields).');
    return;
  }

  const shuffled = shuffleArray(filtered);
  state.questions = (state.questionCount === 'all')
    ? shuffled
    : shuffled.slice(0, Math.min(state.questionCount, shuffled.length));

  state.currentQuestionIndex = 0;
  state.score = 10;
  state.correctCount = 0;
  state.wrongCount = 0;

  setText('difficulty-display', state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1));
  setText('total-q', state.questions.length);
  setText('score', state.score);

  showScreen(quizScreen);
  loadQuestion();
}

// ----- Question prep (3 options A/B/C with correct included) -----
function pickThreeOptions(question) {
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
    const pickedDistractors = shuffleArray(distractors).slice(0, 2);
    chosen = correctEntry ? [correctEntry, ...pickedDistractors] : shuffleArray(entries).slice(0, 3);
  }

  while (chosen.length < 3) {
    chosen.push({ key: `missing-${chosen.length}`, text: `Option ${chosen.length + 1}` });
  }

  return { chosen, correctEntry };
}

function assignToSlots(chosen, correctEntry) {
  const slots = ['A', 'B', 'C'];
  const shuffled = shuffleArray(chosen);

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

// ----- UI reset helpers -----
function resetAnswerBoxes() {
  ['A', 'B', 'C'].forEach(s => {
    const btn = document.getElementById(`btn-${s}`);
    if (!btn) return;
    btn.classList.remove('correct', 'wrong', 'neutral', 'disabled');
  });
}

function resetTriangle() {
  state.locked = false;
  document.querySelectorAll('.conf-circle').forEach(c => {
    c.classList.remove('selected', 'disabled');
    c.style.pointerEvents = 'auto';
  });
  nextBtn.classList.remove('show');
}

function revealCorrectAnswer() {
  resetAnswerBoxes();
  if (state.correctSlot) {
    const btn = document.getElementById(`btn-${state.correctSlot}`);
    if (btn) btn.classList.add('correct');
  }
}

// ----- Load question -----
function loadQuestion() {
  const question = state.questions[state.currentQuestionIndex];

  setText('question-topic', question?.topic ?? '—');
  setText('question-level', question?.level ?? '—');
  setText('question-text', question?.question ?? '—');
  setText('current-q', state.currentQuestionIndex + 1);
  setText('score', state.score);

  // Clear any previous correct highlight
  resetAnswerBoxes();

  const { chosen, correctEntry } = pickThreeOptions(question);
  const { slotMap, correctSlot } = assignToSlots(chosen, correctEntry);

  state.correctSlot = correctSlot;

  const aText = document.querySelector('#btn-A .answer-text');
  const bText = document.querySelector('#btn-B .answer-text');
  const cText = document.querySelector('#btn-C .answer-text');

  if (aText) aText.textContent = slotMap.A.text;
  if (bText) bText.textContent = slotMap.B.text;
  if (cText) cText.textContent = slotMap.C.text;

  resetTriangle();
}

// ----- Points overlay -----
function showPoints(points) {
  const txt = points > 0 ? `+${points} points` : points < 0 ? `${points} points` : '0 points';
  const cls = points > 0 ? 'positive' : points < 0 ? 'negative' : 'neutral';

  pointsTextEl.textContent = txt;
  pointsDisplay.className = `points-display show ${cls}`;
  setTimeout(() => pointsDisplay.classList.remove('show'), 1600);
}

// ----- Answering via triangle -----
function applyAnswer(circleKey) {
  if (state.locked) return;
  if (!circleKey || !SCORE[circleKey] || !state.correctSlot) return;

  state.locked = true;

  // Lock triangle
  document.querySelectorAll('.conf-circle').forEach(c => {
    c.classList.add('disabled');
    c.style.pointerEvents = 'none';
  });

  const points = SCORE[circleKey][state.correctSlot];

  state.score += points;
  setText('score', state.score);

  showPoints(points);
  revealCorrectAnswer(); // <-- makes correct option obvious before Next

  if (points > 0) state.correctCount++;
  else state.wrongCount++;

  nextBtn.classList.add('show');
}

// Bind circles
document.querySelectorAll('.conf-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    if (state.locked) return;
    circle.classList.add('selected');
    applyAnswer(circle.dataset.key);
  });
});

// ----- Next -----
nextBtn.addEventListener('click', () => {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex >= state.questions.length) showResults();
  else loadQuestion();
});

// ----- Results -----
function showResults() {
  showScreen(resultsScreen);

  setText('final-score', state.score);
  setText('correct-count', state.correctCount);
  setText('wrong-count', state.wrongCount);

  const total = state.questions.length || 1;
  const accuracy = Math.round((state.correctCount / total) * 100);
  setText('accuracy', accuracy + '%');

  let msg = 'Review and try again!';
  if (accuracy >= 90) msg = 'Outstanding!';
  else if (accuracy >= 80) msg = 'Great job!';
  else if (accuracy >= 70) msg = 'Well done!';
  else if (accuracy >= 60) msg = 'Keep practicing!';

  setText('performance-message', msg);
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
