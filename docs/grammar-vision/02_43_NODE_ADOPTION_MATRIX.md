# Grammar Vision 43 Node Adoption Matrix

## 审计口径与来源优先级

- [冻结 Grammar Vision 规格](GRAMMAR_VISION_MVP_COURSE_ARCHITECTURE_V1.0_FROZEN.md) 是 43 个节点、认知标签、学习顺序和副轨插入点的唯一节点权威。
- [PROJECT_OS.md](../../PROJECT_OS.md) 与 [Teaching OS V2](../TEACHING_OS_V2.md) 仍分别是更高层的治理权威与全系统教学权威；本矩阵不能覆盖二者。
- [Task 1 审计协议](01_ADOPTION_AUDIT_PROTOCOL.md) 提供状态定义与证据规则。本文件把“冻结方向”与“当前可复用资产”分开记录。

本次采用保守判定：`planned` 表示未发现直接将该冻结节点作为可追踪 Grammar Vision 学习单元交付的证据。词汇课中出现相近 Scene、词义或例句，只列为可复用候选，不单独证明节点已实现。

## 主轨节点矩阵

### Stage 0 · Scene 起步 Nodes 01–04

| GV node | Frozen cognition | Learning stage | Prerequisite evidence | Reusable current asset | Current status | Required audit evidence | Next decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | 世界比句子大 | Stage 0 · Scene 起步 | 未找到将 Reality/Scene 置于句子之前的节点化课序证据。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 的单词核心画面可作场景素材。 | planned | 可追踪 Micro Lesson：Scene 先于句子出现，并含 Create/Reverse 记录。 | 决定 L1 开场 Scene 素材与 Gate。 |
| 02 | Language = Selection | Stage 0 · Scene 起步 | 未找到把语言定义为选择过程的学习卡或行为记录。 | [Level 1 lessons](../../data/level1_lessons.json) 多条 `image`/`logic` 可供选择练习取材。 | planned | Lesson Goal、选择对比、预测题及学习者作答证据。 | 确认选择变量和首个对比 Scene。 |
| 03 | Focus：Camera主要拍谁/什么 | Stage 0 · Scene 起步 | `I`、`you` 课含“镜头对准”措辞，但未形成冻结 Focus 节点。 | [level1_lessons.json](../../data/level1_lessons.json) L1 `I`、L2 `you`。 | planned | Focus 操作、换 Focus 对比、可复核的学习状态字段。 | 将现有人称镜头素材改写为 Focus 练习。 |
| 04 | Focus + Event → Core Event | Stage 0 · Scene 起步 | 未找到 Focus 与 Event 合成为 Core Event 的直接课程资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 的动作/状态例句可作输入。 | planned | Core Event 图示、最小对比、Transfer 与 Mastery Gate 证据。 | 定义首个可折叠 Core Event。 |

### Stage 1 · Core Scene Nodes 05–14

