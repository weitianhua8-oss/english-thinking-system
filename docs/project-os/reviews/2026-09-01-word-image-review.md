# Reviewer 报告｜Word Image（ON）样板

**审查日期：** 2026-09-01
**任务等级：** T3
**审查对象：** `feature/v2-word-image` 基线 `60f6d8c`
**审查身份：** Project OS Reviewer；本审查未参与该功能的原始实现。

## 审查范围

验证 Word Image 的 `ON` 样板是否符合当前产品、架构和 Project OS 的首轮验收目标：从 World 现实画面进入一个核心英语关系；不污染 V1 与其它 V2 模块进度；语音能力在不可用时安全降级；已计划模块不被伪装成可用。

## 依据

- `PROJECT_MASTER.md`
- `PRD.md` R1–R3
- `ARCHITECTURE.md`
- `RULES.md` DO-02、DO-04、DO-05、DONT-02、DONT-06、DONT-07
- `website/v2-curriculum-data.js`
- `website/app.js`、`website/app.test.js`、`website/styles.css`

## 结论：WARNING

自动和静态验收没有发现阻塞缺陷；但尚未完成真实浏览器的人工学习路径体验，因此不能作为“可对外发布”的最终 PASS。

## 检查结果

| 检查项 | 结论 | 证据 |
| --- | --- | --- |
| 路线状态不伪造未完成模块 | PASS | `word-image` 是可用入口；Sentence、Grammar、Scene Training、Output 保持 `planned` 且没有可点击页面路由。 |
| 从真实画面进入 ON 核心关系 | PASS | Word Image 的唯一样板链接 `world-room-01`，先展示杯子接触桌面的画面，再说明 ON 的核心关系；内容明确不是简单中文等号。 |
| 样板范围真实 | PASS | 数据仅定义一个 `ON` 样板；没有把它包装成全量词汇课程。 |
| 进度隔离与兼容 | PASS | 测试证明完成 Word Image 仅写入 `v2.wordImage`，不改变 V1 `words`、`studyDates`、Culture、Camera、World 或 V1 复习队列。 |
| 语音与可访问降级 | PASS | 测试覆盖 `en-US` 语音、两种语速、取消旧语音、离开页面停止语音和不支持 `speechSynthesis` 时的安全禁用。 |
| 窄屏结构性约束 | PASS | 测试覆盖 375px 下的 focused relation、操作区和文字层级 CSS 约束。 |
| 回归与静态检查 | PASS | 在独立工作区运行 `node --test website/app.test.js`：126 通过、0 失败；`app.js`、`v2-curriculum-data.js`、`v2-data.js`、`v2-network.js` 静态检查通过。 |
| 真实浏览器体验 | WARNING | 本轮未在 1920px、1180px、1024px、375px 的实际浏览器完成点击、听音与刷新后学习路径验收。 |

## 必须修复（FAIL）

无。

## 建议处理（WARNING）

1. Owner 在真实浏览器按“World 完成 → Word Image 三步 → ON 既有课程/词库 → 刷新页面 → 语音播放/停止”路径验收 1920px、1180px、1024px、375px。
2. 如果体验通过，将此报告结论更新为 PASS，并把该路径作为未来 Word Image 扩展的 Golden 验收清单；如果发现教学或视觉问题，以 T2/T3 新任务处理，不在本审查中顺手改功能。

## LEARN

- **Test：** 会写入生成 manifest 的测试应在可写隔离工作区运行；权限错误不应误报为产品测试失败。
- **Template：** T3 审查报告应同时报告自动证据与未覆盖的人工作业，不能只写“测试通过”。
- **Golden 候选：** 本样板的流程可作为未来 Word Image 内容的候选参考，但须经 Owner 完成人工体验验收后才可进入 Golden。
