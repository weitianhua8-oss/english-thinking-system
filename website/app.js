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
 return {...progress,words};
}
function parseStoredProgress(saved) { try { return sanitizeProgress(JSON.parse(saved)); } catch(error) { return emptyProgress(); } }
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
function selectedNetworkRelation(v2Data, graphApi, node, targetId) {
 if(!isPlainObject(graphApi)||typeof graphApi.explorableRelations!=='function'||typeof targetId!=='string'||!targetId.trim()||!isPlainObject(node)) return null;
 const current=networkNodeFor(v2Data,node.id);
 if(!current) return null;
 try {
  const relations=graphApi.explorableRelations(v2Data,current);
  return Array.isArray(relations) ? relations.find(relation=>isPlainObject(relation)&&relation.target===targetId)||null : null;
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
 const nodes=graphApi.nodesForSystem(v2Data,current.systemId).filter(node=>networkNodeFor(v2Data,node?.id)).map(node=>`<button type="button" class="wordCard networkNode" data-action="select-network-node" data-node-id="${html(node.id)}"${node.id===current.node.id?' aria-pressed="true"':''}><div class="word">${html(node.word)}</div><div class="mini">${html(node.coreMeaning)}</div></button>`).join('');
 const relations=graphApi.explorableRelations(v2Data,current.node).reduce((groups,relation)=>{
  if(!relationTypes[relation.type]) return groups;
  (groups[relation.type]||=[]).push(relation); return groups;
 },{});
 const relationMarkup=Object.entries(relationTypes).map(([type,title])=>{
  const group=relations[type]||[]; if(!group.length) return '';
  return `<section class="block networkRelation networkRelation-${html(type)}${type==='contrast'?' contrastBlock':''}"><div class="networkRelationHeading"><span class="relationBadge relation-${html(type)}">${html(title)}</span><h4>${html(title)}</h4></div>${group.map(relation=>{
   const target=relation.targetNode||relation.targetSystem;
   const action=relation.targetNode?'select-network-node':'select-network-system';
   const attribute=relation.targetNode?'data-node-id':'data-system-id';
   const targetLabel=relation.targetNode?.word||relation.targetSystem?.title||relation.target;
   return `<div class="mini networkRelationItem"><b>${html(relation.label)}</b><p>${html(relation.explanation)}</p><button type="button" class="tag" data-action="${action}" ${attribute}="${html(relation.target)}" data-network-relation="true"${relation.targetNode?'':' data-preserve-path="true"'}>查看 ${html(targetLabel)}</button></div>`;
  }).join('')}</section>`;
 }).join('');
 const step=['systems','nodes','detail'].includes(state?.networkStep)?state.networkStep:'systems';
 const back=current.path.length?'<p><button type="button" class="backBtn" data-action="network-back">← 返回上一步</button></p>':'';
 const origin=typeof current.node.quick?.origin==='string'?current.node.quick.origin:'暂未提供核心本源。';
 return `<section class="learningWorkspace networkMapWorkspace"><header class="networkMapHero"><p class="workspaceEyebrow">英语思维 · 知识网络</p><h2>从系统出发，沿关系继续探索</h2><p>当前坐标：${html(v2SystemTitleFor(v2Data,current.systemId))} · ${html(current.node.word)} → ${html(current.node.coreMeaning)}</p></header><div class="networkLayout" data-network-step="${html(step)}"><section class="panel networkMapPanel networkSystems"><div class="networkPanelTitle"><span>01</span><div><p>认知系统</p><h3>选择你要理解的系统</h3></div></div><div class="tags">${systems}</div></section><section class="panel networkMapPanel networkNodes"><p class="networkMobileNav"><button type="button" class="backBtn" data-action="network-mobile-systems">← 选择系统</button></p><div class="networkPanelTitle"><span>02</span><div><p>${html(v2SystemTitleFor(v2Data,current.systemId))}</p><h3>发现系统里的知识节点</h3></div></div><div class="grid contentGrid">${nodes||'<p class="mini">该系统暂未提供词条。</p>'}</div></section><section class="panel networkMapPanel networkExplain"><p class="networkMobileNav"><button type="button" class="backBtn" data-action="network-mobile-nodes">← 选择词条</button></p>${back}<div class="networkPanelTitle"><span>03</span><div><p>当前关系说明</p><h3>${html(current.node.word)} <em>→ ${html(current.node.coreMeaning)}</em></h3></div></div><section class="block knowledgeConnection"><h4>核心本源</h4><p>${html(origin)}</p><p><button type="button" class="primaryAction" data-action="open-word" data-word="${html(current.node.id)}">打开三层课程</button></p></section>${relationMarkup||'<p class="mini">该关联内容暂未开放。</p>'}</section></div>${returnTopButton()}</section>`;
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
function viewKind(view) { return ['today','review','library','tree','compare','progress','network','lesson'].includes(view)?view:'today'; }
function activeNavView(view) { return ['today','review','library','tree','compare','progress','network'].includes(view)?view:null; }
if(typeof module!=='undefined'&&module.exports) module.exports={localDate,addDays,escapeHtml,html,emptyProgress,parseStoredProgress,applyFeedback,dueWords,filterWords,libraryWords,nextStudyDay,streak,masteryCounts,dayCompletion,todayCards,resolveStudyDay,lessonMeta,groupCategories,nextLibraryFilters,safeRemoveProgress,lessonFor,isUsableV2Graph,isNetworkReady,networkNodeFor,selectedNetworkRelation,selectNetworkNode,selectNetworkDirect,selectNetworkBack,networkStateFor,selectNetworkSystem,networkStepForAction,lessonLayerForAction,renderLessonMiniNetwork,renderV2LessonWorkspace,returnTopButton,renderNetworkContent,v2LessonFor,v2SystemTitleFor,feedbackButtonsFor,reviewContentFor,sceneGroupsFor,safePlanDay,viewKind,activeNavView};

if(typeof window!=='undefined'&&typeof document!=='undefined') {
(()=>{
 const D=window.ENGLISH850_DATA, V2Network=window.ENGLISH850_V2_NETWORK, app=document.getElementById('app');
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
 let state={view:'today',day:nextStudyDay(D.plan,initialProgress),word:null,lessonLayer:'quick',filters:{query:'',category:'all',mastery:'all'},revealed:{},progress:initialProgress,networkSystem:initialNetwork.systemId||'space-relations',networkNode:initialNetwork.node?.id||'to',explorePath:initialNetwork.path,networkRelation:null,networkStep:'systems',storageNotice:[storageNotice,v2Notice].filter(Boolean).join(' ')};
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
 function render() { state.view=viewKind(state.view); syncNav(); ({today:renderToday,review:renderReview,library:renderLibrary,tree:renderTree,compare:renderCompare,progress:renderProgress,network:renderNetwork,lesson:renderLesson}[state.view])(); renderStorageNotice(); }
 document.querySelectorAll('.nav').forEach(button=>button.addEventListener('click',()=>{state.view=button.dataset.view; if(state.view==='network') state.networkStep=networkStepForAction(state.networkStep,'nav-network'); render();}));
 app.addEventListener('click',event=>{
  const target=event.target.closest('[data-action]'); if(!target||!app.contains(target)) return;
  const {action,word,view,day,feedback,nodeId,systemId,preservePath,networkRelation}=target.dataset;
  if(action==='return-top') { if(typeof window.scrollTo==='function') window.scrollTo({top:0,behavior:'smooth'}); return; }
  if(action==='open-word') openWord(word);
  else if(['lesson-layer-quick','lesson-layer-deep','lesson-layer-network'].includes(action)) { state.lessonLayer=lessonLayerForAction(state.lessonLayer,action); state.view='lesson'; render(); }
  else if(action==='view') { if(view==='network') { if(nodeId) Object.assign(state,selectNetworkDirect(state,V2,nodeId)); state.networkStep=networkStepForAction(state.networkStep,nodeId?'lesson-network':'nav-network'); } state.view=view; render(); }
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
