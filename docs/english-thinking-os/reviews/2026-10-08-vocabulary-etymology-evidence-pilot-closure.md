# Vocabulary Etymology Evidence Pilot — Closure

Date: 2026-10-08  
Branch: research/vocabulary-etymology-evidence-pilot  
Status: OWNER ACCEPTED / RESEARCH-LAYER CLOSURE

## Accepted artifacts

- Vocabulary Etymology Evidence Standard V0.1
- 10-word Etymology Evidence Pilot
- Second-source gate for teaching-critical claims
- Independent Review: PASS WITH NOTES
- Owner acceptance with R1–R4 retained

## Accepted scope

V0.1 is accepted as a project research-layer standard for evaluating etymology, historical scenes, teaching reconstructions, analogies, and mnemonic hooks.

## Explicit non-authorization

This closure does not authorize:
- changes to data/vocabulary_850.json;
- changes to Vocabulary V1.1 0–7 teaching-track order;
- changes to Grammar Vision frozen rules;
- website/runtime changes;
- bulk 850-word etymology generation;
- automatic promotion of external-material claims into learner-facing content.

## Review notes carried forward

- R1: future V0.2 should distinguish directly attested forms from scholarly reconstructed forms inside historical evidence.
- R2: learner-facing historical claims require the second-source gate before canonical promotion.
- R3: detailed post branch history remains conditional pending a strong independent historical source.
- R4: product-level claims about retention/transfer require learner or structured comparative evidence.

## Pilot outcome

The project now has a controlled firewall between:

research evidence → reviewed teaching decision → canonical teaching content.

Etymology is allowed to improve the picture, constrain false semantic unification, or step aside when a modern core scene teaches better.

## Next proposed phase

Evidence Sidecar Design.

Goal: define a non-canonical evidence data layer that can store sources, claim-level evidence, uncertainty, A/B/C/D labels, review state, and teaching decisions without contaminating data/vocabulary_850.json.

No implementation or schema migration is authorized by this closure.
