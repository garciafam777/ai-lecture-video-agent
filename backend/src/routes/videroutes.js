const express = require("express");
const router = express.Router();
const { createVideo, createFullVideo, downloadVideo } = require("../controllers/videoController");

// Generate scenes only
router.post("/create", createVideo);

// Full pipeline: scenes + audio + slides
router.post("/create-full", createFullVideo);

// Download generated video
router.get("/download", downloadVideo);

module.exports = router;
