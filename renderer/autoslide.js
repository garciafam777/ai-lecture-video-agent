const { generateSlides } = require("./generateSlides");

exports.autoGenerateSlides = async (scenes) => {
  console.log("🎨 Auto-generating slides from scenes...");
  const slidesDir = await generateSlides(scenes);
  console.log(`✅ Slides saved to: ${slidesDir}`);
  return slidesDir;
};
