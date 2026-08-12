const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const cardsDirectory = path.join(projectRoot, 'website/assets/cards');
const ASCII_WORD = /^[A-Za-z]+$/;
const CONTROL_CHARS = /[\x00-\x1F\x7F]/g;
const FORBIDDEN_IDENTITIES = /诺诺|固定人物角色/g;
const MULTI_SCENE_TERMS = /\bvs\b|对比卡|双场景|多目标|配套|五目标|三帧|双向对比|状态切换|物理向上|数值上升|物理向下|数值下降/gim;
const VISUAL_LABELS = {
  SPEAKER: '说话者', ELSEWHERE: '别处', HOMEWORK: '任务清单',
  RESULT: '结果', REASON: '原因', TARGET: '目标', OBJECT: '物体',
  EYES: '眼睛', SOUND: '声音', BRAIN: '大脑', HEART: '内心', SOURCE: '来源',
  THERE: '另一个位置', HERE: '当前位置', THIS: '近处物体', THAT: '远处物体',
  PERSON: '人物', SCHOOL: '学校', STUDENT: '学生', MESSAGE: '消息',
  COFFEE: '咖啡', TIRED: '疲惫状态', HAPPY: '快乐', TABLE: '桌子',
  BOOK: '书', HOME: '家', IDEA: '想法', DOG: '宠物', PHONE: '手机',
  BALL: '球', BIRD: '飞鸟', CAT: '猫', BOX: '盒子', EAR: '耳朵',
  YOU: '交流对象', THEY: '第三方群体', SHE: '女性第三方', HE: '男性第三方',
  WE: '群体', IT: '已知事物', BECAUSE: '原因', LISTEN: '倾听',
  WATCH: '持续关注', BRING: '带来', THINK: '思考', UNDER: '下方',
  INTO: '进入', LOOK: '看向', MAKE: '作用', KEEP: '保持', TAKE: '带离',
  GIVE: '转交', TURN: '转向', HEAR: '听到', FEEL: '感受', KNOW: '知道',
  COME: '靠近', HAVE: '拥有', GET: '抵达', PUT: '放入', SEE: '看见',
  GO: '离开', OUT: '外部', OVER: '跨越', BACK: '返回', FROM: '起点',
  DOWN: '向下', UP: '向上', AND: '连接', BUT: '转向', OR: '选择',
  SO: '结果', IN: '内部', ON: '表面', AT: '定位', TO: '朝向',
  DO: '执行', BE: '连接', I: '说话者', A: '起点', B: '终点',
};

const relationshipHints = {
  I: '焦点落在说话者自己。',
  get: '经过过程抵达目标。',
  look: '目光投向目标方向。',
  in: '物体处在边界内部。',
  because: '从结果回溯到原因。',
};

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeWord(word, expectedWord) {
  const candidate = String(word || '');
  const expected = String(expectedWord || '');
  if (!ASCII_WORD.test(expected) || !ASCII_WORD.test(candidate) || candidate !== expected) {
    throw new Error('word must match the existing ASCII lesson word');
  }
  return candidate;
}

function normalizeTagline(tagline) {
  const value = String(tagline || '');
  if (!value.trim() || /[\x00-\x1F\x7F]/.test(value) || /诺诺|固定人物角色/.test(value)) {
    throw new Error('tagline contains forbidden content');
  }
  return value;
}

function translateVisualLabels(value) {
  return Object.entries(VISUAL_LABELS)
    .sort(([left], [right]) => right.length - left.length)
    .reduce((text, [label, translation]) => text.replace(
      new RegExp(`(?<![A-Za-z])${escapeRegExp(label)}(?![A-Za-z])`, 'gi'), translation,
    ), String(value || ''));
}

function cleanVisualText(value) {
  return translateVisualLabels(value)
    .replace(CONTROL_CHARS, ' ')
    .replace(FORBIDDEN_IDENTITIES, '')
    .replace(MULTI_SCENE_TERMS, '')
    .replace(/[A-Za-z][A-Za-z0-9_/-]*/g, '')
    .replace(/[“”"']/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([，。；：、])\s*/g, '$1')
    .replace(/[，；：、]{2,}/g, '，')
    .replace(/^[-—→↔+＝=，。；：、\s]+|[-—→↔+＝=，。；：、\s]+$/g, '')
    .trim();
}

function sanitizeVisualBrief(value) {
  const cleaned = cleanVisualText(value);
  if (!cleaned) throw new Error('visualBrief is empty after sanitization');
  return cleaned;
}

function visualConcept(word, tagline) {
  return sanitizeVisualBrief(normalizeTagline(tagline)
    .replace(new RegExp(`^${escapeRegExp(word)}\\s*=\\s*`, 'i'), ''));
}

function buildVisualBrief(lesson) {
  const word = normalizeWord(lesson.word, lesson.word);
  const cardScene = cleanVisualText(lesson.card);
  const imageScene = cleanVisualText(lesson.image);
  const hint = relationshipHints[word] || '';
  return sanitizeVisualBrief([
    '单一教学主画面',
    cardScene && `卡片线索：${cardScene}`,
    imageScene && `画面关系：${imageScene}`,
    `核心含义：${visualConcept(word, lesson.tagline)}`,
    hint,
  ].filter(Boolean).join('。'));
}

function normalizeCardFields(card, lesson) {
  return {
    word: normalizeWord(card.word, lesson.word),
    tagline: normalizeTagline(card.tagline),
    visualBrief: sanitizeVisualBrief(card.visualBrief),
  };
}

function cardFileName(lessonNo, word) {
  const safeWord = String(word || '');
  if (!ASCII_WORD.test(safeWord)) throw new Error('word must be an ASCII word for the filename');
  return `${String(lessonNo).padStart(2, '0')}-${safeWord.toLowerCase()}.png`;
}

function cardPrompt(card) {
  return [
    'vertical 1024x1536, light 3D educational card, white negative space, blue-violet structure, coral key change.',
    `Central scene instruction: ${card.visualBrief}`,
    'Render this as one single central teaching scene with one clear focal relationship.',
    `Place the English word "${card.word}" at the top and the exact Chinese tagline "${card.tagline}" at the bottom.`,
    'Use only visible text exactly the English word and exact Chinese tagline; no English labels or any other text.',
    'Use an anonymous simplified silhouette only if a person is necessary; never use a named or recurring character, face, watermark, logo, or busy background.',
  ].join(' ');
}

function buildManifest(lessons) {
  return lessons.map(lesson => {
    const visualBrief = buildVisualBrief(lesson);
    const card = normalizeCardFields({ word: lesson.word, tagline: lesson.tagline, visualBrief }, lesson);
    const filename = cardFileName(lesson.lesson_no, card.word);
    return {
      lessonNo: lesson.lesson_no,
      word: card.word,
      filename,
      tagline: card.tagline,
      imagePath: `assets/cards/${filename}`,
      visualBrief: card.visualBrief,
      prompt: cardPrompt(card),
    };
  });
}

function writeManifest() {
  const lessons = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/level1_lessons.json'), 'utf8'));
  fs.mkdirSync(cardsDirectory, { recursive: true });
  fs.writeFileSync(path.join(cardsDirectory, 'manifest.json'), `${JSON.stringify(buildManifest(lessons), null, 2)}\n`);
}

if (require.main === module) writeManifest();

module.exports = {
  buildManifest,
  buildVisualBrief,
  cardFileName,
  normalizeCardFields,
  normalizeTagline,
  normalizeWord,
  sanitizeVisualBrief,
};
