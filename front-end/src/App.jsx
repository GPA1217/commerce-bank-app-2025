import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import checkURL from "./Pages/checkURL";  // Make sure you import your WebScraper component

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/checkURL" element={<checkURL />} />
      </Routes>
    
  );
}

export default App;
