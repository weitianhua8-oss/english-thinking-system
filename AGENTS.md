# AGENTS.md

本文件定义 AI / Codex 在英语思维 850 / 看见英语 / Grammar Vision 仓库中的项目级执行规则。通用工作方式服从运行环境与 Owner 当前明确要求；项目语义和治理以 [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md) 为入口。

## 开工读取顺序

1. [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)
2. [English Thinking Project OS](docs/english-thinking-os/PROJECT_OS.md)
3. [Instruction Hierarchy](docs/english-thinking-os/governance/INSTRUCTION_HIERARCHY_V1.md)
4. [Frozen Decisions](docs/english-thinking-os/09_DECISIONS.md)
5. 当前任务涉及的 Domain Standards、canonical 数据/代码和已确认样板
6. 当前任务卡、计划与验收标准

不得用聊天记忆、旧 Prompt、历史 Master、未合入分支或文件名中的 `FROZEN` 代替上述真源判定。

## 执行顺序

```text
Inspect
→ Understand
→ Check Governance
→ Check Frozen Scope
→ Plan
→ Implement
→ Test
→ Review
```

- **Inspect**：检查分支、工作树、现有文件、同类实现和未提交成果。
- **Understand**：确认目标、范围、禁止事项、验收与回退点。
- **Check Governance**：确定任务所在层级、canonical source 和适用标准。
- **Check Frozen Scope**：搜索并核对 FROZEN；需要变化时切换到 Change Proposal，不直接实现。
- **Plan**：列出拟改文件、最小步骤、风险与验证；多步骤任务先计划。
- **Implement**：只改批准范围，不顺手重构、删除旧规范或扩展产品功能。
- **Test**：运行与风险匹配的检查，记录实际结果和未覆盖项。
- **Review**：按 [Review Protocol](docs/english-thinking-os/governance/REVIEW_PROTOCOL_V1.md) 检查越权、静默变化、重复真源与回归。

## 任务开始前必须回答

1. 当前任务属于哪一层？
2. 是否碰 FROZEN？
3. 当前 Source of Truth 是什么？
4. 是否已有同类实现？
5. 是否需要 Change Proposal？
6. 完成后如何验收？

答案必须基于仓库证据。无法确认 canonical authority 或冻结边界时，只能继续只读审计和证据收集，不得修改受控内容。

## 修改边界

- 保持最小 diff；只修改当前任务直接相关文件。
- 内容真源与 UI/Derived 输出分离；表现层不得造义或反向修改语义。
- 不创建第二套 Source of Truth；发现相似规范时先标明 Canonical、Superseded、Deprecated 或 Reference Only 的建议处理。
- 不删除、覆盖或批量重命名历史文件来完成治理统一。
- 不修改 FROZEN、schema、核心术语、课程主轨或项目级治理语义，除非已有批准的 [Change Proposal](docs/english-thinking-os/governance/CHANGE_CONTROL_V1.md)。
- 不读取或写入密钥、Token、Cookie、真实资金账户信息；不执行真实交易。

## 交付门禁

- 报告实际改动、原因、验证证据、已知限制和下一步。
- 文档任务至少检查结构、内部链接、canonical 冲突和状态标记。
- 代码/数据/页面任务运行对应自动检查和关键人工路径；测试通过不代替 Reviewer 或 Owner 验收。
- T3+ 记录独立 Review；Reviewer 不可用时明确写“未完成”，不得把 Builder 自查冒充独立审查。
- 不自动 push 或 merge `main`。
