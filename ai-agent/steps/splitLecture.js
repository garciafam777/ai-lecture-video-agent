// ai-agent/steps/splitLecture.js
const openai = require("../utils/openai");

exports.splitLecture = async (script) => {
  const prompt = `
  Break this lecture into logical sections.
  Keep them short and structured.
  Return JSON array.
  `;

  return openai(prompt + script);
};
