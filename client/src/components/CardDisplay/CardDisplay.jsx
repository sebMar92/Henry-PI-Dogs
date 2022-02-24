import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  }, [display]);
  useEffect(() => {
    const dots = document.getElementsByClassName("page-dot");
    for (let dot of dots) {
      if (page == dot.id) {
        dot.className = "page-dot page-dot-selected";
      } else if (Math.abs(page - dot.id) === 1) {
        dot.className = "page-dot page-dot-adyacent";
      } else {
        dot.className = "page-dot";
      }
    }
  }, [page, display]);
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
    <div id="display-container">
      <div id="pages-container">
        <div id="pages">
          {display.length &&
            display.map((page, index) => (
              <div
                key={`btn-${index + 1}`}
                id={index}
                className="page-dot"
                onClick={(e) => setPage(Number(e.target.id))}
              ></div>
            ))}
        </div>
      </div>

      <div
        id="prev"
        className="page-buttons"
        onClick={
          page === 0
            ? () => {}
            : (e) => setPage((currentPage) => currentPage - 1)
        }
      >
        <p>{page === 0 ? "|" : "<"}</p>
      </div>
      <div className="display">
        {display.length &&
          display[page] &&
          display[page].map((dog) => (
            <Link key={dog.id} to={`/home/${dog.id}`}>
              <DogCard
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
            </Link>
          ))}
      </div>
      <div
        id="next"
        className="page-buttons"
        onClick={
          page === display.length - 1
            ? () => {}
            : (e) => setPage((currentPage) => currentPage + 1)
        }
      >
        <p>{page === display.length - 1 ? "|" : ">"}</p>
      </div>
    </div>
  );
}
