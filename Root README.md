# 🎬 AI Lecture Video Agent (MVP)

Turn raw text into structured lecture scenes with AI.

## 🚀 Features (MVP)
- Paste lecture text
- Auto-generate scenes using AI
- Preview structured lecture content
- Generate basic HTML slides

## 🧱 Stack
- Frontend: Next.js
- Backend: Node.js (Express)
- AI: OpenAI API
- Rendering: HTML slides (MVP)

---

## ⚙️ Setup

### 1. Clone
git clone https://github.com/yourname/ai-lecture-video-agent.git
cd ai-lecture-video-agent

### 2. Env Setup
cp .env.example .env

Fill in:
OPENAI_API_KEY=your_key_here

---

## ▶️ Run Backend
cd backend
npm install
node src/server.js

---

## ▶️ Run Frontend
cd frontend
npm install
npm run dev

---

## 🌐 Access
http://localhost:3000

---

## 📌 Roadmap
- [ ] Add TTS (voice)
- [ ] Add avatar integration
- [ ] Add video rendering (Remotion)
- [ ] Add timeline editor
