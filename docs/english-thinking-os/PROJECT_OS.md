# English Thinking System｜Project OS

**版本：** 英语专属真源试行版 v2.0

**Owner：** 项目 Owner

**状态：** Active
**最后更新：** 2026-09-02

## 1. 目的

这里是英语思维 850 的教学与产品真源入口。它让项目状态、教学原则、质量门禁和下一步行动存放在仓库中，而不是依赖聊天记忆或旧提示词。

> **State over Prompt：** Prompt、Skill、页面和 Agent 必须读取并执行已记录状态；它们不得自行创造、替换或静默修改项目状态。

## 2. 适用范围与边界

- 本目录只约束英语思维 850。
- `docs/project-os/` 是跨项目可复用的试行流程规范，不是英语教学规则的复制源，也不是全局强制规范。
- 本目录不改变网站、词库、170 天计划、V1 学习进度或已验收页面的实现状态。
- 旧文档保留为历史证据；新规则不应只写回旧文档。

## 3. 冲突优先级

1. Owner 对当前任务明确确认的验收标准；
2. 本目录的 [09_DECISIONS.md](09_DECISIONS.md) 中 `FROZEN` 决策；
3. 本目录其余当前真源；
4. 经过 Owner 验收的 Golden Sample 与审查记录；
5. 根目录项目摘要和 `docs/project-os/` 试行流程；
6. `PROJECT_MASTER.md`、`ROADMAP.md`、旧计划、聊天记录和旧提示词。

发现冲突时，先记录事实和影响；不得由 Builder、Reviewer、Skill 或页面静默选择一个旧版本。

## 4. 真源导航

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

## 5. 使用规则

- T3+ 的英语教学任务必须在任务卡中引用本目录相关文件，并完成 G1–G7。
- T3+ 完成后必须更新当前状态，并执行 LEARN：判断是否需要新增 Rule、Decision、Golden、Test、Template 或 Skill。
- 教学方向、页面样板和全量能力必须分开记录，不能以样板代表完整课程。
