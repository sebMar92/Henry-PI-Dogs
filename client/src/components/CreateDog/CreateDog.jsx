import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postDog } from "../../actions/index.js";
import CreateTemperaments from "./CreateTemperaments/CreateTemperaments";
import "./CreateDog.css";

export default function CreateDog() {
  const [state, setState] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minlife_span: "",
    maxlife_span: "",
    lifespan: "",
    image: "",
    temperaments: [],
  });
  useEffect(() => {
    setState({
      ...state,
      lifespan: `${state.minlife_span} - ${state.maxlife_span} years`,
    });
  }, [state.minlife_span, state.maxlife_span]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(state));
  };
  const temperamentChange = (checked, value) => {
    if (checked) {
      setState({ ...state, temperaments: [...state.temperaments, value] });
    } else {
      setState(state.temperaments.filter((t) => t !== value));
    }
  };

  return (
    <div id="outter-create">
      <div>
        <form
          className="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="input"
            name="name"
            value={state.name}
            placeholder="Dog's breed name..."
            onChange={(e) => setState({ ...state, name: e.target.value })}
          ></input>
          <div>
            <input
              className="half-input"
              name="minHeight"
              value={state.minHeight}
              placeholder="Dog's min height..."
              onChange={(e) =>
                setState({ ...state, minHeight: e.target.value })
              }
            ></input>
            <input
              className="half-input"
              name="maxHeight"
              value={state.maxHeight}
              placeholder="Dog's max height..."
              onChange={(e) =>
                setState({ ...state, maxHeight: e.target.value })
              }
            ></input>
          </div>
          <div>
            <input
              className="half-input"
              name="minWeight"
              value={state.minWeight}
              placeholder="Dog's min weight..."
              onChange={(e) =>
                setState({ ...state, minWeight: e.target.value })
              }
            ></input>
            <input
              className="half-input"
              name="maxWeight"
              value={state.maxWeight}
              placeholder="Dog's max weight..."
              onChange={(e) =>
                setState({ ...state, maxWeight: e.target.value })
              }
            ></input>
          </div>
          <div>
            <input
              className="half-input"
              name="minLife"
              value={state.minlife_span}
              placeholder="Dog's min Life..."
              onChange={(e) =>
                setState({ ...state, minlife_span: e.target.value })
              }
            ></input>
            <input
              className="half-input"
              name="maxLife"
              value={state.maxlife_span}
              placeholder="Dog's max Life..."
              onChange={(e) =>
                setState({ ...state, maxlife_span: e.target.value })
              }
            ></input>
            <input
              className="input"
              name="image"
              value={state.image}
              placeholder="Dog's picture..."
              onChange={(e) => setState({ ...state, image: e.target.value })}
            ></input>
            <div></div>
          </div>
          <input
            className="form-button"
            type="submit"
            value="Create"
            onClick={handleSubmit}
          />
        </form>
      </div>
      <CreateTemperaments stateChanger={temperamentChange} />
    </div>
  );
}
