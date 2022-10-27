import axios from "axios";


export function getpokemones(){
    return async function(dispatch){
        dispatch(IsLoading(true))
        var json = await axios('/pokemons');
        dispatch(IsLoading(false))
        return dispatch({
            type: "GET_POKEMONES",
            payload: json.data
        })
    }
}
export function getTipos (){
    return async function(dispatch){
        var json = await axios('/types');
        return dispatch({
            type: 'GET_TIPOS',
            payload: json.data
        })
    }
}

export function PostPokemon(payload){
    return async function (dispatch){
        const respons = await axios.post("/pokemons",payload)
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
        var json = await axios.get('/pokemons?name='+ payload)
        
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
            dispatch(IsLoading(true))
            var json = await axios("/pokemons/" + id)
            dispatch(IsLoading(false))
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
            var json = await axios.delete("/pokemons/" + id)
            return dispatch({
                type: 'KILL'
            })
        }catch(error){
            return error;
        }
    }
}

export function IsLoading (payload){
    return async function (dispatch){
        return dispatch({
            type: 'Loading',
            payload: payload
        })
    }
}