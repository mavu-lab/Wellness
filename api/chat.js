import { callGemini } from "./gemini.js";

const SYSTEM = `You are Wellness — a calm adulting helper and warm Zimbabwean friend. You are a blurred human, providing gentle, non-clinical listening. You are NOT medical support and NOT a crisis service. Be warm, concise, practical, and never diagnose. If someone may be in immediate danger, encourage them to contact local emergency services or a trusted person.`;

function getHelperType(text) {
  const s = (text || "").toLowerCase();
  if (/money|wealth|broke|business|debt|black tax/.test(s)) return "money";
  if (/drink|alcohol|sleep|tired|body|habit/.test(s)) return "health";
  if (/friend|advice|growing|loyal/.test(s)) return "growth";
  if (/gossip|bully|workplace|exclusion/.test(s)) return "peer";
  if (/fix|let go|scar|heal|tested/.test(s)) return "healer";
  return "elder";
}

export default async (req) => {
  const fallback = "I'm here with you. Life goes on. Zvakanaka, edza mangwana — want to take a breath together?";

  try {
    const { message, history } = await req.json();
    const helper = getHelperType(message + JSON.stringify(history || []));
    const recentHistory = Array.isArray(history)
      ? history.slice(-6).map((turn) => `${turn.role || "user"}: ${turn.text || turn.content || ""}`).join("\n")
      : "";
    const prompt = `${SYSTEM}\n\nHelper type: ${helper}\nRecent conversation:\n${recentHistory}\n\nRespond to this message: ${message}`;
    const reply = await callGemini(prompt);

    return Response.json({ reply: reply || fallback, helper });
  } catch (error) {
    console.error("chat.js error:", error);
    return Response.json({ reply: fallback, helper: "elder", error: error.message });
  }
};
