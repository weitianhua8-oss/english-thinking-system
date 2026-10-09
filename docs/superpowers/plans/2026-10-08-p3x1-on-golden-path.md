# P3.x.1 ON Canonical Golden Path Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Make the reviewed canonical JSON record for on generate the only active Pro/V2 lesson node and let a learner complete a bounded transfer-and-output Golden Path.

**Architecture:** Keep data/vocabulary_850.json as the sole editable semantic record. The build script validates and projects reviewed learning_layers into website/data.js as D.proLessons; app.js merges it into the 12-node static V2 base before graph validation and rendering. The only new learner state is transient UI state for the on transfer and output checks.

**Tech Stack:** Node.js built-in modules, static browser JavaScript/CSS/SVG, JSON, node:test, Node assert.

---

## Preconditions and file map

Do not start Task 2 until CP-2026-005 is explicitly Owner Approved. Work only in the existing audit/p3-vocabulary-golden-path worktree. Do not modify main or manually author website/data.js.

| File | Responsibility after implementation |
|---|---|
| data/vocabulary_850.json | Canonical baseline vocabulary and the single reviewed on learning_layers payload. |
| data/vocabulary.schema.json | Eight required base fields and optional reviewed learning_layers contract. |
| data/README.md | Explains JSON authority and why nested Pro data is not copied to CSV. |
| scripts/build_level1_site_data.js | Validates reviewed content and projects D.proLessons. |
| website/data.js | Generated runtime payload only. |
| website/v2-data.js | Twelve static base nodes and four unchanged systems; no on node. |
| website/app.js | Builds the merged runtime graph and renders transient transfer/output UI. |
| website/style.css | Scoped accessible presentation for transfer figure and answer controls. |
| website/assets/on-transfer-hat-bed.svg | Local original transfer visual. |
| website/app.test.js | Contract, projection, graph, interaction, isolation and visual-regression tests. |

### Task 1: Approve and register the controlled scope

**Files:**

- Modify: docs/english-thinking-os/change-proposals/CP-2026-005-on-pro-canonical-golden-path.md
- Reference: docs/superpowers/specs/2026-10-08-p3x1-on-golden-path-design.md

- [ ] **Step 1: Obtain the Owner decision**

Present CP-2026-005's Old Rule, New Rule, MAJOR source transition, rollback and non-goals. Do not edit data, schema, build, website, asset or test files before a positive decision.

- [ ] **Step 2: Record a positive decision exactly**

~~~markdown
## Owner Decision

**Approved — YYYY-MM-DD.** The Owner authorizes only the ON-only migration described in this CP. No additional word, teaching meaning, frozen rule, persistent-progress contract, or remote asset is authorized.
~~~

On rejection, set Status to Rejected and stop.

- [ ] **Step 3: Commit**

~~~sh
git add docs/english-thinking-os/change-proposals/CP-2026-005-on-pro-canonical-golden-path.md
git commit -m "docs: approve CP-2026-005 ON golden path"
~~~

Expected: one governance-only commit; no runtime or product file changes.

### Task 2: Establish the canonical contract before implementation

**Files:**

- Modify: data/vocabulary.schema.json
- Modify: data/README.md
- Modify: scripts/build_level1_site_data.js
- Modify: website/app.test.js

- [ ] **Step 1: Add failing source-contract tests**

~~~js
const buildLevel1 = require('../scripts/build_level1_site_data.js');
const vocabulary850 = require('../data/vocabulary_850.json');

test('canonical vocabulary keeps 850 eight-field records', () => {
  const required = ['id','word','grade','level','category','subcategory','core_direction','related'];
  assert.equal(vocabulary850.length, 850);
  vocabulary850.forEach(item => required.forEach(field => assert.ok(Object.hasOwn(item, field), item.word + ':' + field)));
});

test('reviewed ON content projects only when complete', () => {
  const on = vocabulary850.find(item => item.word === 'on');
  const projected = buildLevel1.projectReviewedProLessons(vocabulary850, new Set(['at','in']));
  assert.equal(on.learning_layers.review_status, 'reviewed');
  assert.deepEqual(projected.map(item => item.id), ['on']);
  assert.throws(() => buildLevel1.projectReviewedProLessons(
    [{ ...on, learning_layers: { ...on.learning_layers, network: { ...on.learning_layers.network, relations: [{ type: 'bad', target: 'in', label: 'x', explanation: 'x' }] } } }],
    new Set(['at','in'])
  ), /invalid relation type/);
});
~~~

