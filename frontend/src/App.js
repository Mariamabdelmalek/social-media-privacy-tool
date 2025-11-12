import React, { useState } from 'react';
import Scan from './Scan';
import Login from './Login';
import './styles/App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    loggedIn ? (
        <Scan onLogout={() => setLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )
  
  );
}

export default App;
