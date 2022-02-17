import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../../actions/index.js";


export default function CreateTemperaments(props){
    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments);
    useEffect(()=>{
            dispatch(getTemperaments())
    }, []);
    return (
        <div className="create-temperaments">
            {allTemperaments.map(temperament => 
            <div key={temperament.id} className="create-checks">
                <label htmlFor={temperament.id}>
                    <input 
                    type="checkbox"  
                    id={temperament.id} 
                    onChange={(e)=>{
                        props.stateChanger(e.target.checked,temperament.id);
                    }}
                    /> {temperament.name}
                </label>
            </div>
            )}
        </div>
    )
}