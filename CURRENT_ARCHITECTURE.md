# English Thinking System｜当前架构审计

> 审计日期：2026-08-20
> 审计范围：`feature/v2-knowledge-network` 开发分支；仅记录现状，不改变产品行为、850 词数据或目录结构。
> 审计结论：项目已有可运行的 Level 1 离线学习闭环、完整 850 母词与 170 天计划，以及 13 个 V2 三层/知识网络样板。下一步应新增“英语如何组织画面”的基础课程与训练能力，并以小批量样板验证，不能把 850 词库误当作 850 份深度课程。

## 1. 版本、分支与运行方式

| 项目 | 当前事实 | 处理原则 |
| --- | --- | --- |
| V1 稳定版 | `main`，提交 `f7295c9` | 只做缺陷修复；不用于本轮课程架构实验。 |
| V2 开发版 | `feature/v2-knowledge-network`，当前工作区 `.worktrees/v2-knowledge-network/` | 本轮审计和后续小步实现的唯一工作分支。 |
| 项目合流 | 已有 `integration/project-unification` 分支与远程历史 | 合流属于既有 Git 治理 P0；不可与本文件定义的“课程升级 P0”混淆。 |
| 运行方式 | 静态 HTML/CSS/JavaScript；打开 `website/index.html` 可离线运行 | 不引入服务端、账号体系或大型框架。 |
| 自动验证 | Node 内置测试：`node --test website/app.test.js` | 维持现有无依赖测试方式，并在新增模块时扩展。 |

## 2. 当前技术架构

### 2.1 页面与路由

入口为 `website/index.html`，以经典脚本顺序加载：

```text
data.js → v2-data.js → v2-network.js → app.js
```

`website/app.js` 维护单页状态和渲染分发，现有视图为：

| 视图 | 职责 | 当前覆盖 |
| --- | --- | --- |
| 今日学习 | 选择 Level 1 Day 1–10、展示每日 5 词 | 可用 |
| 课程页 | V1 课程或 V2 三层课程 | Level 1 50 词；其中 13 个有 V2 样板层 |
| 今日复习 | 翻卡、学习反馈、到期复习 | 可用 |
| 50 词库 | 搜索、系统/等级/掌握度筛选 | Level 1 50 词 |
| 知识树 / 易混对比 | 基于 Level 1 数据浏览关系 | 可用 |
| 知识网络 | V2 样板节点的系统、关系与探索路径 | 13 个节点 |
| 学习进度 | 掌握度、连续学习、按日完成量、重置 | 可用 |

事件以 `#app` 单一 click delegation 处理；动态内容通过 `escapeHtml/html` 转义。学习进度保存于浏览器 `localStorage` 键 `english850_level1_progress_v1`，并有损坏数据清洗与存储失败降级。

### 2.2 V1 学习闭环

`website/data.js` 提供 50 词、50 课和 10 天学习子计划；`website/app.js` 提供：

```text
今日学习 → 打开课程 → 学习反馈 → 间隔复习 → 进度查看
```

反馈 `again / unsure / understood` 对应 1 / 3 / 7 / 14 / 30 天复习节奏。V1 的普通课程内容由 `lesson` 字段组织：核心画面、底层逻辑、例句、对比、记忆钩子、关联词。

### 2.3 V2 三层与知识网络

| 文件 | 职责 | 已有能力 |
| --- | --- | --- |
| `website/v2-data.js` | V2 学习内容与关系数据 | 4 个认知系统、13 个样板节点、Quick/Deep/Network 内容。 |
| `website/v2-network.js` | 图数据校验与安全探索 API | 节点、系统、关系校验；只返回可探索的完整边；探索路径辅助。 |
| `website/app.js` | 三层学习工作台和思维导图渲染 | 快速理解/深度学习/知识网络切换；关系选择、继续探索、返回路径。 |
| `website/styles.css` | 响应式学习/网络界面 | 宽屏三栏；1180px 以下逐层阅读；关系颜色语义化。 |

已覆盖的样板节点：

