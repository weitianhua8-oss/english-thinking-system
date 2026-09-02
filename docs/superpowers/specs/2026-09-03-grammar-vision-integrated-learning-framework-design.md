# Grammar Vision 融合式学习框架设计

**状态：** 待 Owner 审阅
**日期：** 2026-09-03
**范围：** 第一阶段只定义治理映射、课程审查口径与后续优化路线；不修改页面、课程数据、词库或互动实现。

## 1. 目标

让零基础用户首次进入英语思维系统时，只需回答“今天这一小步学什么”，不必在词汇、语法、听说或课程目录之间自行选择。系统从一个可见的 Scene 开始，逐步建立词义画面、句子 Camera、表达、阅读逆推、知识连接和掌握度驱动复习。

Grammar Vision MVP 是现有项目中 **Grammar Camera 的冻结课程实现**。它细化 `FOCUS`，并连接 `READ` 与 `CREATE`；它不是独立产品，也不替代 Word Image、Project OS 或 Teaching OS V2。

## 2. 真源与边界

| 决策范围 | 真源 | 本设计的关系 |
| --- | --- | --- |
| 项目治理、冻结决策、变更控制 | [PROJECT_OS.md](../../../PROJECT_OS.md) | 最高层；本设计不得覆盖。 |
| 全项目教学母架构、C0–C5、六维掌握度、教学质量门 | [TEACHING_OS_V2.md](../../TEACHING_OS_V2.md) | 全项目能力与质量标准。 |
| Grammar 课程节点、三轨、课程硬规范、学习能力 Gate | [GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md](../../grammar-vision/GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md) | Grammar Vision 课程基线。 |
| 执行状态与后续工作优先级 | [ROADMAP.md](../../../ROADMAP.md) | 后续实施计划应在此落位。 |

本设计不把任何冻结课程规则改写为新的项目总规则。若上述真源间出现教学、产品或治理冲突，先记录冲突并提交 Owner 决策，不自行消解。

## 3. 产品教学框架

完整学习循环保持：

`WORLD → SEE → FOCUS → GROW → READ → CREATE → CONNECT → REVIEW`

儿童端每课体验保持：

`SEE → FOCUS → GROW → READ → CREATE`

### 3.1 默认起点

新用户默认从零开始，不先做诊断分流，也不要求自行选择“词汇”或“语法”路径。起点是短小的 World / Scene 微课：同一现实可被不同语言选择不同焦点，英语学习先看 Scene，不先逐词翻译。

首屏只能突出一项当前任务、一个开始按钮和一句下一步理由。850 词总表、43 节点目录、完整语法目录与未解锁探索入口不作为首次界面主体。

### 3.2 五阶段主路径

| 阶段 | 教学重点 | Grammar Vision 范围 | 主要模块 | 阶段通过证据 |
| --- | --- | --- | --- | --- |
| 0 · Scene 起步 | WORLD + SEE：看见人物、动作、状态与空间。 | Nodes 01–04 | Culture、Word Image 的基础 Scene。 | 能说出一个 Scene 中发生了什么，不要求造句。 |
| 1 · Core Scene | Focus、Event、Required Slot、Core / Layer。 | Nodes 05–14；Control 的 Polarity / Whole Scene Query 种子。 | Word Image、Grammar Vision、Sentence 起步。 | 能识别 Focus 和 Event，并判断当前 Meaning Scene 是否还需要 WHAT / WHERE。 |
| 2 · Target 与关系 | 锁定对象、Chunk、关系原型与路径。 | Nodes 15–26；Missing Slot Query、Direct Mode、Scale Seed。 | Word Image、Grammar Vision、Knowledge Network。 | 能用 Chunk 锁定对象，并以 IN / ON / AT 的画面选择关系。 |
| 3 · 时间与动作包装 | 时间视角、动作视角、Action Pack。 | Nodes 27–35；Modal Seed。 | Grammar Vision、Sound Layer、Sentence。 | 能区分 Pattern / Inside Event，或把动作整体放进更大 Scene。 |
| 4 · 组合、逆推与表达 | Sub Camera、Camera Tree、Sentence X-Ray。 | Nodes 36–43。 | Grammar Vision、Sentence、Sound Layer、Knowledge Network。 | 能 Chunk → Scan → Focus → Lock → Fold → Rebuild，并重新表达 Scene。 |

Knowledge Network 与 Mastery-driven Review 贯穿所有阶段。网络只连接已经建立意义的词、关系和 Camera；复习针对薄弱维度，不机械重复整个课程。

### 3.3 模块协作规则

| 模块 | 在主路径中的作用 | 不承担的职责 |
| --- | --- | --- |
| Word Image Pro | 为词、关系、核心动作提供 Scene、核心画面、含义生长与易混对比。 | 不负责完整句子的 Slots、时间线、Camera Tree 或 English Code。 |
| Grammar Vision | 将 Scene 选择、组织并编码为英语：Focus、Role、Slot、Timeline、Action Pack、Reverse。 | 不为每个词重复制作词义生长课程。 |
| Sentence | 将已理解的 Scene + Camera 变成最小、正确、自然的输出。 | 不脱离 Scene 进行中文模板翻译训练。 |
| Sound Layer | 将声音、节奏、重音与同一个 Scene、Camera、表达绑定。 | 不以孤立发音得分代替理解或表达。 |
| Knowledge Network | 连接可解释的词义、关系、Camera、场景与易混对比。 | 不生成无学习理由的树状导图。 |
| Mastery-driven Review | 根据六维证据安排检索和补强。 | 不把固定日期间隔当作学会的证明。 |

## 4. 用户进入与单课体验

### 4.1 首页导航

首页显示以下四项，按此优先级排列：

