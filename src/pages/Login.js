// src\pages\login.js
import React from 'react';
import '../App.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem('accounts')) || []
  );
  const [isLogin, setIsLogin] = useState(true);
}

export default Login;