```text
空间关系：AT / ON / IN / TO / INTO
状态与动作：BE / -ING / TOO...TO...
信息结构：THE / IF
注意力：SEE / LOOK / WATCH
```

三层的现状：

- Layer 1：核心画面、核心意义、本源、典型例句、记忆钩子。
- Layer 2：底层逻辑、场景组（标题/解释/例句）、结构、中文易错点、学习建议。
- Layer 3：上位系统、直接生长、组合关系、易混对比；每条显示学习者可见解释。

知识网络宽屏为“系统 → 当前节点/真实分支 → 解释面板”；窄屏为“系统 → 词条 → 详情”。同一目标的不同关系以稳定关系键区分，避免组合关系与易混关系互相覆盖。

## 3. 数据资产与内容覆盖

### 3.1 Canonical 数据

| 数据 | 路径 | 现状 | 约束 |
| --- | --- | --- | --- |
| 母词库 | `data/vocabulary_850.json` / `.csv` | 850 个精确词形：S80、A200、B570 | 绝不批量替换；`may` 与 `May` 是不同知识点。 |
| 170 天计划 | `data/learning_plan_170days.csv` | 170 天 × 5 槽位 = 850；每词一次 | 保留顺序与精确词形；网页尚未接入完整 170 天日历。 |
| Level 1 深度课程 | `data/level1_lessons.json`、`content/Level1_50个骨架词完整教程.md` | 50 个完整教程 | 是质量基线，先审查再渐进增强。 |
| Level 2–5 地图 | `content/Level2-5_课程地图与生产队列.md` | 有生产队列，无 800 词深度正文 | 不能宣传为已完成课程。 |
| V2 样板数据 | `website/v2-data.js` | 4 系统、13 节点 | 后续 schema 应兼容并迁移，不替换原词库。 |
| 3D 图卡清单 | `website/assets/cards/manifest.json` | 50 个生产提示/视觉说明 | 实际 PNG 目前仅有少量试验资产，尚未完成课程图卡读取与缺图回退。 |

### 3.2 已有内容规范

- [英语专属 Project OS](docs/english-thinking-os/PROJECT_OS.md)：当前教学与产品真源；`PROJECT_MASTER.md` 保留为历史产品证据。
- `skills/english-thinking/SKILL.md`：单词内容的核心本源、画面、逻辑、场景、关系规范。
- `skills/3d-knowledge-card/SKILL.md` 与 `visual/3d-card-standard/BE-reference/STYLE_GUIDE.md`：3D 图卡标准；禁止把固定角色/IP 作为图卡必需元素。
- `data/vocabulary.schema.json`、`data/LEARNING_LAYERS.md`、`data/golden-learning-layers.v1.json`：渐进增强、三层内容和黄金样本的基础约束。

## 4. 可直接复用的内容

| 范围 | 可复用资产 | 后续用途 |
| --- | --- | --- |
| 学习状态 | `applyFeedback`、到期复习、完成度、连续学习、本地存储清洗 | 新模块只接入同一进度接口，避免另建一套档案。 |
| 课程容器 | V1 lesson、V2 `renderV2LessonWorkspace`、语义区块和回顶按钮 | Culture、Camera、Sentence、Grammar 采用同一可访问容器与反馈模式。 |
| 三层数据 | V2 Quick/Deep/Network 的字段与校验 | 作为词汇增强的最小可行合同，不覆盖 legacy 数据。 |
| 关系系统 | 四类关系、`validateGraph`、`explorableRelations`、探索路径 | 扩到 50/850 节点时保持“有解释才连线”。 |
| 数据验证 | 850/170 天/Level/V2 节点/关系的 Node 测试 | 为新课程、训练题、难度依赖增加精确断言。 |
| 3D 图卡 | manifest、生产脚本、视觉规范 | 先用 5 张试产验证，再在课程页安全显示。 |
| 响应式设计 | 1180px 网络逐层阅读、900px 课程三等分标签、焦点样式 | 新训练流程遵守一屏一个主要认知任务。 |

## 5. 需要新增或适配的能力

