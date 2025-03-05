import React, { useState, useEffect } from "react";
import '../index.css'; // Global CSS for basic styles
import Background from '../Components/background';
const CheckURL = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState(null);
  const [sslStatus, setSslStatus] = useState(null);
  const [error, setError] = useState(null);
  const [squares, setSquares] = useState([]);

  // Function to create moving squares with random movement directions
  const createSquares = () => {
    const numSquares = 15;
    const newSquares = [];
    for (let i = 0; i < numSquares; i++) {
      // Randomize direction for each square (both positive and negative)
      const randomX = (Math.random() * 40 - 20); // Random horizontal movement (-20vw to 20vw)
      const randomY = (Math.random() * 40 - 20); // Random vertical movement (-20vh to 20vh)
      const randomDuration = Math.random() * 15 + 10; // Random animation duration between 10s and 25s
      const randomDelay = Math.random() * 5; // Random animation delay

      newSquares.push({
        id: i,
        top: `${Math.random() * 100}vh`, // Random initial Y position
        left: `${Math.random() * 100}vw`, // Random initial X position
        xMove: randomX, // Store random horizontal movement
        yMove: randomY, // Store random vertical movement
        animationDuration: `${randomDuration}s`,
        animationDelay: `${randomDelay}s`,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
      });
    }
    setSquares(newSquares);
  };

  useEffect(() => {
    createSquares();
  }, []);

  useEffect(() => {
    // Inject custom keyframes for random square movements
    squares.forEach((square) => {
      const styleSheet = document.styleSheets[0];
      const keyframes = `
        @keyframes moveSquare-${square.id} {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(${square.xMove}vw, ${square.yMove}vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    });
  }, [squares]);

  const containerStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, rgba(15, 23, 42, 1), rgba(21, 32, 43, 1))", // Ensure this is correct
    backgroundSize: "400% 400%",
    animation: "gradientBackground 6s ease infinite",
    overflow: "hidden",
  };
  
  const formStyle = {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    position: "relative", // Keeps the form on top of the squares
    zIndex: 1, // Ensures the form is above the background squares
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

      {/* Render the moving squares */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          backgroundColor: "#f7fafc", // Match the background color of the login page
        }}
      >
        {squares.map((square) => (
          <div
            key={square.id}
            className="square"
            style={{
              top: square.top,
              left: square.left,
              animationDelay: square.animationDelay,
              backgroundColor: square.backgroundColor,
              animationDuration: square.animationDuration, // Randomize animation duration
              animationName: `moveSquare-${square.id}`, // Unique class name per square
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CheckURL;
