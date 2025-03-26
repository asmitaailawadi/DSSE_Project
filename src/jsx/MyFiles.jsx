// "use client";

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:8000/api/files", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch files");
      const data = await response.json();
      setFiles(data.files || []);
    } catch (err) {
      setError("Failed to load your files. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return fetchAllFiles();
    try {
      setIsSearching(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/search/?keyword=${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      if (data.file_found && data.file_found.length > 0) {
        setFiles(data.file_found.map((filePath) => ({ file_path: filePath })));
      } else {
        setFiles([]);
        setError("No matching files found.");
      }
    } catch (err) {
      setError("Search failed. Please try again.");
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
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </button>
        {searchQuery && <button onClick={clearSearch}>Clear</button>}
      </form>

      {loading ? (
        <p>Loading files...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.file_path}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyFiles;
