const openai = require("../utils/openai");

exports.splitLecture = async (script) => {
  const prompt = `
You are a lecture organizer. Break this lecture into 3-8 logical sections.
Each section should be a concise topic or key point.
Return ONLY a valid JSON array of strings (the section titles/topics).

Lecture:
${script}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const content = response.choices[0].message.content;

  // Extract JSON array
  const jsonMatch = content.match(/\[.*\]/s);
  const jsonStr = jsonMatch ? jsonMatch[0] : content;

  try {
    const sections = JSON.parse(jsonStr);
    return Array.isArray(sections) ? sections : [script];
  } catch (e) {
    console.error("JSON parse failed:", content);
    // Fallback: split by newlines or sentences
    return script.split(/\n{2,}|\.\s+/).filter(s => s.trim().length > 10);
  }
};
