# 3D Knowledge Card Skill v1.1

## Purpose
Convert abstract English logic into a spatial visual explanation. The image is part of the teaching model, not decoration.

## Canonical visual reference
The approved `BE动词：连接身份、位置与状态` 3D knowledge card is the visual source of truth.

Detailed visual rules are frozen in:
`visual/3d-card-standard/BE-reference/STYLE_GUIDE.md`

## Non-negotiable rule
Do NOT build the cards around a fixed character/IP system. Generic people may appear only when they help explain a scene. The visual system follows the BE 3D-card model, not recurring branded protagonists.

## Newly frozen layout rules
These rules are mandatory for every 3D Knowledge Card and take priority over decorative composition.

### 1. Core visual must immediately follow the main title
- The main English title is the first visual anchor.
- The **core visual / core semantic scene must appear immediately after or directly beneath the main title**, with no secondary teaching module inserted between them.
- The learner should see `TITLE → CORE IMAGE` as one continuous first-read path.
- The core visual must occupy the strongest visual position in the upper part of the card and must be noticeably larger and more prominent than examples, tables, collocations or comparison modules.
- Do not hide the core image inside a small panel or distribute its meaning across several equally weighted illustrations.
- When the word has a spatial metaphor, the core spatial relationship itself must be shown at large scale directly under the title. Example: `in` should immediately show outside → inside/container; `at` should immediately show a precise point/target.
- Supporting text should explain the image, not compete with it.

### 2. Mandatory whitespace / safe margin on all four sides
- Every finished image must retain clearly visible blank breathing room on **top, bottom, left and right**.
- No title, card border, character, icon, arrow, table, footer strip or decorative object may touch or visually crowd the canvas edge.
- Keep the entire teaching composition inside an inner safe area; as a practical generation target, reserve roughly **4–6% of the canvas on each side** as outer breathing space.
- The outer whitespace belongs to the composition and must not be cropped away during final generation.
- If content becomes crowded, reduce secondary content or simplify modules instead of consuming the outer margin.
- A card that reaches the image boundary is considered a failed layout and must be regenerated.

## Generation pipeline
English item
→ run English Thinking Skill
→ extract core image / underlying logic
→ determine the best spatial metaphor
→ identify subject/object/state relationships
→ determine direction, path, contact, containment, connection, separation, transfer or state change
→ determine information hierarchy
→ lock `TITLE → CORE IMAGE` as the first visual sequence
→ reserve four-side outer safe margins
→ apply BE 3D-card visual language
→ generate the card
→ verify that the visual itself explains the English logic

## Visual-semantic principles
1. Meaning before beauty: never generate a pretty illustration first and add English afterward.
2. Spatialize abstraction: use point, surface, container, path, bridge, contact, connection, direction and state-change when they clarify meaning.
3. One dominant teaching idea per card.
4. Labels support the visual relationship; they must not replace it.
5. Keep the visual hierarchy obvious at a glance.
6. **The core image is the visual protagonist of the card. It must sit immediately after the main title and carry the highest semantic weight.**
7. The card should help a learner infer the core logic without memorizing a Chinese translation list.
8. Preserve the BE reference language: warm framed card, soft rounded 3D objects, navy high-contrast title, central semantic metaphor, modular lower explanation cards, meaningful connector paths and a strong final takeaway.
9. **Preserve visible whitespace around all four sides of the canvas. Never solve information-density problems by pushing content to the edges.**

## Reference composition logic
The preferred architecture is now:
- Outer frame: visible whitespace / safe margin on all four sides.
- Top: concept title + pronunciation / essential one-line definition where needed.
- **Immediately below the title: large core semantic image / spatial metaphor.**
- Upper-middle: compact relationship formula integrated with or directly supporting the core image.
- Lower: 2–4 modular semantic branches with examples and visual scenes.
- Bottom: one memorable summary sentence, still inside the safe margin.

The first screen-reading order should be unmistakable:

`MAIN TITLE → CORE VISUAL → CORE FORMULA → MEANING GROWTH → EXAMPLES / CONTRAST → MEMORY HOOK`

This is a compositional grammar, not a rigid template. The number of branches and central metaphor may change according to the knowledge point, but the `TITLE → CORE VISUAL` relationship and four-side whitespace may not be changed.

## Information hierarchy
Use this priority order when space is limited:
1. Main title / word.
2. Core visual.
3. Core meaning or relationship formula.
4. Meaning-growth branches.
5. High-frequency examples / collocations.
6. Confusion comparison.
7. Secondary decorations.

If the layout becomes crowded, remove or compress items from the bottom of this priority list first. Never shrink the core visual into a minor illustration just to preserve more text.

## Relationship to other systems
- English Thinking Skill decides WHAT the knowledge means.
- 3D Knowledge Card decides HOW one knowledge point becomes visually understandable.
- Knowledge Map decides HOW this knowledge point connects to other knowledge.
- Website decides HOW the learner interacts with all of the above.

## Quality gate
Before accepting a generated card, verify:
- Is the main title immediately followed by the core visual with no competing module interrupting the reading path?
- Is the core visual one of the largest and most visually dominant elements on the page?
- Can the core meaning be understood from the central visual relationship?
- Does every arrow/path/object have a semantic role?
- Are examples subordinate to the core concept rather than dominating the card?
- Is there clearly visible whitespace on the top, bottom, left and right edges?
- Is every important element safely inside the canvas instead of touching/crowding the edge?
- Is the style recognizably from the same family as the BE reference?
- Has a fixed character/IP system accidentally been introduced?
- Has the card fallen back into a Chinese-meaning list?

If any answer fails, regenerate or redesign before publishing.
