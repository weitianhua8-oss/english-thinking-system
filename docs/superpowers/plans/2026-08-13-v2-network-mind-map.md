# V2 知识网络思维导图 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 V2 知识网络桌面页改为“系统 → 当前词 → 真实关系分支”的左到右树状思维导图，并以右侧面板解释所选关系。

**Architecture:** 保持 `v2-data.js` 和 `v2-network.js` 的现有知识图数据及探索路径不变。`app.js` 增加一个小型 `networkRelation` 选择状态和纯辅助函数；`renderNetworkContent()` 将现有中间节点网格改为根节点与关系分支导图。移动端继续使用已有的 systems/nodes/detail 单面板状态，详情面板复用关系选择与解释。

**Tech Stack:** 原生 HTML/CSS/JavaScript，Node 内置 `node:test`，无新增依赖。

---

## File Structure

- Modify: `website/app.js`
  - 新增已选关系解析/状态重置辅助函数。
  - 将 V2 网络渲染替换为树状导图标记和关系解释面板。
  - 在既有 `#app` 单一事件委托内处理 `select-network-relation`。
- Modify: `website/styles.css`
  - 只新增 `.mindMap*`、`.mindBranch*`、`.networkRelationPanel*` 等 V2 网络专用样式。
  - 宽屏导图使用无横向滚动的网格，窄屏不改变原来的单面板选择器。
- Modify: `website/app.test.js`
  - 覆盖关系选择、无效关系安全回退、树状 DOM 和 V1/V2 回归。

## Task 1: 关系选择状态与纯函数边界

**Files:**

- Modify: `website/app.test.js`
- Modify: `website/app.js:108-160,271`

- [ ] **Step 1: 写入失败的关系选择测试**

在现有网络辅助函数测试后新增：

```js
test('selectedNetworkRelation keeps only an explorable current-node relation', () => {
  const v2 = require('./v2-data.js');
  const graph = require('./v2-network.js');
  const node = core.networkNodeFor(v2, 'to');
  const relation = node.relations.find(item => item.target === 'into');
  const selected = core.selectedNetworkRelation(v2, graph, node, core.relationSelectionKey(relation));
  assert.equal(selected.target, 'into');
  assert.equal(core.selectedNetworkRelation(v2, graph, node, 'be'), null);
  assert.equal(core.selectedNetworkRelation(v2, graph, node, null), null);
});

test('network relation selection resets while changing the exploration target', () => {
  const v2 = require('./v2-data.js');
  const relation = v2.nodes.find(node => node.id === 'to').relations.find(item => item.target === 'into');
  const next = core.selectNetworkNode({ networkSystem: 'space-relations', networkNode: 'to', explorePath: [], networkRelation: core.relationSelectionKey(relation) }, v2, 'into');
  assert.deepEqual(next, { networkSystem: 'space-relations', networkNode: 'into', explorePath: ['to'], networkRelation: null });
});
```

- [ ] **Step 2: 运行测试确认红灯**

Run: `node --test website/app.test.js`

Expected: FAIL，提示 `selectedNetworkRelation is not a function`，且 `selectNetworkNode` 返回对象不含 `networkRelation`。

- [ ] **Step 3: 实现最小关系辅助函数和状态重置**

在 `networkNodeFor` 后加入：

```js
function relationSelectionKey(relation) {
  if (!isPlainObject(relation) || !['type', 'target', 'label', 'explanation'].every(field => typeof relation[field] === 'string' && relation[field].trim())) return null;
  return JSON.stringify([relation.type, relation.target, relation.label, relation.explanation]);
}

function selectedNetworkRelation(v2Data, graphApi, node, selectionKey) {
  if (!isUsableV2Graph(v2Data, graphApi) || typeof graphApi?.explorableRelations !== 'function' || typeof selectionKey !== 'string') return null;
  const current = networkNodeFor(v2Data, node?.id);
  if (!current) return null;
  try {
    return graphApi.explorableRelations(v2Data, current).find(relation => relationSelectionKey(relation) === selectionKey) || null;
  } catch (error) { return null; }
}
```

让 `selectNetworkNode`、`selectNetworkDirect`、`selectNetworkBack`、`selectNetworkSystem` 的返回对象带 `networkRelation: null`。无效目标的 unchanged 返回也保留并规范为 `networkRelation: null`。将函数加入 CommonJS export。

- [ ] **Step 4: 运行测试确认绿灯**

Run: `node --test website/app.test.js`

Expected: PASS，所有已有测试继续通过。

- [ ] **Step 5: 提交**

