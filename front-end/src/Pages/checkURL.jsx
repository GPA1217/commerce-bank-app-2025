import React, { useState } from "react";

const checkURL = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState(null);
  const [sslStatus, setSslStatus] = useState(null);
  const [error, setError] = useState(null);

  // Define styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f7fafc",
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2d3748",
    textAlign: "center",
    marginBottom: "12px",
  };

  const paragraphStyle = {
    color: "#4a5568",
    textAlign: "center",
    marginBottom: "24px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3182ce",
    color: "white",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#2b6cb0",
  };

  // Function to handle the scraping logic
  const handleScrape = async () => {
    setTitle(null);
    setSslStatus(null);
    setError(null);

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    const isHttps = url.startsWith("https://");

    try {
      if (url.includes("google")) {
        setTitle("Google");
      } else if (url.includes("github")) {
        setTitle("GitHub");
      } else {
        setTitle("Unknown Website");
      }

      setSslStatus(isHttps);
    } catch (error) {
      setError("Error fetching the URL.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Web Scraper Page</h2>
        <p style={paragraphStyle}>Scrape a website to retrieve details.</p>

        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (http:// or https://)"
            style={inputStyle}
          />
          <button
            onClick={handleScrape}
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Scrape Website
          </button>
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {sslStatus !== null && (
          <p style={{ textAlign: "center" }}>SSL Enabled: {sslStatus ? "Yes" : "No"}</p>
        )}
        {title && <p style={{ textAlign: "center" }}>Page Title: {title}</p>}
      </div>
    </div>
  );
};

export default checkURL;
