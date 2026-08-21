const cabinet=[
 ["👨🏻‍💼","James Mercer","Chancellor",64],["👩🏽‍⚕️","Aisha Rahman","Health",79],["👩🏼‍💼","Eleanor Price","Home",58],["👨🏿‍💼","Marcus Cole","Foreign",72],["👩🏻‍💼","Sophie Grant","Education",83]
];
const regions=["Scotland","North","Midlands","Wales","London","South East"];
let state={}; let currentEvent=null; let locked=false;

function freshState(){return{turn:0,approval:52,economy:61,britain:48,power:73,majority:24,treasury:55,housing:45,promises:[],customPromises:[],delayed:[],regions:{Scotland:48,North:51,Midlands:52,Wales:50,London:55,"South East":52},eventIndex:0,decisions:0,newsIndex:0};}
function save(){} function clearSave(){}
function show(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));document.querySelector(id)?.classList.add('active');}
function renderPromises(){
 const grid=$('#promiseGrid'); if(!grid)return; grid.innerHTML='';
 PROMISES.forEach(([id,icon,label])=>{const b=document.createElement('button');b.className='promise'+(state.promises.includes(id)?' selected':'');b.innerHTML=`<b>${icon} ${label}</b><span class="muted">A promise voters will judge you against</span>`;b.onclick=()=>{const i=state.promises.indexOf(id);if(i>=0)state.promises.splice(i,1);else if(totalPromises()<3)state.promises.push(id);renderPromises();};grid.appendChild(b);});
 state.customPromises.forEach((label,i)=>{const b=document.createElement('button');b.className='promise selected custom-selected';b.innerHTML=`<b>✍️ ${label}</b><span class="muted">Custom manifesto promise</span>`;b.onclick=()=>{state.customPromises.splice(i,1);renderPromises();};grid.appendChild(b);});
 $('#promiseCount').textContent=totalPromises(); $('#startBtn').disabled=totalPromises()!==3; $('#startBtn').textContent=totalPromises()===3?'Lock in manifesto →':`Choose ${3-totalPromises()} more`;
}
function totalPromises(){return state.promises.length+state.customPromises.length;}
function updateUI(){
 ['approval','economy','britain','power'].forEach(k=>{state[k]=clamp(state[k]);$('#'+k+'Val').textContent=Math.round(state[k])+(k==='approval'?'%':'');$('#'+k+'Bar').style.width=state[k]+'%';});
 $('#majorityVal').textContent=state.majority; $('#treasurySide').textContent=Math.round(state.treasury); $('#decisionCount').textContent=state.decisions;
 const month=(state.turn%12)+1,year=Math.floor(state.turn/12)+1; $('#turnText').textContent=`Year ${Math.min(year,5)} • Month ${month}`;
 const monthsLeft=Math.max(0,60-state.turn); $('#electionCountdown').textContent=monthsLeft>=24?`${Math.ceil(monthsLeft/12)} years`:monthsLeft>=12?'1 year':`${monthsLeft} months`;
 $('#termProgressBar').style.width=Math.min(100,(state.turn/60)*100)+'%';
 renderRegions();renderCabinet();renderManifesto();
}
function renderRegions(){const w=$('#regionMeters');if(!w)return;w.innerHTML='';regions.forEach(r=>{const v=clamp(state.regions[r]+(state.approval-50)*.35);w.innerHTML+=`<div class="meter-row"><span>${r}</span><div class="meter-track"><span style="width:${v}%"></span></div><b>${Math.round(v)}%</b></div>`;});}
function renderCabinet(){const w=$('#cabinetList');if(!w)return;w.innerHTML='';cabinet.forEach(([ico,n,role,l])=>{const adj=clamp(l+(state.power-50)*.15);w.innerHTML+=`<div class="minister"><div class="avatar">${ico}</div><div><div class="mname">${n}</div><div class="role">${role}</div></div><div class="loyalty">${Math.round(adj)}%</div></div>`;});}
function renderManifesto(){const labels=Object.fromEntries(PROMISES.map(p=>[p[0],p[2]]));const items=[...state.promises.map(p=>labels[p]),...state.customPromises];$('#manifestoList').innerHTML=items.map(x=>`<div class="manifesto-item">✓ ${x}</div>`).join('');}
function pickEvent(){const e=BASE_EVENTS[state.eventIndex]||BASE_EVENTS[BASE_EVENTS.length-1];state.eventIndex++;return e;}
function loadEvent(){
 locked=false; $('#feedback').classList.remove('show');$('#paper').classList.remove('show');$('#voteCard').classList.remove('show');$('#decisionArea').classList.add('hidden');$('#revealChoicesBtn').classList.remove('hidden');
 currentEvent=pickEvent(); const briefing=getBriefing(currentEvent);
 $('#eventIcon').textContent=currentEvent.icon;$('#eventCategory').textContent=currentEvent.category;$('#eventTitle').textContent=currentEvent.title;$('#eventText').textContent=currentEvent.text;$('#adviserName').textContent=currentEvent.adviser;$('#adviserAvatar').textContent=currentEvent.avatar;$('#adviserText').textContent=currentEvent.adviserText;
 $('#systemExplainer').textContent=briefing.explainer;$('#controlText').textContent=briefing.control;$('#lessonSummary').textContent=briefing.explainer;
 $('#stakeholders').innerHTML=briefing.stakeholders.map(([name,want,icon])=>`<div class="stakeholder"><span>${icon}</span><div><b>${name}</b><small>${want}</small></div></div>`).join('');
 renderChoices(briefing);rotateNews();updateUI();window.scrollTo({top:0,behavior:'smooth'});
}
function renderChoices(briefing){const c=$('#choices');c.innerHTML='';currentEvent.choices.forEach((x,i)=>{const reactions=predictedReactions(x,i,briefing);const b=document.createElement('button');b.className='choice choice-detailed';b.innerHTML=`<div class="choice-main"><strong>${x.t}</strong><small>${x.s}</small></div><div class="choice-reactions">${reactions.map(r=>`<span class="${r[1]}">${r[0]}</span>`).join('')}</div>`;b.onclick=()=>choose(x,i,briefing);c.appendChild(b);});}
function predictedReactions(choice,index,briefing){
 const e=choice.e||{};let out=[];
 if((e.treasury||0)<-3)out.push(['Treasury resists','bad']); else if((e.treasury||0)>2)out.push(['Treasury likes','good']);
 if((e.approval||0)>1)out.push(['Public +','good']); else if((e.approval||0)<-1)out.push(['Public −','bad']);
 if((e.britain||0)>2)out.push(['Services +','good']); else if((e.britain||0)<-2)out.push(['Services −','bad']);
 if((e.power||0)>1)out.push(['Party +','good']); else if((e.power||0)<-1)out.push(['Party risk','bad']);
 if(!out.length)out.push([index===1?'Compromise':'Mixed reaction','neutral']);return out.slice(0,3);
}
function revealChoices(){ $('#revealChoicesBtn').classList.add('hidden');$('#decisionArea').classList.remove('hidden');$('#decisionArea').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function applyEffects(e){const icons={approval:'👍',economy:'📈',britain:'❤️',power:'🏛',treasury:'💷',housing:'🏠'};const labels={approval:'Public',economy:'Economy',britain:'Services',power:'Authority',treasury:'Treasury',housing:'Housing'};const shown=[];Object.entries(e||{}).forEach(([k,v])=>{if(state[k]===undefined)state[k]=50;state[k]+=v;if(labels[k])shown.push(`${icons[k]} ${labels[k]} ${v>0?'+':''}${v}`);});regions.forEach((r,idx)=>state.regions[r]=clamp(state.regions[r]+((e?.approval||0)*(.12+(idx%3)*.03))));return shown;}
function choose(choice,index,briefing){
 if(locked)return;locked=true;state.decisions++;const shown=applyEffects(choice.e);if(choice.delay)state.delayed.push({due:state.turn+choice.delay.after,...choice.delay});
 $('#feedbackTitle').textContent=choice.t;$('#feedbackText').textContent=choice.s+'. Here is how the main groups react immediately.';$('#effects').innerHTML=shown.map(x=>`<span class="effect">${x}</span>`).join('');
 $('#groupReactions').innerHTML=actualReactions(choice,index,briefing).map(([g,r,t])=>`<div class="reaction ${t}"><b>${g}</b><span>${r}</span></div>`).join('');$('#feedback').classList.add('show');
 $('#headline').textContent=choice.h;$('#deck').textContent=choice.d;$('#paper').classList.add('show');if(currentEvent.vote)runVote(choice);updateUI();$('#feedback').scrollIntoView({behavior:'smooth',block:'start'});
}
function actualReactions(choice,index,briefing){const names=briefing.stakeholders.map(s=>s[0]);const e=choice.e||{};const mood=(v)=>v>1?'welcomes it':v<-1?'opposes it':'is cautious';return [[names[0]||'Public',mood((e.britain||0)+(e.approval||0)),(e.britain||0)+(e.approval||0)>1?'positive':'negative'],[names[1]||'Treasury',mood(e.treasury||0),(e.treasury||0)>=0?'positive':'negative'],[names[2]||'Your MPs',mood(e.power||0),(e.power||0)>=0?'positive':'negative']];}
function runVote(choice){const base=state.majority+312,uncertainty=Math.floor(Math.random()*13)-6;let aye=Math.round(base+(choice.voteBoost||0)+state.power*.08+uncertainty);aye=Math.max(260,Math.min(355,aye));let no=635-aye,passed=aye>no;$('#voteBill').textContent=currentEvent.bill||'Government Bill';$('#ayeNum').textContent=aye;$('#noNum').textContent=no;$('#voteResult').textContent=passed?'BILL PASSES':'BILL DEFEATED';if(!passed){state.power-=5;state.approval-=2;state.majority=Math.max(0,state.majority-2)}else state.power+=2;$('#voteCard').classList.add('show');}
function processDelayed(){const due=state.delayed.filter(x=>x.due<=state.turn);state.delayed=state.delayed.filter(x=>x.due>state.turn);if(due.length){due.forEach(x=>applyEffects(x.e));toast(due.map(x=>x.text).join(' '));}}
function continueGame(){state.turn+=3;processDelayed();if(currentEvent.final||state.eventIndex>=BASE_EVENTS.length){finishGame();return;}loadEvent();}
function finishGame(){show('#endScreen');const avg=(state.approval+state.economy+state.britain+state.power)/4;let grade=avg>=78?'A+':avg>=70?'A':avg>=64?'B+':avg>=58?'B':avg>=52?'C+':avg>=46?'C':'D';const seats=Math.max(220,Math.min(390,Math.round(260+state.approval*1.15+state.power*.35+(state.economy-50)*.45))),won=seats>=326;$('#grade').textContent=grade;$('#endTitle').textContent=won?'You won another term.':'The voters threw you out.';const delivered=promiseScore();$('#endSummary').textContent=`Projected seats: ${seats}. You delivered ${delivered}/${totalPromises()} manifesto promises. ${won?'Britain has handed you the keys again.':'Someone else now gets to discover why governing is difficult.'}`;$('#scoreGrid').innerHTML=[["Public approval",Math.round(state.approval)+'%'],['Economy',Math.round(state.economy)+'/100'],['Services',Math.round(state.britain)+'/100'],['Authority',Math.round(state.power)+'/100'],['Treasury',Math.round(state.treasury)+'/100'],['Projected seats',seats]].map(([a,b])=>`<div class="score"><small>${a}</small><b>${b}</b></div>`).join('');clearSave();}
function promiseScore(){let n=0;state.promises.forEach(p=>{if(p==='nhs'&&state.britain>=55)n++;if(p==='housing'&&state.housing>=52)n++;if(p==='growth'&&state.economy>=65)n++;if(p==='tax'&&state.treasury>=52)n++;if(p==='crime'&&state.britain>=55)n++;if(p==='climate'&&state.economy>=60&&state.britain>=55)n++;});return n;}
function rotateNews(){if(!WORLD_NEWS.length)return;const base=WORLD_NEWS[state.newsIndex%WORLD_NEWS.length];state.newsIndex++;$('#tickerText').textContent=base;}
function toast(msg){const t=$('#toast');t.textContent='⏳ CONSEQUENCE • '+msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),5600);}
state=freshState();renderPromises();
