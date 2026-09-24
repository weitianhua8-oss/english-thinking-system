# English Thinking System｜Project OS

**版本：** 英语专属真源试行版 v2.1

**Owner：** 项目 Owner

**状态：** Active
**最后更新：** 2026-09-25

## 1. 目的

这里是英语思维 850 的教学与产品真源入口。它让项目状态、教学原则、质量门禁和下一步行动存放在仓库中，而不是依赖聊天记忆或旧提示词。

> **State over Prompt：** Prompt、Skill、页面和 Agent 必须读取并执行已记录状态；它们不得自行创造、替换或静默修改项目状态。

## 2. 适用范围与边界

- 本目录只约束英语思维 850。
- `docs/project-os/` 是跨项目可复用的试行流程规范，不是英语教学规则的复制源，也不是全局强制规范。
- 本目录不改变网站、词库、170 天计划、V1 学习进度或已验收页面的实现状态。
- 旧文档保留为历史证据；新规则不应只写回旧文档。

## 3. 冲突优先级

完整权限和冲突处理以 [Instruction Hierarchy V1](governance/INSTRUCTION_HIERARCHY_V1.md) 为准。简要顺序为：当前任务意图 → 项目宪法 → FROZEN Specifications → Domain Standards → AGENTS / Execution Rules → Task-local Instructions；当前任务若要求改变 FROZEN，必须进入 [Change Control](governance/CHANGE_CONTROL_V1.md)，不能直接覆盖。

发现冲突时，先记录事实和影响；不得由 Builder、Reviewer、Skill 或页面静默选择一个旧版本。

## 4. 真源导航

### 4.1 Governance

```text
Governance
→ Project Instructions
→ Instruction Hierarchy
→ Change Control
→ Review Protocol
```

| 主题 | Canonical 文件 | 职责 |
| --- | --- | --- |
| Project Instructions | [PROJECT_INSTRUCTIONS.md](../../PROJECT_INSTRUCTIONS.md) | 长期项目原则与治理总入口 |
| Instruction Hierarchy | [governance/INSTRUCTION_HIERARCHY_V1.md](governance/INSTRUCTION_HIERARCHY_V1.md) | 权限层级、冲突与来源状态 |
| Change Control | [governance/CHANGE_CONTROL_V1.md](governance/CHANGE_CONTROL_V1.md) | Proposal、版本、迁移与标准生命周期 |
| Review Protocol | [governance/REVIEW_PROTOCOL_V1.md](governance/REVIEW_PROTOCOL_V1.md) | 越权、静默变化、重复真源与回归审查 |
| AI Execution | [AGENTS.md](../../AGENTS.md) | 仓库内 AI/Codex 执行顺序 |

### 4.2 Teaching and Product

| 主题 | 文件 | 更新时机 |
| --- | --- | --- |
| 01 产品北极星 | [01_PRODUCT_NORTH_STAR.md](01_PRODUCT_NORTH_STAR.md) | 品牌、用户或长期目标变化 |
| 02 教学母架构 | [TEACHING_OS_V2.md](TEACHING_OS_V2.md) | 教学链路有证据化升级 |
| 03 学习对象 | [03_LEARNING_OBJECTS.md](03_LEARNING_OBJECTS.md) | 模块职责变化 |
| 04 课程 | [04_CURRICULUM.md](04_CURRICULUM.md) | 课程分层或范围变化 |
| 05 掌握模型 | [05_MASTERY_MODEL.md](05_MASTERY_MODEL.md) | 掌握证据或复习机制变化 |
| 06 质量门禁 | [06_QUALITY_GATES.md](06_QUALITY_GATES.md) | 新教学验收规则 |
| 07 设计系统 | [07_DESIGN_SYSTEM.md](07_DESIGN_SYSTEM.md) | 表现规则变化 |
| 08 当前状态 | [08_CURRENT_STATE.md](08_CURRENT_STATE.md) | 每个任务节点 |
| 09 决策 | [09_DECISIONS.md](09_DECISIONS.md) | Owner 确认关键取舍后 |
| 10 风险 | [10_RISKS.md](10_RISKS.md) | 新风险或风险解除 |
| 11 下一步 | [11_NEXT_ACTIONS.md](11_NEXT_ACTIONS.md) | 当前优先级改变 |

### 4.3 Domain Standards

| 领域 | Canonical / active 入口 | 边界 |
| --- | --- | --- |
| Grammar | [Teaching OS V2](TEACHING_OS_V2.md)、[Learning Objects](03_LEARNING_OBJECTS.md)、[Curriculum](04_CURRICULUM.md)、[Frozen Decisions](09_DECISIONS.md) | 当前主线只冻结已登记决定；研究或审计输入不自动成为 Grammar Vision canonical 规格 |
| Vocabulary | [Learning Objects](03_LEARNING_OBJECTS.md)、[Curriculum](04_CURRICULUM.md)、[English Thinking Skill](../../skills/english-thinking/SKILL.md)、[data/README.md](../../data/README.md) | 教学原则与 850 canonical 数据分离 |
| Visual | [Design System](07_DESIGN_SYSTEM.md)、[BE 3D Card Standard](../../visual/3d-card-standard/BE-reference/STYLE_GUIDE.md) | 核心视觉语义与表现规则 |
| Web | [ARCHITECTURE.md](../../ARCHITECTURE.md)、[Learning Objects](03_LEARNING_OBJECTS.md) | 页面消费内容，不成为内容真源 |
| Knowledge | [Learning Objects](03_LEARNING_OBJECTS.md)、[LEARNING_LAYERS.md](../../data/LEARNING_LAYERS.md) | 语义对象、三层学习与关系边界 |
| Research | [Risks](10_RISKS.md)、[历史规格与计划](../superpowers/specs/2026-09-02-english-project-os-reset-design.md) | 研究与设计证据默认 Reference Only，除非经 Change Control 采用 |
| Testing | [Teaching Quality Gates](06_QUALITY_GATES.md)、[Reviewer Protocol](governance/REVIEW_PROTOCOL_V1.md)、[website/app.test.js](../../website/app.test.js) | 教学、治理与工程证据分别记录 |

## 5. 使用规则

- AI 开工前先读取 [PROJECT_INSTRUCTIONS.md](../../PROJECT_INSTRUCTIONS.md) 和 [AGENTS.md](../../AGENTS.md)，再按本导航读取任务涉及的真源。
- T3+ 的英语教学任务必须在任务卡中引用本目录相关文件，并完成 G1–G7。
- T3+ 完成后必须更新当前状态，并执行 LEARN：判断是否需要新增 Rule、Decision、Golden、Test、Template 或 Skill。
- 教学方向、页面样板和全量能力必须分开记录，不能以样板代表完整课程。
- 新标准必须按 Change Control 获批并加入本导航；旧标准按 `Deprecated`、`Superseded` 或 `Reference Only` 保留可追溯状态，不直接删除。
