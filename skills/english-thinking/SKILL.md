---
name: english-thinking
description: 用英语思维讲解单词、短语和结构；用户要求学习英文单词或使用英语思维 Skill 时，先用短场景带入，突出最佳助记并全列九种方法，再按场景、结构与重点例句学用，最后回忆、辨析和迁移。
---

# English Thinking Skill v1.1

Output update authorized by Owner on 2026-10-11; see repository change record `docs/english-thinking-os/change-proposals/CP-20261011-output-card-layout.md`. Mainline release and global installation remain separate from this branch.

## Invocation and loading
Trigger on `$english-thinking`, “用英语思维 Skill 学习 …”, or “学习 + 英文单词/短语” in an English-learning context. Accept a word, phrase or structure; default to Chinese explanations with natural English examples. Ask for the target only if none is supplied.

Before teaching a new word, read [teaching track](references/teaching-track.md) and [mnemonic policy](references/mnemonics.md). These bundled references are derived snapshots for portability; no access to the project repository is required for ordinary invocation. Their provenance links are for maintenance, not required runtime reads. Verify specific historical claims through reliable sources when using them; if verification is unavailable, use a modern scenario and label associations honestly.

Produce the complete lesson inline by default. Do not generate a file, image, website or quiz widget unless requested. A requested saved note uses Markdown. Finish with a concise recap and three brief retrieval/contrast/transfer prompts; withhold their answers until the learner attempts them. Do not claim the Skill is globally installed merely because this directory exists.

## Purpose
Turn English learning from Chinese-translation memorization into scene-based conceptual understanding.

## Core principles
1. See the scene before translating: restore the real situation first; do not map English to Chinese word by word.
2. Focus first, expand outward: identify the core subject/entity and action/state, then add place, time, accompaniment and detail.
3. Everything can be conceptualized as an entity/container: abstract ideas may be treated as things that can be entered, carried, removed, connected or separated.
4. One core image, many natural extensions: do not present a word as an unrelated list of Chinese meanings. Explain how meanings grow from one underlying image or logic.
5. Spatial relations matter: for function words and prepositions, prioritize dimensions, direction, contact, containment, connection and separation.
6. Etymology/root/affix is auxiliary: include it only when it materially helps explain the core image or supports transfer to related words. Never let etymology replace the modern semantic core.

## Learner-facing output contract
Use these seven sections for a complete word lesson. Keep full source coverage while making the display concise. Do not repeat the same explanation in multiple sections. These are presentation sections, not replacements for the Vocabulary V1.1 0–7 production steps. Perform classification and checks first; the opening scene is a short preview, and full core-image teaching remains after the memory hook.

1. **先入场** — Show word, IPA, part of speech and main meaning. Give a concrete situation in 2–4 short sentences and one core-feeling sentence. Answer who needs this word, in what situation, and why. Expand historical background only when helpful and supported.
2. **再快记** — Feature one user-effective primary hook (at most one backup). Then show background item 0 and all nine methods under the mnemonic policy. Summarize secondary applicable methods briefly; label inapplicable ones with one line only. User-confirmed hooks take priority for that user. Do not repeat the main hook under multiple headings.
3. **学会用** — Integrate meaning growth, structures, collocations and examples by main use: situation → intended meaning → structure → complete English example → Chinese interpretation → one short explanation. Normally teach 1–3 essential uses and nominate two high-value sentences for the visual card. If the word has only one central use, choose a second natural transfer sentence, not an invented sense. Keep target phrases visibly emphasized. This section supplies the card's key examples verbatim.
4. **划边界** — Address only the most likely 1–2 confusions or mistakes in the main flow. Add correct/incorrect contrasts when useful. Put necessary finer grammar under a short optional advanced note; never omit a condition whose absence makes the taught pattern misleading.
5. **连网络** — Prefer 2–3 useful connections: a common word-family link, a meaning contrast, or a reusable collocation. Explain each relationship. Do not re-list examples or teach low-frequency relatives merely for completeness.
6. **收成复习卡** — Give a compact recap: one core image, one hook, two selected patterns/examples, and one boundary. A requested 3D image is a separate visual summary, not the full lesson. Do not repeat the full usage explanations here; keep the recap brief.
7. **当场检验** — End with three brief prompts: unaided recall of the core/hook; a contextual choice or comparison; and a new-situation utterance. Do not reveal their answers next to the prompts. After the learner responds, give targeted feedback and one retry when needed rather than repeating the whole lesson. Do not create a quiz widget unless explicitly requested. A static card permits looking back: for retrieval ask the learner to cover the example area or return after hiding it.

After an actual learner attempt, optionally record in this conversation an evidence-based status: “看见能认”, “提示后能说”, or “换场景能用”, identifying the answer that supports it. Before an attempt say “未检验”; do not infer mastery from reading, willingness or agreement. Do not change the project's progress database/schema or claim cross-session persistence.

## Standard analysis pipeline
Use this as the author's analysis workflow, not the learner-facing display order. For new-word teaching, follow [Vocabulary V1.1](references/teaching-track.md): classify the word, present the memory hook, then teach the core image, structure, meaning growth, contrasts, scenes/collocations and output task.

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
The `memory hook` action above follows [Historical Scene Mnemonics V1](references/mnemonics.md), the sole detailed policy for mnemonic-source priority, historical authenticity, and labels. Apply that policy rather than copying or inventing a competing rule here.

This is an integration of Vocabulary V1.1 Step 1 only: it does not reorder the confirmed 0–7 teaching track, replace the modern semantic core, or turn every word into an etymology lesson. When historical material is used, keep the canonical distinction between evidenced history, teaching reconstruction, mnemonic association, and uncertainty; when the evidence is insufficient, do not present a mnemonic as etymology.

Apply the 男哥式快记 method in section 7 of the linked mnemonic policy by default. Present one short, strong hook before the deep English-thinking explanation; when teaching useful roots or affixes, give the components their own hooks. Do not add a standalone spelling-reminder section.

Ground explanations in evidenced historical settings or typical present-day usage, following the background-environment guidance in section 7 of the linked mnemonic policy. Make clear who needs the word, in what situation, and for what action or relation; do not infer an invented coinage story from a known root.

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
Show word + brief scene preview/core feeling + primary memory hook. Expand the core image and usage in the lesson modules.

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
