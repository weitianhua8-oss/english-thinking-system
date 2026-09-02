# English Project OS Reset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立英语思维 850 的教学与产品唯一真源，写入 Teaching OS V2、Quality Gates 和冻结决策，同时将旧文档转为可追溯的历史/摘要入口。

**Architecture:** 保留 `docs/project-os/` 作为跨项目试行流程层；新增 `docs/english-thinking-os/` 作为英语项目唯一教学与产品真源。新入口定义优先级，旧文档只保留历史证据或兼容摘要，并显式链接到新真源。

**Tech Stack:** Markdown、Git、`rg`、`test`、`git diff --check`。

---

## 文件结构与职责

| 路径 | 操作 | 责任 |
| --- | --- | --- |
| `docs/english-thinking-os/PROJECT_OS.md` | 创建 | 英语项目入口、优先级、状态更新规则、导航 |
| `docs/english-thinking-os/01_PRODUCT_NORTH_STAR.md` | 创建 | 品牌核心、世界观、用户、成功定义 |
| `docs/english-thinking-os/TEACHING_OS_V2.md` | 创建 | 八步教学母架构、Grammar Camera、模块映射 |
| `docs/english-thinking-os/03_LEARNING_OBJECTS.md` | 创建 | 内容大脑、表现层、图卡、网络、页面职责 |
| `docs/english-thinking-os/04_CURRICULUM.md` | 创建 | S80/A200/B570、课程扩展与范围边界 |
| `docs/english-thinking-os/05_MASTERY_MODEL.md` | 创建 | 掌握证据、复习目标和当前实现差异 |
| `docs/english-thinking-os/06_QUALITY_GATES.md` | 创建 | G1–G7、A+ 硬门槛、任务验收表 |
| `docs/english-thinking-os/07_DESIGN_SYSTEM.md` | 创建 | 卡片、组件、网络、认知负荷的表现规则 |
| `docs/english-thinking-os/08_CURRENT_STATE.md` | 创建 | 证据化项目状态与状态标签 |
| `docs/english-thinking-os/09_DECISIONS.md` | 创建 | 十条冻结决策及变更机制 |
| `docs/english-thinking-os/10_RISKS.md` | 创建 | 已知风险与升级条件 |
| `docs/english-thinking-os/11_NEXT_ACTIONS.md` | 创建 | 当前最小可验收任务序列 |
| `docs/project-os/PROJECT_OS.md` | 修改 | 标明通用试行范围和英语专属真源边界 |
| `PROJECT_MASTER.md`、`ROADMAP.md` | 修改 | 保留证据，标明历史定位和当前入口 |
| 根目录六份项目文档 | 修改 | 加入兼容摘要定位和各自英语真源链接 |

### Task 1: 创建入口、北极星与教学母架构

**Files:**
- Create: `docs/english-thinking-os/PROJECT_OS.md`
- Create: `docs/english-thinking-os/01_PRODUCT_NORTH_STAR.md`
- Create: `docs/english-thinking-os/TEACHING_OS_V2.md`

- [ ] **Step 1: 创建英语专属真源目录与入口文件**

入口声明它仅适用于英语思维 850；`docs/project-os/` 是通用试行流程；冲突按 Owner 当前验收、英语专属 `09_DECISIONS.md`、英语专属其余真源、历史文档的顺序裁决。

- [ ] **Step 2: 写入 Product North Star**

写入“把英语变成看得见的画面”“Language ≠ Translation”、目标学习者和成功定义；不写课程完成度或技术实现状态。

- [ ] **Step 3: 写入 Teaching OS V2**

完整定义 `WORLD → SEE → FOCUS → GROW → READ → CREATE → CONNECT → REVIEW`。每一步写学习者动作、可见产出、禁止误用和与 G1–G7 的关联；写明 Grammar Camera 与 `Meaning First → Grammar Name Later`。

- [ ] **Step 4: 检查入口和八步链路**

