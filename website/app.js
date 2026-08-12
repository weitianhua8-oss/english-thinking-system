
function calendarDate(date) {
 if(typeof date==='string') {
  const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if(match) return new Date(Number(match[1]),Number(match[2])-1,Number(match[3]));
 }
 return date instanceof Date ? new Date(date.getTime()) : new Date(date);
}
function localDate(date) {
 const value=calendarDate(date);
 return `${value.getFullYear()}-${String(value.getMonth()+1).padStart(2,'0')}-${String(value.getDate()).padStart(2,'0')}`;
}
function addDays(date, days) {
 const value=calendarDate(date);
 value.setDate(value.getDate()+days);
 return localDate(value);
}
function emptyProgress() { return { words:{}, studyDates:[] }; }
function isPlainObject(value) {
 return value!==null&&typeof value==='object'&&!Array.isArray(value)&&Object.getPrototypeOf(value)===Object.prototype;
}
function isProgressProfile(value) {
 return isPlainObject(value)&&isPlainObject(value.words)&&Array.isArray(value.studyDates);
}
function parseStoredProgress(saved) {
 try {
  const progress=JSON.parse(saved);
  return isProgressProfile(progress)?progress:emptyProgress();
 } catch(error) { return emptyProgress(); }
}
function applyFeedback(progress, word, feedback, now) {
 if(!['again','unsure','understood'].includes(feedback)) throw new Error(`Unknown feedback: ${feedback}`);
 progress=progress||emptyProgress();
 const current=progress.words?.[word]||{}, today=localDate(now);
 let mastery=current.mastery||0, reviewCount=current.reviewCount||0, interval=7;
 if(feedback==='again') { mastery=1; reviewCount=0; interval=1; }
 else if(feedback==='unsure') { mastery=2; interval=3; }
 else if(mastery>=4) { mastery=4; reviewCount+=1; interval=30; }
 else { mastery=3; reviewCount+=1; }
 const words={...progress.words,[word]:{...current,mastery,reviewCount,lastSeen:new Date(now).toISOString(),nextReview:addDays(now,interval),history:[...(current.history||[]),feedback]}};
 const studyDates=[...(progress.studyDates||[]),today].filter((date,index,all)=>all.indexOf(date)===index).sort();
 return {...progress,words,studyDates};
}
function dueWords(progress, today) {
 progress=progress||emptyProgress();
 return Object.entries(progress.words||{}).filter(([,word])=>word.nextReview&&word.nextReview<=today).map(([word])=>word);
}
function filterWords(words, progress, filters) {
 const query=String(filters?.query||'').trim().toLowerCase(), category=filters?.category||'all', mastery=filters?.mastery||'all';
 const learned=progress?.words||{};
 return (words||[]).filter(item=>(!query||String(item.word||'').toLowerCase().includes(query))&&(category==='all'||item.category===category)&&(mastery==='all'||String(learned[item.word]?.mastery||0)===String(mastery)));
}
function libraryWords(words, progress, filters) {
 const grade=filters?.grade||'all', level=filters?.level||'all';
 return filterWords(words,progress,{query:filters?.query,category:filters?.category,mastery:'all'}).filter(item=>(grade==='all'||item.grade===grade)&&(level==='all'||item.level?.startsWith(level)));
}
function nextStudyDay(plan, progress) {
 if(!plan||!plan.length) return 1;
 const learned=progress?.words||{};
 const next=plan.find(day=>day.words?.some(word=>!(learned[word]?.mastery>0)));
 return next ? next.day : plan[plan.length-1].day;
}
function viewKind(view) {
 if(view==='review'||view==='progress') return 'placeholder';
 return ['today','library','tree','compare','lesson'].includes(view)?view:'today';
}
function activeNavView(view) {
 return ['today','review','library','tree','compare','progress'].includes(view)?view:null;
}
if(typeof module!=='undefined'&&module.exports) module.exports={localDate,addDays,emptyProgress,parseStoredProgress,applyFeedback,dueWords,filterWords,libraryWords,nextStudyDay,viewKind,activeNavView};

