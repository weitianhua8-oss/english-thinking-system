# Level 1 Learning System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a double-clickable, offline Level 1 learning website for the 50 English skeleton words, with learning feedback, spaced review, progress, library, tree, and contrast navigation.

**Architecture:** Keep the existing static site under `website/`. A small browser/Node-compatible core in `website/app.js` owns dates, progress records, review scheduling, and filtering; browser-only rendering and `localStorage` access wrap that core. `website/data.js` contains only the Level 1 course data, produced deterministically from the existing JSON and CSV files.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner; no external dependencies or build server.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `website/index.html` | Semantic shell, navigation including review/progress, no-script fallback. |
| `website/data.js` | Browser global containing 50 lessons, 50 vocabulary nodes, 10 daily groups, and contrast groups. |
| `website/app.js` | Pure scheduling/filtering API plus browser pages, events and local persistence. |
| `website/app.test.js` | Node tests for progress, scheduling, date-based review selection, filtering and safe course grouping. |
| `website/styles.css` | Responsive visual presentation for the completed flows and accessible interaction states. |
| `docs/09_Level1网站使用说明.md` | User-facing offline launch, workflow, storage boundary and reset instructions. |

### Task 1: Lock down learning-state behavior with failing tests

**Files:**
- Create: `website/app.test.js`
- Modify: `website/app.js`

- [ ] **Step 1: Write the failing state and review tests**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('./app.js');

test('marking a new word understood sets mastery 3 and schedules seven days later', () => {
  const progress = core.emptyProgress();
  const next = core.applyFeedback(progress, 'I', 'understood', new Date('2026-08-12T08:00:00Z'));
  assert.equal(next.words.I.mastery, 3);
  assert.equal(next.words.I.nextReview, '2026-08-19');
  assert.deepEqual(next.studyDates, ['2026-08-12']);
});

test('marking a word again resets it to a one-day review', () => {
  const progress = { words: { I: { mastery: 4, reviewCount: 2 } }, studyDates: [] };
  const next = core.applyFeedback(progress, 'I', 'again', new Date('2026-08-12T08:00:00Z'));
  assert.equal(next.words.I.mastery, 1);
  assert.equal(next.words.I.nextReview, '2026-08-13');
});

test('a fourth-level word uses the thirty-day interval after a successful review', () => {
  const progress = { words: { I: { mastery: 4, reviewCount: 0 } }, studyDates: [] };
  const next = core.applyFeedback(progress, 'I', 'understood', new Date('2026-08-12T08:00:00Z'));
  assert.equal(next.words.I.nextReview, '2026-09-11');
});