| GV node | Frozen cognition | Learning stage | Prerequisite evidence | Reusable current asset | Current status | Required audit evidence | Next decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 05 | Happen Scene | Stage 1 · Core Scene | `do` 解释“执行事情”，但未找到 Happen Scene 节点课。 | [level1_lessons.json](../../data/level1_lessons.json) L15 `do`。 | planned | Happen/State 对照、Scene 操作和学习结果记录。 | 以 `do` 例句制作 Happen 最小场景。 |
| 06 | State Scene | Stage 1 · Core Scene | `be` 直接解释身份、状态、位置或过程；未见冻结节点课。 | [level1_lessons.json](../../data/level1_lessons.json) L13 `be`；[教程](../../content/Level1_50个骨架词完整教程.md) `be` 章节。 | planned | State Scene 交互、与 Happen 的对比、Gate 记录。 | 复用 `be` 素材并接入 Control 插点。 |
| 07 | Meaning-specific Required Slot | Stage 1 · Core Scene | `put` 有“放到哪里”的语义追问，但未见 Meaning → Roles 的节点设计。 | [level1_lessons.json](../../data/level1_lessons.json) L21 `put`。 | planned | Role/Slot 图、WHAT/WHERE 缺槽判断、语义反馈记录。 | 以 `put` 确立首个 WHERE 必需槽。 |
| 08 | Relationship Seed | Stage 1 · Core Scene | [LEARNING_LAYERS](../../data/LEARNING_LAYERS.md) 有空间原型与网络示例；没有 GV Seed→System→Return 资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) `in/on/at` 词义页。 | planned | Relationship Seed lesson、Return Hook 元数据及可复核学习记录。 | 先定义 Seed 的场景、Landmark 和回收点。 |
| 09 | Place / WHERE进入Core | Stage 1 · Core Scene | `put` 说明自然追问“放到哪里”；未见 WHERE 进入 Core 的可追踪实现。 | [level1_lessons.json](../../data/level1_lessons.json) L10 `here`、L11 `there`、L21 `put`。 | planned | WHERE 为必需/可折叠的对比、Missing Slot Query 证据。 | 决定 `put` 场景的 WHERE 评估标准。 |
| 10 | Core Slot vs Scene Layer | Stage 1 · Core Scene | 未找到 Fold Test 或 Meaning Completeness Test 的直接资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 可提供地点例句。 | planned | Fold 前后 Scene 完整性检查、学习者判断记录。 | 制作 `read`/`put` 对比卡。 |
| 11 | Mini Camera Seed | Stage 1 · Core Scene | 未找到 Slot 内部结构作为 Mini Camera 的直接资产。 | [level1_lessons.json](../../data/level1_lessons.json) 的 `card` 字段可作视觉素材。 | planned | Slot 内展开、折回与 Transfer 证据。 | 选择首个名词 Slot 的 Mini Camera。 |
| 12 | Transfer Scene | Stage 1 · Core Scene | `give`/`get` 有转移语义，未找到冻结 Transfer Scene 节点课。 | [level1_lessons.json](../../data/level1_lessons.json) L16 `get`、L20 `give`。 | planned | Source、Target、转移动作的角色图和测评记录。 | 用 `give ↔ get` 建立最小 Transfer Scene。 |
| 13 | Result Scene | Stage 1 · Core Scene | `make` 解释结果出现，但未找到 Result Scene 的节点化学习证据。 | [level1_lessons.json](../../data/level1_lessons.json) L22 `make`、L25 `turn`。 | planned | 原状态→结果 Scene、语义反馈和 Transfer 证据。 | 确认 `make` 与 `turn` 的分工。 |
| 14 | Existence Scene Seed | Stage 1 · Core Scene | `there` 提到 `there is/are` 引入对象；未见冻结双层 Existence Coding 课。 | [level1_lessons.json](../../data/level1_lessons.json) L11 `there`。 | planned | Existence Scene、Target 引入与 `there + be` Code 分层证据。 | 决定 Scene 层与 Code 层的拆课方式。 |

### Stage 2 · Target 与关系 Nodes 15–26