Run: `test -f docs/english-thinking-os/PROJECT_OS.md && test -f docs/english-thinking-os/01_PRODUCT_NORTH_STAR.md && test -f docs/english-thinking-os/TEACHING_OS_V2.md && rg -n 'WORLD|SEE|FOCUS|GROW|READ|CREATE|CONNECT|REVIEW|Grammar Camera|Meaning First' docs/english-thinking-os/TEACHING_OS_V2.md`

Expected: 三个文件均存在；输出八步、Grammar Camera 和 Meaning First 条目。

- [ ] **Step 5: 提交第一组真源文档**

Run: `git add -- docs/english-thinking-os/PROJECT_OS.md docs/english-thinking-os/01_PRODUCT_NORTH_STAR.md docs/english-thinking-os/TEACHING_OS_V2.md && git diff --cached --check && git commit -m "docs(teaching-os): add north star and learning kernel"`

### Task 2: 创建学习对象、课程、掌握与视觉规则

**Files:**
- Create: `docs/english-thinking-os/03_LEARNING_OBJECTS.md`
- Create: `docs/english-thinking-os/04_CURRICULUM.md`
- Create: `docs/english-thinking-os/05_MASTERY_MODEL.md`
- Create: `docs/english-thinking-os/07_DESIGN_SYSTEM.md`

- [ ] **Step 1: 写入 Learning Objects 边界**

明确 English Thinking Skill Pro 是单词内容大脑，Word Image Pro 是网页表现层；Grammar Camera、3D 知识卡、知识网络和课程页面各自只承担一个清晰职责。说明课程对象从 Teaching OS V2 取得输入，不复制教学规则。

- [ ] **Step 2: 写入 Curriculum 与 Mastery Model**

保留 S80/A200/B570，明确样板 → 小批量 → 停机复盘。写入“用户自选新词数量 + 掌握度驱动复习”为冻结目标；标注当前固定 5 词/天计划未替换，任何实现必须另立任务并保护 V1 localStorage。

- [ ] **Step 3: 写入 Design System**

保留 BE 图卡视觉基准、无固定角色/IP、知识卡解释单点、知识网络连接多点、语义关系优先、左→右、禁止 Simple Mind Map，以及每屏一个主要认知任务的负荷约束。

- [ ] **Step 4: 检查冻结基础术语**

Run: `rg -n 'English Thinking Skill Pro|Word Image Pro|S80|A200|B570|用户自选新词数量|掌握度|左.?右|Simple Mind Map|固定角色' docs/english-thinking-os/03_LEARNING_OBJECTS.md docs/english-thinking-os/04_CURRICULUM.md docs/english-thinking-os/05_MASTERY_MODEL.md docs/english-thinking-os/07_DESIGN_SYSTEM.md`

Expected: 每一个术语至少出现一次，且“当前实现”和“目标方向”被明确区分。

- [ ] **Step 5: 提交学习对象与课程规则**

Run: `git add -- docs/english-thinking-os/03_LEARNING_OBJECTS.md docs/english-thinking-os/04_CURRICULUM.md docs/english-thinking-os/05_MASTERY_MODEL.md docs/english-thinking-os/07_DESIGN_SYSTEM.md && git diff --cached --check && git commit -m "docs(teaching-os): define learning objects and mastery model"`

### Task 3: 创建 Quality Gates、冻结决策与事实状态

**Files:**
- Create: `docs/english-thinking-os/06_QUALITY_GATES.md`
- Create: `docs/english-thinking-os/08_CURRENT_STATE.md`
- Create: `docs/english-thinking-os/09_DECISIONS.md`
- Create: `docs/english-thinking-os/10_RISKS.md`
- Create: `docs/english-thinking-os/11_NEXT_ACTIONS.md`

- [ ] **Step 1: 写入 G1–G7 Quality Gates**

每个 Gate 写检查问题、最小证据和 Fail 处理。将 G2 Image 与 G4 Transfer 标为 A+ Golden 的硬门槛；给出 T3+ 教学任务的七项 Gate 检查表。

