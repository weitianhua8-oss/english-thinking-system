# AI Project OS v1.0

> 适用范围：英语思维 850，以及以后采用本模板的新项目。
> 版本：v1.0｜生效日期：2026-09-01

## 1. 目的与总原则

AI Project OS 是把想法稳定转化为可验证产品的协作制度，不是提示词教程。

总原则：**人负责目标与判断，AI 负责研究与执行；是否完成由验收标准决定。**

主闭环：

```text
IDEA → DEFINE → SPEC → PLAN → BUILD → TEST → REVIEW → ACCEPT → COMMIT → LEARN
```

- **IDEA**：Owner 用自然语言提出想法或问题。
- **DEFINE**：Project Brain 判断任务等级、范围与缺失信息。
- **SPEC**：明确 Goal、Context、Constraints、Don't、Golden、Deliverables、Acceptance Criteria。
- **PLAN**：Builder 先读真源文件，自主提出实现方案；T3 及以上必须有计划。
- **BUILD**：按已确认计划实现，不越过任务边界。
- **TEST**：运行客观验证与必要的人工路径检查。
- **REVIEW**：独立 Reviewer 只按标准找问题，不接受 Builder 的自评替代证据。
- **ACCEPT**：Owner 决定结果是否符合预期。
- **COMMIT**：形成可回退的 Git 安全节点。
- **LEARN**：T3 及以上复盘并沉淀 Rule、Decision、Golden、Test、Template 或 Skill。

## 2. 职责边界

| 角色 | 必须负责 | 不负责 |
| --- | --- | --- |
| Owner | 目标、取舍、最终验收 | 编写技术方案或测试代码 |
| Project Brain | 需求翻译、任务分级、验收、产品/教学/架构判断 | 用聊天记忆替代项目文档 |
| Builder | 研究、计划、实现、测试证据、风险说明 | 擅自改变已确认产品方向 |
| Reviewer | 用独立视角核对规则、验收、回归与风险 | 重复 Builder 的自我评价或顺手实现功能 |

## 3. 单一可信来源与优先级

项目仓库是长期记忆；聊天记录仅提供上下文。文档冲突按下列顺序处理：

1. 经 Owner 确认的当前任务验收标准；
2. 项目 `PROJECT.md` 或等价的既有项目总控；
3. `RULES.md`、已记录的 `DECISIONS.md`；
4. 经过确认的 Golden Sample；
5. `PRD.md`、`ARCHITECTURE.md`、`PROGRESS.md`；
6. 历史方案、聊天记录和旧提示词。

英语思维 850 的接入期例外：`PROJECT_MASTER.md` 是现有最高产品规则；本 OS 不替代它。

## 4. 标准项目文档包

新项目从 `templates/project-starter/` 复制下列六份文件；已有项目先完成接入审查，再由既有真源渐进生成，禁止把空模板覆盖已有文档。

| 文件 | 回答的核心问题 | 更新频率 |
| --- | --- | --- |
| `PROJECT.md` | 项目为何存在、什么不可改变 | 低 |
| `PRD.md` | 当前版本为谁解决什么问题 | 每个版本 |
| `ARCHITECTURE.md` | 系统、数据与运行方式如何组成 | 架构变化后 |
| `RULES.md` | 必须做什么、绝不做什么 | 新长期规则出现时 |
| `DECISIONS.md` | 为什么做出关键取舍 | 每个关键决定后 |
| `PROGRESS.md` | 当前真实状态、风险与下一步 | 每个任务节点 |

推荐目录：

```text
/project
  PROJECT.md  PRD.md  ARCHITECTURE.md  RULES.md  DECISIONS.md  PROGRESS.md
  /docs       /golden       /skills       /templates
  /src        /tests        /data
```

目录可适配现有项目；不能为了套模板无理由调整既有结构。

## 5. 任务启动协议

每项任务先形成最短可用任务卡。T1 可以在对话中表达；T2 及以上写入任务计划或 `PROGRESS.md`。

```markdown
## [任务名称]

**等级：** T?
**Goal：** 要解决的用户问题与业务价值。
**Context：** 必须理解的当前状态。
**Source of Truth：** 需要读取的文档、代码、数据或样本。
**Requirements：** 必须交付的结果。
**Constraints：** 技术、兼容、时间、内容或安全边界。
**Don't：** 明确禁止的改变。
**Golden Examples：** 已确认样本路径；无则写“本任务无”。
**Deliverables：** 文件、页面、数据、报告或截图。
**Acceptance Criteria：** 可判定的完成条件。
```

任务卡写清 **what / why / boundary / done**，不要预先规定每一行代码如何写；Builder 在约束内决定实现路径。

## 6. 阶段门禁

| 阶段 | 进入条件 | 离开条件 |
| --- | --- | --- |
| SPEC | 目标与范围可理解 | 验收标准可被独立检查 |
| PLAN | T2+ 任务卡已完整 | 影响文件、风险、验证方式明确 |
| BUILD | T3+ 计划获得确认 | 改动限制在批准范围 |
| TEST | 有可运行或可检查的交付物 | 客观验证结果已记录 |
| REVIEW | Builder 提交测试证据 | Reviewer 输出 PASS / WARNING / FAIL |
| ACCEPT | FAIL 已解决或 Owner 明确接受风险 | Owner 确认结果 |
| LEARN | T3+ 已验收 | 新知识已归类，或明确“无新增沉淀” |

## 7. 完成定义

任何任务只有同时满足以下条件才可宣称完成：

1. 每条 Acceptance Criteria 都有可追溯证据；
2. 已运行与改动相称的自动检查；
3. 关键用户路径已人工检查（网页还需打开页面并操作核心按钮）；
4. Reviewer 对 T3+ 给出结论，或 Owner 明确允许跳过；
5. 变更、验证、已知限制和下一步已更新至 `PROGRESS.md`；
6. 按 Git 规范形成对应安全节点。

## 8. LEARN 沉淀

T3、T4、T5 完成后必须逐项判断：

- 这次是否产生长期 **Rule**？
- 是否有需要解释的 **Decision**？
- 是否出现可复用的 **Golden Sample**？
- 是否应增加回归 **Test**？
- 是否应升级为 **Template** 或 **Skill**？

只记录已验证、可复用的知识；一次性偏好不进入长期规则。
