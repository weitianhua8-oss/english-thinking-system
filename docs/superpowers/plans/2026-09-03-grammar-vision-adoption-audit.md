# Grammar Vision Adoption Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the evidence-backed audit package that maps Grammar Vision MVP into the existing English Thinking System without changing product pages, vocabulary data, course data, or existing learning behavior.

**Architecture:** Keep Project OS, Teaching OS V2, and the frozen Grammar Vision course specification as separate authorities. Create five Grammar Vision audit documents: audit protocol, 43-node adoption matrix, asset-state ledger, Gate/evidence crosswalk, and conflict/gap report. Update ROADMAP only after those audits state exactly what is implemented, verified, direction-confirmed, or planned.

**Tech Stack:** Markdown documentation, Git, Node.js test runner, existing JSON/CSV course and vocabulary assets.

---

## Scope and non-goals

This plan creates governance and audit records only. It must not modify `website/`, `data/`, `content/`, `curriculum/`, `visual/`, existing Skills, or the frozen Grammar Vision specification. It must not create Grammar or Word Image pages, generate Micro Lesson scripts, change review intervals, or change the 850-word data model.

### File structure

| File | Responsibility |
| --- | --- |
| Create `docs/grammar-vision/01_ADOPTION_AUDIT_PROTOCOL.md` | Defines status vocabulary, source hierarchy, evidence rules, and the rules for logging a conflict. |
| Create `docs/grammar-vision/02_43_NODE_ADOPTION_MATRIX.md` | Maps every frozen Grammar Vision node and each side/shadow rail to one learning stage, prerequisites, current assets, evidence, and next audit decision. |
| Create `docs/grammar-vision/03_ASSET_STATE_LEDGER.md` | States the present implementation status of all modules and prevents FROZEN design from being reported as shipped. |
| Create `docs/grammar-vision/04_GATE_EVIDENCE_CROSSWALK.md` | Separates GV-G1–GV-G7 learner Gates from TO-G1–TO-G7 teaching-quality Gates and C0–C5/six-dimension evidence. |
| Create `docs/grammar-vision/05_CONFLICT_AND_GAP_REPORT.md` | Records confirmed gaps or conflicts with source evidence, recommended Owner decisions, and no inferred solutions. |
| Modify `ROADMAP.md` | Adds a bounded P0.6 adoption-audit milestone that links the five audit documents and preserves the current no-implementation boundary. |
| Test `website/app.test.js` | Confirms documentation work has not regressed the existing site. |

### Task 1: Establish the audit protocol

**Files:**
- Create: `docs/grammar-vision/01_ADOPTION_AUDIT_PROTOCOL.md`
- Reference: `PROJECT_OS.md`, `docs/TEACHING_OS_V2.md`, `docs/grammar-vision/GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md`

- [ ] **Step 1: Record the three-level source hierarchy**

Write a “Source precedence” table with these exact rows:

| Question | Authoritative document | Audit rule |
| --- | --- | --- |
| Governance, frozen decisions, document precedence | `PROJECT_OS.md` | An audit cannot override a Project OS decision. |
| Whole-system teaching architecture and teaching-quality Gates | `docs/TEACHING_OS_V2.md` | Use `TO-G1` through `TO-G7` for quality checks. |
| Grammar Vision course sequence and learning Gates | `docs/grammar-vision/GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md` | Use `GV-G1` through `GV-G7` for learner progress. |

- [ ] **Step 2: Define the only four status labels**

Write the following exact definitions:

| Status | Evidence required | Prohibited statement |
| --- | --- | --- |
| 已实现 | A tracked asset, data field, or page behavior exists on `main`. | “已验证” unless verification evidence is also linked. |
| 已验证 | A reproducible test, manual check record, or accepted review proves the stated behavior. | “完整覆盖” unless scope is explicitly enumerated. |
| 已确认方向 | A Project OS, Teaching OS, or frozen course decision specifies the target. | “已上线” or “已接入”。 |
| planned | A future action has a named output and dependency. | “正在使用” or “默认行为”。 |

