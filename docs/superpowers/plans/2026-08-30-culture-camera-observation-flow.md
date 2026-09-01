# Culture Lesson 1 与 Camera 开门场景 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Culture Lesson 1 改为两页观察互动，并以已确认的开门插画替换 Camera 的单场景训练，同时保持既有学习进度与路线。

**Architecture:** 在 `v2-curriculum-data.js` 为 `culture-01` 增加已验证的 `observationSteps` 数据；`app.js` 仅为该课渲染轻量观察界面，并将其临时页码与选择保存在浏览器运行态而非学习档案。Camera 沿用既有四步状态机和完成逻辑，只替换场景数据、焦点区域与图下英语块呈现。

**Tech Stack:** 原生 JavaScript、静态 HTML/CSS、Node 内置 test、浏览器本地静态服务器。

**归档状态：** 对应 Culture / Camera 实现已存在于当前分支历史；本文件保留为当时的实施计划，不在本轮重新执行。

---

### Task 1: 加入统一插画资源

**Files:**
- Create: `website/assets/camera-child-opening-door.png`
- Create: `website/assets/culture-rain-event.png`
- Create: `website/assets/culture-red-ball-context.png`

- [ ] **Step 1: 保存已确认的开门插画并生成两张 Culture 插画**

将确认预览复制为 `camera-child-opening-door.png`；生成同一暖色 3D 教育风格的下雨、红球两张 16:9 插画。三张均无文字、无水印、无无关人物；红球图只含一个孩子、桌面和清晰红球。

- [ ] **Step 2: 检查资源尺寸与路径**

Run: `file website/assets/camera-child-opening-door.png website/assets/culture-rain-event.png website/assets/culture-red-ball-context.png`

Expected: 三个可读取的 PNG 文件，路径都在 `website/assets/`。

### Task 2: 先写 Culture Lesson 1 的失败测试

**Files:**
- Modify: `website/app.test.js:1116-1165`

- [ ] **Step 1: 写两个观察页的行为断言**

新增测试，调用 `renderCultureWorkspace(curriculum, 'culture-01', progress, 0, 'rain-now')` 与第二页状态，断言：下雨场景和 `It's raining.`、红球场景和 `Did you see it?`、边界提醒、图像 `alt`、全宽下一步按钮均出现；并断言 Lesson 1 不出现旧开门例句、`我真正要理解什么`、`换一个英语镜头来看` 或 `cultureExamples`。

- [ ] **Step 2: 运行单测确认失败**

Run: `node --test --test-name-pattern="Culture Lesson 1" website/app.test.js`

Expected: FAIL，因为当前课程尚无观察步骤与自定义渲染。

### Task 3: 实现 Culture Lesson 1 的观察互动

**Files:**
- Modify: `website/v2-curriculum-data.js:39-55`
- Modify: `website/app.js:456-531, 900-916`
- Modify: `website/styles.css:32-33, 59`

- [ ] **Step 1: 扩展 Lesson 1 数据，不改课程 ID**

保留 `culture-01`；新增 `observationIntro`、`observationSteps` 和指定边界提醒。两个步骤的推荐点选 ID 分别为 `rain-now` 与 `clear-context`，使用 `culture-rain-event.png` 与 `culture-red-ball-context.png`；旧 Lesson 2-5 数据与 `v2.culture.completed` 逻辑不变。

- [ ] **Step 2: 增加最小运行态与操作处理**

在浏览器 `state` 增加 `cultureObservationStep:0` 与 `cultureObservationChoice:null`；处理 `select-culture-observation`、`next-culture-observation`，仅允许数据中存在的选择，换页时清空选择。切换课程、完成 Culture Lesson 1 或返回第一步时重置这两个临时字段，不写入 localStorage。

- [ ] **Step 3: 为 Lesson 1 单独渲染短互动结构**

在 `renderCultureWorkspace` 中检测 `observationSteps`：输出引导、插画、一个问题、点选按钮、选择后英语表达和一句结论。第一页选择后显示“下一步：看看语境里省掉的信息 →”；第二页选择后显示“完成当前节 →”。其他 Culture 课程继续使用现有渲染。

- [ ] **Step 4: 添加响应式样式**

新增 `.cultureObservation*` 样式：插画 `width:100%; aspect-ratio:16/9; object-fit:contain`，选择与主按钮最小高度 44px，375px 下单列且按钮全宽。

