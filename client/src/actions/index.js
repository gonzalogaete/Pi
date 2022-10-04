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

export function PostPokemon(payload){
    return async function (dispatch){
        const respons = await axios.post("http://localhost:3001/pokemons",payload)
        return respons
    }
}

export function ordennames(payload){
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

export function searchBarPokemon(payload){
        return async function (dispatch){
        var json = await axios.get('http://localhost:3001/pokemons?name='+ payload)
        
        if(typeof(json.data) == 'string'){
           return alert('No Se Encontro el Pokémon')
        }

        return dispatch({
            type: "GET_SEARCHBAR",
            payload: json.data
        })
        }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios("http://localhost:3001/pokemons/" + id)
            return dispatch ({
                type:'GET_DETAILS',
                payload: json.data
            })
        }catch(error){
            return error;
        }

    }
}

export function KillPkm(id){
    return async function(dispatch){
        try{
            var json = await axios.delete("http://localhost:3001/pokemons/" + id)
            return dispatch({
                type: 'KILL'
            })
        }catch(error){
            return error;
        }
    }
}