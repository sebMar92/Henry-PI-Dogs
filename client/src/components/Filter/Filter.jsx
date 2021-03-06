import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
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
      if (value) {
        setTemperamentFilter(temperamentFilter.filter((t) => t !== value));
      } else {
        setTemperamentFilter([]);
      }
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
    let originDropdown = document.getElementById("origin");
    let searchBar = document.getElementById("searchBar");
    originDropdown.value = "all";
    searchBar.value = "";
    setNameToSearch("");
    setOriginFilter("all");
    setTemperamentFilter([]);
  };
  const { id } = useParams();
  if (id) {
    return (
      <div className="filterBar">
        <div className="filterOptions"></div>
      </div>
    );
  } else {
    return (
      <div className="filterBar">
        <div className="filterOptions">
          <FilterTemperaments stateChanger={temperamentChange} />
          <FilterOrigin stateChanger={setOriginFilter} />
          <FilterName stateChanger={nameChange} />
          <div
            onClick={() => handleButtons()}
            className="hoverable-buttons clear-button"
          >
            <p>Clear</p>
          </div>
        </div>
        <div>
          <Order id="order-out" />
        </div>
      </div>
    );
  }
}
