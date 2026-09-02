# 🔒 Grammar Vision MVP课程总架构 V1.0 · FROZEN

> **版本状态：FROZEN（冻结）**
>
> **冻结日期：2026-09-02**
>
> **适用范围：Grammar Vision MVP 的课程脚本、页面、互动、动画与开发实现。**
> **文档定位：** 本文件是 Grammar Vision 模块的冻结课程规格；它落实并细化项目的 [教学母架构](../TEACHING_OS_V2.md)，不覆盖 [Project OS](../../PROJECT_OS.md) 的治理优先级或项目通用教学质量门。

## 版本说明与变更控制

本版本将《Grammar Vision V1.5 教学母架构》转化为第一套可执行的儿童课程地图：

- **V1.5：** 教学理论母架构。
- **MVP课程总架构 V1.0：** 面向首轮产品开发的课程地图与硬规范。

本文件是后续课程、页面、互动、动画和开发的唯一 Grammar Vision 基线。任何底层规则修改都必须留下以下完整记录，禁止静默改动：

`旧规则 → 新规则 → 修改原因 → 影响节点 → 是否需要回归测试`

---

## 1. V1.5三大系统：三轨并行

Grammar Vision 不再只按 `L0 → L8` 单线推进，而是让三条轨道同步成长。

| 轨道 | 解决的问题 | 儿童感受 |
| --- | --- | --- |
| **🎥 Grammar Camera Main Rail** | 想表达的 Scene 怎样被选择与组织。 | Camera 越来越强。 |
| **🎛 Camera Control Side Rail** | 怎样否定、提问、指令、比较、加入态度。 | 我在操控 Camera。 |
| **🔤 English Code Shadow Rail** | 英语怎样把已理解的意义编码成真实形式。 | 英语有自己的编码规则。 |

完整路径冻结为：

`Reality → Meaning Camera → Camera Controls → English Code → Surface English`

### 儿童主循环与教学后台循环

儿童端始终体验：

`SEE → FOCUS → GROW → READ → CREATE`

课程后台统一按以下顺序设计：

`Scene → Focus → Notice → Predict → Camera Change → Language → Pattern → Name/Code → Transfer → Create`

如果课程偏离这两个循环，课程规格必须说明原因与补偿机制。

---

## 2. 课程规模、节点类型与 One New Variable

### 2.1 规模定义

**43个认知节点不等于43节课。** 节点是稳定的认知坐标，实际交付预计为 **约55–70个 Micro Lessons**。节点可标为：

- Seed 节点：为未来系统种下可回收的认识。
- Bridge 节点：连接相邻系统，可与前后内容形成短课链。
- System 节点：需要完整展开的能力系统。
- 旗舰节点：形成关键跃迁或 Gate 的课程。
- Return 节点：回收、重解释和强化先前已建立的能力。

项目统一表述为：

> **43个核心认知节点 + Camera Control副轨 + English Code影子轨，通过约55–70个短学习单元完成第一轮 Grammar Vision MVP。**

### 2.2 One New Variable（一次一个新变量）

每个 Micro Lesson 原则上只新增 **一个主要的 Camera 认知变量**。复杂 System 节点必须拆课，不能为了凑节点数把多个视角、角色或形式规则压进一课。

例如 Node 35「Action Views」至少拆为：

| Micro Lesson | 新增能力 |
| --- | --- |
| 35A | Target Action：`to do` |
| 35B | Activity View：`doing` |
| 35C | Result / Affected State：`done` |
| 35D | Three Views Compare |

Node 23、24、25、31、37 等 System 节点也允许按同一原则拆分；Node 04、05、11、14 等节点则可作为相连的短课或 Bridge，而不必硬拆成独立的大课。

---

## 3. Grammar Camera Main Rail：43认知节点主轨

