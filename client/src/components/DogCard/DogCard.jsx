import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./DogCard.css"
export default function DogCard({ name, id, height, weight, lifespan, image, temperaments }){
    return (
        <Link to={`/home/${id}`}>
            <div className="card">
                <div className="imgContainer">
                    <img className="dogImage" src={image} alt="Pic not found" />
                </div>
                <div className="info">
                    <p>{name}</p>
                    <p>Height: {height}</p>
                    <p>Weight: {weight}</p>
                    <p>Lifespan: {lifespan}</p>
                    <p>Temperaments: {temperaments}</p>
                </div>
            </div>
        </Link>
    ) 
}