// src\App.js
import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Scan from "./pages/Scan";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <UserProvider>
      {/* Provide user context to entire app to save login between pages */}
      <Router>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />
            <Route
              path="/scan"
              element={
                <PrivateRoute>
                  <Scan />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
