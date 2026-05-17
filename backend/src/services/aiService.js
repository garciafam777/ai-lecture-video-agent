const axios = require("axios");

exports.generateScenes = async (script) => {
  const prompt = `
You are a professional lecture content designer.

Break this lecture into engaging, well-structured scenes.

For each scene, provide:
- title: Clear, compelling title (max 6 words)
- narration: Natural spoken narration (2-4 sentences, conversational tone)
- visual_description: What should appear on screen (colors, layout, images)
- duration: Estimated duration in seconds (number)

Return ONLY a valid JSON array. No markdown, no code blocks.

Lecture:
${script}
`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const content = response.data.choices[0].message.content;

  try {
    // Try to extract JSON from markdown code blocks or raw JSON
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\[.*\]/s);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
    const parsed = JSON.parse(jsonStr);

    // Ensure each scene has required fields
    return parsed.map((scene, i) => ({
      title: scene.title || `Scene ${i + 1}`,
      narration: scene.narration || scene.content || "",
      visual_description: scene.visual_description || scene.visual || "Simple text slide",
      duration: scene.duration || 5
    }));
  } catch (e) {
    console.error("JSON parse failed:", content);
    console.error("Parse error:", e.message);

    // Fallback: return a single scene with the full script
    return [{
      title: "Full Lecture",
      narration: script.substring(0, 500),
      visual_description: "Single slide with full content",
      duration: 10
    }];
  }
};
