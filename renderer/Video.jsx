import { Composition } from "remotion";

export const Video = ({ scenes }) => {
  return (
    <>
      {scenes.map((scene, i) => (
        <div key={i} style={{ padding: 40 }}>
          <h1>{scene.title}</h1>
          <p>{scene.narration}</p>
        </div>
      ))}
    </>
  );
};
