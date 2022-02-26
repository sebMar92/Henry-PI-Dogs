import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../../actions/index.js";
import "./FilterTemperaments.css";

export default function FilterTemperaments(props) {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  return (
    <div className="temperamentsOption hoverable-buttons">
      <p id="temperamentTitle" /> Filter by temperaments
      <div className="dropdown">
        <div className="temperaments">
          {allTemperaments.map((temperament) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
