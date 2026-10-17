# Change Proposal: Vocabulary V1.3 Eight-part Teaching Standard

**Proposal ID:** CP-2026-006

**Status:** Owner Approved — independent review passed; pending Owner acceptance

**Requested By:** Project Owner

**Date:** 2026-10-18

## Old Rule

`docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_1.md` defined a recovered 0–7 teaching track. The learner-facing order in `skills/english-thinking/SKILL.md` placed core meanings and example sentences before mnemonic content, and did not require every taught meaning to carry a core image, explanation, collocation, and non-repetitive example.

## New Rule

Adopt `docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_3.md` as the sole canonical editing source for a new-word learning card. Its fixed learner-facing order is:

1. 核心画面
2. 词源与结构
3. 单词助记
4. 核心义项总览
5. 意义生长与易混辨析
6. 母语者高频句型
7. 词汇知识网络
8. 最终记忆锚点

V1.3 requires selective mnemonic fusion without forced letter splitting; separates mnemonic design from etymology/word-formation facts; and requires a core image, explanation, collocation, and non-repetitive example for every taught meaning.

## Reason

The Owner requested a clearer, learner-facing teaching order that begins with understanding, keeps verified structure distinct from mnemonic design, and avoids both forced mnemonic techniques and repetitive example sentences.

## Affected Nodes

None. Grammar nodes, Grammar Vision contracts, and FD-01–FD-10 remain unchanged.

## Affected Lessons

No existing lesson is rewritten in this change. Future new-word cards and any separately authorized lesson refresh must follow V1.3.

## Affected Data

None. `data/vocabulary_850.json`, its CSV mirror, schema, runtime data, progress, and website behavior remain unchanged.

## Migration Required

Yes — documentation and Skill synchronization only.

1. Add V1.3 as the unique canonical standard and mark V1.1 Superseded with its replacement path.
2. Update Project OS navigation, the English Thinking Skill, and the mnemonic-standard reference to V1.3.
3. Do not bulk-rewrite existing curriculum, content, data, UI, or generated outputs.

**Rollback:** Revert the commit implementing CP-2026-006. V1.1 remains preserved and can resume its historical status without data or runtime rollback.

## Backward Compatibility

- No schema, content data, runtime, localStorage, course path, or website behavior changes.
- Historical V1.1 remains available as a Superseded reference.
- The existing historical-scene mnemonic source remains the detailed authority for mnemonic source/label rules; V1.3 only changes the card order and quality requirements.

## Regression Tests

- Verify all V1.3 eight headings appear in exactly the required order in both the canonical standard and Skill.
- Verify V1.1 declares its Superseded status and V1.3 replacement.
- Verify mnemonic/fact boundary statements and the four required meaning-growth elements are present.
- Check Markdown links, canonical-reference conflicts, and `git diff --check`.
- Run `node --test website/app.test.js` as a no-runtime-regression guard; it does not prove teaching-content quality.

## Reviewer

Independent reviewer required under `REVIEW_PROTOCOL_V1.md`. The reviewer must check Owner authorization, frozen scope, V1.3 unique canonical status, V1.1 traceability, no data/runtime change, and reproduced validation.

## Version Impact

**MAJOR.** The learner-facing sequence and required instructional content change from the recovered V1.1 baseline. No data or runtime compatibility contract changes.

## Source Status Changes

| Source | Old status | New status |
| --- | --- | --- |
| `docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_3.md` | Absent | Canonical / Owner Approved |
| `docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_1.md` | Canonical Candidate / Owner Approved — recovered baseline | Superseded historical baseline |
| `skills/english-thinking/SKILL.md` | Derived Skill with older eight-part output order | Derived Skill synchronized to V1.3 |
| `docs/english-thinking-os/HISTORICAL_SCENE_MNEMONICS_V1.md` | V1.1 Step 1 integration reference | V1.3 Part 3 integration reference |

## Owner Decision

**Approved — 2026-10-18.** The current Owner request explicitly authorizes the V1.3 eight-part order, the selective mnemonic-fusion rule, the fact-versus-mnemonic distinction, the per-meaning growth requirements, and GitHub publication. This proposal records that authorization and limits implementation to the listed documentation and Skill synchronization.
