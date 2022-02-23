import React from "react";
import { Link } from "react-router-dom";
import unknownDog from "./unknownDog.png";
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
    <div className="card">
      <div className="imgContainer">
        <img
          className="dogImage"
          src={image || unknownDog}
          alt="Pic not found"
        />
      </div>
      <div className="info">
        <p>{name}</p>
        <p>Height: {`${minHeight} - ${maxHeight}`}</p>
        <p>Weight: {`${minWeight} - ${maxWeight}`}</p>
        <p>Lifespan: {lifespan}</p>
        <p>Temperaments: {temperaments && temperaments.join(", ")}</p>
      </div>
    </div>
  );
}
