# English Thinking System｜Project OS Reset 设计规格

**日期：** 2026-09-02

**任务等级：** T4

**状态：** 已确认设计，待 Owner 审阅规格后进入实施计划
**范围：** 文档真源重置；不修改网站、课程内容、词库、学习计划或学习进度。

## 1. 目标

解决项目状态漂移：教学原则、已验收样板、后续路线和关键决策不能只存在聊天、旧路线图或零散规范中。

建立两层但均处于试运行的治理结构：

1. `docs/project-os/` 保留为跨项目可复用的 Project OS v1.0 试行规范；它不是全局强制规则。
2. `docs/english-thinking-os/` 成为英语思维 850 的教学与产品真源。英语项目内发生冲突时，以该目录的入口文件及其引用文件为准。

原则：**State over Prompt。** 提示词、Skill 和页面只消费已记录的项目状态，不能自行创造或覆盖项目状态。

## 2. 非目标与边界

- 不删除、移动或重写 850 词库、170 天计划、V1 学习闭环、V2 代码或已有样板内容。
- 不把已确认方向伪装为已完成课程或代码。
- 不在本任务实现 Grammar、复习机制改造、850 词批量扩写或页面重做。
- 不把英语教学规则提升为所有项目的全局硬规则。
- 旧文档保留为历史证据；只增加状态标识和指向新真源的链接。

## 3. 文档架构

新增目录：

```text
docs/english-thinking-os/
├── PROJECT_OS.md
├── 01_PRODUCT_NORTH_STAR.md
├── TEACHING_OS_V2.md
├── 03_LEARNING_OBJECTS.md
├── 04_CURRICULUM.md
├── 05_MASTERY_MODEL.md
├── 06_QUALITY_GATES.md
├── 07_DESIGN_SYSTEM.md
├── 08_CURRENT_STATE.md
├── 09_DECISIONS.md
├── 10_RISKS.md
└── 11_NEXT_ACTIONS.md
```

`PROJECT_OS.md` 是入口和优先级声明，不重复各主题内容；其“02 Teaching OS”直接指向唯一的 `TEACHING_OS_V2.md`，避免两个版本并存。

### 3.1 各文件责任

| 文件 | 只回答什么 | 主要内容 |
| --- | --- | --- |
| `PROJECT_OS.md` | 真源在哪里、冲突如何处理 | 适用范围、优先级、状态更新时间、导航、变更规则 |
| `01_PRODUCT_NORTH_STAR.md` | 产品为什么存在 | 品牌核心、目标学习者、Language ≠ Translation、产品成功定义 |
| `TEACHING_OS_V2.md` | 如何从现实走向可迁移表达 | WORLD → SEE → FOCUS → GROW → READ → CREATE → CONNECT → REVIEW 的学习者动作、产出、边界和模块映射 |
| `03_LEARNING_OBJECTS.md` | 系统由哪些教学对象组成 | Grammar Camera、English Thinking Skill Pro、Word Image Pro、知识卡、知识网络、课程页面的职责边界 |
| `04_CURRICULUM.md` | 学什么、按什么顺序发展 | S80/A200/B570、样板到小批量扩展、课程范围声明 |
| `05_MASTERY_MODEL.md` | 什么叫真正掌握、如何复习 | 掌握度证据、复习方向、当前实现与目标机制的差异 |
| `06_QUALITY_GATES.md` | 新课程/Skill/页面如何过教学质量门 | G1–G7、检查表、证据要求、A+ 金课程判断 |
| `07_DESIGN_SYSTEM.md` | 表现层必须服务什么 | 3D 知识卡、Word Image、知识网络左→右、无 Simple Mind Map、认知负荷约束 |
| `08_CURRENT_STATE.md` | 当前实际做到哪里 | 已实现/已验收/已确认方向但未实现/计划中/未知证据，全部可追溯 |
| `09_DECISIONS.md` | 哪些决策被冻结、为何不能自行改变 | 十条冻结决策、Owner、变更所需教学证据与决策记录 |
| `10_RISKS.md` | 哪些问题不能被掩盖 | 内容准确性、范围膨胀、完成度误报、进度兼容、自动化缺口 |
| `11_NEXT_ACTIONS.md` | 下一个最小且可验收的动作是什么 | 当前阻塞、建议优先级、每项任务的进入条件 |

