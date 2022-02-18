import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions/index.js";
import DogCard from "../DogCard/DogCard.jsx";
import "./CardDisplay.css";

export default function CardDisplay() {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  let dogs = useSelector((state) => state.displayDogs);
  useEffect(() => {
    dispatch(getDogs());
  }, []);
  useEffect(() => {
    setPage(0);
  }, [dogs]);
  useEffect(() => {
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    if (prev && next) {
      page === 0 ? (prev.disabled = true) : (prev.disabled = false);
      page === dogs.length - 1
        ? (next.disabled = true)
        : (next.disabled = false);
    }
  }, [page]);

  if (!Array.isArray(dogs)) {
    return (
      <div className="display">
        <p>{dogs.error}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="display">
        {dogs.length &&
          dogs[page] &&
          dogs[page].map((dog) => (
            <DogCard
              key={dog.id}
              id={dog.id}
              name={dog.name}
              minHeight={dog.minHeight}
              maxHeight={dog.maxHeight}
              minWeight={dog.minWeight}
              maxWeight={dog.maxWeight}
              lifespan={dog.lifespan}
              image={dog.image}
              temperaments={dog.temperament}
            />
          ))}
      </div>
      <div>
        <button
          id="prev"
          onClick={(e) => setPage((currentPage) => currentPage - 1)}
        >
          Prev
        </button>
        {dogs.length &&
          dogs.map((page, index) => (
            <button
              key={`btn-${index + 1}`}
              className="page-btn"
              id={index}
              onClick={(e) => setPage(Number(e.target.id))}
            >
              {index + 1}
            </button>
          ))}
        <button
          id="next"
          onClick={(e) => setPage((currentPage) => currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
