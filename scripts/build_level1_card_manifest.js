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

// Each brief is one frozen teaching moment.  These are deliberately authored
// from the source card/image relationships instead of deriving scenes from a
// tagline, which is too abstract to distinguish nearby spatial words.
const SCENE_OVERRIDES = Object.freeze({
  I: '单一静态中心场景，匿名人物手指自己，自己处在画面焦点光环中。',
  you: '单一静态中心场景，两位匿名人物相对站立，当前焦点向交流对象伸出一条方向箭头。',
  he: '单一静态中心场景，前景交流者的方向箭头指向远处一位男性第三方，焦点光环圈住该人物。',
  she: '单一静态中心场景，前景交流者的方向箭头指向远处一位女性第三方，焦点光环圈住该人物。',
  it: '单一静态中心场景，一个共同注意的球体被柔和焦点光环包围。',
  we: '单一静态中心场景，匿名人物与同伴处在同一个透明群体圆圈范围内。',
  they: '单一静态中心场景，远处多位第三方处在同一个群体光环范围内，前景焦点指向该群体。',
  this: '单一静态中心场景，人物手边一个近处物体被焦点光环圈住，方向箭头从手指落到物体。',
  that: '单一静态中心场景，人物的方向箭头越过距离指向远处一个物体，焦点光环圈住终点。',
  here: '单一静态中心场景，人物脚下当前位置有发光焦点圆点，位置光环落在地面。',
  there: '单一静态中心场景，当前位置焦点圆点与远处另一位置由方向箭头连接，终点有光环。',
  who: '单一静态中心场景，一个人物剪影的面部位置悬着问号，焦点光环等待未知人物。',
  be: '单一静态中心场景，一个人物与一个明亮状态块由稳定连接线相连，状态成为当前焦点。',
  have: '单一静态中心场景，一个物体安放在人物周围的半透明拥有范围内，范围边界清晰可见。',
  do: '单一静态中心场景，人物的手沿执行路径在一张任务清单上完成一个勾选，焦点落在动作接触点。',
  get: '单一静态中心场景，一条清晰路径从起点延伸到一个发光的单个目标终点。',
  go: '单一静态中心场景，当前位置与另一位置同时可见，人物沿离开当前位置的方向箭头走向另一位置。',
  come: '单一静态中心场景，远处人物沿方向箭头靠近当前焦点光环。',
  take: '单一静态中心场景，一只手从桌面起点接触一本书，方向箭头把书带离原位置。',
  give: '单一静态中心场景，一个礼物盒沿方向箭头从一人手中移动到另一人接收范围。',
  put: '单一静态中心场景，手中的球沿方向箭头落入一个指定容器终点。',
  make: '单一静态中心场景，一只手通过接触作用连接原料与一个发光结果，结果处在焦点。',
  keep: '单一静态中心场景，一个状态球留在透明保护范围内，边界光环阻止它离开当前位置。',
  bring: '单一静态中心场景，人物抱着一本书沿路径向当前焦点位置靠近。',
  turn: '单一静态中心场景，一条路径在中心转弯，方向箭头从原方向连续转向新方向。',
  see: '单一静态中心场景，一个物体沿方向箭头进入一双眼睛的视觉焦点范围。',
  look: '单一静态中心场景，一双眼睛把注意力沿方向箭头投向一个目标焦点。',
  watch: '单一静态中心场景，一只飞鸟处在弯曲注意路径上，眼睛的焦点光环持续跟随它。',
  hear: '单一静态中心场景，声音波纹沿方向箭头进入一只耳朵，耳朵处在焦点。',
  listen: '单一静态中心场景，一只耳朵主动把注意方向箭头指向远处声音波纹。',
  feel: '单一静态中心场景，一只手接触温暖表面，接触箭头指向人物内部的感受焦点。',
  know: '单一静态中心场景，一个稳定知识块在大脑范围内发光，并由连接线固定在焦点。',
  think: '单一静态中心场景，两个信息点沿连接路径进入大脑，汇聚成一个想法焦点。',
  in: '单一静态中心场景，一个物体静置在半透明边界内部，容器边界清晰包围物体。',
  on: '单一静态中心场景，一个球与桌面表面接触，接触点处在发光焦点。',
  at: '单一静态中心场景，一个位置点被精准焦点光环圈住，方向箭头落在该位置。',
  to: '单一静态中心场景，一条方向箭头从起点明确指向一个目标终点。',
  from: '单一静态中心场景，一条方向箭头从发光起点向外延伸，起点保持焦点。',
  into: '单一静态中心场景，一个物体跨越容器边界向内，方向箭头指向半透明容器内的终点。',
  out: '单一静态中心场景，一个物体沿箭头跨越容器边界向外，终点位于容器外。',
  up: '单一静态中心场景，人物沿向上方向箭头从低位置到高位置，终点有焦点光环。',
  down: '单一静态中心场景，人物沿向下方向箭头从高位置到低位置，终点有焦点光环。',
  over: '单一静态中心场景，一条抛物线路径越过一个箱子，上方方向箭头指向终点。',
  under: '单一静态中心场景，一只猫处在桌面表面下方的覆盖范围内，位置焦点落在猫身上。',
  back: '单一静态中心场景，一条回旋方向箭头从终点返回原来的起点位置。',
  and: '单一静态中心场景，两个同方向信息点由一个稳定连接件连接成并列关系。',
  but: '单一静态中心场景，一条预期路径在中心发生方向转折，转弯后的箭头指向新终点。',
  or: '单一静态中心场景，一条路径在起点分叉成两个方向箭头，两个终点保持可选焦点。',
  so: '单一静态中心场景，一个原因沿因果箭头向前推出一个发光结果终点。',
  because: '单一静态中心场景，一个原因与一个结果由因果箭头连接，箭头回指使原因成为结果的解释焦点。',
});

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
  if (SCENE_OVERRIDES[word]) return SCENE_OVERRIDES[word];
  return sanitizeVisualBrief([
    `单一静态中心场景，以简约物体、匿名人物剪影和柔和焦点光环表现${visualConcept(word, lesson.tagline)}`,
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
  if (typeof word !== 'string') throw new Error('word must be an ASCII word for the filename');
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
    'Render this as one single central static teaching scene.',
    `Place the English word "${card.word}" at the top and the exact Chinese tagline "${card.tagline}" at the bottom.`,
    'Visible wording is limited to the English word and exact Chinese tagline.',
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
  SCENE_OVERRIDES,
  buildManifest,
  buildVisualBrief,
  cardFileName,
  normalizeCardFields,
  normalizeTagline,
  normalizeWord,
  sanitizeVisualBrief,
};
