const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
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
  assert.equal(next.words.I.reviewCount, 0);
  assert.equal(next.words.I.nextReview, '2026-08-13');
});

test('a fourth-level word uses the thirty-day interval after a successful review', () => {
  const progress = { words: { I: { mastery: 4, reviewCount: 0 } }, studyDates: [] };
  const next = core.applyFeedback(progress, 'I', 'understood', new Date('2026-08-12T08:00:00Z'));
  assert.equal(next.words.I.nextReview, '2026-09-11');
});

test('dueWords returns only words due on or before today', () => {
  const progress = { words: { I: { nextReview: '2026-08-12' }, you: { nextReview: '2026-08-13' }, he: { nextReview: '2026-08-10' } }, studyDates: [] };
  assert.deepEqual(core.dueWords(progress, '2026-08-12').sort(), ['I', 'he']);
});

test('plain date strings remain calendar dates in a west-coast timezone', () => {
  const appPath = JSON.stringify(require.resolve('./app.js'));
  const output = execFileSync(process.execPath, ['-e', `const core=require(${appPath}); console.log(JSON.stringify([core.localDate('2026-08-12'), core.addDays('2026-08-12', 1)]));`], {
    env: { ...process.env, TZ: 'America/Los_Angeles' },
  }).toString().trim();
  assert.deepEqual(JSON.parse(output), ['2026-08-12', '2026-08-13']);
});

test('unsure records a three-day review without mutating the input progress', () => {
  const progress = { words: { I: { mastery: 4, reviewCount: 2, history: ['again'] } }, studyDates: ['2026-08-10', '2026-08-12'] };
  const original = structuredClone(progress);
  const next = core.applyFeedback(progress, 'I', 'unsure', new Date('2026-08-12T08:00:00Z'));
  assert.equal(next.words.I.mastery, 2);
  assert.equal(next.words.I.nextReview, '2026-08-15');
  assert.equal(next.words.I.lastSeen, '2026-08-12T08:00:00.000Z');
  assert.deepEqual(next.words.I.history, ['again', 'unsure']);
  assert.deepEqual(next.studyDates, ['2026-08-10', '2026-08-12']);
  assert.deepEqual(progress, original);
});

test('missing progress falls back to empty progress', () => {
  const next = core.applyFeedback(undefined, 'I', 'understood', new Date('2026-08-12T08:00:00Z'));
  assert.equal(next.words.I.mastery, 3);
  assert.deepEqual(core.dueWords(null, '2026-08-12'), []);
});

test('unknown feedback throws without changing progress', () => {
  const progress = core.emptyProgress();
  assert.throws(() => core.applyFeedback(progress, 'I', 'maybe', new Date('2026-08-12T08:00:00Z')), /Unknown feedback: maybe/);
  assert.deepEqual(progress, core.emptyProgress());
});

test('Level 1 data contains exactly ten five-word days with lesson coverage', () => {
  const data = require('./data.js');
  assert.equal(data.vocabulary.length, 50);
  assert.equal(Object.keys(data.lessons).length, 50);
  assert.equal(data.plan.length, 10);
  assert.ok(data.plan.every(day => day.words.length === 5));
  assert.ok(data.plan.flatMap(day => day.words).every(word => data.lessons[word]));
});

test('filterWords combines text, category, and mastery filters', () => {
 const words=[{word:'I',category:'人与指向'},{word:'go',category:'核心动作引擎'}];
 const progress={words:{I:{mastery:3},go:{mastery:1}},studyDates:[]};
 assert.deepEqual(core.filterWords(words,progress,{query:'i',category:'人与指向',mastery:'3'}),[words[0]]);
});
test('nextStudyDay returns the first day that has an unstarted word',()=>{
 const plan=[{day:1,words:['I','you']},{day:2,words:['he','she']}];
 const progress={words:{I:{mastery:1},you:{mastery:3}},studyDates:[]};
 assert.equal(core.nextStudyDay(plan,progress),2);
});

test('viewKind routes pending navigation views to a safe placeholder', () => {
  assert.equal(core.viewKind('review'), 'placeholder');
  assert.equal(core.viewKind('progress'), 'placeholder');
  assert.equal(core.viewKind('lesson'), 'lesson');
});

test('parseStoredProgress rejects corrupt or invalid learning profiles before feedback', () => {
  const invalidProfiles = [
    '{not-json',
    JSON.stringify({ words: {}, studyDates: {} }),
    JSON.stringify({ words: null, studyDates: [] }),
  ];
  invalidProfiles.forEach(saved => {
    const progress = core.parseStoredProgress(saved);
    assert.deepEqual(progress, core.emptyProgress());
    assert.doesNotThrow(() => core.applyFeedback(progress, 'I', 'understood', new Date('2026-08-12T08:00:00Z')));
  });
});

test('filterWords trims a query before matching words', () => {
  const words = [{ word: 'I', category: '人与指向' }];
  assert.deepEqual(core.filterWords(words, core.emptyProgress(), { query: ' i ', category: 'all', mastery: 'all' }), words);
});

test('libraryWords uses the shared trimmed word filters', () => {
  const words = [
    { word: 'I', category: '人与指向', grade: 'S', level: 'Level 1' },
    { word: 'go', category: '核心动作引擎', grade: 'S', level: 'Level 1' },
  ];
  assert.deepEqual(core.libraryWords(words, core.emptyProgress(), { query: ' i ', category: 'all', grade: 'all', level: 'all' }), [words[0]]);
});

test('activeNavView marks only main navigation views as current', () => {
  assert.equal(core.activeNavView('lesson'), null);
  assert.equal(core.activeNavView('library'), 'library');
});
