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
