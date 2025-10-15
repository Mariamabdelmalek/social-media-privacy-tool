// src\pages\Login.js
import React, {useState} from 'react';
import '../App.scss';
import { createAccount, login as loginService, logout as logoutService } from '../services/authService';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';




function Login() {


  const navigate = useNavigate();
  navigate('/');
  const {user, login, logout} = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const loggedInUser = loginService(username, password);
        login(loggedInUser.username);
      } else {
        const newUser = createAccount(username, password);
        login(newUser.username);
      }
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logoutService();
    logout();
  };

  return (
    <div className="login-container">
      {user ? (
        <div>
          <h2>Welcome, {user}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
        <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
          </div>

          <div>
            <label>Password:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">
            {isLogin ? 'Login' : 'CreateAccount'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Create one' : 'Already have an account? Login'}
        </button>
        </>
      )}
    </div>
  )
}

export default Login;