# 3D Knowledge Card Skill v1

## Purpose
Convert reviewed structured learning content into a spatial visual summary for quick understanding, review, sharing or export. The image is part of the teaching model, not decoration, but this Skill is not a content source or a complete Pro teaching carrier.

## Canonical visual reference
The approved `BE动词：连接身份、位置与状态` 3D knowledge card is the visual source of truth.

Detailed visual rules are frozen in:
`visual/3d-card-standard/BE-reference/STYLE_GUIDE.md`

## Non-negotiable rule
Do NOT build the cards around a fixed character/IP system. Generic people may appear only when they help explain a scene. The visual system follows the BE 3D-card model, not recurring branded protagonists.

## Content authority
Lite and Pro describe learning-content depth, not 3D Card production modes. Their canonical responsibilities are defined in `docs/english-thinking-os/03_LEARNING_OBJECTS.md`.

- Consume reviewed Lite or Pro structured content; do not independently redefine its teaching depth.
- A Pro static export must select from completed Pro structured content. It is a visual summary, not Pro itself.
- For a Pro static summary, preserve the core image, core structure, most important meaning, most necessary comparison and one compressed conclusion before lower-priority details.
- If the required structured content is missing, return to the content source for completion or review instead of inventing a parallel Pro analysis inside this Skill.
- Historical Lite / Pro card-mode rules, including default-Lite routing and high-density Pro cards, are superseded by the current content-depth architecture. Keep their Git history; do not restore them as active rules.

## Generation pipeline
Reviewed structured content
→ locate the approved core image / underlying logic
→ select only the content needed for this visual summary
→ determine the best spatial metaphor
→ identify subject/object/state relationships
→ determine direction, path, contact, containment, connection, separation, transfer or state change
→ determine information hierarchy
→ apply BE 3D-card visual language
→ generate the card
→ verify that the visual itself explains the English logic
→ verify that the card has not created or changed source meaning

## Visual-semantic principles
1. Meaning before beauty: never generate a pretty illustration first and add English afterward.
2. Spatialize abstraction: use point, surface, container, path, bridge, contact, connection, direction and state-change when they clarify meaning.
3. One dominant teaching idea per card.
4. Labels support the visual relationship; they must not replace it.
5. Keep the visual hierarchy obvious at a glance.
6. The card should help a learner infer the core logic without memorizing a Chinese translation list.
7. Preserve the BE reference language: warm framed card, soft rounded 3D objects, navy high-contrast title, central semantic metaphor, modular lower explanation cards, meaningful connector paths and a strong final takeaway.
8. Preserve comprehension before information completeness: when the source does not fit, remove lower-priority content instead of shrinking the core visual or making text unreadable.

## Reference composition logic
The BE card demonstrates the preferred architecture:
- Top: concept title + one-line core logic.
- Upper-middle: compact relationship formula.
- Center: large spatial metaphor that physically embodies the concept.
- Lower: 2–4 modular semantic branches with examples and visual scenes.
- Bottom: one memorable summary sentence.

This is a compositional grammar, not a rigid template. The number of branches and central metaphor may change according to the knowledge point.

## Relationship to other systems
- English Thinking Skill decides WHAT the knowledge means.
- 3D Knowledge Card decides HOW one knowledge point becomes visually understandable.
- Knowledge Map decides HOW this knowledge point connects to other knowledge.
- Website decides HOW the learner interacts with all of the above.
- Lite / Pro depth remains a property of structured content across these consumers; this Skill does not create separate Lite / Pro card modes.

## Quality gate
Before accepting a generated card, verify:
- Can the core meaning be understood from the central visual relationship?
- Does every arrow/path/object have a semantic role?
- Are examples subordinate to the core concept rather than dominating the card?
- Is there visible safe space on all four sides?
- Are text, arrows, people and the visual subject fully inside the canvas without crowded or cropped edges?
- If content was removed, were decoration, low-frequency examples, secondary collocations, secondary comparisons, low-frequency meanings, non-essential etymology and website-expandable supplements reduced before the core understanding?
- Does a Pro static export trace back to completed Pro structured content rather than a parallel analysis created by this Skill?
- Is the style recognizably from the same family as the BE reference?
- Has a fixed character/IP system accidentally been introduced?
- Has the card fallen back into a Chinese-meaning list?

If any answer fails, regenerate or redesign before publishing.


## 2026-10-15 图卡审核增补规则（act 样例）

### 文字可读性（最高优先级）
- 中文、英文、美式 IPA、词性及例句必须逐字核验；不接受乱码、伪字、错别字或错误音标。
- 在手机端缩小观看仍应辨认主要文字；避免过小字号、密集注释和低对比度文字。
- 内容装不下时优先删减次要信息或拆成多张，不得靠压缩字号硬塞。
- 主标题下紧跟醒目的核心画面；四边留安全留白，箭头与标签不得遮挡。

