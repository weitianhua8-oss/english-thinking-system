const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const vm = require('node:vm');
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
  ['data.js', 'v2-data.js', 'v2-network.js'].forEach(file => {
    vm.runInContext(fs.readFileSync(require.resolve(`./${file}`), 'utf8'), context, { filename: file });
  });
  assert.ok(context.ENGLISH850_DATA);
  assert.ok(context.ENGLISH850_V2_DATA);
  assert.ok(context.ENGLISH850_V2_NETWORK);
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
