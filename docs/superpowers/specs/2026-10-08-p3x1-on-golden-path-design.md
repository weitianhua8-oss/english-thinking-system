# P3.x.1｜ON Vocabulary Skill Pro → Website Golden Path 设计规格

> 状态：Owner 已确认方案 A；待 Owner 审阅本规格后，才可编写实现计划与进入开发。
> 范围：仅 on 的收敛试点；不改 main，不扩展为全量词汇迁移。

## 1. 任务定义

### 目标

把 on 的 Pro 教学内容收敛到唯一 canonical 数据源，并让网站从该数据生成、读取和呈现一条可完成的 Golden Path：

Quick 看见核心画面 → Deep 看懂关系 → Network 建立对比 → 新场景迁移 → 输出验证

本试点验证的唯一新增认知能力是：

> 学习者能在真实场景中看见“物体与承托表面接触”的 on 关系，并把它迁移到一个未直接讲授的新场景。

### 非目标

- 不迁移其余 849 个词。
- 不修改《英语思维850 · 新单词教学标准 V1.1》的 0–7 教学轨或冻结规则。
- 不引入时间 on、媒体/平台 on、on/off、词源、音标/音频或新的复习模型。
- 不重做 Word Image、Sentence、V1 课程或 V2 的整体架构。
- 不把 Golden 样本文件重新指定为真源。

## 2. 范围与风险

### 任务等级

本阶段为 **T4**：它同时影响 canonical 数据契约、构建投影、网站运行时和测试；虽然内容只覆盖一个词，但链路跨模块。

### 拟变更文件（实现阶段）

| 层 | 文件 | 变更目的 |
|---|---|---|
| Canonical | data/vocabulary_850.json | 仅为 on 增加已审校的 learning_layers。 |
| Contract | data/vocabulary.schema.json | 使基础八字段契约与真实 850 数据一致，并定义可选 Pro 扩展。 |
| Source guide | data/README.md | 明确八个基础字段与可选学习层的维护边界。 |
| Build | scripts/build_level1_site_data.js | 从 canonical learning_layers 生成网站的 proLessons runtime 投影。 |
| Runtime data | website/data.js | 仅由构建脚本重生成；不得手写编辑。 |
| Website | website/v2-data.js | 删除静态 on 语义节点，保留其他 V2 基础节点。 |
| Website | website/app.js | 合并 runtime Pro 节点、渲染迁移/输出步骤并保持原有入口。 |
| Website | website/style.css | 仅增加试点迁移场景和输入反馈所需样式。 |
| Asset | website/assets/on-transfer-hat-bed.svg | 一个原创、无外部依赖的转移场景插图。 |
| Tests | website/app.test.js 及必要的构建测试 | 覆盖数据、合并、交互与回归边界。 |
| Governance | 新建 CP-2026-005 | 在动 canonical/schema/runtime 前记录契约变更并取得 Owner 批准。 |

### 主要风险与控制

| 风险 | 控制方式 |
|---|---|
| JSON、Golden 样本、V2 静态数据三份内容继续漂移 | 仅 JSON 中的 learning_layers 为 on 语义真源；Golden 文件仅保留为历史审校输入；删除静态 V2 on 语义节点。 |
| 旧 schema 与真实 850 JSON 不一致 | 本次先把 schema 修正为真实八字段基线；Pro 内容为可选扩展，不能使其余 849 条失效。 |
| 合并后 V2 知识图断链或产生重复 id | 构建与运行时均验证唯一 id、目标节点存在、关系类型合法；测试以合并后的 13 节点图为准。 |
| 试点变成“多变量大课” | Deep 只保留接触/承托的单一原型；迁移只测此原型。 |
| 点击完成被误当作掌握 | 只有答对新的迁移场景并完成填空输出，才显示本页完成反馈；不写入新的长期掌握/复习状态。 |

## 3. 真源与运行时边界

### 3.1 唯一内容真源

data/vocabulary_850.json 中 id: 35、word: on 的记录，是本试点唯一可编辑的词汇与 Pro 教学内容真源。

《英语思维850 · 新单词教学标准 V1.1》（docs/english-thinking-os/vocabulary/NEW_WORD_TEACHING_STANDARD_V1_1.md）继续是 **0–7 教学轨与审校标准的 canonical**，不承载某一个词的实际课程内容。

| 资料 | P3.x.1 身份 | 允许用途 |
|---|---|---|
| data/vocabulary_850.json | Canonical | 编辑 on 的 Pro 内容并生成网站数据。 |
| data/vocabulary.schema.json | Contract | 校验 JSON 结构。 |
| data/golden-samples.v1.json、data/golden-learning-layers.v1.json | 审校参考 / 历史样本 | 对照内容，不参与构建，不反向覆盖 JSON。 |
| data/level1_lessons.json | 既有 V1 课程源 | 保留 V1 课程，不复制 Pro 内容。 |
| website/v2-data.js | 其他词的 V2 基础 runtime 数据 | 不再承载 on 的语义内容。 |
| website/data.js | Derived runtime | 只能通过构建脚本更新。 |

