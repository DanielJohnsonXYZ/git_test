const cabinet=[
 ["👨🏻‍💼","James Mercer","Chancellor",64],
 ["👩🏽‍⚕️","Aisha Rahman","Health",79],
 ["👩🏼‍💼","Eleanor Price","Home",58],
 ["👨🏿‍💼","Marcus Cole","Foreign",72],
 ["👩🏻‍💼","Sophie Grant","Education",83]
];
const regions=["Scotland","North","Midlands","Wales","London","South East"];

let state={};
let currentEvent=null;
let locked=false;

function freshState(){
 return {
  turn:0, approval:52,economy:61,britain:48,power:73,majority:24,treasury:55,housing:45,
  promises:[], promiseProgress:{}, delayed:[], regions:{Scotland:48,North:51,Midlands:52,Wales:50,London:55,"South East":52},
  used:[], eventIndex:0
 };
}

function save(){ $("#saveStatus").textContent="Playable MVP"; }
function clearSave(){}

function show(id){
 document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
 $(id).classList.add("active");
}
function renderPromises(){
 const grid=$("#promiseGrid");grid.innerHTML="";
 PROMISES.forEach(([id,icon,label])=>{
  const b=document.createElement("button");b.className="promise"+(state.promises.includes(id)?" selected":"");
  b.innerHTML=`<b>${icon} ${label}</b><span class="muted">Make this a defining promise</span>`;
  b.addEventListener("click",()=>{
   const i=state.promises.indexOf(id);
   if(i>=0)state.promises.splice(i,1);else if(state.promises.length<3)state.promises.push(id);
   renderPromises();
  });
  grid.appendChild(b);
 });
 $("#startBtn").disabled=state.promises.length!==3;
 $("#startBtn").textContent=state.promises.length===3?"Enter No. 10 →":`Choose ${3-state.promises.length} more`;
}
function updateUI(){
 ["approval","economy","britain","power"].forEach(k=>{
  state[k]=clamp(state[k]);
  $("#"+k+"Val").textContent=Math.round(state[k])+(k==="approval"?"%":"");
  $("#"+k+"Bar").style.width=state[k]+"%";
 });
 $("#majorityVal").textContent=state.majority;
 const month=(state.turn%12)+1, year=Math.floor(state.turn/12)+1;
 $("#turnText").textContent=`Year ${Math.min(year,5)} • Month ${month}`;
 renderRegions();renderCabinet();renderManifesto();save();
}
function renderRegions(){
 const wrap=$("#regionMeters");wrap.innerHTML="";
 regions.forEach(r=>{
  const v=clamp(state.regions[r] + (state.approval-50)*.35);
  wrap.innerHTML+=`<div class="meter-row"><span>${r}</span><div class="meter-track"><span style="width:${v}%"></span></div><b>${Math.round(v)}%</b></div>`;
 });
}
function renderCabinet(){
 const wrap=$("#cabinetList");wrap.innerHTML="";
 cabinet.forEach(([ico,n,role,l])=>{
  const adj=clamp(l+(state.power-50)*.15);
  wrap.innerHTML+=`<div class="minister"><div class="avatar">${ico}</div><div><div class="mname">${n}</div><div class="role">${role}</div></div><div class="loyalty">${Math.round(adj)}%</div></div>`;
 });
}
function renderManifesto(){
 const labels=Object.fromEntries(PROMISES.map(p=>[p[0],p[2]]));
 $("#manifestoList").innerHTML=state.promises.map(p=>`✓ ${labels[p]}`).join("<br>");
}
function pickEvent(){
 // first event always NHS, then mostly sequential for a coherent MVP
 let e=BASE_EVENTS[state.eventIndex];
 if(!e)e=BASE_EVENTS[BASE_EVENTS.length-1];
 state.eventIndex++;
 return e;
}
function loadEvent(){
 locked=false;
 $("#feedback").classList.remove("show");
 $("#paper").classList.remove("show");
 $("#voteCard").classList.remove("show");
 currentEvent=pickEvent();
 $("#eventIcon").textContent=currentEvent.icon;
 $("#eventCategory").textContent=currentEvent.category;
 $("#eventTitle").textContent=currentEvent.title;
 $("#eventText").textContent=currentEvent.text;
 $("#adviserName").textContent=currentEvent.adviser;
 $("#adviserAvatar").textContent=currentEvent.avatar;
 $("#adviserText").textContent=currentEvent.adviserText;
 const c=$("#choices");c.innerHTML="";
 currentEvent.choices.forEach((x,i)=>{
  const b=document.createElement("button");b.className="choice";
  b.innerHTML=`<span>${x.t}</span><small>${x.s}</small>`;
  b.addEventListener("click",()=>choose(x,i));
  c.appendChild(b);
 });
 updateUI();
}
function applyEffects(e){
 const icons={approval:"👍",economy:"📈",britain:"❤️",power:"♛",treasury:"💷",housing:"🏠"};
 const labels={approval:"Approval",economy:"Economy",britain:"Britain",power:"Power",treasury:"Treasury",housing:"Housing"};
 const shown=[];
 Object.entries(e||{}).forEach(([k,v])=>{
  if(state[k]===undefined)state[k]=50;
  state[k]+=v;
  if(["approval","economy","britain","power","treasury","housing"].includes(k))
   shown.push(`${icons[k]||""} ${labels[k]||k} ${v>0?"+":""}${v}`);
 });
 // regional wobble
 regions.forEach((r,idx)=>state.regions[r]=clamp(state.regions[r]+((e?.approval||0)*(.12+(idx%3)*.03))));
 return shown;
}
function choose(choice,index){
 if(locked)return;locked=true;
 const shown=applyEffects(choice.e);
 if(choice.delay)state.delayed.push({due:state.turn+choice.delay.after,...choice.delay});
 $("#feedbackTitle").textContent=choice.t;
 $("#feedbackText").textContent=choice.s+". Your decision is now government policy.";
 $("#effects").innerHTML=shown.map(x=>`<span class="effect">${x}</span>`).join("");
 $("#feedback").classList.add("show");
 $("#headline").textContent=choice.h;
 $("#deck").textContent=choice.d;
 $("#paper").classList.add("show");
 if(currentEvent.vote)runVote(choice);
 updateUI();
 $("#feedback").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function runVote(choice){
 const base=state.majority+312;
 const uncertainty=Math.floor(Math.random()*13)-6;
 let aye=Math.round(base+(choice.voteBoost||0)+state.power*.08+uncertainty);
 aye=Math.max(260,Math.min(355,aye));
 let no=635-aye;
 const passed=aye>no;
 $("#voteBill").textContent=currentEvent.bill||"Government Bill";
 $("#ayeNum").textContent=aye;$("#noNum").textContent=no;
 $("#voteResult").textContent=passed?"BILL PASSES":"BILL DEFEATED";
 $("#voteResult").style.color=passed?"#e3bd60":"#ef6e62";
 if(!passed){state.power-=5;state.approval-=2;state.majority=Math.max(0,state.majority-2)}
 else state.power+=2;
 $("#voteCard").classList.add("show");
}
function processDelayed(){
 const due=state.delayed.filter(x=>x.due<=state.turn);
 state.delayed=state.delayed.filter(x=>x.due>state.turn);
 if(due.length){
  due.forEach(x=>applyEffects(x.e));
  toast(due.map(x=>x.text).join(" "));
 }
}
function continueGame(){
 state.turn+=3; // each decision advances roughly a quarter
 processDelayed();
 if(currentEvent.final){finishGame();return}
 if(state.eventIndex>=BASE_EVENTS.length){finishGame();return}
 loadEvent();
 window.scrollTo({top:0,behavior:"smooth"});
}
function finishGame(){
 $("#bottomNav").classList.add("hidden");
 show("#endScreen");
 const avg=(state.approval+state.economy+state.britain+state.power)/4;
 let grade=avg>=78?"A+":avg>=70?"A":avg>=64?"B+":avg>=58?"B":avg>=52?"C+":avg>=46?"C":"D";
 const seats=Math.max(220,Math.min(390,Math.round(260+state.approval*1.15+state.power*.35+(state.economy-50)*.45)));
 const won=seats>=326;
 $("#grade").textContent=grade;
 $("#endTitle").textContent=won?"You won another term.":"The voters threw you out.";
 const delivered=promiseScore();
 $("#endSummary").textContent=`Projected seats: ${seats}. You delivered ${delivered}/3 manifesto promises. ${won?"Britain has reluctantly handed you the keys again.":"Someone else now gets to discover why governing is difficult."}`;
 $("#scoreGrid").innerHTML=[
  ["Public approval",Math.round(state.approval)+"%"],
  ["Economy",Math.round(state.economy)+"/100"],
  ["Britain",Math.round(state.britain)+"/100"],
  ["Political power",Math.round(state.power)+"/100"],
  ["Treasury",Math.round(state.treasury)+"/100"],
  ["Projected seats",seats]
 ].map(([a,b])=>`<div class="score"><small>${a}</small><b>${b}</b></div>`).join("");
 clearSave();
}
function promiseScore(){
 let n=0;
 state.promises.forEach(p=>{
  if(p==="nhs"&&state.britain>=55)n++;
  if(p==="housing"&&state.housing>=52)n++;
  if(p==="growth"&&state.economy>=65)n++;
  if(p==="tax"&&state.treasury>=52)n++;
  if(p==="crime"&&state.britain>=55)n++;
  if(p==="climate"&&state.economy>=60&&state.britain>=55)n++;
 });
 return n;
}
function toast(msg){
 const t=$("#toast");t.textContent="⏳ Consequence: "+msg;t.classList.add("show");
 setTimeout(()=>t.classList.remove("show"),5000);
}
function navToast(name){
 const map={
  parliament:"Major bills trigger live Commons votes. Your majority and political power affect the result.",
  nation:"Regional opinion shifts with your national approval and decisions.",
  cabinet:"Minister loyalty rises and falls with your political strength.",
  events:"Past decisions can trigger delayed consequences several turns later.",
  no10:"The Red Box is where the game happens. Make the next decision."
 };
 toast(map[name]);
}
$("#startBtn").addEventListener("click",()=>{
 show("#gameScreen");$("#bottomNav").classList.remove("hidden");state.turn=0;loadEvent();
});
$("#continueBtn").addEventListener("click",continueGame);
$("#restartBtn").addEventListener("click",()=>{
 state=freshState();renderPromises();show("#startScreen");$("#bottomNav").classList.add("hidden");window.scrollTo(0,0);
});
document.querySelectorAll(".navbtn").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".navbtn").forEach(x=>x.classList.remove("active"));b.classList.add("active");navToast(b.dataset.nav);
}));
state=freshState();
renderPromises();
