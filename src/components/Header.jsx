import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand fw-bold" to="/">StudySpot PH</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/my-bookings">My Bookings</Link>
            </li>
          )}
        </ul>
        {user ? (
          <button className="btn btn-light" onClick={logout}>Logout</button>
        ) : (
          <button className="btn btn-light" onClick={login}>Login</button>
        )}
      </div>
    </nav>
  );
}