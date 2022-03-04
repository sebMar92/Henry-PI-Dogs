import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, changeOrder, paginate } from "../../actions/index.js";
import DogCard from "../DogCard/DogCard.jsx";
import "./CardDisplay.css";
import "./loading.css";
export default function CardDisplay() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let dogs = useSelector((state) => state.dogs);
  let filtered = useSelector((state) => state.filtered);
  let ordered = useSelector((state) => state.order);
  let display = useSelector((state) => state.display);
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
  useEffect(() => {
    if (dogs.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [dogs]);
  useEffect(() => {
    setPage(0);
  }, [display]);
  useEffect(() => {
    const dots = document.getElementsByClassName("page-dot");
    for (let dot of dots) {
      if (page === Number(dot.id)) {
        dot.className = "page-dot page-dot-selected";
      } else if (Math.abs(page - dot.id) === 1) {
        dot.className = "page-dot page-dot-adyacent";
      } else {
        dot.className = "page-dot";
      }
    }
  }, [page, display, dispatch]);
  useEffect(() => {
    dispatch(changeOrder({ type: ordered.type, reverse: ordered.reverse }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, dogs, dispatch]);
  useEffect(() => {
    dispatch(paginate());
  }, [ordered, dispatch]);
  if (loading) {
    return (
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
    );
  }

  if (!Array.isArray(display)) {
    return (
      <div className="display-error">
        <p>{display.error}</p>
      </div>
    );
  }
  return (
    <div id="display-container">
      <div id="pages-container">
        <div id="pages">
          {display.length > 0 &&
            display.map((page, index) => (
              <div key={`btn-${index + 1}`} className="outter-dot">
                <div
                  id={index}
                  className="page-dot"
                  onClick={(e) => setPage(Number(e.target.id))}
                ></div>
              </div>
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
        {display.length > 0 &&
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