if(typeof window!=='undefined'&&typeof document!=='undefined') {
(()=>{
const D=window.ENGLISH850_DATA, app=document.getElementById('app');
const title=document.getElementById('pageTitle'), sub=document.getElementById('pageSub');
const STORAGE_KEY='english850_level1_progress_v1';
let memoryProgress=emptyProgress();
let storageNotice='';
function loadProgress(){
 try{
  const saved=window.localStorage.getItem(STORAGE_KEY);
  if(saved===null){memoryProgress=emptyProgress();return memoryProgress;}
  const progress=JSON.parse(saved);
  if(!isProgressProfile(progress)) throw new Error('Invalid progress profile');
  memoryProgress=progress;
  return memoryProgress;
 }catch(error){storageNotice='学习档案无法读取，已使用新的本地记录。';memoryProgress=emptyProgress();return memoryProgress;}
}
function saveProgress(progress){
 memoryProgress=progress;
 try{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));}catch(error){state.storageNotice='学习记录暂未保存，已保留在当前页面。';}
 return memoryProgress;
}
let state={view:'today',day:1,query:'',grade:'all',level:'all',cat:'all',progress:loadProgress(),storageNotice};
const comps=[
['be / get','be = 在状态里；get = 进入状态'],
['get / have','get = 到手；have = 已经在范围里'],
['do / make','do = 执行任务；make = 产生结果'],
['go / come','go = 离开焦点；come = 朝焦点靠近'],
['take / bring','take = 带走；bring = 带来'],
['see / look / watch','LOOK = 方向；SEE = 结果；WATCH = 过程'],
['hear / listen','HEAR = 声音进来；LISTEN = 注意力出去'],
['know / think','KNOW = 已有信息；THINK = 加工信息'],
['in / on / at','IN = 里面；ON = 表面；AT = 点'],
['in / into / out','IN = 在里面；INTO = 进去；OUT = 出来'],
['from / to / back','FROM = 起点；TO = 终点；BACK = 回原点'],
['and / but / or','AND = 合并；BUT = 转弯；OR = 分叉'],
['so / because','SO = 推结果；BECAUSE = 找原因'],
];
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render()});
function recordFeedback(word,feedback){state.progress=applyFeedback(state.progress,word,feedback,new Date());saveProgress(state.progress);render();}
function openWord(w){if(D.lessons[w]){state.view='lesson';state.word=w;render()}else{alert(`${w} 已进入850母词库；V1完整深度课当前先以Level 1为标准样板。`)}}
function card(w){const x=D.lessons[w],m=D.vocabulary.find(v=>v.word===w);return `<div class="wordCard" onclick="openWord('${w.replaceAll("'","\\'")}')"><div class="word">${w}</div><span class="chip">${m.grade} · ${m.category}</span><div class="mini">${x?x.tagline:m.core_direction}</div></div>`}
function renderToday(){
 title.textContent='今日学习';sub.textContent='每天 5 个词，用核心画面建立英语思维。';
 const p=D.plan[state.day-1], learned=Object.keys(D.lessons).length;
 app.innerHTML=`<div class="stats"><div class="stat"><b>850</b><span>母词库</span></div><div class="stat"><b>80</b><span>S级核心母词</span></div><div class="stat"><b>${learned}</b><span>Level 1完整课</span></div><div class="stat"><b>170</b><span>天 × 5词</span></div></div>
 <div class="panel"><b>Day ${state.day}</b> · 5 words <div style="margin-top:12px" class="grid">${p.words.map(card).join('')}</div></div>
 <div class="panel"><b>学习原则</b><p class="mini">先画面，后中文；一个词抓一个本源；多个用法从同一逻辑长出来；每学一个词都挂回知识树。</p></div>`;
}
function renderPlaceholder(){
 const isReview=state.view==='review';
 title.textContent=isReview?'今日复习':'学习进度';
 sub.textContent=isReview?'复习计划正在准备中。':'学习进度正在准备中。';
 app.innerHTML=`<div class="panel"><b>功能准备中</b><p class="mini">下一步将显示${isReview?'今日待复习词和反馈入口。':'学习天数、掌握度和复习节奏。'}</p></div>`;
}
function renderStorageNotice(){
 if(!state.storageNotice)return;
 const notice=document.createElement('p');
 notice.className='mini';
 notice.setAttribute('role','status');
 notice.textContent=state.storageNotice;
 app.prepend(notice);
 state.storageNotice='';
}
function renderLibrary(){
 title.textContent='850词库';sub.textContent='搜索、筛选、查看每个词在知识树中的位置。';
 const cats=[...new Set(D.vocabulary.map(x=>x.category))];
 app.innerHTML=`<div class="toolbar"><input id="q" placeholder="搜索单词…" value="${state.query}"><select id="g"><option value="all">全部等级</option><option>S</option><option>A</option><option>B</option></select><select id="lv"><option value="all">全部Level</option>${[1,2,3,4,5].map(n=>`<option value="Level ${n}">Level ${n}</option>`).join('')}</select><select id="cat"><option value="all">全部系统</option>${cats.map(c=>`<option>${c}</option>`).join('')}</select></div><div id="list"></div>`;
 document.getElementById('g').value=state.grade;document.getElementById('lv').value=state.level;document.getElementById('cat').value=state.cat;
 ['q','g','lv','cat'].forEach(id=>document.getElementById(id).oninput=e=>{if(id==='q')state.query=e.target.value;if(id==='g')state.grade=e.target.value;if(id==='lv')state.level=e.target.value;if(id==='cat')state.cat=e.target.value;drawList()});drawList();
}
function drawList(){
 let a=libraryWords(D.vocabulary,state.progress,{query:state.query,category:state.cat,grade:state.grade,level:state.level});
 document.getElementById('list').innerHTML=`<div class="table"><div class="row head"><div>ID</div><div>单词</div><div>等级</div><div>阶段</div><div>系统</div></div>${a.slice(0,250).map(x=>`<div class="row"><div>${String(x.id).padStart(3,'0')}</div><div class="w" onclick="openWord('${x.word.replaceAll("'","\\'")}')">${x.word}</div><div>${x.grade}</div><div>${x.level.split('｜')[0]}</div><div>${x.category}</div></div>`).join('')}</div><p class="mini">当前显示 ${Math.min(a.length,250)} / ${a.length} 项。</p>`;
}
function renderTree(){
 title.textContent='知识树';sub.textContent='词不是列表，而是英语世界里的节点。';
 const cats=[...new Set(D.vocabulary.map(x=>x.category))];
 app.innerHTML=`<div class="treeGrid">${cats.map(c=>{const a=D.vocabulary.filter(x=>x.category===c);return `<div class="treeNode"><h3>${c}</h3><p class="mini">${a.length} 词</p><div class="tags">${a.filter(x=>x.grade==='S').slice(0,16).map(x=>`<span class="tag" onclick="openWord('${x.word}')">${x.word}</span>`).join('')}</div></div>`}).join('')}</div>`;
}
function renderCompare(){
 title.textContent='易混对比';sub.textContent='用同一核心画面维度比较，而不是背中文差别。';
 app.innerHTML=`<div class="compareGrid">${comps.map(c=>`<div class="compare"><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('')}</div>`;
}
function renderLesson(){
 const x=D.lessons[state.word];title.textContent=x.word;sub.textContent=`${x.grade}级 · ${x.category} → ${x.subcategory}`;
 app.innerHTML=`<button class="backBtn" onclick="state.view='library';render()">← 返回词库</button><div class="lesson" style="margin-top:14px"><div class="lessonTop"><div><h2>${x.word}</h2><span class="chip">${x.grade} · Lesson ${String(x.lesson_no).padStart(2,'0')}</span></div></div><div class="tagline">${x.tagline}</div><div class="visual">${x.card}</div><div class="two"><div class="block"><h3>核心画面</h3><p>${x.image}</p></div><div class="block"><h3>底层逻辑</h3><p>${x.logic}</p></div></div><div class="block"><h3>高频例句</h3><ul>${x.examples.map(e=>`<li>${e}</li>`).join('')}</ul></div><div class="block"><h3>易混 / 关键对比</h3><p>${x.contrast}</p></div><div class="block"><h3>记忆钩子</h3><p><b>${x.hook}</b></p></div><div class="block"><h3>关联词</h3><div class="tags">${x.related.map(w=>`<span class="tag" onclick="openWord('${w}')">${w}</span>`).join('')}</div></div></div>`;
}
function syncNav(){
 const current=activeNavView(state.view);
 document.querySelectorAll('.nav').forEach(button=>{const active=button.dataset.view===current;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
}
function render(){syncNav();const view=viewKind(state.view);if(view==='today')renderToday();else if(view==='placeholder')renderPlaceholder();else if(view==='library')renderLibrary();else if(view==='tree')renderTree();else if(view==='compare')renderCompare();else renderLesson();renderStorageNotice();}
render();
window.openWord=openWord;window.render=render;window.state=state;window.recordFeedback=recordFeedback;
})();
}
