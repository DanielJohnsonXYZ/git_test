(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  let pendingChanges = 0;

  function setActiveStep(step){
    $$('.turn-step').forEach(x=>x.classList.remove('active'));
    const target = document.querySelector(`.turn-step:nth-child(${step})`);
    if(target) target.classList.add('active');
  }

  function updateGuide(mode='review'){
    const phase = $('#turnPhase'), instruction = $('#turnInstruction'), detail = $('#turnDetail');
    const pending = $('#pendingBanner'), pendingText = $('#pendingText'), endStep = $('#guideEndMonth');
    if(!phase || !instruction || !detail) return;

    phase.textContent = 'YOUR TURN';
    if(mode==='changed' || pendingChanges>0){
      instruction.textContent = 'You have changed government policy this month.';
      detail.innerHTML = `You have <b>${pendingChanges} change${pendingChanges===1?'':'s'}</b> queued. End the month when you are ready to let Britain respond.`;
      pending.classList.add('changed');
      pendingText.textContent = `${pendingChanges} government change${pendingChanges===1?'':'s'} made this month.`;
      endStep.classList.add('ready');
      setActiveStep(3);
      $('.sim-toolbar')?.classList.add('guided');
    } else if(mode==='act'){
      instruction.textContent = 'Change something only if you think Britain needs it.';
      detail.innerHTML = 'Spending and Policy levers are <b>government decisions</b>, not game settings. You can make changes or leave policy exactly as it is.';
      pending.classList.remove('changed');
      pendingText.textContent = 'No government changes made this month.';
      endStep.classList.add('ready');
      setActiveStep(2);
    } else {
      instruction.textContent = 'Start by checking what needs attention.';
      detail.innerHTML = 'You are actively playing this month. Inspect Britain, make any changes you want, then press <b>End month</b> to move time forward.';
      pending.classList.remove('changed');
      pendingText.textContent = 'No government changes made this month.';
      endStep.classList.remove('ready');
      setActiveStep(1);
      $('.sim-toolbar')?.classList.remove('guided');
    }
  }

  function noteChange(){
    pendingChanges += 1;
    updateGuide('changed');
  }

  document.querySelectorAll('[data-guide-tab]').forEach(b=>{
    b.addEventListener('click',()=>{
      const tab=b.dataset.guideTab;
      document.querySelector(`.sim-tab[data-tab="${tab}"]`)?.click();
      updateGuide(tab==='britain'?'review':'act');
    });
  });

  $('#guideEndMonth')?.addEventListener('click',()=>$('#advanceBtn')?.click());

  $$('.sim-tab').forEach(b=>b.addEventListener('click',()=>{
    const tab=b.dataset.tab;
    if(tab==='budget'||tab==='policy'||tab==='government') updateGuide('act');
    else if(pendingChanges===0) updateGuide('review');
  }));

  document.addEventListener('click',e=>{
    const target=e.target.closest('.budget-control button,.policy-level,#introduceBillBtn');
    if(target) setTimeout(noteChange,0);
  });

  $('#advanceBtn')?.addEventListener('click',()=>{
    setTimeout(()=>{
      pendingChanges=0;
      updateGuide('review');
      const month=$('#monthLabel')?.textContent || 'New month';
      $('#turnInstruction').textContent = `${month} has begun. What needs your attention now?`;
      $('#turnDetail').innerHTML = 'Review what changed last month. You can intervene again, or simply end this month without changing anything.';
    },0);
  });

  $('#enterGovernmentBtn')?.addEventListener('click',()=>setTimeout(()=>updateGuide('review'),0));
  updateGuide('review');
})();
