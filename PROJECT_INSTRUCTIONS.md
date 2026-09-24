# English Thinking 850｜Project Instructions

**Status:** Canonical project instruction entry

**Scope:** 英语思维 850 / 看见英语 / Grammar Vision

**Version:** v1.0

**Effective date:** 2026-09-25

本文件是项目长期原则的入口，不复制课程、视觉、数据或页面的全部细则。详细规则由 [English Thinking Project OS](docs/english-thinking-os/PROJECT_OS.md) 导航；规则冲突与变更必须按 [Instruction Hierarchy](docs/english-thinking-os/governance/INSTRUCTION_HIERARCHY_V1.md) 和 [Change Control](docs/english-thinking-os/governance/CHANGE_CONTROL_V1.md) 处理。

## 1. 项目使命

> 把英语变成看得见的画面。

项目以真实世界为共同起点，让学习者先看见对象、事件、关系、时间与信息焦点，再理解英语如何选择和组织这些信息。核心认知主轴是：

- **Scene**：先恢复真实场景，不从逐词翻译起步；
- **Relation**：看见对象之间的空间、语义与信息关系；
- **Timeline**：看见事件相对时间与观察位置；
- **Camera**：看见表达选择了谁、什么和哪个焦点。

完整教学架构、Grammar Camera 与质量门禁分别以 [Teaching OS V2](docs/english-thinking-os/TEACHING_OS_V2.md)、[Learning Objects](docs/english-thinking-os/03_LEARNING_OBJECTS.md) 和 [Teaching Quality Gates](docs/english-thinking-os/06_QUALITY_GATES.md) 为准。

## 2. 长期原则

1. **真实高频优先。** 优先使用真实、常见、可迁移的语言事实和场景，不为覆盖数量制造伪规则、伪关系或低频噪声。
2. **理解优先于术语。** 先建立画面、关系和意义，再给语法名称或分类标签。
3. **内容与 UI 分离。** 语义内容由已审校的内容真源产生；UI、图卡和页面负责呈现与交互，不得自行造义或回写内容真源。
4. **一个事实只有一个 Canonical Source。** 派生页面、摘要、Skill 和任务文档必须链接回权威来源，不得平行维护同一规则。
5. **FROZEN 不得静默修改。** 冻结内容不是永远不能改变，但任何实质变化都必须先进入 Change Proposal，经授权、影响分析、迁移与回归审查后才能实施。
6. **小步、可验证、可回滚。** 每次只处理已授权范围，保留旧版本与迁移记录，用明确测试和 Git 节点支持回退。

## 3. Source of Truth

| 领域 | Canonical 入口 | 说明 |
| --- | --- | --- |
| 项目长期原则 | 本文件 | 只保存跨领域长期原则与导航 |
| 指令层级与冲突 | [Instruction Hierarchy](docs/english-thinking-os/governance/INSTRUCTION_HIERARCHY_V1.md) | 判定规则权限、范围和来源状态 |
| 冻结决策 | [Frozen Decisions](docs/english-thinking-os/09_DECISIONS.md) | 当前已冻结的 Owner 决策 |
| 教学与产品导航 | [English Thinking Project OS](docs/english-thinking-os/PROJECT_OS.md) | 领域真源和当前状态入口 |
| 变更授权 | [Change Control](docs/english-thinking-os/governance/CHANGE_CONTROL_V1.md) | Change Proposal、版本和迁移流程 |
| 审查结论 | [Review Protocol](docs/english-thinking-os/governance/REVIEW_PROTOCOL_V1.md) | 越权、静默变化与回归检查 |
| AI 执行规则 | [AGENTS.md](AGENTS.md) | 仓库内 AI/Codex 的执行顺序 |

数据、课程、视觉、Web、Knowledge、Research 与 Testing 的具体 canonical 路径由 Project OS 导航维护。本文件不得被用来复制或替代这些领域真源。

## 4. FROZEN 的含义

`FROZEN` 表示某项规则、规格、术语、主轨、schema 或语义已经被明确批准并锁定：

- 未获批准时，任何人或 AI 都不得改变其含义、顺序、边界、名称、数据契约或依赖行为；
- 改写措辞若可能改变解释，也按实质变化处理；
- 用户临时提出修改时，当前任务从“直接实现”切换为 Change Proposal；
- 只有 Proposal 获批、版本影响明确、迁移与回归方案就绪后，才能修改 canonical source；
- 旧版本必须保留状态与替代关系，不得被无记录覆盖或删除。

当前冻结范围以 [Frozen Decisions](docs/english-thinking-os/09_DECISIONS.md) 及被其明确引用的 canonical 规格为准。文件名含 `FROZEN`、历史文档自称冻结或任务口头描述，都不能单独建立新的 canonical 权限。

## 5. AI 的双重职责

AI 同时是：

- **执行者**：在授权范围内完成最小、稳定、可验证的改动；
- **项目审计者**：开工前识别当前真源、FROZEN 边界、同类实现、冲突和变更控制要求；交付前检查越权、静默变化、重复真源和文档/实现漂移。

AI 不得因为任务要求“直接修改”就跳过冻结检查，也不得借审计之名修改未授权的历史问题。完整执行顺序见 [AGENTS.md](AGENTS.md)。

## 6. 维护规则

- 新项目级标准先走 Change Proposal；批准后才加入 Project OS 导航并声明唯一 canonical source。
- 新标准替代旧标准时，旧文件标为 `Superseded`；仍可使用但不再推荐时标为 `Deprecated`；只保留背景证据时标为 `Reference Only`。
- 状态变更必须给出替代文件、日期、原因和迁移影响。
- 不删除历史规范来制造“统一”；先标状态、改入口、验证引用，再由单独授权任务决定归档或删除。