```bash
git add website/app.js website/app.test.js
git commit -m "feat: track selected network relations"
```

## Task 2: 左到右树状导图与解释面板

**Files:**

- Modify: `website/app.test.js`
- Modify: `website/app.js:209-233,287-365`

- [ ] **Step 1: 写入失败的导图渲染测试**

```js
test('network mind map renders one root and only current-node explorable branches', () => {
  const v2 = require('./v2-data.js');
  const graph = require('./v2-network.js');
  const markup = core.renderNetworkContent(v2, graph, {
    networkSystem: 'space-relations', networkNode: 'to', networkRelation: core.relationSelectionKey(relation), explorePath: [], networkStep: 'detail',
  });
  assert.match(markup, /class="mindMapRoot"/);
  assert.match(markup, /class="mindBranch mindBranch-combination/);
  assert.match(markup, /data-action="select-network-relation" data-relation-key=/);
  assert.match(markup, /class="networkRelationPanel"/);
  assert.match(markup, /IN \+ TO/);
  assert.doesNotMatch(markup, /class="mindBranch mindBranch-growth/);
});

test('network mind map falls back to core origin for an invalid selected relation', () => {
  const v2 = require('./v2-data.js');
  const graph = require('./v2-network.js');
  const markup = core.renderNetworkContent(v2, graph, {
    networkSystem: 'space-relations', networkNode: 'to', networkRelation: 'not-a-relation', explorePath: [], networkStep: 'detail',
  });
  assert.match(markup, /核心本源/);
  assert.doesNotMatch(markup, /not-a-relation/);
});
```

- [ ] **Step 2: 运行测试确认红灯**

Run: `node --test website/app.test.js`

Expected: FAIL，旧网络渲染没有 `mindMapRoot` 或关系选择动作。

- [ ] **Step 3: 实现关系分支和右侧解释面板**

在 `renderNetworkContent()` 中：

1. 调用 `selectedNetworkRelation(v2Data, graphApi, current.node, state?.networkRelation)`，若为 `null` 则渲染当前词 `quick.origin` 为解释内容。
2. 使用当前节点的 `graphApi.explorableRelations()` 构建分支；每个分支只渲染其 `type` 在 `relationTypes` 内、拥有 `targetNode` 或 `targetSystem` 的关系。
3. 生成中央导图：

```js
const root = `<button type="button" class="mindMapRoot" data-action="open-word" data-word="${html(current.node.id)}"><strong>${html(current.node.word)}</strong><span>${html(current.node.coreMeaning)}</span></button>`;
const branches = relations.map(relation => {
  const key = relationSelectionKey(relation);
  return `<button type="button" class="mindBranch mindBranch-${html(relation.type)}" data-action="select-network-relation" data-relation-key="${html(key)}"${key === state?.networkRelation ? ' aria-pressed="true"' : ''}><span class="relationBadge relation-${html(relation.type)}">${html(relationTypes[relation.type])}</span><strong>${html(relation.label)}</strong><span>${html(relation.targetNode?.word || relation.targetSystem?.title)}</span></button>`;
}).join('');
```

4. 中栏保留系统内其他节点的紧凑入口，放在导图下方，不能与根节点关系混淆。
5. 右栏用 `networkRelationPanel` 渲染所选关系 label、explanation、目标词核心含义，以及 `select-network-node` 或 `select-network-system` 的“继续探索”按钮。
6. 保留 `data-network-step` 和既有 `networkMobileNav`；在移动 `detail` 面板中也输出上述导图与解释，桌面样式才变为三栏。
7. 初始化 `state.networkRelation = null`。处理 `select-network-relation`：从 `target.dataset.relationKey` 解析当前节点的真实关系，并写入完整关系键；键固定由 `type`、`target`、`label`、`explanation` 生成，不能只保存目标 id，否则同一目标的不同关系会互相覆盖。用 `networkStepForAction` 后 render；所有进入/返回节点的动作在其 `Object.assign` 后保持函数返回的 `null`。

- [ ] **Step 4: 运行全套测试确认绿灯**

Run: `node --test website/app.test.js && node --check website/app.js`

Expected: PASS，旧 V1/V2 测试和新增导图测试均通过。

- [ ] **Step 5: 提交**

```bash
git add website/app.js website/app.test.js
git commit -m "feat: render V2 network as a mind map"
```

## Task 3: 导图专用视觉和响应式收口

**Files:**

- Modify: `website/app.test.js`
- Modify: `website/styles.css:16-30`

- [ ] **Step 1: 写入失败的样式回归测试**

