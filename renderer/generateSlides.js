const fs = require("fs");

function createSlide(scene) {
  return `
  <html>
    <body style="font-family: Arial; padding: 40px;">
      <h1>${scene.title}</h1>
      <p>${scene.narration}</p>
      <div style="color: gray; margin-top: 20px;">
        ${scene.visual_description}
      </div>
    </body>
  </html>
  `;
}

function generateSlides(scenes) {
  if (!fs.existsSync("slides")) {
    fs.mkdirSync("slides");
  }

  scenes.forEach((scene, i) => {
    fs.writeFileSync(`slides/scene-${i}.html`, createSlide(scene));
  });
}

module.exports = { generateSlides };
