const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const core = require('./app.js');
const manifest = require('./assets/cards/manifest.json');
const cardManifestGenerator = require('../scripts/build_level1_card_manifest.js');
const curriculum = require('./v2-curriculum-data.js');

test('manifest covers fifty unique cards', () => {
 assert.equal(manifest.length,50); assert.equal(new Set(manifest.map(c=>c.filename)).size,50); assert.equal(manifest[0].filename,'01-i.png'); assert.equal(manifest.at(-1).filename,'50-because.png'); assert.ok(manifest.every(c=>!(/诺诺|固定人物角色/.test(c.prompt))));
});
test('cardFileName is stable',()=>{ assert.equal(core.cardFileName(1,'I'),'01-i.png'); assert.equal(core.cardFileName(50,'because'),'50-because.png'); });

test('app cardFileName matches generator validation rules', () => {
 [new String('I'), { toString: () => 'I' }, null, undefined, 1, '', 'two words', 'go!'].forEach(word => {
   assert.throws(() => core.cardFileName(1, word), /word.*[a-z0-9]/i);
 });
 ['1', 0, 1.5, 51, null].forEach(lessonNo => {
   assert.throws(() => core.cardFileName(lessonNo, 'I'), /lesson.*integer.*1.*50/i);
 });
});

test('manifest sanitizes identities and multi-scene instructions', () => {
 const forbiddenMultiScene = ['vs', '对比卡', '双场景', '多目标', '配套', '五目标', '三帧'];
 assert.ok(manifest.every(card => !(/诺诺|固定人物角色/.test(`${card.visualBrief}\n${card.prompt}`))));
 assert.ok(manifest.every(card => forbiddenMultiScene.every(token => !card.prompt.toLowerCase().includes(token.toLowerCase()))));
 assert.ok(manifest.every(card => card.prompt.includes('one single central static teaching scene')));
 assert.ok(manifest.every(card => card.prompt.includes('Visible wording is limited to the English word and exact Chinese tagline.')));
});

test('each prompt preserves a distinct cleaned word-specific visual scene', () => {
 const cardFor = word => manifest.find(card => card.word === word);
 assert.ok(manifest.every(card => card.prompt.includes(`Central scene instruction: ${card.visualBrief}`)));
 assert.ok(manifest.every(card => card.prompt.includes(card.visualBrief)));
 assert.ok(new Set(manifest.map(card => card.visualBrief)).size >= 40);
 assert.ok(new Set(manifest.map(card => card.prompt
   .replace(`"${card.word}"`, '"<word>"')
   .replace(`"${card.tagline}"`, '"<tagline>"'))).size >= 40);
 assert.match(cardFor('I').visualBrief, /焦点|镜头/);
 assert.match(cardFor('I').visualBrief, /自己|说话者/);
 assert.match(cardFor('get').visualBrief, /路径/);
 assert.match(cardFor('get').visualBrief, /目标/);
 assert.match(cardFor('look').visualBrief, /目光|注意力/);
 assert.match(cardFor('look').visualBrief, /方向|目标/);
 assert.match(cardFor('in').visualBrief, /边界/);
 assert.match(cardFor('in').visualBrief, /内部/);
 assert.match(cardFor('because').visualBrief, /原因/);
 assert.match(cardFor('because').visualBrief, /结果/);
});

test('word-specific scene overrides retain the essential spatial relationships', () => {
 const cardFor = word => manifest.find(card => card.word === word);
 assert.match(cardFor('go').visualBrief, /当前位置.*另一位置.*离开.*方向.*箭头/);
 assert.match(cardFor('come').visualBrief, /远处.*箭头.*当前焦点/);
 assert.match(cardFor('in').visualBrief, /半透明.*边界.*内.*物体/);
 assert.match(cardFor('into').visualBrief, /物体.*跨越.*边界.*向内.*箭头/);
 assert.match(cardFor('out').visualBrief, /物体.*跨越.*边界.*向外/);
 assert.match(cardFor('look').visualBrief, /眼睛.*注意.*方向.*箭头/);
 assert.match(cardFor('get').visualBrief, /起点.*单个目标/);
 assert.match(cardFor('because').visualBrief, /原因.*结果.*因果.*箭头/);
 assert.match(cardFor('I').visualBrief, /自己.*焦点/);
 assert.match(cardFor('it').visualBrief, /共同注意.*球体/);
});

test('scene overrides cover exactly every lesson word and resist generic template fallback', () => {
 const lessons = require('../data/level1_lessons.json');
 const sourceWords = lessons.map(lesson => lesson.word).sort();
 assert.deepEqual(Object.keys(cardManifestGenerator.SCENE_OVERRIDES).sort(), sourceWords);
 assert.equal(new Set(manifest.map(card => card.visualBrief)).size, 50);
 const relationToken = /箭头|边界|焦点|路径|光环|容器|表面|方向|分叉|连接|范围|起点|终点|原因|结果|群体|位置|状态|声音|眼睛|大脑|接触/;
 assert.ok(manifest.every(card => relationToken.test(card.visualBrief)));
 assert.ok(manifest.every(card => !card.visualBrief.includes('以简约物体、匿名人物剪影和柔和焦点光环表现')));
 const changedSource = cardManifestGenerator.buildVisualBrief({
   word: 'look', tagline: 'look = 任意改写。', card: '任意改写。', image: '任意改写。',
 });
 assert.equal(changedSource, cardManifestGenerator.SCENE_OVERRIDES.look);
});

test('card prompts retain the visual brief unchanged without scene labels or role text', () => {
 assert.ok(manifest.every(card => card.prompt.includes(`Central scene instruction: ${card.visualBrief}`)));
 assert.ok(manifest.every(card => card.prompt.includes('one single central static teaching scene')));
 assert.ok(manifest.every(card => !/\brole\b|\blabel\b|extra text|multi-?scene/i.test(card.prompt)));
});

test('card generator validates fields and cleans visual source material', () => {
 assert.throws(() => cardManifestGenerator.normalizeCardFields({
   word: 'not a word', tagline: 'I = 说话者。', visualBrief: '人物视角。',
 }, { word: 'I' }), /word/i);
 assert.throws(() => cardManifestGenerator.normalizeCardFields({
   word: 'I', tagline: '诺诺\u0000说话者。', visualBrief: '人物视角。',
 }, { word: 'I' }), /tagline/i);
 const translatedVisualBrief = cardManifestGenerator.buildVisualBrief({
   word: 'look', tagline: 'look = 主动把目光投向目标方向。',
   card: 'EYES → AT → TARGET', image: 'EYES → TARGET',
 });
 assert.match(translatedVisualBrief, /眼睛|注意力/);
 assert.match(translatedVisualBrief, /目标/);
 assert.match(cardManifestGenerator.sanitizeVisualBrief('诺诺 LABEL 双场景'), /匿名人物|单一画面/);
});

test('buildVisualBrief rejects words without a single-scene override', () => {
 assert.throws(() => cardManifestGenerator.buildVisualBrief({
   word: 'else', tagline: 'else = 其他情况。',
 }), /Missing single-scene override for word: else/);
});

test('buildManifest validates override coverage before mapping cards', () => {
 const lesson = { lesson_no: 1, word: 'I', tagline: 'I = 说话的人。' };
 assert.throws(() => cardManifestGenerator.buildManifest([
   lesson,
   { lesson_no: 2, word: 'else', tagline: 'else = 其他情况。' },
 ], { I: cardManifestGenerator.SCENE_OVERRIDES.I }), /missing.*else/i);
 assert.throws(() => cardManifestGenerator.buildManifest([lesson], {
   I: cardManifestGenerator.SCENE_OVERRIDES.I,
   else: '单一静态中心场景。',
 }), /extra.*else/i);
});

test('manifest card filenames remain safe generated PNG paths', () => {
 assert.ok(manifest.every(card => /^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.png$/.test(card.filename)));
});

test('card manifest rejects unsafe non-integer lesson numbers before making a filename', () => {
 const lesson = { word: 'I', tagline: 'I = 说话的人。', card: '人物居中。', image: '人物指向自己。' };
 ['1', -1, 0, 51, 1.5, '../../evil'].forEach(lessonNo => {
   assert.throws(() => cardManifestGenerator.cardFileName(lessonNo, 'I'), /lesson.*integer|lesson.*1.*50/i);
   assert.throws(() => cardManifestGenerator.buildManifest([{ ...lesson, lesson_no: lessonNo }]), /lesson.*integer|lesson.*1.*50/i);
 });
});

test('card manifest accepts only primitive string words and taglines', () => {
 [null, undefined, {}, [], new String('I'), 1].forEach(word => {
   assert.throws(() => cardManifestGenerator.normalizeWord(word, 'I'), /word/i);
 });
 [null, undefined, {}, [], new String('I = 说话的人。'), 1].forEach(tagline => {
   assert.throws(() => cardManifestGenerator.normalizeTagline(tagline), /tagline/i);
 });
});

test('manifest visual briefs are static central scenes without banned multi-scene wording', () => {
 const bannedTerms = ['标签', '胸前', '下一格', '先指向', '切换', '两格', '一格', '诺诺', '固定人物角色', '对比卡', '双场景', '多目标', '配套', '五目标', '三帧'];
 assert.ok(manifest.every(card => bannedTerms.every(term => !card.visualBrief.includes(term))));
 assert.ok(manifest.every(card => card.prompt.includes(`Central scene instruction: ${card.visualBrief}`)));
 assert.ok(manifest.every(card => card.prompt.includes('Visible wording is limited to the English word and exact Chinese tagline.')));
 const cardFor = word => manifest.find(card => card.word === word);
 assert.equal(cardFor('I').visualBrief, cardManifestGenerator.SCENE_OVERRIDES.I);
 assert.equal(cardFor('it').visualBrief, cardManifestGenerator.SCENE_OVERRIDES.it);
});

test('visual brief sanitization replaces banned scene directions with safe static wording', () => {
 const visualBrief = cardManifestGenerator.sanitizeVisualBrief('胸前标签，先指向球，下一格切换成 it。');
 assert.ok(visualBrief);
 ['标签', '胸前', '下一格', '先指向', '切换'].forEach(term => assert.ok(!visualBrief.includes(term)));
});