| GV node | Frozen cognition | Learning stage | Prerequisite evidence | Reusable current asset | Current status | Required audit evidence | Next decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 15 | Target | Stage 2 · Target 与关系 | 指示词/人称课涉及对象指向，未见从 Focus 分离出的 Target 节点。 | [level1_lessons.json](../../data/level1_lessons.json) L3–L11 人称、`this/that/here/there`。 | planned | Target 识别、锁定和持续追踪活动及状态记录。 | 确认 Target 术语首次出现课。 |
| 16 | Feature = Narrowing | Stage 2 · Target 与关系 | `have` 含特征示例，未找到以 Feature 缩小 Target 的节点资产。 | [level1_lessons.json](../../data/level1_lessons.json) L14 `have` 的 `blue eyes` 例句。 | planned | 多 Target 特征筛选、Scale Seed 前置测评。 | 决定大小/颜色的最小对比场景。 |
| 17 | a = Introduce / the = Lock On | Stage 2 · Target 与关系 | 未找到冠词引入与锁定的直接课程资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 可提供名词例句，仅作素材。 | planned | `a`/`the` Scene 对比、English Code 卡、学习记录。 | 规划与 Node 15 的前后依赖。 |
| 18 | Owner | Stage 2 · Target 与关系 | `your`/`her` 等所属对比存在，未见 Owner 节点。 | [level1_lessons.json](../../data/level1_lessons.json) L1–L4 的代词对比。 | planned | Owner 与 Target 分层练习、Possession Code 证据。 | 选择 `my/your` 的最小场景。 |
| 19 | Noun Chunk | Stage 2 · Target 与关系 | 未找到“共同承担一个 Camera Role”的 Chunk 资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 名词短语例句可作输入。 | planned | Chunk 边界、内部 Target/Owner/Feature 图与复核记录。 | 定义首个 Noun Chunk 卡。 |
| 20 | Reference Tracking | Stage 2 · Target 与关系 | `it` 有“继续指代”说明，未见跨 Scene 追踪的节点流程。 | [level1_lessons.json](../../data/level1_lessons.json) L5 `it`。 | planned | 引入→继续指代→消歧的活动与学习状态证据。 | 设计 `this ball → it` 追踪任务。 |
| 21 | Relationship Exists | Stage 2 · Target 与关系 | [LEARNING_LAYERS](../../data/LEARNING_LAYERS.md) 定义关系网络；未见 Relationship 作为 GV 系统的直接资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 空间与方向章节。 | planned | Target/Landmark/Relationship 三元图、可操作练习及记录。 | 确认 Relationship System 的入门课。 |
| 22 | IN / ON / AT prototypes | Stage 2 · Target 与关系 | `in/on/at` 各有原型画面和逻辑；未见三者作为冻结系统节点的统一课。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) `in`、`on`、`at` 章节；[LEARNING_LAYERS](../../data/LEARNING_LAYERS.md) 的 point/surface/container 示例。 | planned | 三原型对比、误选反馈、Node 08 Return 与学习记录。 | 以容器/表面/点完成 System 课。 |
| 23 | Relative Position | Stage 2 · Target 与关系 | `over/under/up/down` 有词义说明，未见 Relative Position 节点链。 | [level1_lessons.json](../../data/level1_lessons.json) L41–L44。 | planned | Landmark 对照、位置关系任务及复核证据。 | 选定近/远、上下、前后拆课顺序。 |
| 24 | Source → Path → Goal | Stage 2 · Target 与关系 | `from/to/into` 词义覆盖来源、方向、进入；未见三段路径系统。 | [level1_lessons.json](../../data/level1_lessons.json) L37 `to`、L38 `from`、L39 `into`。 | planned | Source/Path/Goal 图、动作迁移与学习记录。 | 确定首个移动场景与拆课数。 |
| 25 | Physical → Extended → Abstract | Stage 2 · Target 与关系 | `in/on/at/from` 有物理到扩展义文字，但未见该跃迁的节点化练习。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) `in/on/at/from` 章节。 | planned | 同一原型三层分支、可解释迁移任务和记录。 | 选择一个原型先做扩展/抽象迁移。 |
| 26 | Relationship Meaning ≠ Scene Role | Stage 2 · Target 与关系 | 未找到区分关系意义和 Scene Role 的直接资产。 | [LEARNING_LAYERS](../../data/LEARNING_LAYERS.md) 的网络关系可作词义输入。 | planned | 同一 Relationship 在 Core/Layer 中换 Role 的对比、Node 22 Return 证据。 | 定义首个“同义不同 Role”场景。 |

### Stage 3 · 时间与动作包装 Nodes 27–35

