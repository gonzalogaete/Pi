import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {getTipos, PostPokemon} from '../actions/index.js';
import { useDispatch, useSelector } from "react-redux";

export  default function PokeCreate(){
    const dispatch = useDispatch();
    const tipos = useSelector((state)=>state.tipos);
    const history = useHistory();

    const [input,setInput] = useState({
        name:'',
        vida:'',
        ataque:'',
        defensa:'',
        velocidad:'',
        altura:'',
        peso:'',
        imagen:'',
        tipos:[],
    })

    useEffect(()=>{
        dispatch(getTipos())
    },[]);

    const handleChange = (e) => {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
    };
    const handleTipos = (e) => {
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
        setInput({
          ...input,
          tipos: input.tipos.filter((tipos) => tipos !== e),
        });
      };

    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>name: </label> <input
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={(e) => handleChange(e)}
                    required
                    />
                </div>
                <div>
                    <label>vida: </label><input
                    type='text'
                    value={input.vida}
                    name='vida'
                    onChange={(e) => handleChange(e)}
                    required />
                </div>
                <div>
                    <label>ataque: </label><input
                    type='text'
                    value={input.ataque}
                    name='ataque'
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>defensa: </label><input
                    type='text'
                    value={input.defensa}
                    name='defensa'
                    onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>velocidad: </label><input
                    type='text'
                    value={input.velocidad}
                    name='velocidad'
                    onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>altura: </label><input
                    type='text'
                    value={input.altura}
                    name='altura'
                    onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>peso: </label><input
                    type='text'
                    value={input.peso}
                    name='peso'
                    onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Imagen</label>
                    <input
                    type="text"
                    value={input.img}
                    name="imagen"
                    onChange={(e) => handleChange(e)}
                    required
                    />
                </div>
                <div>
                    <label>Tipos</label>
                    <select onChange={(e) => handleTipos(e)}>
                        {tipos.map((e,i) =>{
                            return(
                                <option value={e.name} key={i}> {e.name} </option>
                            )})
                        }
                    </select>
                    {/* <ul>
                     {input.tiposDePkm.map((e, i) => {
                        return (
                        <li key={i} onClick={() => handleDeleteTipos(e)}>
                         {e} X
                        </li>
                        );
                        })}
                    </ul> */}
                </div>
                <button type="submit">Crear Pokemon</button>
            </form>
        </div>
    )
}