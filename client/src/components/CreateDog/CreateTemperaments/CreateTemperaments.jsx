import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../../actions/index.js";

export default function CreateTemperaments(props) {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  return (
    <div className="create-temperaments">
      {allTemperaments.map((temperaments) => (
        <div key={temperaments.id} className="create-checks">
          <label htmlFor={temperaments.id}>
            <input
              type="checkbox"
              id={temperaments.id}
              onClick={(e) => {
                props.stateChanger(e.target.checked, temperaments.id);
              }}
            />{" "}
            {temperaments.name}
          </label>
        </div>
      ))}
    </div>
  );
}