| 阶段 | 节点 | 核心认知 |
| --- | ---: | --- |
| **A · SEE / FOCUS** | 01 | 世界比句子大 |
|  | 02 | Language = Selection |
|  | 03 | Focus：Camera主要拍谁/什么 |
|  | 04 | Focus + Event → Core Event |
| **B · CORE SCENE** | 05 | Happen Scene |
|  | 06 | State Scene |
|  | 07 | Meaning-specific Required Slot |
|  | 08 | Relationship Seed |
|  | 09 | Place / WHERE进入Core |
|  | 10 | Core Slot vs Scene Layer |
|  | 11 | Mini Camera Seed |
|  | 12 | Transfer Scene |
|  | 13 | Result Scene |
|  | 14 | Existence Scene Seed |
| **C · ZOOM + REFERENCE** | 15 | Target |
|  | 16 | Feature = Narrowing |
|  | 17 | `a` = Introduce / `the` = Lock On |
|  | 18 | Owner |
|  | 19 | Noun Chunk |
|  | 20 | Reference Tracking |
| **D · RELATIONSHIP** | 21 | Relationship Exists |
|  | 22 | IN / ON / AT prototypes |
|  | 23 | Relative Position |
|  | 24 | Source → Path → Goal |
|  | 25 | Physical → Extended → Abstract |
|  | 26 | Relationship Meaning ≠ Scene Role |
| **E · TIMELINE** | 27 | Time Exists |
|  | 28 | Camera Point / Reference Point |
|  | 29 | Pattern View vs Inside Event |
|  | 30 | Move Camera to Past |
|  | 31 | Look Back |
| **F · ACTION PACKAGING** | 32 | Two Actions Collide |
|  | 33 | Action Pack |
|  | 34 | Packed Action保留Slots |
|  | 35 | Action Views |
| **G · SCENE COMBINING** | 36 | Content Camera |
|  | 37 | Parallel Cameras |
|  | 38 | Target Camera |
|  | 39 | Background Camera |
|  | 40 | Camera Tree |
| **H · SENTENCE X-RAY** | 41 | Core + Layer Reverse |
|  | 42 | X-Ray 6 Steps |
|  | 43 | Graduation Camera Tree |

### 主轨的冻结校正

1. **Node 07：Meaning-specific Verb Gravity。** 不教“某个动词永远固定需要宾语”。应问：**当前想表达的 Meaning Scene 还需要哪些角色？** 例如当前画面是 Tom 踢这个球，Camera 自然追问 `WHAT?`；后台坚持 `Meaning → Roles`，而非 `word → permanent pattern`。
2. **Node 10：Fold Test = Meaning Completeness Test。** 不以“删掉后语法是否成立”为判断标准，而是检查 Fold 后当前 Meaning Scene 是否还能完整恢复。例如 `Tom reads the book in the room.` 折起地点后阅读事件仍完整；`Tom puts the book in the room.` 折起地点后 Placement Scene 缺少 `WHERE`。
3. **Focus 与 Target 分家。** L1 使用 Focus；L3 开始使用 Target，二者不互换。
4. **L5术语收紧。** Node 29 是 `Pattern View vs Inside Event`，例如 `Tom plays football.` 与 `Tom is playing football.`；Node 30 才建立 `Whole Past Event vs Inside Past Event`。
5. **Node 31：Look Back Camera。** 必须同时呈现 `I have lived here for ten years.`，防止孩子把 Perfect 理解为“事情一定结束”。`Look Back ≠ 一定结束`。
6. **MVP边界。** Passive 与 Hypothetical 暂不硬塞进43主节点；后续作为组合升级。Passive 可由 Focus/Reframe + Result/Affected Participle + English Code 构成，Hypothetical 可由 Timeline + Background + Modal/Hypothetical Lens 构成。

---

## 4. Camera Control Side Rail：控制副轨

Control 不是新增 L9，而是在主轨能力成熟后插入。

| 主轨位置 | Control能力 | Meaning模型 |
| --- | --- | --- |
| Node 06后 | Polarity Seed | ✅ Scene成立 / ❌ Scene不成立 |
| Node 06后 | Whole Scene Query | “这件事是真的吗？” |
| Node 07–09后 | Missing Slot Query | WHAT / WHERE → ❓ |
| Node 09后 | Direct Mode | 不描述 Scene，而是让听者创建 Scene |
| Node 16后 | Scale Seed | 多个 Target 放到同一 Feature 尺度 |
| Node 29后 | Modal Seed | ability / possibility / necessity / advice lens |

### 两类疑问

- **Whole Scene Query：** 整台 Camera 询问“这件事是真的吗？”，如 `Is Tom happy?`
- **Missing Slot Query：** 某个 Slot 变成未知，如 `The ball is WHERE? → Where is the ball?`

Wh-词先作为 **Unknown Role / Unknown Slot** 理解；实际英语语序属于 English Code。

### Direct、Scale与Modal

