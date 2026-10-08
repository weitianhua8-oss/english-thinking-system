# Focused Consistency Check — Evidence Sidecar V0.2

Date: 2026-10-08
Branch: design/vocabulary-etymology-evidence-sidecar
Reviewed candidate: c28140d789bd7ffc7fbbeda4094cd02ebbd6d8ad

## Scope

Only C1, A1, and A2 from the previous Independent Review were rechecked. No architecture expansion.

## C1 — contract_version

PASS.

Sample _meta now declares contract_version 0.2, matching Schema Sketch.

## A1 — duplicate APPROVED_INPUT state

PASS.

teaching_review_status is now:
- NOT_REVIEWED
- TEACHING_REVIEWED
- REJECTED

APPROVED_INPUT exists only as a teaching decision.

This restores a clean distinction between workflow review and resulting promotion decision.

## A2 — evidence maturity before teaching input

PASS.

Hard rule is now explicit:
teaching_decision_status == APPROVED_INPUT requires:
- evidence_review_status == EVIDENCE_REVIEWED
- teaching_review_status == TEACHING_REVIEWED

SECOND_SOURCE_CHECKED alone is insufficient.

The corrected sample promotes the previously accepted digital / insist / few evidence claims to EVIDENCE_REVIEWED, reflecting the already completed pilot evidence review rather than treating source count as review.

Validator spec adds a negative case for APPROVED_INPUT while evidence remains only SECOND_SOURCE_CHECKED.

## Cross-document consistency

PASS.

Contract V0.2, Sample V0.2, Schema Sketch V0.2, and Validator Cases V0.2 now agree on:
- canonical/runtime firewall;
- separate evidence and teaching review;
- APPROVED_INPUT semantics;
- sparse coverage;
- post branch separation;
- rejected-claim retention;
- source independence;
- referential integrity.

## Verdict

PASS — DESIGN CONSISTENCY GATE COMPLETE.

The conceptual Implementation Block caused by C1/A1/A2 is cleared.

This does NOT itself authorize production implementation, canonical Vocabulary changes, runtime consumption, or merge to main.

Next governance gate: Owner acceptance of Sidecar Design V0.2. After Owner acceptance, create a separate implementation phase/branch with exact scope and acceptance tests.
