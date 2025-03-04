import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import WebScraper from "./Pages/WebScraper";  // Make sure you import your WebScraper component

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/webscraper" element={<WebScraper />} />
      </Routes>
    
  );
}

export default App;
