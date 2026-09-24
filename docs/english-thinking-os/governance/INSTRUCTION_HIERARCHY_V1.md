# Instruction Hierarchy V1

**Status:** Canonical

**Owner:** Project Owner

**Effective date:** 2026-09-25

本文定义英语思维 850 / 看见英语 / Grammar Vision 的规则权限、范围判定和冲突处理。长期原则入口见 [PROJECT_INSTRUCTIONS.md](../../../PROJECT_INSTRUCTIONS.md)，变更授权见 [Change Control](CHANGE_CONTROL_V1.md)，越权判定见 [Review Protocol](REVIEW_PROTOCOL_V1.md)。

## 1. Authority Levels

| Level | 名称 | 权限与边界 | 典型来源 |
| --- | --- | --- | --- |
| Level A | 用户当前任务意图 | 定义本次目标、范围和验收；可以发起规则变更，但不能静默覆盖 FROZEN | Owner 当前明确要求、已确认验收标准 |
| Level B | 项目宪法 | 定义跨领域长期原则、治理方式和真源纪律 | [PROJECT_INSTRUCTIONS.md](../../../PROJECT_INSTRUCTIONS.md) |
| Level C | FROZEN Specifications | 锁定已批准的决策、课程主轨、术语、schema 或核心语义；实质修改必须走 Change Proposal | [09_DECISIONS.md](../09_DECISIONS.md) 及其明确引用的 canonical 规格 |
| Level D | Domain Standards | 约束 Grammar、Vocabulary、Visual、Web、Knowledge、Research、Testing 等领域实现 | [Project OS 导航](../PROJECT_OS.md) 所列领域标准 |
| Level E | AGENTS / AI Execution Rules | 规定 AI 如何检查、计划、实现、测试和审查，不得改变上层产品语义 | [AGENTS.md](../../../AGENTS.md)、`docs/project-os/` |
| Level F | Task-local Instructions | 本任务的计划、临时约束和文件内说明，只在本任务范围生效 | 任务卡、实施计划、局部 README、代码注释 |

层级不是“高层可以无记录覆盖低层”的快捷键。Level A 决定要解决什么；若它要求改变 Level C，必须先按 [Change Control](CHANGE_CONTROL_V1.md) 把意图转成 Proposal。Proposal 获批前，原 FROZEN 规则继续有效。

## 2. Conflict Resolution

发现冲突时按以下顺序处理：

1. **确认事实。** 引用冲突原文、路径、版本和状态，不凭文件名或记忆推断。
2. **确认范围。** 判断规则覆盖的是整个项目、某领域、某版本、某节点还是单次任务。
3. **确认来源权限。** 优先使用 Project OS 已登记的 Canonical Source；Derived 或历史文件不能覆盖它。
4. **检查 FROZEN。** 任一方案会改变冻结语义时，停止直接实现并建立 Change Proposal。
5. **同层裁决。** 在权限与范围相同的规则中，使用已明确生效且更具体的规则；仍无法裁决时交给 Owner，不由 AI 静默选择。
6. **记录结果。** 在 Proposal、Decision 或任务审查中记录采用来源、未采用来源、影响和后续状态。

不得用“更新时间较新”“文件名更正式”或“任务更紧急”单独证明规则优先级。

## 3. Scope Resolution

规则只在其声明范围内有效：

- 项目级原则不能代替某一领域的详细事实标准；
- 领域标准不能改变项目宪法或其他领域的 canonical 数据；
- Task-local 规则可以收窄本次实现范围，但不能扩大权限或取消测试、审查和冻结门禁；
- Derived Document 可以改变呈现方式，不能改变来源语义；
- 一个文件同时涉及多个领域时，各段分别服从对应 canonical source，不能以“同一文件”为由合并权限。

## 4. Source Authority and Status

### Canonical Source

对某一明确事实或规则拥有唯一编辑权的来源。必须在 Project OS 或上级 canonical 文件中登记其主题与路径。同一主题不得同时存在两个 active canonical sources。

### Derived Document

由 Canonical Source 生成或摘要而来的文档、页面、Skill、数据视图或提示词。必须链接来源；来源改变后需要同步或明确版本滞后。Derived 不得反向覆盖 canonical。

### Superseded Document

已被指定新来源替代的旧标准。保留历史证据，但不得用于新实现或冲突裁决。文件应标明替代来源、替代日期和迁移说明。

### Deprecated Document

仍可能被旧流程使用、但不建议新增依赖的来源。必须给出替代方向和停止使用条件；在正式 Superseded 前不得假装已经迁移完成。

### Reference Only

仅保存背景、研究、审计输入或历史设计。它可以支持讨论，不能授权产品状态、FROZEN 状态或实现行为。

## 5. Source-of-Truth Rules

- 新标准只有在 Proposal 获批、指定唯一 canonical 路径并加入 [Project OS](../PROJECT_OS.md) 后，才获得项目级权威。
- 文件名中的 `FINAL`、`MASTER`、`FROZEN` 或版本号不是权威证明；权威来自登记、批准与可追溯版本。
- 同一事实出现两个 canonical 声明时，Reviewer 必须判定 `BLOCKED`，直到 Owner 指定唯一来源并处理另一份状态。
- 摘要、代码常量、页面文案与 canonical 不一致时，先修复 Derived；除非任务已获授权，不反向改写 canonical。
- 聊天、截图、未合入分支和外部镜像默认是证据或提案输入，不自动成为项目真源。

## 6. Frozen-change Exception

用户可以要求改变任何项目规则，但不能要求系统把变化隐藏成普通实现。涉及 FROZEN 时：

```text
Current request
→ identify frozen rule and canonical source
→ create Change Proposal
→ impact / migration / regression review
→ Owner approval
→ versioned implementation
→ independent review
→ canonical navigation and status update
```

Proposal 未获批准时，允许执行的只有审计、证据收集、方案比较和只读验证；不得修改受控语义或其 Derived 输出。
