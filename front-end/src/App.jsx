import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import CheckURL from "./Pages/checkURL";  // Adjust the import according to your folder structure

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/check" element={<CheckURL />} />
      </Routes>
  );
}

export default App;
