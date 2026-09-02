# English Thinking System｜RULES

**用途：** 将现有项目总控、架构审计和已确认设计规范中长期有效的执行约束汇总为可检查规则。
**优先级：** 与 `PROJECT_MASTER.md` 冲突时，以 `PROJECT_MASTER.md` 为准。

> **兼容摘要（2026-09-02）：** 教学验收以 [06_QUALITY_GATES.md](docs/english-thinking-os/06_QUALITY_GATES.md) 为准，表现规则以 [07_DESIGN_SYSTEM.md](docs/english-thinking-os/07_DESIGN_SYSTEM.md) 为准。若与旧 Master 冲突，按 [英语专属 Project OS](docs/english-thinking-os/PROJECT_OS.md) 的优先级裁决。

## 必须做（DO）

| ID | 规则 | 适用范围 | 验证方式 | 来源 |
| --- | --- | --- | --- | --- |
| DO-01 | 先解释核心本源、核心画面和底层逻辑，再给出释义、例句和连接 | 词汇、课程、图卡 | 内容审查能指出每项字段 | `PROJECT_MASTER.md` §3.1 |
| DO-02 | 新模块复用现有学习进度和安全渲染能力，保持向后兼容 | 网站功能 | 旧进度可读取、核心路径回归通过 | `CURRENT_ARCHITECTURE.md` §4/§6 |
| DO-03 | 关系边必须真实、目标存在、学习者可见解释完整 | V2 网络 | 图校验与界面检查 | `CURRENT_ARCHITECTURE.md` §2.3/§7 |
| DO-04 | 先做一个端到端样板，人工验收后再批量扩展 | 课程、图卡、训练 | 任务卡包含范围和停机复盘点 | `V2_UPGRADE_PLAN.md` |
| DO-05 | 网页保持离线、原生、无登录、无云同步 | 技术实现 | 无必需服务端/账号依赖 | `CURRENT_ARCHITECTURE.md` §1 |
| DO-06 | T3+ 完成后执行 LEARN，判断是否新增 Rule、Decision、Golden、Test、Template 或 Skill | 项目治理 | `PROGRESS.md` 有记录或明确无新增 | `docs/project-os/PROJECT_OS.md` |

## 绝不做（DON'T）

| ID | 禁止事项 | 原因 | 适用范围 | 来源 |
| --- | --- | --- | --- | --- |
| DONT-01 | 不批量替换 850 词、ID、等级、Level 或 170 天计划 | 会造成数据漂移和学习顺序损坏 | `data/` | `CURRENT_ARCHITECTURE.md` §6 |
| DONT-02 | 不把词库/计划完整误称为 850 份已完成深度课程 | 会误导用户与生产决策 | 产品文案、路线图 | `README.md`、`docs/10_项目现状与后续安排交接.md` |
| DONT-03 | 不把词性、中文近义或无解释猜测做成知识网络连接 | 会产生伪关系 | V2 图数据 | `PROJECT_MASTER.md` §3.6 |
| DONT-04 | 不将“诺诺”或任何固定角色/IP作为 3D 图卡必要元素 | 与已确认图卡视觉标准冲突 | 图卡、图卡提示词 | `PROJECT_MASTER.md` §3.5；图卡设计规格 |
| DONT-05 | 不让图片缺失、文字错误或视觉装饰妨碍课程理解 | 图卡是理解辅助，不是完成标记 | 图卡接入 | `V2_UPGRADE_PLAN.md` P7 |
| DONT-06 | 不把新模块的进度写入 V1 复习队列，除非明确设计、兼容和测试 | 会伤及既有学习档案 | localStorage / 学习状态 | `CURRENT_ARCHITECTURE.md` §7 |
| DONT-07 | 不以民族性格、文化决定论或唯一翻译解释英语 | 会造成教学误导 | Culture、Grammar、内容生产 | `CURRENT_ARCHITECTURE.md` §5/§7 |

## 已知规则冲突

早期 Level 1 课程与 `prompts/Level1_3D知识图卡生产清单.md` 中仍含“诺诺”表述；此处不擅自重写历史资产。任何启动图卡批量生产的任务必须先以 DONT-04 为验收项，建立单独的修正计划、审查与回归证据。

## 冲突处理

1. 当前 Owner 已确认的任务验收优先；
2. 其后以 `PROJECT_MASTER.md` 为最高产品规则；
3. 规则冲突必须在 `DECISIONS.md` 或任务卡中记录来源、影响和裁决，不能静默选择一份旧文档。
