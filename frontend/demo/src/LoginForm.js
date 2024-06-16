import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      console.log('Sending request with role:', role, 'email:', email, 'password:', password);
      const response = await axios.post('http://localhost:4000/login', { role, email, password });
      console.log('Response:', response);
      setMessage(response.data.message);
      if (response.status === 200) {
        const { role } = response.data;
        if (role === 'admin') {
          navigate('/dashboard'); // Redirect to admin dashboard
        } else if (role === 'phycist') {
          navigate('/dashboard1'); // Redirect to physicist dashboard
        } else {
          setMessage('Unauthorized role'); // Handle unauthorized role (optional)
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{
      backgroundImage: "url('/mechh.PNG')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0
    }}>
      <div className="login-form">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="show-password-container">
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign in'}
          </button>
        </form>
        {/* <div className="extra-links">
          <button onClick={() => alert('Recover password feature not implemented yet.')}>Can't remember your password? Recover it.</button>
          <button onClick={() => alert('Sign-up feature not implemented yet.')}>Don't Have an Account? Create it.</button>
        </div> */}
        {message && <p>{message}</p>}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
        }

        .login-form {
          background-color: rgba(0, 0, 0, 0.8);
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 350px;
          text-align: center;
          color: white;
        }

        .login-form h2 {
          margin-bottom: 20px;
        }

        .login-form input {
          width: calc(100% - 20px);
          padding: 10px;
          margin-bottom: 10px;
          border: none;
          border-radius: 4px;
          background-color: #333;
          color: white;
        }

        .login-form input::placeholder {
          color: #aaa;
        }

        .login-form button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          margin-top: 10px;
          width: 100%;
        }

        .login-form button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .login-form .input-container {
          position: relative;
          margin-bottom: 20px;
        }

        .login-form .show-password-container {
          display: flex;
          justify-content: center;
        }

        .login-form .show-password-container button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: #007bff;
          margin-top: 10px;
        }

        .extra-links {
          margin-top: 20px;
          font-size: 0.9em;
        }

        .extra-links button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: #007bff;
          text-decoration: none;
          display: block;
          margin-bottom: 5px;
        }

        .extra-links button:hover {
          text-decoration: underline;
        }

        .login-form p {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}

export default LoginForm;

