(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
  const money = (n) => `${n < 0 ? '-' : ''}£${Math.abs(Math.round(n))}bn`;

  const PROMISES = [
    ['nhs','🏥','Cut NHS waiting lists'],['housing','🏠','Build more homes'],['growth','📈','Grow the economy'],
    ['tax','💷','Keep taxes down'],['crime','🚔','Cut crime'],['climate','⚡','Secure clean energy']
  ];
  const REGIONS = ['Scotland','North','Midlands','Wales','London','South'];

  const BUDGETS = {
    health:{label:'NHS & health',icon:'🏥',amount:190,min:170,max:220,step:5,baseline:190,note:'Pay, hospitals and capacity'},
    education:{label:'Education',icon:'🎓',amount:115,min:95,max:140,step:5,baseline:115,note:'Schools, colleges and teachers'},
    housing:{label:'Housing & local government',icon:'🏠',amount:42,min:25,max:70,step:3,baseline:42,note:'Social housing and councils'},
    transport:{label:'Transport',icon:'🚆',amount:38,min:25,max:65,step:3,baseline:38,note:'Rail, roads and infrastructure'},
    defence:{label:'Defence',icon:'🛡️',amount:58,min:45,max:85,step:3,baseline:58,note:'Forces, equipment and commitments'}
  };

  const POLICIES = {
    planning:{label:'Planning rules',icon:'🏗️',desc:'How easy it is to approve new homes and infrastructure.',levels:['Strict','Balanced','Liberal'],value:1,effect:'More liberal rules increase housebuilding over time but can create local political resistance.'},
    incomeTax:{label:'Income tax',icon:'💷',desc:'Broad tax burden on household income.',levels:['Lower','Current','Higher'],value:1,effect:'Higher tax improves revenue but reduces disposable income and may hurt polling.'},
    workVisas:{label:'Work visas',icon:'🛂',desc:'Access to overseas workers for the UK labour market.',levels:['Restrictive','Managed','Open'],value:1,effect:'More openness can support growth and staffing while increasing housing and service demand.'},
    cleanEnergy:{label:'Clean energy buildout',icon:'⚡',desc:'How aggressively government pushes grids, wind and nuclear.',levels:['Slow','Steady','Fast'],value:1,effect:'Faster buildout costs more now but improves resilience and energy security later.'},
    sentencing:{label:'Sentencing policy',icon:'⚖️',desc:'Balance between custody and alternatives.',levels:['Rehabilitative','Current','Tougher'],value:1,effect:'Tougher sentencing may please some voters but increases prison demand.'},
    businessTax:{label:'Business tax',icon:'🏢',desc:'Tax environment for company profits and investment.',levels:['Lower','Current','Higher'],value:1,effect:'Lower rates can support investment but reduce revenue.'}
  };

  const PRESSURE_INFO = {
    health:{title:'NHS pressure',icon:'🏥',what:'Waiting lists, staff pressure and hospital capacity.',control:'Funding, pay and workforce policy can improve capacity, but results arrive slowly.',watch:'Higher health spending improves this with a delay. Strikes and winter pressure can make it worse quickly.'},
    housing:{title:'Housing affordability',icon:'🏠',what:'The pressure created by rents, prices and insufficient supply.',control:'Planning rules, infrastructure and housing spending influence supply. Government cannot create homes instantly.',watch:'Liberal planning plus housing investment improves supply after several months.'},
    economy:{title:'The economy',icon:'📈',what:'A simplified mix of growth, investment, jobs and resilience.',control:'Taxes, infrastructure and policy influence growth; global shocks and interest rates remain partly outside government control.',watch:'Business confidence and investment respond gradually to policy.'},
    transport:{title:'Transport pressure',icon:'🚆',what:'Reliability and capacity across rail and major infrastructure.',control:'Government can fund upgrades and set structures, but large projects take years.',watch:'Cutting investment saves money today and creates reliability problems later.'}
  };

  const CRISES = [
    {month:3,id:'doctors',icon:'🏥',title:'Doctors vote to strike',text:'Junior doctors announce five days of industrial action. The government can fund a settlement, seek compromise or hold the line.',choices:[
      {label:'Offer 8%',sub:'Fast settlement, high recurring cost',apply:s=>{s.treasury-=4;s.healthPressure-=8;s.polls+=3;s.partyUnity-=1;addRecord('NHS strike','Offered 8% pay settlement');addNews('POLITICS','Doctors call off strike after improved pay offer.');}},
      {label:'Offer 5% + reform',sub:'Compromise with slower delivery',apply:s=>{s.treasury-=2;s.healthPressure-=4;s.delivery+=2;s.polls+=1;queueEffect(5,'NHS productivity reforms begin to improve capacity',()=>{s.healthPressure-=6;s.services+=3;});addRecord('NHS strike','Offered 5% plus reform');}},
      {label:'Refuse to move',sub:'Protect the Treasury, prolong dispute',apply:s=>{s.treasury+=1;s.healthPressure+=8;s.polls-=4;s.partyUnity+=1;queueEffect(3,'The continuing strike pushes waiting lists higher',()=>{s.healthPressure+=5;s.services-=3;});addRecord('NHS strike','Refused a higher pay offer');}}
    ]},
    {month:8,id:'europe',icon:'🌍',title:'War escalates in Europe',text:'A major European war intensifies. Allies ask Britain to increase military and financial support while energy markets become nervous.',choices:[
      {label:'Increase military support',sub:'Stronger alliance, higher cost',apply:s=>{s.treasury-=4;s.defencePressure-=4;s.polls+=1;s.partyUnity+=2;BUDGETS.defence.amount+=3;addRecord('European war','Increased military support');addNews('WORLD','Britain announces a larger military support package.');}},
      {label:'Lead a diplomatic push',sub:'Lower cost, uncertain impact',apply:s=>{s.treasury-=1;s.polls+=1;s.partyUnity+=1;s.economy-=1;addRecord('European war','Prioritised diplomacy');addNews('WORLD','Prime Minister pushes new diplomatic initiative with allies.');}},
      {label:'Limit further involvement',sub:'Protect resources at home',apply:s=>{s.treasury+=2;s.partyUnity-=4;s.polls-=2;addRecord('European war','Limited further involvement');addNews('WORLD','Allies express disappointment at UK reluctance to expand support.');}}
    ]},
    {month:15,id:'rail',icon:'🚆',title:'Rail network hits a reliability crisis',text:'A week of severe disruption triggers demands for emergency investment and compensation.',choices:[
      {label:'Fund a major upgrade',sub:'Expensive, structural fix',apply:s=>{BUDGETS.transport.amount+=6;s.treasury-=4;s.transportPressure-=5;queueEffect(8,'Rail upgrades start improving reliability',()=>{s.transportPressure-=9;s.economy+=2;});addRecord('Rail crisis','Funded a major upgrade');}},
      {label:'Compensate passengers',sub:'Cheaper immediate relief',apply:s=>{s.treasury-=1;s.polls+=2;s.transportPressure-=1;addRecord('Rail crisis','Compensated passengers');}},
      {label:'Demand operator reform',sub:'Low cost, limited immediate effect',apply:s=>{s.polls+=1;s.partyUnity+=1;s.transportPressure+=2;addRecord('Rail crisis','Demanded operator reform');}}
    ]},
    {month:24,id:'fiscal',icon:'💷',title:'The forecasts deteriorate',text:'The Treasury says borrowing is now running well above plan. Markets want to know whether you will raise revenue, cut spending or tolerate more debt.',choices:[
      {label:'Raise income tax',sub:'Revenue now, political pain',apply:s=>{POLICIES.incomeTax.value=2;s.treasury+=8;s.polls-=5;s.economy-=1;addRecord('Fiscal squeeze','Raised income tax');}},
      {label:'Order spending restraint',sub:'Protect taxes, pressure services',apply:s=>{Object.values(BUDGETS).forEach(b=>b.amount=Math.max(b.min,b.amount-3));s.treasury+=6;s.services-=4;s.polls-=2;addRecord('Fiscal squeeze','Ordered spending restraint');}},
      {label:'Borrow through it',sub:'Avoid pain now, higher future risk',apply:s=>{s.treasury-=5;s.debtPressure+=10;s.polls+=2;queueEffect(6,'Higher debt servicing costs squeeze fiscal room',()=>{s.treasury-=5;s.economy-=2;});addRecord('Fiscal squeeze','Borrowed through the gap');}}
    ]},
    {month:36,id:'cyber',icon:'💻',title:'Government systems hit by a cyberattack',text:'A contractor serving several departments is compromised. Some public services are disrupted and the scale is not yet clear.',choices:[
      {label:'Disclose immediately',sub:'Transparent, facts still incomplete',apply:s=>{s.polls+=1;s.delivery-=2;addRecord('Cyberattack','Disclosed immediately');addNews('SECURITY','Government confirms major cyber incident and launches investigation.');}},
      {label:'Wait for full facts',sub:'More certainty, risk looking secretive',apply:s=>{s.partyUnity-=1;queueEffect(2,'Journalists reveal the breach before the official statement',()=>{s.polls-=4;s.partyUnity-=2;});addRecord('Cyberattack','Delayed disclosure');}},
      {label:'Shut systems down aggressively',sub:'Safer technically, more disruption',apply:s=>{s.delivery-=5;s.polls-=1;queueEffect(3,'Security teams restore services with stronger controls',()=>{s.delivery+=5;});addRecord('Cyberattack','Shut down affected systems');}}
    ]},
    {month:48,id:'energy',icon:'⚡',title:'Global energy prices surge',text:'An international supply shock pushes gas and electricity prices sharply higher. Household bills are forecast to jump.',choices:[
      {label:'Cap household bills',sub:'Protect households, large Treasury cost',apply:s=>{s.treasury-=7;s.polls+=5;s.economy+=1;addRecord('Energy shock','Capped household bills');}},
      {label:'Accelerate clean energy',sub:'Less immediate relief, structural response',apply:s=>{POLICIES.cleanEnergy.value=2;s.treasury-=3;s.polls+=1;queueEffect(7,'New energy capacity reduces exposure to global gas prices',()=>{s.economy+=4;s.treasury+=2;});addRecord('Energy shock','Accelerated clean energy');}},
      {label:'Let prices pass through',sub:'Protect Treasury, household pain',apply:s=>{s.treasury+=2;s.polls-=5;s.economy-=3;addRecord('Energy shock','Allowed prices to rise');}}
    ]}
  ];

  let state;
  let pendingEffects = [];
  let news = [];
  let crisisHandled = new Set();

  function freshState(){
    return {month:0,polls:52,treasury:24,majority:24,partyUnity:73,delivery:58,services:48,economy:61,healthPressure:72,housingPressure:68,transportPressure:55,defencePressure:40,debtPressure:48,revenue:1100,baseSpending:707,regions:{Scotland:49,North:51,Midlands:52,Wales:50,London:55,South:52},promises:[],customPromises:[],record:[],billIntroduced:false,billPassed:false};
  }

  function show(id){$$('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}
  function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3800);}
  function addNews(section,headline,body=''){news.unshift({section,headline,body,month:state.month});news=news.slice(0,20);renderNews();}
  function addRecord(issue,action){state.record.unshift({month:Math.max(1,state.month),issue,action});renderGovernment();}
  function queueEffect(after,label,fn){pendingEffects.push({due:state.month+after,label,fn});}

  function renderPromises(){
    const grid=$('#promiseGrid');grid.innerHTML='';
    PROMISES.forEach(([id,icon,label])=>{const b=document.createElement('button');b.className='promise'+(state.promises.includes(id)?' selected':'');b.innerHTML=`<b>${icon} ${label}</b><span class="muted">Voters will remember this</span>`;b.onclick=()=>{const i=state.promises.indexOf(id);if(i>=0)state.promises.splice(i,1);else if(totalPromises()<3)state.promises.push(id);renderPromises();};grid.appendChild(b);});
    state.customPromises.forEach((label,i)=>{const b=document.createElement('button');b.className='promise selected';b.innerHTML=`<b>✍️ ${label}</b><span class="muted">Custom promise</span>`;b.onclick=()=>{state.customPromises.splice(i,1);renderPromises();};grid.appendChild(b);});
    $('#promiseCount').textContent=totalPromises();$('#startBtn').disabled=totalPromises()!==3;$('#startBtn').textContent=totalPromises()===3?'Lock in manifesto →':`Choose ${3-totalPromises()} more`;
  }
  function totalPromises(){return state.promises.length+state.customPromises.length;}

  function budgetSpending(){return state.baseSpending+Object.values(BUDGETS).reduce((sum,b)=>sum+b.amount,0);}
  function taxRevenue(){let revenue=state.revenue;if(POLICIES.incomeTax.value===0)revenue-=35;if(POLICIES.incomeTax.value===2)revenue+=38;if(POLICIES.businessTax.value===0)revenue-=18;if(POLICIES.businessTax.value===2)revenue+=20;return revenue;}
  function annualBalance(){return taxRevenue()-budgetSpending();}

  function renderAll(){renderTop();renderBritain();renderBudget();renderPolicy();renderGovernment();renderNews();}
  function renderTop(){
    $('#monthLabel').textContent=`Month ${Math.min(60,state.month+1)} of 60`;$('#termProgress').style.width=`${state.month/60*100}%`;$('#pollsValue').textContent=`${Math.round(clamp(state.polls))}%`;$('#treasuryValue').textContent=money(state.treasury);$('#majorityValue').textContent=state.majority;
    $('.sim-topbar').classList.remove('flash');void $('.sim-topbar').offsetWidth;$('.sim-topbar').classList.add('flash');
  }
  function pressureText(v,type){if(type==='economy')return v>=70?'Strong':v>=58?'Stable':v>=45?'Weak':'Recession risk';return v>=75?'Critical':v>=62?'Severe':v>=48?'Strained':v>=35?'Improving':'Healthy';}
  function renderBritain(){
    $('#healthScore').textContent=Math.round(state.healthPressure);$('#healthStatus').textContent=pressureText(state.healthPressure,'pressure');
    $('#housingScore').textContent=Math.round(state.housingPressure);$('#housingStatus').textContent=pressureText(state.housingPressure,'pressure');
    $('#economyScore').textContent=Math.round(state.economy);$('#economyStatus').textContent=pressureText(state.economy,'economy');
    $('#transportScore').textContent=Math.round(state.transportPressure);$('#transportStatus').textContent=pressureText(state.transportPressure,'pressure');
    REGIONS.forEach(r=>{$(`#region-${r}`).textContent=`Approval ${Math.round(clamp(state.regions[r]))}%`;const btn=document.querySelector(`[data-region="${r}"]`);const dot=btn.querySelector('.region-dot');dot.className='region-dot '+(state.regions[r]<45?'red':state.regions[r]<55?'amber':'green');});
    const last=state.record[0];$('#monthStoryTitle').textContent=last?last.issue:'Your government takes office';$('#monthStory').textContent=last?last.action:'Britain will keep moving whether you intervene or not. Set priorities, then advance time.';
    $('#miniTrends').innerHTML=[trend('NHS',state.healthPressure<65,'pressure'),trend('Housing',state.housingPressure<60,'pressure'),trend('Economy',state.economy>=58,'score'),trend('Unity',state.partyUnity>=60,'score')].join('');
  }
  function trend(label,good){return `<span class="trend ${good?'good':'bad'}">${good?'↑':'↓'} ${label}</span>`;}

  function renderBudget(){
    const revenue=taxRevenue(),spending=budgetSpending(),balance=revenue-spending;$('#revenueValue').textContent=money(revenue);$('#spendingValue').textContent=money(spending);$('#balanceValue').textContent=money(balance);$('#debtValue').textContent=state.debtPressure>70?'High':state.debtPressure>50?'Medium':'Low';
    $('#budgetList').innerHTML=Object.entries(BUDGETS).map(([id,b])=>`<div class="budget-row"><div class="budget-name"><b>${b.icon} ${b.label}</b><small>${b.note}</small></div><div class="budget-control"><button data-budget="${id}" data-dir="-1">−</button><div class="budget-track"><span style="width:${(b.amount-b.min)/(b.max-b.min)*100}%"></span></div><button data-budget="${id}" data-dir="1">+</button></div><div class="budget-amount"><b>${money(b.amount)}</b><small>${b.amount>b.baseline?'above':b.amount<b.baseline?'below':'at'} baseline</small></div></div>`).join('');
    $$('#budgetList [data-budget]').forEach(b=>b.onclick=()=>adjustBudget(b.dataset.budget,Number(b.dataset.dir)));
  }
  function adjustBudget(id,dir){const b=BUDGETS[id],before=b.amount;b.amount=clamp(b.amount+dir*b.step,b.min,b.max);if(b.amount===before)return;const delta=b.amount-before;state.treasury-=Math.max(0,delta)*.12;addRecord('Budget',`${delta>0?'Raised':'Cut'} ${b.label} by ${money(Math.abs(delta))}`);if(id==='health')queueEffect(3,`${b.label} funding begins affecting NHS capacity`,()=>{state.healthPressure-=delta*.7;state.services+=delta*.25;});if(id==='housing')queueEffect(5,'Housing investment begins affecting supply',()=>{state.housingPressure-=delta*.8;});if(id==='transport')queueEffect(6,'Transport investment begins affecting reliability',()=>{state.transportPressure-=delta*.7;state.economy+=Math.max(0,delta)*.12;});if(id==='education')queueEffect(7,'Education funding begins affecting skills and staffing',()=>{state.services+=delta*.3;state.economy+=Math.max(0,delta)*.1;});if(id==='defence')queueEffect(2,'Defence funding changes readiness',()=>{state.defencePressure-=delta*.5;});renderAll();toast('Budget changed. Most effects will take time.');}

  function renderPolicy(){
    $('#policyGrid').innerHTML=Object.entries(POLICIES).map(([id,p])=>`<div class="policy-card"><div class="policy-card-top"><div><h3>${p.icon} ${p.label}</h3></div><small>${p.levels[p.value]}</small></div><p>${p.desc}</p><div class="policy-levels">${p.levels.map((x,i)=>`<button class="policy-level ${p.value===i?'active':''}" data-policy="${id}" data-level="${i}">${x}</button>`).join('')}</div><div class="policy-effect">${p.effect}</div></div>`).join('');
    $$('#policyGrid [data-policy]').forEach(b=>b.onclick=()=>setPolicy(b.dataset.policy,Number(b.dataset.level)));
  }
  function setPolicy(id,level){const p=POLICIES[id];if(p.value===level)return;const old=p.value;p.value=level;addRecord('Policy',`${p.label}: ${p.levels[old]} → ${p.levels[level]}`);if(id==='planning'){state.partyUnity-=level===2?3:level===0?-1:0;queueEffect(6,'Planning changes begin affecting permissions and housebuilding',()=>{state.housingPressure-=level===2?8:level===0?-3:2;state.economy+=level===2?2:0;});}
    if(id==='incomeTax'){state.polls+=level===0?3:level===2?-4:0;state.economy+=level===0?1:level===2?-1:0;}
    if(id==='workVisas'){state.economy+=level===2?2:level===0?-2:0;queueEffect(4,'Visa rules change labour supply and service demand',()=>{state.healthPressure+=level===2?1:level===0?2:0;state.housingPressure+=level===2?2:level===0?-1:0;});}
    if(id==='cleanEnergy'){state.treasury-=level===2?2:0;queueEffect(8,'Energy projects start affecting resilience and investment',()=>{state.economy+=level===2?3:level===0?-1:1;});}
    if(id==='sentencing'){state.polls+=level===2?1:0;state.delivery-=level===2?2:level===0?-1:0;}
    if(id==='businessTax'){state.economy+=level===0?2:level===2?-1:0;}
    renderAll();toast('Policy changed. Structural effects arrive over time.');
  }

  function renderGovernment(){
    const seats=326+state.majority;$('#govSeats').textContent=seats;$('#govSeatBar').style.width=`${seats/650*100}%`;$('#unityValue').textContent=`${Math.round(clamp(state.partyUnity))}%`;$('#unityText').textContent=state.partyUnity<40?'Your MPs are openly discussing whether the government has lost direction.':state.partyUnity<60?'Backbench rebellions are becoming a serious risk.':'Most MPs are still willing to follow the whip.';$('#capacityValue').textContent=`${Math.round(clamp(state.delivery))}%`;
    const labels=Object.fromEntries(PROMISES.map(x=>[x[0],x[2]]));$('#manifestoList').innerHTML=[...state.promises.map(x=>labels[x]),...state.customPromises].map(x=>`<div>✓ ${x}</div>`).join('');
    $('#recordCount').textContent=`${state.record.length} actions`;$('#recordList').innerHTML=state.record.slice(0,10).map(r=>`<div class="record-item"><small>Month ${r.month}</small><div><b>${r.issue}</b><span>${r.action}</span></div></div>`).join('')||'<p class="muted">No government actions yet.</p>';
    $('#billTitle').textContent=state.billPassed?'Planning Reform Act':state.billIntroduced?'Planning Reform Bill — Commons vote pending':'Planning Reform Bill';$('#billStatus').textContent=state.billPassed?'The bill passed. Planning changes will now move into implementation.':state.billIntroduced?'Your whips are counting votes. Party unity and your majority will decide whether it passes.':'Not yet introduced. Liberalising planning will require Commons support.';$('#introduceBillBtn').textContent=state.billPassed?'Passed ✓':state.billIntroduced?'Hold vote':'Introduce bill';$('#introduceBillBtn').disabled=state.billPassed;
  }

  function renderNews(){
    const ticker=news[0]||{headline:'Markets await the new government\'s first Budget'};$('#tickerText').textContent=ticker.headline;$('#newsList').innerHTML=news.map(n=>`<div class="news-item"><small>${n.section} • MONTH ${Math.max(1,n.month)}</small><b>${n.headline}</b>${n.body?`<p>${n.body}</p>`:''}</div>`).join('')||'<p>No major stories yet.</p>';
  }

  function processMonth(){
    state.month++;
    const balance=annualBalance();state.treasury+=balance/120;state.debtPressure+=balance<0?Math.abs(balance)/180:-1;
    // Natural drift and causal effects.
    state.healthPressure+=1.1-(BUDGETS.health.amount-BUDGETS.health.baseline)*.035;
    state.housingPressure+=.8-(BUDGETS.housing.amount-BUDGETS.housing.baseline)*.025-(POLICIES.planning.value-1)*.5;
    state.transportPressure+=.45-(BUDGETS.transport.amount-BUDGETS.transport.baseline)*.025;
    const taxDrag=(POLICIES.incomeTax.value-1)*.22+(POLICIES.businessTax.value-1)*.18;const investBoost=(BUDGETS.transport.amount-BUDGETS.transport.baseline)*.008+(POLICIES.planning.value-1)*.12+(1-POLICIES.businessTax.value)*.14;state.economy+=investBoost-taxDrag+(Math.random()-.5)*.7;
    state.services+=((BUDGETS.health.amount-BUDGETS.health.baseline)+(BUDGETS.education.amount-BUDGETS.education.baseline))*.01-(state.healthPressure>75?.35:0);
    state.delivery-=Math.max(0,state.record.filter(r=>r.month>=state.month-3).length-5)*.08;state.delivery+=.08;
    state.partyUnity+=(state.polls-50)*.008-(state.treasury<0?.15:0);state.majority=Math.max(0,Math.round(24+(state.partyUnity-73)*.08));
    // Polling reacts to lived outcomes, not every policy click.
    const lived=(state.economy-60)*.025+(55-state.healthPressure)*.018+(58-state.housingPressure)*.012+(60-state.transportPressure)*.008+(state.services-48)*.02;state.polls+=lived+(Math.random()-.5)*.55;
    REGIONS.forEach((r,i)=>{const local=(state.polls-state.regions[r])*.08+(Math.random()-.5)*.45+(r==='London'?(58-state.housingPressure)*.012:0);state.regions[r]+=local;});
    [state].forEach(s=>{s.polls=clamp(s.polls);s.economy=clamp(s.economy);s.healthPressure=clamp(s.healthPressure);s.housingPressure=clamp(s.housingPressure);s.transportPressure=clamp(s.transportPressure);s.partyUnity=clamp(s.partyUnity);s.delivery=clamp(s.delivery);s.services=clamp(s.services);s.debtPressure=clamp(s.debtPressure);});

    const due=pendingEffects.filter(x=>x.due<=state.month);pendingEffects=pendingEffects.filter(x=>x.due>state.month);due.forEach(x=>{x.fn();addNews('GOVERNMENT',x.label);addRecord('Delayed consequence',x.label);toast(`⏳ ${x.label}`);});
    maybeGenerateNews();renderAll();
    const crisis=CRISES.find(c=>c.month===state.month&&!crisisHandled.has(c.id));if(crisis){crisisHandled.add(crisis.id);openCrisis(crisis);return;}
    if(state.month>=60)finishGame();
  }

  function maybeGenerateNews(){
    const stories=[];
    if(state.healthPressure>78)stories.push(['HEALTH','NHS waiting-list pressure reaches a new high']);
    if(state.housingPressure>72)stories.push(['HOUSING','Rents rise again as housing shortage persists']);
    if(state.economy<50)stories.push(['ECONOMY','Business surveys point to weakening growth']);
    if(state.economy>68)stories.push(['ECONOMY','Investment and growth indicators improve']);
    if(state.partyUnity<48)stories.push(['WESTMINSTER','Backbench MPs warn Downing Street to change course']);
    if(state.treasury<0)stories.push(['MARKETS','Treasury headroom turns negative as fiscal pressure builds']);
    if(state.month%6===0)stories.push(['POLITICS',`New poll puts government on ${Math.round(state.polls)}% approval`]);
    if(stories.length){const s=stories[Math.floor(Math.random()*stories.length)];addNews(s[0],s[1]);}
  }

  function openCrisis(c){$('#crisisContent').innerHTML=`<div style="font-size:42px">${c.icon}</div><div class="section-kicker">EXTERNAL EVENT</div><h2>${c.title}</h2><p>${c.text}</p><div class="crisis-choices">${c.choices.map((x,i)=>`<button class="crisis-choice" data-choice="${i}"><b>${x.label}</b><small>${x.sub}</small></button>`).join('')}</div>`;$('#crisisModal').classList.remove('hidden');$$('#crisisContent [data-choice]').forEach(b=>b.onclick=()=>resolveCrisis(c,Number(b.dataset.choice)));}
  function resolveCrisis(c,i){const choice=c.choices[i];choice.apply(state);renderAll();$('#crisisContent').innerHTML=`<div class="section-kicker">DECISION MADE</div><h2>${choice.label}</h2><p>${choice.sub}</p><div class="crisis-result"><b>The country keeps moving.</b><p>Some effects are immediate. Others may appear months later in the simulation.</p></div><button id="closeCrisisBtn" class="primary">Back to Britain →</button>`;$('#closeCrisisBtn').onclick=()=>{$('#crisisModal').classList.add('hidden');if(state.month>=60)finishGame();};}

  function openPressure(id){const p=PRESSURE_INFO[id];const value=id==='health'?state.healthPressure:id==='housing'?state.housingPressure:id==='economy'?state.economy:state.transportPressure;$('#detailContent').innerHTML=`<div style="font-size:38px">${p.icon}</div><div class="section-kicker">HOW THE SYSTEM WORKS</div><h2>${p.title}</h2><p>${p.what}</p><div class="detail-stat"><b>Current state</b><b>${Math.round(value)}</b></div><h3>What government controls</h3><p>${p.control}</p><h3>What to watch</h3><p>${p.watch}</p><div class="detail-actions"><button data-goto="budget"><b>Adjust the Budget</b><small>Change spending that affects this system.</small></button><button data-goto="policy"><b>Change policy</b><small>Alter structural rules and incentives.</small></button></div>`;$('#detailModal').classList.remove('hidden');$$('#detailContent [data-goto]').forEach(b=>b.onclick=()=>{closeModal('detailModal');switchTab(b.dataset.goto);});}
  function openRegion(name){const approval=state.regions[name];const issue=name==='London'?'Housing affordability':name==='North'?'Transport and health':name==='Scotland'?'Public services and constitutional politics':name==='Wales'?'Health and local services':name==='Midlands'?'Growth, housing and transport':'Housing, tax and public services';$('#detailContent').innerHTML=`<div class="section-kicker">REGION</div><h2>${name}</h2><div class="detail-stat"><b>Government approval</b><b>${Math.round(approval)}%</b></div><p><b>Current political pressure:</b> ${issue}.</p><p>Regional opinion is influenced by national polling but also by which problems are most visible locally. The UK is not one uniform electorate.</p>`;$('#detailModal').classList.remove('hidden');}
  function closeModal(id){$('#'+id).classList.add('hidden');}

  function switchTab(tab){$$('.sim-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$$('.sim-panel').forEach(p=>p.classList.toggle('active',p.id===`panel-${tab}`));window.scrollTo({top:Math.max(0,$('.sim-toolbar').offsetTop-20),behavior:'smooth'});}

  function handleBill(){if(state.billPassed)return;if(!state.billIntroduced){state.billIntroduced=true;addRecord('Parliament','Introduced Planning Reform Bill');toast('Bill introduced. Your whips are now counting votes.');renderGovernment();return;}const support=326+state.majority+Math.round((state.partyUnity-60)*.35)-(POLICIES.planning.value===2?8:0)+Math.round((Math.random()-.5)*10);if(support>=326){state.billPassed=true;state.partyUnity-=2;addRecord('Parliament',`Planning Reform Bill passed with ${support} votes`);queueEffect(6,'Planning reform starts lifting housebuilding',()=>{state.housingPressure-=8;state.economy+=2;});addNews('PARLIAMENT','Planning Reform Bill passes the Commons');toast(`Bill passes: ${support} votes.`);}else{state.partyUnity-=5;state.polls-=2;addRecord('Parliament',`Planning Reform Bill defeated with ${support} votes`);addNews('PARLIAMENT','Government suffers Commons defeat on planning');toast(`Bill defeated: only ${support} votes.`);}renderAll();}

  function promiseScore(){let n=0;state.promises.forEach(p=>{if(p==='nhs'&&state.healthPressure<58)n++;if(p==='housing'&&state.housingPressure<57)n++;if(p==='growth'&&state.economy>65)n++;if(p==='tax'&&POLICIES.incomeTax.value<=1)n++;if(p==='crime'&&POLICIES.sentencing.value>=1&&state.delivery>50)n++;if(p==='climate'&&POLICIES.cleanEnergy.value===2)n++;});return n;}
  function finishGame(){const seats=clamp(Math.round(245+state.polls*1.55+(state.economy-55)*.45+(state.partyUnity-55)*.18),180,410),won=seats>=326,delivered=promiseScore();let legacy='THE SURVIVOR';if(state.economy>68&&state.housingPressure<58)legacy='THE BUILDER';else if(state.treasury>18&&state.debtPressure<55)legacy='THE BOOKKEEPER';else if(state.services>58&&state.healthPressure<60)legacy='THE REFORMER';$('#endTitle').textContent=won?'The voters give you another term.':'Your government is over.';$('#grade').textContent=legacy;$('#endSummary').textContent=`You finish with ${seats} projected seats and deliver ${delivered}/${totalPromises()} manifesto promises. ${won?'Britain has handed you the keys again.':'The opposition now gets to discover what the job feels like.'}`;$('#scoreGrid').innerHTML=[['Polls',Math.round(state.polls)+'%'],['Economy',Math.round(state.economy)+'/100'],['NHS pressure',Math.round(state.healthPressure)+'/100'],['Housing pressure',Math.round(state.housingPressure)+'/100'],['Treasury',money(state.treasury)],['Projected seats',seats]].map(([a,b])=>`<div class="score"><small>${a}</small><b>${b}</b></div>`).join('');show('#endScreen');}

  function resetGame(){Object.values(BUDGETS).forEach(b=>b.amount=b.baseline);Object.values(POLICIES).forEach(p=>p.value=1);state=freshState();pendingEffects=[];news=[];crisisHandled=new Set();renderPromises();show('#titleScreen');}

  // Onboarding.
  $('#takeOfficeBtn').onclick=()=>show('#electionScreen');$('#electionNextBtn').onclick=()=>show('#manifestoScreen');$('#startBtn').onclick=()=>{if(totalPromises()===3)show('#arrivalScreen');};$('#enterGovernmentBtn').onclick=()=>{show('#simScreen');addNews('POLITICS','A new government enters Downing Street');renderAll();};$('#homeBtn').onclick=resetGame;$('#restartBtn').onclick=resetGame;
  $('#addPromiseBtn').onclick=()=>{const i=$('#customPromise'),v=i.value.trim();if(!v)return;if(totalPromises()>=3){toast('Remove a promise before adding another.');return;}state.customPromises.push(v);i.value='';renderPromises();};$('#customPromise').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#addPromiseBtn').click();}});
  $('#howBtn').onclick=()=>$('#howModal').classList.remove('hidden');$('#closeHowBtn').onclick=()=>$('#howModal').classList.add('hidden');$('#modalBackdrop').onclick=()=>$('#howModal').classList.add('hidden');$('#modalPlayBtn').onclick=()=>{$('#howModal').classList.add('hidden');show('#electionScreen');};

  // Simulation controls.
  $$('.sim-tab').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));$('#advanceBtn').onclick=processMonth;$$('[data-pressure]').forEach(b=>b.onclick=()=>openPressure(b.dataset.pressure));$$('[data-region]').forEach(b=>b.onclick=()=>openRegion(b.dataset.region));$$('[data-close]').forEach(b=>b.onclick=()=>closeModal(b.dataset.close));$('#openNewsBtn').onclick=()=>{$('#newsModal').classList.remove('hidden');renderNews();};$('#introduceBillBtn').onclick=handleBill;

  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#howModal').classList.add('hidden');closeModal('detailModal');closeModal('newsModal');}});

  state=freshState();renderPromises();renderAll();
})();
