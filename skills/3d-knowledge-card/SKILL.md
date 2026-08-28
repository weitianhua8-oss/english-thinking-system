# 3D Knowledge Card Skill v1.2

## Purpose
Convert abstract English logic into a spatial visual explanation. The image is part of the teaching model, not decoration.

This Skill now has **two official modes**:
- **Lite**: fast, visually direct, lower information density, optimized for quick understanding and social/shareable cards.
- **Pro**: full English-thinking pipeline first, then visualized as a deep teaching card with richer semantic structure.

Both modes share the same visual language, safety margins, core-image priority, and quality standards.

## Canonical visual reference
The approved `BE动词：连接身份、位置与状态` 3D knowledge card is the visual source of truth.

Detailed visual rules are frozen in:
`visual/3d-card-standard/BE-reference/STYLE_GUIDE.md`

## Non-negotiable rule
Do NOT build the cards around a fixed character/IP system. Generic people may appear only when they help explain a scene. The visual system follows the BE 3D-card model, not recurring branded protagonists.

## Mode selection

### Lite mode — 快速理解版
Use when the user says any of the following or clearly asks for a quick/simple card:
- `用3D知识图卡Skill制作 xxx`
- `用3D知识图卡 Lite 制作 xxx`
- `用3D知识图卡Skill（简易版）制作 xxx`
- `快速做一张3D知识图卡`

If the user does not specify Lite or Pro, **default to Lite** unless the request explicitly asks for full English-thinking analysis, deep explanation, or a complete teaching version.

Lite goal:
> Make the learner understand the word or concept at a glance, with the minimum necessary explanation.

Lite priorities:
1. Main title / word.
2. Core visual immediately under or beside the title.
3. One compact core formula or core sentence.
4. 2–4 meaning-growth branches.
5. A small number of high-frequency examples / collocations.
6. One confusion comparison if truly useful.
7. One final memory hook.

Lite should avoid:
- Over-explaining etymology when it does not directly help comprehension.
- Too many examples.
- Dense grammar notes.
- Multiple equally strong visual centers.
- Turning the card into a text-heavy poster.

Typical Lite reading order:
`TITLE → CORE VISUAL → CORE FORMULA → MEANING GROWTH → EXAMPLES / CONTRAST → MEMORY HOOK`

### Pro mode — 英语思维完整版
Use when the user says any of the following or asks for a deep/complete teaching version:
- `用3D知识图卡 Pro 制作 xxx`
- `用3D知识图卡Skill（完整版）制作 xxx`
- `先用英语思维Skill拆解，再做3D知识图卡`
- `做完整英语思维版`
- `深度讲透后出图`

Pro goal:
> First explain the knowledge completely through the English Thinking Skill, then convert that full semantic model into a layered 3D teaching card.

Pro has a mandatory prerequisite:
**Run the English Thinking Skill first. Do not skip this step.**

The English Thinking stage should extract, when applicable:
- Core English image / native mental model.
- Underlying meaning or semantic mechanism.
- Original meaning / root logic where useful.
- Meaning-growth path.
- Spatial / directional / state relationships.
- Common sentence structures.
- High-frequency collocations.
- Chinese-learner misunderstanding traps.
- Similar-word distinctions.
- Word family / roots / affixes when useful.
- Final memory hook.

Then the 3D Knowledge Card stage must decide what deserves visual prominence and what can be compressed or omitted. Pro is more complete than Lite, but it must still remain visually teachable rather than becoming a wall of text.

Typical Pro reading order:
`TITLE → CORE VISUAL → CORE ENGLISH LOGIC → MEANING GROWTH → STRUCTURE / COLLOCATIONS → CONFUSION CONTRAST → WORD FAMILY / ROOTS → MEMORY HOOK`

