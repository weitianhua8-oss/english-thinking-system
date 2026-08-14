# P1｜完成状态

## 已完成

- [x] Level 1 50 词完成 A/B/C/D 第一轮审查。
- [x] 5 个优先词完成关键重写：`they / it / there / do / take`。
- [x] 4 个 B 级词完成补强：`have / turn / feel / over`。
- [x] 修订后不再保留 C/D 内容项；九个重点词均达到可进入 A 级母版的标准。
- [x] 首批 20 个 A+ 黄金样板完成 Quick / Deep / Network 三层母版：`BE / GET / GO / COME / GIVE / PUT / MAKE / KEEP / BRING / SEE / LOOK / WATCH / HEAR / LISTEN / IN / ON / AT / TO / FROM / INTO`。
- [x] 3D 图卡生产清单移除固定角色/IP（诺诺）规则，改为 BE 图卡视觉模型 + 中性语义主体。
- [x] 图卡生产清单同步九个重点词的修订逻辑，避免伪统一与构式误导。
- [x] 未修改 `data/vocabulary_850.json`、`data/learning_plan_170days.csv` 等 canonical 母数据。
- [x] 未新增网站功能。

## 本轮新增/修改资产

- `docs/P1_LEVEL1_CONTENT_AUDIT.md`：50 词评级与问题清单。
- `content/P1_Level1_9词修订稿.md`：九个重点词的正式修订内容。
- `data/p1-a-plus-20.v1.json`：20 个 A+ 三层黄金母版。
- `prompts/Level1_3D知识图卡生产清单.md`：去角色化并同步 P1 内容修订。

## 尚未执行的“同步动作”

这些不是内容审校本身，但在 P1 合并 main 前必须完成：

1. 将 `content/P1_Level1_9词修订稿.md` 的九个词合回 `content/Level1_50个骨架词完整教程.md`，保留其余 41 词原内容。
2. 将九词修订同步到 `data/level1_lessons.json` / `website/data.js` 的对应数据源，不改变词序和 10 天 × 5 词课程结构。
3. 对 20 个 A+ 的 Quick / Deep / Network 与 V2 已有 13 个样板做字段映射，重复节点以审校后的 P1 内容为内容准绳，V2 的关系校验机制继续保留。
4. 运行现有 Node 测试与语法检查；任何测试回退先修复再合并。
5. 完成差异复核后，以 PR 方式将 `audit/p1-level1-content` 合入 `main`，不得直接推 main。

## P2 进入条件

只有当上述同步动作全部完成并通过测试后，P1 才可正式合并并进入 P2：把真实知识关系从现有样板扩展到 Level 1 高价值节点，禁止为了“连满 50 词”制造伪关系。
