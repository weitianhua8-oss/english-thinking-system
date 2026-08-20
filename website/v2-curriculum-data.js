(() => {
const root = typeof window !== 'undefined' ? window : globalThis;
const payload = {
  stages: [
    { id:'start', order:0, code:'00', title:'Start', subtitle:'英语思维是什么', summary:'先知道这条路线会带你从画面走到表达。', status:'planned', view:null },
    { id:'culture', order:1, code:'01', title:'Culture', subtitle:'中英语言差异从哪里来', summary:'理解信息组织的不同倾向，不把语言分成高低。', status:'planned', view:null },
    { id:'camera', order:2, code:'02', title:'Camera', subtitle:'英语镜头感', summary:'从焦点出发，看动作、对象、关系和背景。', status:'planned', view:null },
    { id:'world', order:3, code:'03', title:'World', subtitle:'850 核心词世界', summary:'用今天的 5 个词开始建立英语世界的基础零件。', status:'available', view:'today' },
    { id:'word-image', order:4, code:'04', title:'Word Image', subtitle:'单词本源画面', summary:'从核心画面、逻辑和真实场景理解已开放的 Level 1 词条。', status:'available', view:'library' },
    { id:'sentence', order:5, code:'05', title:'Sentence', subtitle:'英语句子生成', summary:'从最短核心句开始，一次补上一项画面信息。', status:'planned', view:null },
    { id:'grammar', order:6, code:'06', title:'Grammar', subtitle:'英语标记系统', summary:'先理解画面信息变化，再认识语法标记。', status:'planned', view:null },
    { id:'scene-training', order:7, code:'07', title:'Scene Training', subtitle:'场景到英语', summary:'把真实场景逐步变成英语画面和表达。', status:'planned', view:null },
    { id:'output', order:8, code:'08', title:'Output', subtitle:'自由表达', summary:'看图、日常场景和连续故事的表达训练。', status:'planned', view:null },
  ],
  supportLinks: [
    { id:'knowledge-network', title:'知识网络', summary:'已开放：沿真实关系继续探索已完成的 V2 样板词。', view:'network' },
  ],
};
root.ENGLISH850_V2_CURRICULUM = payload;
if (typeof module !== 'undefined' && module.exports) module.exports = payload;
})();
