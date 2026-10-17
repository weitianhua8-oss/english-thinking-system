---
name: english-thinking
description: Use when teaching or understanding English words through scenes, memory hooks, meaning growth, word formation, and output practice, or producing English-thinking learning cards.
---

# English Thinking Skill v1.3

更新日期：2026-10-10。兼容 v1 的完整知识卡字段、句子思维模型与分层展示；本次完成词汇助记流程的事实边界治理对齐。

## 使用边界与真源

适用：英语思维学英语、理解单词、词汇教学卡。输入：目标词、目标义项及儿童/成人深度；输出：0～7教学内容、必要助记和可观察输出任务。
依照 [Project OS](../../PROJECT_OS.md)、[Teaching OS](../../docs/TEACHING_OS_V2.md)、[课程架构 V2.0](../../docs/curriculum/ENGLISH_THINKING_850_COURSE_ARCHITECTURE_V2.0.md)、[新单词教学标准 V1.1](../../docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_1.md) 与 [助记与事实边界 V1.0](../../docs/english-thinking-os/vocabulary/MEMORY_HOOK_TRUTH_BOUNDARY_V1.md)。本次新增规则来自用户明确授权，不倒写为历史 V1.1 原文，不修改 Grammar Vision 冻结规则。

目录：标准教学主轨 → 记忆外挂 → 构词助记子流程 → 分层展示 → 原有知识卡与理解模型 → 验收案例 → 版本记录。

## Purpose
Turn English learning from Chinese-translation memorization into scene-based conceptual understanding.

## Core principles
1. See the scene before translating: restore the real situation first; do not map English to Chinese word by word.
2. Focus first, expand outward: identify the core subject/entity and action/state, then add place, time, accompaniment and detail.
3. Everything can be conceptualized as an entity/container: abstract ideas may be treated as things that can be entered, carried, removed, connected or separated.
4. Within a target meaning or genuinely related meaning branch, use a core image and natural extensions. Do not force unrelated senses into one image or present them as an unexplained list of Chinese translations.
5. Spatial relations matter: for function words and prepositions, prioritize dimensions, direction, contact, containment, connection and separation.
6. Etymology/root/affix is auxiliary: include it only when it materially helps explain the core image or supports transfer to related words. Never let etymology replace the modern semantic core.

## Standard analysis pipeline｜V1.1 主轨

词汇教学固定保留以下顺序，不能把记忆外挂移到结尾：

| 步骤 | 模块 | 执行动作 |
| --- | --- | --- |
| 0 | 词型判断 | 判断目标词性、义项与学习深度，不机械填满模块。 |
| 1 | 记忆外挂 | 选一个稳定入口；有可靠拆分时执行下方构词助记子流程。 |
| 2 | 核心画面 | 建立目标义项的真实场景，不强造万能核心义。 |
| 3 | 核心结构 | 呈现必要结构、形式与使用条件。 |
| 4 | 意义生长 | 连接必要的现代语义分支，不把联想当语义证据。 |
| 5 | 易混对比 | 在同一语境与维度比较容易混淆的词。 |
| 6 | 真实场景 + 高频搭配 | 给自然例句与可迁移的高频搭配。 |
| 7 | 压缩总结 + 输出测试 | 总结画面与用法，以选词、回忆或造句检查学习。 |

后台仍做频率、词性、语域、语义分支、词源五项校验；没有可靠依据的语言事实标待审，不虚报通过。记忆联想不承担词源事实校验，但必须检查是否误导词义、拼写或发音。知识网络在需要时连接，不新增一条必学主轨。句子/结构任务继续使用下方原有模型，不强套词汇拆分。

## 步骤1｜Memory Hook 记忆外挂

**正式原则：Memory Hook 不承担词源解释责任。** 首要目标是帮助学习者记住，不要求联想是真实词源。允许有意虚构的谐音、字形、拟声、故事、拆字和中文联想；不能把它们写成“这个词真正来自……”或语言规律。