- [ ] **Step 3: Define conflict logging without silent resolution**

Add a conflict record template with exactly these fields: `ID`, `Source A`, `Source B`, `Exact conflicting claim`, `Affected nodes/assets`, `Evidence link`, `Risk`, `Owner decision required`, `Status`. State that teaching, product, or true-source conflicts stop the affected audit item until an Owner decision exists.

- [ ] **Step 4: Verify protocol scope**

Run:

```bash
rg -n '已实现|已验证|已确认方向|planned|TO-G1|GV-G1|Owner decision required' docs/grammar-vision/01_ADOPTION_AUDIT_PROTOCOL.md
```

Expected: every required status and both Gate prefixes appear; no page, data, or curriculum file changes exist.

- [ ] **Step 5: Commit the protocol**

```bash
git add docs/grammar-vision/01_ADOPTION_AUDIT_PROTOCOL.md
git diff --cached --check
git commit -m "docs: add Grammar Vision adoption audit protocol"
```

### Task 2: Build the 43-node adoption matrix

**Files:**
- Create: `docs/grammar-vision/02_43_NODE_ADOPTION_MATRIX.md`
- Reference: `docs/grammar-vision/GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md`, `data/level1_lessons.json`, `data/vocabulary_850.json`, `content/Level1_50个骨架词完整教程.md`, `data/LEARNING_LAYERS.md`

- [ ] **Step 1: Create the matrix columns and stage headings**

Use these columns exactly: `GV node`, `Frozen cognition`, `Learning stage`, `Prerequisite evidence`, `Reusable current asset`, `Current status`, `Required audit evidence`, `Next decision`.

Create headings for Stage 0 through Stage 4 using this fixed grouping:

| Learning stage | Grammar Vision nodes |
| --- | --- |
| Stage 0 · Scene 起步 | 01–04 |
| Stage 1 · Core Scene | 05–14 |
| Stage 2 · Target 与关系 | 15–26 |
| Stage 3 · 时间与动作包装 | 27–35 |
| Stage 4 · 组合、逆推与表达 | 36–43 |

- [ ] **Step 2: Add all 43 frozen node rows without inventing implementation status**

Copy the frozen cognition labels for Nodes 01–43 exactly from the frozen course specification. For each row, set `Current status` only after inspecting the referenced current asset. If no current asset demonstrably implements the node, enter `planned`; do not infer an implementation from a related word, a 3D card, or a general grammar heading.

For Nodes 01–14, inspect `data/level1_lessons.json` and `content/Level1_50个骨架词完整教程.md`; for relationship nodes inspect `data/LEARNING_LAYERS.md`; for all remaining nodes state the absence or presence of direct evidence explicitly.

- [ ] **Step 3: Add the two parallel rails**

After Node 43, add one table for Camera Control and one for English Code. Use these exact Camera Control insertion points: `Node 06后`, `Node 07–09后`, `Node 09后`, `Node 16后`, `Node 29后`. Use these exact English Code stage families: `L2 Basic Word Order / BE`, `L3 Number / Articles / Possession / Pronoun Forms`, `L4 Relationship lexical coding`, `L5 Verb shape / BE / HAVE / Past coding`, `L6 to / -ing / participle coding`, `L7 Connectors / finite-clause coding`, `L8 Parsing signals / structural cues`.

- [ ] **Step 4: Add Return Hook tracking**

For Nodes 08, 22, 26, 34, and 42, record the frozen `IN` return chain: `Relationship Seed → IN System → Relationship Role Return → Action Pack internal Return → X-Ray Return`. Record the chain as a design requirement, not an existing feature, unless linked evidence proves an implementation.

- [ ] **Step 5: Verify node count and prohibited claims**

Run:

```bash
node -e "const s=require('fs').readFileSync('docs/grammar-vision/02_43_NODE_ADOPTION_MATRIX.md','utf8'); const n=[...s.matchAll(/\|\s*(\d{2})\s*\|/g)].map(x=>Number(x[1])); if(n.length!==43||new Set(n).size!==43||Math.min(...n)!==1||Math.max(...n)!==43) throw new Error('Expected Nodes 01–43 exactly once'); if(/已上线|完整覆盖/.test(s)) throw new Error('Unsupported delivery claim'); console.log('43-node matrix: OK');"
```

