import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions/index.js";
import DogCard from "../DogCard/DogCard.jsx";
import "./CardDisplay.css"

export default function CardDisplay(){
    const dispatch = useDispatch();
    let filterStatus = useSelector((state) => state.showFilter);
    let allDogs = useSelector((state) => state.dogs);
    let filterDogs = useSelector((state) => state.filteredDogs);
    let displayDogs = filterStatus ? filterDogs : allDogs; 
    useEffect(()=>{
        dispatch(getDogs())
    }, []);
        if (!Array.isArray(displayDogs)){
            return (
                <div className="display">
                    <p>{displayDogs.error}</p>
                </div>
            )
        }
        return (
            <div className="display">
                {displayDogs.map(dog => <DogCard 
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
        ) 
}