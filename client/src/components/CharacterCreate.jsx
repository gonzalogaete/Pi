import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {getTipos, PostPokemon} from '../actions/index.js';
import { useDispatch, useSelector } from "react-redux";
import '../css/Cc.css'

export  default function PokeCreate(){
    const dispatch = useDispatch();
    const tipos = useSelector((state)=>state.tipos);
    const history = useHistory();
    const [acum,setacum] = useState(1);
    const [enviar,setEnviar] = useState(true);

    const [errors,setErrors] = useState({
        name:'',
        vida:'',
        ataque:'',
        defensa:'',
        velocidad:'',
        altura:'',
        peso:'',
        imagen: undefined,
        tipos:[],
    })

    const [input,setInput] = useState({
        name:'',
        vida:'',
        ataque:'',
        defensa:'',
        velocidad:'',
        altura:'',
        peso:'',
        imagen: undefined,
        tipos:[],
    })

    useEffect(()=>{
        dispatch(getTipos())
    },[]);

    const handleChange = (e) => {
        setErrors(validateInput({
            ...input,
            [e.target.name]:e.target.value
        }));
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
    };
    const handleTipos = (e) => {
        setacum(acum+1)
        if(acum > 2){
            return alert('Solo 2 tipos por pokemon')
        }
        
        setInput({
          ...input,
          tipos: [...input.tipos, e.target.value],
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(PostPokemon(input));
        alert("Pokemon Creado");
        setInput({
            name:'',
            vida:'',
            ataque:'',
            defensa:'',
            velocidad:'',
            altura:'',
            peso:'',
            imagen:'',
            tipos:[],
        });
        history.push("/home");
      };

      const handleDeleteTipos = (e) => {
        setacum(acum-2)
        setInput({
          ...input,
          tipos: input.tipos.filter((tipos) => tipos !== e),
        });
      };

      function validateInput(input){
        let errors={};

        
        if(!input.name){
            errors.name='Se Requiere un Nombre para el Pokemon'
        }else if(true){
            for(let a = 0; a < input.name.length; a++){
                if(!isNaN(input.name[a])){
                    errors.name = 'El nombre no puede tener numeros'
                }
            }
        }
        
        if(input.vida > 255){
            errors.vida ='La vida no puede ser mayor a 255'
        }else if(input.vida < 1){
            errors.vida ='La vida no puede ser menor a 1'
        }else if(true){
            for(let a = 0; a < input.vida.length; a++){
                if(isNaN(input.vida[a])){
                    errors.vida = 'El valor de vida debe ser un numero'
                }
            }
        }

         if(input.ataque > 255){
            errors.ataque ='El ataque no puede ser mayor a 255'
        }else if(input.ataque < 1){
            errors.ataque ='El vida no puede ser menor a 1'
        }else if(true){
            for(let a = 0; a < input.ataque.length; a++){
                if(isNaN(input.ataque[a])){
                    errors.ataque = 'El valor de ataque debe ser un numero'
                }
            }
        }

        if(input.defensa > 255){
            errors.defensa ='La defensa no puede ser mayor a 255'
        }else if(input.defensa < 1){
            errors.defensa ='La defensa no puede ser menor a 1'
        }else if(true){
            for(let a = 0; a < input.defensa.length; a++){
                if(isNaN(input.defensa[a])){
                    errors.defensa = 'El valor de defensa debe ser un numero'
                }
            }
        }
        
        if(input.velocidad > 255){
            errors.velocidad ='La velocidad no puede ser mayor a 255'
        }else if(input.velocidad < 1){
            errors.velocidad ='La velocidad no puede ser menor a 1'
        }else if(true){
            for(let a = 0; a < input.velocidad.length; a++){
                if(isNaN(input.velocidad[a])){
                    errors.velocidad = 'El valor de velocidad debe ser un numero'
                }
            }
        }
        
        if(input.altura > 1501){
            errors.altura ='La altura no puede ser mayor a 15 metros'
        }else if(input.altura < 0){
            errors.altura ='La altura no puede ser menor a 0.1 metros'
        }else if(true){
            for(let a = 0; a < input.altura.length; a++){
                if(isNaN(input.altura[a])){
                    errors.altura = 'El valor de altura debe ser un numero'
                }
            }
        }
        
        if(input.peso > 1001){
            errors.peso ='El peso no puede ser mayor a 1000 kilogramos'
        }else if(input.peso < 1){
            errors.peso ='El peso no puede ser menor a 0.1 kilogramos'
        }else if(true){
            for(let a = 0; a < input.peso.length; a++){
                if(isNaN(input.peso[a])){
                    errors.peso = 'El valor de peso debe ser un numero'
                }
            }
        }

        if((!errors.nombre ) && !errors.vida && !errors.ataque && !errors.defensa && !errors.velocidad && !errors.altura && !errors.peso){
            setEnviar(false)
        }else{
            setEnviar(true)
        } 


        return errors;
      }

    return(
        <div className="formDiv">
            <h1 className="formTitulo">Crea tu pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="cajaForm">
                    <div className="formName">
                        <div>
                            <label className="primeraForm">name: </label>
                        </div>
                        <input
                        className="inputForm"
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(e) => handleChange(e)}
                        required
                        />
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </div>
                    <div className="formName">
                        <div>
                            <label className="primeraForm">vida: </label>
                        </div>
                        <input
                        className="inputForm"
                        type='text'
                        value={input.vida}
                        name='vida'
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.vida && (
                            <p className="error">{errors.vida}</p>
                        )}
                    </div>
                    <div className="formName">
                        <div>
                            <label className="primeraForm">ataque: </label>
                        </div>
                        <input
                        className="inputForm"
                        type='text'
                        value={input.ataque}
                        name='ataque'
                        onChange={(e) => handleChange(e)}/>
                        {errors.ataque && (
                            <p className="error">{errors.ataque}</p>
                        )}
                </div>
                <div className="formName">
                    <div>
                        <label className="primeraForm">defensa: </label>
                    </div>
                    <input
                    className="inputForm"
                    type='text'
                    value={input.defensa}
                    name='defensa'
                    onChange={(e) => handleChange(e)}></input>
                    {errors.defensa && (
                            <p className="error">{errors.defensa}</p>
                    )}
                </div>
                <div className="formName">
                    <div>
                    <   label className="primeraForm">velocidad: </label>
                    </div>
                    <input
                    className="inputForm"
                    type='text'
                    value={input.velocidad}
                    name='velocidad'
                    onChange={(e) => handleChange(e)}></input>
                    {errors.velocidad && (
                            <p className="error">{errors.velocidad}</p>
                    )}
                </div>
                <div className="formName">
                    <div>
                        <label className="primeraForm">altura: </label>
                    </div>
                    <input
                    className="inputForm"
                    type='text'
                    value={input.altura}
                    name='altura'
                    onChange={(e) => handleChange(e)}></input>
                    {errors.altura && (
                            <p className="error">{errors.altura}</p>
                    )}
                </div>
                <div className="formName">
                    <div>
                        <label className="primeraForm">peso en kilogramos: </label>
                    </div>
                    <input
                    className="inputForm"
                    type='text'
                    value={input.peso}
                    name='peso'
                    onChange={(e) => handleChange(e)}></input>
                    {errors.peso && (
                            <p className="error">{errors.peso}</p>
                    )}
                </div>
                <div className="formName">
                    <div>
                        <label className="primeraForm">URL Imagen : </label>
                    </div>
                    <input
                    className="inputForm"
                    type="text"
                    value={input.imagen}
                    name="imagen"
                    onChange={(e) => handleChange(e)}/>
                </div>
                </div>
                <div className="formTipos">
                    <label className="primeraForm">Agregar Tipos: </label>
                    <select  className='selectForm' onChange={(e) => handleTipos(e)}>
                        {tipos.map((e,i) =>{
                            return(
                                <option value={e.name} key={i}> {e.name + ' '} 
                                </option>
                            )})
                        }
                    </select>
                    <ul className="formUL">
                    {
                        input.tipos.map((e, i) => {
                            return (
                                    <li className="tiposLi" key={i} onClick={() => handleDeleteTipos(e)}> {e} X </li>
                            );
                        })
                    }
                    </ul>
                </div>
                <div className="buttonsPosition">
                    <Link to='/home'>
                        <button className="buttonVolver">
                            <h1 className="volverText">Volver</h1></button>
                    </Link>
                    <button className='ButtonSubmit'type="submit" disabled={enviar}>
                    <h1 className="buttontext">Crear Pokemon</h1></button>
                </div>

                
            </form>
        </div>
    )
}