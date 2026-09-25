# Change Proposal: Lite / Pro Content Depth and 3D Card Responsibility

**Proposal ID:** CP-2026-001
**Status:** Approved — implementation under review
**Requested By:** Project Owner
**Decision date:** 2026-09-25
**Version Impact:** PATCH clarification of existing content-before-presentation boundaries

## Old Rule

The repository defined English Thinking content, Word Image Pro and 3D Knowledge Card responsibilities, but did not formally define Lite / Pro as learning-content depth. Two origin-only historical commits proposed Lite / Pro as 3D Card production modes.

## Approved Rule

- Adopt the `Content Depth × Output Carrier` architecture: Lite / Pro define depth; Web / 3D Card define carriers; structured content is the source between them.
- Lite / Pro are `Learning Content Depth`, not card templates, image sizes, Skill output modes or visual-density modes.
- Pro complete learning content is primarily carried by structured web components.
- 3D Knowledge Card consumes canonical structured content and produces a visual summary for quick understanding, review, sharing or export.
- Pro Static Export must select from completed Pro structured content and must not create a parallel Pro content source.
- When a card cannot fit all source content, preserve comprehension before completeness.

The canonical responsibility is recorded in [Learning Objects](../03_LEARNING_OBJECTS.md). Presentation and export rules remain in [Design System](../07_DESIGN_SYSTEM.md), the [BE 3D Card Standard](../../../visual/3d-card-standard/BE-reference/STYLE_GUIDE.md) and the [3D Knowledge Card Skill](../../../skills/3d-knowledge-card/SKILL.md).

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

## Owner Decision

Approved as Option C with the additional Pro-source rule on 2026-09-25. Implementation requires independent review before mainline integration.