1. 当前阶段及一句阶段目标。
2. 今天唯一的 Micro Lesson，包括预计时长和开始按钮。
3. “为什么是这一步”：当前缺少的能力证据或应回收的能力。
4. 次级入口：到期复习、已解锁的词汇画面、我的 Camera 成长。

用户不会因为没有完成特定词数而被阻止推进；系统只在当前能力 Gate 的必要证据缺失时推荐补强。

### 4.2 单课固定节奏

每个 Micro Lesson 遵守 Grammar Vision 的 One New Variable 与单课教学母模板，并向用户呈现为七步：

1. **Scene**：看一个小画面，必要时听一句自然英语。
2. **Notice**：回答一个观察问题，例如“发生了什么？”
3. **One New Variable**：只引入一个新的 Camera 能力。
4. **Word Image / Grammar Camera**：按需要说明词义材料与句子组织，二者共用同一 Scene。
5. **Predict → Reveal**：先预测，再展示英语表达及必要的 English Code。
6. **Create / Reverse**：说一句、选一句，或从短英语重建 Scene。
7. **Next Step**：展示已获得的证据和唯一推荐动作。

术语遵守 `Meaning First → Grammar Name Later`：先出现 Scene、问题与 Camera 变化，后出现 Grammar Name 或 English Code。

### 4.3 错误与下一步路由

每次仅收集一项适合本课的最小掌握证据：SEE、HEAR、UNDERSTAND、DISTINGUISH、CREATE 或 TRANSFER。

| 用户状态 | 系统判断 | 唯一推荐下一步 |
| --- | --- | --- |
| 看懂 Scene，但尚未表达 | SEE / UNDERSTAND 已建立，CREATE 不足。 | 同一能力的输出支架。 |
| 分不清两个选择 | DISTINGUISH 不足。 | 回到对比 Scene，而非重学整课。 |
| 意义或角色不匹配 | Meaning Error 或 Role Error。 | 打开 Scene 或 Slot 问题。 |
| Camera 正确但形式错 | Code Error。 | 提醒检查 English Code。 |
| 不规则形式或约定记不住 | Convention / Recall Error。 | 进入针对性记忆复习，不重讲意义。 |

## 5. 能力 Gate 与质量门的双层使用

Grammar Vision 的 G1–G7 是学习者达到的能力里程碑；Teaching OS V2 的 G1–G7 是教学资产进入开发或发布前必须通过的质量门。两套 Gate 同名但不同义，后续数据、页面和文档必须使用完整名称，不能只写“G4”。

| Grammar Vision 学习能力 Gate | 对应全项目能力趋势 | 教学资产最低审查重点 |
| --- | --- | --- |
| GV-G1 Required Slot、GV-G2 Core vs Layer | C1 → C2 | TO-G2 Image、TO-G3 Logic、TO-G5 Camera。 |
| GV-G3 Mini Camera、GV-G4 Relationship Prototype | C2 → C3 | TO-G2 Image、TO-G4 Transfer、TO-G5 Camera。 |
| GV-G5 Timeline View、GV-G6 Packaging | C3 | TO-G3 Logic、TO-G5 Camera、TO-G7 Cognitive Load。 |
| GV-G7 Sentence X-Ray | C4 → C5 | TO-G4 Transfer、TO-G6 Output、TO-G7 Cognitive Load。 |

其中 `TO-G1` 至 `TO-G7` 表示 Teaching OS 质量门，`GV-G1` 至 `GV-G7` 表示 Grammar Vision 学习能力 Gate；命名用于后续设计与实现，不能改变任何既有冻结规则。

## 6. 第一阶段审查交付物

第一阶段不进入工程改造，依次产出以下审查资产：

1. **43 节点接入矩阵**：每个节点标注所在阶段、前置能力、可复用的现有词汇/课程资产、所需 Micro Lesson 类型、Return Hook 与当前状态。
2. **资产状态台账**：每项只可标为“已实现”“已验证”“已确认方向”或“planned”；禁止将 FROZEN 课程设计标为已上线。
3. **Gate 对照清单**：为每个阶段列出 GV 学习 Gate、C0–C5 证据、六维掌握证据与 TO-G1–G7 审查项。
4. **冲突与缺口报告**：只记录经证据确认的重复、缺失、术语冲突、数据字段缺口与页面流程缺口；涉及真源冲突时停止并提交 Owner 决策。
5. **分期实施路线图**：先做阶段 0–1 的内容黄金样板与学习路径验证，再逐阶段扩展；每一阶段通过审查后才规划页面或数据改动。

## 7. 非目标与风险控制

- 不在本阶段建立或修改 Grammar、Word Image、Sentence、Sound、Review 或 Network 页面。
- 不修改现有词库、课程数据、850 覆盖度、BE 图卡资产或旧课程内容。
- 不把 43 节点直接等同于 43 节课；实际 Micro Lessons 依然服从 One New Variable 和约 55–70 节的冻结范围。
- 不把 50/150/300/500/850 覆盖度作为能力等级，也不把连续学习天数作为 Gate 通过证据。
- 不为 English Code（如第三人称 `-s`、不规则动词）强造 Camera 故事；它们按 Code 或 Convention / Recall 处理。

## 8. 设计验收标准

本设计在进入实施计划前，必须满足：

1. 每个项目模块只有一个清楚的责任边界，Word Image 与 Grammar Vision 不重叠。
2. 新用户的默认起点、每阶段通过证据、每次学习后的唯一下一步都可用普通语言说明。
3. Grammar Vision 的 43 节点被完整容纳在阶段 0–4 中，Control 与 English Code 影子轨保留为显式维度。
4. GV 学习 Gate 与 TO 质量门在命名、用途与证据上可区分。
5. 第一阶段文档不声称任何尚未实施的页面、数据或课程已完成改造。
