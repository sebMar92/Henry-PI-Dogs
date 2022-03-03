import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { paginate } from "../../../actions";
import "./FilterName.css";

export default function FilterName(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSearchBar = (value) => {
    setName(value);
    if (value === "") {
      props.stateChanger("");
      dispatch(paginate());
    }
  };
  const handleSubmit = (e, value) => {
    e.preventDefault();
    props.stateChanger(value);
  };
  return (
    <div className="nameSearchBar hoverable-buttons">
      <form action="">
        <input
          id="searchBar"
          type="text"
          placeholder="Filter by name..."
          onChange={(e) => handleSearchBar(e.target.value)}
        />
        <input
          id="searchButton"
          type="submit"
          value="Search"
          onClick={(e) => handleSubmit(e, name)}
        />
      </form>
    </div>
  );
}
