# P3.x｜Vocabulary Skill Pro → Website Golden Path

**类型：** T3 现状与差距审计 + 后续最小实现设计

**日期：** 2026-10-08

**审计基线：** `origin/main` / `daa4f7e29f6cd90eb19756c11c82d1eec7b17149`

**候选分支：** `audit/p3-vocabulary-golden-path`

**状态：** `AUDIT COMPLETE — OWNER DECISIONS RECORDED — NO PRODUCT CHANGE`

## 1. 任务卡

| 项目 | 记录 |
| --- | --- |
| Role | 架构与教学审计；不扮演内容批量生产器 |
| Goal | 找出 Skill Pro 内容真源如何以最小风险进入网站三层学习，不重建已有样板 |
| Context | P3.x Vocabulary Skill Pro → Website Golden Path 第一阶段 |
| Source of Truth | `data/vocabulary_850.json`（850 词唯一 canonical editable source）；`docs/english-thinking-os/03_LEARNING_OBJECTS.md`；`skills/english-thinking/SKILL.md`；`data/LEARNING_LAYERS.md` |
| 约束 | 不改 main、canonical 数据、website、冻结规则；不把样板说成全量能力；不把词源/助记当作主教学或事实 |
| Golden examples | 已验收 Word Image `ON`；V2 13 个三层/网络样板；20 个 Golden learning-layer 样例 |
| 本次交付 | 映射矩阵、差距/重复/教学断点、优先级、一个已审校试点建议、后续最小范围与回归清单 |
| 非目标 | 实施数据 schema、迁移 `ON`、改动 V1 进度、批量生产 850 词、改动 Grammar Vision |

### 任务分级与变更控制

本任务为 T3：它没有改动产品，却要为一个跨内容真源、运行时与学习路径的后续样板划出边界。当前审计不触碰 Frozen 语义、顺序、schema 或页面行为，因此**本次不需要 Change Proposal**。后续若要新增/变更 canonical 字段、使网页消费者改读新字段，必须先复核 `CHANGE_CONTROL_V1.md`；不能把本报告当成实施授权。

## 2. 基线结论

结论先行：项目已具备一条可验证的 **Pro 内容样板链**，但还没有一条单一、可追溯的 **Pro 内容到网页的 Golden Path**。

已有能力不是零：Skill 定义了完整内容大脑；`golden-samples.v1.json` 与 `golden-learning-layers.v1.json` 已提供 20 个层级样例；`v2-data.js` 已有 13 个可运行的 Quick / Deep / Network 样板；`ON` 已通过 Word Image 审查。阻塞点是这些资产分散在不同层，且没有一个由 `data/vocabulary_850.json` 出发、可自动检查、再投影到网站的路径。

因此，第一阶段的正确产出是“收敛路线和一个可审校试点”，不是再写一套课程，也不是把 850 词批量塞进页面。

## 3. 逐项映射矩阵

