(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  let pendingChanges = 0;
  let tutorialStep = 0;
  let tutorialComplete = false;

  function guideActions(){
    let wrap = $('#guideActions');
    if(!wrap){
      wrap = document.createElement('div');
      wrap.id = 'guideActions';
      wrap.className = 'guide-actions';
      $('.turn-guide-copy')?.appendChild(wrap);
    }
    return wrap;
  }

  function setGuide(label,title,detail,primaryLabel,primaryAction,secondaryLabel='',secondaryAction=null){
    if(!$('#turnInstruction')) return;
    $('#turnPhase').textContent = label;
    $('#turnInstruction').textContent = title;
    $('#turnDetail').innerHTML = detail;
    const actions = guideActions();
    actions.innerHTML = '';
    if(primaryLabel){
      const p = document.createElement('button');
      p.className = 'guide-primary';
      p.textContent = primaryLabel;
      p.onclick = primaryAction;
      actions.appendChild(p);
    }
    if(secondaryLabel){
      const s = document.createElement('button');
      s.className = 'guide-secondary';
      s.textContent = secondaryLabel;
      s.onclick = secondaryAction;
      actions.appendChild(s);
    }
  }

  function clearTargets(){
    $$('.tutorial-target,.tutorial-muted').forEach(x=>x.classList.remove('tutorial-target','tutorial-muted'));
    $('#advanceBtn')?.classList.remove('tutorial-target');
  }

  function lockForFirstMonth(on){
    const sim = $('#simScreen');
    sim?.classList.toggle('first-month-tutorial',on);
    $$('.sim-tab[data-tab="policy"],.sim-tab[data-tab="government"]').forEach(b=>b.disabled=on);
  }

  function highlightHealth(){
    clearTargets();
    const health = $('[data-pressure="health"]');
    health?.classList.add('tutorial-target');
    $$('.pressure-card').filter(x=>x!==health).forEach(x=>x.classList.add('tutorial-muted'));
    health?.scrollIntoView({behavior:'smooth',block:'center'});
  }

  function highlightHealthBudget(){
    clearTargets();
    const plus = $('[data-budget="health"][data-dir="1"]');
    const row = plus?.closest('.budget-row');
    row?.classList.add('tutorial-target');
    $$('.budget-row').filter(x=>x!==row).forEach(x=>x.classList.add('tutorial-muted'));
    row?.scrollIntoView({behavior:'smooth',block:'center'});
  }

  function showFirstStep(){
    tutorialStep = 0;
    lockForFirstMonth(true);
    document.querySelector('.sim-tab[data-tab="britain"]')?.click();
    setGuide(
      'FIRST MONTH · 1 OF 3',
      'Start with one problem: NHS pressure is severe.',
      'You do not need to understand the whole screen. <b>Tap NHS pressure</b> to see what is wrong and what government can influence.',
      'Open NHS pressure →',
      ()=> $('[data-pressure="health"]')?.click()
    );
    $('#pendingBanner')?.classList.remove('changed');
    if($('#pendingText')) $('#pendingText').textContent = 'Nothing has changed yet. First, inspect one problem.';
    setTimeout(highlightHealth,80);
  }

  function decorateHealthModal(){
    const content = $('#detailContent');
    if(!content || $('#firstTutorialModalAction')) return;
    const box = document.createElement('div');
    box.id = 'firstTutorialModalAction';
    box.className = 'tutorial-modal-action';
    box.innerHTML = `<small>YOUR FIRST ACTION</small><b>Try increasing NHS funding once.</b><p>This will cost more now, while any improvement takes time.</p><button>Show me NHS spending →</button>`;
    content.appendChild(box);
    box.querySelector('button').onclick = ()=>{
      $('[data-close="detailModal"]')?.click();
      document.querySelector('.sim-tab[data-tab="budget"]')?.click();
      tutorialStep = 1;
      setGuide(
        'FIRST MONTH · 2 OF 3',
        'Increase NHS spending by £5bn.',
        'This is a <b>government spending decision</b>, not a game setting. Tap the <b>+</b> once beside NHS & health.',
        'Show NHS spending →',
        ()=> highlightHealthBudget()
      );
      setTimeout(highlightHealthBudget,80);
    };
  }

  function showEndMonthStep(){
    tutorialStep = 2;
    clearTargets();
    const end = $('#advanceBtn');
    end?.classList.add('tutorial-target');
    setGuide(
      'FIRST MONTH · 3 OF 3',
      'Good. Now let Britain respond.',
      'You raised NHS spending. The effect is <b>not instant</b>. End Month 1 and time will move forward.',
      'End Month 1 →',
      ()=> end?.click()
    );
    $('#pendingBanner')?.classList.add('changed');
    if($('#pendingText')) $('#pendingText').textContent = 'NHS spending changed. End the month to run the simulation.';
    end?.scrollIntoView({behavior:'smooth',block:'center'});
  }

  function getRecommendation(){
    const number = id => Number(($(id)?.textContent||'0').replace(/[^0-9.-]/g,''));
    const options = [
      {name:'NHS pressure',score:number('#healthScore'),selector:'[data-pressure="health"]'},
      {name:'Housing pressure',score:number('#housingScore'),selector:'[data-pressure="housing"]'},
      {name:'Transport pressure',score:number('#transportScore'),selector:'[data-pressure="transport"]'},
      {name:'Economic weakness',score:100-number('#economyScore'),selector:'[data-pressure="economy"]'}
    ];
    return options.sort((a,b)=>b.score-a.score)[0];
  }

  function showNormalGuide(){
    clearTargets();
    lockForFirstMonth(false);
    const rec = getRecommendation();
    const month = $('#monthLabel')?.textContent || 'This month';
    if(pendingChanges>0){
      setGuide(
        'YOUR TURN',
        `${pendingChanges} change${pendingChanges===1?'':'s'} made.`,
        'Your decisions are set for this month. The clearest next step is to <b>end the month</b> and see what happens.',
        'End month →',
        ()=>$('#advanceBtn')?.click(),
        'Keep changing things',
        ()=>document.querySelector('.sim-tab[data-tab="budget"]')?.click()
      );
      $('#advanceBtn')?.classList.add('tutorial-target');
      $('#pendingBanner')?.classList.add('changed');
      if($('#pendingText')) $('#pendingText').textContent = `${pendingChanges} government change${pendingChanges===1?'':'s'} made this month.`;
    } else {
      setGuide(
        'YOUR NEXT MOVE',
        `${rec.name} is the clearest pressure right now.`,
        `${month} is active. You can inspect this issue and intervene, or <b>end the month without changing anything</b>.`,
        `Inspect ${rec.name.replace(' pressure','')} →`,
        ()=>$(rec.selector)?.click(),
        'End month without changes',
        ()=>$('#advanceBtn')?.click()
      );
      $('#pendingBanner')?.classList.remove('changed');
      if($('#pendingText')) $('#pendingText').textContent = 'No changes made this month.';
    }
  }

  function finishTutorial(){
    tutorialComplete = true;
    pendingChanges = 0;
    lockForFirstMonth(false);
    clearTargets();
    $('.turn-guide')?.classList.add('tutorial-finished');
    setTimeout(showNormalGuide,80);
  }

  // Existing step tiles were too abstract. Keep them out of the way; the guide now gives one action at a time.
  $('.turn-steps')?.classList.add('hidden-by-guide');

  $('#enterGovernmentBtn')?.addEventListener('click',()=>setTimeout(showFirstStep,120));

  document.addEventListener('click',e=>{
    const pressure = e.target.closest('[data-pressure="health"]');
    if(!tutorialComplete && tutorialStep===0 && pressure){
      tutorialStep = 0.5;
      setTimeout(decorateHealthModal,80);
    }

    const change = e.target.closest('.budget-control button,.policy-level,#introduceBillBtn');
    if(change){
      if(!tutorialComplete && tutorialStep===1 && change.matches('[data-budget="health"][data-dir="1"]')){
        pendingChanges = 1;
        setTimeout(showEndMonthStep,80);
      } else if(tutorialComplete){
        pendingChanges += 1;
        setTimeout(showNormalGuide,80);
      }
    }
  });

  $$('.sim-tab').forEach(b=>b.addEventListener('click',()=>{
    if(tutorialComplete && pendingChanges===0) setTimeout(showNormalGuide,40);
  }));

  $('#guideEndMonth')?.addEventListener('click',()=>$('#advanceBtn')?.click());

  $('#advanceBtn')?.addEventListener('click',()=>{
    if(!tutorialComplete && tutorialStep===2){
      setTimeout(finishTutorial,140);
    } else if(tutorialComplete){
      pendingChanges = 0;
      setTimeout(showNormalGuide,140);
    }
  });

  // The title screen exists before play begins, so do not show active-play guidance until the player enters No.10.
  if($('#simScreen')?.classList.contains('active')) showNormalGuide();
})();