### 配色与 3D 风格
- 采用用户参考图的低饱和度莫兰迪配色：暖白 #F7F3E8、雾蓝 #9DC2DE、鼠尾草绿 #98C39A、杏橙 #F2C69C、灰紫 #AE98B6、深灰蓝文字 #4C5561。
- 以上色值为建议起点，须保证文字对比度；避免大面积高饱和纯蓝、纯红、亮黄及强烈渐变。
- 保留精致轻 3D 微缩场景、柔和光影、圆角分区；减少儿童玩具式塑料质感和无关装饰。
- 优先 3:4 竖版，必要时拆卡；不强制将全部教学文字压进一张图。

### 语义与词源审核
- 核心画面 > 常见义项 > 高频例句 > 分层词族 > 助记 > 次要辨析，按此顺序分配空间。
- 词源路径应有可核查依据；历史来源、现代构词分析、生活联想三者明确分开，不能将联想冒充真实词源。
- 词族树要体现真实派生层级，不要把所有派生词无差别连向中心；复杂词形变化需审查后标注。
- 助记优先使用生活中熟悉的符号、行为、场景；不自然的谐音法标“不适用”并省略展示。
- 例：act 的核心画面“想法→实际行动”；生活联想“群聊 @某人→提醒行动”（@ 的英文为 at sign /æt/，不是 act /ækt/，无词源关系）；词族联想“导演喊 Action!→演员表演”。
- act 词族示意：act→action；act→active→activity；act→actor；act→react→reaction；act→interact。所有路径应在出图前再次核对。

### 出图后强制质检
1. 检查拼写、音标、中文、标点及英文例句是否正确。
2. 检查词源真实性、词族箭头层级和助记/词源的区分。
3. 检查核心画面是否一眼可懂、标题与画面是否相邻。
4. 检查低饱和配色、足够对比度、3:4 构图与四周留白。
5. 检查小屏阅读；若文字模糊或错字，必须重制，不能仅凭画面美观验收。

此增补遵循原有 BE 参考视觉语言和 Lite/Pro 内容深度架构，不重新引入已废止的图卡模式。


## Global palette scope clarification (2026-10-16)
- The muted Morandi color system is a GLOBAL visual requirement for all 3D English knowledge cards across conversations, independent of any chat-local layout template.
- Suggested palette: warm ivory #F7F3E8, mist blue #9DC2DE, sage green #98C39A, soft apricot #F2C69C, dusty lavender #AE98B6, dark blue-gray text #4C5561. These are reference values, not mandatory simultaneous use; adjust tones to maintain strong legibility.
- Avoid large areas of high-saturation primaries, neon colors, harsh gradients, and weak text/background contrast. Preserve gentle 3D lighting, clean typography, and sufficient whitespace.
- IMPORTANT SCOPE: The accept/manage conversation-specific V3.0 layout (four meaning panels, particular module ordering, etc.) is NOT a global template. Globalize only the color-system rule here; retain existing layout flexibility and the BE reference.


## V2.0｜莫兰迪协调配色系统（2026-10-16，强制执行）

### 适用范围与版本关系
- 本章是所有 3D 知识图卡的全局强制视觉规范，覆盖 Lite 与 Pro **内容来源**所生成的静态图卡，以及单词合集/Day 系列图卡。
- Lite / Pro 仍表示教学内容深度，不重新设立相互冲突的两套制图模式；本配色系统对两者一视同仁。
- 延续 BE 参考的语义优先、轻 3D、柔和圆角、清晰层级；默认优先 3:4 竖版，四周保留足够安全留白。核心画面紧跟主标题，必须是视觉焦点。

### 色卡来源与可用色值
参考用户提供的“配色灵感”色卡，选择低饱和、协调的莫兰迪/奶油色调，不强制一张图用齐所有颜色：
- 雾蓝：#DDEFF6、#A8D8E2、#5B7288、#9DC2DE、#BADBE9
- 鼠尾草绿：#6B8F78、#98C39A、#D2F1DC、#778E91
- 奶油杏：#F4EAD3、#EFCFAC、#F8E5C2、#F2C69C
- 烟紫：#E0C7E3、#AE98B6、#846E89、#EAE0E9
- 珊瑚粉：#F39A8F、#F0C8B4、#D95475
- 中性色：#ECEBE8、#E3E5DE、#4C5561、#F7F3E8
- 强调黄：#F2C54E，仅小面积用于重点，禁止默认给所有释义套同一种亮黄色胶囊。

