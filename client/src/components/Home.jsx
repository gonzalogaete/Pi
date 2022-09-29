import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getpokemones, ordennames, ordenAtaque, filtrado, filtradoTipo, getTipos } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import home from '../css/home.css';

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

    useEffect((e)=>{
        dispatch(getpokemones())
        dispatch(getTipos())
    },[])

    function OrderName(event){
        event.preventDefault();
        dispatch(ordennames(event.target.value));
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
        <div className="mainso">
            <SearchBar className='searchbar'></SearchBar>
            <h1 className='titulo'>PokéApiMon</h1>
            <Link to='/pokemones'>
                <button className="button-1">Crear Pokémon</button>
            </Link> 
            <div>
                <select onChange={e => {OrderName(e)}}> {/*orden alfabetico A-Z // Z-A */}
                    <optgroup label="Ordenamiento: por nombre">
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
                                <option key={i} value={c.name}> {c.name}
                                </option>
                                )
                            })}
                    </optgroup>
                </select>
            </div>
            <Paginado
                className='paginado'
                PkmPerPage = {PkmPerPage}
                allPokemones = {allPokemones.length}
                paginado = {paginado}
            />
            {CurrentPkm?.map((c, i)=>{
                return(
                    <div key={i} className='cartas'>
                        <Link className="link" to={'/home/' + c.id}>
                            <Card
                             name={c.name}
                             imagee={c.img ? c.img : c.imagen} 
                             key={c.id}
                             tipos={c.tipos ? c.tipos + '' : c.Types.map(e => e.name + ' ')} />
                        </Link>
                    </div>
                )
            })}
            
           
        </div>
    )

}