| 目标对象 / 规则 | 已有真源或资产 | 现有消费者 | 已实现事实 | 差距或风险 | 结论 |
| --- | --- | --- | --- | --- | --- |
| English Thinking Skill Pro 内容大脑 | `skills/english-thinking/SKILL.md`；FD-05；`03_LEARNING_OBJECTS.md` | 目前主要靠人工将内容写入 V1/V2/样例文件 | 定义核心画面、逻辑、意义生长、搭配、易混、误区、钩子、网络与可选词源 | Skill 标题仍为 v1；没有“输出对象 → 审校 → canonical → runtime”的可执行数据接口 | **部分具备，未落地为单一数据通路** |
| Vocabulary V1.1 的 0–7 教学轨 | `vocabulary/NEW_WORD_TEACHING_STANDARD_V1_1.md`；`HISTORICAL_SCENE_MNEMONICS_V1.md` 细化第 1 步 | 无明确 runtime 映射 | 0 词型判断、1 记忆外挂、2 核心画面、3 核心结构、4 意义生长、5 易混、6 场景/搭配、7 总结/输出是本任务的上位教学约束 | 恢复版不是历史逐字原稿；其恢复边界必须长期披露 | **已由 CP-2026-004 建立唯一主线正文；不替代词库数据真源** |
| 850 canonical 词库 | `data/vocabulary_850.json`，850 条、8 个现有字段；`data/vocabulary_850.csv` 为 Derived | `scripts/build_level1_site_data.js`、数据完整性测试 | 850 条与 S/A/B 分级稳定，且保留 `related` | 850/850 条均没有 schema 中声明的 `learning_layers`、`core_image` 等 Pro 内容字段；当前 schema 与实际数据 0/850 一致 | **P0：文档/schema 与事实漂移；不可直接宣称已具备 Pro 真源** |
| Golden 内容样例 | `data/golden-samples.v1.json`（20 个）；`data/golden-learning-layers.v1.json`（20 个 Quick/Deep/Network 映射） | 当前无 runtime consumer | 包含 `on`、`in`、`at`、`be`、`see` 等可复用样例 | 文件未被 `data/README.md` 明确列为 canonical，且与 V2、Level 1 可能语义重叠；不能直接当新真源 | **可作为受控输入/对照，不可绕过 canonical 审校** |
| Level 1 内容 | `data/level1_lessons.json`（50 课） | `website/data.js` / `website/app.js` | 核心画面、逻辑、例句、对比、钩子、关联词与 V1 复习闭环均可用 | 内容不回写 850 canonical；关系只给词表，没有学习者可见的边解释；没有 Quick/Deep/Network 的同一结构化对象 | **稳定 legacy 课程，不能充当 Golden Path 真源** |
| Runtime Projection | `scripts/build_level1_site_data.js` → `website/data.js` | `website/app.js` | 可从 850 词库 + Level 1 lessons 生成 50 词运行数据 | 脚本只投影 Level 1，未携带 Golden layers；内容来源是“两份输入”而非一个 Pro 对象；无内容版本/审校标识 | **已有投影机制，可复用但需先定单一输入边界** |
| Quick / Deep / Network 组件 | `website/v2-data.js`、`website/v2-network.js`、`website/app.js` | V2 样板课程与网络探索 | 13 个完整节点、4 个系统、带解释的四种关系；默认 Quick、按需展开 Deep/Network | V2 数据是独立 runtime 内容源；不从 canonical/Golden layers 生成；Deep 未稳定承载 V1.1 的 0–7 全轨，除 `BE` 外缺少迁移/输出任务 | **组件可复用，内容接口未收敛** |
| Word Image Pro | `website/v2-curriculum-data.js` 的 `word-image-on-01`；历史审查 | World → Word Image → Sentence 路线 | `ON` 从现实画面进入、三步低负荷、音频降级和进度隔离均已验收 | `ON` 的教学内容又独立存在于 V2 三层与 Level 1；它是学习载体，不可反向成为内容真源 | **已验收的表现层 Golden，适合作为试点验收参考** |
| Knowledge Network | V2 13 节点 + `v2-network.js` 校验 | V2 Network UI | 只允许有解释的 system/growth/combination/contrast 边 | V1 `related` 是无解释词表；850 canonical 也没有可验证 relation object | **网络 UI 已有，850 关系真源未建立** |
| 词源 / 历史助记 | `HISTORICAL_SCENE_MNEMONICS_V1.md`、Evidence Sidecar Contract V0.2 | 当前无 runtime consumer | 明确“记忆钩子 ≠ 真实词源”，并封住自动提升到学习者内容的路径 | Sidecar 明确禁止 runtime import；不能被 Golden Path 借机接入页面 | **本阶段排除，保持防火墙** |

## 4. 现状覆盖与重复事实

### 已有覆盖（应复用）

- 850 canonical：850 条；S/A/B 数量为 80 / 200 / 570。
- V1：50 个完整 Level 1 lessons、10 天 × 5 词路径、原有 localStorage 复习闭环。
- Golden layer assets：20 个结构化样例，其中包含 `on`。
- V2：13 个完整三层节点；其中 `at`、`on`、`in`、`to`、`into`、`be`、`see`、`look`、`watch` 同时存在于 Level 1；`-ing`、`the`、`if`、`too-to` 不在 Level 1。
- Word Image：一个已验收 `ON` 场景到词再到句的端到端样板。

