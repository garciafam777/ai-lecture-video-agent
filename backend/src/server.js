require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const videoRoutes = require("./routes/videroutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files (slides, audio, output videos)
app.use("/output", express.static(path.join(__dirname, "../../output")));
app.use("/slides", express.static(path.join(__dirname, "../../slides")));
app.use("/audio", express.static(path.join(__dirname, "../../audio")));

app.use("/api/video", videoRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📁 Serving static files from /output, /slides, /audio`);
});
