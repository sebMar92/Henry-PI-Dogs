import React from "react";
import Filter from "../Filter/Filter.jsx";
import CardDisplay from "../CardDisplay/CardDisplay.jsx";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Filter />
      <CardDisplay />
    </div>
  );
}
