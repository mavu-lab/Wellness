# 🌿 Wellness — Learn How Adults Work. Life Goes On.

> **System Core:** A raw, local-first wellness journal and non-clinical pattern mirror designed for high-privacy emotional processing.

---

**Live Demo:** https://wellness-zw.netlify.app

**Track:** Stability & Social Cohesion

---

### 📥 Architecture Status
`Private` • `No Account Verification` • `Local-First Baseline` • `Data Sovereign`

Wellness is a lightweight, client-side Single Page Application (SPA) designed to build personal psychological resilience without introducing restrictive clinical diagnostics. Built entirely with vanilla web technologies, it optimizes data transmissions over low-bandwidth connections while maintaining absolute on-device data sovereignty.

---

## 🎯 The Core Problem & Product Philosophy

Traditional wellness applications operate on forced diagnostics. They push individuals into pre-formatted, rigid checkboxes (e.g., forcing a user to select static cards like "I am being bullied" or labeling them as a "victim" or "abuser"). 

In reality, adult struggles are layered, blurred, and rarely linear. Often, individuals struggle with self-image, interpersonal friction, or low self-regard without needing—or wanting—a definitive psychological label. Forcing external labels can transform a trusted platform into a cold tracking mechanism rather than a safe processing space.

Wellness provides a completely unmonitored, private digital baseline. It allows users to write freely, notice recurring behavioral loops, process complex personal environments, and navigate everyday social friction safely before conflicts escalate into broader interpersonal or domestic disputes.

---

## 🧠 The 12 Foundational Adult Archetypes Processed

The system's keyword routing matrices (`getHelperType`) parse raw text entries against twelve primary adult struggle structures:

1. **The Age Clock** — Milestone anxiety and social comparison (e.g., "Why haven't I figured this out by this age?").
2. **Money Extremes** — Financial polarization, safety vs. love trade-offs, provider strain, and black tax.
3. **Not You** — Deconstructing misplaced internal guilt when a partner's behavioral loop stems from historical background trauma.
4. **Adult Bullying** — Modern variations of social friction (workplace whispers, targeted gossip, active WhatsApp group exclusion).
5. **Two Healed People** — Treating relationship success as a combination of two distinct, personal peaces, rather than unstable love alone.
6. **Fix vs. Let Go** — Establishing healthy personal limits between active dispute resolution and clean detachment.
7. **Heal Scars** — Executing structured internal reconciliation with family histories, past connections, and self-regret.
8. **Self Shame** — Processing late-night analytical replays of historical relational selections.
9. **Destructive Habits** — Spotting habituated comfort loops (infinite scrolling, over-explaining, emotional check-ins, or over-drinking).
10. **Good Friendship, Bad Advice** — Evaluating social networks based on developmental growth rather than enabling behaviors.
11. **Growth vs. Loyalty Guilt** — Managing internal friction when personal evolution necessitates boundary changes with family or childhood peers.
12. **The Test** — Navigating inevitable personal failures by analyzing the event concurrently through operational lenses of loss and growth.

---

## 🛠️ Complete Project Directory Structure

```text
wellness/
├── backend/
│   ├── prompt.js       # Core system instructions and the 12 struggle regex matrices
│   └── server.js       # Legacy local HTTP backup server utilizing the @google/generative-ai SDK
├── css/
│   └── style.css       # Mobile-optimized styles (#f6f1e8 beige, #8da99a sage, 32px panel radiuses)
├── js/
│   ├── ai.js           # Client-side routing layer interfacing with Netlify edge routes
│   ├── app.js          # SPA panel navigation, growth logging, and emergency quick exit logic
│   ├── chat.js         # Chat controller managing conversation arrays and mod tracking options
│   └── store.js        # LocalStorage persistence manager enforcing isolated prefix schemas
├── netlify/
│   └── functions/      # Serverless route paths processing API calls via Google AI Gateway
│       ├── chat.js     # Manages alternating conversational context loops (user vs. model roles)
│       ├── mirror.js   # Evaluates raw entry lists to return macro pattern reflections
│       └── suggest.js  # Produces structured JSON recovery suggestions matching strict schemas
├── .gitignore          # Safeguards local credentials from remote repository tracking
├── index.html          # Core single-page view wrapper layout document
├── netlify.toml        # Netlify production build instructions (Node 20 environment / esbuild)
├── package.json        # Unified build module metadata and dependency declarations
└── terms.html          # Help as a Service shield contract and local state diagnostic component
```

