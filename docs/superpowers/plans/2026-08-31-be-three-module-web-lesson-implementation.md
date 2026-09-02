# BE 三模块网页知识课 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在既有 V2 BE 词条的深度学习层实现数据驱动、可访问、进度隔离的三个互动模块。

**执行状态：** 已完成并经用户验收。最后验证：2026-09-01，`node --test website/app.test.js` 156/156 通过。

**Architecture:** `website/v2-data.js` 中仅 BE 节点增加可选 `interactive` 数据；`website/app.js` 以纯函数校验、标准化、渲染和更新 `progress.v2.be`。没有完整互动数据的节点仍由现有三层页面渲染，V1 复习反馈与词表不改动。

**Tech Stack:** 原生 HTML/CSS/JavaScript、Node 内置 `node:test` / `assert`；不新增依赖、服务或路由。

---

## 已确认文件边界

| 文件 | 职责 |
| --- | --- |
| `website/v2-data.js` | 仅保存 BE 的经审核 `interactive` 数据。 |
| `website/app.js` | 校验/归一化互动数据、BE 模块进度、深度层渲染及点击动作。 |
| `website/styles.css` | 三模块局部样式、375px 单列和键盘焦点可见性。 |
| `website/app.test.js` | 纯函数、标记、兼容性和样式契约回归。 |

已有未提交的 ON/Culture/Camera 变更属于用户工作：只在上述文件中精确追加 BE 代码，暂存与提交均不在本轮授权范围内。

### Task 1：BE 互动数据契约与隔离进度

**Files:**

- Modify: `website/app.test.js`
- Modify: `website/v2-data.js`
- Modify: `website/app.js`

- [x] **Step 1: 先写失败测试。** 在现有 V2 测试区增加三条测试：

```js
test('BE interactive data accepts three complete modules and rejects incomplete data', () => {
 const be = require('./v2-data.js').nodes.find(node => node.id === 'be');
 assert.deepEqual(core.beInteractiveFor(be)?.modules.map(module => module.id), ['module1', 'module2', 'module3']);
 assert.equal(core.beInteractiveFor({ ...be, interactive: { ...be.interactive, module2: null } }), null);
});

test('BE module progress is isolated from V1 review and other V2 modules', () => {
 const legacy = { words:{ be:{ mastery:3 } }, studyDates:['2026-08-31'], v2:{ culture:{ completed:['culture-01'] } } };
 const next = core.completeBeModule(legacy, 'module1');
 assert.deepEqual(next.words, legacy.words);
 assert.deepEqual(next.v2.culture, legacy.v2.culture);
 assert.deepEqual(next.v2.be.completed, ['module1']);
});
```

- [x] **Step 2: 运行失败测试。**

Run: `node --test website/app.test.js --test-name-pattern="BE (interactive data|module progress)"`
Expected: FAIL，因为 `beInteractiveFor` 和 `completeBeModule` 尚未导出。

- [x] **Step 3: 写最小数据和函数。** `v2-data.js` 的 BE 节点添加完整 `interactive`：三个模块具稳定 `id`、可见文本、`alt`、例句、选择和反馈。`app.js` 增加 `beInteractiveFor(node)`，只接受完整 `kind: 'be-three-modules'` 数据；增加 `beProgressFor(progress)` 与 `completeBeModule(progress, id)`，只接受 `module1|module2|module3`，并在 `sanitizeProgress()` 中归一化 `v2.be`。

- [x] **Step 4: 验证通过和全量兼容。**

Run: `node --test website/app.test.js --test-name-pattern="BE (interactive data|module progress)"`
Expected: PASS。

Run: `node --test website/app.test.js`
Expected: 全量通过，且现有 V1/V2 进度测试无回归。

### Task 2：BE① 状态连接器

**Files:**

- Modify: `website/app.test.js`
- Modify: `website/app.js`
- Modify: `website/styles.css`

- [x] **Step 1: 先写失败渲染测试。**

```js
test('BE module one renders one accessible branch bridge at a time', () => {
 const be = require('./v2-data.js').nodes.find(node => node.id === 'be');
 const markup = core.renderV2LessonWorkspace(require('./v2-data.js'), require('./v2-network.js'), be, 'deep', core.emptyProgress(), { beBranch:'identity' });
 assert.match(markup, /BE①｜状态连接器/);
 assert.match(markup, /aria-label="BE 连接图解：I 通过 am 连接到 a student"/);
 assert.match(markup, /data-action="select-be-branch" data-be-branch="identity" aria-pressed="true"/);
 assert.doesNotMatch(markup, /data-be-branch="location" aria-pressed="true"/);
});
```

- [x] **Step 2: 运行失败测试。**

Run: `node --test website/app.test.js --test-name-pattern="BE module one"`
Expected: FAIL，因为深度层尚未渲染模块一。

