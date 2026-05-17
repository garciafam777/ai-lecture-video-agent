const openai = require("../utils/openai");

exports.enhanceScenes = async (sections) => {
  const prompt = `
You are a professional lecture content enhancer.

Take these lecture sections and enhance them into detailed scenes.
For each scene, provide:
- title: A clear, engaging title
- narration: Natural, spoken narration text (2-3 sentences)
- visual_description: Description of what should appear on screen

Return ONLY a valid JSON array of objects with these exact keys: title, narration, visual_description.

Sections:
${JSON.stringify(sections, null, 2)}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content;

  // Extract JSON from potential markdown code blocks
  const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\[.*\]/s);
  const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("JSON parse failed:", content);
    // Fallback: return basic structure
    return sections.map((section, i) => ({
      title: `Scene ${i + 1}`,
      narration: section,
      visual_description: "Simple text slide"
    }));
  }
};
