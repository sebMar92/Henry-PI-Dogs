import React from "react";
import { Link } from "react-router-dom";
import "./DogCard.css";
export default function DogCard({
  name,
  id,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  lifespan,
  image,
  temperaments,
}) {
  return (
    <Link to={`/home/${id}`}>
      <div className="card">
        <div className="imgContainer">
          <img className="dogImage" src={image} alt="Pic not found" />
        </div>
        <div className="info">
          <p>{name}</p>
          <p>Height: {`${minHeight} - ${maxHeight}`}</p>
          <p>Weight: {`${minWeight} - ${maxWeight}`}</p>
          <p>Lifespan: {lifespan}</p>
          <p>Temperaments: {temperaments && temperaments.join(", ")}</p>
        </div>
      </div>
    </Link>
  );
}
