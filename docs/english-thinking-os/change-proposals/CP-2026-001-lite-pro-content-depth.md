# Change Proposal: Lite / Pro Content Depth and 3D Card Responsibility

**Proposal ID:** CP-2026-001
**Status:** Implemented — Pending Final Integration Review
**Requested By:** Project Owner
**Date:** 2026-09-25
**Version Impact:** PATCH — clarifies existing content-before-presentation boundaries without changing curriculum, data, schema, runtime behavior or the approved BE reading order

## Old Rule

At base `c45c4463b17d811d4114189905719199d1716192`, the active project sources did not define Lite / Pro as a learning-content-depth contract:

- `docs/english-thinking-os/03_LEARNING_OBJECTS.md` said `3D Knowledge Card | 可视化一个知识点 | 核心画面、空间隐喻和逻辑 | 单点理解的视觉证据 | 连接完整知识网络`, but did not define Lite / Pro or separate content depth from output carrier.
- `docs/english-thinking-os/07_DESIGN_SYSTEM.md` defined the BE visual baseline and stated that cards explain one knowledge point, but did not define Web / Static carrier responsibilities.
- `skills/3d-knowledge-card/SKILL.md` used the pipeline `English item → run English Thinking Skill → ... → generate the card`; it did not require completed, reviewed structured content as the input gate.

Origin-only commit `65e4b076da65a52b6693ec740a26cf9d064be3ba` contained a legacy Skill proposal stating `This Skill now has two official modes`, defining Lite and Pro as card production modes, defaulting unspecified requests to Lite and associating Pro with medium-to-high static-card density. That source was branch-only historical evidence, not an active canonical source on local main. It is now **Historical / Superseded / non-canonical** and must not be used to resolve current behavior.

## New Rule

- Adopt the `Content Depth × Output Carrier` architecture: Lite / Pro define depth; Web / 3D Card define carriers; structured content is the source between them.
- Lite / Pro are `Learning Content Depth`, not card templates, image sizes, Skill output modes or visual-density modes.
- Pro complete learning content is primarily carried by structured web components.
- 3D Knowledge Card consumes canonical structured content and produces a visual summary for quick understanding, review, sharing or export.
- Pro Static Export must select from completed Pro structured content and must not create a parallel Pro content source.
- When a card cannot fit all source content, preserve comprehension before completeness.

The affected authority layers are:

- [Learning Objects](../03_LEARNING_OBJECTS.md): canonical Learning Content Depth and Learning Object / UI responsibility boundary.
- [Design System](../07_DESIGN_SYSTEM.md): canonical project-level visual and output-carrier responsibility.
- [BE 3D Card Standard](../../../visual/3d-card-standard/BE-reference/STYLE_GUIDE.md): canonical BE-card composition, safe-area, density and post-generation visual QA rules within BE 3D Card scope.
- [3D Knowledge Card Skill](../../../skills/3d-knowledge-card/SKILL.md): execution behavior that consumes the preceding canonical content and visual rules; it does not become a parallel content or visual source.

## Reason

The legacy proposal coupled four separate concerns: learning-content depth, output carrier, static-card information density and Skill behavior. The current project separates them as `Content Depth × Output Carrier` to prevent:

- Pro from being interpreted as a high-density static card;
- 3D Card from becoming a second content source;
- Web and Static responsibilities from overlapping;
- Lite / Pro terminology from drifting across content, visual and execution layers.

## Affected Nodes

`None` — this change concerns learning-content and visual-carrier responsibility. It does not change the Grammar Vision node graph or adopt, remove or reorder any Grammar node.

## Affected Lessons

`None` — no curriculum lesson content is modified. Only the responsibility boundary between structured content depth and output carriers is clarified.

## Affected Data

`None` — `data/vocabulary_850.json` is unchanged, `data/vocabulary_850.csv` is unchanged, the `website/data.js` runtime projection is unchanged, and no schema, ID or state model is changed.

## Migration Required

`Yes — documentation and execution-rule migration only.`

- Mark the legacy Lite / Pro Card Modes as Historical / Superseded without deleting their Git evidence.
- Move the still-valid general visual safety rules into the existing canonical hierarchy rather than creating a second visual standard.
- Require 3D Card execution to consume completed, reviewed structured content instead of independently generating a parallel Pro analysis.

No curriculum-data, vocabulary, schema or website-data migration is required.

