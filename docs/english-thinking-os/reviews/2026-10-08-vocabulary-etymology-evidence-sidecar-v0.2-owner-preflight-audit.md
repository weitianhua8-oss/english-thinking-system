# Owner-Preflight Final Audit — Evidence Sidecar Design V0.2

Date: 2026-10-08
Branch: design/vocabulary-etymology-evidence-sidecar
Reviewed head: 8310e8554cd1f07083c193dc94d122e28a86dd1f
Main observed: 5d9086a0ea62871ead677d4f5e7988a322ed4a74

## Verdict

PASS FOR OWNER ACCEPTANCE
MERGE / PRODUCTION IMPLEMENTATION NOT YET AUTHORIZED

## 1. Teaching architecture

PASS.

The design serves the project principle “先验真，再把真的变成看得见的画面” without making etymology mandatory for every word.

Evidence truth, teaching value, and canonical publication are separated.

## 2. Canonical-source safety

PASS.

data/vocabulary_850.json remains the sole learner-content canonical source.

Sidecar is explicitly:
- non-canonical;
- non-runtime-consumable;
- sparse;
- unable to auto-promote content.

No second learner-content truth source is introduced by the design.

## 3. State-machine safety

PASS.

APPROVED_INPUT now requires:
- EVIDENCE_REVIEWED;
- TEACHING_REVIEWED.

SECOND_SOURCE_CHECKED is insufficient.

CONDITIONAL / REJECTED historical claims cannot cross into approved teaching input.

## 4. False-etymology firewall

PASS.

Rejected claims remain institutional memory instead of disappearing.

The few/five example demonstrates that a memorable but unsupported explanation can be retained as rejected evidence without becoming teaching content.

## 5. Multi-branch semantics

PASS.

post is split into separate research branches. The design no longer relies on a multibranch placeholder as the target model.

## 6. Scale and cognitive-load safety

PASS.

Sidecar coverage is optional/sparse. Lack of etymology evidence cannot block Vocabulary completion.

Raw evidence metadata remains outside learner presentation.

## 7. Validator design

PASS FOR DESIGN.

Positive, negative, and repository-level cases cover:
- ID/reference integrity;
- independent-source gates;
- B-parent dependencies;
- rejection metadata;
- runtime firewall;
- canonical fallback prevention;
- sparse-coverage behavior.

Actual executable validator is still future implementation work.

## 8. Governance dependency audit

IMPORTANT NOTE.

Comparison against main shows the design branch is 21 commits ahead and 0 behind, with merge base:
5d9086a0ea62871ead677d4f5e7988a322ed4a74.

The branch contains not only Sidecar V0.2 work, but also its upstream unmerged dependency chain:
- Historical Scene Mnemonics / CP-2026-003;
- Vocabulary Etymology Evidence Pilot;
- Pilot review/closure;
- Sidecar V0.1/V0.2 design/reviews.

Therefore Owner acceptance of Sidecar V0.2 MUST NOT be interpreted as permission to merge this branch directly to main.

Before any merge:
1. resolve CP-2026-003 historical-scene governance status;
2. preserve dependency order;
3. decide whether to merge dependencies sequentially or create a clean integration branch/cherry-pick set;
4. re-run changed-file and main/origin-main drift checks;
5. no force push.

This is the main remaining governance risk.

## 9. Status wording note

The V0.2 Contract currently says “OWNER-APPROVED DESIGN REVISION” although final Owner acceptance of the complete V0.2 package has not yet been recorded.

This wording came from approval to perform the revision, not final package acceptance.

Recommended cleanup on Owner acceptance:
change status to:
OWNER ACCEPTED / NON-CANONICAL DESIGN CONTRACT

Until then, interpret the current label as revision authorization, not final acceptance.

## 10. Final recommendation

Owner may ACCEPT Sidecar Design V0.2.

Acceptance means:
- Contract V0.2 design is approved;
- Schema Sketch and Validator Cases are approved as implementation requirements;
- four-word sample is approved as a design fixture;
- production implementation may be planned on a separate branch after dependency-aware closure.

Acceptance does NOT mean:
- merge current branch to main;
- change data/vocabulary_850.json;
- allow runtime access;
- bulk research 850 words;
- expose raw etymology to learners.

## Final gate

PASS FOR OWNER ACCEPTANCE.

Next action after acceptance:
record Owner Acceptance + design closure, then perform dependency-aware implementation planning. Do not merge this branch directly to main.
