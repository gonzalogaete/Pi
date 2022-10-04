import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBarPokemon } from "../actions";
import '../css/searchbar.css';
import  imagen from '../img/favicon.gif';
import imagen2 from '../img/lupa.png';

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name,setName] = useState('');

    function InputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function Submit(e){
        e.preventDefault()
        dispatch(searchBarPokemon(name))
    }
     
    
    return(
        <div className="header">
            <div className="pokeimagen">
                <Link to='/'>
                <img className='ImagenNav' src={imagen} width='60px' alt='Not Found' height='50px'></img>
                </Link>
            
            </div>
            
            <div className="buscar" >   
                <input type='text' placeholder="Buscar Pokemon" onChange={(e)=> InputChange(e)}/>
                <div className='btn'>
                    <button className='btnAa' type="submit" onClick={e => Submit(e)}>
                        <img src={imagen2} width='60px' height='60px'></img>
                    </button>
                </div>
            </div>
        </div>
    )
}