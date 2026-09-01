# 英语思维 850｜Project OS v1.0 接入计划

> 类型：T3 治理接入｜范围：仅新增治理文档与模板，不改产品功能。
> 审查日期：2026-09-01

## 结论

项目已有成熟资产，适合采用“旁路接入、逐步生效”。不重命名或替代既有 `PROJECT_MASTER.md`、`ROADMAP.md`、`CURRENT_ARCHITECTURE.md`、现有 Skill、数据或产品代码。

## 已确认现状

- 静态离线 Web：`website/index.html`、原生 JavaScript、Node 内置测试。
- 产品真源：`PROJECT_MASTER.md`；项目已拥有产品、架构、内容、数据、图卡和交接文档。
- 当前工作分支：`feature/v2-word-image`；另有多个 V2 与集成工作树。
- 850 词、170 天计划、V1 学习闭环、V2 样板、浏览器本地进度均属于受保护资产。
- 当前根工作区有未跟踪的方案、思维导图和图卡目录；本接入不得移动、删除或纳入提交。

## 已知风险

1. 旧课程/提示词保留“诺诺”，而 `PROJECT_MASTER.md` 和图卡标准禁止固定角色。该冲突已在旧交接文档登记；本次只建立治理入口，不改内容。
2. 文档中有历史分支、提交与完成度描述，后续接入的 `PROGRESS.md` 必须标注记录日期，不能把历史状态当实时状态。
3. 图卡 manifest 的生成测试会写入产物文件；在只读环境中会失败。后续应在可写隔离工作树验证，且仅在产物确认变化时提交。

## 接入映射

| Project OS 文件 | 英语思维 850 对应既有真源 | 本轮处理 |
| --- | --- | --- |
| `PROJECT.md` | `PROJECT_MASTER.md` | 保持原文件，后续用模板生成摘要而不替代 |
| `PRD.md` | `docs/01_产品蓝图.md`、`ROADMAP.md` | 后续整理版本目标和未完成边界 |
| `ARCHITECTURE.md` | `CURRENT_ARCHITECTURE.md`、`docs/STRUCTURE.md` | 后续按当前分支更新，不重写历史审计 |
| `RULES.md` | `PROJECT_MASTER.md`、各 Skill/设计规范 | 后续只提炼稳定规则，保留来源链接 |
| `DECISIONS.md` | 架构审计、升级计划、历史文档 | 后续追加可追溯决策，不倒灌全部历史 |
| `PROGRESS.md` | `ROADMAP.md`、交接文档、Git 历史 | 后续从真实分支状态开始维护 |

## 分阶段执行

### Phase 1｜建立治理层（本分支）

- 新增 `docs/project-os/` 的总规范、任务规则、Prompt、Agent、Golden、Skill、Git 和本接入计划。
- 新增 `templates/project-starter/` 的六份空白但可执行模板。
- 验证：Markdown 文件完整、交叉链接可读、模板不含假完成状态、Git diff 仅包含文档。

### Phase 2｜生成英语项目的六份实际文档（单独确认）

- 用既有真源填充 `PROJECT.md`、`PRD.md`、`ARCHITECTURE.md`、`RULES.md`、`DECISIONS.md`、`PROGRESS.md`。
- 每一条规则或决定都链接回原始来源；冲突仅列出，不擅自裁决。
- 验证：不改变产品代码、数据、目录结构；与 `PROJECT_MASTER.md` 的优先级一致。

### Phase 3｜首次实战验证（建议 T3，单独确认）

- 候选任务：对 `feature/v2-word-image` 的 Word Image 样板进行 Builder/Reviewer 独立验收。
- 任务目标：验证 OS 的任务卡、验收、独立审查和 LEARN 闭环；不扩展为 850 词批量生产。
- 产出：任务卡、测试证据、Reviewer 报告、Owner 验收记录、LEARN 更新。

## 本轮验收标准

- Project OS 文件覆盖本计划列出的全部治理主题。
- Starter Template 含六份核心文档且没有项目专属事实。
- 不修改 `website/`、`data/`、`content/`、`skills/` 或既有根文档。
- 不触碰当前根工作区的未跟踪文件。
- 文档工作在独立 `docs/project-os-v1` 分支与工作树中。
