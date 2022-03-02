import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../../actions/index.js";
import { sortOrder } from "../../../functions/functions.js";
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
  }, [dispatch]);
  useEffect(() => {
    setAllTemperaments(
      storeTemperaments.map(
        (t) =>
          (t = {
            name: t.name,
            id: t.id,
          })
      )
    );
  }, [storeTemperaments]);
  useEffect(() => {
    if (searchValue !== "") {
      setDisplayTemperaments(
        allTemperaments.filter((t) =>
          t.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setDisplayTemperaments(allTemperaments);
    }
  }, [searchValue, allTemperaments]);
  useEffect(() => {
    let sendId = selectedTemperaments.map((t) => t.id);
    let sendName = selectedTemperaments.map((t) => t.name);
    props.stateChanger(sendId, sendName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemperaments]);
  const handleSelections = (temperamentId, temperamentName) => {
    setSelectedTemperaments(
      sortOrder(
        [
          ...selectedTemperaments,
          {
            name: temperamentName,
            id: temperamentId,
          },
        ],
        "name"
      )
    );
    setAllTemperaments(
      allTemperaments.filter((t) => t.name !== temperamentName)
    );
  };
  const handleCancelation = (temperamentId, temperamentName) => {
    setSelectedTemperaments(
      selectedTemperaments.filter((t) => t.id !== temperamentId)
    );
    setAllTemperaments(
      sortOrder(
        [
          ...allTemperaments,
          {
            name: temperamentName,
            id: temperamentId,
          },
        ],
        "name"
      )
    );
  };
  return (
    <div className="create-temperaments">
      <h3>Pick some temperaments</h3>
      <div id="create-inner-container">
        <input
          type="text"
          id="create-search"
          placeholder="Search temperaments..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div id="container-selected">
          {selectedTemperaments &&
            selectedTemperaments.map((selected) => (
              <div
                className="custom-selected"
                key={selected.id}
                id={selected.id}
                onClick={(e) => handleCancelation(selected.id, selected.name)}
              >
                <div>{selected.name}</div>
                <div className="x-button">X</div>
              </div>
            ))}
        </div>
        <div id="temperament-list">
          {displayTemperaments &&
            displayTemperaments.map((temperaments) => (
              <div
                key={Math.random(1)}
                id={temperaments.id}
                className="custom-create"
                onClick={(e) =>
                  handleSelections(e.target.id, e.target.innerHTML)
                }
              >
                {temperaments.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