test('visual brief does not reintroduce multi-scene source material', () => {
 const visualBrief = cardManifestGenerator.buildVisualBrief({
   word: 'turn', tagline: 'turn = 从原来的方向或状态转到另一个方向或状态。',
   card: '方向切换 + 状态切换双场景卡。',
   image: '道路从直行转弯；旁边白天切换到黑夜。',
 });
 assert.equal(visualBrief, cardManifestGenerator.SCENE_OVERRIDES.turn);
 assert.doesNotMatch(visualBrief, /道路|旁边|白天|黑夜/);
});

test('card manifest generator preserves fifty records', () => {
 execFileSync(process.execPath, ['scripts/build_level1_card_manifest.js'], { cwd: path.resolve(__dirname, '..') });
 const manifestPath = require.resolve('./assets/cards/manifest.json');
 delete require.cache[manifestPath];
 assert.equal(require(manifestPath).length, 50);
});

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

test('complete vocabulary and learning plan keep their required coverage, including case-sensitive knowledge points', () => {
  const vocabulary = JSON.parse(fs.readFileSync(require.resolve('../data/vocabulary_850.json'), 'utf8'));
  const planRows = fs.readFileSync(require.resolve('../data/learning_plan_170days.csv'), 'utf8').trim().split(/\r?\n/).slice(1);
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');

  assert.equal(vocabulary.length, 850);
  assert.equal(new Set(vocabulary.map(entry => entry.word)).size, 850);
  // "may" and "May" deliberately use case to distinguish a modal verb from a month name.
  const mayVariants = vocabulary.filter(entry => entry.word.toLowerCase() === 'may');
  assert.equal(mayVariants.length, 2);
  assert.deepEqual(mayVariants.map(({ word, level, grade }) => ({ word, level, grade })), [
    { word: 'may', level: 'Level 2｜150生存词', grade: 'A' },
    { word: 'May', level: 'Level 4｜500基础表达词', grade: 'B' },
  ]);
  assert.deepEqual([...new Set(vocabulary.map(entry => entry.grade))].sort(), ['A', 'B', 'S']);
  const levels = new Set(vocabulary.map(entry => entry.level));
  assert.equal(levels.size, 5);
  [1, 2, 3, 4, 5].forEach(number => assert.ok([...levels].some(level => level.startsWith(`Level ${number}`))));
  assert.equal(planRows.length, 170);
  assert.equal(v2.nodes.length, 13);
  assert.deepEqual(network.validateGraph(v2).errors, []);
  v2.nodes.flatMap(node => node.relations).forEach(relation => assert.ok(relation.explanation.trim()));
});