## Rollback

If a future approved Change Proposal withdraws this rule, revert the P2.1 changes introduced by commits `0fe4146`, `f0c6fce` and `dafca01` (or the corresponding P2.1 integration merge) from the then-current integration branch, restoring the preceding responsibility text in the four affected files. Re-run governance, visual, link and website regression checks after the revert. No data rollback is required because this change performs no data or schema migration.

## Backward Compatibility

- Existing vocabulary JSON and CSV remain unchanged.
- Website runtime data and implementation remain unchanged.
- Grammar Vision, the 43-node adoption state and Teaching OS remain unchanged.
- The existing BE title, definition, formula and central-metaphor reading order remains unchanged.
- Existing static-card assets remain viewable as historical outputs.
- Legacy Lite / Pro mode semantics are not active canonical behavior and must not be used for new production.

## Approved Minimal Migration

- Add four-side safe-area and crop checks.
- Add an explicit reduction order for overcrowded cards.
- Keep the core visual large enough to carry the main understanding.
- Preserve the ban on fixed character/IP systems.
- Mark legacy Lite / Pro card-mode semantics as historical and superseded without deleting Git history.

## Explicitly Not Adopted

- Lite / Pro as two official 3D Card production modes.
- Defaulting unspecified card requests to Lite.
- Pro as a dense static teaching card.
- `TITLE → CORE VISUAL` as the only allowed reading order.
- Any change to the existing BE title, definition, formula and central-metaphor sequence.

## Scope and Compatibility

- No curriculum, Grammar Vision, 43-node status, vocabulary, schema, website implementation or learning-progress change.
- No change to FD-01 through FD-10.
- No second visual canonical source is created.
- The old origin-only commits remain historical evidence and are not mechanically cherry-picked.

## Regression Tests

P2.1 evidence already completed before final integration:

- `node --test website/app.test.js`: `157/157` passed.
- Existing JavaScript syntax checks: passed.
- Markdown links, canonical uniqueness, Lite / Pro terminology, visual-rule consistency, BE-reference consistency, protected-path audit and Frozen Safety audit: passed.
- P2.1 Independent Reviewer: `PASS`, with Critical `0`, Important `0`, Minor `0`.

P2.2 Builder cumulative validation for the working tree that becomes `c45c446..Final Candidate`:

- `git diff --check`: passed.
- `node --test website/app.test.js`: `157/157` passed.
- JavaScript syntax: `8/8` files passed `node --check`.
- Markdown local links and anchors across the cumulative changed-document scope: `150` checked, `0` broken.
- Authority Matrix expected mappings: `11/11` present; mandatory Proposal fields: `18/18` present; required Project OS navigation entries: `8/8` present.
- Canonical uniqueness, Lite / Pro terminology, Content Depth × Output Carrier, Web / Static responsibility, visual-rule consistency, BE-reference consistency, protected-path audit and Frozen Safety audit: passed.

These Builder results do not constitute a P2.2 reviewer verdict. The same cumulative range must be revalidated after the governance-record commit and independently reviewed.

## Reviewer

- P2.1 Independent Reviewer: `PASS` for `c45c4463b17d811d4114189905719199d1716192..dafca018d8f8c09ddd78f36f42a36dceff6e88c7`.
- P2.2 Final Integration Candidate: a new Independent Reviewer is required after cumulative validation; verdict pending.

## Source Status Changes

- **Historical / Superseded / non-canonical:** legacy Lite / Pro Card Modes from origin-only history.
- **Canonical learning-depth responsibility:** [Learning Objects](../03_LEARNING_OBJECTS.md).
- **Canonical project visual responsibility:** [Design System](../07_DESIGN_SYSTEM.md).
- **Canonical BE Card reference:** [BE 3D Card Standard](../../../visual/3d-card-standard/BE-reference/STYLE_GUIDE.md).
- **3D Card execution behavior:** [3D Knowledge Card Skill](../../../skills/3d-knowledge-card/SKILL.md), subordinate to and consuming the canonical content/visual sources above.
- No second active canonical source is created.

## Owner Decision

Approved as Option C with the additional Pro-source rule on 2026-09-25. Owner subsequently authorized this governance-record completion in P2.2 on 2026-09-25. The authorization permits only mandatory-field completion from existing evidence and does not approve new product semantics. Final P2.2 independent review remains required before any mainline decision.