```js
test('network mind map keeps relation colors and avoids desktop horizontal overflow', () => {
  const styles = fs.readFileSync(require.resolve('./styles.css'), 'utf8');
  assert.match(styles, /\.mindMapCanvas\{[^}]*min-width:0/);
  assert.match(styles, /\.mindBranch-growth\{[^}]*#0f766e/);
  assert.match(styles, /\.mindBranch-combination\{[^}]*#6d28d9/);
  assert.match(styles, /\.mindBranch-contrast\{[^}]*#a15c00/);
  assert.match(styles, /@media\(max-width:900px\)\{[^}]*\.mindMapCanvas/);
});
```

- [ ] **Step 2: 运行测试确认红灯**

Run: `node --test website/app.test.js`

Expected: FAIL，旧 CSS 没有 `.mindMapCanvas` 与分支颜色选择器。

- [ ] **Step 3: 仅增加导图专用 CSS**

在现有 V2 network CSS 后增加：

```css
.mindMapCanvas{display:grid;grid-template-columns:minmax(150px,.8fr) minmax(0,1.3fr);gap:18px;align-items:center;min-width:0;padding:20px;border:1px solid rgba(101,112,191,.15);border-radius:18px;background:radial-gradient(circle at 34% 50%,rgba(117,94,211,.13),transparent 34%),rgba(255,255,255,.58)}
.mindMapRoot,.mindBranch{min-width:0;min-height:58px;text-align:left}
.mindMapRoot{display:grid;gap:4px;place-content:center;padding:20px;border-radius:18px;background:linear-gradient(135deg,#6755c6,#4285da);color:#fff;box-shadow:0 12px 24px rgba(76,80,183,.24)}
.mindMapRoot strong{font-size:28px}.mindBranches{display:grid;gap:10px;min-width:0}.mindBranch{position:relative;display:grid;gap:4px;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:#fff;color:#37466f}.mindBranch::before{position:absolute;top:50%;left:-19px;width:19px;height:2px;background:#cbd5e1;content:""}.mindBranch[aria-pressed="true"]{box-shadow:0 0 0 3px rgba(86,83,197,.17)}
.mindBranch-growth{border-color:#99f6e4;color:#0f766e;background:#f0fdfa}.mindBranch-combination{border-color:#ddd6fe;color:#6d28d9;background:#f5f3ff}.mindBranch-contrast{border-color:#fde68a;color:#a15c00;background:#fffbeb}.mindBranch-system{border-color:#d7deeb;color:#526174;background:#f2f4f7}
.networkRelationPanel{min-width:0}.networkRelationPanel .relationExplanation{padding:16px;border-radius:14px;background:rgba(245,249,255,.72)}
```

在 `@media(max-width:900px)` 内增加 `.mindMapCanvas{grid-template-columns:minmax(0,1fr);gap:12px}.mindBranch::before{display:none}`。不改 `.networkLayout[data-network-step]` 规则。

- [ ] **Step 4: 运行验证**

Run: `node --test website/app.test.js && node --check website/app.js && node --check website/v2-data.js && node --check website/v2-network.js && git diff --check`

Expected: PASS，无语法错误、测试失败或空白差异。

- [ ] **Step 5: 提交**

```bash
git add website/styles.css website/app.test.js
git commit -m "style: present V2 network as a tree map"
```

## Task 4: 最终人工与回归验证

**Files:**

- Verify only: `website/index.html`, `website/app.js`, `website/styles.css`, `website/app.test.js`

- [ ] **Step 1: 运行完整自动验证**

Run:

```bash
node --test website/app.test.js
node --check website/app.js
node --check website/v2-data.js
node --check website/v2-network.js
node --check website/data.js
git diff --check f7295c9..HEAD
git status --short
```

Expected: 全部测试通过、所有检查退出码为 0、没有未提交产品代码。

- [ ] **Step 2: 手动检查本地页面**

打开 `website/index.html`，确认：

1. 点击知识网络，桌面有系统栏、树状根节点/分支和解释面板。
2. 点击组合关系分支时只更新解释；再点击继续探索，当前根节点变为目标词。
3. 点击系统或普通节点时，已选关系被清除，解释回到核心本源。
4. 缩窄至 900px 以下，仍能按系统、词条、详情逐层进入，页面无横向导图溢出。
5. 打开 `GO`，仍为 V1 课程；复习、进度和词库可正常使用。

- [ ] **Step 3: 请求代码复核**

调用 `superpowers:requesting-code-review` 的审查流程，重点检查：关系是否全部来自当前节点、状态重置、CSS 真实命中 DOM、移动端单面板与 XSS 转义。
