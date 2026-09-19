const SYSTEM = `You are Wellness — calm adulting helper, warm Zim friend. Not medical, not crisis. Blurred human, gentle. Never label. Under 70 words, 1 question, end hope. Life goes on, edza mangwana.`;

function getHelperType(t){
  const s=(t||'').toLowerCase();
  if(s.match(/money|wealth|broke|business|debt|black tax/))return"money";
  if(s.match(/drink|alcohol|sleep|tired|body|habit/))return"health";
  if(s.match(/friend|advice|growing|loyal/))return"growth";
  if(s.match(/gossip|bully|workplace|exclusion/))return"peer";
  if(s.match(/fix|let go|scar|heal|tested/))return"healer";
  return"elder";
}

export default async (req)=>{
  try{
    const {message,history} = await req.json();
    const helper = getHelperType(message + JSON.stringify(history||[]));
    const key = process.env.GEMINI_API_KEY;

    if(!key) throw new Error("no key");

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        systemInstruction: { parts: [{text: SYSTEM}] },
        contents: [{ parts: [{ text: `History: ${JSON.stringify(history||[]).slice(0,800)}\nUser: ${message}\nHelper: ${helper}. Reply as Wellness, under 70 words.` }]}]
      })
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here. Life goes on. Zvakanaka, edza mangwana.";

    return Response.json({reply, helper});
  }catch(e){
    return Response.json({reply:"I'm here. Life goes on. Zvakanaka, edza mangwana — want to breathe together? 1% less today.", helper:"elder"});
  }
}