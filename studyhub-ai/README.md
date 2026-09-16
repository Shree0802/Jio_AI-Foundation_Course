# StudyHub AI • Your Smart Study Companion 🎓

StudyHub AI is an AI-powered academic productivity application designed to reduce study stress for students who feel overwhelmed by long chapters, messy notes, and complex multi-week project deadlines.

---

## 🎯 Target Audience & Problem Statement
* **Target User**: Aisha (Age 14) and students worldwide.
* **Core Problem**: Students get overwhelmed by information overload, unorganized raw notes, dense textbook paragraphs, and intimidating assignment goals.
* **Solution**: StudyHub AI provides three specialized AI study engines:
  1. **AI Notetaker**: Transforms messy, unorganized text into clean Markdown notes structured under meaningful headings.
  2. **AI Summarizer**: Condenses long paragraphs into 3–5 revision bullet points + 1 key takeaway sentence.
  3. **AI Work Planner**: Breaks large academic goals into actionable step-by-step tasks with realistic time estimates and suggested next actions.

---

## 🛠️ Technology Stack
* **Frontend**: React 18, Vite, Custom Glassmorphic Dark UI (CSS3), Lucide Icons.
* **Backend**: Node.js, Express.js (ES Modules).
* **AI Integration**: Google Gemini API (`gemini-2.5-flash` model via `@google/genai` SDK) with structured JSON Schema responses.
* **Resiliency**: Built-in **Demo Mode** fallback generator for seamless offline / keyless evaluation.

---

## 🚀 Key Features

### 1. 📝 AI Notetaker
* Paste raw, messy notes from lectures or textbooks.
* Generates structured Markdown with headings (`##`, `###`) and clean bullet points (`•`).
* Eliminates repetition while strictly preserving factual accuracy without hallucinating facts.
* Actions: Copy to clipboard, download as `.txt` file, clear input/output.

### 2. ⚡ AI Summarizer
* Distills dense articles and chapters into 3–5 key bullet points.
* Highlights a dedicated **Key Takeaway** box for quick pre-exam review.

### 3. 📅 AI Work Planner
* Inputs project goals, target deadlines, available daily study time, and difficulty levels.
* Generates timed step-by-step milestones, calculates total estimated duration, and suggests an immediate first action.

### 4. 🚀 Demo Mode & Error Handling
* Works out of the box even without a Gemini API key.
* Includes 6 pre-loaded subject presets (Biology, History, Computer Science, AI, Solar System, and Hindi).
* Graceful user-facing error notifications ("Looks empty—paste some text first!").

---

## 🔐 Environment Variables & Security

> **IMPORTANT**: The Gemini API key is kept strictly confidential on the Express server and is NEVER exposed to frontend JavaScript code.

Copy `.env.example` to create your local `.env` file:

```bash
cp .env.example .env
```

Set your variables inside `.env`:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

*If `GEMINI_API_KEY` is missing or invalid, StudyHub AI automatically switches to **Demo Mode** with realistic sample outputs.*

---

## 🏃 Quick Start Guide

### 1. Install Dependencies
Run npm install in root, server, and client directories:

```bash
cd studyhub-ai
npm install
npm --prefix server install
npm --prefix client install
```

### 2. Start Development Servers (Backend + Frontend Concurrently)

```bash
npm run dev
```

* **Frontend UI**: `http://localhost:3000`
* **Backend Express Server**: `http://localhost:5000`
* **Health API Check**: `http://localhost:5000/api/health`

---

## 🔌 API Architecture & Endpoints

| Endpoint | Method | Payload | Description |
|---|---|---|---|
| `/api/health` | GET | None | Backend status and AI Mode (`live` vs `demo`) |
| `/api/organize-notes` | POST | `{ "text": "..." }` | Organizes messy notes into Markdown |
| `/api/summarize` | POST | `{ "text": "..." }` | Generates 3-5 bullets + Key Takeaway |
| `/api/plan` | POST | `{ "goal": "...", "deadline": "...", "availableTime": "...", "difficulty": "..." }` | Returns timed step-by-step project plan |

---

## ♿ Accessibility & UX Design
* **Typography**: Base body size 16px (1rem), 1.6 line height for high readability.
* **Theme**: Modern dark academic design (`#0B0F19`) with purple/blue glowing accents.
* **Navigation**: Full keyboard focus rings (`:focus-visible`), aria labels, and screen-reader accessibility.
* **Responsiveness**: Tested on mobile (1-column stack), tablet (2-column grid), and desktop (3-column layout).

---

## 🧪 Testing Checklist Completed
- [x] Backend Express API startup & `/api/health` endpoint.
- [x] AI Notetaker request/response flow.
- [x] AI Summarizer request/response flow.
- [x] AI Work Planner request/response flow.
- [x] Demo Mode fallback when API key is missing.
- [x] Empty input validation & character limit alerts.
- [x] Clipboard copy & file download features.
- [x] Multilingual testing (English & Hindi input).
- [x] LocalStorage recent activity persistence.
- [x] Mobile & tablet responsive layouts.
