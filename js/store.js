/**
 * Local-First Client Storage Engine (localStorage Encapsulation)
 * Absolute data sovereignty: data never leaves the device without user command.
 */
const Store = {
  // --- Raw Thoughts Handling ---
  getRaws: () => JSON.parse(localStorage.getItem('w_raws') || '[]'),
  
  saveRaw: (t) => {
    const a = Store.getRaws();
    a.push({ text: t, time: Date.now() });
    localStorage.setItem('w_raws', JSON.stringify(a));
  },

  // --- Time-Locked Future Letters Handling ---
  getFutures: () => JSON.parse(localStorage.getItem('w_futures') || '[]'),
  
  /**
   * Seals a future letter with dynamic time locks (e.g., 2 days or 30 days)
   * @param {string} t - Complete joined letter content text string
   * @param {number} days - Number of days to apply the unlock security seal (Defaults to 30)
   */
  saveFuture: (t, days = 30) => {
    const a = Store.getFutures();
    const lockDuration = days * 24 * 60 * 60 * 1000;
    
    a.push({
      text: t,
      time: Date.now(),
      unlock: Date.now() + lockDuration
    });
    localStorage.setItem('w_futures', JSON.stringify(a));
  },

  // --- Interactive Conversations Handling ---
  getChats: () => JSON.parse(localStorage.getItem('w_chat') || '[]'),
  
  saveChat: (role, text, helper = 'elder', mod = false) => {
    const a = Store.getChats();
    a.push({ role, text, helper, mod, time: Date.now() });
    localStorage.setItem('w_chat', JSON.stringify(a));
  },

  // --- Client Identity Properties ---
  getCode: () => localStorage.getItem('w_codename') || 'anon',
  
  setCode: (c) => {
    localStorage.setItem('w_codename', c.trim());
  },
  
  // --- Local Clear Protocol ---
  clearAll: () => {
    localStorage.removeItem('w_raws');
    localStorage.removeItem('w_futures');
    localStorage.removeItem('w_chat');
    localStorage.removeItem('w_codename');
  }
};
