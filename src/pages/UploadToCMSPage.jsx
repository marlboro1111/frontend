import React, { useState } from 'react';

const UploadToCMSPage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
  
    const formData = new FormData();
    formData.append("file", file);
  
    setStatus("Uploading...");
  
    try {
      // 1. Upload file to backend
      const uploadResponse = await fetch("http://localhost:5000/upload-to-cms", {
        method: "POST",
        body: formData,
      });
  
      const uploadData = await uploadResponse.json();
  
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Upload failed");
      }
  
      // 2. Send extracted content to CMS
      const cmsResponse = await fetch("http://localhost:5000/run-python-function", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: uploadData.content,
        }),
      });
  
      const cmsData = await cmsResponse.json();
  
      if (!cmsResponse.ok) {
        throw new Error(cmsData.error || "CMS update failed");
      }
  
      setStatus("✅ Upload and CMS update successful!");
    } catch (error) {
      console.error("Upload error:", error);
      setStatus(`❌ Error: ${error.message}`);
    }
  };
  
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Upload Document to CMS</h2>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="block w-full"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {status && <p className="text-gray-700">{status}</p>}
    </div>
  );
};

export default UploadToCMSPage;
