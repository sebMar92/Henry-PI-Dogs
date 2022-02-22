import {
  GET_ALL_DOGS,
  FILTER_DOGS,
  GET_ALL_TEMPERAMENTS,
  PAGINATE,
  CHANGE_ORDER,
} from "../actions/index.js";

const initialState = {
  dogs: [],
  filtered: [],
  order: {
    dogs: [],
    type: "alphabet",
    reverse: false,
  },
  display: [],
  detailedDog: [],
  temperaments: [],
};

function sortOrder(array, valueToCompare, optionalValue) {
  array.sort(function (a, b) {
    var dogA = a[valueToCompare] + optionalValue ? a[optionalValue] : "";
    console.log(a.name, " ", dogA);
    var DogB = b[valueToCompare] + optionalValue ? b[optionalValue] : "";
    if (dogA < DogB) {
      return -1;
    }
    if (dogA > DogB) {
      return 1;
    }
    return 0;
  });
}

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
      };
    case FILTER_DOGS:
      const { origin, temperaments, dogsByName } = payload;
      let dogsForFilter = [];
      //-----------------Names
      if (dogsByName) {
        dogsForFilter = dogsByName;
        //if error
        if (dogsForFilter.hasOwnProperty("error")) {
          return {
            ...state,
            display: dogsForFilter,
          };
        }
      } else {
        dogsForFilter = state.dogs;
      }
      //-----------------Origin
      if (origin !== "all") {
        if (origin === "created") {
          dogsForFilter = dogsForFilter.filter((dog) =>
            dog.hasOwnProperty("fromDatabase")
          );
        } else if (origin === "original") {
          dogsForFilter = dogsForFilter.filter(
            (dog) => !dog.hasOwnProperty("fromDatabase")
          );
        }

        //if empty
        if (dogsForFilter.length < 1) {
          return {
            ...state,
            display: {
              error: "No hay razas de perro que matcheen esos filtros",
            },
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
            display: {
              error: "No hay razas de perro que matcheen esos filtros",
            },
          };
        }
      }
      return {
        ...state,
        filtered: dogsForFilter,
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
    case CHANGE_ORDER:
      let dogsToOrder = [
        ...(state.filtered.length > 0 ? state.filtered : state.dogs),
      ];
      if (payload.type === "alphabet") {
        sortOrder(dogsToOrder, "name");
      } else if (payload.type === "weight") {
        sortOrder(dogsToOrder, "minWeight", "maxWeight");
      } else if (payload.type === "height") {
        sortOrder(dogsToOrder, "minHeight", "maxHeight");
      }
      if (payload.reverse) {
        dogsToOrder.reverse();
      }
      return {
        ...state,
        order: {
          dogs: dogsToOrder,
          type: payload.type,
          reverse: payload.reverse,
        },
      };
    case PAGINATE:
      let dogsToPaginate = state.order.dogs;
      let inChunks = [];
      for (let i = 0; i <= dogsToPaginate.length; i += 8) {
        inChunks.push(dogsToPaginate.slice(i, i + 8));
      }
      return {
        ...state,
        display: inChunks,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
