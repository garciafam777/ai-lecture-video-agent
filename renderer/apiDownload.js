const path = require("path");
const fs = require("fs");

exports.downloadVideo = (req, res) => {
  const outputPath = path.join(__dirname, "../output/video.mp4");

  if (!fs.existsSync(outputPath)) {
    return res.status(404).json({ 
      error: "Video not found",
      message: "Generate the video first using /api/video/create-full"
    });
  }

  res.download(outputPath, "lecture-video.mp4", (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).json({ error: "Failed to download video" });
    }
  });
};
