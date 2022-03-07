import React from "react";
import { useEffect } from "react";
import "./FilterOrigin.css";

export default function FilterOrigin(props) {
  useEffect(() => {
    props.stateChanger("all");
  }, []);
  return (
    <div className="originOptions hoverable-buttons">
      Filter by creation method
      <select
        className="drop"
        id="origin"
        onChange={(e) => props.stateChanger(e.target.value)}
      >
        <option value="all">All</option>
        <option value="original">Original</option>
        <option value="created">Created by users</option>
      </select>
    </div>
  );
}
