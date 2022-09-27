import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import detailsc from '../css/detailsc.css';

export default function Detail (props){
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    const myPokemon = useSelector((state)=> state.details)
    
    return(
        <div className="mainD">
            {
                <div>
                    <h1>{myPokemon.name}</h1>
                    <img src={myPokemon.img} alt='' width='500px' height='500px'></img>
                    <h2>Tipos: {!myPokemon.createdInDb? myPokemon.tipos + ' ' : myPokemon.tipos.map(e => e.name + ' ')}</h2>
                    <h4>Vida: {myPokemon.vida}</h4>
                    <h4>Ataque: {myPokemon.ataque}</h4>
                    <h4>Defensa: {myPokemon.defensa}</h4>
                    <h4>Velocidad: {myPokemon.velocidad}</h4>
                    <h4>Peso: {myPokemon.peso} Kg</h4>
                </div> 
            } 
            <Link to ='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}