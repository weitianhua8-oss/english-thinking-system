# 3D Knowledge Card Skill v1

## Purpose
Convert reviewed structured learning content into a spatial visual summary for understanding, sharing or export. The image is part of the teaching model, not decoration, but this Skill is not a content source or a complete Pro teaching carrier.

## Canonical visual reference
The approved `BE动词：连接身份、位置与状态` 3D knowledge card is the visual source of truth.

Detailed visual rules are frozen in:
`visual/3d-card-standard/BE-reference/STYLE_GUIDE.md`

## Non-negotiable rule
Do NOT build the cards around a fixed character/IP system. Generic people may appear only when they help explain a scene. The visual system follows the BE 3D-card model, not recurring branded protagonists.

## Content authority
Lite and Pro describe learning-content depth, not 3D Card production modes. Their canonical responsibilities are defined in `docs/english-thinking-os/03_LEARNING_OBJECTS.md`.

- Consume reviewed Lite or Pro structured content; do not independently redefine its teaching depth.
- A Pro static export must select from completed Pro structured content. It is a visual summary, not Pro itself.
- If the required structured content is missing, return to the content source for completion or review instead of inventing a parallel Pro analysis inside this Skill.
- Historical Lite / Pro card-mode rules, including default-Lite routing and high-density Pro cards, are superseded by the current content-depth architecture. Keep their Git history; do not restore them as active rules.

## Generation pipeline
Reviewed structured content
→ locate the approved core image / underlying logic
→ select only the content needed for this visual summary
→ determine the best spatial metaphor
→ identify subject/object/state relationships
→ determine direction, path, contact, containment, connection, separation, transfer or state change
→ determine information hierarchy
→ apply BE 3D-card visual language
→ generate the card
→ verify that the visual itself explains the English logic
→ verify that the card has not created or changed source meaning

## Visual-semantic principles
1. Meaning before beauty: never generate a pretty illustration first and add English afterward.
2. Spatialize abstraction: use point, surface, container, path, bridge, contact, connection, direction and state-change when they clarify meaning.
3. One dominant teaching idea per card.
4. Labels support the visual relationship; they must not replace it.
5. Keep the visual hierarchy obvious at a glance.
6. The card should help a learner infer the core logic without memorizing a Chinese translation list.
7. Preserve the BE reference language: warm framed card, soft rounded 3D objects, navy high-contrast title, central semantic metaphor, modular lower explanation cards, meaningful connector paths and a strong final takeaway.
8. Preserve comprehension before completeness: when the source does not fit, remove lower-priority content instead of shrinking the core visual or making text unreadable.

## Reference composition logic
The BE card demonstrates the preferred architecture:
- Top: concept title + one-line core logic.
- Upper-middle: compact relationship formula.
- Center: large spatial metaphor that physically embodies the concept.
- Lower: 2–4 modular semantic branches with examples and visual scenes.
- Bottom: one memorable summary sentence.

This is a compositional grammar, not a rigid template. The number of branches and central metaphor may change according to the knowledge point.

## Relationship to other systems
- English Thinking Skill decides WHAT the knowledge means.
- 3D Knowledge Card decides HOW one knowledge point becomes visually understandable.
- Knowledge Map decides HOW this knowledge point connects to other knowledge.
- Website decides HOW the learner interacts with all of the above.
- Lite / Pro depth remains a property of structured content across these consumers; this Skill does not create separate Lite / Pro card modes.

## Quality gate
Before accepting a generated card, verify:
- Can the core meaning be understood from the central visual relationship?
- Does every arrow/path/object have a semantic role?
- Are examples subordinate to the core concept rather than dominating the card?
- Is there visible safe space on all four sides?
- Are text, arrows, people and the visual subject fully inside the canvas without crowded or cropped edges?
- If content was removed, were decoration, low-frequency examples, non-essential additions, secondary comparisons and lower-priority knowledge reduced before the core understanding?
- Does a Pro static export trace back to completed Pro structured content rather than a parallel analysis created by this Skill?
- Is the style recognizably from the same family as the BE reference?
- Has a fixed character/IP system accidentally been introduced?
- Has the card fallen back into a Chinese-meaning list?

If any answer fails, regenerate or redesign before publishing.
