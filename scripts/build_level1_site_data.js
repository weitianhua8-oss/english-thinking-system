const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const readJson = file => JSON.parse(fs.readFileSync(path.join(projectRoot, file), 'utf8'));
const levelName = 'Level 1｜50骨架词';

const vocabulary = readJson('data/vocabulary_850.json').filter(item => item.level === levelName);
const lessonList = readJson('data/level1_lessons.json');
const lessons = Object.fromEntries(lessonList.map(lesson => [lesson.word, lesson]));

const [header, ...rows] = fs.readFileSync(path.join(projectRoot, 'data/learning_plan_170days.csv'), 'utf8')
  .replace(/^\uFEFF/, '')
  .trim()
  .split(/\r?\n/);
const columns = header.split(',');
const wordColumns = ['word1', 'word2', 'word3', 'word4', 'word5'].map(name => columns.indexOf(name));
const dayColumn = columns.indexOf('day');
const plan = rows.slice(0, 10).map(row => {
  const cells = row.split(',');
  return { day: Number(cells[dayColumn]), words: wordColumns.map(index => cells[index]) };
});

const contrasts = [
  { title: 'go / come', words: ['go', 'come'], summary: 'GO 离开当前焦点；COME 朝当前焦点靠近。' },
  { title: 'take / bring', words: ['take', 'bring'], summary: 'TAKE 带离焦点；BRING 带向焦点。' },
  { title: 'see / look / watch', words: ['see', 'look', 'watch'], summary: 'LOOK 是方向；SEE 是看到的结果；WATCH 是持续看过程。' },
  { title: 'hear / listen', words: ['hear', 'listen'], summary: 'HEAR 是声音进入；LISTEN 是注意力主动出去。' },
  { title: 'in / on / at', words: ['in', 'on', 'at'], summary: 'IN 是内部；ON 是表面；AT 是位置点。' },
  { title: 'so / because', words: ['so', 'because'], summary: 'SO 推向结果；BECAUSE 回答原因。' },
];

const payload = { vocabulary, lessons, plan, contrasts };
const output = [
  'const root = typeof window !== \'undefined\' ? window : globalThis;',
  `const payload = ${JSON.stringify(payload)};`,
  'root.ENGLISH850_DATA = payload;',
  "if (typeof module !== 'undefined') module.exports = payload;",
  '',
].join('\n');

fs.writeFileSync(path.join(projectRoot, 'website/data.js'), output);