### 3.2 目标链路

~~~text
Vocabulary V1.1（教学标准）
              ↓ 审校约束
data/vocabulary_850.json（on.learning_layers，唯一内容真源）
              ↓ scripts/build_level1_site_data.js
website/data.js（D.proLessons，Derived）
              ↓ website/app.js 合并
V2 基础图 + Pro on 节点（唯一运行时 on 节点）
              ↓
Quick → Deep → Network → Transfer → Output
~~~

此链路不让 website/app.js 内硬编码 on 的教学文案，也不让 website/v2-data.js 保留第二份 on 内容。

## 4. Canonical 数据契约

### 4.1 基础记录

本次承认并固定当前 850 数据实际拥有的八个必填字段：

id、word、grade、level、category、subcategory、core_direction、related。

不能把当前不存在于 850 条记录中的 ipa、zh、cat、content_status 继续声明为必填。它们如有后续需要，必须通过独立 CP 引入。

learning_layers 是可选对象：只对已审校、准备进入 Pro runtime 的记录出现。因此其余 849 条无需补字段、无需迁移。

### 4.2 on.learning_layers 目标形状

字段采用项目现有的 learning_layers 命名，不另造平行 pro 容器：

~~~json
{
  "learning_layers": {
    "review_status": "reviewed",
    "quick": {
      "hook": "…",
      "core_image": "物体落在并接触一个承托表面",
      "one_line": "ON = 接触并落在表面上。",
      "prototype": "The cup is on the table."
    },
    "deep": {
      "logic": "…",
      "scenes": [
        {
          "title": "接触 + 承托",
          "body": "…",
          "example": "The cup is on the table."
        }
      ],
      "structures": ["be on + surface"],
      "chinese_trap": "…",
      "study_tip": "…"
    },
    "network": {
      "system_id": "space-relations",
      "relations": [
        {
          "type": "contrast",
          "target": "in",
          "label": "接触表面，不在里面",
          "explanation": "…"
        },
        {
          "type": "contrast",
          "target": "at",
          "label": "不是地点落点",
          "explanation": "…"
        }
      ],
      "next_recommended": ["in", "at"]
    },
    "assessment": {
      "transfer": {
        "asset": "assets/on-transfer-hat-bed.svg",
        "alt": "一顶红帽子接触并放在床面上",
        "prompt": "看新场景：帽子和床是什么关系？",
        "answer": "on",
        "feedback_correct": "对。帽子接触并落在床的表面上，所以用 on。",
        "feedback_incorrect": "再看一眼：帽子没有进到床里面，它接触的是床的表面。"
      },
      "output": {
        "prompt": "用刚才看见的关系补全句子：",
        "before_blank": "The hat is ",
        "after_blank": " the bed.",
        "answer": "on",
        "feedback_correct": "完成：你把 on 用到了一个新的场景。",
        "feedback_incorrect": "提示：想想帽子是否接触并落在床的表面上。"
      }
    }
  }
}
~~~

这是一份字段形状说明，不是待直接复制的最终内容；最终中文文案、英文例句、比较说明必须按 V1.1 的五项后台审校完成后写入。

### 4.3 约束

- review_status: reviewed 是构建进入 D.proLessons 的门槛；其他状态不进入 runtime。
- quick、deep、network、assessment 对 reviewed 记录均为必填。
- network.system_id 必须是现有 V2 system id；本试点的 on 固定属于 space-relations。
- deep.scenes 在本试点只允许一个“接触 + 承托”场景，防止把其他 on 义项带入主线。
- network.relations.target 必须在合并后的 V2 图中存在；关系类型只能使用现有图支持的 system、growth、combination、contrast。
- assessment.asset 必须是站内相对路径；不使用外链、追踪资源或生成式图片服务。
- output.answer 比较时只忽略首尾空白与大小写；不得接受同义替代，以保持本试点可验收。

## 5. 生成与合并设计

### 5.1 构建投影

scripts/build_level1_site_data.js 读取 JSON 后：

1. 校验基础八字段。
2. 找出 learning_layers.review_status === reviewed 的记录。
3. 对每条记录校验 Pro 必需字段和关系目标。
4. 将其转换成仅供网页消费的 D.proLessons，字段名可适配现有 V2 renderer，但内容不得重复手写。
5. 与既有 vocabulary、lessons、plan、contrasts 一起写入 website/data.js。

D.proLessons 是 Derived，不是第二编辑入口。构建失败时不写出不完整的 runtime 文件。

### 5.2 V2 图合并

website/v2-data.js 在实现后仅保留不含 on 的 12 个基础 V2 节点。
website/app.js 以纯函数把 D.proLessons 合并进基础 V2 节点，得到页面实际使用的 13 节点图。

合并规则：

- 同一 id 只能出现一次；若 runtime id 与基础节点冲突，抛出可诊断错误，不静默覆盖。
- on 只能由 D.proLessons 提供；基础 V2 数据不得存在 id: on。
- 图校验在合并后执行，所以 at/in 指向 on 的既有关系仍然有效。
- 页面打开 on 时，必须命中合并后的 Pro 节点；其他 12 个 V2 节点行为不变。

