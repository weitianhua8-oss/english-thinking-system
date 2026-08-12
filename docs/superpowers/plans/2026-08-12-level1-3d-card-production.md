# Level 1 3D Knowledge Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and integrate 50 offline 3D knowledge cards, one for every Level 1 skeleton word, without using 诺诺 or any fixed character.

**Architecture:** Build a deterministic manifest from existing lesson records. Save one portrait PNG for every manifest item under `website/assets/cards/`; extend the existing data builder with an `imagePath`; render the local image with a text fallback.

**Tech Stack:** Built-in ImageGen, Node.js test runner, vanilla JavaScript, local PNG assets.

---

### Task 1: Build and test the card manifest

**Files:**
- Create: `scripts/build_level1_card_manifest.js`
- Create: `website/assets/cards/manifest.json`
- Modify: `website/app.js`
- Modify: `website/app.test.js`

- [ ] **Step 1: Write failing tests for fifty unique filenames**

```js
const manifest = require('./assets/cards/manifest.json');
test('manifest covers fifty unique cards', () => {
  assert.equal(manifest.length, 50);
  assert.equal(new Set(manifest.map(card => card.filename)).size, 50);
  assert.equal(manifest[0].filename, '01-i.png');
  assert.equal(manifest.at(-1).filename, '50-because.png');
  assert.ok(manifest.every(card => !/诺诺|固定人物角色/.test(card.prompt)));
});
test('cardFileName is stable', () => {
  assert.equal(core.cardFileName(1, 'I'), '01-i.png');
  assert.equal(core.cardFileName(50, 'because'), '50-because.png');
});
```

- [ ] **Step 2: Verify red**

Run: `node --test website/app.test.js`

Expected: FAIL because the manifest and helper are absent.

- [ ] **Step 3: Implement deterministic records**

Read `data/level1_lessons.json` and create 50 records with `lessonNo`, `word`, `filename`, `tagline`, `imagePath`, `visualBrief`, and `prompt`. Use:

