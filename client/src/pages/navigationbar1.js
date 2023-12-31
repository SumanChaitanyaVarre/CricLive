import React from "react";
import { Link } from 'react-router-dom';

function NavigationBar1() {
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:8080/logout", {
                method: "GET",
                credentials: 'include'
            });
            window.location.replace('http://localhost:3000/');
        } catch (error) {
            console.error(error.message);
        }
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-light" color="#120e0f">
    <Link className="navbar-brand" to="/home">CricLive</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/home">Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" onClick={handleLogout} to="#">Logout</Link>
        </li>
      </ul>
    </div>
  </nav>
  );
}

export default NavigationBar1;
