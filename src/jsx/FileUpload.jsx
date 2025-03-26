"use client"
import { useState, useRef } from "react";
import "../css/FileUpload.css";

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        id: Math.random().toString(36).substring(2),
        progress: 0,
        status: "ready",
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        id: Math.random().toString(36).substring(2),
        progress: 0,
        status: "ready",
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // const uploadFiles = async () => {
  //   if (files.length === 0 || uploading) return;
  //   setUploading(true);

  //   const token = localStorage.getItem("token");

  //   setFiles((prev) => prev.map((fileItem) => ({ ...fileItem, status: "uploading" })));

  //   const uploadPromises = files.map((fileItem, index) => {
  //     return new Promise((resolve) => {
  //       const interval = setInterval(() => {
  //         setFiles((prev) => {
  //           const newFiles = [...prev];
  //           if (newFiles[index].progress < 100) {
  //             newFiles[index].progress += 5;
  //           } else {
  //             clearInterval(interval);
  //             newFiles[index].status = "complete";
  //             resolve();
  //           }
  //           return newFiles;
  //         });
  //       }, 200);
  //     });
  //   });

  //   await Promise.all(uploadPromises);
  //   setUploading(false);
  // };

  const uploadFiles = async () => {
    if (files.length === 0 || uploading) return;
    setUploading(true);

    const token = localStorage.getItem("token"); // Retrieve JWT token

    const uploadPromises = files.map(async (fileItem) => {
      const formData = new FormData();
      formData.append("file", fileItem.file);

      try {
        const response = await fetch("http://localhost:8000/upload-and-encrypt/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in header
          },
          body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Upload failed");

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id
              ? { ...f, status: "complete", progress: 100 }
              : f
          )
        );
      } catch (error) {
        console.error("Upload failed:", error);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id
              ? { ...f, status: "error", progress: 0 }
              : f
          )
        );
      }
    });

    await Promise.all(uploadPromises);
    setUploading(false);
  };


  const removeFile = (id) => setFiles((prev) => prev.filter((fileItem) => fileItem.id !== id));

  return (
    <section className="upload-section">
      <div className="upload-container">
        <div className="text-center mb-10">
          <h2 className="title">Upload Your Files</h2>
          <p className="subtitle">Drag and drop or click to browse. Supports images, audio, video, and documents.</p>
        </div>

        <div className="upload-box">
          <div
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <p>Drag & drop files here or click to select</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <div className="file-list">
            {files.map((fileItem) => (
              <div className="file-item" key={fileItem.id}>
                <span>{fileItem.file.name}</span>
                <span className={`status ${fileItem.status}`}>{fileItem.status}</span>
                <progress value={fileItem.progress} max="100" />
                <button onClick={() => removeFile(fileItem.id)}>Remove</button>
              </div>
            ))}
          </div>

          <button className="upload-btn" onClick={uploadFiles} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default FileUpload;