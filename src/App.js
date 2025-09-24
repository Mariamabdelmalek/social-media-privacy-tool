// src\App.js
import logo from './logo.svg';
import './App.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