### 全局色彩系统（必须联动，不可仅换背景）
1. **整图先定调**：先选 1 个主色、2 个辅助色、1 个小面积强调色和 1 个中性色，建立统一色彩关系；多词合集可以在同一色系下按语义分组变换卡片局部配色。
2. **标题联动**：英文标题/编号/标题装饰根据主色选深色或相应深阶色；不得机械地全用深蓝。
3. **释义联动**：释义底色、文字色、边框与当前卡片色系呼应；禁止全部统一黄色标签。
4. **3D人物联动**：人物服装、配件、肤色周边环境的可控颜色须与卡片主辅色协调，避免所有人物都穿高饱和蓝衣；肤色应自然且人物不固定成 IP。
5. **3D物体联动**：物体材质、道具、环境与配色协调，但真实语义辨识优先（如苹果可以保留自然红，金属保持金属反光）。
6. **装饰联动**：箭头、图标、序号、连接线、分隔线使用本卡色阶，不得出现随机高饱和点缀。
7. **光影联动**：阴影、反射、高光与场景色温统一，使用柔和、低对比的环境光，保留必要的立体深度，避免塑料玩具质感。
8. **对比度底线**：文字可读性高于低饱和美感；深色文字配浅底，重要文字尽量达到 WCAG AA 普通文字 4.5:1 的对比度。不得牺牲音标和中文释义的辨认度。

### Day 系列多词图卡特别规则
- 不允许“14 张同模板卡片只改底色”的伪升级；标题、释义、人物/物体、图标与阴影须成套变化。
- 多词排列保持整体节奏与统一留白；避免彩虹式随机分色。建议按蓝、绿、杏、紫等协调小组编排。
- 内容太密时拆分多张 3:4 图，不压缩到难以辨认；优先保住核心画面、单词、美式 IPA、核心释义。
- 同一词有多个高频义项时，主画面突出核心义，其他义项用简短文字补足，不得让画面暗示只有一种意义。

### 出图验收：V2.0 专项审核（任何一项失败必须修改）
- 是否真实采用参考色卡的协调关系，而不只是给卡片背景换色？
- 标题、释义、3D人物、物体、装饰和阴影六类元素是否同步完成配色设计？
- 是否避免了整版固定深蓝标题、统一黄色释义、人物统一蓝衣的旧模板？
- 是否兼顾语义真实、核心画面突出、清晰可读、3:4 竖版与四周留白？
- 多词图卡是否有统一色彩节奏，而非随意拼色？

本章优先于此前任何与之冲突的固定蓝白黄模板和仅更换背景的做法；其余内容真实性、BE 视觉参考及 Lite/Pro 内容深度规定保持有效。


## V2.1｜出图前配色锁定与失败重做（2026-10-16）

### 必须先做的配色设计（生成提示词中显式列出）
- 为整张图指定主色、两种辅助色、强调色、中性色的 HEX；多词图逐卡指定背景、标题、释义、人物服饰/主要道具、图标/箭头、阴影的颜色或色系。
- 在生成提示词中明确写入“禁止旧版统一深蓝单词标题＋统一黄色释义胶囊＋统一鲜蓝人物服装”；不能只笼统写“莫兰迪风格”。
- 控制高饱和颜色的使用面积，允许自然物体的真实色与少量强调色；对医学、道路、金属等题材保留必要的语义辨识。
- 先核对英文、IPA、中文和核心画面，再确定配色；颜色不得替代或歪曲词义。

### Day 1/35 回归检查用例
- a：雾蓝/奶油白，红苹果保留自然色；able：鼠尾草绿，人物衣服与背景协调；accept：奶油杏/珊瑚粉，礼物暖色。
- acre：自然绿；act：烟紫或柔和杏；add：雾蓝；adult：奶油杏；main：灰蓝；man：柔和中性色；manage：灰紫/鼠尾草绿；mass：冷灰绿；medicine：薄荷绿；metal：金属灰蓝；meter：暖杏/雾蓝。
- 上述仅为回归示例而非强制固定词色；若同一张 Day 图整体主色变化，可调整局部色相，但六类元素必须联动。

### 交付前的双重审核
1. **文字审核**：逐词核对拼写、美式 IPA、中文释义、说明文字，发现乱码/错字即重做。
2. **视觉审核**：检查背景、标题、释义、3D人物/物体、装饰、光影是否协调；不得只改背景。
3. **版面审核**：核心画面醒目、文字手机端可读、四边留白、3:4 优先；14 词无法兼顾可读性时拆成多页。
4. **失败处理**：出现旧版蓝白黄模板、全部黄色释义胶囊或统一蓝衣人物时判为不通过，必须修改生成方案并重新生成，不能以“已使用浅色背景”作为验收理由。

此 V2.1 为 V2.0 的执行补丁，不改变现有 BE 参考、语义优先和 Lite/Pro 内容架构。
