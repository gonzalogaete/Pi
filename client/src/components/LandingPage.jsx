import React from "react";
import {Link} from 'react-router-dom';
import pokemon from '../img/pokemon.png';
import pikachu from '../img/pikachu.png';
import '../css/LP.css';

export default function LandingPage(){
    return (
        <div className='main'>
            <div className="cajaTitulo">
                <img className='title'src={pokemon} width='700px' height='250px'></img>
            <div>
            </div>
            </div>
            <div className="botonPrincipal">
                <Link to='/home'>
                <button className="button-32" role="button">Gotcha!</button>
                </Link>
            </div>

            
        </div>
    )
}