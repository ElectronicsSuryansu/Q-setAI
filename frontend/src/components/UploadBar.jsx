import React, { useState } from "react";

export default function UploadBar({ setMessages }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setMessages(prev => [...prev, { role: "user", text: "Uploaded notes 📄" }]);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await fetch("http://localhost:8080/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server returned " + res.status);

      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant", text: data.question }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", text: "Failed to generate questions" }]);
      }

    } catch (err) {
      console.error("Upload error:", err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Error: " + err.message }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="upload-bar">
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>
        {loading ? "Generating..." : "Generate Questions"}
      </button>
    </div>
  );
}
