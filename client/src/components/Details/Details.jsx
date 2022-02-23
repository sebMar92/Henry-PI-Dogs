import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDogs } from "../../actions/index.js";

export default function Details() {
  const dispatch = useDispatch();
  let allDogs = useSelector((state) => state.dogs);
  const { id } = useParams();
  let { name, height, weight, lifespan, image, temperaments } = allDogs.find(
    (dog) => dog.id === id
  );
  useEffect(() => {
    dispatch(getDogs());
  }, []);
  return (
    <div className="detail">
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
  );
}