- **Direct Mode：** 在 PUT 后引入。`Put the ball in the box.` 的儿童模型是“让对方把这个 Scene 创造出来”，不是先讲“祈使句省略 you”。
- **Scale Seed：** 在 L3 的 Target Feature 上生长：`big → bigger → biggest`，本质是 `Target Feature + Scale Control`。
- **Modal Seed：** 在 Action 之后，以同一 Reality Event 上的说话者镜头理解 `can / must / should`。变化的是 `Speaker's Lens on the Scene`，而非 Reality Event 本身。

---

## 5. English Code Shadow Rail：英语编码影子轨

Meaning Camera 先建立意义；English Code 再负责英语形式。English Code 不得散落在课程备注中，必须作为可见的影子轨管理。

| Camera阶段 | Code Family |
| --- | --- |
| L2 | Basic Word Order / BE 基础 |
| L3 | Number / Articles / Possession / Pronoun Forms |
| L4 | Relationship lexical coding |
| L5 | Verb shape / BE / HAVE / Past coding |
| L6 | `to` / `-ing` / participle coding |
| L7 | Connectors / finite-clause coding |
| L8 | Parsing signals / structural cues |

### Code Budget

单个 Micro Lesson 原则上**最多只新增一个主要 English Code Family**。它保护 Meaning Camera 不被多个形式规则淹没；例如 Required Slot 课不得同时塞入第三人称 `-s`、冠词、复数、介词和 do-support。

### Existence Scene 的双层处理

Node 14 先在 Meaning Camera 中打开一个 Scene，再向该世界引入一个存在 Target；英语使用 `there + be` 进行编码。因此 `There is a dog.` 中的 `there` 不可直接教成“那里”，它属于 Existence Coding。

---

## 6. Seed → System → Return：课程地图元数据

每个节点后续都要记录：**Seed来源、当前System、未来Return**。知识不是线性 A→B→C，而是反复回流、重解释旧能力。

以 `IN` 为例：

`Node 08 Relationship Seed → Node 22 IN System → Node 26 Relationship Role Return → Node 34 Action Pack内部Return → Node 42 X-Ray Return`

不是每个 Micro Lesson 都必须有 Return，但每个完整 System 至少必须设计一个 **Return Moment**，让孩子体验“原来之前那个东西其实是这样工作的”。

---

## 7. 统一儿童术语

儿童端不得随意替换下表术语；后台可保留更精确的专业术语。

| 儿童概念 | 固定含义 |
| --- | --- |
| **Scene** | 正在表达的现实/脑中画面。 |
| **Camera** | 如何选择和组织 Scene。 |
| **Focus** | Camera 当前主要把注意力放在哪里。 |
| **Target** | 需要让听者识别、锁定并持续追踪的对象。 |
| **Role** | 信息在 Scene 中的工作。 |
| **Slot** | 某 Role 的位置。 |
| **Core Slot** | 当前 Meaning Scene 需要的位置。 |
| **Scene Layer** | Core 完整后增加的背景。 |
| **Chunk** | 一组共同完成一个 Camera Role 的词。 |
| **Mini Camera** | Slot 内部进一步展开。 |
| **Relationship** | Target 与 Landmark 的关系。 |
| **Camera Point** | Camera 站在时间线哪里。 |
| **Action Pack** | 被包装进入更大 Scene 的动作。 |
| **Sub Camera** | 被组合进另一 Scene 的完整 Camera。 |
| **Parallel Camera** | 与另一 Camera 同级。 |
| **Camera Tree** | 多层 Scene 组织结构。 |
| **Fold** | 暂时收起一层信息。 |
| **English Code** | 英语把意义变成具体形式的规则/约定。 |

### Chunk 的冻结定义

> **Chunk = 一组共同承担一个 Camera Role 的词。**

Chunk 不是“朗读时一起读的一组词”。例如：

- `[my big red ball]` 整体承担 `WHAT`；内部仍有 Target、Owner、Feature。
- `[in the box]` 整体是 Relationship Chunk。
- `[to put the ball in the box]` 整体是 Action Pack。

Chunk 是进入层级结构的桥，而非词性列表。

---

## 8. Grammar Vision 能力 Gate：7个里程碑

> 注意：下表是 Grammar Vision 的**学习能力 Gate**；它不替代项目 [TEACHING_OS_V2.md](../TEACHING_OS_V2.md) 中面向所有教学资产的 G1–G7 质量门。

