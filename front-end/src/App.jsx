import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Background from "./Components/background";
import CheckURL from "./Pages/checkURL"; // Adjust according to your folder structure
import './dist/output.css';  // Ensure Tailwind CSS is properly imported

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/check" element={<CheckURL />} />
    </Routes>
  );
}

export default App;
