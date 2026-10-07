# Evidence Sidecar Validator Cases V0.2

Status: DESIGN TEST SPEC
Contract: Sidecar Contract V0.2
Schema: Schema Sketch V0.2

## Positive cases — must PASS

P01 — A claim with one source and FIRST_SOURCE_CHECKED.
P02 — A claim with two distinct independence groups and SECOND_SOURCE_CHECKED.
P03 — B reconstruction with valid reviewed parent through based_on_claim_ids.
P04 — rejected D mnemonic retained with rejection_reason and reviewed_at.
P05 — CONDITIONAL post branch kept RESEARCH_ONLY/PENDING.
P06 — two post records with separate sense_id values.
P07 — no sidecar record for a canonical 850 word; validation still passes.
P08 — APPROVED_INPUT research claim exists while _meta canonical/runtime flags remain false.

## Negative cases — must FAIL

N01 — duplicate claim_id.
N02 — duplicate source_id.
N03 — duplicate sense_id.
N04 — source.supports references missing claim.
N05 — based_on_claim_ids references missing claim.
N06 — conflicting_evidence references missing claim.
N07 — B claim has no based_on_claim_ids.
N08 — A claim has no supporting source.
N09 — SECOND_SOURCE_CHECKED has only one supporting source.
N10 — SECOND_SOURCE_CHECKED has two sources but same independence_group.
N11 — SECOND_SOURCE_CHECKED counts UNKNOWN as independent confirmation.
N12 — CONDITIONAL A claim marked teaching_decision_status APPROVED_INPUT.
N13 — REJECTED A claim marked APPROVED_INPUT.
N14 — approved B claim depends on CONDITIONAL parent.
N15 — approved B claim depends on REJECTED parent.
N16 — REJECTED claim lacks rejection_reason.
N17 — REJECTED claim lacks reviewed_at.
N18 — _meta.canonical is true.
N19 — _meta.runtime_consumable is true.
N20 — learner-content field such as core_picture or lesson is stored in a sidecar record.
N21 — teaching_decision_status APPROVED_INPUT while teaching_review_status is NOT_REVIEWED.
N22 — spelling similarity alone creates HISTORICALLY_RELATED without an evidence claim.
N23 — one post record collapses known distinct research branches using a multibranch placeholder in the production sample.

## Repository-level negative cases

R01 — website/app.js imports the sidecar.
R02 — website/data.js is built from the sidecar.
R03 — build script uses sidecar as fallback when canonical Vocabulary lacks a field.
R04 — automation writes sidecar teaching_summary directly into data/vocabulary_850.json without a reviewed canonical edit.
R05 — project completion check fails because some 850 words have no etymology record.

All R01–R05 must FAIL governance/CI checks if such checks are implemented.

## Four-word acceptance matrix

digital:
- two independent sources support A claim;
- B visual reconstruction points to A parent;
- research approval does not imply canonical publication.

insist:
- morphology A claim supported;
- stance scene remains B reconstruction.

few:
- false five-compression claim remains stored as REJECTED;
- rejected claim cannot become learner input.

post:
- upright-object and station-position branches remain separate;
- current historical detail remains CONDITIONAL;
- neither conditional branch is canonical-ready.

## Exit criterion

Design validation is complete only when Contract V0.2 + corrected sample + Schema Sketch + these cases agree without contradictory state semantics.
