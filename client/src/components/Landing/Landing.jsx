import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"
import dogVideo1 from "./dogVideo1.mp4"
export default function Landing(){

    return (
        <div className="landing">
            <Link id="landing-link" to="/home">
                <button type="button" id="home-btn">Home</button>
            </Link>
            <video src={dogVideo1} autoPlay muted loop id="dogVideo" />
        </div>
    )
}