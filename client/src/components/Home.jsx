import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getpokemones, ordenNombres, ordenAtaque, filtrado, filtradoTipo, getTipos } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home(){

    const dispatch = useDispatch()
    const [orden, setOrden] = useState('')
    const allPokemones = useSelector((state)=> state.pokemones) //mapstatetoprops
    const [currentPage,setCurrentPage] = useState(1)
    const [PkmPerPage,setPkmPerPage] = useState(12)
    const indexOfLastPkm = currentPage * PkmPerPage
    const indexOfFirstPkm = indexOfLastPkm - PkmPerPage
    const CurrentPkm = allPokemones.slice(indexOfFirstPkm,indexOfLastPkm)
    const currentTipo = useSelector((state)=> state.tipos)
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getpokemones())
        dispatch(getTipos())
    },[])

    // function handleClick(evento){
    //     evento.preventDefault();
    //     dispatch(getpokemones());
    // }

    function OrderName(event){
        event.preventDefault();
        dispatch(ordenNombres(event.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${event.target.value}`)
    }

    function OrderAtaq(event){
        event.preventDefault();
        dispatch(ordenAtaque(event.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${event.target.value}`)
    }

    function filtrados(event){
        dispatch(filtrado(event.target.value));
    }
    function filtradoTipos(event){
        dispatch(filtradoTipo(event.target.value));
    }

    return (
        <div>
            <Link to='/pokemones'>Crear Pokémon</Link>
            <h1>Pokémon</h1>
            {/* <button onClick={e => {handleClick(e)}}>
                Mostrar Pokemones
            </button> */}
            <SearchBar></SearchBar>
            <div>
                <select onChange={e => {OrderName(e)}}> {/*orden alfabetico A-Z // Z-A */}
                    <optgroup label="Ordenamiento: por Nombre">
                        <option value='asc'>Ascendente</option>
                        <option value='desc'>Descendente</option>
                    </optgroup>
                </select>
                <select onChange={e => {OrderAtaq(e)}}> {/* orden por ataque*/}
                    <optgroup label="Ordenamiento: por Ataque">
                        <option value='ascATQ'>Ascendente</option>  
                        <option value='descATQ'>Descendente</option>
                    </optgroup>
                </select>
                <select onChange={e => {filtrados(e)}}> {/* Filtrado! por creado y no creado */}
                    <optgroup label="Filtrado: Pokemon creado y no creado">
                        <option value='all'>Todos</option>
                        <option value='creado'>Creado</option>
                        <option value='nocreado'>No Creado</option>
                    </optgroup>
                </select>
                <select onChange={e => {filtradoTipos(e)}}> {/* Filtrado! por tipo */}
                    <optgroup label="Filtrado: tipos de pokemon">
                        <option value='all'>Todos</option>
                            {currentTipo?.map((c,i) =>{
                                return(
                                <option key={i} value={c.name} > {c.name}
                                </option>
                                )
                            })}
                    </optgroup>
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