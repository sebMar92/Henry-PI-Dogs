import {
  GET_ALL_DOGS,
  FILTER_DOGS,
  GET_ALL_TEMPERAMENTS,
  PAGINATE,
  CHANGE_ORDER,
} from "../actions/index.js";
import { sortOrder } from "../functions/functions.js";

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
              error: "There aren't dog breeds that match those filters",
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
              error: "There aren't dog breeds that match those filters.",
            },
          };
        }
      }
      return {
        ...state,
        filtered: dogsForFilter,
      };
    case GET_ALL_TEMPERAMENTS:
      sortOrder(payload, "name");
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
      for (let i = 0; i <= dogsToPaginate.length - 1; i += 8) {
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
