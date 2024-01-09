import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [pdfPath, setPdfPath] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [extractionResult, setExtractionResult] = useState('');
  const navigate = useNavigate();

  const handleExtractPdf = async () => {
    try {
      const response = await axios.post('http://localhost:3001/extract-pdf-text', { pdfPath });
      if (response.data.success) {
        setPdfText(response.data.pdfText);
        setExtractionResult('PDF extraction successful');
      } else {
        setExtractionResult('Failed to extract text from PDF');
      }
    } catch (error) {
      console.error('Error extracting PDF:', error);
      setExtractionResult('Error extracting PDF');
    }
  };

  const handleLogout = () => {
    // Add any necessary logout logic here
    // For simplicity, we'll just navigate back to the login/signup page
    navigate('/');
  };

  return (
    <div>
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: '80px', backgroundColor: 'rgba(0, 0, 255, 0.136)' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Welcome To Dashboard</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Card */}
    <div className="container vh-100">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-primary text-center mb-4">
                Enter Pdf to get text
              </h2>
              <div className="mb-3">
                <label htmlFor="pdfPath" className="form-label">
                  PDF Path:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pdfPath"
                  value={pdfPath}
                  onChange={(e) => setPdfPath(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={handleExtractPdf}>
                  Extract PDF Text
                </button>
              </div>
              <div className="mb-3">
                <p>PDF Text:</p>
                <pre>{pdfText}</pre>
              </div>
              <p>{extractionResult}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
