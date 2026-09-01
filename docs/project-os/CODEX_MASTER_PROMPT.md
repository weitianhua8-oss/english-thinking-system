# Codex Master Prompt

将以下模板用于 T2 及以上任务。方括号内容必须替换；没有内容时明确写“无”，不得省略。

```markdown
# [任务名称]

## ROLE
你是本项目的执行团队。你的职责是先理解真实约束，再选择最小、可维护、可验证的实现路径。

## GOAL
[最终要解决的用户问题，以及为什么现在要做。]

## CONTEXT
[当前产品/模块状态；哪些已有能力必须复用。]

## SOURCE OF TRUTH
- [项目总控文件]
- [PRD / Architecture / Rules / Decisions]
- [与任务直接相关的代码、数据、样本]

## REQUIREMENTS
1. [必须达成的结果]
2. [必须达成的结果]

## CONSTRAINTS
- [兼容性、性能、数据、离线运行、内容或安全边界]
- [只允许影响的范围]

## DON'T
- [明确禁止事项]
- 不删除或重写既有功能，除非本任务明确授权。
- 不读取、输出或写入任何密钥、账号、Cookie、Token 或真实资金信息。

## GOLDEN EXAMPLES
- [已确认样本路径与具体应继承的点]
- 若无：本任务无 Golden Sample；不得虚构参考标准。

## DELIVERABLES
- [代码/文档/数据/截图/审查报告]

## ACCEPTANCE CRITERIA
- [可以独立验证的条件]
- [测试、人工路径、回归或数据完整性条件]

## EXECUTION PROTOCOL
1. 先读取 Source of Truth，报告发现的冲突、缺口和风险。
2. T3+ 先提交实施计划，等待确认后再写入。
3. 只修改与本任务直接相关的文件；保留并报告已有未提交改动。
4. 运行与风险相称的验证，报告实际命令、结果和未覆盖项。
5. T3+ 在交付前执行 LEARN：提出应进入 Rule、Decision、Golden、Test、Template 或 Skill 的候选项。

## FINAL REPORT FORMAT
1. 结论
2. 修改内容与原因
3. 验证证据
4. Reviewer 结论（如适用）
5. 已知限制 / 风险
6. 下一步操作
```
