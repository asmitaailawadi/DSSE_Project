import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/MyFiles.css";

function MyFiles() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalFiles, setTotalFiles] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchAllFiles();
  }, [isAuthenticated, navigate]);

  const fetchAllFiles = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`${API_BASE_URL}/files/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const result = await response.json();
      setFiles(result.files.map((path) => ({ file_path: path })));
      setTotalFiles(result.total_files);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError(error.message || "Failed to load your files.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filePath) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/download/${encodeURIComponent(filePath)}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Download failed: ${response.status}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filePath.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      setError(`Failed to download "${filePath}"`);
    }
  };

  const handleDelete = async (filePath) => {
    if (!window.confirm(`Are you sure you want to delete "${filePath}"?`)) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/delete/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_path: filePath }),  // <-- Correct way
      });
      
      if (!response.ok) throw new Error(`Delete failed: ${response.status}`);

      setFiles((prevFiles) => prevFiles.filter((file) => file.file_path !== filePath));
      setTotalFiles((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Delete error:", error);
      setError(`Failed to delete "${filePath}"`);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return fetchAllFiles();
    try {
      setIsSearching(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/search/?keyword=${encodeURIComponent(searchQuery)}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Search failed");
      
      const data = await response.json();
      setFiles(data.file_found.length > 0 ? data.file_found.map((filePath) => ({ file_path: filePath })) : []);
      if (data.file_found.length === 0) setError(`No files found for "${searchQuery}"`);
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message || "Search failed.");
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchAllFiles();
  };

  return (
    <div className="my-files-container">
      <h2>My Files</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" disabled={isSearching}>{isSearching ? "Searching..." : "Search"}</button>
        {searchQuery && <button type="button" onClick={clearSearch}>Clear</button>}
      </form>

      <div className="files-summary">
        {!loading && !error && <p>Total Files: {totalFiles} | Showing: {files.length}</p>}
      </div>

      {loading ? <p>Loading files...</p> : error ? <p className="error">{error}</p> : files.length === 0 ? <p>No files found.</p> : (
        <ul className="files-list">
          {files.map((file, index) => (
            <li key={index} className="file-item">
              {/* {file.file_path} */}
              <span>{file.file_path.split('/').pop()}</span> {/* Extracting only the filename */}
              <div>
                <button className="download-btn" onClick={() => handleDownload(file.file_path)}>Download</button>
                <button className="delete-btn" onClick={() => handleDelete(file.file_path)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyFiles;
