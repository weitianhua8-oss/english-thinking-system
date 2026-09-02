# Git 工作规范

## 基本原则

Git 是项目的可回退历史，不是最后才做的备份。任何分支、提交、合并都不得覆盖他人未提交改动。

## 分支规则

- `main`：稳定版本；除已确认缺陷修复外不直接实验。
- `feature/<name>`：一个 T3/T4 功能或可独立验收模块。
- `docs/<name>`：文档、模板和治理规则。
- `fix/<name>`：可明确复现的缺陷修复。
- `integration/<name>`：已验证功能的合流与回归检查。

开始前必须执行：检查当前分支、`git status --short`、最近提交和已有工作树。发现无关未提交内容时，使用独立工作树或暂停询问，不得清理。

## Commit 规则

- T1：可在相邻微修改验证后合并提交。
- T2/T3：一个可测试功能一个 commit。
- T4/T5：多个小而完整的 commit；每个提交应可解释、尽量可运行。

格式：`type(scope): action`

```text
feat(camera): add scene observation guidance
fix(review): preserve legacy progress on malformed data
docs(project-os): add task classification rules
test(network): cover incomplete relation fallback
```

禁止使用 `update`、`fix`、`modify` 等无法描述意图的单词作为完整提交信息。

## 合并与回退

1. 合并前：验证、Reviewer（T3+）、关键人工路径、文档同步。
2. 合并后：再次运行主分支适用检查，更新 `PROGRESS.md`。
3. 回退优先使用新增 commit 或 `git revert`；不使用破坏性重置覆盖共享历史。
4. 数据迁移必须写明备份、兼容和回退路径；不能只依赖 Git 回退。

## 禁止事项

- 不提交 `.env`、密钥、Cookie、Token、真实账户数据或大体积无来源资产。
- 不在未知状态下执行 `reset --hard`、强制推送或批量删除。
- 不把未验证的功能与无关格式化、内容批量改写混在一个提交。
