import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { FaHome, FaPlusSquare, FaSignOutAlt } from "react-icons/fa";

export default function Layout() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="app">

      <header className="topbar">

        <div className="left-nav">
          <h1 className="logo">PostApp</h1>

          <nav className="nav-icons">
            <Link to="/">
              <FaHome />
            </Link>

            <Link to="/create">
              <FaPlusSquare />
            </Link>
          </nav>
        </div>

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt />
        </button>

      </header>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}