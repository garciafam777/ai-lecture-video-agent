import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [script, setScript] = useState("");
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [activeTab, setActiveTab] = useState("scenes");

  const API_URL = "http://localhost:5004";

  const generateScenes = async () => {
    setLoading(true);
    setLoadingStage("Generating scenes with AI...");

    try {
      const res = await axios.post(API_URL + "/api/video/create", { script });
      setScenes(res.data.scenes);
      setActiveTab("scenes");
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.error || err.message));
    }

    setLoading(false);
    setLoadingStage("");
  };

  const generateFullVideo = async () => {
    setLoading(true);
    setLoadingStage("Running full pipeline...");

    try {
      const res = await axios.post(API_URL + "/api/video/create-full", { script });
      setScenes(res.data.scenes);
      setActiveTab("slides");
      alert("Pipeline complete!");
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.error || err.message));
    }

    setLoading(false);
    setLoadingStage("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 1200, margin: "0 auto" }}>
      <h1>AI Lecture Builder</h1>
      <textarea
        rows={10}
        style={{ width: "100%", padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #ddd" }}
        placeholder="Paste your lecture script here..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button onClick={generateScenes} disabled={loading || !script.trim()} style={{ padding: "12px 24px", fontSize: 16, background: "#0070f3", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
          {loading ? "Generating..." : "Generate Scenes"}
        </button>
        <button onClick={generateFullVideo} disabled={loading || !script.trim()} style={{ padding: "12px 24px", fontSize: 16, background: "#0070f3", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
          {loading ? "Running..." : "Full Pipeline"}
        </button>
      </div>

      {loading && <p>{loadingStage}</p>}

      {scenes.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2>Scenes ({scenes.length})</h2>
          {scenes.map((scene, i) => (
            <div key={i} style={{ border: "1px solid #ddd", padding: 16, marginTop: 12, borderRadius: 8 }}>
              <h3>{scene.title}</h3>
              <p>{scene.narration}</p>
              <small>Visual: {scene.visual_description}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}