### 重复与漂移（不得静默合并）

1. **`ON` 至少有四个内容承载点。** Golden layers、Level 1 lesson、V2 node、Word Image 各自写有核心画面或解释；它们现在不是同一个结构化对象。
2. **V2 覆盖优先于 V1。** `openWord()` 先检查 V2；重叠词打开时会渲染 V2 三层，不渲染 V1 lesson。任何后续迁移都必须显式比较这两套内容，不能只测试“页面能打开”。
3. **字段声明与数据事实不一致。** `data/vocabulary.schema.json` 与 `data/README.md` 描述的 Pro/learning layers 字段目前没有出现在任一 canonical 850 record。它们是设计意图或历史接口，不是现有数据覆盖事实。
4. **同一网络概念有两种表达。** V2 relation 有类型与解释；V1/850 只有 `related` 列表。后者不能自动升级为可学习网络边。

## 5. 缺失与教学断点

| 优先级 | 断点 | 证据 | 风险 | 本阶段处理 |
| --- | --- | --- | --- | --- |
| P0（已决） | V1.1 的完整 0–7 正文未在初始 `origin/main` 找到独立可导航文件 | Project OS 仅列 Vocabulary 入口；历史助记规范引用 V1.1 第 1 步 | 后续作者可能各自解释“Pro 必填项”，形成第二真源 | Owner 已授权，CP-2026-004 将恢复基线纳入唯一 canonical 路径；仍需独立审查 |
| P0 | canonical schema / README 与 850 JSON 的实际字段不一致 | 0/850 记录拥有旧 schema 的 required 字段；0/850 拥有 `learning_layers` | 将“设计字段”误读为“可直接上线的真源”，导致漂移或覆盖 | 后续实施前先做单独的 schema/authority 复核；本次不改数据 |
| P1 | Pro 内容没有 canonical → runtime 的单向投影 | Golden layers 和 V2 都不由 `vocabulary_850.json` 生成 | 内容更正需要多处同步；UI 可能自行造义 | 试点必须建立一个可验证、不可反向写入的单向路径 |
| P1 | `ON` 存在多份并行解释 | Golden / Level 1 / V2 / Word Image 四处 | 用户进入不同入口可能得到不同范围与措辞 | 把 `ON` 作为收敛试点，先做差异清单和定稿审批，禁止盲合并 |
| P1 | 完整 Pro 学习闭环缺 G4/G6 证据 | 大部分 V2 三层仅为理解/探索；`BE` 有特殊交互 | “三层内容”被误报为“完整 Pro 课程” | 试点须增加一个新情境迁移任务和一个可判定输出；不扩大到通用引擎 |
| P2 | 850 网络边的来源与解释不足 | 850 `related` 无 relation type / learner explanation | 会产生伪网络 | 第一试点只复用 V2 已验证边；不从 `related` 自动造边 |
| P2 | V1 复习与 V2/Word Image 的证据隔离 | 当前测试明确隔离它们 | 粗暴合并会破坏既有用户进度 | 试点先保持原 localStorage 合约；如要统一掌握模型，另开任务 |
| P3 | 历史场景、词源与证据层尚未是网页输入 | Sidecar Contract 明确禁止 runtime import | 把研究主张直接展示给学习者 | 排除；仅维持 evidence → teaching review → canonical proposal 防火墙 |

## 6. 建议的已审校试点词：`ON`

### 为什么是 `ON`

`ON` 是当前唯一同时拥有下列可审校证据链的高频关系词：

1. 在 `data/vocabulary_850.json` 中是稳定的 Level 1 词条（id 35）；
2. 在 `data/level1_lessons.json` 中已有 V1 lesson；
3. 在 `golden-samples.v1.json` 和 `golden-learning-layers.v1.json` 中已有结构化 Golden 样例；
4. 在 `website/v2-data.js` 中已有可运行的 Quick / Deep / Network 样板；
5. 在 Word Image / Sentence 中已有“杯子接触桌面 → ON → The cup is on the table.”的已验收现实场景链；
6. 历史助记审查已明确：对 `on`，词源/历史可以让位于现代关系模型，避免为了试点引入词源风险。

