import axios from "axios";


export function getpokemones(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/pokemons');
        return dispatch({
            type: "GET_POKEMONES",
            payload: json.data
        })
    }
}

export function filterPokemonByAtaq(payload){
    return{
        type:"FILTER_BY_ATAQ",
        payload
    }
}