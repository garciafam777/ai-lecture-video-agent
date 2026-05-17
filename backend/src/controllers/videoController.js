const { generateScenes } = require("../services/aiService");
const { runVideoAgent } = require("../../../ai-agent/pipeline");
const { generateVoice } = require("../../../tts/elevenlabs");
const { generateSlides } = require("../../../renderer/generateSlides");
const path = require("path");
const fs = require("fs");

// Simple scene generation (original)
exports.createVideo = async (req, res) => {
  try {
    const { script } = req.body;

    if (!script) {
      return res.status(400).json({ error: "Script is required" });
    }

    const scenes = await generateScenes(script);

    res.json({
      success: true,
      scenes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate scenes" });
  }
};

// Full pipeline: scenes + audio + slides
exports.createFullVideo = async (req, res) => {
  try {
    const { script } = req.body;

    if (!script) {
      return res.status(400).json({ error: "Script is required" });
    }

    console.log("🎬 Starting full video pipeline...");

    // Step 1: Generate scenes
    const scenes = await runVideoAgent(script);

    // Step 2: Generate voice for each scene
    console.log("🔊 Generating voiceovers...");
    const audioDir = path.join(__dirname, "../../../audio");
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

    for (let i = 0; i < scenes.length; i++) {
      const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
      const audioPath = path.join(audioDir, `audio-${i}.mp3`);

      try {
        await generateVoice(scenes[i].narration, voiceId, audioPath);
        scenes[i].audioUrl = `/audio/audio-${i}.mp3`;
        console.log(`✅ Audio ${i + 1}/${scenes.length} generated`);
      } catch (err) {
        console.error(`❌ Failed to generate audio for scene ${i}:`, err.message);
        scenes[i].audioUrl = null;
      }
    }

    // Step 3: Generate HTML slides
    console.log("🎨 Generating slides...");
    await generateSlides(scenes);

    // Step 4: Save project to DB (optional, if connected)
    // const Project = require("../../../database/models/Project");
    // await Project.create({ script, scenes, status: "completed" });

    console.log("✅ Pipeline complete!");

    res.json({
      success: true,
      scenes,
      slidesUrl: "/slides",
      message: "Video pipeline complete. Slides and audio generated."
    });

  } catch (err) {
    console.error("Pipeline error:", err);
    res.status(500).json({ error: "Failed to generate full video", details: err.message });
  }
};

// Download endpoint
exports.downloadVideo = async (req, res) => {
  const outputPath = path.join(__dirname, "../../../output/video.mp4");

  if (!fs.existsSync(outputPath)) {
    return res.status(404).json({ error: "Video not found. Generate it first." });
  }

  res.download(outputPath);
};