Expected: `43-node matrix: OK`.

- [ ] **Step 6: Commit the matrix**

```bash
git add docs/grammar-vision/02_43_NODE_ADOPTION_MATRIX.md
git diff --cached --check
git commit -m "docs: map Grammar Vision nodes to current assets"
```

### Task 3: Create the asset-state ledger and Gate/evidence crosswalk

**Files:**
- Create: `docs/grammar-vision/03_ASSET_STATE_LEDGER.md`
- Create: `docs/grammar-vision/04_GATE_EVIDENCE_CROSSWALK.md`
- Reference: `PROJECT_OS.md`, `docs/TEACHING_OS_V2.md`, `data/LEARNING_LAYERS.md`, `skills/english-thinking/SKILL.md`, `website/app.js`, `website/app.test.js`

- [ ] **Step 1: Write the asset-state ledger**

Create ledger rows for `Culture`, `Word Image Pro`, `Grammar Vision`, `Sentence`, `Sound Layer`, `Knowledge Network`, `850 Vocabulary Foundation`, and `Mastery-driven Review`. Use the columns `Module`, `Teaching OS role`, `Current evidence`, `Status`, `What is not claimed`, `Audit follow-up`.

Set the initial status only from repository evidence. For example, `850 Vocabulary Foundation` may cite `data/vocabulary_850.json`; `Mastery-driven Review` may cite `website/app.js` and `website/app.test.js`; `Grammar Vision` must cite its frozen architecture and remain `已确认方向` unless a current page or data asset directly proves implementation.

- [ ] **Step 2: Write the Gate namespace rule**

At the top of `04_GATE_EVIDENCE_CROSSWALK.md`, define:

```text
TO-Gn = Teaching OS quality gate for a teaching asset.
GV-Gn = Grammar Vision learner ability gate.
```

State that an asset cannot be released solely because a learner can pass a GV Gate, and a learner cannot be advanced solely because the asset passed a TO Gate.

- [ ] **Step 3: Add the full crosswalk**

Create rows for `GV-G1 Required Slot`, `GV-G2 Core vs Layer`, `GV-G3 Mini Camera`, `GV-G4 Relationship Prototype`, `GV-G5 Timeline View`, `GV-G6 Packaging`, and `GV-G7 Sentence X-Ray`. For each row record: `Primary C0–C5 range`, `Required six-dimension evidence`, `Minimum TO Gate emphasis`, `One learner-visible proof`.

Use this evidence progression:

| GV Gate group | C range | Required evidence |
| --- | --- | --- |
| GV-G1–GV-G2 | C1–C2 | SEE + UNDERSTAND; DISTINGUISH when Core and Layer can be confused. |
| GV-G3–GV-G4 | C2–C3 | UNDERSTAND + DISTINGUISH + one justified TRANSFER. |
| GV-G5–GV-G6 | C3 | UNDERSTAND + CREATE; HEAR when the task supplies contextual audio. |
| GV-G7 | C4–C5 | READ reconstruction + CREATE re-expression + TRANSFER to a new Camera Tree. |

- [ ] **Step 4: Verify status and Gate terminology**

Run:

```bash
rg -n 'Culture|Word Image Pro|Grammar Vision|Sentence|Sound Layer|Knowledge Network|850 Vocabulary Foundation|Mastery-driven Review' docs/grammar-vision/03_ASSET_STATE_LEDGER.md
rg -n 'TO-G1|TO-G7|GV-G1|GV-G7|SEE|HEAR|UNDERSTAND|DISTINGUISH|CREATE|TRANSFER' docs/grammar-vision/04_GATE_EVIDENCE_CROSSWALK.md
```

Expected: all eight modules, both Gate namespaces, and all six mastery dimensions appear.

- [ ] **Step 5: Commit both documents**

