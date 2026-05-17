const { generateScenes } = require("../services/aiService");

exports.createVideo = async (req, res) => {
  try {
    const { script } = req.body;

    if (!script) {
      return res.status(400).json({ error: "Script is required" });
    }

    const scenes = await generateScenes(script);

    res.json({
      success: true,
      scenes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate scenes" });
  }
};