test('dueWords returns only words due on or before today', () => {
  const progress = { words: {
    I: { nextReview: '2026-08-12' },
    you: { nextReview: '2026-08-13' },
    he: { nextReview: '2026-08-10' }
  }, studyDates: [] };
  assert.deepEqual(core.dueWords(progress, '2026-08-12').sort(), ['I', 'he']);
});
```

- [ ] **Step 2: Run tests to verify the expected missing-module failure**

Run: `node --test website/app.test.js`

Expected: FAIL because `app.js` does not export `emptyProgress`, `applyFeedback`, or `dueWords`.

- [ ] **Step 3: Add the minimal testable core to `website/app.js`**

```js
function localDate(date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function addDays(day, days) {
  const date = new Date(`${day}T12:00:00`);
  date.setDate(date.getDate() + days);
  return localDate(date);
}

function emptyProgress() { return { words: {}, studyDates: [] }; }

function applyFeedback(progress, word, feedback, now = new Date()) {
  const copy = structuredClone(progress);
  const current = copy.words[word] || { mastery: 0, reviewCount: 0 };
  const day = localDate(now);
  const mastery = feedback === 'again' ? 1 : feedback === 'unsure' ? 2 : Math.min(current.mastery + 1, 4);
  const reviewCount = feedback === 'again' ? 0 : (current.reviewCount || 0) + 1;
  const days = feedback === 'again' ? 1 : mastery === 2 ? 3 : mastery === 3 ? 7 : reviewCount > 1 ? 30 : 14;
  copy.words[word] = { mastery, reviewCount, lastSeen: now.toISOString(), nextReview: addDays(day, days), history: [feedback] };
  copy.studyDates = [...new Set([...copy.studyDates, day])].sort();
  return copy;
}

function dueWords(progress, today) {
  return Object.entries(progress.words)
    .filter(([, record]) => record.nextReview && record.nextReview <= today)
    .map(([word]) => word);
}

const core = { localDate, addDays, emptyProgress, applyFeedback, dueWords };
if (typeof module !== 'undefined') module.exports = core;
```

- [ ] **Step 4: Run tests to verify state behavior**

Run: `node --test website/app.test.js`

Expected: PASS with 4 passing tests.

- [ ] **Step 5: Commit the core test scaffold**

```bash
git add website/app.js website/app.test.js
git commit -m "test: define Level 1 review scheduling"
```

### Task 2: Constrain the browser payload to the 50-word course

**Files:**
- Create: `scripts/build_level1_site_data.js`
- Modify: `website/data.js`
- Modify: `website/app.test.js`

- [ ] **Step 1: Add failing data-shape tests**

```js
test('Level 1 data contains exactly ten five-word days with lesson coverage', () => {
  const data = require('./data.js');
  assert.equal(data.vocabulary.length, 50);
  assert.equal(Object.keys(data.lessons).length, 50);
  assert.equal(data.plan.length, 10);
  assert.ok(data.plan.every(day => day.words.length === 5));
  assert.ok(data.plan.flatMap(day => day.words).every(word => data.lessons[word]));
});
```

- [ ] **Step 2: Run tests to verify the current 850-word payload fails the scope test**

Run: `node --test website/app.test.js`

Expected: FAIL because `website/data.js` currently exposes the full 850-word dataset and is not CommonJS-loadable.

- [ ] **Step 3: Implement deterministic site-data generation**

Create `scripts/build_level1_site_data.js` with this complete behavior:

```js
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const lessons = JSON.parse(fs.readFileSync(path.join(root, 'data/level1_lessons.json'), 'utf8'));
const vocabulary = JSON.parse(fs.readFileSync(path.join(root, 'data/vocabulary_850.json'), 'utf8'))
  .filter(item => item.level === 'Level 1｜50骨架词');
const plan = fs.readFileSync(path.join(root, 'data/learning_plan_170days.csv'), 'utf8')
  .replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1, 11)
  .map(line => {
    const [day, ...rest] = line.split(',');
    return { day: Number(day), words: rest.slice(0, 5) };
  });
const lessonByWord = Object.fromEntries(lessons.map(lesson => [lesson.word, lesson]));
const contrasts = [
  { title: 'go / come', words: ['go', 'come'], summary: 'GO 离开当前焦点；COME 朝当前焦点靠近。' },
  { title: 'take / bring', words: ['take', 'bring'], summary: 'TAKE 带离焦点；BRING 带向焦点。' },
  { title: 'see / look / watch', words: ['see', 'look', 'watch'], summary: 'LOOK 是方向；SEE 是看到的结果；WATCH 是持续看过程。' },
  { title: 'hear / listen', words: ['hear', 'listen'], summary: 'HEAR 是声音进入；LISTEN 是注意力主动出去。' },
  { title: 'in / on / at', words: ['in', 'on', 'at'], summary: 'IN 是内部；ON 是表面；AT 是位置点。' },
  { title: 'so / because', words: ['so', 'because'], summary: 'SO 推向结果；BECAUSE 回答原因。' }
];
const output = `window.ENGLISH850_DATA = ${JSON.stringify({ vocabulary, lessons: lessonByWord, plan, contrasts })};\nif (typeof module !== 'undefined') module.exports = window.ENGLISH850_DATA;\n`;
fs.writeFileSync(path.join(root, 'website/data.js'), output);
```

Then run: `node scripts/build_level1_site_data.js`

- [ ] **Step 4: Run scope and state tests**

Run: `node --test website/app.test.js`

Expected: PASS, including the 50 words, 10 days, and complete lesson coverage assertions.

- [ ] **Step 5: Commit the generated Level 1 course payload**

```bash
git add scripts/build_level1_site_data.js website/data.js website/app.test.js
git commit -m "feat: package Level 1 course data for offline site"
```

### Task 3: Add navigation and local progress persistence

**Files:**
- Modify: `website/index.html`
- Modify: `website/app.js`
- Modify: `website/app.test.js`

- [ ] **Step 1: Add failing tests for filtering and day selection**

```js
test('filterWords combines text, category, and mastery filters', () => {
  const words = [{ word: 'I', category: '人与指向' }, { word: 'go', category: '核心动作引擎' }];
  const progress = { words: { I: { mastery: 3 }, go: { mastery: 1 } }, studyDates: [] };
  assert.deepEqual(core.filterWords(words, progress, { query: 'i', category: '人与指向', mastery: '3' }), [words[0]]);
});

