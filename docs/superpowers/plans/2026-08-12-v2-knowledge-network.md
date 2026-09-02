# V2 知识网络 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不破坏 V1 的基础上，为 13 个英语思维样板节点提供三层学习页和可探索、可解释的知识网络。

**Architecture:** 保留 `website/data.js` 作为 V1 Level 1 的唯一原始数据载荷；新增 `website/v2-data.js` 保存样板知识节点和关系边，新增 `website/v2-network.js` 负责数据校验、查询与探索路径的纯函数。`app.js` 仅调用纯函数并渲染语义分组；现有进度函数和 localStorage 键不迁移。

**Tech Stack:** 原生 HTML/CSS/JavaScript、Node 内置 test runner、Git worktree。

---

## 文件结构

- `website/v2-data.js`：13 个样板节点、系统定义与人工解释的关系边。
- `website/v2-network.js`：Schema 校验、节点/系统索引、关系过滤、探索路径纯函数。
- `website/app.js`：加载 V2 数据、三层课程渲染、网络页面路由与事件委托。
- `website/index.html`：加载顺序、知识网络导航、移除固定角色。
- `website/styles.css`：语义组件、桌面三栏、移动端逐层和返回顶部。
- `website/app.test.js`：旧回归测试与 V2 端到端纯函数测试。
- `docs/09_Level1网站使用说明.md`：面向学习者的 V2 样板网络说明。

### Task 1: V2 数据模型和关系校验

**Files:**
- Create: `website/v2-data.js`
- Create: `website/v2-network.js`
- Modify: `website/app.test.js`

- [ ] **Step 1: 写入失败测试，描述 13 个节点、四种关系与可解释边**

```js
const v2 = require('./v2-data.js');
const graph = require('./v2-network.js');

test('V2 sample graph has thirteen complete nodes and only explained relation types', () => {
  const result = graph.validateGraph(v2);
  assert.equal(v2.nodes.length, 13);
  assert.deepEqual(result.errors, []);
  assert.ok(v2.nodes.every(node => node.quick.origin && node.deep.logic && node.systemId));
  assert.ok(v2.nodes.flatMap(node => node.relations).every(edge => ['system', 'growth', 'combination', 'contrast'].includes(edge.type) && edge.explanation));
});
```

- [ ] **Step 2: 运行失败测试**

Run: `node --test website/app.test.js`

Expected: FAIL，原因是 `v2-data.js` / `v2-network.js` 不存在。

- [ ] **Step 3: 最小实现样板节点与校验器**

`v2-data.js` 导出：

```js
const systems = [
  { id: 'space-relations', title: '空间与关系' },
  { id: 'state-action', title: '状态与动作形态' },
  { id: 'information-structure', title: '条件与信息组织' },
  { id: 'attention', title: '感知与注意' },
];
const nodes = [/* AT, ON, IN, TO, INTO, BE, -ING, THE, IF, TOO...TO..., SEE, LOOK, WATCH */];
module.exports = { systems, nodes };
```

`v2-network.js` 只实现 `validateGraph(data)`、`nodeById(data,id)`、`nodesForSystem(data,systemId)`、`explorableRelations(data,node)`、`pushExplorePath(path,id)` 和 `popExplorePath(path)`。`validateGraph` 必须报告缺字段、重复 id、未知系统、未知关系目标、关系类型错误和空解释。

- [ ] **Step 4: 验证通过**

Run: `node --test website/app.test.js`

Expected: PASS，原有 V1 测试保持全绿。

- [ ] **Step 5: 提交**

```bash
git add website/v2-data.js website/v2-network.js website/app.test.js
git commit -m "feat: add V2 knowledge graph data"
```

### Task 2: 三层学习内容与课程页回退

**Files:**
- Modify: `website/app.test.js`
- Modify: `website/index.html`
- Modify: `website/app.js`

- [ ] **Step 1: 写入失败测试，要求样板命中和普通 V1 词安全回退**

```js
test('V2 lesson lookup enhances a sample node and leaves other Level 1 lessons on V1 fallback', () => {
  assert.equal(core.v2LessonFor(v2, 'to').word, 'TO');
  assert.equal(core.v2LessonFor(v2, 'go'), null);
});
```

- [ ] **Step 2: 运行失败测试**

Run: `node --test website/app.test.js`

Expected: FAIL，原因是 `v2LessonFor` 尚未导出。

- [ ] **Step 3: 最小实现三层课程渲染**

在 `index.html` 中按 `data.js`、`v2-data.js`、`v2-network.js`、`app.js` 顺序加载，并把“知识网络”添加为主导航。把顶部 `.avatar` 改为中性“进度”。

在 `app.js` 中：

```js
function v2LessonFor(v2Data, word) {
  return (v2Data?.nodes || []).find(node => node.word.toLowerCase() === String(word).toLowerCase()) || null;
}
```

样板命中时以连续的 `quickUnderstanding`、`deepLearning`、`knowledgeConnection` 语义区块渲染：Layer 1 显示核心意义、画面、本源、例句、记忆钩子；Layer 2 显示逻辑、场景、高频结构、例句、中式误区与建议；Layer 3 显示进入网络按钮。未命中时保留现有 `renderLesson()` 输出和反馈按钮。

- [ ] **Step 4: 验证通过**

