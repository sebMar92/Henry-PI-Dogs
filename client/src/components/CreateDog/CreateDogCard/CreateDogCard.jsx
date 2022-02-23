import React from "react";
import unknownDog from "./unknownDog.png";

export default function DogCard({
  name,
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
        <p>Temperaments: {temperaments.join(", ")}</p>
      </div>
    </div>
  );
}
