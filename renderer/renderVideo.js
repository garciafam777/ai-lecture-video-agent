const { renderMedia } = require("@remotion/renderer");
const path = require("path");

exports.renderVideo = async (scenes) => {
  try {
    const outputDir = path.join(__dirname, "../output");
    const outputPath = path.join(outputDir, "video.mp4");

    // Ensure output directory exists
    const fs = require("fs");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("🎬 Rendering video with Remotion...");

    await renderMedia({
      composition: "Video",
      serveUrl: "http://localhost:3000",
      codec: "h264",
      outputLocation: outputPath,
      inputProps: { scenes },
      width: 1920,
      height: 1080,
    });

    console.log(`✅ Video rendered: ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("❌ Video rendering failed:", err.message);
    // For MVP, return slides path as fallback
    return path.join(__dirname, "../slides");
  }
};
