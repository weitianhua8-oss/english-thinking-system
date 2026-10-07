# Vocabulary Etymology Evidence Sidecar — Schema Sketch V0.2

Status: DESIGN ONLY / NON-PRODUCTION
Contract: Vocabulary Etymology Evidence Sidecar Contract V0.2

## Purpose

This sketch defines machine-checkable structure before a production JSON Schema is authorized.

## Root

Required:
- _meta
- records[]
- sources[]

_meta must declare:
- canonical: false
- runtime_consumable: false
- contract_version

Any true value for canonical or runtime_consumable is invalid.

## Record

Required:
- word: non-empty string
- sense_id: globally unique non-empty string
- part_of_speech: non-empty string
- sense_scope: non-empty editorial string
- claims: non-empty array

Forbidden learner-content fields in the research sidecar:
- definition
- core_picture
- lesson
- example_sentences
- learner_copy

Rationale: learner-facing content belongs to canonical Vocabulary, not the evidence ledger.

## Claim

Required:
- claim_id: globally unique string
- claim_type
- statement
- evidence_class
- evidence_basis
- confidence
- evidence_review_status
- teaching_review_status
- proposed_teaching_use
- teaching_decision_status

Allowed evidence_class:
A_ATTESTED_OR_HISTORICAL
B_EVIDENCE_GROUNDED_RECONSTRUCTION
C_PEDAGOGICAL_ANALOGY
D_MNEMONIC_ONLY

Allowed evidence_basis:
DIRECTLY_ATTESTED
SCHOLARLY_RECONSTRUCTION
HISTORICAL_DICTIONARY_SYNTHESIS
NOT_APPLICABLE

Allowed confidence:
HIGH
MEDIUM
LOW
DISPUTED

Allowed evidence_review_status:
DRAFT
FIRST_SOURCE_CHECKED
SECOND_SOURCE_CHECKED
EVIDENCE_REVIEWED
CONDITIONAL
REJECTED

Allowed teaching_review_status:
NOT_REVIEWED
TEACHING_REVIEWED
REJECTED

Allowed teaching_decision_status:
PENDING
APPROVED_INPUT
REJECTED

## Cross-field rules

1. B claims require non-empty based_on_claim_ids.
2. C/D claims normally use NOT_APPLICABLE evidence_basis unless a specific reviewed reason says otherwise.
3. A claims require at least one source.supports reference.
4. SECOND_SOURCE_CHECKED requires at least two supporting sources with distinct known independence_group values.
5. APPROVED_INPUT teaching decision requires evidence_review_status == EVIDENCE_REVIEWED and teaching_review_status == TEACHING_REVIEWED.
6. SECOND_SOURCE_CHECKED alone cannot have APPROVED_INPUT teaching decision. Historical A claims that are CONDITIONAL or REJECTED cannot have APPROVED_INPUT teaching decision.
7. B claims cannot be APPROVED_INPUT when any required parent is CONDITIONAL or REJECTED.
8. REJECTED claims require rejection_reason and reviewed_at.
9. All based_on_claim_ids, conflicting_evidence, and source.supports references must resolve.
10. sense_id, claim_id, source_id are globally unique in their respective namespaces.

## Source

Required:
- source_id: globally unique
- title
- publisher_or_work
- url_or_bibliography
- retrieved_at
- supports: non-empty claim-id array
- independence_group

independence_group may be UNKNOWN, but UNKNOWN does not count toward independent-source thresholds.

## Sparse semantics

No record is required for every canonical vocabulary word.
No sidecar completeness percentage may be used as a Vocabulary completion KPI.

## Runtime firewall

Production validator must fail if:
- _meta.canonical != false
- _meta.runtime_consumable != false
- research sidecar is configured as a website/runtime data dependency

The third check may require repository-level validation rather than JSON Schema alone.
