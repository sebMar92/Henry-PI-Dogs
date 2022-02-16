import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogs } from "../../actions/index.js";
import { Link } from "react-router-dom";
import FilterTemperaments from "./FilterTemperaments/FilterTemperaments.jsx";
import "./Filter.css"

export default function Filter(){
    const [temperamentCheck, setTemperamentCheck] = useState([]);
    const [originCheck, setOriginCheck] = useState(null);
    const [nameCheck, setNameCheck] = useState(null);
    const dispatch = useDispatch();
    // useEffect(()=>{

    // }, [temperamentCheck]);
    // const allDogs = useSelector((state) => state.dogs);
    // function handleClickReset(e){
    //     e.preventDefault();
    //     dispatch(getDogs());
    // }
    const temperamentChange = (checked, value) => {
        if (checked) {
            setTemperamentCheck((oldTemperament) => [...oldTemperament, value]);
       }
       else {
            setTemperamentCheck(temperamentCheck.filter(t => t !== value));
            console.log(temperamentCheck)
       }
    }
    return (
        <div className="filterBar">
            <div className="filterOptions">
                <div>
                    <label htmlFor="nameCheck">
                    <input type="checkbox" id="nameCheck" /> Filter by name
                    </label>
                    <input type="text" placeholder="Type a dog's name..."/>
                </div>
                <div>
                    <label htmlFor="originCheck">
                    <input type="checkbox" id="originCheck" /> Filter by creation method
                    </label>
                </div>       
                <div className="temperamentsOption">
                    <label htmlFor="temperamentCheck">
                    <input type="checkbox" id="temperamentCheck" /> Filter by temperaments
                    </label>
                    <div className="dropdown">
                        <FilterTemperaments stateChanger={temperamentChange} />
                    </div>
                </div>
                        
            </div>
            <div className="buttons-wrapper">
            <button className="filterButton">Clear</button>
            <button className="filterButton" onClick={()=>dispatch(filterDogs(originCheck,temperamentCheck,nameCheck))}>Filter</button>
            </div>
        </div>
    )
}