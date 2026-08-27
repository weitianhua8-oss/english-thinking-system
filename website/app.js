function calendarDate(date) {
 if(typeof date==='string') {
  const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if(match) return new Date(Number(match[1]),Number(match[2])-1,Number(match[3]));
 }
 return date instanceof Date ? new Date(date.getTime()) : new Date(date);
}
function cardFileName(lessonNo, word) {
 if(!Number.isInteger(lessonNo)||lessonNo<1||lessonNo>50) throw new Error('lesson number must be an integer from 1 to 50');
 if(typeof word!=='string'||!/^[a-z0-9]+$/i.test(word)) throw new Error('word must be a nonempty ASCII [a-z0-9] token');
 return `${String(lessonNo).padStart(2,'0')}-${word.toLowerCase()}.png`;
}
function localDate(date) {
 const value=calendarDate(date);
 return `${value.getFullYear()}-${String(value.getMonth()+1).padStart(2,'0')}-${String(value.getDate()).padStart(2,'0')}`;
}
function addDays(date, days) { const value=calendarDate(date); value.setDate(value.getDate()+days); return localDate(value); }
function escapeHtml(value) { return String(value??'').replace(/[&<>'"]/g,char=>({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char])); }
function html(value) { return escapeHtml(value); }
function emptyProgress() { return { words:{}, studyDates:[] }; }
function isPlainObject(value) { return value!==null&&typeof value==='object'&&!Array.isArray(value)&&Object.getPrototypeOf(value)===Object.prototype; }
function isProgressProfile(value) { return isPlainObject(value)&&isPlainObject(value.words)&&Array.isArray(value.studyDates); }
function safeMastery(value) { const number=Number(value); return Number.isInteger(number)&&Number.isFinite(number) ? Math.min(4,Math.max(0,number)) : 0; }
function safeReviewCount(value) { const number=Number(value); return Number.isInteger(number)&&Number.isFinite(number)&&number>=0 ? number : 0; }
function sanitizeWordRecord(record) {
 const safe={...record,history:Array.isArray(record.history)?record.history:[],mastery:safeMastery(record.mastery),reviewCount:safeReviewCount(record.reviewCount)};
 if(typeof record.lastSeen!=='string') delete safe.lastSeen;
 if(typeof record.nextReview!=='string') delete safe.nextReview;
 return safe;
}
function sanitizeProgress(progress) {
 if(!isProgressProfile(progress)) return emptyProgress();
 const words=Object.fromEntries(Object.entries(progress.words).filter(([,record])=>isPlainObject(record)).map(([word,record])=>[word,sanitizeWordRecord(record)]));
 const safe={...progress,words};
 if(isPlainObject(progress.v2)) safe.v2={...progress.v2,culture:cultureProgressFor(progress),camera:cameraProgressFor(progress),world:worldProgressFor(progress),wordImage:wordImageProgressFor(progress),sentence:sentenceProgressFor(progress)};
 else delete safe.v2;
 return safe;
}
function parseStoredProgress(saved) { try { return sanitizeProgress(JSON.parse(saved)); } catch(error) { return emptyProgress(); } }
function cultureProgressFor(progress) {
 const completed=progress?.v2?.culture?.completed;
 return {completed:[...new Set((Array.isArray(completed)?completed:[]).filter(id=>typeof id==='string'&&/^culture-\d{2}$/.test(id)))]};
}
function completeCultureLesson(progress, lessonId) {
 const current=sanitizeProgress(isProgressProfile(progress)?progress:emptyProgress());
 if(typeof lessonId!=='string'||!/^culture-\d{2}$/.test(lessonId)) return current;
 const culture=cultureProgressFor(current);
 if(culture.completed.includes(lessonId)) return current;
 return {...current,v2:{...(isPlainObject(current.v2)?current.v2:{}),culture:{...culture,completed:[...culture.completed,lessonId]}}};
}
function cameraProgressFor(progress) {
 const completed=progress?.v2?.camera?.completed;
 return {completed:[...new Set((Array.isArray(completed)?completed:[]).filter(id=>typeof id==='string'&&/^camera-[a-z0-9-]+$/.test(id)))]};
}
function completeCameraScene(progress, sceneId) {
 const current=isProgressProfile(progress)?progress:emptyProgress();
 if(typeof sceneId!=='string'||!/^camera-[a-z0-9-]+$/.test(sceneId)) return current;
 const camera=cameraProgressFor(current);
 if(camera.completed.includes(sceneId)) return current;
 return {...current,v2:{...(isPlainObject(current.v2)?current.v2:{}),camera:{...camera,completed:[...camera.completed,sceneId]}}};
}
function worldProgressFor(progress) {
 const completed=progress?.v2?.world?.completed;
 return {completed:[...new Set((Array.isArray(completed)?completed:[]).filter(id=>typeof id==='string'&&/^world-[a-z0-9-]+$/.test(id)))]};
}
function completeWorldScene(progress, sceneId) {
 const current=isProgressProfile(progress)?progress:emptyProgress();
 if(typeof sceneId!=='string'||!/^world-[a-z0-9-]+$/.test(sceneId)) return current;
 const world=worldProgressFor(current);
 if(world.completed.includes(sceneId)) return current;
 return {...current,v2:{...(isPlainObject(current.v2)?current.v2:{}),world:{...world,completed:[...world.completed,sceneId]}}};
}
function wordImageProgressFor(progress) {
 const completed=progress?.v2?.wordImage?.completed;
 return {completed:[...new Set((Array.isArray(completed)?completed:[]).filter(id=>typeof id==='string'&&/^word-image-[a-z0-9-]+$/.test(id)))]};
}
function completeWordImageLesson(progress, lessonId) {
 const current=isProgressProfile(progress)?progress:emptyProgress();
 if(typeof lessonId!=='string'||!/^word-image-[a-z0-9-]+$/.test(lessonId)) return current;
 const wordImage=wordImageProgressFor(current);
 if(wordImage.completed.includes(lessonId)) return current;
 return {...current,v2:{...(isPlainObject(current.v2)?current.v2:{}),wordImage:{...wordImage,completed:[...wordImage.completed,lessonId]}}};
}
function sentenceProgressFor(progress) {
 const completed=progress?.v2?.sentence?.completed;
 return {completed:[...new Set((Array.isArray(completed)?completed:[]).filter(id=>typeof id==='string'&&/^sentence-[a-z0-9-]+$/.test(id)))]};
}
function completeSentenceLesson(progress, lessonId) {
 const current=isProgressProfile(progress)?progress:emptyProgress();
 if(typeof lessonId!=='string'||!/^sentence-[a-z0-9-]+$/.test(lessonId)) return current;
 const sentence=sentenceProgressFor(current);
 if(sentence.completed.includes(lessonId)) return current;
 return {...current,v2:{...(isPlainObject(current.v2)?current.v2:{}),sentence:{...sentence,completed:[...sentence.completed,lessonId]}}};
}
function preferredUSVoice(voices) {
 const safe=Array.isArray(voices)?voices.filter(voice=>voice&&typeof voice.lang==='string'):[];
 return safe.find(voice=>voice.lang.toLowerCase()==='en-us')||safe.find(voice=>voice.lang.toLowerCase().startsWith('en-us'))||null;
}
function createWordImageSpeechController(synthesis, Utterance, onState) {
 const notify=typeof onState==='function'?onState:()=>{};
 const supported=Boolean(synthesis&&typeof synthesis.cancel==='function'&&typeof synthesis.speak==='function'&&typeof Utterance==='function');
 let requestId=0;
 function stop() { requestId+=1; if(supported) synthesis.cancel(); notify(false); }
 function play(text, lang, rate=1, playbackMode=null) {
  if(!supported||typeof text!=='string'||!text.trim()||typeof lang!=='string'||!lang.trim()) return false;
  stop();
  const current=++requestId, utterance=new Utterance(text);
  utterance.lang=lang;
  utterance.rate=typeof rate==='number'&&rate>0&&rate<=2?rate:1;
  const voice=preferredUSVoice(typeof synthesis.getVoices==='function'?synthesis.getVoices():[]);
  if(voice) utterance.voice=voice;
  utterance.onstart=()=>{ if(current===requestId) notify(true,playbackMode); };
  utterance.onend=utterance.onerror=()=>{ if(current===requestId) notify(false,playbackMode); };
  try { synthesis.speak(utterance); notify(true,playbackMode); return true; }
  catch(error) { if(current===requestId) notify(false,playbackMode); return false; }
 }
 return {isSupported:()=>supported,play,stop};
}
function applyFeedback(progress, word, feedback, now) {
 if(!['again','unsure','understood'].includes(feedback)) throw new Error(`Unknown feedback: ${feedback}`);
 progress=progress||emptyProgress();
 const current=progress.words?.[word]||{}, today=localDate(now);
 let mastery=current.mastery||0, reviewCount=current.reviewCount||0, interval=7;
 if(feedback==='again') { mastery=1; reviewCount=0; interval=1; }
 else if(feedback==='unsure') { mastery=2; interval=3; }
 else if(mastery>=4) { mastery=4; reviewCount+=1; interval=30; }
 else if(mastery===3) { mastery=4; reviewCount+=1; interval=14; }
 else { mastery=3; reviewCount+=1; }
 const words={...progress.words,[word]:{...current,mastery,reviewCount,lastSeen:new Date(now).toISOString(),nextReview:addDays(now,interval),history:[...(current.history||[]),feedback]}};
 const studyDates=[...(progress.studyDates||[]),today].filter((date,index,all)=>all.indexOf(date)===index).sort();
 return {...progress,words,studyDates};
}
function dueWords(progress, today) { return Object.entries((progress||emptyProgress()).words||{}).filter(([,word])=>word?.nextReview&&word.nextReview<=today).map(([word])=>word); }
function filterWords(words, progress, filters) {
 const query=String(filters?.query||'').trim().toLowerCase(), category=filters?.category||'all', mastery=filters?.mastery||'all', learned=progress?.words||{};
 return (words||[]).filter(item=>(!query||String(item.word||'').toLowerCase().includes(query))&&(category==='all'||item.category===category)&&(mastery==='all'||String(learned[item.word]?.mastery||0)===String(mastery)));
}
function libraryWords(words, progress, filters) {
 const grade=filters?.grade||'all', level=filters?.level||'all';
 return filterWords(words,progress,filters).filter(item=>(grade==='all'||item.grade===grade)&&(level==='all'||item.level?.startsWith(level)));
}
function nextStudyDay(plan, progress) {
 if(!plan||!plan.length) return 1;
 const learned=progress?.words||{}, next=plan.find(day=>day.words?.some(word=>!(learned[word]?.mastery>0)));
 return next ? next.day : plan[plan.length-1].day;
}
function streak(studyDates, today) {
 const dates=new Set(studyDates||[]); let count=0, cursor=today;
 while(dates.has(cursor)) { count+=1; cursor=addDays(cursor,-1); }
 return count;
}
function masteryCounts(progress) {
 const counts={1:0,2:0,3:0,4:0};
 Object.values(progress?.words||{}).forEach(record=>{const level=Number(record?.mastery);if(level>=1&&level<=4) counts[level]+=1;});
 return counts;
}
function dayCompletion(day, progress) {
 const words=day?.words||[], learned=progress?.words||{};
 return { completed:words.filter(word=>(learned[word]?.mastery||0)>=1).length, total:words.length };
}
function todayCards(planDay, lessons, progress) {
 return (planDay?.words||[]).map(word=>{
  const lesson=lessons?.[word]||{};
  return { word, category:lesson.category||'', tagline:lesson.tagline||'', mastery:progress?.words?.[word]?.mastery||0 };
 });
}
function resolveStudyDay(selectedDay, plan, progress) {
 const selected=(plan||[]).find(day=>day.day===Number(selectedDay));
 if(!selected) return nextStudyDay(plan,progress);
 const completion=dayCompletion(selected,progress);
 return completion.total>0&&completion.completed===completion.total ? nextStudyDay(plan,progress) : selected.day;
}
function lessonMeta(lesson) { return { masterId:lesson?.master_id, level:lesson?.level||'' }; }
function groupCategories(vocabulary) {
 const groups=[];
 (vocabulary||[]).forEach(word=>{
  let group=groups.find(item=>item.category===word.category);
  if(!group) { group={category:word.category,words:[]}; groups.push(group); }
  group.words.push(word);
 });
 return groups;
}
function nextLibraryFilters(filters, patch) { return {...filters,...patch}; }
function safeRemoveProgress(removeItem) { try { removeItem(); return true; } catch(error) { return false; } }
function lessonFor(lessons, word) { return isPlainObject(lessons?.[word]) ? lessons[word] : null; }
function isUsableV2Graph(v2Data, graphApi) {
 try {
  const result=graphApi?.validateGraph?.(v2Data);
  return isPlainObject(result)&&Array.isArray(result.errors)&&result.errors.length===0;
 } catch(error) { return false; }
}
function isNetworkReady(v2Data, graphApi) {
 return Boolean(v2Data)&&isPlainObject(graphApi)&&typeof graphApi.validateGraph==='function';
}
function networkNodeFor(v2Data, nodeId) {
 if(!isPlainObject(v2Data)||!Array.isArray(v2Data.nodes)||!Array.isArray(v2Data.systems)||typeof nodeId!=='string'||!nodeId.trim()) return null;
 const systemIds=new Set(v2Data.systems.filter(system=>isPlainObject(system)&&typeof system.id==='string'&&system.id.trim()).map(system=>system.id));
 const node=v2Data.nodes.find(item=>isCompleteV2Node(item)&&item.id===nodeId&&typeof item.systemId==='string'&&systemIds.has(item.systemId));
 return node||null;
}
function relationSelectionKey(relation) {
 if(!isPlainObject(relation)) return null;
 const fields=['type','target','label','explanation'];
 if(!fields.every(field=>typeof relation[field]==='string'&&relation[field].trim())) return null;
 return JSON.stringify(fields.map(field=>relation[field]));
}
function selectedNetworkRelation(v2Data, graphApi, node, selectionKey) {
 if(!isUsableV2Graph(v2Data,graphApi)||typeof graphApi.explorableRelations!=='function'||typeof selectionKey!=='string'||!selectionKey.trim()||!isPlainObject(node)) return null;
 const current=networkNodeFor(v2Data,node.id);
 if(!current) return null;
 try {
  const relations=graphApi.explorableRelations(v2Data,current);
  if(!Array.isArray(relations)) return null;
  const types=['system','growth','combination','contrast'];
  const canonical=current.relations.find(relation=>isPlainObject(relation)&&types.includes(relation.type)&&relationSelectionKey(relation)===selectionKey);
  if(!canonical) return null;
  const targetNode=canonical.type==='system'?null:networkNodeFor(v2Data,canonical.target);
  const targetSystem=canonical.type==='system'&&Array.isArray(v2Data.systems)
   ? v2Data.systems.find(system=>isPlainObject(system)&&system.id===canonical.target&&typeof system.title==='string'&&system.title.trim())||null
   : null;
  const relation=relations.find(candidate=>isPlainObject(candidate)&&relationSelectionKey(candidate)===selectionKey&&(
   targetNode ? isPlainObject(candidate.targetNode)&&candidate.targetNode.id===targetNode.id&&candidate.targetNode.systemId===targetNode.systemId&&candidate.targetNode.word===targetNode.word
    : targetSystem ? isPlainObject(candidate.targetSystem)&&candidate.targetSystem.id===targetSystem.id&&candidate.targetSystem.title===targetSystem.title
    : false
  ));
  return relation ? {...canonical,targetNode,targetSystem} : null;
 } catch(error) { return null; }
}
function selectNetworkNode(state, v2Data, targetId) {
 const current=isPlainObject(state)?state:{};
 const unchanged={networkSystem:current.networkSystem,networkNode:current.networkNode,explorePath:Array.isArray(current.explorePath)?[...current.explorePath]:[],networkRelation:null};
 const target=networkNodeFor(v2Data,targetId);
 if(!target) return unchanged;
 const selected=networkNodeFor(v2Data,current.networkNode);
 const path=selected&&selected.id!==target.id&&unchanged.explorePath[unchanged.explorePath.length-1]!==selected.id
  ? [...unchanged.explorePath,selected.id]
  : unchanged.explorePath;
 return {networkSystem:target.systemId,networkNode:target.id,explorePath:path,networkRelation:null};
}
function selectNetworkDirect(state, v2Data, targetId) {
 const current=isPlainObject(state)?state:{};
 const target=networkNodeFor(v2Data,targetId);
 if(!target) return {networkSystem:current.networkSystem,networkNode:current.networkNode,explorePath:Array.isArray(current.explorePath)?[...current.explorePath]:[],networkRelation:null};
 return {networkSystem:target.systemId,networkNode:target.id,explorePath:[],networkRelation:null};
}
function selectNetworkBack(state, v2Data, graphApi) {
 const current=isPlainObject(state)?state:{};
 const path=Array.isArray(current.explorePath)?current.explorePath:[];
 if(!path.length||!isPlainObject(graphApi)||typeof graphApi.popExplorePath!=='function') return {networkSystem:current.networkSystem,networkNode:current.networkNode,explorePath:[...path],networkRelation:null};
 const targetId=path[path.length-1], target=networkNodeFor(v2Data,targetId);
 if(!target) return {networkSystem:current.networkSystem,networkNode:current.networkNode,explorePath:[...path],networkRelation:null};
 return {networkSystem:target.systemId,networkNode:target.id,explorePath:graphApi.popExplorePath(path),networkRelation:null};
}
function networkStateFor(v2Data, state) {
 const systems=Array.isArray(v2Data?.systems)?v2Data.systems.filter(system=>isPlainObject(system)&&typeof system.id==='string'&&system.id.trim()&&typeof system.title==='string'&&system.title.trim()):[];
 const systemIds=new Set(systems.map(system=>system.id));
 const requested=isPlainObject(state)?state:{};
 const systemId=systemIds.has(requested.networkSystem)?requested.networkSystem:systems[0]?.id;
 const systemNodes=Array.isArray(v2Data?.nodes)?v2Data.nodes.filter(node=>isPlainObject(node)&&node.systemId===systemId&&typeof node.id==='string'&&node.id.trim()):[];
 const current=networkNodeFor(v2Data,requested.networkNode);
 const node=current||systemNodes[0]||null;
 return {systems,systemId:node?.systemId||systemId,node,path:Array.isArray(requested.explorePath)?requested.explorePath.filter(id=>networkNodeFor(v2Data,id)):[]};
}
function selectNetworkSystem(state, v2Data, systemId, preservePath) {
 const current=isPlainObject(state)?state:{};
 const unchanged={networkSystem:current.networkSystem,networkNode:current.networkNode,explorePath:Array.isArray(current.explorePath)?[...current.explorePath]:[],networkRelation:null};
 const next=networkStateFor(v2Data,{networkSystem:systemId,networkNode:null,explorePath:[]});
 if(!next.node||next.systemId!==systemId) return unchanged;
 const selected=networkNodeFor(v2Data,current.networkNode);
 const path=preservePath&&selected&&unchanged.explorePath[unchanged.explorePath.length-1]!==selected.id
  ? [...unchanged.explorePath,selected.id]
  : preservePath?unchanged.explorePath:[];
 return {networkSystem:next.systemId,networkNode:next.node.id,explorePath:path,networkRelation:null};
}
function networkStepForAction(step, action) {
 const current=['systems','nodes','detail'].includes(step)?step:'systems';
 if(action==='nav-network') return 'systems';
 if(action==='lesson-network'||action==='select-network-node'||action==='select-network-relation'||action==='network-back') return 'detail';
 if(action==='select-network-system') return 'nodes';
 if(action==='network-mobile-systems') return 'systems';
 if(action==='network-mobile-nodes') return 'nodes';
 return current;
}
function lessonLayerForAction(layer, action) {
 const current=['quick','deep','network'].includes(layer)?layer:'quick';
 if(action==='lesson-layer-quick') return 'quick';
 if(action==='lesson-layer-deep') return 'deep';
 if(action==='lesson-layer-network') return 'network';
 return current;
}
function renderLessonMiniNetwork(v2Data, graphApi, node) {
 const empty='<section class="block knowledgeConnection"><h3>Layer 3 · 知识网络</h3><p class="mini">该关联内容暂未开放。</p></section>';
 if(!isUsableV2Graph(v2Data,graphApi)||typeof graphApi?.explorableRelations!=='function'||typeof node?.id!=='string') return empty;
 const current=networkNodeFor(v2Data,node.id);
 if(!current) return empty;
 const relationTypes={system:'所属系统',growth:'延展关系',combination:'组合关系',contrast:'对比关系'};
 let sourceRelations;
 try { sourceRelations=graphApi.explorableRelations(v2Data,current); } catch(error) { return empty; }
 if(!Array.isArray(sourceRelations)) return empty;
 const relations=sourceRelations.filter(relation=>relationTypes[relation?.type]);
 const relationMarkup=Object.entries(relationTypes).map(([type,title])=>{
  const group=relations.filter(relation=>relation.type===type);
  if(!group.length) return '';
  return `<section class="block networkRelation${type==='contrast'?' contrastBlock':''}"><h4>${html(title)}</h4>${group.map(relation=>{
   const target=relation.targetNode||relation.targetSystem;
   const targetId=relation.targetNode?.id||current.id;
   const targetLabel=relation.targetNode?.word||relation.targetSystem?.title||relation.target;
   return `<div class="mini networkRelationItem"><b>${html(relation.label)}</b><p>${html(relation.explanation)}</p><button type="button" class="tag" data-action="view" data-view="network" data-node-id="${html(targetId)}">查看 ${html(targetLabel)}</button></div>`;
  }).join('')}</section>`;
 }).join('');
 return `<section class="block knowledgeConnection"><h3>Layer 3 · 知识网络</h3><h4>${html(current.word)}</h4><p class="coreMeaning"><b>核心意义：${html(current.coreMeaning)}</b></p><p>所属系统：${html(v2SystemTitleFor(v2Data,current.systemId))}</p><p><button type="button" class="tag" data-action="view" data-view="network" data-node-id="${html(current.id)}">进入知识网络</button></p>${relationMarkup||'<p class="mini">该关联内容暂未开放。</p>'}</section>`;
}
function renderV2LessonWorkspace(v2Data, graphApi, node, layer) {
 const current=isCompleteV2Node(node)?node:null;
 if(!current) return '<div class="emptyState"><div><b>课程暂不可用</b><p class="mini">请返回词库选择其他词条。</p></div></div>';
 const selected=lessonLayerForAction(layer,'');
 const quick=current.quick, deep=current.deep;
 const sceneMarkup=sceneGroupsFor(deep.scenes).map(scene=>`<section class="sceneGroup"><h4>${html(scene.title)}</h4><p>${html(scene.body)}</p><p class="exampleGroup">${html(scene.example)}</p></section>`).join('')||'<p class="mini">暂未提供可用学习场景。</p>';
 const tabLabel={quick:'快速理解',deep:'深度学习',network:'知识网络'};
 const tabs=['quick','deep','network'].map(item=>`<button type="button" class="workspaceTab" data-action="lesson-layer-${item}"${item===selected?' aria-pressed="true"':''}>${html(tabLabel[item])}</button>`).join('');
 return `<article class="learningWorkspace" data-learning-layer="${html(selected)}"><header class="workspaceHero"><p class="workspaceEyebrow">英语思维 · 三层学习</p><div class="workspaceTitle"><h2>${html(current.word)}</h2><span class="chip">${html(v2SystemTitleFor(v2Data,current.systemId))}</span></div><div class="coreImage"><h3>核心画面</h3><p>${html(current.coreImage)}</p></div><p class="coreMeaning"><b>${html(current.coreMeaning)}</b></p></header><nav class="workspaceTabs" aria-label="课程学习层级">${tabs}</nav><section class="workspaceLayer quickLayer${selected==='quick'?' active':''}"><h3>Layer 1 · 快速理解</h3><section class="coreMeaning"><h4>一句话本源</h4><p>${html(quick.origin)}</p></section><section class="exampleGroup"><h4>典型例句</h4><p>${html(quick.example)}</p></section><section class="memoryHook"><h4>记忆钩子</h4><p><b>${html(quick.memoryHook)}</b></p></section></section><section class="workspaceLayer deepLayer${selected==='deep'?' active':''}"><h3>Layer 2 · 深度学习</h3><section class="mentalModel"><h4>底层逻辑</h4><p>${html(deep.logic)}</p></section><section class="sceneGroups"><h4>核心使用场景</h4>${sceneMarkup}</section><section class="structureBlock"><h4>高频结构</h4><p>${html(deep.structures)}</p></section><section class="chineseTrap"><h4>中文易错点</h4><p>${html(deep.chineseTrap)}</p></section><section class="studyTip"><h4>学习建议</h4><p>${html(deep.studyTip)}</p></section></section><section class="workspaceLayer networkLayer${selected==='network'?' active':''}"><div class="miniNetwork">${renderLessonMiniNetwork(v2Data,graphApi,current)}</div></section></article>`;
}
function returnTopButton() { return '<p class="returnTop"><button type="button" class="backBtn" data-action="return-top" aria-label="返回顶部">↑ 返回顶部</button></p>'; }
function renderNetworkContent(v2Data, graphApi, state) {
 if(!isUsableV2Graph(v2Data,graphApi)||!isNetworkReady(v2Data,graphApi)||typeof graphApi.nodesForSystem!=='function'||typeof graphApi.explorableRelations!=='function') return '<div class="emptyState"><div><b>知识网络暂不可用</b><p class="mini">请继续使用知识树查看课程。</p></div></div>';
 const current=networkStateFor(v2Data,state);
 if(!current.node||!current.systemId) return '<div class="emptyState"><div><b>知识网络暂不可用</b><p class="mini">暂时无法读取可探索的词条。</p></div></div>';
 const relationTypes={system:'所属系统',growth:'直接生长',combination:'组合关系',contrast:'易混对比'};
 const systems=current.systems.map(system=>`<button type="button" class="tag networkSystem" data-action="select-network-system" data-system-id="${html(system.id)}"${system.id===current.systemId?' aria-pressed="true"':''}>${html(system.title)}</button>`).join('');
 let systemNodes=[];
 try {
  const sourceNodes=graphApi.nodesForSystem(v2Data,current.systemId);
  if(Array.isArray(sourceNodes)) systemNodes=sourceNodes.reduce((result,node)=>{
   const canonical=networkNodeFor(v2Data,node?.id);
   if(canonical&&canonical.systemId===current.systemId&&!result.some(item=>item.id===canonical.id)) result.push(canonical);
   return result;
  },[]);
 } catch(error) { systemNodes=[]; }
 const nodes=systemNodes.map(node=>`<button type="button" class="wordCard networkNode" data-action="select-network-node" data-node-id="${html(node.id)}"${node.id===current.node.id?' aria-pressed="true"':''}><div class="word">${html(node.word)}</div><div class="mini">${html(node.coreMeaning)}</div></button>`).join('');
 let explorable=[];
 try {
  const sourceRelations=graphApi.explorableRelations(v2Data,current.node);
  if(Array.isArray(sourceRelations)) {
   explorable=sourceRelations.reduce((result,relation)=>{
    if(!relationTypes[relation?.type]||typeof relation.target!=='string') return result;
    const selectionKey=relationSelectionKey(relation);
    const verified=selectedNetworkRelation(v2Data,graphApi,current.node,selectionKey);
    if(!verified||result.some(item=>relationSelectionKey(item)===selectionKey)) return result;
    result.push(verified); return result;
   },[]);
  }
 } catch(error) { explorable=[]; }
 const selected=selectedNetworkRelation(v2Data,graphApi,current.node,state?.networkRelation);
 const root=`<div class="mindMapRootGroup"><button type="button" class="mindMapRoot" data-action="open-word" data-word="${html(current.node.id)}"><strong>${html(current.node.word)}</strong><span>${html(current.node.coreMeaning)}</span></button><p class="mindMapOrigin">${html(current.node.quick.origin)}</p></div>`;
 const branches=explorable.map(relation=>{
  const target=relation.targetNode||relation.targetSystem;
  const targetWord=relation.targetNode?.word||relation.targetSystem?.title||relation.target;
  const targetMeaning=relation.targetNode?.coreMeaning||relation.targetSystem?.description||'';
  const selectionKey=relationSelectionKey(relation);
  return `<button type="button" class="mindBranch mindBranch-${html(relation.type)}" data-action="select-network-relation" data-relation-key="${html(selectionKey)}"${selectionKey===state?.networkRelation?' aria-pressed="true"':''}><span class="relationBadge relation-${html(relation.type)}">${html(relationTypes[relation.type])}</span><strong>${html(relation.label)}</strong><span>${html(targetWord)}</span>${targetMeaning?`<small>${html(targetMeaning)}</small>`:''}</button>`;
 }).join('');
 const mindMap=`<div class="mindMapCanvas">${root}<div class="mindBranches">${branches||'<p class="mini">该关联内容暂未开放。</p>'}</div></div>`;
 const mobileRelationList=`<section class="networkMobileRelationList"><h4>选择要理解的关系</h4><div class="mindBranches">${branches||'<p class="mini">该关联内容暂未开放。</p>'}</div></section>`;
 const relationPanel=selected?(()=>{
  const target=selected.targetNode||selected.targetSystem;
  const targetWord=selected.targetNode?.word||selected.targetSystem?.title||selected.target;
  const targetMeaning=selected.targetNode?.coreMeaning||selected.targetSystem?.description||'';
  const exploreButton=selected.targetNode
   ? `<button type="button" class="primaryAction" data-action="select-network-node" data-node-id="${html(selected.target)}">继续探索 ${html(targetWord)}</button>`
   : `<button type="button" class="primaryAction" data-action="select-network-system" data-system-id="${html(selected.target)}" data-preserve-path="true">继续探索 ${html(targetWord)}</button>`;
  return `<section class="networkRelationPanel"><div class="networkPanelTitle"><span>03</span><div><p>关系解释</p><h3>${html(selected.label)}</h3></div></div><div class="relationExplanation"><span class="relationBadge relation-${html(selected.type)}">${html(relationTypes[selected.type])}</span><p>${html(selected.explanation)}</p><h4>${html(targetWord)}</h4>${targetMeaning?`<p class="coreMeaning">${html(targetMeaning)}</p>`:''}<p>${exploreButton}</p></div></section>`;
 })():`<section class="networkRelationPanel"><div class="networkPanelTitle"><span>03</span><div><p>当前词理解</p><h3>${html(current.node.word)} <em>→ ${html(current.node.coreMeaning)}</em></h3></div></div><div class="relationExplanation"><h4>核心本源</h4><p>${html(current.node.quick.origin)}</p><p><button type="button" class="primaryAction" data-action="open-word" data-word="${html(current.node.id)}">打开三层课程</button></p></div></section>`;
 const step=['systems','nodes','detail'].includes(state?.networkStep)?state.networkStep:'systems';
 const back=current.path.length?'<p><button type="button" class="backBtn" data-action="network-back">← 返回上一步</button></p>':'';
 return `<section class="learningWorkspace networkMapWorkspace"><header class="networkMapHero"><p class="workspaceEyebrow">英语思维 · 知识网络</p><h2>从系统出发，沿关系继续探索</h2><p>当前坐标：${html(v2SystemTitleFor(v2Data,current.systemId))} · ${html(current.node.word)} → ${html(current.node.coreMeaning)}</p></header><div class="networkLayout" data-network-step="${html(step)}"><section class="panel networkMapPanel networkSystems"><div class="networkPanelTitle"><span>01</span><div><p>认知系统</p><h3>选择你要理解的系统</h3></div></div><div class="tags">${systems}</div></section><section class="panel networkMapPanel networkNodes"><p class="networkMobileNav"><button type="button" class="backBtn" data-action="network-mobile-systems">← 选择系统</button></p><div class="networkPanelTitle"><span>02</span><div><p>${html(v2SystemTitleFor(v2Data,current.systemId))}</p><h3>当前词与真实关系</h3></div></div>${mindMap}<section class="mindMapSystemNodes"><h4>系统里的其他知识</h4><div class="grid contentGrid">${nodes||'<p class="mini">该系统暂未提供词条。</p>'}</div></section></section><section class="panel networkMapPanel networkExplain"><p class="networkMobileNav"><button type="button" class="backBtn" data-action="network-mobile-nodes">← 选择词条</button></p>${back}${relationPanel}${mobileRelationList}</section></div>${returnTopButton()}</section>`;
}
function isCompleteV2Node(node) {
 return isPlainObject(node)
  && ['id','word','systemId','coreMeaning','coreImage'].every(field=>typeof node[field]==='string'&&node[field].trim())
  && isPlainObject(node.quick)&&['origin','example','memoryHook'].every(field=>typeof node.quick[field]==='string'&&node.quick[field].trim())
  && isPlainObject(node.deep)&&['logic','structures','chineseTrap','studyTip'].every(field=>typeof node.deep[field]==='string'&&node.deep[field].trim())
  && sceneGroupsFor(node.deep.scenes).length>0;
}
function v2LessonFor(v2Data, word) {
 try {
  if(!isPlainObject(v2Data)||!Array.isArray(v2Data.nodes)||typeof word!=='string') return null;
  const node=v2Data.nodes.find(item=>isPlainObject(item)&&item.id===word);
  return isCompleteV2Node(node) ? node : null;
 } catch(error) { return null; }
}
function v2SystemTitleFor(v2Data, systemId) {
 const system=Array.isArray(v2Data?.systems)?v2Data.systems.find(item=>isPlainObject(item)&&item.id===systemId&&typeof item.title==='string'):null;
 return system?.title||'暂未标注';
}
function feedbackButtonsFor(word) { return `<div class="feedbackActions"><button type="button" class="tag" data-action="feedback" data-word="${html(word)}" data-feedback="again">再来一次</button><button type="button" class="tag" data-action="feedback" data-word="${html(word)}" data-feedback="unsure">不太确定</button><button type="button" class="tag" data-action="feedback" data-word="${html(word)}" data-feedback="understood">理解了</button></div>`; }
function reviewContentFor(words, lessons, v2Data, vocabularyByWord, revealed) {
 return (words||[]).map(word=>{
  const v1=lessonFor(lessons,word), v2=v2LessonFor(v2Data,word), item=vocabularyByWord?.[word]||{}, isRevealed=Boolean(revealed?.[word]);
  if(v2) {
   const quick=v2.quick, deep=v2.deep;
   return `<div class="wordCard reviewCard"><div class="word">${html(word)}</div><span class="chip">${html(v2SystemTitleFor(v2Data,v2.systemId))}</span><div class="mini">${html(v2.coreImage)}</div>${isRevealed?`<div class="reviewAnswer"><div class="mini">${html(quick.origin)}</div><div class="mini">${html(quick.example)}</div><div class="mini">${html(deep.chineseTrap)}</div>${feedbackButtonsFor(word)}</div>`:`<p><button type="button" class="backBtn" data-action="reveal" data-word="${html(word)}">显示提示</button></p>`}</div>`;
  }
  return `<div class="wordCard reviewCard"><div class="word">${html(word)}</div><span class="chip">${html(item.category||'')}</span><div class="mini">${html(v1?.card||item.core_direction||'')}</div>${isRevealed&&v1?`<div class="reviewAnswer"><div class="mini">${html(v1.tagline)}</div><div class="mini">${html(v1.examples?.[0]||'')}</div><div class="mini">${html(v1.contrast)}</div>${feedbackButtonsFor(word)}</div>`:`<p><button type="button" class="backBtn" data-action="reveal" data-word="${html(word)}">显示提示</button></p>`}</div>`;
 }).join('');
}
function sceneGroupsFor(scenes) {
 if(!Array.isArray(scenes)) return [];
 return scenes.filter(scene=>isPlainObject(scene)&&['title','body','example'].every(field=>typeof scene[field]==='string'&&scene[field].trim()));
}
function safePlanDay(plan, selectedDay) { return Array.isArray(plan) ? plan.find(day=>day.day===Number(selectedDay))||null : null; }
function learningRouteStages(data) {
 const allowedViews=new Set(['today','library','culture','camera','world','word-image','sentence']);
 if(!isPlainObject(data)||!Array.isArray(data.stages)) return [];
 const stages=data.stages.filter(stage=>isPlainObject(stage)&&typeof stage.id==='string'&&typeof stage.order==='number'&&typeof stage.code==='string'&&typeof stage.title==='string'&&typeof stage.subtitle==='string'&&typeof stage.summary==='string'&&['available','planned'].includes(stage.status)&&(stage.status==='available'?allowedViews.has(stage.view):stage.view===null));
 return [...stages].sort((left,right)=>left.order-right.order);
}
function renderLearningRoute(data) {
 const stages=learningRouteStages(data);
 if(!stages.length) return '<div class="emptyState"><div><b>学习路线暂不可用</b><p class="mini">请继续使用今日学习和词库入口。</p></div></div>';
 const stageMarkup=stages.map(stage=>`<article class="routeStage routeStage-${html(stage.status)}"><div class="routeStageIndex">${html(stage.code)}</div><div class="routeStageContent"><p class="routeStageEnglish">${html(stage.title)}</p><h3>${html(stage.subtitle)}</h3><p>${html(stage.summary)}</p>${stage.status==='available'?`<button type="button" class="routeOpen" data-action="view" data-view="${html(stage.view)}">${stage.id==='world'?'开始 World 观察':stage.id==='culture'?'开始 Culture 课程':stage.id==='camera'?'开始 Camera 训练':stage.id==='word-image'?'开始 Word Image':stage.id==='sentence'?'开始 Sentence':'查看已开放词条'} →</button>`:'<span class="routePlanned" aria-label="该模块准备中">准备中</span>'}</div></article>`).join('');
 const support=Array.isArray(data.supportLinks)?data.supportLinks.filter(link=>isPlainObject(link)&&typeof link.id==='string'&&typeof link.title==='string'&&typeof link.summary==='string'&&link.view==='network').map(link=>`<button type="button" class="routeSupport" data-action="view" data-view="network"><b>${html(link.title)}</b><span>${html(link.summary)}</span><em>打开 →</em></button>`).join(''):'';
 return `<section class="learningRoute" aria-label="V2 学习路线"><header class="routeHero"><p class="workspaceEyebrow">English Thinking System · V2</p><h2>从 Start 到自由表达</h2><p>先看英语怎样组织画面，再用词汇、句子和场景逐步建立表达。当前已开放的入口可以直接使用；其余模块会在内容完成后按顺序开放。</p></header><section class="routeJourney" aria-label="学习阶段">${stageMarkup}</section>${support?`<section class="routeSupportSection"><h3>现在可补充探索</h3>${support}</section>`:''}</section>`;
}
function cultureLessonsFor(data) {
 const fields=['id','title','question','scene','chineseExample','englishExample','explanation','takeaway','boundary','nextHint'];
 if(!isPlainObject(data)||!Array.isArray(data.cultureLessons)) return [];
 const lessons=data.cultureLessons.filter(lesson=>isPlainObject(lesson)&&Number.isInteger(lesson.order)&&fields.every(field=>typeof lesson[field]==='string'&&lesson[field].trim()));
 const ids=new Set();
 return lessons.filter(lesson=>/^culture-\d{2}$/.test(lesson.id)&&!ids.has(lesson.id)&&ids.add(lesson.id)).sort((left,right)=>left.order-right.order);
}
function cultureLessonFor(data, lessonId) { return cultureLessonsFor(data).find(lesson=>lesson.id===lessonId)||null; }
function isCameraChoice(choice) { return isPlainObject(choice)&&typeof choice.id==='string'&&choice.id.trim()&&typeof choice.label==='string'&&choice.label.trim()&&typeof choice.recommended==='boolean'&&typeof choice.feedback==='string'&&choice.feedback.trim(); }
function cameraScenesFor(data) {
 const fields=['id','title','scene','focusQuestion','actionQuestion','relationQuestion','recommendedSentence'];
 if(!isPlainObject(data)||!Array.isArray(data.cameraScenes)) return [];
 const ids=new Set();
 return data.cameraScenes.filter(scene=>isPlainObject(scene)&&Number.isInteger(scene.order)&&fields.every(field=>typeof scene[field]==='string'&&scene[field].trim())
  && /^camera-[a-z0-9-]+$/.test(scene.id)&&!ids.has(scene.id)&&ids.add(scene.id)
  && ['focusChoices','actionChoices','relationChoices'].every(field=>Array.isArray(scene[field])&&scene[field].length>0&&scene[field].every(isCameraChoice)&&scene[field].filter(choice=>choice.recommended).length===1)
  && Array.isArray(scene.expansionSteps)&&scene.expansionSteps.length>0&&scene.expansionSteps.every(step=>isPlainObject(step)&&typeof step.id==='string'&&typeof step.title==='string'&&typeof step.question==='string'&&Array.isArray(step.choices)&&step.choices.length>0&&step.choices.every(isCameraChoice)&&step.choices.filter(choice=>choice.recommended).length===1)
  && isPlainObject(scene.visual)&&['alt','caption','asset'].every(field=>typeof scene.visual[field]==='string'&&scene.visual[field].trim())
  && isPlainObject(scene.visual.focusRegions)&&['boy','book','library','action','relation','background'].every(key=>{
   const region=scene.visual.focusRegions[key]; return isPlainObject(region)&&['x','y','width','height'].every(field=>Number.isFinite(region[field])&&region[field]>=0);
  })
  && isPlainObject(scene.feedback)&&typeof scene.feedback.alternateFocus==='string'&&isPlainObject(scene.nextLink)&&typeof scene.nextLink.text==='string')
  .sort((left,right)=>left.order-right.order);
}
function cameraSceneFor(data, sceneId) { return cameraScenesFor(data).find(scene=>scene.id===sceneId)||null; }
function cameraStepsFor(scene) {
 if(!cameraScenesFor({cameraScenes:[scene]}).length) return [];
 return [
  {id:'focus',title:'先拍谁',question:scene.focusQuestion,choices:scene.focusChoices},
  {id:'action',title:'他在发生什么',question:scene.actionQuestion,choices:scene.actionChoices},
  {id:'relation',title:'动作和什么有关',question:scene.relationQuestion,choices:scene.relationChoices},
  ...scene.expansionSteps.map(step=>({id:step.id,title:step.title,question:step.question,choices:step.choices})),
 ];
}
function cameraChoiceFor(scene, stepIndex, choiceId) {
 const step=cameraStepsFor(scene)[Number(stepIndex)];
 return step?.choices.find(choice=>choice.id===choiceId)||null;
}
function cameraStepForAction(scene, stepIndex, choiceId) {
 const steps=cameraStepsFor(scene), index=Number(stepIndex), choice=cameraChoiceFor(scene,index,choiceId);
 return Number.isInteger(index)&&index>=0&&index<steps.length&&choice?.recommended ? Math.min(index+1,steps.length) : Math.max(0,Math.min(Number.isInteger(index)?index:0,Math.max(steps.length-1,0)));
}
function cameraVisualStateFor(scene, stepIndex, choiceId) {
 const step=cameraStepsFor(scene)[Number(stepIndex)]?.id;
 if(step==='focus') return ['focus-boy','focus-book','focus-library'].includes(choiceId)?choiceId:'whole';
 if(step==='action') return 'action';
 if(step==='relation') return 'relation';
 if(step) return 'background';
 return 'whole';
}
function cameraRegionMarkup(region, className, extra='') { return `<rect class="${className}" x="${region.x}" y="${region.y}" width="${region.width}" height="${region.height}" rx="3" ${extra}/>`; }
function renderCameraFocusOverlay(scene, state) {
 if(state==='whole') return '';
 const regions=scene.visual.focusRegions, key=state.startsWith('focus-')?state.slice(6):state, region=regions[key]||regions.boy;
 const maskId=`camera-focus-mask-${scene.id.replace(/[^a-z0-9-]/gi,'')}-${state}`;
 const focusMask=key==='library'
  ? '<path fill="#000" d="M0 0H100V17H48V13H16V52H0ZM76 17H100V52H76Z"/>'
  : cameraRegionMarkup(region,'cameraVisualMaskHole','fill="#000"');
 const focus=cameraRegionMarkup(region,`cameraVisualFocus cameraVisualFocus-${key}`);
 const action=state==='action'?'<g class="cameraVisualActionCue"><path d="M31 35c4-4 8-4 11 0"/><path d="M39 31l4 4-5 2"/></g>':'';
 const relation=state==='relation'?'<g class="cameraVisualRelationCue"><path d="M38 37C47 34 55 37 62 40"/><circle cx="38" cy="37" r="1.2"/><circle cx="62" cy="40" r="1.2"/></g>':'';
 const background=state==='background'?cameraRegionMarkup(regions.background,'cameraVisualBackgroundCue'):'';
 return `<svg class="cameraFocusOverlay" viewBox="0 0 100 56.25" preserveAspectRatio="none" aria-hidden="true"><defs><mask id="${maskId}"><rect width="100" height="56.25" fill="#fff"/>${focusMask}</mask></defs><rect class="cameraVisualDim" width="100" height="56.25" mask="url(#${maskId})"/>${focus}${action}${relation}${background}</svg>`;
}
function renderCameraSceneVisual(scene, stepIndex, choiceId) {
 const state=cameraVisualStateFor(scene,stepIndex,choiceId);
 return `<section class="cameraScene cameraSceneVisual is-${html(state)}" aria-label="${html(scene.visual.alt)}"><div class="cameraSceneImageFrame"><img class="cameraSceneImage" src="${html(scene.visual.asset)}" width="1672" height="941" alt="${html(scene.visual.alt)}"/>${renderCameraFocusOverlay(scene,state)}</div><p>${html(scene.visual.caption)}</p></section>`;
}
function renderCultureWorkspace(data, selectedId, progress) {
 const lessons=cultureLessonsFor(data);
 if(!lessons.length) return '<div class="emptyState"><div><b>Culture 课程暂不可用</b><p class="mini">请返回学习路线，稍后再试。</p></div></div>';
 const index=Math.max(0,lessons.findIndex(lesson=>lesson.id===selectedId));
 const lesson=lessons[index], completed=cultureProgressFor(progress).completed, isCompleted=completed.includes(lesson.id), allCompleted=lessons.every(item=>completed.includes(item.id));
 const lessonNav=lessons.map(item=>`<button type="button" class="tag cultureLessonNav${item.id===lesson.id?' active':''}" data-action="select-culture-lesson" data-culture-lesson="${html(item.id)}" aria-current="${item.id===lesson.id?'step':'false'}">${html(String(item.order))}</button>`).join('');
 const previous=lessons[index-1], next=lessons[index+1];
 return `<section class="cultureWorkspace" aria-label="Culture 课程"><button type="button" class="backBtn" data-action="view" data-view="roadmap">← 返回学习路线</button><div class="cultureProgress"><span>Culture</span><b>${index+1} / ${lessons.length}</b></div><nav class="cultureLessonNavs" aria-label="Culture 课程导航">${lessonNav}</nav><article class="cultureLesson"><p class="workspaceEyebrow">Culture · Lesson ${html(String(lesson.order))}</p><h2>${html(lesson.title)}</h2><section class="cultureBlock cultureQuestion"><h3>问题</h3><p>${html(lesson.question)}</p></section><section class="cultureBlock"><h3>现实画面</h3><p>${html(lesson.scene)}</p></section><section class="cultureExamples" aria-label="中文与英语的组织示例"><div><h3>中文怎么说</h3><p>${html(lesson.chineseExample)}</p></div><div><h3>英语怎么组织</h3><p>${html(lesson.englishExample)}</p></div></section><section class="cultureBlock"><h3>我真正要理解什么</h3><p>${html(lesson.explanation)}</p><p class="cultureTakeaway">${html(lesson.takeaway)}</p></section><section class="cultureBoundary"><h3>边界提醒</h3><p>${html(lesson.boundary)}</p></section><p class="cultureNextHint">${html(lesson.nextHint)}</p><div class="cultureActions">${previous?`<button type="button" class="backBtn" data-action="select-culture-lesson" data-culture-lesson="${html(previous.id)}">← 上一节</button>`:'<span></span>'}${isCompleted?'<span class="cultureCompleted" role="status">本节已完成</span>':`<button type="button" class="primaryAction" data-action="complete-culture-lesson">完成当前节</button>`}${next?`<button type="button" class="backBtn" data-action="select-culture-lesson" data-culture-lesson="${html(next.id)}">下一节 →</button>`:'<span></span>'}</div>${allCompleted?'<section class="cultureCameraHint" role="status"><b>Culture 已完成</b><p>下一站是 Camera：英语通常先把镜头对准哪里？Camera 当前准备中。</p></section>':''}</article>${returnTopButton()}</section>`;
}
function renderCameraWorkspace(data, selectedId, stepIndex, choiceId, progress) {
 const scene=cameraSceneFor(data,selectedId);
 if(!scene) return '<div class="emptyState"><div><b>Camera 训练暂不可用</b><p class="mini">请返回学习路线，稍后再试。</p></div></div>';
 const steps=cameraStepsFor(scene), index=Math.max(0,Math.min(Number(stepIndex)||0,steps.length-1)), step=steps[index], choice=cameraChoiceFor(scene,index,choiceId), complete=cameraProgressFor(progress).completed.includes(scene.id);
 const choiceMarkup=step.choices.map(item=>`<button type="button" class="cameraChoice${item.id===choice?.id?' selected':''}" data-action="select-camera-choice" data-camera-choice="${html(item.id)}" aria-pressed="${item.id===choice?.id?'true':'false'}">${html(item.label)}</button>`).join('');
 const feedback=choice?`<section class="cameraFeedback${choice.recommended?' recommended':' alternate'}" role="status"><h3>这一步让画面多了什么？</h3><p>${html(choice.feedback)}</p></section>`:'';
 const partials=['The boy.','The boy is doing…','The boy is doing homework.',scene.recommendedSentence];
 const build=choice?.recommended?`<section class="cameraBuild"><h3>画面正在长成英语</h3><p>${html(partials[index]||scene.recommendedSentence)}</p></section>`:'';
 const actions=complete
  ? `<div class="cameraActions"><button type="button" class="backBtn" data-action="restart-camera-scene">重新练习</button></div><section class="cameraNextHint" role="status"><b>Camera 已完成</b><p>${html(scene.nextLink.text)}</p></section>`
  : `<div class="cameraActions">${index>0?'<button type="button" class="backBtn" data-action="previous-camera-step">← 上一步</button>':'<span></span>'}${choice?.recommended&&index<steps.length-1?'<button type="button" class="primaryAction" data-action="next-camera-step">下一步 →</button>':''}${choice?.recommended&&index===steps.length-1?'<button type="button" class="primaryAction" data-action="complete-camera-scene">完成本次 Camera 训练</button>':''}</div>`;
 return `<section class="cameraWorkspace" aria-label="Camera 镜头思维训练"><button type="button" class="backBtn" data-action="view" data-view="roadmap">← 返回学习路线</button><div class="cameraProgress"><span>Camera</span><b>步骤 ${index+1} / ${steps.length}</b></div><article class="cameraLesson"><p class="workspaceEyebrow">Camera · 单场景样板</p><h2>${html(scene.title)}</h2>${renderCameraSceneVisual(scene,index,choice?.id)}<section class="cameraScene cameraSceneText"><h3>现实画面</h3><p>${html(scene.scene)}</p></section><section class="cameraQuestion"><p class="cameraStepTitle">${html(step.title)}</p><h3>${html(step.question)}</h3><div class="cameraChoices">${choiceMarkup}</div></section>${feedback}${build}${actions}</article>${returnTopButton()}</section>`;
}
function isWorldChoice(choice) { return isPlainObject(choice)&&typeof choice.id==='string'&&choice.id.trim()&&typeof choice.label==='string'&&choice.label.trim()&&typeof choice.recommended==='boolean'&&typeof choice.feedback==='string'&&choice.feedback.trim(); }
function worldScenesFor(data) {
 if(!isPlainObject(data)||!Array.isArray(data.worldScenes)) return [];
 const ids=new Set();
 return data.worldScenes.filter(scene=>isPlainObject(scene)&&Number.isInteger(scene.order)&&typeof scene.id==='string'&&/^world-[a-z0-9-]+$/.test(scene.id)&&!ids.has(scene.id)&&ids.add(scene.id)&&typeof scene.title==='string'&&scene.title.trim()&&isPlainObject(scene.scene)&&['accessibleText','caption'].every(field=>typeof scene.scene[field]==='string'&&scene.scene[field].trim())&&Array.isArray(scene.steps)&&scene.steps.length===6&&scene.steps.every(step=>isPlainObject(step)&&typeof step.id==='string'&&typeof step.concept==='string'&&typeof step.question==='string'&&Array.isArray(step.choices)&&step.choices.length>0&&step.choices.every(isWorldChoice)&&step.choices.filter(choice=>choice.recommended).length===1)&&typeof scene.completion==='string'&&scene.completion.trim()&&typeof scene.boundary==='string'&&scene.boundary.trim()&&isPlainObject(scene.nextLink)&&scene.nextLink.view==='word-image'&&typeof scene.nextLink.text==='string'&&scene.nextLink.text.trim()).sort((left,right)=>left.order-right.order);
}
function worldSceneFor(data, sceneId) { return worldScenesFor(data).find(scene=>scene.id===sceneId)||null; }
function worldStepsFor(scene) { return worldScenesFor({worldScenes:[scene]})[0]?.steps||[]; }
function worldChoiceFor(scene, stepIndex, choiceId) { return worldStepsFor(scene)[Number(stepIndex)]?.choices.find(choice=>choice.id===choiceId)||null; }
function worldStepForAction(scene, stepIndex, choiceId) {
 const steps=worldStepsFor(scene), index=Number(stepIndex), choice=worldChoiceFor(scene,index,choiceId);
 return Number.isInteger(index)&&index>=0&&index<steps.length&&choice?.recommended ? Math.min(index+1,steps.length) : Math.max(0,Math.min(Number.isInteger(index)?index:0,Math.max(steps.length-1,0)));
}
function renderWorldSceneVisual(scene) {
 return `<section class="worldScene" aria-label="场景画面：${html(scene.scene.accessibleText)}"><img class="worldSceneImage" src="assets/world-room-observation.png" width="1672" height="941" alt="${html(scene.scene.accessibleText)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false;"><p class="worldSceneImageFallback" role="status" hidden>场景图片加载失败，请根据下方场景说明继续观察。</p><p class="worldSceneCaption">${html(scene.scene.caption)}</p></section>`;
}
function renderWorldWorkspace(data, selectedId, stepIndex, choiceId, progress) {
 const scene=worldSceneFor(data,selectedId);
 if(!scene) return '<div class="emptyState"><div><b>World 观察暂不可用</b><p class="mini">请返回学习路线，稍后再试。</p></div></div>';
 const steps=worldStepsFor(scene), index=Math.max(0,Math.min(Number(stepIndex)||0,steps.length-1)), step=steps[index], choice=worldChoiceFor(scene,index,choiceId), complete=worldProgressFor(progress).completed.includes(scene.id), finalReady=complete&&index===steps.length-1&&choice?.recommended;
 const choices=step.choices.map(item=>`<button type="button" class="worldChoice${item.id===choice?.id?' selected':''}" data-action="select-world-choice" data-world-choice="${html(item.id)}" aria-pressed="${item.id===choice?.id?'true':'false'}">${html(item.label)}</button>`).join('');
 const feedback=choice?`<section class="worldFeedback${choice.recommended?' recommended':' alternate'}" role="status"><h3>你刚才看见了什么？</h3><p>${html(choice.feedback)}</p></section>`:'';
 const standardActions=`<div class="worldActions">${index>0?'<button type="button" class="backBtn" data-action="previous-world-step">← 上一步</button>':'<span></span>'}${choice?.recommended&&index<steps.length-1?'<button type="button" class="primaryAction" data-action="next-world-step">下一步 →</button>':''}${choice?.recommended&&index===steps.length-1&&!complete?'<button type="button" class="primaryAction" data-action="complete-world-scene">完成本次 World 观察</button>':''}</div>`;
 const completion=finalReady?`<div class="worldActions"><button type="button" class="backBtn" data-action="restart-world-scene">重新观察</button></div><section class="worldSummary" role="status"><h3>你已经完成 World 观察</h3><p>${html(scene.completion)}</p><p class="worldBoundary">${html(scene.boundary)}</p><p>${html(scene.nextLink.text)}</p><button type="button" class="primaryAction" data-action="view" data-view="${html(scene.nextLink.view)}">进入 Word Image</button></section>`:standardActions;
 return `<section class="worldWorkspace" aria-label="World 现实画面观察"><button type="button" class="backBtn" data-action="view" data-view="roadmap">← 返回学习路线</button><div class="worldProgress"><span>World</span><b>步骤 ${index+1} / ${steps.length}</b></div><article class="worldLesson"><p class="workspaceEyebrow">World · 单场景观察</p><h2>${html(scene.title)}</h2>${renderWorldSceneVisual(scene)}<section class="worldQuestion"><h3>${html(step.question)}</h3><div class="worldChoices">${choices}</div></section>${feedback}${completion}</article>${returnTopButton()}</section>`;
}
function isWordImageSentenceFlow(flow) {
 const audio=flow?.audio, natural=flow?.natural, stress=flow?.stress;
 return isPlainObject(flow)&&typeof flow.text==='string'&&flow.text.trim()&&typeof flow.chineseConfirm==='string'&&flow.chineseConfirm.trim()&&typeof flow.clearIpaUS==='string'&&flow.clearIpaUS.trim()&&Array.isArray(flow.clearWords)&&flow.clearWords.length>0&&flow.clearWords.every(word=>isPlainObject(word)&&typeof word.text==='string'&&word.text.trim()&&typeof word.ipaUS==='string'&&word.ipaUS.trim())&&isPlainObject(natural)&&typeof natural.ipaUS==='string'&&natural.ipaUS.trim()&&typeof natural.markerExplanation==='string'&&natural.markerExplanation.trim()&&Array.isArray(natural.links)&&natural.links.length>0&&natural.links.every(link=>isPlainObject(link)&&typeof link.markedText==='string'&&link.markedText.includes('‿')&&typeof link.explanation==='string'&&link.explanation.trim())&&typeof natural.weakFormExplanation==='string'&&natural.weakFormExplanation.trim()&&isPlainObject(stress)&&typeof stress.markedText==='string'&&stress.markedText.trim()&&typeof stress.explanation==='string'&&stress.explanation.trim()&&isPlainObject(flow.phrase)&&typeof flow.phrase.text==='string'&&flow.phrase.text.trim()&&typeof flow.intonation==='string'&&flow.intonation.trim()&&isPlainObject(audio)&&['clear','natural'].every(mode=>isPlainObject(audio[mode])&&audio[mode].text===flow.text&&audio[mode].lang==='en-US'&&typeof audio[mode].rate==='number'&&audio[mode].rate>0&&audio[mode].rate<=2&&typeof audio[mode].label==='string'&&audio[mode].label.trim());
}
function wordImageLessonsFor(data) {
 const textFields=['id','title','wordId','sourceSceneId','spelling','displayForm','ipaUS','speechText','speechLang','core','example','chineseConfirm','boundary','completion'];
 if(!isPlainObject(data)||!Array.isArray(data.wordImageLessons)) return [];
 const ids=new Set();
 return data.wordImageLessons.filter(lesson=>isPlainObject(lesson)&&Number.isInteger(lesson.order)&&textFields.every(field=>typeof lesson[field]==='string'&&lesson[field].trim())&&/^word-image-[a-z0-9-]+$/.test(lesson.id)&&!ids.has(lesson.id)&&ids.add(lesson.id)&&isPlainObject(lesson.scene)&&isPlainObject(lesson.focus)&&['accessibleText','caption'].every(field=>typeof lesson.scene[field]==='string'&&lesson.scene[field].trim()&&typeof lesson.focus[field]==='string'&&lesson.focus[field].trim())&&Array.isArray(lesson.steps)&&lesson.steps.length===3&&lesson.steps.every(step=>isPlainObject(step)&&typeof step.id==='string'&&step.id.trim()&&typeof step.title==='string'&&step.title.trim()&&typeof step.action==='string'&&step.action.trim())&&Array.isArray(lesson.phonicsGroups)&&lesson.phonicsGroups.length>0&&lesson.phonicsGroups.every(group=>isPlainObject(group)&&typeof group.letters==='string'&&group.letters.trim()&&typeof group.sound==='string'&&group.sound.trim()&&['vowel','consonant'].includes(group.colorToken))&&lesson.phonicsGroups.map(group=>group.letters).join('')===lesson.displayForm&&lesson.spelling===lesson.displayForm&&lesson.speechText===lesson.displayForm&&lesson.speechLang==='en-US'&&isWordImageSentenceFlow(lesson.sentenceFlow)&&worldSceneFor(data,lesson.sourceSceneId)&&!lesson.steps.some((step,index,steps)=>steps.findIndex(item=>item.id===step.id)!==index)).sort((left,right)=>left.order-right.order);
}
function wordImageLessonFor(data, lessonId) { return wordImageLessonsFor(data).find(lesson=>lesson.id===lessonId)||null; }
function isSentenceChoice(choice) { return isPlainObject(choice)&&typeof choice.id==='string'&&choice.id.trim()&&typeof choice.label==='string'&&choice.label.trim()&&typeof choice.recommended==='boolean'&&typeof choice.feedback==='string'&&choice.feedback.trim(); }
function sentenceLessonsFor(data) {
 const fields=['id','title','sentence','completion'];
 if(!isPlainObject(data)||!Array.isArray(data.sentenceLessons)) return [];
 const ids=new Set();
 return data.sentenceLessons.filter(lesson=>isPlainObject(lesson)&&Number.isInteger(lesson.order)&&fields.every(field=>typeof lesson[field]==='string'&&lesson[field].trim())&&/^sentence-[a-z0-9-]+$/.test(lesson.id)&&!ids.has(lesson.id)&&ids.add(lesson.id)&&isPlainObject(lesson.source)&&typeof lesson.source.worldSceneId==='string'&&typeof lesson.source.wordImageLessonId==='string'&&worldSceneFor(data,lesson.source.worldSceneId)&&wordImageLessonFor(data,lesson.source.wordImageLessonId)?.sentenceFlow?.text===lesson.sentence&&Array.isArray(lesson.steps)&&lesson.steps.length===9&&lesson.steps.every(step=>isPlainObject(step)&&['id','title','prompt','explanation','action'].every(field=>typeof step[field]==='string'&&step[field].trim()))&&new Set(lesson.steps.map(step=>step.id)).size===lesson.steps.length&&lesson.steps.find(step=>step.id==='focus')?.choices?.every(isSentenceChoice)&&lesson.steps.find(step=>step.id==='focus')?.choices?.filter(choice=>choice.recommended).length===1).sort((left,right)=>left.order-right.order);
}
function sentenceLessonFor(data, lessonId) { return sentenceLessonsFor(data).find(lesson=>lesson.id===lessonId)||null; }
function sentenceStepsFor(lesson) { return Array.isArray(lesson?.steps)?lesson.steps:[]; }
function sentenceStepForAction(lesson, stepIndex, focusId) {
 const steps=sentenceStepsFor(lesson), index=Number(stepIndex), step=steps[index];
 if(!Number.isInteger(index)||index<0||index>=steps.length) return 0;
 if(step.id==='focus'&&!step.choices.find(choice=>choice.id===focusId)?.recommended) return index;
 return Math.min(index+1,steps.length);
}
function sentenceFlowFor(data, lesson) {
 const current=sentenceLessonFor(data,lesson?.id), wordImage=current?wordImageLessonFor(data,current.source.wordImageLessonId):null;
 return wordImage?.sentenceFlow?.text===current?.sentence?wordImage.sentenceFlow:null;
}
function renderWordImageScene(scene, focused) {
 const className=focused?'wordImageFocus':'wordImageScene';
 const imageClass=focused?'wordImageFocusImage':'wordImageSceneImage';
 return `<section class="${className}" aria-label="${html(scene.accessibleText)}"><img class="${imageClass}" src="assets/world-room-observation.png" width="1672" height="941" alt="${html(scene.accessibleText)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false;"><p class="wordImageImageFallback" role="status" hidden>场景图片加载失败，请根据下方场景说明继续理解。</p><p class="wordImageCaption">${html(scene.caption)}</p></section>`;
}
function renderWordImageSentenceFlow(flow, speechSupported, speakingMode) {
 const clearWords=flow.clearWords.map(word=>`<span class="wordImageClearWord"><b>${html(word.text)}</b> <span>${html(word.ipaUS)}</span></span>`).join('');
 const links=flow.natural.links.map(link=>`<li><b>${html(link.markedText)}</b><span>${html(link.explanation)}</span></li>`).join('');
 const stress=html(flow.stress.markedText).replace('CUP','<strong>CUP</strong>').replace('TABLE','<strong>TABLE</strong>');
 const audio=Object.entries(flow.audio).map(([mode,sample])=>`<button type="button" class="wordImageSpeechButton" data-action="play-word-image-sentence-${html(mode)}" aria-label="播放 The cup is on the table. 的${html(sample.label)}美式发音"${speechSupported?'':' disabled'}>🔊 ${speakingMode===mode?'播放中…':html(sample.label)}</button>`).join('');
 return `<section class="wordImageSentenceFlow" aria-label="The cup is on the table 的真实语流样板"><h3>用一句完整英语听这个关系</h3><section class="wordImageSentenceLayer"><h4>英文原句</h4><p class="wordImageSentenceText">${html(flow.text)}</p><p class="wordImageSentenceChinese"><b>中文画面确认</b>：${html(flow.chineseConfirm)}</p></section><section class="wordImageSentenceLayer"><h4>清晰美式音标</h4><p class="wordImageSentenceIpa">${html(flow.clearIpaUS)}</p><div class="wordImageClearWords" aria-label="逐词清晰美式音标">${clearWords}</div></section><section class="wordImageSentenceLayer"><h4>自然语流</h4><p class="wordImageSentenceIpa">${html(flow.natural.ipaUS)}</p><ul class="wordImageFlowNotes">${links}</ul><p>${html(flow.natural.markerExplanation)}</p><p>${html(flow.natural.weakFormExplanation)}</p></section><section class="wordImageSentenceLayer"><h4>句子重音</h4><p class="wordImageStress" aria-label="${html(flow.stress.markedText)}">${stress}</p><p>${html(flow.stress.explanation)}</p><p>${html(flow.phrase.text)} ${html(flow.intonation)}</p></section><section class="wordImageLegend" aria-label="语流标记图例"><span><b>‿</b>：声音自然连起来</span><span><b>粗体</b>：当前信息重音</span><span><b>/ /</b>：清晰音标</span><span><b>[ ]</b>：自然语流中的实际发音</span></section><section class="wordImageSentenceAudio" aria-live="polite">${audio}${speechSupported?'<p>设备语音仅用于当前样板预览，不同设备的音色、语速和语流可能不同。</p>':'<p>当前浏览器不支持语音播放。</p>'}</section></section>`;
}
function renderWordImageWorkspace(data, v2Data, selectedId, stepIndex, progress, speechState) {
 const lesson=wordImageLessonFor(data,selectedId), node=lesson?v2LessonFor(v2Data,lesson.wordId):null;
 if(!lesson||!node) return '<div class="emptyState"><div><b>Word Image 暂不可用</b><p class="mini">请返回学习路线，稍后再试。</p></div></div>';
 const index=Math.max(0,Math.min(Number(stepIndex)||0,lesson.steps.length-1)), step=lesson.steps[index], complete=wordImageProgressFor(progress).completed.includes(lesson.id), speech=isPlainObject(speechState)?speechState:{}, speechSupported=speech.supported===true, speakingMode=typeof speech.speaking==='string'?speech.speaking:(speech.speaking===true?'word':null);
 const previous=index>0?'<button type="button" class="backBtn" data-action="previous-word-image-step">← 上一步</button>':'';
 let content='';
 if(index===0) content=`${renderWordImageScene(lesson.scene,false)}<p class="wordImageLead">${html(lesson.scene.caption)}</p>`;
 else if(index===1) content=`${renderWordImageScene(lesson.focus,true)}<p class="wordImageLead">${html(lesson.focus.caption)}</p>`;
 else {
  const lines='<span class="handwritingLine" aria-hidden="true"></span>'.repeat(4);
  const letters=lesson.phonicsGroups.map(group=>`<span class="phonicsLetter phonics-${html(group.colorToken)}" aria-hidden="true">${html(group.letters)}</span>`).join('');
  const groups=lesson.phonicsGroups.map(group=>`<article class="phonicsCard phonics-${html(group.colorToken)}"><small>${html(group.colorToken==='vowel'?'元音音组':'辅音音组')}</small><strong>${html(group.letters)}</strong><span>${html(group.sound)}</span></article>`).join('');
  const speechButton=`<button type="button" class="wordImageSpeechButton" data-action="play-word-image-speech" aria-label="播放 ${html(lesson.displayForm)} 的美式发音"${speechSupported?'':' disabled'}>🔊 ${speakingMode==='word'?'播放中…':'美式发音'}</button>`;
  content=`<section class="wordImageCore"><div class="wordImageConceptTitle" aria-label="英语词 ${html(node.word)}">${html(node.word)}</div><div class="wordImageHandwriting" aria-label="${html(lesson.displayForm)}" role="img">${lines}<span class="wordImageHandwritingWord" aria-hidden="true">${letters}</span></div><section class="wordImagePhonics" aria-label="自然拼读音组"><h3>字母与声音对应</h3><div class="phonicsCards">${groups}</div></section><section class="wordImageIpa" aria-label="${html(lesson.displayForm)} 的美式音标 ${html(lesson.ipaUS)}"><span>美式</span><strong>${html(lesson.ipaUS)}</strong></section><section class="wordImageSpeech" aria-live="polite">${speechButton}${speechSupported?'': '<p>当前浏览器不支持语音播放。</p>'}</section><p class="wordImageCoreText">${html(lesson.core)}</p>${renderWordImageSentenceFlow(lesson.sentenceFlow,speechSupported,speakingMode)}<p class="wordImageBoundary">${html(lesson.boundary)}</p></section>`;
 }
 const action=complete&&index===lesson.steps.length-1
  ? `<section class="wordImageComplete" role="status"><p>${html(lesson.completion)}</p><div class="wordImageActions"><button type="button" class="primaryAction" data-action="open-word" data-word="${html(lesson.wordId)}">继续理解 ${html(node.word)}</button><button type="button" class="backBtn" data-action="view" data-view="library">浏览 50 词库</button><button type="button" class="backBtn" data-action="restart-word-image">重新看一遍</button></div></section>`
  : `<div class="wordImageActions">${previous}${index<lesson.steps.length-1?`<button type="button" class="primaryAction" data-action="next-word-image-step">${html(step.action)}</button>`:`<button type="button" class="primaryAction" data-action="complete-word-image">${html(step.action)}</button>`}</div>`;
 return `<section class="wordImageWorkspace" aria-label="Word Image 单词本源画面"><button type="button" class="backBtn" data-action="view" data-view="roadmap">← 返回学习路线</button><div class="wordImageProgress"><span>Word Image</span><b>${index+1} / ${lesson.steps.length}</b></div><article class="wordImageLesson"><p class="workspaceEyebrow">Word Image · 一个现实关系</p><h2>${html(step.title)}</h2>${content}${action}</article>${returnTopButton()}</section>`;
}
function renderSentenceScene(scene) {
 return `<section class="sentenceScene" aria-label="${html(scene.accessibleText)}"><img class="sentenceSceneImage" src="assets/world-room-observation.png" width="1672" height="941" alt="${html(scene.accessibleText)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false;"><p class="sentenceImageFallback" role="status" hidden>场景图片加载失败，请根据下方提示继续组织句子。</p><p>${html(scene.caption)}</p></section>`;
}
function renderSentenceWorkspace(data, selectedId, stepIndex, focusId, progress, speechState) {
 const lesson=sentenceLessonFor(data,selectedId), source=lesson?worldSceneFor(data,lesson.source.worldSceneId):null, flow=lesson?sentenceFlowFor(data,lesson):null;
 if(!lesson||!source||!flow) return '<div class="emptyState"><div><b>Sentence 暂不可用</b><p class="mini">请返回学习路线，稍后再试。</p></div></div>';
 const steps=sentenceStepsFor(lesson), index=Math.max(0,Math.min(Number(stepIndex)||0,steps.length-1)), step=steps[index], focus=step.id==='focus'?step.choices.find(choice=>choice.id===focusId)||null:steps.find(item=>item.id==='focus').choices.find(choice=>choice.id===focusId)||null, complete=sentenceProgressFor(progress).completed.includes(lesson.id), speech=isPlainObject(speechState)?speechState:{}, speechSupported=speech.supported===true, speakingMode=typeof speech.speaking==='string'?speech.speaking:null;
 const choices=step.id==='focus'?`<div class="sentenceChoices">${step.choices.map(choice=>`<button type="button" class="sentenceChoice${choice.id===focus?.id?' selected':''}" data-action="select-sentence-focus" data-sentence-focus="${html(choice.id)}" aria-pressed="${choice.id===focus?.id?'true':'false'}">${html(choice.label)}</button>`).join('')}</div>`:'';
 const feedback=step.id==='focus'&&focus?`<section class="sentenceFeedback ${focus.recommended?'recommended':'alternate'}" role="status"><p>${html(focus.feedback)}</p></section>`:'';
 let content='';
 if(['scene','focus'].includes(step.id)) content=renderSentenceScene(source.scene);
 else if(step.id==='relation') content=`${renderSentenceScene(source.scene)}<p class="sentenceRelation">${html(step.explanation)}</p>`;
 else if(step.id==='flow') content=renderWordImageSentenceFlow(flow,speechSupported,speakingMode);
 else {
  const display=step.id==='lock-focus'||step.id==='gap-focus'?'The cup ...':step.id==='connection'||step.id==='gap-relation'?'The cup is ...':lesson.sentence;
  content=`<section class="sentenceBuild" aria-label="当前英语结构"><p>${html(display)}</p><span>${html(step.explanation)}</span></section>${step.id==='path'?'<section class="sentencePath" aria-label="句子认知路径">画面 → 焦点 → 信息缺口 → 补信息 → 完整表达</section>':''}`;
 }
 const canAdvance=step.id!=='focus'||focus?.recommended;
 const actions=complete&&index===steps.length-1
  ? `<section class="sentenceComplete" role="status"><p>${html(lesson.completion)}</p><div class="sentenceActions"><button type="button" class="backBtn" data-action="restart-sentence">重新看一遍</button><button type="button" class="primaryAction" data-action="view" data-view="roadmap">返回学习路线</button></div></section>`
  : `<div class="sentenceActions">${index>0?'<button type="button" class="backBtn" data-action="previous-sentence-step">← 上一步</button>':''}${canAdvance?(index<steps.length-1?`<button type="button" class="primaryAction" data-action="next-sentence-step">${html(step.action)} →</button>`:`<button type="button" class="primaryAction" data-action="complete-sentence">${html(step.action)}</button>`):''}</div>`;
 return `<section class="sentenceWorkspace" aria-label="Sentence 从画面到一句英语"><button type="button" class="backBtn" data-action="view" data-view="roadmap">← 返回学习路线</button><div class="sentenceProgress"><span>Sentence</span><b>${index+1} / ${steps.length}</b></div><article class="sentenceLesson"><p class="workspaceEyebrow">Sentence · Focus → Information → Connection</p><h2>${html(step.title)}</h2><section class="sentencePrompt"><h3>${html(step.prompt)}</h3>${choices}</section>${feedback}${content}${actions}</article>${returnTopButton()}</section>`;
}
function shouldStopWordImageSpeech(currentView, nextView) { return currentView==='word-image'&&nextView!=='word-image'; }
function shouldStopSentenceSpeech(currentView, nextView) { return ['word-image','sentence'].includes(currentView)&&currentView!==nextView; }
function viewKind(view) { return ['today','roadmap','culture','camera','world','word-image','sentence','review','library','tree','compare','progress','network','lesson'].includes(view)?view:'today'; }
function activeNavView(view) { if(['culture','camera','world','word-image','sentence'].includes(view)) return 'roadmap'; return ['today','roadmap','review','library','tree','compare','progress','network'].includes(view)?view:null; }
if(typeof module!=='undefined'&&module.exports) module.exports={cardFileName,localDate,addDays,escapeHtml,html,emptyProgress,parseStoredProgress,cultureProgressFor,completeCultureLesson,cameraProgressFor,completeCameraScene,worldProgressFor,completeWorldScene,wordImageProgressFor,completeWordImageLesson,sentenceProgressFor,completeSentenceLesson,preferredUSVoice,createWordImageSpeechController,applyFeedback,dueWords,filterWords,libraryWords,nextStudyDay,streak,masteryCounts,dayCompletion,todayCards,resolveStudyDay,lessonMeta,groupCategories,nextLibraryFilters,safeRemoveProgress,lessonFor,isUsableV2Graph,isNetworkReady,networkNodeFor,relationSelectionKey,selectedNetworkRelation,selectNetworkNode,selectNetworkDirect,selectNetworkBack,networkStateFor,selectNetworkSystem,networkStepForAction,lessonLayerForAction,renderLessonMiniNetwork,renderV2LessonWorkspace,returnTopButton,renderNetworkContent,v2LessonFor,v2SystemTitleFor,feedbackButtonsFor,reviewContentFor,sceneGroupsFor,safePlanDay,learningRouteStages,renderLearningRoute,cultureLessonsFor,cultureLessonFor,renderCultureWorkspace,cameraScenesFor,cameraSceneFor,cameraStepsFor,cameraChoiceFor,cameraStepForAction,cameraVisualStateFor,renderCameraSceneVisual,renderCameraWorkspace,worldScenesFor,worldSceneFor,worldStepsFor,worldChoiceFor,worldStepForAction,renderWorldWorkspace,wordImageLessonsFor,wordImageLessonFor,renderWordImageWorkspace,isSentenceChoice,sentenceLessonsFor,sentenceLessonFor,sentenceStepsFor,sentenceStepForAction,sentenceFlowFor,renderSentenceWorkspace,shouldStopWordImageSpeech,shouldStopSentenceSpeech,viewKind,activeNavView};

if(typeof window!=='undefined'&&typeof document!=='undefined') {
(()=>{
 const D=window.ENGLISH850_DATA, V2Network=window.ENGLISH850_V2_NETWORK, Curriculum=window.ENGLISH850_V2_CURRICULUM, app=document.getElementById('app');
 let V2=window.ENGLISH850_V2_DATA, v2Notice='';
 if(!isUsableV2Graph(V2,V2Network)) { V2=null; v2Notice='扩展课程数据暂不可用，已继续使用基础课程。'; }
 const title=document.getElementById('pageTitle'), sub=document.getElementById('pageSub');
 const STORAGE_KEY='english850_level1_progress_v1';
 let memoryProgress=emptyProgress(), storageNotice='';
 function loadProgress() {
  try { const saved=window.localStorage.getItem(STORAGE_KEY); memoryProgress=saved===null?emptyProgress():parseStoredProgress(saved); if(saved!==null&&!isProgressProfile(JSON.parse(saved))) throw new Error('Invalid progress'); return memoryProgress; }
  catch(error) { storageNotice='学习档案无法读取，已使用新的本地记录。'; memoryProgress=emptyProgress(); return memoryProgress; }
 }
 function saveProgress(progress) { memoryProgress=progress; try { window.localStorage.setItem(STORAGE_KEY,JSON.stringify(progress)); } catch(error) { state.storageNotice='学习记录暂未保存，已保留在当前页面。'; } return memoryProgress; }
 const initialProgress=loadProgress();
 const initialNetwork=networkStateFor(V2,{networkSystem:'space-relations',networkNode:'to',explorePath:[]});
 const initialCultureLesson=cultureLessonsFor(Curriculum)[0]?.id||null;
 const initialCameraScene=cameraScenesFor(Curriculum)[0]?.id||null;
 const initialWorldScene=worldScenesFor(Curriculum)[0]?.id||null;
 const initialWordImageLesson=wordImageLessonsFor(Curriculum)[0]?.id||null;
 const initialSentenceLesson=sentenceLessonsFor(Curriculum)[0]?.id||null;
 let state={view:'today',day:nextStudyDay(D.plan,initialProgress),word:null,lessonLayer:'quick',cultureLesson:initialCultureLesson,cameraScene:initialCameraScene,cameraStep:0,cameraChoice:null,worldScene:initialWorldScene,worldStep:0,worldChoice:null,wordImageLesson:initialWordImageLesson,wordImageStep:0,wordImageSpeaking:null,sentenceLesson:initialSentenceLesson,sentenceStep:0,sentenceFocus:null,filters:{query:'',category:'all',mastery:'all'},revealed:{},progress:initialProgress,networkSystem:initialNetwork.systemId||'space-relations',networkNode:initialNetwork.node?.id||'to',explorePath:initialNetwork.path,networkRelation:null,networkStep:'systems',storageNotice:[storageNotice,v2Notice].filter(Boolean).join(' ')};
 let wordImageSpeechController=null;
 let activeWordImageSpeechMode=null;
 let pendingWordImageSpeechMode=null;
 function wordImageSpeechControllerFor() {
  if(!wordImageSpeechController) wordImageSpeechController=createWordImageSpeechController(window.speechSynthesis,window.SpeechSynthesisUtterance,(speaking,playbackMode)=>{ if(speaking) state.wordImageSpeaking=playbackMode||activeWordImageSpeechMode||pendingWordImageSpeechMode||'word'; else if(!pendingWordImageSpeechMode) { state.wordImageSpeaking=null; activeWordImageSpeechMode=null; } if(['word-image','sentence'].includes(state.view)) render(); });
  return wordImageSpeechController;
 }
 function stopWordImageSpeech() { pendingWordImageSpeechMode=null; activeWordImageSpeechMode=null; const controller=wordImageSpeechControllerFor(); controller.stop(); state.wordImageSpeaking=null; }
 function playCurrentWordImageSpeech(mode='word') {
  const lesson=wordImageLessonFor(Curriculum,state.wordImageLesson), controller=wordImageSpeechControllerFor();
  const sample=mode==='word'?{text:lesson?.speechText,lang:lesson?.speechLang,rate:1}:lesson?.sentenceFlow?.audio?.[mode];
  pendingWordImageSpeechMode=mode;
  const started=Boolean(lesson&&sample&&controller.play(sample.text,sample.lang,sample.rate,mode));
  activeWordImageSpeechMode=started?mode:null;
  pendingWordImageSpeechMode=null;
  if(!started) { setNotice('当前浏览器不支持语音播放。'); render(); }
 }
 const vocabularyByWord=new Map((D.vocabulary||[]).map(item=>[item.word,item]));
 const safe=value=>html(value);
 const wordButton=(word,className='tag')=>`<button type="button" class="${className}" data-action="open-word" data-word="${safe(word)}">${safe(word)}</button>`;
 function setNotice(message) { state.storageNotice=message; }
 function recordFeedback(word, feedback) {
  state.progress=applyFeedback(state.progress,word,feedback,new Date()); saveProgress(state.progress);
  state.day=resolveStudyDay(state.day,D.plan,state.progress);
  setNotice(`${word} 已记录为“${feedback==='again'?'再来一次':feedback==='unsure'?'不太确定':'理解了'}”，复习计划已更新。`); render();
 }
 function openWord(word) {
  if(shouldStopSentenceSpeech(state.view,'lesson')) stopWordImageSpeech();
  if(lessonFor(D.lessons,word)||v2LessonFor(V2,word)) { state.view='lesson'; state.word=word; state.lessonLayer='quick'; render(); }
  else { setNotice(`${word} 目前是关联提示词，尚未开放完整课程。`); render(); }
 }
 function renderToday() {
  state.day=resolveStudyDay(state.day,D.plan,state.progress);
  title.textContent='今日学习'; sub.textContent='每天 5 个词，用核心画面建立英语思维。';
  const planDay=safePlanDay(D.plan,state.day);
  if(!planDay) { app.innerHTML='<div class="emptyState"><div><b>课程数据不可用</b><p class="mini">暂时无法读取学习计划，请刷新后重试。</p></div></div>'; return; }
  const completion=dayCompletion(planDay,state.progress);
  const cards=todayCards(planDay,D.lessons,state.progress).map(card=>`<button type="button" class="wordCard" data-action="open-word" data-word="${safe(card.word)}"><div class="word">${safe(card.word)}</div><span class="chip">${safe(card.category)}</span><div class="mini">${safe(card.tagline)}</div><div class="mini">掌握度 ${card.mastery}/4</div></button>`).join('');
  app.innerHTML=`<div class="panel"><span class="statusPill">Day ${planDay.day}</span><span class="mini"> · 已开始 ${completion.completed}/${completion.total}</span><div class="grid contentGrid">${cards}</div><p><button type="button" class="primaryAction" data-action="continue-day" data-day="${planDay.day}">继续学习</button></p></div><div class="panel"><b>切换学习日</b><div class="dayPicker">${(D.plan||[]).map(day=>`<button type="button" class="tag dayButton" data-action="select-day" data-day="${day.day}">Day ${day.day}</button>`).join('')}</div></div>`;
 }
 function renderRoadmap() {
  title.textContent='学习路线'; sub.textContent='从理解英语如何组织画面，到逐步形成自己的表达。';
  app.innerHTML=renderLearningRoute(Curriculum);
 }
 function renderCulture() {
  const lesson=cultureLessonFor(Curriculum,state.cultureLesson)||cultureLessonsFor(Curriculum)[0]||null;
  if(!lesson) { title.textContent='Culture'; sub.textContent='中英语言差异从哪里来。'; app.innerHTML=renderCultureWorkspace(Curriculum,null,state.progress); return; }
  state.cultureLesson=lesson.id;
  title.textContent='Culture'; sub.textContent='从同一个现实画面，理解不同语言的组织倾向。';
  app.innerHTML=renderCultureWorkspace(Curriculum,lesson.id,state.progress);
 }
 function completeCurrentCultureLesson() {
  const lesson=cultureLessonFor(Curriculum,state.cultureLesson);
  if(!lesson) { setNotice('未找到当前 Culture 课程。'); render(); return; }
  state.progress=completeCultureLesson(state.progress,lesson.id); saveProgress(state.progress);
  setNotice(`${lesson.title} 已记录为完成；不会加入单词复习队列。`); render();
 }
 function renderCamera() {
  const scene=cameraSceneFor(Curriculum,state.cameraScene)||cameraScenesFor(Curriculum)[0]||null;
  if(!scene) { title.textContent='Camera'; sub.textContent='从镜头焦点开始组织英语画面。'; app.innerHTML=renderCameraWorkspace(Curriculum,null,0,null,state.progress); return; }
  const steps=cameraStepsFor(scene);
  state.cameraScene=scene.id;
  state.cameraStep=Math.max(0,Math.min(state.cameraStep,steps.length-1));
  title.textContent='Camera'; sub.textContent='先拍谁，再看发生什么，最后补一项画面信息。';
  app.innerHTML=renderCameraWorkspace(Curriculum,scene.id,state.cameraStep,state.cameraChoice,state.progress);
 }
 function completeCurrentCameraScene() {
  const scene=cameraSceneFor(Curriculum,state.cameraScene), choice=cameraChoiceFor(scene,state.cameraStep,state.cameraChoice);
  if(!scene||state.cameraStep!==cameraStepsFor(scene).length-1||!choice?.recommended) { setNotice('请先按本次样板完成当前镜头路径。'); render(); return; }
  state.progress=completeCameraScene(state.progress,scene.id); saveProgress(state.progress);
  setNotice('Camera 已记录为完成；不会加入单词复习队列。'); render();
 }
 function renderWorld() {
  const scene=worldSceneFor(Curriculum,state.worldScene)||worldScenesFor(Curriculum)[0]||null;
  if(!scene) { title.textContent='World'; sub.textContent='从真实画面开始看见不同的信息。'; app.innerHTML=renderWorldWorkspace(Curriculum,null,0,null,state.progress); return; }
  const steps=worldStepsFor(scene);
  state.worldScene=scene.id;
  state.worldStep=Math.max(0,Math.min(state.worldStep,steps.length-1));
  title.textContent='World'; sub.textContent='先看见画面里的信息，再进入一个词的核心画面。';
  app.innerHTML=renderWorldWorkspace(Curriculum,scene.id,state.worldStep,state.worldChoice,state.progress);
 }
 function completeCurrentWorldScene() {
  const scene=worldSceneFor(Curriculum,state.worldScene), choice=worldChoiceFor(scene,state.worldStep,state.worldChoice);
  if(!scene||state.worldStep!==worldStepsFor(scene).length-1||!choice?.recommended) { setNotice('请先完成当前这一步的推荐观察。'); render(); return; }
  state.progress=completeWorldScene(state.progress,scene.id); saveProgress(state.progress);
  setNotice('World 已记录为完成；不会加入单词复习队列。'); render();
 }
 function renderWordImage() {
  const lesson=wordImageLessonFor(Curriculum,state.wordImageLesson)||wordImageLessonsFor(Curriculum)[0]||null;
  if(!lesson) { title.textContent='Word Image'; sub.textContent='从现实画面连接一个英语词。'; app.innerHTML=renderWordImageWorkspace(Curriculum,V2,null,0,state.progress); return; }
  state.wordImageLesson=lesson.id;
  state.wordImageStep=Math.max(0,Math.min(state.wordImageStep,lesson.steps.length-1));
  title.textContent='Word Image'; sub.textContent='先从现实画面，建立词与核心画面的直接连接。';
  const speech=wordImageSpeechControllerFor();
  app.innerHTML=renderWordImageWorkspace(Curriculum,V2,lesson.id,state.wordImageStep,state.progress,{supported:speech.isSupported(),speaking:state.wordImageSpeaking});
 }
 function completeCurrentWordImageLesson() {
  const lesson=wordImageLessonFor(Curriculum,state.wordImageLesson);
  if(!lesson||state.wordImageStep!==lesson.steps.length-1) { setNotice('请先完成当前 Word Image 的三步观察。'); render(); return; }
  stopWordImageSpeech();
  state.progress=completeWordImageLesson(state.progress,lesson.id); saveProgress(state.progress);
  setNotice('Word Image 已记录为完成；不会加入单词复习队列。'); render();
 }
 function renderSentence() {
  const lesson=sentenceLessonFor(Curriculum,state.sentenceLesson)||sentenceLessonsFor(Curriculum)[0]||null;
  if(!lesson) { title.textContent='Sentence'; sub.textContent='从表达焦点逐步补足信息。'; app.innerHTML=renderSentenceWorkspace(Curriculum,null,0,null,state.progress); return; }
  state.sentenceLesson=lesson.id;
  state.sentenceStep=Math.max(0,Math.min(state.sentenceStep,sentenceStepsFor(lesson).length-1));
  title.textContent='Sentence'; sub.textContent='先确定焦点，再逐步补足听者还缺的信息。';
  const speech=wordImageSpeechControllerFor();
  app.innerHTML=renderSentenceWorkspace(Curriculum,lesson.id,state.sentenceStep,state.sentenceFocus,state.progress,{supported:speech.isSupported(),speaking:state.wordImageSpeaking});
 }
 function completeCurrentSentenceLesson() {
  const lesson=sentenceLessonFor(Curriculum,state.sentenceLesson);
  if(!lesson||state.sentenceStep!==sentenceStepsFor(lesson).length-1) { setNotice('请先完成当前 Sentence 的全部步骤。'); render(); return; }
  stopWordImageSpeech();
  state.progress=completeSentenceLesson(state.progress,lesson.id); saveProgress(state.progress);
  setNotice('Sentence 已记录为完成；不会加入单词复习队列。'); render();
 }
 function feedbackButtons(word) { return feedbackButtonsFor(word); }
 function v2SystemTitle(systemId) {
  return v2SystemTitleFor(V2,systemId);
 }
 function renderV2Lesson(x) {
  title.textContent=x.word; sub.textContent=`三层学习 · ${v2SystemTitle(x.systemId)}`;
  app.innerHTML=`<button type="button" class="backBtn" data-action="view" data-view="library">← 返回词库</button><div class="lesson lessonEntry">${renderV2LessonWorkspace(V2,V2Network,x,state.lessonLayer)}<div class="block"><h3>这次学习感觉如何？</h3><p class="mini">选择后会更新下一次复习日期。</p>${feedbackButtons(state.word)}</div></div>${returnTopButton()}`;
 }
 function renderLesson() {
  const v2Lesson=v2LessonFor(V2,state.word);
  if(v2Lesson) return renderV2Lesson(v2Lesson);
  const x=lessonFor(D.lessons,state.word);
  if(!x) { state.view='library'; setNotice('未找到该课程，已返回 50 词库。'); return renderLibrary(); }
  title.textContent=x.word; sub.textContent=`${x.grade}级 · ${x.category} → ${x.subcategory}`;
  const meta=lessonMeta(x);
  const related=(x.related||[]).map(word=>vocabularyByWord.has(word)?wordButton(word):`<span class="tag">${safe(word)}</span>`).join('');
  app.innerHTML=`<button type="button" class="backBtn" data-action="view" data-view="library">← 返回词库</button><div class="lesson lessonEntry"><div class="lessonTop"><div><h2>${safe(x.word)}</h2><span class="chip">${safe(x.grade)} · Lesson ${safe(String(x.lesson_no).padStart(2,'0'))}</span><p class="mini">母词编号：${safe(meta.masterId)} · 学习阶段：${safe(meta.level)}</p></div></div><div class="tagline">${safe(x.tagline)}</div><div class="visual">${safe(x.card)}</div><div class="two"><div class="block"><h3>核心画面</h3><p>${safe(x.image)}</p></div><div class="block"><h3>底层逻辑</h3><p>${safe(x.logic)}</p></div></div><div class="block"><h3>高频例句</h3><ul>${(x.examples||[]).map(example=>`<li>${safe(example)}</li>`).join('')}</ul></div><div class="block"><h3>易混 / 关键对比</h3><p>${safe(x.contrast)}</p></div><div class="block"><h3>记忆钩子</h3><p><b>${safe(x.hook)}</b></p></div><div class="block"><h3>关联词</h3><div class="tags">${related}</div></div><div class="block"><h3>这次学习感觉如何？</h3><p class="mini">选择后会更新下一次复习日期。</p>${feedbackButtons(x.word)}</div></div>`;
 }
 function renderReview() {
  const today=localDate(new Date()), words=dueWords(state.progress,today);
  title.textContent='今日复习'; sub.textContent=`${today} · 按复习日期安排巩固。`;
  if(!words.length) {
   const next=Object.values(state.progress.words).map(record=>record.nextReview).filter(Boolean).sort()[0];
   app.innerHTML=`<div class="emptyState"><div><b>今天没有到期复习</b><p class="mini">${next?`最近一次复习在 ${safe(next)}。`:'完成任意词条的学习反馈后，这里会出现复习卡。'}</p></div></div>`; return;
  }
  app.innerHTML=`<div class="panel"><b>今天有 ${words.length} 个待复习词</b><div class="grid contentGrid">${reviewContentFor(words,D.lessons,V2,Object.fromEntries(vocabularyByWord),state.revealed)}</div></div>`;
 }
 function renderLibrary() {
  title.textContent='50词库'; sub.textContent='搜索、按系统与掌握度筛选，打开完整词条。';
  const categories=[...new Set(D.vocabulary.map(item=>item.category))], filters=state.filters;
  app.innerHTML=`<div class="toolbar filterBar"><input id="q" type="search" aria-label="搜索单词" placeholder="搜索单词…" value="${safe(filters.query)}"><select id="cat" aria-label="按知识系统筛选"><option value="all">全部系统</option>${categories.map(category=>`<option value="${safe(category)}"${filters.category===category?' selected':''}>${safe(category)}</option>`).join('')}</select><select id="mastery" aria-label="按掌握度筛选"><option value="all">全部掌握度</option>${[0,1,2,3,4].map(level=>`<option value="${level}"${String(filters.mastery)===String(level)?' selected':''}>掌握度 ${level}</option>`).join('')}</select></div><div id="libraryList" class="libraryList"></div>`;
  updateLibraryList();
 }
 function updateLibraryList() {
  const listElement=document.getElementById('libraryList'); if(!listElement) return;
  const list=libraryWords(D.vocabulary,state.progress,state.filters);
  listElement.innerHTML=`<div class="table"><div class="row head"><div>ID</div><div>单词</div><div>等级</div><div>阶段</div><div>系统</div></div>${list.map(item=>`<div class="row"><div>${safe(String(item.id).padStart(3,'0'))}</div><div>${wordButton(item.word,'w')}</div><div>${safe(item.grade)}</div><div>${safe(item.level.split('｜')[0])}</div><div>${safe(item.category)}</div></div>`).join('')}</div><p class="mini">符合条件 ${list.length} / ${D.vocabulary.length} 个词。</p>`;
 }
 function renderTree() {
  title.textContent='知识树'; sub.textContent='按 5 大知识系统查看 50 个词，以及已学词数量。';
  const categories=groupCategories(D.vocabulary);
  app.innerHTML=`<div class="treeGrid">${categories.map(({category,words})=>{const learned=words.filter(item=>(state.progress.words[item.word]?.mastery||0)>=1).length;return `<div class="treeNode"><h3>${safe(category)}</h3><p class="mini">已学 ${learned}/${words.length} 词</p><div class="tags">${words.map(item=>wordButton(item.word)).join('')}</div></div>`;}).join('')}</div>`;
 }
 function renderCompare() {
  title.textContent='易混对比'; sub.textContent='用核心画面区分，而不是死记中文翻译。';
  app.innerHTML=`<div class="compareGrid">${(D.contrasts||[]).map(item=>`<div class="compare"><h3>${safe(item.title)}</h3><p>${safe(item.summary)}</p><div class="tags">${(item.words||[]).map(word=>vocabularyByWord.has(word)?wordButton(word):`<span class="tag">${safe(word)}</span>`).join('')}</div></div>`).join('')}</div>`;
 }
 function renderNetwork() {
  title.textContent='知识网络'; sub.textContent='从系统关系查看词义连接。';
  const current=networkStateFor(V2,state);
  if(current.node) Object.assign(state,{networkSystem:current.systemId,networkNode:current.node.id,explorePath:current.path});
  app.innerHTML=renderNetworkContent(V2,V2Network,state);
 }
 function renderProgress() {
  const today=localDate(new Date()), counts=masteryCounts(state.progress), due=dueWords(state.progress,today).length, days=streak(state.progress.studyDates,today);
  title.textContent='学习进度'; sub.textContent='掌握度、复习负担与连续学习一目了然。';
  app.innerHTML=`<div class="stats progressGrid"><div class="stat"><b>${counts[1]}</b><span>掌握度 1</span></div><div class="stat"><b>${counts[2]}</b><span>掌握度 2</span></div><div class="stat"><b>${counts[3]}</b><span>掌握度 3</span></div><div class="stat"><b>${counts[4]}</b><span>掌握度 4</span></div></div><div class="panel"><b>待复习 ${due} 个 · 连续学习 ${days} 天</b><div class="dayPicker">${D.plan.map(day=>{const completed=dayCompletion(day,state.progress);return `<button type="button" class="tag dayButton" data-action="select-day" data-day="${day.day}">Day ${day.day} · ${completed.completed}/${completed.total}</button>`;}).join('')}</div></div><div class="panel"><b>重置本机学习档案</b><p class="mini">此操作只会删除此浏览器保存的学习进度，无法恢复。</p><button type="button" class="backBtn" data-action="reset-progress">重置本机档案</button></div>`;
 }
 function syncNav() { const current=activeNavView(state.view); document.querySelectorAll('.nav').forEach(button=>{const active=button.dataset.view===current; button.classList.toggle('active',active); if(active) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');}); }
 function renderStorageNotice() { if(!state.storageNotice) return; const notice=document.createElement('p'); notice.className='notice'; notice.setAttribute('role','status'); notice.textContent=state.storageNotice; app.prepend(notice); state.storageNotice=''; }
 function render() { state.view=viewKind(state.view); syncNav(); ({today:renderToday,roadmap:renderRoadmap,culture:renderCulture,camera:renderCamera,world:renderWorld,'word-image':renderWordImage,sentence:renderSentence,review:renderReview,library:renderLibrary,tree:renderTree,compare:renderCompare,progress:renderProgress,network:renderNetwork,lesson:renderLesson}[state.view])(); renderStorageNotice(); }
 document.querySelectorAll('.nav').forEach(button=>button.addEventListener('click',()=>{if(shouldStopSentenceSpeech(state.view,button.dataset.view)) stopWordImageSpeech(); state.view=button.dataset.view; if(state.view==='network') state.networkStep=networkStepForAction(state.networkStep,'nav-network'); render();}));
 app.addEventListener('click',event=>{
  const target=event.target.closest('[data-action]'); if(!target||!app.contains(target)) return;
  const {action,word,view,day,feedback,nodeId,systemId,preservePath,networkRelation,relationKey,cultureLesson,cameraChoice,worldChoice,sentenceFocus}=target.dataset;
  if(action==='return-top') { if(typeof window.scrollTo==='function') window.scrollTo({top:0,behavior:'smooth'}); return; }
  if(action==='open-word') openWord(word);
  else if(action==='select-culture-lesson') { if(cultureLessonFor(Curriculum,cultureLesson)) { state.cultureLesson=cultureLesson; state.view='culture'; render(); } }
  else if(action==='complete-culture-lesson') completeCurrentCultureLesson();
  else if(action==='select-camera-choice') { if(cameraChoiceFor(cameraSceneFor(Curriculum,state.cameraScene),state.cameraStep,cameraChoice)) { state.cameraChoice=cameraChoice; state.view='camera'; render(); } }
  else if(action==='next-camera-step') { const scene=cameraSceneFor(Curriculum,state.cameraScene); const next=cameraStepForAction(scene,state.cameraStep,state.cameraChoice); if(next>state.cameraStep) { state.cameraStep=next; state.cameraChoice=null; state.view='camera'; render(); } }
  else if(action==='previous-camera-step') { state.cameraStep=Math.max(0,state.cameraStep-1); state.cameraChoice=null; state.view='camera'; render(); }
  else if(action==='complete-camera-scene') completeCurrentCameraScene();
  else if(action==='restart-camera-scene') { state.cameraStep=0; state.cameraChoice=null; state.view='camera'; render(); }
  else if(action==='select-world-choice') { if(worldChoiceFor(worldSceneFor(Curriculum,state.worldScene),state.worldStep,worldChoice)) { state.worldChoice=worldChoice; state.view='world'; render(); } }
  else if(action==='next-world-step') { const scene=worldSceneFor(Curriculum,state.worldScene); const next=worldStepForAction(scene,state.worldStep,state.worldChoice); if(next>state.worldStep) { state.worldStep=next; state.worldChoice=null; state.view='world'; render(); } }
  else if(action==='previous-world-step') { state.worldStep=Math.max(0,state.worldStep-1); state.worldChoice=null; state.view='world'; render(); }
  else if(action==='complete-world-scene') completeCurrentWorldScene();
  else if(action==='restart-world-scene') { state.worldStep=0; state.worldChoice=null; state.view='world'; render(); }
  else if(action==='next-word-image-step') { const lesson=wordImageLessonFor(Curriculum,state.wordImageLesson); if(lesson&&state.wordImageStep<lesson.steps.length-1) { stopWordImageSpeech(); state.wordImageStep+=1; state.view='word-image'; render(); } }
  else if(action==='previous-word-image-step') { stopWordImageSpeech(); state.wordImageStep=Math.max(0,state.wordImageStep-1); state.view='word-image'; render(); }
  else if(action==='complete-word-image') completeCurrentWordImageLesson();
  else if(action==='restart-word-image') { stopWordImageSpeech(); state.wordImageStep=0; state.view='word-image'; render(); }
  else if(action==='play-word-image-speech') playCurrentWordImageSpeech();
  else if(action==='play-word-image-sentence-clear') playCurrentWordImageSpeech('clear');
  else if(action==='play-word-image-sentence-natural') playCurrentWordImageSpeech('natural');
  else if(action==='select-sentence-focus') { const lesson=sentenceLessonFor(Curriculum,state.sentenceLesson), focusStep=sentenceStepsFor(lesson).find(step=>step.id==='focus'); if(focusStep?.choices.some(choice=>choice.id===sentenceFocus)) { state.sentenceFocus=sentenceFocus; state.view='sentence'; render(); } }
  else if(action==='next-sentence-step') { const lesson=sentenceLessonFor(Curriculum,state.sentenceLesson), next=sentenceStepForAction(lesson,state.sentenceStep,state.sentenceFocus); if(next>state.sentenceStep) { stopWordImageSpeech(); state.sentenceStep=next; state.view='sentence'; render(); } }
  else if(action==='previous-sentence-step') { stopWordImageSpeech(); state.sentenceStep=Math.max(0,state.sentenceStep-1); state.view='sentence'; render(); }
  else if(action==='complete-sentence') completeCurrentSentenceLesson();
  else if(action==='restart-sentence') { stopWordImageSpeech(); state.sentenceStep=0; state.sentenceFocus=null; state.view='sentence'; render(); }
  else if(['lesson-layer-quick','lesson-layer-deep','lesson-layer-network'].includes(action)) { state.lessonLayer=lessonLayerForAction(state.lessonLayer,action); state.view='lesson'; render(); }
  else if(action==='view') { if(shouldStopSentenceSpeech(state.view,view)) stopWordImageSpeech(); if(view==='network') { if(nodeId) Object.assign(state,selectNetworkDirect(state,V2,nodeId)); state.networkStep=networkStepForAction(state.networkStep,nodeId?'lesson-network':'nav-network'); } state.view=view; render(); }
  else if(action==='select-network-relation') { const relation=selectedNetworkRelation(V2,V2Network,networkNodeFor(V2,state.networkNode),relationKey); state.networkRelation=relationSelectionKey(relation); state.networkStep=networkStepForAction(state.networkStep,'select-network-relation'); state.view='network'; render(); }
  else if(action==='select-network-node') { Object.assign(state,selectNetworkNode(state,V2,nodeId)); state.networkStep=networkStepForAction(state.networkStep,networkRelation==='true'?'select-network-relation':'select-network-node'); state.view='network'; render(); }
  else if(action==='select-network-system') { Object.assign(state,selectNetworkSystem(state,V2,systemId,preservePath==='true')); state.networkStep=networkStepForAction(state.networkStep,networkRelation==='true'?'select-network-relation':'select-network-system'); state.view='network'; render(); }
  else if(action==='network-back') { Object.assign(state,selectNetworkBack(state,V2,V2Network)); state.networkStep=networkStepForAction(state.networkStep,'network-back'); state.view='network'; render(); }
  else if(action==='network-mobile-systems'||action==='network-mobile-nodes') { state.networkStep=networkStepForAction(state.networkStep,action); state.view='network'; render(); }
  else if(action==='select-day') { state.day=Number(day); state.view='today'; render(); }
  else if(action==='continue-day') { const planDay=D.plan.find(item=>item.day===Number(day)); const next=planDay?.words.find(item=>(state.progress.words[item]?.mastery||0)<1)||planDay?.words[0]; if(next) openWord(next); }
  else if(action==='feedback') recordFeedback(word,feedback);
  else if(action==='reveal') { state.revealed[word]=true; render(); }
  else if(action==='reset-progress') { if(window.confirm('确认重置本机学习档案？此操作无法恢复。')&&window.confirm('请再次确认：删除全部本机学习记录？')) { const removed=safeRemoveProgress(()=>window.localStorage.removeItem(STORAGE_KEY)); state.progress=emptyProgress(); state.revealed={}; setNotice(removed?'本机学习档案已重置。':'无法删除浏览器保存的学习档案；当前页面记录已清空。'); render(); } }
 });
 app.addEventListener('input',event=>{ if(event.target.id==='q') { state.filters=nextLibraryFilters(state.filters,{query:event.target.value}); updateLibraryList(); } });
 app.addEventListener('change',event=>{ if(event.target.id==='cat') state.filters=nextLibraryFilters(state.filters,{category:event.target.value}); if(event.target.id==='mastery') state.filters=nextLibraryFilters(state.filters,{mastery:event.target.value}); updateLibraryList(); });
 render();
 window.state=state; window.render=render; window.recordFeedback=recordFeedback;
})();
}
