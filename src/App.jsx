// src/App.jsx

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState('tampilkan "Halo Dunia!"');
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const result = await window.api.runEarl(code);
    setOutput(result);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          language="javascript"
          value={code}
          onChange={(val) => setCode(val ?? "")}
        />
      </div>
      <button onClick={runCode} style={{ padding: "10px", background: "#333", color: "#fff" }}>
        Jalankan
      </button>
      <pre style={{ flex: 1, background: "#111", color: "#0f0", margin: 0, padding: "10px" }}>
        {output}
      </pre>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
