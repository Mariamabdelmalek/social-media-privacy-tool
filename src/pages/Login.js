import React, { useState } from 'react';
import '../App.scss';
import './Login.css'; // <-- add this line
import { createAccount, login as loginService, logout as logoutService } from '../services/authService';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { user, login, logout } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  // Handles login or account creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Attempt login
        const loggedInUser = await loginService(username, password);
        login({ username: loggedInUser.username });
      } else {
        // Create new account
        const newUser = await createAccount(username, password);
        login({ username: newUser.username });
      }
      setUsername('');
      setPassword('');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  // Handles logout
  const handleLogout = () => {
    logoutService();
    logout();
  };

  return (
    <div className="login-container">
      {user ? (
        <div className="welcome-box">
          <h2>Welcome, {user?.username}!</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <h2 className="login-title">{isLogin ? 'Login' : 'Create Account'}</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button className="submit-btn" type="submit">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Create one' : 'Already have an account? Login'}
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
