# Independent Review — Vocabulary Etymology Evidence Pilot

Date: 2026-10-08  
Branch: research/vocabulary-etymology-evidence-pilot  
Reviewed candidate before this review: b1c19551a21ba67545382a7b37d1fe820b2ff391

## Verdict

**PASS WITH NOTES**

The Pilot is fit to proceed to Owner acceptance as a research standard. It is **not** yet approval to change the canonical vocabulary schema, Vocabulary V1.1 teaching track, Grammar Vision, or website runtime.

## Scope verification — PASS

Reviewed:
- VOCABULARY_ETYMOLOGY_EVIDENCE_STANDARD_V0.1.md
- VOCABULARY_ETYMOLOGY_PILOT_10_WORDS.md
- HISTORICAL_SCENE_MNEMONICS_V1.md
- 06_QUALITY_GATES.md

Observed boundary:
- research/documentation layer only;
- no authorization in the reviewed documents to edit data/vocabulary_850.json;
- no Grammar Vision frozen-rule modification;
- no runtime/page modification;
- no silent reordering of Vocabulary V1.1 0–7 track.

## Governance compatibility — PASS

The Pilot respects the existing rule that etymology is auxiliary rather than the teaching center. It strengthens G1 Truth by separating historical evidence from reconstruction, analogy, and mnemonic material.

No frozen Grammar rule is modified. IN/ON remain modern relationship models; the Pilot explicitly avoids converting those teaching models into unsupported historical-origin claims.

## Evidence architecture — PASS WITH NOTE

Strengths:
- A/B/C/D separates attested history, reconstruction, analogy, and mnemonic.
- claim-level evidence is required rather than attaching a generic source to an entire word.
- uncertainty and competing analysis are first-class fields.
- repeated claims across dependent websites are not automatically treated as independent evidence.

Note R1:
The word “Attested” in class A can be read too strongly when the claim is a scholarly reconstruction (for example Proto-Germanic/PIE forms marked with *). A future V0.2 should split or label **directly attested forms** versus **reconstructed forms** inside A, without changing the four-class teaching model.

Severity: NOTE, not blocker.

## Historical-scene firewall — PASS

The standard correctly prevents:
- invented birth scenes;
- letter shape / mouth movement from being promoted to etymology;
- modern semantic similarity from being called historical descent;
- multi-origin homographs from being forced into one story.

The rule “画面可以创造，历史不能创造” is consistent with HISTORICAL_SCENE_MNEMONICS_V1.

## Ten-word stress test — PASS WITH NOTES

The sample successfully exercises:
- branch separation: post;
- disputed deep reconstruction: see;
- polysemy: get;
- function/spatial words: on, in;
- supported morphology: insist;
- false-etymology detection: few;
- grammar-vs-history distinction: little;
- real family with nontrivial semantic history: factory;
- high-value historical meaning growth: digital.

Note R2:
Only teaching-critical claims received explicit second-source verification. This is acceptable for a Pilot, but the remaining first-pass-only claims must not be promoted into canonical learner-facing historical statements without their own second-source gate.

Severity: NOTE, already reflected in the document.

Note R3:
post remains CONDITIONAL. Its detailed historical branch narrative must stay out of canonical learner-facing etymology until an independent strong historical source is attached.

Severity: NOTE, not blocker because the Pilot already marks it conditional.

## External-material audit — PASS

The Pilot correctly challenges attractive claims rather than silently importing them.

In particular:
- few ≠ “compressed five” as an etymological claim;
- a in a few is not licensed as shortened negative ab- by the reviewed evidence;
- fixed “few = 2/3/4” is rejected as a lexical rule;
- unsupported alphabet symbolism for factory/digital is not promoted to history.

Importantly, rejecting the historical claim does not automatically discard the teaching mechanism: a useful sound/shape association may remain D if clearly labelled and empirically useful.

## Teaching-value gate — PASS WITH NOTE

The Pilot demonstrates three valid outcomes:
1. history improves the picture: insist, digital;
2. history constrains over-unification: post, get;
3. history should step aside: see, on, in, little.

This is a healthy result because the system is not incentivized to manufacture etymology for every word.

Note R4:
Acceptance criterion “resulting teaching is simpler or clearer than a no-etymology version” has not yet been learner-tested. The current Pilot supports expert/editorial judgment, not measured learning efficacy.

Before any claim that etymology improves retention/transfer at product level, run a small learner comparison or at least structured reviewer comparison.

Severity: NOTE; not required to approve the research standard.

## Cognitive-load review — PASS

Child/Lite remains modern-core-first. Detailed history is optional/adult-expandable. This is compatible with One New Variable and G7 Cognitive Load.

## Data architecture review — PASS

The Pilot correctly avoids prematurely adding fields to the canonical vocabulary JSON.

Recommended architecture if Owner accepts the Pilot:
- next phase should design an **evidence sidecar** first;
- canonical vocabulary should consume only reviewed teaching decisions, not raw research notes;
- source/retrieval/uncertainty data should remain in the research/evidence layer;
- any future canonical schema extension requires a separate Change Proposal and migration/validator plan.

This recommendation is not an authorization to implement the sidecar.

## Regression impact — PASS

No regression test is required for Grammar/Vocabulary runtime at this stage because no runtime/canonical data changed.

Future regression requirements:
- if schema changes: schema validator + build/runtime compatibility tests;
- if learner-facing copy changes: affected vocabulary content regression;
- if Grammar relation wording changes: frozen Grammar change process applies.

## Final gate

**Independent Review: PASS WITH NOTES**

Open notes:
- R1 distinguish directly attested vs reconstructed historical forms in future V0.2;
- R2 second-source verification remains mandatory before canonical promotion;
- R3 post detailed branch history remains conditional;
- R4 learning-effect claim remains unproven until learner/reviewer comparison.

None of R1–R4 blocks adoption of V0.1 as a **research-layer standard**.

## Owner acceptance

**ACCEPTED — 2026-10-08**

Owner approved Vocabulary Etymology Evidence Standard V0.1 as the project's research-layer etymology evidence standard, with R1–R4 retained as recorded review notes.

Acceptance scope:
- approves V0.1 for research/editorial evidence work;
- approves the 10-word Pilot conclusions at their recorded confidence/gate levels;
- does not approve a vocabulary schema change;
- does not modify Vocabulary V1.1 teaching-track order;
- does not modify Grammar Vision frozen rules;
- does not authorize website/runtime changes;
- detailed post historical narrative remains conditional.

Next phase, if separately authorized: design an Evidence Sidecar architecture before considering any canonical schema extension.

## Original Owner decision request

Owner may now:
- ACCEPT V0.1 as the project research-layer etymology evidence standard, with R1–R4 recorded;
- REQUEST CHANGES;
- REJECT.

Acceptance must not be interpreted as approval for schema/runtime changes.
