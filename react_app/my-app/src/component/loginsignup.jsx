import React, { useState } from 'react';
import axios from 'axios';
import OTPComponent from './otpPage'; // Make sure to adjust the import statement to match the actual file name
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './component.css';

function Loginsignup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true); // Added state for validation
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Added state for password visibility
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(`Registration error: ${error.response.data.error}`);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      setResponseMessage(response.data.message);
      setLoggedIn(true);
      navigate('/otp', { state: { username, password } });
    } catch (error) {
      setResponseMessage(`Login error: ${error.response.data.error}`);
    }
  };

  const isEmailValid = (value) => {
    // Simple check for the presence of "@" in the value
    return value.includes('@');
  };

  const handleUsernameChange = (e) => {
    const newValue = e.target.value;
    setIsUsernameValid(isEmailValid(newValue)); // Update the validation state
    setUsername(newValue);
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card col-md-6">
        <div className="card-body">
          <h1>Login Page</h1>
          {isLoggedIn ? (
            <OTPComponent />
          ) : (
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${!isUsernameValid && 'is-invalid'}`} // Add 'is-invalid' class when username is not valid
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
                {!isUsernameValid && <div className="invalid-feedback">Enter a valid email address.</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {isPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button type="button" className="btn btn-primary" onClick={handleRegister}>Register</button>
                <button type="button" className="btn btn-success ms-2" onClick={handleLogin}>Login</button>
              </div>
            </form>
          )}
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Loginsignup;
