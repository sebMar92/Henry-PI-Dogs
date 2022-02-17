import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterDogs } from "../../actions/index.js";
import FilterTemperaments from "./FilterTemperaments/FilterTemperaments.jsx";
import "./Filter.css"

export default function Filter(){
    const [temperamentCheck, setTemperamentCheck] = useState([]);
    const [checkStatus, setCheckStatus] = useState(false);
    const [originCheck, setOriginCheck] = useState(null);
    const [nameCheck, setNameCheck] = useState(null);
    const [nameToSearch, setNameToSearch] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (temperamentCheck.length < 1){
            setCheckStatus(false)
        }
        else{
            setCheckStatus(true)
        }
    }, [temperamentCheck]);
    
    const nameChecker = (checked) => {
        if (checked) {
            setNameCheck(nameToSearch);
        }
        else {
            setNameCheck(null)
        }
    }
    const nameChange = (value) => {
        setNameToSearch(value);
        if (nameCheck !== null) {
            setNameCheck(value)
        }
    }
    const temperamentChange = (checked, value) => {
        if (checked) {
            setTemperamentCheck((oldTemperament) => [...oldTemperament, value]);
       }
       else {
            setTemperamentCheck(temperamentCheck.filter(t => t !== value));
       }
    }
    
    const displayOrigins = (checked) => {
        const options = document.getElementById("origin");
        options.disabled = !checked;
        if (!checked) {
            setOriginCheck(null);
        }
        else {
            setOriginCheck(options.value)
        }
    }


    return (
        <div className="filterBar">
            <div className="filterOptions">
                <div>
                    <label htmlFor="nameCheck" >
                    <input type="checkbox" id="nameCheck" onChange={(e) => nameChecker(e.target.checked)}/> Filter by name
                    </label>
                    <input type="text" placeholder="Type a dog's name..." onChange={(e) => nameChange(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="originCheck">
                    <input type="checkbox" id="originCheck" onChange={(e) => displayOrigins(e.target.checked)} /> Filter by creation method
                    </label>
                    <select id="origin" disabled={true} onChange={(e) => setOriginCheck(e.target.value)}>
                        <option value="Created">Created by user</option>
                        <option value="Original">Original</option>
                    </select>
                </div>       
                <div className="temperamentsOption">
                    <label htmlFor="temperamentCheck">
                    <input type="checkbox" id="temperamentCheck" checked={checkStatus} readOnly/> Filter by temperaments
                    </label>
                    <div className="dropdown">
                        <FilterTemperaments stateChanger={temperamentChange}/>
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