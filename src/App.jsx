// src/App.jsx

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

monaco.languages.register({ id: "earl" });

monaco.languages.setMonarchTokensProvider("earl", {
  keywords: [
    "ambil", "apg", "atur", "aturheader", "benar", "salah", "tidak benar", "baca",
    "berhenti", "buka", "dari", "bukaPintu", "pesanBerhasil", "pesanGagal", "cobaTangkap",
    "daftar", "buat", "panjang", "tambah", "hapuspop",
    "gabung", "sisip", "hapus", "ada",
    "dikta", "evaluasi", "buatFolder", "hapusFolder", "bacaFolder",
    "gantiNamaFolder", "periksaUkuranFolder", "fungsi", "nama()", "gambar",
    "buat-kanvas", "warna", "mode", "isi", "garis",
    "isi-garis", "kotak", "lingkaran", "poligon",
    "teks", "huruf", "rata", "dasar", "warna-isi",
    "warna-garis", "simpan", "hapus-canvas", "status", "picuAlurKerja",
    "hitung", "ke", "ambildata", "kirimdata", "impor",
    "ingatan", "dengan", "jeda", "jika", "maka", "selesai", "jika-lainnya",
    "lain", "selesai-jika", "kelas", "atribut", "metode",
    "tampilkan", "mewarisi", "kembalikan", "lakukan", "langkah",
    "berakhir", "masuklingkup", "keluarlingkup", "periksalingkup",
    "masukkan", "sebagai", "matematika", "mod", "akar",
    "bulatkan", "lantai", "plafon", "acak", "mutlak",
    "tambah", "kurang", "kali", "bagi", "pangkat",
    "log", "sin", "cos", "tan", "pi", "akarKubik",
    "akaKeN", "faktorial", "modulus", "sec", "csc",
    "cot", "derajatKeRadian", "radianKeDerajat", "log2",
    "log10", "melahirkan", "memanjat", "membangun", "sampai",
    "cairkanTeks", "cairkanAngka", "mengandung", "mengangkat",
    "panggilMetode", "peranti", "periksa", "memori", "konteks",
    "gambar", "semua", "peringatan", "bahaya", "info",
    "prosesor", "simpan", "-v", "memory",
    "tanya", "teks", "besarkan", "kecilkan", "ganti", "pangkas",
    "pecah", "cocok", "tetapkan", "pilihan",
    "tulis", "tutup", "ulangi", "setiap", "lanjutkan",
    "ulangi_sebelumnya", "untukSetiap", "versi",
    "waktu", "bulan", "hari", "hitungmundur", "sekarang",
    "tunda", "format", "formatkustom", "stempelwaktu", "beda",
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

monaco.languages.registerCompletionItemProvider("earl", {
  provideCompletionItems: () => {
    const keywords = monaco.languages.getLanguages()
      .find(lang => lang.id === "earl").keywords || [];
    
    const suggestions = keywords.map((kw) => ({
      label: kw,
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: kw,
      documentation: `Keyword Earl: ${kw}`,
    }));

    return { suggestions };
  },
});

function App() {
  const [code, setCode] = useState('tampilkan "Halo Dunia!"');
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const result = await window.api.runEarl(code); // harus disiapkan di preload.js
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
      <button
        onClick={runCode}
        style={{ padding: "10px", background: "#333", color: "#fff" }}
      >
        Jalankan
      </button>
      <pre
        style={{
          flex: 1,
          background: "#111",
          color: "#0f0",
          margin: 0,
          padding: "10px",
        }}
      >
        {output}
      </pre>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