### 试点的教学边界

只验证一个新能力：**从真实场景看出“接触在表面上”的关系，并把它迁移到未教过的新场景。**

不在这个试点里同时加入：时间 `on`、平台/媒介、开关义、完整词源、`on/off` 全扩展、发音新体系或新的复习算法。它们可作为已存在 Deep/Network 的候选资料，但不能挤进第一条 Golden Path 的首屏。

### 试点通过前提

- 先由内容审校人逐字段比较四处 `ON` 内容，确认哪一份是拟提升的 canonical learner copy；
- 迁移题必须是**未直接教过**的表面接触新情境；
- 输出至少要求学习者完成一个可判定英语关系表达，而不是点击“理解了”；
- Word Image 的既有场景、语流和 V1/V2 进度隔离不得回归；
- 不使用未经 Evidence / Teaching review 的历史信息。

`ON` 是“已验收的产品样板 + 已存在的内容输入”，不是自动等于“已批准的 Pro canonical 词条”。

## 7. Owner 验收后可执行的最小实现范围

建议分为一个紧凑的 P3.x.1，而不是直接扩展 20 或 850 词：

1. **先定唯一内容入口。** Owner 在 V1.1 正文的可追溯来源与 canonical/Golden/sample 的关系上作出决定；若要写入 JSON，先形成字段兼容与迁移设计，不假装现有 schema 已经生效。
2. **只收敛 `ON`。** 以获批的 `ON` Pro 内容对象为唯一编辑入口，明确 Quick、Deep、Network、迁移题、输出题、审校状态及引用关系；Word Image 只引用已批准内容中的必要片段。
3. **只做单向投影。** 由 canonical/获批内容对象构建 runtime projection；运行时不回写 canonical，页面不新增语义，V2 Network 继续只接受带类型和解释的已审校边。
4. **保留兼容。** 不改变 V1 的 50 词入口、170 天排程、`english850_level1_progress_v1` 或已验收的 Word Image 路径。若显示策略需要从 V2 覆盖切到新的投影，必须有显式 feature/route decision 和回退。
5. **只加对应测试。** 不进行 850 批量导入、通用 CMS、通用题库或复习模型重构。

### 预计受影响文件（仅在 Owner 后续授权后）

| 类别 | 候选文件 | 原因 |
| --- | --- | --- |
| 内容与契约 | `data/vocabulary_850.json`、`data/vocabulary.schema.json`、`data/README.md` 或获批的唯一替代路径 | 只有在正式确定唯一 editable content source 后才写入 |
| 构建 | `scripts/build_level1_site_data.js` | 生成单向 runtime projection；不得手改 `website/data.js` |
| Runtime | `website/data.js`、必要时 `website/v2-data.js` | Derived 输出或删除重复消费点；不让两套内容同时生效 |
| UI | `website/app.js`、`website/app.test.js` | 复用三层容器，增加迁移/输出最小交互与回归 |
| Word Image | `website/v2-curriculum-data.js`（只在引用映射被批准时） | 保持现有场景链，不复制核心语义 |
| 审计 | 独立 Proposal、任务计划、内容审校、Builder 证据、Reviewer 报告、Owner 验收记录 | 证明没有静默改冻结规则或建立第二真源 |

### 明确不在最小范围内

- 不改 Frozen Decisions、Grammar Vision Core Contract 或 V1.1 0–7 顺序；
- 不批量写 20/850 个 Pro 词条；
- 不接入词源 Sidecar 到 runtime；
- 不改 CSV 的权威地位、不重分 S/A/B；
- 不重做网站导航、V1 复习或 localStorage；
- 不把 3D 卡作为 Pro 内容真源。

## 8. 可验收回归测试清单

### 实施前（必须完成）

- [ ] Owner 指出/确认 V1.1 0–7 正文的 canonical 可追溯位置；若仓库没有，先走标准治理，不在实现 PR 中临时发明。
- [ ] `ON` 四份现有内容逐字段差异表已审校，明确哪些保留、弃用或仅作展示层资料。
- [ ] 新内容对象通过 G1–G7；G1、G2、G4 不能带 FAIL。
- [ ] 如触及 canonical JSON/schema，已有 Change Control 判定、回退方案与 JSON/CSV 同步方案。

