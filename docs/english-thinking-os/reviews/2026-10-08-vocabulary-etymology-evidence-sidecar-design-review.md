# Independent Design Review — Vocabulary Etymology Evidence Sidecar V0.1

Date: 2026-10-08
Branch: design/vocabulary-etymology-evidence-sidecar
Reviewed candidate: fa7f6a9c19368f4d0d18905a18c81e2ff691ca80

## Verdict

PASS WITH REQUIRED DESIGN FIXES BEFORE IMPLEMENTATION

The architecture is directionally correct and does not create a second learner-content truth source by design. However, the sample exposes contract/schema ambiguities that must be fixed before production implementation.

## Second-truth-source test — PASS

The contract preserves data/vocabulary_850.json as the canonical learner-content source. The sidecar cannot render directly, act as runtime fallback, automatically write canonical content, or bypass normal Vocabulary review.

Hard requirement: no website/app/runtime import may point at the sidecar.

## Required fixes

F1 — Research scope vs learner copy:
Rename or redefine modern_target as sense_scope. It is an editorial scope description, not publishable learner copy. This prevents a parallel lesson definition from drifting beside canonical Vocabulary.

F2 — Claim/source ownership:
The contract lists sources as a required claim field, while the sample stores sources at record level and connects them through supports. Choose one model. Recommended: sources live in a record/global registry; claims do not duplicate source objects; source.supports references claim IDs; every A historical claim requires supporting source references.

F3 — A-class epistemic basis:
Add evidence_basis while keeping A/B/C/D as the teaching evidence class. Suggested values: DIRECTLY_ATTESTED, SCHOLARLY_RECONSTRUCTION, HISTORICAL_DICTIONARY_SYNTHESIS, NOT_APPLICABLE. This resolves the earlier R1 note without breaking the four-class model.

F4 — Separate review dimensions:
One review_status currently mixes historical verification and teaching review. Split into evidence_review_status and teaching_review_status.

Suggested evidence flow:
DRAFT → FIRST_SOURCE_CHECKED → SECOND_SOURCE_CHECKED → EVIDENCE_REVIEWED, plus CONDITIONAL / REJECTED.

Suggested teaching flow:
NOT_REVIEWED → TEACHING_REVIEWED → APPROVED_INPUT / REJECTED.

F5 — Promotion firewall:
Split teaching_use into proposed_teaching_use and teaching_decision_status. Only APPROVED_INPUT may be cited by a canonical edit proposal. APPROVED_INPUT still is not canonical content.

F6 — Multi-branch identity:
The production sample must replace post.multibranch_placeholder with separate branch records, conceptually post.upright_object and post.station_position. A placeholder cannot validate the final identity model.

F7 — Referential integrity:
IDs must be globally unique within the sidecar. Validator must reject duplicate claim/source IDs and dangling based_on_claim_ids, supports, or conflicting_evidence references.

F8 — Source independence:
Second-source gates count distinct independence_group values, not raw source count. Unknown independence must not automatically count as independent confirmation.

## Rejected-claim memory — STRONG PASS

Rejected claims should remain queryable but must never be emitted into learner content. Future tooling may warn when imported claims duplicate known rejected claims.

## Product and cognitive-load boundary — PASS

Raw evidence stays editorial. Children never consume sidecar structure. Adult expandable content must still be rewritten and approved as canonical learner content.

## Scale test — PASS CONDITIONALLY

Do not require sidecar records for all 850 words. Absence means “no reviewed etymology evidence stored”, not “word incomplete”. This prevents etymology research from becoming a new completion burden.

## Implementation gate

BLOCK production implementation until F1–F8 are incorporated into Contract V0.2 and a corrected four-word sample.

Required next artifacts:
- Sidecar Contract V0.2
- corrected four-word sample
- schema sketch after internal consistency
- validator acceptance and rejection cases

## Final judgment

The sidecar passes the core architecture test:

It manages evidence about Vocabulary; it does not become Vocabulary.

The key correction is to keep three states separate:
1. historical evidence verification;
2. teaching/editorial approval;
3. canonical learner content.

That separation prevents future automation from silently turning research notes into lessons.
