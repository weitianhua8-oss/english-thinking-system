# V2 学习工作台重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 V2 样板课程页和知识网络页重构为紫蓝融合的语义学习工作台，同时保持学习、复习与网络行为不变。

**Architecture:** `website/v2-data.js` 和 `website/v2-network.js` 继续是唯一内容与关系来源。`app.js` 新增最小的课程层切换状态与展示纯函数，所有交互保留在既有 `#app` 单一事件委托中；`styles.css` 只增加 V2 专用选择器。

**Tech Stack:** 原生 HTML/CSS/JavaScript、Node 内置 test runner、Git worktree。

---

## 文件结构

- `website/app.js`：V2 课程层切换、迷你网络与网络地图标记。
- `website/styles.css`：工作台背景、玻璃面板、课程语义区块、关系色彩和响应式规则。
- `website/app.test.js`：课程层状态与迷你网络回归测试。

### Task 1: 课程层状态与迷你网络契约

**Files:** Modify `website/app.test.js`, `website/app.js`

- [ ] 写失败测试：

```js
test('lessonLayerForAction switches only among the three V2 learning layers', () => {
  assert.equal(core.lessonLayerForAction('quick', 'lesson-layer-deep'), 'deep');
  assert.equal(core.lessonLayerForAction('deep', 'lesson-layer-network'), 'network');
  assert.equal(core.lessonLayerForAction('network', 'unknown'), 'network');
});
```

- [ ] 运行 `node --test website/app.test.js`，确认因函数未导出失败。

- [ ] 实现并导出 `lessonLayerForAction(layer, action)`，只接受 `quick`、`deep`、`network`。实现并导出 `renderLessonMiniNetwork(v2Data, graphApi, node)`：只用 `explorableRelations` 渲染当前词、核心意义、所属系统、现有关系和安全跳转按钮；所有文本经 `html()`；无关系时用中性提示。

- [ ] 增加失败测试，验证 `TO` 的迷你网络包含 `IN + TO → INTO`、不包含未解释关系和未转义 HTML；实现后运行 `node --test website/app.test.js`，确认通过。

- [ ] 提交：`git add website/app.js website/app.test.js && git commit -m "feat: add V2 lesson workspace controls"`。

### Task 2: V2 课程学习工作台

**Files:** Modify `website/app.test.js`, `website/app.js`, `website/styles.css`

- [ ] 写失败测试：

```js
test('renderV2LessonWorkspace keeps semantic content in one selected layer', () => {
  const data = require('./v2-data.js');
  const markup = core.renderV2LessonWorkspace(data, require('./v2-network.js'), core.v2LessonFor(data, 'to'), 'quick');
  assert.match(markup, /data-action="lesson-layer-deep"/);
  assert.match(markup, /workspaceLayer[^\"]* active/);
  assert.match(markup, /核心画面/);
});
```

- [ ] 运行 `node --test website/app.test.js`，确认因 `renderV2LessonWorkspace` 未实现失败。

- [ ] 用 `renderV2LessonWorkspace(v2Data, graphApi, node, layer)` 替换 V2 课程主体：课程抬头、三个 `workspaceTabs`、三个 `workspaceLayer`。快速层显示核心画面、本源、例句、记忆钩子；深度层显示逻辑、完整 SceneGroup、高频结构、易错点和建议；网络层显示迷你网络。

- [ ] `renderV2Lesson()` 使用 `state.lessonLayer`，仍保留返回词库、反馈和 `returnTopButton()`；事件委托新增三个 `lesson-layer-*` 动作。`openWord()` 打开课程时重置为 `quick`。不修改非样板 V1 课程。

- [ ] 追加局部 CSS：`.learningWorkspace`、`.workspaceHero`、`.workspaceTabs`、`.workspaceLayer`、`.workspaceLayer.active`、`.quickLayer`、`.deepLayer`、`.networkLayer`、`.miniNetwork`、`.relationBadge`。使用浅紫—浅蓝渐变与半透明白色；不得修改通用 V1 `.lesson`、`.panel`。

- [ ] 运行 `node --test website/app.test.js && node --check website/app.js && git diff --check`，确认通过；提交 `style: redesign V2 lesson learning workspace`。

### Task 3: 知识网络地图工作台

**Files:** Modify `website/app.test.js`, `website/app.js`, `website/styles.css`

- [ ] 写失败测试：

```js
test('renderNetworkContent exposes relation types without inventing edges', () => {
  const data = require('./v2-data.js');
  const graph = require('./v2-network.js');
  const markup = core.renderNetworkContent(data, graph, { networkSystem: 'space-relations', networkNode: 'to', explorePath: [], networkStep: 'detail' });
  assert.match(markup, /networkMapWorkspace/);
  assert.match(markup, /relationBadge relation-growth/);
  assert.match(markup, /relationBadge relation-combination/);
  assert.match(markup, /relationBadge relation-contrast/);
});
```

- [ ] 运行 `node --test website/app.test.js`，确认失败。

- [ ] 只更新 `renderNetworkContent()` 外观：外层添加 `learningWorkspace networkMapWorkspace`；系统、节点、解释区增加地图标题；解释区按本源、系统、生长、组合、对比分组。生长、组合、对比使用文字关系 badge，系统使用中性标记。保留现有状态机、所有 data-action、查看/开课/返回/移动返回/回顶，并只调用 `graphApi.explorableRelations()`。

- [ ] 追加 `.networkMapWorkspace`、`.networkMapHero`、`.networkPanelTitle`、`.relationBadge`、`.relation-growth`、`.relation-combination`、`.relation-contrast` 局部样式。桌面继续 `220px / 1fr / 320px`；`max-width:900px` 的 `data-network-step` 单面板规则不可改变。

- [ ] 运行 `node --test website/app.test.js && node --check website/app.js && git diff --check`，确认通过；提交 `style: redesign V2 knowledge network workspace`。

### Task 4: 响应式与 V1 回归验收

**Files:** Modify `website/app.test.js`, `website/styles.css`

- [ ] 写失败测试：

```js
test('non-sample Level 1 lessons do not receive a V2 workspace', () => {
  const v2 = require('./v2-data.js');
  assert.equal(core.v2LessonFor(v2, 'go'), null);
  assert.equal(core.lessonLayerForAction('quick', 'lesson-layer-network'), 'network');
});
```

- [ ] 运行 `node --test website/app.test.js`；若尚无课程层函数则确认失败，完成后通过。

- [ ] 只补断点收口：`max-width:900px` 与 `max-width:480px` 下 `workspaceTabs` 为大触控目标；`workspaceLayer` 的中文、例句、SceneGroup、结构块无横向溢出；`.networkMapWorkspace[data-network-step]` 继续一次只显示系统/节点/详情面板。不得更改其他 V1 页面选择器。

- [ ] 完整验证：`node --test website/app.test.js && node --check website/app.js && node --check website/v2-data.js && node --check website/v2-network.js && node --check website/data.js && git diff --check`。

- [ ] 提交：`git add website/styles.css website/app.test.js && git commit -m "test: cover V2 workspace responsive behavior"`。

## 计划自检

- 课程三层工作台、迷你网络、网络地图关系层级、桌面三栏、手机逐层、反馈/回顶与 V1 不回归均有明确任务。
- 所有关系仍由 `explorableRelations` 提供；不新增数据、不迁移词库、不创建伪网络。
- 新增状态字段仅为 `lessonLayer`，取值固定为 `quick`、`deep`、`network`；所有新动作继续使用 `#app` 事件委托。
- 每项实现均要求先失败测试、最小实现、验证和提交。
