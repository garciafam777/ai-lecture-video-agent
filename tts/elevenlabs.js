const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { ensureDir, AUDIO_DIR } = require("../storage/fileStorage");

exports.generateVoice = async (text, voiceId, outputFilename) => {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error("ELEVENLABS_API_KEY not set in environment");
  }

  const outputPath = path.isAbsolute(outputFilename) 
    ? outputFilename 
    : path.join(AUDIO_DIR, outputFilename);

  ensureDir(path.dirname(outputPath));

  console.log(`🔊 Generating voice for: "${text.substring(0, 50)}..."`);

  const res = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    { 
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    },
    {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
      },
      responseType: "arraybuffer"
    }
  );

  fs.writeFileSync(outputPath, Buffer.from(res.data));
  console.log(`✅ Audio saved: ${outputPath}`);

  return outputPath;
};

exports.getVoices = async () => {
  const res = await axios.get("https://api.elevenlabs.io/v1/voices", {
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY }
  });
  return res.data.voices;
};
