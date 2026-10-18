"use strict";
var Mezuzah = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/lib/mezuzah/diff.ts
  var diff_exports = {};
  __export(diff_exports, {
    analyzeText: () => analyzeText,
    diffLetters: () => diffLetters,
    extractLetters: () => extractLetters,
    extractWords: () => extractWords,
    isFinalFormError: () => isFinalFormError,
    replaceDivineNames: () => replaceDivineNames
  });

  // src/lib/mezuzah/canonical.ts
  var PARSHA_SHEMA_WORDS = [
    "\u05E9\u05DE\u05E2",
    "\u05D9\u05E9\u05E8\u05D0\u05DC",
    "\u05D9\u05D4\u05D5\u05D4",
    "\u05D0\u05DC\u05D4\u05D9\u05E0\u05D5",
    "\u05D9\u05D4\u05D5\u05D4",
    "\u05D0\u05D7\u05D3",
    "\u05D5\u05D0\u05D4\u05D1\u05EA",
    "\u05D0\u05EA",
    "\u05D9\u05D4\u05D5\u05D4",
    "\u05D0\u05DC\u05D4\u05D9\u05DA",
    "\u05D1\u05DB\u05DC",
    "\u05DC\u05D1\u05D1\u05DA",
    "\u05D5\u05D1\u05DB\u05DC",
    "\u05E0\u05E4\u05E9\u05DA",
    "\u05D5\u05D1\u05DB\u05DC",
    "\u05DE\u05D0\u05D3\u05DA",
    "\u05D5\u05D4\u05D9\u05D5",
    "\u05D4\u05D3\u05D1\u05E8\u05D9\u05DD",
    "\u05D4\u05D0\u05DC\u05D4",
    "\u05D0\u05E9\u05E8",
    "\u05D0\u05E0\u05DB\u05D9",
    "\u05DE\u05E6\u05D5\u05DA",
    "\u05D4\u05D9\u05D5\u05DD",
    "\u05E2\u05DC",
    "\u05DC\u05D1\u05D1\u05DA",
    "\u05D5\u05E9\u05E0\u05E0\u05EA\u05DD",
    "\u05DC\u05D1\u05E0\u05D9\u05DA",
    "\u05D5\u05D3\u05D1\u05E8\u05EA",
    "\u05D1\u05DD",
    "\u05D1\u05E9\u05D1\u05EA\u05DA",
    "\u05D1\u05D1\u05D9\u05EA\u05DA",
    "\u05D5\u05D1\u05DC\u05DB\u05EA\u05DA",
    "\u05D1\u05D3\u05E8\u05DA",
    "\u05D5\u05D1\u05E9\u05DB\u05D1\u05DA",
    "\u05D5\u05D1\u05E7\u05D5\u05DE\u05DA",
    "\u05D5\u05E7\u05E9\u05E8\u05EA\u05DD",
    "\u05DC\u05D0\u05D5\u05EA",
    "\u05E2\u05DC",
    "\u05D9\u05D3\u05DA",
    "\u05D5\u05D4\u05D9\u05D5",
    "\u05DC\u05D8\u05D8\u05E4\u05EA",
    "\u05D1\u05D9\u05DF",
    "\u05E2\u05D9\u05E0\u05D9\u05DA",
    "\u05D5\u05DB\u05EA\u05D1\u05EA\u05DD",
    "\u05E2\u05DC",
    "\u05DE\u05D6\u05D6\u05D5\u05EA",
    "\u05D1\u05D9\u05EA\u05DA",
    "\u05D5\u05D1\u05E9\u05E2\u05E8\u05D9\u05DA"
  ];
  var PARSHA_VEHAYA_WORDS = [
    "\u05D5\u05D4\u05D9\u05D4",
    "\u05D0\u05DD",
    "\u05E9\u05DE\u05E2",
    "\u05EA\u05E9\u05DE\u05E2\u05D5",
    "\u05D0\u05DC",
    "\u05DE\u05E6\u05D5\u05EA\u05D9",
    "\u05D0\u05E9\u05E8",
    "\u05D0\u05E0\u05DB\u05D9",
    "\u05DE\u05E6\u05D5\u05D4",
    "\u05D0\u05EA\u05DB\u05DD",
    "\u05D4\u05D9\u05D5\u05DD",
    "\u05DC\u05D0\u05D4\u05D1\u05D4",
    "\u05D0\u05EA",
    "\u05D9\u05D4\u05D5\u05D4",
    "\u05D0\u05DC\u05D4\u05D9\u05DB\u05DD",
    "\u05D5\u05DC\u05E2\u05D1\u05D3\u05D5",
    "\u05D1\u05DB\u05DC",
    "\u05DC\u05D1\u05D1\u05DB\u05DD",
    "\u05D5\u05D1\u05DB\u05DC",
    "\u05E0\u05E4\u05E9\u05DB\u05DD",
    "\u05D5\u05E0\u05EA\u05EA\u05D9",
    "\u05DE\u05D8\u05E8",
    "\u05D0\u05E8\u05E6\u05DB\u05DD",
    "\u05D1\u05E2\u05EA\u05D5",
    "\u05D9\u05D5\u05E8\u05D4",
    "\u05D5\u05DE\u05DC\u05E7\u05D5\u05E9",
    "\u05D5\u05D0\u05E1\u05E4\u05EA",
    "\u05D3\u05D2\u05E0\u05DA",
    "\u05D5\u05EA\u05D9\u05E8\u05E9\u05DA",
    "\u05D5\u05D9\u05E6\u05D4\u05E8\u05DA",
    "\u05D5\u05E0\u05EA\u05EA\u05D9",
    "\u05E2\u05E9\u05D1",
    "\u05D1\u05E9\u05D3\u05DA",
    "\u05DC\u05D1\u05D4\u05DE\u05EA\u05DA",
    "\u05D5\u05D0\u05DB\u05DC\u05EA",
    "\u05D5\u05E9\u05D1\u05E2\u05EA",
    "\u05D4\u05E9\u05DE\u05E8\u05D5",
    "\u05DC\u05DB\u05DD",
    "\u05E4\u05DF",
    "\u05D9\u05E4\u05EA\u05D4",
    "\u05DC\u05D1\u05D1\u05DB\u05DD",
    "\u05D5\u05E1\u05E8\u05EA\u05DD",
    "\u05D5\u05E2\u05D1\u05D3\u05EA\u05DD",
    "\u05D0\u05DC\u05D4\u05D9\u05DD",
    "\u05D0\u05D7\u05E8\u05D9\u05DD",
    "\u05D5\u05D4\u05E9\u05EA\u05D7\u05D5\u05D9\u05EA\u05DD",
    "\u05DC\u05D4\u05DD",
    "\u05D5\u05D7\u05E8\u05D4",
    "\u05D0\u05E3",
    "\u05D9\u05D4\u05D5\u05D4",
    "\u05D1\u05DB\u05DD",
    "\u05D5\u05E2\u05E6\u05E8",
    "\u05D0\u05EA",
    "\u05D4\u05E9\u05DE\u05D9\u05DD",
    "\u05D5\u05DC\u05D0",
    "\u05D9\u05D4\u05D9\u05D4",
    "\u05DE\u05D8\u05E8",
    "\u05D5\u05D4\u05D0\u05D3\u05DE\u05D4",
    "\u05DC\u05D0",
    "\u05EA\u05EA\u05DF",
    "\u05D0\u05EA",
    "\u05D9\u05D1\u05D5\u05DC\u05D4",
    "\u05D5\u05D0\u05D1\u05D3\u05EA\u05DD",
    "\u05DE\u05D4\u05E8\u05D4",
    "\u05DE\u05E2\u05DC",
    "\u05D4\u05D0\u05E8\u05E5",
    "\u05D4\u05D8\u05D1\u05D4",
    "\u05D0\u05E9\u05E8",
    "\u05D9\u05D4\u05D5\u05D4",
    "\u05E0\u05EA\u05DF",
    "\u05DC\u05DB\u05DD",
    "\u05D5\u05E9\u05DE\u05EA\u05DD",
    "\u05D0\u05EA",
    "\u05D3\u05D1\u05E8\u05D9",
    "\u05D0\u05DC\u05D4",
    "\u05E2\u05DC",
    "\u05DC\u05D1\u05D1\u05DB\u05DD",
    "\u05D5\u05E2\u05DC",
    "\u05E0\u05E4\u05E9\u05DB\u05DD",
    "\u05D5\u05E7\u05E9\u05E8\u05EA\u05DD",
    "\u05D0\u05EA\u05DD",
    "\u05DC\u05D0\u05D5\u05EA",
    "\u05E2\u05DC",
    "\u05D9\u05D3\u05DB\u05DD",
    "\u05D5\u05D4\u05D9\u05D5",
    "\u05DC\u05D8\u05D5\u05D8\u05E4\u05EA",
    "\u05D1\u05D9\u05DF",
    "\u05E2\u05D9\u05E0\u05D9\u05DB\u05DD",
    "\u05D5\u05DC\u05DE\u05D3\u05EA\u05DD",
    "\u05D0\u05EA\u05DD",
    "\u05D0\u05EA",
    "\u05D1\u05E0\u05D9\u05DB\u05DD",
    "\u05DC\u05D3\u05D1\u05E8",
    "\u05D1\u05DD",
    "\u05D1\u05E9\u05D1\u05EA\u05DA",
    "\u05D1\u05D1\u05D9\u05EA\u05DA",
    "\u05D5\u05D1\u05DC\u05DB\u05EA\u05DA",
    "\u05D1\u05D3\u05E8\u05DA",
    "\u05D5\u05D1\u05E9\u05DB\u05D1\u05DA",
    "\u05D5\u05D1\u05E7\u05D5\u05DE\u05DA",
    "\u05D5\u05DB\u05EA\u05D1\u05EA\u05DD",
    "\u05E2\u05DC",
    "\u05DE\u05D6\u05D5\u05D6\u05D5\u05EA",
    "\u05D1\u05D9\u05EA\u05DA",
    "\u05D5\u05D1\u05E9\u05E2\u05E8\u05D9\u05DA",
    "\u05DC\u05DE\u05E2\u05DF",
    "\u05D9\u05E8\u05D1\u05D5",
    "\u05D9\u05DE\u05D9\u05DB\u05DD",
    "\u05D5\u05D9\u05DE\u05D9",
    "\u05D1\u05E0\u05D9\u05DB\u05DD",
    "\u05E2\u05DC",
    "\u05D4\u05D0\u05D3\u05DE\u05D4",
    "\u05D0\u05E9\u05E8",
    "\u05E0\u05E9\u05D1\u05E2",
    "\u05D9\u05D4\u05D5\u05D4",
    "\u05DC\u05D0\u05D1\u05EA\u05D9\u05DB\u05DD",
    "\u05DC\u05EA\u05EA",
    "\u05DC\u05D4\u05DD",
    "\u05DB\u05D9\u05DE\u05D9",
    "\u05D4\u05E9\u05DE\u05D9\u05DD",
    "\u05E2\u05DC",
    "\u05D4\u05D0\u05E8\u05E5"
  ];
  var ALL_WORDS = [
    ...PARSHA_SHEMA_WORDS,
    ...PARSHA_VEHAYA_WORDS
  ];
  var CANONICAL_LETTERS = ALL_WORDS.join("");
  var EXPECTED_LETTER_COUNT = CANONICAL_LETTERS.length;
  var EXPECTED_WORD_COUNT = ALL_WORDS.length;
  var LETTER_META = (() => {
    const out = [];
    let index = 0;
    ALL_WORDS.forEach((word, wordIndex) => {
      const parsha = wordIndex < PARSHA_SHEMA_WORDS.length ? 1 : 2;
      for (let posInWord = 0; posInWord < word.length; posInWord++) {
        out.push({
          char: word[posInWord],
          index,
          wordIndex,
          word,
          parsha,
          posInWord
        });
        index += 1;
      }
    });
    return out;
  })();
  var LARGE_DALET_INDEX = (() => {
    const word = ALL_WORDS[5];
    if (word !== "\u05D0\u05D7\u05D3") return 24;
    const start = ALL_WORDS.slice(0, 5).join("").length;
    return start + 2;
  })();
  var MALEI_CHASER = [
    {
      word: "\u05DC\u05D8\u05D8\u05E4\u05EA",
      parsha: 1,
      note: "\u05D7\u05E1\u05E8 \u05D1\u05E4\u05E8\u05E9\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u2014 \u05DC\u05D0 \u05DC\u05D8\u05D5\u05D8\u05E4\u05EA \u05D5\u05DC\u05D0 \u05DC\u05D8\u05D8\u05D5\u05E4\u05EA"
    },
    {
      word: "\u05DE\u05D6\u05D6\u05D5\u05EA",
      parsha: 1,
      note: "\u05D7\u05E1\u05E8 \u05D1\u05E4\u05E8\u05E9\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u2014 \u05D1\u05DC\u05D9 \u05D5\u05D9\u05F4\u05D5 \u05D0\u05D7\u05E8\u05D9 \u05D4\u05D6\u05D9\u05DF \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4"
    },
    {
      word: "\u05DC\u05D8\u05D5\u05D8\u05E4\u05EA",
      parsha: 2,
      note: "\u05DE\u05DC\u05D0 \u05D1\u05E4\u05E8\u05E9\u05D4 \u05E9\u05E0\u05D9\u05D9\u05D4 \u2014 \u05D5\u05D9\u05F4\u05D5 \u05D0\u05D7\u05E8\u05D9 \u05D4\u05D8\u05D9\u05F4\u05EA \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4"
    },
    {
      word: "\u05DE\u05D6\u05D5\u05D6\u05D5\u05EA",
      parsha: 2,
      note: "\u05DE\u05DC\u05D0 \u05D1\u05E4\u05E8\u05E9\u05D4 \u05E9\u05E0\u05D9\u05D9\u05D4 \u2014 \u05D5\u05D9\u05F4\u05D5 \u05D0\u05D7\u05E8\u05D9 \u05D4\u05D6\u05D9\u05DF \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4"
    },
    {
      word: "\u05D4\u05D8\u05D1\u05D4",
      parsha: 2,
      note: "\u05D7\u05E1\u05E8 \u2014 \u05DC\u05D0 \u05D4\u05D8\u05D5\u05D1\u05D4"
    },
    {
      word: "\u05DC\u05D0\u05D1\u05EA\u05D9\u05DB\u05DD",
      parsha: 2,
      note: "\u05D7\u05E1\u05E8 \u2014 \u05DC\u05D0 \u05D0\u05D1\u05D5\u05EA\u05D9\u05DB\u05DD"
    },
    {
      word: "\u05D5\u05EA\u05D9\u05E8\u05E9\u05DA",
      parsha: 2,
      note: "\u05D7\u05E1\u05E8 \u2014 \u05DC\u05D0 \u05EA\u05D9\u05E8\u05D5\u05E9\u05DA"
    },
    {
      word: "\u05DE\u05E6\u05D5\u05EA\u05D9",
      parsha: 2,
      note: "\u05DE\u05E6\u05D5\u05EA\u05D9 \u05D1\u05D5\u05D9\u05F4\u05D5 \u05D0\u05D7\u05EA, \u05DC\u05D0 \u05DE\u05E6\u05D5\u05D5\u05EA\u05D9"
    },
    {
      word: "\u05DE\u05D0\u05D3\u05DA",
      parsha: 1,
      note: "\u05D7\u05E1\u05E8 \u2014 \u05DC\u05D0 \u05DE\u05D0\u05D5\u05D3\u05DA"
    }
  ];

  // src/lib/mezuzah/diff.ts
  var HEBREW_LETTER = /[\u05D0-\u05EA]/g;
  var NIQQUD = /[\u0591-\u05C7]/g;
  var FINAL_MAP = {
    \u05DB: "\u05DA",
    \u05DE: "\u05DD",
    \u05E0: "\u05DF",
    \u05E4: "\u05E3",
    \u05E6: "\u05E5"
  };
  var REGULAR_FROM_FINAL = {
    \u05DA: "\u05DB",
    \u05DD: "\u05DE",
    \u05DF: "\u05E0",
    \u05E3: "\u05E4",
    \u05E5: "\u05E6"
  };
  function replaceDivineNames(input) {
    return input.replace(/יי/g, "\u05D9\u05D4\u05D5\u05D4").replace(/ה['׳]/g, "\u05D9\u05D4\u05D5\u05D4").replace(/השם/g, "\u05D9\u05D4\u05D5\u05D4").replace(/ד'/g, "\u05D9\u05D4\u05D5\u05D4");
  }
  function extractLetters(input, swapNames) {
    const source = swapNames ? replaceDivineNames(input) : input;
    const stripped = source.replace(NIQQUD, "");
    return (stripped.match(HEBREW_LETTER) ?? []).join("");
  }
  function extractWords(input, swapNames) {
    const source = swapNames ? replaceDivineNames(input) : input;
    const stripped = source.replace(NIQQUD, "");
    return stripped.split(/[^\u05D0-\u05EA]+/g).map((w) => w.trim()).filter(Boolean);
  }
  function diffLetters(expected, actual) {
    const a = [...expected];
    const b = [...actual];
    const n = a.length;
    const m = b.length;
    const dp = Array.from(
      { length: n + 1 },
      () => Array(m + 1).fill(0)
    );
    for (let i2 = n - 1; i2 >= 0; i2--) {
      for (let j2 = m - 1; j2 >= 0; j2--) {
        dp[i2][j2] = a[i2] === b[j2] ? (dp[i2 + 1][j2 + 1] ?? 0) + 1 : Math.max(dp[i2 + 1][j2] ?? 0, dp[i2][j2 + 1] ?? 0);
      }
    }
    const ops = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (a[i] === b[j]) {
        ops.push({
          type: "equal",
          char: a[i],
          expectedIndex: i,
          actualIndex: j
        });
        i += 1;
        j += 1;
      } else if ((dp[i + 1][j] ?? 0) >= (dp[i][j + 1] ?? 0)) {
        ops.push({ type: "delete", char: a[i], expectedIndex: i });
        i += 1;
      } else {
        ops.push({ type: "insert", char: b[j], actualIndex: j });
        j += 1;
      }
    }
    while (i < n) {
      ops.push({ type: "delete", char: a[i], expectedIndex: i });
      i += 1;
    }
    while (j < m) {
      ops.push({ type: "insert", char: b[j], actualIndex: j });
      j += 1;
    }
    return ops;
  }
  function describeLocation(index) {
    const meta = LETTER_META[index];
    if (!meta) return { word: "", parsha: 1, label: `\u05D0\u05D5\u05EA ${index + 1}` };
    const parshaName = meta.parsha === 1 ? "\u05E9\u05DE\u05E2" : "\u05D5\u05D4\u05D9\u05D4";
    return {
      word: meta.word,
      parsha: meta.parsha,
      label: `\u05E4\u05E8\u05E9\u05EA ${parshaName}, \u05DE\u05D9\u05DC\u05D4 \xAB${meta.word}\xBB, \u05D0\u05D5\u05EA ${meta.posInWord + 1}`
    };
  }
  function isFinalFormError(expected, actual) {
    return FINAL_MAP[actual] === expected || REGULAR_FROM_FINAL[actual] === expected;
  }
  function analyzeText(raw, swapNames) {
    const actualLetters = extractLetters(raw, swapNames);
    const actualWords = extractWords(raw, swapNames);
    if (!actualLetters) {
      return {
        actualLetters: "",
        actualLetterCount: 0,
        expectedLetterCount: EXPECTED_LETTER_COUNT,
        actualWordCount: 0,
        expectedWordCount: ALL_WORDS.length,
        missingCount: 0,
        extraCount: 0,
        issues: [],
        marks: [],
        verdict: "empty",
        summary: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05D0\u05D5\u05EA\u05D9\u05D5\u05EA \u05E2\u05D1\u05E8\u05D9\u05D5\u05EA \u05DC\u05D1\u05D3\u05D9\u05E7\u05D4."
      };
    }
    const ops = diffLetters(CANONICAL_LETTERS, actualLetters);
    const issues = [];
    const marks = [];
    let missingCount = 0;
    let extraCount = 0;
    let issueSeq = 0;
    for (const op of ops) {
      if (op.type === "equal") {
        marks.push({
          expectedIndex: op.expectedIndex,
          actualIndex: op.actualIndex,
          expected: op.char,
          actual: op.char,
          status: "ok",
          meta: LETTER_META[op.expectedIndex]
        });
      } else if (op.type === "delete") {
        missingCount += 1;
        const loc = describeLocation(op.expectedIndex);
        issues.push({
          id: `miss-${issueSeq++}`,
          kind: "missing",
          severity: "pasul",
          title: `\u05D0\u05D5\u05EA \u05D7\u05E1\u05E8\u05D4: ${op.char}`,
          detail: `\u05D7\u05E1\u05E8\u05D4 \u05D4\u05D0\u05D5\u05EA \xAB${op.char}\xBB \u2014 ${loc.label}. \u05DE\u05D6\u05D5\u05D6\u05D4 \u05E9\u05D7\u05E1\u05E8\u05D4 \u05D1\u05D4 \u05D0\u05D5\u05EA \u05D0\u05D7\u05EA \u05E4\u05E1\u05D5\u05DC\u05D4.`,
          expectedIndex: op.expectedIndex,
          expectedChar: op.char,
          word: loc.word,
          parsha: loc.parsha
        });
        marks.push({
          expectedIndex: op.expectedIndex,
          expected: op.char,
          status: "missing",
          meta: LETTER_META[op.expectedIndex]
        });
      } else {
        extraCount += 1;
        issues.push({
          id: `extra-${issueSeq++}`,
          kind: "extra",
          severity: "pasul",
          title: `\u05D0\u05D5\u05EA \u05D9\u05EA\u05E8\u05D4: ${op.char}`,
          detail: `\u05E0\u05DE\u05E6\u05D0\u05D4 \u05D4\u05D0\u05D5\u05EA \xAB${op.char}\xBB \u05E9\u05D0\u05D9\u05E0\u05D4 \u05D1\u05E0\u05D5\u05E1\u05D7. \u05DE\u05D6\u05D5\u05D6\u05D4 \u05D1\u05D9\u05EA\u05E8\u05D4 \u05D0\u05D5\u05EA \u05D0\u05D7\u05EA \u05E4\u05E1\u05D5\u05DC\u05D4.`,
          actualIndex: op.actualIndex,
          actualChar: op.char
        });
        marks.push({
          actualIndex: op.actualIndex,
          actual: op.char,
          status: "extra"
        });
      }
    }
    for (const word of actualWords) {
      const last = word.at(-1);
      if (!last) continue;
      const shouldBeFinal = FINAL_MAP[last];
      if (shouldBeFinal) {
        issues.push({
          id: `final-${issueSeq++}`,
          kind: "wrong_final",
          severity: "pasul",
          title: `\u05E6\u05D5\u05E8\u05EA \u05E1\u05D5\u05E3 \u05DE\u05D9\u05DC\u05D4 \u05E9\u05D2\u05D5\u05D9\u05D4 \u05D1\xAB${word}\xBB`,
          detail: `\u05D1\u05E1\u05D5\u05E3 \u05DE\u05D9\u05DC\u05D4 \u05E0\u05DB\u05EA\u05D1\u05D4 \xAB${last}\xBB \u05D1\u05DE\u05E7\u05D5\u05DD \u05E6\u05D5\u05E8\u05EA \u05E1\u05D5\u05E4\u05D9\u05EA \xAB${shouldBeFinal}\xBB.`,
          word
        });
      }
    }
    for (const rule of MALEI_CHASER) {
      const expectedIndex = ALL_WORDS.findIndex((w, i) => {
        const parsha = i < PARSHA_SHEMA_WORDS.length ? 1 : 2;
        return w === rule.word && parsha === rule.parsha;
      });
      if (expectedIndex < 0) continue;
      const actual = actualWords[expectedIndex];
      if (actual && actual !== rule.word && nearbySpellings(rule.word).has(actual)) {
        issues.push({
          id: `mc-${issueSeq++}`,
          kind: "malei_chaser",
          severity: "pasul",
          title: `\u05DB\u05EA\u05D9\u05D1 \u05DE\u05DC\u05D0/\u05D7\u05E1\u05E8 \u05E9\u05D2\u05D5\u05D9: ${actual}`,
          detail: `\u05E0\u05DE\u05E6\u05D0 \xAB${actual}\xBB \u05D1\u05DE\u05E7\u05D5\u05DD \xAB${rule.word}\xBB. ${rule.note}.`,
          word: rule.word,
          parsha: rule.parsha
        });
      }
    }
    const verdict = issues.length === 0 ? "clean" : "issues";
    const summary = verdict === "clean" ? `\u05D4\u05E0\u05D5\u05E1\u05D7 \u05EA\u05D5\u05D0\u05DD: ${EXPECTED_LETTER_COUNT} \u05D0\u05D5\u05EA\u05D9\u05D5\u05EA \u05D5\u05BE${ALL_WORDS.length} \u05DE\u05D9\u05DC\u05D9\u05DD.` : `\u05E0\u05DE\u05E6\u05D0\u05D5 ${missingCount} \u05D7\u05E1\u05E8\u05D5\u05EA, ${extraCount} \u05D9\u05EA\u05E8\u05D5\u05EA, \u05D5\u05BE${issues.length} \u05DE\u05DE\u05E6\u05D0\u05D9\u05DD.`;
    return {
      actualLetters,
      actualLetterCount: actualLetters.length,
      expectedLetterCount: EXPECTED_LETTER_COUNT,
      actualWordCount: actualWords.length,
      expectedWordCount: ALL_WORDS.length,
      missingCount,
      extraCount,
      issues,
      marks,
      verdict,
      summary
    };
  }
  function nearbySpellings(word) {
    const set = /* @__PURE__ */ new Set([word]);
    const letters = [...word];
    for (let i = 0; i < letters.length; i++) {
      const copy = letters.slice();
      copy.splice(i, 0, "\u05D5");
      set.add(copy.join(""));
      const copyY = letters.slice();
      copyY.splice(i, 0, "\u05D9");
      set.add(copyY.join(""));
    }
    if (word === "\u05DE\u05D6\u05D6\u05D5\u05EA") set.add("\u05DE\u05D6\u05D5\u05D6\u05D5\u05EA");
    if (word === "\u05DE\u05D6\u05D5\u05D6\u05D5\u05EA") set.add("\u05DE\u05D6\u05D6\u05D5\u05EA");
    if (word === "\u05DC\u05D8\u05D8\u05E4\u05EA") {
      set.add("\u05DC\u05D8\u05D5\u05D8\u05E4\u05EA");
      set.add("\u05DC\u05D8\u05D8\u05D5\u05E4\u05EA");
      set.add("\u05DC\u05D8\u05D5\u05D8\u05D5\u05E4\u05EA");
    }
    if (word === "\u05DC\u05D8\u05D5\u05D8\u05E4\u05EA") {
      set.add("\u05DC\u05D8\u05D8\u05E4\u05EA");
      set.add("\u05DC\u05D8\u05D8\u05D5\u05E4\u05EA");
    }
    if (word === "\u05D4\u05D8\u05D1\u05D4") set.add("\u05D4\u05D8\u05D5\u05D1\u05D4");
    if (word === "\u05DC\u05D0\u05D1\u05EA\u05D9\u05DB\u05DD") set.add("\u05DC\u05D0\u05D1\u05D5\u05EA\u05D9\u05DB\u05DD");
    if (word === "\u05D5\u05EA\u05D9\u05E8\u05E9\u05DA") set.add("\u05D5\u05EA\u05D9\u05E8\u05D5\u05E9\u05DA");
    if (word === "\u05DE\u05E6\u05D5\u05EA\u05D9") set.add("\u05DE\u05E6\u05D5\u05D5\u05EA\u05D9");
    if (word === "\u05DE\u05D0\u05D3\u05DA") set.add("\u05DE\u05D0\u05D5\u05D3\u05DA");
    return set;
  }
  return __toCommonJS(diff_exports);
})();
