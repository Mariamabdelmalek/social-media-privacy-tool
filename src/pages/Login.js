// src\pages\Login.js
import React, {useState} from 'react';
import '../App.scss';
import { createAccount, login as loginService, logout as logoutService } from '../services/authService';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';





function Login() {


  const navigate = useNavigate();
  const {user, login, logout} = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  //Handles the login or account creation
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        //Attempts the login
        const loggedInUser =  await loginService(username, password);
        login({ username: loggedInUser.username });
        
      } else {
        //Creates the new account and logs them in automatically
        const newUser = await createAccount(username, password);
        login({ username: newUser.username });
      }
      setUsername('');
      setPassword('');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message|| 'Login failed');
    }
  };
 
  //Handles the logout
  const handleLogout = () => {
    logoutService();
    logout();
  };

  return (
    <div className="login-container">
      {user ? (
        <div>
          <h2>Welcome, {user?.username}!</h2>
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
            placeholder="Enter your username"
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
