# English Thinking System｜PROJECT

**状态：** Derived Compatibility Summary

**Canonical governance：** [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)、[INSTRUCTION_HIERARCHY_V1.md](docs/english-thinking-os/governance/INSTRUCTION_HIERARCHY_V1.md)

**Canonical project mission：** [01_PRODUCT_NORTH_STAR.md](docs/english-thinking-os/01_PRODUCT_NORTH_STAR.md)

**版本：** Project OS 接入版 v1.0
**Owner：** 项目 Owner
**最后更新：** 2026-09-01

> **兼容摘要（2026-09-02）：** 当前品牌、世界观与长期目标以 [01_PRODUCT_NORTH_STAR.md](docs/english-thinking-os/01_PRODUCT_NORTH_STAR.md) 为准；本文件保留项目级摘要和既有边界。

## 使命

为英语零基础、低基础学习者与儿童建立一套“先形成英语概念、画面和关系，再理解与表达”的学习系统，而不是把英语学习缩减为中文翻译和孤立释义记忆。

核心路径：

```text
真实世界 / 核心画面 → 英语底层逻辑 → 含义自然生长 → 场景应用 → 知识连接 → 主动输出
```

## 目标用户与核心价值

- **目标用户：** 英语零基础、低基础学习者与儿童；内容和界面应允许他们在没有复杂术语预备知识时学习。
- **核心问题：** 传统“英文 → 中文 → 背词义”路径难以形成可迁移的英语概念与表达能力。
- **核心价值：** 以核心本源、画面、底层逻辑、真实场景和知识连接，帮助学习者从认识走向理解、听说会用与长期记住。

## 产品原则

1. 英语思维内容逻辑优先于页面、图卡和课程表现；所有表现层服务于理解。
2. 解释词汇优先说明核心本源、核心画面和意义生长，不堆砌孤立中文释义。
3. 一个学习步骤只承担一个主要认知任务；先样板验证，再小批量扩展。
4. 3D 图卡用于理解一个知识点，知识网络用于连接多个知识点。
5. 项目以可离线使用、无登录、无云同步、无大型框架为当前运行边界。

## 不可变边界

- 保留 `data/vocabulary_850.json` / `.csv` 的 850 个精确词形、ID、分级与已有字段；`may` 与 `May` 不得被合并。
- 保留 `data/learning_plan_170days.csv` 的 170 天、850 个唯一学习槽位和既有顺序。
- 不破坏 V1 的 50 词学习闭环、复习逻辑、词库、进度与 localStorage 兼容性。
- V2 只以新增 schema、映射和入口渐进扩展，不反向覆盖原始词库或伪装未完成内容。
- 3D 图卡不得依赖“诺诺”或其他固定角色/IP；未生成图片时课程必须保持文字可读。
- 项目仓库是长期可信来源；聊天记录不能替代项目文档。

## 成功定义

- 学习者能在核心课程中先理解“画面与关系”，再看到英语形式、例句和应用。
- V1 的稳定体验始终可离线运行；V2 新能力在明确样板、验证和验收后才扩大范围。
- 850 词库、170 天计划、学习进度和既有课程不因新增能力发生数据漂移。
- 项目中的关键产品、架构和规则决定可以由文档与 Git 历史追溯，而非依赖聊天记忆。

## 文档真源与优先级

1. Owner 对当前任务明确确认的验收标准。
2. [英语专属 Project OS](docs/english-thinking-os/PROJECT_OS.md) 与其中的 [冻结决策](docs/english-thinking-os/09_DECISIONS.md)。
3. 已确认的 Golden Sample 与独立审查记录。
4. 本文件及 `RULES.md`、`DECISIONS.md`、`PRD.md`、`ARCHITECTURE.md`、`PROGRESS.md` 的兼容摘要。
5. `PROJECT_MASTER.md`、`ROADMAP.md` 与旧计划：历史证据，不覆盖当前英语专属真源。