- [ ] **Step 2: Confirm failure**

~~~sh
node --test website/app.test.js --test-name-pattern="canonical vocabulary|reviewed ON"
~~~

Expected: FAIL because the build script has no exported projection helper and on has no reviewed payload.

- [ ] **Step 3: Correct the schema**

Use these eight top-level required fields:

~~~json
"required": ["id", "word", "grade", "level", "category", "subcategory", "core_direction", "related"]
~~~

Give id integer type, word/grade/level/category/subcategory/core_direction string type, and related an array of strings. Keep learning_layers optional. When review_status is reviewed, require quick, deep, network and assessment; require network.system_id, relations and next_recommended, plus assessment.transfer and assessment.output. Keep additional properties permissible so the other 849 records do not need migration.

- [ ] **Step 4: Correct the README boundary**

Replace the obsolete enrichment list with:

~~~markdown
The eight flat baseline fields are canonical for every record. Optional learning_layers may appear only after review. It is nested JSON-only Pro lesson content and is not represented in vocabulary_850.csv. CSV remains a compatibility mirror of the eight flat fields, not a Pro-content editor.
~~~

- [ ] **Step 5: Export pure validation and projection helpers**

Refactor scripts/build_level1_site_data.js so it writes output only when executed directly. Export projectReviewedProLessons and buildPayload. The projection must take all vocabulary records and a Set of static V2 ids, reject every reviewed word other than on, and return runtime nodes in this exact form:

~~~js
{
  id: item.word,
  word: item.word.toUpperCase(),
  systemId: layer.network.system_id,
  coreMeaning: layer.quick.one_line,
  coreImage: layer.quick.core_image,
  quick: { origin: layer.quick.one_line, example: layer.quick.prototype, memoryHook: layer.quick.hook },
  deep: { logic: layer.deep.logic, scenes: layer.deep.scenes, structures: layer.deep.structures.join('；'), chineseTrap: layer.deep.chinese_trap, studyTip: layer.deep.study_tip },
  relations: layer.network.relations,
  assessment: layer.assessment
}
~~~

Use the existing V2 relation set: system, growth, combination, contrast. Reject duplicate ids, missing text, empty scenes, unknown system ids, invalid relation types, and relation targets absent from the static V2 id Set.

- [ ] **Step 6: Verify and commit**

~~~sh
node --test website/app.test.js --test-name-pattern="canonical vocabulary|reviewed ON"
git add data/vocabulary.schema.json data/README.md scripts/build_level1_site_data.js website/app.test.js
git commit -m "feat: validate canonical ON Pro lesson data"
~~~

Expected: PASS. No generated runtime file is committed in this task.

### Task 3: Add the reviewed ON source and project it

**Files:**

- Modify: data/vocabulary_850.json
- Modify: scripts/build_level1_site_data.js
- Modify: website/data.js (generated)
- Modify: website/app.test.js

- [ ] **Step 1: Add a failing output test**

~~~js
test('build output derives one ON Pro lesson from canonical JSON', () => {
  const output = buildLevel1.buildPayload();
  assert.equal(output.proLessons.length, 1);
  assert.equal(output.proLessons[0].id, 'on');
  assert.equal(output.proLessons[0].assessment.output.answer, 'on');
});
~~~

- [ ] **Step 2: Confirm failure**

~~~sh
node --test website/app.test.js --test-name-pattern="build output derives"
~~~

Expected: FAIL because buildPayload lacks proLessons.

- [ ] **Step 3: Edit only the on record**

Add reviewed learning_layers using the approved specification: one contact/support scene, system_id space-relations, contrast relations to in and at, the local hat/bed asset, transfer answer on and output answer on. Fill every text field with V1.1-reviewed wording; do not add time, platform, on/off, etymology, phonics or audio.

- [ ] **Step 4: Include proLessons in the generated payload**

Read allVocabulary before applying the Level 1 filter. Load website/v2-data.js, build its id Set, and make buildPayload return:

~~~js
{ vocabulary, lessons, plan, contrasts, proLessons: projectReviewedProLessons(allVocabulary, baseNodeIds) }
~~~

Use buildPayload when writing the existing website/data.js wrapper.

- [ ] **Step 5: Rebuild and verify**

~~~sh
node scripts/build_level1_site_data.js
node --test website/app.test.js --test-name-pattern="canonical vocabulary|reviewed ON|build output derives"
node -e "const d=require('./website/data.js'); if(d.proLessons.length!==1||d.proLessons[0].id!=='on') process.exit(1)"
~~~

