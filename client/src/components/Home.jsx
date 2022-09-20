import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getpokemones } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";

export default function Home(){

    const dispatch = useDispatch()
    const allPokemones = useSelector((state)=> state.pokemones) //mapstatetoprops

    useEffect(()=>{
        dispatch(getpokemones())
    },[])

    function handleClick(evento){
        evento.preventDefault();
        dispatch(getpokemones());
    }

    return (
        <div>
            <Link to='/pokemones'>Crear Pokémon</Link>
            <h1>Pokémon</h1>
            <button onClick={e => {handleClick(e)}}>
                Mostrar Pokemones
            </button>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendemte</option>
                </select>
                <select>
                    <option value='all'>Todos</option>
                    <option value='tipo'>Tipo</option>
                </select>
                <select>
                    <option value='all'>Todos</option>
                    <option value='creado'>Creado</option>
                    <option value='nocreado'>No Creado</option>
                </select>
            </div>
            {allPokemones?.map((c, i)=>{
                return(
                    <div key={i} className='cartas'>
                        <Link to={'/home/' + c.id}>
                            <Card name={c.nombre} image={c.img} key={c.id}/>
                        </Link>
                    </div>
                )
            })}
            
        </div>
    )

}