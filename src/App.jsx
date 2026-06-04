import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8080/api/v1/documents";

function App() {
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState("");
  const [extractStatus, setExtractStatus] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDocumentId(response.data.document_id);
      alert("Upload successful! Document ID: " + response.data.document_id);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleExtract = async () => {
    if (!documentId) {
      alert("Please upload a document first");
      return;
    }

    setLoading(true);
    setExtractStatus("Extracting text...");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/data/raw/${documentId}.pdf/extract`
      );

      setExtractStatus("Extraction successful! Text length: " + response.data.text_length);
    } catch (error) {
      console.error(error);
      setExtractStatus("Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!documentId) {
      alert("Please upload and extract a document first");
      return;
    }
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/data/raw/${documentId}.pdf/query`,
        { question }
      );

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert("Query failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Medical Document QA</h1>

      {/* Upload Section */}
      <section style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>1. Upload PDF</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        />
        <br />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {documentId && (
          <div style={{ marginTop: "10px" }}>
            <strong>Document ID:</strong>{" "}
            <code style={{ background: "#f0f0f0", padding: "4px 8px" }}>
              {documentId}
            </code>
          </div>
        )}
      </section>

      {/* Extract Section */}
      <section style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>2. Extract Text</h2>
        <button
          onClick={handleExtract}
          disabled={loading || !documentId}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          {loading ? "Extracting..." : "Extract Text"}
        </button>
        {extractStatus && <p style={{ marginTop: "10px" }}>{extractStatus}</p>}
      </section>

      {/* Query Section */}
      <section style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>3. Ask a Question</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., Who is the doctor?"
          style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
        />
        <br />
        <button
          onClick={handleQuery}
          disabled={loading || !documentId}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          {loading ? "Querying..." : "Ask Question"}
        </button>

        {answer && (
          <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <h3>Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;