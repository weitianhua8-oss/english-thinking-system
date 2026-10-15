# English Thinking Skill v1

## Purpose
Turn English learning from Chinese-translation memorization into scene-based conceptual understanding.

## Core principles
1. See the scene before translating: restore the real situation first; do not map English to Chinese word by word.
2. Focus first, expand outward: identify the core subject/entity and action/state, then add place, time, accompaniment and detail.
3. Everything can be conceptualized as an entity/container: abstract ideas may be treated as things that can be entered, carried, removed, connected or separated.
4. One core image, many natural extensions: do not present a word as an unrelated list of Chinese meanings. Explain how meanings grow from one underlying image or logic.
5. Spatial relations matter: for function words and prepositions, prioritize dimensions, direction, contact, containment, connection and separation.
6. Etymology/root/affix is auxiliary: include it only when it materially helps explain the core image or supports transfer to related words. Never let etymology replace the modern semantic core.

## Standard analysis pipeline
Input word / structure
→ identify core image
→ state the underlying logic in one sentence
→ reconstruct a concrete scene
→ explain meaning growth from the core
→ extract high-frequency structures/collocations
→ give natural examples
→ contrast confusable items
→ identify traps / misuse
→ add a memory hook
→ connect to the wider knowledge network
→ optionally add useful root/prefix/suffix/etymology

## Memory-hook policy (Step 1 integration)
The `memory hook` action above follows [Historical Scene Mnemonics V1](../../docs/english-thinking-os/HISTORICAL_SCENE_MNEMONICS_V1.md), the sole detailed policy for mnemonic-source priority, historical authenticity, and labels. Apply that policy rather than copying or inventing a competing rule here.

This is an integration of Vocabulary V1.1 Step 1 only: it does not reorder the confirmed 0–7 teaching track, replace the modern semantic core, or turn every word into an etymology lesson. When historical material is used, keep the canonical distinction between evidenced history, teaching reconstruction, mnemonic association, and uncertainty; when the evidence is insufficient, do not present a mnemonic as etymology.

## Required learning-card fields
- Word / structure
- Core image
- One-sentence source / underlying logic
- Meaning growth
- Core scenes
- High-frequency structures / fixed collocations
- Examples
- Confusable contrasts
- Pitfalls
- Memory hook
- Knowledge-network connections
- Root / prefix / suffix / etymology (only when useful)

Do not delete these fields merely to make the card shorter. The quick-learning UI may show a subset, but the source knowledge object should preserve the complete structure.

## Sentence-thinking model
English sentence building should follow scene focus rather than a Chinese sentence template:
1. Lock onto who/what is central.
2. Express the central action or state.
3. Expand outward with location, time, accompaniment and other background.
4. Put details describing the focal entity close to that entity.
5. Prefer directly describing the perceived scene over composing Chinese first and translating it.

## Conceptualization model
Treat abstract concepts as manipulable entities or containers when English does so naturally.
Examples of conceptual patterns:
- fall in love: enter/fall into a conceptual container/state.
- take the pressure off: remove pressure from a target.
- take your problems to a consultant: carry a conceptual object to someone.

## Spatial model examples
- at: point / precise target.
- on: surface contact / attached or connected state.
- in: container / three-dimensional inclusion.
- on ↔ off: connection/activation ↔ detachment/disconnection.
- with: two entities brought into the same situation; context determines accompaniment, instrument or opposition.

The purpose of these examples is not to freeze every usage into a slogan, but to show how multiple usages can be generated from a compact conceptual model.

## Three learning layers
### Layer 1 — Quick understanding
Show the minimum needed to grasp the word quickly: word + core image + one-sentence logic + one prototypical scene.

### Layer 2 — Deep learning
Reveal meaning growth, scenes, collocations, examples, confusable contrasts, pitfalls and useful morphology/etymology.

### Layer 3 — Knowledge network
Connect the current item to related words, structures, spatial relations, grammar and semantic families.

## Quality rules
- Prefer one coherent semantic model over a list of translations.
- Examples must demonstrate the conceptual model, not merely contain the target word.
- Confusable contrasts must explain why the mental picture changes.
- Use Chinese as an explanatory bridge, not as the primary storage model.
- Preserve uncertainty: do not invent an etymology merely because it makes a memorable story.
- Keep the complete source content even when the UI chooses a shorter presentation.

## Default Chinese learner-facing output (2026-10-15 update)
For a single-word request using 英语思维 Skill, use these eight sections in order, adapting irrelevant sections briefly rather than forcing content:
1. 核心画面：先理解，再记忆
2. 词源与构词逻辑
3. 核心义项与重点例句
4. 重点词义辨析（有易混词时）
5. 英语母语者常用句型
6. 单词助记
7. 词汇知识网络
8. 最终记忆锚点

- The former section 八「即时检测」is removed. Do **not** automatically generate quizzes, multiple-choice questions, interactive tests, or answer widgets in the default single-word explanation. If the learner explicitly requests a quiz or test, that separate request can be fulfilled.
- Rename every learner-facing heading 「男哥助记」 to 「单词助记」, including corresponding 3D knowledge-card labels. Keep the existing mnemonic methods and applicability checks unchanged; mark unsuitable methods concisely as 「❌ 不适用」.
- This is a presentation/output rule, not a deletion of the full source knowledge fields, teaching pipeline, or optional review functionality elsewhere in the product.
