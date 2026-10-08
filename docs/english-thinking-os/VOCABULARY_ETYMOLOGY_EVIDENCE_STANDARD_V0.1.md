# Vocabulary Etymology Evidence Standard V0.1

Status: PILOT / NON-CANONICAL  
Scope: Vocabulary research layer only  
Does not modify: data/vocabulary_850.json, Grammar Vision frozen rules, website runtime.

## 1. Purpose

Use etymology as evidence for better visual teaching, not as a replacement for modern usage.

North-star question:
> Can reliable historical evidence help the learner see why this English expression developed this way?

## 2. Four evidence classes

### A — Attested etymology
A claim directly supported by a reliable historical/etymological source.
May be presented as historical fact, with source and sense scope recorded.

### B — Evidence-grounded scene reconstruction
The linguistic facts are supported, but visual details are reconstructed for teaching.
Must be labelled as reconstruction. Do not present costumes, objects, motives, or a single “coinage moment” as attested unless the source actually supports them.

### C — Modern teaching analogy
A visual or relational analogy created to explain current meaning or structure.
Useful for Grammar/Vocabulary Vision, but it is not etymology.

### D — Memory hook
Sound, spelling, shape, Chinese homophone, story, or other mnemonic.
May be memorable, but must be explicitly separated from word history.

Rule:
> 画面可以创造，历史不能创造。

## 3. Source hierarchy

Preferred research order:
1. OED or comparable historical dictionary when available.
2. Merriam-Webster Word History / Etymology and other established dictionaries.
3. Etymonline as a practical discovery and synthesis source.
4. Specialist historical-language references where a disputed or technical claim requires them.

Search-engine snippets, social posts, videos, AI answers, and mnemonic books are not etymological evidence by themselves.

Multiple sites repeating the same statement do not automatically count as independent evidence.

## 4. Required evidence record

For each researched word/sense record:
- word
- part of speech / target sense
- modern learning target
- earliest or earlier form actually supported
- source language / morphological components when supported
- historical meaning
- semantic-development claim
- historical environment, only when supported
- evidence class: A/B/C/D
- source URL/title
- retrieval date
- uncertainty / competing analysis
- proposed teaching scene
- teaching decision: main lesson / expandable adult layer / memory hook / reject

Evidence must attach to a specific claim, not merely to the whole word.

## 5. Historical-scene gate

Before using a “birth scene”, ask:
1. Do we know the relevant historical sense?
2. Do we know enough about the material/social setting to depict it?
3. Is the scene attested, or are we reconstructing it?
4. Does the scene explain a high-frequency modern meaning?
5. Does it reduce rather than increase cognitive load?

If 1–2 fail, do not invent a historical scene. Use a modern core scene instead.
If 3 is reconstruction, label it B.
If the connection is only mnemonic, label it D.

Avoid the phrase “造词时人们就是这样想的” unless unusually strong evidence supports a deliberate coinage.

## 6. Integration with Vocabulary V1.1

The 0–7 teaching track is unchanged.

- Step 1 记忆外挂: A/B may be preferred when genuinely helpful; D is fallback.
- Step 2 核心画面: modern semantic usefulness remains primary.
- Step 4 意义生长: distinguish historical development from pedagogical semantic grouping.
- Step 5 易混对比: etymology may explain genuine family relations, but similarity alone is insufficient.
- Step 6 真实场景+高频搭配: verify modern usage independently of etymology.
- Step 7 压缩总结: do not force etymology into the summary when it adds load without learning value.

## 7. Knowledge-network relation types

Do not collapse these edges:
- HISTORICALLY_RELATED
- MORPHOLOGICALLY_DERIVED
- MODERN_SEMANTIC_RELATION
- PEDAGOGICAL_ANALOGY
- MNEMONIC_ONLY

A visible learner-facing network may simplify labels, but the research layer must retain the distinction.

## 8. External-material audit

Claims imported from books, videos, PDFs, social posts, or mnemonic systems are hypotheses until verified.

Especially audit claims based on:
- letter-shape symbolism presented as historical formation;
- mouth/tongue movement presented as the historical origin of affix meaning;
- cross-language borrowing claims without documentary support;
- “X is a shortened form of Y” based only on spelling/sound resemblance;
- suffix/root segmentation inferred from modern spelling alone.

Useful teaching mechanisms may still be retained as C or D after an etymology claim is rejected.

## 9. Pilot boundary

First pilot words:
post, see, get, on, in, insist, few, little, factory, digital.

The pilot must include:
- straightforward attested development;
- multiple homonymous/etymological branches;
- prefix/root morphology;
- words where historical evidence is uncertain;
- at least one attractive but likely false mnemonic claim.

No schema change or canonical vocabulary edit is allowed during the pilot.

## 10. Acceptance criteria

Pilot passes only if:
1. every historical claim has claim-level evidence;
2. A/B/C/D labels are reproducible between reviewers;
3. false-but-memorable explanations are caught rather than promoted;
4. resulting teaching is simpler or clearer than a no-etymology version;
5. modern usage remains the learning target;
6. no Vocabulary/Grammar frozen contract is silently changed.

## 11. Next decision

After the 10-word pilot, decide separately whether to:
- keep this as a research-only standard;
- add an evidence sidecar dataset;
- extend vocabulary schema through a Change Proposal;
- expose an optional “这个词从哪里来” layer in the web product.

No option is pre-approved by this document.
