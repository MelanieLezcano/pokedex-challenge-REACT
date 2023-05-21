import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
    pokemonList: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_POKEMON_LIST':
            return {
                ...state,
                pokemonList: action.payload,
            };
            default:
                return state;
    }    
}

const store = createStore(rootReducer);

export default store;