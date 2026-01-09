(() => {
  "use strict";

  // -----------------------------
  // State
  // -----------------------------
  const state = {
    difficulty: null,          // 'rookie' | 'varsity' | 'pro'
    questionCount: 10,         // number | 'all'
    levelSelect: "sl",         // 'sl' | 'slhl'
    questions: [],
    currentQuestionIndex: 0,
    correctSlot: null,         // 'A' | 'B' | 'C'
    locked: false,
    score: 10,
    positivePicks: 0,          // points > 0
    nonPositivePicks: 0,       // points <= 0
    history: []                // { topic, points, circleKey, correctSlot }
  };

  const DIFFICULTY_DISPLAY = { rookie: "Rookie", varsity: "Varsity", pro: "Pro" };
  const FUNNY_PROB = { pro: 0.0, varsity: 0.2, rookie: 0.5 };

  // IMPORTANT: keys must match your SVG data-key values (ABcloseA, etc.)
  const SCORE = {
    A: { A: 3, B: -2, C: -2 },
    B: { A: -2, B: 3, C: -2 },
    C: { A: -2, B: -2, C: 3 },

    ABcloseA: { A: 2, B: -1, C: -2 },
    ABequal:  { A: 1, B: 1,  C: -2 },
    ABcloseB: { A: -1, B: 2, C: -2 },

    ACcloseA: { A: 2, B: -2, C: -1 },
    ACequal:  { A: 1, B: -2, C: 1 },
    ACcloseC: { A: -1, B: -2, C: 2 },

    BCcloseB: { A: -2, B: 2, C: -1 },
    BCequal:  { A: -2, B: 1, C: 1 },
    BCcloseC: { A: -2, B: -1, C: 2 },

    center: { A: 0, B: 0, C: 0 }
  };

  const MAX_POS_POINTS = 3;
  const MAX_NEG_POINTS = -2;

  // -----------------------------
  // DOM helpers
  // -----------------------------
  const $ = (id) => document.getElementById(id);

  function setText(id, value) {
    const el = $(id);
    if (el) el.textContent = value;
  }

  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const el = $(screenId);
    if (el) el.classList.add("active");
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normLevel(level) {
    return String(level || "").trim().toUpperCase();
  }

  function includeHL() {
    return state.levelSelect === "slhl";
  }

  function safeStr(v) {
    return (v == null) ? "" : String(v);
  }

  function escapeHtml(s) {
    return safeStr(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Reads from multiple possible globals; also supports a global const QUESTIONSDB. [file:179][file:177]
  function getQuestionsDB() {
    const fromWindow =
      window.questionsDB ||
      window.QUESTIONS_DB ||
      window.QUESTIONSDB ||
      window.questions ||
      null;

    if (Array.isArray(fromWindow)) return fromWindow;

    // If questions-db.js declares: const QUESTIONSDB = [...]
    // (global const is still accessible by name across scripts)
    // eslint-disable-next-line no-undef
    if (typeof QUESTIONSDB !== "undefined" && Array.isArray(QUESTIONSDB)) return QUESTIONSDB;

    return [];
  }

  // -----------------------------
  // Explain UI
  // -----------------------------
  const nextBtn = $("next-btn");
  const explainBtn = $("explain-btn");
  const explanationBox = $("explanation-box");
  let explanationVisible = false;

  function resetExplainUI() {
    explanationVisible = false;

    if (explanationBox) {
      explanationBox.hidden = true;
      explanationBox.textContent = "";
    }

    // Both buttons hidden until answered (CSS uses .show)
    nextBtn?.classList.remove("show");
    explainBtn?.classList.remove("show");

    if (explainBtn) explainBtn.textContent = "Explain";
  }

  function showAfterAnswer(q) {
    // Show BOTH buttons after answering
    nextBtn?.classList.add("show");
    explainBtn?.classList.add("show");

    // Load explanation text but keep it hidden until Explain clicked
    if (explanationBox) explanationBox.textContent = safeStr(q?.explanation);
  }

  // -----------------------------
  // Landing bindings
  // -----------------------------
  function bindLanding() {
    // Difficulty cards
    document.querySelectorAll(".difficulty-card").forEach(card => {
      const select = () => {
        document.querySelectorAll(".difficulty-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        state.difficulty = card.dataset.difficulty || null;
      };
      card.addEventListener("click", select);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select();
        }
      });
    });

    // Question count buttons
    document.querySelectorAll(".count-btn[data-count]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".count-btn[data-count]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const count = btn.dataset.count;
        state.questionCount = (count === "all") ? "all" : parseInt(count, 10);
        if (Number.isNaN(state.questionCount)) state.questionCount = 10;
      });
    });

    // SL / SL+HL
    document.querySelectorAll(".count-btn[data-level-select]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".count-btn[data-level-select]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const sel = btn.dataset.levelSelect;
        state.levelSelect = (sel === "slhl") ? "slhl" : "sl";
      });
    });

    // Start
    $("start-quiz-btn")?.addEventListener("click", () => {
      if (!state.difficulty) {
        alert("Please select a difficulty mode.");
        return;
      }
      const db = getQuestionsDB();
      if (db.length === 0) {
        alert("No questions loaded. Check questions-db.js is included before app.js.");
        return;
      }
      startQuiz();
    });
  }

  // -----------------------------
  // Quiz core
  // -----------------------------
  function startQuiz() {
    const db = getQuestionsDB();

    const filtered = db.filter(q => {
      const lvl = normLevel(q.level);
      if (includeHL()) return (lvl === "SL" || lvl === "HL");
      return (lvl === "SL");
    });

    if (filtered.length === 0) {
      alert("No questions match your level selection.");
      return;
    }

    const shuffled = shuffle(filtered);
    state.questions = (state.questionCount === "all")
      ? shuffled
      : shuffled.slice(0, Math.min(state.questionCount, shuffled.length));

    state.currentQuestionIndex = 0;
    state.correctSlot = null;
    state.locked = false;
    state.score = 10;
    state.positivePicks = 0;
    state.nonPositivePicks = 0;
    state.history = [];

    setText("difficulty-display", DIFFICULTY_DISPLAY[state.difficulty] || "—");
    setText("total-q", state.questions.length);
    setText("score", state.score);

    showScreen("quiz-screen");
    loadQuestion();
  }

  function pickThreeOptions(question) {
    const opts = question && question.options ? question.options : {};
    const entries = Object.entries(opts)
      .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
      .map(([k, v]) => ({ key: String(k), text: v.trim() }));

    const correctKey = question && question.correct != null ? String(question.correct).toLowerCase() : null;
    const correctEntry = correctKey ? entries.find(e => e.key.toLowerCase() === correctKey) : null;

    const funnyEntry = entries.find(e => e.key.toLowerCase() === "iv");

    const wrongEntries = entries.filter(e => !correctEntry || e.key !== correctEntry.key);
    const seriousWrong = wrongEntries.filter(e => e.key.toLowerCase() !== "iv");

    const p = FUNNY_PROB[state.difficulty] ?? 0;
    const includeFunny = !!funnyEntry && (!correctEntry || funnyEntry.key !== correctEntry.key) && (Math.random() < p);

    let distractors = [];
    if (includeFunny && seriousWrong.length > 0) distractors = [funnyEntry, shuffle(seriousWrong)[0]];
    else distractors = shuffle(seriousWrong).slice(0, 2);

    let chosen = [];
    if (correctEntry) chosen.push(correctEntry);
    chosen.push(...distractors);

    // Deduplicate by key
    const byKey = new Map();
    chosen.forEach(o => { if (o && o.key) byKey.set(o.key, o); });
    chosen = [...byKey.values()];

    // Ensure 3 options
    const pool = shuffle(entries);
    for (const opt of pool) {
      if (chosen.length >= 3) break;
      if (!opt) continue;
      if (chosen.some(x => x.key === opt.key)) continue;
      chosen.push(opt);
    }
    while (chosen.length < 3 && pool.length > 0) chosen.push(pool[0]);

    return { chosen: chosen.slice(0, 3), correctEntry };
  }

  function assignToSlots(chosen, correctEntry) {
    const slots = ["A", "B", "C"];
    const shuffled = shuffle(chosen);
    const slotMap = {};
    let correctSlot = null;

    slots.forEach((slot, idx) => {
      const opt = shuffled[idx];
      const isCorrect = !!(correctEntry && opt && opt.key === correctEntry.key);
      slotMap[slot] = { text: opt ? opt.text : "—", isCorrect };
      if (isCorrect) correctSlot = slot;
    });

    return { slotMap, correctSlot };
  }

  function resetAnswerBoxes() {
    ["A", "B", "C"].forEach(s => {
      const btn = $(`btn-${s}`);
      if (btn) btn.classList.remove("correct");
    });
  }

  function resetTriangle() {
    state.locked = false;
    document.querySelectorAll(".conf-circle").forEach(c => {
      c.classList.remove("selected", "disabled");
      c.style.pointerEvents = "auto";
    });
  }

  function revealCorrectAnswer() {
    resetAnswerBoxes();
    if (!state.correctSlot) return;
    $(`btn-${state.correctSlot}`)?.classList.add("correct");
  }

  function loadQuestion() {
    const q = state.questions[state.currentQuestionIndex];
    if (!q) {
      showResults();
      return;
    }

    setText("question-topic", q.topic ?? "—");
    setText("question-level", q.level ?? "—");
    setText("question-text", q.question ?? "—");
    setText("current-q", state.currentQuestionIndex + 1);
    setText("score", state.score);

    resetAnswerBoxes();
    resetTriangle();
    resetExplainUI();

    const { chosen, correctEntry } = pickThreeOptions(q);
    const { slotMap, correctSlot } = assignToSlots(chosen, correctEntry);
    state.correctSlot = correctSlot;

    const aText = document.querySelector("#btn-A .answer-text");
    const bText = document.querySelector("#btn-B .answer-text");
    const cText = document.querySelector("#btn-C .answer-text");

    if (aText) aText.textContent = slotMap.A.text;
    if (bText) bText.textContent = slotMap.B.text;
    if (cText) cText.textContent = slotMap.C.text;
  }

  function showPoints(points) {
    const box = $("points-display");
    const txt = $("points-text");
    if (!box || !txt) return;

    const label = points > 0 ? `+${points} point${points === 1 ? "" : "s"}` :
      points < 0 ? `${points} points` : "0 points";

    const cls = points > 0 ? "positive" : points < 0 ? "negative" : "neutral";

    txt.textContent = label;
    box.className = `points-display show ${cls}`;
    setTimeout(() => box.classList.remove("show"), 1100);
  }

  function applyAnswer(circleKey) {
    if (state.locked) return;

    const q = state.questions[state.currentQuestionIndex];
    if (!circleKey || !SCORE[circleKey] || !state.correctSlot || !q) return;

    state.locked = true;

    document.querySelectorAll(".conf-circle").forEach(c => {
      c.classList.add("disabled");
      c.style.pointerEvents = "none";
    });

    const points = SCORE[circleKey][state.correctSlot];

    state.history.push({
      topic: q.topic || "Unknown",
      points,
      circleKey,
      correctSlot: state.correctSlot
    });

    state.score += points;
    setText("score", state.score);

    if (points > 0) state.positivePicks++;
    else state.nonPositivePicks++;

    showPoints(points);
    revealCorrectAnswer();

    // NEW: show Explain + Next after answering
    showAfterAnswer(q);
  }

  // -----------------------------
  // Results: topic bars
  // -----------------------------
  function renderTopicBars() {
    const host = $("topic-list");
    if (!host) return;

    const byTopic = new Map();
    for (const rec of state.history) {
      const t = rec.topic || "Unknown";
      if (!byTopic.has(t)) byTopic.set(t, { sum: 0, count: 0 });
      const obj = byTopic.get(t);
      obj.sum += rec.points;
      obj.count += 1;
    }

    const rows = [...byTopic.entries()].map(([topic, v]) => ({
      topic,
      avg: v.count ? (v.sum / v.count) : 0,
      count: v.count
    }));

    rows.sort((a, b) => a.avg - b.avg);

    host.innerHTML = "";
    if (rows.length === 0) {
      host.innerHTML = `<div style="text-align:center;color:#666;font-weight:700">No topic data</div>`;
      return;
    }

    for (const r of rows) {
      let widthPct = 0;
      let cls = "positive";

      if (r.avg >= 0) {
        widthPct = Math.min((r.avg / MAX_POS_POINTS) * 50, 50);
        cls = "positive";
      } else {
        widthPct = Math.min((Math.abs(r.avg) / Math.abs(MAX_NEG_POINTS)) * 50, 50);
        cls = "negative";
      }

      const item = document.createElement("div");
      item.className = "topic-item";
      item.innerHTML = `
        <div class="topic-header">
          <div class="topic-name">${escapeHtml(r.topic)} <span style="color:#666;font-weight:800">(${r.count})</span></div>
          <div class="topic-avg">${r.avg >= 0 ? "+" : ""}${r.avg.toFixed(1)}</div>
        </div>
        <div class="topic-bar">
          <div class="topic-fill ${cls}" style="width:${widthPct}%"></div>
        </div>
      `;
      host.appendChild(item);
    }
  }

  function showResults() {
    showScreen("results-screen");

    const total = Math.max(state.questions.length, 1);
    const accuracy = Math.round((state.positivePicks / total) * 100);

    setText("final-score", state.score);
    setText("correct-count", state.positivePicks);
    setText("wrong-count", state.nonPositivePicks);
    setText("accuracy", accuracy);

    let msg = "Keep practicing — you will improve.";
    if (accuracy >= 90) msg = "Outstanding performance.";
    else if (accuracy >= 75) msg = "Great job.";
    else if (accuracy >= 60) msg = "Good effort — keep going.";

    setText("performance-message", msg);
    renderTopicBars();
  }

  // -----------------------------
  // Bind quiz controls
  // -----------------------------
  function bindQuizControls() {
    // triangle circles
    document.querySelectorAll(".conf-circle").forEach(circle => {
      circle.addEventListener("click", () => {
        if (state.locked) return;
        document.querySelectorAll(".conf-circle").forEach(c => c.classList.remove("selected"));
        circle.classList.add("selected");
        applyAnswer(circle.dataset.key);
      });
    });

    // Explain toggle
    explainBtn?.addEventListener("click", () => {
      if (!state.locked) return; // only after answering
      explanationVisible = !explanationVisible;
      if (explanationBox) explanationBox.hidden = !explanationVisible;
      if (explainBtn) explainBtn.textContent = explanationVisible ? "Hide explanation" : "Explain";
    });

    // Next
    nextBtn?.addEventListener("click", () => {
      resetExplainUI();
      state.currentQuestionIndex++;
      if (state.currentQuestionIndex >= state.questions.length) showResults();
      else loadQuestion();
    });

    // Quit
    $("quit-btn")?.addEventListener("click", () => {
      const ok = confirm("Quit the quiz? Your progress will be lost.");
      if (!ok) return;
      showScreen("difficulty-screen");
    });
  }

  function bindResultsControls() {
    $("restart-btn")?.addEventListener("click", () => {
      if (!state.difficulty) {
        showScreen("difficulty-screen");
        return;
      }
      startQuiz();
    });

    $("change-difficulty-btn")?.addEventListener("click", () => {
      showScreen("difficulty-screen");
    });
  }

  // -----------------------------
  // Init
  // -----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    bindLanding();
    bindQuizControls();
    bindResultsControls();
    showScreen("difficulty-screen");
  });
})();
