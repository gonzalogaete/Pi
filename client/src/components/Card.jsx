import React from "react";
import cards from '../css/cards.css';


export default function card({name,image,tipos,ataque}){
    return(
        <div className="card">
            <h3>{name}</h3>
            <img src={image} alt='image not found' width="300px" height='250px'/>
            <h1>{tipos}</h1>
            <h1>{ataque}</h1>
        </div>
    )
}