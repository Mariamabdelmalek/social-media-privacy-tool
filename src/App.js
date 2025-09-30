// src\App.js
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Scan from './pages/Scan';


function App() {
  return (
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
  );
}

export default App;
