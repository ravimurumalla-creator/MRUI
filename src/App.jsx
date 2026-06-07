import { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8080/api/v1/documents";

function App() {
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState("");
  const [extractStatus, setExtractStatus] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData);
      setDocumentId(response.data.document_id);
      alert(`Upload successful! Document ID: ${response.data.document_id}`);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleExtract = async () => {
    if (!documentId) return alert("Please upload a document first");
    setLoading(true);
    setExtractStatus("Extracting text...");
    try {
      const response = await axios.post(`${API_BASE_URL}/data/raw/${documentId}.pdf/extract`);
      setExtractStatus(`Extraction successful! Text length: ${response.data.text_length || "N/A"}`);
    } catch (error) {
      console.error(error);
      setExtractStatus("Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!documentId) return alert("Please upload and extract a document first");
    if (!question.trim()) return alert("Please enter a question");
    setLoading(true);
    setAnswer("");
    try {
      const response = await axios.post(`${API_BASE_URL}/data/raw/${documentId}.pdf/query`, { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert("Query failed");
    } finally {
      setLoading(false);
    }
  };

  const statCard = (value, label) => (
    <div
      style={{
        flex: 1,
        minWidth: "160px",
        padding: "18px",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(148,163,184,0.18)",
        color: "#e2e8f0",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{value}</div>
      <div style={{ marginTop: "6px", fontSize: "0.95rem", color: "#cbd5e1" }}>{label}</div>
    </div>
  );

  const featureCard = (title, text) => (
    <div
      style={{
        padding: "18px",
        borderRadius: "18px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "8px", color: "#0f172a" }}>{title}</h3>
      <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>{text}</p>
    </div>
  );

  const sectionStyle = {
    marginBottom: "24px",
    padding: "22px",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "12px",
    boxSizing: "border-box",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "0.98rem",
  };

  const buttonBase = {
    padding: "12px 18px",
    cursor: "pointer",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontWeight: 600,
    transition: "transform 0.15s ease, opacity 0.15s ease",
  };

  return (
    <div
      style={{
        minHeight: "150vh",
        background:
          "linear-gradient(180deg, #02111d 0%, #081c2d 100%)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <header
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "22px 20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#e2e8f0",
        }}
      >
        <div>
          <div style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "0.3px" }}>
            Medical AI Intelligence
          </div>
          <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
            Secure document understanding for healthcare workflows
          </div>
        </div>
        <div
          style={{
            fontSize: "0.9rem",
            padding: "8px 12px",
            borderRadius: "999px",
            border: "1px solid rgba(148,163,184,0.22)",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          FastAPI + React + AWS
        </div>
      </header>

      <section
        style={{
          display: "flex",
          //.gridTemplateColumns: "1.05fr 0.95fr",./</div>
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px 26px",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ position: "center" }}>
          <div
            style={{
              position: "absolute",
              inset: "18px",
              background:
                "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.25), transparent 55%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.18), transparent 50%)",
              filter: "blur(14px)",
            }}
          />
          <img
            src="/medical_ai_hero.png"
            alt="Medical AI illustration"
            style={{
              position: "center",
              width: "100%",
              borderRadius: "26px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        </div>       
          <h1
            style={{
              fontSize: "clamp(2.4rem, 4vw, 4.6rem)",
              lineHeight: 1.03,
              margin: 0,
              color: "#f8fafc",
              maxWidth: "40ch",
            }}
          >
            AI-powered medical document analysis.
          </h1>
          <p
            style={{
              marginTop: "18px",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "#cbd5e1",
              maxWidth: "1250px",
            }}
          >
            Upload a PDF, extract its contents, and ask questions through a polished healthcare-grade
            interface designed for clarity and trust.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "26px" }}>
            {statCard("PDF", "Upload documents")}
            {statCard("AI", "Ask questions")}
            {statCard("S3", "Secure storage")}
          </div>
        </div>

       
      </section>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 64px" }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          {featureCard("1. Upload", "Users upload a medical PDF and the backend stores it in S3 with a document ID.")}
          {featureCard("2. Extract", "The system extracts the document text and prepares it for question answering.")}
          {featureCard("3. Query", "Users ask natural language questions and get answers from the backend pipeline.")}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          <section
            style={{
              padding: "22px",
              borderRadius: "20px",
              background: "#0b30e8",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>About the App</h2>
            <p style={{ lineHeight: 1.7, color: "rgb(1, 7, 16)" }}>
              This application helps users upload medical PDFs, extract text, and ask questions in a secure and
              intuitive way. It is designed to feel like a real medical AI product with a clean and professional
              experience.
            </p>
          </section>
          <section
            style={{
              padding: "22px",
              borderRadius: "20px",
              background: "#0b30e8",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>About Me</h2>
            <p style={{ lineHeight: 1.7, color: "#000307" }}>
              I built this project to show a practical medical document intelligence workflow using modern cloud
              deployment, API design, and a polished user interface.
            </p>
          </section>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0 }}>1. Upload PDF</h2>
          <p style={{ color: "#01050c", marginTop: "-4px" }}>Choose a PDF document to begin the workflow.</p>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <div style={{ marginTop: "14px" }}>
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              style={{ ...buttonBase, background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {documentId && (
            <div
              style={{
                marginTop: "12px",
                padding: "12px 14px",
                background: "#4012b4",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <strong>Document ID:</strong> <code>{documentId}</code>
            </div>
          )}
        </section>

        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0 }}>2. Extract Text</h2>
          <p style={{ color: "#00050c", marginTop: "-4px" }}>Run extraction on the uploaded document.</p>
          <button
            onClick={handleExtract}
            disabled={loading || !documentId}
            style={{ ...buttonBase, background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
          >
            {loading ? "Extracting..." : "Extract"}
          </button>
          {extractStatus && <p style={{ marginTop: "12px", color: "#334155" }}>{extractStatus}</p>}
        </section>

        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0 }}>3. Ask a Question</h2>
          <p style={{ color: "#64748b", marginTop: "-4px" }}>Query the document using natural language.</p>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Who is the doctor?"
            style={inputStyle}
          />
          <button
            onClick={handleQuery}
            disabled={loading || !documentId}
            style={{ ...buttonBase, background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
          {answer && (
            <div
              style={{
                marginTop: "16px",
                padding: "14px",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <strong>Answer:</strong>
              <p style={{ marginBottom: 0, lineHeight: 1.7 }}>{answer}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;