```bash
git add docs/grammar-vision/03_ASSET_STATE_LEDGER.md docs/grammar-vision/04_GATE_EVIDENCE_CROSSWALK.md
git diff --cached --check
git commit -m "docs: define Grammar Vision audit evidence"
```

### Task 4: Record verified conflicts/gaps and update the roadmap

**Files:**
- Create: `docs/grammar-vision/05_CONFLICT_AND_GAP_REPORT.md`
- Modify: `ROADMAP.md`
- Reference: `docs/grammar-vision/01_ADOPTION_AUDIT_PROTOCOL.md`, `02_43_NODE_ADOPTION_MATRIX.md`, `03_ASSET_STATE_LEDGER.md`, `04_GATE_EVIDENCE_CROSSWALK.md`

- [ ] **Step 1: Write only evidence-backed findings**

For each finding, use the exact protocol fields: `ID`, `Source A`, `Source B`, `Exact conflicting claim`, `Affected nodes/assets`, `Evidence link`, `Risk`, `Owner decision required`, `Status`.

Create an explicit “Confirmed gaps” section for missing direct implementation evidence. Create a separate “No conflict found” section only when the source texts are compatible and cite both source links. Do not create a conflict merely because an asset is not implemented.

- [ ] **Step 2: Add the bounded P0.6 roadmap milestone**

Insert a `P0.6 — Grammar Vision adoption audit` section before P1. Its goal is to complete the five audit documents and make no product implementation change. Include these checkboxes:

```markdown
- [ ] Complete the 43-node adoption matrix and both parallel rails.
- [ ] Verify each module’s state against repository evidence.
- [ ] Separate GV learner Gates from Teaching OS quality Gates in all new audit records.
- [ ] Record true-source conflicts for Owner decision; do not silently resolve them.
- [ ] Update the next implementation priority only after the audit package passes review.
```

Set NOW to `P0.6 — Grammar Vision adoption audit` only after all five audit documents exist and pass their verification commands. Until then leave NOW unchanged.

- [ ] **Step 3: Verify links, source hierarchy, and protected directories**

Run:

```bash
node -e "const fs=require('fs'); const files=['docs/grammar-vision/01_ADOPTION_AUDIT_PROTOCOL.md','docs/grammar-vision/02_43_NODE_ADOPTION_MATRIX.md','docs/grammar-vision/03_ASSET_STATE_LEDGER.md','docs/grammar-vision/04_GATE_EVIDENCE_CROSSWALK.md','docs/grammar-vision/05_CONFLICT_AND_GAP_REPORT.md']; for(const p of files) if(!fs.existsSync(p)) throw new Error('Missing '+p); console.log('Grammar Vision audit package: OK');"
git diff --check
git diff --name-only HEAD^ HEAD -- website data content curriculum visual
node --test website/app.test.js
```

Expected: audit package exists, `git diff --check` has no output, the protected-directory diff is empty, and all existing website tests pass.

- [ ] **Step 4: Commit the report and roadmap update**

```bash
git add docs/grammar-vision/05_CONFLICT_AND_GAP_REPORT.md ROADMAP.md
git diff --cached --check
git commit -m "docs: add Grammar Vision adoption audit roadmap"
```

## Plan self-review

| Approved design requirement | Planned task |
| --- | --- |
| Default zero-base start and five-stage path | Task 2 preserves the fixed node-to-stage map; Tasks 3–4 establish the evidence needed before implementation. |
| Word Image and Grammar Vision must not overlap | Tasks 1 and 3 define module roles and evidence-backed status without changing either component. |
| 43 nodes plus control/code rails | Task 2 maps all 43 nodes and both parallel rails. |
| GV Gates differ from Teaching OS quality Gates | Task 3 defines separate namespaces and crosswalk evidence. |
| First phase is governance mapping and course review only | Scope section and all tasks prohibit implementation asset changes; Task 4 verifies protected directories. |
| Clear, future user entry and next-step routing | Tasks 2–3 establish prerequisites, learner evidence, and Gate routing before any page design is implemented. |

No implementation code, UI asset, vocabulary record, course lesson, or review scheduler is modified by this plan.
