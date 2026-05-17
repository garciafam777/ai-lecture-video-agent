const { splitLecture } = require("./steps/splitLecture");
const { enhanceScenes } = require("./steps/enhanceScenes");
const { assignVisuals } = require("./steps/assignVisuals");

exports.runVideoAgent = async (script) => {
  console.log("🤖 Step 1: Splitting lecture into sections...");
  const sections = await splitLecture(script);
  console.log(`✅ Found ${sections.length} sections`);

  console.log("🤖 Step 2: Enhancing scenes...");
  const scenes = await enhanceScenes(sections);
  console.log(`✅ Enhanced ${scenes.length} scenes`);

  console.log("🤖 Step 3: Assigning visuals...");
  const finalScenes = await assignVisuals(scenes);
  console.log("✅ Visuals assigned");

  return finalScenes;
};
