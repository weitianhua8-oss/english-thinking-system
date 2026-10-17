# Vocabulary V1.3 Teaching Standard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an Owner-approved V1.3 canonical standard and synchronize the English Thinking Skill to the fixed eight-part learning-card order.

**Architecture:** V1.3 becomes the single editable vocabulary teaching standard; V1.1 remains a linked Superseded baseline. The derived Skill and mnemonic-policy reference link to V1.3 rather than duplicating conflicting sequence rules.

**Tech Stack:** Markdown, Git, Node test runner.

---

## Task card

| Field | Content |
| --- | --- |
| Role | Vocabulary-standard maintainer |
| Goal | Deliver the V1.3 eight-part order with reliable mnemonic and meaning-growth rules. |
| Source of Truth | Owner request; CP-2026-006; `NEW_WORD_TEACHING_STANDARD_V1_3.md`. |
| Constraints | No changes to vocabulary data, schema, curriculum, webpage, runtime or Grammar rules; retain V1.1 traceability. |
| Deliverables | Canonical V1.3 standard, synchronized Skill/governance links, CP, review record and Git commit. |
| Acceptance | Required order and content rules are present; links resolve; diff is documentation-only; independent governance review has no blocker. |

### Task 1: Establish the approved source transition

- [x] Create `docs/english-thinking-os/change-proposals/CP-2026-006-vocabulary-v1-3-eight-part-standard.md` with Owner authorization, impact, migration, rollback and regression checks.
- [x] Create `docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_3.md` as the only canonical V1.3 rule body.
- [x] Retain V1.1 and label it Superseded with a direct replacement link.

### Task 2: Synchronize derived guidance

- [x] Update `skills/english-thinking/SKILL.md` to use exactly the V1.3 eight-part learner-facing order, point to V1.3, and state the per-meaning requirements.
- [x] Update the Project OS vocabulary navigation and historical mnemonic integration reference so no active guidance still points to V1.1 as the current teaching track.

### Task 3: Verify and review

- [x] Run ordered-heading, fact-boundary, link and canonical-conflict checks.
- [x] Run `git diff --check` and `node --test website/app.test.js`.
- [x] Obtain an independent governance review and record its outcome.
- [ ] Commit only the approved documentation scope and push `main`.