- [x] **Step 3: 最小实现。** 添加 `beModuleOneFor()` 与 `renderBeModuleOne()`；仅从 `interactive.module1` 读取分支、当前句、解释和替代文字。把 `renderV2LessonWorkspace` 扩展为接收可选 BE 页面状态，非 BE 仍输出原有标记。浏览器 state 增加 `beBranch`，点击处理仅接受三条已知分支并重新渲染；完成一次非默认分支探索后写入 `completeBeModule(..., 'module1')`。

- [x] **Step 4: 加局部样式并验证。** 新增 `.beLessonModules`、`.beBridgeDiagram`、`.beBranchChoice` 的局部规则；桥图在窄屏堆叠但顺序清晰，选中态不只用颜色。

Run: `node --test website/app.test.js --test-name-pattern="BE module one"`
Expected: PASS。

### Task 3：BE② 主语与时间换形态

**Files:**

- Modify: `website/app.test.js`
- Modify: `website/app.js`
- Modify: `website/styles.css`

- [x] **Step 1: 先写失败测试。** 测试 `I/he/they` 在现在返回 `am/is/are`、过去返回 `was/was/were`；错误配对只出现“可重试”反馈而不含正确答案；一次正确配对与一次 Today → Yesterday 切换完成 `module2`，但 `progress.words.be` 不变。

- [x] **Step 2: 运行失败测试。**

Run: `node --test website/app.test.js --test-name-pattern="BE module two"`
Expected: FAIL，因为 form resolver、配对状态和时间切换尚未存在。

- [x] **Step 3: 最小实现。** 添加纯函数 `beFormFor(interactive, subject, tense)` 与 `renderBeModuleTwo()`；将 `beSubject`、`beTense`、`beMatchSelection`、`beMatchDone` 作为临时页面 state。点选两张卡完成配对，不加入拖拽；错误首次仅显示重试信息，正确时显示批准的匹配说明。成功配对与时间切换后调用 `completeBeModule`。

- [x] **Step 4: 验证。**

Run: `node --test website/app.test.js --test-name-pattern="BE module two"`
Expected: PASS。

Run: `node --test website/app.test.js`
Expected: 全量通过。

### Task 4：BE③ 结构扩展、判断练习和完成态

**Files:**

- Modify: `website/app.test.js`
- Modify: `website/app.js`
- Modify: `website/styles.css`

- [x] **Step 1: 先写失败测试。** 断言四宫格均从数据渲染；`be + doing` / `be + done` 可切换；错误判断题第一次没有完整答案、重试后显示批准解释；正确完成模块三只添加 `v2.be.completed`；旧节点深度页无三模块标记。

- [x] **Step 2: 运行失败测试。**

Run: `node --test website/app.test.js --test-name-pattern="BE module three"`
Expected: FAIL，因为判断流和完成态尚未存在。

- [x] **Step 3: 最小实现。** 添加 `renderBeModuleThree()`，根据 `interactive.module3` 输出定位、过程、结果和判断卡；增加 `beJudgementAttempts` 和 `beJudgementAnswers` 临时 state。第一错答只读数据中的 `retry`，第二次才显示 `explanation`；全部正确后标记 `module3` 完成，并输出 `interactive.completion.summary`。

- [x] **Step 4: 验证。**

Run: `node --test website/app.test.js --test-name-pattern="BE module three"`
Expected: PASS。

### Task 5：全量回归和页面验收

**Files:**

- Modify: 仅为本计划验证发现的 BE 直接缺陷；不得进行无关重构。

- [x] **Step 1: 写样式契约测试。** 断言 `.beLessonModules` 无横向固定宽度、互动按钮的最小高度不低于 44px、`@media (max-width: 520px)` 把桥图改为单列、`:focus-visible` 可见。

- [x] **Step 2: 运行全部自动检查。**

Run: `node --test website/app.test.js`
Expected: 全部 PASS。

Run: `node --check website/app.js && node --check website/v2-data.js`
Expected: 无输出且退出码 0。

- [x] **Step 3: 人工页面验收。** 打开 `http://127.0.0.1:8001/index.html`，从 50 词库进入 BE → 深度学习；用鼠标与键盘完成三模块，刷新确认 `v2.be` 恢复、页尾反馈才改变复习；打开 AT/ON 验证其页面与网络不变；用 375px 宽度检查单列、无横向滚动和可点击控件。

- [x] **Step 4: 审查变更范围。**

Run: `git diff --check`
Expected: 无空白错误。

Run: `git diff -- website/v2-data.js website/app.js website/styles.css website/app.test.js`
Expected: 仅包含 BE `interactive`、其渲染/进度、局部样式和对应测试；不含 `.env`、850 词数据、路由替换或无关变更。

## 计划自检

- 覆盖：三模块、数据完整性、`progress.v2.be` 隔离、无数据降级、键盘/375px、V1/V2 回归均有对应任务。
- 一致性：所有互动数据入口均为 `beInteractiveFor`；所有持久化完成态均为 `completeBeModule`；任何非 BE 节点仍使用原 `renderV2LessonWorkspace` 路径。
- 范围：未引入 `WordLessonSpec`、新路由、远程音频、外部依赖或对其他词条的抽象改造。
