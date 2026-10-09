# 英语思维学单词 Skill 同步审计

**Date:** 2026-10-08
**Task level:** T3 — 已有教学 Skill 的受治理同步审计
**Branch:** `audit/skill-sync-historical-scene`
**Base:** `daa4f7e29f6cd90eb19756c11c82d1eec7b17149` (`origin/main`)
**Status:** Independent Review PASS; Candidate pending Owner acceptance; not merged to `main`

## 1. 目标与范围

本任务只审计并接入《英语思维学单词 Skill》的记忆外挂执行入口：确认唯一 Skill、确认 `main` 是否已有历史场景助记规范，并在存在接入缺口时做最小引用性修改。

不创建第二个 Skill；不修改 `data/vocabulary_850.json`、schema、课程、网页、Grammar Vision、已有 850 词内容，亦不重建或改写《英语思维850 · 新单词教学标准 V1.1》。未经 Owner 对本 Candidate 的验收，不合并 `main`。

## 2. Authority / Source of Truth

| Concern | Canonical source / evidence | Audit finding |
| --- | --- | --- |
| Existing English Thinking Skill | [`skills/english-thinking/SKILL.md`](../../../skills/english-thinking/SKILL.md) | 唯一现有 Skill；本任务只修改这一文件，不创建并行 Skill。 |
| 记忆外挂优先级、真实性与标签 | [历史生活场景助记规范 V1](../HISTORICAL_SCENE_MNEMONICS_V1.md) | 唯一详细正文；规定可靠历史场景、可靠构词关系、视觉/动作联想、谐音钩子的选择顺序及四类标签。 |
| 当前规则授权 | [CP-2026-003](../change-proposals/CP-2026-003-historical-scene-mnemonics.md) 与 [Owner closure](2026-10-08-cp-2026-003-owner-acceptance-closure.md) | CP 已 `OWNER ACCEPTED / CLOSED`；本任务只接入已接受规则，不改变其语义。 |
| 冻结边界 | [Frozen Decisions](../09_DECISIONS.md) | 不触碰 FD-01–FD-10、Grammar Vision、数据或 Schema。 |
| 0–7 教学轨 | Owner closure 与专项规范 §4 | 仅将规则接入第 1 步“记忆外挂”；顺序、其余步骤及现代高频语义中心均不变。 |

主线同步检查：在 `origin/main` 的 `daa4f7e` 上，`git ls-tree -r --name-only origin/main` 已列出 `docs/english-thinking-os/HISTORICAL_SCENE_MNEMONICS_V1.md`；该文件的最后主线提交为 `dd4b12d`。而 Skill 的最后主线提交仍为 `6ed5611`，且不含该规范链接。因此结论是：**专项规范已同步到 main，Skill 尚未接入其执行入口。**

## 3. 最小变更

`skills/english-thinking/SKILL.md` 新增 `Memory-hook policy (Step 1 integration)`：

- 将选择优先级、真实性闸门和四类标签全部链接回专项规范，不复制成第二套规则；
- 明确历史材料只能作为现代语义核心的辅助；
- 明确本接入不重排 V1.1 0–7 教学轨；
- 明确缺证据时不得把记忆联想表述为真实词源。

这解决 Skill 作者入口缺少新规则的问题，同时维持一个事实只有一个详细 canonical 正文。

## 4. 验收、风险与回退

**验收：** Skill 可追溯到唯一助记规范；Priority、四类信息边界和 0–7 不变性均由链接正文约束；diff 不包含数据、课程、网页或冻结规则变化；文档链接、格式与既有回归测试通过；独立 Reviewer 复核后才可提交 Owner。

**风险：** 如果在 Skill 中复写完整优先级或词源规则，未来会形成规则漂移；如果省略“Step 1”边界，会误导为新教学主轨。故本次仅作链接型接入。

**回退：** 以 Base `daa4f7e29f6cd90eb19756c11c82d1eec7b17149` 为安全节点；拒绝 Candidate 时，在本分支恢复本次提交即可。不得通过回退修改 `main` 的已接受专项规范。

## 5. 验证与 LEARN

Builder 将执行：`git diff --check`、两份 Markdown 的相对链接解析、关键声明与禁用断言搜索、`node --test website/app.test.js`、完整 diff/文件清单检查。

Independent Review 必须覆盖：authority、FROZEN、silent change、duplicate source、0–7 回归、文档/代码同步、测试复现和 Owner 边界。

**LEARN：** 不新增 Rule、Decision、Golden、Test 或 Template。原因是本次只把已接受的 canonical 规则接入既有 Skill；没有产生可升级为全局规范的新经验。

## 6. 已知的范围外问题

[`08_CURRENT_STATE.md`](../08_CURRENT_STATE.md) 的“2026-10-08 文档候选”段仍写有“Owner 成果验收、推送与主线合入未完成”，与同目录的 Owner closure 及当前 `origin/main` 已含专项规范不一致。该状态漂移在本次被记录，但未修改：它不属于此 Skill 接入的最小范围，应由单独治理状态核对任务处理。

## 7. Independent Review

**Reviewer outcome:** PASS

Reviewer independently checked the complete Base/Head diff, all authority and frozen-scope sources, the single-Skill boundary, the canonical-policy link, Step 1 / 0–7 protection, the modern-semantic-core boundary, and the four-way information distinction. It reproduced `git diff --check`, local Markdown-link and Skill-assertion checks, and `node --test website/app.test.js` with **157 passed / 0 failed**.

The review found no blocking or non-blocking finding. It confirmed that this Candidate can enter Owner acceptance, but its PASS neither constitutes Owner acceptance nor authorizes a push or merge to `main`.
