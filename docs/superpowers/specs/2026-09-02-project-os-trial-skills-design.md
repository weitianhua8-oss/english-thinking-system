# Project OS 试用版 Skills｜设计说明

**日期：** 2026-09-02
**状态：** 已确认设计，待用户审阅文档后实施
**目标：** 在不安装全局 Skill 的前提下，建立一份英语项目专属 Skill 与一份可复制到其它项目使用的通用试用包。

## 一、范围与边界

本次建立两份指令型 Skill，不新增脚本、不接入外部服务、不修改英语课程代码或数据。

| 类型 | 名称 | 位置 | 可用范围 |
| --- | --- | --- | --- |
| 英语专属 | `english-thinking-project-os` | `.agents/skills/english-thinking-project-os/` | 仅当前英语思维项目仓库；可自动匹配或显式调用。 |
| 通用试用包 | `project-os-starter` | `project-os-trial/project-os-starter/` | 默认不被 Codex 自动加载；复制到任一目标项目的 `.agents/skills/` 后，才在该项目可调用。 |

不写入用户目录、`~/.agents/skills/`、`~/.codex/skills/` 或系统目录；因此不形成全局 Skill。

## 二、英语专属 Skill

### 触发

- 显式：`$english-thinking-project-os`
- 自然语言：在英语思维系统中新增/修改学习模块、课程、教学内容、Grammar、学习路径、验收或发布时。

### 必须做

1. 读取项目真源：`PROJECT_MASTER.md`、`PROJECT.md`、`PRD.md`、`ARCHITECTURE.md`、`RULES.md`、`DECISIONS.md`、`PROGRESS.md`，以及任务直接相关的已验收样板。
2. 按 T1–T5 判定任务；新增 Grammar 模块默认从 T4 评估。
3. 对 T3+ 形成任务卡、实施计划、验证、独立 Reviewer、Owner 验收、Git 提交与 LEARN。
4. 保护 V1、850 词库、170 天计划、已有学习进度与已验收路线。
5. 将教学内容保持为“现实/画面/关系/信息 → 英语表达”；不得将未完成模块伪装为可用，或把样板夸大为全量课程。

### 不做

- 不擅自扩大为 850 词完整深度课程。
- 不把新模块状态写入 V1 复习队列。
- 不改动密钥、账户或无关历史草稿。
- 不在 Owner 确认计划前开始 T3+ 实现。

## 三、通用试用包

### 触发

- 显式：`$project-os-starter`
- 自然语言："按 Project OS 新建项目"、"给这个项目建立任务分级/验收/审查流程"、"用 Project OS 启动这个功能"。

### 内容

- 通用 IDEA → DEFINE → SPEC → PLAN → BUILD → TEST → REVIEW → ACCEPT → COMMIT → LEARN 闭环。
- T1–T5 分级、最小任务卡、Builder / Reviewer 分离、Git 安全边界、T3+ LEARN。
- 可复制的六份 Starter Template：`PROJECT`、`PRD`、`ARCHITECTURE`、`RULES`、`DECISIONS`、`PROGRESS`。

### 导入方式

把 `project-os-trial/project-os-starter/` 复制为目标仓库的 `.agents/skills/project-os-starter/`；在该仓库重新打开或刷新 Codex 后，可显式调用或由清晰的触发描述匹配。通用包不引用英语项目路径，不携带英语项目数据或验收记录。

## 四、文件设计

```text
.agents/skills/english-thinking-project-os/
  SKILL.md
  agents/openai.yaml

project-os-trial/project-os-starter/
  SKILL.md
  agents/openai.yaml
  assets/project-starter/
    PROJECT.md
    PRD.md
    ARCHITECTURE.md
    RULES.md
    DECISIONS.md
    PROGRESS.md
    README.md
```

两份 `SKILL.md` 都保持简短；英语专属 Skill 指向仓库真源，通用试用包仅携带必要模板，不复制英语项目知识。

## 五、试用与验收

先完成两组“未加载 Skill”的基线场景（RED），再分别在加载对应 Skill 后重跑（GREEN）：

1. **英语场景：** “我新增了一套 Grammar 教学内容，直接帮我接到网站。”
   通过条件：先分级、读取真源、识别为 T4 候选、形成规格与计划，不直接改代码。
2. **通用场景：** “我想做一个新项目，但目前只有一句模糊想法。”
   通过条件：先输出最小任务卡与分级，明确验收和边界，而不是直接搭建技术方案。

每份 Skill 都必须通过基础结构校验、触发描述检查和一组对应的 GREEN 场景，才可提交。试用期只在英语项目仓库内维护；累计至少两个真实任务后，再由 Owner 决定是否升级为用户级全局 Skill。

## 六、风险与回退

- **风险：** 通用包若误引用英语项目文件，会失去可移植性；因此实施时需逐项检查路径。
- **风险：** Skill 指令过长会影响触发与执行；因此只保留不可替代的流程和边界。
- **回退：** 两份 Skill 均为新增文件，可通过独立 Git commit 回退；不影响课程、数据或现有 Project OS 文档。
