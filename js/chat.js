function helperLabel(h){
  return {elder:"Mother/Elder — warmth & forgiveness",money:"Money Elder — healthy family not excess",health:"Health — body kindness, 1% less",growth:"Growth Friend — are you growing?",peer:"Peer Coach — gossip changed face",healer:"Healer — fix vs let go, scar"}[h]||h;
}
function renderChat(){
  const box=document.getElementById('chatBox'); if(!box) return;
  box.innerHTML='';
  const CHAT = Store.getChats();
  if(CHAT.length===0){
    let d=document.createElement('div'); d.className='card'; d.style.background='var(--card)'; d.style.padding='12px'; d.style.borderRadius='var(--radius)';
    d.innerText='Wellness: Life goes on. What is heavy today? Raw, no filter. I am helper, not doctor.';
    box.appendChild(d); return;
  }
  CHAT.forEach(m=>{
    let div=document.createElement('div'); div.className='card';
    div.style.padding='12px'; div.style.maxWidth='85%'; div.style.margin='6px 0';
    div.style.background=m.role==='user'?'var(--bg)':'var(--card)';
    div.style.marginLeft=m.role==='user'?'auto':'0';
    div.style.border=m.mod?'1.5px solid var(--sage)':'1px solid var(--line)';
    div.innerHTML = `<small style="opacity:.6">${m.role==='user'? Store.getCode() : 'Wellness • '+(m.helper||'elder')} • blurred truth</small><div style="margin-top:6px;font-size:14px;white-space:pre-wrap">${m.text}</div>`;
    box.appendChild(div);
  });
  box.scrollTop=box.scrollHeight;
}
async function sendChat(){
  let inp=document.getElementById('chatInput'); let text=inp.value.trim(); if(!text) return;
  Store.saveChat('user', text);
  inp.value=''; renderChat();
  if(window.location.search.includes('mod=1')){
    const q=document.getElementById('modQueue');
    if(q) q.innerHTML=`User said: "${text}"<br>Generating helper + 3 options...`;
  }
  try{
    const {getChat} = await import('./ai.js');
    const data = await getChat(text, Store.getChats().slice(-6));
    Store.saveChat('assistant', data.reply, data.helper, false);
    renderChat();
    if(window.location.search.includes('mod=1')) loadModSuggestions(text);
  }catch(e){
    Store.saveChat('assistant',"I'm here. Life goes on. Zvakanaka, edza mangwana — want to breathe together? 1% less today.", "elder");
    renderChat();
  }
}
async function loadModSuggestions(lastUserMsg){
  try{
    const {getSuggest} = await import('./ai.js');
    const data = await getSuggest(lastUserMsg);
    const q=document.getElementById('modQueue');
    if(q) q.innerHTML=`User: "${lastUserMsg}"<br><span style="background:var(--sage);color:white;padding:4px 10px;border-radius:12px;font-size:12px">Needs: ${data.helper} — ${helperLabel(data.helper)}</span>`;
    const box=document.getElementById('aiSuggestions'); if(!box) return; box.innerHTML='';
    data.suggestions.forEach((s,i)=>{
      let btn=document.createElement('button'); btn.className='btn btn-ghost'; btn.style.textAlign='left'; btn.style.whiteSpace='normal'; btn.style.margin='4px 0';
      btn.innerText=`${i+1}. ${s}`; btn.onclick=()=>{ document.getElementById('modInput').value=s; document.getElementById('modInput').dataset.helper=data.helper; };
      box.appendChild(btn);
    });
  }catch(e){}
}
async function sendMod(){
  let inp=document.getElementById('modInput'); let text=inp.value.trim(); if(!text) return;
  let helper=inp.dataset.helper||'elder';
  Store.saveChat('assistant', text, helper, true);
  renderChat(); inp.value='';
  try{ await fetch('/.netlify/functions/moderate', {method:'POST', body: JSON.stringify({reply:text, helper})}); }catch(e){}
}
document.addEventListener('DOMContentLoaded', renderChat);
