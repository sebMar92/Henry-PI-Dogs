import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postDog } from "../../actions/index.js";
import CreateTemperaments from "./CreateTemperaments/CreateTemperaments";
import CreateDogCard from "./CreateDogCard/CreateDogCard.jsx";
import "./CreateDog.css";

export default function CreateDog() {
  const [state, setState] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLife_span: "",
    maxLife_span: "",
    lifespan: "",
    image: "",
    temperaments: [],
    temperamentsName: [],
  });
  const [error, setError] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    height: "",
    minWeight: "",
    maxWeight: "",
    weigth: "",
    minLife_span: "",
    maxLife_span: "",
    lifespan: "",
    image: "",
  });
  useEffect(() => {
    setState({
      ...state,
      lifespan: `${state.minLife_span} - ${state.maxLife_span} years`,
    });
  }, [state.minLife_span, state.maxLife_span]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(state));
  };
  const temperamentChange = (id, name) => {
    setState({ ...state, temperaments: id, temperamentsName: name });
  };
  const validateNumber = (value, Type) => {
    if (!value) {
      setError({
        ...error,
        [Type]: "",
      });
    } else {
      if (!/^\d+$/.test(value)) {
        setError({
          ...error,
          [Type]: `${value} is not a number!`,
        });
      } else {
        setError({
          ...error,
          [Type]: "",
        });
      }
    }
    setState({
      ...state,
      [Type]: value,
    });
  };
  const validateMinMax = (min, max, errorType, errorMessage) => {
    if (Number(min) > Number(max)) {
      setError({
        ...error,
        [errorType]: errorMessage,
      });
    } else {
      setError({
        ...error,
        [errorType]: "",
      });
    }
  };
  const validateName = (input) => {
    if (input) {
      if (!/^[A-Za-z ]+$/.test(input)) {
        setError({
          ...error,
          name: `${input} wouldn't be a nice name. Please use A-Z.`,
        });
      } else {
        setError({
          ...error,
          name: "",
        });
      }
    } else {
      setError({
        ...error,
        name: "",
      });
    }
    setState({
      ...state,
      name: input,
    });
  };
  useEffect(() => {
    if (state.minHeight && state.maxHeight) {
      validateMinMax(
        state.minHeight,
        state.maxHeight,
        "height",
        "Height values are mixed up!"
      );
    } else {
      setError({
        ...error,
        height: "",
      });
    }
  }, [state.minHeight, state.maxHeight]);
  useEffect(() => {
    if (state.minWeight && state.maxWeight) {
      validateMinMax(
        state.minWeight,
        state.maxWeight,
        "weight",
        "Weight values are mixed up!"
      );
    } else {
      setError({
        ...error,
        weight: "",
      });
    }
  }, [state.minWeight, state.maxWeight]);
  useEffect(() => {
    if (state.minLife_span && state.maxLife_span) {
      validateMinMax(
        state.minLife_span,
        state.maxLife_span,
        "lifespan",
        "Lifespan values are mixed up!"
      );
    } else {
      setError({
        ...error,
        lifespan: "",
      });
    }
  }, [state.minLife_span, state.maxLife_span]);
  const validateURL = (url) => {
    if (url) {
      new Promise((resolve) => {
        const img = new Image();

        img.src = url;
        img.onload = () =>
          resolve(
            setError({
              ...error,
              image: "",
            })
          );
        img.onerror = () =>
          resolve(
            setError({
              ...error,
              image: `Paste an image URL or leave the input blank.`,
            })
          );
      });
    } else {
      setError({
        ...error,
        image: "",
      });
    }
    setState({
      ...state,
      image: url,
    });
  };

  return (
    <div id="outter-create">
      <div id="inner-create">
        <form
          className="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="full-input"
            name="name"
            value={state.name}
            placeholder="Dog's breed name..."
            onChange={(e) => validateName(e.target.value)}
          ></input>
          <p className="error-msg">{error.name}</p>
          <div className="group-input">
            <div>
              <input
                className="half-input"
                name="minHeight"
                placeholder="Dog's min height..."
                onChange={(e) => validateNumber(e.target.value, e.target.name)}
              ></input>
              <p className="error-msg">{error.minHeight}</p>
            </div>
            <div>
              <input
                className="half-input"
                name="maxHeight"
                value={state.maxHeight}
                placeholder="Dog's max height..."
                onChange={(e) => validateNumber(e.target.value, e.target.name)}
              ></input>
              <p className="error-msg">{error.maxHeight}</p>
              <p className="error-msg">{error.height}</p>
            </div>
          </div>
          <div className="group-input">
            <div>
              <input
                className="half-input"
                name="minWeight"
                value={state.minWeight}
                placeholder="Dog's min weight..."
                onChange={(e) => validateNumber(e.target.value, e.target.name)}
              ></input>
              <p className="error-msg">{error.minWeight}</p>
            </div>
            <div>
              {" "}
              <input
                className="half-input"
                name="maxWeight"
                value={state.maxWeight}
                placeholder="Dog's max weight..."
                onChange={(e) => validateNumber(e.target.value, e.target.name)}
              ></input>
              <p className="error-msg">{error.maxWeight}</p>
              <p className="error-msg">{error.weight}</p>
            </div>
          </div>
          <div className="group-input">
            <div>
              <input
                className="half-input"
                name="minLife_span"
                value={state.minLife_span}
                placeholder="Dog's min Life..."
                onChange={(e) => validateNumber(e.target.value, e.target.name)}
              ></input>
              <p className="error-msg">{error.minLife_span}</p>
            </div>
            <div>
              <input
                className="half-input"
                name="maxLife_span"
                value={state.maxLife_span}
                placeholder="Dog's max Life..."
                onChange={(e) => validateNumber(e.target.value, e.target.name)}
              ></input>
              <p className="error-msg">{error.maxLife_span}</p>
              <p className="error-msg">{error.lifespan}</p>
            </div>
          </div>
          <div>
            <input
              className="full-input"
              name="image"
              value={state.image}
              placeholder="Dog's picture..."
              onChange={(e) => validateURL(e.target.value, e.target.name)}
            ></input>
            <p className="error-msg">{error.image}</p>
          </div>
          <input
            className="form-button"
            disabled={
              error.name &&
              error.height &&
              error.weigth &&
              error.image &&
              error.lifespan
            }
            type="submit"
            value="Create"
            onClick={handleSubmit}
          />
        </form>
      </div>
      <CreateTemperaments stateChanger={temperamentChange} />
      <CreateDogCard
        name={state.name}
        minHeight={state.minHeight}
        maxHeight={state.maxHeight}
        minWeight={state.minWeight}
        maxWeight={state.maxWeight}
        lifespan={state.lifespan}
        image={state.image}
        temperaments={state.temperamentsName}
      />
    </div>
  );
}
