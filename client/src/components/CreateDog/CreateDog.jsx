import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDogs, postDog } from "../../actions/index.js";
import CreateTemperaments from "./CreateTemperaments/CreateTemperaments";
import DogCard from "../DogCard/DogCard.jsx";

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
    image: "/images/unknownDog.png",
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
    weight: "",
    minLife_span: "",
    maxLife_span: "",
    lifespan: "",
    image: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setState({
      ...state,
      lifespan: `${state.minLife_span} - ${state.maxLife_span} years`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.minLife_span, state.maxLife_span]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(state));
    setSubmitting(true);
    setTimeout(() => {
      navigate("/home");
    }, 750);
  };
  const temperamentChange = (id, name) => {
    setState({ ...state, temperaments: id, temperamentsName: name });
  };
  const validateNumberKeyDown = (e) => {
    if (
      e.key === "e" ||
      e.key === "E" ||
      e.key === "+" ||
      e.key === "-" ||
      e.ctrlKey
    ) {
      e.preventDefault();
    }
  };
  const validateNumber = (value, Type) => {
    if (!value) {
      setError({
        ...error,
        [Type]: "",
      });
    } else {
      if (value < 1) {
        setError({
          ...error,
          [Type]: `The value must be higher than 0!`,
        });
      } else {
        if (!/^\d+$/.test(value)) {
          setError({
            ...error,
            [Type]: `${value} is not a whole number!`,
          });
        } else {
          setError({
            ...error,
            [Type]: "",
          });
        }
        setState({
          ...state,
          [Type]: value,
        });
      }
    }
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
          name: `${input} wouldn't be a nice name. Please use A-Z characters.`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.minLife_span, state.maxLife_span]);
  const imageIsOkey = (url) => {
    setError({
      ...error,
      image: "",
    });
    setState({
      ...state,
      image: url,
    });
  };
  const imageIsNotOkey = () => {
    setError({
      ...error,
      image: "Paste an image URL or leave the input blank.",
    });
    setState({
      ...state,
      image: "/images/unknownDog.png",
    });
  };
  const validateURL = (url) => {
    if (url) {
      new Promise((resolve) => {
        const img = new Image();

        img.src = url;
        img.onload = () => resolve(imageIsOkey(url));
        img.onerror = () => resolve(imageIsNotOkey());
      });
    } else {
      setError({
        ...error,
        image: "",
      });
      setState({
        ...state,
        image: "/images/unknownDog.png",
      });
    }
  };

  return (
    <div id="outter-create">
      <div id="created-card" className={submitting ? "animate" : ""}>
        <DogCard
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
      <div>
        <h2>Create your dog breed</h2>
        <div id="inner-create">
          <form
            className="form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="form-title-input">
              <h3 className="titles">Name: </h3>
              <div className="form-input-error">
                <input
                  className="full-input"
                  name="name"
                  required
                  value={state.name}
                  autocomplete="off"
                  placeholder="Dog's breed name..."
                  onChange={(e) => validateName(e.target.value)}
                ></input>
                <p className="error-msg">{error.name}</p>
              </div>
            </div>

            <div className="group-input">
              <div className="form-title-input">
                <h3 className="titles">Height: </h3>
                <div className="form-input-error">
                  <input
                    className="half-input"
                    type="number"
                    min="1"
                    name="minHeight"
                    required
                    autocomplete="off"
                    placeholder="Dog's min height..."
                    onKeyDown={(e) => validateNumberKeyDown(e)}
                    onChange={(e) =>
                      validateNumber(e.target.value, e.target.name)
                    }
                  ></input>
                  <p className="error-msg">{error.minHeight}</p>
                </div>
                <div className="form-input-error">
                  <input
                    className="half-input"
                    type="number"
                    min="1"
                    name="maxHeight"
                    required
                    autocomplete="off"
                    placeholder="Dog's max height..."
                    onKeyDown={(e) => validateNumberKeyDown(e)}
                    onChange={(e) =>
                      validateNumber(e.target.value, e.target.name)
                    }
                  ></input>
                  <p className="error-msg">{error.maxHeight}</p>
                  <p className="second-error error-msg">{error.height}</p>
                </div>
              </div>
            </div>
            <div className="group-input">
              <div className="form-title-input">
                <h3 className="titles">Weight: </h3>
                <div className="form-input-error">
                  <input
                    className="half-input"
                    type="number"
                    min="1"
                    name="minWeight"
                    required
                    autocomplete="off"
                    placeholder="Dog's min weight..."
                    onKeyDown={(e) => validateNumberKeyDown(e)}
                    onChange={(e) =>
                      validateNumber(e.target.value, e.target.name)
                    }
                  ></input>
                  <p className="error-msg">{error.minWeight}</p>
                </div>
                <div className="form-input-error">
                  <input
                    className="half-input"
                    type="number"
                    min="1"
                    name="maxWeight"
                    required
                    autocomplete="off"
                    placeholder="Dog's max weight..."
                    onKeyDown={(e) => validateNumberKeyDown(e)}
                    onChange={(e) =>
                      validateNumber(e.target.value, e.target.name)
                    }
                  ></input>
                  <p className="error-msg">{error.maxWeight}</p>
                  <p className="second-error error-msg">{error.weight}</p>
                </div>
              </div>
            </div>
            <div className="group-input">
              <div className="form-title-input">
                <h3 className="titles">Lifespan: </h3>
                <div className="form-input-error">
                  <input
                    className="half-input"
                    type="number"
                    min="1"
                    name="minLife_span"
                    required
                    autocomplete="off"
                    placeholder="Dog's min lifespan..."
                    onKeyDown={(e) => validateNumberKeyDown(e)}
                    onChange={(e) =>
                      validateNumber(e.target.value, e.target.name)
                    }
                  ></input>
                  <p className="error-msg">{error.minLife_span}</p>
                </div>
                <div className="form-input-error">
                  <input
                    className="half-input"
                    type="number"
                    min="1"
                    name="maxLife_span"
                    required
                    autocomplete="off"
                    placeholder="Dog's max lifespan..."
                    onKeyDown={(e) => validateNumberKeyDown(e)}
                    onChange={(e) =>
                      validateNumber(e.target.value, e.target.name)
                    }
                  ></input>
                  <p className="error-msg">{error.maxLife_span}</p>
                  <p className="second-error error-msg">{error.lifespan}</p>
                </div>
              </div>
            </div>

            <div className="form-title-input">
              <h3 className="titles">Image: </h3>
              <div className="form-input-error">
                <input
                  className="full-input"
                  name="image"
                  placeholder="Dog's picture..."
                  onChange={(e) => validateURL(e.target.value, e.target.name)}
                ></input>
                <p className="error-msg">{error.image}</p>
              </div>
            </div>

            <input
              className="form-button"
              disabled={
                error.name ||
                error.height ||
                error.minHeight ||
                error.maxHeight ||
                error.weight ||
                error.minWeight ||
                error.maxWeight ||
                error.lifespan ||
                error.minLife_span ||
                error.maxLife_span ||
                state.name === "" ||
                state.minHeight === "" ||
                state.maxHeight === "" ||
                state.minWeight === "" ||
                state.maxWeight === "" ||
                state.minLife_span === "" ||
                state.maxLife_span === ""
              }
              type="submit"
              value="Create"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>

      <CreateTemperaments stateChanger={temperamentChange} />
    </div>
  );
}