```js
function cardFileName(lessonNo, word) {
  return `${String(lessonNo).padStart(2, '0')}-${String(word).toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
}
```

Each prompt specifies: vertical 1024×1536, light 3D educational card, white space, blue-violet structure, coral key change, top English word, exact bottom Chinese tagline, one scene from `card` and `image`, and “never use 诺诺, named or recurring character, face, watermark, logo, extra words, or busy background.” Export the same helper from `website/app.js`.

- [ ] **Step 4: Verify green and commit**

Run: `node scripts/build_level1_card_manifest.js && node --test website/app.test.js`

Expected: manifest has 50 unique records and all tests pass.

Run: `git add scripts/build_level1_card_manifest.js website/assets/cards/manifest.json website/app.js website/app.test.js && git commit -m "feat: add Level 1 card manifest pipeline"`

### Task 2: Generate and approve five samples

**Files:**
- Create: `website/assets/cards/01-i.png`
- Create: `website/assets/cards/16-get.png`
- Create: `website/assets/cards/27-look.png`
- Create: `website/assets/cards/34-in.png`
- Create: `website/assets/cards/50-because.png`

- [ ] **Step 1: Generate five separate images**

Use the exact manifest prompt for each representative word with the built-in ImageGen tool. Copy the selected image to the filename above.

- [ ] **Step 2: Inspect samples and regenerate rejected files**

Accept only portrait images with a correct English word, readable exact Chinese tagline, one clear visual relationship, and no 诺诺, fixed character, realistic face, watermark, or unrelated text. Use one targeted correction prompt per rejected image.

- [ ] **Step 3: Show the five samples for user approval**

Do not generate the remaining 45 images before approval.

### Task 3: Generate, inspect, and commit remaining cards

**Files:**
- Create: remaining files from `website/assets/cards/manifest.json`

- [ ] **Step 1: Generate the 45 remaining records in nine batches of five**

Use one built-in ImageGen call per distinct manifest prompt. Inspect each batch before starting the next.

- [ ] **Step 2: Correct every failed card immediately**

For every failed image, reuse the manifest prompt plus one targeted sentence correcting text or the relationship. Reinspect before accepting.

- [ ] **Step 3: Verify fifty local assets**

Run: `node -e "const fs=require('fs'),m=require('./website/assets/cards/manifest.json'),x=m.filter(c=>!fs.existsSync('website/'+c.imagePath));if(x.length)throw Error(x.map(c=>c.filename));console.log('Verified '+m.length+' card files.')"`

Expected: `Verified 50 card files.`

- [ ] **Step 4: Commit image assets**

Run: `git add website/assets/cards && git commit -m "feat: add Level 1 3D knowledge card assets"`

### Task 4: Integrate local card paths and safe fallback rendering

**Files:**
- Modify: `scripts/build_level1_site_data.js`
- Modify: `website/data.js`
- Modify: `website/app.js`
- Modify: `website/app.test.js`

- [ ] **Step 1: Write failing integration tests**

```js
test('site data assigns local card paths', () => {
  const data = require('./data.js');
  assert.equal(data.lessons.I.imagePath, 'assets/cards/01-i.png');
  assert.equal(data.lessons.because.imagePath, 'assets/cards/50-because.png');
});
test('cardMarkup has image and fallback modes', () => {
  assert.match(core.cardMarkup({ card: '透明容器卡。' }), /图卡准备中/);
  assert.match(core.cardMarkup({ word: 'in', imagePath: 'assets/cards/34-in.png', card: '透明容器卡。' }), /knowledgeCardImage/);
});
```

- [ ] **Step 2: Verify red**

Run: `node --test website/app.test.js`

Expected: FAIL because `imagePath` and `cardMarkup` are absent.

- [ ] **Step 3: Implement site path and markup**

Load manifest JSON in the data builder and assign `imagePath: cardPathByWord[lesson.word]`. Implement:

```js
function cardMarkup(lesson) {
  if (!lesson?.imagePath) return `<div class="cardFallback"><b>图卡准备中</b><span>${escapeHtml(lesson?.card || '')}</span></div>`;
  return `<img class="knowledgeCardImage" src="${escapeHtml(lesson.imagePath)}" alt="${escapeHtml(`${lesson.word} 知识图卡`)}" data-card-fallback="${escapeHtml(lesson.card || '')}">`;
}
```

Use it in `renderLesson()` and add one non-inline image-error listener that replaces a failed image with the same fallback.

- [ ] **Step 4: Verify green and commit**

Run: `node scripts/build_level1_site_data.js && node --test website/app.test.js && node --check website/app.js && node --check website/data.js`

Expected: all commands exit 0.

Run: `git add scripts/build_level1_site_data.js website/data.js website/app.js website/app.test.js && git commit -m "feat: display Level 1 knowledge cards offline"`

### Task 5: Add card styles, guide, and smoke checks

**Files:**
- Modify: `website/styles.css`
- Modify: `docs/09_Level1网站使用说明.md`

- [ ] **Step 1: Add responsive styles**

```css
.knowledgeCardImage { display:block; width:min(100%,560px); aspect-ratio:2/3; margin:0 auto; object-fit:cover; border-radius:20px; box-shadow:0 16px 36px rgba(31,41,55,.14); }
.cardFallback { min-height:240px; display:grid; place-items:center; gap:10px; padding:24px; text-align:center; border:1px dashed #9fb5d9; border-radius:20px; color:#365987; background:#f4f8ff; }
@media (max-width:480px) { .knowledgeCardImage { width:100%; border-radius:14px; } }
```

- [ ] **Step 2: Add the card workflow to the guide**

Add: “每个词条上方会显示一张 3D 知识图卡。先看画面、箭头和边界，再读下面的核心画面与底层逻辑。若图片暂时没有显示，网站会展示文字版视觉线索，学习和复习功能仍可继续使用。”

- [ ] **Step 3: Final verification**

Run: `node scripts/build_level1_card_manifest.js && node scripts/build_level1_site_data.js && node --test website/app.test.js && node --check website/app.js && node --check website/data.js && git diff --check`

Expected: all commands exit 0.

- [ ] **Step 4: Smoke test representative lessons**

Open `I`, `get`, `look`, `in`, and `because`; confirm images appear above text, feedback works, and a broken URL produces “图卡准备中”.

- [ ] **Step 5: Commit**

Run: `git add website/styles.css docs/09_Level1网站使用说明.md && git commit -m "docs: document Level 1 knowledge cards"`
