import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeOrder } from "../../../actions/index.js";
import "./Order.css";

export default function Order() {
  const [order, setOrder] = useState({ type: "alphabet", reverse: false });
  const dispatch = useDispatch();
  const handleType = (value) => {
    setOrder({
      ...order,
      type: value,
    });
  };
  const handleReverse = (value) => {
    setOrder({
      ...order,
      reverse: value === "ascending" ? false : true,
    });
  };
  useEffect(() => {
    dispatch(changeOrder(order));
  }, [order]);
  return (
    <div className="orderOptions hoverable-buttons">
      Order by
      <select
        className="drop"
        id="order"
        onChange={(e) => handleType(e.target.value)}
      >
        <option value="alphabet">ABC</option>
        <option value="weight">Weight</option>
        <option value="height">Height</option>
      </select>
      <select
        className="drop"
        id="reverse"
        onChange={(e) => handleReverse(e.target.value)}
      >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
  );
}
