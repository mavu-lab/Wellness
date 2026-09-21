const MODEL = "gemini-3.6-flash";

export async function callGemini(prompt) {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("MISSING GEMINI_API_KEY in Netlify env vars");

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600
        }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Gemini ${res.status}: ${JSON.stringify(data)}`);
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  } catch (error) {
    console.error("gemini.js error:", error);
    throw error;
  }
}
