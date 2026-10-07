# Change Proposal: 历史生活场景优先的记忆外挂

**Proposal ID:** CP-2026-003
**Status:** Approved（规则方向已授权；候选已实施，独立 Review / Owner 成果验收待完成）
**Requested By:** 项目 Owner
**Date:** 2026-10-08
**Base:** `5d9086a0ea62871ead677d4f5e7988a322ed4a74`
**Branch:** `docs/historical-scene-mnemonics`

## Old Rule

[English Thinking Skill](../../../skills/english-thinking/SKILL.md) 的 Core principles §6 将词源 / 构词定位为辅助；Quality rules 要求保留不确定性，不制造词源。现有 [Learning Objects](../03_LEARNING_OBJECTS.md) 的 Pro Content 包含记忆外挂，但未规定外挂选择优先级。

用户已确认的 V1.1 教学轨包含第 1 步“记忆外挂”；本次核对的远端主线未发现独立 V1.1 全文，不将聊天摘要冒称已合入全文。

## New Rule

为“助记来源选择与历史真实性”新增唯一正文编辑源：[历史生活场景助记规范 V1](../HISTORICAL_SCENE_MNEMONICS_V1.md)。

可靠历史场景 → 可靠构词关系 → 视觉 / 动作联想 → 谐音钩子。事实需要依据；教学重建与记忆联想明确标记；无法核实时回退，不必为每词制造诞生故事。

## Reason

Owner 要求从单词形成或早期使用的生活环境建立画面，降低随意中文谐音的优先级；同时保留项目对伪词源、认知负担和现代高频使用的约束。

## Affected Nodes

None。不改变 Grammar 主轨、冻结术语、FD-01–FD-10 或认知节点。

## Affected Lessons

未来新增或审校的 Vocabulary 记忆外挂。现有词条、课程、图卡不批量重写；不宣称已完成全量迁移。

## Affected Data / Docs

数据：None。不改变 `data/vocabulary_850.json`、CSV、schema、Runtime、学习进度。

文档范围：本提案、新助记规范、`PROJECT_INSTRUCTIONS.md`（入口引用）、`PROJECT_OS.md`（领域导航）、`06_QUALITY_GATES.md`（G1 引用）、`08_CURRENT_STATE.md`（候选状态）及本任务自查记录。现有 Skill 正文保持不变，新规范是其记忆外挂选择的专项补充。

## Migration Required

Yes，文档入口接入；No，数据 / 课程迁移。未来词条按新规则审校，既有词条待单独授权任务。回退：独立分支整组候选提交可撤销；安全基线为上述 Base。

## Backward Compatibility

原有词源辅助原则、现代核心语义、完整教学字段、0–7 教学轨、Pro / Lite 深度与载体职责保持。谐音仍可作为最后一级辅助，不再作为默认首选；未知词源使用现代场景。

## Regression Tests

`git diff --check`；检查所有新增 / 修改文档的本地相对链接；核对完整变更文件列表；人工核对规范 §6 的六个边界案例、唯一正文源与标签规则。无代码 / 数据变更，不新增实现镜像测试，不将文档检查称为词源事实核验。

## Reviewer

独立 Reviewer 待安排。本轮由 Builder 自查，不冒称 Independent Review。

## Version Impact

专项补充规范 1.0。整体影响 MINOR：增加可兼容的助记选择规则，明确谐音优先级变化；不重排课程或迁移数据。

## Source Status Changes

新增 Canonical 专项正文候选，从 Project OS 登记。其他标准维持原状态，不创建第二份完整 Vocabulary Teaching Standard。主线生效待 Review / Owner 成果验收和合入。

## Owner Decision

规则内容授权来自本次提供的跨线程上下文：Owner 明确要求“以后做助记联想时，优先往‘造词时的背景环境’联想”，并要求“把它写进项目”；随后要求“进入工作模式”。真实性闸门与四级优先级已在该上下文明确。本提案将已有授权写成可核查记录，不把授权扩大为推送、主线合并、全量课程迁移或成果验收。
