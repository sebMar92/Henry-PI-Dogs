import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <nav>
      <div className="logo-wrapper">
        <img id="logoNav" src="https://picsum.photos/45" alt="Random logo" />
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
