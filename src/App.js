<<<<<<< HEAD
// src\App.js
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Scan from './pages/Scan';
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <UserProvider> {/* provide user context to entire app to save login between pages */}
      <Router>
        <NavBar />
      <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reports" element={<Reports />}/>
            <Route path="/scan" element={<Scan/>} />
          </Routes>
      </div>
      </Router>
    </UserProvider>
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">

        <nav style={{ padding: "1rem", background: "#f8f9fa", marginBottom: "2rem" }}>
          <Link to="/dashboard" style={{ marginRight: "1rem" }}>
            Dashboard
          </Link>
          <Link to="/reports">Reports</Link>
        </nav>


        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />


          <Route
            path="/"
            element={
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            }
          />
        </Routes>
      </div>
    </Router>
>>>>>>> 8911b2b (Updated Dashboard with modern design)
  );
}

export default App;
