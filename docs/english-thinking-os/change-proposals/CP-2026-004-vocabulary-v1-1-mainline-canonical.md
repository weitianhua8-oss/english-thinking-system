# Change Proposal: Vocabulary V1.1 Mainline Canonical Recovery

**Proposal ID:** CP-2026-004

**Status:** Owner Approved — implementation pending independent review

**Requested By:** Project Owner

**Date:** 2026-10-08

## Old Rule

`origin/main` has no navigable, active file containing the complete Vocabulary V1.1 0–7 teaching track. `HISTORICAL_SCENE_MNEMONICS_V1.md` references step 1, but cannot serve as the complete standard. The recovered V1.1 baseline existed outside `origin/main` and was not registered in the Project OS navigation.

## New Rule

Adopt `docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_1.md` as the sole canonical editing source for the Vocabulary V1.1 0–7 teaching track and its five production checks.

The document is a recovered baseline, not a claim of verbatim historical reconstruction. It governs the teaching sequence only; it does not replace `data/vocabulary_850.json` as the 850-word canonical data source.

## Reason

The P3.x Golden Path audit found a P0 traceability gap: authors could not navigate from the active Project OS to the complete V1.1 teaching track. This created a risk of inconsistent Pro requirements and duplicate teaching standards.

## Affected Nodes

None. No Grammar node, Grammar Vision contract, or frozen course order is changed.

## Affected Lessons

None. The existing 0–7 order is recorded; no lesson content or ordering changes.

## Affected Data

None. `data/vocabulary_850.json`, CSV mirror, schema, runtime data, progress, and website behavior remain unchanged.

## Migration Required

Yes — documentation and navigation only.

1. Add the recovered V1.1 source at its canonical path.
2. Register it under Vocabulary in the English Thinking Project OS.
3. Update the P3.x audit’s previously unresolved Owner decision to point to the adopted source.
4. Do not delete or treat historical evidence as a second active source.

**Rollback:** Revert the documentation-only candidate commits that introduce this file, CP, and navigation reference. No data, runtime, content, or learner-progress rollback is needed.

## Backward Compatibility

- No existing content meaning, lesson, data shape, UI behavior, localStorage key, or learning path changes.
- The V1.1 sequence and five checks are recorded as already confirmed baseline; this Proposal does not add a sixth check or new mandatory content component.
- Existing Skill, Quality Gates, and mnemonic rules keep their stated scopes.

## Regression Tests

- Verify the canonical path exists and is the only active Project OS Vocabulary V1.1 reference.
- Verify local Markdown links from the new standard and Project OS navigation resolve.
- Search active Project OS/Vocabulary documents for competing V1.1 canonical declarations.
- Run `git diff --check`.
- Run the existing website test suite as a regression guard, while recording that it does not prove a documentation-only semantic adoption.

## Reviewer

Independent reviewer required under `REVIEW_PROTOCOL_V1.md`; the reviewer must check authority, recovered-baseline disclosure, unique source status, unchanged data/runtime scope, and navigation links.

## Version Impact

**PATCH.** This establishes retrievable governance status for an already confirmed V1.1 baseline without changing its 0–7 semantic order, schema, runtime, or curriculum behavior. Change Control still applies because canonical authority/navigation changes are substantive governance work.

## Source Status Changes

| Source | Old status | New status |
| --- | --- | --- |
| `docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_1.md` | Recovered baseline outside `origin/main`; not navigable as active mainline source | Canonical Candidate / Owner Approved; becomes Canonical / Adopted after review and merge |
| Historical original V1.1 | Not found | Still not found; disclosure retained |
| `data/vocabulary_850.json` | Canonical 850 vocabulary data | Unchanged |
| `HISTORICAL_SCENE_MNEMONICS_V1.md` | Canonical memory-hook standard | Unchanged; subordinate only for V1.1 step 1 details |

## Owner Decision

**Approved — 2026-10-08.** The Owner authorized Codex to select the canonical file/version for Vocabulary V1.1 and approved an `ON`-only convergence pilot for the subsequent phase. This Proposal implements only the first decision: V1.1 standard recovery and navigation. It does not authorize website or data implementation.
