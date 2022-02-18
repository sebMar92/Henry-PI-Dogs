import {
  GET_ALL_DOGS,
  CLEAR_FILTER,
  FILTER_DOGS,
  GET_ALL_TEMPERAMENTS,
} from "../actions/index.js";

const initialState = {
  dogs: [],
  displayDogs: [],
  showFilter: false,
  detailedDog: [],
  temperaments: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_DOGS:
      if (state.showFilter === true) {
        return {
          ...state,
          dogs: payload,
        };
      } else {
        let inChunks = [];
        for (let i = 0; i <= payload.length; i += 8) {
          inChunks.push(payload.slice(i, i + 8));
        }
        return {
          ...state,
          dogs: payload,
          displayDogs: inChunks,
        };
      }
    case FILTER_DOGS:
      const { original, temperaments, dogsByName } = payload;
      let dogsForFilter = [];
      //-----------------Names
      if (dogsByName) {
        dogsForFilter = dogsByName;
        //if error
        if (dogsForFilter.hasOwnProperty("error")) {
          return {
            ...state,
            displayDogs: dogsForFilter,
            showFilter: true,
          };
        }
      } else {
        dogsForFilter = state.dogs;
      }
      //-----------------Origin
      if (original !== null) {
        if (original === "Created") {
          dogsForFilter = dogsForFilter.filter((dog) =>
            dog.hasOwnProperty("fromDatabase")
          );
        } else {
          dogsForFilter = dogsForFilter.filter(
            (dog) => !dog.hasOwnProperty("fromDatabase")
          );
        }

        //if empty
        if (dogsForFilter.length < 1) {
          return {
            ...state,
            displayDogs: {
              error: "No hay razas de perro que matcheen esos filtros",
            },
            showFilter: true,
          };
        }
      }
      //-----------------Temperaments
      if (temperaments.length > 0) {
        dogsForFilter = dogsForFilter.filter((dog) => {
          for (const temp of temperaments) {
            if (!dog.temperament || !dog.temperament.includes(temp)) {
              return false;
            }
          }
          return dog;
        });
        //if empty
        if (dogsForFilter.length < 1) {
          return {
            ...state,
            displayDogs: {
              error: "No hay razas de perro que matcheen esos filtros",
            },
            showFilter: true,
          };
        }
      }
      let inChunks = [];
      for (let i = 0; i <= dogsForFilter.length; i += 8) {
        inChunks.push(dogsForFilter.slice(i, i + 8));
      }
      return {
        ...state,
        displayDogs: inChunks,
        showFilter: true,
      };
    case GET_ALL_TEMPERAMENTS:
      payload.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        temperaments: payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
