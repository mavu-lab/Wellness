const Store = {
  getRaws: () => JSON.parse(localStorage.getItem('raws')||'[]'),
  saveRaw: (t) => { let a=Store.getRaws(); a.push({text:t,time:Date.now()}); localStorage.setItem('raws',JSON.stringify(a)); },
  getFutures: () => JSON.parse(localStorage.getItem('futures')||'[]'),
  saveFuture: (t) => { let a=Store.getFutures(); a.push({text:t,time:Date.now(),unlock:Date.now()+30*24*60*60*1000}); localStorage.setItem('futures',JSON.stringify(a)); },
  getChats: () => JSON.parse(localStorage.getItem('chat')||'[]'),
  saveChat: (role,text,helper,mod) => { let a=Store.getChats(); a.push({role,text,helper,mod,time:Date.now()}); localStorage.setItem('chat',JSON.stringify(a)); },
  getCode: () => localStorage.getItem('code')||localStorage.getItem('codeName')||'anon',
  setCode: (c) => { localStorage.setItem('code',c); localStorage.setItem('codeName',c); }
};
