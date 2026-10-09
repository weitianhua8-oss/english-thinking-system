# English Thinking Skill Historical-Scene Sync Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect the existing English Thinking Skill to the already-accepted historical-scene mnemonic canonical rule without changing Vocabulary's 0–7 teaching track.

**Architecture:** `skills/english-thinking/SKILL.md` remains the only English Thinking Skill. It will link to, rather than duplicate, `docs/english-thinking-os/HISTORICAL_SCENE_MNEMONICS_V1.md`, which remains the sole detailed policy for memory-hook priority, evidence, and labels. An audit record will preserve authority, scope, verification, and Owner-acceptance boundaries.

**Tech Stack:** Markdown, Git, Node.js built-in test runner.

---

### Task 1: Record the scoped audit and minimal integration

**Files:**
- Create: `docs/english-thinking-os/reviews/2026-10-08-english-thinking-skill-sync-audit.md`
- Modify: `skills/english-thinking/SKILL.md`
- Reference: `docs/english-thinking-os/HISTORICAL_SCENE_MNEMONICS_V1.md`
- Reference: `docs/english-thinking-os/reviews/2026-10-08-cp-2026-003-owner-acceptance-closure.md`

- [x] **Step 1: Confirm authority and protected scope**

Read the Project Instructions, Project OS, Instruction Hierarchy, Frozen Decisions, CP-2026-003, and Owner closure. Record that the memory-hook rule is already accepted; do not recreate a Skill, alter data, or change the 0–7 order.

- [x] **Step 2: Add one link-only execution section to the existing Skill**

Place a short `Memory-hook policy (Step 1 integration)` section after the standard analysis pipeline. Link to the canonical historical-scene document as the sole detailed policy; state that this is a Step 1 integration only and preserves the modern semantic core, the existing 0–7 track, and the distinction among evidenced history, teaching reconstruction, mnemonic association, and uncertainty.

- [x] **Step 3: Create the audit record**

Record the task level, canonical sources, unique-Skill finding, mainline synchronization check, affected files, explicit non-goals, validation commands, rollback point, LEARN result, and the fact that Owner acceptance of this new candidate is still pending.

### Task 2: Verify and prepare the candidate commit

**Files:**
- Verify: `skills/english-thinking/SKILL.md`
- Verify: `docs/english-thinking-os/reviews/2026-10-08-english-thinking-skill-sync-audit.md`
- Verify: `website/app.test.js`

- [x] **Step 1: Run structural and content checks**

Run `git diff --check`; validate every changed Markdown file's local links; search the Skill for the canonical policy reference and for prohibited claims that make a mnemonic into etymological evidence; compare the diff with the declared scoped file list.

- [x] **Step 2: Run the existing regression suite**

Run `node --test website/app.test.js`. The expected result is a zero-failure Node test run; this confirms the documentation-only change did not disturb the existing web baseline.

- [x] **Step 3: Commit only the scoped audit artifacts**

Commit only the plan, Skill link integration, and audit record on `audit/skill-sync-historical-scene`. Do not push or merge. Use the resulting commit SHA as the review candidate.

- [x] **Step 4: Obtain an independent governance review**

Provide the reviewer with the base/head SHAs, complete diff, frozen-scope evidence, test output, and rollback command. Record the independent verdict separately; do not treat it as Owner acceptance.

## Self-review

- Scope coverage: the plan checks unique Skill, main synchronization, priority authority, information labels, protected 0–7 track, worktree isolation, tests, review, Candidate SHA, and no-main-merge boundary.
- Placeholder scan: no implementation placeholder remains; the only change is a prescribed link-only section and a prescribed audit record.
- Consistency: the canonical memory-hook rule remains outside the Skill, so no second active rule source is introduced.
