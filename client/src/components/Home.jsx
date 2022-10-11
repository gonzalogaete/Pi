import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getpokemones, ordennames, ordenAtaque, filtrado, filtradoTipo, getTipos } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import home from '../css/home.css';
import Loader from "./loader.jsx";

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
    const [isLoading, setIsLoading] = useState(false); 
    const loading = useSelector((state) => state.Loader);
    
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
        setCurrentPage(1);
    }
    function filtradoTipos(event){
        dispatch(filtradoTipo(event.target.value));
        setCurrentPage(1);
    }
    
    return (
        <div className="mainso">
            {
                loading && <Loader/>
            }
            <SearchBar className='searchbar'></SearchBar>
            <h1 className='titulo'>PokéApiMon</h1>
            
            <Link className="linkbutton-1" to='/pokemones'>
                <button className="button-1" role="button">Crear Pokémon</button>
            </Link> 
            <div className="selectors">
                <div className="Ordenamientos">
                    <p className="textOrdenamiento">Ordenamientos</p>
                <select id='orderName' className='Ordername'onChange={e => {OrderName(e)}}> {/*orden alfabetico A-Z // Z-A */}
                    <optgroup label="Por Nombre">
                        <option id='AZ' value='AZ'>A - Z</option>
                        <option value='ZA'>Z - A</option>
                    </optgroup>
                </select>
                <select id="orderATQ" className='Orderatq' onChange={e => {OrderAtaq(e)}}> {/* orden por ataque*/}
                    <optgroup label="Por Ataque">
                        <option id='ascATQ' value='ascATQ'>Ascendente</option>  
                        <option value='descATQ'>Descendente</option>
                    </optgroup>
                </select>
                </div>
                <div className="Filtrados">
                    <p className="textFiltrado">Filtrados</p>
                <select id='filtradoCreado' className='filterCreated' onChange={e => {filtrados(e)}}> {/* Filtrado! por creado y no creado */}
                    <optgroup label="Pokemon creado o no creado en la pagina">
                        <option id='all' value='all'>Todos</option>
                        <option value='creado'>Creado</option>
                        <option value='nocreado'>No Creado</option>
                    </optgroup>
                </select>
                <select id='filtradoTipo'className='filterType'onChange={e => {filtradoTipos(e)}}> {/* Filtrado! por tipo */}
                    <optgroup label="Tipos de pokemon">
                        <option id='all' value='all'>Todos</option>
                            {currentTipo?.map((c,i) =>{
                                return(
                                <option key={i} value={c.name}> {c.name}
                                </option>
                                )
                            })}
                    </optgroup>                
                </select>
                </div>
                
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
                             ataque={c.ataque}
                             tipos={c.tipos ? c.tipos + '' : c.Types.map(e => e.name + ' ')} 
                             />
                        </Link>
                    </div>
                )
            })}
        </div>
    )

}