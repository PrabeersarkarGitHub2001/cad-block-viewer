import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("Uploading...");

      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Upload successful!");
      console.log("Response:", response.data);
      navigate("/blocks");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload CAD File (.dxf or .dwg)</h2>
      <input type="file" accept=".dxf,.dwg" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} disabled={uploading} style={{ marginTop: "1rem" }}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default UploadForm;
