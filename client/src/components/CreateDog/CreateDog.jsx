import React, { useState } from 'react';
import "./CreateDog.css"

export default function CreateDog() {
  const [dogName, setDogName] = useState('');
  const [dogMaxHeight, setDogMaxHeight] = useState('');
  const [dogMinHeight, setDogMinHeight] = useState('');
  const [dogMaxWeight, setDogMaxWeight] = useState('');
  const [dogMinWeight, setDogMinWeight] = useState('');
  const [dogMaxLife, setDogMaxLife] = useState('');
  const [dogMinLife, setDogMinLife] = useState('');
  const [dogTemperaments, setDogTemperaments] = useState([]);

  return (
      <form className='form' onSubmit={(e) => {e.preventDefault(); console.log(dogName)}}>
        <input 
            className='input'
            name="name" 
            value={dogName} 
            placeholder="Dog's breed name..." 
            onChange={(e) => setDogName(e.target.value)}
        ></input>
        <div>
            <input 
                className='half-input'
                name="minHeight" 
                value={dogMinHeight} 
                placeholder="Dog's min height..." 
                onChange={(e) => setDogMinHeight(e.target.value)}
            ></input>
            <input 
                className='half-input'
                name="maxHeight" 
                value={dogMaxHeight} 
                placeholder="Dog's max height..." 
                onChange={(e) => setDogMaxHeight(e.target.value)}
            ></input>
        </div>
        <div>
            <input 
                className='half-input'
                name="minWeight" 
                value={dogMinWeight} 
                placeholder="Dog's min weight..." 
                onChange={(e) => setDogMinWeight(e.target.value)}
            ></input>
            <input
                className='half-input' 
                name="maxWeight" 
                value={dogMaxWeight} 
                placeholder="Dog's max weight..." 
                onChange={(e) => setDogMaxWeight(e.target.value)}
            ></input>
        </div>
        <div>
            <input 
                className='half-input'
                name="minLife" 
                value={dogMinLife} 
                placeholder="Dog's min Life..." 
                onChange={(e) => setDogMinLife(e.target.value)}
            ></input>
            <input 
                className='half-input'
                name="maxLife" 
                value={dogMaxLife} 
                placeholder="Dog's max Life..." 
                onChange={(e) => setDogMaxLife(e.target.value)}
            ></input>
        </div>
        <input className='form-button' type="submit" value="Create"  />
      </form>
    );
}