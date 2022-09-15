const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const axios = require ('axios');
const { DatabaseError } = require('pg');
const { Pokemon, Tipo } = require('../db.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
    let urls = apiUrl.data.results.map(current => current.url )
    let pkm = [];
    for(let i=0 ; i<urls.length ; i++){
        let ax = await axios.get(urls[i]);
        let obj = {
            nombre: ax.data.forms[0].name,
            tipos:ax.data.types.map(e => e.type.name),
            id: ax.data.id,
            vida:ax.data.stats[0].base_stat,
            ataque:ax.data.stats[1].base_stat,
            defensa:ax.data.stats[2].base_stat,
            velocidad:ax.data.stats[5].base_stat,
            altura:ax.data.height,
            peso:ax.data.weight,
            img:ax.data.sprites.other["official-artwork"].front_default,
        }
        pkm.push(obj)
    }
    return pkm
}

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include:{
            model: Tipo,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllpkms = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}

router.get(`/pokemons`, async (req,res)=> {
    const {name} = req.query;
    let total = await getAllpkms()
    if(name){
        let pokeName = total.filter(el => el.nombre.toLowerCase().includes(name.toLowerCase()))
        console.log(pokeName)
        if(pokeName.length){
            return res.status(200).send(pokeName)
        }else{
            return res.status(404).send('No se encontro el perro')
        } 
    } 
    return res.status(200).send(total) 
})

const pkmid = async (id) =>{
    const pokemones = await getAllpkms();
    for(let i=0; i< pokemones.length ; i++){
        if(id === pokemones[i].id){
            return pokemones[i];
        }
    }
    return 'El Pokemon no existe.'
}

router.get(`/pokemons/:id`, async (req,res)=>{
    const {id} = req.params
    const pokeid = await pkmid(id);
    if(typeof pkmid !== number){
        return res(404).send(pokeid)
    }else{
        return res(201).send(pokeid)
    }
})


module.exports = router