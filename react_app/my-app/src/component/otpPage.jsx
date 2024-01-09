import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function OTPComponent() {
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const generateOTP = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate-otp', {
        username: location.state.username,
        password: location.state.password,
      });

      const otp = response.data.otp;
      setGeneratedOTP(otp);
      setVerificationStatus('OTP Sent!'); // Set initial status to 'OTP Sent'
      setIsOtpSent(true); // Update state to indicate that OTP has been sent

      // After 5 seconds, reset the status and allow resending
      setTimeout(() => {
        setVerificationStatus('');
        setIsOtpSent(false);
      }, 5000);
    } catch (error) {
      console.error('Error generating OTP:', error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:3001/verify-otp', {
        username: location.state.username,
        enteredOTP: enteredOTP,
      });

      const verificationResult = response.data.verificationResult;

      if (verificationResult) {
        setVerificationStatus('OTP Verified successfully!');
        // Navigate to the dashboard after successful verification
        navigate('/dashboard');
      } else {
        setVerificationStatus('Incorrect OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card col-md-6">
        <div className="card-body">
          <h1>OTP Component</h1>
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={generateOTP}
            disabled={isOtpSent} // Disable the button while OTP is sent
          >
            {isOtpSent ? 'OTP Sent' : 'Generate OTP'}
          </button>
          <div className="mb-3">
            <label htmlFor="enteredOTP" className="form-label">
              Enter OTP:
            </label>
            <input
              type="text"
              className="form-control"
              id="enteredOTP"
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-success mb-3" onClick={verifyOTP}>
            Verify OTP
          </button>
          {verificationStatus && <p>{verificationStatus}</p>}
        </div>
      </div>
    </div>
  );
}

export default OTPComponent;
