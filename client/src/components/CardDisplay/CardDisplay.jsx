import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions/index.js";
import DogCard from "../DogCard/DogCard.jsx";
import "./CardDisplay.css"

export default function CardDisplay(){
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    let filterStatus = useSelector((state) => state.showFilter);
    let allDogs = useSelector((state) => state.dogs);
    let filterDogs = useSelector((state) => state.filteredDogs);
    let displayDogs = filterStatus ? filterDogs : allDogs; 
    function splitInChunks(arr, size) {
        const inChunks = [];
        for (let i = 0; i <= arr.length; i += size) {
          inChunks.push(arr.slice(i, i + size));
        }
        return inChunks;
      }
    displayDogs = splitInChunks(displayDogs, 8);
    useEffect(()=>{
        dispatch(getDogs())
    }, []);
    useEffect(()=>{
        setPage(0)
    }, [filterStatus]);

        if (!Array.isArray(displayDogs)){
            return (
                <div className="display">
                    <p>{displayDogs.error}</p>
                </div>
            )
        }
        return (
            <div>
                <div className="display">
                    {displayDogs[page].map(dog => <DogCard 
                        key = {dog.id}
                        id = {dog.id}
                        name = {dog.name}
                        height = {dog.height}
                        weight = {dog.weight}
                        lifespan = {dog.lifespan}
                        image = {dog.image}
                        temperaments = {dog.temperament}
                    />)}
                </div>
                <div>
                    <button onClick={(e) => setPage((currentPage) => currentPage - 1)}>Prev</button>
                    {displayDogs.map( (page, index) => <button
                        key={`btn-${index+1}`}
                        className="page-btn"
                        id={index}
                        onClick={(e) => setPage(e.target.id)}
                        >{index + 1}</button>)}
                    <button onClick={(e) => setPage((currentPage) => currentPage + 1)}>Next</button>
                </div>
            </div>
        ) 
}