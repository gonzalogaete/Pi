// const router = Router();
// const axios = require ('axios');
// const { Pokemon, Tipo } = require('../db.js')


// const getApiInfo = async () =>{
//     const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
//     let urls = apiUrl.data.results.map(current => current.url )
//     let pkm = [];
//     for(let i=0 ; i<urls.length ; i++){
//         let ax = await axios.get(urls[i]);
//         let obj = {
//             nombre: ax.data.forms[0].name,
//             tipos:ax.data.types.map(e => e.type.name),
//             id: ax.data.id,
//             vida:ax.data.stats[0].base_stat,
//             ataque:ax.data.stats[1].base_stat,
//             defensa:ax.data.stats[2].base_stat,
//             velocidad:ax.data.stats[5].base_stat,
//             altura:ax.data.height,
//             peso:ax.data.weight,
//             img:ax.data.sprites.other["official-artwork"].front_default,
//         }
//         pkm.push(obj)
//     }
//     return pkm
// }

// const getDbInfo = async () => {
//     return await Pokemon.findAll({
//         include:{
//             model: Tipo,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             },
//         }
//     })
// }

// const getAllpkms = async () => {
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo)
//     return infoTotal
// }

// module.exports = {getApiInfo, getDbInfo, getAllpkms}