# Dependency-Aware Integration Plan — Historical Scene → Etymology Pilot → Sidecar V0.2

Date: 2026-10-08
Base main: 5d9086a0ea62871ead677d4f5e7988a322ed4a74
Source lineage head observed: ff28b7c1ef4392de670b35b86269cf771be1e647
Status: PLAN ONLY — NO MAIN MERGE AUTHORIZED

## Problem

The downstream design lineage is currently 28 commits ahead of main and contains three separately governed layers plus intermediate drafts/reviews. Merging the lineage wholesale would obscure scope boundaries and import obsolete design states as if they were active specifications.

## Integration principle

Integrate accepted outcomes, preserve necessary audit evidence, and explicitly mark or omit superseded working drafts.

Dependency order is fixed:

1. CP-2026-003 Historical Scene Mnemonics
2. Vocabulary Etymology Evidence Pilot
3. Evidence Sidecar V0.2 Design
4. Future implementation phase (separate; not part of this integration)

## Layer 1 — CP-2026-003

Mainline outcome files:
- PROJECT_INSTRUCTIONS.md
- docs/english-thinking-os/PROJECT_OS.md
- docs/english-thinking-os/06_QUALITY_GATES.md
- docs/english-thinking-os/08_CURRENT_STATE.md
- docs/english-thinking-os/HISTORICAL_SCENE_MNEMONICS_V1.md
- docs/english-thinking-os/change-proposals/CP-2026-003-historical-scene-mnemonics.md

Audit evidence retained:
- historical-scene Independent Review
- CP-2026-003 Owner Acceptance / Closure

Builder self-check may be retained as audit history, but must not be treated as the approval authority.

## Layer 2 — Etymology Evidence Pilot

Mainline research/design outcome:
- docs/english-thinking-os/VOCABULARY_ETYMOLOGY_EVIDENCE_STANDARD_V0.1.md
- docs/english-thinking-os/research/VOCABULARY_ETYMOLOGY_PILOT_10_WORDS.md

Audit evidence:
- Pilot Independent Review
- Pilot Closure

This layer is research evidence, not learner canonical content.

## Layer 3 — Sidecar V0.2

Active design artifacts:
- docs/english-thinking-os/VOCABULARY_ETYMOLOGY_EVIDENCE_SIDECAR_CONTRACT_V0.2.md
- docs/english-thinking-os/VOCABULARY_ETYMOLOGY_EVIDENCE_SIDECAR_SCHEMA_SKETCH_V0.2.md
- docs/english-thinking-os/research/VOCABULARY_ETYMOLOGY_EVIDENCE_SIDECAR_SAMPLE_V0.2.json
- docs/english-thinking-os/research/VOCABULARY_ETYMOLOGY_EVIDENCE_SIDECAR_VALIDATOR_CASES_V0.2.md

Audit evidence retained:
- Sidecar V0.2 Independent Review
- Focused Consistency Check
- Owner Preflight Audit
- Design Closure

## Superseded/intermediate artifacts

Do NOT use these as active mainline specifications:
- VOCABULARY_ETYMOLOGY_EVIDENCE_SIDECAR_CONTRACT_V0.1.md
- VOCABULARY_ETYMOLOGY_EVIDENCE_SIDECAR_SAMPLE_V0.1.json
- initial Sidecar Design Review as current authority

Preferred integration treatment:
- V0.1 Contract and Sample: omit from clean integration candidate unless project policy explicitly requires all design drafts in main.
- Initial Design Review: may be retained as audit history because it explains F1–F8 and why V0.2 exists, but V0.2 closure is current authority.

## Forbidden in this integration

- data/vocabulary_850.json changes
- schema/runtime implementation
- website/app.js or website/data.js consumption
- Grammar Vision changes
- bulk 850 etymology generation
- automatic canonical promotion
- force push

## Clean candidate strategy

Create a new integration branch from current main, not from the 28-commit downstream lineage.

Recommended branch:
integration/vocabulary-etymology-governance-closure

Reconstruct the accepted final file set on that branch in dependency order. This avoids importing obsolete intermediate commits while preserving selected review/closure artifacts.

## Candidate gates

Before Owner merge approval, require:
1. branch base equals then-current main after fetch/drift check;
2. changed-file list contains only approved documentation/research artifacts;
3. no data/, website/, runtime, Grammar, or Skill implementation changes;
4. no V0.1 active-design files unless explicitly retained as history;
5. relative links resolve;
6. statuses reflect Owner acceptance/closure;
7. Contract V0.2 remains NON-CANONICAL;
8. git diff/check equivalent passes;
9. Independent Review of the clean integration candidate;
10. Owner acceptance of exact Candidate SHA.

## Merge strategy

After candidate review PASS:
- re-check origin/main drift;
- merge/push using normal fast-forward or reviewed PR path;
- no force;
- verify local main == origin/main == accepted candidate or resulting reviewed merge SHA;
- record Remote Closure.

## Exit condition

Only after Remote Closure does Historical Scene Mnemonics become mainline-effective and the Pilot/Sidecar design become mainline research/design references.

Production Sidecar implementation starts afterward on a new branch with its own Problem → Scope → Design → Implementation → Test → Review → Acceptance → Closure cycle.
