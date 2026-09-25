# English Thinking System V2｜升级实施计划

**状态：** Reference Only — historical implementation plan

**Current canonical navigation：** [English Thinking Project OS](docs/english-thinking-os/PROJECT_OS.md)；850 Vocabulary 权威见 [data/README.md](data/README.md)

> 计划日期：2026-08-20
> 前置审计：[CURRENT_ARCHITECTURE.md](CURRENT_ARCHITECTURE.md)
> 执行边界：本计划尚未授权任何功能改动。每个阶段必须单独确认、测试、提交和复盘。
> 命名说明：本计划中的 P0–P8 是“课程架构升级阶段”；它不同于 `ROADMAP.md` 中已执行的 Git 项目合流 P0。

**目标：** 在不重建 850 词、不破坏 V1 稳定学习闭环的前提下，逐步补齐“理解英语如何组织世界 → 词汇 → 句子 → 标记 → 场景表达”的学习路径。

**技术策略：** 继续使用静态网页、原生 JavaScript、现有数据与 localStorage。新增内容采用独立 schema/映射和渲染入口；只有经过样板验证的能力才扩展到更多内容。850 词原始数据和 170 天计划始终只读兼容。

**基线：** `feature/v2-knowledge-network`；当前 13 个 V2 三层节点、50 个 Level 1 课程、850 母词与 170 天计划均视为既有资产。

---

## 全局护栏

### 必须保留

- 850 个精确词形、S/A/B、Level 1–5 和 170 天唯一排程。
- V1 今日学习、课程、复习、词库、知识树、易混对比、进度和本地学习记录。
- V2 三层样板、真实关系校验、探索路径、1190px 以下网络逐层体验。
- 现有无依赖、本地可打开的网页运行方式。

### 全阶段统一验收

```bash
cd /Volumes/WorkDisk/英语思维850_V1完整项目/.worktrees/v2-knowledge-network
node --test website/app.test.js
node --check website/app.js
node --check website/data.js
node --check website/v2-data.js
node --check website/v2-network.js
node scripts/build_level1_card_manifest.js
git diff --check
```

每个改动阶段还必须人工检查：1920px、1180px、1024px、375px；核心点击路径；浏览器刷新后的历史本地进度。

### 回滚规则

1. 每个阶段单独分支或独立提交，不在同一提交混入内容扩写、样式重做与数据迁移。
2. 新数据文件只能追加；旧字段与旧 loader 不删除。
3. 验收失败时先回退该阶段提交或关闭新入口；不得用修改 850 母词/170 天计划来掩盖问题。
4. 任意阶段出现“数据完整性、进度兼容、页面不可打开”问题，立即停止下一阶段并回到最近通过全量验证的提交。

## 文件边界总览

| 文件类别 | 本计划的角色 | 首阶段是否修改 |
| --- | --- | --- |
| `data/vocabulary_850.json`、`data/vocabulary_850.csv`、`data/learning_plan_170days.csv` | JSON canonical 词库、CSV Derived compatibility mirror、canonical 排程；本计划均只读 | 否 |
| `website/data.js`、`website/app.js`、`website/styles.css` | 已有 V1/V2 UI 与状态边界 | 仅在获批阶段做最小接入 |
| `website/v2-data.js`、`website/v2-network.js` | 已有词汇三层/网络样板 | 仅 P4 小批量扩展 |
| 新建 `website/v2-curriculum-data.js`（建议） | Culture/Camera/Sentence/Grammar/Scene 样板数据 | P1 后建立；不放进 850 词文件 |
| `website/app.test.js` | 单元与字符串渲染回归测试 | 每个开发阶段先写失败测试 |
| `docs/` | 课程内容审校、阶段报告和决策记录 | 每阶段更新对应说明 |

> 新文件名仅是建议接口。真正实施前需在该阶段设计中确认；不得借此重排现有目录。

## P0｜现状审计与实施契约（本次已完成）

**目的：** 锁定现有资产、版本边界和禁止破坏范围，避免后续把“850 个词条”误做成“850 篇浅内容”。

**产出：**

- `CURRENT_ARCHITECTURE.md`
- `V2_UPGRADE_PLAN.md`

**验收：** 两份文档明确当前覆盖数、可复用项、不可重构项、风险、验证和回滚；Git 差异仅包含文档。

**风险与回滚：** 仅文档变更，删除或回退本阶段文档提交即可；不影响运行时。

