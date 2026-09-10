# V2 本地集成候选验收记录（2026-09-10）

## 范围与状态

- 分支：`integration/v2-consolidation`
- P1→V2 内容真源接入基线：`935eed4`；整体验收范围为起点 `46aa508` 至本记录后的本地候选提交，不能把单个基线 SHA 当作最终候选终点。
- 起点：创建集成分支时的 `main` HEAD `46aa508378c4d5d139469845c39de9810dbb60ce`。
- `.superpowers/` 保持未跟踪，未修改、未删除、未提交。
- 未推送远程、未创建 PR、未合并 `main`、未发布版本。

## 自动化验证

已运行并通过：

- `node --test website/app.test.js`：99/99 通过。
- `node --check website/app.js`
- `node --check website/data.js`
- `node --check website/v2-data.js`
- `node --check website/v2-network.js`
- `node --check scripts/build_level1_site_data.js`
- `node --check scripts/build_level1_card_manifest.js`
- `git diff --check`

数据完整性只读检查通过：850 个唯一词条；S80/A200/B570；`may` 与 `May` 均保留；170 天、每天 5 词、850 个位置且每词精确出现一次；Level 1 为 50 词、10 天×5 词；20 个 A+ 母版字段完整；V2 为 13 个节点且 `validateGraph().errors` 为空；`data/vocabulary_850.json` 与 `data/learning_plan_170days.csv` 相对集成起点未修改。

## 3D 图卡边界核验

- `website/assets/cards/manifest.json`：50 条记录。
- 实际 PNG：5 张：`01-i.png`、`16-get.png`、`28-look.png`、`35-in.png`、`50-because.png`。
- manifest 中实际存在对应 PNG 的记录为 `I`、`get`、`because` 3 条；其余 47 条没有 PNG 文件。
- 路线图试验词是 `BE / AT / ON / IN / GET`；实际 PNG 词是 `I / GET / LOOK / IN / BECAUSE`，重合 `GET / IN`，缺少 `BE / AT / ON`，并多出 `I / LOOK / BECAUSE`。
- 当前网页课程渲染使用结构化数据中的文字 `coreImage`/文字视觉提示；`website/app.js` 没有把 PNG 作为课程 `<img>` 加载。因而不能表述为已接入真实图卡；缺图时的现状是文字核心视觉，不是图片加载后的回退。
- 本轮未批量生成或补齐图卡。
- 现行 `skills/3d-knowledge-card/SKILL.md` 未被旧 P1 分支覆盖；只读核验确认 Lite/Pro 双模式、核心视觉优先、四侧安全边距（约 4–6%）规则仍在。

## 浏览器人工验收

已尝试打开 `http://127.0.0.1:8001/index.html`。当前 CUA 环境返回 `No browser is available`，因此以下人工验收标记为“未完成”，没有用 Node 测试替代：

- 首页与“继续学习”
- 词库搜索/筛选、课程打开
- Quick / Deep / Network 切换
- 关系点击、继续探索、返回
- 学习反馈与复习
- 1920px、1180px、1024px、手机宽度
- 浏览器控制台错误检查

## 交付解释

本记录证明自动化与静态数据门槛已通过，但不证明浏览器人工体验门槛已通过。因此本分支在独立审查通过前只能称为“本地集成候选”，不能称为正式 V2 发布。
