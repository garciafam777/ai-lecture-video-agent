// renderer/renderVideo.js
const { renderMedia } = require("@remotion/renderer");

exports.renderVideo = async (scenes) => {
  await renderMedia({
    composition: "Video",
    serveUrl: "http://localhost:3000",
    codec: "h264",
    outputLocation: "output/video.mp4",
    inputProps: { scenes },
    width: 1920,
    height: 1080
  });
};
