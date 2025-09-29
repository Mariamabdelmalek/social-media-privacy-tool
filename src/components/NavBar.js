// src\components\Navbar.js
// src/components/NavBar.js
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

export default function NavBar() {
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
        <button className="logout">Logout</button>
      </div>
    </nav>
  );
}