| 目标 | 新增/适配边界 | 不能做成什么 |
| --- | --- | --- |
| 学习路线 | 首页增加阶段路线、当前站、推荐下一步；保留现有 50 词入口 | 不能一次替换掉 V1 导航或假装全部开放。 |
| Culture | 5 节短课程：语言差异、中文语境、英语显式关系、同图两种拍法、非优劣声明 | 不能写成民族性格或文化决定论。 |
| Camera | Focus → Action/State → Object/Relation → Expansion 的交互样板 | 不能训练逐词中译英。 |
| Sentence | 从最短句到一项背景信息的逐层搭建 | 不能先灌输术语或口诀。 |
| Grammar | “画面信息变化 → 标记 → 正式名称”的小型模块 | 不能变成规则墙。 |
| Scene Training | 题目 schema、难度、唯一新增变量、依赖、反馈、重练与复习链接 | 不能一次塞多个新知识；不能只有正误分数。 |
| 850 词增强 | 只为高价值词增加可选字段/映射，不更改 canonical 原字段 | 不能批量生成浅层中文释义或伪关系。 |
| 图卡接入 | manifest 到课程页的安全读取、真实图片和文字回退 | 不能把未生成图片标为完成。 |

## 6. 不可重构或必须受保护的部分

1. `data/vocabulary_850.json`、`data/vocabulary_850.csv` 的 850 个词形、ID、分级、Level 与现有字段。
2. `data/learning_plan_170days.csv` 的 170 天与每词唯一排程。
3. V1 已有 50 个 Level 1 教程、10 天学习路径、词库/复习/进度流程和 localStorage 键。
4. V2 已验证的三层学习、关系真实性校验、探索路径、响应式网络逻辑。
5. `main` 稳定分支；所有升级先在 V2 分支完成、验收后才允许讨论合并。
6. 既有目录结构、无框架离线运行方式、无登录/无云同步边界。

## 7. 当前风险与处理策略

| 风险 | 表现 | 处理策略 |
| --- | --- | --- |
| 范围膨胀 | 一次制作 800 词深课、850 张图卡或完整训练引擎 | 每阶段只交付一个可用样板；在停机复盘点由人工决定扩大。 |
| 数据漂移 | 新 schema 反向覆盖词库或计划 | 新增映射/补充数据；以词形或稳定 ID 引用；写完整性测试。 |
| 教学误导 | 把语言倾向说成绝对规律、文化强因果或唯一翻译 | 每节内容审查“倾向/例外/非优劣”措辞；黄金样本先人工审核。 |
| 伪知识网络 | 因词性或中文近义随意连边 | 仅使用四类正式关系，并要求可见解释与目标存在。 |
| 进度割裂 | 新模块另建进度格式，导致用户历史失效 | 将新能力映射到现有 profile 的扩展字段；解析器保持向后兼容。 |
| 移动端负担 | 复杂导图/练习在窄屏被切碎或溢出 | 每阶段检查 1920 / 1180 / 1024 / 375 宽度的关键路径。 |
| 图卡可用性 | 图片缺失或文字错误导致课程不可读 | 先实现文字回退；图卡生产经过人工验收后再设置为可用。 |

## 8. 当前验证基线

审计时确认的基线：

```bash
cd .worktrees/v2-knowledge-network
node --test website/app.test.js
node --check website/app.js
node --check website/data.js
node --check website/v2-data.js
node --check website/v2-network.js
node scripts/build_level1_card_manifest.js
git diff --check
```

自动测试覆盖数据数量、学习反馈、筛选、V1/V2 路由、HTML 转义、进度防御、图关系校验、三层切换、导图关系选择与响应式关键选择器。它不能替代真实浏览器验收，尤其不能替代图卡可读性和新训练的教学体验验证。

## 9. 审计后的决策

本轮不应直接进入 850 词批量扩写。正确顺序是：先建立学习信息架构和 1 个端到端基础样板（Culture + Camera + 简单 Scene Training），再把词汇、句子、语法和图卡按小批量接入。详见 [V2_UPGRADE_PLAN.md](V2_UPGRADE_PLAN.md)。
