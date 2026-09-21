import { callGemini } from "./gemini.js";

function getHelperType(text) {
  const s = (text || "").toLowerCase();
  if (/money|wealth|broke|business|debt/.test(s)) return "money";
  if (/drink|alcohol|sleep|tired|body|habit/.test(s)) return "health";
  if (/friend|advice|growing/.test(s)) return "growth";
  if (/gossip|bully|workplace/.test(s)) return "peer";
  if (/fix|let go|scar|heal/.test(s)) return "healer";
  return "elder";
}

const fallback = {
  helper: "elder",
  suggestions: [
    "I hear you. Good friendship, bad advice — both true. Are you growing?",
    "Did you choose from wound or want? When did this start protecting you?"
  ]
};

export default async (req) => {
  try {
    const { message = "" } = await req.json();
    const helper = getHelperType(message);
    const prompt = `User said: "${String(message).slice(0, 300)}". Helper: ${helper}. Generate exactly 3 short reply options for ${helper}, each under 22 words. Be warm and Zimbabwean, with no diagnosis. Return ONLY valid JSON in this exact shape: {"suggestions":["option 1","option 2","option 3"]}`;
    const text = await callGemini(prompt);
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed.suggestions)) throw new Error("Gemini response did not include suggestions");
    return Response.json({ helper, suggestions: parsed.suggestions });
  } catch (error) {
    console.error("suggest.js error:", error);
    return Response.json(fallback);
  }
};
