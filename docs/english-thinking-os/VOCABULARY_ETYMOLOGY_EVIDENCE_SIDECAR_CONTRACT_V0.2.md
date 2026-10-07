# Vocabulary Etymology Evidence Sidecar Contract V0.2

Status: OWNER-APPROVED DESIGN REVISION / NON-CANONICAL
Date: 2026-10-08
Canonical learner source remains: data/vocabulary_850.json

## Core boundary

The sidecar is an evidence ledger about Vocabulary, not Vocabulary itself.

External sources → Evidence Sidecar → Evidence Review → Teaching Review → Canonical Edit Proposal → data/vocabulary_850.json → Runtime → Presentation

Forbidden: runtime imports; learner rendering of raw sidecar records; automatic canonical writes; unreviewed historical claims becoming learner content.

## Record identity

Required: word, sense_id, part_of_speech, sense_scope. sense_scope is editorial scoping text only, never learner copy. Multi-origin branches require separate records.

## Evidence model

Evidence classes remain A/B/C/D. Add evidence_basis: DIRECTLY_ATTESTED, SCHOLARLY_RECONSTRUCTION, HISTORICAL_DICTIONARY_SYNTHESIS, NOT_APPLICABLE.

Required claim fields: claim_id, claim_type, statement, evidence_class, evidence_basis, confidence, evidence_review_status, teaching_review_status, proposed_teaching_use, teaching_decision_status.

B claims require based_on_claim_ids.

## Source registry

Sources live in one registry and point to claim IDs through supports. Claims do not duplicate source objects. source_id and claim_id are globally unique. Every A claim needs source support.

Second-source verification requires two qualifying sources with distinct known independence_group values. Unknown independence does not automatically count.

## Separate review dimensions

Evidence states: DRAFT, FIRST_SOURCE_CHECKED, SECOND_SOURCE_CHECKED, EVIDENCE_REVIEWED, CONDITIONAL, REJECTED.

Teaching review states: NOT_REVIEWED, TEACHING_REVIEWED, APPROVED_INPUT, REJECTED.

Teaching decision status: PENDING, APPROVED_INPUT, REJECTED.

APPROVED_INPUT only permits a claim to inform a normal canonical edit proposal. It is not canonical content.

Proposed teaching use: MAIN_LESSON, ADULT_EXPANDABLE, MEMORY_HOOK, RESEARCH_ONLY, REJECT.

## Rejected-claim memory

Rejected claims remain stored and queryable, never learner-facing. They require rejection_reason and reviewed_at; include conflicting_evidence when applicable.

## Sparse coverage

No sidecar record means only “no reviewed etymology evidence stored”. It never means the vocabulary entry is incomplete. 850-word completion must not depend on sidecar coverage.

## Canonical promotion

1. identify APPROVED_INPUT claim IDs;
2. write learner-facing copy separately;
3. verify modern usage and Vocabulary quality gates;
4. record informing claim IDs in editorial review metadata;
5. review canonical diff normally;
6. only accepted canonical edits become learner truth.

No automatic promotion.

## Validator requirements

Reject duplicate IDs; dangling supports/based_on/conflicting references; B without parents; A without source support; claimed second-source state without two independent groups; CONDITIONAL/REJECTED historical parents feeding approved B teaching content; REJECTED claims without rejection metadata.

## Four-word test

Use digital, insist, few, plus separate post.upright_object and post.station_position records. No multibranch placeholder.

## Implementation block

Production implementation remains BLOCKED until corrected sample, schema sketch, validator positive/negative cases, and Independent Review pass. No runtime consumer is authorized.
