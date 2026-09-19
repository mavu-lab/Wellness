export default async (req)=>{
  try{
    const {raws} = await req.json();
    const key = process.env.GEMINI_API_KEY;
    if(!key) throw new Error("no key");

    const prompt = `User raw thoughts: ${JSON.stringify(raws||[]).slice(0,1000)}. Mirror pattern blurred, no label, warm Zim elder, under 80 words, end with Life goes on, edza mangwana.`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ contents: [{ parts: [{text: prompt}]}] })
    });

    const data = await res.json();
    const mirror = data.candidates?.[0]?.content?.parts?.[0]?.text || "I notice heavy tonight — both human. You okay. Death of something is birth of something. Try tomorrow, 1% less. Life goes on.";

    return Response.json({mirror, helper:"elder"});
  }catch(e){
    return Response.json({mirror:"I notice heavy tonight — both human. You okay. Death of something is birth of something. Try tomorrow, 1% less. Life goes on.", helper:"elder"});
  }
}