# V2 Consolidation Implementation Plan

> **For agentic workers:** Execute each phase in order. Preserve the existing staged/untracked user work, keep `main` unchanged, and request an independent review after implementation and verification.

**Goal:** Consolidate the Grammar Vision audit, P1 Level 1 review, and validated V2 learning/network work into a local, testable release-candidate branch without overstating product completion.

**Architecture:** Use `main@46aa508` as the protected baseline and integrate by evidence scope. Cherry-pick the linear Grammar Vision audit because it is based directly on the baseline; selectively port P1 and V2 assets because those branches diverged from older governance/content baselines. Keep P1 as the content authority for overlapping V2 samples and V2 as the interaction/validation authority.

**Tech Stack:** Markdown, JSON, CSV, vanilla JavaScript, Node.js built-in test runner, static HTML/CSS, browser localStorage.

---

### Task 1: Protect the integration baseline

**Files:**
- Preserve: `.superpowers/`
- Commit independently: `docs/english-thinking-os/research/GITHUB_CAPABILITY_MAP_V1.md`
- Create: this plan

- [ ] Record `main`, `origin/main`, branch tips, merge bases, and the clean rollback SHA.
- [ ] Create `integration/v2-consolidation` from `main@46aa508`.
- [ ] Verify the staged research document against its linked official repositories and licenses.
- [ ] Commit the verified research document alone; do not add `.superpowers/`.
- [ ] Run the V1 baseline test and syntax checks before feature integration.

### Task 2: Adopt the Grammar Vision audit as documentation evidence

**Files:**
- Modify: `ROADMAP.md`
- Create: `docs/grammar-vision/01_ADOPTION_AUDIT_PROTOCOL.md`
- Create: `docs/grammar-vision/02_43_NODE_ADOPTION_MATRIX.md`
- Create: `docs/grammar-vision/03_ASSET_STATE_LEDGER.md`
- Create: `docs/grammar-vision/04_GATE_EVIDENCE_CROSSWALK.md`
- Create: `docs/grammar-vision/05_CONFLICT_AND_GAP_REPORT.md`

- [ ] Cherry-pick the 11 linear audit commits from `audit/grammar-vision-adoption`.
- [ ] Check that all five documents exist, link to one another, and distinguish frozen/confirmed/planned/implemented/verified states.
- [ ] Reconcile `ROADMAP.md` checkboxes only where repository evidence proves completion.
- [ ] Run Markdown link/path and `git diff --check` validation, then commit any reconciliation separately.

### Task 3: Synchronize P1 reviewed content

**Files:**
- Modify: `content/Level1_50个骨架词完整教程.md`
- Modify: `data/level1_lessons.json`
- Regenerate: `website/data.js`
- Create: `data/p1-a-plus-20.v1.json`
- Create: `docs/P1_LEVEL1_CONTENT_AUDIT.md`
- Create: `docs/P1_COMPLETION_STATUS.md`
- Create: `content/P1_Level1_9词修订稿.md`
- Modify if required by semantic merge: `skills/3d-knowledge-card/SKILL.md`
- Modify if required: `prompts/Level1_3D知识图卡生产清单.md`
- Test: `website/app.test.js`

- [ ] Add failing contract tests for the nine revised words in formal lesson JSON/site data and for all 20 A+ template fields.
- [ ] Copy P1 audit artifacts without importing deletions or stale governance files.
- [ ] Apply the nine reviewed lessons to the formal tutorial and structured lesson data while preserving the 50-word order and 10-by-5 plan.
- [ ] Regenerate `website/data.js` with the existing build script and make the contract tests pass.
- [ ] Compare both 3D card Skill versions clause by clause; retain current Lite/Pro, safe-margin, and core-visual rules while importing only P1's valid fixed-character cleanup.
- [ ] Confirm the 850 vocabulary JSON and 170-day CSV are byte-identical to the protected baseline.

### Task 4: Port V2 interaction and graph validation

**Files:**
- Modify: `website/app.js`
- Modify: `website/app.test.js`
- Modify: `website/index.html`
- Modify: `website/styles.css`
- Create: `website/v2-data.js`
- Create: `website/v2-network.js`
- Update if evidence requires: `docs/09_Level1网站使用说明.md`

- [ ] Port the validated Quick/Deep/Network UI, four relation classes, validation, safe degradation, and responsive layouts without importing stale governance/doc deletions.
- [ ] Run the imported V2 tests against the latest integration base and fix conflicts test-first.
- [ ] Reconcile the 13 overlapping V2 sample nodes with P1-reviewed content while preserving V2 IDs, graph contracts, and learner-visible relation explanations.
- [ ] Verify malformed/missing relations degrade safely and no unsupported relation is invented.
- [ ] Verify V1 course, vocabulary, filters, review, and local-progress behavior remain covered.

### Task 5: Validate data and 3D card boundaries

**Files:**
- Verify only: `data/vocabulary_850.json`
- Verify only: `data/learning_plan_170days.csv`
- Verify: `website/assets/cards/manifest.json`
- Verify: `website/assets/cards/*.png`

- [ ] Prove 850 case-sensitive unique items with S80/A200/B570 and both `may`/`May`.
- [ ] Prove 170 rows, five words per row, 850 slots, and exactly-once coverage.
- [ ] Prove Level 1 remains 50 words in 10 five-word days.
- [ ] Prove the manifest has 50 records, only five PNG files exist, all paths/fallbacks are safe, and the five files represent `I/GET/LOOK/IN/BECAUSE` rather than Roadmap's `BE/AT/ON/IN/GET` trial list.
- [ ] Record whether the website actually loads those images or displays textual visual prompts.

### Task 6: Run automated and browser acceptance separately

**Files:**
- Create/update: `docs/verification/V2_CONSOLIDATION_ACCEPTANCE_2026-09-09.md`

- [ ] Run `node --test website/app.test.js`.
- [ ] Run all seven requested `node --check`/`git diff --check` commands.
- [ ] Start a local static server and open the site in a browser.
- [ ] Check home/continue, search/filter, lesson, Quick/Deep/Network, relation exploration/back, feedback/review, local progress, and console errors.
- [ ] Repeat layout checks at desktop, 1180px, 1024px, and phone width; record browser acceptance independently from automated tests.

### Task 7: Review, commit, and hand off

**Files:**
- Modify as required by FAIL findings only.
- Finalize: `docs/verification/V2_CONSOLIDATION_ACCEPTANCE_2026-09-09.md`

- [ ] Run an independent Reviewer against the baseline-to-head diff and the explicit acceptance checklist.
- [ ] Fix every FAIL with a reproducing test/check; record all WARNING items.
- [ ] Re-run the full automated and relevant browser checks after fixes.
- [ ] Confirm `.superpowers/` is still untracked and unrelated files are absent from commits.
- [ ] Report branch name, start/end SHAs, commits, evidence, warnings, Owner acceptance steps, and next action without pushing, opening a PR, merging to `main`, or publishing.
