const { splitLecture } = require("./steps/splitLecture");
const { enhanceScenes } = require("./steps/enhanceScenes");
const { assignVisuals } = require("./steps/assignVisuals");

exports.runVideoAgent = async (script) => {
  const sections = await splitLecture(script);

  const scenes = await enhanceScenes(sections);

  const finalScenes = await assignVisuals(scenes);

  return finalScenes;
};
