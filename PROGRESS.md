# English Thinking System｜PROGRESS

**更新时间：** 2026-09-01
**当前代码基线：** `integration/v2-core-learning-path`
**Project OS 文档状态：** 已合流到当前整合分支
**状态：** In progress

## 当前结论

V1 的 Level 1 50 词离线学习闭环、850 词库和 170 天计划是稳定资产；V2 正在通过 Culture、Camera、World、Word Image、Sentence 等样板逐步验证完整学习路线。Project OS v1.0 已建立治理层与实际项目文档，并已完成 Word Image 的首次验收。

## 本轮任务

| 任务 | 等级 | 状态 | 证据 / 关联文件 | Owner 下一步 |
| --- | --- | --- | --- | --- |
| 建立 Project OS v1.0 规范与 Starter Template | T3 | 已完成并合流 | `docs/project-os/`、`templates/project-starter/` | 在后续 T3+ 任务中持续执行 |
| 英语思维850 Project OS 实际文档接入 | T3 | 已完成并合流 | `PROJECT.md`、`PRD.md`、`ARCHITECTURE.md`、`RULES.md`、`DECISIONS.md`、本文件 | 以六份项目文档维护长期记忆 |
| Word Image（ON）样板独立验收 | T3 | 已通过 Owner 验收 | `docs/project-os/reviews/2026-09-01-word-image-review.md` | 作为未来 Word Image 样板的验收参考 |
| Word Image 认知减负调整 | T3 | 已通过 Owner 验收与独立审查 | `docs/project-os/reviews/2026-09-01-word-image-cognitive-load-refinement-review.md` | 单独提交，后续发布补齐多宽度记录 |

## 已完成

- 850 个精确母词、170 天 × 5 词学习计划已入库；不等于 850 份深度课程。
- Level 1 的 50 个骨架词深度课程、10 天学习子路径和离线学习闭环已完成。
- V2 已有三层学习、13 个知识网络样板节点，以及 Culture、Camera、World、Word Image 等有限样板能力；范围以各分支/提交为准。
- Project OS v1.0 的总规范、分级、Prompt、Builder/Reviewer、Golden、Skill、Git 规则、Starter Template 和接入计划已建立。

## 进行中与阻塞

- **进行中：** 当前代码主线为 `feature/v2-word-image`；多个 V2 功能仍处于独立工作树，应按分支记录合流，不以单一根目录推断全部完成度。
- **阻塞：** 当前运行环境对 `/Volumes/WorkDisk` 无写权限。`node --test website/app.test.js` 中“重建图卡 manifest”这一测试会写入 `website/assets/cards/manifest.json`，在本环境报权限错误；其余 125 项通过。该现象需在可写的隔离工作树重新验证，不能据此修改产品逻辑。
- **待决：** 旧图卡提示词/课程中的“诺诺”表述与当前图卡总规则冲突；需要专门 T2/T3 修正规格与生成产物，不在本次治理接入中处理。

## 风险与已知限制

- 850 词、170 天计划与深度课程完成度容易被混淆；所有产品文案必须明确其差别。
- V2 还未形成完整 850 词三层课程、知识网络或实物图卡覆盖；不得将样板范围当作全量发布。
- 当前无端到端浏览器自动化测试；涉及学习体验的任务仍需真实页面和多宽度人工验收。

## LEARN

| 类型 | 新知识 | 去向 | 证据 |
| --- | --- | --- | --- |
| Rule | T3+ 必须用任务卡、验收、审查与 LEARN 形成闭环 | `docs/project-os/PROJECT_OS.md` | Project OS v1.0 建立任务 |
| Decision | 采用旁路接入，不覆盖既有总控与成熟资产 | `DECISIONS.md` ADR-004 | Owner 于 2026-09-01 确认 |
| Template | 新项目统一使用六份核心项目文档 | `templates/project-starter/` | 提交 `736bc40` |
| Test | 生成型测试需在可写隔离工作树运行，不能把环境权限错误误判为产品回归 | 本文件、未来测试规范 | 2026-09-01 基线执行 |
| Review | T3 审查须同时记录自动通过证据、未覆盖范围和 Owner 最终验收 | `docs/project-os/reviews/2026-09-01-word-image-review.md` | Word Image 首次实战验证 |
| Test | 信息层级调整需同时覆盖“重复层已删除”与“关键层仍按顺序存在” | `website/app.test.js` | Word Image 认知减负调整 |
| Golden | Word Image 的整词音标与整词发音入口相邻；句子层保留逐词对应与自然语流 | `docs/project-os/reviews/2026-09-01-word-image-cognitive-load-refinement-review.md` | Owner 于 2026-09-01 验收通过 |
| Golden | Owner 确认的 Word Image（ON）学习路径可作为扩展验收参考；正式收录时补来源与继承点 | 未来 Golden 索引 | Owner 于 2026-09-01 验收通过 |
