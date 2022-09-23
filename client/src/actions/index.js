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
export function getTipos (){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/types');
        return dispatch({
            type: 'GET_TIPOS',
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
export function ordenAtaque(payload){
    return function(dispatch){
        return dispatch({
            type: "ORDER_ATAQ",
            payload
        })
    }
}
export function filtrado(payload){
    return function(dispatch){
        return dispatch({
            type: "FILTRADO",
            payload
        })
    }
}
export function filtradoTipo(payload){
    return function(dispatch){
        return dispatch({
            type: "FILTRADO_TYPE",
            payload
        })
    }
}