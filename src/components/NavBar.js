// src\components\NavBar.js
// src/components/NavBar.js
import { Link,useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { logout as logoutService } from "../services/authService";
import "../styles/navbar.scss";

export default function NavBar() {

  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutService(); // optional: clear localStorage or tokens
    logout();         // clear user from context
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/scan">Scan</Link>
        <Link to="/exposed">Exposed Data</Link>
        <Link to="/recommendations">Recommendations</Link>
        <Link to="/reports">Reports</Link>
      </div>
      <div className="nav-right">
        <input type="text" placeholder="Search..." />
        <button className="icon">🔍</button>
        <button className="icon">👤</button>
        {user && (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
