import { GET_ALL_DOGS, GET_SEARCH_DOGS, FILTER_DOGS, GET_ALL_TEMPERAMENTS } from "../actions/index.js"

const initialState = {
    dogs: [],
    filteredDogs: [],
    showFilter: false,
    detailedDog: [],
    temperaments: [],
};

function rootReducer(state = initialState, { type, payload }){
    switch(type) {
        case GET_ALL_DOGS:
            return{
                ...state,
                dogs: payload,
            };
        case GET_SEARCH_DOGS:
            return{
                ...state,
                filteredDogs: payload,
            };
        case FILTER_DOGS:
            const { original, temperaments, dogsByName } = payload;
            let dogsForFilter = [];
            if (dogsByName) {
                dogsForFilter =  dogsByName;
                //if error
                if (dogsForFilter.hasOwnProperty("error")) {
                    return {
                        ...state,
                        filteredDogs: dogsForFilter,
                        showFilter: true,
                    };
                };
            }
            else {
                dogsForFilter = state.dogs;
            }
            if (original !== null) {
                if (original){
                    dogsForFilter = dogsForFilter.filter(dog => dog.hasOwnProperty("fromDatabase"));
                } else {
                    dogsForFilter = dogsForFilter.filter(dog => !dog.hasOwnProperty("fromDatabase"));
                }
                
                //if empty
                if (dogsForFilter.length < 1) {
                    return {
                        ...state,
                        filteredDogs: { error: "No hay razas de perro que matcheen esos filtros"},
                        showFilter: true,
                    };
                }
            }
            if (temperaments.length > 0) {
                dogsForFilter = dogsForFilter.filter(dog => {
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
                        filteredDogs: { error: "No hay razas de perro que matcheen esos filtros"},
                        showFilter: true,
                    };
                };
            } 
            return{
                ...state,
                filteredDogs: dogsForFilter,
                showFilter: true,
            };
        case GET_ALL_TEMPERAMENTS:
            payload.sort(function(a, b) {
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
            return{
                ...state,
                temperaments: payload,
            };
        default: 
            return {
                ...state
            };            
    };
};

export default rootReducer;