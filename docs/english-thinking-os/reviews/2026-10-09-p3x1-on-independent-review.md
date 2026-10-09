# Independent Review: P3.x.1 ON Canonical Golden Path

**Outcome:** PASS

**Product candidate reviewed:** `7a96f8b71012a6be6c5f11c0f61d57d79d9497df`

**Reviewed implementation range:** `3e872038cc60c6f243f6e8aaf823146a2353f8a0..7a96f8b71012a6be6c5f11c0f61d57d79d9497df`

**Reviewer role:** Independent reviewer. This review does not modify product, data, runtime, asset, or test files.

## Scope and authority

- Authority: Owner-approved [CP-2026-005](../change-proposals/CP-2026-005-on-pro-canonical-golden-path.md), restricted to the single word `on`.
- Intended path: canonical JSON → generated `website/data.js` → runtime V2 merge → Quick / Deep / Network → transfer → fill-in output.
- Out of scope and found unchanged: other vocabulary records, Grammar frozen rules, time/media/platform/on-off extensions, etymology, new phonics or audio, remote assets, and persistent-progress contracts.

## Findings

| Severity | Check | Evidence | Required action |
| --- | --- | --- | --- |
| None | Canonical truth | `data/vocabulary_850.json` has 850 records; `on` is the only `learning_layers.review_status: reviewed` record. The build script reads this JSON and has no Golden-file input. | None. |
| None | Derived/runtime boundary | Rebuilding with `node scripts/build_level1_site_data.js` leaves generated `website/data.js` unchanged and produces only `D.proLessons.on`. Static `website/v2-data.js` contains 12 nodes and no `on`; merged runtime has 13 nodes with exactly one `on`. | None. |
| None | Graph integrity | `validateGraph(mergeRuntimeV2(...))` returned `errors: []`; the merged graph retains 4 systems. | None. |
| None | Teaching boundary | The reviewed canonical payload has one physical contact-and-support scene, comparisons only to `in` and `at`, then a hat/bed transfer and fill-in. No forbidden extension appears in the `on` payload. | None. |
| None | Progress isolation | Transfer/output handlers update only in-memory `state.onTransferAnswer`, `state.onOutputAnswer`, and `state.onOutputChecked`; they do not call `saveProgress`. The automated isolation test passes. | None. |
| None | Local visual | `website/assets/on-transfer-hat-bed.svg` exists and is the asset referenced by the canonical transfer payload. | None. |

## Validation reproduced

### Automated and generated-data checks

```text
node --test website/app.test.js
164 passed, 0 failed

node scripts/build_level1_site_data.js
git diff --exit-code -- website/data.js
passed (generated output is current)

node verification script
canonicalRecords: 850
reviewed: ["on"]
proLessons: ["on"]
baseNodes: 12; baseHasOn: false
mergedNodes: 13; mergedOn: 1; systems: 4
graphErrors: {"errors": []}
```

### Manual browser acceptance

- Desktop local page: opened `on`; Quick, Deep and Network tabs were present. Selected incorrect `in`, received the bounded corrective feedback, then selected `on`; filled `ON` and received completion feedback.
- Narrow local page: with an explicit 375 × 812 viewport, the local transfer image and accessible output input were both visible and usable. The viewport override was reset after the check.
- Regression spot check: opening `in`, `at`, and `see` returned their respective lessons; the learning route still lists Word Image and Sentence.

## Decision

The candidate satisfies CP-2026-005's source-of-truth, generated-data, graph, teaching-boundary, local-asset, transient-state, automated-test, and manual-path gates. No blocking issue was found. It may proceed to Owner acceptance; this review does not constitute Owner acceptance, merge, or remote publication.

## LEARN

No new cross-project rule or Skill is proposed. The reusable project-level evidence is retained in CP-2026-005, this review, the existing implementation plan, and regression tests.