## Lite vs Pro
| Dimension | Lite | Pro |
|---|---|---|
| Main goal | Quick understanding | Full conceptual mastery |
| English Thinking Skill | Optional / lightweight extraction | Mandatory full pass |
| Information density | Low to medium | Medium to high |
| Core visual | Extremely dominant | Extremely dominant |
| Meaning growth | Simplified | More complete |
| Collocations / examples | Few, high-frequency only | Broader, still curated |
| Similar-word contrast | Only if essential | Usually included when relevant |
| Word roots / family | Usually omitted unless crucial | Included when useful |
| Best for | Daily cards, quick learning, Xiaohongshu | Courses, system learning, deep study |

## Frozen layout rules
These rules are mandatory for both Lite and Pro and take priority over decorative composition.

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

### Lite pipeline
English item
→ identify core meaning / core image
→ choose the simplest spatial metaphor
→ determine information hierarchy
→ lock `TITLE → CORE IMAGE` as the first visual sequence
→ reserve four-side outer safe margins
→ select only the most useful meaning-growth branches and examples
→ apply BE 3D-card visual language
→ generate the card
→ verify that the visual itself explains the concept quickly

### Pro pipeline
English item
→ **run English Thinking Skill in full**
→ extract core image / underlying logic
→ map meaning growth and key structures
→ identify subject/object/state relationships
→ determine direction, path, contact, containment, connection, separation, transfer or state change
→ select the most teachable semantic hierarchy
→ lock `TITLE → CORE IMAGE` as the first visual sequence
→ reserve four-side outer safe margins
→ translate the English-thinking explanation into layered 3D modules
→ apply BE 3D-card visual language
→ generate the card
→ verify that the visual itself explains both the core idea and the deeper logic

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
10. Pro may contain more information than Lite, but never at the cost of core-image dominance or readability.

## Reference composition logic
The preferred architecture for both modes is:
- Outer frame: visible whitespace / safe margin on all four sides.
- Top: concept title + pronunciation / essential one-line definition where needed.
- **Immediately below the title: large core semantic image / spatial metaphor.**
- Upper-middle: compact relationship formula integrated with or directly supporting the core image.
- Lower: modular semantic branches with examples and visual scenes.
- Bottom: one memorable summary sentence, still inside the safe margin.

Lite generally uses fewer lower modules.
Pro may use more modules, but only after the top visual hierarchy remains unmistakable.

## Information hierarchy
Use this priority order when space is limited:
1. Main title / word.
2. Core visual.
3. Core meaning or relationship formula.
4. Meaning-growth branches.
5. High-frequency examples / collocations.
6. Confusion comparison.
7. Word family / roots / affixes.
8. Secondary decorations.

If the layout becomes crowded, remove or compress items from the bottom of this priority list first. Never shrink the core visual into a minor illustration just to preserve more text.

## Relationship to other systems
- English Thinking Skill decides WHAT the knowledge means.
- 3D Knowledge Card decides HOW one knowledge point becomes visually understandable.
- In **Lite**, the 3D Knowledge Card may use a lightweight semantic extraction.
- In **Pro**, English Thinking Skill is a mandatory upstream step.
- Knowledge Map decides HOW this knowledge point connects to other knowledge.
- Website decides HOW the learner interacts with all of the above.

## Quality gate — shared
Before accepting any generated card, verify:
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

## Quality gate — Lite
- Can a learner understand the core concept within a few seconds?
- Is the card visually light enough to scan quickly?
- Have unnecessary details been removed?
- Is there only one obvious core visual center?

## Quality gate — Pro
- Was the English Thinking Skill actually run first?
- Does the card preserve the full conceptual logic without becoming text-heavy?
- Is the meaning-growth path clear?
- Are key distinctions, structures and word-family information included only when they materially help understanding?
- Does the final card still feel like a visual teaching model rather than a poster full of notes?

If any answer fails, regenerate or redesign before publishing.

## Official invocation examples
- `用3D知识图卡Skill制作 in` → default **Lite**.
- `用3D知识图卡 Lite 制作 at` → **Lite**.
- `用3D知识图卡 Pro 制作 personality` → **Pro**.
- `先用英语思维Skill拆解 personality，再用3D知识图卡Skill完整版出图` → **Pro**.
