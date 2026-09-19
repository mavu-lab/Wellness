# Wellness — Learn How Adults Work. Life Goes On.
> Not a GBV website. Not a teaching website. A raw wellness journal that even judges keep.

🌿 Live: sage calm, beige, local-first. `Private • No account • Local only • Just you`

## The Problem
Wellness apps assume the individual's problem. They give 6 cards: "you are bullied".

But adults are insecure about themselves. Sometimes they are the problem. Sometimes no problem — just low self.

Errors are blurred lines. Violence has traits of environment. We can learn harmony.

If we label, we become a website, not wellness.

## Adult Struggles We Mirror
For all adult struggles, not just one:

1. **The Age Clock** — "Why haven't I figured abc by this age?" Still single, no house, comparing.
2. **Money Extremes** — Excess or nothing are both same extremes. Wealth is for healthy family, not excess. Provider burnout, black tax.
3. **It's Not You** — Sometimes partner has traumatic background. Not because you failed.
4. **Adult Bullying** — Changed face from physical to gossip and mind games, WhatsApp exclusion.
5. **Two Healed People** — Successful relationship needs 2 healed people, 2 peaces. Not just love.
6. **Fix vs Let Go** — There is time to fix and there is time to let go.
7. **Heal Scars** — Forgive parents, yourself, relationship you found yourself in.
8. **Self Shame** — "What did I do? Why did I choose this partner?" 3am replay.
9. **Destructive Habits** — Doom scrolling, over-explaining, saying yes, checking phone. Comfort that destroys.
10. **Good Friendship, Bad Advice** — Some friends call you for alcohol not business idea. It's okay, but are you growing? Not all good people are good for growth.
11. **Growth vs Loyalty Guilt** — Growing feels like betraying family or friends.
12. **The Test** — You will be tested, it's okay. You will lose, it's also okay. Move with both lenses.

## How It Works — Raw Model
We don't teach. We listen. AI learns from raw.

**1. Landing — Hero**
Code name only. No email. Rotating hook: *"Good friendship, bad advice — both true"*. Sage hero, 32px radius, local-only trust line.

**2. Raw Thought**
No question, no assumption. Placeholder: `Raw thought no filter... Zvakanaka, edza mangwana`. Capture → Mirror.

**3. Chat — AI first, helper by need**
`raw, no filter...` → Gemini via Netlify AI Gateway. Under 90 words, warm, Shona touch. Forbids: victim, abuser, narcissist, trauma, GBV labels. Uses: "I notice...", 1 soft question, tiny action + hope.

**4. Letterbox — To Future You**
Not letter to them. To Future Me: "Forgive yourself for choosing with the heart you had then." 
- Lens 1: What happened? 
- Lens 2: What did I learn?
- Seal 2 days (edza mangwana) or 30 days. Future unlocks only when heart ready.

**5. Mirror — Not Cards**
No 6 cards. Mirrors pattern gently:
> "I notice you mention guilt 3x this week. Sometimes insecurity, sometimes control — both human. Are you loyal to them or to your becoming?"
Ends with: *You okay. You can try tomorrow. Life goes on.*

**6. Life Goes On**
Anonymous feed of 15 truths — errors are human, not just you. Plus Private Audit: Who calls you for growth? Who for escape? No sending, just seeing.

**7. Cloud Saver — Optional, YOUR saver only**
- **Local by default:** We cannot recover your data. Privacy shield.
- If you journal to organize life, CHOOSE cloud — 3 consents required:
    - My thoughts will leave phone to MY saver
    - I own my data. Wellness = Help as a Service, not liable
    - Not medical, not crisis. 18+. If unsafe, I talk to human
- Choices: `My Phone — Encrypted File (safest)` downloads `wellness-YYYY-MM-DD.json`, `My Drive` (you upload), `My Email` (you send). File leaves phone only to YOUR saver. We cannot see.

## Tech — Vanilla SPA, Disguised, Local-First
```text
wellness/
├── index.html          # 6-div SPA: welcome, thought, chat, future, mirror, life, settings
├── css/style.css       # calm beige #f6f1e8 + sage #8da99a, 28px radius, hero landing
├── js/
│   ├── store.js        # localStorage only — raws, futures, chats, growth
│   ├── app.js          # show/hide pages + growth counter + Quick Exit → Google
│   ├── chat.js         # chat + mod queue (?mod=1)
│   └── ai.js           # calls /.netlify/functions/ai (Gemini) — offline fallback
├── netlify/
│   └── functions/ai.js # Netlify AI Gateway → Gemini, prompt with 12 adult struggles
├── terms.html          # Help as a Service shield — badges, consent status
└── README.md
```
- **Frontend:** Vanilla JS, 1 HTML, no framework, Quick Exit top-right
- **Backend:** Netlify Functions + AI Gateway (no key in frontend)
- **Safety:** Disguised as wellness journal, code name only, no account, 18+
- **Design:** Sage calm, blurred human — not clinical

## Privacy — Help as a Service
- Not medical advice. Not crisis. Local only, we don't store thoughts on server.
- If unsafe, talk to trusted person or Friendship Bench.
- You own your data. Delete: Settings → Stay Local Only or clear site data.

## Run Locally

### Frontend only (works offline)
```bash
open index.html
# or
npx serve .
```

### With AI (Netlify)
```bash
netlify dev
# Needs env: GEMINI_API_KEY in Netlify dashboard (via AI Gateway)
```

### Legacy backend (if using Node http)
```bash
cd backend
npm install dotenv @google/generative-ai
node server.js
```

## Judges Flow (2 min demo)
1. Welcome — hook rotates: "Some friends call for alcohol, not business" → code name
2. Raw Thought — types: "I love them but they keep me small" → Capture
3. Mirror — Reflect → "Not all good people are good for growth..."
4. Future You — "Forgive yourself for choosing with heart you had then" + Two Lenses → Seal 2 days
5. Life Goes On — 15 truths + audit growth vs escape
6. Settings — Cloud Saver: 3 checkboxes left-aligned, Enable → file downloads to YOUR phone. Terms → Help as a Service shield.

*Pitch:* _The app even judges keep. Because wellness is ongoing — even apologizing to yourself is growth. Life goes on. Edza mangwana._

## Vision
> Learn How Adults Work. Life Goes On.

We all learned punishment somewhere. What did you learn? Wellness is not about being fixed. It's about moving from one bad situation with both lenses, believing there is something for you out there.

Built in Harare, for blurred humans. Death of something is birth of something.
