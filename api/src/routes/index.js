const { Router } = require('express');
const router = Router();
const axios = require ('axios');
const { Pokemon, Type } = require('../db.js');

const getApiInfo = async () =>{
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`);
    let urls = apiUrl.data.results.map(current => current.url )
    let pkm = [];
    for(let i=0 ; i<urls.length ; i++){
        let ax = await axios.get(urls[i]);
        let obj = {
            name: ax.data.forms[0].name,
            tipos:ax.data.types.map(e => e.type.name),
            id: ax.data.id,
            vida:ax.data.stats[0].base_stat,
            ataque:ax.data.stats[1].base_stat,
            defensa:ax.data.stats[2].base_stat,
            velocidad:ax.data.stats[5].base_stat,
            altura:ax.data.height,
            peso:ax.data.weight/10,
            img:ax.data.sprites.other["official-artwork"].front_default,
            createInDb:false
        }
        pkm.push(obj)
    }
    return pkm
}

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include:{
            model: Type,
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

const pkmid = async (id) =>{
    const pokemones = await getAllpkms();
    for(let i=0; i< pokemones.length ; i++){
        if(id == pokemones[i].id){
            return pokemones[i];
        }
    }
    return 0
}

const Typedb = async () => {
    const apiType = await axios.get('https://pokeapi.co/api/v2/type')
    for(let i=0; i < apiType.data.results.length; i++){
        Type.findOrCreate({
            where:{
                name: apiType.data.results[i].name
            }
        })
    }
}

router.get(`/pokemons`, async (req,res)=> {
    const {name} = req.query;
    let total = await getAllpkms()
    if(name){
        let pokeName = total.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        if(pokeName.length){
            return res.status(200).send(pokeName)
        }else{
            return res.status(200).send('No se encontro el pokemon')
        } 
    }
    return res.status(200).send(total) 
})

router.get("/types", async (req, res) => {
    await Typedb();
    const allTypes = await Type.findAll()
    return res.status(200).send(allTypes)
  });

router.get(`/pokemons/:id`, async (req,res)=>{
    const {id} = req.params;
    const pokeid = await pkmid(id);

    if(pokeid == 0){
        return res.status(200).send('No Existe este Pokemon')
    }else{
        return res.status(201).send(pokeid)
    }
})

router.post(`/pokemons`,async (req,res)=>{
    let {name,vida,ataque,defensa,velocidad,altura,peso,imagen,tipos} = req.body;

    if(!vida) vida = 1;
    if(!ataque) ataque = 1;
    if(!defensa) defensa = 1;
    if(!velocidad) velocidad = 1;
    if(!altura) altura = 1;
    if(!peso) peso = 1;
    
    await Typedb();
        if(!name) return res.status(404).send("Necesita Tener un nombre");
        if(name){
            const createpkm = await Pokemon.create({
                name: name.toLowerCase(),
                vida,ataque,defensa,velocidad,altura,peso,imagen,createInDb:true})
            const createTypes = await Type.findAll({
                where: { name: tipos }
            })
            createpkm.addTypes(createTypes);
            res.send('Pokemon Creado')
        }
})

router.put(`/pokemons/:id`,(req,res) => {
    let{name,vida,ataque,defensa,velocidad,altura,peso,imagen,tipos} = req.body;
    const {id} = req.params;
    Pokemon.update(
        {name, vida, ataque, defensa, velocidad, altura, peso, imagen, tipos},
        { where :{ id } }
    ).then( e  =>{
        res.send('Pokemon Modificado')
    }).catch(error => {
        res.send('Pokemon No Modificado' + error)
        }
    )
})

router.delete(`/pokemons/:id`,(req,res)=>{
    const {id} = req.params;
    Pokemon.destroy(
        {where : {id}}
    ).then(res => {
        res.send('Pokemon Eliminado')
    }).catch(error => {
        res.send('Pokemon No Eliminado' + error)
        }
    )
})

module.exports = router
