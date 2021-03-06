import React from "react";

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
    <div className="outter-card">
      <div className="card">
        <div className="imgContainer">
          <img
            className="dogImage"
            src={image || "/images/unknownDog.png"}
            alt="Pic not found"
          />
        </div>
        <div className="info">
          <p className="main">{name}</p>
          <p className="hidden">Height: {`${minHeight} - ${maxHeight}`} cm.</p>
          <p className="hidden">Weight: {`${minWeight} - ${maxWeight}`} kg.</p>
          <p className="hidden">Lifespan: {lifespan}</p>
          <p className="hidden">
            {temperaments && "Temperaments: " + temperaments.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
