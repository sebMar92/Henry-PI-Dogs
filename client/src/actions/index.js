import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const FILTER_DOGS = "FILTER_DOGS";
export const POST_DOG = "POST_DOG";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const PAGINATE = "PAGINATE"

export function getDogs() {
  return async function (dispatch) {
    var dogs = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: dogs.data,
    });
  };
}
export function filterDogs(original, temperaments, name) {
  return async function (dispatch) {
    var dogsByName = null;
    if (name) {
      dogsByName = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: FILTER_DOGS,
        payload: {
          original,
          temperaments,
          dogsByName: dogsByName.data,
        },
      });
    }
    return dispatch({
      type: FILTER_DOGS,
      payload: {
        original: original,
        temperaments: temperaments,
        dogsByName: dogsByName,
      },
    });
  };
}
export function getTemperaments() {
  return async function (dispatch) {
    var temperaments = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: temperaments.data,
    });
  };
}
export function postDog(dog) {
  return async function (dispatch) {
    var status = await axios.post("http://localhost:3001/dog", dog);
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
  }
}
export function paginate(){
  return {
    type: PAGINATE,
  }
}
