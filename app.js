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

  // Triangle circle scoring matrix: points depend on circleKey + which slot is correct
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

  // Supports multiple possible globals (and also a plain global const QUESTIONSDB)
  function getQuestionsDB() {
    const maybe =
      window.questionsDB ||
      window.QUESTIONS_DB ||
      window.QUESTIONSDB ||
      window.questions ||
      (typeof QUESTIONSDB !== "undefined" ? QUESTIONSDB : []);

    return Array.isArray(maybe) ? maybe : [];
  }

  // -----------------------------
  // Explain UI state
  // -----------------------------
  const explainBtn = $("explain-btn");
  const explanationBox = $("explanation-box");
  let explanationVisible = false;

  function resetExplainUI() {
    explanationVisible = false;

    if (explanationBox) {
      explanationBox.hidden = true;
      explanationBox.textContent = "";
    }

    if (explainBtn) {
      explainBtn.textContent = "Explain";
      explainBtn.classList.remove("show");
    }

    $("next-btn")?.classList.remove("show");
  }

  function showExplainAndNextForAnsweredQuestion(q) {
    if (explainBtn) explainBtn.classList.add("show");
    $("next-btn")?.classList.add("show");

    // Load text now; still hidden until user clicks Explain
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

    // SL / SL+HL buttons
    document.querySelectorAll(".count-btn[data-level-select]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".count-btn[data-level-select]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const sel = btn.dataset.levelSelect;
        state.levelSelect = (sel === "slhl") ? "slhl" : "sl";
      });
    });

    // Start
    const startBtn = $("start-quiz-btn");
    startBtn?.addEventListener("click", () => {
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

  // Pick 3 options: always include correct, include funny (iv) with difficulty probability
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
    if (includeFunny && seriousWrong.length > 0) {
      distractors = [funnyEntry, shuffle(seriousWrong)[0]];
    } else {
      distractors = shuffle(seriousWrong).slice(0, 2);
    }

    let chosen = [];
    if (correctEntry) chosen.push(correctEntry);
    chosen.push(...distractors);

    // Deduplicate by key
    const byKey = new Map();
    chosen.forEach(o => { if (o && o.key) byKey.set(o.key, o); });
    chosen = [...byKey.values()];

    // Ensure 3 options (fallback to any entries)
    const pool = shuffle(entries);
    for (const opt of pool) {
      if (chosen.length >= 3) break;
      if (!opt) continue;
      if (chosen.some(x => x.key === opt.key)) continue;
      chosen.push(opt);
    }

    while (chosen.length < 3 && pool.length > 0) chosen.push(pool[0]);

    return { chosen: chosen.slice(0, 3), correctEntry };
