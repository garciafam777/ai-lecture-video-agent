const axios = require("axios");
const fs = require("fs");

exports.generateVoice = async (text, voiceId, output) => {
  const res = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    { text },
    {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY
      },
      responseType: "arraybuffer"
    }
  );

  fs.writeFileSync(output, res.data);
  return output;
};
