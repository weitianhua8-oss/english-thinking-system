# Review Protocol V1

**Status:** Canonical

**Owner:** Project Owner

**Effective date:** 2026-09-25

本协议用于判断一次修改是否越权、是否引入静默变化，以及是否具备进入 Owner 验收的条件。权限来源见 [Instruction Hierarchy](INSTRUCTION_HIERARCHY_V1.md)，受控变更见 [Change Control](CHANGE_CONTROL_V1.md)。它补充现有 [Reviewer Agent 规范](../../project-os/REVIEWER_AGENT.md)，不替代教学 G1–G7 或产品测试。

## 1. Reviewer 输入

Reviewer 开始前必须取得：

- 当前任务、验收标准和批准范围；
- [PROJECT_INSTRUCTIONS.md](../../../PROJECT_INSTRUCTIONS.md) 与 [Instruction Hierarchy](INSTRUCTION_HIERARCHY_V1.md)；
- 本任务涉及的 FROZEN Specifications 与 Domain Standards；
- Grammar Vision 任务必须读取 [Grammar Vision Core Contract](../grammar/GRAMMAR_VISION_CORE_CONTRACT_V1.md)；
- Change Proposal（如触发）；
- base commit、完整 diff、测试证据和迁移/回退说明。

缺少决定权限所必需的证据时，不得猜测为 PASS。

## 2. 必查项

| 检查项 | Reviewer 要确认的事实 | 阻塞条件 |
| --- | --- | --- |
| FROZEN | 是否触碰冻结语义、顺序、术语、schema 或主轨 | 未批准 Proposal 或超出批准范围 |
| Silent Change | 是否有未在任务/Proposal 声明的行为或规则变化 | 存在未声明变化 |
| Duplicate Source | 是否建立第二个 active canonical source | 同主题存在两个 canonical 声明 |
| Terminology | 是否新增、替换或漂移核心术语 | 无迁移记录或旧新含义不清 |
| Schema | 是否改变字段、类型、ID、状态或兼容契约 | 无版本、迁移、回滚或回归证据 |
| One New Variable | 是否违反 [canonical definition](../grammar/GRAMMAR_VISION_CORE_CONTRACT_V1.md) §3，对一节 Micro Lesson 同时新增多个核心认知变量 / 新能力 | 无拆分理由或发生未授权 semantic change |
| Seed → System → Return | 是否违反 [canonical definition](../grammar/GRAMMAR_VISION_CORE_CONTRACT_V1.md) §4，尤其是 Return 是否验证新场景迁移而非重复 Seed | 闭环被删改、降格为关键词或发生未授权 semantic change |
| Dependencies | 是否破坏现有课程、节点、数据或进度依赖 | 关键依赖未验证或已回归失败 |
| Content / UI | UI 是否自行造义，内容是否被表现层反向定义 | 内容与表现重新耦合 |
| Regression | 风险对应的自动/人工检查是否执行 | 必需回归缺失或失败 |
| Docs / Code Sync | canonical、Derived、代码和状态是否同步 | 相互矛盾或遗漏受影响文件 |
| Behavior | 是否存在未声明的用户可见或执行行为变化 | 行为变化无授权或证据 |

Reviewer 还必须确认修改只落在批准文件范围内；无关历史问题记录为 `OUT OF SCOPE`，不得在本次顺手修复。

对受治理概念的审查必须从表中链接进入 canonical source，引用定义并对比 candidate 的语义与行为；关键词存在、关键词搜索命中或名称未变，都不能单独证明规则未改变。

## 3. 越权判定

满足任一条件即越权：

- Task-local 或 AGENTS 规则改变了项目宪法、FROZEN 或 Domain Standard；
- 修改了 canonical source，但任务只授权 Derived 输出；
- Proposal 批准的是 A，实际 diff 同时改变了 B；
- 以“整理、统一、重构、同步”为名改变了术语、顺序、schema 或教学语义；
- 把研究、聊天、未合入分支或历史文件晋升为 canonical/FROZEN，却没有 Owner 决定与 Project OS 登记；
- 删除或覆盖旧标准，导致无法追溯 Deprecated/Superseded 关系。

越权修改不得以“测试通过”豁免。

## 4. Review Outcomes

| 本协议结论 | 含义 | 后续 |
| --- | --- | --- |
| PASS | 未发现阻塞项，证据足以进入 Owner 验收 | 可提交 Owner ACCEPT；不代表 Owner 已验收 |
| PASS WITH NOTES | 无越权或失败，但存在非阻塞风险、未覆盖项或后续工作 | 明确 notes、Owner 是否需接受、不得把 notes 写成已解决 |
| BLOCKED | 存在越权、未批准 FROZEN 变化、重复真源、关键证据缺失或回归失败 | 退回 Builder 或进入 Change Proposal，不得 ACCEPT |

与现有 [Reviewer Agent 规范](../../project-os/REVIEWER_AGENT.md) 的兼容映射：

- `PASS` → `PASS`；
- `WARNING` → 只有在不涉及越权、FROZEN、重复真源或失败测试时才可映射为 `PASS WITH NOTES`；
- `FAIL` → `BLOCKED`。

若旧报告只写 `WARNING`，必须阅读具体风险，不能自动视为可通过。

## 5. Reviewer 报告模板

以下方括号内容是 Reviewer 使用模板时必须替换的字段说明，不是待完成的本协议内容。

```markdown
# Governance Review: [task]

**Outcome:** PASS / PASS WITH NOTES / BLOCKED
**Base / Head:** [commits]
**Reviewed Scope:** [files and proposal ID]

## Authority and Scope
- Task level:
- Canonical sources checked:
- Frozen scope touched: Yes / No
- Change Proposal required/present: [result]

## Findings
| Severity | Check | Evidence | Required action |
| --- | --- | --- | --- |

## Validation Reproduced
- [command]: [result]

## Out of Scope
- [historical issue; no implementation in this task]

## Owner Decision Needed
- [None or exact decision]
```

报告必须引用可复现证据；“看起来合理”“Builder 已确认”或只有截图不构成独立复核。

## 6. Review Completion Gate

只有以下条件全部满足，Reviewer 才可给出 PASS：

1. 权限和范围可追溯；
2. FROZEN 与 canonical source 未被静默改变；
3. 必需 Proposal 已批准且实际 diff 未越界；
4. 相应测试、链接、迁移和回退证据通过；
5. 文档、代码、数据与 Project OS 导航没有互相矛盾；
6. 未把 Reviewer 自查冒充 Owner 验收。