## P1｜学习信息架构升级（先做最小导航/路线样板）

**目的：** 让学习者知道自己从“理解差异”走到“词汇/句子/语法/场景表达”的路线，但不替换现有 50 词入口。

**复用：** 现有 `state.view`、导航按钮、`render()`、进度卡、`returnTopButton()`、响应式样式。

**新增：** 一份可配置的课程路线数据；首页/今日学习页的“当前阶段、下一步、已完成”最小展示；未开放模块明确标注“样板准备中”，不可伪装成可学课程。

**拟涉及文件：**

- Create: `website/v2-curriculum-data.js`（路线节点、状态、入口 ID；不存 850 词正文）。
- Modify: `website/index.html`（只增加新数据脚本加载，保持已有脚本顺序）。
- Modify: `website/app.js`、`website/styles.css`、`website/app.test.js`。
- Modify: `docs/09_Level1网站使用说明.md`（如可见入口改变，更新真实说明）。

**TDD 与验证：**

1. 先为路线数据完整性、已开放/未开放入口、旧 `today/library/review` 路由编写失败测试。
2. 只实现数据读取和最小页面入口，再运行 `node --test website/app.test.js`。
3. 在四种宽度检查入口可见、不会覆盖 V1 日学习与进度。

**风险：** 首页拥挤、未完成模块造成误导、导航状态混乱。

**回滚：** 移除新路线入口和数据脚本即可；V1 原导航与当前 V2 网络保持不变。

**停机点：** 用户确认路线文案、模块顺序和“未开放”的呈现后，才进入 P2。

## P2｜Culture 模块：语言信息组织差异（5 节样板）

**目的：** 在进入单词、句子或语法前，建立“语言表达倾向不同，不代表优劣”的直觉。

**最小内容范围：**

1. 语言为什么会不同。
2. 中文常如何依靠语境。
3. 英语常如何利用主体位置、关系和形式标记。
4. 同一画面两种拍法（由核心事件向背景扩展）。
5. 明确中文与英语都有复杂逻辑，禁止优劣论。

**复用：** V2 课程工作台的短内容区块、学习反馈、回顶、HTML 转义与响应式样式。

**新增：** Culture lesson schema（标题、核心问题、短画面/对比、示例、边界提醒、下一步链接）；只增加 5 条人工审校内容。

**拟涉及文件：**

- Modify: `website/v2-curriculum-data.js`。
- Modify: `website/app.js`、`website/styles.css`、`website/app.test.js`。
- Create or Modify: `docs/v2-content-review/Culture.md`（内容审校记录；实施前确认命名）。

**验收：**

- 每节含一个可理解的画面/例句和一个非绝对化提醒。
- 不将贸易、民族性格等写成语言形式的确定因果。
- Culture → Camera 的下一步清晰；刷新、返回、移动端阅读正常。

**风险：** 内容变成长文或产生语言优劣叙事。

**回滚：** 关闭 P1 路线中的 Culture 入口，不改变词汇、复习或 V2 图数据。

## P3｜Camera 模块：英语镜头感（一个端到端训练样板）

**目的：** 用“Scene → Focus → Action/State → Object/Relation → Expansion”代替逐词翻译路径。

**样板范围：** 图书馆或日常简单场景一题，逐步选择焦点、动作、对象/关系、背景；每步只新增一项信息。输出示例从 `The boy is doing homework.` 逐层长成含地点/同伴信息的句子。

**复用：** V2 分层容器、按钮状态、进度反馈、返回顶部与响应式单任务界面。

**新增：** Camera scene schema：`id`、`scene`、`focusChoices`、`actionChoices`、`relationChoices`、`expansionSteps`、`recommendedSentence`、`feedback`、`nextLink`。选择反馈必须解释画面关系，不只给对错。

**拟涉及文件：**

- Modify: `website/v2-curriculum-data.js`。
- Modify: `website/app.js`、`website/styles.css`、`website/app.test.js`。
- Modify: `docs/v2-content-review/Camera.md`（实施前确认路径）。

**TDD 与验证：**

1. 先测试单题状态推进、每一步只有一个新变量、可接受的非唯一表达提示、刷新回退。
2. 实现最少状态与单题 renderer；不引入通用题库引擎。
3. 手工完成完整路径，验证错误反馈、回看、375px 点击区和中文换行。

