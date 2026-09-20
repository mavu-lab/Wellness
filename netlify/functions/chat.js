const SYSTEM = `You are Wellness — a calm adulting helper and warm Zimbabwean friend. 
You are a blurred human, providing gentle, non-clinical listening. 
You are NOT medical support and NOT a crisis line.
Never apply psychological or diagnostic labels (avoid words like victim, abuser, narcissist, trauma, toxic, GBV).
Keep your reply warm with a soft Shona touch.
Strictly under 70 words, ask exactly 1 gentle question, and end with a tiny message of hope. 
You must conclude your response exactly with the phrase: "Life goes on, edza mangwana."`;

function getHelperType(t) {
  const s = (t || '').toLowerCase();
  if (s.match(/money|wealth|broke|business|debt|black tax/)) return "money";
  if (s.match(/drink|alcohol|sleep|tired|body|habit/)) return "health";
  if (s.match(/friend|advice|growing|loyal/)) return "growth";
  if (s.match(/gossip|bully|workplace|exclusion/)) return "peer";
  if (s.match(/fix|let go|scar|heal|tested/)) return "healer";
  return "elder";
}

export default async (req) => {
  const DEFAULT_FALLBACK = "I'm here with you. Life goes on. Zvakanaka, edza mangwana — want to take a breath together?";

  try {
    const { message, history } = await req.json();
    const helper = getHelperType(message + JSON.stringify(history || []));
    const key = process.env.GEMINI_API_KEY;

    if (!key) throw new Error("no key");

    // Map your incoming message history cleanly to Gemini's expected alternating roles
    // Map client side 'assistant' or 'ai' roles to 'model' for the Gemini engine
    const formattedContents = [];
    
    if (Array.isArray(history)) {
      // Safely slice to last 6 entries to protect the API token limit
      history.slice(-6).forEach(turn => {
        const apiRole = (turn.role === 'assistant' || turn.role === 'ai') ? 'model' : 'user';
        formattedContents.push({
          role: apiRole,
          parts: [{ text: turn.text || turn.content || "" }]
        });
      });
    }

    // Append the current incoming user turn to the end of the history array
    formattedContents.push({
      role: "user",
      parts: [{ text: `[Context Strategy: ${helper}] User message: ${message}` }]
    });

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: formattedContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150
        }
      })
    });

    if (!res.ok) throw new Error(`API error status ${res.status}`);

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || DEFAULT_FALLBACK;

    return Response.json({ reply, helper });
  } catch (e) {
    return Response.json({ reply: DEFAULT_FALLBACK, helper: "elder" });
  }
}
