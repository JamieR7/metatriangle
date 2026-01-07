// app.js — SEHS Triangle Quiz (triangle-only input)
// Difficulty controls funny distractor frequency.
// Separate "Question level" control chooses SL only vs SL+HL.

let state = {
  difficulty: null,          // rookie | varsity | pro
  questionCount: 10,         // number | "all"
  levelSelect: 'sl',         // 'sl' | 'slhl'  (SL only vs SL+HL)

  currentQuestionIndex: 0,
  score: 10,

  questions: [],

  correctSlot: null,         // 'A' | 'B' | 'C'
  locked: false,

  correctCount: 0,           // points > 0
  wrongCount: 0              // points <= 0
};

const DIFFICULTY_DISPLAY = {
  rookie: 'Rookie',
  varsity: 'Varsity',
  pro: 'Pro'
};

const FUNNY_PROB = {
  pro: 0.0,
  varsity: 0.2,
  rookie: 0.5
};

function includeHL() {
  return state.levelSelect === 'slhl';
}

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

function normLevel(level) {
  return String(level || '').trim().toUpperCase();
}

// ----- Difficulty selection -----
document.querySelectorAll('.difficulty-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.difficulty = card.dataset.difficulty;
  });
});

// ----- Count selection (buttons with data-count) -----
document.querySelectorAll('.count-btn[data-count]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.count-btn[data-count]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const count = btn.dataset.count;
    state.questionCount = (count === 'all') ? 'all' : parseInt(count, 10);
  });
});

// ----- Level selection (buttons with data-level-select) -----
document.querySelectorAll('.count-btn[data-level-select]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.count-btn[data-level-select]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.levelSelect = btn.dataset.levelSelect; // 'sl' or 'slhl'
  });
});

// ----- Start -----
startBtn.addEventListener('click', () => {
  if (!state.difficulty) {
    alert('Please select a difficulty mode.');
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

  // Filter by SL-only vs SL+HL
  const filtered = db.filter(q => {
    const lvl = normLevel(q.level);
    if (includeHL()) return lvl === 'SL' || lvl === 'HL';
    return lvl === 'SL';
  });

  if (filtered.length === 0) {
    alert('No questions match your level selection.');
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

  setText('difficulty-display', DIFFICULTY_DISPLAY[state.difficulty] || '—');
  setText('total-q', state.questions.length);
  setText('score', state.score);

  showScreen(quizScreen);
  loadQuestion();
}

// ----- Build 3 options (correct + 2 distractors) with funny frequency -----
function pickThreeOptions(question) {
  const opts = question.options || {};
  const correctKey = question.correct != null ? String(question.correct) : null;

  const entries = Object.entries(opts)
    .filter(([k, v]) => typeof v === 'string' && v.trim().length > 0)
    .map(([k, v]) => ({ key: String(k), text: v }));

  const correctEntry = correctKey
    ? entries.find(e => e.key.toLowerCase() === correctKey.toLowerCase())
    : null;

  // Treat "iv" as funny distractor
  const funny = entries.find(e => e.key.toLowerCase() === 'iv');
  const seriousPool = entries.filter(e => e.key.toLowerCase() !== 'iv');

  const seriousDistractors = correctEntry
    ? seriousPool.filter(e => e.key !== correctEntry.key)
    : seriousPool.slice();

  const pFunny = FUNNY_PROB[state.difficulty] ?? 0;
  const includeFunny =
    !!funny &&
    (!correctEntry || funny.key !== correctEntry.key) &&
    (Math.random() < pFunny);

  let distractors = [];
  if (includeFunny && seriousDistractors.length > 0) {
    distractors = [funny, shuffleArray(seriousDistractors)[0]];
  } else {
    distractors = shuffleArray(seriousDistractors).slice(0, 2);
  }

  let chosen = correctEntry ? [correctEntry, ...distractors] : shuffleArray(entries).slice(0, 3);

  // Safety: ensure 3 unique-ish options
  chosen = chosen.filter(Boolean);
  chosen = Array.from(new Map(chosen.map(x => [x.key, x])).values());
  while (chosen.length < 3) {
    const fallback = shuffleArray(entries)[0];
    if (fallback) chosen.push(fallback);
    chosen = Array.from(new Map(chosen.map(x => [x.key, x])).values());
  }

  return { chosen: chosen.slice(0, 3), correctEntry };
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

// ----- UI helpers -----
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
  revealCorrectAnswer();

  if (points > 0) state.correctCount++;
  else state.wrongCount++;

  nextBtn.classList.add('show');
}

// Bind circles
document.querySelectorAll('.conf-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    if (state.locked) return;

    // Visual: only one selected ring
    document.querySelectorAll('.conf-circle').forEach(c => c.classList.remove('selected'));
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