Expected: all PASS and generated data contains exactly one Pro lesson.

- [ ] **Step 6: Commit**

~~~sh
git add data/vocabulary_850.json scripts/build_level1_site_data.js website/data.js website/app.test.js
git commit -m "feat: project canonical ON Pro lesson data"
~~~

### Task 4: Merge the derived ON node into V2

**Files:**

- Modify: website/v2-data.js
- Modify: website/app.js
- Modify: website/app.test.js

- [ ] **Step 1: Add failing merge tests**

~~~js
const baseV2 = require('./v2-data.js');
const runtimeData = require('./data.js');

test('runtime V2 merges exactly one derived ON node', () => {
  const merged = core.mergeRuntimeV2(baseV2, runtimeData.proLessons);
  assert.equal(baseV2.nodes.some(node => node.id === 'on'), false);
  assert.equal(merged.nodes.filter(node => node.id === 'on').length, 1);
  assert.equal(merged.nodes.length, 13);
  assert.deepEqual(require('./v2-network.js').validateGraph(merged).errors, []);
});

test('runtime V2 rejects a collision', () => {
  assert.throws(() => core.mergeRuntimeV2(baseV2, [{ ...runtimeData.proLessons[0], id: 'in' }]), /duplicate V2 node id/);
});
~~~

- [ ] **Step 2: Confirm failure**

~~~sh
node --test website/app.test.js --test-name-pattern="runtime V2"
~~~

Expected: FAIL because mergeRuntimeV2 is absent and static V2 still contains on.

- [ ] **Step 3: Remove only the on object from website/v2-data.js**

Delete the complete object whose id is on. Do not alter systems, relation wording or any other node.

- [ ] **Step 4: Add and apply the merge helper**

Implement mergeRuntimeV2 in app.js. It must validate base systems/nodes, reject duplicate ids in base or additions, and return copied systems plus ordered base nodes followed by additions. Use:

~~~js
const V2 = mergeRuntimeV2(window.ENGLISH850_V2_DATA, D.proLessons);
~~~

before the existing network-validator gate. Export mergeRuntimeV2 for tests.

- [ ] **Step 5: Adapt existing graph tests**

All existing assertions that need a complete 13-node graph must construct:

~~~js
const data = core.mergeRuntimeV2(require('./v2-data.js'), require('./data.js').proLessons);
~~~

Retain 13-node/four-system expectations and add a base-data assertion of 12 nodes with no on id.

- [ ] **Step 6: Verify and commit**

~~~sh
node --test website/app.test.js --test-name-pattern="runtime V2|V2 graph|V2 browser scripts"
git add website/v2-data.js website/app.js website/app.test.js
git commit -m "feat: merge derived ON into V2 runtime graph"
~~~

Expected: PASS and no dangling relation targets after merge.

### Task 5: Add transient transfer and output checks

**Files:**

- Create: website/assets/on-transfer-hat-bed.svg
- Modify: website/app.js
- Modify: website/style.css
- Modify: website/app.test.js

- [ ] **Step 1: Add failing helper/renderer tests**

~~~js
test('ON assessment validates transfer and output without persistent progress', () => {
  const lesson = require('./data.js').proLessons[0];
  assert.equal(core.onAssessmentResult(lesson.assessment, 'transfer', 'in').correct, false);
  assert.equal(core.onAssessmentResult(lesson.assessment, 'transfer', 'on').correct, true);
  assert.equal(core.onAssessmentResult(lesson.assessment, 'output', ' ON ').correct, true);
  assert.equal(core.onAssessmentResult(lesson.assessment, 'output', '').correct, false);
  assert.match(core.renderOnAssessment(lesson, { transferAnswer: 'on', outputAnswer: 'on', outputChecked: true }), /你把 on 用到了一个新的场景/);
});
~~~

- [ ] **Step 2: Confirm failure**

~~~sh
node --test website/app.test.js --test-name-pattern="ON assessment"
~~~

Expected: FAIL because onAssessmentResult and renderOnAssessment are absent.

- [ ] **Step 3: Create the local visual**

Create a simple original SVG, 800 by 450, viewBox 0 0 800 450: bed frame, mattress surface and a red hat visibly resting on the mattress. Use no embedded text and no external asset.

- [ ] **Step 4: Implement assessment helpers**

