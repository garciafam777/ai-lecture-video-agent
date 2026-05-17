import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [script, setScript] = useState("");
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/video/create", {
        script
      });

      setScenes(res.data.scenes);
    } catch (err) {
      console.error(err);
      alert("Error generating scenes");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🎬 AI Lecture Builder</h1>

      <textarea
        rows={10}
        style={{ width: "100%", marginBottom: 10 }}
        placeholder="Paste your lecture..."
        onChange={(e) => setScript(e.target.value)}
      />

      <button onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate Scenes"}
      </button>

      <hr />

      {scenes.map((scene, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
          <h3>{scene.title}</h3>
          <p>{scene.narration}</p>
          <small>{scene.visual_description}</small>
        </div>
      ))}
    </div>
  );
}
