// src/App.jsx

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Editor from "@monaco-editor/react";
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

monaco.languages.register({ id: "earl" });

monaco.languages.setMonarchTokensProvider("earl", {
  keywords: [
    "tampilkan", "jika", "jikaLainnya", "maka", "selesai",
    "fungsi", "kelas", "atribut", "metode",
    "ulangi", "untukSetiap", "berhenti",
    "cobaTangkap", "kembalikan", "tetapkan", "atur",
    "masukkan", "simpan", "buka", "tutup", "waktu"
  ],

  tokenizer: {
    root: [
      [/[a-zA-Z_]\w*/, {
        cases: {
          "@keywords": "keyword",
          "@default": "identifier"
        }
      }],
      [/".*?"/, "string"],
      [/[0-9]+/, "number"],
      [/==|!=|<=|>=|<|>/, "operator"],
      [/[{}()\[\]]/, "@brackets"],
    ],
  },
});

monaco.editor.defineTheme("earlTheme", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "keyword", foreground: "C586C0", fontStyle: "bold" },
    { token: "string", foreground: "CE9178" },
    { token: "number", foreground: "B5CEA8" },
    { token: "operator", foreground: "D4D4D4" },
  ],
});

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
          language="earl"
          theme="earlTheme"
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
