import axios from "axios";

const initialState = {
    pokemones: [],
    allpokemons: [],
} 
function rootReducer (state= initialState, action) {
    switch(action.type){
        case 'GET_POKEMONES':
            return{
                ...state,
                pokemones: action.payload,
                allpokemons: action.payload
            }
        // case 'FILTER':
        //     const allpokemons = state.allpokemons
        //     const statusFiltered = action.payload === 'All' ? allpokemons :allpokemons.filter(el =>el.status === action.payload)
        //     return{
        //         ...state,
        //         pokemonesFilter: statusFiltered
        //     }

        case 'ORDER_NAME':
            let order = action.payload === 'asc'? 
            state.pokemones.sort(function(a,b){
                if(a.nombre > b.nombre) return 1
                if(b.nombre > a.nombre ) return -1
                return 0
            }) :
            state.pokemones.sort(function(a,b){
                if(a.nombre > b.nombre) return -1
                if(b.nombre > a.nombre ) return 1
                return 0
            })
            return{
                ...state,
                pokemones: order,
            }
        default: return state;
    }
}

export default rootReducer;
