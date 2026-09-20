require('dotenv').config();
const http = require('http');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const promptModule = require('./prompt');
const SYSTEM = promptModule.SYSTEM || promptModule;
const getHelperType = promptModule.getHelperType;

// Initialize the Google Gen AI client wrapper cleanly
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  // 1. ENDPOINT: /api/mirror
  if (req.method === 'POST' && req.url === '/api/mirror') {
    let body = ''; req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const { raws } = JSON.parse(body);
        const helper = getHelperType(Array.isArray(raws) ? raws.join(' ') : raws);
        
        // Pass standard instructions safely using model initialization rules
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM + `\nHelper needed: ${helper}. Keep it warm, blurred, under 80 words. End exactly with: "Life goes on, edza mangwana."`
        });

        const prompt = `User raw thoughts data list:\n${JSON.stringify(raws || [])}`;
        const result = await model.generateContent(prompt);
        
        // Native SDK requires .text() execution loop to safely get string values
        const responseText = typeof result.response.text === 'function' ? result.response.text() : result.response.text;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mirror: responseText.trim(), helper, helperLabel: helper }));
      } catch (e) { 
        res.writeHead(500, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify({ mirror: "Mirror resting. Life goes on — write 1 kind line to Future You. Edza mangwana.", helper: "elder" })); 
      }
    }); return;
  }

  // 2. ENDPOINT: /api/chat
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = ''; req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const { message, history } = JSON.parse(body);
        const helper = getHelperType(message + ' ' + JSON.stringify(history || []));
        
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM + `\nHelper context: ${helper}. Reply as Wellness, under 70 words, no clinical labels, ask 1 question, end with hope. End exactly with: "Life goes on, edza mangwana."`
        });

        // Mapping standard logs into native historical alternating roles
        const contents = [];
        if (Array.isArray(history)) {
          history.slice(-6).forEach(turn => {
            contents.push({
              role: (turn.role === 'assistant' || turn.role === 'ai') ? 'model' : 'user',
              parts: [{ text: turn.text || turn.content || "" }]
            });
          });
        }
        contents.push({ role: "user", parts: [{ text: message }] });

        const result = await model.generateContent({ contents });
        const responseText = typeof result.response.text === 'function' ? result.response.text() : result.response.text;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: responseText.trim(), helper }));
      } catch (e) { 
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify({ reply: "I'm here with you. Life goes on. Zvakanaka, edza mangwana — want to take a breath together?", helper: "elder" })); 
      }
    }); return;
  }

  // 3. ENDPOINT: /api/suggest
  if (req.method === 'POST' && req.url === '/api/suggest') {
    let body = ''; req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        const helper = getHelperType(message);
        
        // Enforce strong JSON constraints using schema properties configurations
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                helper: { type: "STRING" },
                suggestions: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: ["helper", "suggestions"]
            }
          },
          systemInstruction: `You are an options engine. Generate 3 short reply suggestions for helper category: "${helper}".\n` +
            `- elder: warmth, forgive self/parents, heart you had then\n` +
            `- money: money as story, safety vs love, healthy family not excess\n` +
            `- health: habit was survival, 1% less, body needs kindness\n` +
            `- growth: good person bad advice both true, loyal to them or becoming, are you growing\n` +
            `- peer: bullying changed face to gossip, whispers real, boundary is care\n` +
            `- healer: fix vs let go, heal scar, tested it's okay lose it's okay, something out there\n` +
            `Each string must be under 22 words, warm Zimbabwean style, no diagnosis labels.`
        });

        const prompt = `User statement input: "${message}"`;
        const result = await model.generateContent(prompt);
        const responseText = typeof result.response.text === 'function' ? result.response.text() : result.response.text;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(responseText.trim());
      } catch (e) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          helper: "elder", 
          suggestions: [
            "I hear you. Good friendship, bad advice — both true. Are you growing?",
            "Did you choose from wound or want? When did this start protecting you?",
            "Write 1 line to Future You to forgive the heart you had then. Life goes on — something is out there."
          ]
        }));
      }
    }); return;
  }

  // 4. ENDPOINT: /api/moderate
  if (req.method === 'POST' && req.url === '/api/moderate') {
    res.writeHead(200, { 'Content-Type': 'application/json' }); 
    res.end(JSON.stringify({ ok: true })); 
    return;
  }

  res.writeHead(404); res.end('Not found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Wellness AI+Helpers on node port: ${PORT}`));
