// Experience shell: onboarding, explainers, external shocks and sharing.
(() => {
  const byId=id=>document.getElementById(id);
  const toTop=()=>window.scrollTo({top:0,behavior:'smooth'});
  const open=id=>{show('#'+id);toTop();};

  // Interrupt the normal domestic agenda with events the PM did not choose.
  const normalPickEvent=pickEvent;
  pickEvent=function(){
    state.externalSeen=state.externalSeen||{};
    if(state.eventIndex>=4&&!state.externalSeen.europe){state.externalSeen.europe=true;return EXTERNAL_EVENTS[0];}
    if(state.eventIndex>=11&&!state.externalSeen.shipping){state.externalSeen.shipping=true;return EXTERNAL_EVENTS[1];}
    return normalPickEvent();
  };

  function resetToTitle(){state=freshState();currentEvent=null;locked=false;renderPromises();open('titleScreen');}
  function openHow(){byId('howModal').classList.remove('hidden');}
  function closeHow(){byId('howModal').classList.add('hidden');}
  function openStats(){byId('statsModal').classList.remove('hidden');}
  function closeStats(){byId('statsModal').classList.add('hidden');}

  byId('takeOfficeBtn').addEventListener('click',()=>open('electionScreen'));
  byId('electionNextBtn').addEventListener('click',()=>open('manifestoScreen'));
  byId('howBtn').addEventListener('click',openHow);
  byId('closeHowBtn').addEventListener('click',closeHow);
  byId('modalBackdrop').addEventListener('click',closeHow);
  byId('modalPlayBtn').addEventListener('click',()=>{closeHow();open('electionScreen');});

  byId('addPromiseBtn').addEventListener('click',()=>{
    const input=byId('customPromise');const value=input.value.trim();
    if(!value)return;
    if(totalPromises()>=3){toast('You already have three manifesto promises. Remove one first.');return;}
    state.customPromises.push(value);input.value='';renderPromises();
  });
  byId('customPromise').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();byId('addPromiseBtn').click();}});

  byId('startBtn').addEventListener('click',()=>{if(totalPromises()===3)open('powersScreen');});
  byId('powersNextBtn').addEventListener('click',()=>open('arrivalScreen'));
  byId('openBoxBtn').addEventListener('click',()=>{state.turn=0;open('gameScreen');loadEvent();setTimeout(()=>toast('First lesson: read the system before making the decision.'),400);});
  byId('revealChoicesBtn').addEventListener('click',revealChoices);
  byId('continueBtn').addEventListener('click',continueGame);
  byId('restartBtn').addEventListener('click',resetToTitle);
  byId('homeBtn').addEventListener('click',resetToTitle);

  byId('statsHelpBtn').addEventListener('click',openStats);
  byId('closeStatsBtn').addEventListener('click',closeStats);
  byId('statsBackdrop').addEventListener('click',closeStats);

  byId('shareBtn').addEventListener('click',async()=>{
    const grade=byId('grade').textContent,title=byId('endTitle').textContent;
    const text=`I got a ${grade} running Britain in Your Move, Prime Minister. ${title} Think you could do better?`;
    try{if(navigator.share)await navigator.share({title:'Your Move, Prime Minister',text,url:location.href});else if(navigator.clipboard){await navigator.clipboard.writeText(`${text} ${location.href}`);toast('Result copied to clipboard.');}}catch(_){}
  });

  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeHow();closeStats();}});
})();
