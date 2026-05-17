import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";

export const Video = ({ scenes }) => {
  const { fps } = useVideoConfig();

  if (!scenes || scenes.length === 0) {
    return (
      <AbsoluteFill style={{ background: "#1a1a2e", justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ color: "#eee", fontSize: 60 }}>No scenes to render</h1>
      </AbsoluteFill>
    );
  }

  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ background: "#1a1a2e" }}>
      {scenes.map((scene, i) => {
        const durationInFrames = (scene.duration || 5) * fps;
        const from = currentFrame;
        currentFrame += durationInFrames;

        const style = scene.visual_style || { bg: "#1a1a2e", text: "#eee", accent: "#e94560" };

        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames}>
            <AbsoluteFill
              style={{
                background: style.bg,
                justifyContent: "center",
                alignItems: "center",
                padding: 80,
                fontFamily: "'Segoe UI', Arial, sans-serif",
              }}
            >
              <div style={{
                position: "absolute",
                top: 40,
                right: 60,
                fontSize: 24,
                color: style.text,
                opacity: 0.5,
              }}>
                {i + 1} / {scenes.length}
              </div>

              <h1 style={{
                fontSize: 72,
                color: style.accent,
                marginBottom: 40,
                textAlign: "center",
                lineHeight: 1.2,
              }}>
                {scene.title}
              </h1>

              <p style={{
                fontSize: 36,
                color: style.text,
                lineHeight: 1.6,
                textAlign: "center",
                maxWidth: 1400,
              }}>
                {scene.narration}
              </p>

              <div style={{
                position: "absolute",
                bottom: 40,
                left: 60,
                fontSize: 20,
                color: style.text,
                opacity: 0.4,
                fontStyle: "italic",
              }}>
                {scene.visual_description}
              </div>

              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: 8,
                background: style.accent,
                width: `${((i + 1) / scenes.length) * 100}%`,
              }} />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