助记优先级固定为：**记得住 > 有画面 > 能连到词义 > 简单 > 有趣 > 是否真实词源**。这是助记选择顺序；进入 Etymology/真实构词说明时，可靠性是准入条件，不能排在最后。

### Memory Hook Type 枚举

谐音、象形、拟声、近形/对称、故事/场景、已知词挂钩、构词助记、复合词助记、中文联想、无需外挂。

选择一个主类型，必要时补一个辅助类型，不把所有方法堆在同一课。此枚举用于教学内容标记，不自动新增或改动生产数据字段。

### 单词助记 · 融合规则 V1.2

助记方法可以按实际记忆效果融合：拆词联想、谐音、词根、场景、故事、图像、对比等都可以组合使用。优先利用学习者熟悉的小词和自然的中文联想，把记忆链做成：**正确拼写 → 可回忆的画面或短故事 → 目标词义**。

- **效果优先，不强凑方法**：通常给出一个最短、最稳的最佳融合方案；只有确有不同学习者入口或主要方案容易串词时，才补充备选。没有必要时不强行同时使用多种方法。
- **先守住拼写和词义**：联想必须能回到正确单词拼写，并立即接到当前目标义项；不能只记住中文口诀、错误发音或无关故事。
- **优先熟悉入口**：拆词时优先选学习者已认识的小词或构件；中文联想只作记忆提示，不替代标准英语发音或现代词义解释。
- **事实分层不变**：真实词根、构词和词源须单独核验；人为拆词、谐音或故事必须明确标为“助记设计”，不能冒充真实来源。

**示例 · complete（助记设计，不是真实词源）**：`com` 联想“完全”，`plet` 联想 `let`“让”；画面是“让它完全铺满”，于是连到“完整 → 完成”。这条路线用于回忆拼写与词义，不说明 complete 的真实词源或构词事实。

### 基础词桥接助记｜形近与音近

设计整词或构件助记时，先尝试连接学习者已经熟悉的基础词：**陌生词/构件 → 形近或音近的已知基础词 → 熟悉画面 → 目标词义**。不要求有真实词源关系，也不要求完全同形或同音；按原有助记优先级选用，不强行凑联想。

- **形近桥接**：找相似字母或轮廓，可用缩写、重复、删字、加字等人为变化；明确关键差异，确保最终能还原正确拼写。
- **音近桥接**：找读音相似的熟悉基础词，把它的画面接到目标词义；说明相似的声音片段，不用基础词读音取代目标词读音。
- **构件也适用**：词根、前缀、后缀的记忆钩子同样先尝试熟悉基础词，不只列构件释义。只有学习者真正认识的词才算熟悉入口。
- **控制负担**：优先短而直接的桥接；变换步骤比目标词更难记、容易串词或误读时，换钩子。儿童只展示压缩后的口诀，完整拼写过程按需展开。
- **事实分层**：这些关系标为“助记”，不能说成真实缩写、历史演变或通用造词规律；可靠构词事实继续单独核验。沿用“已知词挂钩”主类型，形近可辅标“近形/对称”，音近可辅标“谐音”，不新增枚举或数据字段。

用户提供的示例：**sist → 联想两个 stand → 站了又站，站稳不退**。可展开为人为拼写路线 `stand + stand → stst → 省一个 t 得 sst → 插入 i 得 sist`；每步字母变化必须正确，不能声称 `stst` 只加 `i` 就得到 `sist`。这条桥接服务于 insist 的立场画面，属于助记设计，不是词源解释。

### 执行与检查

1. 确认要记住的是哪一义项、拼写或构件；已有简单入口时选“无需外挂”，说明原因，不硬编。
2. 设计一条短钩子，立即连接核心画面与目标词义。选择标准：好记、稳、不易串词、能连到词义。
3. 使用标准英语声音示范或可靠音标；中文谐音只是提示，不代替发音，不按口诀修改拼写。怕影响发音时换字形或场景钩子。
4. 遮住单词，让学习者从画面提取词，再从词恢复画面；若串词、误读或只记住中文，换钩子或取消外挂。
5. 不适合儿童的恐惧、暴力或羞辱故事换成温和场景。好记不能靠牺牲词义边界或儿童接受度。