onAssessmentResult normalizes only trim and lowercase, compares to assessment phase answer and returns correct plus the supplied correct/incorrect feedback. renderOnAssessment must return empty text for non-on nodes and otherwise render:

1. the local image with the JSON-provided alt;
2. two buttons with data-action select-on-transfer and data-answer on/in;
3. one labelled single-line input with data-on-output;
4. a submit button with data-action check-on-output;
5. role=status feedback; and
6. completion only when transfer and checked output are correct.

Append this after existing V2 learning layers only for on. Export both helpers.

- [ ] **Step 5: Wire transient state only**

Add state fields onTransferAnswer, onOutputAnswer and onOutputChecked. The two actions may only update those fields and render. Do not call saveProgress, applyFeedback, or any V1/V2 progress helper. Reset all three when openWord receives a different word.

- [ ] **Step 6: Add scoped CSS**

Under .onAssessment, add responsive max-width image, clear selected choice, focus-visible outline, feedback spacing and a single-column 375px layout. Do not alter shared workspace tabs or global button rules.

- [ ] **Step 7: Verify and commit**

~~~sh
node --test website/app.test.js --test-name-pattern="ON assessment|V2 workspace|progress"
git add website/assets/on-transfer-hat-bed.svg website/app.js website/style.css website/app.test.js
git commit -m "feat: add ON transfer and output checks"
~~~

Expected: PASS and no persistent-progress write path.

### Task 6: Regression, independent review, and Owner acceptance

**Files:**

- Modify: docs/english-thinking-os/change-proposals/CP-2026-005-on-pro-canonical-golden-path.md
- Create: docs/english-thinking-os/reviews/2026-10-08-p3x1-on-independent-review.md
- Modify: docs/english-thinking-os/08_CURRENT_STATE.md

- [ ] **Step 1: Run complete automated evidence**

~~~sh
node scripts/build_level1_site_data.js
node --test website/app.test.js
git diff --check
node -e "const d=require('./website/data.js'),v=require('./website/v2-data.js');if(d.proLessons.length!==1||v.nodes.some(n=>n.id==='on'))process.exit(1)"
~~~

Expected: all tests PASS, no whitespace errors, generated data has one on, and base V2 has none.

- [ ] **Step 2: Complete manual browser acceptance**

At desktop and about 375px: open on, use each Quick/Deep/Network layer, select wrong in then correct on, submit blank then wrong then ON, confirm completion only after correct output, reload, then open in, at, see, Word Image and Sentence. Record viewport, result and concise evidence.

- [ ] **Step 3: Perform independent review**

Review must compare final diff to CP and design spec; inspect source uniqueness, static-node removal, derived regeneration, 13-node graph, teaching scope, progress isolation, automated results and manual evidence. Record PASS/BLOCKED and Candidate SHA in the review file.

- [ ] **Step 4: Update CP to Under Owner Acceptance**

Add this evidence section after an independent PASS:

~~~markdown
## Implementation Evidence

- Candidate SHA: exact final commit ID emitted by Step 5
- Automated regression: PASS — node --test website/app.test.js
- Manual acceptance: PASS / pending Owner result
- Independent review: PASS — link to review record
~~~

Do not set CP status to Implemented until Owner explicitly accepts the working pilot.

- [ ] **Step 5: Commit closure evidence**

~~~sh
git add docs/english-thinking-os/change-proposals/CP-2026-005-on-pro-canonical-golden-path.md docs/english-thinking-os/reviews/2026-10-08-p3x1-on-independent-review.md docs/english-thinking-os/08_CURRENT_STATE.md
git commit -m "docs: record ON golden path review evidence"
git status --short
git rev-parse HEAD
~~~

Expected: clean worktree and Candidate SHA. Do not merge or push without explicit Owner instruction.

## Plan self-review

| Specification requirement | Plan task |
|---|---|
| ON-only, contact/support variable | 1, 3, 5 |
| JSON unique editable source | 2, 3, 4 |
| Eight-field schema correction | 2 |
| Derived proLessons, no hand editing | 3 |
| Static on removal, 13-node graph preserved | 4 |
| Quick/Deep/Network → transfer → output | 3, 5 |
| No persistent mastery state | 5, 6 |
| Regression, independent review, acceptance | 6 |

Consistency: canonical field names are learning_layers, network.system_id and assessment; runtime fields are proLessons, systemId and assessment; merge helper is mergeRuntimeV2; assessment helpers are onAssessmentResult and renderOnAssessment.