test('nextStudyDay returns the first day that has an unstarted word', () => {
  const plan = [{ day: 1, words: ['I', 'you'] }, { day: 2, words: ['he', 'she'] }];
  const progress = { words: { I: { mastery: 1 }, you: { mastery: 3 } }, studyDates: [] };
  assert.equal(core.nextStudyDay(plan, progress), 2);
});
```

- [ ] **Step 2: Run tests to verify the new helper API is missing**

Run: `node --test website/app.test.js`

Expected: FAIL because `filterWords` and `nextStudyDay` are not exported.

- [ ] **Step 3: Implement pure helpers and browser persistence**

Add the following helpers to the `core` API:

```js
function filterWords(words, progress, filters) {
  const query = (filters.query || '').trim().toLowerCase();
  return words.filter(word => {
    const mastery = progress.words[word.word]?.mastery || 0;
    return (!query || word.word.toLowerCase().includes(query))
      && (!filters.category || filters.category === 'all' || word.category === filters.category)
      && (!filters.mastery || filters.mastery === 'all' || String(mastery) === filters.mastery);
  });
}

function nextStudyDay(plan, progress) {
  return plan.find(day => day.words.some(word => !(progress.words[word]?.mastery)))?.day || plan.at(-1).day;
}
```

In browser-only code, use a `STORAGE_KEY = 'english850_level1_progress_v1'`, `loadProgress()` with JSON parse/type guards, `saveProgress(progress)` with a safe `try/catch`, and `recordFeedback(word, feedback)` that calls `applyFeedback`, persists it, and rerenders.

Replace `index.html` navigation with buttons for `today`, `review`, `library`, `tree`, `compare`, and `progress`. Give every button a `type="button"`; add `<noscript>本网站需要启用浏览器 JavaScript 才能记录学习进度。</noscript>` before scripts.

- [ ] **Step 4: Run unit tests**

Run: `node --test website/app.test.js`

Expected: PASS with the state, filtering and next-day tests all green.

- [ ] **Step 5: Commit persistence and navigation**

```bash
git add website/index.html website/app.js website/app.test.js
git commit -m "feat: add Level 1 progress persistence and navigation"
```

### Task 4: Implement learning, review, library, tree, contrast and progress pages

**Files:**
- Modify: `website/app.js`
- Modify: `website/app.test.js`

- [ ] **Step 1: Add a failing HTML escaping test**

```js
test('escapeHtml prevents lesson text from being rendered as HTML', () => {
  assert.equal(core.escapeHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
});
```

- [ ] **Step 2: Run tests to verify escaping is absent**

Run: `node --test website/app.test.js`

Expected: FAIL because `escapeHtml` is not exported.

- [ ] **Step 3: Implement the page renderers and actions**

Add this pure helper:

```js
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}
```

Replace the existing full-850 render logic with focused renderers:

- `renderToday()` shows current Day 1–10, all five course cards, a visible “继续学习” entry, and progress numbers derived from `progress.words`.
- `renderLesson(word)` displays all fields of `D.lessons[word]`, skips unrelated out-of-course links, and renders three buttons that call `recordFeedback(word, 'again'|'unsure'|'understood')`.
- `renderReview()` derives its list with `dueWords(progress, localDate(new Date()))`; front shows word/card, the answer button toggles a `revealed` map keyed by word, and feedback buttons only appear after reveal.
- `renderLibrary()` uses `filterWords` and only `D.vocabulary`; it displays search plus category/mastery filters and returns the exact matching count.
- `renderTree()` groups `D.vocabulary` by category and prints each group’s learned count as `mastery >= 1`.
- `renderCompare()` loops over `D.contrasts`, renders summary plus clickable words, and navigates to a lesson.
- `renderProgress()` prints counts for mastery 1–4, due count, a streak calculated from consecutive `studyDates`, 10 day buttons, and a two-stage reset using `window.confirm` then `localStorage.removeItem(STORAGE_KEY)`.

All dynamic lesson-derived text must use `escapeHtml`. Use event delegation from `#app` with `data-action` / `data-word` attributes rather than inline `onclick` strings.

