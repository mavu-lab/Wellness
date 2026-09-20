// Wellness AI Gateway - Fixed with error logging
const API = {
  mirror: '/.netlify/functions/mirror',
  chat: '/.netlify/functions/chat',
  suggest: '/.netlify/functions/suggest'
};

async function post(url, body) {
  try {
    console.log(`[AI] Calling ${url}`, body);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const text = await response.text();
    console.log(`[AI] ${url} Status: ${response.status}`, text);

    if (!response.ok) {
      throw new Error(`${url} failed ${response.status}: ${text}`);
    }
    return JSON.parse(text);
  } catch (e) {
    console.error(`[AI] Error on ${url}:`, e);
    throw e; // Don't hide errors
  }
}

export async function getMirror(raws) {
  const cleanRaws = Array.isArray(raws)? raws : [raws].filter(Boolean);
  const data = await post(API.mirror, { raws: cleanRaws });
  return data;
}

export async function getChat(message, history = []) {
  const data = await post(API.chat, { message, history });
  return data;
}

export async function getSuggest(message) {
  const data = await post(API.suggest, { message });
  return data;
}

export async function getAI(inputData, type = "chat") {
  if (type === "mirror") {
    const result = await getMirror(inputData);
    return result.mirror;
  }
  const cleanMessage = Array.isArray(inputData)? inputData.join(" ") : inputData;
  const result = await getChat(cleanMessage, []);
  return result.reply;
}