# 07｜Design System

设计不是装饰层，而是让学习者更容易看见意义、关系和下一步动作的教学界面。

## 表现规则

| 对象 | 必须服务 | 不得做 |
| --- | --- | --- |
| 3D Knowledge Card | 一个知识点的核心画面、空间关系或方向 | 依赖固定角色/IP、用装饰替代逻辑、图片缺失时不可学习 |
| Word Image Pro | 从现实画面聚焦到英语核心关系 | 堆叠多个知识点、让术语先于画面、把文字重复塞满页面 |
| Knowledge Network | 已解释的语义关系 | 使用 Simple Mind Map、按词性/主题制造伪边、默认上下树状结构 |
| 课程页面 | 一个主要认知动作和清晰的下一步 | 同屏让儿童完成过多判断、阅读和术语记忆 |

## 内容与载体

[Lite / Pro](03_LEARNING_OBJECTS.md#lite--pro-内容深度) 是学习内容深度，不是静态图卡模式。表现层只消费已经审校的结构化内容：

```text
Canonical / Structured Content
            ↓
Web Learning Components / 3D Card Renderer
            ↓
Interactive Learning / Visual Summary / Export
```

- Pro 完整内容优先由结构化网页组件承载；静态图卡只做视觉摘要、分享或导出。
- Pro Static Export 必须以已经完成的 Pro structured content 为输入，不得由 3D Card Skill 另建一套 Pro 内容真源。
- 当单张图卡无法自然容纳全部内容时，优先保持理解而不是保持完整；不得缩小核心视觉或极度缩小文字来塞入全部 Pro 内容。

## 已冻结视觉与结构原则

- 3D 知识卡以已确认的 BE 图卡为视觉基准：关系、方向、边界优先；
- 图卡不要求“诺诺”或任何固定角色/IP；
- 图卡解释一个知识点，知识网络连接多个知识点；
- 知识网络语义关系优先，默认左→右；
- 不使用 Simple Mind Map / SimpleMindMap；
- 图片不是完成标志：缺图时必须安全回退为可读内容；
- 一个教学屏幕优先只增加一个主要认知动作。
- 静态图卡必须保留四边安全区，并检查文字、箭头、人物和视觉主体是否拥挤、裁切或越界；具体质量门禁见 [BE 3D Card Standard](../../visual/3d-card-standard/BE-reference/STYLE_GUIDE.md)。

## 认知负荷检查

任何新页面在审查时必须说明：

1. 学习者这一屏只需要做什么；
2. 哪些信息被故意延后；
3. 关键画面、文字和按钮的阅读顺序；
4. 小屏宽度下是否仍能完成主要动作；
5. 没有图像、语音或复杂交互时是否仍可理解核心内容。
