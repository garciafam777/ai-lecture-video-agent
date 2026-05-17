const mongoose = require("mongoose");

const SceneSchema = new mongoose.Schema({
  title: String,
  narration: String,
  visual: String,
  audioUrl: String,
  avatarUrl: String
});

const ProjectSchema = new mongoose.Schema({
  script: String,
  scenes: [SceneSchema],
  status: String
});

module.exports = mongoose.model("Project", ProjectSchema);