test('V2 learning plan gives every vocabulary knowledge point one case-sensitive slot', () => {
  const csvLines = fs.readFileSync(require.resolve('../data/learning_plan_170days.csv'), 'utf8').trim().split(/\r?\n/);
  const header = csvLines[0].replace(/^\uFEFF/, '').split(',');
  const planRows = csvLines.slice(1);
  const vocabulary = JSON.parse(fs.readFileSync(require.resolve('../data/vocabulary_850.json'), 'utf8'));
  const vocabularyWords = vocabulary.map(entry => entry.word);
  const vocabularyWordSet = new Set(vocabularyWords);
  const wordColumns = ['word1', 'word2', 'word3', 'word4', 'word5'].map(column => {
    const index = header.indexOf(column);
    assert.notEqual(index, -1, `missing ${column} column`);
    return index;
  });
  const planWords = planRows.flatMap((row, dayIndex) => {
    const cells = row.split(',');
    return wordColumns.map((columnIndex, wordIndex) => {
      const word = cells[columnIndex];
      assert.ok(typeof word === 'string' && word.trim(), `Day ${dayIndex + 1} word${wordIndex + 1} must not be empty`);
      return word;
    });
  });
  const planCounts = new Map();
  planWords.forEach(word => planCounts.set(word, (planCounts.get(word) || 0) + 1));

  assert.equal(planRows.length, 170);
  assert.equal(wordColumns.length, 5);
  assert.equal(planWords.length, 850);
  planWords.forEach(word => assert.ok(vocabularyWordSet.has(word), `plan word must exactly match vocabulary word: ${word}`));
  vocabularyWords.forEach(word => assert.equal(planCounts.get(word), 1, `vocabulary word must appear exactly once in the plan: ${word}`));
  assert.equal(planCounts.size, vocabularyWordSet.size);
  assert.deepEqual([...planCounts.keys()].sort(), [...vocabularyWordSet].sort());
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

test('viewKind routes every main navigation view to its renderer', () => {
  assert.equal(core.viewKind('review'), 'review');
  assert.equal(core.viewKind('progress'), 'progress');
  assert.equal(core.viewKind('network'), 'network');
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
  assert.equal(core.activeNavView('network'), 'network');
});

test('escapeHtml encodes text before it enters rendered HTML', () => {
  assert.equal(core.escapeHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
});

test('streak counts consecutive study dates ending today', () => {
  assert.equal(core.streak(['2026-08-10', '2026-08-11', '2026-08-12'], '2026-08-12'), 3);
});

test('masteryCounts returns one bucket for each mastery level', () => {
  const progress = { words: { I: { mastery: 1 }, you: { mastery: 2 }, he: { mastery: 3 }, she: { mastery: 4 } }, studyDates: [] };
  assert.deepEqual(core.masteryCounts(progress), { 1: 1, 2: 1, 3: 1, 4: 1 });
});

test('dayCompletion counts mastered words in a study day', () => {
  const progress = { words: { I: { mastery: 1 }, you: { mastery: 3 } }, studyDates: [] };
  assert.deepEqual(core.dayCompletion({ day: 1, words: ['I', 'you', 'he'] }, progress), { completed: 2, total: 3 });
});

test('todayCards supplies each word lesson tagline', () => {
  const cards = core.todayCards({ day: 1, words: ['I', 'you'] }, {
    I: { tagline: 'I = 说话的人。', category: '人与指向' },
    you: { tagline: 'you = 正在面对的人。', category: '人与指向' },
  }, core.emptyProgress());
  assert.deepEqual(cards.map(card => card.tagline), ['I = 说话的人。', 'you = 正在面对的人。']);
});

test('resolveStudyDay advances after the selected day is fully learned', () => {
  const plan = [{ day: 1, words: ['I', 'you'] }, { day: 2, words: ['he', 'she'] }];
  const progress = { words: { I: { mastery: 1 }, you: { mastery: 3 } }, studyDates: [] };
  assert.equal(core.resolveStudyDay(1, plan, progress), 2);
});

test('lessonMeta exposes the master word number and learning stage', () => {
  assert.deepEqual(core.lessonMeta({ master_id: 8, level: 'Level 1｜50骨架词' }), { masterId: 8, level: 'Level 1｜50骨架词' });
});

test('groupCategories follows the five systems in vocabulary data', () => {
  const data = require('./data.js');
  assert.equal(core.groupCategories(data.vocabulary).length, 5);
});

test('nextLibraryFilters keeps the complete typed query', () => {
  const first = core.nextLibraryFilters({ query: '', category: 'all', mastery: 'all' }, { query: 'g' });
  assert.deepEqual(core.nextLibraryFilters(first, { query: 'go' }), { query: 'go', category: 'all', mastery: 'all' });
});

test('successful reviews reach mastery four with fourteen then thirty day intervals', () => {
  const now = new Date('2026-08-12T08:00:00Z');
  const first = core.applyFeedback(core.emptyProgress(), 'I', 'understood', now);
  const second = core.applyFeedback(first, 'I', 'understood', now);
  const third = core.applyFeedback(second, 'I', 'understood', now);
  assert.deepEqual([first.words.I.mastery, first.words.I.nextReview], [3, '2026-08-19']);
  assert.deepEqual([second.words.I.mastery, second.words.I.nextReview], [4, '2026-08-26']);
  assert.deepEqual([third.words.I.mastery, third.words.I.nextReview], [4, '2026-09-11']);
});

test('parseStoredProgress drops invalid word records so progress consumers remain safe', () => {
  const progress = core.parseStoredProgress(JSON.stringify({ words: { I: { mastery: 3, nextReview: '2026-08-12' }, bad: null, array: [] }, studyDates: [] }));
  assert.deepEqual(Object.keys(progress.words), ['I']);
  assert.doesNotThrow(() => core.dueWords(progress, '2026-08-12'));
  assert.doesNotThrow(() => core.masteryCounts(progress));
});

test('safeRemoveProgress reports a failed local removal', () => {
  assert.equal(core.safeRemoveProgress(() => { throw new Error('blocked'); }), false);
  assert.equal(core.safeRemoveProgress(() => {}), true);
});

test('lessonFor returns null for an unknown lesson', () => {
  assert.equal(core.lessonFor({ I: { word: 'I' } }, 'missing'), null);
});

test('v2LessonFor returns a V2 lesson only when the word matches a V2 node', () => {
  const v2 = require('./v2-data.js');
  assert.equal(core.v2LessonFor(v2, 'to').word, 'TO');
  assert.equal(core.v2LessonFor(v2, 'go'), null);
});

test('every V2 sample node has a complete three-layer lesson', () => {
  const v2 = require('./v2-data.js');
  v2.nodes.forEach(node => assert.ok(core.v2LessonFor(v2, node.id), `${node.id} should open a V2 lesson`));
});

test('network content opens the selected V2 sample course and exposes its mobile step', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  const markup = core.renderNetworkContent(v2, network, { networkSystem: 'structural-choice', networkNode: 'too-to', explorePath: [], networkStep: 'detail' });
  assert.match(markup, /data-network-step="detail"/);
  assert.match(markup, /data-action="open-word" data-word="too-to"/);
  assert.match(markup, /打开三层课程/);
  assert.match(markup, /data-action="network-mobile-systems"/);
  assert.match(markup, /data-action="network-mobile-nodes"/);
});

test('renderNetworkContent exposes only the relation type badges present on each node', () => {
  const data = require('./v2-data.js');
  const graph = require('./v2-network.js');
  const toMarkup = core.renderNetworkContent(data, graph, {
    networkSystem: 'space-relations', networkNode: 'to', explorePath: [], networkStep: 'detail',
  });
  const beMarkup = core.renderNetworkContent(data, graph, {
    networkSystem: 'state-action', networkNode: 'be', explorePath: [], networkStep: 'detail',
  });
  assert.match(toMarkup, /networkMapWorkspace/);
  assert.match(toMarkup, /relationBadge relation-combination/);
  assert.match(toMarkup, /relationBadge relation-contrast/);
  assert.doesNotMatch(toMarkup, /relationBadge relation-growth/);
  assert.match(beMarkup, /relationBadge relation-growth/);
});

test('network growth relation badge uses a teal visual language', () => {
  const styles = fs.readFileSync(require.resolve('./styles.css'), 'utf8');
  assert.match(styles, /\.networkMapWorkspace \.relation-growth\{border-color:#99f6e4;background:#f0fdfa;color:#0f766e\}/);
});

test('mind map styles present direct relation branches without mobile overflow', () => {
  const styles = fs.readFileSync(require.resolve('./styles.css'), 'utf8');
  assert.match(styles, /\.mindMapCanvas\{[^}]*min-width:0/);
  assert.match(styles, /\.mindBranch-system\{[^}]*color:#526174/);
  assert.match(styles, /\.mindBranch-growth\{[^}]*color:#0f766e/);
  assert.match(styles, /\.mindBranch-combination\{[^}]*color:#6d28d9/);
  assert.match(styles, /\.mindBranch-contrast\{[^}]*color:#a15c00/);
  assert.match(styles, /@media\(max-width:900px\)\{[^]*?\.mindMapCanvas\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(styles, /@media\(max-width:900px\)\{[^]*?\.mindBranch::before\{display:none/);
});

test('narrow desktop network styles keep the V2 map in one reachable panel', () => {
  const styles = fs.readFileSync(require.resolve('./styles.css'), 'utf8');
  assert.match(styles, /@media\(max-width:1180px\)\{[^]*?\.networkMapWorkspace \.networkLayout\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(styles, /@media\(max-width:1180px\)\{[^]*?\.networkMapWorkspace \.mindMapCanvas\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(styles, /@media\(max-width:1180px\)\{[^]*?\.networkMapWorkspace \.networkMobileNav\{display:block/);
  assert.match(styles, /@media\(max-width:1180px\)\{[^]*?\.networkMobileRelationList\{display:grid/);
});

test('networkStepForAction keeps the mobile network in one panel at a time', () => {
  assert.equal(typeof core.networkStepForAction, 'function');
  assert.equal(core.networkStepForAction('systems', 'select-network-system'), 'nodes');
  assert.equal(core.networkStepForAction('nodes', 'select-network-node'), 'detail');
  assert.equal(core.networkStepForAction('nodes', 'select-network-relation'), 'detail');
  assert.equal(core.networkStepForAction('detail', 'network-mobile-nodes'), 'nodes');
  assert.equal(core.networkStepForAction('nodes', 'network-mobile-systems'), 'systems');
  assert.equal(core.networkStepForAction('detail', 'network-back'), 'detail');
  assert.equal(core.networkStepForAction('detail', 'nav-network'), 'systems');
  assert.equal(core.networkStepForAction('systems', 'lesson-network'), 'detail');
});

test('lessonLayerForAction switches only among the three V2 learning layers', () => {
  assert.equal(core.lessonLayerForAction('quick','lesson-layer-deep'),'deep');
  assert.equal(core.lessonLayerForAction('deep','lesson-layer-network'),'network');
  assert.equal(core.lessonLayerForAction('network','unknown'),'network');
  ['toString', 'constructor', '__proto__'].forEach(action => assert.equal(core.lessonLayerForAction('network', action), 'network'));
  assert.equal(core.lessonLayerForAction(null, 'toString'), 'quick');
});

test('renderLessonMiniNetwork shows the selected V2 lesson and safe network entry points', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  const markup = core.renderLessonMiniNetwork(v2, network, core.v2LessonFor(v2, 'to'));
  assert.match(markup, /TO/);
  assert.match(markup, /核心意义/);
  assert.match(markup, /所属系统/);
  assert.match(markup, /方向箭头 vs 定位点/);
  assert.match(markup, /data-action="view" data-view="network" data-node-id="into"/);

  const injected = structuredClone(v2);
  injected.nodes.find(node => node.id === 'in').relations.push({ type: 'combination', target: 'into', label: 'TO 的伪关系', explanation: '不应从其他节点带入。' });
  const injectedMarkup = core.renderLessonMiniNetwork(injected, network, core.v2LessonFor(injected, 'to'));
  assert.doesNotMatch(injectedMarkup, /TO 的伪关系|不应从其他节点带入/);

  const unsafe = structuredClone(v2);
  unsafe.nodes.find(node => node.id === 'to').coreMeaning = '<script>alert(1)<\/script>';
  unsafe.nodes.find(node => node.id === 'to').relations.find(relation => relation.target === 'into').label = '<img src=x onerror=alert(2)>';
  const unsafeMarkup = core.renderLessonMiniNetwork(unsafe, network, core.v2LessonFor(unsafe, 'to'));
  assert.match(unsafeMarkup, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(unsafeMarkup, /&lt;img src=x onerror=alert\(2\)&gt;/);
  assert.doesNotMatch(unsafeMarkup, /<script>|<img src=x/);
});

test('renderLessonMiniNetwork shows a neutral message without explorable relations', () => {
  const v2 = structuredClone(require('./v2-data.js'));
  const network = require('./v2-network.js');
  v2.nodes.forEach(node => { node.relations = []; });
  const markup = core.renderLessonMiniNetwork(v2, network, core.v2LessonFor(v2, 'to'));
  assert.match(markup, /该关联内容暂未开放/);
});

test('renderLessonMiniNetwork safely handles null and throwing relation APIs', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  const node = core.v2LessonFor(v2, 'to');
  [
    { ...network, explorableRelations: () => null },
    { ...network, explorableRelations: () => { throw new Error('relation api failed'); } },
  ].forEach(graphApi => {
    let markup;
    assert.doesNotThrow(() => { markup = core.renderLessonMiniNetwork(v2, graphApi, node); });
    assert.match(markup, /该关联内容暂未开放/);
  });
});

test('renderV2LessonWorkspace keeps semantic content in one selected layer', () => {
  const data = require('./v2-data.js');
  const markup = core.renderV2LessonWorkspace(data, require('./v2-network.js'), core.v2LessonFor(data, 'to'), 'quick');
  assert.match(markup, /data-action="lesson-layer-deep"/);
  assert.match(markup, /workspaceLayer[^\"]* active/);
  assert.match(markup, /核心画面/);
});

test('V2 workspace tabs stay three equal touch targets on narrow screens', () => {
  const styles = fs.readFileSync(require.resolve('./styles.css'), 'utf8');
  assert.match(styles, /@media\(max-width:900px\)[\s\S]*?\.workspaceTabs\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\);gap:8px;padding:12px 24px;overflow:visible\}/);
  assert.match(styles, /\.workspaceTab\{width:100%;min-width:0;min-height:44px;/);
});

test('V2 keeps one active learning layer and does not enroll V1 GO', () => {
  const data = require('./v2-data.js');
  const graph = require('./v2-network.js');
  const markup = core.renderV2LessonWorkspace(data, graph, core.v2LessonFor(data, 'to'), 'deep');
  assert.equal(core.v2LessonFor(data, 'go'), null);
  assert.match(markup, /workspaceLayer deepLayer active/);
  assert.equal((markup.match(/workspaceLayer[^\"]* active/g) || []).length, 1);
  assert.doesNotMatch(markup, /workspaceLayer quickLayer active|workspaceLayer networkLayer active/);
});

test('reviewContentFor preserves V1 cards and renders revealed V2 review details safely', () => {
  const v2 = structuredClone(require('./v2-data.js'));
  const v2Word = 'too-to';
  const node = v2.nodes.find(item => item.id === v2Word);
  node.coreImage = '<img src=x onerror=alert(1)>';
  node.quick.origin = '<script>alert(2)</script>';
  const markup = core.reviewContentFor(['I', v2Word], {
    I: { card: '第一人称画面', tagline: 'I 是说话的人。', examples: ['I am ready.'], contrast: '不是 you。' },
  }, v2, { I: { category: '人与指向' } }, { I: true, [v2Word]: true });
  assert.match(markup, /I 是说话的人。/);
  assert.match(markup, /I am ready\./);
  assert.match(markup, /不是 you。/);
  assert.match(markup, /状态与动作/);
  assert.match(markup, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(markup, /&lt;script&gt;alert\(2\)&lt;\/script&gt;/);
  assert.match(markup, /data-feedback="understood"/);
  assert.doesNotMatch(markup, /<img src=x|<script>/);
});

test('V2 graph use requires a validator with no reported errors', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  const invalid = structuredClone(v2);
  invalid.nodes.find(node => node.id === 'to').deep.scenes = [];
  assert.equal(core.isUsableV2Graph(v2, network), true);
  assert.equal(core.isUsableV2Graph(invalid, network), false);
});

test('network readiness requires usable V2 data and a valid graph API', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  assert.equal(core.isNetworkReady(v2, network), true);
  assert.equal(core.isNetworkReady(null, network), false);
  assert.equal(core.isNetworkReady(v2, {}), false);
});

test('relationSelectionKey identifies one complete relation by all learner-visible fields', () => {
  const relation = { type: 'combination', target: 'into', label: 'TO + IN → INTO', explanation: '方向进入边界内部。' };
  assert.equal(core.relationSelectionKey(relation), JSON.stringify(['combination', 'into', 'TO + IN → INTO', '方向进入边界内部。']));
  assert.equal(core.relationSelectionKey({ ...relation, explanation: '另一条解释。' }), JSON.stringify(['combination', 'into', 'TO + IN → INTO', '另一条解释。']));
  assert.equal(core.relationSelectionKey({ type: 'combination', target: 'into', label: '', explanation: '缺少标签。' }), null);
});

test('selectedNetworkRelation returns only the current node’s real explorable relation', () => {
  const v2 = require('./v2-data.js');
  const graph = require('./v2-network.js');
  const node = graph.nodeById(v2, 'to');
  const relation = node.relations.find(item => item.target === 'into');
  assert.equal(core.selectedNetworkRelation(v2, graph, node, core.relationSelectionKey(relation))?.target, 'into');
  assert.equal(core.selectedNetworkRelation(v2, graph, node, 'be'), null);
  assert.equal(core.selectedNetworkRelation(v2, graph, node, null), null);
});

test('selectedNetworkRelation rejects invalid graph inputs without throwing', () => {
  const v2 = require('./v2-data.js');
  const graph = require('./v2-network.js');
  const node = graph.nodeById(v2, 'to');
  const relation = node.relations.find(item => item.target === 'into');
  const targetNode = graph.nodeById(v2, 'into');
  const selectionKey = JSON.stringify([relation.type, relation.target, relation.label, relation.explanation]);
  const invalidGraphs = [
    null,
    {},
    { validateGraph: () => ({ errors: ['invalid'] }), explorableRelations: () => [{ ...relation, targetNode, targetSystem: null }] },
    { validateGraph: () => ({ errors: [] }), explorableRelations: () => { throw new Error('broken relation API'); } },
    { validateGraph: () => ({ errors: [] }), explorableRelations: () => null },
  ];
  const invalidCalls = [
    () => core.selectedNetworkRelation(null, graph, node, selectionKey),
    ...invalidGraphs.map(api => () => core.selectedNetworkRelation(v2, api, node, selectionKey)),
    () => core.selectedNetworkRelation(v2, graph, null, selectionKey),
    () => core.selectedNetworkRelation(v2, graph, { id: 'missing' }, selectionKey),
    () => core.selectedNetworkRelation(v2, graph, node, ' '),
  ];
  invalidCalls.forEach(call => {
    assert.doesNotThrow(call);
    assert.equal(call(), null);
  });
});

test('selectedNetworkRelation rejects fabricated and incomplete graph relations', () => {
  const v2 = require('./v2-data.js');
  const node = v2.nodes.find(item => item.id === 'to');
  const canonical = node.relations.find(relation => relation.target === 'into');
  const selectionKey = JSON.stringify([canonical.type, canonical.target, canonical.label, canonical.explanation]);
  const graph = {
    validateGraph: () => ({ errors: [] }),
    explorableRelations: () => [
      { ...canonical, target: 'be', targetNode: { id: 'be' } },
      { ...canonical, targetNode: null },
    ],
  };
  assert.equal(core.selectedNetworkRelation(v2, graph, node, 'be'), null);
  assert.equal(core.selectedNetworkRelation(v2, graph, node, selectionKey), null);
});

test('selectNetworkNode follows an explorable V2 node and clears selected relation', () => {
  const v2 = require('./v2-data.js');
  const start = { networkSystem: 'space-relations', networkNode: 'to', explorePath: [], networkRelation: 'into' };
  assert.deepEqual(core.selectNetworkNode(start, v2, 'into'), {
    networkSystem: 'space-relations', networkNode: 'into', explorePath: ['to'], networkRelation: null,
  });
  const unchanged = core.selectNetworkNode(start, v2, 'missing');
  assert.deepEqual(unchanged, {...start, networkRelation: null});
  assert.notEqual(unchanged, start);
  const invalid = structuredClone(v2);
  invalid.nodes.find(node => node.id === 'into').deep.scenes = [];
  assert.deepEqual(core.selectNetworkNode(start, invalid, 'into'), {...start, networkRelation: null});
});

test('selectNetworkBack restores the last explored node and removes it from the path', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  assert.deepEqual(core.selectNetworkBack({ networkSystem: 'space-relations', networkNode: 'into', explorePath: ['to'] }, v2, network), {
    networkSystem: 'space-relations', networkNode: 'to', explorePath: [], networkRelation: null,
  });
});

test('selectNetworkSystem preserves the current node in the path for a system relation', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  const start = { networkSystem: 'space-relations', networkNode: 'at', explorePath: [] };
  const selected = core.selectNetworkSystem(start, v2, 'space-relations', true);
  assert.deepEqual(selected, { networkSystem: 'space-relations', networkNode: 'at', explorePath: ['at'], networkRelation: null });
  assert.deepEqual(core.selectNetworkBack(selected, v2, network), {...start, networkRelation: null});
});

test('selectNetworkDirect opens a course node without inheriting a prior explore path', () => {
  const v2 = require('./v2-data.js');
  assert.deepEqual(core.selectNetworkDirect({ networkSystem: 'space-relations', networkNode: 'to', explorePath: ['at'] }, v2, 'at'), {
    networkSystem: 'space-relations', networkNode: 'at', explorePath: [], networkRelation: null,
  });
});

test('renderNetworkContent shows only relations verified as explorable', () => {
  const v2 = structuredClone(require('./v2-data.js'));
  const network = require('./v2-network.js');
  v2.nodes.find(node => node.id === 'to').relations.push({
    type: 'contrast', target: 'missing-node', label: '不应出现的关系', explanation: '目标不存在。',
  });
  const markup = core.renderNetworkContent(v2, { ...network, validateGraph: () => ({ errors: [] }) }, { networkSystem: 'space-relations', networkNode: 'to', explorePath: [] });
  assert.match(markup, /方向箭头 vs 定位点/);
  assert.doesNotMatch(markup, /不应出现的关系|目标不存在/);
});

test('renderNetworkContent renders the selected real relation as a mind-map branch', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  const relation = network.nodeById(v2, 'to').relations.find(item => item.target === 'into');
  const markup = core.renderNetworkContent(v2, network, {
    networkSystem: 'space-relations', networkNode: 'to', explorePath: [], networkRelation: core.relationSelectionKey(relation), networkStep: 'detail',
  });
  assert.match(markup, /class="mindMapRoot"/);
  assert.match(markup, /class="mindBranch mindBranch-combination"/);
  assert.match(markup, /data-action="select-network-relation" data-relation-key=/);
  assert.match(markup, /class="networkRelationPanel"/);
  assert.match(markup, /TO \+ IN/);
  assert.doesNotMatch(markup, /mindBranch mindBranch-growth/);
});

test('network detail keeps all current-word relation choices beside the explanation', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  const inNode = network.nodeById(v2, 'in');
  const selected = inNode.relations.find(relation => relation.type === 'combination' && relation.target === 'into');
  const selectedKey = core.relationSelectionKey(selected).replace(/"/g, '&quot;');
  const markup = core.renderNetworkContent(v2, network, {
    networkSystem: 'space-relations', networkNode: 'in', explorePath: [], networkRelation: core.relationSelectionKey(selected), networkStep: 'detail',
  });
  const start = markup.indexOf('<section class="networkMobileRelationList">');
  const mobileList = markup.slice(start, markup.indexOf('</section>', start) + 10);
  assert.ok(start >= 0);
  assert.match(mobileList, /选择要理解的关系/);
  assert.match(mobileList, /mindBranch mindBranch-combination/);
  assert.match(mobileList, /mindBranch mindBranch-contrast/);
  assert.ok(mobileList.includes(`data-relation-key="${selectedKey}" aria-pressed="true"`));
});

test('renderNetworkContent falls back to core origin for an invalid selected relation', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  const markup = core.renderNetworkContent(v2, network, {
    networkSystem: 'space-relations', networkNode: 'to', explorePath: [], networkRelation: 'not-a-relation', networkStep: 'detail',
  });
  assert.match(markup, /核心本源/);
  assert.doesNotMatch(markup, /not-a-relation/);
});

test('renderNetworkContent keeps distinct same-target relations selectable by key', () => {
  const v2 = structuredClone(require('./v2-data.js'));
  const network = require('./v2-network.js');
  const inNode = v2.nodes.find(node => node.id === 'in');
  inNode.relations.push({
    type: 'contrast', target: 'into', label: '静态内部 vs 动态进入', explanation: 'IN 是已经在里面；INTO 是穿过边界进入里面。',
  });
  const combination = inNode.relations.find(relation => relation.type === 'combination' && relation.target === 'into');
  const contrast = inNode.relations.find(relation => relation.type === 'contrast' && relation.target === 'into');
  const combinationKey = core.relationSelectionKey(combination);
  const contrastKey = core.relationSelectionKey(contrast);
  const combinationMarkup = core.renderNetworkContent(v2, network, {
    networkSystem: 'space-relations', networkNode: 'in', explorePath: [], networkRelation: combinationKey, networkStep: 'detail',
  });
  const contrastMarkup = core.renderNetworkContent(v2, network, {
    networkSystem: 'space-relations', networkNode: 'in', explorePath: [], networkRelation: contrastKey, networkStep: 'detail',
  });
  assert.match(combinationMarkup, /mindBranch mindBranch-combination/);
  assert.match(combinationMarkup, /mindBranch mindBranch-contrast/);
  assert.equal(core.selectedNetworkRelation(v2, network, inNode, combinationKey)?.label, combination.label);
  assert.equal(core.selectedNetworkRelation(v2, network, inNode, contrastKey)?.explanation, contrast.explanation);
  assert.match(combinationMarkup, new RegExp(combination.explanation));
  assert.match(contrastMarkup, new RegExp(contrast.explanation));
});

test('renderNetworkContent safely handles null and throwing system node APIs', () => {
  const v2 = require('./v2-data.js');
  const network = require('./v2-network.js');
  [
    { ...network, nodesForSystem: () => null },
    { ...network, nodesForSystem: () => { throw new Error('system nodes failed'); } },
  ].forEach(graphApi => {
    let markup;
    assert.doesNotThrow(() => { markup = core.renderNetworkContent(v2, graphApi, { networkSystem: 'space-relations', networkNode: 'to', explorePath: [] }); });
    assert.match(markup, /该系统暂未提供词条。/);
  });
});

test('renderNetworkContent includes the current node core origin with safe HTML', () => {
  const v2 = structuredClone(require('./v2-data.js'));
  const network = require('./v2-network.js');
  v2.nodes.find(node => node.id === 'to').quick.origin = '<img src=x onerror=alert(1)>';
  const markup = core.renderNetworkContent(v2, { ...network, validateGraph: () => ({ errors: [] }) }, { networkSystem: 'space-relations', networkNode: 'to', explorePath: [] });
  assert.match(markup, /核心本源/);
  assert.match(markup, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(markup, /<img src=x/);
});

test('renderNetworkContent hides fully invalid relations behind a neutral message', () => {
  const v2 = structuredClone(require('./v2-data.js'));
  const network = require('./v2-network.js');
  v2.nodes.find(node => node.id === 'the').relations = [{ type: 'contrast', target: 'missing', label: '不应显示', explanation: '不应显示。' }];
  const markup = core.renderNetworkContent(v2, { ...network, validateGraph: () => ({ errors: [] }) }, { networkSystem: 'information-structure', networkNode: 'the', explorePath: [] });
  assert.match(markup, /该关联内容暂未开放/);
  assert.doesNotMatch(markup, /不应显示/);
});

test('renderNetworkContent safely falls back when V2 data is invalid', () => {
  const v2 = structuredClone(require('./v2-data.js'));
  v2.nodes = [];
  const markup = core.renderNetworkContent(v2, require('./v2-network.js'), { networkSystem: 'space-relations', networkNode: 'to', explorePath: [] });
  assert.match(markup, /知识网络暂不可用/);
});

test('returnTopButton renders an accessible return-to-top control', () => {
  const markup = core.returnTopButton();
  assert.match(markup, /data-action="return-top"/);
  assert.match(markup, /↑ 返回顶部/);
});

test('v2LessonFor rejects a malformed matching V2 node so V1 can render it', () => {
  const invalid = structuredClone(require('./v2-data.js'));
  invalid.nodes.find(node => node.id === 'to').deep.scenes = [];
  assert.equal(core.v2LessonFor(invalid, 'to'), null);
});

test('v2 scene groups keep each title, explanation, and example together', () => {
  const v2 = require('./v2-data.js');
  v2.nodes.forEach(node => {
    assert.ok(Array.isArray(node.deep.scenes));
    assert.ok(node.deep.scenes.length > 0);
    node.deep.scenes.forEach(scene => {
      assert.equal(typeof scene.title, 'string');
      assert.ok(scene.title.trim());
      assert.equal(typeof scene.body, 'string');
      assert.ok(scene.body.trim());
      assert.equal(typeof scene.example, 'string');
      assert.ok(scene.example.trim());
    });
  });
});

test('sceneGroupsFor returns an empty list for malformed scene data', () => {
  assert.deepEqual(core.sceneGroupsFor('at school、at six'), []);
  assert.deepEqual(core.sceneGroupsFor([{ title: '定位', body: '把地点看作点。', example: 'Meet me at the door.' }]), [{ title: '定位', body: '把地点看作点。', example: 'Meet me at the door.' }]);
});

test('safePlanDay returns null when the plan has no selectable day', () => {
  assert.equal(core.safePlanDay([], 1), null);
});

test('parseStoredProgress normalizes malformed word record fields before feedback', () => {
  const progress = core.parseStoredProgress(JSON.stringify({
    words: { I: { history: 123, mastery: '3', reviewCount: 'bad', lastSeen: 2, nextReview: null } },
    studyDates: [],
  }));
  assert.deepEqual(progress.words.I, { history: [], mastery: 3, reviewCount: 0 });
  assert.doesNotThrow(() => core.applyFeedback(progress, 'I', 'understood', new Date('2026-08-12T08:00:00Z')));
  const next = core.applyFeedback(progress, 'I', 'understood', new Date('2026-08-12T08:00:00Z'));
  assert.deepEqual([next.words.I.mastery, next.words.I.reviewCount, next.words.I.nextReview], [4, 1, '2026-08-26']);
});

test('V2 graph contains thirteen complete nodes across the four learning systems', () => {
  const data = require('./v2-data.js');
  assert.equal(data.nodes.length, 13);
  assert.deepEqual(data.systems.map(system => system.id).sort(), [
    'attention',
    'information-structure',
    'space-relations',
    'state-action',
  ]);
  data.nodes.forEach(node => {
    assert.ok(node.id);
    assert.ok(node.word);
    assert.ok(node.systemId);
    assert.ok(node.coreMeaning);
    assert.ok(node.coreImage);
    assert.ok(node.quick.origin);
    assert.ok(node.quick.example);
    assert.ok(node.quick.memoryHook);
    assert.ok(node.deep.logic);
    assert.ok(Array.isArray(node.deep.scenes));
    node.deep.scenes.forEach(scene => {
      assert.ok(scene.title);
      assert.ok(scene.body);
      assert.ok(scene.example);
    });
    assert.ok(node.deep.structures);
    assert.ok(node.deep.chineseTrap);
    assert.ok(node.deep.studyTip);
    assert.ok(Array.isArray(node.relations));
  });
});

test('V2 graph relations use supported types, explanations, and required learning links', () => {
  const data = require('./v2-data.js');
  const network = require('./v2-network.js');
  const relationKeys = data.nodes.flatMap(node => node.relations.map(relation => `${node.id}:${relation.type}:${relation.target}`));
  data.nodes.flatMap(node => node.relations).forEach(relation => {
    assert.ok(['system', 'growth', 'combination', 'contrast'].includes(relation.type));
    assert.ok(relation.label.trim());
    assert.ok(relation.explanation.trim());
  });
  assert.ok(relationKeys.includes('in:combination:into'));
  assert.ok(relationKeys.includes('to:contrast:at'));
  assert.ok(relationKeys.includes('in:contrast:into'));
  assert.ok(relationKeys.includes('see:contrast:look'));
  assert.ok(relationKeys.includes('look:contrast:watch'));
  assert.ok(relationKeys.includes('be:growth:ing'));
  assert.ok(relationKeys.includes('too-to:combination:to'));
  const tooToLabel = 'TOO + adj./adv. + to do → TOO...TO...';
  const toNode = network.nodeById(data, 'to');
  const tooToNode = network.nodeById(data, 'too-to');
  const toTooToRelation = toNode.relations.find(relation => relation.target === 'too-to');
  const tooToToRelation = tooToNode.relations.find(relation => relation.target === 'to');
  assert.equal(toTooToRelation.label, tooToLabel);
  assert.equal(tooToToRelation.label, tooToLabel);
  assert.equal(tooToNode.coreImage, '程度量表越过阈值，后接一个尚未能够完成的动作。');
  [toNode.deep.logic, toTooToRelation.explanation, tooToNode.deep.logic, tooToToRelation.explanation].forEach(text => {
    assert.match(text, /不定式标记/);
    assert.match(text, /程度过高以致后续动作无法实现/);
  });
  assert.equal(network.nodeById(data, 'too-to').systemId, 'state-action');
  assert.equal(network.nodeById(data, 'the').relations.some(relation => relation.target === 'if'), false);
  assert.deepEqual(network.validateGraph(data).errors, []);
});

test('validateGraph reports an unknown relation target and blank explanation', () => {
  const data = require('./v2-data.js');
  const network = require('./v2-network.js');
  const invalid = structuredClone(data);
  invalid.nodes[0].relations.push(
    { type: 'contrast', target: 'missing-node', explanation: '指向不存在节点。' },
    { type: 'growth', target: 'be', explanation: '   ' },
  );
  invalid.nodes[0].deep.scenes = 'at school';
  const errors = network.validateGraph(invalid).errors;
  assert.ok(errors.some(error => error.includes('missing-node')));
  assert.ok(errors.some(error => error.includes('explanation')));
  assert.ok(errors.some(error => error.includes('deep.scenes')));
});

test('V2 network helpers return nodes, relations, and immutable explore paths', () => {
  const data = require('./v2-data.js');
  const network = require('./v2-network.js');
  const inNode = network.nodeById(data, 'in');
  assert.equal(inNode.word, 'IN');
  assert.equal(network.nodeById(data, 'missing'), null);
  assert.deepEqual(network.nodesForSystem(data, 'attention').map(node => node.id), ['see', 'look', 'watch']);
  assert.ok(network.explorableRelations(data, inNode).some(relation => relation.target === 'into' && relation.targetNode.word === 'INTO'));
  const path = ['in'];
  const nextPath = network.pushExplorePath(path, 'into');
  assert.deepEqual(nextPath, ['in', 'into']);
  assert.deepEqual(network.popExplorePath(nextPath), ['in']);
  assert.deepEqual(path, ['in']);
});

test('V2 browser scripts load after Level 1 data without CommonJS globals', () => {
  const context = vm.createContext({});
  ['data.js', 'v2-data.js', 'v2-network.js', 'v2-curriculum-data.js'].forEach(file => {
    vm.runInContext(fs.readFileSync(require.resolve(`./${file}`), 'utf8'), context, { filename: file });
  });
  assert.ok(context.ENGLISH850_DATA);
  assert.ok(context.ENGLISH850_V2_DATA);
  assert.ok(context.ENGLISH850_V2_NETWORK);
  assert.ok(context.ENGLISH850_V2_CURRICULUM);
  assert.equal(typeof context.ENGLISH850_V2_NETWORK.validateGraph, 'function');
});

test('V2 validation reports malformed relation values without throwing', () => {
  const data = require('./v2-data.js');
  const network = require('./v2-network.js');
  const invalid = {
    systems: data.systems.map(system => ({ ...system })),
    nodes: data.nodes.map(node => ({ ...node, relations: [...node.relations] })),
  };
  invalid.nodes[0].relations = {};
  invalid.nodes[1].relations = [
    null,
    { type: Symbol('contrast'), target: Symbol('target'), label: Symbol('label'), explanation: Symbol('explanation') },
    { type: 'contrast', target: 'in', explanation: '缺少标签。' },
    { type: 'contrast', target: 42, label: '数字目标', explanation: '目标必须是字符串。' },
  ];
  let result;
  assert.doesNotThrow(() => { result = network.validateGraph(invalid); });
  assert.ok(result.errors.length >= 5);
  assert.ok(result.errors.some(error => error.includes('relations')));
  assert.ok(result.errors.some(error => error.includes('label')));
  assert.ok(result.errors.some(error => error.includes('target')));
});

test('V2 relation exploration ignores null, unknown, and incomplete relations', () => {
  const data = require('./v2-data.js');
  const network = require('./v2-network.js');
  assert.deepEqual(network.explorableRelations(data, null), []);
  assert.deepEqual(network.explorableRelations(data, 'missing'), []);
  const node = { relations: [null, { type: 'contrast', target: 'missing', label: '未知', explanation: '不存在。' }, { type: 'contrast', target: 'in', explanation: '缺标签。' }] };
  assert.deepEqual(network.explorableRelations(data, node), []);
  assert.deepEqual(network.nodeById({ nodes: {} }, 'in'), null);
  assert.deepEqual(network.nodesForSystem({ nodes: {} }, 'attention'), []);
  assert.deepEqual(network.pushExplorePath(Symbol('path'), Symbol('id')), []);
  assert.deepEqual(network.popExplorePath({}), []);
});

test('learning route maps the full Start-to-Output journey without inventing unavailable pages', () => {
 assert.deepEqual(curriculum.stages.map(stage => stage.id), ['start','culture','camera','world','word-image','sentence','grammar','scene-training','output']);
 assert.deepEqual(curriculum.stages.filter(stage => stage.status === 'available').map(stage => [stage.id, stage.view]), [['culture','culture'],['camera','camera'],['world','world'],['word-image','word-image']]);
 assert.deepEqual(curriculum.supportLinks.map(link => [link.id, link.view]), [['knowledge-network','network']]);
 assert.ok(curriculum.stages.filter(stage => stage.status === 'planned').every(stage => stage.view === null));
 assert.deepEqual(core.learningRouteStages(curriculum).map(stage => stage.order), [0,1,2,3,4,5,6,7,8]);
});

test('learning route renderer keeps existing destinations clickable and planned stages non-interactive', () => {
 const markup = core.renderLearningRoute(curriculum);
 assert.match(markup, /从 Start 到自由表达/);
 assert.match(markup, /data-action="view" data-view="culture"/);
 assert.match(markup, /data-action="view" data-view="camera"/);
 assert.match(markup, /data-action="view" data-view="world"/);
 assert.match(markup, /data-action="view" data-view="word-image"/);
 assert.match(markup, /开始 Word Image/);
 assert.match(markup, /data-action="view" data-view="network"/);
 assert.match(markup, /准备中/);
 assert.doesNotMatch(markup, /data-view="sentence"|data-view="grammar"|data-view="scene-training"|data-view="output"/);
});

test('learning route becomes a main view without changing legacy view routing', () => {
 assert.equal(core.viewKind('roadmap'), 'roadmap');
 assert.equal(core.activeNavView('roadmap'), 'roadmap');
 assert.equal(core.viewKind('culture'), 'culture');
 assert.equal(core.viewKind('camera'), 'camera');
 assert.equal(core.activeNavView('camera'), 'roadmap');
 assert.equal(core.viewKind('world'), 'world');
 assert.equal(core.activeNavView('world'), 'roadmap');
 assert.equal(core.viewKind('word-image'), 'word-image');
 assert.equal(core.activeNavView('word-image'), 'roadmap');
 assert.equal(core.viewKind('today'), 'today');
 assert.equal(core.activeNavView('lesson'), null);
});

test('Culture curriculum contains exactly five short lessons with safe teaching boundaries', () => {
 const lessons = core.cultureLessonsFor(curriculum);
 assert.equal(lessons.length, 5);
 assert.deepEqual(lessons.map(lesson => lesson.id), ['culture-01','culture-02','culture-03','culture-04','culture-05']);
 assert.deepEqual(lessons.map(lesson => lesson.title), [
  '语言不是给世界贴不同标签',
  '中文：很多信息可以留在语境里',
  '英语：先把画面里的角色摆清楚',
  '同一个画面，两种组织方法',
  '不是谁更高级，而是观察习惯不同',
 ]);
 lessons.forEach(lesson => {
  ['question','scene','chineseExample','englishExample','explanation','takeaway','boundary','nextHint'].forEach(field => assert.ok(lesson[field]));
  assert.match(lesson.boundary, /倾向|不是绝对|不代表|不能/);
 });
});

test('Culture completion stays in v2.culture and never enters the V1 review queue', () => {
 const legacy = { words: { I: { mastery: 3, nextReview: '2026-08-21' } }, studyDates: ['2026-08-20'] };
 const next = core.completeCultureLesson(legacy, 'culture-01');
 assert.equal(next.words.I.mastery, legacy.words.I.mastery);
 assert.equal(next.words.I.nextReview, legacy.words.I.nextReview);
 assert.deepEqual(next.studyDates, legacy.studyDates);
 assert.deepEqual(next.v2.culture.completed, ['culture-01']);
 assert.deepEqual(core.dueWords(next, '2026-08-21'), ['I']);
 assert.deepEqual(core.cultureProgressFor(core.parseStoredProgress(JSON.stringify(legacy))), { completed: [] });
 assert.deepEqual(core.cultureProgressFor(core.parseStoredProgress('{"words":{},"studyDates":[],"v2":{"culture":{"completed":["culture-01",42,"culture-01"]}}}')), { completed: ['culture-01'] });
});

test('Culture workspace renders one lesson at a time with completion and a non-interactive Camera hint', () => {
 const incomplete = core.renderCultureWorkspace(curriculum, 'culture-05', core.emptyProgress());
 const progress = ['culture-01','culture-02','culture-03','culture-04','culture-05'].reduce((current, lessonId) => core.completeCultureLesson(current, lessonId), core.emptyProgress());
 const markup = core.renderCultureWorkspace(curriculum, 'culture-05', progress);
 assert.match(markup, /5 \/ 5/);
 assert.match(incomplete, /完成当前节/);
 assert.match(markup, /Camera 当前准备中/);
 assert.match(markup, /data-action="view" data-view="roadmap"/);
 assert.doesNotMatch(markup, /data-view="camera"/);
 assert.doesNotMatch(markup, /中文没有逻辑|英语比中文严谨|农耕文明决定中文|海洋文明决定英语/);
});

test('Culture styles keep one primary lesson readable on a 375px screen', () => {
 const styles = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
 assert.match(styles, /\.cultureWorkspace\{[^}]*max-width/);
 assert.match(styles, /\.cultureExamples\{[^}]*grid-template-columns:repeat\(2/);
 assert.match(styles, /\.cultureExamples\{[^}]*grid-template-columns:1fr/);
 assert.match(styles, /\.cultureActions\{[^}]*grid-template-columns/);
});

test('Camera curriculum contains one four-step library scene with a recommended observation path', () => {
 const scenes = core.cameraScenesFor(curriculum);
 assert.equal(scenes.length, 1);
 const scene = scenes[0];
 assert.equal(scene.id, 'camera-library-01');
 assert.equal(scene.title, '镜头思维：从画面到一句英语');
 assert.equal(scene.recommendedSentence, 'The boy is doing homework in the library.');
 assert.deepEqual(core.cameraStepsFor(scene).map(step => step.id), ['focus','action','relation','expansion-library']);
 assert.equal(core.cameraStepsFor(scene).every(step => step.choices.filter(choice => choice.recommended).length === 1), true);
 assert.match(scene.focusChoices.find(choice => !choice.recommended).feedback, /这也是一个可以观察的角度/);
});

test('Camera advances only along its recommended path without changing Culture or V1 progress', () => {
 const scene = core.cameraSceneFor(curriculum, 'camera-library-01');
 const legacy = { words: { I: { mastery: 3, nextReview: '2026-08-21' } }, studyDates: ['2026-08-20'], v2: { culture: { completed: ['culture-01'] } } };
 assert.equal(core.cameraStepForAction(scene, 0, 'focus-book'), 0);
 assert.equal(core.cameraStepForAction(scene, 0, 'focus-boy'), 1);
 assert.equal(core.cameraStepForAction(scene, 1, 'action-homework'), 2);
 const next = core.completeCameraScene(legacy, scene.id);
 assert.deepEqual(next.words, legacy.words);
 assert.deepEqual(next.studyDates, legacy.studyDates);
 assert.deepEqual(next.v2.culture.completed, ['culture-01']);
 assert.deepEqual(next.v2.camera.completed, ['camera-library-01']);
 assert.deepEqual(core.dueWords(next, '2026-08-21'), ['I']);
 assert.deepEqual(core.cameraProgressFor(core.parseStoredProgress(JSON.stringify({ words: {}, studyDates: [] }))), { completed: [] });
 assert.deepEqual(core.cameraProgressFor(core.parseStoredProgress('{"words":{},"studyDates":[],"v2":{"camera":{"completed":["camera-library-01",42,"camera-library-01"]}}}')), { completed: ['camera-library-01'] });
});

test('Camera workspace shows one step, explains alternate focus, and keeps Sentence unavailable', () => {
 const scene = core.cameraSceneFor(curriculum, 'camera-library-01');
 const alternate = core.renderCameraWorkspace(curriculum, scene.id, 0, 'focus-book', core.emptyProgress());
 const ready = core.renderCameraWorkspace(curriculum, scene.id, 3, 'expansion-library', core.emptyProgress());
 const final = core.renderCameraWorkspace(curriculum, scene.id, 3, 'expansion-library', core.completeCameraScene(core.emptyProgress(), scene.id));
 assert.match(alternate, /步骤 1 \/ 4/);
 assert.match(alternate, /这也是一个可以观察的角度；本次样板先跟随男孩，练习当前这条表达路径。/);
 assert.doesNotMatch(alternate, /错误/);
 assert.match(final, /The boy is doing homework in the library\./);
 assert.match(ready, /完成本次 Camera 训练/);
 assert.match(final, /Sentence 当前准备中/);
 assert.doesNotMatch(final, /data-view="sentence"/);
});

test('Camera visual guide uses one local scene illustration and changes its overlay across the four steps', () => {
 assert.equal(typeof core.renderCameraSceneVisual, 'function');
 const scene = core.cameraSceneFor(curriculum, 'camera-library-01');
 assert.ok(scene.visual);
 assert.equal(scene.visual.alt, '图书馆里，一个男孩坐在桌边做作业，桌上有书，周围有书架和其他读者。');
 assert.equal(scene.visual.asset, 'assets/camera-library-study-scene.png');
 assert.deepEqual(Object.keys(scene.visual.focusRegions).sort(), ['action', 'background', 'book', 'boy', 'library', 'relation']);
 assert.equal(fs.existsSync(path.join(__dirname, scene.visual.asset)), true);
 const whole = core.renderCameraWorkspace(curriculum, scene.id, 0, null, core.emptyProgress());
 const boy = core.renderCameraWorkspace(curriculum, scene.id, 0, 'focus-boy', core.emptyProgress());
 const book = core.renderCameraWorkspace(curriculum, scene.id, 0, 'focus-book', core.emptyProgress());
 const library = core.renderCameraWorkspace(curriculum, scene.id, 0, 'focus-library', core.emptyProgress());
 const action = core.renderCameraWorkspace(curriculum, scene.id, 1, 'action-homework', core.emptyProgress());
 const relation = core.renderCameraWorkspace(curriculum, scene.id, 2, 'relation-homework', core.emptyProgress());
 const background = core.renderCameraWorkspace(curriculum, scene.id, 3, 'expansion-library', core.emptyProgress());
 assert.match(whole, /cameraSceneVisual is-whole/);
 assert.match(whole, /class="cameraSceneImage" src="assets\/camera-library-study-scene\.png"/);
 assert.doesNotMatch(whole, /cameraVisualDim/);
 assert.doesNotMatch(whole, /cameraFocusOverlay/);
 assert.match(boy, /cameraSceneVisual is-focus-boy/);
 assert.match(book, /cameraSceneVisual is-focus-book/);
 assert.match(library, /cameraSceneVisual is-focus-library/);
 assert.match(boy, /cameraVisualDim/);
 assert.match(boy, /cameraFocusOverlay/);
 assert.match(book, /cameraVisualFocus-book/);
 assert.match(library, /cameraVisualFocus-library/);
 assert.match(action, /cameraSceneVisual is-action/);
 assert.match(action, /cameraVisualActionCue/);
 assert.match(relation, /cameraSceneVisual is-relation/);
 assert.match(relation, /cameraVisualRelationCue/);
 assert.match(background, /cameraSceneVisual is-background/);
 assert.match(background, /cameraVisualBackgroundCue/);
});

test('Camera styles keep the four-step choice flow readable at 375px', () => {
 const styles = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
 assert.match(styles, /\.cameraWorkspace\{[^}]*max-width/);
 assert.match(styles, /\.cameraChoice\{[^}]*min-height:44px/);
 assert.match(styles, /\.cameraChoices\{[^}]*grid-template-columns:1fr/);
 assert.match(styles, /\.cameraActions\{[^}]*grid-template-columns:1fr/);
 assert.match(styles, /\.cameraSceneVisual\{[^}]*aspect-ratio:16\/9/);
 assert.match(styles, /\.cameraSceneImage\{[^}]*width:100%/);
 assert.match(styles, /\.cameraFocusOverlay\{[^}]*position:absolute/);
 assert.match(styles, /@media\(max-width:480px\)\{[^}]*\.cameraSceneVisual\{[^}]*border-radius/);
});

test('World curriculum contains one six-step observation sample with complete fields', () => {
 const scenes = core.worldScenesFor(curriculum);
 assert.equal(scenes.length, 1);
 const scene = scenes[0];
 assert.equal(scene.id, 'world-room-01');
 assert.equal(scene.title, 'World：看见现实画面的组成部分');
 assert.equal(scene.scene.accessibleText.includes('女孩'), true);
 assert.equal(scene.scene.accessibleText.includes('白猫'), true);
 assert.deepEqual(core.worldStepsFor(scene).map(step => step.id), ['people','things','action','state','relation','place']);
 core.worldStepsFor(scene).forEach(step => {
  assert.ok(step.question);
  assert.ok(step.concept);
  assert.equal(step.choices.filter(choice => choice.recommended).length, 1);
  assert.ok(step.choices.every(choice => choice.label && choice.feedback));
 });
});

test('World advances only after its recommended observation without changing Culture, Camera, or V1 progress', () => {
 const scene = core.worldSceneFor(curriculum, 'world-room-01');
 const legacy = {
  words: { I: { mastery: 3, nextReview: '2026-08-21' } },
  studyDates: ['2026-08-20'],
  v2: { culture: { completed: ['culture-01'] }, camera: { completed: ['camera-library-01'] } },
 };
 assert.equal(core.worldStepForAction(scene, 0, 'people-girl'), 0);
 assert.equal(core.worldStepForAction(scene, 0, 'people-girl-cat'), 1);
 const next = core.completeWorldScene(legacy, scene.id);
 assert.deepEqual(next.words, legacy.words);
 assert.deepEqual(next.studyDates, legacy.studyDates);
 assert.deepEqual(next.v2.culture.completed, ['culture-01']);
 assert.deepEqual(next.v2.camera.completed, ['camera-library-01']);
 assert.deepEqual(next.v2.world.completed, ['world-room-01']);
 assert.deepEqual(core.dueWords(next, '2026-08-21'), ['I']);
 assert.deepEqual(core.worldProgressFor(core.parseStoredProgress(JSON.stringify({ words: {}, studyDates: [] }))), { completed: [] });
 assert.deepEqual(core.worldProgressFor(core.parseStoredProgress('{"words":{},"studyDates":[],"v2":{"world":{"completed":["world-room-01",42,"world-room-01"]}}}')), { completed: ['world-room-01'] });
 assert.deepEqual(core.worldProgressFor(core.parseStoredProgress('{"words":{},"studyDates":[],"v2":{"world":"broken"}}')), { completed: [] });
});

test('World workspace renders one observation step, accessible scene content, safe alternate feedback, and the Word Image route', () => {
 const scene = core.worldSceneFor(curriculum, 'world-room-01');
 const alternate = core.renderWorldWorkspace(curriculum, scene.id, 2, 'action-cat', core.emptyProgress());
 const ready = core.renderWorldWorkspace(curriculum, scene.id, 5, 'place-room', core.emptyProgress());
 const completed = core.completeWorldScene(core.emptyProgress(), scene.id);
 const final = core.renderWorldWorkspace(curriculum, scene.id, 5, 'place-room', completed);
 assert.match(alternate, /步骤 3 \/ 6/);
 assert.match(alternate, /这也是画面中可以观察到的信息；这一页先找“正在发生的事”。/);
 assert.doesNotMatch(alternate, /完全错误|只有这个答案|你把词性分错了/);
 assert.match(alternate, /aria-label="场景画面：/);
 assert.match(alternate, /女孩|白猫|红色杯子/);
 assert.equal(fs.existsSync(path.join(__dirname, 'assets', 'world-room-observation.png')), true);
 assert.match(alternate, /class="worldSceneImage" src="assets\/world-room-observation\.png"/);
 assert.match(alternate, /场景图片加载失败，请根据下方场景说明继续观察。/);
 assert.doesNotMatch(alternate, /完成本次 World 观察/);
 assert.match(ready, /完成本次 World 观察/);
 assert.match(final, /你已经发现：一个现实画面里，不只有“东西”/);
 assert.match(final, /下一站是 Word Image/);
 assert.match(final, /data-action="view" data-view="word-image"/);
});

test('World styles keep the scene and single-column controls readable at 375px', () => {
 const styles = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
 assert.match(styles, /\.worldWorkspace\{[^}]*max-width/);
 assert.match(styles, /\.worldChoice\{[^}]*min-height:44px/);
 assert.match(styles, /\.worldChoices\{[^}]*grid-template-columns:1fr/);
 assert.match(styles, /\.worldActions\{[^}]*grid-template-columns:1fr/);
 assert.match(styles, /\.worldSceneImage\{[^}]*aspect-ratio:16\/9/);
 assert.match(styles, /\.worldSceneImage\{[^}]*object-fit:contain/);
});

test('Word Image curriculum contains one ON sample linked to the World room scene', () => {
 const lessons = core.wordImageLessonsFor(curriculum);
 assert.equal(lessons.length, 1);
 const lesson = lessons[0];
 assert.equal(lesson.id, 'word-image-on-01');
 assert.equal(lesson.wordId, 'on');
 assert.equal(lesson.sourceSceneId, 'world-room-01');
 assert.equal(lesson.steps.length, 3);
 assert.deepEqual(lesson.steps.map(step => step.id), ['return-to-scene','focus-contact','connect-on']);
 assert.ok(lesson.scene.accessibleText.includes('红色杯子'));
 assert.ok(lesson.focus.accessibleText.includes('杯子'));
});

test('Word Image ON sample keeps explicit phonics groups and US IPA', () => {
 const lesson = core.wordImageLessonFor(curriculum, 'word-image-on-01');
 assert.equal(lesson.spelling, 'on');
 assert.equal(lesson.displayForm, 'on');
 assert.deepEqual(lesson.phonicsGroups, [
  { letters: 'o', sound: '/ɑ/', colorToken: 'vowel' },
  { letters: 'n', sound: '/n/', colorToken: 'consonant' },
 ]);
 assert.equal(lesson.ipaUS, '/ɑn/');
 assert.equal(lesson.speechText, 'on');
 assert.equal(lesson.speechLang, 'en-US');
  assert.equal(curriculum.wordImageLessons.length, 1);
});

test('Word Image ON sample carries one reviewed General American sentence flow model', () => {
 const lesson = core.wordImageLessonFor(curriculum, 'word-image-on-01');
 const flow = lesson.sentenceFlow;
 assert.equal(flow.text, 'The cup is on the table.');
 assert.deepEqual(flow.clearWords, [
  { text: 'The', ipaUS: '/ðə/' }, { text: 'cup', ipaUS: '/kʌp/' },
  { text: 'is', ipaUS: '/ɪz/' }, { text: 'on', ipaUS: '/ɑn/' },
  { text: 'the', ipaUS: '/ðə/' }, { text: 'table', ipaUS: '/ˈteɪbəl/' },
 ]);
 assert.equal(flow.clearIpaUS, '/ðə kʌp ɪz ɑn ðə ˈteɪbəl/');
 assert.equal(flow.natural.ipaUS, '[ðə ˈkʌp‿ɪz‿ɑn ðə ˈteɪbəl]');
 assert.deepEqual(flow.natural.links.map(item => item.markedText), ['cup‿is', 'is‿on']);
 assert.match(flow.natural.links[0].explanation, /\/p\/.*\/ɪ\//);
 assert.match(flow.natural.links[1].explanation, /\/z\/.*\/ɑ\//);
 assert.match(flow.natural.weakFormExplanation, /the.*\/ðə\//);
 assert.equal(flow.stress.markedText, 'The CUP is on the TABLE.');
 assert.match(flow.stress.explanation, /改变强调重点/);
 assert.equal(flow.phrase.text, '当前短句整体作为一个意群。');
 assert.match(flow.intonation, /自然结束语调/);
 assert.equal(flow.audio.clear.text, 'The cup is on the table.');
 assert.equal(flow.audio.clear.lang, 'en-US');
 assert.equal(flow.audio.clear.rate, 0.78);
 assert.equal(flow.audio.natural.text, 'The cup is on the table.');
 assert.equal(flow.audio.natural.lang, 'en-US');
 assert.equal(flow.audio.natural.rate, 1);
});

test('Word Image completion remains isolated from V1, Culture, Camera, and World progress', () => {
 const legacy = {
  words: { I: { mastery: 3, nextReview: '2026-08-21' } },
  studyDates: ['2026-08-20'],
  v2: { culture: { completed: ['culture-01'] }, camera: { completed: ['camera-library-01'] }, world: { completed: ['world-room-01'] } },
 };
 const next = core.completeWordImageLesson(legacy, 'word-image-on-01');
 assert.deepEqual(next.words, legacy.words);
 assert.deepEqual(next.studyDates, legacy.studyDates);
 assert.deepEqual(next.v2.culture.completed, ['culture-01']);
 assert.deepEqual(next.v2.camera.completed, ['camera-library-01']);
 assert.deepEqual(next.v2.world.completed, ['world-room-01']);
 assert.deepEqual(next.v2.wordImage.completed, ['word-image-on-01']);
 assert.deepEqual(core.dueWords(next, '2026-08-21'), ['I']);
 assert.deepEqual(core.wordImageProgressFor(core.parseStoredProgress('{"words":{},"studyDates":[]}')), { completed: [] });
 assert.deepEqual(core.wordImageProgressFor(core.parseStoredProgress('{"words":{},"studyDates":[],"v2":{"wordImage":{"completed":["word-image-on-01",42,"word-image-on-01"]}}}')), { completed: ['word-image-on-01'] });
 assert.deepEqual(core.wordImageProgressFor(core.parseStoredProgress('{"words":{},"studyDates":[],"v2":{"wordImage":"broken"}}')), { completed: [] });
});

test('Word Image renders three low-density screens and only opens the existing ON lesson or library', () => {
 const lesson = core.wordImageLessonFor(curriculum, 'word-image-on-01');
 const first = core.renderWordImageWorkspace(curriculum, require('./v2-data.js'), lesson.id, 0, core.emptyProgress());
 const second = core.renderWordImageWorkspace(curriculum, require('./v2-data.js'), lesson.id, 1, core.emptyProgress());
 const complete = core.completeWordImageLesson(core.emptyProgress(), lesson.id);
 const final = core.renderWordImageWorkspace(curriculum, require('./v2-data.js'), lesson.id, 2, complete);
 assert.match(first, /先回到刚才的房间/);
 assert.match(first, /我找到了/);
 assert.doesNotMatch(first, />ON</);
 assert.match(second, /现在只看杯子和桌面/);
 assert.match(second, /wordImageFocus/);
 assert.match(second, /杯子没有悬在空中。它接触着桌子的表面。/);
 assert.doesNotMatch(second, />ON</);
 assert.match(final, /英语先抓住这个核心画面/);
 assert.match(final, />ON</);
 assert.match(final, /一个东西接触在另一个表面上/);
 assert.match(final, /The cup is on the table\./);
 assert.match(final, /ON 不是简单等于一个中文“在”/);
 assert.match(final, /你已经把一种现实关系，直接连到了英语词 ON。/);
 assert.match(final, /data-action="open-word" data-word="on"/);
 assert.match(final, /data-action="view" data-view="library"/);
 assert.doesNotMatch(final, /data-view="sentence"/);
});

test('Word Image third screen renders a lowercase handwriting guide, phonics groups, US IPA, and an accessible speech control', () => {
 const lesson = core.wordImageLessonFor(curriculum, 'word-image-on-01');
 const markup = core.renderWordImageWorkspace(curriculum, require('./v2-data.js'), lesson.id, 2, core.emptyProgress(), { supported: true, speaking: false });
 assert.match(markup, /class="wordImageHandwriting" aria-label="on"/);
 assert.match(markup, /class="handwritingLine"/);
 assert.match(markup, /class="phonicsLetter phonics-vowel" aria-hidden="true">o/);
 assert.match(markup, /class="phonicsLetter phonics-consonant" aria-hidden="true">n/);
 assert.match(markup, /自然拼读音组/);
 assert.ok(markup.includes('<strong>o</strong><span>/ɑ/</span>'));
 assert.ok(markup.includes('<strong>n</strong><span>/n/</span>'));
 assert.ok(markup.includes('<span>美式</span><strong>/ɑn/</strong>'));
 assert.match(markup, /data-action="play-word-image-speech" aria-label="播放 on 的美式发音"/);
  assert.doesNotMatch(markup, /音节/);
});

test('Word Image third screen renders a five-layer sentence flow sample with two explicit audio speeds', () => {
 const lesson = core.wordImageLessonFor(curriculum, 'word-image-on-01');
 const markup = core.renderWordImageWorkspace(curriculum, require('./v2-data.js'), lesson.id, 2, core.emptyProgress(), { supported: true, speaking: false });
 assert.match(markup, /The cup is on the table\./);
 assert.match(markup, /中文画面确认/);
 assert.match(markup, /杯子在桌子上。/);
 assert.match(markup, /清晰美式音标/);
 assert.match(markup, /The<\/b> <span>\/ðə\/<\/span>/);
 assert.match(markup, /自然语流/);
 assert.match(markup, /\[ðə ˈkʌp‿ɪz‿ɑn ðə ˈteɪbəl\]/);
 assert.match(markup, /cup‿is/);
 assert.match(markup, /is‿on/);
 assert.match(markup, /The CUP is on the TABLE\./);
 assert.match(markup, /学习标记，不属于英文拼写/);
 assert.match(markup, /声音自然连起来/);
 assert.match(markup, /<b>粗体<\/b>：当前信息重音/);
 assert.match(markup, /<b>\/ \/<\/b>：清晰音标/);
 assert.match(markup, /<b>\[ \]<\/b>：自然语流中的实际发音/);
 assert.match(markup, /data-action="play-word-image-sentence-clear"[^>]*清晰慢速/);
 assert.match(markup, /data-action="play-word-image-sentence-natural"[^>]*自然语速/);
 assert.match(markup, /设备语音仅用于当前样板预览/);
});

test('Word Image safely disables speech when the browser does not support speechSynthesis', () => {
 const lesson = core.wordImageLessonFor(curriculum, 'word-image-on-01');
 const markup = core.renderWordImageWorkspace(curriculum, require('./v2-data.js'), lesson.id, 2, core.emptyProgress(), { supported: false, speaking: false });
 assert.match(markup, /data-action="play-word-image-speech"[^>]*disabled/);
 assert.match(markup, /data-action="play-word-image-sentence-clear"[^>]*disabled/);
 assert.match(markup, /data-action="play-word-image-sentence-natural"[^>]*disabled/);
 assert.match(markup, /当前浏览器不支持语音播放/);
 assert.match(markup, /完成这个 Word Image/);
});

test('Word Image speech controller uses one en-US utterance, cancels old speech, and ignores stale callbacks', () => {
 class FakeUtterance { constructor(text) { this.text = text; } }
 const voices = [{ name: 'British', lang: 'en-GB' }, { name: 'US', lang: 'en-US' }];
 const synthesis = { cancelled: 0, spoken: [], cancel() { this.cancelled += 1; }, getVoices() { return voices; }, speak(utterance) { this.spoken.push(utterance); } };
 const states = [];
 const controller = core.createWordImageSpeechController(synthesis, FakeUtterance, (speaking, mode) => states.push([speaking, mode]));
 assert.equal(controller.isSupported(), true);
 assert.equal(synthesis.spoken.length, 0);
 assert.equal(controller.play('on', 'en-US', 1, 'word'), true);
 const first = synthesis.spoken[0];
 assert.equal(first.text, 'on');
 assert.equal(first.lang, 'en-US');
 assert.equal(first.voice, voices[1]);
 assert.equal(controller.play('The cup is on the table.', 'en-US', 0.78, 'clear'), true);
 const second = synthesis.spoken[1];
 first.onend();
 assert.deepEqual(states.at(-1), [true, 'clear']);
 second.onend();
 assert.deepEqual(states.at(-1), [false, 'clear']);
 controller.stop();
  assert.equal(synthesis.cancelled, 3);
});

test('Word Image sentence speech uses one full en-US utterance at the requested clear or natural rate', () => {
 class FakeUtterance { constructor(text) { this.text = text; } }
 const synthesis = { cancelled: 0, spoken: [], cancel() { this.cancelled += 1; }, getVoices() { return [{ name: 'US', lang: 'en-US' }]; }, speak(utterance) { this.spoken.push(utterance); } };
 const controller = core.createWordImageSpeechController(synthesis, FakeUtterance, () => {});
 assert.equal(controller.play('The cup is on the table.', 'en-US', 0.78), true);
 assert.equal(synthesis.spoken[0].text, 'The cup is on the table.');
 assert.equal(synthesis.spoken[0].lang, 'en-US');
 assert.equal(synthesis.spoken[0].rate, 0.78);
 assert.equal(controller.play('The cup is on the table.', 'en-US', 1), true);
 assert.equal(synthesis.spoken[1].rate, 1);
 assert.equal(synthesis.cancelled, 2);
});

test('Word Image speech controller degrades safely when browser speech APIs are absent', () => {
 const controller = core.createWordImageSpeechController(null, null, () => {});
 assert.equal(controller.isSupported(), false);
 assert.equal(controller.play('on', 'en-US'), false);
 controller.stop();
});

test('Word Image speech stops when the learner leaves its view but not while staying in it', () => {
 assert.equal(core.shouldStopWordImageSpeech('word-image', 'library'), true);
 assert.equal(core.shouldStopWordImageSpeech('word-image', 'lesson'), true);
 assert.equal(core.shouldStopWordImageSpeech('word-image', 'word-image'), false);
 assert.equal(core.shouldStopWordImageSpeech('world', 'library'), false);
});

test('Word Image styles keep the focused relation and actions readable at 375px', () => {
 const styles = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
 assert.match(styles, /\.wordImageWorkspace\{[^}]*max-width/);
 assert.match(styles, /\.wordImageSceneImage\{[^}]*aspect-ratio:16\/9/);
 assert.match(styles, /\.wordImageFocus\{[^}]*overflow:hidden/);
 assert.match(styles, /\.wordImageActions\{[^}]*grid-template-columns:1fr/);
 assert.match(styles, /\.wordImageActions .primaryAction\{[^}]*min-height:44px/);
 assert.match(styles, /--phonics-vowel:/);
 assert.match(styles, /--phonics-consonant:/);
 assert.match(styles, /\.wordImageHandwriting\{[^}]*max-width/);
  assert.match(styles, /\.phonicsCards\{[^}]*grid-template-columns/);
 assert.match(styles, /\.wordImageSentenceFlow\{[^}]*text-align:left/);
 assert.match(styles, /\.wordImageSentenceAudio\{[^}]*grid-template-columns/);
});
