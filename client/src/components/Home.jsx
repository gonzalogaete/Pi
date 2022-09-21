import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getpokemones, filterPokemonBy, filterPokemonByalfabetic } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado";


export default function Home(){

    const dispatch = useDispatch()
    const allPokemones = useSelector((state)=> state.pokemones) //mapstatetoprops

    const [currentPage,setCurrentPage] = useState(1)
    const [PkmPerPage,setPkmPerPage] = useState(12)
    const indexOfLastPkm = currentPage * PkmPerPage
    const indexOfFirstPkm = indexOfLastPkm - PkmPerPage
    const CurrentPkm = allPokemones.slice(indexOfFirstPkm,indexOfLastPkm)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getpokemones())
    },[])

    // function handleClick(evento){
    //     evento.preventDefault();
    //     dispatch(getpokemones());
    // }

    function handleFilterAlfabetic(event){
        dispatch(filterPokemonByalfabetic(event.target.value))
    }

    return (
        <div>
            <Link to='/pokemones'>Crear Pokémon</Link>
            <h1>Pokémon</h1>
            {/* <button onClick={e => {handleClick(e)}}>
                Mostrar Pokemones
            </button> */}
            <div>
                <select> {/*orden alfabetico */}
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={ e => handleFilterAlfabetic(e)}> {/* orden por ataque desendente*/}
                    <option value='all'>Default</option>  
                    <option value='porataq'>Ataque</option>
                </select>
                <select> {/* orden por creado y no creado */}
                    <option value='all'>Todos</option>
                    <option value='creado'>Creado</option>
                    <option value='nocreado'>No Creado</option>
                </select>
            </div>
            <Paginado 
                PkmPerPage = {PkmPerPage}
                allPokemones = {allPokemones.length}
                paginado = {paginado}
            />
            {CurrentPkm?.map((c, i)=>{
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