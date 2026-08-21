// Experience shell: onboarding and one-step-at-a-time gameplay.
(() => {
  const byId=id=>document.getElementById(id);
  const toTop=()=>window.scrollTo({top:0,behavior:'smooth'});
  const open=id=>{show('#'+id);toTop();};
  const stage=id=>switchStage(id);

  function resetToTitle(){state=freshState();currentEvent=null;locked=false;consulted=new Set();renderPromises();open('titleScreen');}
  function openHow(){byId('howModal').classList.remove('hidden');}
  function closeHow(){byId('howModal').classList.add('hidden');}

  byId('takeOfficeBtn').addEventListener('click',()=>open('electionScreen'));
  byId('electionNextBtn').addEventListener('click',()=>open('manifestoScreen'));
  byId('howBtn').addEventListener('click',openHow);
  byId('closeHowBtn').addEventListener('click',closeHow);
  byId('modalBackdrop').addEventListener('click',closeHow);
  byId('modalPlayBtn').addEventListener('click',()=>{closeHow();open('electionScreen');});

  byId('addPromiseBtn').addEventListener('click',()=>{
    const input=byId('customPromise'),value=input.value.trim();
    if(!value)return;
    if(totalPromises()>=3){toast('You already have three promises. Remove one first.');return;}
    state.customPromises.push(value);input.value='';renderPromises();
  });
  byId('customPromise').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();byId('addPromiseBtn').click();}});
  byId('startBtn').addEventListener('click',()=>{if(totalPromises()===3)open('arrivalScreen');});
  byId('openBoxBtn').addEventListener('click',()=>{open('gameScreen');loadEvent();});

  byId('situationNextBtn').addEventListener('click',()=>stage('stageSystem'));
  byId('systemNextBtn').addEventListener('click',()=>stage('stageAdvice'));
  byId('adviceNextBtn').addEventListener('click',()=>stage('stageDecision'));
  document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>stage(b.dataset.back)));

  byId('reactionNextBtn').addEventListener('click',()=>{
    document.querySelectorAll('.outcome-step').forEach(x=>x.classList.remove('active'));
    byId('outcomeNumbers').classList.add('active');
    byId('outcomeFlow').scrollIntoView({behavior:'smooth',block:'start'});
  });
  byId('numbersNextBtn').addEventListener('click',()=>{
    document.querySelectorAll('.outcome-step').forEach(x=>x.classList.remove('active'));
    byId('outcomeMedia').classList.add('active');
    byId('outcomeFlow').scrollIntoView({behavior:'smooth',block:'start'});
  });
  byId('continueBtn').addEventListener('click',continueGame);

  byId('homeBtn').addEventListener('click',resetToTitle);
  byId('restartBtn').addEventListener('click',resetToTitle);
  byId('shareBtn').addEventListener('click',async()=>{
    const legacy=byId('grade').textContent,title=byId('endTitle').textContent;
    const text=`I became ${legacy} in Your Move, Prime Minister. ${title} Think you could do better?`;
    try{if(navigator.share)await navigator.share({title:'Your Move, Prime Minister',text,url:location.href});else if(navigator.clipboard){await navigator.clipboard.writeText(`${text} ${location.href}`);toast('Result copied to clipboard.');}}catch(_){}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeHow();});
})();
