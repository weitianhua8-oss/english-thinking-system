# Independent Review — CP-2026-003 Historical Scene Mnemonics V1

Date: 2026-10-08
Proposal: CP-2026-003
Original branch: docs/historical-scene-mnemonics
Reviewed through dependency branch: design/vocabulary-etymology-evidence-sidecar
Base: 5d9086a0ea62871ead677d4f5e7988a322ed4a74

## Verdict

PASS WITH NOTES — READY FOR OWNER ACCEPTANCE

## Scope

Reviewed only the CP-2026-003 historical-scene mnemonic rule and its documented integration points. Later Pilot/Sidecar artifacts were used only as regression evidence that the rule can be constrained safely; they are not treated as retroactive authorization.

## Governance

PASS.

The proposal records old rule, new rule, reason, affected nodes/lessons/data, migration, backward compatibility, regression tests, reviewer state, version impact, and source-status change.

It does not alter Grammar Vision frozen nodes, FD-01–FD-10, Vocabulary data schema, runtime, or the 0–7 teaching-track order.

## Truth and etymology safety

PASS.

The rule explicitly distinguishes:
- 有据历史;
- 教学重建;
- 记忆联想;
- 未确定.

It correctly states that earliest attested use is not automatically the coinage moment, and that known etymology does not prove a detailed historical scene.

The rule forbids letter-shape, mouth-shape, homophone, and sound-symbol associations from serving as etymological proof.

## Teaching compatibility

PASS.

The priority:
可靠历史场景 → 可靠构词关系 → 视觉/动作联想 → 谐音钩子
is an authoring priority, not a learner lesson order.

Modern high-frequency meaning remains primary. Historical material enters only when it helps understanding or memory.

This is compatible with Vocabulary V1.1 Step 1 and does not reorder the 0–7 track.

## Cognitive load

PASS.

Children/Lite receive at most a useful picture, short explanation, and necessary label. Adult/Pro may expose deeper history and sources.

No word is required to have a historical scene.

## Canonical-source test

PASS WITH NOTE.

HISTORICAL_SCENE_MNEMONICS_V1.md is scoped as the unique canonical text for mnemonic-source priority and historical-scene authenticity, not as a second full Vocabulary teaching standard.

Project Instructions / Project OS / Quality Gates should only link to it rather than copy its rule body.

## Regression evidence

PASS.

The later 10-word pilot stress-tested exactly the failure modes this rule is meant to prevent:
- post: do not force distinct branches into one story;
- see/get/on/in/little: history may step aside;
- insist/digital: evidence-backed history can improve the picture;
- few: memorable false etymology must be rejected.

This supports compatibility without changing CP-2026-003 scope.

## Notes

N1 — Wording “这个词形成或早期使用时” should continue to be interpreted through the authenticity gate. Do not infer a specific coinage scene merely because an early environment is known.

N2 — “Canonical（本分支候选）” becomes truly mainline-effective only after Owner acceptance and dependency-aware integration. Until then it remains an accepted candidate, not mainline state.

N3 — This review does not approve any specific word etymology. Individual historical claims still require evidence review.

## Merge/integration note

Do not merge the current downstream Sidecar branch as a shortcut.

CP-2026-003 should receive explicit Owner acceptance first. Then its original seven-file candidate scope can be integrated/reconstructed in dependency order, followed separately by the already-reviewed Pilot and Sidecar design closures.

## Final gate

PASS WITH NOTES — READY FOR OWNER ACCEPTANCE.

Owner acceptance authorizes CP-2026-003 as the project rule for future Vocabulary mnemonic-source selection and historical-scene authenticity.

It does not authorize bulk rewriting of existing 850 entries, schema/runtime changes, or automatic etymology publication.