### 自动回归（实施中与候选提交前）

- [ ] `node --test website/app.test.js` 全部通过；保留 V1、V2、Word Image、Sentence、网络和 localStorage 隔离断言。
- [ ] `node --check website/app.js website/data.js website/v2-data.js website/v2-network.js` 全部通过。
- [ ] 新增断言：`ON` runtime 内容只能来自批准的投影；缺失/未审校字段安全降级，而不是 UI 自行生成解释。
- [ ] 新增断言：Quick 默认只展示一个主要认知动作；Deep/Network 按需展开；Network 边必须带 type、目标和学习者可见解释。
- [ ] 新增断言：迁移题使用未在 Quick 示例中出现的新场景；输出题有明确完成条件。
- [ ] 新增断言：`ON` Word Image 和 Sentence 的现有入口、语音降级及 V1/V2 进度隔离保持不变。
- [ ] 数据变更时：850 数量、ID、词形、S/A/B 分级、170 天计划与 JSON↔CSV 记录等价检查通过。
- [ ] `git diff --check` 通过，并核验没有未授权修改 Frozen/canonical 文件。

### 人工与独立审查（不能用自动测试替代）

- [ ] 375px 与桌面宽度：场景、Quick、迁移和输出各屏只有一个主要动作，焦点/键盘可用。
- [ ] 学习者路径：World 现实场景 → `ON` 核心关系 → 未教新场景迁移 → 输出；不依赖先翻中文。
- [ ] 内容审校：不把“ON = 中文在”或未核查历史故事当作核心解释。
- [ ] Independent Reviewer 依据 `REVIEW_PROTOCOL_V1.md` 审查 base/head、唯一真源、Frozen、行为变化、测试及回退。
- [ ] Owner 单独验收教学体验；Reviewer PASS 不等于 Owner 已接受。

## 9. 本次验证证据

| 检查 | 结果 |
| --- | --- |
| `git fetch origin main --prune` | 已核对远端 `origin/main = daa4f7e29f6cd90eb19756c11c82d1eec7b17149` |
| 隔离 | 从远端主线建立 `audit/p3-vocabulary-golden-path` worktree；未触及原有 dirty integration worktree |
| `node --test website/app.test.js` | **157 passed / 0 failed** |
| `node --check`：`app.js`、`data.js`、`v2-data.js`、`v2-network.js` | 通过 |
| `git diff --check`（审计开始时） | 通过；候选提交前需再次执行 |
| 数据核查 | `vocabulary_850.json` 850 条；S/A/B = 80/200/570；Level 1 lessons = 50；V2 nodes = 13；Golden layers = 20 |
| 只读核查 | 未改 `data/vocabulary_850.json`、`website/data.js`、`website/app.js`、冻结规则 |

## 10. LEARN 与待 Owner 决定

### LEARN

- **Rule：** 本次没有新规则。现有“内容先于表现层”“一个事实一个 canonical”“词源防火墙”足以约束试点。
- **Decision：** 需要 Owner 决定 V1.1 正文的可追溯 canonical 位置，以及 Golden sample 能否作为 canonical 数据写入前的受控输入。
- **Golden：** `ON` 可继续作为 Word Image 体验 Golden；不得仅凭此报告升级为 Pro canonical Golden。
- **Test：** 后续实现必须把“内容来自批准投影”“未教迁移场景”“输出完成条件”“既有进度隔离”固化为测试。
- **Template / Skill：** 暂不新增。先验证一个收敛试点，避免为未来假设建立抽象框架。

### Owner 决定记录（2026-10-08）

1. Owner 授权 Codex 决定 V1.1 0–7 的 canonical 路径；采用 `docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_1.md`，版本 V1.1，受 `CP-2026-004` 约束。
2. Owner 批准以 `ON` 作为“收敛已有内容、补齐迁移与输出”的唯一试点，不扩展到第二个词。

后续仍须先完成独立的 P3.x.1 试点设计与实施计划，才可改动数据、页面或运行时。
