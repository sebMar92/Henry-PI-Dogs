import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const FILTER_DOGS = "FILTER_DOGS";
export const POST_DOG = "POST_DOG";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const PAGINATE = "PAGINATE";

// export function getDogs() {
//   return async function (dispatch) {
//     var dogs = await axios.get("/dogs");
//     return dispatch({
//       type: GET_ALL_DOGS,
//       payload: dogs.data,
//     });
//   };
// }
export function getDogs() {
  return function (dispatch) {
    return axios.get("/dogs").then((res) => {
      return dispatch({
        type: GET_ALL_DOGS,
        payload: res.data,
      });
    });
  };
}
export function filterDogs(origin, temperaments, name) {
  return async function (dispatch) {
    var dogsByName = null;
    if (name !== "") {
      dogsByName = await axios.get(`/dogs?name=${name}`);
      return dispatch({
        type: FILTER_DOGS,
        payload: {
          origin,
          temperaments,
          dogsByName: dogsByName.data,
        },
      });
    }

    return dispatch({
      type: FILTER_DOGS,
      payload: {
        origin: origin,
        temperaments: temperaments,
        dogsByName: dogsByName,
      },
    });
  };
}
export function getTemperaments() {
  return async function (dispatch) {
    var temperaments = await axios.get("/temperament");
    return dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: temperaments.data,
    });
  };
}
export function postDog(dog) {
  return async function (dispatch) {
    var status = await axios.post("/dog", dog);
    return dispatch({
      type: POST_DOG,
      payload: status.data,
    });
  };
}
export function changeOrder(orderData) {
  return {
    type: CHANGE_ORDER,
    payload: orderData,
  };
}
export function paginate() {
  return {
    type: PAGINATE,
  };
}
