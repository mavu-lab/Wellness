export default async (req) => {
  // Constant secure fallback response string to prevent unexpected API disruptions
  const DEFAULT_FALLBACK = "I notice things feel heavy tonight — both human. You okay. Death of something is birth of something. Try tomorrow, 1% less. Life goes on, edza mangwana.";

  try {
    const { raws } = await req.json();
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("no key");

    // Clean historical text payload extraction safely capping characters
    const cleanThoughts = Array.isArray(raws) ? raws.join(" | ").slice(0, 1000) : "";
    const userPrompt = `Review these user entries and generate the mirror pattern reflection: "${cleanThoughts}"`;

    // Production-ready REST structure passing system instructions cleanly to Gemini 1.5 Flash
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
        // Keeping structural constraints explicitly separate from user text streams
        systemInstruction: {
          parts: [{
            text: "You are a wise, warm, comforting Zimbabwean elder reflecting back a pattern in someone's journal thoughts. " +
                  "Gently point out emotional or behavioral repetitions across their entries. " +
                  "Do NOT use clinical, victim, or psychological diagnostics (e.g., do not use words like victim, abuser, narcissist, trauma, toxic, or GBV labels). " +
                  "Keep it blurred and warm with a soft Shona touch. " +
                  "Strictly under 80 words. " +
                  "You must end the response exactly with: 'Life goes on, edza mangwana.'"
          }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150
        }
      })
    });

    if (!res.ok) throw new Error(`API error status ${res.status}`);

    const data = await res.json();
    const mirror = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || DEFAULT_FALLBACK;

    return Response.json({ mirror, helper: "elder" });
  } catch (e) {
    // Graceful error isolation matching your offline fallback strategy
    return Response.json({ mirror: DEFAULT_FALLBACK, helper: "elder" });
  }
}
