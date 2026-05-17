exports.assignVisuals = async (scenes) => {
  // For MVP, assign simple visual styles based on content
  const visualStyles = [
    { bg: "#1a1a2e", text: "#eee", accent: "#e94560" },
    { bg: "#16213e", text: "#eee", accent: "#0f3460" },
    { bg: "#533483", text: "#eee", accent: "#e94560" },
    { bg: "#1a1a2e", text: "#eee", accent: "#16c79a" },
  ];

  return scenes.map((scene, i) => ({
    ...scene,
    visual_style: visualStyles[i % visualStyles.length],
    duration: Math.max(3, Math.ceil(scene.narration.length / 15)), // ~15 chars per second
  }));
};