## 词根词缀也要有助记｜构词助记子流程

目标：同时记住构件及组合关系。适用：存在可靠 prefix/root/base/suffix 或复合词拆分；不按字母外形强拆陌生词。

1. **识别真实构词**：核对可靠词典或语言资料，记录来源与适用义项；区分词根、独立基础词、前缀、后缀。无把握的拆分不当事实教，可改为明确标注的字形助记。
2. **解释构件真实义**：逐项给出该词中的真实含义和作用，不把某个前缀在此处的含义推广到所有词。
3. **每个构件/组合都配助记**：每个实际参与拆分的构件必须有短钩子或画面，再给组合动作；已熟悉构件也可复用原画面。仅写“un- = 不、-ness = 状态”不算完成。
4. **组合成整体画面**：按真实组合关系串起来，接回现代整体意义；补必要拼写变化。不要暗示所有词义都能由构件机械相加。
5. **分清事实与助记**：后台或成人深层内容用“构词事实 / 助记设计”两栏；历史 Etymology 另行核验，不由拆分推导历史故事。
6. **检查标准**：遮住解释后，能说出构件作用、恢复组合并认出整体词；若负担过重，儿童 Quick 只显示整体画面，逐构件内容保留在 Deep，不跳过制作。

异常处理：事实依据不足时省略相关真实构词说明，保留合适的非词源助记；钩子串词时替换；构件过多时分层展示，不一次教授多个新变量。

## 儿童与成人展示

- 儿童 Quick：短标签“助记” + 一个钩子 + 一个画面，无需每次写“不是真词源”。标签已表明是记忆工具；孩子问真实来源或发生误解时再解释。
- 成人/Deep：按需显示“助记 vs 真实构词/词源”，附事实来源和不确定项。儿童也可以进入同一知识内核的深层视图。
- 两种模式都不能把助记说成词源事实。可靠拆分的完整助记在后台制作，前台按认知负担展开。

## 从三套助记讲义吸收的讲解方法

项目吸收讲义中的机制，不复制未经核验的事实。完整的 Derived 词汇表、课程结构和知识卡样例见 `research/external-sources/liu-yinan-memory-hooks/`。

### 方法选择顺序

先问“学习者是否已经认识一个可桥接的基础词”。若有，优先使用形近或音近基础词；若会造成串词，再换场景、象形、拟声、构词或复合词助记。每个词只选一个主钩子，必要时加一个辅助钩子。

### 讲义机制的项目化规则

- 生活主题词：先给真实场景，再给一句短钩子，适合 Quick / Scene。
- 基础词根词缀：构件事实、构件助记、组合画面分栏，适合 Structure。
- 形近/音近词：先确定对比维度（动作、位置、媒介或结果），再设计成对画面，适合 Contrast。
- 拟声和象形：只承担当下的声音/形状入口，不扩大成词源或通用字母规律。
- 词义扩展：从一个现代核心关系生长到高频义项，不能用口诀代替意义解释。
- 复合词和词族：优先展示组合关系与整体画面；不可靠的拆分改标为“助记设计”。

### 生产卡的最小字段

每个 Derived 词条至少记录：`word`、`ipa`、`part_of_speech`、`meaning`、`memory_hook`、`memory_hook_type`、`core_image`、`structure`、`collocations`、`contrast`、`output_check`、`fact_status`。其中 `fact_status` 区分 `memory_only`、`morphology_reviewed`、`etymology_reviewed`；未核验不进入真实构词栏。

## Required learning-card fields
- Word / structure
- Core image
- One-sentence underlying logic (modern meaning, not a historical-origin claim)
- Meaning growth
- Core scenes
- High-frequency structures / fixed collocations
- Examples
- Confusable contrasts
- Pitfalls
- Memory hook + Memory Hook Type；可靠拆分时附构件事实、逐构件助记与组合画面
- Knowledge-network connections
- Root / prefix / suffix / etymology (only when useful)

Do not delete these fields merely to make the card shorter. The quick-learning UI may show a subset, but the source knowledge object should preserve the complete structure.