- [ ] **Step 5: 运行 Culture 单测确认通过**

Run: `node --test --test-name-pattern="Culture" website/app.test.js`

Expected: PASS，包含新的 Lesson 1 互动测试与旧进度兼容测试。

### Task 4: 先写 Camera 开门场景的失败测试

**Files:**
- Modify: `website/app.test.js:1167-1260`

- [ ] **Step 1: 写 Camera 三步图层断言**

新增或替换当前 Camera 样板断言：步骤 1 出现 `A child` 和人物高亮；步骤 2 出现 `is opening`、手/门缝高亮和 `cameraVisualOpeningArrow`；步骤 3 出现 `the door` 和门高亮；插画路径是 `assets/camera-child-opening-door.png`；完成 CTA 仍指向 World。

- [ ] **Step 2: 运行单测确认失败**

Run: `node --test --test-name-pattern="Camera.*opening|Camera curriculum" website/app.test.js`

Expected: FAIL，因为当前 Camera 使用图书馆做作业样板。

### Task 5: 实现 Camera 开门三步训练

**Files:**
- Modify: `website/v2-curriculum-data.js:100-145`
- Modify: `website/app.js:464-545`
- Modify: `website/styles.css:34-35, 59`

- [ ] **Step 1: 替换现有 Camera 场景数据，保留 ID 与 World 跳转**

保留 `camera-library-01` ID 以避免存量完成记录失效；将标题、场景、可访问文本、选项、推荐表达改为孩子开门。三步依次使用 `focus-child`、`action-opening`、`relation-door`，动作反馈只解释画面，不讲语法术语。`nextLink.view` 保持 `world`。

- [ ] **Step 2: 为图片叠加层增加三种精确状态**

将焦点区域定义为 child、hand、door、doorGap。第一步绘制 child，第二步绘制 hand/doorGap 并输出短箭头路径，第三步绘制 door；高亮层位于图片上，不把英语文字写入 PNG。

- [ ] **Step 3: 改为图下英语分块增长**

在每个推荐选择后按当前步骤显示 `A child`、`is opening`、`the door` 三个独立 `.cameraEnglishBlock`，当前块突出；第三步可在下方组合成 `A child | is opening | the door.`。

- [ ] **Step 4: 添加手机端保护样式**

`.cameraSceneImage` 与其容器使用 `object-fit:contain`；375px 维持 `aspect-ratio:16/9`，叠加层使用同一坐标系，英语块单列，不裁切孩子或门。

- [ ] **Step 5: 运行 Camera 单测确认通过**

Run: `node --test --test-name-pattern="Camera" website/app.test.js`

Expected: PASS，Camera 完成状态仍通往 World。

### Task 6: 更新说明、完整验证与视觉验收

**Files:**
- Modify: `docs/09_Level1网站使用说明.md`
- Modify: `docs/v2-content-review/Culture.md`
- Modify: `docs/v2-content-review/Camera.md`
- Test: `website/app.test.js`

- [ ] **Step 1: 更新课程说明**

说明 Culture Lesson 1 的两个观察及边界；说明 Camera 的开门样板只训练人物、动作、对象，完成后进入 World。

- [ ] **Step 2: 运行完整静态验证**

Run: `node --check website/app.js && node --check website/v2-curriculum-data.js && node --test website/app.test.js && git diff --check`

Expected: 所有检查退出码为 0，既有 139 个测试保留且新增测试通过。

- [ ] **Step 3: 浏览器验收并保存截图**

启动静态服务器，在浏览器分别以桌面与 375px 宽度检查 Culture Lesson 1 两页、Camera 三步和 Camera → World；截图保存到交付输出目录，不加入网站代码。

- [ ] **Step 4: 提交明确范围的实现**

Run: `git add -- website/assets/camera-child-opening-door.png website/assets/culture-rain-event.png website/assets/culture-red-ball-context.png website/v2-curriculum-data.js website/app.js website/app.test.js website/styles.css docs/09_Level1网站使用说明.md docs/v2-content-review/Culture.md docs/v2-content-review/Camera.md docs/superpowers/plans/2026-08-30-culture-camera-observation-flow.md && git commit -m "feat: teach culture and camera through observation"`

Expected: 只提交本计划列出的资源、课程、测试、样式与说明。
