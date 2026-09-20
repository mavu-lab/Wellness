// Wellness AI Gateway Orchestration — Local-first routing with serverless fallbacks
const API = {
  mirror: '/.netlify/functions/mirror',
  chat: '/.netlify/functions/chat',
  suggest: '/.netlify/functions/suggest'
};

/**
 * Standard utility mapping global client-side asynchronous HTTP communications
 */
async function post(url, body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) { 
    return null; 
  }
}

/**
 * Fetches structured pattern recognition insights based on historical text entries
 * @param {Array<string>} raws - Collection of previous journal entries
 */
export async function getMirror(raws) {
  // Ensure we are passing an array to the serverless function node
  const cleanRaws = Array.isArray(raws) ? raws : [raws].filter(Boolean);
  const data = await post(API.mirror, { raws: cleanRaws });
  
  return data || {
    mirror: "I notice things feel heavy tonight — both human. You okay. Death of something is birth of something. Try tomorrow, 1% less. Life goes on, edza mangwana.", 
    helper: "elder"
  };
}

/**
 * Dispatches current conversation inputs to serverless modules with historical memory
 * @param {string} message - Current active message string input
 * @param {Array<Object>} history - Conversational turn arrays [{role: 'user', text: '...'}]
 */
export async function getChat(message, history = []) {
  const data = await post(API.chat, { message, history });
  
  return data || {
    reply: "I'm here with you. Life goes on. Zvakanaka, edza mangwana — want to take a breath together? 1% less today.", 
    helper: "elder"
  };
}

/**
 * Pulls dynamic contextual suggestion blocks based on primary message classifications
 * @param {string} message - Main source string context
 */
export async function getSuggest(message) {
  const data = await post(API.suggest, { message });
  
  return data || {
    helper: "elder", 
    suggestions: [
      "I hear you. Good friendship, bad advice — both true. Are you growing?",
      "Did you choose from wound or want? When did this start protecting you?",
      "Write 1 line to Future You to forgive the heart you had then. Life goes on."
    ]
  };
}

/**
 * Global application unified routing access layer
 * @param {string|Array} inputData - Source payload (String for chats, Array for mirror)
 * @param {string} type - Functional tracking target route mode ("chat" | "mirror")
 */
export async function getAI(inputData, type = "chat") {
  if (type === "mirror") {
    const result = await getMirror(inputData);
    return result.mirror;
  }
  
  // Safe validation fallbacks preventing string data truncation down stream
  const cleanMessage = Array.isArray(inputData) ? inputData.join(" ") : inputData;
  const result = await getChat(cleanMessage, []);
  return result.reply;
}
