# Change Control V1

**Status:** Canonical

**Owner:** Project Owner

**Effective date:** 2026-09-25

本协议把高影响变化从普通任务中分离出来，确保 FROZEN、canonical source 和跨模块契约不会被静默改变。权限层级见 [Instruction Hierarchy](INSTRUCTION_HIERARCHY_V1.md)。

> **Bootstrap authorization:** 本治理 v1 与 Project OS v2.1 由 Owner 在 2026-09-25 的 P1 Instruction Governance 任务中明确授权建立；它们不被本协议追溯要求补建 Proposal。自该版本生效后的实质变更均适用本协议。

## 1. 必须提交 Change Proposal 的范围

以下内容发生任何实质变化时，默认进入 Change Control：

- FROZEN curriculum 或已冻结课程顺序；
- Grammar Vision 主轨、Grammar Camera、核心术语或学习 Gate；
- 数据 schema、ID、状态模型、兼容契约或 Source of Truth；
- Vocabulary / Word Teaching Standard；
- One New Variable；
- Seed → System → Return；
- 核心视觉语义、关系隐喻或已冻结视觉标准；
- 项目级目录、指令层级、治理规则或 canonical 导航；
- 会改变既有课程依赖、学习进度、公开行为或迁移要求的变更。

即使改动文件很少、用户要求很急或版本标为 PATCH，只要触发以上任一项，就必须有 Proposal。

## 2. 可以直接执行的修改

只有同时满足下列条件的低风险维护可在普通任务内直接执行：

1. 不改变语义、术语、顺序、schema、状态、依赖或用户可见行为；
2. 不触碰 FROZEN 或 canonical authority；
3. 不建立、移动或替换 Source of Truth；
4. 改动可通过 diff 明确证明为拼写、格式、失效链接、路径修正或从未变更 canonical 机械再生成的 Derived 输出；
5. 仍按正常计划、测试和 Review 记录执行。

无法证明“无实质变化”时，按 Change Proposal 处理。对治理文件的非语义排版修复可以直接执行；对治理规则含义、状态或导航权限的任何变化必须提交 Proposal。

## 3. Change Proposal 模板

以下方括号内容是使用模板时必须替换的字段说明，不是待完成的本协议内容。

```markdown
# Change Proposal: [short title]

**Proposal ID:** CP-YYYY-NNN
**Status:** Draft / Under Review / Approved / Rejected / Implemented / Superseded
**Requested By:**
**Date:**

Old Rule:
[current canonical wording and exact path]

New Rule:
[proposed wording and target canonical path]

Reason:
[evidence-backed problem and why the current rule is insufficient]

Affected Nodes:
[node IDs or None]

Affected Lessons:
[lesson IDs/paths or None]

Affected Data:
[schemas, datasets, IDs, state or None]

Migration Required:
[Yes/No; exact migration and rollback path]

Backward Compatibility:
[preserved behavior, breaks, adapters and deprecation window]

Regression Tests:
[commands, fixtures, expected results and manual checks]

Reviewer:
[independent reviewer or required reviewer role]

Version Impact:
[PATCH / MINOR / MAJOR with reason]

Source Status Changes:
[Canonical / Superseded / Deprecated / Reference Only transitions]

Owner Decision:
[Approved/Rejected, date, conditions and evidence link]
```

字段无影响时写 `None` 并说明依据，不得省略。

## 4. Version Impact

| 类型 | 定义 | 典型例子 |
| --- | --- | --- |
| PATCH | 不改变已批准语义或兼容契约的澄清与修正 | 消除歧义、修复错误链接、补充不改变行为的例证 |
| MINOR | 向后兼容地增加能力、可选字段、节点或标准 | 新增可选教学节点、扩展但不改变现有解释的字段 |
| MAJOR | 改变既有语义、顺序、术语、schema、真源或兼容行为 | 重排 Grammar 主轨、替换核心术语、迁移 canonical 数据 |

版本大小不代替审批。触发受控范围的 PATCH 仍需要 Proposal。

## 5. Lifecycle

1. **Draft**：引用 Old Rule 与 canonical path，收集证据，不修改受控内容。
2. **Impact Review**：核对节点、课程、数据、UI、Derived 文档、兼容性、迁移与回退。
3. **Owner Decision**：Owner 明确批准或拒绝；聊天结论必须写回 Proposal 或 canonical Decision。
4. **Implementation**：只在批准范围和独立分支实施；先迁移/测试，再切换 canonical。
5. **Review**：Reviewer 按 [Review Protocol](REVIEW_PROTOCOL_V1.md) 检查授权、回归、静默变化和文档同步。
6. **Acceptance**：Owner 验收后更新 Proposal 为 `Implemented`，记录生效版本和提交。
7. **Source Transition**：更新 Project OS 导航；旧来源标记状态，不直接删除。

拒绝或撤回的 Proposal 不改变当前规则。实施失败时回滚到 Proposal 中声明的安全节点。

## 6. 防止 Silent Change

- 变更提交必须引用 Proposal ID，并列出批准范围与实际 diff。
- Reviewer 对“行为已变但 Proposal 未声明”“文档改变但实现未同步”或反向情况一律 `BLOCKED`。
- 不得用重写整份文件掩盖局部语义变化；优先最小 diff。
- Derived 文档同步必须列入 Affected Data/Docs，不得在无来源变更时自行改义。
- 术语重命名必须列出旧名、新名、兼容期、搜索结果与迁移路径。

## 7. 新标准进入 Project OS

新标准只有完成以下步骤才算生效：

1. Proposal 说明其解决的唯一治理或领域问题；
2. 确认没有同主题 active canonical source；如有，先决定整合或状态迁移；
3. Owner 批准 canonical 路径、Owner、版本与适用范围；
4. 文件明确标记 `Canonical`，并从 [Project OS](../PROJECT_OS.md) 导航；
5. 更新受影响的 AGENTS、Reviewer、测试与 Derived 文档引用；
6. 验证链接、冲突、回归和旧来源状态。

仅创建文件、在聊天中同意或把文件命名为 `STANDARD`，都不等于进入 Project OS。

## 8. Deprecated / Superseded

- **Deprecated**：旧标准仍在兼容期。文件头注明替代方向、弃用日期、允许的旧用途和停止使用条件。
- **Superseded**：新标准已正式接管。文件头注明替代文件、Owner 决定、日期、版本和迁移结论。
- **Reference Only**：只保留研究或历史证据，不允许新实现依赖。
- Project OS 只把 active canonical source 放在主导航；旧文件可以保留在历史/迁移索引中。
- 状态迁移本身属于治理变化，必须可追溯，不通过删除旧文件完成。
