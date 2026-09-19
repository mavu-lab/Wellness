require('dotenv').config();
const http = require('http');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const promptModule = require('./prompt');
const SYSTEM = promptModule.SYSTEM || promptModule;
const getHelperType = promptModule.getHelperType;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const server = http.createServer(async (req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method==='OPTIONS'){ res.writeHead(204); return res.end(); }

  if(req.method==='POST' && req.url==='/api/mirror'){
    let body=''; req.on('data',c=>body+=c);
    req.on('end', async()=>{
      try{
        const {raws} = JSON.parse(body);
        const helper = getHelperType(raws);
        const prompt = SYSTEM + "\nRAW:\n" + raws + `\nHelper needed: ${helper}. Reply warm.`;
        const result = await model.generateContent(prompt);
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({ mirror: result.response.text(), helper, helperLabel: helper }));
      }catch(e){ res.writeHead(500,{'Content-Type':'application/json'}); res.end(JSON.stringify({ mirror: "Mirror resting. Life goes on — write 1 kind line to Future You.", helper:"elder" })); }
    }); return;
  }

  if(req.method==='POST' && req.url==='/api/chat'){
    let body=''; req.on('data',c=>body+=c);
    req.on('end', async()=>{
      try{
        const {message, history} = JSON.parse(body);
        const helper = getHelperType(message + ' ' + JSON.stringify(history));
        const prompt = SYSTEM + `\nChat history: ${JSON.stringify(history)}\nUser says: ${message}\nHelper needed: ${helper}. Reply as Wellness, under 70 words, no label, 1 question, end hope.`;
        const result = await model.generateContent(prompt);
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({ reply: result.response.text(), helper }));
      }catch(e){ res.writeHead(200,{'Content-Type':'application/json'}); res.end(JSON.stringify({ reply: "I'm here. Life goes on. Want to breathe together?", helper:"elder" })); }
    }); return;
  }

  if(req.method==='POST' && req.url==='/api/suggest'){
    let body=''; req.on('data',c=>body+=c);
    req.on('end', async()=>{
      try{
        const {message} = JSON.parse(body);
        const helper = getHelperType(message);
        const prompt = `User said: "${message}". Helper type: ${helper}. Generate 3 short reply options for ${helper}:
        - elder: warmth, forgive self/parents, heart you had then
        - money: money as story, safety vs love, healthy family not excess
        - health: habit was survival, 1% less, body needs kindness
        - growth: good person bad advice both true, loyal to them or becoming, are you growing
        - peer: bullying changed face to gossip, whispers real, boundary is care
        - healer: fix vs let go, heal scar, tested it's okay lose it's okay, something out there
        Each under 22 words, warm Zim, no diagnosis. Return JSON: {"helper":"${helper}","suggestions":["...","...","..."]}`;
        const result = await model.generateContent(prompt);
        let txt = result.response.text().replace(/```json|```/g,'').trim();
        let parsed = JSON.parse(txt);
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(parsed));
      }catch(e){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({ helper:"elder", suggestions: [
          "I hear you. Good friendship, bad advice — both true. Are you growing?",
          "Did you choose from wound or want? When did this start protecting you?",
          "Write 1 line to Future You to forgive the heart you had then. Life goes on — something is out there."
        ]}));
      }
    }); return;
  }

  if(req.method==='POST' && req.url==='/api/moderate'){
    res.writeHead(200,{'Content-Type':'application/json'}); res.end(JSON.stringify({ ok:true })); return;
  }

  res.writeHead(404); res.end('Not found');
});

const PORT = process.env.PORT||3000;
server.listen(PORT, ()=> console.log(`Wellness AI+Helpers on ${PORT}`));
