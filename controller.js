const { runVideoAgent } = require("../../ai-agent/pipeline");
const { generateVoice } = require("../../tts/elevenlabs");
const { renderVideo } = require("../../renderer/renderVideo");

exports.createFullVideo = async (req, res) => {
  const { script } = req.body;

  const scenes = await runVideoAgent(script);

  for (let i = 0; i < scenes.length; i++) {
    const audio = await generateVoice(
      scenes[i].narration,
      "voice_id",
      `audio-${i}.mp3`
    );

    scenes[i].audio = audio;
  }

  await renderVideo(scenes);

  res.download("output/video.mp4");
};
