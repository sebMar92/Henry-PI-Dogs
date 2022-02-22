import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../../actions/index.js";
import "./CreateTemperaments.css";

export default function CreateTemperaments(props) {
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [allTemperaments, setAllTemperaments] = useState([]);
  const [displayTemperaments, setDisplayTemperaments] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const storeTemperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  useEffect(() => {
    setAllTemperaments(storeTemperaments.map((t) => t.name));
  }, [storeTemperaments]);
  useEffect(() => {
    if (searchValue !== "") {
      setDisplayTemperaments(
        allTemperaments.filter((t) =>
          t.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setDisplayTemperaments(allTemperaments);
    }
  }, [searchValue, allTemperaments]);
  const handleSelections = (temperament) => {
    setSelectedTemperaments(selectedTemperaments.concat(temperament).sort());
    setAllTemperaments(allTemperaments.filter((t) => t !== temperament));
  };
  const handleCancelation = (temperament) => {
    setSelectedTemperaments(
      selectedTemperaments.filter((t) => t !== temperament)
    );
    setAllTemperaments(allTemperaments.concat(temperament).sort());
  };
  return (
    <div className="create-temperaments">
      <div>
        <input
          type="text"
          placeholder="Search temperaments..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <div id="temperament-list">
          <div>
            {selectedTemperaments.map((selected) => (
              <div
                key={Math.random(1)}
                id={selected}
                className="custom-selected"
                onClick={(e) => handleCancelation(e.target.id)}
              >
                {selected}
              </div>
            ))}
          </div>
          {displayTemperaments.map((temperaments) => (
            <div
              key={Math.random(1)}
              id={temperaments}
              className="custom-create"
              onClick={(e) => handleSelections(e.target.id)}
            >
              {temperaments}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
