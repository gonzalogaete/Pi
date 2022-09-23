const initialState = {
    pokemones: [],
    allpokemons: [],
    tipos:[]
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
            const filtrado = action.payload === 'all' ? 
            state.allpokemons :
            filterpkm.filter(e => e.tipos.includes(action.payload))
            return{
                ...state,
                pokemones: filtrado
            }

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
        default: return state;
    }
}

export default rootReducer;
