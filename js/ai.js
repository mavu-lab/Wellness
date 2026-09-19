// Wellness AI — via Netlify AI Gateway — blurred truth only
const API = {
  mirror: '/.netlify/functions/mirror',
  chat: '/.netlify/functions/chat',
  suggest: '/.netlify/functions/suggest'
};
async function post(url, body){
  try{
    let r = await fetch(url, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
    return await r.json();
  }catch(e){ return null; }
}
export async function getMirror(raws){
  let d = await post(API.mirror, {raws});
  return d || {mirror:"I notice heavy tonight — both human. You okay. Death of something is birth of something. Try tomorrow, 1% less. Life goes on.", helper:"elder"};
}
export async function getChat(message, history=[]){
  let d = await post(API.chat, {message, history});
  return d || {reply:"I'm here. Life goes on. Zvakanaka, edza mangwana — want to breathe together? 1% less today.", helper:"elder"};
}
export async function getSuggest(message){
  let d = await post(API.suggest, {message});
  return d || {helper:"elder", suggestions:["I hear you. Good friendship, bad advice — both true. Are you growing?","Did you choose from wound or want? When did this start protecting you?","Write 1 line to Future You to forgive the heart you had then."]};
}
export async function getAI(prompt, type="chat"){
  if(type==="mirror") return (await getMirror(prompt)).mirror;
  return (await getChat(prompt, [])).reply;
}