- [ ] **Step 2: 写入十条 FROZEN 决策**

逐条记录 Owner、状态 `FROZEN`、决定内容、禁止静默改变的对象及变更条件：明确教学证据、Owner 重新确认、在 Decision 中留下可追溯理由。不得把“冻结”写成“永不变化”。

- [ ] **Step 3: 写入 Current State、Risks 与 Next Actions**

采用“已实现且已验收 / 已实现待验收 / 已确认方向未形成产物 / 计划中”四种标签。标记 Culture、Camera、World、Word Image（ON）和 Sentence 样板已验收；Grammar Vision V1.2 为 Owner 已确认方向、当前无独立课程或代码产物；Grammar 路由为 planned。记录 Roadmap 过期、浏览器 E2E 缺口、850 全量内容误报与 V1 进度兼容风险。

- [ ] **Step 4: 检查 Gate、决策和状态声明**

Run:
```bash
rg -n '^## G[1-7]|A\+|G2|G4' docs/english-thinking-os/06_QUALITY_GATES.md
rg -n 'FROZEN|把英语变成看得见的画面|Language ≠ Translation|Grammar Camera|S80|A200|B570|Meaning First|掌握度驱动' docs/english-thinking-os/09_DECISIONS.md
rg -n '已实现且已验收|已确认方向，未形成产物|Grammar Vision V1.2|planned' docs/english-thinking-os/08_CURRENT_STATE.md
```

Expected: 七个 Gate、十条冻结决定和四类状态均有匹配；未实现方向不被标记为已完成。

- [ ] **Step 5: 提交质量与状态文档**

Run: `git add -- docs/english-thinking-os/06_QUALITY_GATES.md docs/english-thinking-os/08_CURRENT_STATE.md docs/english-thinking-os/09_DECISIONS.md docs/english-thinking-os/10_RISKS.md docs/english-thinking-os/11_NEXT_ACTIONS.md && git diff --cached --check && git commit -m "docs(teaching-os): add gates decisions and project state"`

### Task 4: 将旧文档转为历史证据或兼容摘要

**Files:**
- Modify: `docs/project-os/PROJECT_OS.md`
- Modify: `PROJECT_MASTER.md`
- Modify: `ROADMAP.md`
- Modify: `PROJECT.md`, `PRD.md`, `ARCHITECTURE.md`, `RULES.md`, `DECISIONS.md`, `PROGRESS.md`

- [ ] **Step 1: 标明通用 Project OS 的试行边界**

在 `docs/project-os/PROJECT_OS.md` 写明：它提供跨项目流程，不复制英语项目教学规则；英语教学和产品冲突以 `docs/english-thinking-os/PROJECT_OS.md` 为准。

- [ ] **Step 2: 标记旧 Master 与 Roadmap 的历史定位**

在 `PROJECT_MASTER.md` 顶部加入“历史产品总控/证据源”；在版本治理处说明长期新规则写入英语专属真源。将 `ROADMAP.md` 顶部改为“历史路线图，当前状态请读 `08_CURRENT_STATE.md`，下一步请读 `11_NEXT_ACTIONS.md`”；保留 P0–P6 内容，不删除任务记录。

- [ ] **Step 3: 为六份根目录摘要增加专属真源链接**

`PROJECT.md` 链接 North Star；`PRD.md` 链接 Teaching OS 和 Curriculum；`ARCHITECTURE.md` 链接 Learning Objects；`RULES.md` 链接 Quality Gates 和 Design System；`DECISIONS.md` 链接专属 Decisions；`PROGRESS.md` 链接 Current State 和 Next Actions。只写摘要定位，不重复大段规则。

- [ ] **Step 4: 检查所有入口链接和历史状态**

Run: `rg -n 'docs/english-thinking-os/' docs/project-os/PROJECT_OS.md PROJECT_MASTER.md ROADMAP.md PROJECT.md PRD.md ARCHITECTURE.md RULES.md DECISIONS.md PROGRESS.md && rg -n '历史路线图|历史产品总控|当前状态' ROADMAP.md PROJECT_MASTER.md`

