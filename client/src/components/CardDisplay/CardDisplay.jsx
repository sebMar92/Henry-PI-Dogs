import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, changeOrder, paginate } from "../../actions/index.js";
import DogCard from "../DogCard/DogCard.jsx";
import "./CardDisplay.css";

export default function CardDisplay() {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  let dogs = useSelector((state) => state.dogs);
  let filtered = useSelector((state) => state.filtered);
  let ordered = useSelector((state) => state.order);
  let display = useSelector((state) => state.display);
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
  useEffect(() => {
    dispatch(changeOrder({ type: ordered.type, reverse: ordered.reverse }));
  }, [filtered, dogs]);
  useEffect(() => {
    dispatch(paginate());
  }, [ordered]);

  if (!Array.isArray(display)) {
    return (
      <div className="display">
        <p>{display.error}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="display">
        {display.length &&
          display[page] &&
          display[page].map((dog) => (
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
        {display.length &&
          display.map((page, index) => (
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
