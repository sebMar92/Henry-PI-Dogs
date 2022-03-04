import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../../actions/index.js";
import "./FilterTemperaments.css";
import "./loading.css";

export default function FilterTemperaments(props) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);
  useEffect(() => {
    if (allTemperaments.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [allTemperaments]);
  useEffect(() => {
    dispatch(getTemperaments());
    props.stateChanger(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div className="temperamentsOption hoverable-buttons">
      <p id="temperamentTitle" /> Filter by temperaments
      <div className="dropdown">
        <div className="temperaments">
          {loading ? (
            <div id="loading-container">
              <div class="lds-default-white">
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
              <h4 id="fetching-white">fetching data...</h4>
            </div>
          ) : (
            allTemperaments.map((temperament) => (
              <div key={temperament.id} className="checks">
                <label htmlFor={temperament.id}>
                  <input
                    className="filter-check"
                    type="checkbox"
                    id={temperament.id}
                    onChange={(e) => {
                      props.stateChanger(e.target.checked, temperament.name);
                    }}
                  />{" "}
                  {temperament.name}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
