# 08｜Current State

**审计基线：** `integration/v2-core-learning-path`
**最后核对：** 2026-09-02

## 状态标签

| 标签 | 含义 |
| --- | --- |
| 已实现且已验收 | 有可追溯代码/内容、验证或审查记录，以及 Owner 验收 |
| 已实现待验收 | 已有产物，但缺指定验证或 Owner 确认 |
| 已确认方向，未形成产物 | Owner 已确认，但尚无独立课程、数据或代码证据 |
| 计划中 | 尚未开始；不得写成已开放能力 |

## 受保护的稳定资产

| 项目 | 状态 | 证据 |
| --- | --- | --- |
| 850 母词库 | 已实现且已验收 | `data/vocabulary_850.json` / `.csv` |
| S80 / A200 / B570 分级 | 已实现且已验收 | `data/vocabulary.schema.json`、`PROJECT_MASTER.md` |
| 170 天学习计划 | 已实现且已验收 | `data/learning_plan_170days.csv` |
| V1 Level 1 50 词离线学习闭环 | 已实现且已验收 | `website/data.js`、`website/app.js`、Node 测试 |
| V1 学习进度兼容 | 已实现且已验收 | `english850_level1_progress_v1` 与 `website/app.test.js` |

## V2 样板能力

| 能力 | 状态 | 已有证据 | 范围边界 |
| --- | --- | --- | --- |
| Culture | 已实现且已验收 | `v2-curriculum-data.js`、审查记录 | 5 个有限课程样板 |
| Camera | 已实现且已验收 | 路线数据、页面与审查记录 | 1 个图书馆场景样板 |
| World | 已实现且已验收 | 路线数据、页面与审查记录 | 1 个房间观察样板 |
| Word Image（ON） | 已实现且已验收 | 页面、数据、审查记录 | 1 个 ON 样板，不代表全量词汇 |
| Sentence | 已实现且已验收 | 页面、数据、审查记录 | 1 个句子样板，不是完整 Sentence 系统 |
| Knowledge Network | 已实现且已验收 | 图校验、13 节点样板、Node 测试 | 不是 850 个完整网络节点 |
| 3D 图卡视觉标准 | 已实现待验收 | BE 图卡标准、manifest 与回退逻辑 | 不能把资产数量表述为全量黄金课程 |

## 已确认方向，未形成产物

| 方向 | 当前事实 | 下一步边界 |
| --- | --- | --- |
| Grammar Vision V1.2 | Owner 已确认；当前所有工作树未发现独立命名文档或已接入课程/代码 | 先建立 Grammar 规格和一个 Gate 审核的样板，不直接批量开发 |
| Grammar Camera | 已冻结为教学隐喻；当前 Grammar 路由仍为 `planned` | 用于后续 Grammar 任务的验收，不等于已上线模块 |
| 用户自选新词数量 + 掌握度驱动复习 | 已冻结为产品方向；现有 170 天计划仍为 5 词/天 | 单独设计数据兼容、迁移与回归测试 |
| English Thinking Skill Pro / Word Image Pro | 已冻结为对象命名与职责方向 | 在后续 Skill 或组件任务中按本真源实现 |

## 计划中

- Grammar；
- Scene Training；
- Output；
- 850 词的完整深度课程、知识网络和图卡覆盖；
- 浏览器端到端自动化与发布前多宽度证据。

## 基线验证

2026-09-02 在当前工作树运行 `node --test website/app.test.js`，结果为 **157/157 通过**。
