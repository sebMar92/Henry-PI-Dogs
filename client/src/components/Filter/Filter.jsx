import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterDogs } from "../../actions/index.js";
import FilterTemperaments from "./FilterTemperaments/FilterTemperaments.jsx";
import FilterName from "./FilterName/FilterName.jsx";
import FilterOrigin from "./FilterOrigin/FilterOrigin.jsx";
import Order from "./Order/Order.jsx";
import "./Filter.css";

export default function Filter() {
  const [temperamentFilter, setTemperamentFilter] = useState([]);
  const [originFilter, setOriginFilter] = useState("all");
  const [nameToSearch, setNameToSearch] = useState("");
  const dispatch = useDispatch();

  const temperamentChange = (checked, value) => {
    if (checked) {
      setTemperamentFilter((oldTemperament) => [...oldTemperament, value]);
    } else {
      setTemperamentFilter(temperamentFilter.filter((t) => t !== value));
    }
  };
  const nameChange = (value) => {
    setNameToSearch(value);
  };
  useEffect(() => {
    dispatch(filterDogs(originFilter, temperamentFilter, nameToSearch));
  }, [temperamentFilter, originFilter, nameToSearch, dispatch]);

  const handleButtons = () => {
    let allChecks = document.getElementsByClassName("filter-check");
    for (let checks of allChecks) {
      checks.checked = false;
    }
    let searchBar = document.getElementById("searchBar");
    searchBar.value = "";
    setNameToSearch("");
    setOriginFilter("all");
    setTemperamentFilter([]);
  };

  return (
    <div className="filterBar">
      <div className="filterOptions">
        <FilterTemperaments stateChanger={temperamentChange} />
        <FilterOrigin stateChanger={setOriginFilter} />
        <FilterName stateChanger={nameChange} />
        <div className="hoverable-buttons clear-button">
          <p onClick={() => handleButtons()}>Clear</p>
        </div>
      </div>
      <div>
        <Order />
      </div>
    </div>
  );
}