**风险：** 用“唯一标准语序”替代镜头选择，或在一题中混进多个新词/语法。

**回滚：** 删除/隐藏单题入口与其局部状态；现有三层词汇页完全不受影响。

**停机点：** 人工确认新手是否能说出“先拍谁、发生什么、再补什么”后，才进入 P4/P5。

## P4｜850 词 schema 兼容与渐进升级

**目的：** 为既有词条提供可选英语思维增强字段，并先把高价值 Level 1 词按 A/B/C/D 审查，不批量改写 850 词。

**首批范围：** 先审查 Level 1 的 50 词；优先审校约 20 个骨架词：BE、GET、TAKE、PUT、GIVE、GO、COME、HAVE、DO、MAKE、AT、ON、IN、TO、OFF、SEE、LOOK、WATCH、WITH、OF。

**复用：** `data/vocabulary.schema.json` 的 additive policy、`golden-learning-layers.v1.json`、V2 Quick/Deep/Network schema、`v2-network.js` 的关系校验、3D card manifest。

**新增：** 单独的 enrichment 映射（词形/稳定 ID → `coreImage`、`coreLogic`、`physical/spatial/abstractMeaning`、`confusions`、`memoryHook`、`examples`、`sceneTraining`、`contentStatus`）；A/B/C/D 审查表；关系解释审校字段。

**拟涉及文件：**

- Create: `data/vocabulary_enrichment.v2.json` 或等效新增数据文件（实施前确认）。
- Create: `docs/v2-content-review/level1-audit.md`。
- Modify: `website/v2-data.js` 或新增 adapter；`website/v2-network.js`、`website/app.test.js` 仅在接入时最小修改。
- Do not modify: `data/vocabulary_850.json`、`.csv`、`data/learning_plan_170days.csv`。

**验收：**

- 原始 850 词、等级、Level、170 天计划精确不变。
- 每个已增强词均有来源、状态和审校结论；未增强词继续走现有 V1/legacy 展示。
- 四类关系以解释为前提；不存在/不完整目标不渲染。
- 20 个 A/A+ 后必须人工停机复盘，再决定是否扩到剩余 30 词或 Level 2。

**风险：** 大规模低质生成、伪词源、中文释义型内容、同目标关系覆盖。

**回滚：** 移除 enrichment adapter 或将状态降为 legacy；原始词库和 V1 lesson 不回写。

## P5｜Scene → English 训练引擎（小型可用闭环）

**目的：** 把 Camera 样板扩展为可保存、可重练、可回看的一组渐进训练，而不是完整题库平台。

**第一批内容：** 3–5 道日常场景题，覆盖 L0–L4：主体/动作、对象、属性、空间、时间/频率。每题唯一 `newVariable`，并列出 `prerequisites` 与 `reviewLinks`。

**复用：** Camera 状态推进、localStorage profile、安全渲染、已有词汇 lesson 链接、反馈交互。

**新增：** Scene item schema、尝试记录的可选扩展字段、推荐句与可接受表达说明、失败时的词卡/镜头/标记复习链接。

**拟涉及文件：**

- Modify: `website/v2-curriculum-data.js`、`website/app.js`、`website/styles.css`、`website/app.test.js`。
- Modify: `docs/07_数据结构.md` 或创建补充文档，记录 localStorage 向后兼容策略。

**验收：**

- 不显示完整英文答案直到必要步骤完成。
- 每题可重练、可看到本步新增加的信息、可回到对应词/Camera/Grammar 内容。
- 合理但不同的观察方式不会被误报为“唯一错误”；至少给出推荐原因。
- 旧进度 JSON 能被安全读取，新增字段缺失时不崩溃。

**风险：** 状态机复杂化、进度 schema 破坏、反馈变成只有分数。

**回滚：** 训练入口和新增 profile 字段可忽略；原 `words/studyDates` 格式必须持续兼容。

## P6｜Grammar Marking System（画面标记样板）

**目的：** 让初学者先理解“标记使画面信息更清楚”，后学习规则名称。

**第一批样板：** 过去、进行、完成、BE、单三 `-s`、冠词；每次只做一个“未标记画面 → 加标记后增加的信息”的对比。复杂从句不进入第一批。

**复用：** Camera 的画面分层、词汇的 BE/-ING/THE 节点、V2 三层课程容器、Scene Training 的复习链接。

**新增：** grammar marker schema（基础画面、标记、信息增量、正式名称、关联词、微练习）。

