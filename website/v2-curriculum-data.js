(() => {
const root = typeof window !== 'undefined' ? window : globalThis;
const payload = {
  stages: [
    { id:'start', order:0, code:'00', title:'Start', subtitle:'英语思维是什么', summary:'先知道这条路线会带你从画面走到表达。', status:'planned', view:null },
    { id:'culture', order:1, code:'01', title:'Culture', subtitle:'中英语言差异从哪里来', summary:'理解信息组织的不同倾向，不把语言分成高低。', status:'available', view:'culture' },
    { id:'camera', order:2, code:'02', title:'Camera', subtitle:'英语镜头感', summary:'从焦点出发，看动作、对象、关系和背景。', status:'available', view:'camera' },
    { id:'world', order:3, code:'03', title:'World', subtitle:'看见现实画面的组成部分', summary:'先从一个真实画面里看见谁、物品、动作、状态、关系和背景。', status:'available', view:'world' },
    { id:'word-image', order:4, code:'04', title:'Word Image', subtitle:'单词本源画面', summary:'从现实画面出发，先把一个英语词连到它的核心画面。', status:'available', view:'word-image' },
    { id:'sentence', order:5, code:'05', title:'Sentence', subtitle:'英语句子生成', summary:'从最短核心句开始，一次补上一项画面信息。', status:'planned', view:null },
    { id:'grammar', order:6, code:'06', title:'Grammar', subtitle:'英语标记系统', summary:'先理解画面信息变化，再认识语法标记。', status:'planned', view:null },
    { id:'scene-training', order:7, code:'07', title:'Scene Training', subtitle:'场景到英语', summary:'把真实场景逐步变成英语画面和表达。', status:'planned', view:null },
    { id:'output', order:8, code:'08', title:'Output', subtitle:'自由表达', summary:'看图、日常场景和连续故事的表达训练。', status:'planned', view:null },
  ],
  cultureLessons: [
    {
      id:'culture-01', order:1, title:'语言不是给世界贴不同标签',
      question:'为什么中文脑中的一句话，不能总是逐字翻译成英语？',
      scene:'一个孩子正在打开一扇门。画面、动作和人物都没有改变。',
      chineseExample:'孩子在开门。', englishExample:'A child is opening the door.',
      explanation:'两句话都在指向同一个画面，但语言会选择不同的信息组织方式。学习英语时，先回到画面，再看英语怎样把画面里的信息摆出来。',
      takeaway:'不是把中文词逐个换成英文词，而是先看同一个现实画面。',
      boundary:'这是常见组织倾向，不代表任何一种语言只是给世界贴标签，也不代表哪一种更高级。',
      nextHint:'下一节：看看中文在语境明确时，哪些信息经常可以不重复说。',
    },
    {
      id:'culture-02', order:2, title:'中文：很多信息可以留在语境里',
      question:'已经知道的信息，为什么有时不用每次重新说出来？',
      scene:'两个人刚吃完饭，彼此都知道正在谈论刚才那顿饭。',
      chineseExample:'A：吃饭了吗？ B：吃了。', englishExample:'A: Have you eaten? B: Yes, I have.',
      explanation:'当人物、时间和动作对象已在上下文里明确时，中文经常可以把一部分信息留在语境中。英语也会省略已知信息，只是常在不同位置保留关系提示。',
      takeaway:'先问：听的人已经知道什么？哪些信息需要重新说清楚？',
      boundary:'“经常可以”不是绝对规则；依赖语境不等于中文没有语法，也不等于中文不讲逻辑。',
      nextHint:'下一节：把镜头里的主角先摆清楚。',
    },
    {
      id:'culture-03', order:3, title:'英语：先把画面里的角色摆清楚',
      question:'英语开口前，镜头里谁是我要说的主角？',
      scene:'同一间公园里，有人在吃东西、有人在跑步，也有一只狗正在睡觉。',
      chineseExample:'我吃。她跑。那只狗在睡觉。', englishExample:'I eat. She runs. The dog is sleeping.',
      explanation:'英语表达中经常先把“谁/什么”放到主体位置，再说明它处于什么动作、状态或关系。先找主角，比先找中文词更有帮助。',
      takeaway:'开口前先找：镜头里谁是我要说的主角？',
      boundary:'这是英语表达中的常见倾向，不是绝对规则；不是每个英语句子都只能按同一种顺序，也不是完整语法课。',
      nextHint:'下一节：用同一个简单画面，看看两种组织方法怎样都能指向现实。',
    },
    {
      id:'culture-04', order:4, title:'同一个画面，两种组织方法',
      question:'为什么同一画面不必按相同词序逐个对应？',
      scene:'一张桌子上放着一本书。重点是让听者定位到“书”和“桌面”的关系。',
      chineseExample:'桌上有一本书。', englishExample:'There is a book on the table.',
      explanation:'中文和英语都在指向同一个现实画面，但会选择不同的组织顺序。这里不需要先背术语；先看英语怎样把“有一本书”和“在桌上”安排出来。',
      takeaway:'逐词对应不是唯一入口；画面、对象和关系才是共同起点。',
      boundary:'这只是一个简单示例，不代表中文或英语所有句子都按固定公式组织，更不要求只背 There be。',
      nextHint:'最后一节：把“倾向”收回来，不把它变成语言优劣判断。',
    },
    {
      id:'culture-05', order:5, title:'不是谁更高级，而是观察习惯不同',
      question:'理解不同组织倾向后，真正要带走什么？',
      scene:'同一个人既能用中文清楚说明一件事，也能用英语在合适语境中省略已知信息。',
      chineseExample:'中文可以非常精确，也有严格语法和逻辑。', englishExample:'English can also omit information when the context is clear.',
      explanation:'我们学习的是常见组织倾向：面对同一画面，英语常会要求我们更主动地找主体、关系和要补出的信息。它不是给两种语言贴永久标签。',
      takeaway:'学英语不是替换词表，而是重新观察画面、确定关系，再组织表达。',
      boundary:'中文和英语都可以精确、模糊、省略或依赖语境；不能用民族性格、文明类型或语言优劣解释语言形式。',
      nextHint:'Culture 已完成。下一站是 Camera：英语通常先把镜头对准哪里？Camera 当前准备中。',
    },
  ],
  cameraScenes: [
    {
      id:'camera-library-01', order:1, title:'镜头思维：从画面到一句英语',
      scene:'图书馆里，一个男孩正在桌边做作业。书桌、书和其他读者都在画面里。',
      focusQuestion:'先拍谁？本次镜头要围绕谁来组织？',
      focusChoices:[
        { id:'focus-boy', label:'男孩', recommended:true, feedback:'先把男孩放到镜头中心。接下来，我们只看他正在发生什么。' },
        { id:'focus-book', label:'书', recommended:false, feedback:'这也是一个可以观察的角度；本次样板先跟随男孩，练习当前这条表达路径。' },
        { id:'focus-library', label:'图书馆', recommended:false, feedback:'这也是一个可以观察的角度；本次样板先跟随男孩，练习当前这条表达路径。' },
      ],
      actionQuestion:'镜头里的男孩正在发生什么？',
      actionChoices:[
        { id:'action-homework', label:'正在做作业', recommended:true, feedback:'男孩的动作进入镜头：他正在做作业。现在画面已有“谁”和“在做什么”。' },
        { id:'action-reading', label:'正在看书', recommended:false, feedback:'画面里也有书，但本次样板要跟随男孩正在做作业的动作。' },
        { id:'action-walking', label:'正在走路', recommended:false, feedback:'男孩没有在移动；本次先观察他桌边正在展开的动作。' },
      ],
      relationQuestion:'这个动作和什么有关？',
      relationChoices:[
        { id:'relation-homework', label:'homework', recommended:true, feedback:'补上 homework，动作落到具体事情上：The boy is doing homework.' },
        { id:'relation-library', label:'the library', recommended:false, feedback:'图书馆是背景地点；这一步先补出男孩在做的事情。' },
        { id:'relation-book', label:'a book', recommended:false, feedback:'书在画面里，但本次动作要先连到 homework。' },
      ],
      expansionSteps:[
        {
          id:'expansion-library', title:'再补一项背景', question:'最后只补一项背景：男孩在哪里？',
          choices:[
            { id:'expansion-library', label:'in the library', recommended:true, feedback:'补上地点后，镜头多了一项背景信息：The boy is doing homework in the library.' },
            { id:'expansion-home', label:'at home', recommended:false, feedback:'本次画面发生在图书馆；先让背景和眼前画面对齐。' },
            { id:'expansion-school', label:'at school', recommended:false, feedback:'图书馆可以在学校里，但本次镜头明确拍到的是图书馆。' },
          ],
        },
      ],
      recommendedSentence:'The boy is doing homework in the library.',
      feedback:{ alternateFocus:'这也是一个可以观察的角度；本次样板先跟随男孩，练习当前这条表达路径。', completion:'你已经按一次镜头路径，把画面逐步组织成一句英语。' },
      nextLink:{ stage:'sentence', text:'下一站是 Sentence：从最短核心句开始，一次补上一项画面信息。Sentence 当前准备中。' },
    },
  ],
  worldScenes: [
    {
      id:'world-room-01', order:1, title:'World：看见现实画面的组成部分',
      scene:{
        accessibleText:'房间里，一个女孩坐在桌边读书。她手里拿着一本书，桌上有一个红色杯子，一只白猫安静地待在桌下。',
        caption:'房间里，一个女孩坐在桌边读书；书在她手里，红色杯子在桌上，白猫安静地待在桌下。',
      },
      steps:[
        {
          id:'people', concept:'谁 / 动物', question:'谁在画面里？',
          choices:[
            { id:'people-girl-cat', label:'女孩和白猫', recommended:true, feedback:'你刚才找到的是“谁 / 动物”：画面里出现的角色。' },
            { id:'people-girl', label:'女孩', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先找画面里的谁。' },
            { id:'people-cat', label:'白猫', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先找画面里的谁。' },
          ],
        },
        {
          id:'things', concept:'物品', question:'画面里有什么？',
          choices:[
            { id:'things-book-cup-table', label:'书、红色杯子和桌子', recommended:true, feedback:'你刚才找到的是“物品”：画面里可以指认的东西。' },
            { id:'things-book', label:'一本书', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先找画面里的物品。' },
            { id:'things-cup', label:'一个红色杯子', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先找画面里的物品。' },
          ],
        },
        {
          id:'action', concept:'动作', question:'正在发生什么？',
          choices:[
            { id:'action-girl-reading', label:'女孩正在读书', recommended:true, feedback:'你刚才找到的是“动作”：画面中正在发生的事。' },
            { id:'action-cat', label:'白猫待在桌下', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先找“正在发生的事”。' },
            { id:'action-cup', label:'杯子是红色的', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先找“正在发生的事”。' },
          ],
        },
        {
          id:'state', concept:'状态', question:'它们现在是什么样？',
          choices:[
            { id:'state-cat-cup', label:'白猫很安静，杯子是红色的', recommended:true, feedback:'你刚才找到的是“状态”：画面现在呈现的样子。' },
            { id:'state-reading', label:'女孩正在读书', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先看现在呈现的样子。' },
            { id:'state-book-hand', label:'书在女孩手里', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先看现在呈现的样子。' },
          ],
        },
        {
          id:'relation', concept:'关系', question:'它们彼此有什么联系？',
          choices:[
            { id:'relation-book-cup', label:'书在女孩手里，杯子在桌上', recommended:true, feedback:'你刚才找到的是“关系”：画面里的元素怎样连在一起。' },
            { id:'relation-reading', label:'女孩正在读书', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先看元素之间怎样连在一起。' },
            { id:'relation-room', label:'这是一个房间', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先看元素之间怎样连在一起。' },
          ],
        },
        {
          id:'place', concept:'背景', question:'这一切发生在哪里？',
          choices:[
            { id:'place-room', label:'在房间里', recommended:true, feedback:'你刚才找到的是“背景”：这一整个画面发生的空间。' },
            { id:'place-table', label:'在桌边', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先看整个画面发生的地方。' },
            { id:'place-under-table', label:'在桌子下面', recommended:false, feedback:'这也是画面中可以观察到的信息；这一页先看整个画面发生的地方。' },
          ],
        },
      ],
      completion:'你已经发现：一个现实画面里，不只有“东西”，还有谁、物品、动作、状态、关系和背景。英语单词会从这些真实画面中长出来。',
      boundary:'这六步是六个观察入口，不是绝对、互斥的分类盒子。同一个元素可以同时提供多种信息：例如“猫在桌下”既体现猫和桌子的关系，也提供位置信息。不需要进行语言学分类。',
      nextLink:{ stage:'word-image', view:'word-image', text:'下一站是 Word Image：先把一个现实关系，连到它的英语核心画面。' },
    },
  ],
  wordImageLessons: [
    {
      id:'word-image-on-01', order:1, title:'Word Image：把画面连到 ON', wordId:'on', sourceSceneId:'world-room-01',
      scene:{
        accessibleText:'温暖的房间里，女孩坐在木桌边读书。一只红色杯子清楚地放在桌面上，白猫安静地待在桌下。',
        caption:'先找到红色杯子，再看看它和桌子是怎样接触的。',
      },
      focus:{
        accessibleText:'画面聚焦红色杯子和木桌表面：杯子完整地放在桌上，杯底接触桌面。',
        caption:'杯子没有悬在空中。它接触着桌子的表面。',
      },
      steps:[
        { id:'return-to-scene', title:'先回到刚才的房间', action:'我找到了' },
        { id:'focus-contact', title:'现在只看杯子和桌面', action:'看看英语怎样抓住这个关系' },
        { id:'connect-on', title:'英语先抓住这个核心画面', action:'完成这个 Word Image' },
      ],
      spelling:'on',
      displayForm:'on',
      phonicsGroups:[
        { letters:'o', sound:'/ɑ/', colorToken:'vowel' },
        { letters:'n', sound:'/n/', colorToken:'consonant' },
      ],
      ipaUS:'/ɑn/',
      speechText:'on',
      speechLang:'en-US',
      core:'一个东西接触在另一个表面上',
      example:'The cup is on the table.',
      chineseConfirm:'杯子在桌子上。',
      sentenceFlow:{
        text:'The cup is on the table.',
        chineseConfirm:'杯子在桌子上。',
        clearIpaUS:'/ðə kʌp ɪz ɑn ðə ˈteɪbəl/',
        clearWords:[
          { text:'The', ipaUS:'/ðə/' }, { text:'cup', ipaUS:'/kʌp/' }, { text:'is', ipaUS:'/ɪz/' },
          { text:'on', ipaUS:'/ɑn/' }, { text:'the', ipaUS:'/ðə/' }, { text:'table', ipaUS:'/ˈteɪbəl/' },
        ],
        natural:{
          ipaUS:'[ðə ˈkʌp‿ɪz‿ɑn ðə ˈteɪbəl]',
          markerExplanation:'‿ 是语流学习标记，不属于英文拼写。英文原句仍保持正常空格。',
          links:[
            { markedText:'cup‿is', explanation:'cup 的词尾 /p/ 与后面的元音 /ɪ/ 连续发出。' },
            { markedText:'is‿on', explanation:'is 的词尾 /z/ 与后面的元音 /ɑ/ 连续发出。' },
          ],
          weakFormExplanation:'两个 the 在当前中性表达中常见弱读为 /ðə/；被特别强调时可能使用不同形式。',
        },
        stress:{ markedText:'The CUP is on the TABLE.', explanation:'cup 承载重要场景信息；table 在当前中性陈述中承担主要句子重音。说话人改变强调重点时，句子重音也可以变化。' },
        phrase:{ text:'当前短句整体作为一个意群。' },
        intonation:'当前作为普通中性陈述，使用自然结束语调。',
        audio:{
          clear:{ text:'The cup is on the table.', lang:'en-US', rate:0.78, label:'清晰慢速' },
          natural:{ text:'The cup is on the table.', lang:'en-US', rate:1, label:'自然语速' },
        },
      },
      boundary:'ON 不是简单等于一个中文“在”；当前先抓住“接触在表面上”这个核心画面。更多用法进入现有 ON 词条继续理解。',
      completion:'你已经把一种现实关系，直接连到了英语词 ON。',
    },
  ],
  supportLinks: [
    { id:'knowledge-network', title:'知识网络', summary:'已开放：沿真实关系继续探索已完成的 V2 样板词。', view:'network' },
  ],
};
root.ENGLISH850_V2_CURRICULUM = payload;
if (typeof module !== 'undefined' && module.exports) module.exports = payload;
})();
