import axios from "axios";

const initialState = {
    pokemones : [],
    
} 
function rootReducer (state= initialState, action) {
    switch(action.type){
        case 'GET_POKEMONES':
            return{
                ...state,
                pokemones: action.payload
            }
        case 'FILTER_BY_ATAQ':
            const allPokemones = state.pokemones
            const statusFiltered = action.payload === 'All' ? allPokemones :allPokemones.filter(el =>el.status === action.payload)
            return{
                ...state,
                pokemonesFilter: statusFiltered
            }
        default: return state;
    }
}

export default rootReducer;
