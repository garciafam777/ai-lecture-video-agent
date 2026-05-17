const axios = require("axios");

exports.generateAvatarVideo = async (audioUrl, options = {}) => {
  if (!process.env.HEYGEN_API_KEY) {
    throw new Error("HEYGEN_API_KEY not set in environment");
  }

  const avatarId = options.avatarId || process.env.HEYGEN_AVATAR_ID || "your_avatar";

  console.log(`🎭 Generating avatar video with avatar: ${avatarId}`);

  const res = await axios.post(
    "https://api.heygen.com/v2/video/generate",
    {
      avatar_id: avatarId,
      audio_url: audioUrl,
      video_dimension: options.dimension || "1080p",
      background: options.background || { color: "#1a1a2e" }
    },
    {
      headers: {
        "X-API-KEY": process.env.HEYGEN_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  console.log("✅ Avatar video generated");
  return res.data.video_url;
};

exports.getAvatars = async () => {
  const res = await axios.get("https://api.heygen.com/v2/avatars", {
    headers: { "X-API-KEY": process.env.HEYGEN_API_KEY }
  });
  return res.data.data;
};
