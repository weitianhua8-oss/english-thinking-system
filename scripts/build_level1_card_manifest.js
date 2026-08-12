const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const lessons = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/level1_lessons.json'), 'utf8'));
const cardsDirectory = path.join(projectRoot, 'website/assets/cards');

function cardFileName(lessonNo, word) {
  return `${String(lessonNo).padStart(2, '0')}-${String(word).toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
}

function sceneText(value) {
  return String(value || '').replace(/诺诺|固定人物角色/g, 'anonymous learner');
}

function cardPrompt(lesson) {
  return [
    'vertical 1024x1536, light 3D educational card, white negative space, blue-violet structure, coral key change.',
    `English word "${lesson.word}" at top; exact Chinese tagline "${lesson.tagline}" at bottom.`,
    `One clear scene based on this card direction: ${sceneText(lesson.card)} Scene detail: ${sceneText(lesson.image)}.`,
    'Use an anonymous simplified silhouette only if a person is necessary; never use named or recurring character, face, watermark, logo, extra words, or busy background.',
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
    visualBrief: lesson.card,
    prompt: cardPrompt(lesson),
  };
});

fs.mkdirSync(cardsDirectory, { recursive: true });
fs.writeFileSync(path.join(cardsDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
