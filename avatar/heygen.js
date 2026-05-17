const axios = require("axios");

exports.generateAvatarVideo = async (audioUrl) => {
  const res = await axios.post(
    "https://api.heygen.com/v2/video/generate",
    {
      avatar_id: "your_avatar",
      audio_url: audioUrl
    },
    {
      headers: {
        "X-API-KEY": process.env.HEYGEN_API_KEY
      }
    }
  );

  return res.data.video_url;
};
