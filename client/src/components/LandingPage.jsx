import React from "react";
import {Link} from 'react-router-dom';
import pokemon from '../img/pokemon.png';
import pikachu from '../img/pikachu.png';
import LP from '../css/LP.css';

export default function LandingPage(){
    return (
        <div class='main'>
            <div className="cajaTitulo">
                <img class='title'src={pokemon} width='700px' height='250px'></img>
            <div>
            {/* <img class='pikachu'src={pikachu} width='300px' height='300px'></img> */}
            </div>
            </div>
            <div className="botonPrincipal">
                <Link to='/home'>
                <button class="button-32" role="button">Gotcha!</button>
                </Link>
            </div>

            
        </div>
    )
}