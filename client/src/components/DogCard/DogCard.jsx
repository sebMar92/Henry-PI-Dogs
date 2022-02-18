import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
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
  console.log(temperaments);
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
          <p>Temperaments: {temperaments.join(", ")}</p>
        </div>
      </div>
    </Link>
  );
}