## 6. 页面 Golden Path

### 6.1 保留的既有入口

学习者仍可从 V1 课程、词表、V2 知识图和既有链接打开 on。入口不迁移、不新增导航系统。

### 6.2 页面顺序

| 步骤 | 学习者看到什么 | 验收意图 |
|---|---|---|
| Quick | 核心画面、短句、一个原型例句 | 先看见“接触并落在表面”的关系。 |
| Deep | 一个接触/承托场景、结构 be on + surface、与中文直译误区的最小提示 | 只解释本试点的单一变量。 |
| Network | 与 in、at 的最小对比关系 | 分清“表面接触 / 在里面 / 地点落点”。 |
| Transfer | 原创帽子在床上的新场景图；先选 on 或 in | 检查能否迁移，而非重认原例句。 |
| Output | 填空 The hat is ___ the bed. | 学习者主动写出 on。 |
| Completion | 仅在迁移选择正确且填空正确后显示完成反馈 | 给出可观察的完成条件。 |

### 6.3 交互规则

- Transfer 先提供 on / in 两个选择。错误反馈只把注意力带回“接触表面，不在里面”，不直接暴露答案。
- 填空使用单行文本输入和提交按钮；错误时保留输入，给出提示；正确时进入完成状态。
- 迁移和输出状态只在当前页面会话中保存。不得修改既有 V1/V2 进度存储，也不得宣称长期掌握。
- 键盘可操作：选择、输入、提交均可完成；插图必须有 alt。
- 小屏幕按单列排列；不会遮挡既有 Quick/Deep/Network 控件。

## 7. 实现前的治理关口

进入实现前，必须新建 **CP-2026-005**，至少说明：

1. schema 从旧的失真必填字段改为真实八字段基线；
2. learning_layers 作为可选 canonical Pro 扩展的形状与审校门槛；
3. on 静态 V2 内容删除、改由 JSON → build → runtime 投影提供；
4. website/data.js 的新增 proLessons 属于 Derived；
5. 对 CSV 镜像的影响：八个基础字段仍保持现有镜像规则；嵌套 learning_layers 不写入 CSV，避免把 CSV 变为第二真源；
6. 回滚方式：撤回该 CP 对应提交即可恢复现有静态 on 运行时。

CP 获 Owner 批准后，才可改 canonical、schema、构建器或网站代码。

## 8. 最小可验收实现范围

满足下列全部条件即完成 P3.x.1，不扩大范围：

1. 850 JSON 仍为 850 条，且只有 on 新增 reviewed learning_layers。
2. schema 能校验现有 850 条基础数据，且能校验 on 的 Pro 扩展。
3. 构建脚本可从 JSON 再生 website/data.js 的 proLessons；手改 runtime 后重建会恢复。
4. 运行时只有一个 on V2/Pro 语义节点，且合并后图保持 13 个节点、4 个系统、关系无悬挂。
5. 网页的 on Golden Path 可完成：新场景选择正确、填空正确、显示完成反馈。
6. V1 的 on 课程、其他 12 个 V2 节点、Word Image、Sentence 和既有进度行为均未回归。

## 9. 回归测试清单

### 自动测试

- [ ] JSON 数量仍为 850；八个基础字段对所有记录存在且类型正确。
- [ ] on 是唯一 reviewed Pro 记录；其 Quick/Deep/Network/Assessment 字段完整。
- [ ] 构建器拒绝 reviewed 记录缺字段、重复 id、非法关系类型或不存在的 relation target。
- [ ] 从 JSON 重建后 website/data.js 含预期的 D.proLessons，且不需人工编辑。
- [ ] 基础 V2 不含 on；合并后恰有一个 on，并通过图完整性校验。
- [ ] 打开 on 使用派生 Pro 内容而不是静态副本；其他 V2 节点仍可打开。
- [ ] Transfer 的正确/错误反馈、填空的空白/错误/正确状态都可判定。
- [ ] 正确完成 Golden Path 不改变既有 V1/V2 progress storage 合约。
- [ ] 现有 node --test website/app.test.js 的全部测试继续通过，并增加以上覆盖。

### 人工验收

- [ ] 在本地打开页面，桌面与约 375px 宽度均可完成完整路径。
- [ ] 先选错 in 后能理解提示并改为 on；再填错后能修正为 on。
- [ ] 离开并返回 on 后，不出现新的“已长期掌握”承诺或异常进度。
- [ ] 打开 in、at、任一非 on V2 节点，以及 Word Image / Sentence，确认既有入口可用。

## 10. 完成后的审查与交付

实现完成后依次进行：

1. 构建与自动回归测试；
2. 独立审查（真源、契约、重复内容、教学范围和 UI 路径）；
3. Owner 手工验收；
4. 记录 Candidate SHA；
5. 仅在 Owner 明确同意后，才讨论合并或推送。
