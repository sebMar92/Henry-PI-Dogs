import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Filter from "./components/Filter/Filter";
import CreateDog from "./components/CreateDog/CreateDog";
import Landing from "./components/Landing/Landing";
import Details from "./components/Details/Details";

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <>
                <div className="stick">
                  <NavBar />
                  <Filter />
                </div>
                <Home />
              </>
            }
          />
          <Route
            path="/home/:id"
            element={
              <>
                <div className="stick">
                  <NavBar />
                  <Filter />
                </div>
                <Details />
              </>
            }
          />
          <Route
            path="/home/create"
            element={
              <>
                <div className="stick">
                  <NavBar />
                </div>
                <CreateDog />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
