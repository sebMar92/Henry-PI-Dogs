import React from "react";
import { Link } from "react-router-dom";
import dogLogo from "./dogLogo.png";
import "./NavBar.css";
export default function NavBar() {
  return (
    <nav>
      <div className="logo-wrapper">
        <Link to="/home" id="nav-home">
          <img id="logoNav" src={dogLogo} alt="Dogo logo" />
        </Link>
      </div>
      <Link className="hoverable-links" to="/home">
        <div>
          <p>Home</p>
        </div>
      </Link>

      <Link className="hoverable-links" to="/home/create">
        <div>
          <p>Create Dog Breeds</p>
        </div>
      </Link>
    </nav>
  );
}
