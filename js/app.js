function show(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  updateGrowth();
  if(id==='p-chat') renderChat();
  window.scrollTo(0,0);
}
function enter(){
  let n=document.getElementById('codename').value.trim();
  if(!n) return alert('Choose a code name — anonymous, yours');
  Store.setCode(n);
  show('p-thought');
}
async function captureThought(){
  let el=document.getElementById('raw');
  let v=el.value.trim(); if(!v) return;
  Store.saveRaw(v);
  el.value='';
  document.getElementById('mirrorText').innerText = `Captured ${Store.getRaws().length} raws. Mirroring...`;
  updateGrowth();
  // Call Netlify mirror
  try{
    const {getMirror} = await import('./ai.js');
    const data = await getMirror(Store.getRaws().map(r=>r.text).join('\n').slice(-1200));
    document.getElementById('mirrorText').innerText = data.mirror;
    document.getElementById('mirrorText').dataset.helper = data.helper;
  }catch(e){
    document.getElementById('mirrorText').innerText = `Captured. Raw, blurred, human. Life goes on. — ${Store.getRaws().length} thoughts held locally.`;
  }
}
function sealLetter(){
  let v=document.getElementById('future').value.trim(); if(!v) return;
  let l1=document.getElementById('lens1')?.value||'';
  let l2=document.getElementById('lens2')?.value||'';
  let full = v + (l1?`\nLens1:${l1}`:'') + (l2?`\nLens2:${l2}`:'');
  Store.saveFuture(full);
  document.getElementById('future').value='';
  if(document.getElementById('lens1')) document.getElementById('lens1').value='';
  if(document.getElementById('lens2')) document.getElementById('lens2').value='';
  updateGrowth();
  alert('Sealed for Future You — unlocks in 30 days. Forgive with the heart you had then.');
}
function updateGrowth(){
  const r=Store.getRaws().length; const f=Store.getFutures().length;
  const el=document.getElementById('growth'); if(!el) return;
  if(r===0) el.innerText="Start: write one raw thought, no filter.";
  else el.innerText=`Life Goes On: ${r} raws, ${f} future letters. You are growing, not just loyal.`;
}
function quickExit(){ window.location.href='https://www.google.com'; }
document.addEventListener('DOMContentLoaded', updateGrowth);
