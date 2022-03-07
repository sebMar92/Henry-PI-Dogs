import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDog, getDogs } from "../../actions/index.js";
import "./Details.css";
import "../CardDisplay/loading.css";
export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let allDogs = useSelector((state) => state.dogs);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifespan: "",
    image: "",
    temperament: [],
  });
  useEffect(() => {
    if (info.name === "") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [info]);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
  useEffect(() => {
    let dog = allDogs.find((dog) => dog.id == id);
    if (dog) {
      if (dog.temperament) {
        if (dog.temperament.length > 2) {
          var lastTemperament = dog.temperament.pop();
          var temperamentJoined =
            dog.temperament.join(", ") + " and " + lastTemperament;
        }
      }

      setInfo({
        name: dog.name,
        minHeight: dog.minHeight,
        maxHeight: dog.maxHeight,
        minWeight: dog.minWeight,
        maxWeight: dog.maxWeight,
        lifespan: dog.lifespan,
        image: dog.image,
        temperament: temperamentJoined,
        fromDatabase: dog.fromDatabase,
      });
    }
  }, [allDogs, id]);
  function handleDelete(name) {
    let doDelete = window.confirm(
      "Are you sure you want to delete this dog breed?"
    );
    if (doDelete) {
      dispatch(deleteDog({ name: name }));
      setTimeout(() => {
        navigate("/home");
      }, 500);
      dispatch(getDogs());
    }
  }
  return (
    <div id="loading-container">
      {loading ? (
        <div id="loading-container">
          <div class="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h3 id="fetching">fetching data...</h3>
        </div>
      ) : (
        <div id="detail">
          <div>
            <div id="imgContainer">
              <img
                className="detail-image"
                src={info.image && info.image}
                alt="A cute dog"
              />
            </div>
            {info.fromDatabase ? (
              <div
                onClick={() => handleDelete(info.name)}
                className="hoverable-buttons"
                id="deleteButton"
              >
                {" "}
                Delete
              </div>
            ) : null}
          </div>
          <div id="detail-info">
            <h1 className="detail-text">{info.name && info.name}</h1>
            <h2 className="detail-text">
              Their average height ranges from{" "}
              {info.minHeight && info.minHeight} to{" "}
              {info.maxHeight && info.maxHeight} cm.
            </h2>
            <h2 className="detail-text">
              Their average weight ranges from{" "}
              {info.minWeight && info.minWeight} to{" "}
              {info.maxWeight && info.maxWeight} kg.
            </h2>
            <h2 className="detail-text">
              They tend to live for{" "}
              {info.lifespan && info.lifespan.split(" - ").join(" to ")}.
            </h2>
            <h2 className="detail-text">
              {typeof info.temperament === "string"
                ? "They are usually " + info.temperament.toLowerCase() + "."
                : "We don't know much about them yet."}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
