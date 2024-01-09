// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Loginsignup from './component/loginsignup'; // Adjust the file name and case
import OTPComponent from "./component/otpPage";
import Dashboard from "./component/Dashboard"; // Import your Dashboard component
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Loginsignup />} />
          <Route path="/signup" element={<Loginsignup />} />
          <Route path="/otp" element={<OTPComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