- [ ] **Step 4: Run all unit tests**

Run: `node --test website/app.test.js`

Expected: PASS with the new HTML escaping test and no regressions.

- [ ] **Step 5: Parse-check browser scripts and run site tests**

Run: `node --check website/app.js && node --check website/data.js && node --test website/app.test.js`

Expected: all three commands exit 0.

- [ ] **Step 6: Commit completed interactive flows**

```bash
git add website/app.js website/app.test.js
git commit -m "feat: build Level 1 learning and review flows"
```

### Task 5: Make the completed flows responsive and readable

**Files:**
- Modify: `website/styles.css`

- [ ] **Step 1: Establish visual acceptance cases before CSS edits**

Record the manual cases in this task’s commit message or test note:

```text
Desktop: 1280px, today cards have one clear action and no horizontal overflow.
Mobile: 390px, navigation wraps, all feedback buttons are visible, review card and filters remain usable.
Keyboard: visible focus is present for nav, card actions, filters and reset.
```

- [ ] **Step 2: Implement scoped styles for all new states**

Add styles only for classes used by the implemented renderer: `.navGroup`, `.primaryAction`, `.statusPill`, `.feedbackActions`, `.reviewCard`, `.reviewAnswer`, `.emptyState`, `.progressGrid`, `.dayPicker`, `.dayButton`, `.filterBar`, `.notice`, and `:focus-visible`.

Use this responsive layout baseline:

```css
.feedbackActions { display: flex; flex-wrap: wrap; gap: 10px; }
.reviewCard { max-width: 720px; margin: 0 auto; }
.progressGrid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
@media (max-width: 900px) { .progressGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { main { padding: 18px 14px 42px; } .wordCard { min-height: 132px; } }
```

- [ ] **Step 3: Start the local static server**

Run: `python3 -m http.server 8765 --directory website`

Expected: server reports `Serving HTTP on ... port 8765`.

- [ ] **Step 4: Perform browser verification at desktop and mobile widths**

Open `http://127.0.0.1:8765/` and verify: Day 1 cards, a lesson feedback action, review empty/available state, a library filter, a contrast-word link, progress persistence after refresh, and mobile width at 390px.

Expected: every interaction works without console errors or horizontal overflow.

- [ ] **Step 5: Stop the local server and commit visual styling**

```bash
git add website/styles.css
git commit -m "style: make Level 1 learning flows responsive"
```

### Task 6: Write delivery instructions and complete verification

**Files:**
- Create: `docs/09_Level1网站使用说明.md`

- [ ] **Step 1: Write the user-facing launch and usage instructions**

Create a Chinese document with these exact sections:

```markdown
# 英语思维850｜Level 1 网站使用说明

## 结论
## 启动方式
## 每日学习流程
## 复习流程
## 学习状态说明
## 本地数据与清空进度
## 常见问题
```

Explain that the user opens `website/index.html`, studies 5 words each day, gives feedback after understanding the core image, reviews due cards, and that progress is stored only in this browser. State that clearing browser data or using another browser loses local progress.

- [ ] **Step 2: Run the final automated verification**

Run: `node --check website/app.js && node --check website/data.js && node --test website/app.test.js`

Expected: exit code 0 and all tests passing.

- [ ] **Step 3: Run final static content checks**

Run: `rg -n "850词库|Level 2|V1完整深度课" website || true`

Expected: no user-facing Level 2/850 vocabulary claims remain; any intentional product name reference must clearly say Level 1 / 50 words.

- [ ] **Step 4: Perform final browser smoke test**

Run: `python3 -m http.server 8765 --directory website`

Expected: at `http://127.0.0.1:8765/`, all six navigation entries render and the Level 1 workflow works from today → lesson feedback → refresh → review/progress.

- [ ] **Step 5: Commit documentation**

```bash
git add docs/09_Level1网站使用说明.md
git commit -m "docs: add Level 1 website usage guide"
```