**拟涉及文件：**

- Modify: `website/v2-curriculum-data.js`、`website/app.js`、`website/styles.css`、`website/app.test.js`。
- Create: `docs/v2-content-review/Grammar.md`。

**验收：**

- 每个点先出现信息变化，再出现语法名。
- 标记和 Camera/Scene/词汇节点有实际链接。
- 不新增抽象术语墙；移动端一屏只有一个主要比较。

**风险：** 内容回退成传统规则表，或把 `TOO...TO...` / `to do` 的不同功能混淆。

**回滚：** 关闭 Grammar 路线入口与独立数据；词汇 V2 节点照常运行。

## P7｜首页成长路线整合与 3D 图卡试产接入

**目的：** 将已验证的 Culture、Camera、词汇、句子、标记、场景训练串成可理解的路线；验证 5 张图卡在课程中的真实阅读效果。

**复用：** P1 路线组件、现有每日学习/进度、图卡 manifest、`cardFileName()`、BE 图卡视觉标准。

**范围：**

- 首页或今日页显示：当前站、下一推荐站、已完成与可回看的入口。
- 只试产并人工验收 BE / AT / ON / IN / GET 五张图卡。
- 课程页从 manifest 安全查图；文件缺失时显示已有文字核心视觉，不显示破图。

**拟涉及文件：**

- Modify: `website/app.js`、`website/styles.css`、`website/app.test.js`、`website/assets/cards/manifest.json`（仅经图卡生产流程更新）。
- Add: 五张经批准的 PNG 到 `website/assets/cards/`。
- Modify: `docs/03_3D知识图卡联动规范.md`、`docs/09_Level1网站使用说明.md`（仅同步真实可见行为）。

**验收：**

- 五张图不含固定角色/IP、无多余文字、能解释核心逻辑、在手机可读。
- 图缺失时文字学习不受阻；五张通过人工验收才允许生产其余 45 张。
- 路线不把未开放模块和未生成图卡标记为完成。

**风险：** 视觉标准冲突、图片字错、图片过大拖慢页面、图卡抢走内容重点。

**回滚：** 从 manifest 取消单张资源引用即可回到文字提示；不删除生产源或改写课程正文。

## P8｜QA、内容一致性与发布决策

**目的：** 判断 V2 是否达到“可合入 main / 可发布”的证据门槛，而非只看测试数量。

**检查清单：**

- 850 词与 170 天计划完整性、精确词形、无重复排程。
- V1 全流程：今日学习、词库筛选、课程、复习、进度、两次确认重置。
- V2 全流程：路线 → Culture → Camera → 词汇三层 → 网络关系 → Scene → Grammar → 回看。
- 关系质量：每条边有解释、目标可到达、同目标多关系可独立选择、无伪网络。
- 3D 图卡：5 张人工验收、缺图回退、跨端可读。
- 内容质量：无语言优劣论、无未经证实文化因果、无强制唯一中文翻译排序。
- 浏览器人工验收：1920/1180/1024/375；首次打开、刷新、localStorage 异常、键盘焦点。

**拟涉及文件：**

- Modify: `website/app.test.js`；必要时新增无依赖的浏览器手工验收清单文档。
- Modify: `docs/09_Level1网站使用说明.md`、阶段报告；只记录已经上线的真实能力。

**发布门槛与回滚：**

- 只有 P1–P7 指定范围全部验收、全量测试/语法/diff 检查通过、人工体验签字后，才能提议将 V2 合入 `main` 并打标签。
- 若任一门槛不通过，保留 V1 main，继续在 V2 分支修复；不强行发布。

## 建议的执行顺序与确认点

```text
P0 审计（本次）
  ↓ 用户确认计划
P1 路线最小入口
  ↓ 用户确认路线体验
P2 Culture 5 节样板
  ↓ 用户确认内容语气
P3 Camera 1 个端到端样板
  ↓ 用户确认教学体验
P4 Level 1 A/B/C/D 审查 + 20 个优先词
  ↓ 停机复盘内容质量
P5 Scene 训练 3–5 题
P6 Grammar 标记样板
P7 路线整合 + 5 张图卡试产
P8 QA → 决定是否合并 V2
```

当前建议进入的唯一下一步是：**先设计并确认 P1 的最小学习路线入口。** 这能让新模块有稳定入口，但不触及 850 词数据或现有学习闭环。
