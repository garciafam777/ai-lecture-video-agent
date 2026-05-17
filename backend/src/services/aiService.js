const axios = require("axios");

exports.generateScenes = async (script) => {
  const prompt = `
You are a lecture generator.

Break this lecture into scenes.

Each scene must include:
- title
- narration
- visual_description

Return ONLY valid JSON array.

Lecture:
${script}
`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  const content = response.data.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error("JSON parse failed:", content);
    throw new Error("Invalid AI response format");
  }
};
