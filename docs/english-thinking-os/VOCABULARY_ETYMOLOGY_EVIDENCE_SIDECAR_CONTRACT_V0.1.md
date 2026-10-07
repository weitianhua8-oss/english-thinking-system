# Vocabulary Etymology Evidence Sidecar Contract V0.1

Status: DESIGN CANDIDATE / NON-CANONICAL  
Date: 2026-10-08  
Depends on: Vocabulary Etymology Evidence Standard V0.1

## 1. Problem

Raw etymology research must not become a second vocabulary truth source.

The project needs a sidecar that can preserve evidence, uncertainty, review history, and teaching decisions while keeping:

data/vocabulary_850.json = canonical learner-content source.

The sidecar is an editorial/research input. It does not render learner content directly.

## 2. Layer contract

External source
→ Evidence Sidecar
→ Review / Teaching Decision
→ Canonical Vocabulary
→ Runtime
→ Presentation

Hard boundary:
- Sidecar may inform canonical edits.
- Canonical content must never be generated from an unreviewed claim.
- Runtime must not read the sidecar as a fallback truth source.
- Presentation must not bypass canonical content to display raw research.

## 3. Proposed location

Design target:

data/research/vocabulary_etymology_evidence.json

This path is proposed, not authorized for implementation by this design document.

## 4. Top-level identity

Each record is keyed conceptually by:

word + lexical sense / branch

Do not assume one spelling equals one etymological object.

Required identity fields:
- word
- sense_id
- part_of_speech
- modern_target

sense_id must be stable within the project and must distinguish historically separate branches when relevant.

## 5. Claim model

A record contains one or more claims. Each claim is independently reviewable.

Required claim fields:
- claim_id
- claim_type
- statement
- evidence_class
- confidence
- sources
- review_status
- teaching_use

Allowed evidence_class:
- A_ATTESTED_OR_HISTORICAL
- B_EVIDENCE_GROUNDED_RECONSTRUCTION
- C_PEDAGOGICAL_ANALOGY
- D_MNEMONIC_ONLY

V0.2 note: class A must later distinguish directly attested forms from scholarly reconstructed forms, preserving Independent Review R1.

Suggested claim_type:
- FORM
- SOURCE_LANGUAGE
- MORPHOLOGY
- HISTORICAL_MEANING
- SEMANTIC_DEVELOPMENT
- HISTORICAL_CONTEXT
- RELATIONSHIP
- UNCERTAINTY
- MNEMONIC

## 6. Source model

Each source reference should contain:
- source_id
- title
- publisher_or_work
- url_or_bibliography
- retrieved_at
- supports

supports is an array of claim_id values.

A source is not “for the word”; it supports specific claims.

Optional:
- quotation_locator
- notes
- independence_group

independence_group exists to avoid treating copied/dependent sources as independent confirmation.

## 7. Confidence and reconstruction

Suggested confidence values:
- HIGH
- MEDIUM
- LOW
- DISPUTED

Confidence does not replace evidence_class.

A B claim must reference the A-level claim(s) it is reconstructed from through:
- based_on_claim_ids

C and D must not masquerade as historical support.

## 8. Review state machine

Allowed review_status:
- DRAFT
- FIRST_SOURCE_CHECKED
- SECOND_SOURCE_CHECKED
- REVIEWED
- REJECTED
- CONDITIONAL

Minimum promotion rule for learner-facing historical claims:

DRAFT
→ FIRST_SOURCE_CHECKED
→ SECOND_SOURCE_CHECKED
→ REVIEWED
→ eligible for teaching decision

Exceptions:
- C/D material can be reviewed for pedagogical use without pretending to pass historical-source gates.
- CONDITIONAL cannot be promoted as historical fact.
- REJECTED remains stored to prevent the same false claim being reintroduced later.

## 9. Teaching decision

teaching_use must be explicit:
- MAIN_LESSON
- ADULT_EXPANDABLE
- MEMORY_HOOK
- RESEARCH_ONLY
- REJECT

Optional teaching fields:
- teaching_summary
- proposed_scene
- reconstruction_label
- cognitive_load_note
- target_age_layer

A reviewed teaching decision is still not canonical content. It is an approved input to a separate canonical edit.

## 10. Rejected-claim memory

The sidecar should deliberately retain rejected high-risk claims.

Example:
- “few comes from five”
- “a in a few is shortened negative ab-”

Reason:
deleting rejected claims loses institutional memory and allows future re-import from external materials.

Rejected claims require:
- rejection_reason
- conflicting_evidence
- reviewed_at

## 11. Relationship edges

When evidence establishes relationships, use explicit edge types:
- HISTORICALLY_RELATED
- MORPHOLOGICALLY_DERIVED
- MODERN_SEMANTIC_RELATION
- PEDAGOGICAL_ANALOGY
- MNEMONIC_ONLY

Do not infer HISTORICALLY_RELATED from spelling similarity.

## 12. Minimal example

The first implementation test should use only:
- digital
- insist
- few
- post

These cover:
- high-value supported semantic growth;
- supported morphology;
- rejected false etymology;
- conditional multi-branch history.

Do not populate all 850 words before this four-word sample passes validation and review.

## 13. Canonical promotion protocol

A future editor wishing to change data/vocabulary_850.json from sidecar research must:
1. identify the reviewed claim(s);
2. select the teaching decision;
3. write learner-facing content separately;
4. run Vocabulary quality gates;
5. record which sidecar claim IDs informed the edit;
6. review the canonical diff as a normal Vocabulary change.

The sidecar never writes canonical content automatically.

## 14. Validation requirements for implementation

If implemented, add a validator that checks:
- unique claim_id;
- unique source_id within record/specified scope;
- B claims have based_on_claim_ids;
- source supports references existing claims;
- rejected claims have rejection_reason;
- historical MAIN_LESSON/ADULT_EXPANDABLE claims are not below required review state;
- CONDITIONAL/REJECTED historical claims cannot be marked as canonical-ready;
- relation types are from the approved enum.

Implementation must define exact schema and compatibility before adding runtime consumers.

## 15. Non-goals

V0.1 Sidecar does not:
- replace vocabulary_850.json;
- store general modern dictionary definitions unless needed to scope a historical claim;
- become a learner-facing API;
- automatically scrape websites;
- bulk-generate historical scenes;
- change Vocabulary V1.1;
- change Grammar Vision;
- prove that etymology improves learning outcomes.

## 16. Acceptance criteria

Design passes if:
1. there remains exactly one canonical Vocabulary learner-content source;
2. rejected claims can be retained safely;
3. claim-level sources and uncertainty are representable;
4. multi-origin words can be separated by sense/branch;
5. teaching reconstruction cannot be confused with attested history;
6. no unreviewed historical claim can be promoted by the proposed state machine;
7. four-word sample can be represented without special-case hacks;
8. no runtime dependency is introduced.

## 17. Next gate

Create a four-word non-canonical sample + schema sketch, validate the design against digital / insist / few / post, then Independent Review.

No production implementation is authorized by this Contract.
