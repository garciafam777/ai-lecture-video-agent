import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [script, setScript] = useState("");
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [activeTab, setActiveTab] = useState("scenes"); // scenes | slides | preview

  const generateScenes = async () => {
    setLoading(true);
    setLoadingStage("Generating scenes with AI...");

    try {
      const res = await axios.post("http://localhost:5000/api/video/create", {
        script
      });

      setScenes(res.data.scenes);
      setActiveTab("scenes");
    } catch (err) {
      console.error(err);
      alert("Error generating scenes: " + (err.response?.data?.error || err.message));
    }

    setLoading(false);
    setLoadingStage("");
  };

  const generateFullVideo = async () => {
    setLoading(true);
    setLoadingStage("Running full pipeline: AI → Voice → Slides...");

    try {
      const res = await axios.post("http://localhost:5000/api/video/create-full", {
        script
      });

      setScenes(res.data.scenes);
      setActiveTab("slides");
      alert("✅ Full pipeline complete! Check the slides and audio tabs.");
    } catch (err) {
      console.error(err);
      alert("Error in pipeline: " + (err.response?.data?.error || err.message));
    }

    setLoading(false);
    setLoadingStage("");
  };

  const downloadVideo = () => {
    window.open("http://localhost:5000/api/video/download", "_blank");
  };

  return (
    <div style={{ padding: 20, fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>🎬 AI Lecture Builder</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>Turn your lecture script into structured scenes with AI-generated voiceovers and slides.</p>

      <div style={{ marginBottom: 20 }}>
        <textarea
          rows={10}
          style={{ 
            width: "100%", 
            padding: 12, 
            fontSize: 16, 
            borderRadius: 8, 
            border: "1px solid #ddd",
            fontFamily: "inherit",
            resize: "vertical"
          }}
          placeholder="Paste your lecture script here... (e.g., 'Introduction to Machine Learning: Machine learning is a subset of artificial intelligence...')"
          value={script}
          onChange={(e) => setScript(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <button 
          onClick={generateScenes} 
          disabled={loading || !script.trim()}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            background: loading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600
          }}
        >
          {loading && loadingStage.includes("scenes") ? "⏳ Generating..." : "📝 Generate Scenes Only"}
        </button>

        <button 
          onClick={generateFullVideo}
          disabled={loading || !script.trim()}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            background: loading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600
          }}
        >
          {loading && loadingStage.includes("pipeline") ? "⏳ Running Pipeline..." : "🚀 Full Pipeline (Scenes + Voice + Slides)"}
        </button>

        {scenes.length > 0 && (
          <button 
            onClick={downloadVideo}
            style={{
              padding: "12px 24px",
              fontSize: 16,
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            ⬇️ Download Video
          </button>
        )}
      </div>

      {loading && (
        <div style={{ padding: 16, background: "#f0f0f0", borderRadius: 8, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 20, height: 20, border: "3px solid #0070f3", borderTop: "3px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <span style={{ fontSize: 16, color: "#333" }}>{loadingStage}</span>
          </div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {scenes.length > 0 && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, borderBottom: "2px solid #eee" }}>
            {["scenes", "slides", "preview"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 20px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "3px solid #0070f3" : "3px solid transparent",
                  color: activeTab === tab ? "#0070f3" : "#666",
                  fontWeight: activeTab === tab ? 600 : 400,
                  cursor: "pointer",
                  fontSize: 16,
                  textTransform: "capitalize"
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "scenes" && (
            <div>
              <h2 style={{ marginBottom: 16 }}>Generated Scenes ({scenes.length})</h2>
              {scenes.map((scene, i) => (
                <div key={i} style={{ 
                  border: "1px solid #e0e0e0", 
                  padding: 20, 
                  marginTop: 12,
                  borderRadius: 12,
                  background: "#fafafa"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <h3 style={{ margin: 0, color: "#0070f3" }}>Scene {i + 1}: {scene.title}</h3>
                    <span style={{ fontSize: 14, color: "#888", background: "#eee", padding: "4px 8px", borderRadius: 4 }}>
                      {scene.duration || "~"}s
                    </span>
                  </div>
                  <p style={{ margin: "8px 0", lineHeight: 1.6, fontSize: 15 }}>{scene.narration}</p>
                  <small style={{ color: "#888", display: "block", marginTop: 8, fontStyle: "italic" }}>
                    🎨 Visual: {scene.visual_description}
                  </small>
                  {scene.audioUrl && (
                    <div style={{ marginTop: 12 }}>
                      <audio controls style={{ width: "100%" }}>
                        <source src={`http://localhost:5000${scene.audioUrl}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "slides" && (
            <div>
              <h2 style={{ marginBottom: 16 }}>HTML Slides Preview</h2>
              <p style={{ color: "#666", marginBottom: 16 }}>
                Slides are generated as HTML files. You can view them individually or download all.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                {scenes.map((scene, i) => (
                  <div key={i} style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    overflow: "hidden",
                    background: scene.visual_style?.bg || "#1a1a2e",
                    color: scene.visual_style?.text || "#eee",
                    aspectRatio: "16/9",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 24,
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>{i + 1} / {scenes.length}</div>
                    <h3 style={{ fontSize: 20, marginBottom: 12, color: scene.visual_style?.accent || "#e94560" }}>{scene.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.9 }}>{scene.narration.substring(0, 100)}...</p>
                    <a 
                      href={`http://localhost:5000/slides/scene-${i}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginTop: 16,
                        padding: "8px 16px",
                        background: scene.visual_style?.accent || "#e94560",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: 6,
                        fontSize: 14
                      }}
                    >
                      View Full Slide
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div>
              <h2 style={{ marginBottom: 16 }}>Video Preview</h2>
              <p style={{ color: "#666", marginBottom: 16 }}>
                Full Remotion video rendering coming soon. For now, view individual slides above.
              </p>
              <div style={{ 
                background: "#1a1a2e", 
                borderRadius: 12, 
                padding: 40,
                textAlign: "center",
                color: "#eee"
              }}>
                <h3>🎬 Video Preview</h3>
                <p>Rendering engine: Remotion (setup required)</p>
                <p style={{ marginTop: 16, fontSize: 14, opacity: 0.7 }}>
                  To enable video rendering, run:<br/>
                  <code style={{ background: "#333", padding: "4px 8px", borderRadius: 4 }}>npx remotion studio</code>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
