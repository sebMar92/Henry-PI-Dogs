import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
export default function NavBar(){

    return (
        <nav>
            <div className="logo-wrapper">
                <img id="logoNav" src="https://picsum.photos/45" alt="Random logo" />
            </div>
            <div>
                <Link className="link" to="/home">Home</Link>
                <Link className="link" to="/create">Create Dog Breeds</Link>
            </div>
        </nav>
    )
}