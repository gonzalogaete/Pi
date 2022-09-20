import React from "react";

export default function card({name,image}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt='image not found' width="200px" height='250px'/>
        </div>
    )
}