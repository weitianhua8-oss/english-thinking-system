const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const cardsDirectory = path.join(projectRoot, 'website/assets/cards');
const ASCII_WORD = /^[A-Za-z]+$/;
const SAFE_CARD_FILENAME = /^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.png$/;
const CONTROL_CHARS = /[\x00-\x1F\x7F]/g;
const SCENE_REPLACEMENTS = [
  [/固定人物角色/g, '匿名人物'],
  [/诺诺/g, '匿名人物'],
  [/双向对比/g, '因果联系'],
  [/状态切换/g, '状态延续'],
  [/物理向上|数值上升/g, '向上'],
  [/物理向下|数值下降/g, '向下'],
  [/对比卡/g, '单一焦点画面'],
  [/双场景/g, '单一画面'],
  [/多目标/g, '单一目标'],
  [/五目标/g, '一个目标'],
  [/三帧/g, '单帧'],
  [/配套/g, '聚焦'],
  [/\bvs\b/gim, '关联'],
  [/胸前/g, '人物身侧'],
  [/下一格/g, '当前画面'],
  [/先指向/g, '焦点落在'],
  [/切换/g, '延续'],
  [/两格/g, '单一画面'],
  [/一格/g, '单一画面'],
  [/标签/g, '焦点光环'],
];
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
  if (typeof word !== 'string' || typeof expectedWord !== 'string'
    || !ASCII_WORD.test(expectedWord) || !ASCII_WORD.test(word) || word !== expectedWord) {
    throw new Error('word must match the existing ASCII lesson word');
  }
  return word;
}

function normalizeTagline(tagline) {
  if (typeof tagline !== 'string' || !tagline.trim() || /[\x00-\x1F\x7F]/.test(tagline) || /诺诺|固定人物角色/.test(tagline)) {
    throw new Error('tagline contains forbidden content');
  }
  return tagline;
}

function translateVisualLabels(value) {
  return Object.entries(VISUAL_LABELS)
    .sort(([left], [right]) => right.length - left.length)
    .reduce((text, [label, translation]) => text.replace(
      new RegExp(`(?<![A-Za-z])${escapeRegExp(label)}(?![A-Za-z])`, 'gi'), translation,
    ), String(value || ''));
}

function cleanVisualText(value) {
  const translated = translateVisualLabels(value);
  const transformed = SCENE_REPLACEMENTS.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), translated);
  return transformed
    .replace(CONTROL_CHARS, ' ')
    .replace(/[A-Za-z][A-Za-z0-9_/-]*/g, '')
    .replace(/[“”"']/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([，。；：、])\s*/g, '$1')
    .replace(/。{2,}/g, '。')
    .replace(/[，；：、]{2,}/g, '，')
    .replace(/^[-—→↔+＝=，；：、\s]+|[-—→↔+＝=，；：、\s]+$/g, '')
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
  if (word === 'I') return '匿名简约人物剪影居中，用手势指向自己，焦点光环落在自身。';
  if (word === 'it') return '一个已进入共同注意力的球体被柔和焦点光环包围，表示继续指代。';
  const hint = relationshipHints[word] || '';
  return sanitizeVisualBrief([
    `单一静态中心场景，以简约物体、匿名人物剪影和柔和焦点光环表现${visualConcept(word, lesson.tagline)}`,
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
  if (!Number.isInteger(lessonNo) || lessonNo < 1 || lessonNo > 50) {
    throw new Error('lesson number must be an integer from 1 to 50');
  }
  const safeWord = word;
  if (!ASCII_WORD.test(safeWord)) throw new Error('word must be an ASCII word for the filename');
  const filename = `${String(lessonNo).padStart(2, '0')}-${safeWord.toLowerCase()}.png`;
  if (!SAFE_CARD_FILENAME.test(filename)) throw new Error('filename must be a safe PNG card filename');
  return filename;
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
    if (!lesson || typeof lesson !== 'object') throw new Error('lesson must be an object');
    const lessonNo = lesson.lesson_no;
    if (!Number.isInteger(lessonNo) || lessonNo < 1 || lessonNo > 50) {
      throw new Error('lesson number must be an integer from 1 to 50');
    }
    const visualBrief = buildVisualBrief(lesson);
    const card = normalizeCardFields({ word: lesson.word, tagline: lesson.tagline, visualBrief }, lesson);
    const filename = cardFileName(lessonNo, card.word);
    return {
      lessonNo,
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
