const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const lessons = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/level1_lessons.json'), 'utf8'));
const cardsDirectory = path.join(projectRoot, 'website/assets/cards');

function cardFileName(lessonNo, word) {
  return `${String(lessonNo).padStart(2, '0')}-${String(word).toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
}

function sanitizeText(value) {
  return String(value || '').replace(/诺诺|固定人物角色/g, '');
}

function visualBrief(lesson) {
  if (lesson.word === 'I') {
    return '人物视角卡：匿名简约人物剪影居中，焦点标记。';
  }

  const concept = sanitizeText(lesson.tagline)
    .replace(new RegExp(`^${lesson.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=\\s*`, 'i'), '')
    .replace(/[A-Za-z][A-Za-z0-9_/-]*/g, '')
    .replace(/[。！？]$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `单一教学主画面：用简约 3D 物体、方向线和焦点标记，表现${concept || '当前词的核心含义'}。`;
}

function cardPrompt(lesson) {
  return [
    'vertical 1024x1536, light 3D educational card, white negative space, blue-violet structure, coral key change.',
    'Render a single central teaching scene that illustrates the core concept with one clear focal relationship.',
    `Place the English word "${lesson.word}" at the top and the exact Chinese tagline "${lesson.tagline}" at the bottom.`,
    'Use only visible text exactly the English word and exact Chinese tagline; no English labels or any other text.',
    'Use an anonymous simplified silhouette only if a person is necessary; never use a named or recurring character, face, watermark, logo, or busy background.',
  ].join(' ');
}

const manifest = lessons.map(lesson => {
  const filename = cardFileName(lesson.lesson_no, lesson.word);
  return {
    lessonNo: lesson.lesson_no,
    word: lesson.word,
    filename,
    tagline: lesson.tagline,
    imagePath: `assets/cards/${filename}`,
    visualBrief: visualBrief(lesson),
    prompt: cardPrompt(lesson),
  };
});

fs.mkdirSync(cardsDirectory, { recursive: true });
fs.writeFileSync(path.join(cardsDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