Expected: 九份既有文档均至少包含一个新真源链接；Roadmap 和 Master 明确不再是当前状态唯一入口。

- [ ] **Step 5: 提交文档迁移链接**

Run: `git add -- docs/project-os/PROJECT_OS.md PROJECT_MASTER.md ROADMAP.md PROJECT.md PRD.md ARCHITECTURE.md RULES.md DECISIONS.md PROGRESS.md && git diff --cached --check && git commit -m "docs(project): link legacy records to teaching source"`

### Task 5: 完整性验证、独立审查与 LEARN

**Files:**
- Modify: `PROGRESS.md`
- Create: `docs/project-os/reviews/2026-09-02-english-project-os-reset-review.md`

- [ ] **Step 1: 运行文件、术语和 Git 完整性检查**

Run:
```bash
for file in   docs/english-thinking-os/PROJECT_OS.md   docs/english-thinking-os/01_PRODUCT_NORTH_STAR.md   docs/english-thinking-os/TEACHING_OS_V2.md   docs/english-thinking-os/03_LEARNING_OBJECTS.md   docs/english-thinking-os/04_CURRICULUM.md   docs/english-thinking-os/05_MASTERY_MODEL.md   docs/english-thinking-os/06_QUALITY_GATES.md   docs/english-thinking-os/07_DESIGN_SYSTEM.md   docs/english-thinking-os/08_CURRENT_STATE.md   docs/english-thinking-os/09_DECISIONS.md   docs/english-thinking-os/10_RISKS.md   docs/english-thinking-os/11_NEXT_ACTIONS.md; do test -f "$file" || exit 1; done
rg -n 'G1 Truth|G2 Image|G3 Logic|G4 Transfer|G5 Camera|G6 Output|G7 Cognitive Load' docs/english-thinking-os/06_QUALITY_GATES.md
git diff --check HEAD
```

Expected: 命令退出码为 0；全部 Gate 存在；没有 whitespace error。

- [ ] **Step 2: 进行独立 Reviewer 审查**

Reviewer 只读取任务规格、英语专属真源、旧 Master、Roadmap、PRD、PROGRESS 与当前代码状态；输出 PASS / WARNING / FAIL。重点检查：G2/G4 是否硬门槛、十条冻结决定是否完整、状态是否把样板误报为全量、旧真源优先级是否仍冲突、是否改动页面或数据。

- [ ] **Step 3: 修复 Reviewer 报告中的 FAIL**

对每个 FAIL 修改唯一负责文档；若为无法证实的历史事实，降级为“已确认方向未形成产物”或列入 `10_RISKS.md`，不凭空补写。

- [ ] **Step 4: 记录 T4 LEARN 与当前结果**

在 `PROGRESS.md` 记录：Project OS Reset 已完成、英语专属真源位置、Quality Gates 为后续 T3+ 教学任务的必经检查、通用 Project OS 仍为试运行。不得写“Grammar 已完成”或“850 深度课程已完成”。

- [ ] **Step 5: 最终检查并提交审查记录**

Run: `git diff --check && git status --short && git add -- PROGRESS.md docs/project-os/reviews/2026-09-02-english-project-os-reset-review.md && git diff --cached --check && git commit -m "docs(project-os): record reset review and learnings"`

Expected: 仅本计划列出的文档被提交；现有两个未跟踪 BE 草案文件保持未暂存、未修改。

## 覆盖检查

- Teaching OS V2：Task 1。
- G1–G7 和 A+ 规则：Task 3。
- 十条冻结决策：Task 3。
- S80/A200/B570、学习对象、复习目标与设计系统：Task 2。
- 当前真实状态、Grammar Vision V1.2 的证据边界、风险与下一步：Task 3。
- 旧 Roadmap/Project Master 的状态漂移修复：Task 4。
- 独立审查、LEARN、Git 安全节点与不碰代码：Task 5。
