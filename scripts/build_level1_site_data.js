const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const levelName = 'Level 1｜50骨架词';
const validRelationTypes = new Set(['system', 'growth', 'combination', 'contrast']);
const validSystemIds = new Set(['space-relations', 'state-action', 'information-structure', 'attention']);

const contrasts = [
  { title: 'go / come', words: ['go', 'come'], summary: 'GO 离开当前焦点；COME 朝当前焦点靠近。' },
  { title: 'take / bring', words: ['take', 'bring'], summary: 'TAKE 带离焦点；BRING 带向焦点。' },
  { title: 'see / look / watch', words: ['see', 'look', 'watch'], summary: 'LOOK 是方向；SEE 是看到的结果；WATCH 是持续看过程。' },
  { title: 'hear / listen', words: ['hear', 'listen'], summary: 'HEAR 是声音进入；LISTEN 是注意力主动出去。' },
  { title: 'in / on / at', words: ['in', 'on', 'at'], summary: 'IN 是内部；ON 是表面；AT 是位置点。' },
  { title: 'so / because', words: ['so', 'because'], summary: 'SO 推向结果；BECAUSE 回答原因。' },
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(projectRoot, file), 'utf8'));
}

function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`missing text: ${label}`);
  return value;
}

function requireTextArray(value, label) {
  if (!Array.isArray(value) || !value.length) throw new Error(`missing ${label}`);
  value.forEach((item, index) => requireText(item, `${label}[${index}]`));
  return value;
}

function validateAssessment(assessment) {
  if (!assessment || typeof assessment !== 'object') throw new Error('missing assessment');
  ['transfer', 'output'].forEach(phase => {
    const value = assessment[phase];
    if (!value || typeof value !== 'object') throw new Error(`missing assessment.${phase}`);
    const required = phase === 'transfer'
      ? ['asset', 'alt', 'prompt', 'answer', 'feedback_correct', 'feedback_incorrect']
      : ['prompt', 'before_blank', 'after_blank', 'answer', 'feedback_correct', 'feedback_incorrect'];
    required.forEach(field => requireText(value[field], `assessment.${phase}.${field}`));
  });
}

function validateReviewedLayers(item, staticV2Ids) {
  const layer = item.learning_layers;
  if (!layer || typeof layer !== 'object') throw new Error(`missing learning_layers: ${item.word}`);
  const quick = layer.quick;
  const deep = layer.deep;
  const network = layer.network;
  if (!quick || typeof quick !== 'object') throw new Error(`missing quick: ${item.word}`);
  if (!deep || typeof deep !== 'object') throw new Error(`missing deep: ${item.word}`);
  if (!network || typeof network !== 'object') throw new Error(`missing network: ${item.word}`);

  ['hook', 'core_image', 'one_line', 'prototype'].forEach(field => requireText(quick[field], `quick.${field}`));
  requireText(deep.logic, 'deep.logic');
  if (!Array.isArray(deep.scenes) || !deep.scenes.length) throw new Error(`empty scenes: ${item.word}`);
  deep.scenes.forEach((scene, index) => {
    if (!scene || typeof scene !== 'object') throw new Error(`missing scene: ${index}`);
    ['title', 'body', 'example'].forEach(field => requireText(scene[field], `deep.scenes[${index}].${field}`));
  });
  requireTextArray(deep.structures, 'deep.structures');
  ['chinese_trap', 'study_tip'].forEach(field => requireText(deep[field], `deep.${field}`));

  requireText(network.system_id, 'network.system_id');
  if (!validSystemIds.has(network.system_id)) throw new Error(`unknown system id: ${network.system_id}`);
  if (!Array.isArray(network.relations)) throw new Error(`missing network.relations: ${item.word}`);
  network.relations.forEach((relation, index) => {
    if (!relation || typeof relation !== 'object') throw new Error(`missing relation: ${index}`);
    if (!validRelationTypes.has(relation.type)) throw new Error(`invalid relation type: ${relation.type}`);
    ['target', 'label', 'explanation'].forEach(field => requireText(relation[field], `network.relations[${index}].${field}`));
    if (!staticV2Ids.has(relation.target)) throw new Error(`unknown relation target: ${relation.target}`);
  });
  requireTextArray(network.next_recommended, 'network.next_recommended');
  network.next_recommended.forEach(target => {
    if (!staticV2Ids.has(target)) throw new Error(`unknown recommended target: ${target}`);
  });
  validateAssessment(layer.assessment);
}

function projectReviewedProLessons(allVocabulary, staticV2Ids) {
  if (!Array.isArray(allVocabulary)) throw new TypeError('allVocabulary must be an array');
  if (!(staticV2Ids instanceof Set)) throw new TypeError('staticV2Ids must be a Set');
  const reviewed = allVocabulary.filter(item => item && item.learning_layers && item.learning_layers.review_status === 'reviewed');
  const ids = new Set();
  return reviewed.map(item => {
    if (item.word !== 'on') throw new Error(`reviewed Pro word is not authorized: ${item.word}`);
    if (ids.has(item.word)) throw new Error(`duplicate Pro lesson id: ${item.word}`);
    ids.add(item.word);
    validateReviewedLayers(item, staticV2Ids);
    const layer = item.learning_layers;
    return {
      id: item.word,
      word: item.word.toUpperCase(),
      systemId: layer.network.system_id,
      coreMeaning: layer.quick.one_line,
      coreImage: layer.quick.core_image,
      quick: { origin: layer.quick.one_line, example: layer.quick.prototype, memoryHook: layer.quick.hook },
      deep: {
        logic: layer.deep.logic,
        scenes: layer.deep.scenes,
        structures: layer.deep.structures.join('；'),
        chineseTrap: layer.deep.chinese_trap,
        studyTip: layer.deep.study_tip,
      },
      relations: layer.network.relations,
      assessment: layer.assessment,
    };
  });
}

function buildPlan() {
  const [header, ...rows] = fs.readFileSync(path.join(projectRoot, 'data/learning_plan_170days.csv'), 'utf8')
    .replace(/^\uFEFF/, '')
    .trim()
    .split(/\r?\n/);
  const columns = header.split(',');
  const wordColumns = ['word1', 'word2', 'word3', 'word4', 'word5'].map(name => columns.indexOf(name));
  const dayColumn = columns.indexOf('day');
  return rows.slice(0, 10).map(row => {
    const cells = row.split(',');
    return { day: Number(cells[dayColumn]), words: wordColumns.map(index => cells[index]) };
  });
}

function buildPayload() {
  const allVocabulary = readJson('data/vocabulary_850.json');
  const lessonList = readJson('data/level1_lessons.json');
  const staticV2Data = require(path.join(projectRoot, 'website/v2-data.js'));
  const staticV2Ids = new Set(staticV2Data.nodes.map(node => node.id));
  return {
    vocabulary: allVocabulary.filter(item => item.level === levelName),
    lessons: Object.fromEntries(lessonList.map(lesson => [lesson.word, lesson])),
    plan: buildPlan(),
    contrasts,
    proLessons: projectReviewedProLessons(allVocabulary, staticV2Ids),
  };
}

function writeRuntimeData(payload = buildPayload()) {
  const output = [
    "const root = typeof window !== 'undefined' ? window : globalThis;",
    `const payload = ${JSON.stringify(payload)};`,
    'root.ENGLISH850_DATA = payload;',
    "if (typeof module !== 'undefined') module.exports = payload;",
    '',
  ].join('\n');
  fs.writeFileSync(path.join(projectRoot, 'website/data.js'), output);
}

if (require.main === module) writeRuntimeData();

module.exports = { buildPayload, projectReviewedProLessons };
