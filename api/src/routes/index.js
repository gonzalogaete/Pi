const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const axios = require ('axios');
const { DatabaseError } = require('pg');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () =>{
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
    let urls = apiUrl.data.results.map(current => current.url )
    let pkm = [];
    for(let i=0 ; i<urls.length ; i++){
        let ax = await axios.get(urls[i]);
        pkm.push(ax)
    }
    // const apiInfo = await apiUrl.data.results.map(element =>{
    //     return {
    //         url:element.url,
    //     };
    // });
    // return apiInfo;

}

getApiInfo()
getPkmInfo()
 
module.exports = router;

