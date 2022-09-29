import React from "react";
import '../css/cards.css';

export default function card({name,imagee,tipos,ataque}){
    return(
        <div className="card">
            <h3 className="cardName">{name}</h3>
            <img className='cardImg'src={imagee} alt='not found' width="300px" height='250px'/>
            {/* <div className="pokebola">
            <div className="detalle"></div>
            </div> */}
            <div className="divType">
                <h2 className="cardType">{tipos}</h2>
            </div>
        </div>
    )
}