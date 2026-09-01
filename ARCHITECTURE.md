# English Thinking System｜ARCHITECTURE

**最后审计：** 2026-09-01
**适用版本/分支：** `feature/v2-word-image`，基线提交 `60f6d8c`

## 系统概览

这是一个可离线打开的静态学习网站，入口为 `website/index.html`。页面以原生 JavaScript 管理单页状态与渲染；核心词库、课程、学习计划和 V2 样板内容存储在版本化文件中，学习进度保存在浏览器 `localStorage`。

```text
词库 / 课程 / V2 样板数据 → app.js 渲染与事件分发 → 浏览器学习界面 → localStorage 学习进度
```

## 模块边界

| 模块 | 路径 | 职责 | 依赖 | 不能做什么 |
| --- | --- | --- | --- | --- |
| 静态入口 | `website/index.html` | 加载样式与浏览器脚本 | `data.js`、V2 数据、`app.js` | 不承载业务状态 |
| V1 数据 | `website/data.js` | 50 词、课程、10 天计划、对比词 | Level 1 内容数据 | 不伪装为 850 词深课 |
| V2 数据 | `website/v2-data.js`、`website/v2-curriculum-data.js` | 三层节点、路线与样板课程内容 | V2 关系校验与渲染 | 不覆盖 canonical 词库 |
| 图关系 | `website/v2-network.js` | 图校验、可探索关系与路径辅助 | V2 数据 | 不返回无目标、无解释的关系 |
| 页面逻辑 | `website/app.js` | 状态、渲染分发、学习反馈、事件委托、可访问降级 | 所有前端数据模块 | 不直接改写 source 数据 |
| 样式 | `website/styles.css`、`website/v2-route.css` | 响应式学习界面与阅读层级 | 页面结构 | 不以视觉重做破坏已有交互 |
| Canonical 数据 | `data/vocabulary_850.*`、`data/learning_plan_170days.csv` | 850 词和 170 天排程 | 内容/测试 | 不被新 schema 回写 |
| 内容与规范 | `content/`、`docs/`、`skills/`、`visual/` | 课程、规则、生产 SOP、视觉标准 | Project Master | 不因一次任务被无证据改写 |

## 数据与状态

| 数据/状态 | 来源 | 存储位置 | 兼容要求 | 异常处理 |
| --- | --- | --- | --- | --- |
| 850 词 | 人工维护的 canonical 数据 | `data/vocabulary_850.json` / `.csv` | 精确词形、ID、等级和 Level 保持不变 | 校验数量、大小写和唯一排程 |
| 170 天计划 | canonical 排程 | `data/learning_plan_170days.csv` | 每词精确出现一次 | 出错时不改写原计划 |
| V1 进度 | 学习者反馈 | `localStorage: english850_level1_progress_v1` | 新模块不能破坏旧 JSON | 解析失败时清洗或安全回退 |
| V2 模块进度 | V2 样板交互 | V1 profile 的可选 `v2` 扩展 | 缺失字段视为未学习 | 不进入 V1 复习队列，除非任务明确设计 |
| 图卡 manifest/资产 | 图卡生产流程 | `website/assets/cards/` | 缺图可回退 | 不展示破图或把未生产图片标为完成 |

## 运行与验证

- **运行方式：** 直接打开 `website/index.html`，无需服务端、登录或远程依赖。
- **自动检查：** Node 内置测试在 `website/app.test.js`；静态检查覆盖 `app.js`、数据模块与图网络模块。
- **人工验收环境：** 桌面和窄屏宽度下的核心学习、导航、复习、刷新进度与无图回退路径。

## 受保护资产与风险

- 受保护：850 词、170 天计划、V1 学习闭环、已验证 V2 关系校验、离线运行方式、稳定主分支。
- 风险：范围膨胀、数据漂移、伪知识网络、学习进度割裂、移动端负担和图卡缺失。
- 回滚原则：新能力使用独立数据/入口与 Git 原子提交；优先撤销新增映射或入口，不回写 canonical 数据。

## 来源

- `CURRENT_ARCHITECTURE.md`
- `V2_UPGRADE_PLAN.md`
- `docs/07_数据结构.md`
- 当前分支代码与 Git 历史