---

## 🔄 Core Functional Workflows

### 1. Ingestion & Private Onboarding
The system initializes without checking identity parameters or requiring an email address. It presents a dynamically cycling hook array to establish immediate trust, and uses a client-side layout router to guide users directly into privacy screens using an anonymous code name.

### 2. Low-Bandwidth Data Passing (Client to Edge)
When a user requests an interaction, the client-side system gathers text elements directly from browser memory. Rather than stringifying entire JSON blocks, it packages elements into clean arrays via `js/ai.js`, ensuring minimal byte overhead is sent across the wire.

### 3. Structured Asymmetric Gemini Mirroring
* **Gateway Route:** Relays the user array via a serverless function endpoint pointing securely to **Google Gemini (1.5 Flash)**.
* **System Parameter Isolation:** System constraints are passed to Gemini via formal `systemInstruction` arrays to ensure configuration instructions never blend with raw user entry text.
* **The Elder Persona Protocol:** Restricts responses to under 80 words with a warm, non-judgmental regional tone. It blocks diagnostic labels entirely (forces fallback loops if words like *victim*, *abuser*, *narcissist*, *trauma*, or *GBV* appear).
* **Deterministic Token Constraints:** Commands Gemini's token generation configuration weights to match structural JSON object schemas (`responseMimeType: "application/json"`) and enforces a rigid ending signature: `"Life goes on, edza mangwana."`

### 4. Dual-Lens Letterbox Envelope
Allows users to write letters to a future version of themselves. The component prompts the user to organize the letter content through two distinct perspectives before time-locking:
* **Lens 1 (Contextual):** What exactly occurred?
* **Lens 2 (Developmental):** What was learned from this space?
* **Release Lock Loops:** Applies client-side time locks restricting data access for either 2 days (`edza mangwana`) or 30 days.

### 5. Help as a Service Protection Guardrails
* **Strategic Interface Disguise:** The system is disguised visually as a minimal personal journal to guarantee runtime safety if an unauthorized party views the user's screen.
* **Panic Exit Protocol:** Includes a fixed, absolute-positioned `Quick Exit ✕` button at the top-right viewport boundary. Clicking it swaps the current browser history stack and redirects the viewport instantly to Google.
* **Direct Civic Referral Mapping:** The platform states inside `terms.html` that it is an automated tracking tool rather than a crisis medical center. If severe threats or domestic violence patterns are identified, it maps direct referral routes to certified local support systems, including the **Friendship Bench**.

---

## 🚀 Running the App Locally

### 1. Production UI Run (Offline Local-First Mode)
```bash
# Execute via standard local server utility
npx serve .
```

### 2. Edge Serverless Function Emulation
```bash
# Fire up the Netlify local CLI emulation tool
netlify dev
```
*Note: Ensure your local environment configuration profile includes a populated `GEMINI_API_KEY` parameter.*

### 3. Native Node.js Server Run (Backup Engine Path)
```bash
cd backend
npm install
node server.js
```

---

## 🎯 Verification Demo Flow (The 2-Minute Full Test)

1. **Gateway Entry:** Navigate to the gateway view, enter a temporary handle, and let the background interval rotate the visual text hooks.
2. **Raw Capture:** Type an unfiltered, complex thought (e.g., *"I want to launch this business but family remittance is keeping me broke"*).
3. **Pattern Reflection:** Click `Reflect My Raws`. The system will instantly call Gemini and return a warm, non-diagnostic behavioral reflection based on past entries.
4. **Time-Lock Envelope:** Navigate to the Letterbox, apply Lens 1 and Lens 2 parameters, and seal the note under a 2-day temporal window.
5. **Private Auditing:** Open the growth tracker, input your network names, and select `See blurred truth` to view your growth vs. escape balance metrics locally.
6. **Data Sovereignty Check:** Enter Settings, toggle permissions, or completely wipe your device footprint instantly with a single data clearance click.

---

## 🗺️ Vision

Human growth requires shifting away from purely punitive patterns. True stability is built when individuals are trained to analyze their real-world environments through operational lenses of growth and resilience, believing there is a path forward for them.

Built in Harare, for complex individuals. Death of something is birth of something.