| GV node | Frozen cognition | Learning stage | Prerequisite evidence | Reusable current asset | Current status | Required audit evidence | Next decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 27 | Time Exists | Stage 3 · 时间与动作包装 | `at` 涉及时间定位，未找到 Timeline 节点。 | [level1_lessons.json](../../data/level1_lessons.json) L36 `at`；[教程](../../content/Level1_50个骨架词完整教程.md) `at` 章节。 | planned | 时间 Scene、时间 Slot 和学习者操作记录。 | 决定时间线的起步场景。 |
| 28 | Camera Point / Reference Point | Stage 3 · 时间与动作包装 | `go/come` 有当前参照点，不是时间 Camera Point 节点。 | [level1_lessons.json](../../data/level1_lessons.json) L17 `go`、L18 `come`。 | planned | 时间线站位、Reference Point 切换和测评证据。 | 制作一个可移动时间 Camera 原型。 |
| 29 | Pattern View vs Inside Event | Stage 3 · 时间与动作包装 | `be` 示例含 `He is sleeping.`，未见与 Pattern View 的对照节点。 | [level1_lessons.json](../../data/level1_lessons.json) L13 `be`。 | planned | `plays`/`is playing` Scene 对比、Code 分层和 Modal Seed 前置记录。 | 确认 L5 双视角课。 |
| 30 | Move Camera to Past | Stage 3 · 时间与动作包装 | `be` 列出 `was/were` 外形，未见过去 Camera 移动课。 | [level1_lessons.json](../../data/level1_lessons.json) L13 `be`。 | planned | Whole Past/Inside Past 对比、Past Code 和学习记录。 | 定义过去事件的最小对照。 |
| 31 | Look Back | Stage 3 · 时间与动作包装 | 未找到 `have lived ... for ten years` 或“未必结束”的节点资产。 | [level1_lessons.json](../../data/level1_lessons.json) L14 `have` 仅作词义候选。 | planned | Look Back 时间轴、完整例句、误解反馈和复核记录。 | 先锁定完成时的儿童例句集。 |
| 32 | Two Actions Collide | Stage 3 · 时间与动作包装 | 未找到双动作冲突的节点课程或交互。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 动词例句仅可作素材。 | planned | 两个 Action 的场景对比、连接方式和学习记录。 | 确认与 Node 33 的边界。 |
| 33 | Action Pack | Stage 3 · 时间与动作包装 | 未找到完整动作作为 Role 进入更大 Scene 的直接资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) `to`/`into` 例句可作输入。 | planned | Pack/Open 操作、Action Chunk 边界、Transfer 证据。 | 制定 `to do` 的首个包装场景。 |
| 34 | Packed Action保留Slots | Stage 3 · 时间与动作包装 | 未找到已包装动作内部 Slot 保留或 IN Return 的直接资产。 | [level1_lessons.json](../../data/level1_lessons.json) L21 `put` 可作 WHERE 槽素材。 | planned | Pack 内部 Slot 可打开的交互、Node 08/22 Return 元数据及记录。 | 定义含 `in` 的 Action Pack 审计样例。 |
| 35 | Action Views | Stage 3 · 时间与动作包装 | 未找到 `to do`/`doing`/`done` 三视角及比较课。 | [level1_lessons.json](../../data/level1_lessons.json) L13 `be` 的过程例句仅作素材。 | planned | 35A–35D 拆课、三视角对比、English Code 记录。 | 确认四个 Micro Lesson 的范围。 |

### Stage 4 · 组合、逆推与表达 Nodes 36–43

