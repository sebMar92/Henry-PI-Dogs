import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./components/Home/Home.jsx"
import NavBar from './components/NavBar/NavBar.jsx';
import CreateDog from './components/CreateDog/CreateDog';
import Landing from './components/Landing/Landing';
import Details from './components/Details/Details';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
            <Route exact path = "/" element={<Landing/>}/>
            <Route path = "/home" element={<Home/>}/>
            <Route path = "/home/:id" element={<Details/>}/>
            <Route path = "/create" element={<CreateDog/>}/>
      </Routes>
    </Router>
  );
};

export default App;
