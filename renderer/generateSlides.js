const fs = require("fs");
const path = require("path");

function createSlide(scene, index, total) {
  const style = scene.visual_style || { bg: "#1a1a2e", text: "#eee", accent: "#e94560" };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: ${style.bg};
      color: ${style.text};
      width: 1920px;
      height: 1080px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      overflow: hidden;
    }
    .slide-number {
      position: absolute;
      top: 40px;
      right: 60px;
      font-size: 24px;
      opacity: 0.5;
    }
    h1 {
      font-size: 72px;
      margin-bottom: 40px;
      text-align: center;
      line-height: 1.2;
      color: ${style.accent};
    }
    p {
      font-size: 36px;
      line-height: 1.6;
      text-align: center;
      max-width: 1400px;
    }
    .visual-desc {
      position: absolute;
      bottom: 40px;
      left: 60px;
      font-size: 20px;
      opacity: 0.4;
      font-style: italic;
    }
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 8px;
      background: ${style.accent};
      width: ${((index + 1) / total) * 100}%;
      transition: width 0.3s;
    }
  </style>
</head>
<body>
  <div class="slide-number">${index + 1} / ${total}</div>
  <h1>${scene.title}</h1>
  <p>${scene.narration}</p>
  <div class="visual-desc">${scene.visual_description || ''}</div>
  <div class="progress-bar"></div>
</body>
</html>
  `;
}

function generateSlides(scenes) {
  const slidesDir = path.join(__dirname, "../slides");

  if (!fs.existsSync(slidesDir)) {
    fs.mkdirSync(slidesDir, { recursive: true });
  }

  // Clean old slides
  const oldFiles = fs.readdirSync(slidesDir);
  oldFiles.forEach(file => {
    if (file.endsWith('.html')) fs.unlinkSync(path.join(slidesDir, file));
  });

  scenes.forEach((scene, i) => {
    const html = createSlide(scene, i, scenes.length);
    fs.writeFileSync(path.join(slidesDir, `scene-${i}.html`), html);
  });

  console.log(`✅ Generated ${scenes.length} slides in ${slidesDir}`);
  return slidesDir;
}

module.exports = { generateSlides, createSlide };
