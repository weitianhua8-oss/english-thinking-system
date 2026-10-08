# Independent Review — Evidence Sidecar Design V0.2

Date: 2026-10-08
Branch: design/vocabulary-etymology-evidence-sidecar
Reviewed candidate: 887683876f242c75ddce35a50164c523cf425837

## Verdict

PASS WITH ONE REQUIRED CORRECTION BEFORE IMPLEMENTATION

## Passed

- Canonical boundary remains intact.
- Evidence review, teaching review, and canonical promotion are separated.
- sense_scope no longer functions as learner copy.
- A/B/C/D is preserved while evidence_basis resolves the attested/reconstructed ambiguity.
- source registry removes duplicated source ownership.
- rejected-claim memory is safe.
- sparse coverage prevents etymology from becoming an 850 completion requirement.
- post branches are separated.
- validator cases cover the principal drift/fallback/promotion failures.
- runtime firewall is explicitly specified.

## Required correction C1 — sample/meta mismatch

Schema Sketch requires _meta.contract_version, but Sample V0.2 does not contain it.

Before implementation, add:
contract_version: "0.2"

This is a design consistency defect, not an architecture defect.

## Advisory note A1 — review-state simplification

teaching_review_status currently allows APPROVED_INPUT while teaching_decision_status also allows APPROVED_INPUT. This is redundant and may confuse implementation.

Recommended before production schema:
- teaching_review_status: NOT_REVIEWED | TEACHING_REVIEWED | REJECTED
- teaching_decision_status: PENDING | APPROVED_INPUT | REJECTED

This keeps workflow state and decision state distinct.

Treat A1 as strongly recommended cleanup, not a blocker if exact semantics are documented.

## Advisory note A2 — A claim maturity

The sample marks digital.c1 / insist.c1 / few.c2 SECOND_SOURCE_CHECKED while their teaching decisions are APPROVED_INPUT. The Contract says learner-facing historical eligibility requires EVIDENCE_REVIEWED unless stricter rules apply.

Therefore implementation must choose one of two coherent rules:
1. promote those claims to EVIDENCE_REVIEWED after independent evidence review; or
2. forbid APPROVED_INPUT until evidence_review_status == EVIDENCE_REVIEWED.

Recommended: option 2 as validator rule, then update sample maturity only when evidence review is explicitly completed.

This is required to prevent “two sources found” from being mistaken for “evidence review passed”.

## Gate result

Design architecture: PASS.
Production implementation: remains BLOCKED until C1 and A2 are resolved; A1 should be cleaned up at the same time.

After those small corrections, no additional conceptual redesign is required. The next review can be a focused consistency check rather than another full architecture review.