| Gate | 真正顿悟 |
| --- | --- |
| **G1 · Required Slot** | 不同 Meaning Scene 需要不同角色。 |
| **G2 · Core vs Layer** | 信息有结构层级。 |
| **G3 · Mini Camera** | 一个 Slot 内部还有结构。 |
| **G4 · Relationship Prototype** | 关系不是中文翻译。 |
| **G5 · Timeline View** | 同一 Event 可以换 Camera View。 |
| **G6 · Packaging** | Action / Full Scene 可以整体进入 Role。 |
| **G7 · Sentence X-Ray** | 长句是一棵 Camera Tree。 |

课程不以“看完多少课”判断完成，而以这些能力 Gate 的可观察证据判断。

---

## 9. 单课教学母模板 V1.0：开发硬规范

每个 Micro Lesson 必须填写以下教学卡；缺关键项不得进入开发：

1. Lesson Goal
2. Previous Ability
3. One New Camera Ability
4. Anchor Vocabulary
5. Opaque Chunks
6. Opening Scene
7. Focus
8. Cognitive Surprise
9. Predict Question
10. Camera Change
11. Language Reveal
12. Pattern Set
13. Grammar Name
14. English Code
15. Common Error
16. Semantic Feedback
17. Transfer
18. Reverse
19. Create
20. Mastery Gate
21. Return Hook

硬顺序是：**Scene 先出现，孩子先发现问题，Camera 先变化，Language 后出现；旧能力被重新调用，术语最后命名；最后必须支持 Create 和 Reverse。**

### 视觉设计边界

Camera 效果只在承担认知功能时使用。允许：Zoom In、Zoom Out、Move、Boundary Crossing、Timeline Shift、Go Inside Event、Pack、Open Sub Camera、Reframe、Fold。

不得为了“好看”给第三人称 `-s`、不规则动词或主谓一致硬造 Camera 故事；这些属于 English Code。

---

## 10. 错误反馈：四类反馈而非统一红叉

| 错误类型 | 系统反馈方式 |
| --- | --- |
| **Meaning Error** | 改变 Scene，让孩子看见意义不匹配。 |
| **Role Error** | 打开 Slot / Role 问题，提示当前 Scene 缺什么或放错什么。 |
| **Code Error** | 明确提示：“Camera 对了，检查 English Code。” |
| **Convention / Recall Error** | 说明这是英语约定，需要积累与回忆。 |

不规则动词记错不等于没有理解英语；反馈必须让孩子区分“意义/结构问题”和“英语约定/记忆问题”。

---

## 11. Sentence X-Ray：英语 → Scene 的六步闭环

L8 是 Reverse Camera，而不是“长难句技巧”。对一个已搭好的英语 Camera，统一执行以下闭环：

1. **CHUNK**：先成块，不逐词翻译。
2. **SCAN**：寻找 Camera 与 Timeline Lights 等结构线索；线索不是死规则。
3. **FOCUS**：找到最外层 Main Camera。
4. **LOCK**：锁住不能再折的 Main Core。
5. **FOLD**：折起外围或嵌套 Camera，并分别检查其内部 Core 与 Layer。
6. **REBUILD**：从 Main Core 重新展开各层，恢复完整 Scene。

例如 `The boy who is playing football in the park is Tom.`：先分为 `[The boy] [who is playing football in the park] [is Tom]`；再 Fold 目标 Camera，锁定 `The boy is Tom.` 为 Main Core；随后打开内部 Camera 并恢复全句。孩子应得到的结论是：

> **长句不是一长串词，而是一层一层套起来的 Camera。**

MVP 毕业时应形成双向闭环：

`Scene → English` 与 `English → Scene`

---

## 12. MVP毕业目标

完成 Grammar Vision MVP 不等于“学完所有英语语法”，而是安装 Grammar Operating System。

面对现实：

`SEE → Focus → Core Scene → Slots → Target → Relationship → Timeline → Action Pack → Scene Combining → English Code → Expression`

面对复杂英语：

`READ → Chunk → Scan → Focus → Lock → Fold → Camera Tree → Rebuild → Scene → Re-expression`

这套系统让孩子能够从 Scene 建构英语，也能从英语还原 Scene。

---

## 13. 实施边界

本文件冻结的是课程架构与开发约束，不代表网站、数据、既有课程或 Skill 已完成改造。后续实施必须以本文件为 Grammar Vision 课程基线，并按项目治理文件要求进行审核、版本记录与回归验证。