## Sentence-thinking model
English sentence building should follow scene focus rather than a Chinese sentence template:
1. Lock onto who/what is central.
2. Express the central action or state.
3. Expand outward with location, time, accompaniment and other background.
4. Put details describing the focal entity close to that entity.
5. Prefer directly describing the perceived scene over composing Chinese first and translating it.

## Conceptualization model
Treat abstract concepts as manipulable entities or containers when English does so naturally.
Examples of conceptual patterns:
- fall in love: enter/fall into a conceptual container/state.
- take the pressure off: remove pressure from a target.
- take your problems to a consultant: carry a conceptual object to someone.

## Spatial model examples
- at: point / precise target.
- on: surface contact / attached or connected state.
- in: container / three-dimensional inclusion.
- on ↔ off: connection/activation ↔ detachment/disconnection.
- with: two entities brought into the same situation; context determines accompaniment, instrument or opposition.

The purpose of these examples is not to freeze every usage into a slogan, but to show how multiple usages can be generated from a compact conceptual model.

## Three learning layers
### Layer 1 — Quick understanding
Show the minimum needed to grasp the word quickly: word + optional short memory hook + core image + one-sentence logic + one prototypical scene.

### Layer 2 — Deep learning
Reveal meaning growth, scenes, collocations, examples, confusable contrasts, pitfalls and useful morphology/etymology.

### Layer 3 — Knowledge network
Connect the current item to related words, structures, spatial relations, grammar and semantic families.

## Quality rules
- Prefer a coherent semantic model within each supported meaning branch over a list of translations; keep unrelated senses separate.
- Examples must demonstrate the conceptual model, not merely contain the target word.
- Confusable contrasts must explain why the mental picture changes.
- Use Chinese as an explanatory bridge, not as the primary storage model.
- Preserve uncertainty: do not invent an etymology merely because it makes a memorable story.
- Keep the complete source content even when the UI chooses a shorter presentation.


## 建议验收案例

以下是教学设计样例，需用实际回忆表现判断是否好记，不能宣称已经证明学习效果。

| 词与类型 | 助记设计 → 核心画面 | 验收任务与通过标准 |
| --- | --- | --- |
| bank · 谐音 | “办卡” → 到银行柜台办卡；本例聚焦银行义项，河岸另建场景。 | 遮住词后由柜台画面提取 bank；能说 I go to the bank.，不把河岸等所有义项硬接到办卡。 |
| stretch · 谐音 + 场景 | “死拽” → 把弹力带拉长；儿童可换“使劲拽”的画面。 | 看到拉伸动作说 stretch，并用 Stretch your arms. 表达；发音从英语示范学。 |
| ambulance · 谐音 | 成人可选“俺不能死” → 救护车赶来；儿童怕恐惧时换“闪灯救护车赶来”的场景钩子。 | 救援场景能提取 ambulance，并说 Call an ambulance.；不把口诀当准确读音。 |
| supermarket · 复合词助记 | super-：把画面放大的按钮；market：推车买东西的市场画面；组合：按放大按钮，市场变成大型自助商店。 | 能回忆两个构件及组合，指认超市并说 We buy food at the supermarket.；按钮是助记，不是构词历史。 |
| unhappiness · 构词助记 | 见下方逐构件演示。 | 能恢复 un-、happy、-ness 的作用与画面，写对 unhappiness，并说 She talked about her unhappiness. |

### center 基础词桥接验收

| 词与类型 | 助记设计 → 核心画面 | 验收任务与通过标准 |
| --- | --- | --- |
| center · 已知词挂钩 + 象形 | c 像开口的圆，enter 是走进去：从开口进去，停在中心；c + enter 恰好还原 center 拼写。此为字形助记，不是真实构词；进入圆内不一定到达圆心，故事需保留“停在中心”这一步。 | 遮住词后能写 center，分清 enter 的进入动作与 center 的中心位置，并说 Put the book in the center of the table.；center 开头 c 发 /s/，不把 -er 拆成表示人的后缀。 |