## 4. Teaching OS V2

教学母架构的规范顺序为：

```text
WORLD → SEE → FOCUS → GROW → READ → CREATE → CONNECT → REVIEW
```

| 阶段 | 学习者动作 | 必须形成的可见产出 | 不应做什么 |
| --- | --- | --- | --- |
| WORLD | 回到一个可观察的现实情境 | 可指认的人、物、动作、状态、关系或背景 | 从中文逐词倒推英语 |
| SEE | 看见与任务有关的具体信息 | 对画面的观察结果 | 让学习者先背术语 |
| FOCUS | 选择本次镜头的对象或关系 | 一个明确焦点 | 同时塞入多个认知任务 |
| GROW | 从核心画面长出英语逻辑与用法 | 核心逻辑、意义生长、反例或边界 | 用互不相干的释义硬拼统一解释 |
| READ | 在真实英语中识别已经理解的关系 | 可读、可解释的例句或短语 | 把阅读变成单纯翻译题 |
| CREATE | 学习者自己补出或生成英语 | 口头、选择后补全、改写或自由表达 | 只让学习者看答案 |
| CONNECT | 把知识连入真实语义网络 | 有解释、可到达的关系边 | 按词性或主题强行连线 |
| REVIEW | 按掌握证据重遇并再调用 | 基于理解和输出表现的复习动作 | 仅按固定天数机械重复 |

Grammar Camera 是语法模块的核心隐喻：先用镜头观察意义、主体、动作、状态和关系，再在需要时命名语法形式。对应原则为 **Meaning First → Grammar Name Later**。

## 5. 教学 Quality Gates

所有新课程、教学 Skill 与学习页面都必须在任务卡和审查中逐项回答 G1–G7：

| Gate | 问题 | 最低证据 |
| --- | --- | --- |
| G1 Truth | 语言知识是否准确，避免伪词源和过度概括？ | 来源/边界说明、反例或审校记录 |
| G2 Image | 学习者能否形成明确现实画面？ | 可描述的画面、对象和关系 |
| G3 Logic | 多个用法能否从同一核心逻辑自然生长？ | 意义生长链与不适用边界 |
| G4 Transfer | 能否推断一个未直接教过的新例子？ | 新例迁移题及解释 |
| G5 Camera | 是否能回到 SEE → FOCUS → GROW → READ → CREATE？ | 模块步骤映射与漏步说明 |
| G6 Output | 是否要求学习者自己生成英语？ | 明确输出任务和判定方式 |
| G7 Cognitive Load | 儿童/小白能否一步一步理解？ | 单步认知任务、术语延后和负荷审查 |

**A+ 黄金课程硬规则：** 任何知识点未通过 G2 或 G4，即使内容丰富，也不能标为 A+ 或收入 Golden Sample。其他 Gate 的未通过项须标为 FAIL 或 WARNING，并在任务验收中明确处理。

## 6. 冻结决策

以下决定写入 `09_DECISIONS.md`，状态为 `FROZEN`：

1. 品牌核心：把英语变成看得见的画面。
2. 世界观：Language ≠ Translation。
3. 核心隐喻：Grammar Camera。
4. 学习 Kernel：SEE → FOCUS → GROW → READ → CREATE。
5. 单词内容大脑：English Thinking Skill Pro。
6. 单词表现层：Word Image Pro 网页组件。
7. 850 体系：保留 S80 / A200 / B570。
8. 知识网络：语义关系优先、左→右、不用 Simple Mind Map。
9. 语法原则：Meaning First → Grammar Name Later。
10. 复习：用户自选新词数量 + 掌握度驱动复习。

冻结不等于永不改变。变更只能在出现明确教学证据后，由 Owner 确认并记录新的 Decision；Builder、Reviewer、Skill 和页面不得静默改变。

