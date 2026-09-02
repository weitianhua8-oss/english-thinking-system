# English Thinking System · Project Master

Version: 2.0
Status: Repository overview and asset index

## 1. Product overview

英语思维学习系统面向英语零基础、低基础学习者与儿童，品牌承诺是 **“把英语变成看得见的画面”**。系统以真实世界和英语概念为入口，帮助学习者从场景理解、句子焦点、含义生长、输入解码到自主表达。

项目最高治理入口是 [PROJECT_OS.md](PROJECT_OS.md)。完整教学母架构、模块边界、能力阶梯和质量门只在 [docs/TEACHING_OS_V2.md](docs/TEACHING_OS_V2.md) 定义；本文件不重复或覆盖它们。

## 2. Asset overview

- 英语思维 Skill：内容推理与生产方法，见 `skills/english-thinking/`。
- 850 Vocabulary Foundation：`S80 / A200 / B570` 内容覆盖资产，见 `data/` 和 `knowledge/`。
- 课程与学习计划：见 `curriculum/`、`content/`。
- 知识网络与图卡：见 `data/`、`visual/` 与相关 Skill。
- 离线学习产品：见 `website/`。

## 3. Project boundaries

1. 词根词缀仅在帮助理解或迁移时使用，不形成死记主线。
2. 3D 知识图卡用于理解一个知识点，知识网络用于连接多个知识点；图卡沿用 BE 图卡视觉基准，不绑定固定角色 IP。
3. 850 词保留现有资产并渐进完善；其覆盖度不能替代学习者的能力评估。
4. GitHub 记录项目版本历史；聊天记录不是项目数据库。

## 4. Directory principles

- `skills/`：可复用 AI Skill 规范
- `knowledge/`：词汇、语法、词根词缀、易混组等知识资产
- `curriculum/`：课程和 170 天学习路线
- `visual/`：3D 图卡视觉标准和参考资产
- `data/`：结构化词库、知识图谱和课程数据
- `web/`：学习网站代码
- `docs/`：产品、设计、归档和决策文档

## 5. 角色系统边界

角色可以存在于网站互动、故事或儿童体验模块中，但不属于 3D 知识图卡标准。任何图卡生成 Skill 都不得把固定角色作为必要输入。

## 6. Governance and status

重大治理规则变化必须更新 [PROJECT_OS.md](PROJECT_OS.md)；教学架构变化必须同步更新 [docs/TEACHING_OS_V2.md](docs/TEACHING_OS_V2.md)。执行优先级与 NOW 状态以 [ROADMAP.md](ROADMAP.md) 为准。

历史成果先归档、评估和去重，再决定迁移或废弃，避免重复开发。
