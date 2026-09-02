# P0｜Codex 项目合流与唯一真源迁移任务书

## 目标

把 Codex 当前本地“英语思维 850”项目安全接入 GitHub 仓库：

`weitianhua8-oss/english-thinking-system`

最终形成唯一可信版本源：

- GitHub：唯一真源与版本历史
- Codex：本地开发工作区
- ChatGPT：产品总控、内容规范、Skill 与质检规则

## 已知现状

Codex 交接文档确认：

- V1 稳定主线：`main`，基线 `f7295c9`
- V2 开发分支：`feature/v2-knowledge-network`
- V2 最新提交：`2107123`
- V2 尚未合并 main
- 当前本地项目未配置 remote
- 850 母词库已完整：S80 / A200 / B570
- 170 天计划已完整
- Level 1 50 个骨架词完整教程已完成
- V2 已完成 Quick / Deep / Network 三层学习与 13 个样板节点
- 现有 Node 测试 79/79 通过

## 强制安全规则

1. 不允许直接覆盖远程 `main`。
2. 不允许丢失 Codex 本地 `main` 或 `feature/v2-knowledge-network` 历史。
3. 合流前必须创建本地备份 tag 或备份分支。
4. 850 词的 canonical source 最终必须是 Codex 现有 `data/vocabulary_850.json`，而不是今天 ChatGPT 临时恢复的 S80 文件。
5. 170 天计划 canonical source 最终必须是 Codex 现有 `data/learning_plan_170days.csv`。
6. 今天 GitHub 中新增的 PROJECT_MASTER / ROADMAP / Skill / BE 3D 图卡标准属于项目总控资产，应保留并与 Codex 项目合并。
7. 发生同名文件冲突时，不得直接选“远程覆盖本地”或“本地覆盖远程”；先逐文件比较。
8. `.superpowers/` 只作为本地设计预览草图，不应误提交为产品代码，除非人工确认。

## 推荐迁移流程

### Step 1｜本地冻结与备份

先记录：

```bash
git status
git branch --show-current
git log --oneline --decorate -20
```

确认工作区干净；若不干净，先提交或 stash。

建立备份引用，例如：

```bash
git branch backup/pre-github-merge-main main
git branch backup/pre-github-merge-v2 feature/v2-knowledge-network
```

### Step 2｜配置远程

```bash
git remote add origin https://github.com/weitianhua8-oss/english-thinking-system.git
```

如果 `origin` 已存在，先检查，不得盲目覆盖：

```bash
git remote -v
```

### Step 3｜只抓取，不合并

```bash
git fetch origin
```

检查远程历史：

```bash
git log --oneline --decorate --graph --all --max-count=80
```

目标是确认：Codex 本地项目历史与今天 GitHub 新建项目历史属于两个独立历史来源。

### Step 4｜建立专用合流分支

不要在本地 main 直接操作。建议：

```bash
git switch main
git switch -c integration/project-unification
```

随后把远程项目总控资产合入 integration 分支。若历史无共同祖先，允许使用：

```bash
git merge origin/main --allow-unrelated-histories
```

但必须人工逐文件解决冲突。

### Step 5｜冲突处理原则

#### Codex 现有产品资产优先保留

以下以 Codex 当前项目为 canonical baseline：

- `data/vocabulary_850.json`
- `data/vocabulary_850.csv`
- `data/learning_plan_170days.csv`
- `content/Level1_50个骨架词完整教程.md`
- `data/level1_lessons.json`
- `content/Level2-5_课程地图与生产队列.md`
- `website/`
- V1/V2 测试与工程代码

#### 今天 GitHub 总控资产优先保留

- `PROJECT_MASTER.md`
- 新版 `ROADMAP.md`
- `skills/english-thinking/SKILL.md`
- `skills/3d-knowledge-card/SKILL.md`
- `visual/3d-card-standard/BE-reference/STYLE_GUIDE.md`
- 三层学习数据结构规范文件

#### 临时恢复文件不得自动成为 canonical

以下需要标记为 migration/history/reference 后再判断：

- `knowledge/vocabulary/S80/RECOVERY.md`
- `data/golden-samples.v1.json`
- `data/golden-learning-layers.v1.json`

它们可以作为审校参考，但不能覆盖 Codex 现有的完整 850 数据和 Level 1 正式教程。

### Step 6｜恢复 V2 分支

integration 分支完成主线合流后，再把本地 V2 分支安全迁移到新的统一历史结构。

目标分支名称继续使用：

`feature/v2-knowledge-network`

不能为了方便直接把 V2 squash 进 main；要尽量保留原提交历史与可比较性。

### Step 7｜合流后验证

必须执行并记录结果：

```bash
node --test website/app.test.js
node --check website/app.js
node --check website/v2-data.js
node --check website/v2-network.js
node --check website/data.js
git diff --check
```

预期：现有 79 项测试继续通过。

还要检查：

- 850 母词数仍为 850
- S/A/B 数量仍为 80/200/570
- `may` 与 `May` 仍是两个独立知识点
- 170 天 × 每天 5 词，共 850 学习槽位
- 每个词在计划中精确出现 1 次
- Level 1 50 词课程仍可打开
- V2 13 个样板节点仍能加载

## 合流完成后的目录真源规则

### 内容真源

- 850 母词：`data/vocabulary_850.json`
- 170 天计划：`data/learning_plan_170days.csv`
- Level 1 深度教程：`content/Level1_50个骨架词完整教程.md`
- Level 2–5 生产队列：`content/Level2-5_课程地图与生产队列.md`

### 产品真源

- 稳定产品：`main`
- V2 开发：`feature/v2-knowledge-network`
- 网站代码：`website/`

### 规范真源

- 项目最高规则：`PROJECT_MASTER.md`
- 执行优先级：`ROADMAP.md`
- 英语思维内容规则：`skills/english-thinking/SKILL.md`
- 3D 图卡规则：`skills/3d-knowledge-card/SKILL.md`
- BE 图卡视觉基准：`visual/3d-card-standard/BE-reference/STYLE_GUIDE.md`

## P0 完成报告格式

Codex 完成后请输出：

1. 最终 remote 配置
2. main / V2 / integration 三个分支的 commit SHA
3. 合并时发生的文件冲突清单及处理方式
4. 850 数据校验结果
5. 170 天计划校验结果
6. Node 测试结果
7. 哪些今天建立的临时文件被保留、降级或废弃
8. 是否存在仍需人工决策的冲突

完成 P0 后停止新增产品功能，进入 ROADMAP 的 P1：Level 1 50 词 A/B/C/D 内容审查。
