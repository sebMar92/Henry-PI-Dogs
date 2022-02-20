import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterDogs } from "../../actions/index.js";
import FilterTemperaments from "./FilterTemperaments/FilterTemperaments.jsx";
import "./Filter.css";

export default function Filter() {
  const [temperamentCheck, setTemperamentCheck] = useState([]);
  const [checkStatus, setCheckStatus] = useState(false);
  const [originCheck, setOriginCheck] = useState(null);
  const [nameCheck, setNameCheck] = useState(null);
  const [nameToSearch, setNameToSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (temperamentCheck.length < 1) {
      setCheckStatus(false);
    } else {
      setCheckStatus(true);
    }
  }, [temperamentCheck]);
  const temperamentChange = (checked, value) => {
    if (checked) {
      setTemperamentCheck((oldTemperament) => [...oldTemperament, value]);
    } else {
      setTemperamentCheck(temperamentCheck.filter((t) => t !== value));
    }
  };
  const nameChecker = (checked) => {
    if (checked) {
      setNameCheck(nameToSearch);
    } else {
      setNameCheck(null);
    }
  };
  const nameChange = (value) => {
    setNameToSearch(value);
    if (nameCheck !== null) {
      setNameCheck(value);
    }
  };
  const displayOrigins = (checked) => {
    const options = document.getElementById("origin");
    options.disabled = !checked;
    if (!checked) {
      setOriginCheck(null);
    } else {
      setOriginCheck(options.value);
    }
  };
  const handleButtons = (e) => {
    if (e.target.innerHTML === "Clear") {
      let allChecks = document.getElementsByClassName("filter-check");
      for (let checks of allChecks) {
        checks.checked = false;
      }
      let searchBar = document.getElementById("searchBar");
      searchBar.value = "";
      setNameToSearch("");
      setNameCheck(null);
      setOriginCheck(null);
      setTemperamentCheck([]);
      dispatch(filterDogs(null, [], null));
    } else {
      dispatch(filterDogs(originCheck, temperamentCheck, nameCheck));
    }
  };

  return (
    <div className="filterBar">
      <div className="filterOptions">
        <div>
          <label htmlFor="nameCheck">
            <input
              className="filter-check"
              type="checkbox"
              id="nameCheck"
              onChange={(e) => nameChecker(e.target.checked)}
            />{" "}
            Filter by name
          </label>
          <input
            id="searchBar"
            type="text"
            placeholder="Type a dog's name..."
            onChange={(e) => nameChange(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="originCheck">
            <input
              className="filter-check"
              type="checkbox"
              id="originCheck"
              onChange={(e) => displayOrigins(e.target.checked)}
            />{" "}
            Filter by creation method
          </label>
          <select
            id="origin"
            disabled={true}
            onChange={(e) => setOriginCheck(e.target.value)}
          >
            <option value="Created">Created by user</option>
            <option value="Original">Original</option>
          </select>
        </div>
        <div className="temperamentsOption">
          <label htmlFor="temperamentCheck">
            <input
              className="filter-check"
              type="checkbox"
              id="temperamentCheck"
              checked={checkStatus}
              readOnly
            />{" "}
            Filter by temperaments
          </label>
          <div className="dropdown">
            <FilterTemperaments stateChanger={temperamentChange} />
          </div>
        </div>
      </div>
      <div className="buttons-wrapper">
        <button className="filterButton" onClick={(e) => handleButtons(e)}>
          Clear
        </button>
        <button className="filterButton" onClick={(e) => handleButtons(e)}>
          Filter
        </button>
      </div>
    </div>
  );
}