Run: `node --test website/app.test.js && node --check website/app.js`

Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add website/index.html website/app.js website/app.test.js
git commit -m "feat: add V2 three-layer lesson view"
```

### Task 3: 可探索知识网络

**Files:**
- Modify: `website/app.test.js`
- Modify: `website/app.js`

- [ ] **Step 1: 写入失败测试，验证关系点击会定位目标和保存探索路径**

```js
test('selectNetworkNode moves to the target system and records exploration history', () => {
  const state = { networkSystem: 'space-relations', networkNode: 'to', explorePath: [] };
  const next = core.selectNetworkNode(state, v2, 'into');
  assert.deepEqual(next, { networkSystem: 'space-relations', networkNode: 'into', explorePath: ['to'] });
});
```

- [ ] **Step 2: 运行失败测试**

Run: `node --test website/app.test.js`

Expected: FAIL，原因是 `selectNetworkNode` 尚未实现。

- [ ] **Step 3: 最小实现网络状态与渲染**

新增 `state.networkSystem`、`state.networkNode`、`state.explorePath`。实现 `selectNetworkNode(state,v2Data,targetId)`：确认节点存在，返回其所属系统、目标 id 和追加当前节点后的路径；未知目标返回原状态。

新增 `renderNetwork()`：桌面端渲染系统、带核心意义的节点、当前节点的上位系统/直接生长/组合/对比区和解释。全部节点和关系使用 `data-action="select-network-node"` 事件委托。新增“返回上一步”动作，只消费内存 `explorePath`。将 `network` 添加到 `viewKind` 和 `activeNavView`。

- [ ] **Step 4: 验证通过**

Run: `node --test website/app.test.js && node --check website/app.js`

Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add website/app.js website/app.test.js
git commit -m "feat: add explorable V2 knowledge network"
```

### Task 4: 语义组件样式、移动端与返回顶部

**Files:**
- Modify: `website/styles.css`
- Modify: `website/app.js`
- Modify: `website/app.test.js`

- [ ] **Step 1: 写入失败测试，验证长页提供返回顶部动作**

```js
test('long V2 views include a return-top action', () => {
  assert.match(core.returnTopButton(), /data-action="return-top"/);
});
```

- [ ] **Step 2: 运行失败测试**

Run: `node --test website/app.test.js`

Expected: FAIL，原因是 `returnTopButton` 未定义。

- [ ] **Step 3: 最小实现样式与返回顶部**

新增 `returnTopButton()`，在 V2 深度课程和知识网络底部输出 `↑ 返回顶部`；事件委托中使用 `window.scrollTo({top:0,behavior:'smooth'})`。

在 CSS 中新增而非替换 V1 样式：`.quickUnderstanding`、`.coreImage`、`.coreMeaning`、`.mentalModel`、`.sceneGroup`、`.exampleGroup`、`.contrastBlock`、`.structureBlock`、`.chineseTrap`、`.knowledgeConnection`、`.networkLayout`。桌面宽度使用三栏；900px 以下隐藏同屏三栏，按当前系统、当前节点、关系详情纵向展示，并确保结构/例句块不被横向分割。`.sidebar` 增加 `overflow-y:auto`。

- [ ] **Step 4: 验证通过**

Run: `node --test website/app.test.js && node --check website/app.js && git diff --check`

Expected: PASS。

- [ ] **Step 5: 提交**

```bash
git add website/styles.css website/app.js website/app.test.js
git commit -m "style: adapt V2 learning network for mobile"
```

### Task 5: 数据完整性回归与学习者说明

**Files:**
- Modify: `website/app.test.js`
- Modify: `docs/09_Level1网站使用说明.md`

- [ ] **Step 1: 写入失败测试，锁住原始项目数据与样板映射**

```js
test('V2 preserves the full source vocabulary, levels, grades, and 170-day plan', () => {
  const vocabulary = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'vocabulary_850.json')));
  const plan = fs.readFileSync(path.join(__dirname, '..', 'data', 'learning_plan_170days.csv'), 'utf8').trim().split(/\r?\n/);
  assert.equal(vocabulary.length, 850);
  assert.equal(new Set(vocabulary.map(item => item.word.toLowerCase())).size, 850);
  assert.deepEqual(new Set(vocabulary.map(item => item.grade)), new Set(['S', 'A', 'B']));
  assert.equal(plan.length - 1, 170);
});
```

- [ ] **Step 2: 运行失败测试**

Run: `node --test website/app.test.js`

Expected: FAIL，因测试尚未添加。

- [ ] **Step 3: 添加回归测试和学习者说明**

在测试中校验 850 唯一词、五个 Level、170 天、13 个 V2 节点、所有关系解释、旧 `parseStoredProgress` 和 `applyFeedback`。使用说明仅介绍“知识网络如何探索、样板范围、离线与本机进度”；不得暴露 Schema、Markdown 或开发规则。

- [ ] **Step 4: 完整验证**

Run:

```bash
node --test website/app.test.js
node --check website/app.js
node --check website/v2-data.js
node --check website/v2-network.js
node --check website/data.js
git diff --check
```

Expected: 全部 PASS。

- [ ] **Step 5: 提交**

```bash
git add website/app.test.js docs/09_Level1网站使用说明.md
git commit -m "docs: explain V2 knowledge network samples"
```

## 计划自检

- 规格覆盖：数据层、三层内容、可解释四类关系、桌面/移动网络、旧进度兼容、回到顶部、V1 数据完整性与学习者说明均对应任务。
- 无占位步骤；每个实现任务都有先失败、后最小实现、再验证和提交。
- 类型一致：节点用小写 `id`，展示用 `word`；关系目标为节点 `id`；网络状态使用 `networkSystem`、`networkNode` 和 `explorePath`。
