const path = require("path");
const os = require("os");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "../output");
const SLIDES_DIR = path.join(__dirname, "../slides");
const AUDIO_DIR = path.join(__dirname, "../audio");

// Ensure directories exist
[OUTPUT_DIR, SLIDES_DIR, AUDIO_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

exports.OUTPUT_DIR = OUTPUT_DIR;
exports.SLIDES_DIR = SLIDES_DIR;
exports.AUDIO_DIR = AUDIO_DIR;

exports.getOutputPath = (filename) => path.join(OUTPUT_DIR, filename);
exports.getSlidePath = (filename) => path.join(SLIDES_DIR, filename);
exports.getAudioPath = (filename) => path.join(AUDIO_DIR, filename);

exports.ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};
