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

export function ordenNombres(payload){
    return function(dispatch){
       return dispatch({
        type: "ORDER_NAME",
        payload
       }) 
    }
}
