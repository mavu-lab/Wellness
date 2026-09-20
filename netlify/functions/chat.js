const SYSTEM = `You are Wellness — a calm adulting helper and warm Zimbabwean friend. You are a blurred human, providing gentle, non-clinical listening. You are NOT medical support and NOT a crisis line. Never apply psychological labels (victim, abuser, narcissist, trauma, toxic, GBV). Warm with soft Shona touch. Under 70 words, ask exactly 1 gentle question, end exactly with: "Life goes on, edza mangwana."`;

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
  const FALLBACK = "I'm here with you. Life goes on. Zvakanaka, edza mangwana — want to take a breath together?";
  try {
    const { message, history } = await req.json();
    const helper = getHelperType(message + JSON.stringify(history||[]));
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
      console.error("MISSING GEMINI_API_KEY in Netlify env vars");
      return Response.json({ reply: FALLBACK, helper: "elder", debug: "no key" });
    }

    const formatted = [];
    if (Array.isArray(history)) {
      history.slice(-6).forEach(turn => {
        formatted.push({
          role: (turn.role === 'assistant' || turn.role === 'ai')? 'model' : 'user',
          parts: [{ text: turn.text || turn.content || "" }]
        });
      });
    }
    formatted.push({ role: "user", parts: [{ text: `[Helper: ${helper}] ${message}` }] });

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: formatted,
        generationConfig: { temperature: 0.7, maxOutputTokens: 150 }
      })
    });

    const data = await res.json();
    console.log("Gemini raw:", JSON.stringify(data).slice(0,500));

    if (!res.ok) throw new Error(`Gemini ${res.status}: ${JSON.stringify(data)}`);

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || FALLBACK;
    return Response.json({ reply, helper });

  } catch (e) {
    console.error("chat.js error:", e);
    return Response.json({ reply: FALLBACK, helper: "elder", error: e.message });
  }
}