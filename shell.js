// Experience shell for title, onboarding, arrival and sharing.
(() => {
  const byId = id => document.getElementById(id);
  const hiddenSave = document.createElement('span');
  hiddenSave.id = 'saveStatus';
  hiddenSave.className = 'hidden';
  document.body.appendChild(hiddenSave);

  const originalRenderPromises = window.renderPromises;
  window.renderPromises = function(){
    originalRenderPromises();
    const counter = byId('promiseCount');
    if(counter) counter.textContent = state.promises.length;
  };
  renderPromises();

  function toTop(){ window.scrollTo({top:0,behavior:'smooth'}); }
  function resetToTitle(){
    state = freshState();
    currentEvent = null;
    locked = false;
    renderPromises();
    byId('bottomNav').classList.add('hidden');
    document.querySelectorAll('.navbtn').forEach((b,i)=>b.classList.toggle('active',i===0));
    show('#titleScreen');
    toTop();
  }
  function openHow(){ byId('howModal').classList.remove('hidden'); }
  function closeHow(){ byId('howModal').classList.add('hidden'); }
  function goToManifesto(){ closeHow(); show('#manifestoScreen'); toTop(); }

  byId('takeOfficeBtn').addEventListener('click', goToManifesto);
  byId('howBtn').addEventListener('click', openHow);
  byId('closeHowBtn').addEventListener('click', closeHow);
  byId('modalBackdrop').addEventListener('click', closeHow);
  byId('modalPlayBtn').addEventListener('click', goToManifesto);

  byId('startBtn').addEventListener('click', (event) => {
    if(state.promises.length !== 3) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    show('#arrivalScreen');
    byId('bottomNav').classList.add('hidden');
    toTop();
  }, true);

  byId('openBoxBtn').addEventListener('click', () => {
    show('#gameScreen');
    byId('bottomNav').classList.remove('hidden');
    state.turn = 0;
    loadEvent();
    toTop();
    setTimeout(()=>toast('Welcome to No. 10. Every choice has a cost.'),350);
  });

  byId('restartBtn').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    resetToTitle();
  }, true);

  byId('homeBtn').addEventListener('click', resetToTitle);

  byId('shareBtn').addEventListener('click', async () => {
    const grade = byId('grade').textContent;
    const title = byId('endTitle').textContent;
    const text = `I got a ${grade} running Britain in Your Move, Prime Minister. ${title} Think you could do better?`;
    const shareData = {title:'Your Move, Prime Minister',text,url:location.href};
    try {
      if(navigator.share){
        await navigator.share(shareData);
      } else if(navigator.clipboard){
        await navigator.clipboard.writeText(`${text} ${location.href}`);
        toast('Result copied. Send it to someone who thinks they could do better.');
      } else {
        toast('Your result: '+text);
      }
    } catch (_) {}
  });

  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') closeHow();
  });
})();
