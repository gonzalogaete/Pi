import React, {useState, useEffect} from "react";
import { Link , useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, KillPkm } from "../actions/index";
import detailsc from '../css/detailsc.css';


export default function Detail (props){
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(()=> {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    const myPokemon = useSelector((state)=> state.details)

    const kill =(e) => {
        e.preventDefault();
        dispatch(KillPkm(props.match.params.id))
        alert('Pokemon Borrado')
        history.push("/home");
    }
    
    return(
        <div className="mainD">
            <h1 className="detailh1">{myPokemon.name}</h1>
            {
                <div className="Detailmain">
                    
                    <div className="positionIMG">
                        <img className='detailImg'src={myPokemon.img? myPokemon.img : myPokemon.imagen} alt="imagen" width='500px' height='500px'></img>
                    
                    <h4 className="detailTipos">Tipos: {!myPokemon.createInDb? myPokemon.tipos + ' ' : myPokemon.Types.map(e => e.name + (' '))}</h4>
                    </div>

                    <h4 className="detailh4">Vida: {myPokemon.vida}</h4>
                    <h4 className="detailh4">Ataque: {myPokemon.ataque}</h4>
                    <h4 className="detailh4">Defensa: {myPokemon.defensa}</h4>
                    <h4 className="detailh4">Velocidad: {myPokemon.velocidad}</h4>
                    <h4 className="detailh4">Altura: {myPokemon.altura/10} Metros</h4>
                    <h4 className="detailh4">Peso: {myPokemon.peso} Kilogramos</h4>
                </div>
            }
            
            <div className="detailVolver">
                <Link  className='aDetail' to ='/home'>
                    <button className="buttonVolverd">Volver</button>
                </Link>
            </div>

            { myPokemon.createInDb ? <div className="KillButtton">
                <button onClick={e => kill(e)}>Borrar Pokémon</button>               
            </div> : null 
            }

        </div>
    )
}