### prefix + root/base + suffix 演示：unhappiness

真实教学拆分是 **un- + happy（基础词/base，并非拉丁词根）+ -ness**；组合为 **(un- + happy) + -ness**，拼写中 y → i。

| 构件 | 构词事实（本词中的作用） | 助记设计（人为画面） |
| --- | --- | --- |
| un- | 否定：not。 | 给笑脸贴一个“不”字遮罩；看到 un- 想到遮住原来的开心。 |
| happy | 开心的，是基础形容词。 | 一张笑脸写着 happy，连回学习者熟悉的开心场景。 |
| -ness | 把形容词转成表示性质/状态的名词。 | 用写着 -ness 的“状态盒”装起表情，把感受变成可以谈论的东西。 |
| 组合 | unhappy → unhappiness，不开心 → 不开心的状态。 | 先遮住笑脸，再装进状态盒；盒子里的整体就是 unhappiness。 |

构词依据：[语言学教学原文 Chapter 4](https://dingo.sbs.arizona.edu/~hharley/PDFs/WordsBook/Chapter4.pdf)；现代词义参照 [Cambridge unhappy / unhappiness](https://dictionary.cambridge.org/us/dictionary/english/unhappy)。supermarket 的构成与现代词义参照 [Dictionary.com](https://www.dictionary.com/browse/supermarket)。这些依据支持事实栏，不证明人为记忆画面是真实词源。

## 版本与变更说明

- **v1 → v1.1（2026-10-06）**：按用户授权对齐 V1.1 的0～7主轨；强化 Memory Hook 原则、优先级及十类枚举；新增逐构件助记、儿童/成人展示、异常处理与验收案例。补齐 Skill 识别信息，保留原有知识卡字段和理解模型。
- **任务卡（T2）**：角色=词汇 Skill 维护；目标=稳定产出有效助记；真源=上方规范及本次用户要求；范围=本文件；不做=修改冻结规则、历史标准、数据或页面；验收=十项要求逐项检查 + 五组案例 + 行为复测。此升级不表示网站或850词条已经迁移。
- **回退点**：本机旧版备份 `/tmp/english-thinking-skill-20261006/SKILL.v1.md`（临时备份）。当前工作区无 Git，未提交或推送；需要进入远程版本记录时，在正式仓库审查本文件差异。
- **验证记录**：2026-10-06，更新前基线缺少主轨、逐构件要求、优先级与儿童展示约束；更新后 bank / unhappiness 行为复测及独立十项审查 PASS。相对链接、0～7顺序、五组案例、原有理解模型保留、空白及识别信息替代检查 PASS。标准 quick_validate 因缺少 PyYAML 未运行成功，不冒充通过。真实学习者记忆效果与 Owner 体验验收尚未执行。
- **v1.1 → v1.1.1（2026-10-06）**：依据用户 sist/stand 提醒，补充形近与音近的基础词桥接助记，应用到整词与构件；保持0～7主轨及十类枚举。旧版回退点：`/tmp/english-thinking-skill-20261006/SKILL.v1.1.md`。
- **v1.1.1 → v1.1.2（2026-10-06）**：补充 center/enter 字形桥接验收案例，区分动作、位置、正确读音与真实构词。回退点：`/tmp/english-thinking-skill-20261006/SKILL.v1.1.1.md`。检查：拼写拼接、0～7顺序、相对链接与新增范围通过；未做真实学习者试教。
- **v1.1.2 → v1.2（2026-10-06）**：吸收三套讲义的可复用机制，新增基础词优先的助记选择顺序、生活场景/构词/对比/拟声/词族的项目化规则和最小 Derived 词条字段。新增研究包不改 canonical 850 数据、Grammar Vision 冻结规则或 `sources/`。
- **v1.2 → v1.3（2026-10-10）**：按 Owner 明确确认，将“助记以方便记忆为首要、不要求真实”升级为项目可追溯规则；新增对 `助记设计` 与 `语言事实` 的引用边界。既有助记流程、词库、网页与 Grammar Vision 冻结规则不变。
