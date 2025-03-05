import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' in React 18 and beyond
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter here
import App from './App';
import './dist/output.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root for React 18+
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
