const initialState = {
    pokemones: [],
    allpokemons: [],
    tipos:[],
    details:[],
    Loader: false
} 
function rootReducer (state= initialState, action) {
    switch(action.type){
        case 'GET_POKEMONES':
            return{
                ...state,
                pokemones: action.payload,
                allpokemons: action.payload
            }
        case 'GET_TIPOS':
            return{
                ...state,
                tipos: action.payload,
            }
        case 'FILTRADO':
            const allPkm = state.allpokemons
            const statusFiltrado = action.payload === 'creado'? allPkm.filter(el => el.createInDb === true) : allPkm.filter(el => el.createInDb === false )
            return{
                ...state,
                pokemones: action.payload === 'all' ? state.allpokemons : statusFiltrado
            }
        
        case 'FILTRADO_TYPE':
            const filterpkm = state.allpokemons
            const filtrado = [];

            for(let i =0 ; i<filterpkm.length; i++){

                if(filterpkm[i].tipos !== undefined){
                    for(let nocreados = 0; nocreados < filterpkm[i].tipos.length; nocreados++ ){
                        if(filterpkm[i].tipos[nocreados] === action.payload){
                            filtrado.push(filterpkm[i])
                        }
                    }
                }else{
                    for(let creados = 0 ; creados < filterpkm[i].Types.length; creados++){
                        if(filterpkm[i].Types[creados].name === action.payload){
                            filtrado.push(filterpkm[i])
                        }
                    }
                }
            }
            return{
                ...state,
                pokemones: action.payload === 'all' ? state.allpokemons : filtrado
            }

        case 'ORDER_NAME':
            let order = action.payload === 'AZ'? 
            state.pokemones.sort(function(a,b){
                if(a.name > b.name) return 1
                if(b.name > a.name ) return -1
                return 0
            }) :
            state.pokemones.sort(function(a,b){
                if(a.name > b.name) return -1
                if(b.name > a.name ) return 1
                return 0
            })
            return{
                ...state,
                pokemones: order,
            }

        case 'ORDER_ATAQ':
            let orderat = action.payload === 'ascATQ'? 
            state.pokemones.sort(function(a,b){
                if(a.ataque > b.ataque) return 1
                if(b.ataque > a.ataque ) return -1
                return 0
            }) :
            state.pokemones.sort(function(a,b){
                if(a.ataque > b.ataque) return -1
                if(b.ataque > a.ataque ) return 1
                return 0
            })
            return{
                ...state,
                pokemones: orderat,
            }
        case 'GET_SEARCHBAR':
            return{
                ...state,
                pokemones: action.payload
            }
        case 'POST_POKEMON':
            return {...state}

        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            }

        case 'Kill':
            return {...state}
        
        case 'Loading':
            return {
                ...state,
                Loader: action.payload
            }
        
        default: return state;
    }
}

export default rootReducer;
