(() => {
const root = typeof window !== 'undefined' ? window : globalThis;

const payload = {
  systems: [
    { id: 'space-relations', title: '空间关系', description: '用边界、表面、点和方向组织位置与移动。' },
    { id: 'state-action', title: '状态与动作', description: '用状态和过程理解英语中的动作展开。' },
    { id: 'information-structure', title: '信息结构', description: '用限定、条件和结果组织一句话的信息。' },
    { id: 'attention', title: '注意力', description: '区分注意方向、感知结果和持续观察。' },
  ],
  nodes: [
    {
      id: 'at', word: 'AT', systemId: 'space-relations',
      coreMeaning: '把地点、时间或对象压缩成一个可精准定位的点。',
      coreImage: '一枚地图图钉落在 SCHOOL 或 6:00 这个点上。',
      quick: { origin: '指向一个焦点位置。', example: 'Meet me at the door.', memoryHook: 'AT = 手指点一下。' },
      deep: { logic: 'AT 不强调内部或表面，而强调落在一个被锁定的点上。', scenes: 'at school、at six、look at me。', structures: '动词 + at + 目标。', chineseTrap: '不要一律翻成“在”；它强调定位点。', studyTip: '先问自己：这里是不是把对象当成一个点？' },
      relations: [
        { type: 'system', target: 'space-relations', label: '所属：空间关系', explanation: 'AT 属于空间关系系统，用“点”完成定位。' },
        { type: 'contrast', target: 'to', label: '定位点 vs 方向箭头', explanation: 'AT 锁定目标点；TO 表示朝目标移动或延伸。' },
        { type: 'contrast', target: 'in', label: '点定位 vs 内部边界', explanation: 'AT 是点定位；IN 强调在边界内部。' },
      ],
    },
    {
      id: 'on', word: 'ON', systemId: 'space-relations',
      coreMeaning: '与表面接触，并处于依附或支撑关系。',
      coreImage: '一个球贴在桌面上，接触点发光。',
      quick: { origin: '从表面接触的空间关系发展而来。', example: 'The book is on the table.', memoryHook: 'ON = 贴上、接上。' },
      deep: { logic: 'ON 的核心不是“上方”，而是接触到承载表面。', scenes: 'on the wall、on the table、the light is on。', structures: 'be + on + 表面；turn + on。', chineseTrap: '“on”不只表示“在……上面”，还可表示接通或运行。', studyTip: '画出接触点，再判断是否该用 ON。' },
      relations: [
        { type: 'system', target: 'space-relations', label: '所属：空间关系', explanation: 'ON 用表面接触来表达空间关系。' },
        { type: 'contrast', target: 'in', label: '表面接触 vs 内部', explanation: 'ON 在表面接触；IN 在边界内部。' },
        { type: 'contrast', target: 'at', label: '表面画面 vs 点定位', explanation: 'ON 保留接触表面的画面；AT 只做点式定位。' },
      ],
    },
    {
      id: 'in', word: 'IN', systemId: 'space-relations',
      coreMeaning: '处在一个边界的内部。',
      coreImage: '一个球已经在透明盒子的边界里面。',
      quick: { origin: '来自“容器有内外”的边界感。', example: 'The keys are in the bag.', memoryHook: 'IN = 在圈里面。' },
      deep: { logic: '空间、时间段和抽象状态都可被理解为有边界的容器。', scenes: 'in the box、in China、in trouble。', structures: 'be + in + 容器/范围。', chineseTrap: 'IN 说的是已在里面，不包含进入动作。', studyTip: '先看画面是“已经在内”还是“正跨进内”。' },
      relations: [
        { type: 'system', target: 'space-relations', label: '所属：空间关系', explanation: 'IN 用边界内部组织空间关系。' },
        { type: 'combination', target: 'into', label: 'IN + TO → INTO', explanation: 'IN 的“内部”与 TO 的“朝向”合在一起，形成 INTO 的进入画面。' },
        { type: 'contrast', target: 'into', label: '内部状态 vs 进入过程', explanation: 'IN 是内部状态；INTO 是穿过边界进入内部的过程。' },
        { type: 'contrast', target: 'on', label: '内部 vs 表面接触', explanation: 'IN 强调内部容纳；ON 强调表面接触。' },
      ],
    },
    {
      id: 'to', word: 'TO', systemId: 'space-relations',
      coreMeaning: '朝一个目标点移动或延伸。',
      coreImage: '一支箭头从起点指向发光目标。',
      quick: { origin: '来自“朝目标去”的方向感。', example: 'Go to school.', memoryHook: 'TO = 箭头指向目标。' },
      deep: { logic: 'TO 给出方向和终点；在 to do 中，它把后面的动作指向一个待完成的目标。', scenes: 'go to school、give it to me、listen to music、too tired to walk。', structures: '动词 + to + 目标；too + 形容词 + to + 动词。', chineseTrap: 'TO 不等于静态“在”；to do 也不是移动介词，而是把动作指向目标。', studyTip: '用箭头标出从哪里朝哪里去；遇到 to do 时标出要完成的动作。' },
      relations: [
        { type: 'system', target: 'space-relations', label: '所属：空间关系', explanation: 'TO 在空间关系系统中表达方向与终点。' },
        { type: 'contrast', target: 'at', label: '方向箭头 vs 定位点', explanation: 'TO 是朝目标的箭头；AT 是已经锁定的目标点。' },
        { type: 'combination', target: 'into', label: 'TO + IN → INTO', explanation: 'TO 的方向感进入 IN 的边界内部，就得到 INTO 的动态进入。' },
        { type: 'combination', target: 'too-to', label: 'TOO + to do → TOO...TO...', explanation: '这里的 to do 把动作指向目标；TOO...TO... 表示程度过头，令该动作无法实现，而不是简单的移动介词。' },
      ],
    },
    {
      id: 'into', word: 'INTO', systemId: 'space-relations',
      coreMeaning: '朝内部移动，并跨过边界进入其中。',
      coreImage: '球从盒外穿过边界，落进透明盒。',
      quick: { origin: '把 IN 的内部和 TO 的朝向合在一起。', example: 'She walks into the room.', memoryHook: 'INTO = 箭头钻进盒子。' },
      deep: { logic: 'INTO 同时包含方向、边界和进入后的内部落点。', scenes: 'go into the room、put it into the box、turn into ice。', structures: '动作动词 + into + 内部目标。', chineseTrap: '不要把 INTO 当作静态 IN；它必须有进入或转变。', studyTip: '看是否发生“外 → 穿界 → 内”的三步画面。' },
      relations: [
        { type: 'system', target: 'space-relations', label: '所属：空间关系', explanation: 'INTO 通过跨越边界表达动态空间关系。' },
        { type: 'combination', target: 'in', label: '内部落点', explanation: 'INTO 保留 IN 的内部落点，同时加入动态进入。' },
        { type: 'combination', target: 'to', label: '方向进入边界', explanation: 'INTO 保留 TO 的方向箭头，但终点必须在边界之内。' },
        { type: 'contrast', target: 'in', label: '位置 vs 变化', explanation: 'IN 描述位置已在内部；INTO 描述进入内部的变化。' },
      ],
    },
    {
      id: 'be', word: 'BE', systemId: 'state-action',
      coreMeaning: '把人、物或情况放在一个身份、状态或位置上。',
      coreImage: '主语被一条等号连接到一个状态标签。',
      quick: { origin: '用于建立“是什么、在哪里、怎样”的状态连接。', example: 'They are ready.', memoryHook: 'BE = 现在处于这个状态。' },
      deep: { logic: 'BE 本身不画动作，而是把主体与当前身份、特征或位置连接起来。', scenes: 'be happy、be a teacher、be at home。', structures: '主语 + be + 状态/身份/地点。', chineseTrap: '不要把 BE 只背成“是”；很多时候它表达“处于”。', studyTip: '找出 BE 两边：谁，处于什么状态或位置。' },
      relations: [
        { type: 'system', target: 'state-action', label: '所属：状态与动作', explanation: 'BE 是状态与动作系统中的基础状态连接词。' },
        { type: 'growth', target: 'ing', label: 'BE + -ING', explanation: 'BE 与 -ING 组合，把主体放进正在展开的动作过程。' },
      ],
    },
    {
      id: 'ing', word: '-ING', systemId: 'state-action',
      coreMeaning: '把动作看成正在展开、可被观察的过程。',
      coreImage: '连续三帧动作被圈成一段进行中的影片。',
      quick: { origin: '把“做”从一个点扩展成可持续的过程。', example: 'They are studying.', memoryHook: '-ING = 动作正在放电影。' },
      deep: { logic: '-ING 让动作具有过程感，常需 BE 来标出主体正处于这个过程。', scenes: 'is running、are studying、keep moving。', structures: 'be + 动词-ing。', chineseTrap: '不要机械翻译为“正在”；先理解动作是否被当成过程。', studyTip: '想象动作有连续帧，而不是一个瞬间。' },
      relations: [
        { type: 'system', target: 'state-action', label: '所属：状态与动作', explanation: '-ING 在状态与动作系统中把动作呈现为过程。' },
        { type: 'growth', target: 'be', label: 'BE + -ING', explanation: '-ING 与 BE 相连时，形成“主体正处于某动作过程”的结构。' },
      ],
    },
    {
      id: 'the', word: 'THE', systemId: 'information-structure',
      coreMeaning: '提示听者：你应能定位到这个特定对象。',
      coreImage: '一束聚光灯照在双方都知道的那一个对象上。',
      quick: { origin: '来自说话双方共享的可定位信息。', example: 'Close the door.', memoryHook: 'THE = 说的就是那个。' },
      deep: { logic: 'THE 不是给名词贴中文标签，而是把注意力锁到可识别的特定对象。', scenes: 'the door、the teacher、the book on the desk。', structures: 'the + 已知或可定位的名词。', chineseTrap: '中文常不说“那个”，英语仍可能需要 THE。', studyTip: '问自己：听者能否凭上下文找到同一个对象？' },
      relations: [
        { type: 'system', target: 'information-structure', label: '所属：信息结构', explanation: 'THE 在信息结构系统中标记可共同定位的信息。' },
      ],
    },
    {
      id: 'if', word: 'IF', systemId: 'information-structure',
      coreMeaning: '先打开一个条件空间，再讨论其中可能发生的结果。',
      coreImage: '一扇写着 IF 的门后面连着一个可能结果。',
      quick: { origin: '把尚未确定的情况设为前提。', example: 'If it rains, we stay home.', memoryHook: 'IF = 先设一个条件。' },
      deep: { logic: 'IF 不保证事情发生，它只规定“在这个条件下，后面的话成立”。', scenes: 'if it rains、if you need help、if I have time。', structures: 'if + 条件，结果；结果 if + 条件。', chineseTrap: '不要把 IF 当成必然因果；它表达的是条件。', studyTip: '先圈出条件，再找该条件下的结果。' },
      relations: [
        { type: 'system', target: 'information-structure', label: '所属：信息结构', explanation: 'IF 在信息结构系统中建立条件与结果的连接。' },
        { type: 'contrast', target: 'too-to', label: '条件空间 vs 过度结果', explanation: 'IF 打开一个尚未确定的条件；TOO...TO... 描述程度已经过头的结果。' },
      ],
    },
    {
      id: 'too-to', word: 'TOO...TO...', systemId: 'state-action',
      coreMeaning: '程度超过界限，以至于后面的动作无法发生。',
      coreImage: '温度计越过红线，通向 TO 的行动箭头被挡住。',
      quick: { origin: '把“过度”与后续行动连接成一个结果结构。', example: 'It is too late to call.', memoryHook: 'TOO...TO... = 太过头，后面做不了。' },
      deep: { logic: 'TOO 提供超出界限的程度，TO 引出因此无法完成的动作。', scenes: 'too tired to walk、too small to read、too late to call。', structures: 'too + 形容词/副词 + to + 动词。', chineseTrap: '它常带负向结果，不等于单纯“很”。', studyTip: '先找“超出什么界限”，再找被阻断的动作。' },
      relations: [
        { type: 'system', target: 'state-action', label: '所属：状态与动作', explanation: 'TOO...TO... 在状态与动作系统中表达程度造成的动作结果。' },
        { type: 'combination', target: 'to', label: 'TOO + to do → TOO...TO...', explanation: '此处的 to do 把动作指向目标；TOO...TO... 表示程度过头，令该动作无法实现，不是简单的移动介词。' },
        { type: 'contrast', target: 'if', label: '过度结果 vs 条件空间', explanation: 'TOO...TO... 给出已经形成的过度结果；IF 只提出一个可能条件。' },
      ],
    },
    {
      id: 'see', word: 'SEE', systemId: 'attention',
      coreMeaning: '对象进入视觉范围，视觉结果已经发生。',
      coreImage: '物体的箭头进入眼睛，画面已经被接收。',
      quick: { origin: '关注“看到了”的感知结果。', example: 'I see a bird.', memoryHook: 'SEE = 东西进了眼睛。' },
      deep: { logic: 'SEE 重结果，不要求主动把目光投过去。', scenes: 'see a bird、see the problem、see you tomorrow。', structures: 'see + 对象；can see + 对象。', chineseTrap: 'SEE 不是主动盯着看，而是已经获得视觉结果。', studyTip: '问“看到了吗”，答案相关时优先想 SEE。' },
      relations: [
        { type: 'system', target: 'attention', label: '所属：注意力', explanation: 'SEE 在注意力系统中标记视觉感知的结果。' },
        { type: 'contrast', target: 'look', label: '视觉结果 vs 主动方向', explanation: 'SEE 是看见的结果；LOOK 是把目光主动投向某方向。' },
        { type: 'contrast', target: 'watch', label: '瞬间结果 vs 持续过程', explanation: 'SEE 可是瞬间结果；WATCH 要持续关注变化过程。' },
      ],
    },
    {
      id: 'look', word: 'LOOK', systemId: 'attention',
      coreMeaning: '主动把目光和注意力投向某个方向。',
      coreImage: '眼睛变成箭头，射向一个目标。',
      quick: { origin: '关注主动发出的视线方向。', example: 'Look at me.', memoryHook: 'LOOK = 把眼睛当箭头射过去。' },
      deep: { logic: 'LOOK 是方向动作，因此常需 AT、UP、DOWN 等词补出方向或目标。', scenes: 'look at me、look up、look around。', structures: 'look + 方向；look at + 目标。', chineseTrap: 'LOOK 不保证看见了；它只说明目光投过去。', studyTip: '画出眼睛到目标的箭头，补全它朝哪里。' },
      relations: [
        { type: 'system', target: 'attention', label: '所属：注意力', explanation: 'LOOK 在注意力系统中表达主动投向的视觉方向。' },
        { type: 'contrast', target: 'see', label: '主动方向 vs 视觉结果', explanation: 'LOOK 是主动看向；SEE 是已经看见的结果。' },
        { type: 'contrast', target: 'watch', label: '一眼方向 vs 持续跟随', explanation: 'LOOK 可以是一眼的方向动作；WATCH 要持续跟随变化。' },
      ],
    },
    {
      id: 'watch', word: 'WATCH', systemId: 'attention',
      coreMeaning: '把注意力持续放在会变化的对象或过程上。',
      coreImage: '眼睛连续跟随鸟从第一帧飞到第三帧。',
      quick: { origin: '关注持续和变化两个要点。', example: 'Watch the baby.', memoryHook: 'WATCH = 眼睛跟着变化走。' },
      deep: { logic: 'WATCH 需要时间长度，适合节目、比赛、孩子和风险等会变化的对象。', scenes: 'watch TV、watch a game、watch the baby。', structures: 'watch + 过程性对象。', chineseTrap: 'WATCH 不是所有“看”的通用替换；它需要持续过程。', studyTip: '若对象会变化，问自己是否需要持续跟随。' },
      relations: [
        { type: 'system', target: 'attention', label: '所属：注意力', explanation: 'WATCH 在注意力系统中表达持续关注变化过程。' },
        { type: 'contrast', target: 'see', label: '持续过程 vs 视觉结果', explanation: 'WATCH 是持续过程；SEE 是获得视觉结果。' },
        { type: 'contrast', target: 'look', label: '持续跟随 vs 一眼方向', explanation: 'WATCH 比 LOOK 多出持续时间和对象变化。' },
      ],
    },
  ],
};

root.ENGLISH850_V2_DATA = payload;
if (typeof module !== 'undefined' && module.exports) module.exports = payload;
})();
