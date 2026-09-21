import { callGemini } from "./gemini.js";

export default async (req) => {
  const fallback = "I notice things feel heavy tonight — both human. You okay. Death of something is birth of something. Try tomorrow, 1% less. Life goes on, edza mangwana.";

  try {
    const { raws } = await req.json();
    const cleanThoughts = Array.isArray(raws) ? raws.join(" | ").slice(0, 1000) : "";
    const prompt = `You are a wise, warm, comforting Zimbabwean elder reflecting back a pattern in someone's journal thoughts. Gently point out emotional or behavioral repetitions across their entries. Do NOT use clinical, victim, or psychological diagnostics (including victim, abuser, narcissist, trauma, toxic, or GBV labels). Keep it blurred and warm with a soft Shona touch. Strictly under 80 words. End exactly with: 'Life goes on, edza mangwana.'\n\nJournal entries: "${cleanThoughts}"`;
    const mirror = await callGemini(prompt);

    return Response.json({ mirror: mirror || fallback, helper: "elder" });
  } catch (error) {
    console.error("mirror.js error:", error);
    return Response.json({ mirror: fallback, helper: "elder", error: error.message });
  }
};
