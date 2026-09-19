function getHelperType(t){
  const s=(t||'').toLowerCase();
  if(s.match(/money|wealth|broke|business|debt/))return"money";
  if(s.match(/drink|alcohol|sleep|tired|body|habit/))return"health";
  if(s.match(/friend|advice|growing/))return"growth";
  if(s.match(/gossip|bully|workplace/))return"peer";
  if(s.match(/fix|let go|scar|heal/))return"healer";
  return"elder";
}

export default async (req)=>{
  try{
    const {message} = await req.json();
    const helper = getHelperType(message);
    const key = process.env.GEMINI_API_KEY;
    if(!key) throw new Error("no key");

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        contents: [{ parts: [{ text: `User said: "${message.slice(0,300)}". Helper: ${helper}. Generate 3 short reply options for ${helper}. Each under 22 words, warm Zim, no diagnosis. Return ONLY JSON: {"helper":"${helper}","suggestions":["...","...","..."]}` }]}]
      })
    });

    const data = await res.json();
    let txt = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    txt = txt.replace(/```json|```/g,'').trim();
    return Response.json(JSON.parse(txt));
  }catch(e){
    return Response.json({helper:"elder",suggestions:["I hear you. Good friendship, bad advice — both true. Are you growing?","Did you choose from wound or want? When did this start protecting you?","Write 1 line to Future You to forgive the heart you had then. Life goes on."]});
  }
}