## 7. 当前状态记录规则

`08_CURRENT_STATE.md` 使用四种状态，防止完成度漂移：

- **已实现且已验收：** 有代码或内容路径、验证/审查记录和 Owner 验收。
- **已实现待验收：** 有产物，但缺少指定验证或 Owner 确认。
- **已确认方向，未形成产物：** Owner 已作决策，但尚无可追溯的课程、代码或数据实现。
- **计划中：** 尚未开始的任务，不能写成开放能力。

已核实事实：850 母词库、S80/A200/B570 分级、170 天计划、V1 Level 1 50 词课程均存在；Culture、Camera、World、Word Image（ON）和 Sentence 的样板有验收记录；当前 V2 路线的 Grammar 仍标记为 planned。

`Grammar Vision V1.2` 是 Owner 已确认方向，但当前所有工作树中没有独立命名文档或已接入代码。它将记录为“已确认方向，未形成产物”，直到有可追溯课程或实现。

## 8. 旧文档迁移策略

- 保留现有 `docs/project-os/`，将其明确为通用试行治理层。
- 保留 `PROJECT_MASTER.md`、`ROADMAP.md`、根目录六份文档及历史计划，不删除历史证据。
- 在旧文档顶部增加简短状态提示与新真源链接；不复制大段内容。
- `ROADMAP.md` 标为历史路线图，避免其 P0 状态继续被误读为当前状态。
- 根目录 `PROJECT.md`、`PRD.md`、`ARCHITECTURE.md`、`RULES.md`、`DECISIONS.md`、`PROGRESS.md` 保留为兼容性摘要，并链接到英语专属真源中的相应章节。

## 9. 实施步骤

1. 创建 12 份英语专属真源文档，并由入口文件建立唯一导航与优先级。
2. 把现有可验证资产、验收记录和已知限制写入 `08_CURRENT_STATE.md`；不做无证据推断。
3. 将十条冻结决策、G1–G7 和 Teaching OS V2 分别写入唯一负责文件。
4. 更新旧路线图和项目摘要，使其指向新真源且保留历史可追溯性。
5. 执行链接、重复真源、冻结决策和 Quality Gate 完整性检查。
6. 由独立 Reviewer 审查是否夸大完成度、是否遗漏 G2/G4 硬门槛、是否产生冲突优先级。
7. 完成 Owner 验收后，以纯文档 Git commit 建立安全节点；T4 的 LEARN 记录此次状态漂移修复。

## 10. 验收标准

- 新目录完整且 `PROJECT_OS.md` 能定位全部 11 个主题。
- `TEACHING_OS_V2.md` 完整定义八步链路、每步产出和边界。
- `06_QUALITY_GATES.md` 有 G1–G7 和 G2/G4 的 A+ 硬门槛。
- `09_DECISIONS.md` 准确记录十条冻结决策和证据化变更机制。
- `08_CURRENT_STATE.md` 不把方向、样板和全量产品混为一谈。
- 历史文档未被删除，且不再把过期 P0 当作当前状态。
- 不改变 `website/`、`data/`、`content/` 或学习进度逻辑。
- 文档内部链接、文件存在性和术语一致性检查通过。
- Reviewer 报告为 PASS，或未解决项明确标记为风险并由 Owner 接受。

## 11. 风险与处理

| 风险 | 处理 |
| --- | --- |
| 新真源和旧总控并存再次冲突 | 入口文件定义优先级；旧文档只保留历史/摘要职责 |
| 将 Owner 方向误写成实现状态 | 当前状态采用四级状态；无产物即不可标为已完成 |
| 教学 Gate 变成口号 | 每个 T3+ 教学任务卡、Builder 交付和 Reviewer 报告必须逐项引用 |
| 新复习方向误伤 V1 数据 | 本 Reset 只记录方向；任何代码改造另立任务并测试兼容性 |
| Project OS 过早全局化 | 通用层显式标为试行；英语专属层不外溢 |
