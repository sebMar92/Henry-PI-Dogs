import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const GET_SEARCH_DOGS = "GET_SEARCH_DOGS";
export const FILTER_DOGS = "FILTER_DOGS";

export function getDogs(){
    return async function(dispatch){
        var dogs = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: GET_ALL_DOGS,
            payload: dogs.data,
        })
    }
};
export function getSearch(name){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        return dispatch({
            type: GET_SEARCH_DOGS,
            payload: json.data,
        })
    }
};
export function filterDogs(original, temperaments, name){
    return async function(dispatch){
        var dogsByName = null;
        if (name) {
            dogsByName = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: FILTER_DOGS,
                payload: {
                    original,
                    temperaments,
                    dogsByName : dogsByName.data,
                }
            })
        }
        return dispatch({
            type: FILTER_DOGS,
            payload: {
                original: original,
                temperaments: temperaments,
                dogsByName: dogsByName,
            }
        })
    };
};
export function getTemperaments(){
    return async function(dispatch){
        var temperaments = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: temperaments.data,
        })
    }
};