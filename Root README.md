# 🎬 AI Lecture Video Agent

Turn raw lecture text into structured scenes with AI-generated voiceovers and HTML slides.

## ✨ Features
- 🤖 **AI Scene Generation** — Breaks lectures into logical, narrated scenes using GPT-4o-mini
- 🔊 **Voice Synthesis** — Generates natural voiceovers with ElevenLabs
- 🎨 **HTML Slides** — Creates styled, presentation-ready slides for each scene
- 🎭 **Avatar Integration** — Optional HeyGen avatar video generation
- 🎬 **Video Rendering** — Remotion-based video composition (setup required)

## 🧱 Tech Stack
- **Frontend**: Next.js + React
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-4o-mini
- **TTS**: ElevenLabs API
- **Avatar**: HeyGen API
- **Rendering**: Remotion (optional)
- **Database**: MongoDB (optional)

---

## ⚙️ Setup

### 1. Clone & Install
```bash
git clone https://github.com/garciafam777/ai-lecture-video-agent.git
cd ai-lecture-video-agent
```

### 2. Environment Variables
```bash
cp .env.example .env
```
Fill in your API keys in `.env`:
```
OPENAI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

### 3. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

### 4. Run
```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

### 5. Access
Open http://localhost:3000

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/video/create` | POST | Generate scenes only |
| `/api/video/create-full` | POST | Full pipeline (scenes + voice + slides) |
| `/api/video/download` | GET | Download generated video |

---

## 📁 Project Structure
```
ai-lecture-video-agent/
├── ai-agent/           # AI pipeline (split → enhance → visuals)
├── avatar/             # HeyGen avatar integration
├── backend/            # Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
├── database/           # MongoDB models
├── frontend/           # Next.js React app
├── renderer/           # Remotion video components
├── shared/             # TypeScript types
├── storage/            # File storage utilities
└── tts/                # ElevenLabs voice generation
```

---

## 🗺️ Roadmap
- [x] AI scene generation
- [x] HTML slide generation
- [x] ElevenLabs voice integration
- [x] Express API with endpoints
- [ ] Remotion video rendering
- [ ] HeyGen avatar video generation
- [ ] Timeline editor UI
- [ ] MongoDB project persistence
- [ ] Docker deployment