| GV node | Frozen cognition | Learning stage | Prerequisite evidence | Reusable current asset | Current status | Required audit evidence | Next decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 36 | Content Camera | Stage 4 · 组合、逆推与表达 | 未找到完整内容 Scene 进入外层 Camera 的直接资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) `because/so` 例句可作输入。 | planned | Content Camera 图、嵌入/展开交互和学习记录。 | 确定第一种 Content Camera。 |
| 37 | Parallel Cameras | Stage 4 · 组合、逆推与表达 | `and/but/or` 有信息连接词义，未见同级 Camera 节点。 | [level1_lessons.json](../../data/level1_lessons.json) L46–L48。 | planned | 两个同级 Scene 的组织、对比和复核证据。 | 以 `and` 开始设计同级组合。 |
| 38 | Target Camera | Stage 4 · 组合、逆推与表达 | 未找到修饰 Target 的子 Camera 节点。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 名词短语可作输入。 | planned | Target 内 Sub Camera、Fold/展开和学习记录。 | 选定第一个 Target 扩展样句。 |
| 39 | Background Camera | Stage 4 · 组合、逆推与表达 | 未找到背景层作为 Camera 的直接资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 地点/时间例句可作素材。 | planned | Background 与 Main Core 对比、Fold 结果和记录。 | 确定时间或地点作为首个背景 Camera。 |
| 40 | Camera Tree | Stage 4 · 组合、逆推与表达 | 未找到多层 Scene 组织图或可追踪学习状态。 | [LEARNING_LAYERS](../../data/LEARNING_LAYERS.md) 的 Network 仅提供词汇网络合同。 | planned | 多层 Camera Tree、打开/折叠操作、G7 前置证据。 | 定义最小三层树样例。 |
| 41 | Core + Layer Reverse | Stage 4 · 组合、逆推与表达 | 未找到从英语反向锁定 Core/Layer 的流程资产。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 可作为句子输入库。 | planned | Reverse 任务、Core/Layer 标注与学习记录。 | 选择一个已知句作逆推首例。 |
| 42 | X-Ray 6 Steps | Stage 4 · 组合、逆推与表达 | 未找到 CHUNK→SCAN→FOCUS→LOCK→FOLD→REBUILD 的直接流程资产。 | [LEARNING_LAYERS](../../data/LEARNING_LAYERS.md) 的 Quick/Deep/Network 合同不等于 X-Ray 流程。 | planned | 六步界面/数据状态、逐步作答、IN Return Hook 和复核记录。 | 制定一个完整 X-Ray 样句及验证脚本。 |
| 43 | Graduation Camera Tree | Stage 4 · 组合、逆推与表达 | 未找到覆盖双向闭环的毕业任务、Gate 或验收记录。 | [Level 1 教程](../../content/Level1_50个骨架词完整教程.md) 可作词汇输入，不作毕业证据。 | planned | Scene→English 与 English→Scene 双向任务、Camera Tree、G1–G7 记录。 | 定义毕业样题、通过线和复核方式。 |

## Camera Control 插入表

| Insertion point | Control |
| --- | --- |
| Node 06后 | Polarity Seed and Whole Scene Query |
| Node 07–09后 | Missing Slot Query |
| Node 09后 | Direct Mode |
| Node 16后 | Scale Seed |
| Node 29后 | Modal Seed |

这些是冻结规格的副轨设计要求；当前审计未找到与主轨节点绑定、可复核的交付证据，故不得据此推定已有实现。

## English Code 影子轨表

| Stage family | English Code family |
| --- | --- |
| L2 | Basic Word Order / BE |
| L3 | Number / Articles / Possession / Pronoun Forms |
| L4 | Relationship lexical coding |
| L5 | Verb shape / BE / HAVE / Past coding |
| L6 | to / -ing / participle coding |
| L7 | Connectors / finite-clause coding |
| L8 | Parsing signals / structural cues |

## `IN` Return Hook 设计要求

冻结规格要求以下链条完整保留：

`Relationship Seed → IN System → Relationship Role Return → Action Pack internal Return → X-Ray Return`

关联节点为 08、22、26、34、42。当前资料可提供 `in` 的词汇原型（[Level 1 教程](../../content/Level1_50个骨架词完整教程.md)）及 `at → on → in` 网络示例（[LEARNING_LAYERS](../../data/LEARNING_LAYERS.md)），但没有该链条的节点元数据、Return Moment 或学习记录；因此这是设计要求，不是当前交付结论。

## 证据限制

- 当前 Level 1 资产可能复用 Scene、词汇、Quick/Deep/Network 合同和复习机制；它们不能证明 Grammar Vision 节点已经交付。
- `data/vocabulary_850.json` 仅可作为词汇可用性证据，不能作为 Grammar Vision 实现证据；本矩阵未将它用于状态判定。
- 对 Nodes 08、21–26 已额外查看 [LEARNING_LAYERS](../../data/LEARNING_LAYERS.md)。它记录词汇层的原型与网络合同，不能替代节点课程、交互行为、学习状态或验证记录。
- 后续若要改变任一 `planned` 判定，应链接直接的课程/页面/数据字段证据，并按 [Task 1 审计协议](01_ADOPTION_AUDIT_PROTOCOL.md) 提供可复核的验证记录。
