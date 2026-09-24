# P1 Instruction Governance Implementation Plan

> **For agentic workers:** Execute this plan task-by-task in an isolated worktree. This plan is an implementation record, not a canonical project rule.

**Goal:** Establish one traceable instruction-governance chain without changing frozen teaching assets, product behavior, data, or UI.

**Architecture:** Keep `docs/english-thinking-os/PROJECT_OS.md` as the English-project navigation hub, add `PROJECT_INSTRUCTIONS.md` as the concise long-term instruction entry, and place focused governance protocols under `docs/english-thinking-os/governance/`. Reuse existing domain standards by reference instead of copying them.

**Tech Stack:** Markdown, Git, shell-based link and scope checks.

---

## Scope map

| File | Action | Responsibility |
| --- | --- | --- |
| `PROJECT_INSTRUCTIONS.md` | Create | Long-term project principles and canonical navigation entry |
| `AGENTS.md` | Create | Repository-local AI execution order and preflight questions |
| `docs/english-thinking-os/governance/INSTRUCTION_HIERARCHY_V1.md` | Create | Authority levels, conflict resolution, and source-status definitions |
| `docs/english-thinking-os/governance/CHANGE_CONTROL_V1.md` | Create | Change Proposal triggers, template, versions, and lifecycle |
| `docs/english-thinking-os/governance/REVIEW_PROTOCOL_V1.md` | Create | Reviewer authorization checks and outcomes |
| `docs/english-thinking-os/PROJECT_OS.md` | Modify | Add governance navigation without changing domain rules |

### Task 1: Establish the canonical instruction entry

- [x] Create `PROJECT_INSTRUCTIONS.md` with mission, cognitive axes, source-of-truth rules, frozen safety, content/UI separation, audit duty, and small-step delivery principles.
- [x] Link all detailed rules to existing canonical or governance documents.
- [x] Verify that no domain rule is duplicated in full.

### Task 2: Define hierarchy and change control

- [x] Create `INSTRUCTION_HIERARCHY_V1.md` with Levels A–F and the frozen-change exception.
- [x] Define Canonical Source, Derived, Superseded, Deprecated, scope resolution, source authority, and conflict resolution.
- [x] Create `CHANGE_CONTROL_V1.md` with triggers, direct-execution boundaries, PATCH/MINOR/MAJOR, the required proposal fields, approval, migration, and supersession rules.

### Task 3: Define review and AI execution

- [x] Create `REVIEW_PROTOCOL_V1.md` with frozen, silent-change, duplicate-source, terminology, schema, One New Variable, dependency, coupling, regression, sync, and undeclared-behavior checks.
- [x] Reconcile `PASS / PASS WITH NOTES / BLOCKED` with the existing `PASS / WARNING / FAIL` reviewer vocabulary.
- [x] Create `AGENTS.md` with `Inspect → Understand → Check Governance → Check Frozen Scope → Plan → Implement → Test → Review` and the six required preflight questions.

### Task 4: Integrate navigation

- [x] Update `docs/english-thinking-os/PROJECT_OS.md` to expose Governance → Project Instructions → Instruction Hierarchy → Change Control → Review Protocol.
- [x] Keep existing Grammar, Vocabulary, Visual, Web, Knowledge, Research, and Testing links visible.

### Task 5: Validate scope and integrity

- [x] Run `git diff --check`.
- [x] Check relative Markdown links in changed files.
- [x] Check governance cross-references and Project OS navigation.
- [x] Scan canonical declarations for conflicting authorities.
- [x] Confirm no frozen source, curriculum, data, visual asset, website file, or business code changed.
- [x] Run the existing Node test suite and JavaScript syntax checks.
- [x] Confirm the original `main` commit is unchanged and no merge or push occurred.
