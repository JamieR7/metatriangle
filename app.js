let state = {
  difficulty: null,
  questionCount: 10,
  currentQuestionIndex: 0,
  score: 10,
  questions: [],
  correctCount: 0,
  wrongCount: 0,
  correctSlot: null,     // 'A' | 'B' | 'C'
  locked: false
};

function getQuestionsDB() {
  return window.questionsDB || window.questions || window.QUESTIONS_DB || [];
}

// Score lookup: SCORE[circleKey][correctSlot]
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function pickThreeOptions(question) {
  // Build entries from options object (i/ii/iii/iv), and locate correct entry using question.correct
  const entries = Object.entries(question.options || {})
    .filter(([k, v]) => typeof v === 'string' && v.trim().length > 0)
    .map(([k, v]) => ({ key: k, text: v }));

  const correctKey = question.correct != null ? String(question.correct) : null; // e.g. "iii" [file:64]
  const correctEntry = correctKey
    ? entries.find(e => e.key.toLowerCase() === correctKey.toLowerCase())
    : null;

  // Choose 3, always include correct if possible
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
  // Randomly assign chosen options to display slots A/B/C
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

function loadQuestion() {
  const question = state.questions[state.currentQuestionIndex];

  document.getElementById('question-topic').textContent = question.topic;
  document.getElementById('question-level').textContent = question.level;
  document.getElementById('question-text').textContent = question.question;
  document.getElementById('current-q').textContent = state.currentQuestionIndex + 1;
  document.getElementById('score').textContent = state.score;

  const { chosen, correctEntry } = pickThreeOptions(question);
  const { slotMap, correctSlot } = assignToSlots(chosen, correctEntry);

  state.correctSlot = correctSlot;
  state.locked = false;

  // Put option text into your existing A/B/C UI
  document.querySelector('#btn-A .answer-text').textContent = slotMap.A.text;
  document.querySelector('#btn-B .answer-text').textContent = slotMap.B.text;
  document.querySelector('#btn-C .answer-text').textContent = slotMap.C.text;

  // Make the A/B/C boxes display-only
  ['A','B','C'].forEach(s => {
    const btn = document.getElementById(`btn-${s}`);
    btn.onclick = null;
    btn.style.pointerEvents = 'none';
  });

  // Reset circles
  document.querySelectorAll('.conf-circle').forEach(c => {
    c.classList.remove('selected', 'disabled');
    c.style.pointerEvents = 'auto';
  });

  document.getElementById('next-btn').classList.remove('show');
}

function applyPoints(points) {
  state.score += points;
  document.getElementById('score').textContent = state.score;

  const pointsDisplay = document.getElementById('points-display');
  const pointsText = points > 0 ? `+${points} points` : points < 0 ? `${points} points` : '0 points';
  const pointsClass = points > 0 ? 'positive' : points < 0 ? 'negative' : 'neutral';

  pointsDisplay.querySelector('#points-text').textContent = pointsText;
  pointsDisplay.className = `points-display show ${pointsClass}`;
  setTimeout(() => pointsDisplay.classList.remove('show'), 2000);
}

// Triangle click = answer
document.querySelectorAll('.conf-circle').forEach(circle => {
  circle.addEventListener('click', () => {
    if (state.locked) return;

    const key = circle.dataset.key;           // e.g. "AB_closeA"
    const correct = state.correctSlot;        // "A" | "B" | "C"
    if (!key || !SCORE[key] || !correct) return;

    state.locked = true;

    document.querySelectorAll('.conf-circle').forEach(c => c.classList.add('disabled'));
    circle.classList.add('selected');

    const pts = SCORE[key][correct];
    applyPoints(pts);

    if (pts > 0) state.correctCount++;
    else if (pts < 0) state.wrongCount++;

    document.getElementById('next-btn').classList.add('show');
  });
});

// Next button
document.getElementById('next-btn').addEventListener('click', () => {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex >= state.questions.length) showResults();
  else loadQuestion();
});
